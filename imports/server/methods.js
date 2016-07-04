Meteor.methods({

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



  sendPublicMessage: function(fromUserId, chatId, message, time) {
    if(chatId === null) {
      // if there's an existing message thread, insert into thread
      PublicMessages.insert(
        {
          messages: [{content: message, fromUserId: fromUserId, time: time}],
          dateCreated: new Date(),
          lastMessage: time
        }
      );
    } else {
      // if there's no message thread yet, create one
      PublicMessages.upsert(
        { _id: chatId },
        {
          $push: {messages: {content: message, fromUserId: fromUserId, time: time} },
          $set: {
            lastMessage: time,
          }
        }
      );
    }
  },


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
