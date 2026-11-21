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

The note holds the comment and its author information as [CriticMarkup](/comments/comment-markup/). For example, a comment signed by an assistant can look like this:

{% raw %}
```text
{{authorId="review-bot" author="Checklist reviewer">>Who owns this task?<<}}
```
{% endraw %}

Here, `author` is a readable name that travels with the text. `authorId` lets a reader’s vault look up the reviewer. When the sidebar renders the comment, it first checks the selected identity service, then the vault’s own identity list. Without a match, a teammate sees **Checklist reviewer** from the note, with initials in place of a picture.

## Give your agent a name and picture

If you want an assistant’s reviews to have a recognizable byline, you can give it this instruction:

> Use the reviewer ID `review-bot` and the name `Checklist reviewer` when you comment on notes in this vault. Keep my existing Relay Comments settings.

For an agent with file access, the identity list is the top-level `identities` array in `.obsidian/plugins/relay-comments/data.json`. If the vault uses a custom settings directory, substitute it for `.obsidian`. Add an entry to the array, or update the existing entry with the same ID. Preserve the other entries and settings.

```json
{"id": "review-bot", "name": "Checklist reviewer", "picture": "https://example.org/reviewer.png", "color": "#9a563b"}
```

Replace the example URL with your image URL, or omit `picture` to show initials. The optional `color` sets the circle behind the initials. To change the byline this vault displays for that directory entry, keep the ID and update its name or picture. Relay Comments refreshes its identity list when Obsidian reports a settings change.

An agent using the [Obsidian CLI](/comments/cli-commands/) can sign a comment with `author=review-bot`. An agent editing Markdown directly can use the author fields shown above.

## What teammates see

When you [review a shared note with your team](/comments/use-with-collaborators/), each signed comment shows who wrote it.

[Relay](/introduction/) shows teammates your Relay name and, if you have one, your Relay profile picture.

**Custom identities.** If you give an assistant a custom picture or color, its name still travels with its comments. The picture and color come from a matching entry in each teammate’s vault. Relay shares the note, so copy that entry to the other vaults if you want everyone to see the same custom identity.

**With Obsidian Sync**, your own devices can sync the plugin settings file as well as the note. Use the same remote vault and settings profile, with **Installed community plugins** enabled on both devices. This shares the plugin’s settings as a file, including its identity list. See [Obsidian Sync settings](https://obsidian.md/help/sync/settings).

With another file sync service, the same distinction applies: syncing the note carries the signed comment; syncing the plugin settings also carries its identity list.
