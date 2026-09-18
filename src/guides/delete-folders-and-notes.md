---
title: Delete Shared Folders, notes, or subfolders
description: Remove a device’s copy, end collaboration on a Shared Folder, or delete shared notes and subfolders.
layout: doc.njk
---

Choose whether to remove this device’s copy of a Shared Folder, end collaboration on it for everyone, or delete notes and subfolders inside it.

| What you want to do | What gets deleted | What stays |
| --- | --- | --- |
| [Remove this device’s copy of the Shared Folder](#remove-this-devices-copy-of-the-shared-folder) | The folder and its files move to trash. Its local Relay metadata is deleted.  | The server copy and collaborators’ copies. |
| [End collaboration on this Shared Folder for everyone](#end-collaboration-on-this-shared-folder-for-everyone) | The Shared Folder is deleted from the Relay Server for all members.  | Local files and local metadata on all devices. Only server copies are deleted. |
| [Delete notes or subfolders inside the Shared Folder](#delete-notes-or-subfolders-inside-the-shared-folder) | The selected notes or subfolders and their contents. These deletions sync to collaborators. | The Shared Folder and its remaining contents. Collaboration on those contents continues. |

## Before you start: backups

Make sure your [backup system](/guides/backing-up-your-obsidian-vault/) is working and includes any unsynced changes you want to keep.

Before ending collaboration on a Shared Folder, coordinate with your collaborators so everyone keeps the files they need.

<h2 id="open-the-shared-folders-settings">Open the Shared Folder’s settings</h2>

For either action that removes the whole Shared Folder, start here. To delete notes or subfolders inside it, [go to that section](#delete-notes-or-subfolders-inside-the-shared-folder).

1. Open Obsidian’s [command palette](https://obsidian.md/help/plugins/command-palette) and run **Relay: Open settings**.
2. Under **My vault**, select the gear icon beside the Shared Folder.
3. Double-check the folder name before choosing a deletion action below.

<figure>
  <img src="/assets/delete-a-shared-folder/my-vault-gear.png" width="848" height="354" alt="My vault lists Shared Folders with a gear icon at the right of each row." loading="lazy">
  <figcaption>Select the gear icon beside the folder you want to manage.</figcaption>
</figure>



If the folder is only on the Relay Server, select the server under **Relay Servers**, then select the Shared Folder.


## Choose what to remove

<h3 id="remove-this-devices-copy-of-the-shared-folder">Remove this device’s copy of the Shared Folder</h3>

The server copy remains available. Other devices can continue syncing, and you can add the folder to this device again later.

In **Danger zone**, find **Delete from vault** and click **Move to trash**.

<figure>
  <div style="position:relative">
    <img src="/assets/delete-a-shared-folder/danger-zone.png" width="848" height="516" alt="Shared Folder Danger zone with an arrow pointing to Move to trash." style="display:block;width:100%;height:auto;margin:0" loading="lazy">
    <svg viewBox="0 0 848 516" aria-hidden="true" focusable="false" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none">
      <path d="M 810 459 L 746 459 M 760 448 L 746 459 L 760 470" fill="none" stroke="white" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 810 459 L 746 459 M 760 448 L 746 459 L 760 470" fill="none" stroke="#075ee8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <figcaption>To delete the local folder and its files, use Move to trash beside Delete from vault.</figcaption>
</figure>


To download the server copy again, follow [Add the Shared Folder to your vault](/guides/invite-a-collaborator/#3-add-the-shared-folder-to-the-vault).

### End collaboration on this Shared Folder for everyone

You must have the Owner role to delete the Shared Folder from the Relay Server. If you’re not an Owner, ask an Owner to delete it for you.

This removes the Shared Folder from the Relay Server for everyone. Files already downloaded to your machines and your collaborators’ machines stay there.

In **Danger zone**, find **Remove from Relay Server** and click **Delete from Relay Server**.

<figure>
  <div style="position:relative">
    <img src="/assets/delete-a-shared-folder/danger-zone.png" width="848" height="516" alt="Shared Folder Danger zone with an arrow pointing to Delete from Relay Server." style="display:block;width:100%;height:auto;margin:0" loading="lazy">
    <svg viewBox="0 0 848 516" aria-hidden="true" focusable="false" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none">
      <path d="M 810 233 L 746 233 M 760 222 L 746 233 L 760 244" fill="none" stroke="white" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 810 233 L 746 233 M 760 222 L 746 233 L 760 244" fill="none" stroke="#075ee8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <figcaption>To remove the shared server copy, use Delete from Relay Server beside Remove from Relay Server.</figcaption>
</figure>



To check the result, confirm that the folder no longer appears among that server’s Shared Folders.

#### Optional: stop tracking the local folder

To return the folder to a regular local folder, delete its local Relay metadata.

After removing the Shared Folder from the Relay Server, you can use **Delete metadata** in the local folder settings. This removes the remaining local Relay metadata and leaves your files in place. Your folder is now a regular local folder, and Relay no longer tracks it.

<figure>
  <svg viewBox="70 350 1190 220" role="img" aria-label="Danger zone with an arrow pointing to the Delete metadata button." style="display:block;width:100%;height:auto;overflow:hidden">
    <image href="/assets/delete-a-shared-folder/delete-metadata.png" x="0" y="0" width="1330" height="570"/>
    <path d="M 1180 397 L 1145 476 M 1142 458 L 1145 476 L 1161 465" fill="none" stroke="white" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 1180 397 L 1145 476 M 1142 458 L 1145 476 L 1161 465" fill="none" stroke="#075ee8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <figcaption>Delete metadata in Danger zone.</figcaption>
</figure>

### Delete notes or subfolders inside the Shared Folder

Deleting notes or subfolders inside a Shared Folder also deletes them from collaborators’ copies when the deletion syncs. Deleting a subfolder includes the shared files and subfolders inside it. Collaboration continues on the remaining contents of the Shared Folder.

If you delete all the notes inside a Shared Folder, those deletions sync too. Emptying the folder is not the same as [removing your local copy of it](#remove-this-devices-copy-of-the-shared-folder).

To remove the entire Shared Folder from your filesystem while keeping the server copy and collaborators’ copies, follow [Remove this device’s copy of the Shared Folder](#remove-this-devices-copy-of-the-shared-folder).

## Recover a deleted local folder

If the folder is still in the trash, restore its files using [Obsidian’s guidance for deleted files](https://obsidian.md/help/manage-notes#Delete+a+note). You can also restore files from a backup.

If the Shared Folder is still on the Relay Server, you can [download it again](/guides/invite-a-collaborator/#3-add-the-shared-folder-to-the-vault). Changes that never synced must come from your trash copy or backup.

## Related guides

- [Back up your vault](/guides/backing-up-your-obsidian-vault/).
- [Resolve local conflicts](/guides/resolve-local-conflicts/).
