Meteor.methods({

    addAction: function(data) {
        Actions.insert(data, function(err, action) {
            if (err) {
                throw new Meteor.Error("Adding new action failed.")
            }
        });
        return;
    },
    // Simply returns the number of points given by the action
    takeAction: function(actionId) {
        return Actions.findOne({_id: actionId}).fetch().points;
    }
});
