"use strict";

var baseStructure = require('./base-structure.js');
var restructureThought = require('./restructure-thought.js');

/**
 *
 *
 *
 */
module.exports = function( thought, options, globals ) {

    return baseStructure({
        page: 'thought',
        item: restructureThought( thought, options, globals )
    }, options, globals);

};
