"use strict";


var request = require('requestretry');

var generateConfig = require('./config.js');
var routes = require('./routes.js');
var listen = require('./listen.js'); //listen is responsible for actually starting the server
var Logger = require('./logging/index.js');

module.exports = function( express, app, config ) {

    require('dnscache')({
        "enable": true,
        "ttl": 300,
        "cachesize": 1000
    });

    return function() {

        var log = new Logger( config );

        request({
                uri: config.external_api,
                json: true,
                maxAttempts: 5,
                retryDelay: 1000,
                retryStrategy: request.RetryStrategies.HTTPOrNetworkError,
                fullResponse: false
            })
            /**
             * The initial API request should result in the set of available namespaces
             * Installed on WordPress' rest endpoint. We request this schema to instantiate
             * the `wp-api` library.
             *
             * @param schema JSON
             */
            .then( function( schema ) {

                var globals = generateConfig( express, app, config, schema, log );

                routes( express, app, config, globals );

                listen( app, config, globals );

            })
            /**
             * If the initial API Request fails, there's not much we can do to recover,
             * beyond backing off, and retrying. In this case, it's better for us
             * to fail noisily, and wait for the administrator to relaunch the
             * application server later.
             *
             * @param error Error
             */
            .catch( function( error ) {

                log.error( error, 'initial-api-schema-request' );
                process.exit( 1 );

            });

    };

};
