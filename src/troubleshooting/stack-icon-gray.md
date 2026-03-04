---
title: Stack icon is gray
description: How to fix a gray Relay stack icon and restore change tracking.
layout: doc.njk
---
If your [stack icon](/user-interface/icons/) is gray, Relay cannot track changes properly. This means your edits won't sync to collaborators and you won't receive their updates.

If you continue editing while the stack icon is gray, you'll likely see merge conflicts when Relay reconnects because it will detect mismatches between your editor and the local database.

## What the gray stack icon means

The stack icon shows whether Relay is successfully tracking changes to the current note as CRDT updates. When it's gray, something has gone wrong with the local change tracking system.

Relay works by keeping three things in sync:
- The content in your Obsidian editor
- The content stored on your hard disk
- The content in your local CRDT update database

When these fall out of sync, the stack icon turns gray to alert you.

## Common causes

1. Outdated software versions (Relay, Obsidian, or Obsidian installer)
2. File sync conflicts between different services
3. Other plugins interfering with file operations

## Solutions to try

Work through these steps in order. Most problems resolve with the earlier steps.

### 1. Check for updates (try this first)

Outdated software is the most common cause and best-bet way to resolve tracking issues. Update all three components:

**Update Relay:**
1. Go to Obsidian Settings → Community plugins
2. Find Relay and check if there's an update available
3. If so, click Update
4. Latest version always listed at https://relay.md/relay/releases

**Update Obsidian app:**
1. Go to Settings → General
2. Select "Check for updates"
3. If updates are available, select "Relaunch" to apply them
4. See [Obsidian's update guide](https://help.obsidian.md/Getting+started/Update+Obsidian) for detailed instructions

**Update Obsidian installer (Electron):**
1. Go to Settings → General
2. Select "Check for updates"
3. If updates are available for the Installer, you will need to download and install outside of Obsidian.

To update the installer:
1. Navigate to [obsidian.md/download](https://obsidian.md/download)
2. Select the "Download" button
3. Close Obsidian if it's currently open
4. Run the installer (you don't need to uninstall first)
5. This updates the Electron framework and may be required for newer plugins or features

After updating, restart Obsidian completely and check if the stack icon is now colored.

### 2. Check sync service conflicts

If you're using other sync services (Obsidian Sync, iCloud, Dropbox, etc.), make sure they're not syncing the same folders as Relay. This can cause file conflicts that break tracking.

See our guide on [Using Relay with other sync services](/guides/using-relay-with-other-sync-services/) for setup instructions.

### 3. Check for conflicting plugins

Some plugins can interfere with Relay's tracking.

This includes plugins that have a special view, like Kanban, and plugins (or custom functions) that update note content automatically — such as if you have a plugin that updates frontmatter with the note's last updated date.

1. Identify any such plugins
2. Try disabling them
3. Check if the stack icon becomes colored
4. If not, try disabling ALL other plugins
5. Check if the stack icon becomes colored

### 4. Reload Relay

1. Open the command palette (`Cmd+P` on Mac, `Ctrl+P` on Windows/Linux)
2. Run `Relay: Reload Relay`
3. Check if the stack icon becomes colored

### 5. Reload Obsidian

1. Open the command palette (`Cmd+P` on Mac, `Ctrl+P` on Windows/Linux)
2. Run `Reload app without saving` (Obsidian saves automatically many times per minute)
3. Check if the stack icon becomes colored

### 6. Check authentication

1. Click the Relay ribbon icon to open Relay settings
2. If not signed in, log in
3. If you have multiple accounts, make sure you're using the right one
4. Even if auth looks fine, sometimes logging out and logging back in can resolve a silent authentication issue
5. Check if the stack icon becomes colored

### 7. Toggle syncing

**For the individual note:**
1. Click the satellite icon in the note (top right)
2. It should toggle from colored to gray
3. Click it again to toggle back to colored

**For the folder:**
1. Right-click the shared folder in the left panel
2. Select `Disconnect`
3. Right-click again and select `Connect`

### 8. Restart Obsidian completely

1. Quit Obsidian entirely (not just close the window)
2. Restart Obsidian
3. Check if the stack icon becomes colored

### 9. Disable and re-enable Relay

1. Go to Obsidian Settings → Community plugins
2. Find Relay and toggle it off
3. Wait a few seconds, then toggle it back on
4. Check if the stack icon becomes colored

### 10. Restart your machine

Sometimes system-level issues can affect file tracking. Restart your computer and try again.

## If you still need help

If none of these steps resolve the issue:

1. Use the command palette to run `Relay: Send bug report`
2. Join the [Relay Discord](https://discord.relay.md) for hands-on support

When reporting the issue, include:
- Your versions of Relay, Obsidian, and operating system
- Screenshots of the gray stack icon
- What you were doing when the problem started
- Whether it affects all notes or just specific ones
- Any error messages you've seen
