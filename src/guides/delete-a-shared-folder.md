---
title: Delete a Shared Folder
description: Remove a local folder or remove a Shared Folder from a Relay Server.
layout: doc.njk
---

Relay gives you separate controls for deleting a folder and its files from your filesystem and removing a Shared Folder from a Relay Server. Choose the action for the copy you want to remove.

| What you want to remove | What gets deleted | What stays |
| --- | --- | --- |
| [Local folder and its files](#delete-the-folder-from-your-vault) | The folder and its files move to trash. Its local Relay metadata is deleted. <!-- OPEN — running-plugin root-deletion path traced in 0.8.12; physical persistence cleanup completion and collaborator behavior not runtime-verified. --> | The server copy and collaborators’ copies. |
| [Shared Folder on the Relay Server](#delete-the-folder-from-a-relay-server) | The server’s Shared Folder record, for all members. <!-- OPEN — 0.8.12 source-only; backend byte retention and peer transition timing unverified. --> | Files already downloaded to your devices and collaborators’ devices. |

## Preserve changes you need

Before deleting a local folder, save a separate copy of any notes you need to keep. Include changes that haven’t synced. A download from the Relay Server cannot supply changes that never reached it.

Before deleting the server’s Shared Folder, coordinate with your collaborators and keep the copies you need.

## Open the Shared Folder’s settings

1. Open Obsidian’s [command palette](https://obsidian.md/help/plugins/command-palette) and run **Relay: Open settings**.
2. Under **My vault**, select the gear icon beside the Shared Folder.
3. Check the folder name before choosing a deletion action below.

<figure>
  <img src="/assets/delete-a-shared-folder/my-vault-gear.png" width="848" height="354" alt="My vault lists Shared Folders with a gear icon at the right of each row." loading="lazy">
  <figcaption>Select the gear icon beside the folder you want to manage.</figcaption>
</figure>
<!-- MEASURED — Air94 native UI screenshot; disk bundle matched release 0.8.12, loaded script hash differs and equivalence is unestablished. Controls only. SHA256 5835354f101d1bf6aba9fe6f66f1af4dec4ec977284d2e18b5cbe0ca2dcdea27. -->

On desktop, you can also right-click the folder in Obsidian’s file explorer and choose **Relay: Local folder settings**. <!-- OPEN — command and My vault gear route traced in release 0.8.12; mobile runtime not yet verified. -->

If the folder is only on the Relay Server, select the server under **Relay Servers**, then select the Shared Folder.

The available controls depend on whether the folder is on a Relay Server you can access and which role you have. <!-- OPEN — 0.8.12 main.ts local settings route and PluginSettings.svelte:105–125 select remote or local settings; no claim all three controls appear together. -->

## Three ways to delete

### Delete the folder from your vault

Use this action to remove the entire local Shared Folder while keeping its copy on the remote Relay Server.

In **Danger zone**, find **Delete from vault** and click **Move to trash**. <!-- OPEN — 0.8.12 UI-to-event source path; complete local persistence cleanup unmeasured. -->

<figure>
  <img src="/assets/delete-a-shared-folder/danger-zone.png" width="848" height="516" alt="Danger zone settings: Delete from Relay Server beside Remove from Relay Server, and Move to trash beside Delete from vault." loading="lazy">
  <figcaption>To delete the local folder and its files, use Move to trash beside Delete from vault.</figcaption>
</figure>
<!-- MEASURED — native control screenshot, Air94 assigned test app 9411, 2026-09-17; on-disk Relay 0.8.12 verified; loaded script hash differs and exact equivalence is unestablished. Controls only; no deletion performed. SHA256 d5763cc76b979cba40238c91958ff79ec2e0cbc0d77b36575131fb087a71760f. -->

To download the server copy again, follow [Add the Shared Folder to your vault](/guides/invite-a-collaborator/#3-add-the-shared-folder-to-the-vault).

### Delete the folder from a Relay Server

You must have the Owner role to delete the Shared Folder from the Relay Server. If you’re not an Owner, ask an Owner to delete it for you. <!-- REPORTED — Owner wording supplied by Matt in editorial review; source checks folder/delete permission dynamically. Exact server/folder role scope not independently verified in this audit. -->

This removes the Shared Folder from the Relay Server for everyone. Files already downloaded to your machines and your collaborators’ machines stay there. <!-- OPEN — source/UI contract, not a cross-client runtime measurement. -->

In **Danger zone**, find **Remove from Relay Server** and click **Delete from Relay Server**.

<figure>
  <img src="/assets/delete-a-shared-folder/danger-zone.png" width="848" height="516" alt="Danger zone settings with Delete from Relay Server beside Remove from Relay Server in the upper row." loading="lazy">
  <figcaption>To remove the shared server copy, use Delete from Relay Server beside Remove from Relay Server.</figcaption>
</figure>
<!-- MEASURED — same Air94 native controls screenshot as local-removal section; controls only, no deletion performed. Disk bundle matched 0.8.12; loaded-script equivalence unverified. -->


To check the result, confirm that the folder no longer appears among that server’s Shared Folders.

### Stop tracking the folder with Relay

To return the folder to a regular local folder, delete its local Relay metadata.

Relay uses that metadata to keep the folder in sync. To delete it, first remove the folder from the Relay Server. That stops sharing the folder with everyone and leaves your local files in place. You can then use **Delete metadata** in the local folder settings. Your folder is now a regular local folder, and Relay no longer tracks it. <!-- OPEN — source-supported sequence: release22c2aa8 ManageRemoteFolder.handleDeleteRemote clears remote and dispatches manageSharedFolder; ManageSharedFolder exposes Delete metadata. Transition and metadata cleanup not runtime-verified. -->

## Delete notes and subfolders inside a Shared Folder

Deleting notes or subfolders inside a Shared Folder also deletes them from collaborators’ copies when the deletion syncs. Deleting a subfolder includes the shared files and subfolders inside it. <!-- OPEN — release 0.8.12 shared membership deletion source-verified; cross-client deletion not measured in this audit. -->

If you delete all the notes inside a Shared Folder, those deletions sync too. Emptying the folder is not the same as removing your local copy of it.

To remove the entire Shared Folder from your filesystem while keeping the server copy and collaborators’ copies, follow [Delete the folder from your vault](#delete-the-folder-from-your-vault). <!-- OPEN — running-plugin root-removal path source-verified; complete persistence cleanup and collaborator behavior unmeasured. -->

## Recover a deleted local folder

If the folder is still in the trash, restore its files using [Obsidian’s guidance for deleted files](https://obsidian.md/help/manage-notes#Delete+a+note). You can also restore files from a backup.

If the Shared Folder is still on the Relay Server, you can [download it again](/guides/invite-a-collaborator/#3-add-the-shared-folder-to-the-vault). Changes that never synced must come from your trash copy or backup.

## Related guides

- [Back up your vault](/guides/backing-up-your-obsidian-vault/).
- [Resolve local conflicts](/guides/resolve-local-conflicts/).
