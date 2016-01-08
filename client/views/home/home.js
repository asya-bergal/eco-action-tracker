Template.home.helpers({
    'action' : function () {
        return Actions.find({}).fetch();
    },
    'total': function () {
        return 5;
    }
});

Template.home.events({
});
