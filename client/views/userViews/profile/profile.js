Template.profile.helpers({
    'groups' : function () {
        // Get a cursor pointing to all the actions and fetch them all
        return Groups.find({_id: {$in: this.groups}});
    },
    'competitions' : function () {
        // Get a cursor pointing to all the actions and fetch them all
        var groups = Groups.find({_id: {$in: this.groups}}).fetch();
        return groups.map(function(item){return item.competitions}).filter(function(item){return item.userLevel});
    },
    'has': function(col){
      return col.length > 0;
    },
    'action': function(){
        var action_data = Actions.find({_id: {$in:this.history.map(function(action){return action.id})}});
        return this.history.map(function(action){});
    }
});
