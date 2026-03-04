---
title: Backing up your Obsidian vault
description: How to set up backups for an Obsidian vault that uses Relay, and what recovery options are available.
layout: doc.njk
---
Relay is not a backup system. Relay syncs your shared folders in real time. An independent backup with version history is the only recovery path for changes you may not notice until days or months later — a restructured folder, lost metadata, a bulk edit that removed content you needed. Without versioned history, there is nothing to restore from.

## The requirement: versioned history

A backup that keeps only the current version of each file is not sufficient. If a change propagates before you notice it, your backup captures the changed state and the prior version is gone.

Your backup system must retain file history. Time Machine, git, and versioned cloud backup tools retain history. A file sync service like iCloud or Dropbox (without version history enabled) does not.

## What Relay provides

Relay provides per-note change history, accessible via the tracking changes icon (stack of pages icon) on any note in a shared folder. This lets you view and restore prior versions of individual notes.

Relay does not provide:
- Bulk restore across multiple notes
- Server-side version history accessible to users
- Recovery from deleted files (deletions propagate to all collaborators)

## What to back up

Back up your vault directory. No special exclusions are needed. Relay does not create lock files, temp files, or in-progress artifacts inside the vault. All content files are plain Obsidian format — a backed-up `.md` file is a standard markdown file.

Include `.obsidian/plugins/system3-relay/data.json` in your backup. This file stores your shared folder configuration. If it is lost and cannot be restored, you must re-join shared folders using a share key.

## What you do not need to back up

Relay's CRDT state lives in IndexedDB, which is stored outside the vault directory (on macOS, in `~/Library/Application Support/obsidian/IndexedDB/`). A vault backup does not capture this state, and that is fine. When you restore a vault to a fresh Obsidian install and sign in to Relay, it re-syncs automatically from the server to rebuild its internal state.

## Recommended approaches

### Git (Obsidian Git plugin)

The [Obsidian Git plugin](https://github.com/Vinzent03/obsidian-git) commits your vault to a git repository on a schedule. Git retains full file history and can restore any file to any prior state. Configure the plugin to auto-commit every 5 minutes.

Git works alongside Relay without interference. Relay does not create files that would pollute git history.

**Remote push — should you?**

Pushing to a remote (GitHub, GitLab, a self-hosted server) gives you an offsite backup in addition to local version history. The trade-off: your vault content is now on another surface. If your vault contains sensitive personal notes, client work, or anything you would not want on a third-party server, either use a private repository with a provider you trust, a self-hosted git server, or skip remote push and keep history local only.

Local-only git (no remote) still satisfies the version history requirement. You lose the offsite backup.

### Time Machine (Mac)

Time Machine runs continuously and retains hourly snapshots. It is a viable backup for a Mac-only setup. Relay does not lock files, so Time Machine can back up while Obsidian is running.

## Before risky Relay operations

Take a manual backup snapshot before:
- Re-joining a shared folder after a long disconnect
- Initial setup with a large existing vault
- Bulk conflict resolution

Confirm your backup completed before proceeding.

## Recovery options

Use these in order, depending on what happened:

| Situation | Recovery path |
|-----------|---------------|
| Note was overwritten or cleared | Obsidian file recovery (Settings → Core plugins → File recovery), or per-note Relay history via the tracking changes icon |
| Note was deleted locally (not through Relay) | Check Obsidian's `.trash` folder |
| Note was deleted through Relay | Deletion has propagated to all collaborators. External backup (Time Machine or git) is the only path |
| Multiple notes lost | External backup only |
| Fresh install, Relay state missing | Sign in to Relay and rejoin shared folders via share key — Relay re-downloads current state automatically |

**Obsidian file recovery** (Settings → Core plugins → File recovery) maintains a local snapshot history independent of Relay. It can restore a note overwritten recently, but fails if the file was overwritten before you opened Obsidian to check — there may be no prior snapshot.

**Relay per-note history** (tracking changes icon) shows changes made through Relay and can restore an individual note. It cannot restore deleted files.

**`.trash` folder** (`<vault>/.trash/`) contains files deleted locally through Obsidian's trash function. It does not contain files deleted through Relay sync.

## Compatibility with other sync services

Do not run another sync service (iCloud, Dropbox, Obsidian Sync) on the same content as Relay. Two services competing over the same files will cause conflicts and data loss. See [Using Relay with other sync services](/guides/using-relay-with-other-sync-services/) for details.

A backup tool is different from a sync service. Time Machine and git are backup tools — they capture state on a schedule and retain history. They do not compete with Relay over live file writes.

## Need help?

Join the [Relay Discord](https://discord.relay.md) for support.
