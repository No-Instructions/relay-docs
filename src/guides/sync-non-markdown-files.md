---
title: Sync non-Markdown files
description: Which file types Relay syncs in a Shared Folder, which need storage, and how to turn on Other files to sync HTML, CSV, JSON, text, and Office files.
layout: doc.njk
---

Markdown notes (`.md`) and Canvases (`.canvas`) sync in every Shared Folder, with no storage needed. Relay also syncs Bases, images, audio, video, and PDFs, plus files with other extensions such as `.html`, `.csv`, and `.json` once you turn on **Other files**. These sync as whole files and need storage on the folder's Relay Server.

## What these files need to sync

For a Base, image, audio file, video, PDF, or other file to sync, all three of these must be true:

1. The file is inside the Shared Folder. A link from a shared note doesn't share a file stored elsewhere in your vault. For Obsidian settings that keep attachments in the folder, see [Save attachments next to your notes](/guides/set-attachment-location/).
2. The folder's Relay Server has storage. For your options, see [Storage for shared files](/how-relay-works/attachment-storage/).
3. The setting for that file type is on for the folder, on the device that has the file and on each device that needs it.

The settings for Bases, images, audio, video, and PDFs are on by default. **Other files**, which covers every extension not in those categories, is off until you turn it on.

Relay keeps these settings separately for each Shared Folder on each device. Turning on a file type for a folder on your laptop doesn't turn it on for that folder on your phone, or for your collaborators.

## Find a folder's sync settings

In [Relay settings](/guides/open-relay-settings/), select the Shared Folder under **My vault**, then scroll to **Sync settings for this device**.

<figure>
  <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Obsidian Settings with Relay selected under Community plugins. The Website Shared Folder's page shows its name, Users with access, and the Sync settings for this device heading, which is outlined, above the Markdown, Canvas, Bases, and Images settings." viewBox="0 60 1400 1640" style="display:block;width:100%;height:auto">
    <image href="/assets/sync-non-markdown-files/folder-context.png" x="0" y="0" width="1400" height="1700"/>
    <rect x="482" y="1012" width="500" height="68" rx="10" fill="none" stroke="white" stroke-width="8"/>
    <rect x="482" y="1012" width="500" height="68" rx="10" fill="none" stroke="#075ee8" stroke-width="4"/>
  </svg>
  <figcaption>A Shared Folder's page in Relay settings. Its sync settings are below the folder's name and users.</figcaption>
</figure>

## Turn on Other files for a Shared Folder

To sync files with extensions outside the listed categories, such as `.html`, `.txt`, `.csv`, or `.json`:

1. [Open Relay settings](/guides/open-relay-settings/).
2. Under **My vault**, select the Shared Folder that contains the files.
3. Under **Sync settings for this device**, turn on **Other files**, the last setting in the list. Its description reads *Sync unsupported file types*.
4. Repeat these steps on each of your other devices that needs the files.

<figure>
  <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sync settings for this device, listing Markdown, Canvas, Bases, Images, Audio, Videos, PDFs, and Other files. Every setting is on except Other files, which is outlined." viewBox="0 0 902 1368" style="display:block;width:100%;max-width:560px;height:auto">
    <image href="/assets/sync-non-markdown-files/folder-sync-settings.png" x="0" y="0" width="902" height="1368"/>
    <rect x="46" y="1236" width="834" height="112" rx="12" fill="none" stroke="white" stroke-width="8"/>
    <rect x="46" y="1236" width="834" height="112" rx="12" fill="none" stroke="#075ee8" stroke-width="4"/>
  </svg>
  <figcaption>On a Relay Server with storage, Other files is the last setting in the list and is off by default.</figcaption>
</figure>

Each collaborator also turns on **Other files** for the same folder on each of their devices.

Storage belongs to the folder's Relay Server, not to your account. On a Relay-hosted server, the server's owner adds storage by upgrading the server's plan. On a self-hosted server, whoever runs it provides the storage. If you joined someone else's server, ask its owner. A lock beside **Other files** means the folder's Relay Server has no storage.

## Example: share an HTML file

You keep `report.html` in the Shared Folder `Website`, and the Relay Server has storage.

1. On your laptop, you turn on **Other files** for `Website`. Relay uploads `report.html`.
2. On your phone, `Website` has your notes but not `report.html` until you turn on **Other files** for `Website` there too.
3. Your collaborator turns on **Other files** for `Website` on their computer. Relay downloads `report.html` into their copy of the folder.

## File types and settings

Each row is a setting under **Sync settings for this device**.

| Setting | File extensions | Needs storage |
| --- | --- | --- |
| Markdown | `.md` | No |
| Canvas | `.canvas` | No |
| Bases | `.base` | Yes |
| Images | `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`, `.avif`, `.bmp` | Yes |
| Audio | `.mp3`, `.wav`, `.m4a`, `.flac`, `.ogg`, `.oga`, `.opus` | Yes |
| Videos | `.mp4`, `.webm`, `.ogv`, `.mov`, `.mkv` | Yes |
| PDFs | `.pdf` | Yes |
| Other files | Any other extension, for example `.html`, `.css`, `.js`, `.txt`, `.csv`, `.json`, `.xml`, `.docx`, `.xlsx`, `.pptx`, `.zip`, `.heic` | Yes |

## Multiplayer and whole-file sync

Markdown notes and Canvases are [real-time multiplayer](/how-relay-works/real-time-multiplayer-vs-repurposed-file-sync/). You and your collaborators can work in the same note at once and see each other's edits as you type.

Bases, images, audio, video, PDFs, and other files aren't multiplayer. Each syncs as a whole file: when someone saves a new version, Relay uploads it and other devices download it.

## Related guides

- [Collaborate with Obsidian Bases](/guides/collaborate-with-bases/)
- [Upgrade your plan](/guides/upgrade-to-a-paid-plan/)
