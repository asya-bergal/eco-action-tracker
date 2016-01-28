Template.profile.helpers({
    'approvalNeeded': function (){
        return Actions.find({needsApproval: true}).fetch().length > 0;
    },
    'getGroups' : function () {
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
            return item.userLevel;
        });
        return competitions;
    },
    'action': function(){
        var action_data = Actions.find({_id: {$in:Meteor.user().history.map(function(action){return action.id})}});
        return Meteor.user().history.map(function(action){});
    }
});

Template.profile.events({
    "submit .new-group-form": function(event){
        event.preventDefault();
        var groupJson = {
            name: event.target.groupname.value
        };


        Meteor.call('createGroup', groupJson , function(error) {
            if (error) {
                console.log(error);
            }else{
                $(".new-group-form").toggleClass('visible');
            }
        });
    },
    "click #new-group":function(event){
        $(".new-group-form").toggleClass('visible');
    }
});
