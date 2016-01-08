Meteor.startup(function () {
    // Insert these three actions
    Actions.insert({text: "Test action 1", points: 1}, function () {
        Actions.insert({text: "Test action 2", points: 2}, function() {
            Actions.insert({text: "Test action 3", points: 3});
        });
    });
});
