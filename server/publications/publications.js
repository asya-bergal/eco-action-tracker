Meteor.publish('actions', function() {
    //TODO: Fix publishing not to publish all actions to the client
    return Actions.find({});
});

Meteor.publish('groups', function() {
  //TODO: Fix publishing not to publish all groups to the client
	return Groups.find({});
});

Meteor.publish('competitions', function() {
    //Publish competitions
    return Competitions.find({});
});

Meteor.publish('users', function() {
  //TODO: Fix publishing not to publish all users to the client
  return Meteor.users.find({});
});
