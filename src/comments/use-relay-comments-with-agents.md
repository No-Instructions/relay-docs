---
title: Use Relay Comments with agents
description: Have your agent comment, reply, and follow discussions, or suggest edits for review.
layout: doc.njk
---

An agent can review a note alongside you because Relay Comments stores comments and suggestions in the Markdown file as [CriticMarkup](/comments/comment-markup/). Give an agent write access to the note and it can leave a question beside a passage, reply to an existing thread, or suggest a replacement. Open the note in Obsidian with Relay Comments enabled to reply, or to accept or reject the change.

<span id="instructions-for-the-agent"></span>
<span id="give-your-agent-the-skill"></span>

## Give your agent the instructions

Send your agent the link to this page and tell it which note to review. The next section tells the agent what to do.

```
https://docs.relay.md/comments/use-relay-comments-with-agents/
```

## How an agent works with comments

1. **Get the Relay Comments skill.** The agent installs the [Relay Comments skill](https://raw.githubusercontent.com/No-Instructions/relay-skills/main/skills/relay-comments/SKILL.md) by following the [Relay Skills installation instructions](https://github.com/No-Instructions/relay-skills#installation) for its kind of agent. The skill covers command syntax and markup format.
2. **Use the Obsidian CLI when it’s available.** With the vault open in Obsidian and the CLI enabled, the agent uses the plugin’s [review commands](/comments/cli-commands/) to read threads and write comments or suggestions.
3. **Otherwise, edit the markup directly.** For instance, `{~~Friday~>Monday~~}` in the file appears as a suggestion to replace Friday with Monday.

You can also [give the agent its own byline](/comments/set-your-comment-identity/#give-your-agent-a-name-and-picture).
