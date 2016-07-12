// when the user is created, create an empty user profile
Accounts.onCreateUser(function(options, user) {
  console.log('options');
  console.log(options);
  console.log('user');
  console.log(user);

  let profile = {
    logged_in: true,
    active: false,
    email: user.services.facebook.email,
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
});






/* User details
 *
 * Contains three subscriptions
 * Subscribe to own user, only facebook fields
 * Subscribe to all users, no limits
 * Subscribe to latest logged in users via limiter
 */


// returns the own user with facebook fields
Meteor.publish('user', function() {
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
       'services.facebook': 1,
      }
    });
  } else {
    return this.ready();
  }
});


// Subscribe to all users, no limits
Meteor.publish('usersTeaserAll', function () {
  return Meteor.users.find(
    {
      'profile.active': true
    },
    {
      fields: {
        'services.facebook.first_name': 1,
        'services.facebook.id': 1
      }
    }
  );
});


// Subscribe to latest logged in users via limiter
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





/* Public Messaging
 *
 * Contains one subscription
 * Subscribe to all messages based on limiter,
 * sorts newest messages first
 */
Meteor.publish('PublicMessages', function (limiter) {
  return PublicMessages.find(
    {},
    {
      sort: {dateCreated: -1},
      limit: limiter
    }
  );
});






/* Private Messaging
 *
 * Contains three subscriptions
 * Subscribe to users facebookd id & first_name
 * Subscribe to a list of messages without content of messages
 * Subscribe to a specific message including content
 */

// retrieves the user images and facebook name
Meteor.publish('PrivateMessagesUsers', function (limiter) {
  return Meteor.users.find(
    {
      'profile.active': true
      // '_id': {$ne: this.userId}

    },
    {
      fields: {
        'services.facebook.first_name': 1,
        'services.facebook.id': 1
      }
      // limit: limiter
    }
  );
});


// retrieves the list of messages sent/received
Meteor.publish('PrivateMessagesList', function () {
  return PrivateMessagesList.find(
    { $or: [{toUserId: this.userId}, {fromUserId: this.userId}] },
    {
      sort: {'status.createdAt': -1}
    }
  );
});


// retrieves content of one individual message stream
Meteor.publish('PrivateMessagesDetail', function (messageId) {
  return PrivateMessagesDetail.find(
    {messageId: messageId}
  );
});
//     {$and: [{userids: this.userId}, otherUserId]}
