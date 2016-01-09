Meteor.methods({

	addUser: function(groupId, userId) {
		check(groupId, String);
		check(userId, String);

		Groups.update(
			{ __id: groupId }, 
			{ $push: { users: {userId: userId, points: 0} } }
		)
	},
	getAllUsers: function(groupId) {
		check(groupId, String);

		Groups.findOne({ __id: groupId }, { users: 1 })
	},
	addSubgroup: function(groupId, subgroupId) {
		check(groupId, String);
		check(subgroupId, String);

		Groups.update(
			{ __id: groupId }, 
			{ $push: { subgroups: {groupId: subgroupId, points: 0} } }
		)
	},
	getAllSubgroups: function(groupId) {
		check(groupId, String);

		Groups.findOne({ __id: groupId }, { subgroups: 1 })
	},
	addCompetition: function(groupId, competitionId) {
		check(groupId, String);
		check(competitionId, String);

		Groups.update(
			{ __id: groupId }, 
			{ $push: { competitions: competitionId } }
		)
	},
	getAllCompetitions: function(groupId) {
		check(groupId, String);

		Groups.findOne({ __id: groupId }, { competitions: 1 })
	},
	addParent: function(groupId, parentId) {
		check(groupId, String);
		check(parentId, String);

		Groups.update(
			{ __id: groupId }, 
			{ $push: { parentGroups: parentId } }
		)
	},
	getAllParents: function(groupId) {
		check(groupId, String);

		Groups.findOne({ __id: groupId }, { parentGroups: 1 })
	},
	addActionToGroup: function(groupId, actionId) {
		check(groupId, String);
		check(actionId, String);

		Groups.update(
			{ __id: groupId }, 
			{ $push: { actions: actionId } }
		)
	},
	getAllActions: function(groupId) {
		check(groupId, String);

		Groups.findOne({ __id: groupId }, { actions: 1 })
	},
	addAdmin: function(groupId, userId) {
		check(groupId, String);
		check(userId, String);

		Groups.update(
			{ __id: groupId }, 
			{ $push: { admins: userId } }
		)
	},
	getAllAdmins: function(groupId) {
		check(groupId, String);

		Groups.findOne({ __id: groupId }, { admins: 1 })
	}
});