/** @module methods/competition */

/**
 * @namespace
 * @description Methods for manipulating competitions. Returns public API.
 */
CompetitionsAPI = (function(){
    /**
     * Add a new competition to the database and to its parent group.
     *
     * @memberof module:methods/competition~CompetitionsAPI
     * @param {Object} data JSON object containing data for action to be added
     * @return {String} Database ID of competition just added
     */
    var addCompetition = function(data) {
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
    };

    /**
     * Remove a competition from its parent group and the database.
     *
     * @memberof module:methods/competition~CompetitionsAPI
     * @param  {String} competitionId Database ID of competition to be removed
     * @return {String} Former database ID of competition that was just removed
     */
    var removeCompetition = function(competitionId) {
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
    };

    // return the public API
    return {
        'addCompetition': addCompetition,
        'removeCompetition': removeCompetition
    };
}());

Meteor.methods(CompetitionsAPI);
