var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: settings.cloudinary.cloud_name,
  api_key: settings.cloudinary.api_key,
  api_secret: settings.cloudinary.api_secret
});



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
  },



  imageUpload: function (imagepath) {

    cloudinary.uploader.upload(imagePath, (err, res) => {
          if(err){
            console.log(err.reason);
          }
          else{
            return res.public_id;
          }
      },{
          crop: 'limit',
          width: 400,
          height: 400,
          eager: [
            { width: 200, height: 200, crop: 'thumb', gravity: 'face',
              radius: 20 },
              { width: 100, height: 150, crop: fit, format: 'png'}
          ],
          tags: ['profile']
      })

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
  },





  /* Analytics utilities
  *
  * Contains eight subscriptions
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
