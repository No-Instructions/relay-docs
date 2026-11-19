---
title: Install Relay Comments
description: Install the plugin from Obsidian’s community directory and open the review sidebar.
layout: doc.njk
---

[Install by hand](#install-by-hand) in Obsidian, or [install with an agent](#install-with-an-agent) that can write to your vault. Both methods need Obsidian 1.7.2 or later.

## Install by hand

1. In Obsidian, open **Settings** → **Community plugins**.
2. If Restricted mode is on, select **Turn on community plugins**.
3. Select **Browse**, then search for `Relay Comments`.
4. Select **Relay Comments**, then select **Install**.
5. When installation finishes, select **Enable**.

<figure style="max-width:333px">
  {% set screenshot = {"name": "relay-comments-community-plugin", "alt": "Relay Comments version 0.5.2 in Obsidian’s community plugin browser, with the Install button.", "width": 333, "height": 297} %}
{% include "comments-screenshot.njk" %}
  <figcaption>The community plugin browser showing Relay Comments 0.5.2.</figcaption>
</figure>

You can also open the [Relay Comments entry in the community plugin catalog](https://community.obsidian.md/plugins/relay-comments).

## Install with an agent

Give your agent the link to this page and the path to your vault. Ask it to **install Relay Comments in that vault using the steps below**.

1. Download `main.js`, `manifest.json`, and `styles.css` from the [official Relay Comments 0.6.0 release](https://github.com/No-Instructions/Relay-Comments/releases/tag/0.6.0).
2. Check that the manifest names `relay-comments` as the plugin ID and `0.6.0` as the version. Verify the files against the SHA-256 digests on the release.
3. Place those three files in the vault’s plugin directory, normally `.obsidian/plugins/relay-comments/`. Keep existing settings in `data.json`.

When your agent finishes, open **Settings → Community plugins** and enable **Relay Comments**. If Restricted mode is on, select **Turn on community plugins** first. If the plugin doesn’t appear in the list, reload Obsidian.

<details>
<summary>Already using the Obsidian CLI?</summary>

Your agent can install and enable the plugin in one command. Replace `Work` with your vault name:

```shell
obsidian vault="Work" plugin:install id=relay-comments enable
```

</details>

## Check the installation

1. Open a Markdown note.
2. Open the [command palette](https://help.obsidian.md/plugins/command-palette). On macOS, press Command+P. On Windows or Linux, press Ctrl+P.
3. Type `Open review sidebar` and select **Relay Comments: Open review sidebar**.

The sidebar lists the note's review items.

## Use it with Relay

To review notes with other people as they write, put the notes in a Shared Folder. For the steps, see [Share a folder](/guides/share-a-folder/). Relay Comments also works in notes you keep to yourself.

## Start a discussion

To discuss a passage, see [Comment on a note](/comments/comment-on-a-note/).
