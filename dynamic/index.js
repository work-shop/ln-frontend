"use strict";


var http = require('http'); //allow node.js to make http requests
var path = require('path'); //tools for manipulating OS path strings
var swig = require('swig'); //templating engine
var parseResponse = require('parse-json-response'); //transform stream libary

var listen = require('./listen.js'); //listen is responsible for actually starting the server
var cms = require('./cms.js'); //create an instance of the WP api for our site

var Logger = require('./logging/index.js');

module.exports = function( express, app, config ) {
    return function() {
        var log = new Logger( config );
        /**
         * TODO: Replace this with the request library. Attempt socket connections.
         */
        http.get( config.remote_api, parseResponse( function( err, schema ) {

            if ( err ) { log.error( err, 'schema-get' ); process.exit( 1 ); }

            //set up templating
            app.engine('html', swig.renderFile );
            app.set('view engine', 'html');
            app.set('view cache', false);
            app.set('views', path.join(__dirname, '..', 'templates') );
            swig.setDefaults({cache: false});

            //create an instance of the WP api, localized to the specific schema of our site
            var wp = cms( schema, config );

            //global configuration to be included on all routes
            var globals = {
                //global data
                site_title: schema.name,
                site_description: schema.description,
                site_url: schema.home,
                development: config.development || false,
                log: log
            };

            //create a route where static files are served from
            //app.use is to install a middleware on that route
            app.use('/public', express.static( path.join(__dirname, '..', 'public' )));


            //start the server
            listen( app,  [config.name, '.sock' ].join(''), config, globals );

        }));

    };

};


function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return String(n) === str && n >= 0;
}
