// Clear add action form and add action to group
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

Template.editGroup.group = {
    group: this._id
}

Template.editGroup.helpers({
    /**
     * 
     * @returns {array of actions} returns the groups actions
     */
    'getActions': function () {
        if (this.actions) {
            return this.actions.map(function (actionId) {
                return Actions.findOne(actionId);
            });
        }
    },
    'group': function () {
        return this._id;
    },
    /**
     * 
     * @returns {array of users} who belong to the group
     */
    'getUsers': function () {
        if (this.users) {
            return this.users.map(function (user) {
                user_doc = Meteor.users.findOne(user.userId);
                user_doc.groupPoints = user.points;
                return user_doc;
            });
        }
    },
    /**
     * 
     * @returns {arrays of users} who are admins
     */
    'getAdmins': function () {
        if (this.admins) {
            return this.admins.map(function (user) {
                user_doc = Meteor.users.findOne(user);
                return user_doc;
            });
        }
    },
    /**
     * 
     * @returns {cursor} competitions which belong to this group
     */
    'getCompetitions': function () {
        return Competitions.find({"parentGroup": this._id});
    },
    /**
     * 
     * @returns {user[]} who requested to be a part of the group
     */
    'getUserRequests': function () {
        if (this.usersRequesting) {
            return this.usersRequesting.map(function (userId) {
                return Meteor.users.findOne(userId);
            });
        }
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
