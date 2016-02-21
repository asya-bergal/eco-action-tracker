/** @module views/admin */

Template.admin.helpers({
    /*
     * @return {Cursor} 5 actions currently needing admin approval
     */
    'actionRequest': function () {
        return Actions.find({'needsApproval': true});
    },
    /*
     * @return {Boolean} whether there are actions that need admin approval
     */
    'isActionRequest': function() {
        return Actions.find({'needsApproval': true}).fetch().length > 0;
    },
     /*
     * @return {Cursor} Cursor pointing to all global admins
     */
    'getAdmins': function () {
        return Meteor.users.find({'profile.globalAdmin': true});
    },
    /**
     * @return {Cursor} Cursor pointing to all global actions
     */
    'getActions': function() {
        return Actions.find({isGlobal: true});
    },
     /*
     * @return {Boolean} whether this user id is different that the logged in user
     */
    'diff': function (id) {
        return id !== Meteor.userId();
    }
});

Template.admin.events({
    'click .add-actions': function (e) {
        $('.add-action-form').toggleClass('visible');
    },
    'click .new-admin': function (e) {
        $('.add-admin-form').toggleClass('visible');
    },
    "click .approve": function (event) {
        console.log("Approving");
        event.preventDefault();
        var actionId = event.target.getAttribute("id");
        console.log(actionId);
        Meteor.call('approveAction', actionId, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                humane.log("Action approved.");
            }
        });
    },
    "click .not-approve": function (e) {
        console.log("Not approving");
        e.preventDefault();
        var actionId = e.target.getAttribute("id");
        console.log(actionId);
        Meteor.call('notApproveAction', actionId, function (err) {
            if (err) {
                console.log(err);
            } else {
                humane.log("Action not approved.");
            }
        })
    },
    'click #userDownload': function () {
        Meteor.call('getUserEmails', function (err, result) {
            if (err) {
                console.log(err);
            } else {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result));
                element.setAttribute('download', 'userEmails.txt');
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }
        });
    },
    'submit .add-admin-form': function (e) {
        e.preventDefault();
        var userId = Meteor.users.findOne({username: event.target.username.value})._id;
        Meteor.call("addGlobalAdmin", userId, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                e.target.username.value = '';
                $('.add-admin-form').toggleClass('visible');
            }
        });
    },
    'click .remove-admin': function(e) {
        e.preventDefault();
        var userId = e.target.getAttribute("id");
        console.log(userId);
        Meteor.call("removeGlobalAdmin", userId, function(err) {
            if(err) {
                console.log(err);
            }
        });
    },
    'click .make-unglobal': function(e) {
        e.preventDefault();
        var actionId = e.target.getAttribute("id");
        console.log(actionId);
        Meteor.call("makeUnglobal", actionId, function(err) {
            if(err) {
                console.log(err);
            } else {
                humane.log("Action no longer global.");
            }
        })
    },
    'click .remove-action': function(e) {
        e.preventDefault();
        var actionId = e.target.getAttribute("id");
        console.log(actionId);
        Meteor.call("removeAction", actionId, function(err) {
            if(err) {
                console.log(err);
            } else {
                humane.log("Action successfully removed.");
            }
        })
    }
});

var closeAdminActionForm = function (result) {
    $('.add-action-form').toggleClass('visible');
    Meteor.call('approveAction', result, function (err) {
        if (err) {
            console.log(err);
        }
    });
};

Template.admin.rendered = function () {
    closeActionForm = closeAdminActionForm;
};
