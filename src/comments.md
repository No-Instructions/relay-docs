---
title: Relay Comments
description: Discuss passages in Obsidian with comment threads saved in the Markdown file.
layout: doc.njk
responsiveClips: true
---

Relay Comments brings Google Docs-style comment threads and suggested changes to Obsidian. Comments are stored as plain text in the Markdown note itself.


{% from "responsive-clip.njk" import commentsHero %}
<figure class="comments-hero comments-thread-hero">
  {{ commentsHero() | trim }}
</figure>

## Add a comment

If you haven’t installed the plugin yet, [install Relay Comments](/comments/install-relay-comments/).

1. In Live Preview, select the text you want to discuss.
2. Click the **Add comment** button beside the selection. It looks like a speech bubble with a plus sign.
3. In the sidebar, type your comment and click **Comment**.

You can also right-click the selected text and choose **Add comment**, or run **Add comment** from the command palette. To reply to a thread or resolve it, see [Comment on a note](/comments/comment-on-a-note/).

## Suggest an edit

1. In Live Preview, select the text you want to replace.
2. Open the command palette and run **Mark selection as substitution**.
3. In **Replacement text**, enter your proposed wording and click **Insert substitution**.

Hover over the suggestion to **Accept** or **Reject** it. For additions, deletions, and suggestions with comments attached, see [Suggest edits](/comments/suggest-edits/).

## Author names

Relay Comments takes author names from Relay or Obsidian Sync. You can also configure an identity directory in the plugin's `data.json`: each entry maps an ID to a name, picture, and color. The plugin reloads this file when it changes.

If you don't have a matching identity for a comment's author, you see the name saved in its inline `author` field. Comments remain readable when the identity provider is unavailable.

For agent identities and file-based review, see [Use Relay Comments with agents](/comments/use-relay-comments-with-agents/).

For shared-note agent editing, see [Let your agent edit shared notes](/guides/collaborate-with-an-agent/).

## Privacy

Relay Comments has no client-side telemetry. If an author’s profile picture uses a web URL, Obsidian loads the image from that address when the review sidebar displays it.

## Use with a team

If you’re using Relay Comments with a team, [Relay for Obsidian](/introduction/) lets you share a folder and edit notes together in real time. Comments and suggested edits sync with the note.

[Set up Relay Comments for your team](/comments/use-with-collaborators/).
