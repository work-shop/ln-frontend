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
var error404 = require('./routes/error.js')( 404 );

module.exports = function( express, app, config, globals ) {

    /**
     * Routes
     */

    app.get('/', index( globals.wp, config, globals ) );

    app.get('/about', about( globals.wp, config, globals ));

    app.get('/thoughts', thoughts( globals.wp, config, globals ));

    app.get('/thoughts/:id', thought( globals.wp, config, globals ));

    app.get('*', error404( globals.wp, config, globals ) );

    /**
     * Redirects
     */

};
