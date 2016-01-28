Template['competition'].helpers({
	'admin': function() {
		var parent = Groups.findOne(this.parentGroup);
		console.log(parent);
		return parent.admins.indexOf(Meteor.userId()) !== -1;
	},
	'actions': function() {
		return this.actions.map(function(action) {
			return Actions.findOne(action._id);
		});
	},
	'sortedParticipants': function(){
	    if(this.participants && this.userLevel){
			this.participants.sort(function(a,b){return b.points - a.points;});
		  	return this.participants.map(function(user){
		        user_doc = Meteor.users.findOne(user.userId);
		        user_doc.groupPoints = user.points;
		        return user_doc;
		    });
	    }
  	}
});

Template['competition'].events({
});
