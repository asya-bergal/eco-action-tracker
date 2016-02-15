Meteor.publish('actions', function() {
    // This function uses Meteor's low-level publish code to observe changes to Actions.
    var self = this;
    // For every action, checks whether the action is global or in the user's groups,.
    // If it is, calls the self.added, self.changed, or self.removed callback as appropriate with that action on the client.
    var subHandle = Actions.find({}).observeChanges({
        changed: function(id, action) {
            var me = Meteor.users.findOne(self.userId, {fields: {"profile.groups": 1}});
            if(action.isGlobal || contains(me.profile.groups, action.group)) {
                console.log(action);
                console.log(id);
                self.changed("actions", id, action);
                console.log(id);
            }
        },
        added: function(id, action) {
            var me = Meteor.users.findOne(self.userId, {fields: {"profile.groups": 1}});
            if(action.isGlobal || contains(me.profile.groups, action.group)) {
                console.log(id);
                self.added("actions", id, action);
                console.log(id);
            }
        },
        removed: function(id) {
            var me = Meteor.users.findOne(self.userId, {fields: {"profile.groups": 1}});
            if(action.isGlobal || contains(me.profile.groups, action.group)) {
                self.removed("actions", id);
            }
        }
    });

    // Notify the client that the subscriber knows about all updates.
    self.ready();
    // Make sure to stop the changes observer when the connection to the client ends.
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
