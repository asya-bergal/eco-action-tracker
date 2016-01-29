Meteor.methods({
	/**
	 * Add a new competition to the database and to its parent group.
	 * 
	 * @param {Object} data JSON object containing data for the action to be added
	 * @return {String} Database ID of competition just added
	 */
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

	/**
	 * Remove a competition from its parent group and the database.
	 * 
	 * @param  {String} competitionId Database ID of competition to be removed
	 * @return {String} Former dataase ID of competition that was just removed
	 */
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

		Competitions.remove(competitionId);
		return competitionId;
	}
});
