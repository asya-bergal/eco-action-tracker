Meteor.startup(function () {
    // Insert these three actions
    //Meteor.call('addAction' ...)
    Actions.insert({text: "Test action 1", points: 1});
    Actions.insert({text: "Test action 2", points: 2});
    Actions.insert({text: "Test action 3", points: 3});
});
