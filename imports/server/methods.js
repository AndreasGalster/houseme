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

  submitProfile: function(options) {
    Meteor.users.update(
      Meteor.userId(),
      {$set: options}
    );
  },







  getUserImage: function(userId) {
    var user = Meteor.users.findOne({ _id: userId});
    return user.services.facebook.id;
  },

  getUserName: function(userId) {
    var user = Meteor.users.findOne({ _id: userId});
    return user.services.facebook.first_name;
  },

  sendPrivateMessage: function(fromUserId, toUserId, messageId, message, userSelected) {
    console.log(messageId);
    console.log(userSelected);

    // existing one
    if(userSelected) {
      PrivateMessagesList.update(
        { messageId: messageId },
        {
          messageId: messageId,
          userIds: [toUserId, fromUserId],
          toFacebookId: Meteor.users.findOne({_id: toUserId}).services.facebook.id,
          toFacebookName: Meteor.users.findOne({_id: toUserId}).services.facebook.first_name,
          toUserId: toUserId,
          fromFacebookId: Meteor.users.findOne({_id: fromUserId}).services.facebook.id,
          fromFacebookName: Meteor.users.findOne({_id: fromUserId}).services.facebook.first_name,
          fromUserId: fromUserId,
          status: {
            createdAt: new Date()
          }
        }
      );

      PrivateMessagesDetail.insert(
        {
          messageId: messageId,
          fromUserId: fromUserId,
          createdAt: new Date(),
          messageText: message
        }
      );

    }else {
      const random = Random.id();
      PrivateMessagesList.insert(
        {
          messageId: random,
          userIds: [toUserId, fromUserId],
          toFacebookId: Meteor.users.findOne({_id: toUserId}).services.facebook.id,
          toFacebookName: Meteor.users.findOne({_id: toUserId}).services.facebook.first_name,
          toUserId: toUserId,
          fromFacebookId: Meteor.users.findOne({_id: fromUserId}).services.facebook.id,
          fromFacebookName: Meteor.users.findOne({_id: fromUserId}).services.facebook.first_name,
          fromUserId: fromUserId,
          status: {
            createdAt: new Date()
          }
        }
      );

      PrivateMessagesDetail.insert(
        // { messageId, createdAt, messageText }
        // {},
        {
          fromUserId: fromUserId,
          messageId: random,
          createdAt: new Date(),
          messageText: message
        }
      );

    }
  },



  sendPublicMessage: function(fromUserId, chatId, message) {
    if(chatId === null) {
      // if there's an existing message thread, insert into thread
      PublicMessages.insert({
        messages: [{content: message, fromUserId: fromUserId, dateCreated: new Date()}],
        dateCreated: new Date(),
        lastMessage: new Date()
      });
    } else {
      // if there's no message thread yet, create one
      PublicMessages.upsert(
        { _id: chatId },
        {
          $push: {messages: {content: message, fromUserId: fromUserId, dateCreated: new Date()} },
          $set: {lastMessage: new Date()}
        }
      );
    }
  },


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
    return Meteor.users.findOne({_id: userid}).remove({});
  },
  removeAllPrivateMessagesList: function() {
    return PrivateMessagesList.remove({});
  },
  removeAllPrivateMessagesDetail: function() {
    return PrivateMessagesDetail.remove({});
  },
  removeAllPublicMessages: function() {
    return PublicMessages.remove({});
  }
});
