const fs = require('fs');
const path = require('path');

module.exports = function () {
  const navPath = path.join(__dirname, '../../docs-nav.json');
  return JSON.parse(fs.readFileSync(navPath, 'utf-8'));
};
