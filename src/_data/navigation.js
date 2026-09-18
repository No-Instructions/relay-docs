const fs = require('fs');
const path = require('path');
module.exports = function () {
  const nav = JSON.parse(fs.readFileSync(path.join(__dirname, '../../docs-nav.json'), 'utf-8'));
  for (const group of nav.groups) {
    for (const item of group.pages) {
      if (item.children) item.urls = item.children.map(child => '/' + child.path + '/');
    }
  }
  return nav;
};
