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
    takeAction: function(actionId, fieldEntries) {
        check(actionId, String);
        check(fieldEntries, [Number]);
        // Find exactly one action matching the given ID
        var action = Actions.findOne({_id: actionId});
        var points = action.defaultPoints;
        var fields = action.fields;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].operation == MULTIPLY) {
                points *= fieldEntries[i] * fields[i].scale;
            } else if (fields[i].operation == ADD) {
                points += fieldEntries[i] * fields[i].scale;
            }
        }
        var now = new Date();
        var me = Meteor.user();
        Meteor.users.update(
            {_id: Meteor.userId()},
            {$push: {"profile.history":
                {actionId: actionId, timestamp: now, points: points}
            }}
        );
        if (action.isGlobal) {
            Meteor.users.update(
                {_id: Meteor.userId()},
                {$inc: {"profile.points": points}}
            );
        }
        return points;
    }
});
