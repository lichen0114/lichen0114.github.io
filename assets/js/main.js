/* Global UI: dark-mode toggle + back-to-top button. */
(function () {
  // ---- Theme toggle -------------------------------------------------------
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // ---- Back to top --------------------------------------------------------
  var btn = document.getElementById('back-to-top');
  if (btn) {
    var onScroll = function () {
      if (window.pageYOffset > 300) btn.classList.add('visible');
      else btn.classList.remove('visible');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    onScroll();
  }
})();
