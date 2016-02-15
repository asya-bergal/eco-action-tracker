/** @module methods/group */

/**
 * @namespace
 * @description Defines methods for manipulating groups. Returns public API.
 */
GroupsAPI = (function(){
    /**
     * Add new group to database.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param  {Object} group JSON object containing data for group to be added to database
     * @return {String} Database ID of group just added
     */
    var createGroup = function(group) {
        check(group, Object);
        group.creationDate = Date.now();
        group.admins = [Meteor.userId()];
        group.users = [{userId:Meteor.userId(), points:0}]

        var groupId = Groups.insert(group, function(err, group) {
            if (err) {
                console.log(err);
                throw new Meteor.Error("Adding new group failed.");
            }
        });

        Meteor.users.update(
            Meteor.userId(),
            { $push: { "profile.groups": groupId,
                 "profile.adminGroups": groupId }
            }
        );

        return groupId;
    };

    /**
     * Remove group from database.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param  {String} groupId Database ID of group to be removed
     */
    var removeGroup = function(groupId) {
        check(groupId, String);
        Actions.remove({group: groupId});
        Groups.remove(groupId);
    };

    /**
     * Add user to group request list.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param {String} groupId Database ID of group to request to add user to
     */
    var requestToJoinGroup = function(groupId) {
        check(groupId, String);
        var userId = Meteor.userId();

        if (Groups.findOne({_id: groupId, "users.userId": userId})) {
            // User already in group
            throw new Meteor.Error("User already in group.");
        } else if (Groups.findOne(groupId).usersRequesting.indexOf(userId) !== -1) {
            // User already made request to join
            throw new Meteor.Error("User has already requested to join group.");
        } else {
            // Add user to request list
            Groups.update(
                groupId,
                { $push: { usersRequesting: userId } }
            )
        }
    };

    /**
     * Add user to group.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param {String} groupId Database ID of group to add user to
     * @param {String} userId Database ID of user to add to group
     */
    var addUser = function(groupId, userId) {
        check(groupId, String);
        check(userId, String);
        if(Meteor.user().profile.adminGroups.indexOf(groupId) === -1) {
            throw new Meteor.Error("Current user is not admin of this group.");
        } else if (Groups.findOne({_id: groupId, "users.userId": userId})) {
            throw new Meteor.Error("User is already part of group.");
        } else {
            // Add user to group's list of users
            Groups.update(
                groupId,
                { $push: { users: {userId: userId, points: 0} } }
            );

            // Add group to user's list of groups
            Meteor.users.update(
                userId,
                { $push: { "profile.groups": groupId } }
            );

            // Remove user from group's list of join requests
            if (Groups.findOne(groupId).usersRequesting.indexOf(userId) !== -1) {
                                console.log("sample");
                                Groups.update(
                    groupId,
                    { $pull: { usersRequesting: userId } }
                );
            }
        }
    };

    /**
     * Revoke admin privileges from user in a group.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param  {String} groupId Database ID of group to revoke admin user from
     * @param  {String} userId Database ID of user to revoke admin privileges from
     */
    var removeAdmin = function(groupId, userId) {
        check(groupId, String);
        check(userId, String);

        if (Groups.findOne(groupId).admins.indexOf(userId) !== -1) {

            // Remove user from group
            Groups.update(
                groupId,
                { $pull: { admins: userId } }
            );

            // Remove group from user
            Meteor.users.update(
                userId,
                { $pull: { "profile.adminGroups": groupId } }
            );
        }
    };

    /**
     * Remove user from group.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param {String} groupId Database Id of group to remove users from
     * @param {String} userId  Database ID of user to be removed
     */
    var removeUser = function(groupId, userId) {
        check(groupId, String);
        check(userId, String);

        if (Groups.findOne({_id: groupId, "users.userId": userId})) {

            // Remove user from group
            Groups.update(
                groupId,
                { $pull: { users: {userId: userId} } }
            );

            // Remove group from user
            Meteor.users.update(
                userId,
                { $pull: { "profile.groups": groupId } }
            );

            removeAdmin(groupId, userId);
        }
    };

    /**
     * Returns users from a group within a certain range.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param  {String}   groupId Database ID of group to get users from
     * @param  {Number}   start Index of first user to return
     * @param  {Number}   end Index of last user to return
     * @return {String[]} Users in group from start to end indices
     */
    var getUsers = function(groupId, start, end) {
        check(groupId, String);
        check(start, Number);
        check(end, Number);

        return Groups.findOne(groupId).users.slice(start, end);
    };

    /**
     * Add user as admin to group.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param {String} groupId Database ID of group to add admin to
     * @param {String} userId Database ID of user to add as admin
     */
    var addAdmin = function(groupId, userId) {
        check(groupId, String);
        check(userId, String);

        // Make sure user is part of group
        Meteor.call("addUser", groupId, userId);

        if (Groups.findOne(groupId).admins.indexOf(userId) !== -1) {
            throw new Meteor.Error("User is already admin of group.");
        } else {
            Groups.update(
                groupId,
                { $push: { admins: userId } }
            );

            Meteor.users.update(
                userId,
                { $push: { "profile.adminGroups": groupId } }
            );
        }
    };

    /**
     * Returns a range of admin users within a group.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param  {String} groupId Database ID of group to return admin users from
     * @param  {Number} start Index of first admin user to return
     * @param  {Number} end Index of last admin user to return
     * @return {String[]} Admin users from start to end indices
     */
    var getAdmins = function(groupId, start, end) {
        check(groupId, String);

        return Groups.findOne(groupId).admins.slice(start, end);
    };

    /**
     * Add child subgroup to parent group.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param {String} parentGroupId Database ID of parent group
     * @param {String} childGroupId    Database ID of child group
     */
    var addSubgroup = function(parentGroupId, childGroupId) {
        check(parentGroupId, String);
        check(childGroupId, String);

        Groups.update(
            parentGroupId,
            { $push: { subgroups: {groupId: childGroupId, points: 0} } }
        );
    };

    /**
     * Remove child subgroup from parent group.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param {String} parentGroupId Database ID of parent group
     * @param {String} childGroupId    Database ID of child group
     */
    var removeSubgroup = function(parentGroupId, childGroupId) {
        check(parentGroupId, String);
        check(childGroupId, String);

        Groups.update(
            parentGroupId,
            { $pull: { subgroups: {groupId: childGroupId} } }
        );
    };

    /**
     * Returns a range of subgroups within a group.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param  {String} groupId Database ID of group to return subgroups from
     * @param  {Number} start Index of first subgroup to return
     * @param  {Number} end Index of last subgroup to return
     * @return {String[]} Subgroups from start to end indices
     */
    var getSubgroups = function(groupId, start, end) {
        check(groupId, String);
        check(start, Number);
        check(end, Number);
        return Groups.findOne(groupId).subgroups.slice(start, end);
    };

    /**
     * Add group as a subgroup to a parent group.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param {String} groupId Database ID of subgroup
     * @param {String} parentId Database ID of parent group
     */
    var addParent = function(groupId, parentId) {
        check(groupId, String);
        check(parentId, String);

        Groups.update(
            groupId,
            { $push: { parentGroups: parentId } }
        );
    };

    /**
     * Creates a new group level competition and invites other groups.
     *
     * @memberof module:methods/group~GroupsAPI
     * @return {String} Database ID of the created competition.
     */
    var initiateChallenge = function() {
    };

    /**
     * Add action to group.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param {String} groupId Database ID of group to add action to
     * @param {String} actionId Database ID of action to be added
     */
    var addActionToGroup = function(groupId, actionId){
        check(groupId, String);
        check(actionId, String);
        Groups.update(
            groupId,
            { $push: { actions: actionId } }
        );

    };

    /**
     * Remove action from group.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param {String} groupId Database ID of group to remove action from
     * @param {String} actionId Database ID of action to be removed
     */
    var removeActionFromGroup = function(groupId, actionId){
        check(groupId, String);
        check(actionId, String);
        Groups.update(
            groupId,
            { $pull: { actions: actionId } }
        );

    };

    /**
     * Returns a range of actions within a group.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param  {String} groupId Database ID of group to return actions from
     * @param  {Number} start Index of first action to return
     * @param  {Number} end Index of last action to return
     * @return {String[]} A list of all actions from start to end
     */
    var getActions = function(groupId, start, end) {
        check(groupId, String);
        check(start, String);
        check(end, String);

        return Groups.findOne(groupId).actions.slice(start, end);
    };

    /**
     * Returns a range of competitions within a group.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param  {String} groupId Database ID of group to return competitions from
     * @param  {Number} start Index of first competition to return
     * @param  {Number} end Index of last competition to return
     * @return {String[]} Database IDs of competitions from start to end indices
     */
    var getCompetitions = function(groupId, start, end) {
        check(groupId, String);
        check(start, String);
        check(end, String);

        return Groups.findOne(groupId).competitions.slice(start, end);
    };

    /**
     * Sort users in group based on point total.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param {String} groupId Database ID of group to sort
     */
    var sortLeaderboard = function(groupId) {
        Groups.findOne(groupId).users.sort(function(a,b) {
            return b.points-a.points;
        });
    };

    /**
     * Return five actions that contribute most points to a group.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param  {String} groupId Database ID of group to retrieve actions from
     * @return {Object[]} Array of five most point contributing actions
     */
    var topFiveActions = function(groupId){
        check(groupId, String);
        var group = Groups.findOne(groupId);
        return group.actions.map(function(action){
            return Actions.findOne(action);
        });
    };

    /**
     * Change name of group.
     *
     * @memberof module:methods/group~GroupsAPI
     * @param {String} groupId Database ID of group to change name
     * @param {String} newName Name to change group name to
     */
    var updateGroupName = function(groupId, newName){
        check(groupId, String);
        check(newName, String);

        Groups.update(
            groupId,
            { $set: { name: newName } }
        );
    };

    // return the public API
    return {
        createGroup: createGroup,
        removeGroup: removeGroup,
        requestToJoinGroup: requestToJoinGroup,
        addUser: addUser,
        removeAdmin: removeAdmin,
        getUsers: getUsers,
        addAdmin: addAdmin,
        getAdmins: getAdmins,
        addSubgroup: addSubgroup,
        removeSubgroup: removeSubgroup,
        getSubgroups: getSubgroups,
        addParent: addParent,
        initiateChallenge: initiateChallenge,
        addActionToGroup: addActionToGroup,
        removeActionFromGroup: removeActionFromGroup,
        getActions: getActions,
        sortLeaderboard: sortLeaderboard,
        getCompetitions: getCompetitions,
        topFiveActions: topFiveActions,
        updateGroupName: updateGroupName,
    };
}());

Meteor.methods(GroupsAPI);
