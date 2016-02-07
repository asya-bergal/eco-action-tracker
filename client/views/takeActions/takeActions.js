Template.takeActions.helpers({
    // Return an array of objects, where each object contains a category field with the name of the category, and an actions field with the list of actions associated with that category
    'categories': function () {
        // TODO: Is there a faster way to do this?
        // Get the list of all actions, and sort them by category them into categories
        var allActions = Actions.find({}, {sort: {category: 1}}).fetch();
        var categories = [];

        // TODO: category cannot be empty string in schema
        // Sort actions into separate arrays for each category
        var curCategory = "";
        allActions.forEach(function (action) {
            if(action.category != curCategory) {
                curCategory = action.category;
                categories.push({category: curCategory, actions: [action]});
            }
            else {
                var categoryInList = categories[categories.length - 1];
                categoryInList.actions.push(action);
            }
        });
        return categories;
    },
    // Return whether current action is global action
    'isGlobalAction': function() {
        return Actions.findOne(this._id).isGlobal;
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
                humane.log("You took an action!");
                $('#collapseButton' + actionId).click();
            }
        });
    }
});
