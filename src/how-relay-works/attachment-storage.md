---
title: Attachment storage
description: Sync images, PDFs, and other attachments with paid Relay cloud storage or storage you provide through self-hosting.
layout: doc.njk
---

Your files live in your Obsidian vault, on your device. Relay also needs storage on the server side so collaborators can receive shared content without being online at the same time.

## Why local files need server storage

Your device stores your local files. The Relay Server coordinates sharing and keeps shared document data and attachments in server-side storage.

For example, you can edit a note or add a PDF while your collaborator is offline. Once your device has synced that change to the server, you can go offline. Your collaborator can receive it from the server when they next connect, even if your device is offline by then.

{% include "storage-sequence.njk" %}

That is why your device’s disk space alone is not enough: the server needs to retain the shared content between those connections. Your files remain in your vault; the server-side storage lets other devices catch up.

## Storage options

### Self-hosted storage

You can self-host a Relay Server with S3-compatible storage on your own infrastructure. Self-hosting is free on every Relay plan. You provide and manage the server and storage for your shared notes, Canvases, and attachments. This is bring-your-own storage: you don’t pay Relay for it.

For deployment instructions, use the [Relay Server template](https://github.com/No-Instructions/relay-server-template). For the broader choice of where to run Relay, see [Hosting options](/guides/choose-how-to-host-relay/).

### Relay cloud storage

If you prefer convenience, Relay can host the server and storage for you. Storage for Markdown notes and Canvas collaboration is included for free on every plan. Storage for images, PDFs, videos, and other attachments requires a paid plan.

See [plans and storage allowances](https://relay.md/pricing) to choose a plan, then [upgrade your Relay Server](/guides/upgrade-to-a-paid-plan/).

## Files inside the Shared Folder

Storage and file location both matter. A note or Canvas can refer to an image elsewhere in your vault, but that reference does not share the image. The image file must also be inside the Shared Folder.

Obsidian can save pasted images to a vault-wide attachments folder. If that folder is outside your Shared Folder, collaborators do not receive those images through it. To keep attachments with the work you share, [configure attachments for sharing](/guides/configure-attachments-for-sharing/).
