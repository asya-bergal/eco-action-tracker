Meteor.startup(function () {
    // Subscribe to published actions
    Meteor.subscribe("actions");
});
