const anchor = require('markdown-it-anchor');
const pluginTOC = require('eleventy-plugin-nesting-toc');
const Toc = require('eleventy-plugin-nesting-toc/toc');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });
  eleventyConfig.addPassthroughCopy({ 'src/robots.txt': 'robots.txt' });
  eleventyConfig.addPassthroughCopy({ 'styles.css': 'styles.css' });
  eleventyConfig.addPassthroughCopy({ 'favicon.ico': 'favicon.ico' });
  eleventyConfig.addPassthroughCopy({ 'favicon-32x32.png': 'favicon-32x32.png' });
  eleventyConfig.addPassthroughCopy({ 'favicon-16x16.png': 'favicon-16x16.png' });

  eleventyConfig.addWatchTarget('./site-config.js');
  eleventyConfig.addWatchTarget('./styles.css');
  eleventyConfig.addWatchTarget('./docs-nav.json');
  eleventyConfig.addWatchTarget('./src/assets/js/');

  // Heading IDs for in-page anchor links and the TOC walker.
  // markdown-it-anchor skips elements that already have an `id`, so the
  // manual <h2 id="..."> anchors in guides/install-relay-beta.md survive.
  eleventyConfig.amendLibrary('md', (md) =>
    md.use(anchor, {
      level: [2, 3],
      permalink: false,
      slugify: (s) =>
        s
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''),
    })
  );

  // Nested TOC for the right-rail outline. The plugin emits
  // <div class="toc"><ol>...</ol></div>. The doc.njk template wraps it
  // in <nav aria-label="On this page" class="toc-nav"> so the ARIA
  // landmark gets a stable name — the plugin does not support
  // wrapperLabel, so the template owns the landmark.
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h2', 'h3'],
    wrapper: 'div',
    wrapperClass: 'toc',
    headingText: '',
  });

  // tocEntryCount: count of total entries in the parsed TOC tree —
  // top-level entries plus all nested children. Used by doc.njk to gate
  // rendering: < 2 total entries → suppress the rail + disclosure and
  // set body.no-toc.
  //
  // Reuses the plugin's own Toc parser. Counting total (not just
  // top-level) means a page with 1 H2 + many H3 children — e.g.
  // guides/obsidian-for-work, 1 H2 + 11 H3 — gets the rail it deserves
  // rather than being suppressed because top-level count is 1.
  function countAllTocNodes(item) {
    return item.children.reduce(
      (sum, child) => sum + 1 + countAllTocNodes(child),
      0
    );
  }
  eleventyConfig.addFilter('tocEntryCount', (content) => {
    if (!content || typeof content !== 'string') return 0;
    const t = new Toc(content, { tags: ['h2', 'h3'] });
    return countAllTocNodes(t.get());
  });

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
    htmlTemplateEngine: false,
    markdownTemplateEngine: 'njk',
    templateFormats: ['njk', 'md', 'html'],
  };
};
