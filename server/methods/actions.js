Meteor.methods({

    addAction: function(data) {
        // Check to make sure data is an object
        check(data, Object);
        // Add new action to database, potentitally do something with the error
        Actions.insert(data, function(err, action) {
            if (err) {
                throw new Meteor.Error("Adding new action failed.")
            }
        });
        return;
    },
    // Simply returns the number of points given by the action
    takeAction: function(actionId) {
        // Check to make sure data is a string
        check(actionId, String);
        // Find exactly one action matching the given ID
        return Actions.findOne({_id: actionId}).points;
    }
});
