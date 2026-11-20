for (const frame of document.querySelectorAll('iframe[data-clip-desktop][data-clip-phone]')) {
  const slot = frame.parentElement;

  function selectClip(width) {
    const layout = width < 600 ? 'phone' : 'desktop';
    if (frame.dataset.clipLayout === layout) return;
    frame.dataset.clipLayout = layout;
    frame.src = layout === 'phone' ? frame.dataset.clipPhone : frame.dataset.clipDesktop;
  }

  selectClip(slot.getBoundingClientRect().width);
  new ResizeObserver(([entry]) => selectClip(entry.contentRect.width)).observe(slot);
}
