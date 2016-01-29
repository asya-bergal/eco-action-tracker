Meteor.methods({
    /**
     * This function elevates a user to a Global Admin
     * 
     * @param {string} userId The UserId of the user we wish to elevate
     */
    'addGlobalAdmin': function (userId) {
        check(userId, String);
        Meteor.users.update(userId, {$set: {'profile.globalAdmin': true}});
    },
    /**
     * This function lowers a user to a non Admin
     * 
     * @param {string} userId The UserId of the user we wish to lower
     */
    'removeGlobalAdmin': function (userId) {
        check(userId, String);
        Meteor.users.update(userId, {$set: {'profile.globalAdmin': false}});
    },
    /**
     * Gets a list of emails to download for the user
     * 
     * @returns {string} comma seperated list of user emails
     */
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