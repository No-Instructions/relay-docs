---
title: Use Relay Comments with agents
description: Have your agent comment, reply, and follow discussions, or suggest edits for review.
layout: doc.njk
---

Relay Comments stores comments as plain text in your Markdown notes using [CriticMarkup](/comments/comment-markup/). An agent that can edit the note can read and add comments, reply to a thread, resolve it, or suggest wording for you to review.

Give your agent this guide’s link and ask for what you want. For example:

> Follow [https://docs.relay.md/comments/use-relay-comments-with-agents/](/comments/use-relay-comments-with-agents/) to review my launch checklist. Leave a comment beside each task that needs an owner.

<span id="give-your-agent-the-skill"></span>

## Instructions for the agent

1. Find the note named in the request. If you need the plugin, follow [Install with an agent](/comments/install-relay-comments/#install-with-an-agent). If a step requires the user to do something in Obsidian, tell them what to do.
2. Load the [Relay Comments skill](https://raw.githubusercontent.com/No-Instructions/relay-skills/main/skills/relay-comments/SKILL.md) for this review. For future reviews, you can [install the skill](https://github.com/No-Instructions/relay-skills#installation) in your agent environment.
3. Use the [Obsidian CLI](/comments/cli-commands/) review commands when the CLI is enabled and the vault is open in Obsidian. If the CLI is unavailable, work directly with the [comment markup](/comments/comment-markup/). Read the existing thread before you reply.
4. Leave your feedback beside the passage it concerns. Reply in an existing thread when it already discusses that passage. When asked to suggest wording, leave a suggestion the user can accept or reject.
5. Reread the note to check your comments and suggestions landed on the intended passages.

To use a separate byline, follow [Give your agent a name and picture](/comments/set-your-comment-identity/#give-your-agent-a-name-and-picture). For command arguments, watch events, and error responses, see [Obsidian CLI commands](/comments/cli-commands/).
