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
		var numActions = $('#actions-list').children().length;
		var actionsDoc = document.getElementById('actions-list');
		console.log(actionsDoc);
		for(var i = 0; i < numActions; i++) {
			if (actionsDoc.getElementsByTagName("input")[0].checked) {
				var actionId = actionsDoc.getElementsByTagName("input")[0].getAttribute("name");
				actionsParsed.push(actionId);
				console.log(actionId);
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

		console.log(competitionJson);

		Meteor.call("addCompetition", this._id, competitionJson, function(err, result){
			if(err) {
				console.log(err);
			} else {
				e.target.name.value = '';
				e.target.description.value = '';
				e.target.startDate.value = '';
				e.target.endDate.value = '';
				console.log(result);
			}
		});
	}
});