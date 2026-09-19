---
title: Remove a user from a Relay Server
description: Remove a collaborator in Relay Server settings, replace the share key, and understand what happens to their local files.
layout: doc.njk
---

To remove someone from a Relay Server, open its settings, click the edit icon beside **Users**, and click **Kick** next to their name.

Removal stops future updates to that person but does not delete files already downloaded to their device.  To prevent them from rejoining with the same share key, [rotate the key](/guides/rotate-a-share-key/) too.



## Check your role

You must be an Owner of the Relay Server to remove users and manage its share key.

## Remove the user

<figure style="margin:1.25rem 0;">
  <video class="docs-video" muted data-removal-autoplay-once width="1920" height="1080" controls playsinline preload="metadata" aria-label="Remove a collaborator from a Relay Server" poster="/assets/remove-a-user/remove-user-charlie-poster.png">
    <source src="/assets/remove-a-user/remove-user-1-5x.webm" type="video/webm">
    <source src="/assets/remove-a-user/remove-user-1-5x.mp4" type="video/mp4">
    <a href="/assets/remove-a-user/remove-user-1-5x.mp4">Download the removal demonstration</a>.
  </video>
  <script src="/assets/js/removal-video-once.js?v=d55c88b2e4b3" defer></script>
  <figcaption>Click the edit icon beside Users, then Kick. The removed member disappears from the list.</figcaption>
</figure>


1. [Open Relay settings](/guides/open-relay-settings/).
2. Under **Relay Servers**, click the gear icon beside the server you want to manage.
3. Beside **Users**, click the edit icon (**Edit members**). This reveals the **Kick** buttons.
4. Next to the person you want to remove, click **Kick**. The person disappears from the **Users** list.
5. To finish editing, click the checkmark beside **Users**.

<figure style="margin:1.25rem 0;">
  <div style="position:relative">
    <img style="display:block;width:100%;height:auto;margin:0" src="/assets/remove-a-user/users-edit-charlie.png" width="736" height="414" alt="Users list with a blue arrow pointing to the Edit members icon at the upper right." loading="lazy">
    <svg viewBox="0 0 736 414" aria-hidden="true" focusable="false" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none">
      <path d="M 583 47 L 638 47 M 624 36 L 638 47 L 624 58" fill="none" stroke="white" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 583 47 L 638 47 M 624 36 L 638 47 L 624 58" fill="none" stroke="#075ee8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <figcaption>The edit icon is at the upper right of the Users list.</figcaption>
</figure>

<figure style="margin:1.25rem 0;">
  <div style="position:relative">
    <img style="display:block;width:100%;height:auto;margin:0" src="/assets/remove-a-user/users-kick-charlie.png" width="736" height="414" alt="Users list in edit mode with a blue arrow pointing to the member’s Kick button." loading="lazy">
    <svg viewBox="0 0 736 414" aria-hidden="true" focusable="false" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none">
      <path d="M 497 309 L 572 309 M 558 298 L 572 309 L 558 320" fill="none" stroke="white" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 497 309 L 572 309 M 558 298 L 572 309 L 558 320" fill="none" stroke="#075ee8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <figcaption>In edit mode, Kick appears beside the person you can remove.</figcaption>
</figure>



## Replace the share key

A person who still has the server’s share key can join again after removal. Follow [Rotate a share key](/guides/rotate-a-share-key/) to replace it or turn off key sharing.

Rotating a key does not remove existing members. Give the replacement key only to [people you want to invite](/guides/invite-a-collaborator/), including anyone you intend to let rejoin.

Removal does not erase the person's local files. A copy remaining on their device is expected and does not by itself mean they still receive updates.

<span id="find-missing-controls"></span>

## Troubleshooting

If the edit icon is missing, check your role on that Relay Server. The user-management controls are available to Owners. If you are a Member, ask an Owner to remove the person.

To reveal the **Kick** buttons when roles appear beside people's names, click **Edit members**. Your own account has no **Kick** button.

If Relay reports **Failed to remove user**, check the **Users** list before treating the removal as complete. For help with a persistent error, contact [Relay support on Discord](https://discord.relay.md).

## Related guides

- [Rotate a share key](/guides/rotate-a-share-key/)

- [Invite someone to collaborate](/guides/invite-a-collaborator/)
- [Create a Shared Folder with private access](/guides/private-shared-folders/)
