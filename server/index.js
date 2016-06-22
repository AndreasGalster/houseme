// import prerender from 'prerender-node';
// prerender.set('prerenderToken', 'Meteor.settings.prerender.token');

// WebApp.rawConnectHandlers.use(middleware);
// WebApp.rawConnectHandlers.use(middleware);
// WebApp.rawConnectHandlers.use(proxyMiddleware('http://localhost:4000/graphql'));

const prerender = require('prerender-node');
const settings = Meteor.settings.prerender;

if (settings && settings.token) {
// if (settings && settings.token && settings.host) {
    prerender.set('prerenderToken', settings.token);
    // prerender.set('host', settings.host);
    WebApp.rawConnectHandlers.use(prerender);
}


// var prerender = require('prerender-node').set('prerenderToken', Meteor.settings.prerender.token);
// console.log(prerender);

import '../imports/server/startup.js';

import '../imports/server/collections.js';

import '../imports/server/methods.js';
