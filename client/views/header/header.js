$("#searchInput").popover({
    html: true,
    placement: "bottom",
    trigger: "hover",
    title: function () {
        return $(".searchInput").html();
    },
    content: function () {
        return $(".searchResults").html();
    }
});

Template.header.created = function () {
  Session.set('isActive', false);
  Session.set('showLogin', false);
};

Template.header.helpers({
  showLogin: function () {
    return Session.get('showLogin');
  },
  isActive: function () {
    return Session.get('isActive') ? 'active' : '';
  },
  title: function(){
    return Meteor.App.NAME;
  }
});

Template.header.events({
  'click .logout' : function () {
      Meteor.logout(function () {
          Router.go('home');
      });
  }
});

Template.search.helpers({
  groupsIndex: () => GroupsIndex
});