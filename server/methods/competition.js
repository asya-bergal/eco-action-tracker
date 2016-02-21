/** @module methods/competition */

/**
 * @namespace
 * @description Methods for manipulating competitions. Returns public API.
 */
CompetitionsAPI = (function(){
    /**
     * Add a new competition to the database and to its parent group.
     * Handles both user-level competition and group level competition cases.
     *
     * @memberof module:methods/competition~CompetitionsAPI
     * @param {Object} data JSON object containing data for action to be added
     * @return {String} Document ID of competition just added
     */
    var addCompetition = function(data) {
        // cant validate vs CompetitionSchema because of weird Date stuff?!
        check(data, Object);

        if (Meteor.user().profile.adminGroups.indexOf(data.parentGroup) == -1) {
            throw new Meteor.Error("You don't have admin privileges!");
        }
        var competitionId = Competitions.insert(data, function(err, action) {
            if (err) {
                throw new Meteor.Error("Adding new competition failed.")
            }
        });

        if (!data.userLevel) {
            // TODO:user needs to be admin of data.parentGroup
            Groups.update(
                data.parentGroup,
                { $push: { competitions: competitionId } }
            );
        } else {
            // TODO:participants needs to be len 1 and user needs to be admin of
            // participants[0]
            Groups.update(
                data.participants[0].userId,
                { $push : { ongoingChallenges: competitionId } }
            );
            Groups.update(
                { _id : { $in : data.invitees } },
                { $push : { incomingChallenges: competitionId } }
            );
        }

        return competitionId;
    };

    /**
     * Remove a competition from its parent group and the database.
     *
     * @memberof module:methods/competition~CompetitionsAPI
     * @param  {String} competitionId Document ID of competition to be removed
     * @return {String} Former document ID of competition that was just removed
     */
    var removeCompetition = function(competitionId) {
        check(competitionId, String);

        competition = Competitions.findOne({ _id: competitionId }); 
        if (!competition) {
            return null;
        }

        if (Meteor.user().profile.adminGroups.indexOf(competition.parentGroup) == -1) {
            throw new Meteor.Error("You don't have admin privileges!");
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
