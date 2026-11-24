---
title: Set your comment identity
description: See where comment names and avatars come from, how an agent can sign a comment, and what teammates see.
layout: doc.njk
responsiveClips: true
---

If your team uses [Relay](/introduction/), your comments are signed with your Relay name automatically. Your teammates can see who’s speaking without setting up comment identities. It can also use an identity supplied by Obsidian Sync. Comments work without either service. An unsigned comment shows **Unknown author** in the sidebar.

{% from "responsive-clip.njk" import responsiveClip %}
<figure class="comments-guide-animation comments-native-column" id="comment-identity-demo">
  {{ responsiveClip("/assets/relay-comments/comment-identity-desktop-86299070/index.html", "/assets/relay-comments/comment-identity-phone-2f898353/index.html", "720 / 417", "360 / 349", "Illustrated comment thread with names and avatars from Relay, Obsidian Sync, and local settings") }}
</figure>

## What’s saved with a comment

The note stores both the message and its byline. A plain [CriticMarkup comment](/comments/comment-markup/) puts the message between `{>>` and `<<}`. Relay Comments adds author fields for a signed comment:

{% raw %}
```text
{{authorId="review-bot" author="Checklist reviewer">>Who owns this task?<<}}
```

<figure aria-label="Parts of a signed comment">
<dl style="display:grid;grid-template-columns:minmax(0,auto) minmax(45%,1fr);overflow-wrap:anywhere;align-items:baseline;gap:.55rem 1rem;margin:0">
  <dt><code>{{</code></dt><dd style="margin:0">Opens a signed comment.</dd>
  <dt><code>authorId="review-bot"</code></dt><dd style="margin:0">Identifies the reviewer. The sidebar looks up this ID in the selected identity service, then in the vault’s identity list.</dd>
  <dt><code>author="Checklist reviewer"</code></dt><dd style="margin:0">Saves the readable name in the note. If the ID has no match, teammates see this name and its initials.</dd>
  <dt><code>&gt;&gt;</code></dt><dd style="margin:0">Ends the author fields and starts the message.</dd>
  <dt><code>Who owns this task?</code></dt><dd style="margin:0">The reviewer’s words. This is the message teammates read in the comment thread. Replace it with your own comment.</dd>
  <dt><code>&lt;&lt;}}</code></dt><dd style="margin:0">Ends the message and closes the signed comment.</dd>
</dl>
</figure>
{% endraw %}

## Give your agent a name and picture

If your assistant works with local vault files or the Obsidian CLI, give it this instruction to sign comments with its own byline.

> Use the reviewer ID `review-bot` and the name `Checklist reviewer` when you comment on notes in this vault. Keep my existing Relay Comments settings.

For an agent with file access, the identity list is the top-level `identities` array in `.obsidian/plugins/relay-comments/data.json`. If the vault uses a custom settings directory, substitute it for `.obsidian`. Add an entry to the array, or update the existing entry with the same ID. Preserve the other entries and settings.

```json
{"id": "review-bot", "name": "Checklist reviewer", "picture": "https://example.org/reviewer.png", "color": "#9a563b"}
```

Replace the example URL with a reachable HTTPS image URL. If the identity resolves without a picture, the sidebar shows initials. The optional `color` sets the circle behind the initials. To change the byline this vault displays for that directory entry, keep the ID and update its name or picture. Relay Comments refreshes its identity list when Obsidian reports a settings change.

An agent using the [Obsidian CLI](/comments/cli-commands/) can sign a comment with `author=review-bot`. An agent editing Markdown directly can use the author fields shown above.

## What teammates see

When you [review a shared note with your team](/comments/use-with-collaborators/), each signed comment shows who wrote it.

[Relay](/introduction/) shows teammates your Relay name and, if you have one, your Relay profile picture.

**Custom identities.** The name saved in the comment travels with the note. To see the same custom picture or color, each teammate’s vault must resolve the author ID to the matching identity entry. The teammate’s device also needs to reach the picture URL. Copy the identity entry to the other vaults to share the same custom identity.

**With Obsidian Sync**, your own devices can sync the plugin settings file as well as the note. Use the same remote vault and settings profile, with **Installed community plugins** enabled on both devices. This shares the plugin’s settings as a file, including its identity list. See [Obsidian Sync settings](https://obsidian.md/help/sync/settings).

With another file sync service, the same distinction applies: syncing the note carries the signed comment; syncing the plugin settings also carries its identity list.
