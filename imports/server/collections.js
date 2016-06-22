Accounts.onCreateUser(function(options, user) {

  console.log('creating user');
  // console.log()


  // console.log(options);
  console.log(user);
  // We still want the default hook's 'profile' behavior.
  // if (options.profile)
    // user.profile = options.profile;

  let profile = {
    active: false,
    introduction: '',
    details: {
      moving_to: '',
      minimum_budget: '',
      maximum_budget: '',
      move_in_date: '',
      duration_of_stay: '',
    },
    perks: {
      messy: false,
      smoker: false,
      pets: false,
      party: false
    }
  }
  user.profile = profile;
  console.log(user);

  return user;
  // Meteor.users.update(
  //   this.userId,
  //   {$set: {
  //     profile: {
  //       active: false,
  //       introduction: '',
  //       details: {
  //         moving_to: '',
  //         minimum_budget: '',
  //         maximum_budget: '',
  //         move_in_date: '',
  //         duration_of_stay: '',
  //       },
  //       perks: {
  //         messy: false,
  //         smoker: false,
  //         pets: false,
  //         party: false
  //       }
  //     }
  //   }}
  // );
});

PrivateMessages.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    //return (userId && doc.userid === userId);
    return userId;
  },
  update: function (userId, doc) {
    // can only change your own documents
    return userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.userid === userId;
  },
  //fetch: ['userid']
});

Meteor.publish('user', function() {
  var currentUser;
  currentUser = this.userId;
  if (currentUser) {
    return Meteor.users.find({
      _id: currentUser
    }, {
      fields: {
        "services.facebook": 1,
      }
    });
  } else {
    return this.ready();
  }
});


// return only messagesRead field
Meteor.publish('messagesRead', function () {
    return PrivateMessages.find(
    {
      userids: this.userId,
    },
    {
      fields: {
       'messages': 0,
       'time': 0,
       'userids': 0,
      }
    });
});


// return users. reminder: limit what gets published eventually
Meteor.publish('usersTeaser', function () {
  // return Meteor.users.find({});
  return Meteor.users.find(
    {'profile.active': true},
    {fields:
      {'profile': 1,
      'services.facebook.first_name': 1,
      'services.facebook.id': 1}
    });
});


// publish only messages containing user's userid
Meteor.publish('messagesTeaser', function () {
    // console.log(PrivateMessages.find().fetch());
    return PrivateMessages.find({
      userids: this.userId
    });
});


Meteor.publish('messagesDetail', function (otherUserId) {
    // console.log(PrivateMessages.find().fetch());
    // this.autorun(() => {
    //   this.subscribe('todos.inList', this.getListId());
    // });
    return PrivateMessages.find(
      {$and: [{userids: this.userId}, otherUserId]}
      // ,
      // {fields:
      //   {'profile': 1,
      //   'services.facebook.first_name': 1,
      //   'services.facebook.id': 1}
      // }
    );
});




Meteor.publish('PublicMessages', function () {
    return PublicMessages.find(
  
    );
});
