"use strict";

var baseStructure = require('./base-structure.js');
var restructureThought = require('./restructure-thought.js');

/**
 *
 *
 *
 */
module.exports = function( thoughts, options, globals ) {

    return baseStructure({
        thoughts: thoughts.map( function( thought ) {
            return restructureThought( thought, options, globals );
        })
    }, options, globals );

};
