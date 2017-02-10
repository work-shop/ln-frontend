"use strict";


var request = require('request-promise');

var generateConfig = require('./config.js');
var routes = require('./routes.js');
var listen = require('./listen.js'); //listen is responsible for actually starting the server
var Logger = require('./logging/index.js');

module.exports = function( express, app, config ) {
    return function() {

        var log = new Logger( config );

        request({ uri: config.external_api, json: true, })
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



        /**
         * TODO: Replace this with the request library. Attempt socket connections.
         */
    //     http.get( config.remote_api, parseResponse( function( err, schema ) {
    //
    //         if ( err ) { log.error( err, 'schema-get' ); process.exit( 1 ); }
    //
    //         //set up templating
    //         app.engine('html', swig.renderFile );
    //         app.set('view engine', 'html');
    //         app.set('view cache', false);
    //         app.set('views', path.join(__dirname, '..', 'templates') );
    //         swig.setDefaults({cache: false});
    //
    //         //create an instance of the WP api, localized to the specific schema of our site
    //         var wp = cms( schema, config );
    //
    //         //global configuration to be included on all routes
    //         var globals = {
    //             //global data
    //             site_title: schema.name,
    //             site_description: schema.description,
    //             site_url: schema.home,
    //             development: config.development || false,
    //             log: log
    //         };
    //
    //         //create a route where static files are served from
    //         //app.use is to install a middleware on that route
    //         app.use('/public', express.static( path.join(__dirname, '..', 'public' )));
    //
    //
    //         //start the server
    //         listen( app,  [config.name, '.sock' ].join(''), config, globals );
    //
    //     }));
    //
    };

};
