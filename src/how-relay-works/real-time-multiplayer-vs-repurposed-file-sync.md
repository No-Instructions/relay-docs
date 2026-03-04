---
title: Real-time multiplayer vs repurposed file sync
description: How Relay's CRDT-based approach differs from file sync tools repurposed for collaboration.
layout: doc.njk
---
In the Obsidian world, collaboration tools fall into three categories:

1. **File sync repurposed**: Tools like Obsidian Sync, designed for one person across multiple devices, now used by teams
2. **Real-time multiplayer**: Tools like Relay, built specifically for simultaneous collaborative editing
3. **Git-based**: Version control systems designed for asynchronous collaboration through branching and merging

The fundamental difference is how each handles conflicts arising from concurrent edits.

## Different philosophies about conflicts

**File sync tools** were designed assuming conflicts are rare — a single person won't edit the same file on two devices simultaneously. This assumption breaks when these tools are used by teams. When conflicts do happen between team members, these tools use simple resolution like "last write wins" — silently dropping one collaborator's contributions — because they weren't built for this scenario.

**Real-time multiplayer tools** assume conflicts are normal and frequent. They use specialized technology (like CRDTs) to merge concurrent edits automatically without data loss.

**Git-based** systems assume work is mostly asynchronous — people work separately and merge intentionally. When conflicts arise during merging, the system preserves both versions and requires explicit human resolution.

## When it matters

|                                    | File sync repurposed               | Real-time multiplayer        | Git-based                                    |
| ---------------------------------- | ---------------------------------- | ---------------------------- | -------------------------------------------- |
| **Two people edit same paragraph** | One person's work gets overwritten | Both contributions preserved | Merge conflict flagged for manual resolution |
| **See collaborator's changes**     | After the entire file is synced    | Instantly as they type       | After they commit and push                   |
| **See where others are editing**   | No                                 | Live cursors                 | No                                           |

## How Relay solves this

Relay uses CRDTs (Conflict-free Replicated Data Types) — a data structure designed specifically for merging concurrent edits. When two people type in the same paragraph:

1. Each keystroke is captured as an *update operation* with metadata (position, timestamp, user)
2. Operations are sent up instantly to the central Relay servers, then relayed on to collaborators the next time they are online
3. On the collaborators' side, Relay processes the operations and from them replicates the document locally
4. Everyone sees the same final result

This happens seamlessly in the background. You just see live cursors and instant updates.

Offline work is fully supported. CRDTs are designed such that the update operations are *commutative* — they can be processed in any order — and *idempotent* — duplicates of the same operation will be ignored.

If you'd like to learn more, we recommend checking out [Yjs](https://yjs.dev/), the open source CRDT that Relay uses, and a presentation by Cambridge researcher Martin Kleppmann called "[CRDTs: the Hard Parts](https://www.youtube.com/watch?v=x7drE24geUw)".

## The complete collaboration stack

For knowledge work teams, a great setup uses all three:

- **Obsidian** for thinking and editing
- **Relay** for Real-time multiplayer and active collaboration
- **Git** for version history and backup

Relay offers a Git sync feature so that your Relay Server can automatically update eg a GitHub repo every time someone makes an edit. This is a paid feature.
