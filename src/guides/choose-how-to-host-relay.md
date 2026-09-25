---
title: Choose how to host Relay
description: Choose between self-hosting a Relay Server and using Relay cloud hosting, including storage and privacy considerations.
layout: doc.njk
---

You can host a Relay Server on your own infrastructure or use Relay’s cloud hosting. Your choice determines who operates the server and where your shared content is stored.

Self-hosting a Relay Server is free on every Relay plan. For the philosophy behind that choice, see [Self-hosting Relay is free](https://relay.md/blog/self-hosting-is-free) and [We don’t charge for privacy](https://relay.md/blog/we-dont-charge-for-privacy).

## Choose a hosting option

### Self-hosted Relay Server

Choose self-hosting to keep shared document content and attachments on infrastructure you control. You run the Relay Server and provide its storage, network access, and maintenance.

Host the server on a private network or VPN that your collaborators can reach. When the server and storage are accessible only through your private network, Relay cannot access your shared document content or attachments. Relay’s cloud-hosted Control Plane still handles accounts and permissions. For the distinction between content and account metadata, see [What Relay can see](/how-relay-works/what-relay-can-see/).

You don’t pay Relay for self-hosted storage, but you remain responsible for your infrastructure costs and your plan’s user and device limits.

To deploy a server, follow the [Relay Server template](https://github.com/No-Instructions/relay-server-template). It includes deployment guides and S3-compatible storage configuration.

### Relay cloud hosting

If you prefer convenience, Relay can operate the server and storage for you. Your shared content is stored on infrastructure Relay operates.

Cloud hosting for Markdown notes and Canvas collaboration is included for free on every plan. Cloud storage for images, PDFs, videos, and other attachments requires a paid plan.

For user limits, storage allowances, and options such as cloud hosting with your own storage, see [Relay plans](https://relay.md/pricing).

### Air-gapped deployment waitlist

A fully air-gapped deployment would run the Relay Server, storage, and Control Plane on your infrastructure. It is not available to deploy. [Contact us to join the waitlist](https://system3.md/contact) and tell us about your requirements.

Self-hosting a Relay Server on a private network is available separately. It still uses Relay’s cloud-hosted Control Plane for accounts and permissions.

## Storage for attachments

Images, PDFs, and videos are separate files, even when a note or Canvas displays them. Keep those files inside the Shared Folder so collaborators can receive them.

See [Storage for shared files](/how-relay-works/attachment-storage/) for why server-side storage is needed and how to keep referenced files available to collaborators.

## Understand the architecture

For how the server, storage, and Control Plane work together, see [How Relay connects your devices](/how-relay-works/device-connections/).
