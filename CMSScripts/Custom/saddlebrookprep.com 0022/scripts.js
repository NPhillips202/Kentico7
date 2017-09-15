// JavaScript Document
function setup(){
	jQuery(document).ready(function() {
		// initialize image cycle for slideshow
		jQuery('.slideshow').cycle({
			fx: 'fade',
            before: function() {
                var caption = jQuery(this).closest('.newscolumn').find('.caption');
                if(this.alt) {
                    caption.removeClass('hide').html(this.alt);
                } else {
                    caption.addClass('hide');
                }
            },
            next: jQuery(this).find('.navnext'), 
            prev: jQuery(this).find('.navprev') 
		});
	});
	jQuery(function(){
		jQuery("ul#ticker01").liScroll();
	});
	externalLinks(); // open in new window
}

/** opens links in external window **/
function externalLinks() {
	if (!document.getElementsByTagName) return;
    var anchors = document.getElementsByTagName("a");
    for (var i = 0; i < anchors.length; i++) {
    	var anchor = anchors[i];
		if (anchor.getAttribute("href") && anchor.getAttribute("rel") == "external")
		anchor.target = "_blank";
	}
}


// add first and last classes
var navs = jQuery('.navbar ul'),
	first_lis = navs.find('> li:first').addClass('first'),
	last_lis = navs.find('> li:last').addClass('last');


