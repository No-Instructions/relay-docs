---
title: Comment on a note
description: Discuss a passage, reply to its thread, and resolve the discussion in Obsidian.
layout: doc.njk
---

Use Relay Comments to discuss a passage in your notes. Comments and replies stay in the Markdown file.

## Prepare a note for review

[Install Relay Comments](/comments/0.5.2/install-relay-comments/) and open a Markdown note. To add comments or change review items, you need write access to the note.

Use Live Preview to select text and the review sidebar to discuss it. You can also read comments in Reading mode.

## Add a comment

1. In Live Preview, select the passage you want to discuss.
2. From the context menu, choose **Add comment**.
3. In the sidebar's **Write a comment…** field, enter your comment.
4. Select **Comment**.

The thread appears in the sidebar, with the selected passage attached to it.

If **Add comment** asks you to open a table or callout for editing first, select a table cell, or use **Edit this block** for a callout.

If the selected passage changes to span other markup while your draft is open, Relay Comments 0.5.2 refuses to save it and keeps the draft text. The notice reads **The commented text changed; select it again.**

## Reply to a thread

1. From the command palette, run **Open review sidebar**.
2. In the sidebar, select the thread you want to answer.
3. In the **Reply…** field, enter your reply.
4. Select **Reply**.

Your reply appears in the thread.

## Resolve a thread

1. In the review sidebar, select the discussion you have finished.
2. Select the thread card’s ✓ (**Resolve**) button.

Resolving a Markdown comment thread removes the discussion's comment markup from the note. It keeps the passage's text. A CriticMarkup highlight used to anchor the discussion becomes plain text; an Obsidian native highlight remains highlighted.

If the discussion is attached to a suggestion, resolving the discussion leaves the suggestion for a separate accept-or-reject decision. If you use **Resolve** on a suggestion without a discussion, it accepts the suggestion.

## Use the sidebar for discussion

The sidebar lists the note's comments, suggestions, and highlights. To open the sidebar, run **Open review sidebar** from the command palette. To close it, run **Close review sidebar**.

<figure style="max-width:430px">
  {% set screenshot = {"name": "relay-comments-review-sidebar", "alt": "The review sidebar with Priya’s comment and Tomás’s reply, a suggested replacement, and a highlight.", "width": 430, "height": 463} %}
{% include "comments-screenshot.njk" %}
  <figcaption>A thread with a reply, a suggested replacement, and a highlight in the review sidebar.</figcaption>
</figure>

For comments inside rendered tables and callouts, hover over the highlighted text to preview the thread, or select it to open the thread in the sidebar.

## Use the comment shortcut

To add a comment to selected text, press Command+Option+M on macOS or Ctrl+Alt+M on Windows and Linux. The shortcut also works for selected text inside Canvas notes and native text cards. On a Canvas without a focused text editor, **Add comment** starts pin placement.

## Review a read-only note

When Relay marks a note read-only, you can read its discussions, but you can't add comments or use thread actions. The selection button stays hidden, the comment command and context-menu item are refused, and the sidebar shows **Read-only** without a reply box.

Relay Comments 0.5.2 follows changes to Relay read-only access while the note is open. If your access changes, check the sidebar's **Read-only** badge before continuing the review.

## Related guides

- [Comment on a Canvas](/comments/0.5.2/comment-on-a-canvas/)
- [Suggest edits](/comments/0.5.2/suggest-edits/)
- [Use Relay Comments with agents](/comments/0.5.2/use-relay-comments-with-agents/)
