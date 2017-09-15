// Quick Reference
// http://codepen.io/mjau-mjau/pen/XbqBbp
// http://codepen.io/pasqualevitiello/pen/azMpLp
// http://codepen.io/makshh/pen/ONMVMm
// ! http://pixelkrams.de/2015/artspin/

(function() {
	var mouseUsed = false;

	var initPhotoSwipeFromDOM = function(gallerySelector) {

		var parseThumbnailElements = function(el) {
			var thumbElements = el.childNodes,
			//var _thumbElements = jQuery(el).find('> .video-gallery-item, > a').addClass('photoswipe-item'),
			//	thumbElements = jQuery(el).find('.photoswipe-item:not(.isotope-hidden)').get(),
				numNodes = thumbElements.length,
				items = [],
				el,
				childElements,
				thumbnailEl,
				size,
				item;

			for(var i = 0; i < numNodes; i++) {
				el = thumbElements[i]; // <a>, <div>, or etc. element

				// include only element nodes
				//console.log(jQuery(el).attr('class'), el.nodeType);
				if(jQuery(el).attr('class') == 'go-back-link') {
					jQuery(el).click(function(){
						console.log('clicked!');
						//window.location.replace(jQuery(this).attr('href'));
						//return true;
					});
				}
				if(el.nodeType !== 1 || jQuery(el).attr('class') == 'go-back-link') {
				//if(el.nodeType !== 1) {
					continue;
				}

				childElements = el.children;
				//childElements = el.children[0];

				size = el.getAttribute('data-size').split('x');
				//size = childElements.getAttribute('data-size').split('x');

				// create slide object
				if (jQuery(el).data('type') == 'html') {
					item = {
						html: jQuery(el).data('video')
					};
				} else {
					item = {
						src: el.getAttribute('href'),
						w: parseInt(size[0], 10),
						h: parseInt(size[1], 10),
						author: el.getAttribute('data-author')
					};
				}

				item.el = el; // save link to element for getThumbBoundsFn

				if(childElements.length > 0) {
					item.msrc = childElements[0].getAttribute('src'); // thumbnail url
				}

				if(childElements.length > 1) {
					item.title = childElements[1].innerHTML; // caption (contents of figure)
				}

				var mediumSrc = el.getAttribute('data-med');
				if(mediumSrc) {
					size = el.getAttribute('data-med-size').split('x');
					// "medium-sized" image
					item.m = {
						src: mediumSrc,
						w: parseInt(size[0], 10),
						h: parseInt(size[1], 10)
					};
				}
				// original image
				item.o = {
					src: item.src,
					w: item.w,
					h: item.h
				};

				items.push(item);
			}

			return items;
		};

		// find nearest parent element
		var closest = function closest(el, fn) {
			return el && ( fn(el) ? el : closest(el.parentNode, fn) );
		};

		function hasClass(element, cls) {
			return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
		}

		var onThumbnailsClick = function(e) {
			e = e || window.event;
			e.preventDefault ? e.preventDefault() : e.returnValue = false;

			var eTarget = e.target || e.srcElement;

			// find root element of slide
			var clickedListItem = closest(eTarget, function(el) {
				//return el.tagName === 'A';
				return (hasClass(el, 'photoswipe-item'));
			});

			if(!clickedListItem) {
				return;
			}

			// find index of clicked item by looping through all child nodes
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

		var photoswipeParseHash = function() {
			var hash = window.location.hash.substring(1),
			params = {};

			if(hash.length < 5) { // pid=1
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

			return params;
		};

		var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
			var pswpElement = document.querySelectorAll('.pswp')[0],
				gallery,
				options,
				items;

			// check if .go-back-link exist, skip if so
			/*console.log(galleryElement.childNodes);
			var thumbElements = galleryElement.childNodes,
				numNodes = thumbElements.length,
				el;
			for(var i = 0; i < numNodes; i++) {
				el = thumbElements[i]; // <a>, <div>, or etc. element
				var is_back_link = jQuery(thumbElements[i]).is('.go-back-link');
				if(!is_back_link) {
				}
			}*/
			items = parseThumbnailElements(galleryElement);

			// define options (if needed)
			options = {

				galleryUID: galleryElement.getAttribute('data-pswp-uid'),

				getThumbBoundsFn: function(index) {
					// See Options->getThumbBoundsFn section of docs for more info
					var thumbnail = items[index].el.children[0],
						pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
						rect = thumbnail.getBoundingClientRect();

					return {
						x:rect.left,
						y:rect.top + pageYScroll,
						w:rect.width
					};
				},

				addCaptionHTMLFn: function(item, captionEl, isFake) {
					if(!item.title) {
						captionEl.children[0].innerText = '';
						return false;
					}
					//captionEl.children[0].innerHTML = item.title +  '<br/><small>Photo: ' + item.author + '</small>';
					captionEl.children[0].innerHTML = '' +
						//'<div class="pswp__caption__center-custom">' +
							'<div class="mfp-logo">' +
							'<a href="index.html">' +
							'<img src="/Naiaresortandspa.com-0077-2016Redesign/media/NS/graphics/popup-logo.png" alt="NAïA - RESORT AND SPA">' +
							'</a>' +
							'</div>' +
							'<div class="mfp-outer-title">' +
								'<div class="mfp-title">' +
								item.title +  '<br/><small>Photo: ' + item.author + '</small>' +
								'</div>' +
							'</div>' +
							'<div class="contact-btn"><a href="/join-us/" title="CONTACT">CONTACT</a></div>';
						//'</div>';
					return true;
				},

			};

			if(fromURL) {
				if(options.galleryPIDs) {
					// parse real index when custom PIDs are used
					// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
					for(var j = 0; j < items.length; j++) {
						if(items[j].pid == index) {
							options.index = j;
							break;
						}
					}
				} else {
					options.index = parseInt(index, 10) - 1;
				}
			} else {
				options.index = parseInt(index, 10);
			}

			// exit if index not found
			if( isNaN(options.index) ) {
				return;
			}

			var radios = document.getElementsByName('gallery-style');
			for (var i = 0, length = radios.length; i < length; i++) {
				if (radios[i].checked) {
					if(radios[i].id == 'radio-all-controls') {

					} else if(radios[i].id == 'radio-minimal-black') {
						options.mainClass = 'pswp--minimal--dark';
						options.barsSize = {top:0,bottom:0};
						options.captionEl = false;
						options.fullscreenEl = false;
						options.shareEl = false;
						options.bgOpacity = 0.85;
						options.tapToClose = true;
						options.tapToToggleControls = false;
					}
					break;
				}
			}

			if(disableAnimation) {
				options.showAnimationDuration = 0;
			}

			// Pass data to PhotoSwipe and initialize it
			gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

			// see: http://photoswipe.com/documentation/responsive-images.html
			var realViewportWidth,
				useLargeImages = false,
				firstResize = true,
				imageSrcWillChange;

			gallery.listen('beforeResize', function() {

				var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
				dpiRatio = Math.min(dpiRatio, 2.5);
				realViewportWidth = gallery.viewportSize.x * dpiRatio;


				if(realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200 ) {
					if(!useLargeImages) {
						useLargeImages = true;
						imageSrcWillChange = true;
					}

				} else {
					if(useLargeImages) {
						useLargeImages = false;
						imageSrcWillChange = true;
					}
				}

				if(imageSrcWillChange && !firstResize) {
					gallery.invalidateCurrItems();
				}

				if(firstResize) {
					firstResize = false;
				}

				imageSrcWillChange = false;

			});

			gallery.listen('gettingData', function(index, item) {
				/* Code commented out since there is no "else" condition for useSmallerImages - missing src attr info */
				/*if( useLargeImages ) {
					item.src = item.o.src;
					item.w = item.o.w;
					item.h = item.o.h;
				} else {
					item.src = item.m.src;
					item.w = item.m.w;
					item.h = item.m.h;
				}*/
				item.src = item.o.src;
				// Make sure the slide is not html, and that the onLoad was not already triggered for this item
				if(item.html === undefined && item.onloading === undefined && (item.w < 1 || item.h < 1)) { // unknown size
					item.onloading = true;
					var img = new Image();
					img.onload = function() { // will get size after load
						item.w = this.width; // set image width
						item.h = this.height; // set image height
						gallery.invalidateCurrItems(); // reinit Items
						gallery.updateSize(true); // reinit Items
					};
				} else {
					item.w = item.o.w;
					item.h = item.o.h;
				}
			});

			// for video & virtual tour
			/*gallery.listen('beforeChange', function() {
				var currItem = jQuery(gallery.currItem.container);
				jQuery('.pswp-video').removeClass('active');
				var currItemIframe = currItem.find('.pswp-video').addClass('active');
				jQuery('.pswp-video').each(function() {
					if (!jQuery(this).hasClass('active')) {
						jQuery(this).attr('src', jQuery(this).attr('src'));
					}
				});
			});
			gallery.listen('close', function() {
				jQuery('.pswp-video').each(function() {
					jQuery(this).attr('src', jQuery(this).attr('src'));
				});
			});*/

			// special for gallery if clicked from main gallery category page
			jQuery.urlParam = function(name){
				var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
				if (results==null){
					return null;
				} else {
					return results[1] || 0;
				}
			};
			// listen closing event
			gallery.listen("close", function() {
				//console.log('photoswipe hide');
				if(jQuery.urlParam('back-to-main-gallery') == 1) window.location.href = '/media-gallery/';
			});

			var transitionManager = function() {
				var currentSlide = options.index;
				gallery.listen('beforeChange', function () {
					var transition = Math.abs(gallery.getCurrentIndex() - currentSlide) < 2;
					jQuery('.pswp__container').toggleClass('pswp__container_transition', transition);
					currentSlide = gallery.getCurrentIndex();
				});
			}
			if (mouseUsed) {
				transitionManager();
			} else {
				gallery.listen('mouseUsed', function () {
					mouseUsed = true;
					transitionManager();
				});
			}

            // original
			gallery.init();
            // alternate (vertically center image)
            /*function zoomtop() {
                gallery.zoomTo(1, {x:0, y:0});
            }
            gallery.init();
            zoomtop();
            gallery.listen('afterChange', function() {zoomtop()});*/
          
		};

		// select all gallery elements
		var galleryElements = document.querySelectorAll( gallerySelector );
		for(var i = 0, l = galleryElements.length; i < l; i++) {
			galleryElements[i].setAttribute('data-pswp-uid', i+1);
			galleryElements[i].onclick = onThumbnailsClick;
		}

		// Parse URL and open gallery if it contains #&pid=3&gid=1
		var hashData = photoswipeParseHash();
		if(hashData.pid && hashData.gid) {
			jQuery(galleryElements[ hashData.gid - 1 ]).find('> a').each(function(){
				setGalleryDataSize(this);
			});
			openPhotoSwipe( hashData.pid, galleryElements[ hashData.gid - 1 ], true, true );
		}
	};

	initPhotoSwipeFromDOM('.simple-gallery');

})();
