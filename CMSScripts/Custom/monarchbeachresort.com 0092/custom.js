jQuery( document ).ready(function() {

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
  jQuery('footer .popular-link2 #menuElem').append('<li><a href="#" class="sitemap-toggle" title="sitemap">Sitemap</a></li>');
//  Sitemap ENDS 

  
}); //End Of Documenent ready


  
//Adding classes to specific pages for tracking purpose

/*jQuery(function(){
  console.log("test");
jQuery("a[href='/orange-county-golf/']").find("img").addClass('costalLifestyle-tracking');
  console.log("find it");
});*/


jQuery(function(){
jQuery(".swiper-slide:first").addClass("costalLifestyle-tracking");
});

  