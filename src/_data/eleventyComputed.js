const { previewDrafts, draftProducts } = require('../../products');
module.exports = {
  permalink: data => {
    const route = data.page.filePathStem + '/';
    const previewProduct = draftProducts.some(product => route === product.landingUrl ||
      (product.urlPrefix && route.startsWith(product.urlPrefix)));
    return previewDrafts && data.draft === true && previewProduct ? route : data.permalink;
  },
};
