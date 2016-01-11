// Home Route
Router.route('/group/:_id', {
  name: 'group',
  action: function () {
    this.render('group');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});


Router.route('/group/:_id/newCompetition', {
  name: 'newCompetition',
  action: function () {
    this.render('login');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});

Router.route('/group/:_id/lol', {
  name: 'lol',
  action: function () {
    this.render('register');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});
