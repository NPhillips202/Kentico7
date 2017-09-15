//WebFontConfig = {
//	google: { families: [ 'Lato:300, 400, 600', 'Lora' ] }
//  };
//  (function() {
//	var wf = document.createElement('script');
//	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
//		'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
//	wf.type = 'text/javascript';
//	wf.async = 'true';
//	var s = document.getElementsByTagName('script')[0];
//	s.parentNode.insertBefore(wf, s);
// })();

function initializeMobileMenu() {
  
  jQuery('form#form').prepend(jQuery('#supersized'));
                                     
  //mmenu Mobile navigation
	jQuery('#mmenu').mmenu({
            "extensions": [
				'thelodge',              
                'pageshadow',
                'border-full',
                'effect-slide-menu',
                'effect-zoom-panels'
            ],
            offCanvas: {
				position: 'right'
			},
			labels: true,
			"navbar": {
				title: 'Main Navigation'
            },
			"navbars": [
				{
					position: 'bottom',
					content: [
						'<a class="fa fa-facebook" href="http://www.facebook.com/LodgeAtWoodloch" target="_blank"></a>',
                        '<a class="fa fa-twitter" href="http://twitter.com/lodgeatwoodloch" target="_blank"></a>',
                        '<a class="fa fa-pinterest" href="http://pinterest.com/lodgeatwoodloch/" target="_blank"></a>',
                        '<a href="http://www.tripadvisor.com/Hotel_Review-g52802-d620073-Reviews-The_Lodge_at_Woodloch-Hawley_Pocono_Mountains_Region_Pennsylvania.html" target="_blank"><img src="/getmedia/f254dc40-4e6c-462c-ac15-c054331c61ff/ta-icon" /></a>'
					]
				}
			],
		}, {
		// configuration
			clone: true
		});
  
		jQuery('#form').addClass('mm-page mm-slideout');
        jQuery('#mm-0').removeClass('mm-page mm-slideout');
};

function searchWrapperPosition() {
  jQuery('.searchWrapper').css('top', jQuery('header').outerHeight() + 'px');
  //jQuery('.search-wrapper-sub .search').css('top', jQuery('header').outerHeight() + 10 + 'px');
};

function homeSpecialsInitialization() {
  //Homepage specials animation
    jQuery('.home-flyout .btn').click(function() {
      if (jQuery(this).hasClass('open')) {
        jQuery('.homeSpecials-wrapper').animate({left:'-' + jQuery('.homeSpecials-wrapper').outerWidth() + 'px'},1000);
        jQuery('.email-sign-up').animate({left:'-' + jQuery('.email-sign-up').outerWidth() + 'px'},1000);
      } else {
        jQuery('.homeSpecials-wrapper').animate({left:'0px'},1000);
        jQuery('.email-sign-up').animate({left:'0px'},1000);
      };   
      jQuery(this).toggleClass('open').toggleClass('closed');
      
    });
};

function reserveButtonDropdown() {
  //Reserve button dropdown
    jQuery('.reserve-wrapper .reserve').click(function(e) {
        if (jQuery('#mobnav-btn').is(':hidden')) {
            e.preventDefault();
          jQuery('.reserve-wrapper .reserve').toggleClass('reserve-btn-on');
          if (jQuery('.reserve-wrapper .open').css('opacity') < .5) {
            jQuery('.reserve-wrapper .open').css('visibility','visible');
            jQuery('.reserve-wrapper .open').animate({opacity:1.0},500);
          } else {
            jQuery('.reserve-wrapper .open').animate({opacity:0},500,function() {
              jQuery('.reserve-wrapper .open').delay(500).css('visibility','hidden');
            });
          };
        } else {
          jQuery(this).find('a').attr('href','http://reservations.thelodgeatwoodloch.com');
          return true;
        };
    });
};

