---
title: Obsidian for work
description: Using Obsidian and Relay for team collaboration at work.
layout: doc.njk
---
## Can I use Obsidian at work?

Yes, you can use Obsidian for work with your teammates. Many advanced teams are already doing so with Relay.

There are significant advantages to using Obsidian+Relay over traditional tools like Google Docs and Notion. There are also drawbacks.

  - You get the tool you love, but your team needs to learn it (vs everyone knows Google Docs)
  - You get the power and flexibility of local files, but you make more decisions
  - You keep your documents on hardware you control with self-hosting, but that requires setup (vs cloud is instant)

This guide explains what you need to know.

### Why use Obsidian at work?

Knowledge workers want to use Obsidian at work for the same reasons they use it personally:

- Local files (file over app: longevity and capabilities)
- Graph structure
- Extensibility (plugins, editors like VS Code, terminal scripts, language models, etc)

They want the best knowledge tools at work where the stakes are high.

### The challenge: Obsidian is single-player

What's missing from Obsidian is multiplayer.

You can use Obsidian Sync or Google Drive, but you'll risk collisions and lost data if two people edit offline or at the same time. You can use Git, but you'll deal with merges. In either case, you won't get live presence and real-time cursors.

The ideal would be a Google Docs-like collaboration UX, inside Obsidian.

That's what Relay does. Using CRDT technology (Yjs), it lets everyone work on local files simultaneously while guaranteeing they'll converge to the same document.

### Is it real-time?

Yes, it's real-time, and our users frequently report being surprised at how fast it is. If you and your collaborators are online and editing at the same time, you can watch one another's cursors move with each keystroke.

Each user works with a local file (the Obsidian way), which means you don't need to receive anything from a remote location in order to work. Relay streams your updates in the background. The result is you never have to wait for a connection to make edits, and you have live presence with your collaborators as long as you're both online.

### What about offline?

Relay has excellent support for offline editing.

Whether you're offline or not, Relay tracks every change as an operation and stores them in a local database. When you're back online, operations stream up to the server and then are relayed on to collaborators. CRDT operations are commutative (any order) and idempotent (duplicates are fine). So you can work offline as much as you like, and the CRDT ensures that when you come back online and sync your operations, everyone will converge to the same document.

### What about conflicts and merges?

CRDTs are 'conflict-free' in the technical sense — they make all merges automatically — but they can't resolve social disagreements.

For example: suppose a project brief says "Deadline: Friday". While offline, you change it to "Thursday" while a teammate changes it to "Monday". When you come back online you'll get something like "Deadline: ThursdayMonday". Changes merged automatically and you're guaranteed to see the same document — but you'll have to settle the deadline with your teammate.

Files can also change on disk while Relay isn't running, for example from Claude Code or a local script. When Relay starts again, it detects the changed file, works out what changed since the version everyone last agreed on, and merges that with your collaborators' edits. In the rare case when the file on disk and a collaborator changed the same lines in different ways, Relay marks the note with a local conflict and asks you to choose what to keep. See [Resolve local conflicts](/guides/resolve-local-conflicts/).

### What about version history?

These are local files. We recommend you use Git for version history. The Git plugin for Obsidian is excellent and can be set to commit every five minutes. In addition, Obsidian has a core File Recovery plugin that can be used to recover past versions of a file. For backup options, see [Back up your Obsidian vault](/guides/backing-up-your-obsidian-vault/).

### Is it private? Is it secure? Can I self-host?

Obsidian alone is private — like a house with no windows or doors. Add collaboration and that changes: your edits need a way to reach your teammates, and each teammate keeps a copy of the shared notes on their own machine. Relay uses a server to pass edits between those copies. So the questions apply to the server and to your teammates' machines alike: who controls them? Are they trustworthy? What can they see if trust isn't enough?

Relay is built to be self-hosted, and self-hosting is free on every plan. If you'd rather not run a server, we can host it for you.

  Self-hosted
  - Your Relay Server runs on your private network, so document content never touches our servers — we couldn't see it if we wanted to
  - Relay isn't end-to-end encrypted, so the server that can read your documents still exists; with self-hosting, that server is yours
  - Our control plane sees limited metadata: accounts, permissions, and folder membership
  - You set up and maintain the server

  Cloud (we host)
  - Fastest setup
  - Your document content moves through our servers, like any traditional SaaS service

  For exactly what data reaches which servers under each hosting option, see [What Relay can see](/how-relay-works/what-relay-can-see/).

  See [Hosting options](/guides/choose-how-to-host-relay/) and [Pricing](https://relay.md/pricing) for details.

### Comments and notifications?

For comments, use [Relay Comments](https://github.com/No-Instructions/Relay-Comments), in beta. Select text and add a comment, reply in a thread, or suggest edits that the author can accept or reject. Comments are stored in the note itself as plain CriticMarkup, so they sync with the note and stay readable in any editor.

Obsidian doesn't have native notifications. We handle this socially: if someone updates a doc and wants it seen, they ping in Slack or add a line to the next day's standup agenda. Individuals can also have a local coding agent set up file watchers and alerts.

### Task and project management?

With plugins like TaskNotes, Dataview, and Bases, some teams manage projects entirely in Obsidian.

### Cost

Relay has a free plan, and paid plans for larger teams. See our [pricing page](https://relay.md/pricing) for details.

### Try Relay

Install from Obsidian community plugins. You can start with our free plan to check it out, and invite your team when you're ready.

If you have questions about deployment, security, or enterprise features, [contact us](https://system3.md/contact).
