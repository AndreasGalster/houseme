// only register elements lazily when they're used on the page
window.Polymer = {
  // useNativeCSSProperties: true,
  lazyRegister: true
};

/*
 * Load the webcomponents-lite (shady-dom) polyfill,
 * if browser does not support webcomponents completely.
 */
(function() {
  if ('registerElement' in document
    // browser has web components
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template')) {
  } else {
    // polyfill web components
    require('webcomponents.js/webcomponents-lite.js');
  }
})();

require('web-animations-js/web-animations-next-lite.min.js');
require('@polymer/polymer/polymer.html');
require('./ui/views/main-view.html');
