Groups = new Mongo.Collection('groups');

var GroupSchema = new SimpleSchema({
	users: {
		type: [Object],
		label: "List of users in the group"
	},
	"users.$.userId": {
		type: String
		label: "ID of user"
	},
	"users.$.points": {
		type: Number
		label: "Points the user has"
		min: 0
	},
	
	subgroups: {
		type: [Object],
		label: "Subgroups belonging to group"
	}
	"subgroups.$.groupId": {
		type: String
		label: "ID of group"
	},
	"subgroups.$.points": {
		type: Number
		label: "Points the group has"
		min: 0
	},

	competitions: {
		type: [String]
		label: "ID of competitions"
	},
	parentGroups: {
		type: [String]
		label: "ID of parent groups"
	},
	actions: {
		type: [String]
		label: "ID of actions in this group"
	},
	points: {
		type: Number
		label: "running total of group points"
	},
	admins: {
		type: [String]
		label: "IDs of group admin users"
	}
});

Groups.attachSchema(GroupSchema);