window.addEventListener('message', event => {
  if (event.origin !== location.origin || event.data?.type !== 'stageshow-height') return;
  const height = event.data.height;
  if (!Number.isFinite(height) || height < 100 || height > 4000) return;
  for (const frame of document.querySelectorAll('iframe[data-comments-animation]')) {
    if (frame.contentWindow === event.source) {
      frame.style.height = height + 'px';
      return;
    }
  }
});
