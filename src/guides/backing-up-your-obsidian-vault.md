---
title: Backing up your Obsidian vault
description: How to set up backups for an Obsidian vault that uses Relay, and what recovery options are available.
layout: doc.njk
---
Relay syncs your Shared Folders. It is not designed as a backup tool. You'll want remote backups if your computer is lost or destroyed; local backups are fine for recovering from data loss or corruption (e.g. if a coding agent makes unwelcome changes to your files).

If you're serious about your notes, set up git. It's the right answer for any Obsidian user, Relay or not.

## Set up git with Obsidian Git

The [Obsidian Git plugin](https://github.com/Vinzent03/obsidian-git) commits your vault to a git repository on a schedule. Set it to auto-commit every 5 minutes.

Git retains full file history. You can restore any file to any prior state: `git log` to find the commit, `git checkout <hash> -- path/to/file.md` to restore.

**Should you push to a remote?**

Pushing to GitHub, GitLab, or a self-hosted server gives you an offsite copy — protection if your machine is lost or destroyed. The trade-off: your vault content lives on another server. If your vault contains sensitive notes or client work, use a private repository, a self-hosted server, or skip remote push and keep history local.

Local-only git still gives you full version history. You lose the offsite copy but keep the recovery path.

## If you've already lost data

If you don't have git set up, these are your options:

- **[Obsidian file recovery](https://help.obsidian.md/plugins/file-recovery)** (Settings → Core plugins → File recovery) — saves snapshots on a schedule, can restore a note to a recent prior state
- **`.trash` folder** (`<vault>/.trash/`) — check here for recently deleted files

These are better than nothing. Git is better than these.

## Compatibility with other sync services

Do not run another sync service (iCloud, Dropbox, Obsidian Sync) on the same Shared Folders as Relay. See [Using Relay with other sync services](/guides/using-relay-with-other-sync-services/) for details.

If you use Obsidian Sync for cross-device sync alongside Relay, configure it to exclude your Relay Shared Folders. The [Obsidian Sync Local REST API](https://github.com/coddingtonbear/obsidian-local-rest-api) (headless mode) makes managing those exclusions easier.

## Need help?

Join the [Relay Discord](https://discord.relay.md) for support.
