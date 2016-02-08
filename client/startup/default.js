Meteor.startup(function () {
    // Subscribe to published actions
    Meteor.subscribe("actions");
    Meteor.subscribe("groups"); // Subscribe to published groups
    Meteor.subscribe("users"); // Subscribe to published groups
    Meteor.subscribe("competitions");
});