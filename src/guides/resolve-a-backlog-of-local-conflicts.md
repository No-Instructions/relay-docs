---
title: Resolve a backlog of local conflicts
description: Clear accumulated conflicts exposed by the move from Relay’s old sync engine to the new sync engine in 0.8.12, while preserving unsynced local edits.
layout: doc.njk
---

Moving from Relay’s old 0.7.x sync engine to the [new sync engine released in 0.8.12](https://relay.md/updates/relay-0-8-12) can reveal pre-existing unresolved [local conflicts](/guides/resolve-local-conflicts/). This guide will help you choose an approach and clear the backlog.

The migration cleanup is expected to be a one-time process; frequent new conflicts afterward should be investigated.

<span id="before-you-start"></span>

## Before you start: backups

Have backups in place so you can recover from accidental edits or deletions. We recommend Git for version history, with a remote such as GitHub for an offsite copy. If you haven’t set this up, follow [Back up your Obsidian vault](/guides/backing-up-your-obsidian-vault/).

Before cleaning up a device, check that its latest local edits are included in your backup. A fresh download contains the server’s copy, so edits that haven’t synced up must be recovered from that device’s backup.

Make sure the affected devices have moved to the new engine in Relay 0.8.12 or later; see [Update Relay](/guides/update-relay/) for the plugin steps. Also [update Obsidian and its installer](https://obsidian.md/help/updates): the desktop app and installer have separate versions, and updating the app alone does not update the installer.

If you work with collaborators, agree on a time to do the cleanup and ask them to pause edits to the affected folder. Include any unsynced changes on their devices before deciding which contents to keep.

## Choose how to work through the backlog

Start by reviewing and resolving the conflicts. You can do this yourself or with an agent’s help, keeping useful changes from either version without replacing the Shared Folder. Follow [Resolve local conflicts](/guides/resolve-local-conflicts/) for the steps, or use the agent workflow below.

If you know one copy already contains everything you want to keep, you can choose an alternative:

- **Use the server’s copy:** [Download the Shared Folder again](#download-the-shared-folder-again). Any local edits that haven’t synced up will need to be recovered from your backup afterward.
- **Use a local copy:** [Start a new Shared Folder from those files](#start-a-new-shared-folder-from-local-files). Every collaborator and device will need to add the replacement and start syncing it. After checking that the replacement works, delete the old Shared Folder from the server, then archive or delete its local copies.

If both versions contain changes you need, or you’re unsure which copy is complete, review the conflicts rather than replacing either copy wholesale. Check each affected device separately; resolving a conflict on one device does not resolve the others’ local conflicts.

## Review conflicts with an agent

The [Relay agent skills](https://github.com/No-Instructions/relay-skills) provide a workflow for listing conflicts, reading the competing versions, resolving notes, and checking the result. They require desktop Obsidian with its command line interface enabled and the affected vault open. The repository includes installation instructions.

Ask your agent to produce a diagnostic report before it makes any changes. If you want it to resolve conflicts too, review the proposed text first and leave ambiguous choices unresolved. The resolution skill has known issues with identifying which version is which, so compare the actual contents before approving a change. Afterward, have the agent check that the notes contain the intended text.

Give your agent the following request, replacing the vault name:

> Use the Relay conflict-resolution skill to inspect conflicts in VAULT NAME. Start by listing the affected notes and explaining the differences. Preserve my backup. Before changing notes, show me which complete text you propose to keep or merge. Leave ambiguous choices for me. Verify that the resulting text matches the changes I approved. Report anything still unresolved.

## Download the Shared Folder again

If you have many conflicts and want to use the server’s copy instead of resolving each note individually, you can remove this device’s copy and download it again.

1. Make sure your [backup](/guides/backing-up-your-obsidian-vault/) includes the latest contents of the local folder, including edits that haven’t synced up.
2. [Remove the Shared Folder from this device](/guides/delete-folders-and-notes/#remove-this-devices-copy-of-the-shared-folder). Leave the server's copy intact.

   Do not use *Delete from Relay Server* — that option removes the Shared Folder from the server. Use **Delete from vault** for this procedure.

3. [Add the same Shared Folder back to your vault](/guides/invite-a-collaborator/#3-add-the-shared-folder-to-the-vault). Open it from its Relay Server, click **Add to vault**, check the folder name and location, then click **Confirm**.
4. Wait for synchronization to finish, then open several downloaded notes and compare them with your backup. Recover any missing local edits selectively; copying the entire backup over the downloaded folder can replace collaborators’ changes.

Complete the sequence for one folder on one device at a time.

## Start a new Shared Folder from local files

If the local folder has everything you want to keep, you can use it to create a new Shared Folder instead of resolving the conflicts in the old one. Each collaborator and device will need to add the new Shared Folder; they won’t switch over automatically.

1. **Make a complete copy of the folder on your local disk.** Give the copy a different name and place it in your vault, outside any existing Shared Folder. Leave the original folder in place.
2. **Make the copy a Shared Folder.** Follow [Share a folder](/guides/share-a-folder/) to share the copied folder on your Relay Server. Set up private access again if needed.
3. **Have everyone add the new Shared Folder.** Each collaborator and device must [add that same new Shared Folder to their vault](/guides/invite-a-collaborator/#3-add-the-shared-folder-to-the-vault), including your other devices. Share the copy only once; everyone else adds it from the server.
4. **Check that the new Shared Folder works.** Compare its notes and attachments with your backup, then confirm that edits sync between collaborators and devices. Check the replacement on every device before retiring the old folder.
5. **Retire the old Shared Folder.** Once everyone has checked the replacement, [delete the old Shared Folder from the Relay Server](/guides/delete-folders-and-notes/#end-collaboration-on-this-shared-folder-for-everyone). Then, on every device, archive or delete the old local folder.



## Related guides

- [Troubleshooting local conflicts](/guides/resolve-local-conflicts/#troubleshooting)
- [Resolve local conflicts](/guides/resolve-local-conflicts/)
- [Back up your Obsidian vault](/guides/backing-up-your-obsidian-vault/)
- [Delete a Shared Folder](/guides/delete-folders-and-notes/)
- [Share a folder](/guides/share-a-folder/)
- [Invite a collaborator](/guides/invite-a-collaborator/)
