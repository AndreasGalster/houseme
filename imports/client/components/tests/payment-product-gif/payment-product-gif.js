import './payment-product-gif.html';


Polymer({

  is: 'payment-product-gif',

  properties: {

    info: {
      type: Object,
    },

    base: {
      type: String,
    }



  },

  toggle: function() {
    this.$$('paper-dialog').toggle();
  },

  pay: function() {
    this.$$('paper-dialog').backdropElement.classList.add('blue');
    this.$$('paper-dialog').toggle();
    this.fire('toggle-payment-form');
  }


});
