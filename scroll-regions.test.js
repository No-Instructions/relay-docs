const test = require('node:test');
const assert = require('node:assert/strict');
const { load } = require('cheerio');
const { makeScrollRegionsAccessible } = require('./scroll-regions');

test('annotates raw and rendered article regions while preserving examples and native tables', () => {
  const html = '<!doctype html>\n<script>const markup = "<pre>do not change</pre>";</script><nav><table><tr><td>Navigation</td></tr></table></nav><main class="doc-content"><pre class="language-html"><code>&lt;table&gt; &amp; &quot;quoted&quot;\n  unchanged</code></pre><table id="commands"><thead><tr><th scope="col">Command</th></tr></thead><tbody><tr><td><code>comments</code></td></tr></tbody></table></main>';
  const transformed = makeScrollRegionsAccessible(html);
  const $ = load(transformed);
  const region = $('.table-scroll-region');
  assert.equal(region.attr('tabindex'), '0');
  assert.equal(region.attr('role'), 'region');
  assert.equal(region.attr('aria-label'), 'Table 1');
  assert.equal(region.children('table#commands').length, 1);
  assert.equal(region.find('th').attr('scope'), 'col');
  assert.equal(region.children('table').attr('role'), undefined);
  assert.equal($('main pre').attr('tabindex'), '0');
  assert.equal($('main pre').attr('aria-label'), 'Code example 1');
  assert.equal($('nav table').parent().is('nav'), true);
  assert(transformed.includes('<script>const markup = "<pre>do not change</pre>";</script>'));
  assert(transformed.includes('<code>&lt;table&gt; &amp; &quot;quoted&quot;\n  unchanged</code>'));
  assert.equal(makeScrollRegionsAccessible(transformed), transformed);
});

test('preserves authored labels, makes negative tab indices reachable, and names regions distinctly', () => {
  const html = '<main class="doc-content"><pre tabindex="-1" aria-label="Copy &amp; run"><code>one</code></pre><pre><code>two</code></pre><div class="table-scroll-region" aria-label="Supported commands"><table><tr><th>Commands</th></tr></table></div><table><tr><td>Second table</td></tr></table></main>';
  const transformed = makeScrollRegionsAccessible(html);
  const $ = load(transformed);
  assert.deepEqual($('pre').map((_, e) => $(e).attr('aria-label')).get(), ['Copy & run', 'Code example 2']);
  assert.deepEqual($('pre').map((_, e) => $(e).attr('tabindex')).get(), ['0', '0']);
  assert.deepEqual($('.table-scroll-region').map((_, e) => $(e).attr('aria-label')).get(), ['Supported commands', 'Table 2']);
  assert.equal($('.table-scroll-region .table-scroll-region').length, 0);
  assert.equal(makeScrollRegionsAccessible(transformed), transformed);
});

// Adjacent authored tables share an insertion offset between their tags.
test('keeps adjacent authored tables inside separate scroll regions', () => {
  const html = '<main class="doc-content"><table id="first"><tr><td>One</td></tr></table><table id="second"><tr><td>Two</td></tr></table></main>';
  const transformed = makeScrollRegionsAccessible(html);
  const $ = load(transformed);
  assert.deepEqual($('.table-scroll-region').map((_, e) => $(e).children('table').attr('id')).get(), ['first', 'second']);
  assert.equal($('.table-scroll-region .table-scroll-region').length, 0);
  assert.equal(makeScrollRegionsAccessible(transformed), transformed);
});
