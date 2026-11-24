---
title: Use with a team
description: Discuss a passage with your team and carry the thread between vaults using the service that syncs your notes.
layout: doc.njk
responsiveClips: true
---

Relay Comments saves comments, replies, and suggested edits directly in the Markdown note using [CriticMarkup](/comments/comment-markup/). Any service that syncs the note carries the discussion with it. When a teammate opens their synced copy with Relay Comments enabled, they can reply to the same thread.

{% from "responsive-clip.njk" import responsiveClip %}
<figure class="comments-guide-animation comments-native-column" id="reply-to-thread-demo">
  {{ responsiveClip("/assets/relay-comments/reply-to-thread-desktop-1a5d8f07/index.html", "/assets/relay-comments/reply-to-thread-phone-ca560fe4/index.html", "752 / 470", "360 / 800", "Open an incoming comment and reply in the Relay Comments sidebar") }}
</figure>

## Prepare each vault

Have each collaborator [install and enable Relay Comments](/comments/install-relay-comments/) in their vault. Anyone can open the Markdown file. Without the plugin, Source mode shows the review markup, such as `{>>Check this date.<<}` or `{~~Friday~>Monday~~}`. Reading view can style parts of that text. Enable the plugin to open threads, reply, and accept or reject suggestions.

## Open the same note with Relay

We recommend [Relay for Obsidian](/introduction/) when teammates edit the same note at the same time. Posted comments arrive in real time, and you can share just the project’s Shared Folder.

Each person needs to be [signed in to Relay](/guides/install-relay-for-obsidian/#sign-in-to-relay). If you already share a folder, open the same note from that folder in your own vaults.

To set up a Shared Folder, one person [shares the folder](/guides/share-a-folder/) and [invites the team](/guides/invite-a-collaborator/). Each teammate joins the Relay Server, then selects **Add to vault** for the Shared Folder. Once it syncs, the note appears in their vault.

Once you’re in the same note, anyone with write access and [Relay Comments enabled](/comments/install-relay-comments/) can [comment on a passage, reply to a thread, or resolve it](/comments/comment-on-a-note/) and [suggest edits or accept or reject a teammate’s changes](/comments/suggest-edits/).

On desktop, hover over the highlighted passage to read a teammate’s comment. Select **Reply** in the preview to open that thread in the sidebar.

## Share through another sync service

If your team uses Obsidian Sync, Self-hosted LiveSync, or another service, keep sharing the Markdown note through that service.

With Obsidian Sync, two people can change the same thread before their copies sync. Its default Markdown merge can preserve both replies. If one person resolves the thread while another adds a reply, the merged note can lose that reply. If you work on the same passage, let your changes sync before the next person edits it.

Obsidian Sync also offers **Create conflict file** so you can compare the two versions yourself. See [how Obsidian Sync handles conflicts](https://obsidian.md/help/sync/troubleshoot).
