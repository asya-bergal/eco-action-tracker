Template['addCompetition'].helpers({
	actions: function(){
		return Groups.findOne(this_id).actions;
	}
});

Template['addCompetition'].events({
});
