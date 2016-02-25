Meteor.publish('actions', function() {
    return Actions.find({});
});

Meteor.publish('groups', function() {
    return Groups.find({});
});

Meteor.publish('competitions', function() {
    return Competitions.find({});
});

Meteor.publish('users', function() {
    return Meteor.users.find({});
});
