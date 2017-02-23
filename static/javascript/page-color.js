"use strict";

module.exports = function( $, config ) {
    return {
        setupPageColor: function() {
            var colorString = $('body').data('page-color');

            $('.background-color-page-color').css({
                backgroundColor: colorString
            });

            $('.thick-border-page-color').css({
                border: [config.border.thick, config.border.type, colorString].join(' ')
            });

            $('.thin-border-page-color, .wysiwyg img').css({
                border: [config.border.thin, config.border.type, colorString].join(' ')
            });

            $('.page-color').css({
                color: colorString
            });

            $('.border-bottom-page-color').css({
                borderBottom: [config.border.thick, config.border.type, colorString].join(' ')
            });

            $('.hover-page-color').hover(
                function() { $(this).css({ color: colorString }); },
                function() { $(this).css({ color: 'inherit' }); }
            );

        }
    };
};
