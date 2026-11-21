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

  document.querySelectorAll('[data-docs-nav-toggle]').forEach(function (button) {
    var menu = document.getElementById(button.getAttribute('aria-controls'));
    var group = button.closest('.docs-nav-disclosure');
    if (!menu || !group) return;

    function setExpanded(expanded) {
      button.setAttribute('aria-expanded', String(expanded));
      menu.hidden = !expanded;
    }

    button.addEventListener('click', function () {
      setExpanded(menu.hidden);
    });
    group.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || menu.hidden) return;
      event.preventDefault();
      setExpanded(false);
      button.focus();
    });
    group.addEventListener('focusout', function (event) {
      if (!group.contains(event.relatedTarget)) setExpanded(false);
    });
    document.addEventListener('click', function (event) {
      if (!group.contains(event.target)) setExpanded(false);
    });
    if (dialog && dialog.contains(group)) {
      dialog.addEventListener('close', function () { setExpanded(false); });
    }
  });
})();
