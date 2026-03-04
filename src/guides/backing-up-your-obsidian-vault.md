---
title: Backing up your Obsidian vault
description: How to set up backups for an Obsidian vault that uses Relay, and what recovery options are available.
layout: doc.njk
---
Relay syncs your Shared Folders. It does not back them up. For recovery from changes you might not notice until later — a restructured folder, lost metadata, a bulk edit — you need an independent backup with version history.

## The requirement: versioned history

A backup that keeps only the current version of each file is not sufficient. If a change propagates before you notice it, your backup reflects the changed state and the prior version is no longer available.

Your backup system must retain file history. Git and versioned cloud backup tools retain history. A file sync service like iCloud or Dropbox (without version history enabled) does not.


## What to back up

Back up your vault directory. No special exclusions are needed — Relay does not create lock files or temp files inside the vault.

## Recommended approach

### Git (Obsidian Git plugin)

The [Obsidian Git plugin](https://github.com/Vinzent03/obsidian-git) commits your vault to a git repository on a schedule. Git retains full file history and can restore any file to any prior state. Configure the plugin to auto-commit every 5 minutes.

Git works alongside Relay without interference. Relay does not create files that would pollute git history.

**Remote push — should you?**

Pushing to a remote (GitHub, GitLab, a self-hosted server) gives you an offsite backup in addition to local version history. The trade-off: your vault content is now on another surface. If your vault contains sensitive personal notes, client work, or anything you would not want on a third-party server, use a private repository, a self-hosted git server, or skip remote push and keep history local only.

Local-only git still satisfies the version history requirement — you lose the offsite copy but keep the history.

## Recovery options

| Situation | Recovery path |
|-----------|---------------|
| Note was overwritten or cleared | [Obsidian file recovery](https://help.obsidian.md/plugins/file-recovery) (Settings → Core plugins → File recovery), or git history |
| Note was deleted | Check Obsidian's `.trash` folder, Obsidian file recovery, or git history |
| Multiple notes lost | Git history |
| Fresh install | Sign in to Relay and rejoin Shared Folders — Relay re-downloads current state automatically |

**[Obsidian file recovery](https://help.obsidian.md/plugins/file-recovery)** saves snapshots of your files on a schedule and can restore a note to a recent prior state.

**Git history** is the most reliable recovery path. `git log` shows every commit; `git checkout <hash> -- path/to/file.md` restores any file to any prior state.

**`.trash` folder** (`<vault>/.trash/`) contains files deleted through Obsidian's trash function.

## Compatibility with other sync services

Do not run another sync service (iCloud, Dropbox, Obsidian Sync) on the same content as Relay. Two services competing over the same files will cause conflicts and data loss. See [Using Relay with other sync services](/guides/using-relay-with-other-sync-services/) for details.

A backup tool is different from a sync service. Git captures state on a schedule and retains history. It does not compete with Relay over live file writes.

## Need help?

Join the [Relay Discord](https://discord.relay.md) for support.
