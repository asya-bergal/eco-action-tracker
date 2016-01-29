Template.admin.helpers({
    /*
     * @returns {cursor} 5 actions currently needing admin approval
     */
    'actionRequest': function () {
        return Actions.find({'needsApproval': true}, {'limit': 5});
    },
     /*
     * @returns {cursor} cursor pointing to all global admins
     */
   'getAdmins': function () {
        return Meteor.users.find({'profile.globalAdmin': true});
    },
     /*
     * @returns {bool} whether this user id is different that the logged in user
     */
   diff: function (id) {
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
            }
        });
    },
    "click .not-approve": function (event) {
        console.log("Not approving");
        event.preventDefault();
        var actionId = event.target.getAttribute("id");
        console.log(actionId);
        Actions.update(actionId, {$set:
                    {isGlobal: false, needsApproval: false}
        });
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