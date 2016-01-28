// Home Route
Router.route('/group/:_id', {
    name: 'group',
    action: function () {        
        var group = Groups.findOne(this.params._id);
        this.render('Group', {
            data: function () {
                return group;
            }
        });
        SEO.set({title: group ? group.name : "loading"});
    }
});

Router.route('/group/:_id/stats', {
    name: 'groupStats',
    action: function () {
        var group = Groups.findOne(this.params._id);
        this.render('GroupStats', {
            data: function () {
                return group;
            }
        });
        SEO.set({title: group ? group.name : "loading"});
    }
});

Router.route('/group/:_id/edit', {
    name: 'editGroup',
    action: function () {
        var group = Groups.findOne(this.params._id);
        this.render('editGroup', {
            data: function () {
                return group;
            }
        });
        SEO.set({title: group ? group.name : 'loading'});
    }
});

// Temporary
Router.route('/group/:_id/comp:index', {
  name: 'competition',
  action: function () {
    var competition = Groups.findOne(this.params._id).competitions[this.params.index];
    this.render('competition', {
        data: function () {
            return competition;
        }
    });
    SEO.set({ title: 'Competition - ' + Meteor.App.NAME });
  }
});