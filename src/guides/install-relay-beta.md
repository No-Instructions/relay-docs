---
title: Install the latest Relay beta
description: How to install the latest Relay beta with BRAT or a local coding agent.
layout: doc.njk
---
Relay beta releases are prerelease builds for testing new Relay features before they reach the standard Obsidian community plugin release.

There are two ways to install the latest Relay beta:

1. **[Use a local agent](#use-a-local-agent).** This is the easiest path if you already run Claude Code, Codex, Cursor, or another local shell-capable agent on the same computer as your Obsidian vault.
2. **[Use BRAT](#manual-install-use-brat).** Use this if you want to install from inside Obsidian yourself, do not have a local agent, or are on mobile.

<h2 id="use-a-local-agent">Use a local agent</h2>

Have your agent install the beta if it can read and write files inside your Obsidian vault. It can select the latest release candidate, verify GitHub release digests, back up replaced files, preserve Relay settings, and restart Relay in Obsidian when possible.

If your agent can read web pages, have it use this page. Otherwise copy the full self-contained instructions:

<div class="copy-agent-instructions">
  <button type="button" class="copy-agent-button" data-copy-relay-agent-instructions>Copy agent instructions as Markdown</button>
  <span class="copy-agent-status" aria-live="polite"></span>
</div>

<textarea id="relay-agent-instructions" hidden>
# Install the latest Relay beta

You are a local coding agent running on the same computer as the user's Obsidian vault. Install the newest Relay beta release candidate for the Obsidian community plugin id `system3-relay`.

### Before you start

Relay beta releases are published at [No-Instructions/Relay releases](https://github.com/No-Instructions/Relay/releases). This install copies verified release files into the user's vault at `<vault>/.obsidian/plugins/system3-relay`.

Only modify:

- `<vault>/.obsidian/plugins/system3-relay`
- `<vault>/.obsidian/.relay-beta-backups`

### Procedure

1. Get the absolute path to the user's Obsidian vault. If the user does not provide it, inspect Obsidian's local vault registry and then ask the user to confirm the selected vault before writing. Common registry locations:
   - macOS: `~/Library/Application Support/obsidian/obsidian.json`
   - Windows: `%APPDATA%\Obsidian\obsidian.json`
   - Linux: `~/.config/obsidian/obsidian.json`
   If multiple registry entries exist, prefer the one marked `open: true`, then confirm the selected vault with the user.
   Reason: the install target is inside that vault, and users may have more than one vault.

2. Verify `<vault>/.obsidian` exists. Stop if it does not.
   Reason: this prevents writing plugin files into the wrong directory.

3. Query `https://api.github.com/repos/No-Instructions/Relay/releases?per_page=50`.
   Reason: the GitHub Releases API contains the release metadata, asset URLs, and SHA-256 digests.

4. Select the newest release where `draft` is false, `prerelease` is true, the tag ends in `-rcN`, and assets include `main.js`, `styles.css`, and `manifest-beta.json`.
   Reason: Relay beta installs should use release candidates, not plain staged version tags like `0.8.0`.

5. Read the `digest` field for `main.js`, `styles.css`, and `manifest-beta.json`.
   Reason: GitHub's digest is the source of truth for verifying each downloaded file.

6. Prepare `PLUGIN_DIR`, `BACKUP_ROOT`, `BACKUP_DIR`, and `STAGING`.
   Reason: explicit paths make the install auditable and keep writes within the allowed locations.

7. Check whether the official Obsidian CLI is available with `command -v obsidian`.
   Reason: Obsidian must restart plugin code after the file install, and checking for the CLI now prevents defaulting to a manual restart later.

8. Show the user the selected release, publish date, vault path, plugin path, backup path, expected SHA-256 digests, file list, and whether Obsidian CLI restart is available. If the CLI is available, say the install will use the CLI to disable Relay, wait briefly for teardown, then enable Relay after the files are written. If the CLI is not available, say manual reload will be needed. Do not write anything until the user explicitly approves.
   Reason: this is a prerelease install that modifies files in the user's vault.

9. Download `main.js`, `styles.css`, and `manifest-beta.json` into a temporary directory.
   Reason: failed downloads must not leave the installed plugin half-updated.

10. Verify each downloaded asset's SHA-256 against the expected digest from the API. Stop on any mismatch.
   Reason: a mismatch means the downloaded file is not the expected release asset.

11. Verify `manifest-beta.json` has `id` set to `system3-relay`.
    Reason: this prevents installing the wrong plugin manifest.

12. Rewrite the downloaded `manifest-beta.json` so its `version` field equals the selected release tag, then save the rewritten file as `manifest.json`.
    Reason: Relay's beta release manifests intentionally carry the previous stable version to keep normal Obsidian installs from auto-updating to betas, but Obsidian reads the local plugin folder's `manifest.json` to report the installed version.

13. If `PLUGIN_DIR` already exists, create `BACKUP_DIR` and copy `main.js`, `styles.css`, `manifest.json`, and `data.json` into it, skipping any that are not present.
    Reason: rollback only needs the files being replaced plus settings, and `data.json` must be preserved.

14. Create `STAGING` inside `PLUGIN_DIR`. Copy verified `main.js`, verified `styles.css`, and rewritten `manifest.json` into `STAGING`.
    Reason: staging keeps the final write step small and avoids a plugin folder with a mix of downloaded and missing files.

15. Move `main.js`, `styles.css`, and `manifest.json` from `STAGING` into `PLUGIN_DIR`.
    Reason: this completes the direct plugin install.

16. Confirm `data.json`, if present, was not replaced.
    Reason: `data.json` contains existing Relay settings.

17. Restart Relay in Obsidian. If step 7 found the official Obsidian CLI, first try a full disable/enable cycle: `obsidian plugin:disable id=system3-relay`, wait at least 2 seconds, then `obsidian plugin:enable id=system3-relay`. Do not assume a running Obsidian app is enough; the user may need to enable the CLI in Obsidian settings first. Use the `id=` prefix; command forms like `obsidian plugin:disable system3-relay` are not valid. If the CLI is unavailable or the disable/enable cycle fails, tell the user to disable then re-enable Relay in Community plugins, or run `Reload app without saving` from the command palette.
    Reason: Obsidian must unload old plugin code before the new beta is active. A disable/enable cycle gives Relay time to tear down sockets, listeners, and timers before loading the replacement code.

## Reference implementation

This shell script is not required. The agent may use other tooling as long as it follows the contract above. If using the script, run it first with `RELAY_DRY_RUN=1` to preview the selected release, expected writes, and digest verification. After the user approves, run with `RELAY_CONFIRM=INSTALL` to skip the interactive prompt.

```bash
# Agents: set VAULT to the absolute path of the target Obsidian vault before running.
VAULT="/absolute/path/to/your/vault"
REPO="No-Instructions/Relay"

set -euo pipefail

if [ "$VAULT" = "/absolute/path/to/your/vault" ]; then
  echo "Set VAULT to the absolute path of the Obsidian vault before running." >&2
  exit 1
fi

if [ ! -d "$VAULT/.obsidian" ]; then
  echo "Refusing to continue: $VAULT does not contain a .obsidian folder" >&2
  exit 1
fi

for tool in curl jq; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "Missing required tool: $tool" >&2
    exit 1
  fi
done

if command -v sha256sum >/dev/null 2>&1; then
  SHA256_CMD="sha256sum"
elif command -v shasum >/dev/null 2>&1; then
  SHA256_CMD="shasum -a 256"
else
  echo "Missing SHA-256 utility: need sha256sum or shasum" >&2
  exit 1
fi

sha256_of() {
  $SHA256_CMD "$1" | awk '{print $1}'
}

PLUGIN_DIR="$VAULT/.obsidian/plugins/system3-relay"
BACKUP_ROOT="$VAULT/.obsidian/.relay-beta-backups"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="$BACKUP_ROOT/system3-relay-$STAMP"
TMPDIR="$(mktemp -d)"
STAGING=""

cleanup() {
  [ -n "${TMPDIR:-}" ] && rm -rf "$TMPDIR"
  [ -n "${STAGING:-}" ] && [ -d "$STAGING" ] && rm -rf "$STAGING"
  return 0
}
trap cleanup EXIT

DRY_RUN="${RELAY_DRY_RUN:-0}"

RELEASES_JSON="$TMPDIR/releases.json"
curl -fsSL "https://api.github.com/repos/$REPO/releases?per_page=50" -o "$RELEASES_JSON"

VERSION="$(jq -r '
  map(select(.draft == false and .prerelease == true))
  | map(select(.tag_name | test("^[0-9]+\\.[0-9]+\\.[0-9]+-rc[0-9]+$")))
  | map(select(
      ([.assets[].name] | contains(["main.js"]))
      and ([.assets[].name] | contains(["styles.css"]))
      and ([.assets[].name] | contains(["manifest-beta.json"]))
    ))
  | .[0].tag_name // empty
' "$RELEASES_JSON")"

if [ -z "$VERSION" ]; then
  echo "No -rcN prerelease found with required Relay beta assets" >&2
  exit 1
fi

PUBLISHED_AT="$(jq -r --arg version "$VERSION" '
  (.[] | select(.tag_name == $version) | .published_at) // "unknown"
' "$RELEASES_JSON")"

asset_digest() {
  local asset_name="$1"
  jq -r --arg version "$VERSION" --arg asset "$asset_name" '
    (.[] | select(.tag_name == $version) | .assets[] | select(.name == $asset) | .digest) // empty
  ' "$RELEASES_JSON"
}

EXPECTED_DIGEST_MAIN="$(asset_digest main.js)"
EXPECTED_DIGEST_STYLES="$(asset_digest styles.css)"
EXPECTED_DIGEST_MANIFEST="$(asset_digest manifest-beta.json)"

for pair in "main.js:$EXPECTED_DIGEST_MAIN" "styles.css:$EXPECTED_DIGEST_STYLES" "manifest-beta.json:$EXPECTED_DIGEST_MANIFEST"; do
  digest="${pair#*:}"
  asset="${pair%%:*}"
  if [ -z "$digest" ] || [ "${digest#sha256:}" = "$digest" ]; then
    echo "Missing or non-sha256 digest for $asset: '$digest'" >&2
    exit 1
  fi
done

echo "Relay beta release: $VERSION"
echo "Published: $PUBLISHED_AT"
echo "Vault: $VAULT"
echo "Plugin folder: $PLUGIN_DIR"
echo "Backup folder: $BACKUP_DIR"
echo "Expected digests:"
echo "  main.js            $EXPECTED_DIGEST_MAIN"
echo "  styles.css         $EXPECTED_DIGEST_STYLES"
echo "  manifest-beta.json $EXPECTED_DIGEST_MANIFEST"
echo "Will write: main.js, styles.css, manifest.json"
echo "Will preserve: data.json"
if [ -d "$PLUGIN_DIR" ]; then
  echo "Will back up (selective, only these files if present):"
  for f in main.js styles.css manifest.json data.json; do
    [ -f "$PLUGIN_DIR/$f" ] && echo "  $PLUGIN_DIR/$f"
  done
else
  echo "Will back up: nothing (fresh install)"
fi

if [ "$DRY_RUN" = "1" ]; then
  echo "RELAY_DRY_RUN=1; downloading and verifying without writing to the plugin folder."
elif [ "${RELAY_CONFIRM:-}" = "INSTALL" ]; then
  echo "RELAY_CONFIRM=INSTALL detected; proceeding without interactive prompt."
else
  printf "Type INSTALL to continue: "
  read -r CONFIRM
  if [ "$CONFIRM" != "INSTALL" ]; then
    echo "Cancelled."
    exit 1
  fi
fi

BASE="https://github.com/$REPO/releases/download/$VERSION"

curl -fsSL "$BASE/main.js" -o "$TMPDIR/main.js"
curl -fsSL "$BASE/styles.css" -o "$TMPDIR/styles.css"
curl -fsSL "$BASE/manifest-beta.json" -o "$TMPDIR/manifest-beta.json"

verify_digest() {
  local file="$1"
  local expected="$2"
  local expected_hex="${expected#sha256:}"
  local actual
  actual="$(sha256_of "$file")"
  if [ "$actual" != "$expected_hex" ]; then
    echo "SHA-256 mismatch for $(basename "$file"):" >&2
    echo "  expected $expected_hex" >&2
    echo "  actual   $actual" >&2
    exit 1
  fi
  echo "Verified $(basename "$file") $actual"
}

verify_digest "$TMPDIR/main.js" "$EXPECTED_DIGEST_MAIN"
verify_digest "$TMPDIR/styles.css" "$EXPECTED_DIGEST_STYLES"
verify_digest "$TMPDIR/manifest-beta.json" "$EXPECTED_DIGEST_MANIFEST"

jq --arg expected "$VERSION" '
  if .id == "system3-relay"
  then .version = $expected
  else error("Unexpected plugin id: \(.id)")
  end
' "$TMPDIR/manifest-beta.json" > "$TMPDIR/manifest.json"
echo "Verified id=system3-relay; rewrote manifest.json version to $VERSION"

if [ "$DRY_RUN" = "1" ]; then
  echo "DRY RUN: all assets downloaded and verified. Would have installed:"
  echo "  $PLUGIN_DIR/main.js"
  echo "  $PLUGIN_DIR/styles.css"
  echo "  $PLUGIN_DIR/manifest.json"
  echo "Plugin folder was not modified. No backup was taken. Exiting."
  exit 0
fi

if [ -d "$PLUGIN_DIR" ]; then
  mkdir -p "$BACKUP_DIR"
  echo "Backing up to $BACKUP_DIR:"
  for f in main.js styles.css manifest.json data.json; do
    if [ -f "$PLUGIN_DIR/$f" ]; then
      cp "$PLUGIN_DIR/$f" "$BACKUP_DIR/$f"
      echo "  $f"
    fi
  done
else
  echo "Fresh install: no existing plugin folder, no backup taken."
fi

STAGING="$PLUGIN_DIR/.relay-install-staging-$STAMP"
mkdir -p "$STAGING"

cp "$TMPDIR/main.js" "$STAGING/main.js"
cp "$TMPDIR/styles.css" "$STAGING/styles.css"
cp "$TMPDIR/manifest.json" "$STAGING/manifest.json"

mv -f "$STAGING/main.js" "$PLUGIN_DIR/main.js"
mv -f "$STAGING/styles.css" "$PLUGIN_DIR/styles.css"
mv -f "$STAGING/manifest.json" "$PLUGIN_DIR/manifest.json"
rmdir "$STAGING"
STAGING=""

echo "Installed Relay $VERSION in $PLUGIN_DIR"
if [ -d "$BACKUP_DIR" ]; then
  echo "Backup of replaced files is in $BACKUP_DIR"
fi
echo "This did not replace Relay settings stored in data.json."
if command -v obsidian >/dev/null 2>&1; then
  (
    cd "$VAULT"
    RELAY_ENABLED="$(obsidian plugin id=system3-relay 2>/dev/null | awk -F '\t' '$1 == "enabled" { print $2 }' || true)"
    if [ "$RELAY_ENABLED" = "true" ]; then
      obsidian plugin:disable id=system3-relay
      sleep 2
    else
      echo "Relay was not enabled before install; enabling it now."
    fi
    obsidian plugin:enable id=system3-relay
  ) && echo "Restarted Relay via Obsidian CLI." && exit 0
  echo "Obsidian CLI exists, but the plugin disable/enable cycle failed. Obsidian may not be running with this vault open, the CLI may not be enabled, or Relay may need manual activation." >&2
fi
echo "In Obsidian, disable then re-enable Relay in Community plugins (or run 'Reload app without saving' from the command palette)."
```

## Roll back an agent install

If the direct agent install is not usable, restore the files from `<vault>/.obsidian/.relay-beta-backups/system3-relay-<timestamp>/` back into `<vault>/.obsidian/plugins/system3-relay/`. Run the commands below for the timestamp you want to restore, skipping any file the backup directory does not contain:

```bash
BACKUP_DIR="<vault>/.obsidian/.relay-beta-backups/system3-relay-<timestamp>"
PLUGIN_DIR="<vault>/.obsidian/plugins/system3-relay"

[ -f "$BACKUP_DIR/main.js" ]       && cp "$BACKUP_DIR/main.js"       "$PLUGIN_DIR/main.js"
[ -f "$BACKUP_DIR/styles.css" ]    && cp "$BACKUP_DIR/styles.css"    "$PLUGIN_DIR/styles.css"
[ -f "$BACKUP_DIR/manifest.json" ] && cp "$BACKUP_DIR/manifest.json" "$PLUGIN_DIR/manifest.json"
[ -f "$BACKUP_DIR/data.json" ]     && cp "$BACKUP_DIR/data.json"     "$PLUGIN_DIR/data.json"
```

After restoring, disable then re-enable Relay in Community plugins, or run `Reload app without saving`, so Obsidian picks up the previous code.

## Report problems

Use the Obsidian command `Relay: Send bug report` when available. If that does not work, post in the `new-sync-beta` channel in the [Relay Discord](https://discord.relay.md).

</textarea>

### Agent install instructions

You are a local coding agent running on the same computer as the user's Obsidian vault. Install the newest Relay beta release candidate for the Obsidian community plugin id `system3-relay`.

#### Before you start

Relay beta releases are published at [No-Instructions/Relay releases](https://github.com/No-Instructions/Relay/releases). This install copies verified release files into the user's vault at `<vault>/.obsidian/plugins/system3-relay`.

Only modify:

- `<vault>/.obsidian/plugins/system3-relay`
- `<vault>/.obsidian/.relay-beta-backups`

#### Procedure

1. Get the absolute path to the user's Obsidian vault. If the user does not provide it, inspect Obsidian's local vault registry and then ask the user to confirm the selected vault before writing. Common registry locations:
   - macOS: `~/Library/Application Support/obsidian/obsidian.json`
   - Windows: `%APPDATA%\Obsidian\obsidian.json`
   - Linux: `~/.config/obsidian/obsidian.json`
   If multiple registry entries exist, prefer the one marked `open: true`, then confirm the selected vault with the user.
   Reason: the install target is inside that vault, and users may have more than one vault.

2. Verify `<vault>/.obsidian` exists. Stop if it does not.
   Reason: this prevents writing plugin files into the wrong directory.

3. Query `https://api.github.com/repos/No-Instructions/Relay/releases?per_page=50`.
   Reason: the GitHub Releases API contains the release metadata, asset URLs, and SHA-256 digests.

4. Select the newest release where `draft` is false, `prerelease` is true, the tag ends in `-rcN`, and assets include `main.js`, `styles.css`, and `manifest-beta.json`.
   Reason: Relay beta installs should use release candidates, not plain staged version tags like `0.8.0`.

5. Read the `digest` field for `main.js`, `styles.css`, and `manifest-beta.json`.
   Reason: GitHub's digest is the source of truth for verifying each downloaded file.

6. Prepare `PLUGIN_DIR`, `BACKUP_ROOT`, `BACKUP_DIR`, and `STAGING`.
   Reason: explicit paths make the install auditable and keep writes within the allowed locations.

7. Check whether the official Obsidian CLI is available with `command -v obsidian`.
   Reason: Obsidian must restart plugin code after the file install, and checking for the CLI now prevents defaulting to a manual restart later.

8. Show the user the selected release, publish date, vault path, plugin path, backup path, expected SHA-256 digests, file list, and whether Obsidian CLI restart is available. If the CLI is available, say the install will use the CLI to disable Relay, wait briefly for teardown, then enable Relay after the files are written. If the CLI is not available, say manual reload will be needed. Do not write anything until the user explicitly approves.
   Reason: this is a prerelease install that modifies files in the user's vault.

9. Download `main.js`, `styles.css`, and `manifest-beta.json` into a temporary directory.
   Reason: failed downloads must not leave the installed plugin half-updated.

10. Verify each downloaded asset's SHA-256 against the expected digest from the API. Stop on any mismatch.
   Reason: a mismatch means the downloaded file is not the expected release asset.

11. Verify `manifest-beta.json` has `id` set to `system3-relay`.
    Reason: this prevents installing the wrong plugin manifest.

12. Rewrite the downloaded `manifest-beta.json` so its `version` field equals the selected release tag, then save the rewritten file as `manifest.json`.
    Reason: Relay's beta release manifests intentionally carry the previous stable version to keep normal Obsidian installs from auto-updating to betas, but Obsidian reads the local plugin folder's `manifest.json` to report the installed version.

13. If `PLUGIN_DIR` already exists, create `BACKUP_DIR` and copy `main.js`, `styles.css`, `manifest.json`, and `data.json` into it, skipping any that are not present.
    Reason: rollback only needs the files being replaced plus settings, and `data.json` must be preserved.

14. Create `STAGING` inside `PLUGIN_DIR`. Copy verified `main.js`, verified `styles.css`, and rewritten `manifest.json` into `STAGING`.
    Reason: staging keeps the final write step small and avoids a plugin folder with a mix of downloaded and missing files.

15. Move `main.js`, `styles.css`, and `manifest.json` from `STAGING` into `PLUGIN_DIR`.
    Reason: this completes the direct plugin install.

16. Confirm `data.json`, if present, was not replaced.
    Reason: `data.json` contains existing Relay settings.

17. Restart Relay in Obsidian. If step 7 found the official Obsidian CLI, first try a full disable/enable cycle: `obsidian plugin:disable id=system3-relay`, wait at least 2 seconds, then `obsidian plugin:enable id=system3-relay`. Do not assume a running Obsidian app is enough; the user may need to enable the CLI in Obsidian settings first. Use the `id=` prefix; command forms like `obsidian plugin:disable system3-relay` are not valid. If the CLI is unavailable or the disable/enable cycle fails, tell the user to disable then re-enable Relay in Community plugins, or run `Reload app without saving` from the command palette.
    Reason: Obsidian must unload old plugin code before the new beta is active. A disable/enable cycle gives Relay time to tear down sockets, listeners, and timers before loading the replacement code.

### Reference implementation

This shell script is not required. The agent may use other tooling as long as it follows the contract above. If using the script, run it first with `RELAY_DRY_RUN=1` to preview the selected release, expected writes, and digest verification. After the user approves, run with `RELAY_CONFIRM=INSTALL` to skip the interactive prompt.

```bash
# Agents: set VAULT to the absolute path of the target Obsidian vault before running.
VAULT="/absolute/path/to/your/vault"
REPO="No-Instructions/Relay"

set -euo pipefail

if [ "$VAULT" = "/absolute/path/to/your/vault" ]; then
  echo "Set VAULT to the absolute path of the Obsidian vault before running." >&2
  exit 1
fi

if [ ! -d "$VAULT/.obsidian" ]; then
  echo "Refusing to continue: $VAULT does not contain a .obsidian folder" >&2
  exit 1
fi

for tool in curl jq; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "Missing required tool: $tool" >&2
    exit 1
  fi
done

if command -v sha256sum >/dev/null 2>&1; then
  SHA256_CMD="sha256sum"
elif command -v shasum >/dev/null 2>&1; then
  SHA256_CMD="shasum -a 256"
else
  echo "Missing SHA-256 utility: need sha256sum or shasum" >&2
  exit 1
fi

sha256_of() {
  $SHA256_CMD "$1" | awk '{print $1}'
}

PLUGIN_DIR="$VAULT/.obsidian/plugins/system3-relay"
BACKUP_ROOT="$VAULT/.obsidian/.relay-beta-backups"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="$BACKUP_ROOT/system3-relay-$STAMP"
TMPDIR="$(mktemp -d)"
STAGING=""

cleanup() {
  [ -n "${TMPDIR:-}" ] && rm -rf "$TMPDIR"
  [ -n "${STAGING:-}" ] && [ -d "$STAGING" ] && rm -rf "$STAGING"
  return 0
}
trap cleanup EXIT

DRY_RUN="${RELAY_DRY_RUN:-0}"

RELEASES_JSON="$TMPDIR/releases.json"
curl -fsSL "https://api.github.com/repos/$REPO/releases?per_page=50" -o "$RELEASES_JSON"

VERSION="$(jq -r '
  map(select(.draft == false and .prerelease == true))
  | map(select(.tag_name | test("^[0-9]+\\.[0-9]+\\.[0-9]+-rc[0-9]+$")))
  | map(select(
      ([.assets[].name] | contains(["main.js"]))
      and ([.assets[].name] | contains(["styles.css"]))
      and ([.assets[].name] | contains(["manifest-beta.json"]))
    ))
  | .[0].tag_name // empty
' "$RELEASES_JSON")"

if [ -z "$VERSION" ]; then
  echo "No -rcN prerelease found with required Relay beta assets" >&2
  exit 1
fi

PUBLISHED_AT="$(jq -r --arg version "$VERSION" '
  (.[] | select(.tag_name == $version) | .published_at) // "unknown"
' "$RELEASES_JSON")"

asset_digest() {
  local asset_name="$1"
  jq -r --arg version "$VERSION" --arg asset "$asset_name" '
    (.[] | select(.tag_name == $version) | .assets[] | select(.name == $asset) | .digest) // empty
  ' "$RELEASES_JSON"
}

EXPECTED_DIGEST_MAIN="$(asset_digest main.js)"
EXPECTED_DIGEST_STYLES="$(asset_digest styles.css)"
EXPECTED_DIGEST_MANIFEST="$(asset_digest manifest-beta.json)"

for pair in "main.js:$EXPECTED_DIGEST_MAIN" "styles.css:$EXPECTED_DIGEST_STYLES" "manifest-beta.json:$EXPECTED_DIGEST_MANIFEST"; do
  digest="${pair#*:}"
  asset="${pair%%:*}"
  if [ -z "$digest" ] || [ "${digest#sha256:}" = "$digest" ]; then
    echo "Missing or non-sha256 digest for $asset: '$digest'" >&2
    exit 1
  fi
done

echo "Relay beta release: $VERSION"
echo "Published: $PUBLISHED_AT"
echo "Vault: $VAULT"
echo "Plugin folder: $PLUGIN_DIR"
echo "Backup folder: $BACKUP_DIR"
echo "Expected digests:"
echo "  main.js            $EXPECTED_DIGEST_MAIN"
echo "  styles.css         $EXPECTED_DIGEST_STYLES"
echo "  manifest-beta.json $EXPECTED_DIGEST_MANIFEST"
echo "Will write: main.js, styles.css, manifest.json"
echo "Will preserve: data.json"
if [ -d "$PLUGIN_DIR" ]; then
  echo "Will back up (selective, only these files if present):"
  for f in main.js styles.css manifest.json data.json; do
    [ -f "$PLUGIN_DIR/$f" ] && echo "  $PLUGIN_DIR/$f"
  done
else
  echo "Will back up: nothing (fresh install)"
fi

if [ "$DRY_RUN" = "1" ]; then
  echo "RELAY_DRY_RUN=1; downloading and verifying without writing to the plugin folder."
elif [ "${RELAY_CONFIRM:-}" = "INSTALL" ]; then
  echo "RELAY_CONFIRM=INSTALL detected; proceeding without interactive prompt."
else
  printf "Type INSTALL to continue: "
  read -r CONFIRM
  if [ "$CONFIRM" != "INSTALL" ]; then
    echo "Cancelled."
    exit 1
  fi
fi

BASE="https://github.com/$REPO/releases/download/$VERSION"

curl -fsSL "$BASE/main.js" -o "$TMPDIR/main.js"
curl -fsSL "$BASE/styles.css" -o "$TMPDIR/styles.css"
curl -fsSL "$BASE/manifest-beta.json" -o "$TMPDIR/manifest-beta.json"

verify_digest() {
  local file="$1"
  local expected="$2"
  local expected_hex="${expected#sha256:}"
  local actual
  actual="$(sha256_of "$file")"
  if [ "$actual" != "$expected_hex" ]; then
    echo "SHA-256 mismatch for $(basename "$file"):" >&2
    echo "  expected $expected_hex" >&2
    echo "  actual   $actual" >&2
    exit 1
  fi
  echo "Verified $(basename "$file") $actual"
}

verify_digest "$TMPDIR/main.js" "$EXPECTED_DIGEST_MAIN"
verify_digest "$TMPDIR/styles.css" "$EXPECTED_DIGEST_STYLES"
verify_digest "$TMPDIR/manifest-beta.json" "$EXPECTED_DIGEST_MANIFEST"

jq --arg expected "$VERSION" '
  if .id == "system3-relay"
  then .version = $expected
  else error("Unexpected plugin id: \(.id)")
  end
' "$TMPDIR/manifest-beta.json" > "$TMPDIR/manifest.json"
echo "Verified id=system3-relay; rewrote manifest.json version to $VERSION"

if [ "$DRY_RUN" = "1" ]; then
  echo "DRY RUN: all assets downloaded and verified. Would have installed:"
  echo "  $PLUGIN_DIR/main.js"
  echo "  $PLUGIN_DIR/styles.css"
  echo "  $PLUGIN_DIR/manifest.json"
  echo "Plugin folder was not modified. No backup was taken. Exiting."
  exit 0
fi

if [ -d "$PLUGIN_DIR" ]; then
  mkdir -p "$BACKUP_DIR"
  echo "Backing up to $BACKUP_DIR:"
  for f in main.js styles.css manifest.json data.json; do
    if [ -f "$PLUGIN_DIR/$f" ]; then
      cp "$PLUGIN_DIR/$f" "$BACKUP_DIR/$f"
      echo "  $f"
    fi
  done
else
  echo "Fresh install: no existing plugin folder, no backup taken."
fi

STAGING="$PLUGIN_DIR/.relay-install-staging-$STAMP"
mkdir -p "$STAGING"

cp "$TMPDIR/main.js" "$STAGING/main.js"
cp "$TMPDIR/styles.css" "$STAGING/styles.css"
cp "$TMPDIR/manifest.json" "$STAGING/manifest.json"

mv -f "$STAGING/main.js" "$PLUGIN_DIR/main.js"
mv -f "$STAGING/styles.css" "$PLUGIN_DIR/styles.css"
mv -f "$STAGING/manifest.json" "$PLUGIN_DIR/manifest.json"
rmdir "$STAGING"
STAGING=""

echo "Installed Relay $VERSION in $PLUGIN_DIR"
if [ -d "$BACKUP_DIR" ]; then
  echo "Backup of replaced files is in $BACKUP_DIR"
fi
echo "This did not replace Relay settings stored in data.json."
if command -v obsidian >/dev/null 2>&1; then
  (
    cd "$VAULT"
    RELAY_ENABLED="$(obsidian plugin id=system3-relay 2>/dev/null | awk -F '\t' '$1 == "enabled" { print $2 }' || true)"
    if [ "$RELAY_ENABLED" = "true" ]; then
      obsidian plugin:disable id=system3-relay
      sleep 2
    else
      echo "Relay was not enabled before install; enabling it now."
    fi
    obsidian plugin:enable id=system3-relay
  ) && echo "Restarted Relay via Obsidian CLI." && exit 0
  echo "Obsidian CLI exists, but the plugin disable/enable cycle failed. Obsidian may not be running with this vault open, the CLI may not be enabled, or Relay may need manual activation." >&2
fi
echo "In Obsidian, disable then re-enable Relay in Community plugins (or run 'Reload app without saving' from the command palette)."
```

### Roll back an agent install

If the direct agent install is not usable, restore the files from `<vault>/.obsidian/.relay-beta-backups/system3-relay-<timestamp>/` back into `<vault>/.obsidian/plugins/system3-relay/`. Run the commands below for the timestamp you want to restore, skipping any file the backup directory does not contain:

```bash
BACKUP_DIR="<vault>/.obsidian/.relay-beta-backups/system3-relay-<timestamp>"
PLUGIN_DIR="<vault>/.obsidian/plugins/system3-relay"

[ -f "$BACKUP_DIR/main.js" ]       && cp "$BACKUP_DIR/main.js"       "$PLUGIN_DIR/main.js"
[ -f "$BACKUP_DIR/styles.css" ]    && cp "$BACKUP_DIR/styles.css"    "$PLUGIN_DIR/styles.css"
[ -f "$BACKUP_DIR/manifest.json" ] && cp "$BACKUP_DIR/manifest.json" "$PLUGIN_DIR/manifest.json"
[ -f "$BACKUP_DIR/data.json" ]     && cp "$BACKUP_DIR/data.json"     "$PLUGIN_DIR/data.json"
```

After restoring, disable then re-enable Relay in Community plugins, or run `Reload app without saving`, so Obsidian picks up the previous code.

<h2 id="manual-install-use-brat">Manual install: use BRAT</h2>

BRAT (Beta Reviewer's Auto-update Tool) is an Obsidian plugin that can side-load other plugins. Use BRAT if you want to install the beta yourself from inside Obsidian.

1. In Obsidian, open Settings -> Community plugins.
2. Browse for `BRAT` and install it.
3. Enable BRAT.
4. Open the command palette. On macOS, press `Command-P`. On Windows or Linux, use your command palette shortcut.
5. Run `BRAT: Plugins: Add a beta plugin with frozen version based on a release tag`.
6. Enter:
   - Repository: `No-Instructions/Relay`
   - Release version tag: <code id="latest-relay-beta-tag">checking latest beta...</code>
   - Enable after installing: checked
7. Click `Add Plugin`.
8. Reload Obsidian, or disable and re-enable Relay in Community plugins.

The release tag is pinned. To move to a newer Relay beta later, repeat these steps with the newer release tag.

If the latest tag does not load here, open [Relay releases](https://github.com/No-Instructions/Relay/releases) and choose the newest non-draft prerelease tag ending in `-rcN`, such as `0.8.0-rc11`.

## Report problems

Use the Obsidian command `Relay: Send bug report` when available. If that does not work, post in the `new-sync-beta` channel in the [Relay Discord](https://discord.relay.md).

<script>
(() => {
  const payload = document.getElementById('relay-agent-instructions');
  const buttons = Array.from(document.querySelectorAll('[data-copy-relay-agent-instructions]'));
  const latestTag = document.getElementById('latest-relay-beta-tag');

  const releasesUrl = 'https://api.github.com/repos/No-Instructions/Relay/releases?per_page=50';
  const requiredAssets = ['main.js', 'styles.css', 'manifest-beta.json'];
  const rcTagPattern = /^[0-9]+\.[0-9]+\.[0-9]+-rc[0-9]+$/;

  function chooseLatestBeta(releases) {
    return releases.find((release) => {
      if (release.draft || !release.prerelease) return false;
      if (!rcTagPattern.test(release.tag_name)) return false;
      const assetNames = new Set((release.assets || []).map((asset) => asset.name));
      return requiredAssets.every((name) => assetNames.has(name));
    });
  }

  if (latestTag) {
    fetch(releasesUrl, { headers: { Accept: 'application/vnd.github+json' } })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
        return response.json();
      })
      .then((releases) => {
        const latest = chooseLatestBeta(releases);
        if (!latest) throw new Error('No valid beta release found');
        latestTag.textContent = latest.tag_name;
      })
      .catch(() => {
        const fallback = document.createElement('span');
        fallback.textContent = 'open Relay releases and choose the newest -rcN tag';
        latestTag.replaceWith(fallback);
      });
  }

  if (!payload || buttons.length === 0) return;

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const temp = document.createElement('textarea');
    temp.value = text;
    temp.setAttribute('readonly', '');
    temp.style.position = 'fixed';
    temp.style.left = '-9999px';
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
  }

  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const status = button.parentElement.querySelector('.copy-agent-status');
      try {
        await copyText(payload.value.trim() + '\n');
        if (status) status.textContent = 'Copied.';
      } catch {
        if (status) status.textContent = 'Copy failed. Select the agent instructions below instead.';
      }
    });
  });
})();
</script>
