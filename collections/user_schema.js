var UserProfileSchema = new SimpleSchema({
    firstName: {
        type: String,
        label: "First name"
    },
    lastName: {
        type: String,
        label: "Last name"
    },
    history: {
        type: [Object],
        defaultValue: [],
        label: "All actions taken by user"
    },
    "history.$.actionId": {
        type: String
    },
    "history.$.timestamp": {
        type: Date
    },
    "history.$.points": {
        type: Number
    },
    groups: {
        type: [String],
        defaultValue: [],
        label: "Groups that the user is in"
    },
    competitions: {
        type: [String],
        defaultValue: [],
        label: "Competitions that the user is in"
    },
    adminGroups: {
        type: [String],
        defaultValue: [],
        label: "Groups that the user is an admin of"
    },
    globalAdmin: {
        type: Boolean,
        defaultValue: False,
        label: "Whether the user can change things globally"
    },
    points: {
        type: Number,
        defaultValue: 0,
        label: "Current number of points the user has"
    }
});

var UserSchema = new SimpleSchema({
    username: {
        type: String,
        optional: true
    },
    email: {
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
