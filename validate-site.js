#!/usr/bin/env node

/**
 * validate-site.js — post-build validator for relay-docs.
 *
 * Checks:
 *   1. Meta tags (title, description, canonical, OG, Twitter) on every page
 *   2. Local links/media are nonempty files; HTML/SVG fragments resolve
 *   3. Nav coverage — every built page is in docs-nav.json or docs-unlisted.json
 *   4. Nav completeness — every page in docs-nav.json has a built file
 *   5. Explicit private drafts stay out of output/nav/discovery; public unlisted pages remain allowed
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE_DIR = path.join(ROOT, '_site');

// Load nav
const NAV = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs-nav.json'), 'utf-8'));
const { allPages, sections } = require('./nav-pages.js');
const NAV_PATHS = new Set([...allPages(NAV), ...sections(NAV)].map(page => page.path));

// Load unlisted allowlist
const UNLISTED_FILE = path.join(ROOT, 'docs-unlisted.json');
const UNLISTED_PATHS = new Set(
  fs.existsSync(UNLISTED_FILE)
    ? JSON.parse(fs.readFileSync(UNLISTED_FILE, 'utf-8'))
    : []
);

// Directories in _site/ that are not doc pages
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

function docPathFromUrl(urlPath) {
  // '/foo/bar/' → 'foo/bar'
  return urlPath.replace(/^\/|\/$/g, '');
}

function checkMeta(htmlFile, html) {
  const errors = [];
  const rel = path.relative(SITE_DIR, htmlFile);

  const checks = {
    title: /<title>[^<]+<\/title>/i,
    description: /<meta\s+name="description"\s+content="[^"]+"/i,
    canonical: /<link\s+rel="canonical"\s+href="[^"]+"/i,
    'og:title': /<meta\b[^>]*\bproperty=["']og:title["'][^>]*>/i,
    'og:description': /<meta\b[^>]*\bproperty=["']og:description["'][^>]*>/i,
    'og:url': /<meta\b[^>]*\bproperty=["']og:url["'][^>]*>/i,
    'twitter:card': /<meta\b[^>]*\bname=["']twitter:card["'][^>]*>/i,
  };

  for (const [label, pattern] of Object.entries(checks)) {
    if (!pattern.test(html)) {
      errors.push(`${rel}: missing ${label}`);
    }
  }

  return errors;
}

const SITE_ORIGIN = new URL(require('./src/_data/site').url).origin;
const { load } = require('cheerio');

function urlPathForFile(file, siteDir) {
  return '/' + path.relative(siteDir, file).split(path.sep).join('/').replace(/index\.html$/, '');
}

// Follow the srcset token boundaries, including commas inside data URLs.
function srcsetUrls(value) {
  const urls = [];
  let i = 0;
  while (i < value.length) {
    while (/[\s,]/.test(value[i] || '') && i < value.length) i++;
    const start = i;
    while (i < value.length && !/\s/.test(value[i])) i++;
    let url = value.slice(start, i);
    if (!url) break;
    if (url.endsWith(',')) {
      urls.push(url.replace(/,+$/, ''));
      continue;
    }
    urls.push(url);
    let depth = 0;
    while (i < value.length) {
      const char = value[i++];
      if (char === '(') depth++;
      if (char === ')') depth--;
      if (char === ',' && depth === 0) break;
    }
  }
  return urls;
}

function checkInternalLinks(htmlFile, html, { siteDir = SITE_DIR, idCache = new Map() } = {}) {
  const errors = [];
  const rel = path.relative(siteDir, htmlFile);
  const base = new URL(urlPathForFile(htmlFile, siteDir), SITE_ORIGIN);
  const $ = load(html);
  const references = [];
  $('[href],[src],[poster],[srcset]').each((_, node) => {
    for (const attr of ['href', 'src', 'poster']) {
      if ($(node).attr(attr)) references.push($(node).attr(attr));
    }
    if ($(node).attr('srcset')) references.push(...srcsetUrls($(node).attr('srcset')));
  });
  for (const value of references) {
    let url, pathname;
    try {
      url = new URL(value, base);
      if (url.origin !== SITE_ORIGIN || !['http:', 'https:'].includes(url.protocol)) continue;
      pathname = decodeURIComponent(url.pathname);
    } catch {
      errors.push(`${rel}: invalid local reference ${value}`);
      continue;
    }
    let target = path.resolve(siteDir, '.' + pathname);
    if (target !== path.resolve(siteDir) && !target.startsWith(path.resolve(siteDir) + path.sep)) {
      errors.push(`${rel}: reference escapes output ${value}`);
      continue;
    }
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      errors.push(`${rel}: missing local resource ${value}`);
      continue;
    }
    const real = fs.realpathSync(target), root = fs.realpathSync(siteDir);
    if (!real.startsWith(root + path.sep)) {
      errors.push(`${rel}: resource escapes output ${value}`);
      continue;
    }
    if (fs.statSync(target).size === 0) errors.push(`${rel}: empty local resource ${value}`);
    if (url.hash && /\.(html|svg)$/i.test(target)) {
      let fragment;
      try { fragment = decodeURIComponent(url.hash.slice(1)).split(':~:text=')[0]; }
      catch { errors.push(`${rel}: invalid fragment ${value}`); continue; }
      if (!fragment) continue;
      if (!idCache.has(target)) {
        const doc = load(fs.readFileSync(target, 'utf8'), { xmlMode: target.endsWith('.svg') });
        idCache.set(target, new Set(doc('[id],a[name]').map((_, n) => doc(n).attr('id') || doc(n).attr('name')).get()));
      }
      if (!idCache.get(target).has(fragment)) errors.push(`${rel}: missing fragment ${value}`);
    }
  }
  return errors;
}

function routeKey(value) {
  const url = new URL(value, SITE_ORIGIN);
  let pathname = decodeURIComponent(url.pathname).replace(/\/index\.html$/, '/');
  if (!path.posix.extname(pathname) && !pathname.endsWith('/')) pathname += '/';
  return pathname;
}

// Unlisted means public but absent from navigation. Only explicit authoring
// flags mark a page private; collection exclusion alone only affects sitemap.
function readSourcePolicy(srcDir = path.join(ROOT, 'src')) {
  const matter = require('gray-matter');
  const privateRoutes = new Set(), collectionExcluded = new Set();
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('_') && entry.name !== 'assets') walk(path.join(dir, entry.name));
      } else if (entry.isFile() && /\.(md|html|njk)$/.test(entry.name)) {
        const file = path.join(dir, entry.name), data = matter(fs.readFileSync(file, 'utf8')).data;
        const inferred = '/' + path.relative(srcDir, file).split(path.sep).join('/').replace(/\.(md|html|njk)$/, '').replace(/(^|\/)index$/, '$1');
        const route = routeKey(typeof data.permalink === 'string' ? data.permalink : inferred);
        if (data.permalink === false || data.draft === true || ['deferred-draft', 'review-only'].includes(data.status)) privateRoutes.add(route);
        if (data.eleventyExcludeFromCollections === true) collectionExcluded.add(route);
      }
    }
  }
  walk(srcDir);
  return { privateRoutes, collectionExcluded };
}

function checkDiscovery({ siteDir = SITE_DIR, navPaths = NAV_PATHS, privateRoutes = new Set(), collectionExcluded = new Set() } = {}) {
  const errors = [];
  const navRoutes = new Set([...navPaths].map(routeKey));
  for (const route of privateRoutes) {
    const target = path.join(siteDir, route);
    if (fs.existsSync(target) || fs.existsSync(path.join(target, 'index.html'))) errors.push(`private draft output exists: ${route}`);
    if (navRoutes.has(route)) errors.push(`private draft in navigation: ${route}`);
  }
  for (const name of ['sitemap.xml', 'llms.txt', 'llms-full.txt']) {
    const file = path.join(siteDir, name);
    if (!fs.existsSync(file)) { errors.push(`missing discovery file: ${name}`); continue; }
    const text = fs.readFileSync(file, 'utf8');
    const values = name === 'sitemap.xml'
      ? load(text, { xmlMode: true })('loc').map((_, n) => n.children.map(x => x.data || '').join('')).get()
      : [...text.matchAll(/https?:\/\/[^\s<>"')\]]+|\/[a-zA-Z0-9_%][^\s<>"')\]]*/g)].map(m => m[0]);
    const routes = new Set();
    for (const value of values) {
      try {
        const url = new URL(value, SITE_ORIGIN);
        if (url.origin !== SITE_ORIGIN) continue;
        const route = routeKey(url.href); routes.add(route);
        if (privateRoutes.has(route)) errors.push(`private draft leaked into ${name}: ${route}`);
        if (name === 'sitemap.xml' && collectionExcluded.has(route)) errors.push(`collection-excluded page in sitemap: ${route}`);
      } catch { errors.push(`invalid discovery URL in ${name}: ${value}`); }
    }
    const entries = name === 'sitemap.xml' ? values
      : name === 'llms.txt' ? [...text.matchAll(/\]\(([^)]+)\)/g)].map(m => m[1])
      : [...text.matchAll(/^URL:\s*(\S+)/gm)].map(m => m[1]);
    for (const value of entries) {
      try {
        const url = new URL(value, SITE_ORIGIN);
        if (url.origin !== SITE_ORIGIN) continue;
        const targetPath = path.resolve(siteDir, '.' + decodeURIComponent(url.pathname));
        if (targetPath !== path.resolve(siteDir) && !targetPath.startsWith(path.resolve(siteDir) + path.sep)) throw new Error('outside output');
        const target = fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()
          ? path.join(targetPath, 'index.html') : targetPath;
        if (!fs.existsSync(target) || !fs.statSync(target).isFile() || !fs.statSync(target).size) {
          errors.push(`missing discovery destination in ${name}: ${value}`);
        }
      } catch { errors.push(`invalid discovery destination in ${name}: ${value}`); }
    }
    if (name !== 'llms-full.txt') {
      for (const route of navRoutes) {
        if (name === 'sitemap.xml' && collectionExcluded.has(route)) continue;
        if (!routes.has(route)) errors.push(`navigation page absent from ${name}: ${route}`);
      }
    }
  }
  return errors;
}

