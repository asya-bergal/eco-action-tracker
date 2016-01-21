Template.searchGroups.helpers({
  groupsIndex: () => GroupsIndex,
  addLink: () => function (c) {
      c['onChange'] = function(value) {
          window.location.href = "/group/" + value;
      };
      return c;
  }
});
