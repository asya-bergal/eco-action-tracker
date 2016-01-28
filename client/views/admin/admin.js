Template.admin.helpers({
    'actionRequest': function () {
        return Actions.find({'needsApproval': true}, {'limit': 5});
    },
    'getAdmins': function () {
        return Meteor.users.find({'profile.globalAdmin': true});
    },
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