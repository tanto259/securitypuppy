/* search.js — global Cmd+K / Ctrl+K search modal */
(function() {
  'use strict';

  var modal = document.getElementById('search-modal');
  var input = document.getElementById('global-search-input');
  var resultsContainer = document.getElementById('search-results');
  var trigger = document.getElementById('search-trigger');

  if (!modal || !input || !resultsContainer) return;

  var searchIndex = null;
  var indexFetched = false;

  function fetchIndex() {
    if (indexFetched) return Promise.resolve();
    indexFetched = true;
    return fetch('/index.json')
      .then(function(r) { return r.json(); })
      .then(function(data) { searchIndex = data; })
      .catch(function() { searchIndex = []; });
  }

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    input.value = '';
    resultsContainer.innerHTML = '';
    setTimeout(function() { input.focus(); }, 50);
    // Pre-fetch index on first open
    if (!indexFetched) fetchIndex();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    input.value = '';
    resultsContainer.innerHTML = '';
  }

  // Keyboard shortcut: Cmd+K / Ctrl+K
  document.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (modal.classList.contains('open')) {
        closeModal();
      } else {
        openModal();
      }
    }
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      e.preventDefault();
      closeModal();
    }
  });

  // Trigger button click
  if (trigger) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  }

  // Backdrop click to close
  var backdrop = modal.querySelector('.search-modal-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    var escaped = escapeHtml(text);
    var re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return escaped.replace(re, '<mark>$1</mark>');
  }

  function doSearch(query) {
    resultsContainer.innerHTML = '';
    if (!query || !searchIndex) return;

    var matches = [];
    var q = query.toLowerCase();

    searchIndex.forEach(function(page) {
      var titleLower = (page.title || '').toLowerCase();
      var descLower = (page.description || '').toLowerCase();
      var contentLower = (page.content || '').toLowerCase();

      var titleMatch = titleLower.includes(q);
      var descMatch = descLower.includes(q);
      var contentMatch = contentLower.includes(q);

      if (titleMatch || descMatch || contentMatch) {
        // Find best snippet
        var snippet = '';
        if (contentMatch) {
          var idx = contentLower.indexOf(q);
          var start = Math.max(0, idx - 40);
          var end = Math.min((page.content || '').length, idx + query.length + 80);
          snippet = (start > 0 ? '…' : '') + page.content.substring(start, end).replace(/\s+/g, ' ').trim() + (end < page.content.length ? '…' : '');
        } else if (descMatch) {
          snippet = page.description;
        }

        matches.push({
          title: page.title,
          url: page.url,
          snippet: snippet,
          titleMatch: titleMatch,
          score: titleMatch ? 2 : (descMatch ? 1 : 0)
        });
      }
    });

    // Sort: title matches first, then description, then content
    matches.sort(function(a, b) { return b.score - a.score; });

    if (matches.length === 0) {
      resultsContainer.innerHTML = '<div class="search-modal-empty">No results found for "' + escapeHtml(query) + '"</div>';
      return;
    }

    matches.forEach(function(page) {
      var item = document.createElement('a');
      item.className = 'search-result-item';
      item.href = page.url;
      item.innerHTML = '<div class="search-result-title">' + highlightMatch(page.title, query) + '</div>' +
        (page.snippet ? '<div class="search-result-snippet">' + highlightMatch(page.snippet, query) + '</div>' : '');
      item.addEventListener('click', function() {
        closeModal();
      });
      resultsContainer.appendChild(item);
    });
  }

  // Search input handler — debounce
  var debounceTimer = null;
  input.addEventListener('input', function() {
    var query = input.value.trim();
    clearTimeout(debounceTimer);
    if (!query) {
      resultsContainer.innerHTML = '';
      return;
    }
    debounceTimer = setTimeout(function() {
      if (searchIndex) {
        doSearch(query);
      } else {
        fetchIndex().then(function() { doSearch(query); });
      }
    }, 150);
  });

  // Arrow key navigation in results
  input.addEventListener('keydown', function(e) {
    var items = resultsContainer.querySelectorAll('.search-result-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[0].focus();
    }
  });

  resultsContainer.addEventListener('keydown', function(e) {
    var items = Array.from(resultsContainer.querySelectorAll('.search-result-item'));
    var idx = items.indexOf(document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (idx < items.length - 1) items[idx + 1].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx > 0) {
        items[idx - 1].focus();
      } else {
        input.focus();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (idx >= 0) items[idx].click();
    }
  });
})();
