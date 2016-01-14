// Home Route
Router.route('/', {
  name: 'home',
  action: function () {
    this.render('home');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});

Router.route('/profile',  {
    name: 'profile',
    action: function () {
        this.render('profile');
        SEO.set({ title: 'Home - ' + Meteor.App.NAME });
    }
});

Router.route('/login', {
  name: 'login',
  action: function () {
    this.render('login');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});

Router.route('/register', {
  name: 'register',
  action: function () {
    this.render('register');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});
