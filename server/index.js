// require prerender and define get prerender tokens
const prerender = require('prerender-node');
const settings = Meteor.settings.prerender;

// tell prerender to fetch page
if (settings && settings.token) {
    prerender.set('prerenderToken', settings.token);
    WebApp.rawConnectHandlers.use(prerender);
}

// imports startup scripts
import '../imports/server/startup.js';

// imports only collections
import '../imports/server/collections.js';

// imports only methods
import '../imports/server/methods/methods.js';
