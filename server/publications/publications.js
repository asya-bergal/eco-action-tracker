Meteor.publish('actions', function() {
    // Publish all actions (all under "find")
    return Actions.find({});
});

Meteor.publish('groups', function() {
	//Publish groups
	return Groups.find({});
})