---
title: Comment on a Canvas
description: Add comment pins to a Canvas or discuss text inside its cards.
layout: doc.njk
---

Use Relay Comments to discuss a Canvas node, a position in the layout, or selected text inside a card.

## Before you start

[Install Relay Comments](/comments/0.5.2/install-relay-comments/) and open a Canvas.

## Comment on a node

To comment on a node, follow these steps:

1. Open the Canvas and open a node's context menu.
2. Choose **Add comment**.
3. Enter your comment in **Comment…**, then select **Comment**.

<figure style="max-width:429px">
  {% set screenshot = {"name": "relay-comments-canvas-node-comment", "alt": "A comment pin at the edge of a Canvas card, with Priya’s thread and a Reply field open.", "width": 429, "height": 287} %}
{% include "comments-screenshot.njk" %}
  <figcaption>Open a Canvas card’s comment pin to read and reply to its thread.</figcaption>
</figure>

To place a pin in the Canvas layout, follow these steps:

1. With the Canvas open, run **Add comment to canvas (click to place)** from the command palette.
2. Click or tap the position for the pin.
3. Enter your comment in **Comment…**, then select **Comment**.

To comment on selected text inside an embedded note or native text card, select the passage and choose **Add comment** from the context menu. Comments in native text cards stay in the card's Markdown text as CriticMarkup.

## Use the comment shortcut

To add a comment to selected text, press Command+Option+M on macOS or Ctrl+Alt+M on Windows and Linux. The shortcut also works for selected text inside Canvas notes and native text cards. On a Canvas without a focused text editor, **Add comment** starts pin placement.

For discussion in Markdown notes, see [Comment on a note](/comments/0.5.2/comment-on-a-note/).
