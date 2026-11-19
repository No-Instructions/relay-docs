---
title: Obsidian CLI commands
description: Look up Relay Comments commands, arguments, and response fields.
layout: doc.njk
---

Relay Comments adds the `comments` commands to the [Obsidian CLI](https://obsidian.md/help/cli). Enable Relay Comments in your vault, then run these commands from your terminal.

Invoke commands as `obsidian vault="VAULT" COMMAND key=value`. Every command accepts `--json` (or `format=json`); without it, the response is text. Pass boolean arguments as `open=true`, `any=true`, or `delete=true`. Square brackets below mean optional arguments, and `|` separates alternatives.

## Commands and arguments

| Command | Arguments | Action |
| --- | --- | --- |
| `comments` | `[path=NOTE]` | Report the version, signing identity, identity directory, and watch state. |
| `comments:threads` | `path=NOTE_OR_FOLDER [open=true]` | List threads and invalid marks; `open=true` filters out resolved threads. |
| `comments:watch` | `[path=NOTE_OR_FOLDER] [since=CURSOR] [timeout=SECONDS] [kind=KINDS] [ignore-author=AUTHORS] [any=true]` | Wait once for matching activity. |
| `comments:comment` | `path=NOTE quote=PASSAGE text=COMMENT [line=N] [author=NAME_OR_ID]` | Open a thread on a passage. |
| `comments:reply` | `path=NOTE thread=INDEX_OR_ID text=REPLY [author=NAME_OR_ID]` | Append a reply after the final comment. |
| `comments:resolve` | `path=NOTE thread=INDEX_OR_ID [author=NAME_OR_ID]` | Remove a thread's discussion; unwrap a CriticMarkup highlight, or keep a suggestion or native highlight. |
| `comments:accept` | `path=NOTE thread=INDEX_OR_ID [author=NAME_OR_ID]` | Apply a suggestion and remove its attached comments. |
| `comments:reject` | `path=NOTE thread=INDEX_OR_ID [author=NAME_OR_ID]` | Restore the suggestion's original text and remove its attached comments. |
| `comments:suggest` | `path=NOTE quote=PASSAGE (replace=TEXT \| insert=TEXT \| delete=true) [line=N] [comment=TEXT] [author=NAME_OR_ID]` | Propose exactly one replacement, insertion after the passage, or deletion; optionally attach an explanation. |

When a quote appears more than once, the command refuses with `ambiguous_quote` and lists the matching lines. Add the 1-based `line=N` to pick one. Accept and reject apply only to suggestions.

For `quote`, `text`, `replace`, `insert`, and `comment` values, literal `\n` and `\t` become newlines and tabs. Keep shell quoting around values that contain spaces.

Every write command accepts `author=` as a configured identity's ID or name, or a plain display name. The response's `undoable` describes whether the plugin treats the edit as yours: writes as another identity stay outside your undo history.

If you edit a note through the Obsidian CLI while the note is open and the response has `undoable: true`, click in that note and press ⌘Z on macOS. A write made as another identity remains in the note.

## Command outputs

Every JSON success response includes `ok: true` plus the fields below. Text responses summarize the same operation; text thread and event summaries shorten long bodies.

| Command | JSON payload fields | Text response |
| --- | --- | --- |
| `comments` | `version`, `identity` (`null` or `id`, `name`, `source`), `identities` (ID/name pairs), `cursor`, `watching`, `trackedNotes`, `waiters` | Labeled lines for version, identity, identities, cursor, watching, tracked notes, and waiting. |
| `comments:threads` | For a file: `path`, `threads`, `invalid`. For a folder: `folder`, `notes`, each with `path`, `threads`, and `invalid`. | File path and thread count, then numbered threads and comments; invalid marks follow. Empty folders return `No threads under FOLDER`. |
| `comments:watch` | `scope`, `cursor`, `events`, `timedOut`, `gap` | Numbered events with added and removed marks, or a no-changes message, followed by `cursor: N`; a gap adds a catch-up message. |
| `comments:comment` | `path`, `thread`, `threads`, `signedAs`, `identitySource`, `undoable` | Confirmation and the resulting thread, or remaining thread count. |
| `comments:reply` | `path`, `thread`, `threads`, `signedAs`, `identitySource`, `undoable` | Confirmation and the resulting thread, or remaining thread count. |
| `comments:resolve` | `path`, `thread`, `threads`, `resolved`, `undoable` | Resolution confirmation and remaining thread count. `resolved` contains the thread before the action. |
| `comments:accept` | `path`, `thread`, `threads`, `applied`, `undoable` | Acceptance confirmation and remaining thread count. `applied` contains the thread before the action. |
| `comments:reject` | `path`, `thread`, `threads`, `applied`, `undoable` | Rejection confirmation and remaining thread count. `applied` contains the thread before the action. |
| `comments:suggest` | `path`, `thread`, `threads`, `undoable`; with `comment=`, also `signedAs` and `identitySource` | Suggestion confirmation and the resulting thread, or remaining thread count. |

In write responses, `threads` is the remaining count, and `thread` is the resulting thread or `null`.

A listed text thread has `index`, `id`, `kind`, `line`, `from`, `to`, `anchorFrom`, `anchorTo`, `text`, `resolved`, and `comments`. Substitutions also have `oldText` and `newText`; highlights can have `color`. Comments have `text` and source positions, plus `author`, `authorId`, and `date` when present.

Each watch event has `seq`, `time`, `type`, `path`, `added`, `removed`, and `marks`. Mark summaries have `kind`, `text`, shortened `raw`, and applicable line, author, and date fields.

## Related guides

- [Use Relay Comments with agents](/comments/0.5.2/use-relay-comments-with-agents/)
- [Comment markup](/comments/0.5.2/comment-markup/)
