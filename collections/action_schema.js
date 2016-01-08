Actions = new Mongo.Collection('actions');

ActionSchema = new SimpleSchema({
    title: {
        type: String
    },
    fields: {
        type: [Object]
    },
    defaultPoints: {
        type: Number
    },
    "fields.$.name": {
        type: String
    },
    "fields.$.operation": {
        type: Boolean // true for multiply, false for add
    },
    "fields.$.scale": {
        type: Number
    }
});

Actions.attachSchema(ActionSchema);
