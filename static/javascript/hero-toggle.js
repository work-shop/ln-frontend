"use strict";


module.exports = function($) {

	//open and close the menu
	function heroToggle(){

		if($('body').hasClass('hero-closed')){
			$('body').removeClass('hero-closed').addClass('hero-open');
		}
		else if($('body').hasClass('hero-open')){
			$('body').removeClass('hero-open').addClass('hero-closed');
		}

	}

	//set up the menu and events that interact with it 
	function initialize() {

		$( document ).ready( function() {
			$('.hero-toggle').click(function(e) {
				e.preventDefault();
				heroToggle();
			});			
		});

	}

	return {
		heroToggle: heroToggle,
		initialize: initialize
	};

};