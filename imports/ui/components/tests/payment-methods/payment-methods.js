import './payment-methods.html';

const braintree = require(
  "braintree-web",
  function(braintree) {
    console.log('yolo braintree loaded');
  }
);

// import requirejs from 'requirejs';
// require.config = requirejs.config;

//
// const braintree = require(
//   ['braintree-web'],
//   function() {
//     // console.log(braintree);
//     console.log('yolo braintree loaded');
//   }
// );








Polymer({

  is: 'payment-methods',

  behaviors: [
    Polymer.NeonAnimatableBehavior
  ],

  properties: {

    bankdetails: {
      type: Object,
     // observer: '_disabledChanged'
    },

    payments: {
      type: Object,
     // observer: '_disabledChanged'
    },

    active: {
      type: Boolean,
      value: false
    }

  },

  attached: function() {
    var self = this;
    Meteor.call('getClientToken', function (err, clientToken) {
      if (err) {
        console.log('There was an error', err);
        return;
      }

      // console.log(clientToken);
      self.initializeBraintree(clientToken);
    });
  },

  initializeBraintree: function(clientToken) {
    if (this.active) return;

    braintree.setup(clientToken, 'dropin', {
      container: 'dropin',
      // hostedFields: {
      //      number: {
      //        selector: "#card-number"
      //      },
      //      cvv: {
      //        selector: "#cvv"
      //      },
      //      expirationDate: {
      //        selector: "#expiration-date"
      //      }
      paypal: {
        // container: 'dropin',
        button: {
          type: 'checkout'
        }
      },
      paymentMethodNonceReceived: function (event, nonce) {
        // Session.set('paymentFormStatus', true);
        // if(Meteor.isServer) {
        // }
        console.log(nonce);


        // we've received a payment nonce from braintree
        // we need to send it to the server, along with any relevant form data
        // to make a transaction
        var data = {};
        // var data = serializeForm($('#checkout'));
        data.nonce = nonce;

        Meteor.call('createTransaction', data, function (err, result) {
          if(err) {
            console.log(err);
          }

          else {
            console.log(result);
          }
          // Session.set('paymentFormStatus', null);
          // Router.go('confirmation');
        });

        // myForm.submit();


      }
    });

    this.active = true;
  },


  activeTab: function(e) {

    if( $(e.currentTarget).index() == 0 ) {

      this.$$('#payment_pages').setAttribute('selected',0);
      // this.$$('#payment_pages').setAttribute('entry-animation','slide-from-right-animation');
      // this.$$('#payment_pages').setAttribute('exit-animation','slide-left-animation');
    }

    else {
      this.$$('#payment_pages').setAttribute('selected',1);
      // this.$$('#payment_pages').setAttribute('entry-animation','slide-from-left-animation');
      // this.$$('#payment_pages').setAttribute('exit-animation','slide-right-animation');
    }

  },


});
