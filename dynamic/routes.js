"use strict";


/**
 * This micro-module installs the desired, application-specific routes on
 * the server. This is the file in which to define the route structure
 * for the application server.
 *
 */

var index = require('./routes/index.js');
var about = require('./routes/about.js');
var thoughts = require('./routes/thoughts.js');
var thought = require('./routes/thought.js');

module.exports = function( express, app, config, globals ) {

    app.get('/', index( globals.wp, config, globals ) );

    app.get('/thoughts/:id', thought( globals.wp, config, globals ));

    app.get('/about', about( globals.wp, config, globals ));

};
