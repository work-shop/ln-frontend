"use strict";

module.exports = function( $, config ) {
    return {
        setupPageColor: function() {
            var colorString = $('body').data('page-color');

            /**
             * Default Page Color Classes
             */

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

            $('.border-bottom-thin-page-color').css({
                borderBottom: [config.border.thin, config.border.type, colorString].join(' ')
            });

            $('.hover-page-color').hover(
                function() { $(this).css({ color: colorString }); },
                function() { $(this).css({ color: 'inherit' }); }
            );

            /**
             * Specific Element Color Classes
             * ------------------------------
             * These classes look for a contextual attribute
             * called 'data-element-color' somewhere along the
             * ancestry tree, and apply a specific action to the selected
             * element utilizing the specified color.
             */
            //  $('.hover-element-color-background-color').hover(
            //      function() {
            //          var contextColor = $(this).closest('[data-element-color]').data('element-color');
            //          $( this ).css({ backgroundColor: contextColor || colorString })
            //      },
            //      function() {
            //          $( this ).css({ backgroundColor: 'inherit' });
            //      }
            //  );

            $('[data-element-color].thought-card').hover(
                function() {
                    var card = $(this)
                    var overlay = card.find('.thought-card-overlay');

                    var color = card.data('element-color');
                    var oldColor = overlay.css('background-color');

                    card.data('element-color', oldColor);

                    $(this).find('.thought-card-overlay').css({
                        backgroundColor: color
                    });

                },
                function() {
                    var card = $(this)
                    var overlay = card.find('.thought-card-overlay');

                    var color = card.data('element-color');
                    var oldColor = overlay.css('background-color');

                    card.data('element-color', oldColor);

                    $(this).find('.thought-card-overlay').css({
                        backgroundColor: color
                    });

                }

            );


        }
    };
};
