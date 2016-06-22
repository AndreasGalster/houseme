import './verification-checker.html';

Polymer({
  is: 'verification-checker',
  properties: {

    fixedBottom: {
      type: Boolean,
      value: false,
    },

    toastMessage: {
      type: String,
      value: function() {
        return 'We\'ve just sent you a verification email.';
      },
    }

  },

  isFixedBottom: function(fixedBottom) {
    return fixedBottom ? 'fixed-bottom' : '';
  },

  sendVerificationEmail: function() {
    Meteor.call('VerifyUser', (error) => {
      this.$$('paper-toast').toggle();
    });
  },

  close: function() {
    this.$$('paper-toast').close();
  },

});
