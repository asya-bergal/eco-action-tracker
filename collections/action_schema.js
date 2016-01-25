/**
 * @overview Defines and attaches the action schema.
 */

Actions = new Mongo.Collection('actions');

MULTIPLY = 0;
ADD = 1;

ActionSchema = new SimpleSchema({
    title: {
        type: String,
        label: "High level description of action"
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
    "fields.$.operation": {
        type: Number,
        defaultValue: MULTIPLY,
        label: "What the field does"
    },
    "fields.$.scale": {
        type: Number,
        defaultValue: 1,
        label: "How much the field weighs"
    }
});

Actions.attachSchema(ActionSchema);