// Authoring evidence belongs in private page records, never served HTML comments.
function checkInternalEvidence(htmlFile, html) {
  const { load } = require('cheerio');
  const $ = load(html);
  const errors = [];
  const marker = /^\s*(?:MEASURED|OPEN|REPORTED|SOURCE|VERIFIED)\s*[:\u2014-]|\bthr_[a-z0-9]+\b|\.bb\/thread-storage|\/Users\/[^/]+\/|\/private\/tmp\/|\b(?:Detailed evidence|Evidence in)\b/i;
  function visit(node) {
    if (node.type === 'comment' && marker.test(node.data)) {
      errors.push(`${path.relative(SITE_DIR, htmlFile)}: internal authoring evidence in HTML comment`);
    }
    for (const child of node.children || []) visit(child);
  }
  visit($.root()[0]);
  return errors;
}

function checkNavCoverage(htmlFiles, { siteDir = SITE_DIR, navPaths = NAV_PATHS, unlistedPaths = UNLISTED_PATHS } = {}) {
  const errors = [];

  // Every built page must be in nav or unlisted
  for (const htmlFile of htmlFiles) {
    const urlPath = urlPathForFile(htmlFile, siteDir);
    if (urlPath === '/') continue; // root placeholder is always valid

    const docPath = docPathFromUrl(urlPath);
    if (!navPaths.has(docPath) && !unlistedPaths.has(docPath)) {
      errors.push(`nav coverage: ${urlPath} not in docs-nav.json or docs-unlisted.json`);
    }
  }

  // Every nav page must have a built file
  for (const navPath of navPaths) {
    const expected = path.join(siteDir, navPath, 'index.html');
    if (!fs.existsSync(expected)) {
      errors.push(`nav page missing from _site/: ${navPath}`);
    }
  }

  return errors;
}

