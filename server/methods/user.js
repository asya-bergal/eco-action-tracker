//TODO: Error handling?
Meteor.methods({

    getUserPoints: function(userId, actions) {
        check(userId, String);
        check(actions, [String]);

        var userProfile = Meteor.users.findOne({_id: userId}).profile;

        if(typeof actions === "undefined") {
            // Don't filter by actions
            return userProfile.points;
        } else {
            // Filter by whether or not actions contains action
            matchingActions = getMatchingActions(userProfile.history, actions);
        }
        return sumActionPoints(matchingActions);
    },

    getUserPointsBetween: function(userId, start, end, actions) {
        check(userId, String);
        check(start, Match.Any); //TODO: should probably be something else
        check(end, Match.Any); //TODO: should probably be something else
        check(actions, Match.Any); //TODO: should probably be something else

        var userProfile = Meteor.users.findOne({_id: userId}).profile;

        var matchingActions = [];

        // We don't need actions to be in the action list
        if (actions === "undefined") {
            // Get index of last action in time slice
            var i = userProfile.history.length - 1;
            var action = userProfile.history[i];
            while(action.timestamp >= end) {
                i--;
                action = userProfile.history[i];
            }

            // Add all actions while the action's timestamp is greater than th estart
            while(action.timestamp >= start) {
                matchingActions.push(action);
                i--;
                action = userProfile.history[i];
            }
        } else {
            // Get actions that are timely and matching the actions
            matchingActions = getMatchingTimelyActions(userProfile.history, actions, start, end);
        }

        return sumActionPoints(matchingActions);
    },
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

var getMatchingTimelyActions = function(allActions, ids, start, end) {
    return allActions.filter(function(action) {
        return action.timestamp >= start && action.timestamp < end && contains(ids, action._id);
    });
}
