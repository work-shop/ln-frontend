"use strict";

//configuration
var configuration = require('../../package.json').frontend;


//get third party libraries
var $ = require('jquery');
var slick = require('slick-carousel');
var WebFont = require('webfontloader');

//assign jquery to the window, so it can be accessed in the console
window.$ = $;

WebFont.load({
    google: {
        families: ['Cabin:n4,i4,n7']
    }
});

//get utilities
// var jumpUtilities = require('./jump-utilities.js')($);
var loading = require('./loading.js')($);
var pageColor = require('./page-color.js')($, configuration);
var sectionShift = require('./section-shift.js')($, configuration);
var gridCardSize = require('./grid-card-size.js')( $, configuration );
// var menuUtilities = require('./menu-utilities.js')($);
var slideshows = require('./slideshows.js')($, slick);
// var modals = require('./modals.js')($);
// var stickyNav = require('./sticky-nav.js')($);
//
//
// //setup utilities
// jumpUtilities.setupJumpEvents('.jump', 75, 567, 50, true);
// jumpUtilities.setupJumpEvents('.spy-link', 134, 567, 50, false);


$( document ).ready( function( ) {
    pageColor.setupPageColor();
    sectionShift.setupSectionShifts();
    loading.setupLoading();
    slideshows.setupSlideshows();
    gridCardSize.setupSizing( '.thought-card .card-background-image' );
});

$( window ).on('resize', function() {
    gridCardSize.setupSizing( '.thought-card .card-background-image' );
});


// menuUtilities.setupMenus();
// modals.setupModals();
//
//
// //site
// var timeline = require('./timeline.js')($);
// timeline.setupTimeline();
// var awardsToggle = require('./awards-toggle.js')($);
// awardsToggle.setupAwardsToggle();
//
//
// //page specific
// if($('body').hasClass('page-about')){
// 	var scrollSpy = require('./scroll-spy.js')($);
// 	scrollSpy.initialize('.spy-start', '.spy-target', '.spy-link', 135);
// 	var aboutNav = require('./about-nav.js')($);
// 	aboutNav.setupAboutNav();
// }
//
//
// if($('body').hasClass('page-work')){
// 	var Isotope = require('isotope-layout');
// 	var iso = require('./iso.js')($, Isotope);
// 	iso.initialize();
// 	stickyNav.initialize('.filters', 75, 50);
// }
//
//
if($('body').hasClass('page-thought')){
	var heroToggle = require('./hero-toggle.js')($);
	heroToggle.initialize();
}
