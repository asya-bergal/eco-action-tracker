/** @module groupViews/group */

Template.Group.helpers({
    /**
     * @return {Boolean} whether the current user is an admin of this group
     */
    'admin': function () {
        if (this.admins) {
            console.log(this.admins);
            return this.admins.indexOf(Meteor.userId()) !== -1;
        }
    },
    /**
     * @return {Boolean} whether the current user is a global admin
     */
    'globalAdmin': function() {
        console.log("doSomething");
        return Meteor.user().profile.globalAdmin;
    },
    /**
     * Gets the users in the group
     * 
     * @return {Object} cursor to user docs sorted by points
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
     * @return {Object} cursor to competitions belonging to this group
     */
    'competitions': function () {
        if (this.competitions) {
            return Competitions.find({"parentGroup": this._id});
        }
    },
    /**
     * @return {Boolean} whether the current user is currently in the group
     */
    'notInGroup': function () {
        return $.grep(this.users, function (e) {
            return e.userId === Meteor.userId();
        }).length !== 1;
    },
    /**
     * @returns {Boolean} whether the current user has a join request pending
     */
    'requestPending': function () {
        return $.grep(this.usersRequesting, function (e) {
            return e === Meteor.userId();
        }).length === 1;
    }

});

Template.Group.events({
    'click #request': function (e) {
        Meteor.call("requestToJoinGroup", this._id);
    },
    'click .remove-group': function(e) {
        e.preventDefault();
        var really = confirm("Are you sure you want to delete this group?\
                             There's no going back!");

        if(really) {
          Meteor.call('removeGroup', this._id, function(err) {
            if (err) {
              console.log(err);
            };
          })
          window.location.href = '/user/profile/';
        }
      }
});

Template.competition.helpers({
    'humanify': function (date) {
        return date.toDateString();
    }
})
