---
title: Using Relay with other sync services
description: How to safely use Relay alongside other sync services like Obsidian Sync, iCloud, and Dropbox.
layout: doc.njk
---
You cannot use Relay on the **same content** as other sync services like Obsidian Sync, iCloud, Dropbox, or Google Drive. If these services compete over the same content, you are likely to get conflicts and data loss.

You **can** use multiple sync services in the same vault as long as they are working in different parts of the vault.

This is the same requirement imposed by any sync service, including Obsidian Sync.

## The rule: no double coverage

**Safe setup:**
- Use Relay for the shared project folders where you need true [multiplayer](/how-relay-works/real-time-multiplayer-vs-repurposed-file-sync/)
- For everything else that you want to sync between devices, use whatever sync service you want, including Relay (just set up a separate Relay Server), Obsidian Sync, or iCloud, etc. If using something other than Relay, make sure to exclude the Relay-covered folders from this service
- Double-check to make sure no folder or file is handled by both services

**Dangerous setup:**
- Running a file sync service like Obsidian Sync on your entire vault, and running Relay on a folder within that vault ❌ (double coverage)

## How to set this up safely

### If you're adding Relay to a vault already synced by a device sync service like Obsidian Sync

1. **Choose which folders will use Relay** - typically project or team folders
2. **Add those folders to your Relay Server** as Shared Folders
3. **Exclude those folders from your existing sync service**:
   - [Obsidian Sync exclusions](https://help.obsidian.md/sync/settings#Exclude+a+folder+from+syncing)
   - [iCloud exclusions](https://support.apple.com/guide/mac-help/exclude-files-from-icloud-drive-mchl97c93511/mac)
   - Check your sync service's documentation for folder exclusion steps

### If you're not already using a device sync service

1. Consider using Relay for your entire vault
2. If you prefer two services, make sure to set up exclusions to abide by the 'no double coverage' rule:
	1. **Exclude your Relay shared folders** from the new sync service before enabling it

## Signs you have a sync service collision

The most common symptom is **missing contributions**:
- You open a note that should have content, but it's blank
- A note has reverted to an old version, losing recent changes
- Content you or collaborators added has disappeared

You may also see Relay's conflict resolution banner asking you to resolve merge conflicts.

## What to do if you're already in conflict

1. **Stop the conflict immediately**: Exclude your Relay folders from the other sync service
2. **Check your files**: Open shared documents and look for missing content or unexpected changes
3. **If you see conflicts**: Use conflict resolution and version history tools:
	1. Use Relay's diff resolution tool, if presented.
	2. Use Obsidian's built-in `File recovery` tool (independent of Obsidian Sync. See docs: https://help.obsidian.md/plugins/file-recovery)
	3. Use your other sync service's version history tool (eg, [here's documentation for Obsidian Sync's](https://help.obsidian.md/Obsidian+Sync/Version+history))
4. **If content is missing**: Check if you have recent backups from before the conflict started. Use Obsidian's built-in `File recovery` tool (https://help.obsidian.md/plugins/file-recovery).

## Why this happens

Different sync services use different approaches to handle simultaneous changes. When two services try to sync the same files, they can get overwrite each other's changes or create race conditions that result in data loss.

Each sync service assumes it's the authoritative source for your files. Running multiple services on the same content violates this assumption and creates unpredictable behavior.

## Need help?

Join the [Relay Discord](https://discord.relay.md) for support.
