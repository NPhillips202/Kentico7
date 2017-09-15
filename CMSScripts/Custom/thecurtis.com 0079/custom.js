
jQuery(document).ready(function() {
 // alert("adding book to list");
  //jQuery("#menuElem").append("<li class=''> <a href='#' title='BOOK-A-ROOM' class='book-btn'>book-a-room</a> </li>");
 

   /* jQuery(".book-btn1").click(function(e) {
        e.preventDefault();
        jQuery(".book-room-box").slideToggle()
    });

    jQuery(".btn-bookroom").click(function(e) {
        e.preventDefault();
        jQuery(".banner-bookroom").slideToggle()
    });

    jQuery(".selectbox").selectbox({
        hide_duplicate_option: true
    });*/
  
  
});


 
  jQuery(document).ready(function() {
   //alert('hi');
  jQuery("#business").click(function() {
  //alert('button click');
    window.location.href = '/events/corporate-group-rfp/';
    return false;
});
    
    
    
    
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
  jQuery('.btm-nav  #menuElem').append('<li><a href="#" class="sitemap-toggle">Sitemap</a></li>');
//  Sitemap ENDS
    
    
    });
                      