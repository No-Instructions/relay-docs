---
title: Use Relay Comments with agents
description: Have your agent comment, reply, and follow discussions, or suggest edits for review.
layout: doc.njk
---

Your agent can read comments, add comments, reply to threads, and resolve discussions in Relay Comments. It can edit the note's CriticMarkup directly, or use the `comments` command family through the Obsidian CLI.

Your agent can also suggest edits for review and accept or reject suggestions.

## Prepare your agent

Any agent that can read and edit Markdown files can work with the markup in your notes. For plugin setup, see [Install Relay Comments](/comments/install-relay-comments/).

For the CLI, you need Relay Comments 0.5.0 or later, Obsidian desktop 1.12.2 or later with the command line interface enabled, and the vault open in the running app.

## Give your agent the skill

The [relay-skills repository](https://github.com/No-Instructions/relay-skills) includes the `relay-comments` skill, which explains review roles, markup, identity, and how to respond to threads.

1. To install through a skill installer, run the repository's HTTPS command:

   ```sh
   npx skills add https://github.com/No-Instructions/relay-skills
   ```

   For Claude Code's plugin marketplace, the repository also provides these commands:

   ```text
   /plugin marketplace add No-Instructions/relay-skills
   /plugin install relay@relay-skills
   ```

   For manual installation in Claude Code, add the repository's contents to the `.claude` folder at the root of your vault or working folder. For Codex, copy its `skills/` directory into your Codex skills path, typically `~/.codex/skills`.
2. Give your agent the vault name, note path, and task. Say whether you want it to participate in the discussion, suggest changes for review, or edit the note.
3. If the agent has its own review identity, have it pass that identity as `author=` on CLI writes. Without an override, the CLI uses your configured reviewer identity.

The skill repository lists Obsidian 1.12.4 or later as its requirement. Relay Comments' CLI itself requires 1.12.2 or later.

## Start a review

Replace `VAULT`, `NOTE.md`, and the other uppercase values with your own values. Paths are relative to the vault.

1. To check the plugin version and signing identity, run:

   ```sh
   obsidian vault="VAULT" comments path="NOTE.md" --json
   ```

2. To read the note's threads and suggestions, run:

   ```sh
   obsidian vault="VAULT" comments:threads path="NOTE.md" --json
   ```

3. Read the whole note and each thread before responding. To append a reply, use the thread's `index` or `id` from the listing:

   ```sh
   obsidian vault="VAULT" comments:reply path="NOTE.md" thread="THREAD" text="REPLY" author="AGENT" --json
   ```

4. To open a discussion on another passage, quote it exactly:

   ```sh
   obsidian vault="VAULT" comments:comment path="NOTE.md" quote="PASSAGE" text="COMMENT" author="AGENT" --json
   ```

5. After the requested work is complete, resolve its discussion. Resolving a suggestion's discussion leaves the suggestion for review.

## Suggest edits for review

To propose a replacement for review, quote the passage exactly:

```sh
obsidian vault="VAULT" comments:suggest path="NOTE.md" quote="PASSAGE" replace="REPLACEMENT" comment="REASON" author="AGENT" --json
```

A suggestion’s author appears on its attached comment. To attribute your agent's suggestion, attach a short comment with `comment=` and pass its identity as `author=`.

To accept or reject a suggestion, use `comments:accept` or `comments:reject` instead of resolving its discussion.

## Check the result

For each JSON response, check `ok`. A successful response has `ok: true`; a failure has `ok: false`, `code`, and `message`. The Obsidian CLI's exit code alone doesn't distinguish success from failure.

After a write, list the threads again and reread the note. Check the passage, reply order, and attribution before continuing. Thread numbers follow document order, and a text anchor's ID can change when text before it changes, so use a fresh listing after edits.

<figure style="max-width:430px">
  {% set screenshot = {"name": "relay-comments-agent-cli-review", "alt": "The review sidebar. Research agent replies to Priya that the study reports twelve interviews, then suggests replacing Friday with Monday and explains why.", "full": "relay-comments-agent-cli-review-full", "width": 430, "height": 428} %}
{% include "comments-screenshot.njk" %}
  <figcaption>The agent's reply and suggested replacement in the review sidebar. Select the image to see it beside the note.</figcaption>
</figure>

## Follow a note's review activity

The scoped watch introduced with the CLI in 0.5.0 lets your agent wait for comments, replies, resolutions, and suggestions.

1. To start tracking a note without waiting, arm its scope with a zero-second timeout:

   ```sh
   obsidian vault="VAULT" comments:watch path="NOTE.md" timeout=0 --json
   ```

   Keep the returned `cursor`. The first watch takes a baseline; it doesn't return comments already present as new events.
2. To catch up on the baseline, list the note's threads and read the note.
3. To wait for changes after that baseline, pass its cursor:

   ```sh
   obsidian vault="VAULT" comments:watch path="NOTE.md" since=CURSOR timeout=30 ignore-author="AGENT" --json
   ```

4. When a call returns events, reread the note and its threads, then respond as needed. To continue watching, call again with the returned cursor. A call returns once; it doesn't run your agent or write a response for it. Responses can be batched; continue with the returned cursor to catch up. A zero-second poll immediately after a write can return empty while the change is being processed.

A note or folder stays tracked between watch calls. When Relay Comments reloads, tracking starts over: the cursor returns to 0, so arm the scope again.

The watch compares review marks, so ordinary typing outside marks doesn't produce a review-change event. `any=true` also returns for edits that leave marks unchanged, but those edit events aren't retained for a later `since=` call.

The filters apply to each call:

| Argument | Behavior |
| --- | --- |
| `kind=KINDS` | Accept comma-separated `comment`, `highlight`, `addition`, `deletion`, or `substitution`. |
| `ignore-author=AUTHORS` | Accept comma-separated names or IDs. Skip events whose marks are all by those authors. |
| `timeout=SECONDS` | Return an empty event list with `timedOut: true` after the interval. Without a timeout, wait until matching activity. |
| `since=CURSOR` | Return retained matching events after the cursor, or wait for the next match. The in-memory log retains 1,000 events; `gap: true` means earlier events were dropped. |

When `gap` is true, list threads again to recover the note's review state. After the plugin reloads, arm the scope and take a fresh baseline; its in-memory log doesn't provide a durable review history. A cursor from before the reload can return empty events with `gap: false`; that response doesn't recover the earlier session.

## Recover from a failed command

If the JSON response has `ok: false`, use `code` and `message` before retrying. For an ambiguous quote, add `line=`; quote errors report occurrence lines in `occurrences`. If a passage overlaps a mark, reply to its thread instead of adding nested markup. If a thread has moved or changed, list it again.

If the command family is unavailable, check that Relay Comments is enabled, the vault is open in Obsidian desktop, and Obsidian meets the CLI requirements. Your agent can also edit CriticMarkup directly.

## Related guides

- [Comment on a note](/comments/comment-on-a-note/)
- [Obsidian CLI commands](/comments/cli-commands/)
- [Comment markup](/comments/comment-markup/)
- [Let your agent edit shared notes](/guides/collaborate-with-an-agent/)
