---
title: Collaborate on Kanban boards
description: Use Relay to collaborate on Obsidian Kanban boards stored in a Relay Shared Folder.
layout: doc.njk
---

Relay can sync Obsidian Kanban boards in real time when the board file lives inside a Relay Shared Folder.

Kanban boards are still local Markdown files. The Kanban plugin gives you the board interface; Relay syncs the underlying board file so collaborators see the same cards and columns.

![A Kanban board open inside a Relay Shared Folder](/assets/kanban-collaboration/kanban-collaboration-01-shared-folder-board.png)

## Before you start

- Use Relay 0.7.0 or newer.
- Install and enable the Obsidian Kanban community plugin on each device that needs the board view. The plugin view type Relay supports is `kanban`; the plugin is commonly installed under the id `obsidian-kanban`.
- Put the board file inside a Relay Shared Folder.
- Make sure each collaborator has added that Shared Folder to their vault.

If someone opens the board without the Kanban plugin, they may see the board as Markdown instead of as columns and cards. Relay can still sync the file, but that device will not have the Kanban interface.

## What Relay syncs

Relay syncs the board file that the Kanban plugin saves.

That means normal board changes sync through Relay:

- adding a card
- editing card text
- moving a card between columns
- changing the Markdown that represents the board

When a Kanban board is open, Relay treats it as an Obsidian text-file view: it watches the saved board text and syncs changes to collaborators.

## What to expect

When you edit a board, collaborators should see the same board content after Relay syncs the change. If both people have the Kanban plugin installed, they can work from the column-and-card view on their own devices.

![Owner adds a card to the board](/assets/kanban-collaboration/kanban-collaboration-02-owner-card-added.png)

