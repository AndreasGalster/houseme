// window.Polymer = {
//   lazyRegister: true
// };

(function() {
  if ('registerElement' in document
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template')) {
    // browser has web components
  } else {
    // polyfill web components
    require('webcomponents.js/webcomponents-lite.js');
  }
})();
require('web-animations-js/web-animations-next-lite.min.js');
require('@polymer/polymer/polymer.html');
require('./ui/views/main-view.html');
