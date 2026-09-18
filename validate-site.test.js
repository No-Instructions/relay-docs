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
