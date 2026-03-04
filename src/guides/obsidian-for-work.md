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
  - You can get total privacy with self-hosting, but that requires setup (vs cloud is instant)

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

For example: suppose you and your partner have a shopping list containing "milk". While offline, you specify "oat" while your partner specifies "almond". When you come back online you'll get something like "oatalmond milk." Changes merged automatically and you're guaranteed to see the same document — but you'll have to resolve the milk decision socially.

One other conflict type: if you edit files on disk while Relay isn't running, Relay will ask what to do when it notices the difference.

### What about version history?

These are local files. We recommend you use Git for version history. The Git plugin for Obsidian is excellent and can be set to commit every five minutes. In addition, Obsidian has a core File Recovery plugin that can be used to recover past versions of a file.

### Is it private? Is it secure? Can I self-host?

Obsidian alone is private — like a house with no windows or doors. Add collaboration and you need a server to coordinate edits. That server introduces questions: who controls it? Are they trustworthy? What can they see if trust isn't enough?

Relay offers three deployment options with different privacy guarantees:

  Cloud (we host)
  - Fastest setup
  - Our company could see your data if compelled to by a court. This has never happened. We do not read, sell, or train on your data.

  Hybrid (you host relay server, we host identity)
  - Document content never touches our servers — we can't see it even if we wanted to
  - We see limited metadata
  - Good for teams wanting privacy guarantees

  Air-gapped (you host everything)
  - We can't see any data, not even metadata
  - Total control, requires most setup
  - Tradeoff: closed collaboration network — can only share with people on your deployment
  - Good for the most security-sensitive organizations

  All options encrypt data in transit and at rest. We do not offer end-to-end encryption.

  See [Hosting options](/features/hosting-options/) and [Pricing](https://relay.md/pricing) for details.

### Comments and notifications?

Obsidian doesn't have native comments or notifications. This is part of the flexibility tradeoff — you get more power but need to figure out your own solutions. You can use plugins, write custom scripts, or simply develop team social protocols that work for you.

For comments: Because files are markdown, you can create whatever system works for you. Internally at System 3, we use hotkeys to insert tags with highlighting:

==@Matt at 2025-10-15 Wed 05:15pm: This is a comment==

For notifications: We handle this socially. If someone updates a doc and wants it seen, they ping in Slack or add a line to the next day's standup agenda. It works well for us and minimizes notification spam. Teams can also create custom file watchers and Slack or Discord bots.

### Task and project management?

With plugins like TaskNotes, Dataview, and Bases, some teams manage projects entirely in Obsidian.

But if task management is your primary need, you might still use a dedicated tool like Asana or Linear. Obsidian's strength is networked thinking and knowledge management. Task workflows are quickly improving, but still require considerable attention to set up.

### Cost

Relay has a free plan, but most business users will want to use the product on one of our paid tiers. See our [pricing page](https://relay.md/pricing) for details on our plans.

### Try Relay

Install from Obsidian community plugins. You can start with our free plan to check it out, and invite your team when you're ready.

If you have questions about deployment, security, or enterprise features, [contact us](https://system3.md/contact).
