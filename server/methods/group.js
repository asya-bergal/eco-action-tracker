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
		Groups.remove(groupId, true);
	},
	addUser: function(groupId, userId) {
		check(groupId, String);
		check(userId, String);
		if(Meteor.user().profile.adminGroups.indexOf(groupId) == -1) {
			throw new Meteor.Error("Current user is not admin of this group.");
		} else {
			Groups.update(
				groupId, 
				{ $push: { users: {userId: userId, points: 0} } }
			)

			if (Groups.findOne(groupId).usersRequesting.indexOf(userId) != -1) {
				Groups.update(
					groupId,
					{ $pull: { usersRequesting: { userId: userId } } }
				)
			}
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

		Groups.update(
			groupId, 
			{ $push: { admins: userId } }
		)
	},
	getAdmins: function(groupId, start, end) {
		check(groupId, String);

		return Groups.findOne(groupId).admins.slice(start, end);
	}
});