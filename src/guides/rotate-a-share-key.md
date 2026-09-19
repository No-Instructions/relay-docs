---
title: Rotate a share key
description: Replace a Relay Server share key, share the replacement, and manage who can join.
layout: doc.njk
---

Rotate a Relay Server's share key to replace the key people use to join. Use this when you want to stop invitations made with a previously shared key.

## Check your role

You must be an Owner of the Relay Server to rotate its share key. If you're a Member, ask an Owner to rotate it.

## Rotate the key

1. [Open Relay settings](/guides/open-relay-settings/).
2. Under **Relay Servers**, click the gear icon beside the server you want to manage.
3. Scroll to **Sharing**.
4. With **Enable key sharing** on, click **Rotate key**. Relay replaces the **Share Key**; the previous key no longer works for joining.
5. To invite someone, copy the replacement **Share Key** and send it only to the people you want to join. Treat it like a password.

<figure>
  <div style="position:relative;width:100%;max-width:441px;margin:0 auto">
    <img src="/assets/rotate-a-share-key/sharing-enabled.png" width="882" height="524" alt="Sharing controls with the Share Key concealed and a blue arrow pointing to Rotate key." style="display:block;width:100%;height:auto;margin:0">
    <svg viewBox="0 0 882 524" aria-hidden="true" focusable="false" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none">
      <path d="M 745 353 L 745 389 M 734 375 L 745 389 L 756 375" fill="none" stroke="white" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 745 353 L 745 389 M 734 375 L 745 389 L 756 375" fill="none" stroke="#075ee8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <figcaption>Use Rotate key to replace the invitation key. Keep the key concealed when sharing screenshots.</figcaption>
</figure>

Anyone who obtains the replacement key can use it to join, including someone you previously removed.

## Check the result

Check that **Share Key** has changed before sharing the replacement. If Relay reports **Failed to rotate key**, don't treat the rotation as complete. Reopen the server settings and check the key before trying again.

## Manage members separately

People who have already joined remain members when you rotate the key.  To remove someone, open the server settings and find the **Users** section. Follow [Remove a user from a Relay Server](/guides/remove-a-user/). Rotating an invitation key and removing a member are separate actions.

## Find hidden key controls

When **Enable key sharing** is off, Relay hides **Share Key** and **Rotate key**. Leave key sharing off if you want to prevent joins through a share key.

<figure><img src="/assets/rotate-a-share-key/sharing-disabled.png" width="882" height="174" alt="Enable key sharing switched off; the Share Key and Rotate key controls are hidden." style="width:100%;max-width:441px;height:auto;margin:0 auto"><figcaption>With key sharing off, the key and rotation controls are hidden.</figcaption></figure>

To make key invitations available again, turn **Enable key sharing** on. Check the key before sending it. Enabling sharing is a separate action from rotating the key.

If key sharing is enabled but **Rotate key** is missing, check your role under **Users** in the server settings. Only an Owner of that Relay Server can rotate its key.

## Related guides

- [Remove a user from a Relay Server](/guides/remove-a-user/)
- [Invite someone to collaborate](/guides/invite-a-collaborator/)
- [Create a Shared Folder with private access](/guides/private-shared-folders/)
