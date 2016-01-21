Template.searchGroups.helpers({
  groupsIndex: () => GroupsIndex,
  addLink: () => function (c) {
      c['onChange'] = function(value) {
          window.location.href = "/group/" + value;
      };
      return c;
  }
});

Template.searchGroups.rendered = function() {
    $(".selectize-input > input").attr('placeholder','Search Groups').css('width', '100%');
}
