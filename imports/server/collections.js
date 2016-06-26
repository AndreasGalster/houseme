Accounts.onCreateUser(function(options, user) {

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
  return user;
});

Meteor.publish('user', function() {
  var currentUser;
  currentUser = this.userId;
  if (currentUser) {
    return Meteor.users.find({
      _id: currentUser
    }, {
      fields: {
        'services.facebook': 1,
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


Meteor.publish('usersTeaserAll', function () {
  return Meteor.users.find(
    {
      'profile.active': true
      // '_id': {$ne: this.userId}
    },
    {
      fields: {
        'profile': 1,
        'services.facebook.first_name': 1,
        'services.facebook.id': 1
      }
    }
  );
});

Meteor.publish('usersTeaser', function (limiter) {
  return Meteor.users.find(
    {
      'profile.active': true,
      '_id': {$ne: this.userId}
    },
    {
      fields: {
        'status': 1,
        'profile': 1,
        'services.facebook.first_name': 1,
        'services.facebook.id': 1
      },
      sort: {
        'status.lastLogin.date': -1
      },
      limit: limiter
    }
  );

});

Meteor.publish('PublicMessages', function (limiter) {
  return PublicMessages.find(
    {},
    {
      sort: {dateCreated: -1},
      limit: limiter
    }
  );
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
