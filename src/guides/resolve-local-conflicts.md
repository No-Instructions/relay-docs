---
title: Resolve local conflicts
description: Resolve local conflicts between a note on disk and Relay’s local CRDT record.
layout: doc.njk
---

Relay automatically combines collaborators’ edits to a shared note. A local conflict is different: the file on your local disk has diverged from Relay’s local [CRDT record](/how-relay-works/real-time-multiplayer-vs-repurposed-file-sync/#how-relay-solves-this) — the version it maintains for collaborative editing — and Relay needs your help reconciling the contents.

When another editor, an agent, or a script changes a file on disk, Relay sees the changed text rather than the individual editing steps. Relay usually merges those changes automatically, but when it cannot reconcile them, you need to choose what to keep.

These conflicts were more common with the old sync engine in Relay 0.7.x and earlier. They are much less common with the [new sync engine released in 0.8.12](https://relay.md/updates/relay-0-8-12), which automatically picks up and merges changes on disk.

<span id="preserve-your-local-edits"></span>

## Before you start: backups

Before resolving conflicts, make sure your [backup system](/guides/backing-up-your-obsidian-vault/) has a recent copy of the affected folder, including any local edits that haven’t synced. Keep that version available until you’ve checked the result. If you don’t have a backup system in place, make a one-off copy of the folder somewhere outside Relay’s Shared Folders.

## Find the affected notes

Relay shows a warning when you open a note with a local conflict. You can follow that warning, or use the Sync status sidebar to look for other notes that need attention.

### Open the conflict in the current note

If the note you’re reading has a local conflict, click its **Merge conflict -- click to resolve** banner to open **File diff**.

<figure style="margin:1.25rem 0">
  <img src="/assets/resolve-local-conflicts/banner.png" alt="The purple Merge conflict -- click to resolve banner appears above the open note." width="832" height="400" style="display:block;width:100%;max-width:416px;height:auto;margin:0 auto">
</figure>

### Find other notes with conflicts

To look for conflicts across a Shared Folder:

1. Open Obsidian’s [command palette](https://obsidian.md/help/plugins/command-palette) (**Cmd+P** on Mac, **Ctrl+P** on Windows/Linux).
2. Run **Relay: Show sync status: [folder name]**.
3. In the **Sync status** sidebar, look under **Conflicts** and click a note’s name.
4. Click the banner in that note to open **File diff**.

<figure style="margin:1.25rem 0">
  <img src="/assets/resolve-local-conflicts/sidebar.png" alt="Relay’s Sync status sidebar lists Keep local edits under Conflicts (1), with Open to resolve beneath the name. The folder heading also says Synced." width="600" height="600" style="display:block;width:100%;max-width:300px;height:auto;margin:0 auto">
  <figcaption>The folder’s Synced heading does not mean its listed conflicts are resolved. Check the Conflicts section.</figcaption>
</figure>

<span id="work-through-a-migration-backlog"></span>

> **Many conflicts after moving to the new sync engine?** If you moved from the old sync engine to the new sync engine in Relay 0.8.12, see [Resolve a backlog of local conflicts](/guides/resolve-a-backlog-of-local-conflicts/) for help clearing the one-time backlog while preserving local edits.

## Read the competing versions

File diff shows two versions of the note. In Relay 0.8.12, **Local file** means the contents on disk, and **Remote** means the remote CRDT record. **Local** can mean either the local CRDT record or the contents on disk, depending on how Relay detected the conflict. Read the text on both sides before choosing what to keep.

Read the highlighted text before choosing. A note you never opened on this device can still contain local differences worth keeping. If a label seems inconsistent with the text you recognize, compare the actual text with your backup before proceeding.

<figure style="margin:1.25rem 0">
  <img src="/assets/resolve-local-conflicts/differ.png" alt="File diff shows whole-note choices at the top and separate choices above a highlighted block. The Remote text says to review the shared copy; the Local text says to recover missing edits one note at a time." width="784" height="572" style="display:block;width:100%;max-width:392px;height:auto;margin:0 auto">
  <figcaption>In this example, Remote is the upper text and Local is the lower text. Read the labels and contents in your own conflict.</figcaption>
</figure>

## Choose a complete version

If one version already contains everything you want, use the controls at the very top of **File diff**. You do not need to select every changed block separately.

In the example above, **Keep Remote Contents** keeps the complete Remote version. **Accept All from Local** keeps the complete Local version. The wording follows the versions being compared; another conflict can show **Local file** instead.

<img src="/assets/resolve-local-conflicts/whole-file-controls.png" alt="Whole-note choices: Keep Remote Contents and Accept All from Local." width="512" height="56" style="display:block;width:100%;max-width:358px;height:auto;margin:0 auto">

After choosing, Relay returns to the note. Read the result and check that the intended text is present. Then check the folder’s **Conflicts** list again. A cleared warning alone does not prove you kept the right content.

## Combine changes within a note

The controls immediately above a highlighted block apply to that block:

| Control | Result |
| --- | --- |
| **Accept Top** | Keep the upper version of the changed block. |
| **Accept Bottom** | Keep the lower version of the changed block. |
| **Accept All** | Keep both versions of this block, upper text followed by lower text. |
| **Accept None** | Remove both versions of the changed block. |

**Accept All** within a block combines its two texts. **Accept All from Local** at the top of the view selects one complete version of the note. Check which control you are using.

Review the resulting wording, especially if keeping both versions repeats a sentence or leaves contradictory instructions. Then check that the intended text is present and revisit the folder’s **Conflicts** list. Check other affected devices separately: each can have its own local differences.

## Other recovery options

### Get help from an agent

The [Relay agent skills](https://github.com/No-Instructions/relay-skills) let your agent inspect sync status, list conflicts, and compare note contents. The repository includes installation instructions and requirements for using the skills with Obsidian on desktop.

Ask your agent to produce a diagnostic report before it makes any changes.

If you want your agent to resolve the conflicts too, ask it to show you the proposed changes first and leave ambiguous choices for you. Afterward, have it verify that the notes contain the intended text. The resolution skill has known issues with identifying which version is which, so review the actual text before approving a change.

### Download the existing Shared Folder again

If you want to recover from the server’s copy, follow [Download the Shared Folder again](/guides/resolve-a-backlog-of-local-conflicts/#download-the-shared-folder-again). Check that your backup includes local edits first: anything that never reached the server must be recovered from the backup afterward.

This removes and re-adds the local copy of the same Shared Folder. It does not create a replacement folder or delete the folder from the Relay Server.

<span id="get-help-with-recurring-conflicts"></span>

## Troubleshooting

If conflicts keep returning, check whether another sync service also manages the same content. See [Using Relay with other sync services](/guides/using-relay-with-other-sync-services/) for configuration guidance.

If conflicts continue, contact us in the [Relay Discord](https://discord.relay.md). Include your Relay and Obsidian versions, the affected operating systems, and any other sync services managing the folder. Describe one note’s conflict, the choice you made, and what happened afterward. If an external editor or agent changed the file, include that context too. Screenshots are very helpful for resolving the issue quickly.

## Related guides

- [Resolve a backlog of local conflicts](/guides/resolve-a-backlog-of-local-conflicts/)
- [Back up your Obsidian vault](/guides/backing-up-your-obsidian-vault/)
- [Using Relay with other sync services](/guides/using-relay-with-other-sync-services/)
- [How Relay combines collaborators’ edits](/how-relay-works/real-time-multiplayer-vs-repurposed-file-sync/#how-relay-solves-this)
