jQuery(function () {

//--Icon break on mobile (<500px width)
    var breakingPoint = Math.round((jQuery('#footer-overlay > a').length)/2);
    if (jQuery(document).width() < 500) {
      jQuery('#footer-overlay a').eq(breakingPoint-1).after('<br />');
    };
  
  //Smooth scroll function for anchor tags within pages
  jQuery('a[rel="relativeanchor"]').click(function(event){
        event.preventDefault();
        //console.log('clicked!');
        jQuery('html, body').animate({
            scrollTop: jQuery( jQuery.attr(this, 'href') ).offset().top - jQuery('#headerWrapper').height() - 50
            //scrollTop: jQuery('.header').height()
        }, 1000);
        return false;
    });

  jQuery('#footerMenu #menuElem').append("<li><a href=\"#\" class=\"sitemap-toggle\">Site Map</a></li>");
	
//--Get height for wrapper elements
	function fixedHeaderHeight() {
		jQuery('#sliderPosition').css('padding-top', jQuery('#headerWrapper').height() + 'px');
		jQuery('#subpageImg').css('padding-top', jQuery('#headerWrapper').height() + 'px');
	};

	function resizeSlideshow() {
		var slider = jQuery('#sliderWrapper.home');
		var windowHeight = jQuery(window).height();
		var pageHeight = jQuery('#headerWrapper').outerHeight() + jQuery('#footerWrapper').outerHeight();
		var heightDiff = windowHeight - pageHeight;
		if (heightDiff > 440) {
			slider.height(heightDiff);
		} else {
			slider.height(440);
		};
	};
function isMobile() {
  if (jQuery('#mobileMenuBtn').css('display') == 'block') {
      return true;
  } else {
    return false;
  };
};
  
//--Update Form input to "date" type for mobile devices  
  function mobileDateTypes() {
    if (isMobile()) {
      jQuery('input[name*="timePicker"]').each(function() {
        jQuery(this).get(0).type='date';
        jQuery(this).next('img').remove();
      });
    };
  };
    
//--Create mobile Menu for off-canvas display from existing menu UL
	function initializeMobileMenu() {
		var mobile_menu = jQuery('<nav />').attr('id','menu');
		var ul = jQuery('<ul class="links"></ul>');
		var nav_clone = jQuery('#mainNav > ul').clone();
		
		nav_clone.find('> li').each(function() {
			ul.append(jQuery(this));
		});

		mobile_menu.append(ul);
		ul.prepend('<li><a href="/">Home</li>');
		ul.prepend('<li><a href="http://www.ihg.com/crowneplaza/hotels/us/en/hollywood/fllso/hoteldetail" target="_blank">Reservations</li>');
		ul.append(jQuery('#footerMenu ul').html());
		mobile_menu.prependTo('#pageWrapper');

		jQuery('nav#menu').mmenu({
			classes: "mm-cp",
			//counters: true,
			labels: true,
			offCanvas: {
				position: "right"	
			}
		});
      
        jQuery('nav#menu').css('z-index','102');
        
        // apply some adjustments for Kentico server
        jQuery('#ui-datepicker-div').parent().removeClass('mm-page mm-slideout');
        jQuery('#form').addClass('mm-page mm-slideout');
	};
	
	function reservationDrop() {
		var reserve = jQuery('#reservationBtn');
		var position = reserve.position();
		jQuery('#bookingMask').css('right',(jQuery(document).width() - (position.left+92))+'px');
	};

//--Returns true if IE or Mozilla //--This is for the slideshow utilizing the 'coverflow' effect not supported in IE
	function isIEorMoz(userAgent) {
	  userAgent = userAgent || navigator.userAgent;
	  return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1 || userAgent.indexOf("Firefox") > -1;     
	};
	
	function displayFooter() {
		if (jQuery(window).width() > 500) {
			jQuery('#footerMenu ul').css('display','inline-block');
		};
	};
//--Language Dropdown list open/close      
    function languageDrop() {
      if (jQuery('#languageDrop ul').find('.HighLighted').length === 0) {
        jQuery('#languageDrop ul').prepend('<li class="HighLighted"><a href="/">English</a></li>');
      } else {
        jQuery('#languageDrop ul').prepend('<li><a href="/">English</a></li>');
      };
      var langText = jQuery('#languageDrop ul').find('.HighLighted').text();
      jQuery('#languageDrop .langText').text(langText);
      
      jQuery('#languageDrop').click(function() {
        jQuery('#languageDrop ul').slideToggle();
      });
      jQuery(document).click(function(e) {
        if (!jQuery(e.target).closest('#languageDrop').length) {
          jQuery('#languageDrop ul').slideUp();
        };
      });
    };

	
//--OnLoad functions
//--Google web fonts need to load so that there is no line break on navbar when page loads
	WebFont.load({
		google: {
			families: ['Open+Sans+Condensed:700']
		},
		active: function() {
			// Wait for google fonts to load before detection to avoid spacing issues
			fixedHeaderHeight();
			reservationDrop();
            languageDrop();
            initializeMobileMenu();
            mobileDateTypes();
		}
	});

      
//--Window Resize functions
	jQuery(window).resize(function() {
		fixedHeaderHeight();
		resizeSlideshow();
		displayFooter();
        mobileDateTypes();
	}).resize();
	
//--Homepage Slider
//--Check for useragent -- Coverflow effect not supported in IE
	if (isIEorMoz(window.navigator.userAgent)) {
		// if IE or Firefox (backface-visibility bug)
		var swiperFront = new Swiper('.swiper-front', {
			slidesPerView: 1,
			spaceBetween: 80,
			loop: true,
			centeredSlides:true,
			effect:'slide'
		});
	} else {
		// If not IE
		var swiperFront = new Swiper('.swiper-front', {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			centeredSlides:true,
			effect:'coverflow',
			coverflow: {
				rotate:20,
				stretch:-140,
				depth:1000,
				modifier:1,
				slideShadows:false
			}
    	});
	};
	var swiperBack = new Swiper('.swiper-back', {
        nextButton: '.nav-next',
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
		centeredSlides:true,
		effect:'fade',
		control:swiperFront,
		autoplay:6000,
		autoplayDisableOnInteraction:false,
		speed: 1200
    });
      
    var specialsRotation = new Swiper('.swiper-specials', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay:6000,
        speed: 1200,
        effect:'slide'
    });
  
//--Position slides to fill height
	function positionSlides() {
		jQuery('.swiper-back .swiper-slide .slideImg').each(function() {
			var thisHeight = jQuery(this).height();
			var thisWidth = jQuery(this).width();
			var parentHeight = jQuery(this).parent().height();
			var windowWidth = jQuery(window).width();
			//console.log('thisHeight = ' + thisHeight + ' | parentHeight = ' + parentHeight + ' || thisWidth = ' + thisWidth + ' | windowWidth = ' + windowWidth);
			if (thisHeight <= parentHeight) {
				// Update image to wrapper height
				jQuery(this).height(parentHeight);
				jQuery(this).width('auto');
				// Check to see if image doesn't fit in the window anymore
				if (jQuery(this).width() < windowWidth) {
					// Fit to width if it doesn't
					jQuery(this).height('auto');
					jQuery(this).width(windowWidth);
					// Center image vertically
					var marginDiff = -((jQuery(this).height() - jQuery(this).parent().height()) / 2);
					jQuery(this).css('margin','0'); // Reset
					jQuery(this).css('margin-top',marginDiff);
				} else {
					// If it does, just re-center image now that it's wider than it's parent
					var marginDiff = -((jQuery(this).width() - jQuery(this).parent().width()) / 2);
					jQuery(this).css('margin','0'); // Reset
					jQuery(this).css('margin-left',marginDiff);
				};
			} else {
				jQuery(this).height('auto');
				jQuery(this).width(windowWidth);
				// Center image vertically
				var marginDiff = -((jQuery(this).height() - jQuery(this).parent().height()) / 2);
				jQuery(this).css('margin','0'); // Reset
				jQuery(this).css('margin-top',marginDiff);
			};
		});
	};

//--OnLoad function for pageLoad and resize for Homepage Slideshow	
	//positionSlides();
	jQuery('.swiper-back .swiper-slide img').load(function() {
		positionSlides();
	});
	jQuery(window).resize(function() {
		positionSlides();
	});

//--Site Map
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
	
//--Navigation dropdowns
	var navElement = jQuery('#mainNav > ul > li');
	var navSpeed = 200;
	navElement.each(function() {
        var dropdownWidth = jQuery(this).children('ul').width();
        var buttonWidth = jQuery(this).outerWidth();
        var widthDifference = dropdownWidth - buttonWidth;
        if (widthDifference < 0) {
            jQuery(this).children('ul').width(buttonWidth + 'px');
        };
    });

//--Open & Close
	navElement.hover(function(e) {
		if (jQuery(this).children('ul').length > 0) {
            if (('ontouchstart' in window) || (window.DocumentTouch)) { jQuery(this).one('click',false) };
			jQuery(this).children('ul').stop(true,true).slideDown(navSpeed);
		};
	}, function() {
		jQuery(this).children('ul:visible').slideUp(navSpeed);	
	});
	
	var reservationElement = jQuery('#reservationBlock a');
	reservationElement.click(function(e) {
		e.preventDefault();
        e.stopPropagation();
		jQuery('#bookingMask').slideToggle(navSpeed);
	});
  
    jQuery(document).click(function(e) {
      var ele = jQuery(e.target);
      console.log(ele.closest('.ui-widget').length);
      //if (!ele.closest('#bookingMask').length && !ele.closest('#ui-datepicker-div').length && !ele.parent().parents(".ui-datepicker").length && !ele.closest(".ui-icon").length) {
      if ((ele.closest('#bookingMask').length == 0) && (ele.closest('#ui-datepicker-div').length == 0) && (!ele.closest('#ui-datepicker-div').length == 0)) {
        jQuery('#bookingMask').slideUp(navSpeed);
      };
    });
  

//--Email SignUp Submit functions
	var submitEmailForm = function(form, value) {
		var email = form.find('.emailSignUp').val();
		if (email == value || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
			alert("Please enter a valid email address.");
			form.find('.emailSignUp').focus();
			return false;
		};
		document.location.href = ('/email-signup/?em=' + email);
	};
	
//--Email Form in Footer
	var emailForm = jQuery('.email-form'),
		defaultValue = 'Sign-up for Newsletter';
	// Clear text in field when focused
	emailForm.find('.emailSignUp').focus(function() {
		if (jQuery(this).val() == defaultValue) {
			jQuery(this).val('');
		};
	});
	emailForm.find('.emailSignUp').blur(function() {
		if (jQuery(this).val() == '') {
			jQuery(this).val(defaultValue);
		};
	});
  
//--Email Form Submit
	emailForm.find('.emailSignUp').focus(function() {
		jQuery(document.body).delegate('input:text', 'keypress', function(e) {
			if (e.which === 13) {
				e.preventDefault();
				submitEmailForm(emailForm, defaultValue);
			};
		});
	});
	emailForm.find('.submit img').click(function(e) {
		e.preventDefault();
		submitEmailForm(emailForm, defaultValue);
	});


});

// placeholder
CPHPlaceholder = function() {

    var selectors = '.searchBox';
    
    jQuery(selectors).find(":input[type='text'],textarea").each(function(index, elem) {
        var eId = jQuery(elem).attr("id");
        var label = null;
        if (eId && (label = jQuery(elem).parents("form").find("label[for="+eId+"]")).length === 1) {
            jQuery(elem).attr("placeholder", jQuery(label).html());
            jQuery(label).remove();
        }
    });
};

jQuery(function() {
    
    CPHPlaceholder();
    
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
