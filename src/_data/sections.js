const fs = require('fs');
const path = require('path');
const { sections } = require('../../nav-pages');

// A section with its own authored page (src/<path>.md) replaces the
// generated card index; every other section keeps the generated page.
const authored = section => fs.existsSync(path.join(__dirname, '..', section.path + '.md'));

module.exports = () => sections(require('../../docs-nav.json')).filter(section => !authored(section));
