var UserProfileSchema = new SimpleSchema({
    history: {
        type: [Object],
    },
    "history.$.actionId": {
        type: String
    },
    "history.$.timestamp": {
        type: Date
    },
    groups: {
        type: [Object]
    },
    "groups.$": {
        type: String
    },
    competitions: {
        type: [Object]
    },
    "competitions.$": {
        type: String
    },
    admin_groups: {
        type: [Object]
    },
    "admin_groups.$": {
        type: String
    },
    global_admin: {
        type: Bool
    },
    points: {
        type: Number
    }
});

var UserSchema = new SimpleSchema({
    username: {
        type: String,
        optional: true
    },
    email {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    profile: {
        type: UserProfileSchema,
        optional: true
    },
});

Meteor.users.attachSchema(UserSchema);
