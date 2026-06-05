---
title: Invite someone to collaborate
description: How to invite a collaborator to your Relay Server, share a folder with them, and start working together in real time.
layout: doc.njk
---

To collaborate with someone in Relay, you put your work in a Shared Folder on a Relay Server, then invite them to that Relay Server with a **Share Key**. They paste the key into Relay to join, add the Shared Folder to their vault, and your edits sync in real time.

You do not need Discord, a separate account system, or an email invite. Everything happens inside Relay's settings.

## Watch the flow

This video shows the whole flow: an owner copies the Share Key, and a collaborator joins and adds the Shared Folder.

<video controls playsinline preload="metadata" poster="/assets/invite-a-collaborator/invite-a-collaborator-poster.png" style="display:block;width:100%;max-width:100%;margin:1.25rem 0;border:1px solid var(--color-border);border-radius:var(--radius);background:#f4f6f8;">
  <source src="/assets/invite-a-collaborator/invite-a-collaborator.webm" type="video/webm">
  <source src="/assets/invite-a-collaborator/invite-a-collaborator.mp4" type="video/mp4">
  <a href="/assets/invite-a-collaborator/invite-a-collaborator.mp4">Download the video</a>.
</video>

## Before you start

- You and your collaborator each need Obsidian with the Relay plugin installed. New to Relay? Start with the [Introduction](/introduction/).
- You need a Relay Server with at least one Shared Folder. If you have not made one yet, see [Create a Shared Folder with private access](/guides/private-shared-folders/).
- Relay's free tier supports up to 3 users per Relay Server. For larger teams, or to sync images, PDFs, and other file types, see [Upgrade to Relay for teams](/guides/upgrade-to-relay-for-teams/).

## Put your work in a Shared Folder

Anything inside a Shared Folder on your Relay Server is shared with the people on that server — unless the folder uses [private access](/guides/private-shared-folders/), which limits it to selected people. Drag the notes or Canvas you want to collaborate on into a Shared Folder.

Because real-time collaboration is powerful, keep a backup copy of anything important before you share it, especially when you are trying a beta feature like [Canvas multiplayer](/features/canvas-multiplayer/).

## Invite your collaborator

### 1. Open your Relay Server

Open Relay settings with the Relay ribbon icon in Obsidian's far-left sidebar. Under `Relay Servers`, click the gear icon for the server you want to share.

![](/assets/invite-a-collaborator/invite-a-collaborator-01-relay-settings-cued.png)

*Click the gear icon next to your Relay Server.*

### 2. Copy the Share Key

On the server's settings page, scroll to the `Sharing` section and make sure `Enable key sharing` is on. Then click the eye icon next to the `Share Key` to reveal it, and copy it.

![](/assets/invite-a-collaborator/invite-a-collaborator-03-share-key-cued.png)

*Click the eye icon to reveal the `Share Key`, then copy it. Treat it like a password — anyone who has it can join your Relay Server. Turn `Enable key sharing` off once everyone has joined, or use `Rotate key` to replace it.*

### 3. Send the Share Key to your collaborator

Send the key to your collaborator any way you like — a message, an email, however you normally reach them. They do not need Discord or any other account to join your Relay Server.

## Your collaborator joins

Your collaborator does these steps on their own device.

### 1. Install Obsidian and Relay

If they are new to Relay, they install Obsidian and the Relay plugin first. See the [Introduction](/introduction/) for the full setup.

### 2. Enter the Share Key

In Relay settings, under `Join a Relay Server`, they paste the key into the `Enter share key` field and click `Join`.

![](/assets/invite-a-collaborator/invite-a-collaborator-04-join-cued.png)

*The `Join a Relay Server` section is at the top of Relay settings. Paste the Share Key and click `Join`.*

### 3. Add the Shared Folder to the vault

After joining, your collaborator opens the Relay Server from their `Relay Servers` list. The Shared Folder is listed there — they click the Download button next to it to add it to their vault. Relay syncs the folder locally, and you are collaborating in real time.

![](/assets/invite-a-collaborator/invite-a-collaborator-05-added-folder-cued.png)

*Click the Download button next to the Shared Folder to add it to your vault. Both people now appear under `Users` on the Relay Server.*

## Troubleshooting

### My collaborator joined, but our edits aren't showing up

First, make sure each person has actually added the Shared Folder to their own vault — joining the Relay Server is not enough on its own. On the Relay Server's settings page, the Shared Folder has a Download button to add it locally.

If the folder is added on both sides and edits still aren't syncing, a few things can jog it into action:

- Both people reload Obsidian: open the command palette and run `Reload app without saving`.
- Right-click the Shared Folder in your file list and choose `Relay: Sync`.
- Make a fresh copy of the file from your vault and drag the copy into the Shared Folder.

### Do we need Discord to collaborate?

No. The [Relay Discord](https://discord.relay.md) is our community and support server, and it is a great place to ask questions, but it has nothing to do with joining a Relay Server. Your collaborator joins entirely inside Relay using the Share Key.

### We're collaborating on a Canvas

Real-time Canvas collaboration is currently a beta feature and needs to be enabled. See [Canvas multiplayer](/features/canvas-multiplayer/) for how to turn it on and what to expect.

### I want to control who can see each folder

By default, everyone on a Relay Server can access its Shared Folders. To limit a folder to specific people, use a Shared Folder with private access — see [Create a Shared Folder with private access](/guides/private-shared-folders/).

## Related guides

- [Create a Shared Folder with private access](/guides/private-shared-folders/)
- [Upgrade to Relay for teams](/guides/upgrade-to-relay-for-teams/)
- [Canvas multiplayer](/features/canvas-multiplayer/)
- [Introduction](/introduction/)
