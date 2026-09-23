---
title: Collaborate with Obsidian Bases
description: Share a Base and its notes so your team can work with the same information.
layout: doc.njk
---

Keep your [Base](https://obsidian.md/help/bases) and the notes it uses in a Relay Shared Folder so your team can work with the same information. When someone changes a note’s properties, those changes sync to your collaborators and appear in their Base.

Starting with Relay 0.8.12, shared notes stay in sync even when they aren’t open. Keep Obsidian running with Relay enabled and connected, and a Base can show changes to notes you haven’t opened yourself.

## Share a Base with your team

You’ll need a [Shared Folder](/guides/share-a-folder/) that your [collaborators have added to their vaults](/guides/invite-a-collaborator/), Relay 0.8.12 or later, and Obsidian’s **Bases** core plugin enabled.

The Shared Folder needs [attachment storage](/how-relay-works/attachment-storage/) to sync the `.base` file. The Markdown notes and their properties sync without that storage allowance.

1. Put the `.base` file and the notes it uses inside the Shared Folder.
2. Check the Base’s filters include the shared notes you want everyone to see.
3. Have your collaborator open the Base in their copy of the Shared Folder.
4. Change a note property in the table and check that the new value appears in your collaborator’s table. The underlying note can stay closed.

Relay enables Bases syncing by default in 0.8.12. To check the setting, [open Relay settings](/guides/open-relay-settings/), select the folder under **My vault**, and find **Bases** under **Sync settings for this device**. A lock beside **Bases** means the folder needs storage.

<figure>
  <img src="/assets/bases-guide-20260917/storage-settings.png" alt="Relay sync settings with Markdown and Canvas enabled and Bases locked" width="622" height="398" loading="lazy">
  <figcaption>The Bases setting is locked when the Shared Folder has no attachment storage. Notes and their properties can still sync.</figcaption>
</figure>

## What gets shared

Share both the `.base` file and the notes it displays. The `.base` file defines the view: its filters, columns, sorting, and formulas. The notes contain the property values shown in the rows.

Changing a note property in a Base changes that note; changes to the note are reflected in the Base. Changing the view changes the `.base` file. Relay syncs the file you changed.

You can also keep your own Base outside the Shared Folder and use it to view shared notes. Everyone can arrange their own view of the same information. Only the notes need to sync in that case, so attachment storage isn’t required.

## Why collaborators may see different rows

A Base shows the notes in your vault that match its filters. Sharing the `.base` file shares those filters. To share the matching notes, put them in the Shared Folder too.

Notes outside the Shared Folder may appear in your Base but be missing from your collaborator’s, because those notes haven’t been shared.

A Shared Folder can have a different local path in each collaborator’s vault. A filter that uses your vault’s folder path may show no rows in someone else’s copy.

Use a tag or note property to select the shared notes where possible. Check that the same filter selects the intended notes in both vaults; it can also match unshared local notes with the same tag or property.

## Troubleshooting

| What you see | What to check |
| --- | --- |
| Notes arrive, but the Base is missing. | Check that the `.base` file is inside the Shared Folder, **Bases** syncing is enabled, and the folder has attachment storage. |
| The Base opens with missing rows. | Check that the corresponding notes are shared and match the filter in both vaults. A filter containing a vault-specific folder path can select different files. |
| The other table shows an old value. | Keep Obsidian running on both devices with Relay connected. Compare the property in the underlying note to distinguish a note-sync problem from a view-refresh problem. |
| An image is missing. | Share the image file too and check attachment storage. A link or a Base row does not transfer a file outside the Shared Folder. |

## Related guides

- [Share a folder](/guides/share-a-folder/)
- [Invite a collaborator](/guides/invite-a-collaborator/)
- [Share attachments](/guides/configure-attachments-for-sharing/)
- [Attachment storage](/how-relay-works/attachment-storage/)
- [Obsidian Bases documentation](https://obsidian.md/help/bases) for creating views, filters, and formulas.
