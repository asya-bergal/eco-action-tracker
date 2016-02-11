/**
 * @overview Front-end JS for search.
 */

/** @class SearchMethods */
SearchMethods = (function(){
    var api = {};
    
    /**
     * Custom selectize config.
     *
     * @method configure
     * @inner
     * @memberof SearchMethods
     * @param {String} title the search bar we are configuring (e.g. "Groups")
     */
    api.configure = function(title) {
        return function (c) {
            // make selection redirect to the relevant page
            c['onChange'] = function(value) {
                if (value && value !== "") {
                    Router.go('/' + title.toLowerCase().slice(0, -1) + '/'
                                + value);
                    var selectize = $("div.search" + title + " > select")
                        .selectize()[0].selectize;
                    selectize.clear();
                    selectize.blur();
                }
            };
            // reset results on loss of focus
            c['onBlur'] = function() {
                $("div.search" + title + " > select").selectize()[0]
                    .selectize.onSearchChange('');
            }
            return c;
        };
    }

    /**
     * Set the selectize input placeholder.
     *
     * @method setPlaceholder
     * @inner
     * @memberof SearchMethods
     * @param {String} title the search bar we are configuring (e.g. "Groups")
     */
    api.setPlaceholder = function(title) {
        return function() {
            $("div.search" + title +
              " > div.selectize-control > div.selectize-input > input")
            .attr('placeholder','Search ' + title).css('width', '100%');
        };
    }

    return api;
}());

Template.searchGroups.helpers({
    groupsIndex: function() {
        return GroupsIndex;
    },

    addLink: function() {
        return SearchMethods.configure("Groups");
    }
});

Template.searchGroups.rendered = SearchMethods.setPlaceholder("Groups");

Template.searchActions.helpers({
    actionsIndex: function() {
        return ActionsIndex;
    },

    addLink: function () {
        return SearchMethods.configure("Actions");
    }
});
Template.searchActions.rendered = SearchMethods.setPlaceholder("Actions");
