/*
 * Define the appId and secret for facebook.
 * Local settings.json contains test credentials.
 * MUP settings.json contains live credentials.
 */
ServiceConfiguration.configurations.upsert(
  { "service": "facebook" },
  {
    $set: {
      loginStyle: "popup",
      appId: Meteor.settings.facebook.appId,
      secret: Meteor.settings.facebook.secret
    }
  },
  { upsert: true }
);
