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
    "submit .new-group-form": function(event){
        event.preventDefault();
        var groupJson = {
            name: event.target.groupname.value
        };


        Meteor.call('createGroup', groupJson , function(error) {
            if (error) {
                console.log(error);
            }else{
                console.log("success");
                $(".new-group-form").toggleClass('visible');
            }
        });
    },
    "click .approve": function (event) {
        console.log("Approving");
        event.preventDefault();
        var actionId = event.target.getAttribute("id");
        console.log(actionId);
        Meteor.call('approveAction', actionId, function(error, result) {
            if (error) {
                console.log(error);
            }
        });
    },

    "click .not-approve": function (event) {
        console.log("Not approving");
        event.preventDefault();
        var actionId = event.target.getAttribute("id");
        console.log(actionId);
        Actions.update(actionId, {$set: 
            { isGlobal: false, needsApproval: false } 
        })
    },
    "click #new-group":function(event){
        $(".new-group-form").toggleClass('visible');
    }
});
