---
title: Backing up your Obsidian vault
description: How to set up backups for an Obsidian vault that uses Relay, and what recovery options are available.
layout: doc.njk
---
Relay is not a backup system. Relay syncs your vault in real time — that includes destructive changes. If a note is overwritten with blank content or deleted, that change propagates immediately to all connected devices. An independent backup is the only recovery path.

## The critical failure mode

Real-time sync does not protect against data loss — it accelerates it. When Relay writes a bad file to disk, your backup tool may run afterward and capture the bad state. If your backup keeps only the current version of each file, you have backed up the bad file and lost the prior version.

**The requirement:** your backup system must retain file history, not just the current state.

A backup that keeps only the latest version of each file offers no protection against overwrites. Time Machine, git, and versioned cloud backup tools all retain history. A file sync service like iCloud or Dropbox (without version history) does not satisfy this requirement.

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

### Time Machine (Mac)

Time Machine runs continuously and retains file history. It satisfies the versioned backup requirement without any configuration beyond initial setup. Back up to an external drive or a Time Machine-compatible network drive.

Back up when Obsidian is closed if possible — Relay does not lock files, so backing up while Relay is running is safe, but a closed Obsidian is cleaner. In practice, Time Machine's continuous operation is fine.

### Git (Obsidian Git plugin)

The [Obsidian Git plugin](https://github.com/Vinzent03/obsidian-git) commits your vault to a git repository on a schedule. Git retains full file history and can be pushed to a remote (GitHub, GitLab, a self-hosted server). This satisfies the versioned backup requirement.

Configure the plugin to commit and push on a regular interval. A commit every 30–60 minutes is sufficient for most workflows.

Git works alongside Relay without interference. Relay does not create files that would pollute git history.

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
