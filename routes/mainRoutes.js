// Home Route
Router.route('/', {
  name: 'home',
  action: function () {
    console.log(Meteor.user())
    if(!Meteor.user()){
      this.render('home');
      SEO.set({ title: 'Home - ' + Meteor.App.NAME });
    } else {
      this.redirect("/user/profile");
    }
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
