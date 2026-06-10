---
title: Hosting options
description: Relay offers flexible hosting options to meet a variety of security, compliance, and operational requirements.
layout: doc.njk
---
Relay offers flexible hosting options to meet a variety of security, compliance, and operational requirements.

You can think of Relay as comprising three components: the Relay Server, the Control Plane, and storage. Each of these can be hosted on our infrastructure or yours.

Self-hosting a Relay Server is free on every Relay plan. See [Self-hosting Relay is free](https://relay.md/blog/self-hosting-is-free) and [We don't charge for privacy](https://relay.md/blog/we-dont-charge-for-privacy) for the reasoning behind that policy.

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

If you need a full air-gapped or on-premise deployment, including the Control Plane, that is an Enterprise-positioned waitlist offering. Contact us if you need that level of isolation so we can understand your requirements and plan support.

> **Note: Self-hosting is free**
>
> You can self-host a Relay Server on any Relay plan. See our [relay-server-template](https://github.com/no-instructions/relay-server-template) on GitHub for deployment guides and configuration examples. When you self-host a Relay Server you have unmetered storage, but the seat limit still applies.

1. **Relay Cloud:** Host on Relay's infrastructure. The easiest and most cost-effective option.
2. **Relay Cloud (dedicated)** We run a dedicated host for your Relay Server(s) to add an additional layer of security and isolation. Supports BYO AWS S3-compatible storage.
3. **Self-hosted Relay Server:** Host Relay Servers on your own infrastructure.
4. **Full air-gapped or on-premise deployment:** Enterprise waitlist offering for running the full stack, including the Control Plane, on your infrastructure.

Here's what's available at each tier:

|                | Relay Server (document collaboration) | Control Plane (login & permissions) |
| -------------- | ------------------------------------- | ----------------------------------- |
| **Free**       | Relay Cloud OR self-host              | Relay Cloud                         |
| **Team**       | Relay Cloud OR self-host              | Relay Cloud                         |
| **Pro**        | Relay Cloud (dedicated) OR self-host  | Relay Cloud                         |
| **Enterprise** | Relay Cloud (dedicated) OR self-host; full air-gapped/on-premise by waitlist | Relay Cloud; full air-gapped/on-premise by waitlist |

## Privacy implications

We don't look at your data and we don't sell it. Like all cloud services, we could be compelled by law enforcement to provide access (this has never happened). BYO hosting options provide technical guarantees beyond promises.

What Relay staff can technically access depends on which components you host:

- **All components on Relay Cloud**: Standard SaaS model - we could access your data if legally compelled, though we don't under normal operations. See our [security page](https://system3.md/security) for details.
- **Storage + Relay Server on your infrastructure, Control Plane on Relay Cloud**: We can only see metadata (server names, user emails, document IDs) but no document content
- **Full air-gapped or on-premise deployment, including the Control Plane**: Enterprise-positioned waitlist offering. If deployed, we see nothing unless you grant specific access for support

## Choosing the right option

**Choose Team tier if:**
- Standard security requirements
- Cost is primary concern
- No specific compliance mandates

**Choose Pro tier if:**
- Need dedicated infrastructure
- Want BYO storage while we host dedicated Relay infrastructure
- Need cross-org collaboration

**Choose Enterprise tier if:**
- Need complete data sovereignty
- Need a full air-gapped or on-premise deployment and want to join the waitlist
- Require full audit control

> **Tip: Need help deciding?**
>
> [Contact us](https://system3.md/contact) to discuss your specific requirements. We can help you understand which hosting model best fits your security, compliance, and operational needs.
