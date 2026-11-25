---
title: Suggest edits
description: Propose text changes in Obsidian, then accept or reject suggestions.
layout: doc.njk
responsiveClips: true
---

{% from "responsive-clip.njk" import responsiveClip %}
Suggest text to add, replace, or remove. A reviewer can accept or reject each change in the note.

<figure class="comments-guide-animation comments-native-column" id="create-suggestion-review-demo">
  {{ responsiveClip("/assets/relay-comments/create-suggestion-desktop-5870ce51/index.html", "/assets/relay-comments/create-suggestion-phone-4cf95adf/index.html", "720 / 450", "360 / 800", "Create a suggested replacement in Obsidian") }}
</figure>

<span id="before-you-start"></span>

## Prepare a note for review

[Install Relay Comments](/comments/install-relay-comments/) and open a Markdown note in Live Preview. To change review items, you need write access to the note.

## Suggest an edit

Each kind of suggestion has its own command in the [command palette](https://obsidian.md/help/plugins/command-palette):

- **Replace text.** Select it and run **Mark selection as substitution**.
- **Add text.** Type the new text, select it, and run **Mark selection as addition**.
- **Remove text.** Select it and run **Mark selection as deletion**.

For example, to suggest a replacement:

1. In Live Preview, select the text you want to replace.
2. Open the command palette and run **Mark selection as substitution**.
3. In **Replacement text**, enter the proposed text.
4. Select **Insert substitution**.

The replacement appears as a suggestion for review.

To open the command palette, press Cmd+P on macOS or Ctrl+P on Windows or Linux. On mobile, pull down from the top of the app if [Quick Action](https://obsidian.md/help/mobile#Quick%20Action) uses its default setting.

## Accept or reject a suggestion

Hover over the suggestion in your note, then select **Accept** or **Reject**.

<figure class="comments-guide-animation comments-native-column" id="accept-suggestion-demo">
  {{ responsiveClip("/assets/relay-comments/suggested-edits-desktop-f0a5fccb/index.html", "/assets/relay-comments/suggested-edits-phone-70d0c2fd/index.html", "752 / 470", "360 / 800", "Preview a suggested edit and accept it in the note") }}
</figure>

If the suggestion has a discussion attached, its hover preview shows **Reply** and **Resolve** instead. Accept or reject it from the sidebar.

To accept or reject from the sidebar:

1. [Open the sidebar](/comments/comment-on-a-note/#use-the-sidebar-for-discussion).
2. Hover over the suggestion’s card.
3. To accept, select the card’s ✓ (**Resolve**) button. To reject, open **More actions** and choose **Reject suggestion**.

If the suggestion has a discussion attached, ✓ resolves the discussion first; select ✓ again to accept the suggestion. **More actions** also includes **Accept suggestion**.

What each choice does:

- **Replacement.** Accepting keeps the proposed text. Rejecting keeps the original.
- **Addition.** Accepting keeps the added text. Rejecting removes it.
- **Deletion.** Accepting removes the marked text. Rejecting keeps it.

To accept all review markup in the note at once, run **Accept all comments and suggestions**. This also removes comments and highlight markup, so finish the discussions you need before using it.

## Suggest edits with an agent

To have an agent suggest edits for you, send it the [Use Relay Comments with agents](/comments/use-relay-comments-with-agents/) guide and tell it which note to work on. Ask it to leave suggestions for you to accept or reject in Obsidian. With the [Obsidian CLI](https://obsidian.md/help/cli) enabled, the agent can quote the exact text and propose a replacement:

```shell
obsidian vault="Work" comments:suggest path="Launch plan.md" quote="Ship on Friday" replace="Ship on Monday"
```

## Related guides

- [Comment on a note](/comments/comment-on-a-note/)
- [Use Relay Comments with agents](/comments/use-relay-comments-with-agents/)
