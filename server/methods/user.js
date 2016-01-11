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

        return 0;
    }
        // Get index of last action in time slice
        // var i = userProfile.history.length - 1;
        // var action = userProfile.history[i];
        // while(action.timestamp >= end) {
        //     i--;
        //     action = userProfile.history[i];
        // }

        // var timelyActions = [];

        // // Add all actions in range to timelyActions
        // while(action.timestamp <= start) {
        //     timelyActions.push(action);
        //     i--; 
        //     action = userProfile.history[i];
        // }

        // var matchingActions = timelyActions;
        // if(typeof actions !== "undefined") {
        //     matchingActions = getMatchingActions(userProfile.history, actions);
        // }

        // return sumActionPoints(matchingActions);
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
