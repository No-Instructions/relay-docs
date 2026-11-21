const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { spawnSync } = require('node:child_process');
const { withBuildOutput } = require('./prepare-build');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'relay-docs-build-retention-'));
  t.after(() => fs.rmSync(root, { recursive: true }));
  const output = path.join(root, '_site');
  const retention = path.join(root, '_build-retention');
  const rollback = path.join(retention, 'previous');
  const history = path.join(root, '_build-history');
  const lock = path.join(root, '.docs-build.lock');
  const build = text => withBuildOutput(root, () => {
    assert.deepEqual(fs.readdirSync(output), []);
    fs.writeFileSync(path.join(output, 'index.html'), text);
  });
  const content = directory => fs.readFileSync(path.join(directory, 'index.html'), 'utf8');
  return { root, output, retention, rollback, history, lock, build, content };
}

function oldGeneratedSite(output) {
  fs.mkdirSync(path.join(output, 'assets'), { recursive: true });
  fs.writeFileSync(path.join(output, 'index.html'), 'legacy site');
  fs.writeFileSync(path.join(output, 'styles.css'), '/* legacy CSS */');
}

test('retains one completed rollback and keeps all legacy entries and independent evidence', t => {
  const { root, output, retention, rollback, history, build, content } = fixture(t);
  oldGeneratedSite(output);
  fs.mkdirSync(path.join(history, 'historic-preview'), { recursive: true });
  fs.writeFileSync(path.join(history, 'historic-preview', 'proof.txt'), 'historic proof');
  const evidence = path.join(root, '_build-evidence');
  fs.mkdirSync(evidence);
  fs.writeFileSync(path.join(evidence, 'proof.txt'), 'pinned proof');

  for (const text of ['first', 'second', 'third', 'fourth']) build(text);
  assert.equal(content(output), 'fourth');
  assert.equal(content(rollback), 'third');
  assert.deepEqual(fs.readdirSync(retention).sort(), ['previous', 'state.json']);
  const migrated = fs.readdirSync(history).filter(name => name.startsWith('migrated-'));
  assert.equal(migrated.length, 1);
  assert.equal(content(path.join(history, migrated[0], 'site')), 'legacy site');
  assert.equal(fs.readFileSync(path.join(history, 'historic-preview', 'proof.txt'), 'utf8'), 'historic proof');
  assert.equal(fs.readFileSync(path.join(evidence, 'proof.txt'), 'utf8'), 'pinned proof');
});

test('failed builds restore the previous output and keep rollback through repeated retries', t => {
  const { root, output, retention, rollback, lock, build, content } = fixture(t);
  build('previous');
  build('current');
  for (let attempt = 0; attempt < 3; attempt++) {
    assert.throws(() => withBuildOutput(root, () => {
      fs.writeFileSync(path.join(output, 'index.html'), 'partial build');
      fs.writeFileSync(path.join(output, 'draft.txt'), 'failed bytes');
      throw new Error('fixture failed');
    }), /fixture failed/);
    assert.equal(content(output), 'current');
    assert.equal(content(rollback), 'previous');
    assert.deepEqual(fs.readdirSync(output), ['index.html']);
    assert.deepEqual(fs.readdirSync(retention).sort(), ['previous', 'state.json']);
    assert.equal(fs.existsSync(lock), false);
  }
  build('new');
  assert.equal(content(rollback), 'current');
  assert.equal(content(output), 'new');
});

test('a failed first build restores legacy output and does not accumulate failed pins', t => {
  const { root, output, history, rollback, build, content } = fixture(t);
  oldGeneratedSite(output);
  for (let attempt = 0; attempt < 2; attempt++) {
    assert.throws(() => withBuildOutput(root, () => {}), /no index.html/);
    assert.equal(content(output), 'legacy site');
    assert.deepEqual(fs.readdirSync(history), []);
  }
  build('first success');
  assert.equal(content(output), 'first success');
  assert.equal(fs.existsSync(rollback), false);
  assert.equal(fs.readdirSync(history).length, 1);
});

test('rejects unexpected output, rollback and retention identities', t => {
  const { root, output, rollback, build } = fixture(t);
  fs.mkdirSync(output);
  fs.writeFileSync(path.join(output, 'unrelated.txt'), 'preserve');
  assert.throws(() => build('blocked'), /Unrecognized legacy generated output/);
  assert.equal(fs.readFileSync(path.join(output, 'unrelated.txt'), 'utf8'), 'preserve');

  fs.renameSync(output, path.join(root, 'unrelated'));
  build('first');
  fs.mkdirSync(rollback);
  assert.throws(() => build('blocked'), /unowned build directory/);
  fs.renameSync(rollback, path.join(root, 'unexpected-rollback'));
  fs.renameSync(output, path.join(root, 'displaced-output'));
  fs.mkdirSync(output);
  assert.throws(() => build('blocked'), /unowned build directory/);
});

test('fails closed for a preexisting lock or a symlink at or inside the build paths', t => {
  const { root, output, lock, build } = fixture(t);
  const external = path.join(root, 'target');
  oldGeneratedSite(external);
  fs.symlinkSync(external, output, 'dir');
  assert.throws(() => build('blocked'), /Unrecognized legacy generated output/);
  assert.equal(fs.lstatSync(output).isSymbolicLink(), true);
  fs.renameSync(output, path.join(root, 'output-symlink'));
  build('first');
  fs.symlinkSync(external, path.join(output, 'linked-directory'), 'dir');
  assert.throws(() => build('blocked'), /Unexpected non-file build output/);
  fs.writeFileSync(lock, 'other writer');
  assert.throws(() => build('blocked'), error => error.code === 'EEXIST');
  assert.equal(fs.readFileSync(lock, 'utf8'), 'other writer');
});

