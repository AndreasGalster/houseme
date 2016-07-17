import './payment-thanks.html';

Polymer({

  is: 'payment-thanks',

  behaviors: [
  ],

  listeners: {
  },

  properties: {

  },

  toggle: function() {
    this.$$('paper-dialog').toggle();
    // this.$$('paper-dialog').backdropElement.classList.add('classname');
  },

});
