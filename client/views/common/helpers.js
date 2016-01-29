Template.registerHelper('increment', function (index) {
    return index + 1;
});

// Return a pretty human-readable version of the date
Template.registerHelper('humanDate', function (date) {
    return moment(date).fromNow();
});

Template.registerHelper('isGlobalAdmin', function(){
    return Meteor.user().profile.globalAdmin;
});
