

jQuery(function(){
    jQuery(".meeting-content > ul).removeAttr("id","menuElem");
    jQuery('.meeting-content > ul').attr("id","menu");
});

jQuery(function(){
    jQuery("#menuElem").append("<li>Blog</li>");
  });

/*window.addEventListener('load', function() {
    // add classes to main menu on page load
    jQuery("#menuElem").addClass("main-nav enumenu_ul menu");
}, false);*/

jQuery(function(){
    /*
    jQuery("#menuElem").addClass("main-nav enumenu_ul menu desk");
    jQuery(".enumenu_container > .main-nav > a").addClass("firstLevel menubelow");
    jQuery(".menu-icon").click(function() {
        jQuery("body").addClass("menuOverlap slidemenuLeft mob menu-open");
        if (jQuery(this).hasClass("active")) {
            jQuery(this).removeClass("active")
            jQuery("body").removeClass("menu-open");
        } else {
            jQuery(this).addClass("active")
            jQuery("body").addClass("menu-open");
        }
    });
    */
});

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
  jQuery('footer .copy-right .main .right ul').append('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
//  Sitemap ENDS 

jQuery(function(){
    jQuery(window).resize();
    
    var widthnow = jQuery(window).innerWidth();
    //alert("This is the width" + widthnow");
    // jQuery(window).resize();
    if(widthnow < 1040){
        jQuery(".menu-box").click(function(){
            jQuery("#menuElem").addClass("mob");
            // alert("added");
            jQuery("#menuElem").removeClass("desk");
            // alert("remove");
            
            jQuery("#menuElem > li > a").addClass("firstLevel menubelow");
            //next add menubelow
            jQuery("menuElem + ul)").addClass("sb-menu");
            //var widthnow = jQuery(window).innerWidth();
            //console.log("This is the width" + widthnow");
            //  if(widthnow < 1040){
            //  $("#menuElem").removeClass("desk");
            // $("#menuElem").addClass("mob");
            // console.log("ROmve class");
        });
    }
});



  
  





    






