"use strict";

var archive = require('./generic/archive.js');
var restructureThoughts = require('../structures/restructure-thoughts.js');
/**
 *
 *
 *
 *
 *
 */
module.exports = archive({
    type: "thoughts",
    template: "thoughts.html",
    restructure: restructureThoughts
});
