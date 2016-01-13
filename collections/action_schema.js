Actions = new Mongo.Collection('actions');

MULTIPLY = 0;
ADD = 1;

ActionSchema = new SimpleSchema({
    title: {
        type: String
    },
    defaultPoints: {
        type: Number,
        defaultValue: 0
    },
    isGlobal: {
        type: Boolean
    },
    fields: {
        type: [Object],
        defaultValue: []
    },
    "fields.$.name": {
        type: String
    },
    "fields.$.operation": {
        type: Number,
        defaultValue: MULTIPLY
    },
    "fields.$.scale": {
        type: Number,
        defaultValue: 1
    }
});

Actions.attachSchema(ActionSchema);
