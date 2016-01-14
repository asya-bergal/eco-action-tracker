Meteor.startup(function () {
    // Subscribe to published actions
    Meteor.subscribe("actions");
    Meteor.subscribe("groups"); // Subscribe to published groups
});
