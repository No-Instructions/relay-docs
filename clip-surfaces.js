const { load } = require('cheerio');

function wrapClips(html) {
  const $ = load(html, { sourceCodeLocationInfo: true });
  const clips = $('.doc-content iframe[src^="/assets/"], .doc-content video').toArray();
  for (const clip of clips.reverse()) {
    if ($(clip).parent().hasClass('clip-surface')) continue;
    const { startOffset, endOffset } = clip.sourceCodeLocation;
    html = html.slice(0, startOffset) + '<span class="clip-surface">' +
      html.slice(startOffset, endOffset) + '</span>' + html.slice(endOffset);
  }
  return html;
}

module.exports = { wrapClips };
