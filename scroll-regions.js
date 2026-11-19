'use strict';

const cheerio = require('cheerio');

// Insert into the original HTML rather than serializing the document, keeping
// authored examples, scripts, whitespace and all unrelated markup unchanged.
function makeScrollRegionsAccessible(html) {
  const $ = cheerio.load(html, { sourceCodeLocationInfo: true });
  const edits = [];
  function annotate(node, fallbackLabel) {
    const location = node.sourceCodeLocation;
    if (!location?.startTag) throw new Error('Scroll region has no source start tag');
    const attributes = { tabindex: '0', role: 'region', 'aria-label': $(node).attr('aria-label')?.trim() || fallbackLabel };
    let added = '';
    for (const [name, value] of Object.entries(attributes)) {
      const escaped = value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const existing = location.attrs?.[name];
      if (existing) edits.push({ start: existing.startOffset, end: existing.endOffset, text: `${name}="${escaped}"` });
      else added += ` ${name}="${escaped}"`;
    }
    if (added) edits.push({ start: location.startTag.endOffset - 1, end: location.startTag.endOffset - 1, text: added });
  }

  $('.doc-content pre').each((index, node) => annotate(node, `Code example ${index + 1}`));
  $('.doc-content table').each((index, node) => {
    const parent = $(node).parent();
    if (parent.hasClass('table-scroll-region')) {
      annotate(parent[0], `Table ${index + 1}`);
      return;
    }
    const location = node.sourceCodeLocation;
    if (!location?.startTag || !location.endTag) throw new Error('Table scroll region requires a complete table element');
    edits.push({ start: location.startOffset, end: location.startOffset, text: `<div class="table-scroll-region" tabindex="0" role="region" aria-label="Table ${index + 1}">` });
    edits.push({ start: location.endOffset, end: location.endOffset, text: '</div>' });
  });

  for (const edit of edits.map((edit, order) => ({ ...edit, order }))
    .sort((a, b) => b.start - a.start || b.order - a.order)) {
    html = html.slice(0, edit.start) + edit.text + html.slice(edit.end);
  }
  return html;
}

module.exports = { makeScrollRegionsAccessible };
