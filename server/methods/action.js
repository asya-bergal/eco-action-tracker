/** @module methods/action */

/**
 * @namespace
 * @description Defines methods for manipulating actions. Returns public API.
 */
ActionsAPI = (function(){
    /**
     * Used for action cap and (possibly) front-end.
     *
     * @memberof module:methods/action~ActionsAPI
     * @param {String} actionId id of action to consider
     * @return {Number} points current user has been awarded toward action today
     */
    var pointsToday = function(actionId) {
        // checks
        check(actionId, String);
        // local variables
        var action = Actions.findOne({_id: actionId});
        var me = Meteor.user();
        var now = new Date();
        var points = 0;
        // computation
        for (var i = 0; i < me.profile.history.length; i++) {
            var h = me.profile.history[i];
            if (h.timestamp.getFullYear() === now.getFullYear() &&
                h.timestamp.getMonth() === now.getMonth() &&
                h.timestamp.getDate() === now.getDate() &&
                    h.actionId === actionId) {
                        points += h.points;
                    }
        }
        return points;
    };

    /**
     * Adds action to Mongo.
     *
     * @memberof module:methods/action~ActionsAPI
     * @param {Object} data the action JSON (should match schema)
     */
    var addAction = function(data) {
        check(data, Object);
        return Actions.insert(data, function(err, action) {
            if (err) {
                throw new Meteor.Error("Adding new action failed.")
            }
        });
    };;

    /**
     * Updates Mongo given the form submission.
     *
     * @memberof module:methods/action~ActionsAPI
     * @param {String} actionId id of action being taken
     * @param {Number[]} fieldEntries what the user entered into the form
     * @return {Number} points awarded for this action
     */
    var takeAction = function(actionId, fieldEntries) {
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
            points += fieldEntries[i] * fields[i].scale;
        }
        points = Math.min(points, action.dailyCap - pointsToday(actionId));
        // mongo updates
        var actionInfo = { actionId: actionId, timestamp: now, points: points }
        Meteor.users.update(
            me._id,
            { $push: { "profile.history": actionInfo } }
        );
        actionInfo["user"] = me._id;
        Groups.update(
            { "actions": actionId },
            { $push: { history: actionInfo } }
        );
        if (action.isGlobal) {
            Meteor.users.update(
                { _id: Meteor.userId() },
                { $inc: { "profile.points": points } }
            );
            Groups.update(
                { _id: { $in: me.profile.groups } },
                { $inc: { "points": points } }
            );
        }
        Groups.update(
            { "actions": actionId, "users.userId": Meteor.userId() },
            { $inc: { "users.$.points": points } }
        );
        Groups.update(
            { "actions": actionId,
                "subgroups.groupId": { $in: me.profile.groups }
            },
            { $inc: { "subgroups.$.points": points } }
        );

        // TODO Fix when competitions are implemented
        Competitions.update(
            { "actions": actionId,
                "userLevel": true,
                "participants.userId": me._id
            },
            { $inc: { "participants.$.points": points } }
        );
        Competitions.update(
            { "actions": actionId,
                "userLevel": false,
                "participants.userId": { $in: me.profile.groups }
            },
            { $inc: { "participants.$.points": points } }
        );
        // return value could be useful for front end stuff
        return points;
    };;

    /**
     * Approve action for global use.
     *
     * @memberof module:methods/action~ActionsAPI
     * @param {String} actionId Database ID of action to be approved
     */
    var approveAction = function(actionId) {
        check(actionId, String);
        Actions.update(actionId, {$set:
                       { isGlobal: true, needsApproval: false }
        });
    };

    /**
     * Do not approve action for global use.
     *
     * @memberof module:methods/action~ActionsAPI
     * @param {String} actionId Database ID of action to be not approved
     */
    var notApproveAction = function(actionId) {
        check(actionId, String);
        Actions.update(actionId, {$set:
                       { isGlobal: false, needsApproval: false }
        });
    };

    /**
     * Submit group action for global admin approval.
     *
     * @memberof module:methods/action~ActionsAPI
     * @param {String} actionId Database ID of action to be submitted for
     * approval
     */
    var submitForApproval = function(actionId) {
        check(actionId, String);
        Actions.update(actionId, {$set:
                       { needsApproval: true }
        });
    };

    /**
     * Remove action from database.
     *
     * @memberof module:methods/action~ActionsAPI
     * @param {String} actionId Database ID of action to be removed
     */
    var removeAction = function(actionId) {
        check(actionId, String);
        Actions.remove(actionId);
    };

    /**
     * Make action not global, remains in group if applicable.
     *
     * @memberof module:methods/action~ActionsAPI
     * @param {String} actionId Database ID of action
     */
    var makeUnglobal = function(actionId) {
        check(actionId, String);
        Actions.update(actionId, {$set:
                       { isGlobal: false }
        });
    };

    // return the public API
    return {
        pointsToday: pointsToday,
        addAction: addAction,
        takeAction: takeAction,
        approveAction: approveAction,
        notApproveAction: notApproveAction,
        submitForApproval: submitForApproval,
        removeAction: removeAction,
        makeUnglobal: makeUnglobal
    };
}());

Meteor.methods(ActionsAPI);
