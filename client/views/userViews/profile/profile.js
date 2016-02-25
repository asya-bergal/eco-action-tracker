Template.profile.helpers({
    'approvalNeeded': function (){
        var myGroups = Meteor.user().profile.groups;
        // Find actions that I can take (global or in my groups) that also need approval
        var actions = Actions.find({$and: [{$or: [{isGlobal: true}, {group: {$in: myGroups}}]}, {needsApproval: true}]}).fetch();
        return actions;
    },
    'getGroups' : function () {
        return Groups.find({_id: {$in: Meteor.user().profile.groups}});
    },
    'competitions' : function () {
        // Get a cursor pointing to all the actions and fetch them all
        return Competitions.find({ "participants.userId" : Meteor.userId() }).fetch();
    },
    'action': function(){
        // var action_data = Actions.find({_id: {$in:Meteor.user().history.map(function(action){return action.id})}});
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
