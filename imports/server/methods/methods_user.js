Meteor.methods({
  /* Profile retrieval & updating
   *
   * Contains three subscriptions
   * Retrieve user.services facebookd id & first_name
   * Retrieve user.profile
   * Update profile
   */
  getOwnUserFacebook: function() {
    return {
      id: Meteor.user().services.facebook.id,
      first_name: Meteor.user().services.facebook.first_name,
    };
  },

  getOwnUserProfile: function() {
    return Meteor.user().profile;
  },

  getOwnUser: function() {
    return Meteor.user();
  },

  submitProfile: function(options) {
    Meteor.users.update(
      Meteor.userId(),
      {$set: options}
    );
  },
});
