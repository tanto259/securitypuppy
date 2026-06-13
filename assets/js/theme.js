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
})();
