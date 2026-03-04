#!/usr/bin/env node

/**
 * generate-llms-full.js — post-build script for relay-docs.
 *
 * Generates two files:
 *   _site/llms.txt      — LLM index (title + description per page, from nav order)
 *   _site/llms-full.txt — Full text dump of every page (HTML stripped)
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE_DIR = path.join(ROOT, '_site');
const SITE_URL = 'https://docs.relay.md';
const SKIP_DIRS = new Set(['assets']);

// ── helpers ──────────────────────────────────────────────────────────────────

function collectHtmlFiles(dir) {
  const results = [];
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      const relToSite = path.relative(SITE_DIR, full);
      const topDir = relToSite.split(path.sep)[0];
      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(topDir)) continue;
        walk(full);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        results.push(full);
      }
    }
  }
  walk(dir);
  return results;
}

function stripHtml(html) {
  html = html.replace(/<head[\s\S]*?<\/head>/gi, '');
  html = html.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  html = html.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  html = html.replace(/<[^>]+>/g, ' ');
  return html.replace(/\s+/g, ' ').trim();
}

function urlFromFile(htmlFile) {
  const rel = path.relative(SITE_DIR, htmlFile);
  if (rel === 'index.html') return '/';
  return '/' + rel.replace(/\/index\.html$/, '') + '/';
}

function extractMeta(html, name) {
  const m = html.match(new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']+)["']`, 'i'))
    || html.match(new RegExp(`<meta\\s+content=["']([^"']+)["']\\s+name=["']${name}["']`, 'i'));
  return m ? m[1].trim() : '';
}

// ── generate llms.txt ─────────────────────────────────────────────────────────

function generateLlmsTxt() {
  const nav = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs-nav.json'), 'utf-8'));

  const lines = [
    '# Relay Docs\n',
    '> Relay is an Obsidian plugin for real-time multiplayer collaboration on notes and Canvases.\n',
    '\n## Docs\n',
  ];

  for (const group of nav.groups) {
    for (const page of group.pages) {
      const htmlFile = path.join(SITE_DIR, page.path, 'index.html');
      if (!fs.existsSync(htmlFile)) continue;
      const html = fs.readFileSync(htmlFile, 'utf-8');
      const description = extractMeta(html, 'description');
      const url = `${SITE_URL}/${page.path}/`;
      const desc = description ? `: ${description}` : '';
      lines.push(`- [${page.title}](${url})${desc}`);
    }
  }

  const out = path.join(SITE_DIR, 'llms.txt');
  fs.writeFileSync(out, lines.join('\n') + '\n', 'utf-8');
  console.log(`llms.txt written (${nav.groups.flatMap((g) => g.pages).length} pages)`);
}

// ── generate llms-full.txt ────────────────────────────────────────────────────

function generateLlmsFullTxt() {
  const htmlFiles = collectHtmlFiles(SITE_DIR).sort();
  const parts = [
    '# Relay Docs — full content\n',
    '> Relay is an Obsidian plugin for real-time multiplayer collaboration on notes and Canvases.\n',
  ];

  let count = 0;
  for (const htmlFile of htmlFiles) {
    const url = urlFromFile(htmlFile);
    if (url === '/') continue;

    const html = fs.readFileSync(htmlFile, 'utf-8');
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/ — Relay Docs$/, '').trim() : url;
    const text = stripHtml(html);
    parts.push(`\n## ${title}\n\nURL: ${SITE_URL}${url}\n\n${text}\n`);
    count++;
  }

  const out = path.join(SITE_DIR, 'llms-full.txt');
  fs.writeFileSync(out, parts.join(''), 'utf-8');
  console.log(`llms-full.txt written (${count} pages)`);
}

// ── main ──────────────────────────────────────────────────────────────────────

if (!fs.existsSync(SITE_DIR)) {
  console.error('_site/ not found. Run npm run build first.');
  process.exit(1);
}

generateLlmsTxt();
generateLlmsFullTxt();
