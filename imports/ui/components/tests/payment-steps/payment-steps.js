import './payment-steps.html';
import '../payment-billing/payment-billing.js';
import '../payment-methods/payment-methods.js';
import '../payment-thanks/payment-thanks.js';


Polymer({

  is: 'payment-steps',

  listeners: {
    'iron-overlay-opened': 'colorBackdrop',
    'iron-overlay-closed': 'uncolorBackdrop'

  },

  properties: {

  },

  toggle: function() {
    this.$$('paper-dialog').toggle();
    // this.$$('paper-dialog').backdropElement.classList.add('classname');
  },

  colorBackdrop: function() {
    console.log('color');
    this.$$('paper-dialog').backdropElement.classList.add('blue');
  },

  uncolorBackdrop: function() {
    console.log('uncolor');
    this.$$('paper-dialog').backdropElement.classList.remove('blue');
  },

});
