(function () {
  'use strict';

  // Mobile burger: open / close the HTML5 <dialog>.
  var dialog = document.getElementById('mobile-nav-dialog');
  var trigger = document.getElementById('mobile-nav-trigger');
  var closeBtn = document.getElementById('mobile-nav-close');

  if (dialog && trigger) {
    trigger.addEventListener('click', function () {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        // Very old browser fallback: just show the dialog non-modally
        dialog.setAttribute('open', '');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        dialog.close();
      });
    }

    // Click on a link inside the dialog → close + let navigation happen
    dialog.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (a) {
        dialog.close();
        return;
      }
      // Click on the dialog element itself (not its children) means the
      // click landed on the ::backdrop area. HTML5 <dialog> doesn't
      // auto-close on backdrop click — wire it manually.
      if (e.target === dialog) {
        dialog.close();
      }
    });

    // Native dialog close (ESC, backdrop, programmatic) — sync aria-expanded
    dialog.addEventListener('close', function () {
      trigger.setAttribute('aria-expanded', 'false');
    });
  }

  // Consult CTA — Plausible custom event.
  // site: 'docs' differentiates from marketing's site: 'relay' so the
  // conversion attribution stays clean across surfaces.
  var consult = document.getElementById('consult-cta');
  if (consult) {
    consult.addEventListener('click', function () {
      if (typeof window.plausible === 'function') {
        window.plausible('Consult Nav Click', {
          props: { page: window.location.pathname, site: 'docs' }
        });
      }
    });
  }
})();
