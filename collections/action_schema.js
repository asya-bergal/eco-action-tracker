Actions = new Mongo.Collection('actions');

var ActionSchema = new SimpleSchema({
    title: {
        type: String,
        label: "High level description of action"
    },
    category: {
        type: String,
        defaultValue: "Other",
        label: "Category to put the action in"
    },
    description: {
        type: String,
        defaultValue: "",
        label: "Information about the action"
    },
    defaultPoints: {
        type: Number,
        defaultValue: 0,
        label: "Number of points awarded when all fields are 0"
    },
    dailyCap: {
        type: Number,
        label: "Number of points a user can gain from this action each day"
    },
    group: {
        type: String,
        label: "Group where the action originated, if it's not global",
        optional: true
    },
    isGlobal: {
        type: Boolean,
        label: "Whether the action counts for global points",
        defaultValue: false
    },
    needsApproval: {
        type: Boolean,
        label: "Whether action is awaiting global approval",
        defaultValue: false
    },
    fields: {
        type: [Object],
        defaultValue: [],
        label: "Array of fields a user can fill in"
    },
    "fields.$.name": {
        type: String,
        label: "Description of field"
    },
    "fields.$.scale": {
        type: Number,
        defaultValue: 1,
        label: "How much the field weighs"
    }
});

Actions.attachSchema(ActionSchema);

ActionsIndex = new EasySearch.Index({
    collection: Actions,
    fields: ['title'],
    engine: new EasySearch.Minimongo()
});