test('locks preparation and the entire child build', t => {
  const { root, output, lock, build, content } = fixture(t);
  build('initial');
  withBuildOutput(root, () => {
    assert.equal(fs.existsSync(lock), true);
    assert.throws(() => build('concurrent'), error => error.code === 'EEXIST');
    fs.writeFileSync(path.join(output, 'index.html'), 'successful');
  });
  assert.equal(fs.existsSync(lock), false);
  assert.equal(content(output), 'successful');
});

test('the CLI guards the complete pipeline, preserves order and returns the child status', t => {
  const { root, output, lock, content } = fixture(t);
  fs.copyFileSync(path.join(__dirname, 'prepare-build.js'), path.join(root, 'prepare-build.js'));
  const expected = [
    'node_modules/@11ty/eleventy/cmd.cjs',
    'generate-llms-full.js',
    'generate-og-images.js',
    'validate-site.js',
  ];
  for (const step of expected) {
    const script = path.join(root, step);
    fs.mkdirSync(path.dirname(script), { recursive: true });
    fs.writeFileSync(script, `
      const fs = require('node:fs');
      if (!fs.existsSync('.docs-build.lock')) process.exit(91);
      fs.appendFileSync('pipeline.log', ${JSON.stringify(step + '\n')});
      if (${JSON.stringify(step)} === ${JSON.stringify(expected[0])}) {
        fs.writeFileSync('_site/index.html', process.env.BUILD_FIXTURE_BODY);
      }
      if (process.env.BUILD_FIXTURE_FAIL === ${JSON.stringify(step)}) process.exit(7);
    `);
  }
  function invoke(body, fail = '', validate = true) {
    return spawnSync(process.execPath, ['prepare-build.js', ...(validate ? ['--validate'] : [])], {
      cwd: root, encoding: 'utf8',
      env: { ...process.env, BUILD_FIXTURE_BODY: body, BUILD_FIXTURE_FAIL: fail },
    });
  }
  const success = invoke('verified');
  assert.equal(success.status, 0, success.stderr);
  assert.equal(content(output), 'verified');
  const failure = invoke('incomplete', 'generate-og-images.js');
  assert.equal(failure.status, 7);
  assert.match(failure.stderr, /generate-og-images.js failed with exit 7/);
  assert.equal(content(output), 'verified');
  assert.equal(fs.existsSync(lock), false);
  const defaultBuild = invoke('default build', '', false);
  assert.equal(defaultBuild.status, 0, defaultBuild.stderr);
  assert.equal(content(output), 'default build');
  assert.deepEqual(fs.readFileSync(path.join(root, 'pipeline.log'), 'utf8').trim().split('\n'),
    [...expected, ...expected.slice(0, 3), ...expected.slice(0, 3)]);
});

test('storage failure staging new state leaves the current output and prior rollback untouched', t => {
  const { root, output, retention, rollback, build, content } = fixture(t);
  build('previous');
  build('current');
  const state = path.join(retention, 'state.json');
  const before = fs.readFileSync(state);
  const write = fs.writeFileSync;
  t.mock.method(fs, 'writeFileSync', (target, data, ...args) => {
    if (typeof target === 'number' && String(data).includes('"initialized":true')) {
      write(target, '{"partial":');
      throw Object.assign(new Error('fixture disk full'), { code: 'ENOSPC' });
    }
    return write(target, data, ...args);
  });
  let published = false;
  assert.throws(() => withBuildOutput(root, () => fs.writeFileSync(path.join(output, 'index.html'), 'new'), () => {
    published = true;
  }), /fixture disk full/);
  assert.equal(published, false);
  assert.equal(content(output), 'current');
  assert.equal(content(rollback), 'previous');
  assert.deepEqual(fs.readFileSync(state), before);
  assert.deepEqual(fs.readdirSync(retention).sort(), ['previous', 'state.json']);
});

test('failure committing staged state reverses the directory moves before restoring current', t => {
  const { root, output, retention, rollback, build, content } = fixture(t);
  build('previous');
  build('current');
  const state = path.join(retention, 'state.json');
  const before = fs.readFileSync(state);
  const rename = fs.renameSync;
  t.mock.method(fs, 'renameSync', (from, to) => {
    if (to === state) throw Object.assign(new Error('fixture state commit failed'), { code: 'ENOSPC' });
    return rename(from, to);
  });
  assert.throws(() => withBuildOutput(root, () => fs.writeFileSync(path.join(output, 'index.html'), 'new')), /fixture state commit failed/);
  assert.equal(content(output), 'current');
  assert.equal(content(rollback), 'previous');
  assert.deepEqual(fs.readFileSync(state), before);
  assert.deepEqual(fs.readdirSync(retention).sort(), ['previous', 'state.json']);
});

test('quarantines an owned build with a nested symlink and restores known good output', t => {
  const { root, output, retention, rollback, build, content } = fixture(t);
  build('previous');
  build('current');
  const target = path.join(root, 'separate-evidence');
  fs.writeFileSync(target, 'unrelated pinned bytes');
  assert.throws(() => withBuildOutput(root, () => {
    fs.writeFileSync(path.join(output, 'index.html'), 'unsafe new');
    fs.symlinkSync(target, path.join(output, 'untrusted'));
  }), /Unexpected non-file build output/);
  assert.equal(content(output), 'current');
  assert.equal(content(rollback), 'previous');
  assert.equal(fs.lstatSync(path.join(retention, 'quarantine', 'untrusted')).isSymbolicLink(), true);
  assert.equal(fs.readFileSync(target, 'utf8'), 'unrelated pinned bytes');
  assert.throws(() => build('blocked'), /needs manual inspection/);
});
