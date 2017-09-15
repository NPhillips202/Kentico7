jQuery(document).ready(function() {
  
//-- RFP Button  
 var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
   offset:       100,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
   
  }
);
wow.init();
	

  //-- + - Switch{
	jQuery('.panel-title').click(function(e) {
		e.preventDefault();
		jQuery('.panel-title').not(this).find('.floor-minus').removeClass('active');
		jQuery('.panel-title').not(this).find('.floor-plus').addClass('active');
		jQuery(this).find('.floor-minus').toggleClass('active');
		jQuery(this).find('.floor-plus').toggleClass('active');
	});

   //--Footer height
    function getFooterHeight() {
    		var footerHeight = jQuery('footer').outerHeight();
    		jQuery('.content-area').css('margin','0 0 ' + footerHeight + 'px 0');
   	};
   	getFooterHeight();
  	jQuery(window).resize(function() {
   		getFooterHeight();
  	});

  
  
    //--Mobile Sub Navigation
  jQuery( '#dl-menu' ).dlmenu();
  
    //--Mobile Navigation 
    jQuery('.toggle-nav').click(function(e) {
        e.preventDefault();
        jQuery('nav').fadeToggle(800);
        jQuery('body').toggleClass('hidover');
        jQuery('.burger-x').toggleClass('change-color');
    });

  //--RFP Button
    jQuery(document).scroll(function () {
        var y = jQuery(this).scrollTop();
        if (y > 150) {
            jQuery('.slide-mobile-rfp').fadeIn(600);
        } else {
            jQuery('.slide-mobile-rfp').fadeOut(600);
        }
    }); 


    //--Top bar sizing
    function getHeaderHeight() {
        var barHeight = jQuery('header').outerHeight();
        jQuery('#slideshow, .sub-header').css('margin', barHeight + 'px 0 0 0');
    };

    getHeaderHeight();
    jQuery(window).resize(function() {
        getHeaderHeight();
    });

    //-Slideshow
    jQuery('#slideshow').sliderPro({
        width: '100%',
        height: '575',
        //autoHeight:true,
        fade: true,
        autoplayOnHover: 'none',
        arrows: false,
        buttons: false,
        //waitForLayers: true,
        slideDistance: 0,
        breakpoints: {
            765: {
                height: '210'
            }
        }
    });

    jQuery('#testimonials').sliderPro({
        width: '100%',
        height: '156',
        fade: true,
        autoplay: false,
        autoHeight: true
    });

    //-- Form On Foucus 
    var el = jQuery('input[type=text], textarea');
    el.focus(function(e) {
        if (e.target.value == e.target.defaultValue)
            e.target.value = '';
    });
    el.blur(function(e) {
        if (e.target.value == '')
            e.target.value = e.target.defaultValue;
    });
	
 //--Site Map
	//jQuery(function() {
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
	//});
       

 	
    //--Footer height
    //function getFooterHeight() {
    //		var footerHeight = jQuery('footer').outerHeight() + 120;
    //		jQuery('#wrapper').css('margin','0 0 ' + footerHeight + 'px 0');
    //	};
    //	getFooterHeight();
    //	jQuery(window).resize(function() {
    //		getFooterHeight();
    //	});


   //--Mobile Navigation 
    jQuery('a.banquet').click(function(e) {
        e.preventDefault();
		jQuery('.floor-title > div').each(function() {
			if (jQuery(this).hasClass('show')) {
				jQuery(this).fadeToggle(500);
			} else if (jQuery(this).hasClass('hide')) {
				jQuery(this).fadeToggle();
			};
		});
    });

   //--Gallery
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
initPhotoSwipeFromDOM('.image');
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
  jQuery('.image > figure > a').each(function(){
        var fw = getQueryParams('width', jQuery(this).find('> img').attr('src'));//jQuery(this).find('> img').width();
        var fh = getQueryParams('height', jQuery(this).find('> img').attr('src'));//jQuery(this).find('> img').height();
        jQuery(this).attr('data-size', fw + 'x' + fh);
    });
});
}); //End Of Documenent ready


// Navigation dropdowns
function navDD() {
	var navElement = jQuery('nav ul > li');
	var navSpeed = 300;
    
	// Open & Close
    navElement.hover(function() {
        if (jQuery('.mobile-btn').is(':hidden')) {
            if (jQuery(this).children('ul').length > 0) {
                jQuery(this).addClass('active');
                jQuery(this).children('ul').stop(true,false);
                jQuery(this).children('ul').hide(); // Fix for slidedown
                jQuery(this).children('ul').slideDown(navSpeed);
            };
         };
    }, function() {
        if (jQuery('.mobile-btn').is(':hidden')) {
            jQuery(this).removeClass('active');
            jQuery(this).children('ul:visible').stop(true,false);
            jQuery(this).children('ul:visible').slideUp(navSpeed);
        };	
    });
};
       
jQuery(function() {
    navDD();
});