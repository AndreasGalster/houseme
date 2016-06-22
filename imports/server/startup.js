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
