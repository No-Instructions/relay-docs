---
title: Hosting options
description: Relay offers flexible hosting options to meet a variety of security, compliance, and operational requirements.
layout: doc.njk
---
Relay offers flexible hosting options to meet a variety of security, compliance, and operational requirements.

You can think of Relay as comprising three components: the Relay Server, the Control Plane, and storage. Each of these can be hosted on our infrastructure or yours.

Note that self/on-premise hosting is a paid feature. See our [pricing](https://relay.md/pricing) page for details.

## Why is hosting required to use Relay?

The beautiful thing about Obsidian is that your files are local first: the canonical source of truth is the `.md` files on your local disk. Relay maintains that commitment and meets the challenge of making those local files collaborative.

Relay accomplishes this with the help the open source CRDT [Yjs](https://yjs.dev/). When you run Relay, the plugin watches your shared notes, converts your changes to commutative update operations, and relays those operations through hosted infrastructure to your collaborators, where they can be processed to recreate the changes on the other side.

In principle this could be accomplished entirely through peer-to-peer communication without the use of any central intermediary. However, we have chosen not to architect Relay as peer-to-peer because in that case, collaboration is only possible between two peers who are online at the same time.

An always-on server is like a 'market maker' that allows you to relay your updates between collaborators even if you're not online at the same time.

For example, suppose Abigail is in the United States and John is in Europe:

1. Abigail makes a change to a note while John in sleeping. Her machine sends those changes up to the hosted Relay Server.
2. Abigail shuts down her computer and goes to bed.
3. A few hours later, John wakes up in Amsterdam, opens his machine, and starts his day.
4. John's machine downloads Abigail's updates from the hosted Relay Server, bringing him up to date with the most recent work from Abigail.

To make this possible, somewhere in the world there has to be a machine that's always online, ready to receive and transmit changes.

## Relay architecture

Relay consists of two primary components.

The **Relay Server** is responsible for:
- Real-time collaboration and file storage APIs
- Data is persisted to S3-compatible storage

The **Control Plane** is responsible for:
- User authentication and SSO integration
- User management and permissions
- Server and folder metadata

![](/assets/relay-server-architecture.png)

## Hosting models offered

Self-hosting a Relay Server provides total document privacy. Obsidian users are granted document-scoped access tokens by the control plane which are valid for 1 hour. The Relay Server does not need to access the public internet.

If you need a full on-premise deployment (including our Control Plane) for compliance or security reasons, you must be on the Enterprise plan so that we can support your setup and installation.

Note that self/on-premise hosting is a paid feature. See our [pricing](https://relay.md/pricing) page for details.

> **Note: Self-hosting beta (free)**
>
> We are currently offering self-hosting of Relay Servers for free. See our [relay-server-template](https://github.com/no-instructions/relay-server-template) on GitHub for deployment guides and configuration examples. When you self-host a Relay Server you have unmetered storage, but the seat limit still applies.

1. **Relay Cloud:** Host on Relay's infrastructure. The easiest and most cost-effective option.
2. **Relay Cloud (dedicated)** We run a dedicated host for your Relay Server(s) to add an additional layer of security and isolation. Supports BYO AWS S3-compatible storage.
3. **Self-hosted Relay Server:** Host Relay Servers on your own infrastructure.
4. **Full on-premise deployment**: Run our entire cloud offering on your infrastructure.

Here's what's available at each tier:

|                | Relay Server (document collaboration) | Control Plane (login & permissions) |
| -------------- | ------------------------------------- | ----------------------------------- |
| **Free**       | Relay Cloud                           | Relay Cloud                         |
| **Team**       | Relay Cloud                           | Relay Cloud                         |
| **Pro**        | Relay Cloud (dedicated) OR self-host  | Relay Cloud                         |
| **Enterprise** | Relay Cloud (dedicated) OR self-host  | Relay Cloud OR Air-gapped deploy    |

## Privacy implications

We don't look at your data and we don't sell it. Like all cloud services, we could be compelled by law enforcement to provide access (this has never happened). BYO hosting options provide technical guarantees beyond promises.

What Relay staff can technically access depends on which components you host:

- **All components on Relay Cloud**: Standard SaaS model - we could access your data if legally compelled, though we don't under normal operations. See our [security page](https://system3.md/security) for details.
- **Storage + Relay Server on your infrastructure, Control Plane on Relay Cloud**: We can only see metadata (server names, user emails, document IDs) but no document content
- **All components on your infrastructure**: We see nothing unless you grant specific access for support

## Choosing the right option

**Choose Team tier if:**
- Standard security requirements
- Cost is primary concern
- No specific compliance mandates

**Choose Pro tier if:**
- Need dedicated infrastructure
- Want to control document storage
- Need cross-org collaboration

**Choose Enterprise tier if:**
- Need complete data sovereignty
- Air-gapped deployments
- Require full audit control

> **Tip: Need help deciding?**
>
> [Contact us](https://system3.md/contact) to discuss your specific requirements. We can help you understand which hosting model best fits your security, compliance, and operational needs.
