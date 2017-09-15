//jQuery(document).ready(function(){
;(function(root) {
//(function() {
	//'use strict';

	var initPhotoSwipeFromDOM = function(gallerySelector) {

		var parseThumbnailElements = function(el) {
			var thumbElements = el.childNodes,
				numNodes = thumbElements.length,
				items = [],
				el,
				childElements,
				thumbnailEl,
				size,
				item;

			//console.log(gallerySelector);
			//console.log(thumbElements);
			//console.log(numNodes);

			for(var i = 0; i < numNodes; i++) {
				el = thumbElements[i];

				//console.log('el.nodeType: '+el.nodeType);
				// include only element nodes
				if(el.nodeType !== 1) {
					continue;
				}
				//console.log('el: ' + el.getAttribute('href'));

				childElements = el.children;

				size = el.getAttribute('data-size').split('x');

				// create slide object
				item = {
					src: el.getAttribute('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10),
					author: el.getAttribute('data-author')
				};
				//console.log('size: ' + size);

				item.el = el; // save link to element for getThumbBoundsFn

				if(childElements.length > 0) {
					item.msrc = childElements[0].getAttribute('src'); // thumbnail url
					if(childElements.length > 1) {
						item.title = childElements[1].innerHTML; // caption (contents of figure)
					}
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
				//console.log('item2: ' + item.w);

				items.push(item);
			}

			return items;
		};

		// find nearest parent element
		var closest = function closest(el, fn) {
			return el && ( fn(el) ? el : closest(el.parentNode, fn) );
		};

		var onThumbnailsClick = function(e) {
			e = e || window.event;
			e.preventDefault ? e.preventDefault() : e.returnValue = false;

			var eTarget = e.target || e.srcElement;

			var clickedListItem = closest(eTarget, function(el) {
				return el.tagName === 'A';
			});

			if(!clickedListItem) {
				return;
			}

			var clickedGallery = clickedListItem.parentNode;

			var childNodes = clickedListItem.parentNode.childNodes,
				numChildNodes = childNodes.length,
				nodeIndex = 0,
				index;

			for (var i = 0; i < numChildNodes; i++) {
				if(childNodes[i].nodeType !== 1) {
					continue;
				}

				if(childNodes[i] === clickedListItem) {
					index = nodeIndex;
                  console.log(index);
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

			items = parseThumbnailElements(galleryElement);

			//console.log(galleryElement.closest);

			// define options (if needed)
			options = {

				galleryUID: galleryElement.getAttribute('data-pswp-uid'),

				getThumbBoundsFn: function(index) {
					// See Options->getThumbBoundsFn section of docs for more info
					var thumbnail = items[index].el.children[0],
						pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
						rect = thumbnail.getBoundingClientRect();

					return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
				},

				addCaptionHTMLFn: function(item, captionEl, isFake) {
					if(!item.title) {
						captionEl.children[0].innerText = '';
						return false;
					}
					captionEl.children[0].innerHTML = item.title +  '<br/><small>Photo: ' + item.author + '</small>';
					return true;
				}

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

			// special for gallery if clicked from main gallery category page
			jQuery.urlParam = function(name){
				var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
				if (results==null){
					return null;
				} else {
					return results[1] || 0;
				}
			};
			//
			gallery.listen("close", function() { 
				console.log('photoswipe hide');
				if(jQuery.urlParam('back-to-main-gallery') == 1) window.location.href = '/gallery/';
			});
			/*jQuery(document).on('click', '.pswp__button.pswp__button--close' , function(){
				//alert('d'); // did not fire?
				if(jQuery.urlParam('back-to-main-gallery') == 1)
					window.location.href = '/gallery/';
			});*/

			gallery.init();
		};

		// select all gallery elements
		var galleryElements = document.querySelectorAll( gallerySelector );
		for(var i = 0, l = galleryElements.length; i < l; i++) {
			galleryElements[i].setAttribute('data-pswp-uid', i+1);
			//if(jQuery.urlParam('back-to-main-gallery') == 1)
				//window.onload = onThumbnailsClick;
			//else
				galleryElements[i].onclick = onThumbnailsClick;
		}

		// Parse URL and open gallery if it contains #&pid=3&gid=1
		var hashData = photoswipeParseHash();

		//console.log(hashData.gid);
		//console.log(hashData.pid);
		//console.log(jQuery(galleryElements[ hashData.gid - 1 ]).find('>a').length);

		if(hashData.pid && hashData.gid) {
			jQuery(galleryElements[ hashData.gid - 1 ]).find('>a').each(function(){
				setGalleryDataSize(this);
				//console.log('you changed my data-size!');
				//jQuery(this).attr('data-size', getQueryParams('width', jQuery(this).find('> img').attr('src')) + 'x' + getQueryParams('height', jQuery(this).find('> img').attr('src')));
			});
			openPhotoSwipe( hashData.pid, galleryElements[ hashData.gid - 1 ], true, true );
		}

	};

	initPhotoSwipeFromDOM('.simple-gallery');

	/* To load video */
	var openPhotoSwipe = function() {
		var pswpElement = document.querySelectorAll('.pswp')[0];
		// build items array
		var video = [
			{
			html:"<iframe src='http://visitingmedia.com/site/courtyard-portland-city-center/' menubar='yes' resizable='yes' scrollbars='no' width='720' height='410' style='width:100%;height:100%;padding-top:30px;'></frame>"
			},
			/*{
				src: 'http://visitingmedia.com/site/courtyard-portland-city-center',
				w: 720,
				h: 410
			}*/
		];
		// define options (if needed)
		var options = {
			// history & focus options are disabled on CodePen
			history: false,
			focus: false,
			showAnimationDuration: 1,
			hideAnimationDuration: 1
		};
		var video_tour = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, video, options);
		video_tour.init();
	};
	//openPhotoSwipe();
	var links = jQuery('.video-tour>a');
	//document.querySelectorAll('.video-tour > a').onclick = openPhotoSwipe;
	//document.querySelector('#video-tour, li.video-tour > a').onclick = openPhotoSwipe;
	//document.getElementById('video-tour').onclick = openPhotoSwipe;
	//document.getElementsByClassName('video-tour').onclick = openPhotoSwipe;

	//console.log(links.length);
	for (var i = 0; i < links.length; i++) {
		var link = links[i];
		// <li> onclick, runAlert function
		link.onclick = openPhotoSwipe;
		/*link.click(function(e) {
			e.preventDefault();
			//window.open('http://visitingmedia.com/site/courtyard-portland-city-center/','','menubar=1,resizable=yes,scrollbars=0,width=720,height=410'); return false; 
			openPhotoSwipe();
			return false;
        });*/
	}

//})();
})(this);
//});

