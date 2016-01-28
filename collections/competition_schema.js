Competitions = new Mongo.Collection('competitions');

var CompetitionSchema = new SimpleSchema({
	parentGroup: {
		type: String,
		label: "ID of group that this competition belongs to",
        optional: true
	},
	name: {
		type: String,
		label: "Name of competition"
	},
	description:{
		type: String,
		label: "Description of competition"
	},
	start: {
		type: Date,
		label: "Start date for competition"
	},
	end: {
		type: Date,
		label: "End date for competition"
	},
	actions: {
		type: [String],
		label: "IDs of actions in competition",
		defaultValue: []
	},
	userLevel: {
		type: Boolean,
		label: "True if users competing, false if groups competing",
		defaultValue: true
	},
	participants: {
		type: [Object],
		label: "Participants (users or groups) in competition",
		defaultValue: []
	},
	"participants.$.userId": {
		type: String,
		label: "User ID for competition participants"
	},
	"participants.$.points": {
		type: Number,
		label: "Points the competition participants each have"
	}
});

Competitions.attachSchema(CompetitionSchema);
