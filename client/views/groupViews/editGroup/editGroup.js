/** @module groupViews/editGroup */

/**
 * Clear add action form and add action to group.
 *
 * @method
 * @private
 * @param {String} actionId Database ID of action to add to group.
 */
var closeGroupActionForm = function (actionId) {
    $('.add-action-form').toggleClass('visible');
    var groupId = $('.group-title').attr("id");

    Meteor.call('addActionToGroup', groupId, actionId, function (err) {
        if (err) {
            console.log(err);
        } else {
            humane.log("Action added.");
        }
    });
};

Template.editGroup.helpers({
    /** @return {Object} cursor to this group's actions */
    'getActions': function () {
        if (this.actions) {
            return Actions.find( { _id : { $in: this.actions } } );
        }
    },

    /** @return {String} the id of this group */
    'group': function () {
        return this._id;
    },

    /** @return {Object} cursor to users in this group */
    'getUsers': function () {
        if (this.users) {
            var userIds = this.users.map(function (user) {
                return user.userId;
            });
            return Meteor.users.find( { _id : { $in: userIds } } );
        }
    },
    /** @return {Object} cursor to users who are admins */
    'getAdmins': function () {
        if (this.admins) {
            return Meteor.users.find( { _id : { $in: this.admins } } );
        }
    },
    /**
     * 
     * @returns {Object} cursor to competitions which belong to this group
     */
    'getCompetitions': function () {
        return Competitions.find({"parentGroup": this._id});
    },
    /**
     * 
     * @returns {Object} cursor to users who requested to be in the group
     */
    'getUserRequests': function () {
        if (this.usersRequesting) {
            return Meteor.users.find( { _id : { $in: this.usersRequesting } } );
        }
    },

    /**
     * @param {String} id userId to compare against
     * @return {Boolean} whether this is not the current user's id
     */
    diff: function (id) {
        return id !== Meteor.userId();
    }
});

Template.editGroup.events({
    'click .add-actions': function (e) {
        $('.add-action-form').toggleClass('visible');
    },
    'click .add-user': function (e) {
        $('.add-user-form').toggleClass('visible');
    },
    'click .add-admin': function (e) {
        $('.add-admin-form').toggleClass('visible');
    },
    'submit .add-user-form': function (e) {
        e.preventDefault();
        var userId = Meteor.users.findOne({username: e.target.username.value})._id;
        Meteor.call("addUser", this._id, userId, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                e.target.username.value = '';
                $('.add-user-form').toggleClass('visible');
            }
        });
    },
    'submit .add-admin-form': function (e) {
        e.preventDefault();
        var userId = Meteor.users.findOne({username: event.target.username.value})._id;
        Meteor.call("addAdmin", this._id, userId, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                e.target.username.value = '';
                $('.add-admin-form').toggleClass('visible');
            }
        });
    },
    'click .remove-user': function (e) {
        var userId = e.target.getAttribute('id');
        Meteor.call('removeUser', this._id, userId, function (err) {
            if (err) {
                console.log(err);
            }
        });
    },
    'click .remove-admin': function (e) {
        var userId = e.target.getAttribute('id');
        Meteor.call('removeAdmin', this._id, userId, function (err) {
            if (err) {
                console.log(err);
            }
        });
    },
    'click .remove-comp': function (e) {
        var compId = e.target.getAttribute('id');
        Meteor.call('removeCompetition', compId, function (err) {
            if (err) {
                console.log(err);
            }
        });
    },
    'click .remove-action': function (e) {
        var actionId = e.target.getAttribute('id');
        Meteor.call('removeActionFromGroup', this._id, actionId, function (err) {
            if (err) {
                console.log(err);
            }
        });
        if (!Actions.findOne(actionId).isGlobal) { //is not a global action
            Meteor.call('removeAction', actionId, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    },
    'click .request-user': function (e) {
        var userId = e.target.getAttribute('id');
        Meteor.call('addUser', this._id, userId, function (err) {
            if (err) {
                console.log(err);
            } else {
                humane.log("Join request submitted.");
            }
        });
    },
    'click .global': function (e) {
        var actionId = e.target.getAttribute('id');
        Meteor.call('submitForApproval', actionId, function (err) {
            if (err) {
                console.log(err);
            } else {
                humane.log("Action submitted for global approval.");
            }
        });
    },
    'click .edit-group-name': function (e) {
        $('.group-name').toggleClass('hidden');
        $('.group-name-field').toggleClass('visible');
        Meteor.call('updateGroupName', this._id, $('.group-name-field').val(), function (err) {
            if (err) {
                console.log(err);
            }
        });
    },
    'click .new-competition': function (e) {
        $('.add-competition-form').toggleClass('visible');
    },
    'click .remove-group': function (e) {
        e.preventDefault();
        var really = confirm("Are you sure you want to delete this group? There's no going back!");

        if (really) {
            Meteor.call('removeGroup', this._id, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            Router.go('/user/profile/');
        }
    }
});

Template.editGroup.rendered = function () {
    closeActionForm = closeGroupActionForm;
};
