---
title: Canvas multiplayer
description: Collaborate with your team in real time on Obsidian Canvas files using Relay.
layout: doc.njk
---
With Relay, you can collaborate with your team [in real time](/how-relay-works/real-time-multiplayer-vs-repurposed-file-sync/) on Obsidian's core Canvas tool. Great for mind maps, white boarding, process flows, etc.

> **Note: This feature is in beta**
>
> It's open to all, but special steps are required to enable it.
>
> Join the `canvas-beta` channel on the [Relay Discord server](https://discord.relay.md) to get setup instructions.

## What is Canvas?

[Canvas](https://obsidian.md/canvas) is a core Obsidian plugin that allows you to visualize your notes and their connections. It uses an open file format developed by the Obsidian team called [JSON Canvas](https://jsoncanvas.org/).

![](/assets/canvas-showcase-danlandrum.png)
*Canvas showcase from [danlandrum on the Obsidian Forum](https://forum.obsidian.md/t/anyone-want-to-share-showcase-their-canvas-creations/49979)*

## Canvas multiplayer

While `.canvas` files can be synced as binary (atomic units) like any other file, [real-time multiplayer](/how-relay-works/real-time-multiplayer-vs-repurposed-file-sync/) requires a specialized CRDT implementation within Relay. The reason is that markdown files — the first format we built support for at Relay — are backed by a single text CRDT, but Canvas files have multiple block types, inline text nodes, and even embedded markdown files.

Canvas multiplayer is out now in beta. Try it out to see your collaborators actions in real time. Join the [Relay Discord server](https://discord.relay.md) and visit the `#canvas-beta` channel to get started.

## Tell us about your use case

If Canvas multiplayer is important for your workflow:

1. **[Join our Discord](https://discord.relay.md)** - and get into the `#canvas-beta` channel
2. **Describe your specific use case**. This helps us steer design and development
3. **Follow our roadmap** at [relay.md/relay/roadmap](https://relay.md/relay/roadmap) for updates
