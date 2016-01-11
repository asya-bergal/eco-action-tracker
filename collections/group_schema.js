Groups = new Mongo.Collection('groups');

var GroupSchema = new SimpleSchema({
	users: {
		type: [Object],
		label: "List of users in the group"
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
	
	subgroups: {
		type: [Object],
		label: "Subgroups belonging to group"
	},
	"subgroups.$.groupId": {
		type: String,
		label: "ID of group"
	},
	"subgroups.$.points": {
		type: Number,
		label: "Points the group has",
		min: 0
	},

	competitions: {
		type: [Object],
		label: "Competitions the group owns"
	},
	"competitions.$.start": {
		type: Date
		label: "Start date for competition"
	},
	"competitions.$.end": {
		type: Date
		label: "End date for competition"
	},
	"competitions.$.actions": {
		type: [Object]
		label: "Actions in competition"
		//not sure if correct implementation
	},
	"competitions.$.userLevel": {
		type: Boolean
		label: "Whether individuals or groups compete"
		//True = individual or group?
	},
	"competitions.$.participants": {
		type: [Object]
		label: "Participants (users or groups) in competition"
	},

	//not sure if correct implemenation for sub-fields
	"competitions.$.participants.$.userId": {
		type: String
		label: "User ID for competition participants"
	},
	"competitions.$.participants.$.points": {
		type: Number
		label "Points the competition participants each have"
	},

	parentGroups: {
		type: [String],
		label: "IDs of parent groups"
	},
	actions: {
		type: [String],
		label: "IDs of actions in this group"
	},
	points: {
		type: Number,
		label: "running total of group points"
	},
	admins: {
		type: [String],
		label: "IDs of group admin users"
	},
	creationDate: {
		type: Date,
		label: "Date of creation for this group"
	}
});

Groups.attachSchema(GroupSchema);
