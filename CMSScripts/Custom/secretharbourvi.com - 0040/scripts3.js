jQuery(document).ready(function() {

	// Colorbox
		//jQuery("a[rel='photogallery1']").colorbox();
		//jQuery(".cboxelement1").colorbox();
		//jQuery(".cboxelement2").colorbox();
		//jQuery("a[rel='accomm']").colorbox();
		//jQuery('.virtualTourPopup').colorbox({
		//	inline:true,
		//	href:function() {
		//		return "#" + jQuery(this).attr('href');
		//	}
		//});

	// new toggle read more
		jQuery('#expand, #expand2, #expand3, #expand4, #expand5').find('li:gt(0)').addClass('toggletr').hide().end().append(
			jQuery('<li class="show_more_btn">Read more [+]</li>').click(function(){
				jQuery(this).siblings('.toggletr').toggle(333);
				if (jQuery(this).hasClass('expanded')){
					jQuery(this).text('Read more [+]');
					jQuery(this).removeClass('expanded');
				} else{
					jQuery(this).text('Read less [-]');
					jQuery(this).addClass('expanded');
				}
			})
		);

	// toggle read more
		jQuery('.expandSection').click(function(e) {
			e.preventDefault();
			var sectionID = jQuery('#' + (jQuery(this).attr('section')));
			var sectionButton = jQuery(this).children('span');

			if (jQuery(sectionID).is(':visible')) {
				jQuery(sectionButton).html('[+]');
				jQuery(sectionID).slideUp("slow");
			} else {
				jQuery(sectionButton).html('[&ndash;]');
				jQuery(sectionID).slideDown("slow");
			};
		});
		
	// poll slider  
		jQuery('#pollSlider-button').click(function() {
			if(jQuery(this).css("margin-left") == "700px") {
				jQuery('.pollSlider').animate({"margin-left": '-=700'});
				jQuery('#pollSlider-button').animate({"margin-left": '-=700'});
				jQuery('#pollSlider-button').html('<span>Expand Menu</span><i class="fa fa-angle-right"></i>');
			} else {
				jQuery('.pollSlider').animate({"margin-left": '+=700'});
				jQuery('#pollSlider-button').animate({"margin-left": '+=700'});
				jQuery('#pollSlider-button').html('<span>Close this section</span><i class="fa fa-angle-left"></i>');
			}
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

	//--Site Map Position
		//jQuery('.links ul#menuElem li:last-child').after('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
		// jQuery('.links ul li').append('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');

	// Bottom Nav split cells
		var num_cols = 4,
		container = jQuery('.links #menuElem'),
		listItem = 'li',
		listClass = 'sub-list';
		container.append("<li><a href=\"#\" class=\"sitemap-toggle\">Site Map</a></li>");

		if (jQuery('.circleImgBg').length > 0) {
			container.append("<li><a href=\"#\" class=\"readMore\">Read More</a></li>");
		};

		container.each(function() {
		    var items_per_col = new Array(),
		    items = jQuery(this).find(listItem),
		    min_items_per_col = Math.floor(items.length / num_cols),
		    difference = items.length - (min_items_per_col * num_cols);
		    for (var i = 0; i < num_cols; i++) {
		        if (i < difference) {
		            items_per_col[i] = min_items_per_col + 1;
		        } else {
		            items_per_col[i] = min_items_per_col;
		        }
		    }
		    for (var i = 0; i < num_cols; i++) {
		        jQuery(this).append(jQuery('<ul ></ul>').addClass(listClass));
		        for (var j = 0; j < items_per_col[i]; j++) {
		            var pointer = 0;
		            for (var k = 0; k < i; k++) {
		                pointer += items_per_col[k];
		            }
		           jQuery(this).find('.' + listClass).last().append(items[j + pointer]);
		        }
		    }
		});

	//--Create mobile Menu for off-canvas display from existing menu UL
		function initializeMobileMenu() {
			var mobile_menu = jQuery('<nav />').attr('id','menu');
			var ul = jQuery('<ul class="mobile-menu"></ul>');
			var nav_clone = jQuery('#menuElem').clone();
			
			nav_clone.find('> li').each(function() {
				ul.append(jQuery(this));
			});

			mobile_menu.append(ul);
            ul.prepend('<li><a href="https://m.ihotelier.com/96879/booking.html?hotelid=96879">Reservations</a></li>');
			ul.append('<li><a href="/contact-us/">Contact Us</a></li>');
			ul.append('<li><a href="/privacy-policy/">Privacy Policy</a></li>');
			ul.append('<li><a href="/photo-gallery/">Photo Gallery</a></li>');

			mobile_menu.prependTo('#page-wrapper');

			jQuery('nav#menu').mmenu({
				classes: "mm-cp",
				counters: false,
				labels: false,
				offCanvas: {
					position: "right"
				}
			})
			// navicon animation
			.on( 'opening.mm', function() {
				jQuery( '#nav-toggle' ).addClass('active');
			})
			// navicon animation
			.on( 'closing.mm', function() {//.on( 'closed.mm', function() {
				jQuery( '#nav-toggle' ).removeClass('active');
			});
		};

	// apply some adjustments for Kentico server
		jQuery('#ui-datepicker-div').parent().removeClass('mm-page mm-slideout');
		jQuery('#form').addClass('mm-page mm-slideout');
		jQuery('body > div').removeClass('mm-page mm-slideout');

	// console.log(jQuery('#cboxOverlay').length);
		initializeMobileMenu();

		jQuery('.expandSection').click(function(e) {
			e.preventDefault();
			var sectionID = jQuery('#' + (jQuery(this).attr('section')));
			var sectionButton = jQuery(this).children('span');
			
			if (jQuery(sectionID).is(':visible')) {
				jQuery(sectionButton).html('[+]');
				jQuery(sectionID).slideUp("slow");
			} else {
				jQuery(sectionButton).html('[&ndash;]');
				jQuery(sectionID).slideDown("slow");
			};
		});

		// Cycle
		jQuery('.slideshow').cycle({
			speed:1000,
			timeout:5000,
			cleartype: true, // IE fix
			cleartypeNoBg: true,
		});
		jQuery('.sub-slideshow').cycle({
			speed:1000,
			timeout:5000
		});

		// Share btn
		jQuery('#share_button').click(function(e){
			e.preventDefault();
			FB.ui(
			{
			method: 'feed',
			name: 'WELCOME TO SECRET HARBOUR a Saint Thomas Beach Resort',
			link: 'http://www.secretharbourvi.com/',
			picture: 'http://www.secretharbourvi.com/1.jpg',
			caption: 'Secret Harbour Saint Thomas is ideally located in the beautiful US Virgin Islands. Secret Harbour offers the perfect Caribbean beach getaway.',
			description: 'Secret Harbour Saint Thomas is ideally located in the beautiful US Virgin Islands. Secret Harbour offers the perfect Caribbean beach getaway.',
			message: ''
			});
		});
		
		//Chosen Initialization
		var config = {
			  '.chosen-select'           : {disable_search_threshold:100},
			  '.chosen-select-deselect'  : {allow_single_deselect:true},
			  '.chosen-select-no-single' : {disable_search_threshold:100},
			  '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
			  '.chosen-select-width'     : {width:"95%"}
			};
		for (var selector in config) {
			jQuery(selector).chosen(config[selector]);
		};

	// Weather Widget
		/*
		jQuery.simpleWeather({
			location: 'St Thomas, US Virgin Islands',
			woeid: '',
			unit: 'f',
			success: function(weather) {
			  html = '<div class="temp"><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'&nbsp;&nbsp;|&nbsp;&nbsp;'+weather.currently+'</div>';
		  
			  jQuery("#weather").html(html);
			},
			error: function(error) {
			  jQuery("#weather").html('<p>'+error+'</p>');
			}
		});*/

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
				openPhotoSwipe( hashData.pid - 1 , galleryElements[ hashData.gid - 1 ], true );
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

	// Email Form in Footer
	    var emailForm = jQuery('#emailForm');
	    var defaultValue = "Enter address";
	    // Clear text in field when focused
	    emailForm.find('.email').focus(function() {
	        if (jQuery(this).val() == defaultValue) {
	            jQuery(this).val('');
	        };
	    });
	    emailForm.find('.email').blur(function() {
	        if (jQuery(this).val() == '') {
	            jQuery(this).val(defaultValue);
	        };
	    });
	    // Submit functions
	    function submitEmailForm() {
			var email = emailForm.find('.email').val();
			if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
				alert("Please enter a valid email address.");
				return false;
			};
			document.location.href = ('/exclusive-offers-signup/?em=' + email);
	    };
	    emailForm.find('.email').focus(function() {
	        jQuery(document.body).delegate('input:text', 'keypress', function(e) {
	            if (e.which === 13) {
	                e.preventDefault();
	                submitEmailForm();
	            };
	        });
	    });
		emailForm.find('.submit').click(function(e) {
			e.preventDefault();
			submitEmailForm();
		});
});