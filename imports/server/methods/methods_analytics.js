Meteor.methods({
  /* Analytics utilities
   * Retrieve logged in users
   */

  getLoggedInUsers: function() {
    return Meteor.users.find({'profile.logged_in': true}).fetch().length;
  },

  getLoggedOutUsers: function() {
    return Meteor.users.find({'profile.loggedin': false}).fetch().length;
  },

  getUsersArray: function() {
    return Meteor.users.find().fetch();
  },

  getUsers: function() {
    return Meteor.users.find().fetch().length;
  },

  getActiveUsers: function() {
    return Meteor.users.find({'profile.active': true}).fetch().length;
  },

  getInactiveUsers: function() {
    return Meteor.users.find({'profile.active': false}).fetch().length;
  },

  getPrivateMessages: function() {
    return PrivateMessagesDetail.find().fetch().length;
  },

  getPrivateConversations: function() {
    return PrivateMessagesList.find().fetch().length;
  },

  getPublicConversations: function() {
    return PublicMessages.find().fetch().length;
  },

});
