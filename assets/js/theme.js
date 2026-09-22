(function() {
  // Theme toggle — apply stored or system preference, then wire up toggle
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  var stored = localStorage.getItem('theme');
  if (stored === 'light') {
    document.body.setAttribute('data-theme', 'light');
  } else if (stored === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.body.setAttribute('data-theme', 'light');
  }
  // else: no data-theme attr, dark defaults from :root apply

  toggle.addEventListener('click', function() {
    var current = document.body.getAttribute('data-theme');
    var next = (current === 'light') ? 'dark' : 'light';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Hamburger menu
  var btn = document.querySelector('.hamburger');
  var menu = document.getElementById('nav-menu');
  if (btn && menu) {
    btn.addEventListener('click', function() {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      menu.classList.toggle('open');
    });
  }

  // Sticky header shadow on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          header.classList.toggle('scrolled', window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    });
    // Set CSS variable for sticky offsets (header height varies with fluid font)
    function setHeaderHeight() {
      document.documentElement.style.setProperty('--header-height', header.getBoundingClientRect().height + 'px');
    }
    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);
  }
})();
