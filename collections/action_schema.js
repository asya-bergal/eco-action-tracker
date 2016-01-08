Actions = new Mongo.Collection('actions');

MULTIPLY = 0;
ADD = 1;

ActionSchema = new SimpleSchema({
    title: {
        type: String
    },
    defaultPoints: {
        type: Number
    },
    fields: {
        type: [Object]
    },
    "fields.$.name": {
        type: String
    },
    "fields.$.operation": {
        type: Number
    },
    "fields.$.scale": {
        type: Number
    }
});

Actions.attachSchema(ActionSchema);
