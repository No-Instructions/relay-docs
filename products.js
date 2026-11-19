const catalog = require('./docs-products.json');
const draftProducts = catalog.filter(p => p.draft);
const previewDrafts = process.env.DOCS_PREVIEW_DRAFTS === '1';
const previewSoon = process.env.DOCS_PREVIEW_SOON === '1';
const previewBuild = previewDrafts || previewSoon;
const privateAssetDirectories = catalog.filter(p => p.draft && !previewDrafts).map(p => p.assetsDirectory).filter(Boolean);
function getProducts(source = catalog, flags = { previewSoon, previewDrafts }) {
  return source.filter(p => (p.visible || flags.previewSoon) && (!p.draft || flags.previewDrafts)).map(p => ({
    ...p, id: p.slug, homePath: p.landingUrl, version: p.versions[0]?.label,
    nav: p.navFile ? structuredClone(require('./' + p.navFile).groups) : structuredClone(p.nav),
  }));
}
const products = getProducts();
function productForUrl(url = '/') {
  if (typeof url !== 'string' || url === '/') return null;
  return products.filter(p => p.urlPrefix && url.startsWith(p.urlPrefix))
    .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)[0] || null;
}
function versionForUrl(product, url) {
  return product.versions.filter(v => typeof url === 'string' &&
    (url === v.url || (v.urlPrefix && url.startsWith(v.urlPrefix))))
    .sort((a, b) => (b.urlPrefix || b.url).length - (a.urlPrefix || a.url).length)[0]
    || product.versions[0];
}
function versionPageUrl(product, targetVersion, pageUrl) {
  const current = versionForUrl(product, pageUrl);
  if (!current.urlPrefix || !targetVersion.urlPrefix || !pageUrl?.startsWith(current.urlPrefix)) return targetVersion.url;
  if (!product.nav) return targetVersion.url;
  const target = targetVersion.urlPrefix + pageUrl.slice(current.urlPrefix.length);
  const groups = targetVersion.navFile ? require('./' + targetVersion.navFile).groups : product.nav;
  const pages = groups.flatMap(group => [group, ...group.pages.flatMap(item => [item, ...(item.children || [])])]);
  return pages.some(page => '/' + page.path + '/' === target) ? target : targetVersion.url;
}
function productOgSlug(slug, url) {
  const product = productForUrl(url);
  if (!product || product.urlPrefix === '/') return slug;
  return url === versionForUrl(product, url)?.url ? product.slug : product.slug + '-' + slug;
}
function getNavigation() {
  const groups = [];
  for (const product of products) {
    groups.push(...product.nav.map(group => ({ ...group, productId: product.slug })));
    for (const version of product.versions.filter(version => version.navFile)) {
      const archive = require('./' + version.navFile);
      groups.push(...archive.groups.map(group => ({ ...group, productId: product.slug, version: version.label })));
    }
  }
  return { groups };
}
module.exports = { draftProducts, getProducts, products, productForUrl, getNavigation, versionForUrl, versionPageUrl, productOgSlug, previewDrafts, previewBuild, privateAssetDirectories };
