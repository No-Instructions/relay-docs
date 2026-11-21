// Keep one verified previous output. Legacy history is outside managed retention.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

function inspect(filename) {
  try {
    return fs.lstatSync(filename, { bigint: true });
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

function identity(stat) {
  return { device: String(stat.dev), inode: String(stat.ino) };
}

function ownedDirectory(directory, owner) {
  const stat = inspect(directory);
  if (!stat && !owner) return false;
  if (!stat?.isDirectory() || !owner || stat.dev.toString() !== owner.device || stat.ino.toString() !== owner.inode) {
    throw new Error('Unexpected or unowned build directory: ' + directory);
  }
  return true;
}

function rejectSymlinks(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) rejectSymlinks(filename);
    else if (!entry.isFile()) throw new Error('Unexpected non-file build output: ' + filename);
  }
}

function removeOwned(directory, owner) {
  ownedDirectory(directory, owner);
  rejectSymlinks(directory);
  fs.rmSync(directory, { recursive: true });
}

function legacyOutput(output) {
  const stat = inspect(output);
  if (!stat) return null;
  if (!stat.isDirectory() ||
      !inspect(path.join(output, 'index.html'))?.isFile() ||
      !inspect(path.join(output, 'styles.css'))?.isFile() ||
      !inspect(path.join(output, 'assets'))?.isDirectory()) {
    throw new Error('Unrecognized legacy generated output: ' + output);
  }
  rejectSymlinks(output);
  return identity(stat);
}

