---
title: Relay Comments
description: Discuss passages in Obsidian with comment threads saved in the Markdown file.
layout: doc.njk
responsiveClips: true
---

Relay Comments brings Google Docs-style comment threads and suggested changes to Obsidian. Comments are stored as plain text in the Markdown note itself.

{% from "responsive-clip.njk" import commentsHero %}
<figure class="comments-hero comments-thread-hero">
  {{ commentsHero() }}
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

Teammates can see who wrote each comment and reply. [Set your comment identity](/comments/set-your-comment-identity/) to use your name and picture or give an assistant its own byline.

## Privacy

Relay Comments has no client-side telemetry. If an author’s profile picture uses a web URL, Obsidian loads the image from that address when the review sidebar displays it.

## Use with a team

Comments and suggested edits are stored in the Markdown note, so they travel with it through Relay, Obsidian Sync, or another file sync service. With [Relay for Obsidian](/introduction/), teammates can edit the same note in real time from their own vaults. Each collaborator installs and enables Relay Comments to see threads and review suggestions in Obsidian.

[Set up Relay Comments for your team](/comments/use-with-collaborators/).

## Use with agents

An agent with access to the Markdown file can leave a comment, reply to a thread, or suggest a change. If you already use the [Obsidian CLI](/comments/cli-commands/), your agent can also run Relay Comments commands while the vault is open in Obsidian. Give it the [agent guide](/comments/use-relay-comments-with-agents/), the note’s path, and a task. For example: “Review the launch checklist. Leave a comment beside any task that’s missing an owner.”
