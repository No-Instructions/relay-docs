---
title: Create a Shared Folder with private access
description: How to share a Relay Shared Folder with only selected users.
layout: doc.njk
---

A Shared Folder lets you share a folder and everything inside it with people on a Relay Server. A Shared Folder with private access is shared only with selected Relay Server users.

The important detail is that private access is configured on the Relay Server that has the paid plan. Make sure you are adding the Shared Folder to the Relay Server on Starter. Subscriptions apply to Relay Servers, not to your user account.

## Watch the flow

This video shows how to create a Shared Folder with private access in Relay settings.

<video controls playsinline preload="metadata" poster="/assets/private-shared-folders/private-shared-folders-poster.png" style="display:block;width:100%;max-width:100%;margin:1.25rem 0;border:1px solid var(--color-border);border-radius:var(--radius);background:#f4f6f8;">
  <source src="/assets/private-shared-folders/private-shared-folders.webm" type="video/webm">
  <source src="/assets/private-shared-folders/private-shared-folders.mp4" type="video/mp4">
  <a href="/assets/private-shared-folders/private-shared-folders.mp4">Download the video</a>.
</video>

## Before you start

- The Relay Server must be on a paid plan that includes private access for Shared Folders. If needed, see [our pricing plans](https://relay.md/pricing).
- You must be a Member or Owner on that Relay Server. Relay Server Members can create Shared Folders with private access; you do not need to be the Relay Server owner.
- The people who need access should already be users on that Relay Server.
- Use a current version of the Relay Obsidian plugin. See [Update Relay](/guides/update-relay/), or for the adventurous, [Get the latest Relay beta](/guides/install-relay-beta/).

## Create the Shared Folder with private access

### 1. Open the paid Relay Server

Open Relay settings in Obsidian and select a Relay Server that has a plan with private access.

![](/assets/private-shared-folders/private-shared-folder-01-paid-relay.png)

*Private access for Shared Folders is enabled per paid Relay Server, not globally on your account.*

### 2. Click `Share local folder`

In the Relay Server settings, click `Share local folder`.

Relay opens the folder selector first. The private access controls are behind this selector, and they may be hidden if your folder list is long. Choose or create the folder you want to share before looking for the `Private` toggle.

![](/assets/private-shared-folders/private-shared-folder-02-folder-selector.png)

*The folder selector appears in front of the share dialog. Select the folder first.*

### 3. Turn on `Private`

After selecting the folder, turn on `Private`.

When `Private` is on, only selected Relay Server users can access this Shared Folder.

![](/assets/private-shared-folders/private-shared-folder-03-private-toggle.png)

*The `Private` toggle appears after the folder is selected.*

### 4. Add the users who should have access

Click `Add Users`, then select the users who should be able to access the Shared Folder.

Relay adds you automatically as the Shared Folder owner. Select the other Relay Server users who should have access.

![](/assets/private-shared-folders/private-shared-folder-04-add-users.png)

*Select the Relay Server users who should have access to the folder.*

### 5. Click `Share`

Click `Share` to create the Shared Folder.

The folder appears under `Shared Folders on this Relay Server`.

![](/assets/private-shared-folders/private-shared-folder-05-folder-shared.png)

*The Shared Folder appears on the Relay Server after sharing.*

## Troubleshooting

### I do not see the `Private` toggle

Check that you selected a Relay Server with a plan that includes private access. A paid subscription applies to one Relay Server, not to every Relay Server connected to your user account. If you upgraded a different server, switch to that server or [upgrade this Relay Server](/guides/upgrade-to-relay-for-teams/).

If you are on the right server and still do not see the toggle, [update the Relay plugin](/guides/update-relay/).

### Do I need to be the Relay Server owner?

No. Relay Server Members can create Shared Folders with private access on a Relay Server that supports private access. The creator is added automatically as the Shared Folder owner.

### I do not see the person I want to add

Private access is selected from the users already on that Relay Server. Add the person to the Relay Server first, then create or edit the Shared Folder access list.

### Can I set per-folder view and edit roles?

The current Shared Folder flow lets you choose which Relay Server users can access the folder. It does not expose separate per-folder view/edit role controls in this screen.

Use the Relay Server `Users` section for server-level user management. For private access to a Shared Folder, use the `Private` toggle and selected-user list.

## Related guides

- [Upgrade to Relay for teams](/guides/upgrade-to-relay-for-teams/)
- [Update Relay](/guides/update-relay/)
- [Configure attachments for sharing](/guides/configure-attachments-for-sharing/)
