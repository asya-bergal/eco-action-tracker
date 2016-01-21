Template.registerHelper('increment', function (index) {
    return index + 1;
});

Template.registerHelper('humanDate', function (date) {
    return moment(date).toNow();
});

Template.registerHelper('log', function(str){
    console.log(str);
  });
