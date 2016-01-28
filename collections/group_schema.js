Groups = new Mongo.Collection('groups');

var GroupSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name of group"
	},
	users: {
		type: [Object],
		label: "List of users in the group",
		defaultValue: []
	},
	"users.$.userId": {
		type: String,
		label: "ID of user"
	},
	"users.$.points": {
		type: Number,
		label: "Points the user has",
		min: 0,
		defaultValue: 0
	},
	usersRequesting: {
		type: [String],
		label: "List of names of users requesting to join the group",
		defaultValue: []
	},
	subgroups: {
		type: [Object],
		label: "Subgroups belonging to group",
		defaultValue: []
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
		type: [String],
		label: "Competitions the group owns",
		defaultValue: []
	},
	parentGroups: {
		type: [String],
		label: "IDs of parent groups",
		defaultValue: []
	},
	actions: {
		type: [String],
		label: "IDs of actions in this group",
		defaultValue: []
	},
	history: {
        type: [Object],
        defaultValue: [],
        label: "All group actions taken by users in group"
    },
    "history.$.actionId": {
        type: String,
        label: "ID of action taken"
    },
    "history.$.timestamp": {
        type: Date,
        label: "Time action was taken"
    },
    "history.$.user": {
        type: String,
        label: "User who did this action"
    },
    "history.$.points": {
        type: Number,
        label: "Points associated with action"
    },
    points: {
        type: Number,
        label: "running total of group points",
        defaultValue: 0
    },
    admins: {
        type: [String],
        label: "IDs of group admin users",
        defaultValue: []
    },
    creationDate: {
        type: Date,
        label: "Date of creation for this group"
    }
});

Groups.attachSchema(GroupSchema);

GroupsIndex = new EasySearch.Index({
    collection: Groups,
    fields: ['name'],
    engine: new EasySearch.Minimongo()
});