function withBuildOutput(root, build) {
  const output = path.join(root, '_site');
  const retention = path.join(root, '_build-retention');
  const rollback = path.join(retention, 'previous');
  const pending = path.join(retention, 'pending');
  const retired = path.join(retention, 'retired');
  const quarantine = path.join(retention, 'quarantine');
  const stateFile = path.join(retention, 'state.json');
  const nextState = path.join(retention, 'state.json.next');
  const lock = path.join(root, '.docs-build.lock');
  const lockFd = fs.openSync(lock, 'wx');
  const lockOwner = identity(fs.fstatSync(lockFd, { bigint: true }));
  fs.closeSync(lockFd);
  try {
    function discardState(owner) {
      const stat = inspect(nextState);
      if (!stat?.isFile() || stat.dev.toString() !== owner.device || stat.ino.toString() !== owner.inode) {
        throw new Error('Staged build state was replaced: ' + nextState);
      }
      fs.unlinkSync(nextState);
    }

    function stageState(state) {
      const fd = fs.openSync(nextState, 'wx');
      const owner = identity(fs.fstatSync(fd, { bigint: true }));
      try {
        try {
          fs.writeFileSync(fd, JSON.stringify(state) + '\n');
        } finally {
          fs.closeSync(fd);
        }
      } catch (error) {
        discardState(owner);
        throw error;
      }
      return owner;
    }

    if (!inspect(retention)) {
      fs.mkdirSync(retention, { mode: 0o700 });
      const directory = identity(inspect(retention));
      let staged;
      try {
        staged = stageState({ directory, initialized: false, current: null, previous: null });
        fs.renameSync(nextState, stateFile);
      } catch (error) {
        if (staged) discardState(staged);
        ownedDirectory(retention, directory);
        fs.rmdirSync(retention);
        throw error;
      }
    }
    if (!inspect(retention)?.isDirectory() || !inspect(stateFile)?.isFile()) {
      throw new Error('Unexpected or unowned build retention directory: ' + retention);
    }
    const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    ownedDirectory(retention, state.directory);
    if (typeof state.initialized !== 'boolean' || !('current' in state) || !('previous' in state) ||
        (!state.initialized && (state.current || state.previous)) || inspect(pending) || inspect(retired) ||
        inspect(quarantine) || inspect(nextState)) {
      throw new Error('Build retention state needs manual inspection: ' + retention);
    }
    if (ownedDirectory(rollback, state.previous)) rejectSymlinks(rollback);

    const current = state.initialized ? state.current : legacyOutput(output);
    if (ownedDirectory(output, current)) rejectSymlinks(output);

    let displaced = null;
    let legacyPinOwner;
    if (current) {
      if (state.initialized) {
        displaced = pending;
      } else {
        const history = path.join(root, '_build-history');
        if (!inspect(history)) fs.mkdirSync(history);
        if (!inspect(history)?.isDirectory()) throw new Error('Unsafe legacy build history: ' + history);
        const pin = fs.mkdtempSync(path.join(history, 'migrated-'));
        legacyPinOwner = identity(inspect(pin));
        displaced = path.join(pin, 'site');
      }
      fs.renameSync(output, displaced);
    }

    let stagingOwner;
    function recover(error) {
      ownedDirectory(retention, state.directory);
      if (stagingOwner) {
        ownedDirectory(output, stagingOwner);
        let safe = true;
        try {
          rejectSymlinks(output);
        } catch {
          safe = false;
        }
        if (safe) removeOwned(output, stagingOwner);
        else {
          if (inspect(quarantine)) throw new Error('Build quarantine is occupied: ' + quarantine, { cause: error });
          fs.renameSync(output, quarantine);
          console.error('Unsafe new build preserved in ' + quarantine);
        }
      }
      if (displaced) {
        const owner = state.initialized ? state.directory : legacyPinOwner;
        ownedDirectory(path.dirname(displaced), owner);
        ownedDirectory(displaced, current);
        if (inspect(output)) throw new Error('Build output appeared during recovery: ' + output, { cause: error });
        fs.renameSync(displaced, output);
        if (!state.initialized) fs.rmdirSync(path.dirname(displaced));
      }
      throw error;
    }

    try {
      fs.mkdirSync(output);
      stagingOwner = identity(inspect(output));
      build();
      ownedDirectory(output, stagingOwner);
      rejectSymlinks(output);
      if (!inspect(path.join(output, 'index.html'))?.isFile()) throw new Error('Build output has no index.html');
    } catch (error) {
      recover(error);
    }

    const rotate = state.initialized && displaced;
    let staged;
    let previousRetired = false;
    let pendingPromoted = false;
    try {
      ownedDirectory(retention, state.directory);
      if (rotate) {
        ownedDirectory(displaced, current);
        if (ownedDirectory(rollback, state.previous)) rejectSymlinks(rollback);
      }
      staged = stageState({
        directory: state.directory,
        initialized: true,
        current: stagingOwner,
        previous: rotate ? current : state.previous,
      });
      if (rotate) {
        if (state.previous) {
          if (inspect(retired)) throw new Error('Unexpected retired output: ' + retired);
          fs.renameSync(rollback, retired);
          previousRetired = true;
        }
        if (inspect(rollback)) throw new Error('Unexpected rollback output: ' + rollback);
        fs.renameSync(displaced, rollback);
        pendingPromoted = true;
      }
      fs.renameSync(nextState, stateFile);
    } catch (error) {
      ownedDirectory(retention, state.directory);
      if (pendingPromoted) {
        ownedDirectory(rollback, current);
        if (inspect(displaced)) throw new Error('Unexpected pending output during recovery: ' + displaced, { cause: error });
        fs.renameSync(rollback, displaced);
      }
      if (previousRetired) {
        ownedDirectory(retired, state.previous);
        if (inspect(rollback)) throw new Error('Unexpected rollback output during recovery: ' + rollback, { cause: error });
        fs.renameSync(retired, rollback);
      }
      if (staged) discardState(staged);
      recover(error);
    }

    if (previousRetired) removeOwned(retired, state.previous);
  } finally {
    const stat = inspect(lock);
    if (!stat?.isFile() || stat.dev.toString() !== lockOwner.device || stat.ino.toString() !== lockOwner.inode) {
      throw new Error('Build lock was replaced: ' + lock);
    }
    fs.unlinkSync(lock);
  }
}

function runStep(args) {
  const result = spawnSync(process.execPath, args, { cwd: __dirname, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const error = new Error(args[0] + ' failed with ' + (result.signal || 'exit ' + result.status));
    error.exitCode = result.status || 1;
    throw error;
  }
}

function runBuild() {
  const commands = [
    ['node_modules/@11ty/eleventy/cmd.cjs'],
    ['generate-llms-full.js'],
    ['generate-og-images.js'],
  ];
  if (process.argv.includes('--validate')) {
    commands.push(['validate-site.js']);
  }
  for (const args of commands) runStep(args);
}

if (require.main === module) {
  try {
    withBuildOutput(__dirname, runBuild);
  } catch (error) {
    console.error('Docs build failed: ' + error.message);
    process.exitCode = error.exitCode || 1;
  }
}

module.exports = { withBuildOutput };
