/*
 * Define the appId and secret for facebook.
 * Local settings.json contains test credentials.
 * MUP settings.json contains live credentials.
 */
ServiceConfiguration.configurations.upsert(
  { 'service': 'facebook' },
  {
    $set: {
      loginStyle: 'popup',
      appId: Meteor.settings.facebook.appId,
      secret: Meteor.settings.facebook.secret
    }
  },
  { upsert: true }
);



Meteor.startup(function() {
  PrivateMessagesList._ensureIndex({'toUserId': 1});
  PrivateMessagesList._ensureIndex({'fromUserId': 1});
  PrivateMessagesDetail._ensureIndex({'messageId': 1});

  Meteor.users._ensureIndex({'services.facebook.first_name': 1});
  Meteor.users._ensureIndex({'services.facebook.id': 1});
});
