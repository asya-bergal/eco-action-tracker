Meteor.methods({
	addCompetition: function(data) {
        check(data, Object);
        var competitionId = Competitions.insert(data, function(err, action) {
            if (err) {
                throw new Meteor.Error("Adding new competition failed.")
            }
        });

		Groups.update(
			data.parentGroup,
			{ $push: { competitions: competitionId } }
		);

		return competitionId;
	},
	removeCompetition: function(competitionId) {
		check(competitionId, String);
        competition = Competitions.findOne({ _id: competitionId }); 
        if (!competition) {
            return null;
        }

		Groups.update(
			{ _id: competition.parentGroup },
			{ $pull: { competitions: competitionId } }
		);

		return competitionId;
	}
});
