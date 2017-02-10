"use strict";

var route = require('./base-route.js');

/**
 *
 *
 */
module.exports = function( wp, config, globals ) {
    return route(
        [ wp.namespace( 'acf/v2' ).options(), wp.thoughts() ],
        [
            function( options, thoughts, callback ) {
                globals.log.log( options, 'options-cb1');
                globals.log.log( thoughts, 'thoughts-cb1' );

                callback( null, options );

            },

            function( options, thoughts, callback ) {
                globals.log.log( options, 'options-cb2');
                globals.log.log( thoughts, 'thoughts-cb2' );

                callback( null, thoughts );
            }


        ],
        /**
         * Success Case. All of the needed resources were properly resolved,
         * And the data is available for use immediately in the callback, along
         * with the request and the response.
         *
         * @param req the Express Request Object
         * @param res the Express Response Object
         * @param options JSON, the requested options data
         * @param thoughts JSON, the requested thoughts object
         */
        function( req, res, options, thoughts ) {
            globals.log.log( options.acf.site_statement, 'route-success-handler' );
            globals.log.log( thoughts[0].slug, 'route-success-handler' );

            res.render('index.html', {});
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

            globals.log.error( err, 'route-index-error-handler');
            res.render('404.html', {error_code: 500, description: err.message });

        });
};
