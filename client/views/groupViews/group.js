Template.Group.helpers({
    /**
     * 
     * @returns {Boolean} whether the current user is an admin of this group
     */
    'admin': function () {
        if (this.admins) {
            return this.admins.indexOf(Meteor.userId()) !== -1;
        }
    },
    /**
     * Gets the users in the group
     * 
     * @returns {array} of user docs sorted by points
     */
    'getUsers': function () {
        if (this.users) {
            this.users.sort(function (a, b) {
                return b.points - a.points;
            });
            return this.users.map(function (user) {
                user_doc = Meteor.users.findOne(user.userId);
                user_doc.groupPoints = user.points;
                return user_doc;
            });
        }
    },
    /**
     * 
     * @returns {cursor} competitions belonging to this group
     */
    'competitions': function () {
        if (this.competitions) {
            return Competitions.find({"parentGroup": this._id});
        }
    },
    /**
     * 
     * @returns {Boolean} whether the current user is currently in the group
     */
    'notInGroup': function () {
        return $.grep(this.users, function (e) {
            return e.userId === Meteor.userId();
        }).length !== 1;
    },
    /**
     * 
     * @returns {Boolean} whether the current user has a request pending with the group
     */
    'requestPending': function () {
        return $.grep(this.usersRequesting, function (e) {
            return e === Meteor.userId();
        }).length === 1;
    }

});

Template.Group.events({
    'click #request': function (e) {
        Meteor.call("requestToJoinGroup", this._id, Meteor.userId());
    }
});


Template.Group.rendered = function () {
};

Template.competition.helpers({
    'humanify': function (date) {
        return date.toDateString();
    }
})
