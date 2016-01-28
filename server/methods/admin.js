Meteor.methods({
    'addGlobalAdmin': function (userId) {
        check(userId, String);
        Meteor.users.update(userId, {$set: {'profile.globalAdmin': true}});
    },
    'removeGlobalAdmin': function (userId) {
        check(userId, String);
        Meteor.users.update(userId, {$set: {'profile.globalAdmin': false}});
    },
    'getUserEmails': function () {
        var userEmails = Meteor.users.find({}, {fields: {'emails': 1}}).fetch().map(function (u) {
            return u.emails;
        }).reduce(function (a, b) {
            return a.concat(b);
        }, []).map(function (e) {
            return e.address;
        }).join(', ');
        
        return userEmails;
    }
});