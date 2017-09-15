jQuery(function() {
  jQuery('.cycle-slideshow').css('display','block');
  jQuery('.magnific-popup').magnificPopup({ 
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade',
    gallery: {
      enabled:true,
      preload:[1,2],
      navigateByImgClick:true
    }
  });
  
   jQuery('.video').magnificPopup({
    type: 'iframe',
    iframe: { markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '<div class="mfp-title">Some caption</div>' + '</div>' },
    callbacks: {
        markupParse: function (template, values, item) {
            values.title = item.el.attr('title');
        }
    }
  });
  
//--Stick footer to bottom if it isn't touching bottom of screen
function footerHeight() {
	// Set to defaults
	//jQuery('.sub-wrapper').height('auto');
	// Vars
	//var footerHeight = jQuery('.footer').outerHeight();
	//var footerBottom = jQuery('.footer').offset();
	//	footerBottom = footerBottom.top + footerHeight;
	//var windowBottom = jQuery(document).height();
	//var difference = windowBottom - footerBottom;
	// Check if footer is touching bottom of document
	//if (difference > 0) {
	//	var contentHeight = jQuery('.sub-wrapper').height() + difference;
	//	jQuery('.sub-wrapper').height(contentHeight);
	//};
};

footerHeight();
jQuery(window).resize(function() {
	footerHeight();
});
  
//--Create mobile Menu for off-canvas display from existing menu UL
function initializeMobileMenu() {
	var mobile_menu = jQuery('<nav />').attr('id','menu');
	var ul = jQuery('<ul class="links"></ul>');
	var nav_clone = jQuery('.main-nav > ul').clone();
	
	nav_clone.find('> li').each(function() {
		ul.append(jQuery(this));
	});

	mobile_menu.append(ul);
	ul.prepend('<li><a href="/">Home</li>');
	ul.prepend('<li><a href="#">Reservations</li>');
	ul.append(jQuery('.extra-nav ul').html());
	
	if (jQuery('.sidebar .extra-nav ul').length) {
		ul.append('<li><a href="#">Special Offers</a></li>');
	};
	
	mobile_menu.prependTo('#wrapper');

	jQuery('nav#menu').mmenu({
		classes: "mm-cp",
		counters: false,
		labels: false,
		offCanvas: {
			position: "right"	
		}
	});
  
  
    jQuery('#ui-datepicker-div').parent().removeClass('mm-page mm-slideout');
    jQuery('#form').addClass('mm-page mm-slideout');
  
  
};

initializeMobileMenu();

//-- Detects through CSS if isMobile
function isMobile() {
	if (jQuery('.isMobile').css('display') == 'block') {
		return true;
	} else { 
		return false;
	};
};
  
//-- Moves sidebar below content if isMobile() element displayed in CSS
function sidebarAdjustment() {
	var ele = jQuery('.content-wrapper').children().first();
	if (isMobile()) {
		if (ele.is('.sidebar')) {
			jQuery('.content-wrapper').append(jQuery('.sidebar'));
		};
	} else {
		if (ele.is('.main-content')) {
		jQuery('.content-wrapper').prepend(jQuery('.sidebar'));
		};
	};
};

sidebarAdjustment();
jQuery(window).resize(function() {
	sidebarAdjustment();
});
  
//--Site Map
    function sitemapToggle() {
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
    };
    jQuery(function() { 
      sitemapToggle();
    });


//--Remove header opacity when scrolling beyond subpage header image
jQuery(window).scroll(function() {
	var subImageHeight = (jQuery('.sub-image').height() - jQuery('.header').height()); 
	if (jQuery(window).scrollTop() > subImageHeight) {
		jQuery('.header-left').css('background', '#7c97ab');
		//jQuery('.reservations').css('background', '#7c97ab');
		//jQuery('.main-nav-wrapper').css('background', '#3c4542');
		jQuery('.header-right').css('background', '#3c4542');
	} else {
		jQuery('.header-left').css('background', 'rgba(124, 151, 171, 0.8)');
		//jQuery(".reservations").css('background', 'rgba(124, 151, 171, 0.8)');
		//jQuery('.main-nav-wrapper').css('background', 'rgba(60, 69, 66, 0.8)');
		jQuery('.header-right').css('background', 'rgba(60, 69, 66, 0.8)');
	};
});
  
//Main Nav initialization
jQuery('.main-nav > ul > li').hover(
	function() {
			jQuery('.main-nav > ul > li > ul').each(function() {
				jQuery(this).stop().hide();
			});
			jQuery('> ul', this).stop().fadeIn(350);
	}, function() {
		jQuery('ul', this).stop().delay(2000).fadeOut(350);	
	}
);

//Footer link -- MORE toggle event
jQuery('.more-toggle').click(function() {
	jQuery('.more-expand').slideToggle(350, function() {
		if (jQuery('.more-expand').is(':visible')) {
			jQuery('.more-toggle').css('color','#ffffff');
			jQuery('.more-toggle').html('Less  &or;');
		} else {
			jQuery('.more-toggle').css('color','#7c97ab');
			jQuery('.more-toggle').html('More  &and;');
		};
	});
});

//Specials slide out on homepage
jQuery('.overlay-specials .trigger').on('click', function() {
	if (jQuery(this).hasClass('closed')) {
		//force height of image to height of cycle-wrapper
		jQuery('.overlay-specials-img img').height(jQuery('.cycle-wrapper').height());
        jQuery('.overlay-specials-img img').width('100%');
		jQuery('.cycle-wrapper').animate({
			//'margin-left':'364'
              'margin-left':'291'
		}, 800, 'swing', function() {
			jQuery('.overlay-specials .closed').each(function() {
				jQuery(this).attr('src','/getmedia/fa402b54-9b5e-4937-9ee8-492ce02f48a3/arrow-left');
			});
			jQuery('.overlay-specials .closed').removeClass('closed').addClass('open');
		});
	} else if (jQuery(this).hasClass('open')) {
		jQuery('.cycle-wrapper').animate({
			'margin-left':'0'
		}, 800, 'swing', function() {
		jQuery('.overlay-specials .open').each(function() {
				jQuery(this).attr('src','/getmedia/54d98a86-3d54-42b6-aceb-4ab382378a8c/arrow-right');
			});
			jQuery('.overlay-specials .open').removeClass('open').addClass('closed');
		});
	};
});


//Jquery Selectbox plugin initialization
jQuery('.selectbox').selectBox({
	mobile:true,
	menuTransition:'fade'
});

////-- Zoom effect for Meetings & Groups page
//jQuery('.main-image').zoom({url:'/galthouse-2015/_images/meeting1-lg.jpg'});
//jQuery('.featured-image:first-child').zoom({url:'/galthouse-2015/_images/meeting2-lg.jpg'});
//jQuery('.small-images > .featured-image:first-child').zoom({url:'/galthouse-2015/_images/meeting3-lg.jpg'});
//jQuery('.small-images > .featured-image:last-child').zoom({url:'/galthouse-2015/_images/meeting4-lg.jpg'});

});

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

//--Top bar sizing
jQuery(function() {
	function barHeight() {
		var barHeight = jQuery('.header').outerHeight();
		jQuery('.sub-image').css('marginTop',barHeight+'px');
	};
	jQuery(function() {
		barHeight();
	});
	jQuery(window).resize(function() {
		barHeight();
	});
});



//--Side navigation animation
    jQuery("#side-blocks > div").hover(function(){
        jQuery(this).stop(true, false).animate({ width: "150px" });
    }, function() {
        jQuery(this).stop(true, false).animate({ width: "100px" });
    });