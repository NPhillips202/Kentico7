jQuery( document ).ready(function() {
  
	// poll slider  
	/*jQuery('#pollSlider-button').click(function() {
	if(jQuery(this).css("margin-left") == "700px")
	{
		jQuery('.pollSlider').animate({"margin-left": '-=700'});
		jQuery('.pollSlider').animate({"margin-left": '-=700'});
		jQuery('#pollSlider-button').html('<span>Explore this section</span><i class="fa fa-angle-right"></i>');
	}
	else
	{
		jQuery('.pollSlider').animate({"margin-left": '+=700'});
		jQuery('.pollSlider').animate({"margin-left": '+=700'});
		jQuery('#pollSlider-button').html('<span>Close this section</span><i class="fa fa-angle-left"></i>');
	}
	});*/
  
	jQuery('#pollSlider-button').click(function(e) {
		e.preventDefault();
		if (jQuery('.sub-navigation').is(':visible')) {
			jQuery('.sub-navigation').stop().slideUp();
		} else {
			jQuery('.sub-navigation').stop().hide().slideDown();
		};
	});
  
	jQuery(".slidingDiv").hide();
	jQuery(".show_hide").show();

	jQuery('.show_hide').toggle(function(){
		jQuery(".slidingDiv").slideDown(
			function(){
				jQuery("#plus").text("+")
			}
		);
	},function(){
		jQuery(".slidingDiv").slideUp(
			function(){
				jQuery("#plus").text("-")
			}
		);
	});

	jQuery(".more-seo").tooltip({ 
		effect: 'slide', 
		direction: 'up',
		position: "top right", 
		offset: [0, 0], 
		relative: true,
		tip: '.morebox'
	});	
//-- Fullscreen Background Image
    jQuery("#background-image").fullscreenBackground();
	
//-- Mobile Navigation 
	jQuery('#mobileMenuBtn').click(function() {
		jQuery(".drop").slideToggle("800");
		jQuery(".book-now-mobile").slideToggle("800");
	});

//--Top bar sizing
	function barHeight() {
		var barHeight = jQuery('header').outerHeight();
		// jQuery('#header-image-wrapper').css('padding',barHeight+'px 0 0 0');
	};
	jQuery(function() {
		barHeight();
	});
	jQuery(window).resize(function() {
		barHeight();
	});

//--Page Title and Book Height
	//jQuery('.page-title-wrapper').css('margin-top', '-' + jQuery('.booking').outerHeight() + 'px');


//--Stick footer to bottom if it isn't touching bottom of screen
	function footerHeight() {
		// Set to defaults
		jQuery('#wrapper').height('auto');
		// Vars
		var footerHeight = jQuery('footer').outerHeight();
		var footerBottom = jQuery('footer').offset();
			footerBottom = footerBottom.top + footerHeight;
		var windowBottom = jQuery(document).height();
		var difference = windowBottom - footerBottom;
		// Check if footer is touching bottom of document
		if (difference > 0) {
			var contentHeight = jQuery('#wrapper').height() + difference;
			jQuery('#wrapper').height(contentHeight);
		};
	};
	
	footerHeight();
	jQuery(window).resize(function() {
		footerHeight();
	});

//--Jquery Selectbox plugin initialization
	jQuery('.selectbox').selectBox({
		mobile:true,
		menuTransition:'fade'
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
       

  //--Site Map Position
    jQuery('.footer-navigation ul li:nth-last-child(5)').after('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
	
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

	// Sub Navigation //

    //--Magnific Popup
    jQuery('.map').magnificPopup({
        type: 'iframe',
        iframe: {
            patterns: {
                dailymotion: {
                    index: 'dailymotion.com',
                    id: function(url) {        
                        var m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
                        if (m !== null) {
                            if(m[4] !== undefined) {
                                return m[4];
                            }
                            return m[2];
                        }
                        return null;
                    },    
                    src: 'http://www.dailymotion.com/embed/video/%id%'
                }
            }
        }
    });
	
    // -->open efx
	jQuery('li.iframe > a').on('click', function () {
		jQuery.magnificPopup.open({
			items: {
				src: jQuery(this).attr('href'),
				//src: '#event-content',
				type: 'iframe'
				//type: 'inline'
			},
			//closeMarkup: '',
			closeBtnInside: false,
			closeOnContentClick: false,
			//modal: true,
			tLoading: '', // remove text from preloader
			callbacks: {
				beforeOpen: function () {
					this.st.mainClass = 'fade-in-scale';
					//this.st.mainClass = 'slide-in-top';
					//this.st.mainClass = 'flip-h-3d';
					//this.st.mainClass = 'rotate-carouse-left';
					//var $triggerEl = jQuery(this.st.el);
						//newClass = $triggerEl.data("modal-class");
					//console.log($triggerEl);
					//if (newClass) {
						//this.st.mainClass = this.st.mainClass + ' ' + newClass;
						//$triggerEl.find('.mfp-content').addClass('floor-plan-iframe-scaler');
					//}
				},
				//markupParse: function(template, values, item) {
					//template.find('iframe').addClass('floor-plan-iframe');
					//console.log(template);
					//template.closest('.mfp-content').addClass('floor-plan-iframe-scaler');
					//template.addClass('floor-plan-iframe-scaler');
				//}
			},
			preloader: false,
			removalDelay: 300,
		}, 0);
		
		// add specific class to MFP content DIV
		var mfp_content = jQuery('.mfp-content');
		if(mfp_content.hasClass('floor-plan-iframe-scaler')) {
			mfp_content.removeClass('floor-plan-iframe-scaler');
		} else {
			mfp_content.addClass('floor-plan-iframe-scaler');
		}
		return false;
	});
	// -->close efx
	jQuery('.mfp-close').on('click', function (e) {
		alert(e);
		e.preventDefault();
		jQuery('.mfp-wrap').addClass('mfp-removing');
		setTimeout(function () {
			jQuery.magnificPopup.close();
		}, 500);
	});
	
    jQuery('.zoom-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function(item) {
				return item.el.attr('title');
			}
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't forget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
		
	});
  
}); //End Of Documenent ready

