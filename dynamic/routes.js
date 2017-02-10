"use strict";


/**
 * This micro-module installs the desired, application-specific routes on
 * the server. This is the file in which to define the route structure
 * for the application server.
 *
 */

var index = require('./routes/index.js');

module.exports = function( express, app, config, globals ) {

    app.get('/', index( globals.wp, config, globals ) );

};
