jQuery( document ).ready(function() {
  
  // add class the ul menu  
  jQuery('header nav #menuElem').addClass('main-nav enumenu_ul menu');
// add calls to accomodations flot left and right  
  jQuery(".accommodations_area .rooms:even").addClass("accommodations_row");
  jQuery(".accommodations_area .rooms:odd").addClass("accommodations_row_2");
  
  
 //  Sitemap STARTS 
   //-- Site Map
	jQuery(function() {
		jQuery('*').click(function(e) {
			var target = jQuery(e.target);
			if (target.hasClass('sitemap-toggle')) {
				e.preventDefault();
				e.stopPropagation();
				if (jQuery('.sitemap-float').is(':visible')) {
					jQuery(".sitemap-float").fadeOut(500);
				} else {
					jQuery(".sitemap-float").fadeIn(500);
				};
			} else {
				if (jQuery('.sitemap-float').is(':visible') && !target.hasClass('sitemap-float') && !jQuery('.sitemap-float').has(target).length > 0) {
					if (!target.hasClass('.sitemap-float')) {
						jQuery('.sitemap-float').fadeOut(500);
					};
				};
			};
		});
	});
  
//-- Site Map Position
  jQuery('footer #menuElem').append('<li><a href="#" class="sitemap-toggle">Sitemap</a></li>');
//  Sitemap ENDS 
  
  
 //RFP Input datepicker
      jQuery(".datepicker").datepicker({}); 
  
  
  
  //--Top bar sizing || Header Bar // for Fixed navigaiton.

jQuery(function() {
	function barHeight() {
		var barHeight = jQuery('header').outerHeight();
		jQuery('.bannerimage2').css('marginTop',barHeight+'px');
	};
	jQuery(function() {
		barHeight();
	});
	jQuery(window).resize(function() {
		barHeight();
	});
});
  
}); //End Of Documenent ready