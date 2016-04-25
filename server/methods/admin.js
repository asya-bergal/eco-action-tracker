/** @module methods/admin */

/**
 * @namespace
 * @description Methods for interfacing with admin database. Returns public API.
 */
AdminsAPI = (function(){
    /**
     * This function elevates a user to a Global Admin
     *
     * @memberof module:methods/admin~AdminsAPI
     * @param {string} userId The UserId of the user we wish to elevate
     */
    var addGlobalAdmin = function (userId) {
        check(userId, String);
        if (Meteor.user().profile.globalAdmin) {
            Meteor.users.update(userId, {$set: {'profile.globalAdmin': true}});
        }
    };
    /**
     * This function lowers a user to a non Admin
     *
     * @memberof module:methods/admin~AdminsAPI
     * @param {string} userId The UserId of the user we wish to lower
     */
    var removeGlobalAdmin = function (userId) {
        check(userId, String);
        if (Meteor.user().profile.globalAdmin) {
            Meteor.users.update(userId, {$set: {'profile.globalAdmin': false}});
        }
    };
    /**
     * Gets a list of emails to download for the user
     *
     * @memberof module:methods/admin~AdminsAPI
     * @returns {string} comma seperated list of user emails
     */
    var getUserEmails = function () {
        if (Meteor.user().profile.globalAdmin) {
            var userEmails = Meteor.users.find({}, {fields: {'emails': 1}}).fetch().map(function (u) {
                return u.emails;
            }).reduce(function (a, b) {
                return a.concat(b);
            }, []).map(function (e) {
                if(e){
                    return e.address;
                }
            }).join(', ');

            return userEmails;
        }
    };

    // return public API
    return {
        'addGlobalAdmin': addGlobalAdmin,
        'removeGlobalAdmin': removeGlobalAdmin,
        'getUserEmails': getUserEmails
    };
}());

Meteor.methods(AdminsAPI);