function main() {
  if (!fs.existsSync(SITE_DIR)) {
    console.error('_site/ directory not found. Run npm run build first.');
    process.exit(1);
  }

  const htmlFiles = collectHtmlFiles(SITE_DIR);
  const errors = [];

  const idCache = new Map();
  for (const htmlFile of htmlFiles) {
    const html = fs.readFileSync(htmlFile, 'utf-8');
    errors.push(...checkMeta(htmlFile, html));
    errors.push(...checkInternalEvidence(htmlFile, html));
    errors.push(...checkInternalLinks(htmlFile, html, { idCache }));
  }

  errors.push(...checkNavCoverage(htmlFiles));
  errors.push(...checkDiscovery(readSourcePolicy()));

  if (errors.length > 0) {
    console.error(`Validation failed (${errors.length} error${errors.length === 1 ? '' : 's'}):`);
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  console.log(`Validation passed: ${htmlFiles.length} files checked.`);
  console.log(`  Nav coverage: ${NAV_PATHS.size} required pages, all present.`);
  console.log(`  Unlisted allowlist: ${UNLISTED_PATHS.size} entries.`);
  console.log(`  Local resources, fragments, and discovery exclusions: OK.`);
}

if (require.main === module) main();
module.exports = { checkInternalEvidence, checkInternalLinks, checkNavCoverage, checkDiscovery, readSourcePolicy, srcsetUrls };
