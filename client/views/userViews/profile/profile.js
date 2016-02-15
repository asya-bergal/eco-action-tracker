Template.profile.helpers({
    'approvalNeeded': function (){
        return Actions.find({needsApproval: true}).fetch().length > 0;
    },
    'getGroups' : function () {
        return Groups.find({_id: {$in: Meteor.user().profile.groups}});
    },
    'competitions' : function () {
        // Get a cursor pointing to all the actions and fetch them all
        return Competitions.find({ "participants.userId" : Meteor.userId() }).fetch();
    },
    'action': function(){
        var action_data = Actions.find({_id: {$in:Meteor.user().history.map(function(action){return action.id})}});
        return Meteor.user().history.map(function(action){});
    },
    'emailVerified': function() {
        return Meteor.user().emails[0].verified;
    }
});

Template.profile.events({
    // Create new group
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
    },
    "click .email-verified": function(e) {
        e.preventDefault();
        var userId = Meteor.userId();
        Meteor.call("verifyUserEmail", userId, function (err) {
            if(err) {
                console.log(err);
            }
        });
    }
});
