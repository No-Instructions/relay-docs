---
title: Let your agent edit shared notes
description: Your agent edits the files on your disk, and Relay carries those edits to your team.
layout: doc.njk
---

Your AI coding agent, such as Claude Code, can work on your team's shared notes the same way it works on any other files: it edits the files on your disk. Relay then carries those edits to everyone else. That works even while notes are closed and while teammates are editing, as long as Obsidian is running.

## What you need

Your files need to be in a Shared Folder.

Agents also work with Relay versions before 0.8.12, but edits saved outside Obsidian were more likely to need resolving by hand.

For setup, install Relay, [share a folder](/guides/share-a-folder/), and [invite your collaborators](/guides/invite-a-collaborator/).

## Have your agent edit a shared note

Give your agent the path to the note and describe the change you want. The agent reads and edits the file, then saves it to disk. Relay picks up the saved file, merges it with your teammates' edits, and syncs the result.

<style>
.agent-edit-flow { margin: 1.5rem 0; }
.agent-edit-flow .flow-steps { display: flex; align-items: center; gap: .65rem; }
.agent-edit-flow .flow-node { flex: 1; padding: .9rem .6rem; border: 1px solid var(--color-border, #d4d4d8); border-radius: .5rem; background: var(--color-code-bg); text-align: center; font-size: .95rem; line-height: 1.4; }
.agent-edit-flow .flow-arrow { flex: none; opacity: .6; }
.agent-edit-flow figcaption { margin-top: .75rem; font-size: .875rem; line-height: 1.5; }
@media (max-width: 600px) {
  .agent-edit-flow .flow-steps { flex-direction: column; gap: .4rem; }
  .agent-edit-flow .flow-node { width: 100%; box-sizing: border-box; }
  .agent-edit-flow .flow-arrow { transform: rotate(90deg); }
}
</style>
<figure class="agent-edit-flow">
  <div class="flow-steps" aria-label="Agent, file on disk, Relay, teammates’ notes">
    <span class="flow-node">Agent</span><span class="flow-arrow" aria-hidden="true">→</span>
    <span class="flow-node">File on disk</span><span class="flow-arrow" aria-hidden="true">→</span>
    <span class="flow-node">Relay</span><span class="flow-arrow" aria-hidden="true">→</span>
    <span class="flow-node">Teammates’ notes</span>
  </div>
  <figcaption>The path of one saved edit: your agent saves the file on disk, and Relay carries the edit to your teammates’ copies of the note.</figcaption>
</figure>

Before a broad rewrite, [back up the notes you want to preserve](/guides/backing-up-your-obsidian-vault/).

## What to expect

### A teammate edits at the same time

Your teammates can keep editing while the agent works, and the saved changes appear in the shared note. Relay combines saved changes, but it doesn't judge whether they make sense together. Review the combined result when both change the same passage.

### Obsidian is closed

The agent can edit local files while Obsidian is closed, but those changes aren't shared until you reopen it. Relay normally reconciles them automatically; rare [local conflicts](/guides/resolve-local-conflicts/) can occur when the same lines were changed in different ways.

For details, see [how devices exchange saved changes](/how-relay-works/device-connections/) and [how Relay brings edits together](/how-relay-works/real-time-multiplayer-vs-repurposed-file-sync/#how-relay-solves-this).

## Related guides

- [Share a folder](/guides/share-a-folder/)
- [Invite a collaborator](/guides/invite-a-collaborator/)
- [Resolve local conflicts](/guides/resolve-local-conflicts/)
