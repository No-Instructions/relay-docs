---
title: Save attachments next to your notes
description: Change Obsidian's default attachment location so pasted images and other attachments are saved inside your Shared Folder, next to the notes that use them.
layout: doc.njk
---

A shared note can embed an image stored anywhere in your vault, but Relay shares only the files inside the Shared Folder. If Obsidian saves the image to a vault-wide folder such as `Attachments/`, your collaborators receive the note without the image.

Set Obsidian to save new attachments next to the note you're working on, so they land inside the Shared Folder with it.

The file type also has to be one the Shared Folder syncs. Images, PDFs, and other attachments need storage on the folder's Relay Server. File types such as HTML also need **Other files** turned on for the folder on each device. For details, see [Sync non-Markdown files](/guides/sync-non-markdown-files/) and [Storage for shared files](/how-relay-works/attachment-storage/).

## Save attachments in a subfolder next to the note

We recommend this setting. Each folder keeps its attachments in its own subfolder.

1. Open Obsidian settings (the gear icon in the lower left).
2. Select **Files and links**.
3. Under **Default location for new attachments**, select **In subfolder under current folder**.
4. Under **Subfolder name**, enter `Attachments`, or another name you prefer.

<figure>
  <img src="/assets/obsidian-configure-attachments-in-subfolder.png" alt="Obsidian Files and links settings with Default location for new attachments set to In subfolder under current folder and Subfolder name set to Attachments" width="4230" height="2634" loading="lazy">
  <figcaption>Obsidian saves each new attachment in an Attachments subfolder beside the note.</figcaption>
</figure>

For example, if your note is `Projects/Website/meeting-notes.md`, a pasted image is saved to `Projects/Website/Attachments/`. If `Projects` or `Website` is a Shared Folder, the image is inside it and syncs with the note.

## Save attachments in the same folder as the note

If you don't want a separate subfolder, save attachments beside your notes.

1. Open Obsidian settings.
2. Select **Files and links**.
3. Under **Default location for new attachments**, select **Same folder as current file**.

## Move existing attachments into the Shared Folder

The attachment setting applies to new attachments only. To share an attachment that's already outside the Shared Folder, move it in.

To move files faster, assign a hotkey to **Move current file to another folder** in **Settings** > **Hotkeys**.

<figure>
  <img src="/assets/obsidian-hotkey-move-file-to-another-folder.png" alt="Obsidian Hotkeys settings filtered to the Move current file to another folder command, assigned to Command-M" width="4230" height="2634" loading="lazy">
  <figcaption>Search Hotkeys for the move command and assign a key.</figcaption>
</figure>

If you keep attachments in a vault-wide folder on purpose, move each one into the Shared Folder when you want to share it.

## Related guides

- [Share a folder](/guides/share-a-folder/)
- [Collaborate on a Canvas](/guides/collaborate-on-an-obsidian-canvas/)
