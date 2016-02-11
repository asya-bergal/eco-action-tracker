/**
 * @overview Provides methods for admins.
 */

/** @class AdminMethods */
AdminMethods = (function(){
    var api = {};

    /**
     * This function elevates a user to a Global Admin
     *
     * @memberof AdminMethods
     * @param {string} userId The UserId of the user we wish to elevate
     */
    api.addGlobalAdmin = function (userId) {
        check(userId, String);
        if (Meteor.user().profile.globalAdmin) {
            Meteor.users.update(userId, {$set: {'profile.globalAdmin': true}});
        }
    },
    /**
     * This function lowers a user to a non Admin
     *
     * @memberof AdminMethods
     * @param {string} userId The UserId of the user we wish to lower
     */
    api.removeGlobalAdmin = function (userId) {
        check(userId, String);
        if (Meteor.user().profile.globalAdmin) {
            Meteor.users.update(userId, {$set: {'profile.globalAdmin': false}});
        }
    },
    /**
     * Gets a list of emails to download for the user
     *
     * @memberof AdminMethods
     * @returns {string} comma seperated list of user emails
     */
    api.getUserEmails = function () {
        if (Meteor.user().profile.globalAdmin) {
            var userEmails = Meteor.users.find({}, {fields: {'emails': 1}}).fetch().map(function (u) {
                return u.emails;
            }).reduce(function (a, b) {
                return a.concat(b);
            }, []).map(function (e) {
                return e.address;
            }).join(', ');

            return userEmails;
        }
    }

    return api;
}());

Meteor.methods({
    'addGlobalAdmin': AdminMethods.addGlobalAdmin,
    'removeGlobalAdmin': AdminMethods.removeGlobalAdmin,
    'getUserEmails': AdminMethods.getUserEmails
});
