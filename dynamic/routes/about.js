"use strict";

var util = require('util');
var base = require('./generic/base-route.js')();

var restructureAbout = require('../structures/restructure-about.js');

/**
 *
 *
 */
module.exports = function( wp, config, globals ) {

    var urlReplace = require('../utilities/resource-map.js')( config );

    return base.route(
        /**
         * Get initial set of resources we need to render the page.
         */
        [ wp.namespace( 'acf/v2' ).options().embed() ],

        /**
         * Success Case. All of the needed resources were properly resolved,
         * And the data is available for use immediately in the callback, along
         * with the request and the response.
         *
         * @param req the Express Request Object
         * @param res the Express Response Object
         * @param options JSON, the requested options data
         */
        function( req, res, options ) {

            globals.log.log( 'Successful request to about.', 'route-about:success-handler');

            res.render('about.html', urlReplace( restructureAbout( options, globals ) ) );

        },
        /**
         * Error Case. Something went wrong reconciling one or all of the
         * requested resources. The error is supplied to the callback
         * and *you* handle the problem.
         *
         * @param req the Express Request Object
         * @param res the Express Response Object
         * @param err Error the reason for failure.
         */
        function( req, res, err ) {

            globals.log.error( err, 'route-about:error-handler');

            res.render('error.html', {error_code: 500, description: err.message });

        });

};
