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
	'submit #new-competition': function(e) {
		e.preventDefault();
		
		var actionsParsed = [];

		var actionsList = $(event.target).find(':input[type="checkbox"]');
		for(var i = 0; i < actionsList.length; i++) {
			if (actionsList[i].checked) {
				var actionId = actionsList[i].name;
				actionsParsed.push(actionId);
			}
		}

		var participants = this.users;
		for (var i = 0; i < participants.length; i++) {
			participants[i].points = 0;
		};

		var competitionJson = {
			parentGroup: this._id,
			index: this.competitions.length,
			name: e.target.name.value,
			description: e.target.description.value,
			start: Date.parse(e.target.startDate.value),
			end: Date.parse(e.target.endDate.value),
			actions: actionsParsed,
			userLevel: true,
			participants: participants
		}

		Meteor.call("addCompetition", competitionJson, function(err, result){
			if(err) {
				console.log(err);
			} else {
				e.target.name.value = '';
				e.target.description.value = '';
				e.target.startDate.value = '';
				e.target.endDate.value = '';
                for(var i = 0; i < actionsList.length; i++) {
                    actionsList[i].checked = false;
                }
                console.log(result);
			}
		});
	}
});
