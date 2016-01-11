Meteor.methods({

	createGroup: function(group) {
		//Add new group to database
	},
	removeGroup: function(group) {
		//Remove group from database
	},
	addUser: function(groupId, userId) {
		check(groupId, String);
		check(userId, String);

		//TODO: Check if current user is admin of group
		
		Groups.update(
			groupId, 
			{ $push: { users: {userId: userId, points: 0} } }
		)
	},
	getUsers: function(groupId, start, end) {
		check(groupId, String);
		check(start, String);
		check(end, String);

		//return (start-end) consecutive users by (attribute)
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

		//return (start-end) consecutive subgroups by (attribute)
	},
	/*addCompetition: function(groupId, competitionId) {
		check(groupId, String);
		check(competitionId, String);

		Groups.update(
			groupId, 
			{ $push: { competitions: competitionId } }
		)
	},*/
	getCompetitions: function(groupId, start, end) {
		check(groupId, String);
		check(start, String);
		check(end, String);

		//return (start-end) consecutive competitions by (attribute)
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
	},
	addActionToGroup: function(groupId, actionId) {
		check(groupId, String);
		check(actionId, String);

		Groups.update(
			groupId, 
			{ $push: { actions: actionId } }
		)
	},*/
	getActions: function(groupId, start, end) {
		check(groupId, String);

		//return (start-end) consecutive actions by (attribute)
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

		//return (start-end) consecutive admins by (attribute)
	}
});