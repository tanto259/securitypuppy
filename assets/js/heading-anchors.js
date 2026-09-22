/* heading-anchors.js — add anchor links to prose headings */
(function() {
  'use strict';
  var headings = document.querySelectorAll('.prose h2, .prose h3');
  headings.forEach(function(h) {
    if (!h.id) return;
    var a = document.createElement('a');
    a.className = 'heading-anchor';
    a.href = '#' + h.id;
    a.textContent = '#';
    a.setAttribute('aria-label', 'Link to this section');
    h.appendChild(a);
  });
})();
