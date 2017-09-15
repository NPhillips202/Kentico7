/*function hideAddressBar() {
	window.scrollTo(0, 1);
}*/
jQuery(function () {
	/*setTimeout(hideAddressBar, 0);*/
    jQuery("#navigation li").live('click',function(){
        var getthisindex = jQuery(this).index()
        activepageInf(getthisindex)
    });
        
    function activepageInf(active){
        jQuery("#navigation li").removeClass('active');
        jQuery("#navigation li:eq("+active+")").addClass('active');
    }
    

    //ryanve.com/lab/dimensions/
    function navigationmenu() {
        getScreenWidth = jQuery(window).width();
		if(getScreenWidth > 767){			
			jQuery("#navigation ul:hidden").show();
		}else{
			jQuery("#navigation ul:visible").hide();
			jQuery("#navigation #menu").removeClass("active").text("");  
	   }   	
    }
    //navigationmenu()
    //jQuery(window).resize(navigationmenu)
    
    // Mobile menu open/close function
    jQuery("#navigation #menu").toggle(function () {
          // Add + signs to links that have subnavs
          jQuery('#navigation > ul > li').each(function() {
              if ((jQuery(this).children('ul').length > 0) && (jQuery(this).children('.expandArrow').length < 1)) {
                  var expand = jQuery('<div class="expandArrow">+</div>');
                  jQuery(this).append(expand);
              };
          });
      
         jQuery(this).next("ul").slideDown('normal');
         jQuery(this).addClass("active").text("");
    }, function () {
         jQuery(this).next("ul").slideUp('normal');
         jQuery(this).removeClass("active").text("");
    });
  
	// Expand mobile subnavs when arrow is clicked
	jQuery('#navigation li .expandArrow').live('click', function () {
        if (jQuery(this).prev().is('ul')) {
            if (jQuery(this).prev().is(':visible')) {
                jQuery(this).prev().slideUp('fast');
                jQuery(this).html('+');
            } else {
                jQuery(this).prev().slideDown('fast');
                jQuery(this).html('&ndash;');
            }
        }
	});
});