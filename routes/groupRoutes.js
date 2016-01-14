// Home Route
Router.route('/group/:_id', {
  name: 'group',
  action: function () {
    this.render('Group', {
      data: function(){
        return Groups.findOne(this.params._id);
      }
    });
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
    this.render('newCompetition');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});

Router.route('/group/:_id/edit', {
  name: 'editGroup',
  action: function () {
    this.render('editGroup',{
      data: function(){
        return Groups.findOne(this.params._id);
      }
    });
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});
