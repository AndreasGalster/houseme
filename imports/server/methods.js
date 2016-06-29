Meteor.methods({

  sendPrivateMessage: function(chatId, messageId, message, time) {
    // console.log('userids');
    // console.log(userids);

    console.log('chatid');
    console.log(chatId);
    console.log('messageid');
    console.log(messageId);
    console.log('message');
    console.log(message);
    console.log('time');
    console.log(time);

    if(chatId) {
      PrivateMessages.upsert(
        { _id: chatId },
        {
          $push: {messages: {content: message, userid: this.userId} },
          $set: {
            time: time,
            userids: [ this.userId, messageId],
            messageread: [
              { userid: messageId, messageread: false },
              { userid: this.userId, messageread: true }
            ]
          }
        }
      );
    } else {
      PrivateMessages.upsert(
        {},
        {
          $push: {messages: {content: message, userid: this.userId} },
          $set: {
            time: time,
            userids: [ this.userId, messageId],
            messageread: [
              { userid: messageId, messageread: false },
              { userid: this.userId, messageread: true }
            ]
          }
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


  //
  //
  // messageRead: function() {
  //
  //   return Meteor.users.update(
  //     {_id: Meteor.userId() },
  //     {$set: {"profile.messageread": true } }
  //   );
  //
  // },
  //
  // messageNotRead: function() {
  //
  //   return Meteor.users.update(
  //     {_id: Meteor.userId() },
  //     {$set: {"profile.messageread": false } }
  //   );
  //
  // },

  removeAllUsers: function() {
    return Meteor.users.remove({});
  },
  removeUser: function(userid) {
    return Meteor.users.findOne({_id: userid}).remove({});
  },
  removeAllPrivateMessages: function() {
    return PrivateMessages.remove({});
  },
  removeAllPublicMessages: function() {
    return PublicMessages.remove({});
  }
});
