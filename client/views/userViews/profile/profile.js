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
    'log': function () {
        // This is reactive! (Changes when total changes)
        console.log(this);
    }
});
