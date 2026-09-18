const test = require('node:test');
const assert = require('node:assert/strict');
const { checkInternalEvidence } = require('./validate-site');
const page = __dirname + '/_site/example/index.html';
test('rejects private evidence markers and thread/path references', () => {
  for (const comment of [
    'MEASURED: native screenshot, controls only.',
    'OPEN — behavior remains unverified.',
    'REPORTED — editorial claim.',
    'Evidence in thr_example123/share-folder.',
    'Detailed evidence: deletion-research/replacement-evidence.md.',
    '/Users/example/.bb/thread-storage/private/evidence.json',
  ]) assert.equal(checkInternalEvidence(page, `<!-- ${comment} -->`).length, 1);
});
test('allows ordinary product comments and escaped code examples', () => {
  const html = '<!-- Keep the Shared Folder on the server. -->' +
    '<pre><code>&lt;!-- MEASURED: example syntax --&gt;</code></pre>' +
    '<script>const example = "<!-- OPEN: literal string -->";</script>';
  assert.deepEqual(checkInternalEvidence(page, html), []);
});

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { checkInternalLinks, checkNavCoverage, checkDiscovery, readSourcePolicy } = require('./validate-site');
const { allPages } = require('./nav-pages');
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'relay-validator-'));
  t.after(() => fs.rmSync(root, { recursive: true }));
  function write(file, bytes) {
    const dest = path.join(root, file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, bytes);
    return dest;
  }
  write('_site/guide/index.html', '<h1>Guide</h1><h2 id="hello">Hello</h2>');
  return { root, write, siteDir: path.join(root, '_site'), page: path.join(root, '_site/guide/index.html') };
}
test('missing and empty local PNGs fail, including hrefs previously trusted', t => {
  const f = fixture(t);
  f.write('_site/assets/empty.png', '');
  const errors = checkInternalLinks(f.page, '<img src="/assets/missing.png"><a href="/assets/empty.png">Image</a>', f);
  assert.equal(errors.length, 2);
  assert.match(errors[0], /missing local resource/);
  assert.match(errors[1], /empty local resource/);
});
test('picture srcset, video poster and source dependencies are checked', t => {
  const f = fixture(t);
  f.write('_site/assets/ok.png', 'png');
  const html = '<picture><source srcset="data:image/svg+xml,%3Csvg%3E 1x, /assets/missing.png 2x"><img src="/assets/ok.png"></picture>' +
    '<video poster="/assets/poster.png"><source src="/assets/movie.webm"></video>';
  const errors = checkInternalLinks(f.page, html, f);
  assert.equal(errors.length, 3);
  for (const name of ['missing.png', 'poster.png', 'movie.webm']) assert(errors.some(e => e.includes(name)));
});
test('relative, encoded, queried and same-origin URLs resolve; external URLs are untouched', t => {
  const f = fixture(t);
  f.write('_site/assets/a b.png', 'png');
  const html = '<img src="../assets/a%20b.png?v=1"><a href="https://docs.relay.md/guide/#hello">same origin</a>' +
    '<a href="https://example.com/missing#fragment">external</a><img src="//example.com/external.png">' +
    '<a href="mailto:test@example.com">mail</a><img src="data:image/png;base64,AAAA">';
  assert.deepEqual(checkInternalLinks(f.page, html, f), []);
});
test('checks same-page and cross-page fragments, including SVG IDs', t => {
  const f = fixture(t);
  f.write('_site/other/index.html', '<h2 id="there">There</h2>');
  f.write('_site/assets/icon.svg', '<svg xmlns="http://www.w3.org/2000/svg"><symbol id="arrow"/></svg>');
  assert.deepEqual(checkInternalLinks(f.page, '<a href="#hello">ok</a><a href="../other/#there">ok</a><svg><use href="/assets/icon.svg#arrow"/></svg>', f), []);
  assert.equal(checkInternalLinks(f.page, '<a href="#absent">bad</a><a href="../other/#missing">bad</a>', f).length, 2);
});
test('nested navigation requires its leaf output', t => {
  const f = fixture(t);
  const nav = { groups: [{ pages: [{ title: 'Setup', children: [{ path: 'guide' }, { path: 'missing' }] }] }] };
  const navPaths = new Set(allPages(nav).map(p => p.path));
  const errors = checkNavCoverage([f.page], { ...f, navPaths, unlistedPaths: new Set() });
  assert.equal(errors.length, 1);
  assert.match(errors[0], /nav page missing.*missing/);
});
test('private draft leakage fails even if present only in an LLM discovery file', t => {
  const f = fixture(t);
  f.write('src/secret.md', '---\ndraft: true\npermalink: false\neleventyExcludeFromCollections: true\n---\nPrivate draft');
  const policy = readSourcePolicy(path.join(f.root, 'src'));
  f.write('_site/sitemap.xml', '<urlset/>');
  f.write('_site/llms.txt', '# Docs');
  f.write('_site/llms-full.txt', 'URL: https://docs.relay.md/secret/');
  const errors = checkDiscovery({ ...f, ...policy, navPaths: new Set() });
  assert(errors.some(e => /private draft leaked into llms-full/.test(e)));
  assert(errors.some(e => /missing discovery destination/.test(e)));
  f.write('_site/secret/index.html', 'Stale draft');
  assert(checkDiscovery({ ...f, ...policy, navPaths: new Set(['secret']) }).some(e => /private draft output/.test(e)));
  assert(checkDiscovery({ ...f, ...policy, navPaths: new Set(['secret']) }).some(e => /private draft in navigation/.test(e)));
});
test('public unlisted pages are allowed; collection exclusion affects sitemap only', t => {
  const f = fixture(t);
  f.write('src/guide.md', '---\neleventyExcludeFromCollections: true\n---\nPublic unlisted page');
  f.write('_site/sitemap.xml', '<urlset/>');
  f.write('_site/llms.txt', '# Docs');
  f.write('_site/llms-full.txt', 'URL: https://docs.relay.md/guide/');
  const policy = readSourcePolicy(path.join(f.root, 'src'));
  assert.equal(policy.privateRoutes.size, 0);
  assert.deepEqual(checkNavCoverage([f.page], { ...f, navPaths: new Set(), unlistedPaths: new Set(['guide']) }), []);
  assert.deepEqual(checkDiscovery({ ...f, ...policy, navPaths: new Set() }), []);
  f.write('_site/sitemap.xml', '<urlset><url><loc>https://docs.relay.md/guide/</loc></url></urlset>');
  assert.match(checkDiscovery({ ...f, ...policy, navPaths: new Set() })[0], /collection-excluded/);
});
test('published navigation routes must appear in sitemap and llms index', t => {
  const f = fixture(t);
  f.write('_site/sitemap.xml', '<urlset/>'); f.write('_site/llms.txt', '# Docs'); f.write('_site/llms-full.txt', '# Docs');
  assert.equal(checkDiscovery({ ...f, navPaths: new Set(['guide']) }).length, 2);
});

test('stale discovery destinations fail even without an authored draft record', t => {
  const f = fixture(t);
  f.write('_site/sitemap.xml', '<urlset/>');
  f.write('_site/llms.txt', '- [Retired](https://docs.relay.md/retired/)');
  f.write('_site/llms-full.txt', 'URL: https://docs.relay.md/retired/');
  const errors = checkDiscovery({ ...f, navPaths: new Set() });
  assert.equal(errors.length, 2);
  assert(errors.every(e => /missing discovery destination/.test(e)));
});
