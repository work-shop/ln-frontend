var _ = require('underscore');

module.exports = function( $ ) {
    return {
        setupSizing: function( selector ) {

            var set = $( selector );

            if ( set.length ) {

                set.height('auto');

                var max = $( _.max( set, function( element ) { return $(element).height(); } ) ).height();

                set.height( max );

            }

        }
    };
};
