Meteor.methods({

	addCompetition: function(groupId, competition) {
		check(groupId, String);
		check(competition, Object);

		Groups.update(
			groupId, 
			{ $push: { competitions: competition } }
		);

		return competition.index;
	},
	removeCompetition: function(groupId, competitionId) {
		check(groupId, String);
		check(competitionId, Number);

		Groups.update(
			{ _id: groupId, "competitions.index": competitionId },
			{ $pull: { competitions: { index: competitionId } } }
		);

		return competitionId;
	}
});