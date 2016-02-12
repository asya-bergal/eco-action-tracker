/** @module views/search */

/**
 * @namespace
 * @description Defines methods for manipulating search bar.
 */
Searchbar = (function(){
    /**
     * Custom selectize config.
     *
     * @memberof module:views/search~Searchbar
     * @param {String} title the search bar we are configuring (e.g. "Groups")
     */
    var configure = function(title) {
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
     * @memberof module:views/search~Searchbar
     * @param {String} title the search bar we are configuring (e.g. "Groups")
     */
    var setPlaceholder = function(title) {
        return function() {
            $("div.search" + title +
              " > div.selectize-control > div.selectize-input > input")
            .attr('placeholder','Search ' + title).css('width', '100%');
        };
    }

    return {
        configure: configure,
        setPlaceholder: setPlaceholder
    }
}());

Template.searchGroups.helpers({
    groupsIndex: function() {
        return GroupsIndex;
    },

    addLink: function() {
        return Searchbar.configure("Groups");
    }
});

Template.searchGroups.rendered = Searchbar.setPlaceholder("Groups");

Template.searchActions.helpers({
    actionsIndex: function() {
        return ActionsIndex;
    },

    addLink: function () {
        return Searchbar.configure("Actions");
    }
});
Template.searchActions.rendered = Searchbar.setPlaceholder("Actions");