![The same card arrives on the collaborator's board](/assets/kanban-collaboration/kanban-collaboration-03-collaborator-card-arrived.png)

Moves sync in both directions: when the collaborator drags a card to another column, the owner sees it land.

![Collaborator moves the card to another column](/assets/kanban-collaboration/kanban-collaboration-04-collaborator-card-moved.png)

![The move arrives on the owner's board](/assets/kanban-collaboration/kanban-collaboration-05-owner-move-arrived.png)

Kanban collaboration is not the same as the live cursor experience in a Markdown note. Relay does not show character-level cursors inside Kanban cards. The useful signal is the board state: card text, column placement, and the saved Markdown behind the board.

If two people change the same card or column at the same time, Relay may need you to resolve the resulting conflict. That is normal for overlapping edits to the same underlying file. For version history on important boards, use Git or another backup tool — backups work fine alongside Relay; the [no-double-coverage rule](/guides/using-relay-with-other-sync-services/) applies to sync services, not backups. See [Backing up your Obsidian vault](/guides/backing-up-your-obsidian-vault/).

## Set up a shared Kanban board

1. Install Relay and the Kanban plugin on each collaborator's device.
2. Create or choose a Relay Shared Folder for the project.
3. Create the Kanban board inside that Shared Folder.
4. Ask each collaborator to add the Shared Folder to their vault.
5. Ask each collaborator to open the board in Kanban view.
6. Make a small test edit, such as adding a card named `Relay sync test`.
7. Confirm the card appears for the other collaborator.

Keep the first test boring. Use a disposable card before moving real work.

## Use a local agent to test a board

If you use Claude Code, Codex, Cursor, or another supervised local agent, it can help you verify that a Kanban board is in the right place and make one small approved test edit.

This is useful when your team uses Kanban boards as shared project state and wants proof that the board file is inside the Relay Shared Folder before relying on it.

![A card added by a supervised local agent arriving on a teammate's board](/assets/kanban-collaboration/kanban-collaboration-06-agent-card-arrived.png)

<div class="copy-agent-instructions">
  <button type="button" class="copy-agent-button" data-copy-kanban-agent-instructions>Copy agent instructions as Markdown</button>
  <span class="copy-agent-status" aria-live="polite"></span>
</div>

<textarea id="kanban-agent-instructions" hidden>
# Test a Relay Kanban board

You are a supervised local coding agent on the user's computer. The user wants you to inspect or create a small Obsidian Kanban test board inside a Relay Shared Folder.

## Boundaries

- Work only inside the Relay Shared Folder the user provides.
- Do not move, delete, rename, or reorganize existing project cards unless the user explicitly approves the exact change.
- Do not touch credentials, account settings, Relay settings, or Obsidian plugin settings.
- Do not assume another device received your change. Ask the user or teammate on that device to confirm what they see in Obsidian.
- If you write to the board file directly from disk, use this only with the Relay beta/new sync engine path described at https://docs.relay.md/guides/use-relay-with-local-agents/ once that guide is available. Otherwise, prepare the board and ask the user to make the test edit in Obsidian's Kanban UI.

## Procedure

1. Ask for the absolute path to the Relay Shared Folder.
   Reason: the board has to live inside the folder Relay syncs.

2. Walk upward from the Shared Folder until you find `.obsidian`. If there is no `.obsidian` directory, stop.
   Reason: a Relay Shared Folder lives inside an Obsidian vault.

3. Check Relay is installed by reading `<vault>/.obsidian/plugins/system3-relay/manifest.json`. Report the installed version.
   Reason: Kanban collaboration requires Relay. Relay 0.7.0 or newer is the public shipped target for this feature.

4. Check for the Kanban plugin by looking for `<vault>/.obsidian/plugins/obsidian-kanban/manifest.json`. If that path is missing, report that you could not verify the plugin from disk and ask the user to confirm the Kanban plugin is enabled in Obsidian.
   Reason: Relay syncs the file, but the Kanban board interface comes from the Kanban community plugin.

5. List candidate Kanban board files in the Shared Folder. Look for Markdown files whose frontmatter includes `kanban-plugin`.
   Reason: Kanban boards are Markdown files with Kanban plugin metadata.

6. If the user wants a new test board, ask before creating it. Use a small file such as `Relay Kanban sync test.md` with this content:

```markdown
---
kanban-plugin: basic
---

## Backlog

- [ ] Relay sync test card

## Doing

## Done
```

7. Before editing an existing board, report the exact board path, the current columns you found, and the one test card change you propose. Wait for approval.
   Reason: project boards often contain real work.

8. Make only the approved test edit. A safe edit is adding a card named `Relay sync test from agent` under a test column, or changing that exact card to `Relay sync test received`.

9. Report:
   - the board file you inspected or changed
   - whether Relay and Kanban were verified from disk
   - the exact card change made
   - what the teammate should look for in Obsidian
   - any uncertainty, especially if the other device has not confirmed receipt

## Operating rule

The board file is the source of truth. Obsidian's Kanban view is a friendly interface over that file, and Relay syncs the file between collaborators.
</textarea>

## Troubleshooting

### The board opens as plain Markdown

Install and enable the Kanban plugin on that device. Relay can sync the board file either way, but the board interface comes from the Kanban plugin.

![Without the Kanban plugin, the board file opens as plain Markdown](/assets/kanban-collaboration/kanban-collaboration-07-missing-plugin-markdown.png)

### A collaborator cannot see the board

Make sure the board file is inside a Relay Shared Folder, and make sure the collaborator has added that Shared Folder to their vault. Joining the Relay Server is not enough on its own.

### A card edit does not appear for someone else

Check the basics first:

1. Both devices have Relay running and signed in.
2. Both devices have the Shared Folder added locally.
3. Both devices have the Kanban plugin installed and enabled if they need board view.
4. The board file is inside the Shared Folder.
5. The stack icon is not gray. If it is, see [Stack icon is gray](/troubleshooting/stack-icon-gray/).

If the board still does not sync, run the Obsidian command `Relay: Send bug report`, or post in the [Relay Discord](https://discord.relay.md).

## Related guides

- [Invite someone to collaborate](/guides/invite-a-collaborator/)
- [Create a Shared Folder with private access](/guides/private-shared-folders/)
- [Using Relay with other sync services](/guides/using-relay-with-other-sync-services/)
- [Stack icon is gray](/troubleshooting/stack-icon-gray/)

{#
Draft notes: source basis and media needed

Source basis checked:

- GTM canon says Kanban collaboration is shipped per roadmap, but proof/compatibility wording should stay conservative until a docs proof page exists.
- Relay roadmap source lists `Kanban collaboration` as completed in `0.7.0` and describes it as real-time multiplayer support for the community Kanban plugin.
- Relay plugin commit `85f176f` added Kanban view support behind a flag by expanding Relay live views from Markdown-only to text-file views.
- Relay plugin commit `ebe6fba` enabled Kanban sync behind the `enableKanbanView` feature flag; tag `0.7.0` contains that commit and has `enableKanbanView: true` by default.
- Current `LiveViews.ts` includes `kanban` in the allowed `TextFileView` view types; non-Markdown text views use `TextFileViewPlugin`.
- `TextViewPlugin.ts` patches `setViewData` and `requestSave`, reads board text with `getViewData()`, applies local board changes to the Relay document, observes remote Yjs text changes, writes remote board text back into the view with `setViewData`, and requests a native view save.
- Source comments in `merge-hsm-integration-guide.md` and `obsidian-editor-lifecycle.md` classify Kanban as a non-CodeMirror `TextFileView`, where changes are observable through `getViewData()` and `requestSave()`.
- Harness plan `TP-027-kanban-view-sync-and-collaboration.md` defines the desired proof: Kanban view opens as `viewType == "kanban"`, enters active tracking, add/edit/move card changes persist to disk and CRDT, cross-vault edits converge, close/reopen returns cleanly.

2026-06-10: all seven captures embedded above with relative paths (render in Obsidian review). QA recaptured the set in the canonical screenshot style: default zoom, 1240x620 window, left sidebar context, scripted red arrows except the missing-plugin fallback where the whole Markdown view is the proof surface. At draft→src promotion: rewrite to /assets/kanban-collaboration/... and move assets to src/assets/kanban-collaboration/.

Harness media captured (was: needed before publish):

- Desktop screenshot: board file inside a Relay Shared Folder opened in Kanban view, with the Shared Folder visible enough to establish context.
- Short video or paired screenshots: user A adds a card in Backlog; user B sees the card appear in the same board.
- Short video or paired screenshots: user B edits or moves that card; user A sees the updated card/column.
- Evidence screenshot or JSON capture: active Obsidian view type is `kanban` for the board file.
- Disk proof capture: the Kanban board Markdown contains the card change after a UI edit.
- Agent-track proof capture: a supervised agent creates or edits a disposable test card in the board file, then reports the exact file changed and what the teammate should verify.
- Failure-state screenshot if available: board opens as Markdown when the Kanban plugin is missing, with copy explaining that Relay still syncs the file but the board UI requires the plugin.
#}

<script>
(() => {
  const payload = document.getElementById('kanban-agent-instructions');
  const buttons = Array.from(document.querySelectorAll('[data-copy-kanban-agent-instructions]'));

  if (!payload || buttons.length === 0) return;

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const temp = document.createElement('textarea');
    temp.value = text;
    temp.setAttribute('readonly', '');
    temp.style.position = 'fixed';
    temp.style.left = '-9999px';
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
  }

  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const status = button.parentElement.querySelector('.copy-agent-status');
      try {
        await copyText(payload.value.trim() + '\n');
        if (status) status.textContent = 'Copied.';
      } catch {
        if (status) status.textContent = 'Copy failed. Select the agent instructions below instead.';
      }
    });
  });
})();
</script>
