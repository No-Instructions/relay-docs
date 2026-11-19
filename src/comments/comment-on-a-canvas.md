---
title: Comment on a Canvas
description: Add comment pins to a Canvas or discuss text inside its cards.
layout: doc.njk
commentsAnimation: true
---

Use Relay Comments to discuss a Canvas node, a position in the layout, or selected text inside a card.

## Before you start

[Install Relay Comments](/comments/install-relay-comments/) and open a Canvas.

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

<figure class="comments-guide-animation comments-native-column" id="canvas-pin-demo">
  <iframe data-comments-animation loading="eager" style="--desktop-scene-height: 492; --phone-scene-height: 520" src="/assets/relay-comments/comment-on-a-canvas/index.html?v=11a8b1f-bbbb0a4d" title="Place a comment pin on a Canvas"></iframe>
</figure>

To comment on selected text inside an embedded note or native text card, select the passage and choose **Add comment** from the context menu. Comments in native text cards stay in the card's Markdown text as CriticMarkup.

## Use the comment shortcut

To add a comment to selected text, press Command+Option+M on macOS or Ctrl+Alt+M on Windows and Linux. The shortcut also works for selected text inside Canvas notes and native text cards. On a Canvas without a focused text editor, **Add comment** starts pin placement.

For discussion in Markdown notes, see [Comment on a note](/comments/comment-on-a-note/).
