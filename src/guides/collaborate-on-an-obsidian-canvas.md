---
title: Collaborate on an Obsidian Canvas
description: Share an Obsidian Canvas with your team and edit cards and connections together through Relay.
layout: doc.njk
---

Relay lets you collaborate with people and agents in real time on Obsidian Canvas files. You can edit text cards, arrange ideas, and connect cards while your collaborators work on the same Canvas at the same time.

Canvas collaboration is enabled by default and available on all plans, including Free. Images and other attachments require [storage](/how-relay-works/attachment-storage/) to sync.

<video width="1408" height="792" class="docs-video" controls muted loop playsinline preload="none" data-autoplay-loop aria-label="Two collaborators edit the same Canvas, shown at twice the recorded speed" poster="/assets/canvas-collaboration-loop-20260914/canvas-collaboration-loop-poster.webp">
  <source src="/assets/canvas-collaboration-loop-20260914/canvas-collaboration-loop.webm" type="video/webm">
  <source src="/assets/canvas-collaboration-loop-20260914/canvas-collaboration-loop.mp4" type="video/mp4">
  <a href="/assets/canvas-collaboration-loop-20260914/canvas-collaboration-loop.mp4">Download the collaboration demonstration</a>.
</video>
<script src="/assets/js/video-loop.js" defer></script>

## Quickstart

If you already share a folder with your collaborator:

1. [Update Relay](/guides/update-relay/) on both devices if needed. Canvas collaboration requires Relay 0.8.12 or later.
2. Create a new Canvas in that Shared Folder, or drag an existing `.canvas` file into it using Obsidian’s file explorer.

Everyone syncing that folder receives the Canvas automatically. Open it together and start editing; you don't need a separate invitation for the Canvas.

## Full walkthrough: create and share a Canvas

### Prepare your shared folder

Each person needs Obsidian with Relay installed and access to the same Shared Folder. For installation, creating a Relay Server, and sharing a local folder, follow the [Relay quick start](/introduction/#quick-start).

[Invite your collaborator](/guides/invite-a-collaborator/#invite-your-collaborator), then have them [join the server and add the Shared Folder to their vault](/guides/invite-a-collaborator/#your-collaborator-joins). Joining the server alone does not add its folders.

<video width="560" height="315" class="docs-video" controls playsinline preload="metadata" aria-label="Create and edit a Canvas together in two Obsidian vaults" poster="/assets/canvas-collaboration-20260911/canvas-storyboard-v14-poster.png">
  <source src="/assets/canvas-collaboration-20260911/canvas-storyboard-v14.webm" type="video/webm">
  <source src="/assets/canvas-collaboration-20260911/canvas-storyboard-v14.mp4" type="video/mp4">
  <a href="/assets/canvas-collaboration-20260911/canvas-storyboard-v14.mp4">Download the full walkthrough</a>.
</video>

### Open the Canvas together

Create a Canvas inside the Shared Folder, or move an existing Canvas into it.

Ask your collaborator to open the Canvas from their copy of the Shared Folder. Look for your avatars on the right of the Canvas to see who is there.

To add a text card, double-click an empty area of the Canvas and type. To connect two cards, hover over a card's edge and drag its connector circle to the other card. For more Canvas controls, see [Obsidian’s Canvas guide](https://obsidian.md/help/plugins/canvas).

## Include notes and attachments

To share a note through a Canvas, keep the note inside the Shared Folder too. Referencing a file from the Canvas does not share a file elsewhere in your vault.

To sync images or other attachments, put them inside the Shared Folder and make sure the folder has storage available. For attachment-location settings, see [Save attachments next to your notes](/guides/set-attachment-location/).

## Troubleshooting

If your collaborator cannot find the Canvas, check that the `.canvas` file is inside the Shared Folder and that both people have added that folder to their vaults.

If a referenced note or attachment is missing, check that the referenced file is also inside the Shared Folder. For images and attachments, check that the folder has storage available.

If changes still do not appear, [contact Relay support on Discord](https://discord.relay.md). Include your Relay and Obsidian versions and describe which change failed to appear on the other device.

## Related information

- [How Canvas collaboration works](/how-relay-works/canvas-collaboration/)
- [Multiplayer Canvas announcement](https://relay.md/updates/multiplayer-canvas)
