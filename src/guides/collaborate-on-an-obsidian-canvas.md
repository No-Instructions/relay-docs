---
title: Collaborate on an Obsidian Canvas
description: Share an Obsidian Canvas with your team and edit cards and connections together through Relay.
layout: doc.njk
---

Relay lets you collaborate in real time on Obsidian Canvas files in a Shared Folder. You can edit text cards, arrange ideas, and connect cards while your collaborators work on the same Canvas.

Canvas collaboration is enabled by default and available on all plans, including Free. Images and other attachments require [storage](/how-relay-works/attachment-storage/) to sync.

<video width="1408" height="792" class="docs-video" controls muted loop playsinline preload="none" data-autoplay-loop aria-label="Two collaborators edit the same Canvas, shown at twice the recorded speed" poster="/assets/canvas-collaboration-loop-20260914/canvas-collaboration-loop-poster.webp">
  <source src="/assets/canvas-collaboration-loop-20260914/canvas-collaboration-loop.webm" type="video/webm">
  <source src="/assets/canvas-collaboration-loop-20260914/canvas-collaboration-loop.mp4" type="video/mp4">
  <a href="/assets/canvas-collaboration-loop-20260914/canvas-collaboration-loop.mp4">Download the collaboration demonstration</a>.
</video>
<script src="/assets/js/video-loop.js" defer></script>

## Prepare your shared folder

You and your collaborator each need Obsidian with Relay 0.8.12 or later installed. Before you start, [check your installed version and update Relay if needed](/guides/update-relay/).

You both need access to the same Shared Folder. Each person must add that folder to their own vault; joining the Relay Server alone does not add its folders.

For setup instructions, see [Invite someone to collaborate](/guides/invite-a-collaborator/).

## Open the Canvas together

To find the folder you share, open **Settings → Relay**, select your Relay Server, then open its Shared Folder. Both people must have added that folder to their vaults before continuing.

When you add a Canvas to the Shared Folder, everyone syncing that folder receives it automatically. You don't need a separate invitation for the Canvas.

1. Create a new Canvas in your Shared Folder, or drag an existing `.canvas` file into it using Obsidian’s file explorer.
2. Ask your collaborator to open that Canvas from their copy of the Shared Folder.
3. Look for your avatars on the right of the Canvas to see who is there.
4. To add a text card, double-click an empty area of the Canvas and type in it.
5. Ask your collaborator to add a second text card.
6. To connect the cards, hover over a card's edge and drag its connector circle to the other card.

![Three connected text cards in a Shared Folder, with both collaborators’ avatars outlined on the right.](/assets/canvas-collaboration-20260911/canvas-two-avatars-v7.png)
*The Canvas is inside the Shared Folder. Both collaborators’ avatars are highlighted on the right.*

## Check changes on both devices

Ask your collaborator to check that the text, card positions, and connection appear on their Canvas. Have them move a card, then check that its new position appears on yours.

## Full walkthrough: create and share a Canvas

<video width="560" height="315" class="docs-video" controls playsinline preload="metadata" aria-label="Create and edit a Canvas together in two Obsidian vaults" poster="/assets/canvas-collaboration-20260911/canvas-storyboard-v14-poster.png">
  <source src="/assets/canvas-collaboration-20260911/canvas-storyboard-v14.webm" type="video/webm">
  <source src="/assets/canvas-collaboration-20260911/canvas-storyboard-v14.mp4" type="video/mp4">
  <a href="/assets/canvas-collaboration-20260911/canvas-storyboard-v14.mp4">Download the full walkthrough</a>.
</video>

## Include notes and attachments

To share a note through a Canvas, keep the note inside the Shared Folder too. Referencing a file from the Canvas does not share a file elsewhere in your vault.

To sync images or other attachments, put them inside the Shared Folder and make sure the folder has storage available. For attachment-location settings, see [Configure attachments for sharing](/guides/configure-attachments-for-sharing/).

## Check missing content

If your collaborator cannot find the Canvas, check that the `.canvas` file is inside the Shared Folder and that both people have added that folder to their vaults.

If a referenced note or attachment is missing, check that the referenced file is also inside the Shared Folder. For images and attachments, check that the folder has storage available.

If changes still do not appear, [contact Relay support on Discord](https://discord.relay.md). Include your Relay and Obsidian versions and describe which change failed to appear on the other device.

## Related information

- [How Canvas collaboration works](/how-relay-works/canvas-collaboration/)
- [Multiplayer Canvas announcement](https://relay.md/updates/multiplayer-canvas)
