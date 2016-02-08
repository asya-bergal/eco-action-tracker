Meteor.publish('actions', function() {
    var self = this;
    var subHandle = Actions.find({}).observeChanges({
        added: function(id, action) {
            // TODO: Is there a better way to store the user rather than recompute?
            var me = Meteor.users.findOne(self.userId, {fields: {"profile.groups": 1}});
            if(action.isGlobal || contains(me.profile.groups, action.group)) {
                self.added("actions", id, action);
            }
        },
        changed: function(id, action) {
            var me = Meteor.users.findOne(self.userId, {fields: {"profile.groups": 1}});
            if(action.isGlobal || contains(me.profile.groups, action.group)) {
                self.changed("actions", id, action);
            }
        },
        removed: function(id) {
            var me = Meteor.users.findOne(self.userId, {fields: {"profile.groups": 1}});
            if(action.isGlobal || contains(me.profile.groups, action.group)) {
                self.removed("actions", id);
            }
        }
    });

    self.ready();
    self.onStop(function () {
        subHandle.stop();
    });
});

Meteor.publish('groups', function() {
    return Groups.find({});
});

Meteor.publish('competitions', function() {
    return Competitions.find({});
});

Meteor.publish('users', function() {
    return Meteor.users.find({});
});

// Return true if arr contains element, else return False
var contains = function (arr, element) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === element) {
            return true;
        }
    }
    return false;
};
