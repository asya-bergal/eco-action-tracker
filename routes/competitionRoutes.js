Router.route('/competitions/:_id', {
  name: 'competition',
  action: function () {
    var competition = Competitions.findOne(this.params._id);
    this.render('Competition', {
      data: function () {
        return competition;
      }
    });
    SEO.set({title: competition ? competition.name : "loading"});
  }
});
