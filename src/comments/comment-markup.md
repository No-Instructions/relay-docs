---
title: Comment markup
description: Look up CriticMarkup syntax for comments, replies, and suggested edits.
layout: doc.njk
---

{% raw %}

Review marks live in the Markdown file. To work without the CLI, read and edit those marks directly.

## Marks

| Purpose | Source |
| --- | --- |
| Comment | `{>>comment text<<}` |
| Highlight | `{==marked text==}` |
| Insertion | `{++inserted text++}` |
| Deletion | `{--removed text--}` |
| Substitution | `{~~old~>new~~}` |

To attach a comment to a passage, place it immediately after the highlight. Authored comments use double braces and double-quoted metadata values:

```text
{==the passage==}{{authorId="j4n8b2x0q7m1zk5" author="Bongo Cat">>Can we ground this sooner?<<}}
```

Comments also attach after Obsidian's native `==highlight==` syntax without converting the highlight.

## Threads and replies

An anchor followed by adjacent comments forms one ordered thread. The anchor can be a highlight, suggestion, or standalone comment. Append a reply after the final comment. A single line break, with optional spaces or tabs around it, also joins comments; intervening text or a blank line ends the thread.

This complete thread is a plugin test fixture:

```text
{==the passage==}{{authorId="u1" author="Bongo Cat" date="2026-07-13T07:01:55.123Z">>Can we ground this sooner?<<}}{{author="Claude">>Yes, see below.<<}}
```

To preserve a note’s block structure, keep opening and closing heading hashes, list markers, task checkboxes, quote markers, and callout type markers outside the highlight. Keep CriticMarkup marks separate because nested marks are invalid.

```text
> [!note] {==Review scope==}{>>Can we include the pilot?<<}
```

## Authors and timestamps

`authorId` identifies an author, and `author` preserves a readable name when identity resolution is unavailable. With only one identity value, the plugin writes `author` alone.

CLI-written comments add `date` as an ISO-8601 UTC timestamp, after the identity fields. Sidebar-written comments omit the date. This is an exact expected value from the plugin's formatter tests:

```text
{{authorId="123456" author="Bongo Cat" date="2026-09-26T12:00:00.000Z">>Looks good<<}}
```

For direct edits, preserve the other messages' authors and dates. To sign your own reply, use your agent's name in `author` and the current UTC timestamp in `date`; use an ID only when it belongs to your agent's identity. Keep double quotes and line breaks out of metadata values, and keep the closing sequence `<<}` out of comment bodies.

## Resolution and suggestion outcomes

Resolving a Markdown discussion removes its comment markup from the note. For direct edits, apply the same transformations as the CLI:

| Thread | Resolve |
| --- | --- |
| CriticMarkup highlight with comments | Keep the passage; remove the highlight delimiters and all attached comments. |
| Native highlight with comments | Keep the native highlight; remove the attached comments. |
| Standalone comment with replies | Remove the whole comment run. |
| Suggestion with comments | Keep the suggestion mark; remove its attached comments. |

A suggestion with no comments has no discussion for `comments:resolve` to remove; accept or reject it instead; `comments:resolve` returns `nothing_to_resolve`.

Accepting or rejecting a suggestion also removes its attached comments:

| Suggestion | Accept | Reject |
| --- | --- | --- |
| Insertion | Keep the inserted text without delimiters. | Remove the mark and its text. |
| Deletion | Remove the mark and its text. | Keep the deleted text without delimiters. |
| Substitution | Keep the replacement text. | Keep the original text. |

## Related guides

- [Use Relay Comments with agents](/comments/use-relay-comments-with-agents/)
- [Obsidian CLI commands](/comments/cli-commands/)

{% endraw %}
