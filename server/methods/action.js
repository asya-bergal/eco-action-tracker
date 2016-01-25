/**
 * @overview Provides methods related to actions.
 */

/**
* Used for action cap and (possibly) front-end.
*
* @param {string} actionId id of action to consider
* @return {number} points current user has been awarded toward action today
*/
function pointsToday(actionId) {
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
}

/**
 * Adds action to Mongo.
 *
 * @param {Object} data the action object (should match schema)
 */
function addAction(data) {
    check(data, Object);
    return Actions.insert(data, function(err, action) {
        if (err) {
            throw new Meteor.Error("Adding new action failed.")
        }
    });
}

/**
 * Updates Mongo given the form submission.
 *
 * @param {string} actionId id of action being taken
 * @param {number[]} fieldEntries what the user entered into the form
 * @return {number} points awarded for this action
 */ 
function takeAction(actionId, fieldEntries) {
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
    points = Math.min(points, action.dailyCap - pointsToday(actionId));
    // mongo updates
    Meteor.users.update(
        me._id,
        { $push:
            { "profile.history":
                { actionId: actionId, timestamp: now, points: points }
            }
        }
    );
    //if (action.isGlobal) {
        Meteor.users.update(
            { _id: Meteor.userId() },
            { $inc: { "profile.points": points } }
        );
        Groups.update(
            { _id: { $in: me.profile.groups } },
            { $inc: { "points": points } }
        );
    //}
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
    //TODO Fix when competitions are implemented
    // Groups.update(
    //     { "competitions.actions": actionId,
    //       "competitions.userLevel": true,
    //       "competitions.participants.userId": me._id
    //     },
    //     { $inc: { "competitions.participants.$.points": points } }
    // );
    // Groups.update(
    //     { "competitions.actions": actionId,
    //       "competitions.userLevel": false,
    //       "competitions.participants": { $in: me.profile.groups }
    //     },
    //     { $inc: { "competitions.participants.$.points": points } }
    // );
    // return value could be useful for front end stuff
    return points;
}

function approveAction(actionId) {
    check(actionId, String);
    Actions.update(actionId, {$set: 
        { isGlobal: true, needsApproval: false } 
    });
}

function notApproveAction(actionId) {
    check(actionId, String);
    Actions.update(actionId, {$set: 
        { isGlobal: false, needsApproval: false } 
    });
}

function submitForApproval(actionId){
    check(actionId, String);
    Actions.update(actionId, {$set: 
        { needsApproval: false } 
    });    
}

Meteor.methods({
    'pointsToday': pointsToday,
    'addAction': addAction,
    'takeAction': takeAction,
    'approveAction': approveAction,
    'notApproveAction': notApproveAction,
    'submitForApproval': submitForApproval
});
