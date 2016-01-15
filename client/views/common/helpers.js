Template.registerHelper('increment', function (index) {
    return ++index;
});

Template.registerHelper('humanDate', function (date) {
    return moment(date).toNow();
});