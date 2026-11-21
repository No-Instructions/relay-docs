---
title: Suggest edits
description: Propose text changes in Obsidian, then accept or reject suggestions.
layout: doc.njk
responsiveClips: true
---

{% from "responsive-clip.njk" import responsiveClip %}
Suggest text to add, replace, or remove. A reviewer can accept or reject each change in the note.

## Before you start

[Install Relay Comments](/comments/install-relay-comments/) and open a Markdown note in Live Preview. To change review items, you need write access to the note.

## Suggest an edit

To propose a replacement, use the substitution command:

1. In Live Preview, select the text you want to replace.
2. Open the [command palette](https://obsidian.md/help/plugins/command-palette) and run **Mark selection as substitution**. On macOS, press Cmd+P. On Windows or Linux, press Ctrl+P. On mobile, pull down from the top of the app if [Quick Action](https://obsidian.md/help/mobile#Quick%20Action) uses its default setting.
3. In **Replacement text**, enter the proposed text.
4. Select **Insert substitution**.

The replacement appears as a suggestion for review.

To propose an addition, type and select the proposed text, then run **Mark selection as addition**. To propose a deletion, select the text to remove, then run **Mark selection as deletion**.

## Accept or reject a suggestion

For a suggestion without an attached discussion, hover over it in your note, then select **Accept** or **Reject**. A suggestion with an attached discussion shows **Reply** and **Resolve** in its hover preview; use the sidebar’s **More actions** menu to accept or reject it.

<figure class="comments-guide-animation comments-native-column" id="accept-suggestion-demo">
  {{ responsiveClip("/assets/relay-comments/suggested-edits-desktop-0692af4b/index.html", "/assets/relay-comments/suggested-edits-phone-f63c4dc6/index.html", "752 / 470", "360 / 800", "Preview a suggested edit and accept it in the note") }}
</figure>

To accept from the sidebar:

1. From the command palette, run **Open review sidebar**.
2. Hover over the suggestion you want to accept.
3. Select the card’s ✓ (**Resolve**) button. If the suggestion has an attached discussion, this resolves the discussion first; select ✓ again to accept the suggestion.

To reject from the sidebar, open the suggestion’s **More actions** menu and choose **Reject suggestion**. The menu also includes **Accept suggestion**.

Accepting a replacement leaves the proposed text in the note; rejecting it leaves the original text. Accepting an addition keeps the added text, and accepting a deletion removes the marked text. Rejecting either leaves the note without that proposed change.

To accept all review markup in the note at once, run **Accept all comments and suggestions**. This also removes comments and highlight markup, so finish the discussions you need before using it.

## Suggest edits with an agent

Give your agent the [agent instructions](/comments/use-relay-comments-with-agents/#instructions-for-the-agent) and tell it which note to work on. Ask it to leave suggestions for you to accept or reject in Obsidian.

With the [Obsidian CLI](https://obsidian.md/help/cli) enabled, the agent can quote the exact text and propose a replacement. For example, to suggest changing a date in `Launch plan.md`:

```shell
obsidian vault="Work" comments:suggest path="Launch plan.md" quote="Ship on Friday" replace="Ship on Monday"
```

## Related guides

- [Comment on a note](/comments/comment-on-a-note/)
- [Use Relay Comments with agents](/comments/use-relay-comments-with-agents/)
