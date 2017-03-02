"use strict";

var extend = require('util-extend');
/**
 *
 *
 *
 */
module.exports = function( compiled, options, globals ) {

    return extend({
        options: options.acf,
        globals: globals,
        featured_image: function( item ) {
            return item;
        },
        hero_image_url: function( item ) {
            return item.hero.image.sizes.hero;
        },
        url : function( item ) {
            return item.link;
        }
    }, compiled);

};
