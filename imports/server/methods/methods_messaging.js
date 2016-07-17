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
    console.log(toUserId);
    console.log(fromUserId);
    console.log(userSelected);
    // PrivateMessagesList._ensureIndex({ 'messageId': 1});
    // PrivateMessagesDetail._ensureIndex({ 'messageId': 1});


    // new one
    if(userSelected) {
      const random = Random.id();
      PrivateMessagesList.insert(
        {
          messageId: random,
          userIds: [toUserId, fromUserId],
          toUserId: toUserId,
          fromUserId: fromUserId,
          status: {
            createdAt: new Date()
          }
        }
      );

      PrivateMessagesDetail.insert(
        {
          fromUserId: fromUserId,
          messageId: random,
          createdAt: new Date(),
          messageText: message
        }
      );

      return random;
    }else {
      PrivateMessagesList.update(
        { messageId: messageId },
        {
          messageId: messageId,
          userIds: [toUserId, fromUserId],
          toUserId: toUserId,
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
  }

});
