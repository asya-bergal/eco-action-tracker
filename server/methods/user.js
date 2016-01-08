//TODO: Error handling?
Meteor.methods({

    addToGroup: function(userId, groupId) {
        check(userId, String);
        Meteor.users.update(
            {_id: userId},
            {$push: {profile.groups: groupId}}
        )
        // TODO: Make sure no duplicate group Ids
        // TODO: Do something/call something on the group side
    },

    addToCompetition: function(userId, competitionId) {
        check(userId, String);
        check(competitionId, String);

        Meteor.users.update(
            {_id: userId},
            {$push: {profile.competitions: competitionId}}
        )
        // TODO: Make sure no duplicate competition Ids
        // TODO: Do something/call something on the group side
    },

    getGroups: function(userId) {
        check(userId, String);
        return Meteor.users.findOne({_id: userId}).profile.groups;
    },

    getCompetitions: function(userId) {
        check(userId, String);
        return Meteor.users.findOne({_id: userId}).profile.competitions;
    },

    isGlobalAdmin: function(userId) {
        check(userId, String);
        return Meteor.users.findOne({_id: userId}).profile.global_admin;
    },

    getPoints: function(userId, actions) {
        check(userId, String);
        check(userId, [String]);

        var userProfile = Meteor.users.findOne({_id: userId}).profile;

        if(typeof actions === "undefined") {
            // Don't filter by actions
            return userProfile.points;
        } else {
            // Filter by whether or not actions contains action
            matchingActions = getMatchingActions(userProfile.history, actions);
        }
    },

    getPointsSince: function(userId, time, actions) {
        check(userId, String);
        check(time, Match.Any); //TODO: should probably be something else
        check(actions, [String]);

        var userProfile = Meteor.users.findOne({_id: userId}).profile;

        var lateActions = userProfile.history.filter(function(action) {
            return action.timestamp >= time;
        });

        var matchingActions = lateActions;
        if(typeof actions !== "undefined") {
            matchingActions = getMatchingActions(userProfile.history, actions);
        }

        return sumActionPoints(matchingActions);
    },

    takeAction: function(actionId, points) {
        check(actionId, String);
        check(points, Number);

        var now = new Date();
        Meteor.users.update(
            {_id: userId},
            {$push: {profile.history: {actionId, now, points}},
             $inc: {profile.points: points}
            }
        );
    }

});

var contains = function (arr, element) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === element) {
            return true;
        }
    }
    return false;
}

var sumActionPoints = function(actions) {
    return actions.reduce(function(action1, action2) {
        return action1.points + action2.points;
    }, 0);
}

var getMatchingActions = function(allActions, ids) {
    return allActions.filter(function(action) {
        return contains(ids, action._id);
    });
}
