Template.takeActions.helpers({
    // Return an array of objects, where each object contains a category field with the name of the category, and an actions field with the list of actions associated with that category
    'categories': function () {
        var allActions = [];

        if(this.actionsToUse) {
            allActions = this.actionsToUse;
        } else {
            var myGroups = Meteor.user().profile.groups;
            // Display only actions that I can take
            allActions = Actions.find({$or: [{isGlobal: true}, {group: {$in: myGroups}}]}, {sort: {category: 1}}).fetch();
        }
        // TODO: Is there a faster way to do this?
        // Get the list of all actions, and sort them by category them into categories
        var categories = [];

        // TODO: category cannot be empty string in schema
        // Sort actions into separate arrays for each category, with separate arrays in each category for global and nonglobal
        var curCategory = "";
        allActions.forEach(function (action) {
            if(action.category != curCategory) {
                curCategory = action.category;
                if(action.isGlobal) {
                    categories.push({category: curCategory, actions: {global: [action], nonglobal: []}});
                } else {
                    categories.push({category: curCategory, actions: {global: [], nonglobal: [action]}});
                }
            }
            else {
                var categoryInList = categories[categories.length - 1];
                if(action.isGlobal) {
                    categoryInList.actions.global.push(action);
                } else {
                    categoryInList.actions.nonglobal.push(action);
                }
            }
        });
        return categories;
    },
    // Return whether current action is global action
    'isGlobalAction': function() {
        return Actions.findOne(this._id).isGlobal;
    },

    'groupName': function() {
        var groupId = Actions.findOne(this._id).group;
        return Groups.findOne(groupId).name;
    }
});

Template.takeActions.events({
    // Handle taking an action
    "submit .action-form": function (event) {
        event.preventDefault();

        // TODO: This should be IDs when we get IDs working properly
        var actionId = event.target.getAttribute("id");
        console.log(actionId);
        var action = Actions.findOne({_id: actionId});

        // Get all fields to submit to form
        var fieldEntries = [];
        action.fields.forEach(function (field) {
            var entry = event.target[field.name].value;
            fieldEntries.push(parseInt(entry));
        });

        console.log(fieldEntries);
        // TODO: Better error-handling
        Meteor.call('takeAction', actionId, fieldEntries, function(error, result) {
            if (error) {
                console.log(error);
            } else {
                humane.log("You took an environmentally friendly action!");
                $('#collapseButton' + actionId).click();
            }
        });
    }
});