jQuery(document).ready(function(){  
  
    initializeMobileMenu();
    searchWrapperPosition();
    homeSpecialsInitialization();
    reserveButtonDropdown();
  
    jQuery(window).resize(function() {
      searchWrapperPosition();
    });
  
 //-- Text inputs -- On Focus / Blur
    var el = jQuery('input[type=text], textarea');
    el.focus(function(e) {
        if (e.target.value == e.target.defaultValue)
            e.target.value = '';
    });
    el.blur(function(e) {
        if (e.target.value == '')
            e.target.value = e.target.defaultValue;
    });

    //Tootips for footer
	jQuery("#more").tooltip({ 
		effect: 'slide', 
		direction: 'up',
		position: "top right", 
		offset: [0, -415], 
		relative: true,
		tip: '.morebox'
		});	
 	jQuery("#more1").tooltip({ 
		effect: 'slide', 
		direction: 'up',
		position: "top right", 
		offset: [-5, 500], 
		relative: true,
		tip: '.morebox1'
		});	

//--Slideshow for all cycles and specials
 	jQuery('.cycle-slideshow').cycle({
        fit: true,
        cleartypeNoBg: true
     });
     jQuery('.subPageSpecialsRotation').cycle({
        cleartypeNoBg: true
     });

//--Sitemap functions
    jQuery(".sitemap-toggle").click(function () {
		jQuery(".sitemap-float").fadeToggle("medium");
    });
  
  
//--Email SignUp Submit functions
	var submitEmailForm = function(form, value) {
		var email = form.find('input').val();
		if (email == value || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
			alert("Please enter a valid email address.");
			form.find('input').focus();
			return false;
		};
      
        //console.log('/email-sign-up/?em=' + email);
		document.location.href = ('/email-sign-up/?em=' + email);
	};
  
//--Email Form Submit
	var emailForm = jQuery('.email-sign-up'),
        defaultValue = emailForm.find('input').val();
    emailForm.find('input').focus(function() {
		jQuery(document.body).delegate('input:text', 'keypress', function(e) {
			if (e.which === 13) {
				e.preventDefault();
				submitEmailForm(emailForm, defaultValue);
			};
		});
	});
	emailForm.find('.submiticon').click(function(e) {
		e.preventDefault();
		submitEmailForm(emailForm, defaultValue);
	});
  
//--Update Form input to "date" type for mobile devices  
  function mobileDateTypes() {
    if (jQuery(window).width() < 768) {
      jQuery('input[name*="timePicker"]').each(function() {
        jQuery(this).get(0).type='date';
        jQuery(this).next('img').remove();
      });
    };
  };
  
  mobileDateTypes();
  
  jQuery(window).resize(function() {
    mobileDateTypes();
  }).resize();
		
});
 
jQuery(function() {
	jQuery('.especialsClose').click(function() {
		if (jQuery(this).hasClass('expanded')) {
			jQuery('#especialsWrapper').animate({top:'-' + jQuery('#especialsWrapper').outerHeight() + 'px'},1000);
			jQuery(this).text('+');
			jQuery(this).removeClass('expanded');
		} else {
			jQuery('#especialsWrapper').animate({top:'0px'},1000);
			jQuery(this).text('-');
			jQuery(this).addClass('expanded');
		};
	});
});

//--Photo Gallery - PhotoSwipe
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

// Overlay Scripts
jQuery('a.openOverlay, li.openOverlay > a').live('click',function(e) {
	var overlay = jQuery('<div class="formOverlayWrapper"><div class="formOverlay"><div class="formOverlayClose"><i class="fa fa-times"></i></div><div class="formOverlayContent" /></div></div>'),
		href = jQuery(this).attr('href'),
		iframe = "<iframe src='" + href + "' allowtransparency='yes' frameborder='0' scrolling='yes' width='100%'></iframe>";
	e.preventDefault();
	// Create overlay div and fill with iframe content, then fade in
	jQuery('body').append(overlay);
	overlay.find('.formOverlayContent').html(iframe);
	overlay.fadeIn(500);
	// Bind click event for closing overlay
	jQuery(document).bind('click',closeOverlayOnOutsideClick);
});

function closeOverlay() {
	jQuery('.formOverlayWrapper').fadeOut(500, function() 
	{
		jQuery('.formOverlayWrapper').remove();
	});
	// Unbind click event for closing overlay
	jQuery(document).unbind('click',closeOverlayOnOutsideClick);
};

// Close on click
jQuery('.formOverlayWrapper .close').live('click',function(e) {
	e.preventDefault();
	closeOverlay();
});

// Close on click outside of box
function closeOverlayOnOutsideClick(e) { 
	if (jQuery('.formOverlayWrapper').is(':visible')) {
        var ele = jQuery(e.target);
        if (!ele.hasClass("formOverlay"))
		{
			closeOverlay();
		};
	};
};