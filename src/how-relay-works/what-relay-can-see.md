---
title: What Relay can see
description: An explanation of the data that reaches Relay's servers under self-hosted vs Relay-hosted setups.
layout: doc.njk
---
Relay is how a team shares a set of markdown files without handing content to a vendor — so customers often ask exactly what data our servers can and cannot see. The answer depends on which hosting method you use. 

- Under self-hosting, our primary deployment model, your Relay Server runs on your private network and your notes never touch our servers — we couldn't see your content if we wanted to. Our control plane sees certain metadata — anything you see in [console.relay.md](https://console.relay.md). 
- Under our cloud hosting, offered as a convenience for those who prefer it, your note content does move through our servers — like a traditional SaaS service, it is not end-to-end encrypted. We don't look at customer data, but we could be compelled to (eg by a court). 

Our policy is that [we don't charge for privacy](https://relay.md/blog/we-dont-charge-for-privacy), and we think architectural privacy from vendors should be the default. That's why self-hosting is free. 

This page offers further details about what data we can see in each case. 

### Quick view — what data can our servers see? 

<table>
  <thead>
    <tr><th><strong>Can our servers see it?</strong></th><th>Self-hosting *(free on every plan)*</th><th>Relay cloud hosting</th></tr>
  </thead>
  <tbody>
    <tr class="divider"><td><strong>Data plane — your documents</strong></td><td>No — your server only</td><td>Yes — our servers</td></tr>
    <tr><td>Note titles</td><td>No — your server only</td><td>Yes — our servers</td></tr>
    <tr><td>Note content</td><td>No — your server only</td><td>Yes — our servers</td></tr>
    <tr><td>Attachments</td><td>No — storage you configure</td><td>Yes — our storage</td></tr>
    <tr><td>Filenames and folder paths</td><td>No — requests carry IDs, not names</td><td>Yes — our servers</td></tr>
    <tr><td>Live presence (cursors, who's in a doc)</td><td>No — your server only</td><td>Yes — our servers</td></tr>
    <tr class="divider"><td><strong>Control plane — accounts and permissions</strong></td><td>Yes — Relay control plane is global</td><td>Yes</td></tr>
    <tr><td>Your account (name, email, profile picture)</td><td>Yes</td><td>Yes</td></tr>
    <tr><td>Relay Server name, URL, configuration</td><td>Yes</td><td>Yes</td></tr>
    <tr><td>Who has access to what (membership, roles)</td><td>Yes</td><td>Yes</td></tr>
    <tr><td>Shared Folder display names</td><td>Yes — renameable to anything</td><td>Yes — renameable to anything</td></tr>
    <tr><td>Shared Folder's real folder name</td><td>No — only the display name lives on control plane; folder name lives on data plane (but the display name defaults to the real name, so change it if you want)</td><td>Yes</td></tr>
    <tr><td>Access identifiers (server, folder, doc, device IDs; attachment hash, type, size)</td><td>Yes</td><td>Yes</td></tr>
    <tr><td>Client details (Relay and Obsidian versions; device and vault IDs)</td><td>Yes</td><td>Yes</td></tr>
    <tr><td><strong>Can we read your notes?</strong></td><td><strong>No — we have no route to your server, no copy on ours</strong></td><td><strong>Technically yes; by policy no; we could be compelled</strong></td></tr>
    <tr><td><strong>Where that guarantee comes from</strong></td><td><strong>Architecture — your network, your server</strong></td><td><strong>Policy — our commitment not to look</strong></td></tr>
  </tbody>
</table>

## Why can't our servers see your documents?

Two independent access controls sit in front of your documents, and they are controlled by different parties. Think of them like two locked doors in serial: access to one or the other is not sufficient; only a party that can get through both doors can see the content. 

1. First, network reachability: your Relay Server runs on your private network, so only machines you allow can reach it at all — Relay's control plane has no route to it. 
2. Second, authorization: for anyone who can reach it, your Relay Server verifies a cryptographically signed token issued by Relay's control plane before serving a Shared Folder. 

Both gates must pass, and we could only pass the second. 

**"But you run the control plane — why can't you grant yourselves access?"** Nothing cryptographic stops us: our control plane could mint a valid access token for any Shared Folder, and your Relay Server would accept it. What stops us is the first gate: an access token only does anything when it's presented to your Relay Server over the network, and our servers have no route to yours. Verification also runs entirely on your server, against public keys it already holds — nothing is sent to us to check a token, and your documents never pass through our infrastructure on the way to your other machines.

## What can you verify yourself?

The [Relay plugin](https://github.com/No-Instructions/Relay) and the [Relay Server](https://github.com/No-Instructions/relay-server) are open source; you can read them and confirm where your notes go. 

## What should you watch out for?

Whoever controls your network controls the first gate. If you use a VPN or mesh network with an administrator — a company tailnet, a managed VPN — that administrator can add a device to the network. Your Relay Server treats network membership as the first gate, so this is worth knowing if the network isn't yours alone. On a network you administer yourself, you hold that control.

Webhooks are off by default, and they are an exit if you turn them on. A Relay Server can be configured to POST event notifications to a URL you choose. Those notifications carry document IDs and sync metadata, though not your document content. No webhook is configured by default, so this only happens if you set one up.

## What about Relay cloud hosting?

If you're hosting on our cloud, your data plane is on our network: your documents live on infrastructure we operate. This is the standard arrangement for cloud software like Google Docs and Notion. Because Relay isn't end-to-end encrypted, we have the technical ability to access synced content if required. We don't look at your data as a matter of [policy](https://system3.md/privacy); but we could be compelled to by a legal process. Self-hosting removes our access and it's free on [every plan](/features/hosting-options/).

## Setting up your private network

Ready to self-host? The canonical setup instructions live with the code: [Self-hosting a Relay Server](https://github.com/No-Instructions/relay-server-template).
