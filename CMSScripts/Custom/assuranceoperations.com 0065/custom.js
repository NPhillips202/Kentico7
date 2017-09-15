// add class the ul menu
// this need to be directly on the page unfortunatly
jQuery(document).ready(function(){
  jQuery("#menuElem").addClass("enumenu_ul menu");
  jQuery("#menuElem > li > a").addClass("firstLevel");
  jQuery("#menuElem > li a:first").addClass("menubelow");
  jQuery(".HighLighted > ul:first").addClass("sb-menu"); 
  
  
  // site map toggle
  
	jQuery(".sitemap-toggle").live('click',function(e) {
		e.preventDefault();
		if (jQuery('.sitemap-float').is(':visible')) {
			jQuery(".sitemap-float").fadeOut(500);
		} else {
			jQuery(".sitemap-float").fadeIn(500);
		}
	});
	jQuery('.sitemap-content li').each(function() {
		jQuery(this).find( "a:contains('Bali'), a:contains('Jakarta')" ).closest('li').addClass( 'sitemap-label' );
	});
  

  //disable the mouse scroll and zooming on page
   // you want to enable the pointer events only on click;
  // set the pointer events to none on doc ready
        jQuery('#map_canvas1').addClass('scrolloff'); 
        jQuery('#canvas1').on('click', function () {
          // set the pointer events true on click
            jQuery('#map_canvas1').removeClass('scrolloff'); 
        });

        // you want to disable pointer events when the mouse leave the canvas area;

       jQuery("#map_canvas1").mouseleave(function () {
          // set the pointer events to none when mouse leaves the map area
            jQuery('#map_canvas1').addClass('scrolloff');
        
        });
 
  
  
});


