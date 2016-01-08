// Set the session variable just for this session
Session.set('total', 0);

Template.home.helpers({
    'action' : function () {
        // Get a cursor pointing to all the actions and fetch them all
        return Actions.find({}).fetch();
    },
    'total': function () {
        // This is reactive! (Changes when total changes)
        return Session.get('total');
    }
});

Template.home.events({
    "click .action": function(e) {
        //When something with this class is clicked, get its ID attribute
        var actionId = e.currentTarget.getAttribute("id");
        // Call the "takeAction" method with the given ID attribute
        Meteor.call("takeAction", actionId, function(err, res) {
            if (err) {
                console.log(err);
                return;
            }
            // When it returns/if there is no error, reset total
            Session.set('total', Session.get('total') + res);
        });
    }
});
