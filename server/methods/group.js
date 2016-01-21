Meteor.methods({

	createGroup: function(group) {
		//Add new group to database
		check(group, Object);
		Groups.insert(group, function(err, group) {
            if (err) {
                throw new Meteor.Error("Adding new group failed.");
            }
        });
	},
	removeGroup: function(groupId) {
		//Remove group from database
		Groups.remove(groupId);
	},
	requestToJoinGroup: function(groupId, userId) {
		check(groupId, String);
		check(userId, String);

		if (!Groups.findOne({_id: groupId, "users.userId": userId})) {
			// User already in group
			throw new Meteor.Error("User already in group.");
		} else if (Groups.findOne(groupId).usersRequesting.indexOf(userId) != -1) {
			// User already made request to join
			throw new Meteor.Error("User has already requested to join group.");
		} else {
			// Add user to request list
			Groups.update(
				groupId, 
				{ $push: { usersRequesting: userId } }
			)
		}
	},
	addUser: function(groupId, userId) {
		check(groupId, String);
		check(userId, String);
		if(Meteor.user().profile.adminGroups.indexOf(groupId) == -1) {
			throw new Meteor.Error("Current user is not admin of this group.");
		} else if (!Groups.findOne({_id: groupId, "users.userId": userId})) {
			throw new Meteor.Error("User is already part of group.");
		} else {
			// Add user to group's list of users
			Groups.update(
				groupId, 
				{ $push: { users: {userId: userId, points: 0} } }
			)

			// Add group to user's list of groups
			Meteor.users.update(
				userId,
				{ $push: { "profile.groups": groupId } }
			)

			// Remove user from group's list of join requests
			if (Groups.findOne(groupId).usersRequesting.indexOf(userId) != -1) {
				Groups.update(
					groupId,
					{ $pull: { usersRequesting: { userId: userId } } }
				)
			}
		}
	},
	removeUser: function(groupId, userId) {
		check(groupId, String);
		check(userId, String);

		if (Groups.findOne({_id: groupId, "users.userId": userId})) {
			console.log("User is supposedly in the group.");

			// Remove user from group
			Groups.update(
				groupId, 
				{ $pull: { users: {userId: userId} } }
			)

			// Remove group from user
			Meteor.users.update(
				userId,
				{ $pull: { "profile.groups": groupId } }
			)
		} else {
			console.log("Something didn't work with the query.");
		}
	},
	getUsers: function(groupId, start, end) {
		check(groupId, Strnig);
		check(start, String);
		check(end, String);

		return Groups.findOne(groupId).users.slice(start, end);
	},
	addSubgroup: function(parentGroupId, childGroupId) {
		check(parentGroupId, String);
		check(childGroupId, String);

		Groups.update(
			parentGroupId, 
			{ $push: { subgroups: {groupId: childGroupId, points: 0} } }
		)
	},
	getSubgroups: function(groupId, start, end) {
		check(groupId, String);

		return Groups.findOne(groupId).subgroups.slice(start, end);
	},
	getCompetitions: function(groupId, start, end) {
		check(groupId, String);
		check(start, String);
		check(end, String);

		return Groups.findOne(groupId).competitions.slice(start, end);
	},
	addParent: function(groupId, parentId) {
		check(groupId, String);
		check(parentId, String);

		Groups.update(
			groupId, 
			{ $push: { parentGroups: parentId } }
		)
	},
	/*getAllParents: function(groupId) {
		check(groupId, String);

		Groups.findOne(groupId, { parentGroups: 1 })
	},*/
	getActions: function(groupId, start, end) {
		check(groupId, String);

		return Groups.findOne(groupId).actions.slice(start, end);
	},
	addAdmin: function(groupId, userId) {
		check(groupId, String);
		check(userId, String);

		if (Groups.findOne(groupId).admins.indexOf(userId) != -1) {
			throw new Meteor.Error("User is already admin of group.");
		} else {
			Groups.update(
				groupId, 
				{ $push: { admins: userId } }
			)

			Meteor.users.update(
				userId,
				{ $push: { "profile.adminGroups": groupId } }
			)
		}
	},
	getAdmins: function(groupId, start, end) {
		check(groupId, String);

		return Groups.findOne(groupId).admins.slice(start, end);
	},
	sortLeaderboard: function(groupId) {
		Groups.findOne(groupId).users.sort(function(a,b){return b.points-a.points})
	}
});