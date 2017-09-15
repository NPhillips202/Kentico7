

//--Header Height
    function headerHeight() {
        var height = jQuery('header').outerHeight()
        jQuery('#wrapper').css('marginTop',height+'px');
    }
    jQuery(function() { headerHeight(); });
    jQuery(window).ready(function() { // Late font loading workaround
        setTimeout(function(){
            headerHeight();
        }, 200);
    });
    jQuery(window).resize(function() { headerHeight(); });

//--Main navigation dropdowns
    var navElement = jQuery('#mainNav > ul > li'),
        navSpeed = 400;
    // Reposition dropdowns that are too far to the right
    function repositionNavDropdowns() {
        navElement.each(function() {
            if (jQuery(this).children('ul').length > 0) {
                jQuery(this).children('ul').show(); // Offset fix

                var dropdownRightPos = jQuery(this).children('ul').offset().left + jQuery(this).children('ul').outerWidth(),
                    navRightPos = jQuery('#mainNav').offset().left + jQuery('#mainNav').outerWidth(),
                    difference = navRightPos - dropdownRightPos;

                jQuery(this).children('ul').hide(); // Offset fix

                //console.log(dropdownRightPos + ' | ' + navRightPos + ' | ' + difference);

                if (difference < 0) {
                    jQuery(this).children('ul').css('left','inherit');
                    jQuery(this).children('ul').css('right','0');
                };
            };
        });
    };
    jQuery(function() { repositionNavDropdowns(); });
    jQuery(window).resize(function() { repositionNavDropdowns(); });
    // Open & Close
    navElement.hover(function() {
        if (jQuery(this).children('ul').length > 0) {
            jQuery(this).addClass('active');
            jQuery(this).children('ul').stop(true,false);
            jQuery(this).children('ul').hide(); // Fix for slidedown
            jQuery(this).children('ul').slideDown(navSpeed);
        };
    }, function() {
        jQuery(this).removeClass('active');
        jQuery(this).children('ul:visible').stop(true,false);
        jQuery(this).children('ul:visible').slideUp(navSpeed);
    });

//--Booking mask dropdown
	jQuery('#reservations > a').click(function(e) {
		e.preventDefault();
		//var bookingMask = jQuery('#reservations #bookingMask'),
		var $this = jQuery(this),
			bookingMask = $this.next('#bookingMask'),
			speed = 300;

		/*$this.parent().toggleClass('open');
		bookingMask.slideToggle(speed);*/

		if (!bookingMask.is(':visible')) {
			bookingMask.slideDown(speed);
			$this.parent('#reservations').addClass('open');
		} else {
			bookingMask.slideUp(speed);
			$this.parent('#reservations').removeClass('open');
		}
	});

//--Mobile subnav
    jQuery('.exploreThisSection').click(function(e) {
        e.preventDefault();
        var subNav = jQuery('.subNav > ul'),
            speed = 300;

        if (!subNav.is(':visible')) {
            subNav.slideDown(speed);
            jQuery(this).parent('.subNav').addClass('open');
        } else {
            subNav.slideUp(speed);
            jQuery(this).parent('.subNav').removeClass('open');
        };
    });

//--Custom dropdowns
    jQuery(function() {
        jQuery('#bookingMask select').selectBox();
    });

//--Mobile navigation slideout menu
    jQuery(function() {
        jQuery('#mainNav').mmenu({
            navbar: {
                title: ''
            },
            extensions: [
                "border-full",
                "effect-slide-menu",
                "pageshadow"
            ],
            offCanvas: {
                position: "right",
            },
            counters: true,
            labels: true
        }, {
            // Configuration
            clone: true,
            offCanvas {  // Uncomment for CMS integration
                pageSelector: "#wrapper"
            }
        }).on('init', function(){
            var menu = jQuery('.mm-panel').first(),
                reservations = jQuery('#reservations > a'),
                secondaryNav = jQuery('#topNav > ul > li');

            reservations.clone().prependTo(menu.children('ul')).wrapAll('<li></li>').find('span').remove();
            secondaryNav.clone().appendTo(menu.children('ul'));
        }).trigger( "init" );
    });

// Collapse logo when the user scrolls
function collapseLogo() {
    var currentScroll = jQuery(document).scrollTop(),
        collapseLogoAfterScrollingThisMuch = 400;

    if (currentScroll > collapseLogoAfterScrollingThisMuch) {
        jQuery('.logo').addClass('collapsed');
    } else {
        jQuery('.logo').removeClass('collapsed');
    };
};
jQuery(function() {
    collapseLogo();
});
jQuery(window).scroll(function() {
    collapseLogo();
});


//--Swipers
    var swiperTestimonials = new Swiper('.swiper-homeSlideshow', {
        speed: 2000,
        autoplay: 3500,
        //pagination: jQuery('.pagination'),
        //paginationClickable: true,
        loop: true,
        autoplayDisableOnInteraction: false
    });

    var specialsBoxSlideLength = jQuery('.swiper-specialsBox > .swiper-wrapper > .swiper-slide').length;
    if(specialsBoxSlideLength > 1){
        var swiperTestimonials = new Swiper('.swiper-specialsBox', {
            speed: 2000,
            autoplay: 3500,
            loop: true,
            autoplayDisableOnInteraction: false
        });
    } else {
        var swiperTestimonials = new Swiper('.swiper-specialsBox', {
            noSwiping: true
        });
    }
});

//--Site Map
	//jQuery(function() {
	(function() {

		jQuery(".site-map a, .sitemap-close").click(function(e) {
		    e.preventDefault();
		    if (jQuery('.sitemap-float').is(':visible')) {
		        jQuery(".sitemap-float").fadeOut(500);
		    } else {
		        jQuery(".sitemap-float").fadeIn(500);
		    };
		});/**/

    }(jQuery));
    //});

//--Remove empty next/prev links
    jQuery(function() {
        jQuery('.next-left, .next-right').each(function() {
            var url = jQuery(this).children('a').attr('href');
            if (url == "/") {
                jQuery(this).remove();
            };
        });
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


 // Disable scroll zooming and bind back the click event
      jQuery(function() {
        var onMapMouseleaveHandler = function (event) {
          var that = jQuery(this);

          that.on('click', onMapClickHandler);
          that.off('mouseleave', onMapMouseleaveHandler);
          that.find('iframe').css("pointer-events", "none");
        }

        var onMapClickHandler = function (event) {
          var that = jQuery(this);

          // Disable the click handler until the user leaves the map area
          that.off('click', onMapClickHandler);

          // Enable scrolling zoom
          that.find('iframe').css("pointer-events", "auto");

          // Handle the mouse leave event
          that.on('mouseleave', onMapMouseleaveHandler);
        }

        // Enable map zooming with mouse scroll when the user clicks the map
        jQuery('.maps.embed-container').on('click', onMapClickHandler);

         });
