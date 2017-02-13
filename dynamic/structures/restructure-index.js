"use strict";

var restructureThought = require('./restructure-thought.js');

/**
 *
 *
 *
 */
module.exports = function( options ) {

    return {
        statement: options.site_statement,
        introduction: options.site_introduction,
        thought_groups: options.acf.thought_groups.map( restructureThoughtGroup )
    };
};


/**
 *
 *
 */
function restructureThoughtGroup( group ) {

    group.thoughts = group.thoughts.map( restructureThought );

    return group;
}
