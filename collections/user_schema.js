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
    adminGroups: {
        type: [String],
        defaultValue: [],
        label: "Groups that the user is an admin of"
    },
    globalAdmin: {
        type: Boolean,
        defaultValue: false,
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
    },
    emails: {
        type: [Object],
    },
    "emails.$.address": {
        optional: true,
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        optional: true,
        type: Boolean
    },
    profile: {
        type: UserProfileSchema,
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    }

});

Meteor.users.attachSchema(UserSchema);
