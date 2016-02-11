//TODO: Error handling?
Meteor.methods({

    /**
     * Get the number of points a user has earned, optionally specifying
     * a set of actions to use when calculating.
     *
     * @param {String} userid id of user to get points from
     * @param {String[]} [actions] list of action ids to use for points calculation
     * @return {Number} points current user has gained from given set of actions
     */
    getUserPoints: function(userId, actions) {
        check(userId, String);
        check(actions, [String]);

        var userProfile = Meteor.users.findOne({_id: userId}).profile;

        if(!actions) {
            // Don't filter by actions
            return userProfile.points;
        } else {
            // Filter by whether or not actions contains action
            matchingActions = getMatchingActions(userProfile.history, actions);
        }
        return sumActionPoints(matchingActions);
    },

    /**
     * get the number of points a user has earned between two points in time,
     * optionally specifying a set of actions to use when calculating
     *
     * @param {String} userId id of user to get points from
     * @param {Date} start start of period of time to calculate points from
     * @param {Date} end end of period of time to calculate points from
     * @param {String} userId id of user to get points from
     * @param {String[]} [actions] list of action ids to use for points calculation
     * @return {Number} points current user has gained from given set of actions
     */
    getUserPointsBetween: function(userId, start, end, actions) {
        check(userId, String);
        check(start, Match.Any); //TODO: should probably be something else
        check(end, Match.Any); //TODO: should probably be something else
        check(actions, Match.Any); //TODO: should probably be something else

        var userProfile = Meteor.users.findOne({_id: userId}).profile;

        var matchingActions = [];

        // We don't need actions to be in the action list
        if(!actions) {
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

    verifyUserEmail: function(userId) {
        check(userId, String);
        Accounts.sendVerificationEmail(userId);
    },
    passwordReset: function(userId) {
        check(userId, String);
        Accounts.sendResetPasswordEmail(userId);
    }
});

// Return true if arr contains element, else return False
var contains = function (arr, element) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === element) {
            return true;
        }
    }
    return false;
};

// Given a list of actions, sum all the points resulting from those actions
var sumActionPoints = function(actions) {
    return actions.reduce(function(action1, action2) {
        return action1.points + action2.points;
    }, 0);
};

// Filter a list of allActions by only certain actionids
var getMatchingActions = function(allActions, ids) {
    return allActions.filter(function(action) {
        return contains(ids, action._id);
    });
};

// Filter a list of allActions by only certain actionids, as well as a start and end date
var getMatchingTimelyActions = function(allActions, ids, start, end) {
    return allActions.filter(function(action) {
        return action.timestamp >= start && action.timestamp < end && contains(ids, action._id);
    });
};
