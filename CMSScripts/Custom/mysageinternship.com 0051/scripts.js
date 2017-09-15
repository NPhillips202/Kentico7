jQuery(document).ready(function() {
    // Scroll to fixed header
    jQuery('.btm-header').scrollToFixed();

    // quick adjustment
    //jQuery('#menuBlock').find('#menuElem').addClass('menu cf');
  
    // mobile menu
    //jQuery('.menu-block').responsiveMenu({'mobileResulution':'786'});
    /*jQuery('input, textarea').placeholder();*/
    // init mobile menu, ref: http://mmenu.frebsite.nl/documentation/options
    jQuery('#menuBlockInner').mmenu({
        extensions: [
            "sage", 
            "border-full",
            "effect-slide-menu",
            "pageshadow"
        ],
        //dividers: {
        //    fixed: true
        //},
        labels: true,
        offCanvas: {
            position: "right",
        },
        navbar: {
            "title": "Main Navigation"
        },
        navbars: [
            {
                "position": "bottom",
                "content": [						
                    jQuery('.btm-header .social-icons').clone().wrapInner('<div class="social-icons" />').html(),
                    /*"<a class='fa fa-envelope' href='#/'></a>",
                    "<a class='fa fa-twitter' href='#/'></a>",
                    "<a class='fa fa-facebook' href='#/'></a>"*/
                ],
                //height: 3
            }
        ],
    }, {
        // configuration
        clone: true,
        /*classNames: {
            fixedElements: {
               fixed: "btm-header"
            }
        },*/
    });
    //jQuery.mmenu.configuration.classNames.fixedElements = {
    //     fixed: "btm-header"
    //};
          
    // minor adjustment
    if(detectIE() !== false){
        jQuery('a[href="#menuBlockInner"], #mm-blocker').click(function () {
            var detachElem = jQuery('.btm-header');
            if(detachElem.is('.detached')) {
                detachElem.scrollToFixed({dontSetWidth:false});
                jQuery(window).resize();
                detachElem.removeClass('detached');
                detachElem.next().css('width','100%');
            } else {
                detachElem.trigger('detach.ScrollToFixed');
                //detachElem.trigger('resize.ScrollToFixed');
                //jQuery(window).resize();
                detachElem.addClass('detached');
            }
        });
    }
          
    // add class for menu items with submenu items
    jQuery('#menuBlockInner > ul > li > ul').closest('li').addClass('hasSubMenu');
    
    // apply some adjustments for Kentico server
    jQuery('#ui-datepicker-div').closest('div').removeClass('mm-page mm-slideout');
    jQuery('#form').addClass('mm-page mm-slideout');

    // Anchor links
    jQuery('*').not('.mm-menu').find('a:not(.menu-icon)').click(function(e) {
        var url = jQuery(this).attr('href');
        if (url.charAt(0) == "#" && url.length > 1) {
            e.preventDefault();
            var target = jQuery('*[anchor="' + url.substr(1) + '"]');
            jQuery('html, body').animate({
                scrollTop:target.offset().top - jQuery('.btm-header').height()
            }, 800);
        };
    });
          
    // sitemap   
	jQuery(".sitemap-toggle").live('click',function(e) {
		e.preventDefault();
		if (jQuery('.sitemap-float').is(':visible')) {
			jQuery(".sitemap-float").fadeOut(500);
		} else {
			jQuery(".sitemap-float").fadeIn(500);
		}
	});
          
	// http://jqueryplugin.net/featurify-horizontal-news-ticker-jquery-plugin/
	//jQuery(".twitter-feed").featurify();

	//or if you want some options
	/*jQuery("#sample3").featurify({
		directionIn : -1,
		directionOut: -1,
		pause:3000,
		transition:250
	});*/
	
	// Options
	/*
	pause 	// time in milleseconds between each slide
	transition // time in milleseconds that will take the sliding effect
	directionIn // left: -1 / right: 1. Direction from where will come the next slide 
	directionOut // left: -1 / right: 1. Direction to where will go the current slide
	*/
	
	// http://naileditdesign.com/extremely-simple-twitter-feed/
	jQuery('.tweecool').tweecool({
		//settings
		username : 'mysagecareer',
		limit : 5
	});
	// apply slider
	//jQuery("#tweecool").featurify();
	
	// options
	/*
	username – Your username
	limit – Number of tweets to show (Default value: 5)
	profile_image – Show profile image (Default value: true)
	show_time – Show tweet time (Default value: true)
	show_media – Show media (Default value: false)
	show_media_size – Set media size (Default value: thumb)
	*/
});

// Instafeed
var feed = new Instafeed({
	get: 'user',
	userId: '2145080710',//'mysagecareer',
    //clientId: 'a8b8606f8c5c4d9681cb2bcfad36a732',
    accessToken: '2145080710.1677ed0.8ba35fa28dd649a8bbddca64c55e7331',
	/*filter: function(image) {
		return image.tags.indexOf('TAG_NAME') >= 0;
	},*/
    after: function() {
        var el = document.getElementById('instafeed');
        if (el.classList)
            el.classList.add('show');
        else
            el.className += ' ' + 'show';
    },
	template: '<a href="{{link}}"><img src="{{image}}" /></a>'
});
window.onload = function() {
    feed.run();
};
          
/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // IE 12 => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}