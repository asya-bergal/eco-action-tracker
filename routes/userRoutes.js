//User Routes

Router.route('/user/profile/', {
  name: 'userProfile',
  action: function () {
    if(Meteor.user()){
      this.render('profile');
    } else {
      this.redirect('/')
    }
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


