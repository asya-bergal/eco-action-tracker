// Set the session variable just for this session
Session.set('total', 0);

Template.history.helpers({
    'history': function() {
        return this.profile.history.reverse();
    },
    'action' : function (actionId) {
        // Get a cursor pointing to all the actions and fetch them all
        return Actions.findOne(actionId);
    },
    'actionTitle': function(actionId) {
        return Actions.findOne(actionId).title;
    },
    'getGroups' : function () {
        return Groups.find({_id: {$in: this.profile.groups}});
    },
    'competitions' : function () {
        // Get a cursor pointing to all the actions and fetch them all
        return Competitions.find({ "participants.userId" : this._id }).fetch();
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
