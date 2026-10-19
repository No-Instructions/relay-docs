const fs = require('fs');
const path = require('path');
module.exports = function () {
  const nav = JSON.parse(fs.readFileSync(path.join(__dirname, '../../docs-nav.json'), 'utf-8'));
  // Breadcrumb trail for every page in the nav, keyed by URL: its group,
  // its subgroup if any, then the page itself.
  const crumb = (title, p) => ({ title, url: '/' + p + '/' });
  nav.trails = {};
  for (const group of nav.groups) {
    const groupCrumb = crumb(group.group, group.path);
    nav.trails[groupCrumb.url] = [groupCrumb];
    for (const item of group.pages) {
      const itemCrumb = crumb(item.title, item.path);
      nav.trails[itemCrumb.url] = [groupCrumb, itemCrumb];
      if (item.children) {
        item.urls = ['/' + item.path + '/', ...item.children.map(child => '/' + child.path + '/')];
        for (const child of item.children) {
          const childCrumb = crumb(child.title, child.path);
          nav.trails[childCrumb.url] = [groupCrumb, itemCrumb, childCrumb];
        }
      }
    }
  }
  return nav;
};
