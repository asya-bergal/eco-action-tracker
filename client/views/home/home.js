Template.home.helpers({
    'action' : function () {
        return [
            { 'text' : 'Uses trusted packages', 'points' : 3},
            { 'text' : 'Has a console tool', 'points': 1},
            { 'text' : 'Embraces HTML5', 'points': 2 }
        ];
    },
    'total': function () {
        return 5;
    }
});

Template.home.events({
});
