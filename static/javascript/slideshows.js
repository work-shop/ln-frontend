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

        $('.slick-passive').slick({
            fade: true,
            arrows:false,
			dots: false,
			autoplay: true,
			autoplaySpeed: 0,
			speed: 3000
		});

        $('.slick-presentation').slick({
            fade: true,
            arrows:true,
			dots: false,
			autoplay: false,
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
