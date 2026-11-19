const { products } = require('../products');

module.exports = {
  eleventyComputed: {
    layout: () => products.length === 1 ? 'home-redirect.njk' : 'doc.njk',
    homeDestination: () => products.length === 1 ? products[0].landingUrl : null,
  },
};
