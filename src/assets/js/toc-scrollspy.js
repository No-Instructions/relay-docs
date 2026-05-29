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
      //
      // Gate the call behind "is the link actually clipped by the
      // rail's overflow viewport?" — `scrollIntoView` with
      // `block: 'nearest'` is supposed to be a no-op when the element
      // is fully visible, but the call itself can trigger a forced
      // layout calc and (per Matt's bottom-of-page jitter report) some
      // browser-internal scroll-related side effects near the sticky-
      // unstick boundary at the layout's bottom. Skipping the call
      // when it would be a no-op anyway is free defensive cleanup per
      // Lead's suggested mitigation.
      var railLink = document.querySelector(
        '.toc-rail .toc a[href="#' + cssEscape(newId) + '"]'
      );
      if (railLink && typeof railLink.scrollIntoView === 'function') {
        var rail = railLink.closest('.toc-rail');
        if (rail) {
          var rRect = rail.getBoundingClientRect();
          var lRect = railLink.getBoundingClientRect();
          var clippedTop = lRect.top < rRect.top;
          var clippedBot = lRect.bottom > rRect.bottom;
          if (clippedTop || clippedBot) {
            railLink.scrollIntoView({ block: 'nearest', behavior: 'auto' });
          }
        }
      }
    }
    activeId = newId;
  }

  // Returns the topmost heading whose document-top is at or above the
  // current scroll position + the band's top inset. Falls back to the
  // first heading if no heading is yet above the band (top of page).
  //
  // Uses getBoundingClientRect rather than offsetTop so the comparison
  // is robust against a future style change adding position: relative
  // anywhere up the ancestor tree — offsetTop is relative to the
  // nearest positioned ancestor and would silently desync from scrollY
  // (which is document-relative).
  //
  // Shared between the initial-state pass (for deep-link arrivals) and
  // the observer fallback (for large scroll jumps where no heading is
  // currently in the reading band).
  function pickByScroll() {
    var bandTop = window.scrollY + 80; // matches TOC_ROOT_MARGIN's top inset
    var candidate = null;
    headings.forEach(function (h) {
      var docTop = h.getBoundingClientRect().top + window.scrollY;
      if (docTop <= bandTop) candidate = h;
    });
    return candidate || headings[0];
  }

  // Click-pin: when the user clicks a TOC entry, the click handler sets
  // active to the clicked id, then this timestamp is set ~500ms in the
  // future. Every active-setter path bails while pinned so the
  // browser's anchor-jump scroll settle (and any other transient
  // scroll/intersection activity it triggers) cannot override the
  // click intent. After the pin expires, normal scroll-spy resumes —
  // but only when the user actually scrolls (the listener only fires
  // on scroll events; absent further scroll, the active stays as the
  // click set it). Caught by QA on end-of-document click-handoff: the
  // page can't scroll the anchor to band-top so pickByScroll picks the
  // heading before, and without this pin would override within ~16ms.
  //
  // Three active-setter paths exist and each carries an explicit
  // isClickPinned guard rather than reaching for a cleaner abstraction
  // (per Lead): (1) initialActive — runs once on page load, no click
  // can have happened in-session yet so the guard is a no-op, but the
  // duplication makes the contract uniform; (2) observer callback —
  // both empty-inBand fallback and topmost-in-band branches; (3) scroll
  // listener rAF. The pin uses performance.now() so a wall-clock jump
  // (rare but possible on Windows DST transitions, NTP sync) can't
  // strand the pin in either direction.
  var clickPinUntil = 0;
  function isClickPinned() {
    return performance.now() < clickPinUntil;
  }

  // IntersectionObserver — track the topmost heading in the reading band.
  // Increments observerFireCount so the scroll-listener fallback (below)
  // can detect that the observer owned this frame and bail.
  var inBand = new Set();
  var observerFireCount = 0;
  var observer = new IntersectionObserver(
    function (entries) {
      observerFireCount++;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) inBand.add(entry.target);
        else inBand.delete(entry.target);
      });
      // Click intent overrides scroll-spy for ~500ms. inBand tracking
      // above is still maintained so post-pin updates are accurate.
      if (isClickPinned()) return;
      if (inBand.size === 0) {
        // Edge of the band: the last heading just exited. Fall back to
        // pickByScroll so the active highlight reflects the user's
        // real scroll position. (The companion scroll listener below
        // handles the case where the observer never fires at all.)
        setActive(pickByScroll().id);
        return;
      }
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

  // Passive scroll listener — catches large scroll jumps where the
  // observer is silent. The observer only fires when at least one
  // heading's intersection state changes. A jump between two positions
  // where the same set of headings is "not in band" produces no state
  // change, so the observer never fires, and the active stays stale.
  //
  // QA caught this on a P4 jump from scrollY=0 to scrollY=1200 (band
  // lands in the gap between two headings; inBand stays empty before
  // and after, observer silent), and on install-relay-beta's jump-to-
  // bottom case.
  //
  // The listener only updates active when inBand is empty AND the
  // observer didn't already fire in this frame. When inBand has
  // entries, the observer is the authority (it fires on every
  // intersection-state change anyway). When the observer fired between
  // the rAF being scheduled and running, the observer's setActive
  // already won — bail to avoid a redundant pickByScroll + setActive.
  // Throttled to one fire per animation frame so a fling-scroll on a
  // long page doesn't queue dozens of redundant pickByScroll() calls.
  var scrollTickQueued = false;
  window.addEventListener(
    'scroll',
    function () {
      if (scrollTickQueued) return;
      scrollTickQueued = true;
      var fireCountAtSchedule = observerFireCount;
      window.requestAnimationFrame(function () {
        scrollTickQueued = false;
        if (isClickPinned()) {
          // Click intent overrides scroll-spy for ~500ms after a TOC
          // click — covers the browser's anchor-jump scroll settle and
          // any clamp-induced quirks (e.g. end-of-document clicks where
          // the anchor can't reach band-top).
          return;
        }
        if (observerFireCount > fireCountAtSchedule) {
          // Observer fired since we scheduled this rAF — it owns the
          // active update. Bail to avoid double-setting.
          return;
        }
        if (inBand.size === 0) {
          setActive(pickByScroll().id);
        }
      });
    },
    { passive: true }
  );

  // Initial state: same scroll-position pick used for the observer
  // fallback. Handles deep-link arrivals (anchor in URL, browser scrolls
  // before the observer settles). The click-pin guard here is a
  // duplication-not-cleverness compliance with the click-pin contract:
  // in practice clickPinUntil is 0 at page load, so this is a no-op,
  // but the explicit check keeps the active-setter contract uniform
  // across all three setter paths.
  function initialActive() {
    if (isClickPinned()) return;
    setActive(pickByScroll().id);
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
  //
  // Setting clickPinUntil suppresses the observer and scroll listener
  // for ~500ms so the click intent persists through the browser's
  // anchor-jump scroll settle. Critical for end-of-document clicks
  // where the anchor can't reach band-top — without the pin, the next
  // scroll-listener rAF tick would call pickByScroll() and override
  // the click within ~16ms.
  var CLICK_PIN_MS = 500;
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var inToc = a.closest('.toc-rail') || a.closest('.toc-disclosure');
    if (!inToc) return;
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    setActive(id);
    clickPinUntil = performance.now() + CLICK_PIN_MS;
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
