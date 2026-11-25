---
title: Comment on a note
description: Discuss a passage, reply to its thread, and resolve the discussion in Obsidian.
layout: doc.njk
responsiveClips: true
commentsAnimation: true
---

{% from "responsive-clip.njk" import responsiveClip, commentsHero %}
Use Relay Comments to discuss a passage in your notes. Comments and replies are saved in the note’s Markdown, so they travel with the note.

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

You can also right-click the selected text and choose **Add comment**, or press Command+Option+M on macOS or Ctrl+Alt+M on Windows and Linux.

**If Add comment doesn’t work**

- A comment cannot extend onto another line that starts with a Markdown quote marker, list marker, task checkbox, or heading marker. In an ordinary paragraph, it can span a line break.
- If **Add comment** asks you to edit a rendered table first, open the table for editing and select text inside a cell.
- If your selection includes Markdown markers for a heading, list item, task, blockquote, or callout, Relay Comments keeps that syntax outside the comment’s highlight.

## Comment on a rendered callout

Choose text from one Markdown line of the callout, whether the callout is open for editing or rendered. Text that wraps on screen still counts as one line. To discuss a longer passage, comment on one line of it.

1. In Live Preview, select a phrase on one line of the rendered callout. Keep the selection entirely within its title or entirely within its body.
2. Press Command+Option+M on macOS or Ctrl+Alt+M on Windows and Linux.
3. In the sidebar, enter your comment in **Write a comment…** and select **Comment**.

<figure class="comments-guide-animation comments-native-column" id="callout-comment-demo">
  {{ responsiveClip("/assets/relay-comments/callout-comment-desktop-913c27c0/index.html", "/assets/relay-comments/callout-comment-phone-02e71226/index.html", "720 / 340", "360 / 800", "Comment on a phrase inside a rendered callout using the keyboard shortcut") }}
</figure>

If Relay Comments can’t match your selection to the callout’s Markdown, it shows “Can't comment on text inside a rendered block. Open the block for editing and select the text there.” This can happen when the selection:

- crosses from one Markdown line to another
- includes a Markdown link, wikilink, or inline code
- crosses an embed, an HTML tag, an Obsidian `%%comment%%`, or an existing CriticMarkup comment
- crosses the opening, separator, or closing markup of a CriticMarkup highlight or suggestion
- is in a generated callout title or inside a nested callout

When you see that notice, choose **Edit this block**, select a phrase on one Markdown line, then click the **Add comment** icon beside the selection. If that selection runs onto another line that starts with `>`, Relay Comments shows “Select text within one block to comment on it.”

For an Obsidian `==highlight==`, select the whole highlighted passage. A partial selection shows “Select the entire highlighted passage to comment on it.”

## Use the sidebar for discussion

The sidebar lists the note’s comments, suggestions, and highlights. To open it, select **Open Relay Comments** in the ribbon, or run **Open review sidebar** from the [command palette](https://obsidian.md/help/plugins/command-palette). To close it, run **Close review sidebar**. To open the command palette on macOS, press Cmd+P. On Windows or Linux, press Ctrl+P. On mobile, pull down from the top of the app if [Quick Action](https://obsidian.md/help/mobile#Quick%20Action) uses its default setting.

<figure class="comments-guide-animation comments-native-column" id="open-sidebar-demo">
  {{ responsiveClip("/assets/relay-comments/open-sidebar-desktop-34cd96f9/index.html", "/assets/relay-comments/open-sidebar-phone-fdf8fe28/index.html", "752 / 470", "360 / 800", "Open the Relay Comments sidebar from the ribbon") }}
</figure>

With the sidebar open, click a highlighted passage in Live Preview to select its comment thread in the sidebar. For comments inside rendered tables and callouts, hover over the highlighted text to preview the thread, or select it to open the thread in the sidebar.

A comment written directly in Markdown can stand on its own. If it follows a word, the sidebar shows that word above the message, like **2007** in the first card below. If there’s no preceding word on the line, the sidebar shows **Comment** instead, as it does for Arlo’s “Link Kay’s original talk.”

<figure class="comments-guide-animation comments-native-column" id="standalone-sidebar-demo">
  <iframe data-comments-animation style="--phone-scene-height: 360" src="/assets/relay-comments/standalone-sidebar/index.html?v=t14-5f3f280a" title="Read standalone comments with and without an anchor word in the sidebar"></iframe>
</figure>

## Reply to a thread

1. Open [the sidebar](#use-the-sidebar-for-discussion) and select the thread you want to answer.
2. In the **Reply…** field, enter your reply.
3. Select **Reply**.

Your reply appears in the thread.

## Resolve a thread

1. In the review sidebar, select the discussion you have finished.
2. Select the thread card’s ✓ (**Resolve**) button.

Resolving a Markdown comment thread removes the discussion's comment markup from the note. It keeps the passage's text. A CriticMarkup highlight used to anchor the discussion becomes plain text; an Obsidian native highlight remains highlighted.

If the discussion is attached to a suggestion, resolving the discussion leaves the suggestion for a separate accept-or-reject decision. If you use **Resolve** on a suggestion without a discussion, it accepts the suggestion.

## Use the comment shortcut

To add a comment to selected text, press Command+Option+M on macOS or Ctrl+Alt+M on Windows and Linux. The shortcut also works for selected text inside Canvas notes and native text cards. On a Canvas without a focused text editor, **Add comment** starts pin placement.

## Comment with an agent

To have an agent comment for you, send it the [Use Relay Comments with agents](/comments/use-relay-comments-with-agents/) guide and tell it the note and the passage. With the [Obsidian CLI](https://obsidian.md/help/cli) enabled, the agent can run:

```shell
obsidian vault="Work" comments:comment path="Launch plan.md" quote="Draft announcement" text="Who owns the announcement?"
```

## Related guides

- [Comment on a Canvas](/comments/comment-on-a-canvas/)
- [Suggest edits](/comments/suggest-edits/)
- [Use Relay Comments with agents](/comments/use-relay-comments-with-agents/)
