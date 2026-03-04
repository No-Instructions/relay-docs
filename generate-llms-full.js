#!/usr/bin/env node

/**
 * generate-llms-full.js — post-build script for relay-docs.
 *
 * Reads every HTML page in _site/, strips tags, and writes
 * _site/llms-full.txt for LLM consumption.
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = path.join(__dirname, '_site');
const OUT_FILE = path.join(SITE_DIR, 'llms-full.txt');
const SKIP_DIRS = new Set(['assets']);

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
  // Remove <head>...</head>
  html = html.replace(/<head[\s\S]*?<\/head>/gi, '');
  // Remove <nav>...</nav> and <footer>...</footer>
  html = html.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  html = html.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  // Remove remaining tags
  html = html.replace(/<[^>]+>/g, ' ');
  // Collapse whitespace
  html = html.replace(/\s+/g, ' ').trim();
  return html;
}

function urlFromFile(htmlFile) {
  const rel = path.relative(SITE_DIR, htmlFile);
  if (rel === 'index.html') return '/';
  return '/' + rel.replace(/\/index\.html$/, '') + '/';
}

function main() {
  if (!fs.existsSync(SITE_DIR)) {
    console.error('_site/ not found. Run npm run build first.');
    process.exit(1);
  }

  const htmlFiles = collectHtmlFiles(SITE_DIR).sort();
  const parts = [
    '# Relay Docs — full content\n',
    '> Relay is an Obsidian plugin for real-time multiplayer collaboration on notes and Canvases.\n',
  ];

  for (const htmlFile of htmlFiles) {
    const url = urlFromFile(htmlFile);
    if (url === '/') continue; // skip root placeholder

    const html = fs.readFileSync(htmlFile, 'utf-8');

    // Extract title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/ — Relay Docs$/, '').trim() : url;

    const text = stripHtml(html);
    parts.push(`\n## ${title}\n\nURL: https://docs.relay.md${url}\n\n${text}\n`);
  }

  fs.writeFileSync(OUT_FILE, parts.join(''), 'utf-8');
  console.log(`llms-full.txt written (${htmlFiles.length - 1} pages)`);
}

main();
