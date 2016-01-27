Template.searchGroups.helpers({
  groupsIndex: function() {
      return GroupsIndex;
  },
  addLink: function() {
      return function (c) {
          c['onChange'] = function(value) {
              window.location.href = "/group/" + value;
          };
          return c;
      };
  }
});

Template.searchGroups.rendered = function() {
    $(".selectize-input > input").attr('placeholder','Search Groups').css('width', '100%');
};

Template.searchActions.helpers({
  actionsIndex: function() {
      return ActionsIndex
  },
  addLink: function () {
      return function (c) {
          c['onChange'] = function(value) {
              window.location.href = "/action/" + value;
          };
          return c;
      };
  }
});

// Template.searchActions.rendered = function() {
//     $(".selectize-input > input").attr('placeholder','Search Actions').css('width', '100%');
// }