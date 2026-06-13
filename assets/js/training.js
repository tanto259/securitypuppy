/* training.js — accordion, section nav, live search for training page */
(function() {
  'use strict';

  // --- Accordion ---
  document.querySelectorAll('.collapsible-header').forEach(function(header) {
    var content = document.getElementById(header.getAttribute('aria-controls'));
    if (!content) return;

    function toggle() {
      var expanded = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', !expanded);
      if (expanded) {
        content.classList.add('collapsed');
        content.classList.remove('expanded');
      } else {
        content.classList.remove('collapsed');
        content.classList.add('expanded');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    }

    header.addEventListener('click', toggle);
    header.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });

    // Set initial max-height for expanded sections
    if (header.getAttribute('aria-expanded') === 'true') {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });

  // --- Section nav ---
  document.querySelectorAll('.section-nav button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var group = btn.dataset.section;
      var section = document.querySelector('[data-group="' + group + '"]');
      if (!section) return;

      // Expand if collapsed
      var header = section.querySelector('.collapsible-header');
      if (header && header.getAttribute('aria-expanded') === 'false') {
        header.click();
      }

      // Scroll to section
      setTimeout(function() {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

      // Update active state
      document.querySelectorAll('.section-nav button').forEach(function(b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
    });
  });

  // --- Search filter ---
  var searchInput = document.getElementById('course-search');
  var resultCount = document.getElementById('result-count');
  var noResults = document.getElementById('no-results');
  var allCards = document.querySelectorAll('.resource-section .card');
  var allSections = document.querySelectorAll('.resource-section');

  if (!searchInput) return;

  searchInput.addEventListener('input', function() {
    var query = searchInput.value.toLowerCase().trim();
    var visible = 0;

    if (!query) {
      // Reset: show all cards, restore section nav
      allCards.forEach(function(card) { card.classList.remove('hidden'); });
      allSections.forEach(function(s) { s.style.display = ''; });
      if (noResults) noResults.classList.remove('visible');
      if (resultCount) resultCount.textContent = '';
      document.querySelectorAll('.section-nav button').forEach(function(b) {
        b.style.display = '';
      });
      return;
    }

    allCards.forEach(function(card) {
      var text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    // Hide sections with no visible cards, expand those with matches
    allSections.forEach(function(section) {
      var visibleCards = section.querySelectorAll('.card:not(.hidden)');
      if (visibleCards.length === 0) {
        section.style.display = 'none';
      } else {
        section.style.display = '';
        // Auto-expand if collapsed
        var header = section.querySelector('.collapsible-header');
        if (header && header.getAttribute('aria-expanded') === 'false') {
          header.click();
        }
      }
    });

    // Hide section nav buttons during search
    document.querySelectorAll('.section-nav button').forEach(function(b) {
      var group = b.dataset.section;
      var section = document.querySelector('[data-group="' + group + '"]');
      b.style.display = (section && section.style.display === 'none') ? 'none' : '';
    });

    // Update result count
    if (resultCount) {
      resultCount.textContent = visible + ' result' + (visible !== 1 ? 's' : '');
    }
    if (noResults) {
      noResults.classList.toggle('visible', visible === 0);
    }
  });
})();
