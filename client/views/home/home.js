Template.home.helpers({
    'user' : function () {
        // Get a cursor pointing to all the actions and fetch them all
        return [
            {username: "Bo-billy", points:10, _id:1},
            {username: "Bob", points:5, _id:2},
            {username: "Billy", points:4, _id:3}
        ];
    },
    'total': function () {
        // This is reactive! (Changes when total changes)
        return Session.get('total');
    }
});

Template.home.events({
});
