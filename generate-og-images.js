#!/usr/bin/env node

/**
 * generate-og-images.js — post-build OG image generator for relay-docs.
 *
 * Reads each page's built HTML, extracts title + description, generates a
 * 1200×630 PNG via satori (HTML→SVG) + @resvg/resvg-js (SVG→PNG).
 *
 * Output: _site/assets/og/[slug].png  (slug = 11ty page.fileSlug)
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE_DIR = path.join(ROOT, '_site');
const OG_DIR = path.join(SITE_DIR, 'assets', 'og');
const WIDTH = 1200;
const HEIGHT = 630;

const BG = '#052e1c';
const ACCENT = '#0D9373';
const WHITE = '#ffffff';
const MUTED = '#6ee7b7'; // emerald-300 — readable on dark green

// ── helpers ──────────────────────────────────────────────────────────────────

/** Load the Relay wordmark SVG as a base64 data URI for use in satori img */
function loadRelayLogoDataUri() {
  const svgPath = path.join(ROOT, 'src', 'assets', 'relay-wordmark.svg');
  if (!fs.existsSync(svgPath)) return null;
  const svgContent = fs.readFileSync(svgPath, 'utf-8');
  const base64 = Buffer.from(svgContent).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

function collectHtmlFiles() {
  const results = [];
  const SKIP = new Set(['assets']);
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = path.relative(SITE_DIR, full);
      const top = rel.split(path.sep)[0];
      if (entry.isDirectory()) {
        if (!SKIP.has(top)) walk(full);
      } else if (entry.name.endsWith('.html')) {
        results.push(full);
      }
    }
  }
  walk(SITE_DIR);
  return results;
}

/** Derive slug matching 11ty's page.fileSlug */
function slugFromHtmlFile(htmlFile) {
  const rel = path.relative(SITE_DIR, htmlFile);
  if (rel === 'index.html') return 'index';
  // 'introduction/index.html' → 'introduction'
  // 'features/hosting-options/index.html' → 'hosting-options'
  const parts = rel.split(path.sep);
  return parts[parts.length - 2];
}

function extractPageMeta(html) {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const rawTitle = titleMatch ? titleMatch[1].trim() : 'Relay Docs';
  const title = rawTitle.replace(/ — Relay Docs$/, '').trim();

  const descMatch =
    html.match(/<meta\s+name=["']description["'][^>]*content=["']([^"]+)["']/i) ||
    html.match(/<meta\s+content=["']([^"]+)["'][^>]*name=["']description["']/i);
  const description = descMatch
    ? descMatch[1]
        .trim()
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
    : '';

  return { title, description };
}

function buildElement(title, description, logoDataUri) {
  const titleSize = title.length > 50 ? 42 : title.length > 30 ? 50 : 58;

  return {
    type: 'div',
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: BG,
        padding: '0',
        position: 'relative',
        fontFamily: 'Geist, sans-serif',
      },
      children: [
        // Main content area
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: '1',
              padding: '72px 80px 56px',
            },
            children: [
              // "Relay Docs" label
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '20px',
                    fontWeight: '400',
                    color: ACCENT,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '32px',
                  },
                  children: 'Relay Docs',
                },
              },
              // Page title
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: titleSize + 'px',
                    fontWeight: '700',
                    color: WHITE,
                    lineHeight: '1.15',
                    marginBottom: description ? '28px' : '0',
                    maxWidth: '1000px',
                  },
                  children: title,
                },
              },
              // Description
              description
                ? {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: '24px',
                        fontWeight: '400',
                        color: MUTED,
                        lineHeight: '1.5',
                        maxWidth: '900px',
                      },
                      children: description,
                    },
                  }
                : null,
            ].filter(Boolean),
          },
        },
        // Bottom bar: accent line + relay.md attribution
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 80px',
              height: '56px',
              borderTop: `1px solid rgba(13, 147, 115, 0.3)`,
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { fontSize: '16px', color: ACCENT },
                  children: 'docs.relay.md',
                },
              },
              logoDataUri
                ? {
                    type: 'img',
                    props: {
                      src: logoDataUri,
                      width: 86,
                      height: 37,
                      style: { display: 'block', opacity: '0.85' },
                    },
                  }
                : {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: '16px',
                        fontWeight: '600',
                        color: ACCENT,
                        letterSpacing: '0.05em',
                      },
                      children: 'Relay',
                    },
                  },
            ],
          },
        },
      ],
    },
  };
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(SITE_DIR)) {
    console.error('_site/ not found. Run npm run build first.');
    process.exit(1);
  }

  // satori is ESM-only in some versions — use dynamic import
  const { default: satori } = await import('satori');
  const { Resvg } = require('@resvg/resvg-js');

  fs.mkdirSync(OG_DIR, { recursive: true });

  // Load Geist TTF fonts (satori requires TTF/OTF, not woff2)
  const fontDir = path.join(ROOT, 'src', 'assets', 'fonts');
  const fonts = [];
  const regularPath = path.join(fontDir, 'geist-regular.ttf');
  const boldPath = path.join(fontDir, 'geist-bold.ttf');
  if (fs.existsSync(regularPath)) {
    fonts.push({ name: 'Geist', data: fs.readFileSync(regularPath), weight: 400, style: 'normal' });
  }
  if (fs.existsSync(boldPath)) {
    fonts.push({ name: 'Geist', data: fs.readFileSync(boldPath), weight: 700, style: 'normal' });
  }
  if (!fonts.length) {
    console.warn('Warning: Geist TTF fonts not found — text may not render');
  }

  const logoDataUri = loadRelayLogoDataUri();
  if (!logoDataUri) console.warn('Warning: relay-wordmark.svg not found — logo omitted from OG images');

  const htmlFiles = collectHtmlFiles();
  let count = 0;

  for (const htmlFile of htmlFiles) {
    const slug = slugFromHtmlFile(htmlFile);
    const html = fs.readFileSync(htmlFile, 'utf-8');
    const { title, description } = extractPageMeta(html);

    const element = buildElement(title, description, logoDataUri);

    const svg = await satori(element, { width: WIDTH, height: HEIGHT, fonts });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } })
      .render()
      .asPng();

    fs.writeFileSync(path.join(OG_DIR, `${slug}.png`), png);
    count++;
  }

  console.log(`OG images generated: ${count} pages → _site/assets/og/`);
}

main().catch((err) => {
  console.error('OG image generation failed:', err.message);
  process.exit(1);
});
