import './login-form.html';
var _ = require('lodash');
console.log(_);

Polymer({
  is: 'login-form',
  properties: {
    ////////////////////////////////////////////////
    // determines if form is set to vendor signup //
    ////////////////////////////////////////////////
    vendor: {
      type: Boolean,
      value: false
    },

    redirectTo: {
      type: String,
      value: function() {
        return FlowRouter.current().path;
      }
    },

    ////////////////////////////////////////////////////////////
    // modal state - whether or not form is in a paper-dialog //
    ////////////////////////////////////////////////////////////
    modal: {
      type: Boolean,
      value: false
    },

    ////////////////////////////////////////////////
    // user state - changes behavior on logged in //
    ////////////////////////////////////////////////
    loggedIn: {
      type: Boolean,
      value: false
    },

    ///////////////////////////////////////////////////
    // defines if state is currently login or signup //
    ///////////////////////////////////////////////////
    alreadyMember: {
      type: Boolean,
      value: false
    },

    ///////////////////////////////////////////////////
    // defines if state is currently login or signup //
    ///////////////////////////////////////////////////
    visiblePassword: {
      type: Boolean,
      value: false
    },

    ///////////////////////////////////////////////////
    // defines if state is currently login or signup //
    ///////////////////////////////////////////////////
    signup: {
      type: Boolean,
      value: false
    },

    ///////////////////////////////////////////////////
    // name of callback function to execute on login //
    ///////////////////////////////////////////////////
    callback: {
      type: String,
    },
  },

  logout: function() {
    Meteor.logout();
  },

  validate: function() {
    var self = this;
    var validity = [];

    Polymer.dom(this.root).querySelectorAll('.validate').forEach(function(value) {
      value.validate();
      validity.push(value.invalid);
    });

    return validity;
  },

  signupUser: function(e) {
    var user;
    var self = this;

    user = {
      password: this.password,
      email: this.email,
      profile: {
        vendor: this.vendor,
        vendorVerified: false
      }
    };

    this.validate();

    if ( _.includes(this.validate(), true) === false ) {
      Accounts.createUser(user, function (error, result) {
        if (error) {
          if (error.error === 403) {
            self.$$('paper-toast').text = 'This e-mail is already in use.';
            self.$$('paper-toast').toggle();
          }
        }

        else {
          // Meteor.call('SendNewUserMail', self.email);
          Meteor.call('VerifyUser');
          // Accounts.sendVerificationEmail( Meteor.userId(), self.email);
          // Accounts.sendVerificationEmail( Meteor.userId(), self.email, 'SendNewUserMailFix');

        }

        // Meteor.call('');Accounts.sendVerificationEmail( Meteor.userId(), Meteor.user().emails[0].address);
      });
    }

  },



  loginUser: function(e) {
    var self = this;
    this.validate();

    if ( _.includes(this.validate(), true) === false ) {
      Meteor.loginWithPassword(this.email, this.password, function (error, result) {
        if (error) {
          if (error.error === 403) {
            self.$$('paper-toast').text = 'This account does not exist.';
            self.$$('paper-toast').toggle();
          }
        }

        else {
          console.log('logged in');
          FlowRouter.go('/' + self.redirectTo || 'bla');
        }
      });
    }
  },

  showPassword: function(e) {
    this.$$('paper-input').setAttribute('type','text');
    this.visiblePassword = true;
  },

  hidePassword: function(e) {
    this.$$('paper-input').setAttribute('type','password');
    this.visiblePassword = false;
  },

  setAlreadyMember: function(e) {
    this.toggleAttribute('already-member');
  },

  close: function() {
    this.$$('paper-toast').close();
  },

  toggle: function() {
    this.$$('paper-dialog').toggle();
  },

  toggleLogin: function() {
    this.toggleAttribute('already-member',true);
    this.toggle();
  },

  toggleSignup: function() {
    this.toggleAttribute('already-member',false);
    this.toggle();
  },

});
