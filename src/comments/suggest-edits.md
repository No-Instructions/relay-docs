---
title: Suggest edits
description: Propose text changes in Obsidian, then accept or reject suggestions.
layout: doc.njk
commentsAnimation: true
---

Use Relay Comments to propose a replacement, addition, or deletion for review. Suggested edits stay in the Markdown file.

## Before you start

[Install Relay Comments](/comments/install-relay-comments/) and open a Markdown note in Live Preview. To change review items, you need write access to the note.

## Suggest an edit

To propose a replacement, use the substitution command:

1. In Live Preview, select the text you want to replace.
2. From the command palette, run **Mark selection as substitution**.
3. In **Replacement text**, enter the proposed text.
4. Select **Insert substitution**.

The replacement appears as a suggestion for review.

<figure class="comments-guide-animation comments-native-column">
  <iframe data-comments-animation style="--phone-scene-height: 364" src="/assets/relay-comments/suggest-edits/index.html?v=s14-85a477e2" title="Suggest a replacement and accept it in Obsidian"></iframe>
</figure>

To propose an addition, type and select the proposed text, then run **Mark selection as addition**. To propose a deletion, select the text to remove, then run **Mark selection as deletion**.

## Accept or reject a suggestion

For a suggestion without an attached discussion, hover over it in your note, then select **Accept** or **Reject**. A suggestion with an attached discussion shows **Reply** and **Resolve** in its hover preview; use the sidebar’s **More actions** menu to accept or reject it.

<figure style="max-width:408px">
  {% set screenshot = {"name": "relay-comments-suggested-replacement", "alt": "A suggested-replacement hover card showing the source reminder, its proposed replacement, and Accept and Reject links.", "width": 408, "height": 206} %}
{% include "comments-screenshot.njk" %}
  <figcaption>Hover over a suggestion without an attached discussion to accept or reject it in place.</figcaption>
</figure>

To accept from the sidebar:

1. From the command palette, run **Open review sidebar**.
2. Hover over the suggestion you want to accept.
3. Select the card’s ✓ (**Resolve**) button. If the suggestion has an attached discussion, this resolves the discussion first; select ✓ again to accept the suggestion.

To reject from the sidebar, open the suggestion’s **More actions** menu and choose **Reject suggestion**. The menu also includes **Accept suggestion**.

Accepting a replacement leaves the proposed text in the note; rejecting it leaves the original text. Accepting an addition keeps the added text, and accepting a deletion removes the marked text. Rejecting either leaves the note without that proposed change.

To accept all review markup in the note at once, run **Accept all comments and suggestions**. This also removes comments and highlight markup, so finish the discussions you need before using it.

## Suggest edits with an agent

Give your agent the [Relay Comments skill](/comments/use-relay-comments-with-agents/#give-your-agent-the-skill) and tell it which note to work on. Ask it to leave suggestions for you to accept or reject in Obsidian.

With the [Obsidian CLI](https://obsidian.md/help/cli) enabled, the agent can quote the exact text and propose a replacement. For example, to suggest changing a date in `Launch plan.md`:

```shell
obsidian vault="Work" comments:suggest path="Launch plan.md" quote="Ship on Friday" replace="Ship on Monday"
```

## Related guides

- [Comment on a note](/comments/comment-on-a-note/)
- [Use Relay Comments with agents](/comments/use-relay-comments-with-agents/)
