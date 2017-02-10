"use strict";

var async = require('async');

/**
 * the base route is a powerful tool for mashalling dependency networks of
 * asynchronously resolvable resources.
 */
module.exports = function( ) {

    var len = arguments.length;

    var parameters = Array
        /**
         * Transform the passed array-like set of arguments
         * into a workable Array instance for iteration.
         */
        .from( arguments )
        /**
         * Map across the arguments, transforming them into a workable set of
         * asynchronously reconcilable actions.
         *
         * @param arg Array | Callback, if Array, then process the elements as a parallel stream of requests
         * @param i integer index
         */
        .map( function( arg, i ) {
            return {
                action: determineValidType( arg, i, len ), callback: arg
            };
        });

    var actionset = parameters.filter( function( parameter ) { return parameter.action === "actions"; }),
        success = parameters.filter( function( parameter ) { return parameter.action === "success"; }),
        failure = parameters.filter( function( parameter ) { return parameter.action === "failure"; });

    if ( success.length !== 1 || failure.length !== 1 ) { throw new Error('Route Syntax Error: Somehow managed to supply more than one success or error handler.'); }

    success = success[ 0 ];
    failure = failure[ 0 ];

    /**
     * Initial conditions are defined at this point.
     * Here we go.
     */
    return function( req, res ) {

        async.waterfall(

            actionset.map( function( actions ) {

                return function( previousData, waterfallCB ) {

                    if ( typeof waterfallCB === "undefined" ) {
                        waterfallCB = previousData;
                        previousData = [];
                    }

                    async.parallel( actions.callback.map(
                        function( action ) {

                            if ( typeof action === "object" ) {
                                /**
                                 * We've encountered an action object. This means
                                 * We should treat the callback parameter as a wp query
                                 * future, and should invoke it's asynchronous task.
                                 */
                                return function( parallelCB ) {
                                    action
                                        .then( function( result ) { parallelCB( null, result ); })
                                        .catch( function( err ) { parallelCB( err ); });
                                };

                            } else if ( typeof action === "function" ) {
                                /**
                                 * We've encountered a function object. This means
                                 * we should treat the callback parameter as a genuine callback
                                 * and invoke it, passing along any previous data we've accumulated to this point.
                                 */
                                return function( parallelCB ) {

                                    action.apply( null, previousData.concat( [ parallelCB ] ) );

                                };

                            } else {

                            }

                        }),
                        function( err, result ) { waterfallCB( err, result ); }
                );

                };
            }),
            function( err, result ) {
                if ( err === null ) {

                    success.callback.apply( null, [req, res].concat( result ) );

                } else {

                    failure.callback.apply( null, [req, res].concat( [ err ] ) );

                }
            }
        );
    };
};


/**
 * This routine determines whether a valid set of
 *
 */
function determineValidType( arg, i, len ) {
    /**
     * If there were less than two arguments passed, then the contract of the base-route
     * route has been violated. Panic with an Error and crash loudly.
     */
    if ( len < 2 ) { throw new Error('Route Syntax Error: a route was instantiated with less than two handlers. Add an success or error handler to the route.'); }
    if ( Array.isArray( arg ) && i < len - 2 ) {
        /**
         * in this case, we've been passed a valid set of actions, and still have enough room
         * to fit in both of the required callbacks.
         */
         console.log( 'actions');
         return "actions";

    } else if ( typeof arg === "function" && i == len - 2 ) {
        /**
         * in this case, we've been a function callback, and it's in the
         * position we'd expect a success callback to be in.
         */
          console.log( 'succ');
         return "success";

    } else if ( typeof arg === "function" && i === len - 1 ) {
        /**
         * in this case, we've been a function callback, and it's in the
         * position we'd expect an error callback to be in. By default a single
         */
          console.log( 'fail');
         return "failure";

    } else {
        /**
         * Uh oh. We fell through into an error case. The contract of the base-route
         * route has been violated. Panic with an Error and crash loudly.
         */
         console.log( 'err');
        throw new Error('Route Syntax Error: The route is improperly structured. Ensure you\'re including all of the dependencies up front, and then specifying two route handlers.');
    }
}
