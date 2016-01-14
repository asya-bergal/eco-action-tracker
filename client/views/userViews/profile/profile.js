Template.profile.helpers({
    'actions': function () {
        // TODO: Should also be group actions
        return Actions.find({});
    },
    'groups' : function () {
        // Get a cursor pointing to all the actions and fetch them all
        return Groups.find({_id: {$in: this.groups}}).fetch();
    },
    'competitions' : function () {
        // Get a cursor pointing to all the actions and fetch them all
        var groups = Groups.find({_id: {$in: this.groups}}).fetch();
        return groups.map(function(item){return item.competitions}).filter(function(item){return item.userLevel});
    },
    'log': function () {
        // This is reactive! (Changes when total changes)
        console.log(this);
    }
});

Template.profile.events({
    "submit .action-form": function (event) {
        event.preventDefault();

        // TODO: This should be IDs when we get IDs working properly
        var actionId = event.target.getAttribute("id");
        console.log(actionId);
        var action = Actions.findOne({_id: actionId});

        var fieldEntries = [];
        action.fields.forEach(function (field) {
            var entry = event.target[field.name].value;
            fieldEntries.push(parseInt(entry));
        });

        console.log(fieldEntries);
        // TODO: Better error-handling
        Meteor.call('takeAction', actionId, fieldEntries, function(error, result) {
            if (error) {
                console.log(error);
            }
        });
    }
});
