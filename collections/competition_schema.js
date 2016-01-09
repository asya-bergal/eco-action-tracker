Competitions = new Mongo.Collection('competitions');

var CompetitionSchema = new SimpleSchema({
	users: {
		type: [Object],
		label: "List of users in the competition"
	},
	"users.$.userId": {
		type: String,
		label: "ID of user"
	},
	"users.$.points": {
		type: Number,
		label: "Points the user has",
		min: 0
	},
	
	groups: {
		type: [Object],
		label: "groups belonging to competition"
	},
	"groups.$.groupId": {
		type: String,
		label: "ID of group"
	},
	"groups.$.points": {
		type: Number,
		label: "Points the group has",
		min: 0
	},

	actions: {
		type: [String],
		label: "IDs of actions in this competition"
	},
	admins: {
		type: [String],
		label: "IDs of competition admin users"
	},
	startDate: {
		type: Date,
		label: "Start date for competition"
	},
	endDate: {
		type: Date,
		label: "End date for competition"
	}
});

Competitions.attachSchema(CompetitionSchema);
