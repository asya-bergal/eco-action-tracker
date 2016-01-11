Meteor.methods({

	addCompetition: function(groupId, competition) {
		check(groupId, String);
		check(competition, Object);

		Groups.update(
			groupId, 
			{ $push: { competitions: competition } }
		)
	},
	removeCompetition: function(groupId, competitionId) {
		check(groupId, String);
		check(competitionId, String);

		Groups.update(
			groupId, 
			{ $pull: { competitions: competitionId } }
		)
	}
});