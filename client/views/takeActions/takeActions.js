Template.takeActions.helpers({
    'categories': function () {
        // TODO: Is there a faster way to do this?
        var allActions = Actions.find({}, {sort: {category: 1}}).fetch();
        var categories = [];

        // TODO: category cannot be empty string in schema
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
    }
});

Template.takeActions.events({
    "submit .action-form": function (event) {
        event.preventDefault();

        // TODO: This should be IDs when we get IDs working properly
        var actionId = event.target.getAttribute("id");
        console.log(actionId);
        var action = Actions.findOne({_id: actionId});

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
            }
        });
    }
});
