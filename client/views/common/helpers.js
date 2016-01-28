Template.registerHelper('increment', function (index) {
    return index + 1;
});

Template.registerHelper('humanDate', function (date) {
    return moment(date).fromNow();
});

Template.registerHelper('log', function(str){
    console.log(str);
});

Template.registerHelper('isGlobalAdmin', function(){
    return Meteor.user().profile.globalAdmin;
});
