Meteor.methods({

	// addUser: function(compId, userId) {
	// 	check(compId, String);
	// 	check(userId, String);

	// 	Competitions.update(
	// 		{ __id: compId }, 
	// 		{ $push: { users: {userId: userId, points: 0} } }
	// 	)
	// },
	// getAllUsers: function(compId) {
	// 	check(compId, String);

	// 	Competitions.findOne({ __id: compId }, { users: 1 })
	// },
	// addGroup: function(compId, groupId) {
	// 	check(compId, String);
	// 	check(groupId, String);

	// 	Competitions.update(
	// 		{ __id: compId }, 
	// 		{ $push: { groups: {groupId: groupId, points: 0} } }
	// 	)
	// },
	// getAllGroups: function(compId) {
	// 	check(compId, String);

	// 	Competitions.findOne({ __id: compId }, { groups: 1 })
	// },
	// addActionToCompetition: function(compId, actionId) {
	// 	check(compId, String);
	// 	check(actionId, String);

	// 	Competitions.update(
	// 		{ __id: compId }, 
	// 		{ $push: { actions: actionId } }
	// 	)
	// },
	// getAllActions: function(compId) {
	// 	check(compId, String);

	// 	Competitions.findOne({ __id: compId }, { actions: 1 })
	// },
	// addAdmin: function(compId, userId) {
	// 	check(compId, String);
	// 	check(userId, String);

	// 	Competitions.update(
	// 		{ __id: compId }, 
	// 		{ $push: { admins: userId } }
	// 	)
	// },
	// getAllAdmins: function(compId) {
	// 	check(compId, String);

	// 	Competitions.findOne({ __id: compId }, { admins: 1 })
	// }
});