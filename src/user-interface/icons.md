---
title: Understanding Relay's UI icons
description: Relay adds several icons to your Obsidian interface to give you status information and quick access to controls.
layout: doc.njk
---
Relay adds several icons to your Obsidian interface to give you important status information and quick access to controls.

![](/assets/relay-ui-icons.png)

## Stack icons (1, 3)

The stack icons tell you whether or not Relay is successfully tracking changes to your files.

On your local machine, Relay works by making sure three things stay in sync:

- the content you see in your Obsidian editor
- the content stored on your hard disk
- the content in your database of CRDT updates

When Relay is successfully tracking updates in the editor and storing them in the CRDT database, the stack icon will be colored to indicate that Relay is tracking. This is the foundation of Relay's [true multiplayer](/how-relay-works/real-time-multiplayer-vs-repurposed-file-sync/) system.

If these three things fall out of sync, a problem has occurred, and the stack icons will turn gray.

- Colored stack icon = Good. Relay is tracking your changes at the keystroke level and maintaining them in your local CRDT update database.
- Gray stack icon = Problem. Relay is not able to track your changes properly. See [Gray stack icon troubleshooting](/troubleshooting/stack-icon-gray/).
- No stack icon = This note is not in a shared folder, or it's a file type that Relay doesn't support for CRDT tracking, or there's a problem.

The icon in the note (3, in the diagram above) gives you status about the current note, and the icon in the folder tree (1 above) gives you status of the shared folder as a whole.

## Satellite icons (2, 4)

The satellite icons tell you whether or not Relay is syncing with remote servers.

- Colored satellite icon = Connected. Your changes are being synced to the server, and from there they will be relayed on to any connected collaborators. You'll also receive updates from collaborators.
- Gray or missing satellite icon = Not connected. This could mean you're not signed in, have connection issues, or there's an authentication problem.

The icon in the note (4 above) pertains to that specific note. You can click the icon to intentionally toggle syncing on or off. For example, you might like to turn syncing off to have a bit of privacy while you're writing, and turn it back on when you're done.

The icon in the file tree (2 above) pertains to the entire shared folder. You can right-click the folder and toggle connect/disconnect in the menu.

## External file icon (5)

When your note contains a link to another note that is not within the same shared folder, Relay shows a small file icon with an exclamation point next to the link (see 5 in the image above).

This warns you that your collaborators may not be able to access the linked file (unless they have access to it via a different shared folder). If a collaborator clicks the link, it will create a new empty note in their vault.

To make the icon go away, move the linked-to file into the same shared folder, or move the link to a file in the same shared folder as the target file.

## Ribbon icon (6)

The Relay ribbon icon provides quick access the Relay settings screens.

## Troubleshooting

For help with icon-related issues, see our [Gray stack icon troubleshooting](/troubleshooting/stack-icon-gray/) guide, or join the discord server at https://discord.relay.md.
