module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });
  eleventyConfig.addPassthroughCopy({ 'styles.css': 'styles.css' });
  eleventyConfig.addPassthroughCopy({ 'favicon.svg': 'favicon.svg' });

  eleventyConfig.addWatchTarget('./site-config.js');
  eleventyConfig.addWatchTarget('./styles.css');
  eleventyConfig.addWatchTarget('./docs-nav.json');

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
