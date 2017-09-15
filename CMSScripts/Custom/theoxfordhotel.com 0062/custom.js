jQuery( document ).ready(function() {
  
  

// -- Position footer relative to page
  function positionFooter() {
    if ((jQuery('.sub-header-img').length > 0) && jQuery(window).width() < 768) { 
      jQuery('footer').css('position','relative');
      jQuery('#wrapper').css('padding-bottom',0);
    } else {
      jQuery('footer').css('position','fixed');
      jQuery('#wrapper').css('padding-bottom','');
    };
    
    //-- Position sub-page specials in header
    //jQuery('.spacer').height((jQuery('.sub-header-img').height()-150));
    
  };
  
  positionFooter();
  jQuery(window).resize(function() { positionFooter() });
  
// -- subnav modification
    jQuery('.subnav ul li.HighLighted').prev('.subnav ul li:after').css('content','""');
  
// --  Mobile Menu Initialization
	jQuery('.navigation nav #menuElem').slicknav({
		label: 'MENU',
		duration: 500,
		allowParentLinks: true,
		init: function() {}
	});
   // jQuery('.slicknav_nav').prepend('<li><a href="/special-offers/" role="menuitem" tabindex="0">Special Offers</a></li>');
    jQuery('.slicknav_nav').prepend('<li><a href="https://gc.synxis.com/rez.aspx?hotel=239&template=&chain=6052" role="menuitem" tabindex="0" target="_blank">Reservations</a></li>');
    jQuery('.slicknav_nav').append('<li><a href="/photo-gallery/" role="menuitem" tabindex="0">Photo Gallery</a></li>');
	jQuery('.slicknav_nav').append('<li><a href="/contact/" role="menuitem" tabindex="0">Contact Us</a></li>');
    jQuery('.slicknav_menu').prepend('<a href="tel:2159639506"><i class="fa fa-phone"></i></a>');
    jQuery('.slicknav_menu').prepend('<a href="/"><div class="mobile-logo"><img src="/getmedia/7ea156f3-082f-4378-8199-fc1e626b1bef/theoxfordhotel_logo_mobile" /></div></a>');
	//jQuery('.slicknav_menu').prepend('<a href="/"><div class="mobile-logo"><img src="/getmedia/725943ae-8342-4750-9da3-7d0dbac7bd28/OxfordHotel_Logo" /></div></a>');
    
    jQuery('.slicknav_menu').prepend('<div id="mobile"><a href="https://gc.synxis.com/rez.aspx?hotel=239&template=&chain=6052" target="_blank">BOOK NOW</a></div>');

  
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
  
  ; 
  
  
   
  
//-- Site Map Position
  jQuery('.footer-nav ul').append('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
  //jQuery('.footer-nav ul').prepend('<li><a href="/blog/">Blog</a></li>');

//--  Specials rotation cycle

  jQuery('.specials-arrows img:first-child').click(function() {
    jQuery('.cycle-slideshow').cycle('prev');
    });
  jQuery('.specials-arrows img:last-child').click(function() {
    jQuery('.cycle-slideshow').cycle('next');
    });


//--  Top bar sizing
	function barHeight() {
		var barHeight = jQuery('header').outerHeight();
		jQuery('#header-image-wrapper').css('padding',barHeight+'px 0 0 0');
	};	
	barHeight();

//-- Jquery Selectbox plugin initialization
	jQuery('.selectbox').selectBox({
		mobile:false,
		menuTransition:'fade'
	});
  
  // -- Show booking mask onclick if homepage 
//	function hideReservations() {
//		if ((jQuery(window).height() < 818) && (window.location.pathname == '/')) {
//			jQuery('.reserve-more').addClass('arrow-down');
//			jQuery('.show-reservations').click(function(e) {
//				e.preventDefault();
//				jQuery('.height-hide').slideToggle("slow");
//				jQuery('html, body').animate({
//					scrollTop: jQuery('.height-hide').offset().top
//				},	"slow");
//				jQuery('.reserve-more').toggleClass('arrow-down');
//			});
//		} else {
//			jQuery('.reserve-more').removeClass('arrow-down');
//			jQuery('.height-hide').show();
//			jQuery('.reserve-more').hide();
//		};
//	};
//	hideReservations();
//	jQuery(window).resize(function() {
//			hideReservations();
//	});
  
//-- Photoswipe
  
    var initPhotoSwipeFromDOM = function(gallerySelector) {

	// parse slide data (url, title, size ...) from DOM elements 
	// (children of gallerySelector)
	var parseThumbnailElements = function(el) {
	    var thumbElements = el.childNodes,
	        numNodes = thumbElements.length,
	        items = [],
	        figureEl,
	        childElements,
	        linkEl,
	        size,
	        item;

	    for(var i = 0; i < numNodes; i++) {


	        figureEl = thumbElements[i]; // <figure> element

	        // include only element nodes 
	        if(figureEl.nodeType !== 1) {
				continue;
	        }

			linkEl = figureEl.children[0]; // <a> element
			
	        size = linkEl.getAttribute('data-size').split('x');

	        // create slide object
	        item = {
				src: linkEl.getAttribute('href'),
				w: parseInt(size[0], 10),
				h: parseInt(size[1], 10)
	        };

	        

	        if(figureEl.children.length > 1) {
	        	// <figcaption> content
	          	item.title = figureEl.children[1].innerHTML; 
	        }
 
	        if(linkEl.children.length > 0) {
	        	// <img> thumbnail element, retrieving thumbnail url
				item.msrc = linkEl.children[0].getAttribute('src');
	        } 
	       
			item.el = figureEl; // save link to element for getThumbBoundsFn
	        items.push(item);
	    }

	    return items;
	};

	// find nearest parent element
	var closest = function closest(el, fn) {
	    return el && ( fn(el) ? el : closest(el.parentNode, fn) );
	};

	// triggers when user clicks on thumbnail
	var onThumbnailsClick = function(e) {
	    e = e || window.event;
	    e.preventDefault ? e.preventDefault() : e.returnValue = false;

	    var eTarget = e.target || e.srcElement;

	    var clickedListItem = closest(eTarget, function(el) {
	        return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
	    });

	    if(!clickedListItem) {
	        return;
	    }


	    // find index of clicked item
	    var clickedGallery = clickedListItem.parentNode,
	    	childNodes = clickedListItem.parentNode.childNodes,
	        numChildNodes = childNodes.length,
	        nodeIndex = 0,
	        index;

	    for (var i = 0; i < numChildNodes; i++) {
	        if(childNodes[i].nodeType !== 1) { 
	            continue; 
	        }

	        if(childNodes[i] === clickedListItem) {
	            index = nodeIndex;
	            break;
	        }
	        nodeIndex++;
	    }



	    if(index >= 0) {
	        openPhotoSwipe( index, clickedGallery );
	    }
	    return false;
	};

	// parse picture index and gallery index from URL (#&pid=1&gid=2)
	var photoswipeParseHash = function() {
		var hash = window.location.hash.substring(1),
	    params = {};

	    if(hash.length < 5) {
	        return params;
	    }

	    var vars = hash.split('&');
	    for (var i = 0; i < vars.length; i++) {
	        if(!vars[i]) {
	            continue;
	        }
	        var pair = vars[i].split('=');  
	        if(pair.length < 2) {
	            continue;
	        }           
	        params[pair[0]] = pair[1];
	    }

	    if(params.gid) {
	    	params.gid = parseInt(params.gid, 10);
	    }

	    if(!params.hasOwnProperty('pid')) {
	        return params;
	    }
	    params.pid = parseInt(params.pid, 10);
	    return params;
	};

	var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
	    var pswpElement = document.querySelectorAll('.pswp')[0],
	        gallery,
	        options,
	        items;

		items = parseThumbnailElements(galleryElement);

	    // define options (if needed)
	    options = {
	        index: index,

			// define gallery index (for URL)
	        galleryUID: galleryElement.getAttribute('data-pswp-uid'),

	        getThumbBoundsFn: function(index) {
	            // See Options -> getThumbBoundsFn section of docs for more info
	            var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
	                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
	                rect = thumbnail.getBoundingClientRect(); 

	            return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
	        },

	        // history & focus options are disabled on CodePen
           	// remove these lines in real life: 
		   history: false,
		   focus: false	

	    };

	    if(disableAnimation) {
	        options.showAnimationDuration = 0;
	    }

	    // Pass data to PhotoSwipe and initialize it
	    gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
	    gallery.init();
	};

	// loop through all gallery elements and bind events
	var galleryElements = document.querySelectorAll( gallerySelector );

	for(var i = 0, l = galleryElements.length; i < l; i++) {
		galleryElements[i].setAttribute('data-pswp-uid', i+1);
		galleryElements[i].onclick = onThumbnailsClick;
	}

	// Parse URL and open gallery if it contains #&pid=3&gid=1
	var hashData = photoswipeParseHash();
	if(hashData.pid > 0 && hashData.gid > 0) {
		openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );
	}
};

// execute above function
initPhotoSwipeFromDOM('.my-simple-gallery');
// get the value from the URL parameter
var getQueryParams = function( name, url ) {
    if (!url) url = location.href
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
};
jQuery(window).bind('load', function() {
    jQuery('.my-simple-gallery > figure > a').each(function(){
        var fw = getQueryParams('width', jQuery(this).find('> img').attr('src'));//jQuery(this).find('> img').width();
        var fh = getQueryParams('height', jQuery(this).find('> img').attr('src'));//jQuery(this).find('> img').height();
        jQuery(this).attr('data-size', fw + 'x' + fh);
    });
});
  
  
// Responsive Slider
 // You can also use "$(window).load(function() {"
    jQuery(function () {

      // Slideshow 1
     jQuery("#slider1").responsiveSlides({
       // maxwidth: 1600,
        speed: 1300
      });
 

    });
  
// -- Homepage Specials Rotation
  	jQuery('.bxslider').bxSlider({
      mode: 'vertical',
      slideMargin: 5,
      auto: true,
      adaptiveHeight: true,
      mode: 'fade',
      pager:false,
      auto:true,
      pause:4000,
      autoStart: true,
	});
  
// -- magnificPopup  
  jQuery(document).ready(function() {
	jQuery('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		}
		//image: {
		//	tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
		//	titleSrc: function(item) {
		//		return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
		//	}
		//}
	});
});
  
  
  //-- subpageMenu
  
    jQuery(document).ready(function () {
    jQuery('.subnav nav').meanmenu();
});
  
 // jQuery("#accordion").accordion();

 jQuery("#accordion").accordion({ header: "h3", collapsible: true, active: false });
  
  
	
}); //End Of Document ready