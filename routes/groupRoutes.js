// Home Route
Router.route('/group/:_id', {
  name: 'group',
  action: function () {
    this.render('group');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});

Router.route('/group', {
  name: 'groupList',
  action: function () {
    this.render('groupList');
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

Router.route('/group/:_id/edit', {
  name: 'editGroup',
  action: function () {
    this.render('editGroup');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});
