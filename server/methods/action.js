Meteor.methods({

    addAction: function(data) {
        // Check to make sure data is an object
        check(data, Object);
        // Add new action to database, potentially do something with the error
        Actions.insert(data, function(err, action) {
            if (err) {
                throw new Meteor.Error("Adding new action failed.")
            }
        });
        return;
    },
    // Simply returns the number of points given by the action
    takeAction: function(actionId, fieldEntries) {
        // checks
        check(actionId, String);
        check(fieldEntries, [Number]);
        // local variables
        var action = Actions.findOne({_id: actionId});
        var points = action.defaultPoints;
        var fields = action.fields;
        var now = new Date();
        var me = Meteor.user();
        // computation
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].operation == MULTIPLY) {
                points *= fieldEntries[i] * fields[i].scale;
            } else if (fields[i].operation == ADD) {
                points += fieldEntries[i] * fields[i].scale;
            }
        }
        // updates
        Meteor.users.update(
            {_id: Meteor.userId()},
            { $push:
                { "profile.history":
                    { actionId: actionId, timestamp: now, points: points }
                }
            }
        );
        if (action.isGlobal) {
            Meteor.users.update(
                { _id: Meteor.userId() },
                { $inc: { "profile.points": points } }
            );
            Groups.update(
                { _id: { $in: me.profile.groups } },
                { $inc: { "points", points } }
            );
        }
        Groups.update(
            { "actions": actionId, "users.userId": Meteor.userId() },
            { $inc: { "users.$.points": points } }
        );
        Groups.update(
            { "actions": actionId, "subgroups.groupId": { $in: me.profile.groups } },
            { $inc: { "subgroups.$.points": points } }
        );
        Groups.update(
            { "competitions.actions": actionId,
              "competitions.userLevel": true,
              "competitions.participants.userId": Meteor.userId()
            },
            { $inc: { "competitions.participants.$.points": points } }
        );
        Groups.update(
            { "competitions.actions": actionId,
              "competitions.userLevel": false,
              "competitions.participants.userId": { $in: me.profile.groups }
            },
            { $inc: { "competitions.participants.$.points": points } }
        );
        // return value could be useful for front end stuff
        return points;
    }
});
