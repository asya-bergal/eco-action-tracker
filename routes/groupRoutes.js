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
        SEO.set({title: group.name});
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
        SEO.set({title: group.name});
    }
});

Router.route('/group', {
    name: 'groupList',
    action: function () {
        this.render('groupList');
        SEO.set({title: 'Home - ' + Meteor.App.NAME});
    }
});

Router.route('/group/:_id/newCompetition', {
    name: 'newCompetition',
    action: function () {
        this.render('newCompetition');
        SEO.set({title: 'Home - ' + Meteor.App.NAME});
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
        console.log(group);
        SEO.set({title: group ? group.name : 'loading'});
    }
});
