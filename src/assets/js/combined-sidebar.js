// Product navigation behavior. Position while hidden, then reveal without animation.
(function () {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  const scroller = sidebar.querySelector('.sidebar-scroll');
  const current = scroller.querySelector('.product-section--current');
  const mobileToggle = sidebar.querySelector('.combined-nav-toggle');
  const phone = window.matchMedia('(max-width: 768px)');
  scroller.querySelectorAll('.product-version-select').forEach(select => {
    select.addEventListener('change', () => { location.assign(select.value); });
  });
  // The alignment spacer can extend past the final link. Fade only for actual links.
  const links = scroller.querySelectorAll('a[href]');
  const lastLink = links[links.length - 1];
  function updateBottomFade() {
    const hasMore = lastLink && scroller.clientHeight > 0 &&
      lastLink.getBoundingClientRect().bottom > scroller.getBoundingClientRect().bottom + 1;
    scroller.toggleAttribute('data-more-below', Boolean(hasMore));
  }
  scroller.addEventListener('scroll', updateBottomFade, { passive: true });
  const resizeObserver = new ResizeObserver(updateBottomFade);
  resizeObserver.observe(scroller);
  scroller.querySelectorAll('.product-section').forEach(section => resizeObserver.observe(section));
  function positionSidebar() {
    if (!current) { scroller.scrollTop = 0; return; }
    const heading = current.querySelector('.product-section-heading');
    const spacer = scroller.querySelector('.sidebar-scroll-space');
    spacer.style.height = '0px';
    scroller.scrollTop = 0;
    const breathingRoom = 24;
    const headingTop = heading.getBoundingClientRect().top - scroller.getBoundingClientRect().top - breathingRoom;
    // Add only enough trailing room to align a short product near the catalog's end.
    spacer.style.height = Math.max(0, headingTop + scroller.clientHeight - scroller.scrollHeight) + 'px';
    scroller.scrollTop = headingTop;
    const active = current.querySelector('[aria-current="page"]');
    if (active) {
      const bounds = scroller.getBoundingClientRect();
      const item = active.getBoundingClientRect();
      if (item.bottom > bounds.bottom - 20) {
        const group = active.closest('.nav-group');
        // Start at a meaningful section boundary before falling back to the page.
        scroller.scrollTop += group.getBoundingClientRect().top - bounds.top - breathingRoom;
        const positionedItem = active.getBoundingClientRect();
        if (positionedItem.bottom > bounds.bottom - 20) scroller.scrollTop += positionedItem.bottom - bounds.bottom + 20;
      }
      else if (item.top < bounds.top + breathingRoom) scroller.scrollTop += item.top - bounds.top - breathingRoom;
    }
  }
  function initialize() {
    positionSidebar();
    sidebar.setAttribute('data-ready', '');
    updateBottomFade();
  }
  mobileToggle.addEventListener('click', () => {
    const open = mobileToggle.getAttribute('aria-expanded') !== 'true';
    mobileToggle.setAttribute('aria-expanded', String(open));
    if (open) positionSidebar();
  });
  // Wait for the webfont before revealing: text reflow cannot move a visible selection.
  positionSidebar();
  document.fonts.ready.then(initialize);
  // Pointer activation in WebKit need not focus the button or sidebar.
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && phone.matches && mobileToggle.getAttribute('aria-expanded') === 'true') {
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.focus();
    }
  });
  phone.addEventListener('change', positionSidebar);
  window.addEventListener('resize', positionSidebar);
  const activeTab = document.querySelector('.product-tab[aria-current]');
  if (activeTab) activeTab.parentElement.parentElement.scrollLeft = Math.max(0, activeTab.offsetLeft - 16);
})();
