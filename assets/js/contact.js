/* contact.js — email obfuscation via ROT32 + split */
(function() {
  'use strict';
  var el = document.getElementById('email-link');
  if (!el) return;
  var encoded = ')"35"/50`4&$63*5:1611:N$0.';
  var email = '';
  for (var i = 0; i < encoded.length; i++) {
    email += String.fromCharCode((encoded.charCodeAt(i) - 32 - 32 + 95) % 95 + 32);
  }
  var link = document.createElement('a');
  link.href = 'mailto:' + email;
  link.textContent = email;
  el.innerHTML = '';
  el.appendChild(link);
})();
