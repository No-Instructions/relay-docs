---
title: Relay UI icons
description: Identify Relay’s note tracking, connection, external file, and settings icons in Obsidian.
layout: doc.njk
---
Relay’s icons show note tracking and connection status and provide access to sync controls and settings.


## Stack icons

Relay keeps a local record of edits to each shared note. The stack icon in the note header shows whether Relay is recording your edits.

<figure style="max-width:305px">
  <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Note header controls: a purple stack, a purple satellite, a book, and a three-dot menu." viewBox="0 0 305 130" style="display:block;width:100%;max-width:305px;height:auto">
    <image href="/assets/icons/note-header-detail.png" x="0" y="40" width="305" height="90"/>
    <path d="M 94 8 L 67.63 60.74 M 67.18 48.22 L 67.63 60.74 L 77.91 53.59" fill="none" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 94 8 L 67.63 60.74 M 67.18 48.22 L 67.63 60.74 L 77.91 53.59" fill="none" stroke="#075ee8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <figcaption>The stack is the leftmost icon in the note header.</figcaption>
</figure>

- Colored: Relay is recording your edits in its local CRDT record.
- Gray: Relay is not tracking edits in the open note. The icon can turn gray briefly while the note loads or Relay merges changes.

If the **Merge conflict -- click to resolve** banner appears, click it to resolve the conflict. If the stack icon stays gray without a banner, open Obsidian’s command palette and run **Relay: Show sync status: [folder name]** to inspect the folder’s status.

In the **Sync status** sidebar, look under **Conflicts** for notes that need attention. For the steps, see [Find other notes with conflicts](/guides/resolve-local-conflicts/#find-other-notes-with-conflicts).

An unresolved local conflict keeps the icon gray while the banner is shown or the conflict is open. For Markdown notes, Relay also marks the note in Obsidian’s file explorer with a dot in your theme’s warning color.

<figure>
  <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The note Check conflict indicators has an orange dot at the right of its row in Obsidian’s file explorer." viewBox="0 0 552 92" style="display:block;width:100%;max-width:552px;height:auto">
    <image href="/assets/icons/conflict-dot.png" x="0" y="40" width="552" height="52"/>
    <path d="M 480 8 L 510.33 54.29 M 499.28 48.38 L 510.33 54.29 L 509.32 41.80" fill="none" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 480 8 L 510.33 54.29 M 499.28 48.38 L 510.33 54.29 L 509.32 41.80" fill="none" stroke="#075ee8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <figcaption>A note with a local conflict in Obsidian’s file explorer.</figcaption>
</figure>

When you’re signed out, the stack and satellite icons disappear from the note header. A **Login to enable Live edits** banner appears.

<figure>
  <img src="/assets/icons/signed-out.png" alt="A shared note with a Login to enable Live edits banner and no stack or satellite icons in its header." width="1360" height="145">
  <figcaption>A shared note while signed out.</figcaption>
</figure>

The folder’s stack icon identifies a Shared Folder; it does not change color with the note’s tracking state. For a folder connected to a Relay Server, it appears when you hover over the folder.

<figure style="max-width:560px">
  <img src="/assets/icons/shared-folder-detail.png" alt="The Bases guide folder row with a stack and satellite on its right." width="678" height="72" style="width:100%;height:auto">
  <figcaption>The stack identifies the Shared Folder; the satellite shows its connection.</figcaption>
</figure>

## Satellite icons

Relay sends updates from your device to a Relay Server, which passes them to your collaborators. Their updates reach you through the same server. The satellite icons show whether Relay is connected to that server.

- Colored: Connected.
- Gray: Disconnected, or syncing is paused for the note.

The icon in the note header controls that note. To toggle syncing on or off for the note, click its satellite icon.

<figure style="max-width:305px">
  <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Note header controls with the purple satellite beside the stack." viewBox="0 0 305 130" style="display:block;width:100%;max-width:305px;height:auto">
    <image href="/assets/icons/note-header-detail.png" x="0" y="40" width="305" height="90"/>
    <path d="M 162 8 L 135.63 60.74 M 135.18 48.22 L 135.63 60.74 L 145.91 53.59" fill="none" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 162 8 L 135.63 60.74 M 135.18 48.22 L 135.63 60.74 L 145.91 53.59" fill="none" stroke="#075ee8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <figcaption>The satellite sits immediately to the right of the stack.</figcaption>
</figure>

The icon in the file explorer applies to the Shared Folder. To connect or disconnect the folder, right-click it and select **Relay: Connect** or **Relay: Disconnect**.

## External file icon

When your note links to a file outside the same Shared Folder, Relay shows a file icon with an exclamation point next to the link. Your collaborators may not have access to the linked file.

<figure>
  <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Private reference link in a note has a file icon with an exclamation point beside it." viewBox="0 0 610 115" style="display:block;width:100%;max-width:420px;height:auto">
    <image href="/assets/icons/external-link-inline.png" x="0" y="40" width="610" height="75"/>
    <path d="M 322 8 L 288.42 55.32 M 289.89 42.88 L 288.42 55.32 L 299.68 49.82" fill="none" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 322 8 L 288.42 55.32 M 289.89 42.88 L 288.42 55.32 L 299.68 49.82" fill="none" stroke="#075ee8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <figcaption>A link outside the Shared Folder in Live Preview.</figcaption>
</figure>

To include the linked file in the Shared Folder, move it into that folder.

## Ribbon icon

To open Relay settings, click the Relay satellite icon in Obsidian’s ribbon.

<figure style="max-width:300px">
  <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Part of Obsidian’s vertical ribbon, with Relay’s satellite icon below the other controls." viewBox="0 0 108 258" style="display:block;width:100%;max-width:80px;height:auto">
    <image href="/assets/icons/ribbon-detail.png" x="0" y="40" width="108" height="218"/>
    <path d="M 95 165 L 71.33 193.29 M 73.78 181.01 L 71.33 193.29 L 82.99 188.71" fill="none" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 95 165 L 71.33 193.29 M 73.78 181.01 L 71.33 193.29 L 82.99 188.71" fill="none" stroke="#075ee8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <figcaption>The Relay satellite icon in the ribbon.</figcaption>
</figure>

## Troubleshooting

For help with an icon state you cannot explain, contact us in the [Relay Discord](https://discord.relay.md). Include your Relay version and a screenshot.
