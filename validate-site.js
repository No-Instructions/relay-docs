#!/usr/bin/env node

/**
 * validate-site.js — post-build validator for relay-docs.
 *
 * Checks:
 *   1. Meta tags (title, description, canonical, OG, Twitter) on every page
 *   2. Internal links resolve to actual files in _site/
 *   3. Nav coverage — every built page is in docs-nav.json or docs-unlisted.json
 *   4. Nav completeness — every page in docs-nav.json has a built file
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE_DIR = path.join(ROOT, '_site');

// Load nav
const NAV = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs-nav.json'), 'utf-8'));
const NAV_PATHS = new Set(NAV.groups.flatMap((g) => g.pages.map((p) => p.path)));

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

function urlPathFromFile(htmlFile) {
  const rel = path.relative(SITE_DIR, htmlFile);
  if (rel === 'index.html') return '/';
  // 'foo/bar/index.html' → '/foo/bar/'
  return '/' + rel.replace(/\/index\.html$/, '') + '/';
}

function docPathFromUrl(urlPath) {
  // '/foo/bar/' → 'foo/bar'
  return urlPath.replace(/^\/|\/$/g, '');
}

function targetExists(href) {
  if (!href.startsWith('/')) return true;

  let p = href;
  if (p.endsWith('/')) p = p.slice(0, -1);
  p = p.replace(/^\//, '');

  if (!p) return fs.existsSync(path.join(SITE_DIR, 'index.html'));

  // asset paths are passthrough — trust they exist if under /assets/
  if (href.startsWith('/assets/')) return true;

  const dirIndex = path.join(SITE_DIR, p, 'index.html');
  if (fs.existsSync(dirIndex)) return true;

  const exactFile = path.join(SITE_DIR, p);
  if (fs.existsSync(exactFile) && fs.statSync(exactFile).isFile()) return true;

  return false;
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

function checkInternalLinks(htmlFile, html) {
  const errors = [];
  const rel = path.relative(SITE_DIR, htmlFile);

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];

    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#') ||
      href.startsWith('javascript:')
    ) {
      continue;
    }

    if (!href.startsWith('/')) continue;

    // Styles and favicons are passthrough copies — always valid
    if (href === '/styles.css' || href.startsWith('/favicon.')) continue;

    const [pathname] = href.split(/[?#]/);
    if (!targetExists(pathname)) {
      errors.push(`broken internal link in ${rel}: ${href}`);
    }
  }

  return errors;
}

function checkNavCoverage(htmlFiles) {
  const errors = [];

  // Every built page must be in nav or unlisted
  for (const htmlFile of htmlFiles) {
    const urlPath = urlPathFromFile(htmlFile);
    if (urlPath === '/') continue; // root placeholder is always valid

    const docPath = docPathFromUrl(urlPath);
    if (!NAV_PATHS.has(docPath) && !UNLISTED_PATHS.has(docPath)) {
      errors.push(`nav coverage: ${urlPath} not in docs-nav.json or docs-unlisted.json`);
    }
  }

  // Every nav page must have a built file
  for (const navPath of NAV_PATHS) {
    const expected = path.join(SITE_DIR, navPath, 'index.html');
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

  for (const htmlFile of htmlFiles) {
    const html = fs.readFileSync(htmlFile, 'utf-8');
    errors.push(...checkMeta(htmlFile, html));
    errors.push(...checkInternalLinks(htmlFile, html));
  }

  errors.push(...checkNavCoverage(htmlFiles));

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
  console.log(`  Internal links: OK.`);
}

main();
