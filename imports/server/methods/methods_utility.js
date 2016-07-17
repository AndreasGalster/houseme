Meteor.methods({
  /* Utility methods to delete stuff
   *
   * Remove all users
   * Remove a single user
   * Remove list of private messages (does not contain messages)
   * Remove all private messages (contains the message content)
   * Remove all public messages
   */
  removeAllUsers: function() {
    return Meteor.users.remove({});
  },
  removeUser: function(userid) {
    return Meteor.users.remove({_id: userid});
  },
  removeOwnUser: function() {
    return Meteor.users.remove({_id: Meteor.userId()});
  },
  removeAllPrivateMessagesList: function() {
    return PrivateMessagesList.remove({});
  },
  removeAllPrivateMessagesDetail: function() {
    return PrivateMessagesDetail.remove({});
  },
  removeAllPublicMessages: function() {
    return PublicMessages.remove({});
  },
  removePublicMessage: function(id) {
    return PublicMessages.findOne({_id: id}).remove({});
  }
});
