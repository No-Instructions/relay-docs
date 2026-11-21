---
title: Comment on a note
description: Discuss a passage, reply to its thread, and resolve the discussion in Obsidian.
layout: doc.njk
responsiveClips: true
commentsAnimation: true
---

{% from "responsive-clip.njk" import responsiveClip, commentsHero %}
Use Relay Comments to discuss a passage in your notes. Comments and replies stay in the Markdown file.

<figure class="comments-guide-animation comments-native-column" id="add-comment-demo">
  {{ commentsHero() }}
</figure>

## Prepare a note for review

[Install Relay Comments](/comments/install-relay-comments/) and open a Markdown note. To add comments or change review items, you need write access to the note.

Use Live Preview to select text and the review sidebar to discuss it. You can also read comments in Reading mode.

## Add a comment

1. In Live Preview, select the passage you want to discuss.
2. Click the **Add comment** button beside the selection. It looks like a speech bubble with a plus sign.
3. In the sidebar's **Write a comment…** field, enter your comment.
4. Select **Comment**.

The thread appears in the sidebar, with the selected passage attached to it.

You can also right-click the selected text and choose **Add comment**.

When your selection includes Markdown markers for a heading, list item, task, blockquote, or callout, Relay Comments keeps that Markdown syntax outside the comment’s highlight.

If Relay Comments asks you to select the text again, choose a passage within a single block.

If **Add comment** asks you to edit a rendered table first, open the table for editing and select text inside a cell.

## Comment on a rendered callout

1. In Live Preview, select text within the callout’s title or on one line of its body.
2. Press Command+Option+M on macOS or Ctrl+Alt+M on Windows and Linux.
3. In the sidebar’s **Write a comment…** field, enter your comment and select **Comment**.

<figure class="comments-guide-animation comments-native-column" id="callout-comment-demo">
  {{ responsiveClip("/assets/relay-comments/callout-comment-desktop-913c27c0/index.html", "/assets/relay-comments/callout-comment-phone-adbc4760/index.html", "720 / 340", "360 / 800", "Comment on a phrase inside a rendered callout using the keyboard shortcut") }}
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

The sidebar lists the note's comments, suggestions, and highlights. Select **Open Relay Comments** in the ribbon, or run **Open review sidebar** from the command palette. To close it, run **Close review sidebar**.

<figure class="comments-guide-animation comments-native-column" id="open-sidebar-demo">
  {{ responsiveClip("/assets/relay-comments/open-sidebar-desktop-023b6ca3/index.html", "/assets/relay-comments/open-sidebar-phone-b90df6f0/index.html", "752 / 470", "360 / 800", "Open the Relay Comments sidebar from the ribbon") }}
</figure>

If someone writes a comment directly in the Markdown without marking a passage, the sidebar uses nearby text to identify it. For example, a comment immediately after the word “bridge” shows **bridge** above the message. A comment at the start of a line shows **Comment** instead.

<figure class="comments-guide-animation comments-native-column" id="standalone-sidebar-demo">
  <iframe data-comments-animation style="--phone-scene-height: 360" src="/assets/relay-comments/standalone-sidebar/index.html?v=t14-fd35e81c" title="Read standalone comments with and without an anchor word in the sidebar"></iframe>
</figure>

For comments inside rendered tables and callouts, hover over the highlighted text to preview the thread, or select it to open the thread in the sidebar.

## Use the comment shortcut

To add a comment to selected text, press Command+Option+M on macOS or Ctrl+Alt+M on Windows and Linux. The shortcut also works for selected text inside Canvas notes and native text cards. On a Canvas without a focused text editor, **Add comment** starts pin placement.

## Comment with an agent

Give your agent the [agent instructions](/comments/use-relay-comments-with-agents/#instructions-for-the-agent), the note path, and the passage you want it to comment on. For example: “In Launch plan.md, ask who owns the announcement beside ‘Draft announcement.’”

With the [Obsidian CLI](https://obsidian.md/help/cli) enabled, the agent can run:

```shell
obsidian vault="Work" comments:comment path="Launch plan.md" quote="Draft announcement" text="Who owns the announcement?"
```

## Related guides

- [Comment on a Canvas](/comments/comment-on-a-canvas/)
- [Suggest edits](/comments/suggest-edits/)
- [Use Relay Comments with agents](/comments/use-relay-comments-with-agents/)
