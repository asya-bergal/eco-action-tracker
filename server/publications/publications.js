Meteor.publish('actions', function() {
    // Publish all actions (all under "find")
    return Actions.find({});
});
