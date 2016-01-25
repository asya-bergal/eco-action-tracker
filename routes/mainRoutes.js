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

Router.route('/search', {
  name: 'search',
  action: function () {
    this.render('searchActions');
    SEO.set({ title: 'Search - ' + Meteor.App.NAME});
  }
});

Router.route('/add-action', {
  name: 'addAction',
  action: function () {
    this.render('addAction');
    SEO.set({ title: 'Add an action - ' + Meteor.App.NAME});
  }
});

Router.route('/add-competition', {
  name: 'addCompetition',
  action: function () {
    this.render('addCompetition');
    SEO.set({ title: 'Add a competition - ' + Meteor.App.NAME});
  }
});