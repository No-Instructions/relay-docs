---
title: Invite someone to collaborate
description: How to invite a collaborator to your Relay Server, share a folder with them, and start working together in real time.
layout: doc.njk
---

Invite someone to your Relay Server with a **Share Key**. If you haven’t set up a server and folder yet, create a Relay Server and [share a folder](/guides/share-a-folder/) first.

## Invite your collaborator

### 1. Open your Relay Server

Open Relay settings with the Relay ribbon icon in Obsidian's far-left sidebar. Under `Relay Servers`, click the gear icon for the server you want to share.

<figure>
  <img src="/assets/invite-a-collaborator/invite-a-collaborator-01-relay-settings-cued.png" alt="">
  <figcaption>Click the gear icon next to your Relay Server.</figcaption>
</figure>

### 2. Copy the Share Key

On the server's settings page, scroll to the `Sharing` section and make sure `Enable key sharing` is on. Then click the eye icon next to the `Share Key` to reveal it, and copy it.

<figure>
  <img src="/assets/invite-a-collaborator/invite-a-collaborator-03-share-key-cued.png" alt="">
  <figcaption>Click the eye icon to reveal the <code>Share Key</code>, then copy it. Treat it like a password — anyone who has it can join your Relay Server. Turn <code>Enable key sharing</code> off once everyone has joined, or use <code>Rotate key</code> to replace it.</figcaption>
</figure>

### 3. Send the Share Key to your collaborator

Send the key to your collaborator any way you like — a message, an email, however you normally reach them. They do not need Discord or any other account to join your Relay Server.

## Your collaborator joins

Your collaborator does these steps on their own device.

### 1. Install Obsidian and Relay

If they are new to Relay, they install Obsidian and the Relay plugin first. See [Install Relay for Obsidian](/guides/install-relay-for-obsidian/) for the setup steps.

### 2. Enter the Share Key

In Relay settings, under `Join a Relay Server`, they paste the key into the `Enter share key` field and click `Join`.

<figure>
  <img src="/assets/invite-a-collaborator/invite-a-collaborator-04-join-cued.png" alt="">
  <figcaption>The <code>Join a Relay Server</code> section is at the top of Relay settings. Paste the Share Key and click <code>Join</code>.</figcaption>
</figure>

### 3. Add the Shared Folder to the vault

After joining, your collaborator opens the Relay Server from their `Relay Servers` list. Next to the Shared Folder, click **Add to vault** (the download-arrow icon). Check the folder name and location, then click **Confirm**. Wait for the folder to sync before checking that edits appear on both devices.

<figure>
  <img src="/assets/invite-a-collaborator/invite-a-collaborator-05-added-folder-cued.png" alt="">
  <figcaption>The download-arrow icon opens <strong>Add to vault</strong>; check the folder name and location, then click <strong>Confirm</strong>. The <code>Users</code> list shows server membership, not whether each person has added the folder.</figcaption>
</figure>

## Watch the flow

This video shows the whole flow: an owner copies the Share Key, and a collaborator joins and adds the Shared Folder.

<video controls playsinline preload="metadata" poster="/assets/invite-a-collaborator/invite-a-collaborator-poster.png" style="display:block;width:100%;max-width:100%;margin:1.25rem 0;border:1px solid var(--color-border);border-radius:var(--radius);background:#f4f6f8;">
  <source src="/assets/invite-a-collaborator/invite-a-collaborator.webm" type="video/webm">
  <source src="/assets/invite-a-collaborator/invite-a-collaborator.mp4" type="video/mp4">
  <a href="/assets/invite-a-collaborator/invite-a-collaborator.mp4">Download the video</a>.
</video>

## Related guides

- [Create a Shared Folder with private access](/guides/private-shared-folders/)
- [Upgrade to a paid plan](/guides/upgrade-to-a-paid-plan/)
- [Collaborate on an Obsidian Canvas](/guides/collaborate-on-an-obsidian-canvas/)
- [Introduction](/introduction/)
