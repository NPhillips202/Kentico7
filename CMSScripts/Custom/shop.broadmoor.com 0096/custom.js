//--Top bar sizing || Header Bar // for Fixed navigaiton.

jQuery(function() {
	function barHeight() {
		var barHeight = jQuery('header').outerHeight();
		jQuery('section').css('marginTop',barHeight+'px');
	};
	jQuery(function() {
		barHeight();
	});
	jQuery(window).resize(function() {
		barHeight();
	}); 
  
});





   

