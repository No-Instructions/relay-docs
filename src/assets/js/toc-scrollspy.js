(function () {
  'use strict';

  // Tunable: the "reading band" for scroll-spy. Single named constant at
  // the top of the module so we can tune without ceremony (Lead hard
  // requirement on design open question #4).
  //   -80px top:   just below the 57px sticky header plus a hair
  //   -70% bottom: lower 70% of viewport is "out of band"
  // Net: the band is the top 30% of the viewport minus the header.
  var TOC_ROOT_MARGIN = '-80px 0px -70% 0px';

  var headings = Array.prototype.slice.call(
    document.querySelectorAll('.doc-content h2[id], .doc-content h3[id]')
  );
  if (headings.length < 2) return;

  // Map heading id -> array of corresponding TOC link elements. We
  // look in both the desktop rail and the mobile disclosure so the
  // active-state stays in sync if a user is on a viewport where both
  // could be visible (1024px is the boundary).
  var links = {};
  Array.prototype.forEach.call(
    document.querySelectorAll(
      '.toc-rail .toc a[href^="#"], .toc-disclosure .toc a[href^="#"]'
    ),
    function (a) {
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      if (!links[id]) links[id] = [];
      links[id].push(a);
    }
  );
  if (Object.keys(links).length === 0) return;

  var activeId = null;

  function cssEscape(s) {
    if (typeof CSS !== 'undefined' && CSS.escape) return CSS.escape(s);
    return s.replace(/[^a-zA-Z0-9_-]/g, function (c) {
      return '\\' + c;
    });
  }

  function setActive(newId) {
    if (newId === activeId) return;
    if (activeId && links[activeId]) {
      links[activeId].forEach(function (a) {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      });
    }
    if (newId && links[newId]) {
      links[newId].forEach(function (a) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'location');
      });
      // Auto-scroll the active rail entry into view (inside the rail
      // only — block: 'nearest' avoids scrolling the document).
      var railLink = document.querySelector(
        '.toc-rail .toc a[href="#' + cssEscape(newId) + '"]'
      );
      if (railLink && typeof railLink.scrollIntoView === 'function') {
        railLink.scrollIntoView({ block: 'nearest', behavior: 'auto' });
      }
    }
    activeId = newId;
  }

  // IntersectionObserver — track the topmost heading in the reading band.
  var inBand = new Set();
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) inBand.add(entry.target);
        else inBand.delete(entry.target);
      });
      if (inBand.size === 0) return;
      var sorted = Array.from(inBand).sort(function (a, b) {
        return a.offsetTop - b.offsetTop;
      });
      setActive(sorted[0].id);
    },
    { rootMargin: TOC_ROOT_MARGIN, threshold: 0 }
  );

  headings.forEach(function (h) {
    observer.observe(h);
  });

  // Initial state: pick the topmost heading whose document-top is at or
  // above the current scroll position + the band's top inset. Uses
  // getBoundingClientRect rather than offsetTop so the comparison is
  // robust against a future style change adding position: relative
  // anywhere up the ancestor tree — offsetTop is relative to the
  // nearest positioned ancestor and would silently desync from scrollY
  // (which is document-relative).
  function initialActive() {
    var scrollY = window.scrollY;
    var bandTop = scrollY + 80; // matches TOC_ROOT_MARGIN's top inset
    var candidate = null;
    headings.forEach(function (h) {
      var docTop = h.getBoundingClientRect().top + window.scrollY;
      if (docTop <= bandTop) candidate = h;
    });
    if (candidate) setActive(candidate.id);
    else setActive(headings[0].id);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialActive);
  } else {
    initialActive();
  }

  // Click handler: set active immediately on click (don't wait for the
  // observer to settle), and close the mobile disclosure if the click
  // came from inside it. The browser still does its default anchor jump
  // (CSS scroll-padding-top: 57px is already in place).
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var inToc = a.closest('.toc-rail') || a.closest('.toc-disclosure');
    if (!inToc) return;
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    setActive(id);
    var disclosure = a.closest('.toc-disclosure');
    if (disclosure && disclosure.hasAttribute('open')) {
      // Defer the close so the browser still does the default anchor
      // jump first — closing synchronously can cancel the jump.
      window.setTimeout(function () {
        disclosure.removeAttribute('open');
      }, 0);
    }
  });
})();
