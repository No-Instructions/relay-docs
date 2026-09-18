---
title: How Canvas collaboration works
description: How Relay merges changes to Canvas cards, text, and connections while keeping a .canvas file in your Obsidian vault.
layout: doc.njk
---

Relay lets you work on the same Obsidian Canvas with other people in real time. You can write in a card while someone connects it to another idea, or rearrange the board while they add a card.

Relay represents the board's cards, connections, and text as shared data. Its collaboration engine merges changes to that data, and your Canvas remains a `.canvas` file in your vault.

To try it with someone, see [collaborate on an Obsidian Canvas](/guides/collaborate-on-an-obsidian-canvas/).

## Your Canvas is a file in your vault

A `.canvas` file stores the board as readable JSON. Cards are entries in a `nodes` list, and connections are entries in an `edges` list. Each has an ID; a connection identifies the cards at its two ends by their IDs.

<figure>
  <img src="/assets/canvas-collaboration-20260911/canvas-nodes-and-edge-v3.png" alt="Two connected Canvas cards headed Each card is a node and Each connection is an edge, with smaller instructions beneath.">
  <figcaption>Each card has its own ID; the connection refers to those IDs.</figcaption>
</figure>

This Canvas is stored as two nodes and one edge:

```json
{
  "nodes": [
    {
      "id": "c65a98b401442c09",
      "type": "text",
      "text": "# Each card is a node\n\nDouble-click to add text.",
      "x": 0,
      "y": 0,
      "width": 300,
      "height": 160,
      "color": "4"
    },
    {
      "id": "7134cf9094a1c07e",
      "type": "text",
      "text": "# Each connection is an edge\n\nDrag a connector to link cards.",
      "x": 140,
      "y": 250,
      "width": 310,
      "height": 160,
      "color": "5"
    }
  ],
  "edges": [
    {
      "id": "67451cbe64bca401",
      "fromNode": "c65a98b401442c09",
      "fromSide": "bottom",
      "toNode": "7134cf9094a1c07e",
      "toSide": "top"
    }
  ]
}
```

The card’s text is stored in `text`, and its position is stored as `x` and `y` coordinates. The [JSON Canvas specification](https://jsoncanvas.org/spec/1.0/) defines that format.

## Changes to shared data

Relay uses Yjs, a library of *conflict-free replicated data types* (CRDTs), to represent a collaborative Canvas. These data structures record changes so that copies can merge updates received from different collaborators.

Cards and connections are stored in shared maps, keyed by ID. Each text card also has a shared text value. This gives Relay a way to merge edits to a card's text separately from updates to the board's collection of cards and connections.

The shared maps store each card or connection's properties together as an object. A card's position, size, and color are not each a separate shared data structure.

Yjs encodes changes as document updates. Relay exchanges those updates over its connection to the server and applies received updates to its local shared state. Yjs can merge updates received in different orders; once copies have received the same updates, they converge on the same state. See [Yjs document updates](https://docs.yjs.dev/api/document-updates) for the underlying mechanism.

## Why whole-file sync is different

Suppose two people start with the same Canvas, then each edits a different card. Their saved files contain different versions of the board. A sync tool that resolves the difference by selecting one whole file keeps the changes in that version; it cannot combine the two edits merely by choosing a file.

Relay's shared representation lets it merge changes within the board. The unit being reconciled is the shared data, rather than a choice between two complete Canvas snapshots.

## Shared state and local storage

Relay's collaboration state and the `.canvas` file are two representations of the board. Relay exports its shared cards, connections, and text into Canvas JSON for the local file. It also keeps local collaboration state in Obsidian's IndexedDB storage.

Receiving an update and writing the file are separate parts of the implementation. Relay coordinates file writes with the open Canvas view; the network update is not a replacement `.canvas` file downloaded on every edit.

## Notes and attachments on the board

A card can refer to a note or attachment elsewhere in your vault. That reference does not put the file's contents inside the Canvas. To share the referenced file with your collaborators, keep it inside the Shared Folder too. For attachment-location settings, see [Configure attachments for sharing](/guides/configure-attachments-for-sharing/).

Canvas collaboration is enabled by default and available on all plans, including Free. Images and other attachments require [storage](/how-relay-works/attachment-storage/) to sync. Each collaborator uses Obsidian with Relay installed.
