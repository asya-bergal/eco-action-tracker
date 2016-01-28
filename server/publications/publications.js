Meteor.publish('actions', function() {
    // Publish all actions (all under "find")
    var user = Meteor.users.findOne(this.userId);
    var userGroups = user.profile.groups;
    var userActions = [];
    userGroups.forEach(function (groupId) {
        var group = Groups.findOne({_id: groupId});
        userActions = userActions.concat(group.actions);
    });

    return Actions.find({$or: [{isGlobal: true}, {_id: {$in: userActions}}]});

});

Meteor.publish('groups', function() {
	//Publish groups
	return Groups.find({});
});

Meteor.publish('competitions', function() {
    //Publish competitions
    return Competitions.find({});
});

Meteor.publish('users', function() {
    //Publish users
    return Meteor.users.find({});
});
