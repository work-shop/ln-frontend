"use strict";

var baseStructure = require('./base-structure.js');
var restructureThought = require('./restructure-thought.js');

/**
 *
 *
 *
 */
module.exports = function( options, globals ) {

    return baseStructure({
        page: 'home',
        item: {
            statement: options.acf.site_statement,
            introduction: options.acf.site_introduction,
            image: options.acf.site_image,
            thought_groups: options.acf.thought_groups.map( restructureThoughtGroup ),
            footer_thoughts: options.acf.footer_thoughts.map( restructureFooterThought ),
            gallery: options.acf.site_gallery
        }
    }, options, globals);

    /**
     *
     *
     */
    function restructureThoughtGroup( group ) {

        group.thoughts = group.thoughts.map( function( thought ) { return restructureThought( thought, options, globals ); } );

        return group;
    }

    /**
     * Footer Thought restructuring.
     *
     *
     */
    function restructureFooterThought( thought ) {
        return restructureThought( thought, options, globals );
    }

};
