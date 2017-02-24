"use strict";

module.exports = function($, slick) {

	function createSlideshows(){

		$('.slick-default').slick({
			slidesToShow: 1,
			dots: true,
			autoplay: true,
			autoplaySpeed: 7000,
			speed: 400
		});

		$('.slick-thought').slick({
			dots: true,
			arrows: true,
			autoplay: false,
			speed: 300
		});		

		$('.slick-default').on('afterChange', function(){
			$('.slick-default').slick('slickPause');
		});
		
	}

	function setupSlideshows() {

		$( document ).ready( function() {
			createSlideshows();
		});

	}

	return {
		createSlideshows: createSlideshows,
		setupSlideshows: setupSlideshows
	};
};