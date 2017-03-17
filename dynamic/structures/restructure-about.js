"use strict";


var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( options, globals ) {

    return baseStructure({
        page:"about",
        item: {
            cv: options.acf.cv,
            cv_introduction: options.acf.cv_introduction,
            mission_statement: options.acf.mission_statement,
            about_statement: options.acf.about,
            about_image: options.acf.about_image
        }
    }, options, globals);

};
