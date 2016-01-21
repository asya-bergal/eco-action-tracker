Template.profile.helpers({
    'actions': function () {
        // TODO: Should also be group actions
        return Actions.find({}).fetch().splice(0,2);
    },
    'getGroups' : function () {
        console.log(Groups.find({_id: {$in: Meteor.user().profile.groups}}).fetch());
        return Groups.find({_id: {$in: Meteor.user().profile.groups}});
    },
    'competitions' : function () {
        // Get a cursor pointing to all the actions and fetch them all
        var groups = Groups.find({_id: {$in: Meteor.user().profile.groups}}).fetch();
        var competitions = groups.map(function(item){
            return item.competitions;
        }).reduce(function(a, b) {
            return a.concat(b);
        }, []).filter(function(item){
            return item.userLevel
        });
        return competitions;
    },
    'has': function(col){
      return col.length > 0;
    },
    'action': function(){
        var action_data = Actions.find({_id: {$in:Meteor.user().history.map(function(action){return action.id})}});
        return Meteor.user().history.map(function(action){});
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
