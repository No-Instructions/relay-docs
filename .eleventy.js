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
