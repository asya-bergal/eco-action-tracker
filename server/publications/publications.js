Meteor.publish('actions', function() {
    return Actions.find({});
});

Meteor.publish('groups', function() {
    return Groups.find({});
});

Meteor.publish('competitions', function() {
    return Competitions.find({});
});

Meteor.publish('users', function() {
    return Meteor.users.find({});
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
