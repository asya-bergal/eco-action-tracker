// Set the session variable just for this session
Session.set('total', 0);

Template.history.helpers({
    'action' : function () {
        // Get a cursor pointing to all the actions and fetch them all
        return Actions.find({}).fetch();
    },
    'total': function () {
        // This is reactive! (Changes when total changes)
        return Session.get('total');
    }
});

Template.history.events({
    "submit form": function(e) {
        var actionId = e.target.getAttribute("id");
        var length = parseInt(e.target.getAttribute("name"));
        var fieldEntries = [];
        for (var i = 0; i < length; i++) {
            fieldEntries.push(parseInt($(e.target).find('[name="'+i+'"]').val()));
        }
        // Call the "takeAction" method with the given ID attribute
        Meteor.call("takeAction", actionId, fieldEntries, function(err, res) {
            if (err) {
                console.log(err);
                return;
            }
            // When it returns/if there is no error, reset total
            Session.set('total', Session.get('total') + res);
        });
        return false;
    }
});
