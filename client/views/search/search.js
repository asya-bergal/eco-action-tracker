Template.searchGroups.helpers({
    groupsIndex: function() {
        return GroupsIndex;
    },

    /**
     * Kludge to redirect user to group page upon clicking name in dropdown.
     * Pure HTML solution would probably require modifying selectize itself.
     *
     * @param {Object} c The selectize configuration object to modify.
     */
    addLink: function() {
        return function (c) {
            c['onChange'] = function(value) {
                if (value && value !== "") {
                    Router.go('/group/' + value);
                    var selectize = $("div.searchGroups > select")
                        .selectize()[0].selectize;
                    selectize.clear();
                    selectize.blur();
                }
            };
            c['onBlur'] = function() {
                $("div.searchGroups > select").selectize()[0]
                    .selectize.onSearchChange('');
            }
            return c;
        };
    }
});

/**
 * Kludge to change the selectize input placeholder.
 * Pure HTML solution would probably require modifying selectize itself.
 */
Template.searchGroups.rendered = function() {
    $("div.searchGroups > div.selectize-control > div.selectize-input > input")
        .attr('placeholder','Search Groups').css('width', '100%');
};

Template.searchActions.helpers({
    actionsIndex: function() {
        return ActionsIndex;
    },

    /**
     * Kludge to redirect user to action page upon clicking name in dropdown.
     * Pure HTML solution would probably require modifying selectize itself.
     *
     * @param {Object} c The selectize configuration object to modify.
     */
    addLink: function () {
        return function (c) {
            c['onChange'] = function(value) {
                if (value && value !== "") {
                    Router.go('/action/' + value);
                    var selectize = $("div.searchActions > select")
                        .selectize()[0].selectize;
                    selectize.clear();
                    selectize.blur();
                }
            };
            c['onBlur'] = function() {
                $("div.searchActions > select").selectize()[0]
                    .selectize.onSearchChange('');
            }
            return c;
        };
    }
});

/**
 * Kludge to change the selectize input placeholder.
 * Pure HTML solution would probably require modifying selectize itself.
 */
Template.searchActions.rendered = function() {
    $("div.searchActions > div.selectize-control > div.selectize-input > input")
        .attr('placeholder','Search Actions').css('width', '100%');
}
