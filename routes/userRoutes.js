//User Routes

Router.route('/user/:_id', {
  name: 'userProfile',
  action: function () {
    this.render('profile', {
      data: function(){
        return {username: "Bo-billy", points:10, _id:1};// Meteor.users.findOne(this.params._id);
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


