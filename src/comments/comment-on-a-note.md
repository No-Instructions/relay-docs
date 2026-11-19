---
title: Comment on a note
description: Discuss a passage, reply to its thread, and resolve the discussion in Obsidian.
layout: doc.njk
commentsAnimation: true
---

Use Relay Comments to discuss a passage in your notes. Comments and replies stay in the Markdown file.

## Prepare a note for review

[Install Relay Comments](/comments/install-relay-comments/) and open a Markdown note. To add comments or change review items, you need write access to the note.

Use Live Preview to select text and the review sidebar to discuss it. You can also read comments in Reading mode.

## Add a comment

1. In Live Preview, select the passage you want to discuss.
2. Click the **Add comment** button beside the selection. It looks like a speech bubble with a plus sign.
3. In the sidebar's **Write a comment…** field, enter your comment.
4. Select **Comment**.

The thread appears in the sidebar, with the selected passage attached to it.

<figure class="comments-guide-animation comments-native-column">
  <iframe data-comments-animation style="--phone-scene-height: 280" src="/assets/relay-comments/comment-on-a-note/index.html?v=c15-29f2e852" title="Add and resolve a comment in an Obsidian note"></iframe>
</figure>

You can also right-click the selected text and choose **Add comment**.

When your selection includes Markdown markers for a heading, list item, task, blockquote, or callout, Relay Comments keeps that Markdown syntax outside the comment’s highlight.

<figure class="comments-guide-animation comments-native-column" id="markdown-intact-demo">
  <iframe data-comments-animation style="--phone-scene-height: 400" src="/assets/relay-comments/markdown-intact/index.html?v=m18-f6c64dc6" title="Comment on a callout title and a heading while preserving their Markdown markers"></iframe>
</figure>

If your selection extends into a later list item, task, blockquote line, or heading, select the passage within one block and try again.

<figure class="comments-guide-animation comments-native-column" id="declined-selection-demo">
  <iframe data-comments-animation style="--phone-scene-height: 310" src="/assets/relay-comments/declined-selection/index.html?v=d17-2fedd4eb" title="Retry a comment on a single list item after a selection crosses a block boundary"></iframe>
</figure>

If the selected passage overlaps another review mark or extends into another list item, task, blockquote line, or heading while your draft is open, Relay Comments keeps the draft text and displays **The commented text changed; select it again.**

If **Add comment** asks you to edit a rendered table first, open the table for editing and select text inside a cell.

## Comment on a rendered callout

1. In Live Preview, select text within the callout’s title or on one line of its body.
2. Press Command+Option+M on macOS or Ctrl+Alt+M on Windows and Linux.
3. In the sidebar’s **Write a comment…** field, enter your comment and select **Comment**.

<figure class="comments-guide-animation comments-native-column" id="callout-comment-demo">
  <iframe data-comments-animation style="--phone-scene-height: 340" src="/assets/relay-comments/callout-comment/index.html?v=k18-ad93fca9" title="Comment on a phrase inside a rendered callout using the keyboard shortcut"></iframe>
</figure>

If the selection includes a link label or inline code, or the comment command asks you to edit the callout first, choose **Edit this block** and select the passage in the Markdown source.

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

A standalone comment’s card quotes the preceding word when the editor uses that word as its anchor. If there’s no anchor word, the card is labeled **Comment**.

<figure class="comments-guide-animation comments-native-column" id="standalone-sidebar-demo">
  <iframe data-comments-animation style="--phone-scene-height: 360" src="/assets/relay-comments/standalone-sidebar/index.html?v=t14-fd35e81c" title="Read standalone comments with and without an anchor word in the sidebar"></iframe>
</figure>

For comments inside rendered tables and callouts, hover over the highlighted text to preview the thread, or select it to open the thread in the sidebar.

## Use the comment shortcut

To add a comment to selected text, press Command+Option+M on macOS or Ctrl+Alt+M on Windows and Linux. The shortcut also works for selected text inside Canvas notes and native text cards. On a Canvas without a focused text editor, **Add comment** starts pin placement.

## Review a read-only note

When Relay marks a note read-only, you can read its discussions, but you can't add comments or use thread actions. The selection button stays hidden, the comment command and context-menu item are refused, and the sidebar shows **Read-only** without a reply box.

Relay Comments follows changes to Relay read-only access while the note is open. If your access changes, check the sidebar's **Read-only** badge before continuing the review.

## Related guides

- [Comment on a Canvas](/comments/comment-on-a-canvas/)
- [Suggest edits](/comments/suggest-edits/)
- [Use Relay Comments with agents](/comments/use-relay-comments-with-agents/)
