//User Routes

Router.route('/user/:_id', {
  name: 'userProfile',
  action: function () {
    this.render('profile', {
      data: function(){
          var user = Meteor.users.findOne(this.params._id);
          return {username: user.username, groups:user.profile.groups, points:user.profile.points, _id:this.params._id};
      }
    });
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});


Router.route('/user/:_id/history', {
  name: 'userHistory',
  action: function () {
    this.render('history', {
      data: function(){
        return Meteor.users.findOne(this.params._id);
      }
    });
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});

Router.route('/user/:_id/groups', {
  name: 'userGroups',
  action: function () {
    this.render('groups', {
      data: function(){
        return Meteor.users.findOne(this.params._id);
      }
    });
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});

Router.route('/user/takeAction', {
  name: 'takeAction',
  action: function () {
    this.render('takeAction');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});


