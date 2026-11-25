---
title: Comment on a Canvas
description: Add comment pins to a Canvas or discuss text inside its cards.
layout: doc.njk
responsiveClips: true
commentsAnimation: true
---

Use Relay Comments to discuss a Canvas node, a position in the layout, or selected text inside a card.

{% from "responsive-clip.njk" import responsiveClip %}
<figure class="comments-guide-animation comments-native-column" id="canvas-card-comment-demo">
  {{ responsiveClip("/assets/relay-comments/canvas-card-comment-desktop-baf6a41d/index.html", "/assets/relay-comments/canvas-card-comment-phone-d36b083e/index.html", "752 / 470", "360 / 800", "Comment on a Canvas card, then place a pin in empty space") }}
</figure>

## Before you start

[Install Relay Comments](/comments/install-relay-comments/) and open a Canvas.

<span id="comment-on-a-node"></span>
<span id="place-a-comment-pin"></span>

## Add a comment

When text is selected in a card editor, **Add comment** attaches the thread to that passage. With no text editor focused, the command starts pin placement. After choosing a target, type your comment and select **Comment**. In the Canvas pin composer, you can also press Command+Enter on macOS or Ctrl+Enter on Windows and Linux to post.

### Use the context menu

Open the context menu on the node or the selected passage and choose **Add comment**. On desktop, right-click the node or selection. To place a pin in empty space on desktop, right-click that spot and choose **Add comment**.

### Use the [command palette](https://obsidian.md/help/plugins/command-palette)

1. Click the Canvas background to leave text editing.
2. Open the [command palette](https://obsidian.md/help/plugins/command-palette) and run **Relay Comments: Add comment**.
3. Click a node to attach the comment to it, or click empty space to place a pin.

The **Relay Comments: Add comment to canvas (click to place)** command also starts pin placement.

<figure class="comments-guide-animation comments-native-column" id="canvas-pin-demo">
  <iframe data-comments-animation loading="eager" style="--desktop-scene-height: 492; --phone-scene-height: 520" src="/assets/relay-comments/canvas-pin-loop-a6564637/index.html" title="Place a comment pin on a Canvas"></iframe>
</figure>

### Use the comment shortcut

To run **Add comment** without opening the command palette, press Command+Option+M on macOS or Ctrl+Alt+M on Windows and Linux.

## Read comments inside a card

The sidebar shows the comments for the card you’re editing. If the card embeds a Markdown note, those comments also appear when you open the note on its own. Inline comments in a native text card stay in the card’s Markdown text as CriticMarkup.

## Resolve a pinned thread

Click the pin on the Canvas to open the thread, then select **Resolve** (the checkmark) in the thread header.

**On a Canvas**, the pin stays visible. Open it to read the discussion marked **Resolved**, or select **Reopen** to continue the thread.

**In a Markdown note**, resolving a thread removes its comment markup from the underlying note. The thread is no longer visible in the note or its comment sidebar.

## Comment with an agent

Give your agent the [agent instructions](/comments/use-relay-comments-with-agents/#instructions-for-the-agent) and tell it which Canvas and card to comment on. For example: “On my Launch plan Canvas, ask who owns the announcement on the card that says ‘Draft announcement.’”

With the [Obsidian CLI](https://obsidian.md/help/cli) enabled, the agent can quote a passage in a text card:

```shell
obsidian vault="Work" comments:comment path="Launch plan.canvas" quote="Draft announcement" text="Who owns the announcement?"
```

To pin the comment to the whole card, the agent can pass `node=<card ID>` in place of `quote=`.

For discussion in Markdown notes, see [Comment on a note](/comments/comment-on-a-note/).
