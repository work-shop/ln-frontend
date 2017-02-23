"use strict";


module.exports = function( $, config ) {
    return {
        setupSectionShifts: function() {
        //    var shift = parseInt( $('[data-shift-v]').data('shift') );

            $('[data-shift-v]').each( function() {
                var shift = parseInt( $(this).data('shift-v') );

                $(this).css({
                    position: "relative",
                    top: [shift, 'em'].join('')
                });

            });

            $('[data-shift-h]').each( function() {
                var shift = parseInt( $(this).data('shift-h') );

                $(this).css({
                    position: "relative",
                    left: [shift, 'em'].join('')
                });

            });

        }
    };
};
