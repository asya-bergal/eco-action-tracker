Template['addCompetition'].helpers({
	'getActions': function(){
		if(this.actions){
	      return this.actions.map(function(actionId){
	         return Actions.findOne(actionId);;
	      });
	    }
	}
});

Template['addCompetition'].events({
	'submit #derpCompetition': function(e) {
		e.preventDefault();
		console.log("here");
		
		var actionsParsed = [];
		var actionsList = $('#competitionActions').children();
		for(var i = 0; i < actionsList.length; i++) {
			var actionId = document.getElementsByTagName("input")[0].getAttribute("name");
			actionsParsed.push(actionId);
			console.log(actionId);
		}

		var competitionJson = {
			name: e.target.name.value,
			description: e.target.description.value,
			start: Date.parse(e.target.startDate.value),
			end: Date.parse(e.target.endDate.value),
			actions: actionsParsed,
			userLevel: true,
			participants: this.users
		}


		console.log(competitionJson);
		Meteor.call("addCompetition", this._id, competitionJson);
	}
});
