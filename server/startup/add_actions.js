Meteor.startup(function () {
    // Insert these three actions
    // Meteor.call('addAction' ...)
    Actions.insert({
        title: "Test action 1",
        defaultPoints: 0,
        fields: [{name: "biked this many miles", operation: ADD, scale: 5},
                 {name: "each day for this many days", operation: MULTIPLY, scale: 1},
                 {name: "recycled this many things", operation: ADD, scale: 1}]
    });
});
