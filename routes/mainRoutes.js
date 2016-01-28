// Home Route
Router.route('/', {
  name: 'home',
  action: function () {
    // console.log(Meteor.user())
    if(!Meteor.user()){
      this.render('home');
      SEO.set({ title: 'Home - ' + Meteor.App.NAME });
    } else {
      this.redirect("/user/profile");
    }
  }
});