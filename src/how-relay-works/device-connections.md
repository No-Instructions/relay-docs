---
title: How Relay connects your devices
description: How Relay connects local Obsidian vaults through a server, stores shared content, and coordinates access through the Control Plane.
layout: doc.njk
---

Relay connects local Obsidian vaults through a Relay Server. Your files stay on your device, while the server coordinates updates between people who share a folder.

## Local files and shared updates

Obsidian keeps your files on your local disk. Relay builds on that local-first model to let you collaborate on shared files.

Relay is built to be self-hosted. When you keep the server and storage on your private network, your shared content stays on infrastructure you control, where we cannot access it. If you prefer convenience, Relay can host the server and storage for you.

When you edit a shared document, Relay sends updates to that server. The server passes them to connected collaborators, whose Relay plugins apply them to their local copies. For Markdown notes and Canvas files, Relay uses shared data structures to merge edits within the document.

For a concrete example of that representation, see [How Canvas collaboration works](/how-relay-works/canvas-collaboration/).

## Devices that connect at different times

Collaborators do not have to be online together. The server retains shared document data and attachments so another device can receive them later.

For example, you can edit a note while your collaborator is offline. Once your device has synced the change to the server, you can go offline too. When your collaborator next connects, their device receives the change from the server.

{% include "storage-sequence.njk" %}

Your device’s local files and the server-side data serve different purposes: you work with the files in your vault, and the server keeps shared content available between connections. For which files need server storage, see [Storage for shared files](/how-relay-works/attachment-storage/).

## Server, storage, and Control Plane

Relay separates collaboration, persistence, and access management across three components:

| Component | Role |
| --- | --- |
| Relay Server | Coordinates document collaboration and file transfers |
| Storage | Retains shared document data and attachments |
| Control Plane | Manages accounts, permissions, and server and folder metadata |

Your Obsidian plugin uses the Control Plane to sign in and obtain access to shared content. It connects to the Relay Server to exchange document updates and files.

## Where the components run

When you self-host a Relay Server, you operate the server and provide its storage. Relay operates the Control Plane. Shared document content goes to your server; account and permission metadata still reaches Relay’s cloud.

When you use Relay cloud hosting, Relay operates the server and stores the shared content on its infrastructure too.

For the privacy boundary in each setup, see [What Relay can see](/how-relay-works/what-relay-can-see/). To select a deployment, see [Choose how to host Relay](/guides/choose-how-to-host-relay/).
