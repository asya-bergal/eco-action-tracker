Actions = new Mongo.Collection('actions');

var Schemas = {};
Schemas.Action = new SimpleSchema({
   //_id: 
    text: {
        type: String,
        label: "Text displayed for action"
    },
    points: {
        type: Number,
        label: "Points for action",
        min: 0
    }
});

Actions.attachSchema(Schemas.Action);
