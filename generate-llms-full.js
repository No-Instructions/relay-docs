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

const { leaves, sections } = require('./nav-pages.js');
const ROOT = __dirname;
const { products, productForUrl, versionForUrl, previewBuild } = require('./products');
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
  // Read article content only: JSON-LD, dialogs, product navigation and TOC
  // are presentation metadata, not documentation excerpts.
  const $ = require('cheerio').load(html);
  const main = $('main').first();
  main.find('script, style, nav, .toc-disclosure').remove();
  main.find('p, li, h1, h2, h3, h4, tr, pre, figcaption').append(' ');
  html = main.text();
  return html.replace(/\s+/g, ' ').trim();
}

function urlFromFile(htmlFile) {
  const rel = path.relative(SITE_DIR, htmlFile);
  if (rel === 'index.html') return '/';
  return '/' + rel.replace(/\/index\.html$/, '') + '/';
}

function extractMeta(html, name) {
  // Match content="..." with name before or after content attribute
  const m = html.match(new RegExp(`<meta\\s+name=["']${name}["'][^>]*content=["']([^"]+)["']`, 'i'))
    || html.match(new RegExp(`<meta\\s+content=["']([^"]+)["'][^>]*name=["']${name}["']`, 'i'));
  if (!m) return '';
  // Decode common HTML entities
  return m[1].trim()
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

// ── generate llms.txt ─────────────────────────────────────────────────────────

function generateLlmsTxt() {
  const nav = require('./products').getNavigation();

  const pageLines = [];
  for (const product of products.filter(p => p.status === 'shipped')) {
    for (const version of product.versions) {
      const productNav = { groups: nav.groups.filter(g => g.productId === product.slug && (g.version || product.version) === version.label) };
      pageLines.push(`## ${product.name} ${version.label}`, '');
      pageLines.push(...sections(productNav).map(section => `- [${section.title}](${SITE_URL}/${section.path}/)`));
      for (const group of productNav.groups) for (const page of leaves(group.pages)) {
        const htmlFile = path.join(SITE_DIR, page.path, 'index.html');
        if (!fs.existsSync(htmlFile)) continue;
        const description = extractMeta(fs.readFileSync(htmlFile, 'utf-8'), 'description');
        pageLines.push(`- [${page.title}](${SITE_URL}/${page.path}/)${description ? ': ' + description : ''}`);
      }
      pageLines.push('');
    }
  }

  const content = [
    '# Relay Docs',
    'Documentation for Relay products.',
    '',
    '> Each page identifies its product and documented version.',
    '',
    ...pageLines,
    '',
  ].join('\n');

  const out = path.join(SITE_DIR, 'llms.txt');
  fs.writeFileSync(out, content, 'utf-8');
  console.log(`llms.txt written (${pageLines.filter(line => line.startsWith('- ')).length} pages)`);
}

// ── generate llms-full.txt ────────────────────────────────────────────────────

function generateLlmsFullTxt() {
  const htmlFiles = collectHtmlFiles(SITE_DIR).sort();
  const parts = [
    '# Relay Docs — full content\n',
    'Documentation for Relay products.\n',
    '> Each page identifies its product and documented version.\n',
  ];

  let count = 0;
  for (const htmlFile of htmlFiles) {
    const url = urlFromFile(htmlFile);
    if (url === '/') continue;

    const html = fs.readFileSync(htmlFile, 'utf-8');
    if (!previewBuild && extractMeta(html, 'robots').split(/[\s,]+/).includes('noindex')) continue;
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/ — Relay Docs$/, '').trim() : url;
    const text = stripHtml(html);
    const product = productForUrl(url);
    parts.push(`\n## ${title}\n\nURL: ${SITE_URL}${url}\nProduct: ${product?.name || 'Relay'} ${product ? versionForUrl(product, url)?.label || '' : ''}\n\n${text}\n`);
    count++;
  }

  const out = path.join(SITE_DIR, 'llms-full.txt');
  fs.writeFileSync(out, parts.join(''), 'utf-8');
  console.log(`llms-full.txt written (${count} pages)`);
}

// ── main ──────────────────────────────────────────────────────────────────────

if (require.main === module) {
  if (!fs.existsSync(SITE_DIR)) {
    console.error('_site/ not found. Run npm run build first.');
    process.exit(1);
  }
  generateLlmsTxt();
  generateLlmsFullTxt();
}
module.exports = { stripHtml };
