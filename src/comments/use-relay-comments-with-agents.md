---
title: Use Relay Comments with agents
description: Have your agent comment, reply, and follow discussions, or suggest edits for review.
layout: doc.njk
---

An agent can review a note alongside you because Relay Comments stores comments and suggestions in the Markdown file as [CriticMarkup](/comments/comment-markup/). Give an agent write access to the note and it can leave a question beside a passage, reply to an existing thread, or suggest a replacement. Open the note in Obsidian with Relay Comments enabled to reply or accept or reject the change.

## How an agent works with comments

Use the Obsidian CLI when it’s available. With the vault open in Obsidian and the CLI enabled, the agent uses the plugin’s [review commands](/comments/cli-commands/) to read threads and write comments or suggestions. If the CLI is unavailable, the agent can edit the markup directly. For instance, `{~~Friday~>Monday~~}` in the file appears as a suggestion to replace Friday with Monday. You can also [give the agent its own byline](/comments/set-your-comment-identity/#give-your-agent-a-name-and-picture).

<span id="instructions-for-the-agent"></span>
<span id="give-your-agent-the-skill"></span>

## Give your agent the instructions

Install the [Relay Comments skill](https://raw.githubusercontent.com/No-Instructions/relay-skills/main/skills/relay-comments/SKILL.md) using the [Relay Skills installation instructions](https://github.com/No-Instructions/relay-skills#installation) for your agent. The skill covers command syntax and markup format. Give your agent this page’s URL and the job you want done.

<pre aria-label="Example agent prompt" style="white-space: pre-wrap; overflow-wrap: anywhere"><code id="relay-comments-agent-prompt">Read https://docs.relay.md/comments/use-relay-comments-with-agents/ for instructions and get the Relay Comments skill linked there. Review the “Launch checklist” note. Leave a comment on each task that needs an owner.</code></pre>

<div class="copy-agent-instructions">
  <button type="button" class="copy-agent-button" id="copy-relay-comments-agent-prompt">Copy prompt</button>
  <span class="copy-agent-status" aria-live="polite"></span>
</div>

<script>
(() => {
  const prompt = document.getElementById('relay-comments-agent-prompt');
  const button = document.getElementById('copy-relay-comments-agent-prompt');
  const status = button.parentElement.querySelector('.copy-agent-status');

  async function copyText(text) {
    if (window.isSecureContext && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch {
        // Cross-origin previews can deny the Clipboard API.
      }
    }

    const field = document.createElement('textarea');
    field.value = text;
    field.readOnly = true;
    field.style.position = 'fixed';
    field.style.left = '-9999px';
    document.body.appendChild(field);
    try {
      field.select();
      if (!document.execCommand('copy')) throw new Error('Copy command unavailable');
    } finally {
      field.remove();
      button.focus({ preventScroll: true });
    }
  }

  button.addEventListener('click', async () => {
    status.textContent = '';
    try {
      await copyText(prompt.textContent);
      status.textContent = 'Copied.';
    } catch {
      status.textContent = 'Copy failed. Select the prompt above to copy it.';
    }
  });
})();
</script>
