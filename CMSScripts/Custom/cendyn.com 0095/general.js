
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
ref: https://github.com/davatron5000/FitVids.js
*/
;(function( $ ){
	'use strict';

	$.fn.fitVids = function( options ) {
		var settings = {
			customSelector: null,
			ignore: null
		};

		if(!document.getElementById('fit-vids-style')) {
			// appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
			var head = document.head || document.getElementsByTagName('head')[0];
			var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
			var div = document.createElement("div");
			div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
			head.appendChild(div.childNodes[1]);
		}

		if ( options ) {
			$.extend( settings, options );
		}

		return this.each(function(){
			var selectors = [
				'iframe[src*="player.vimeo.com"]',
				'iframe[src*="youtube.com"]',
				'iframe[src*="youtube-nocookie.com"]',
				'iframe[src*="kickstarter.com"][src*="video.html"]',
				'object',
				'embed'
			];

			if (settings.customSelector) {
				selectors.push(settings.customSelector);
			}

			var ignoreList = '.fitvidsignore';

			if(settings.ignore) {
				ignoreList = ignoreList + ', ' + settings.ignore;
			}

			var $allVideos = $(this).find(selectors.join(','));
			$allVideos = $allVideos.not('object object'); // SwfObj conflict patch
			$allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

			$allVideos.each(function(){
				var $this = $(this);
				if($this.parents(ignoreList).length > 0) {
					return; // Disable FitVids on this video.
				}
				if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
				if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width')))) {
					$this.attr('height', 9);
					$this.attr('width', 16);
				}
				var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
					width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
					aspectRatio = height / width;
				if(!$this.attr('name')){
					var videoName = 'fitvid' + $.fn.fitVids._count;
					$this.attr('name', videoName);
					$.fn.fitVids._count++;
				}
				$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
				$this.removeAttr('height').removeAttr('width');
			});
		});
	};

	// Internal counter for unique video names.
	$.fn.fitVids._count = 0;

// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

// goTo Function Section (scroll event)
(function() {
	jQuery.fn.goTo = function() {
		var target = jQuery(this);
		var top = target.offset().top;
		//var top_menu_height = jQuery('#div_menu_header').height() + 5;
		var header_height = jQuery('header').outerHeight();
		var banner_top_height = jQuery('.banner-top').outerHeight();
		var banner_area_padding_top = parseInt(jQuery('.index3-banner-area').css('padding-top'));
		var tabbing_area_padding_top = parseInt(jQuery('.index3Tabbing').css('padding-top'));

		jQuery('html, body').animate({
			scrollTop: (top - (header_height + tabbing_area_padding_top)) + 'px'
		}, 500);
		return this; // for chaining...
	}
})(jQuery);

// Fluid Width YouTube Videos
// ref: https://css-tricks.com/fluid-width-youtube-videos/
function fluidWidthYouTubeVideos(iframes) {
	// Find all YouTube videos
	//var $allVideos = $("iframe[src^='http://www.youtube.com']"),
	var $allVideos = iframes,

		// The element that is fluid width
		$fluidEl = $("body");

	// Figure out and save aspect ratio for each video
	$allVideos.each(function() {

		$(this)
			.data('aspectRatio', this.height / this.width)

			// and remove the hard coded width/height
			.removeAttr('height')
			.removeAttr('width');

	});

	// When the window is resized
	// (You'll probably want to debounce this)
	$(window).resize(function() {

		var newWidth = $fluidEl.width();

		// Resize all videos according to their own aspect ratio
		$allVideos.each(function() {

			var $el = $(this);
			$el
				.width(newWidth)
				.height(newWidth * $el.data('aspectRatio'));

		});

	// Kick off one resize to fix all videos on page load
	}).resize();
}

// cendyn function
function cendyn() {
	var ftrSocials = $('.ftrSocials');
	if ($(window).width() < 1260) {
		$('.ftrButtons').after(ftrSocials);
	}
	if ($(window).width() > 1260) {
		$('.ftrButtons').before(ftrSocials);
	}
	var hdeHght = $('header').height();
	var wHight = $(window).height() - hdeHght;
	$('.enumenu_ul').css('max-height',wHight);
}

// Set Viewport
function viewport() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return x;
}

// Video, Iframe, or etc. - Magnific Popup
function initMagnificPopup(elem, gallery) {

	// Broadmoor branding DIV
	var broadmoorLogoImg = '/getmedia/6e7d4918-cbbc-4ebe-90f9-416a9c1ee4a8/main-logo.png',
	var broadmoor_branding = '';

	jQuery(elem).magnificPopup({
		//disableOn: 700, // DO NOT SHOW ON MOBILE 700px width
		type: 'iframe',
		mainClass: 'fade-in-scale videoHeaderArea_Player',
		removalDelay: 160,
		preloader: true,
		fixedContentPos: true,
		iframe: {
			markup: '<div class="mfp-iframe-scaler">'+
					'<div title="Close (Esc)" class="mfp-close"></div>'+
					'<div class="mfp-top-bar">'+
						'<div class="mfp-title"></div>'+
					'</div>' +
					'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
					broadmoor_branding +
				'</div>',
			patterns: {
				youtube: {
					index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

					id: 'v=', // String that splits URL in a two parts, second part should be %id%
					// Or null - full URL will be returned
					// Or a function that should return %id%, for example:
					// id: function(url) { return 'parsed id'; }

					//src: '//www.youtube.com/embed/%id%?autoplay=1',
					src: '//www.youtube-nocookie.com/embed/%id%?wmode=opaque&vq=hd720&autoplay=1&rel=0&feature=oembed&autoplay=1&autohide=1&modestbranding=1&showinfo=0&theme=dark&enablejsapi=1&color=white&iv_load_policy=3&cc_load_policy=0&format=xml', // URL that will be set as a source for iframe.
				},
				vimeo: {
					index: 'vimeo.com/',
					//id: '/',
					id: function(src){
						if (src.indexOf('external') > -1) {
							return 'external/' + src.substr(src.lastIndexOf('/') + 1, src.length);
						//} else if (src.indexOf('postinteractive') > -1) {
						//	return 'postinteractive/review/' + src.substr(src.lastIndexOf('/') + 1, src.length);
						} else {
							//return 'video/' + src.substr(src.lastIndexOf('/') + 1, src.length);
							return src.substr(src.lastIndexOf('/') + 1, src.length);
						}
					},
					src: '//player.vimeo.com/video/%id%?autoplay=1&api=1',
				},
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
				},
				gmaps: {
					index: '//maps.google.',
					src: '%id%&output=embed',
				}
				// you may add here more sources
			},
			srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
		},
		callbacks: {
			markupParse: function(template, values, item) {
				//console.log('Parsing:', template);
				//console.log('Parsing:', template, values, item);
				values.title = item.el.attr('title');

				if(item.type == 'inline') {
					template.addClass('mfp-iframe-holder');
					//console.log(item);
					//console.log('is video...');
				} else {
					//console.log('normal iframe...');
				}
			},
			elementParse: function(item) {
				// Function will fire for each target element
				// "item.el" is a target DOM element (if present)
				// "item.src" is a source that you may modify
					//console.log(item.el.attr('href').split('#'));
				//url.split('#')[1]

				jQuery('.mfp-container.mfp-inline-holder').addClass('mfp-iframe-holder');
				//jQuery('.mfp-container.mfp-inline-holder').addClass('mfp-iframe-holder').append(jQuery('<div class="mfp-iframe-scaler">' + '<div class="mfp-top-bar">' + '<div class="mfp-title">' + item.el.attr('title') + '</div>' + '</div>' + broadmoor_branding + '</div>'));

				//if(item.src === undefined || item.src === null) {
				/*if(item.el.attr('href').indexOf("#") != -1) {
					var item_src_inline = item.el.attr('data-mfp-src');
					var item_src = null;
				} else {
					var item_src = (item.src.match(/[^\\\/]\.([^.\\\/]+)$/) || [null]).pop();
					var item_src_inline = null;
				}*/
				var item_src = (item.src.match(/[^\\\/]\.([^.\\\/]+)$/) || [null]).pop();
				var item_hash = item.el.attr('href').indexOf("#");
				var item_img = (item.el.find('img').attr('src') == 'undefined') ? item.el.find('img').attr('src') : item.el.parent().find('img').attr('src');
				var item_href_mobile_webm = item.el.attr('href-mobile-webm');
				var item_href_mobile_ogg = item.el.attr('href-mobile-ogg');
				var item_id = item.el.attr('title').replace(" ","-");

				//(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)

					//console.log('is_safari: '+is_safari);
					//console.log('is_chrome: '+is_chrome);
				//console.log(navigator.userAgent.indexOf('Safari'));
				//console.log(navigator.userAgent.match(/Safari/i));

				if(item_src == 'mp4' || item_src == 'mov') {
					// ref: http://codepen.io/dimsemenov/pens/popular/
					item.type = 'inline'; // video
					item.src = //'<div class="mfp-iframe-scaler">' +
						//'<div class="mfp-top-bar">' +
						//	'<div class="mfp-title">' + item.el.attr('title') + '</div>' +
						//'</div>' +

						(
							( item_src == 'mp4' && (navigator.userAgent.match(/iPad/i) === null) && !is_safari ) ?
							(
							'<div class="mfp-iframe-scaler">' +
							'<div class="mfp-top-bar">' +
							'<div class="mfp-title">' + item.el.attr('title') + '</div>' +
							'</div>' +
							//'<div id="' + item_id + '_container"></div>' +
							//'<video id="' + item_id + '" controls="true" autoplay preload="auto" data-mejsoptions=\'{"alwaysShowControls": true}\'>' +
							//'<video id="' + item_id + '" controls="controls" preload="none" poster="' + item_img + '" autoplay class="mejs-player" style="width:100%;height:100%;" width="100%" height="100%" src="' + item.src + '">' +
							'<video id="' + item_id + '" poster="' + item_img + '" preload autoplay controls style="width:100%;height:100%;" width="100%" height="100%">' +

								'<source src="' + item.src + '" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\' />' +
								(
									(item_href_mobile_webm != '') ?
									'<source src="' + item_href_mobile_webm + '" type=\'video/webm; codecs="vp8, vorbis"\' />' :
									''
								) +
								(
									(item_href_mobile_ogg != '') ?
									'<source src="' + item_href_mobile_ogg + '" type=\'video/ogg; codecs="theora, vorbis"\' />' :
									''
								) +

								'<object width="320" height="240" type="application/x-shockwave-flash" data="https://cdnjs.cloudflare.com/ajax/libs/flowplayer/5.4.6/flowplayer.swf">' +
									'<param name="movie" value="https://cdnjs.cloudflare.com/ajax/libs/flowplayer/5.4.6/flowplayer.swf" />' +
									'<param name="allowfullscreen" value="true" />' +

									'<param name="flashvars" value="config={\'clip\': { \'url\': \'' + item.src + '\', \'autoPlay\': false, \'autoBuffering\': true } }" />' +

									'<img src="' + item_img + '" width="320" height="240" title="No video playback capabilities" />' +
									'<p>Download video as <a href="' + item.src + '">MP4</a>, <a href="' + item_href_mobile_webm + '">WebM</a>, or <a href="' + item_href_mobile_ogg + '">Ogg</a>.</p>' +
								'</object>' +

							'</video>' +
							broadmoor_branding +
							'</div>'
							) :
							""
						) +
						(
							//(item_src == 'mp4' && (navigator.userAgent.match(/iPad/i) !== null) && navigator.userAgent.toLowerCase().search("android") > -1) ?
							//(item_src == 'mp4' && navigator.userAgent.toLowerCase().search("android") > -1) ?
							( item_src == 'mp4' && ( jQuery.magnificPopup.instance.isIOS ) ) ?
							(
							'<div class="mfp-iframe-scaler">' +
							'<div class="mfp-top-bar">' +
							'<div class="mfp-title">' + item.el.attr('title') + '</div>' +
							'</div>' +
							//'<video id="' + item_id + '" controls="controls" preload="none" poster="' + item_img + '" autoplay class="mejs-player" style="width:100%;height:100%;" width="100%" height="100%" src="' + item.src + '">' +
							'<div class="flowplayer" data-ratio="0.5625" data-volume="0.5">' +
							//'<a href="http://demos.flowplayer.org/basics/ios-web-app.html">Watch video!</a>' +
							//'<video preload="none" poster="' + item_img + '" id="' + item_id + '" loop controls="true" style="width:100%;height:100%;" width="100%" height="100%" src="' + item.src + '" type="video/mp4">' +
							'<video controls autoplay>' +

								//'<source type="application/x-mpegurl" src="//stream.flowplayer.org/bauhaus.m3u8">' +

								'<source src="' + item.src + '" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\' />' +
								(
									(item_href_mobile_webm != '') ?
									'<source src="' + item_href_mobile_webm + '" type=\'video/webm; codecs="vp8, vorbis"\' />' :
									''
								) +
								(
									(item_href_mobile_ogg != '') ?
									'<source src="' + item_href_mobile_ogg + '" type=\'video/ogg; codecs="theora, vorbis"\' />' :
									''
								) +
							'</video>' +
							'</div>' +
							broadmoor_branding +
							'</div>'

							//jQuery.magnificPopup.instance.st.el.src
							//item.el.html()
							) :
							""
						) +
						(
							( item_src == 'mov' || is_safari ) ?
							(
							'<div class="mfp-iframe-scaler">' +
							'<div class="mfp-top-bar">' +
							'<div class="mfp-title">' + item.el.attr('title') + '</div>' +
							'</div>' +
							'<object codebase="http://www.apple.com/qtactivex/qtplugin.cab" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B">' +
							'<param name="src" value="' + item.src + '">' +
							'<param name="autoplay" value="true" />' +
							'<embed src="' + item.src + '" autoplay="true"></embed>' +
							'</object>' +/**/
							//'<video controls autoplay src="' + item_href_mobile_ogg + '">' +
							//'</video>' +
							broadmoor_branding +
							'</div>'
							) :
							""
						);// +

						//broadmoor_branding +
					//'</div>';

					//item.markup = '<div class="white-popup"><div class="mfp-close"></div>'+
					//'<a class="mfp-userWebsite">'+
					//'<div class="mfp-userAvatarUrl"></div>'+
					//'<h2 class="mfp-username"></h2>'+
					//'</a>'+
					//'<div class="mfp-userLocation"></div>'+
					//'</div>';

					// detect if IOS
					//console.log( (navigator.userAgent.match(/iPad/i) !== null) ? "iOS" : "not iOS");
					//console.log(jQuery.magnificPopup.instance.isIOS);

				//} else if(item_src_inline != "") {
				} else if(item_hash != -1) {
					item.type = 'inline'; // video
					item.src ='<div class="">' +
						'<div class="mfp-top-bar">' +
							'<div class="mfp-title">' + item.el.attr('title') + '</div>' +
						'</div>' +

						'<div class="' + item.el.closest('div').next('.timeline-full-content').attr('class') + '">' +
							item.el.closest('div').next('.timeline-full-content').html() +
						'</div>' +
						//broadmoor_branding +
					'</div>';
				} else {
					item.type = 'iframe';
				}
			},
			open: function() {
				// Will fire when this exact popup is opened
				// this - is Magnific Popup object
				jQuery('html').addClass('magnific-popup-opened');
			},
			close: function() {
				// Will fire when popup is closed
				jQuery('html').removeClass('magnific-popup-opened');
			}
		},
		gallery: {
			enabled: gallery,
			//preload: [0,1], // Will preload 0 - before current, and 1 after the current image
			//counter: '<span class="mfp-counter">%curr% of %total%</span>'
		},
	});
}

// init sitemap
function initSiteMap() {
	//--Site Map Click Event
	//jQuery('*').click(function(e) {
	jQuery('*').live('click', function(e) {
		var target = jQuery(e.target);
		//if (target.hasClass('sitemap-toggle')) {
		if (target.closest('li').hasClass('sitemap-toggle')) {
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
}

// http://codepen.io/micahgodbolt/pen/FgqLc
// https://github.com/liabru/jquery-match-height
function equalheight(container){
	var currentTallest = 0,
		currentRowStart = 0,
		rowDivs = new Array(),
		$el,
		topPosition = 0;
	$(container).each(function() {
		$el = $(this);
		$($el).height('auto')
		topPostion = $el.position().top;
		if (currentRowStart != topPostion) {
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
			rowDivs.length = 0; // empty the array
			currentRowStart = topPostion;
			//currentTallest = $el.height();
			currentTallest = $el.outerHeight();
			rowDivs.push($el);
		} else {
			rowDivs.push($el);
			//currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
			currentTallest = (currentTallest < $el.outerHeight()) ? ($el.outerHeight()) : (currentTallest);
		}
		for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			rowDivs[currentDiv].height(currentTallest);
		}
	});
}

// START -- Overlay for Marketo Forms --
// Function for disabling main page scrolling
function disablePageScroll() {
	if (!jQuery('html').hasClass('noscroll')) {
		if (jQuery(document).height() > jQuery(window).height()) {
			var scrollTop = (jQuery('html').scrollTop()) ? jQuery('html').scrollTop() : jQuery('body').scrollTop();
			jQuery('html').addClass('noscroll').css('top',-scrollTop);
		};
	};
}

// Function for enabling main page scrolling
function enablePageScroll() {
	var scrollTop = parseInt(jQuery('html').css('top'));
	jQuery('html').removeClass('noscroll');
	jQuery('html,body').scrollTop(-scrollTop);
}

// Function for auto-centering the overlay vertically
function centerVertically() {
	jQuery('.formOverlay').css({
		'top' : '50%',
		'margin-top' : -jQuery('.formOverlay').height()/2
	});
}

// Close function
function closeOverlay() {
	enablePageScroll();
	jQuery('.formOverlayWrapper').fadeOut(500, function()
	{
		jQuery('.formOverlayWrapper').remove();
		jQuery(window).unbind('resize',centerVertically);
	});
	// Unbind click event for closing overlay
	jQuery(document).unbind('click',closeOverlayOnOutsideClick);
}

// Close on click outside of box
function closeOverlayOnOutsideClick(e) {
	if (jQuery('.formOverlayWrapper').is(':visible')) {
		var ele = jQuery(e.target);
		if (!ele.hasClass("formOverlay"))
		{
			closeOverlay();
		};
	};
}
// END -- Overlay for Marketo Forms --

// START -- UTM var passing for Marketo --
// Create Cookie
function createCookie(name,value) {
	var date = new Date();
	date.setTime(date.getTime()+(1*24*60*60*1000)); //1 day
	var expires = "; expires="+date.toGMTString();
	document.cookie = name+"="+value+expires+"; path=/";
}

// Call Cookie
//var CookieValue = readCookie();
function readCookie(name) {
	var nameEQ = name+"=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
// END -- UTM var passing for Marketo --

// get query string
function getQuery(q) {
	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}
/*
// Get Querystring
function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
*/


//$(document).ready(function() {
jQuery(function(){
	cendyn();

	// ref: http://responsive-nav.com/
	$('.contLeft ul li, .contRight .conAdd').prepend('<i></i>');
	$('.enumenu_ul').responsiveMenu({
		//onMenuopen: function() { }
		open: function() { console.log('Responisve Menu Open'); },
		close: function() { console.log('Responisve Menu Closed'); },
		//openPos: "relative",
	});

	// cloud menu
	jQuery('.submenu').each(function(){
		//console.log(jQuery(this).outerWidth());
		//console.log(jQuery(this).siblings().width());
		var subMenuWidth = jQuery(this).width();
		var dropdownMenuPaddingLeft = parseInt(jQuery(this).closest('.dropdown-menu').css('paddingLeft'));
		var dropdownMenuPaddingRight = parseInt(jQuery(this).closest('.dropdown-menu').css('paddingRight'));

		var subMenusLength = jQuery(this).closest('.dropdown-menu').find('.submenu').length;
		var dropdownMenuWidth = subMenuWidth * subMenusLength;

		//var dropdownMenuColumnMarginRight = parseInt(jQuery(this).css('marginRight')) * (subMenusLength - 1);
		var dropdownMenuColumnMarginRight = ( dropdownMenuWidth * parseInt(jQuery(this).css('marginRight'))/100) * (subMenusLength - 1);

		//var finalDropdownMenuWidth = dropdownMenuWidth + dropdownMenuPaddingLeft + dropdownMenuPaddingRight + dropdownMenuColumnMarginRight + 10;
		//var finalDropdownMenuWidth = dropdownMenuWidth + 190;
		var finalDropdownMenuWidth = dropdownMenuWidth + dropdownMenuPaddingLeft + dropdownMenuPaddingRight + ((subMenusLength != 1) ? 80 : "");

		//console.log(subMenusLength);
		//console.log(jQuery(this).outerWidth());
		//console.log(dropdownMenuWidth);
		//console.log(dropdownMenuPaddingLeft);
		//console.log(dropdownMenuPaddingRight);

		//console.log(parseInt(jQuery(this).css('marginRight')));
		//console.log(dropdownMenuWidth*(parseInt(jQuery(this).css('marginRight'))/100));
		//console.log('dropdownMenuColumnMarginRight:'+dropdownMenuColumnMarginRight);
		//console.log(dropdownMenuWidth*(dropdownMenuColumnMarginRight/100));

		jQuery(this).closest('.dropdown-menu').width(finalDropdownMenuWidth);
	});

	//3 services clone for mobile accordine
	var servicesBoxesToBeCloned = $('.serviceIpadSlider');
	var servicesBoxes = servicesBoxesToBeCloned.find('.servicesBoxInner').clone();
	$('.index1 .serviceIpadSlider').after("<div class='mobiileACC " + servicesBoxesToBeCloned.data("cloned") + "'></div>");
	$('.mobiileACC').prepend(servicesBoxes);
	$('.mobiileACC .scrTitleMain').click(function() {
		if ($(this).hasClass('titActive')) {
			$(this).next().slideUp();
			$(this).removeClass('titActive');
		} else {
			$('.mobiileACC .scrTitleMain').removeClass('titActive');
			$(this).addClass('titActive');
			$('.mobiileACC .secContn').slideUp();
			$(this).next().slideDown();
		}
	});

	// click event on main title area
	$('.scrTitleMain').bind('click',function(){
		var self = this;
		var header_height = jQuery('header').outerHeight();
		var banner_top_height = jQuery('.banner-top').outerHeight();
		setTimeout(function() {
			theOffset = $(self).offset();
			//$('body,html').animate({ scrollTop: theOffset.top - 0 });
			$('body,html').animate({ scrollTop: theOffset.top - (header_height + banner_top_height) });
		}, 700); // ensure the collapse animation is done
	});

	//bottom Scale slider mobile code
	var perpleBox = $('.perpleBox').clone();
	$('.perpleBox').after("<div class='mobileperpleBox'></div>");
	$('.mobileperpleBox').prepend(perpleBox);

	$(".mobileperpleBox .perpleBox").slick({
		infinite: true,
		speed: 1000,
		autoplay: true,
		dots: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1
	});


	// #############################################################

	//index1 main banner
	var bannerMainNormal = $(".normal-caption .bannerMain");

	// init normal main banner
	bannerMainNormal.slick({
		infinite: true,
		speed: 1500,
		autoplay: true,
		dots: true,
		appendArrows: $(".sliderBlt"),
		appendDots: $(".sliderBlt"),
		fade: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	//index1 main banner
	var bannerMainFullWidth = $(".full-width-caption .bannerMain");
	// init full width main banner
	bannerMainFullWidth.slick({
		infinite: true,
		speed: 1500,
		autoplay: true,
		autoplaySpeed: 6000,
		pauseOnHover: false,
		dots: false,
		//lazyLoad: 'ondemand',
		appendArrows: $(".sliderBlt"),
		//appendDots: $(".sliderBlt"),
		fade: true,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,

		mobileFirst: 1
	}).on('beforeChange', function(event, slick, currentSlide){
		console.log('##########################################');
		console.log('beforeChange - currentSlide: ', currentSlide);

		//
		var currentVideoSlide = $(slick.$slides[currentSlide]);
		var currentVideoSlideClass = currentVideoSlide.attr('class').split(" ")[2];
		var currentVideoSlideIframe = currentVideoSlide.find('iframe');
		var currentVideoSlideIframeSrc = currentVideoSlideIframe.attr('src');

		// stop all videos w/in homepage slider
		//stopVideo();
		// play BTN for video - hide video and show captions w/ video CTA
		playBTNForVideo(currentVideoSlide.find('.bnrVideoLink > a'), 0);

		//
		console.log('Does iframe exist?: ',currentVideoSlideIframe.length);
		console.log('Iframe SRC before:',currentVideoSlideIframe.attr('src'));
		if(currentVideoSlideIframe.length){
			currentVideoSlideIframe.attr('src', currentVideoSlideIframeSrc.replace("autoplay=1", "autoplay=0"));
		}
		console.log('Iframe SRC after:',currentVideoSlideIframe.attr('src'));
	}).on('afterChange', function(event, slick, currentSlide){
		console.log('##########################################');
		console.log('afterChange - currentSlide: ', currentSlide);

		//
		var currentVideoSlide = $(slick.$slides[currentSlide]);
		var currentVideoSlideClass = currentVideoSlide.attr('class').split(" ")[2];
		var currentVideoSlideIframe = currentVideoSlide.find('iframe');
		var currentVideoSlideIframeSrc = currentVideoSlideIframe.attr('src');

		//
		console.log('Does iframe exist?: ',currentVideoSlideIframe.length);
		console.log('Iframe SRC before:',currentVideoSlideIframe.attr('src'));

		console.log('opacity:',currentVideoSlideIframe.css('opacity'));

		if(currentVideoSlideIframe.length && currentVideoSlideIframe.css('opacity') === 0){
			//console.log(currentVideoSlideClass);

			if (currentVideoSlideClass == "youtube" || currentVideoSlideClass == "vimeo"){
				var time = printVideoDuration(currentVideoSlide.find('iframe'), currentVideoSlideClass);
				//console.log('in the afterChange:',time);
				bannerMainFullWidth.slick('slickPause');

				// ref: http://jsfiddle.net/dkj3hrqk/1/
				// https://stackoverflow.com/questions/31546510/pause-and-resume-slick-slider-once-video-finishes
				setTimeout(function(){
					console.log('currentSlide:', currentSlide);
					bannerMainFullWidth.slick('slickPlay');
				}, time + 1000);
				//bannerMainFullWidth.slick("setOption", "autoplaySpeed", time);
				//currentVideoSlideIframe.attr('src', currentVideoSlideIframeSrc.replace("autoplay=0", "autoplay=1"));
			} else {
				//console.log(currentVideoSlideIframe.attr('src'));
				//currentVideoSlideIframe.attr('src', currentVideoSlideIframeSrc.replace("autoplay=1", "autoplay=0"));
				bannerMainFullWidth.slick("setOption", "autoplaySpeed", 600);
				bannerMainFullWidth.slick('slickPlay');
			}
		}
		console.log('Iframe SRC after:',currentVideoSlideIframe.attr('src'));
	});

	// full width videos
	//fluidWidthYouTubeVideos(bannerMainFullWidth.find('.slide iframe'));
	var currentVideoSlideIframe = bannerMainFullWidth.find('.slick-current iframe');
	// If 1st slide is VIDEO
	if(currentVideoSlideIframe.length){
		console.log('##########################################');
		console.log('init');
		var currentVideoSlideIframeSrc = currentVideoSlideIframe.attr('src');
		// For 1st VIDEO
		var currentVideoSlideClass = bannerMainFullWidth.find('.slick-current').attr('class').split(" ")[2];

		//
		console.log('Does iframe exist?: ',currentVideoSlideIframe.length);
		console.log('Iframe SRC before:',currentVideoSlideIframe.attr('src'));
		if(bannerMainFullWidth.find('.slick-slide').first().hasClass('video')){
			var time = printVideoDuration(bannerMainFullWidth.find('.slick-current iframe'), currentVideoSlideClass);

			//console.log('if 1st slide w/ video:',time);
			bannerMainFullWidth.slick('slickPause');

			// ref: http://jsfiddle.net/dkj3hrqk/1/
			// https://stackoverflow.com/questions/31546510/pause-and-resume-slick-slider-once-video-finishes
			setTimeout(function(){
				bannerMainFullWidth.slick('slickPlay');
			}, time + 1000);
			//bannerMainFullWidth.slick("setOption", "autoplaySpeed", time);
			//currentVideoSlideIframe.attr('src', currentVideoSlideIframeSrc.replace("autoplay=0", "autoplay=1"));
			///////////////////////////////
		} else {
			//currentVideoSlideIframe.attr('src', currentVideoSlideIframeSrc.replace("autoplay=1", "autoplay=0"));
			//stopVideo();
			bannerMainFullWidth.slick('slickPlay');
		}
		console.log('Iframe SRC after:',currentVideoSlideIframe.attr('src'));
	}

	// do some click event
	jQuery('.slide.video .bnrVideoLink > a').click(function(){
		//
		playBTNForVideo(jQuery(this), 1);
		//
		var currentVideoSlide = jQuery(this).closest('.slide.slick-current');
		var currentVideoSlideIframe = currentVideoSlide.find('iframe');
		var currentVideoSlideIframeSrc = currentVideoSlideIframe.attr('src');
		//currentVideoSlideIframe.attr('src', currentVideoSlideIframeSrc.replace("autoplay=0", "autoplay=1").replace("&background=1&mute=0", "&background=0&mute=1"));
		currentVideoSlideIframe.attr('src', currentVideoSlideIframeSrc.replace("autoplay=0", "autoplay=1"));
	});

	// do some click event
	//bannerMainFullWidth.find('.slick-arrow').live('click', function(e){
	/*bannerMainFullWidth.find('.slick-arrow').on('click', function(e){
		var slideIndex = jQuery(this).data('slide-index');
		//bannerMainFullWidth.slickGoTo(slideIndex);
		console.log('length: ' + bannerMainFullWidth.find('iframe').length);
		jQuery('iframe').attr('src', jQuery('iframe').attr('src'));
		//if(bannerMainFullWidth.find('iframe').length){
		bannerMainFullWidth.find('iframe').attr('src', bannerMainFullWidth.find('iframe').attr('src') + "autoplay=0");
		//}
	});*/

	/**
	 * Stop an iframe or HTML5 <video> from playing
	 * @param  {Element} element The element that contains the video
	 */
	function stopVideo() {
		var element = document;
		var iframe = element.querySelector( 'iframe');
		var video = element.querySelector( 'video' );
		if ( iframe ) {
			//var iframeSrc = iframe.src;
			//iframe.src = iframeSrc;
			/*element.find( 'iframe').contents().find('video').each(function () {
				this.currentTime = 0;
				this.pause();
			});*/
		}
		if ( video ) {
			video.pause();
		}
	}
	// play BTN for video
	function playBTNForVideo(playBTN, toggle) {
		var slide = playBTN.closest('.slide');
		if(slide.length){
			if(toggle === 1){
				slide.find('.fluid-width-video-wrapper').css('opacity', 1);
				slide.find('.fluid-width-video-wrapper').css('z-index', 1);
				//slide.find('.fluid-width-video-wrapper').css('z-index', -1);
				slide.find('.container').css('opacity', 0);
				slide.find('.container').css('z-index', 0);
				//slide.find('.container').css('z-index', 1);
			}
			if(toggle === 0){
				slide.find('.fluid-width-video-wrapper').css('opacity', 0);
				slide.find('.fluid-width-video-wrapper').css('z-index', -1);
				slide.find('.container').css('opacity', 1);
				slide.find('.container').css('z-index', 1);
			}
			console.log('slide.find(.fluid-width-video-wrapper).css(opacity): ',slide.find('.fluid-width-video-wrapper').css('opacity'));
			console.log('slide.find(.fluid-width-video-wrapper).css(z-index): ',slide.find('.fluid-width-video-wrapper').css('z-index'));
			console.log('slide.find(.container).css(opacity):',slide.find('.container').css('opacity'));
			console.log('slide.find(.container).css(z-index): ',slide.find('.container').css('z-index'));
		}
	}
	// print video duration
	function printVideoDuration(iframe, type){
		// init duration var
		var duration;
		// youtube
		// ref: https://stackoverflow.com/questions/2086260/youtube-player-api-how-to-get-duration-of-a-loaded-cued-video-without-playing-i
		if(type == "youtube"){
			var ifr = iframe;
			var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
			var match = ifr.attr('src').match(regExp);  // get youtube video id
			if (match && match[2].length == 11) {
				var youtubeUrl = "https://www.googleapis.com/youtube/v3/videos?id=" + match[2] + "&key=AIzaSyDYwPzLevXauI-kTSVXTLroLyHEONuF9Rw&part=snippet,contentDetails";
				$.ajax({
					async: false,
					type: 'GET',
					url: youtubeUrl,
					success: function(data) {
						var youtube_time = data.items[0].contentDetails.duration;
						duration = covtime(youtube_time);
					}
				});
			}
		}
		// vimeo
		// ref: https://developer.vimeo.com/apis/oembed
		// http://jsfiddle.net/lmcculley/M3w8p/
		// https://stackoverflow.com/questions/4709601/get-vimeo-thumbnail-for-video-using-jquery
		if(type == "vimeo") {
			var videoObj = parseVideo(iframe.attr('src'));
			var videoObjID = videoObj.id;
			var vimeoUrl = 'https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/' + videoObjID;
			$.ajax({
				async: false,
				type: 'GET',
				url: vimeoUrl,
				success: function(data) {
					var vimeo_time = data.duration;
					duration = vimeo_time;
				}
			});
		}

		//
		//console.log(typeof(duration));
		//console.log(type, duration);
		var regex = /[(:)]+/igm;
		//console.log(regex.test(duration));
		if(type == "youtube"){
			if(regex.test(duration)){
				//console.log('0:',parseInt(duration.split(":")[0]));
				//console.log('0*60:',parseInt(duration.split(":")[0]) * 60);
				//console.log('1:',parseInt(duration.split(":")[1]));
				duration = ( (parseInt(duration.split(":")[0]) * 60) + parseInt(duration.split(":")[1]) );
				//console.log('0+1:',duration);
			}
		}
		duration = duration * 1000;
		//parseInt(duration);
		//console.log(typeof(duration));
		//console.log('secs:', duration );
		return duration;
	}
	// convert ISO 8601 duration - YouTube ONLY
	function covtime(youtube_time){
		array = youtube_time.match(/(\d+)(?=[MHS])/ig)||[];
		var formatted = array.map(function(item){
		if(item.length<2) return '0'+item;
			return item;
		}).join(':');
		return formatted;
	}
	// parse URL
	// ref: https://gist.github.com/yangshun/9892961
	// https://stackoverflow.com/questions/5612602/improving-regex-for-parsing-youtube-vimeo-urls
	function parseVideo (url) {
		// - Supported YouTube URL formats:
		//   - http://www.youtube.com/watch?v=My2FRPA3Gf8
		//   - http://youtu.be/My2FRPA3Gf8
		//   - https://youtube.googleapis.com/v/My2FRPA3Gf8
		// - Supported Vimeo URL formats:
		//   - http://vimeo.com/25451551
		//   - http://player.vimeo.com/video/25451551
		// - Also supports relative URLs:
		//   - //player.vimeo.com/video/25451551

		url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

		if (RegExp.$3.indexOf('youtu') > -1) {
			var type = 'youtube';
		} else if (RegExp.$3.indexOf('vimeo') > -1) {
			var type = 'vimeo';
		}

		return {
			type: type,
			id: RegExp.$6//,
			//duration: duration
		};
	}

	// #############################################################


	//How We Can  mobile slider
	var howConSlider = $(".howConSlider");
	howConSlider.slick({
		infinite: true,
		speed: 1000,
		autoplay: true,
		dots: false,
		arrows: true,
		slidesToShow: 1,
		// adaptiveHeight: true,
		slidesToScroll: 1
	});

	// 3 services box ipad slider
	var ipadSlider = $(".serviceIpadSlider .servicesBoxInner");
	ipadSlider.slick({
		infinite: true,
		speed: 1000,
		autoplay: true,
		dots: false,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,

		respondTo: 'slider',
		useTransform: false
	});

	// adjust width and resize - 3 services box ipad slider
	jQuery('.serviceIpadSlider .slick-slider .slick-list .slick-slide')
	.addClass('full-width')
	.css('max-width', jQuery('.serviceIpadSlider .slick-slider .slick-list').width());
	jQuery(window).resize(function() {
		jQuery('.serviceIpadSlider .slick-slider .slick-list .slick-slide')
		.addClass('full-width')
		.css('max-width',jQuery('.serviceIpadSlider .slick-slider .slick-list').width());
	});

	// adjust width and resize - How We Can
	jQuery('.howConSlider.slick-slider .slick-list .slick-slide')
	.addClass('full-width')
	.css('max-width', jQuery('.howConSlider.slick-slider .slick-list').width());
	jQuery(window).resize(function() {
		jQuery('.howConSlider.slick-slider .slick-list .slick-slide')
		.addClass('full-width')
		.css('max-width',jQuery('.howConSlider.slick-slider .slick-list').width());
	});
	/*if(viewport() <= 768){
		if(ipadSlider.hasClass('slick-initialized')) {
			ipadSlider.unslick();
		}
		ipadSlider.slick({
			infinite: true,
			speed: 1000,
			autoplay: true,
			dots: false,
			arrows: true,
			slidesToShow: 1,
			slidesToScroll: 1,

			respondTo: 'slider',
			//mobileFirst: true,
			useTransform: false,
		});
	} else {
		if(ipadSlider.hasClass('slick-initialized')) {
			ipadSlider.unslick();
		}
	}*/

	//index3 main banner ipad slider
	$(".index3mobileSlide .index3bnrTxt").slick({
		infinite: true,
		speed: 1000,
		autoplay: true,
		dots: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1
	});
	//index4 bottom chart slider
	$(".ChartSlider").slick({
		infinite: true,
		speed: 1000,
		autoplay: true,
		dots: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	// Main/Product image slider for product page
	$('.proBig').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		arrows: false,
		fade: true,
		speed: 1000,
		lazyLoad: 'ondemand',
		asNavFor: '.proSmall'
	});
	// Thumbnail/alternates slider for product page
	$('.proSmall').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		infinite: false,
		centerPadding: '0px',
		asNavFor: '.proBig',
		dots: false,
		arrows: true,
		draggable: false,
		speed: 1000,
		focusOnSelect: true,
		responsive: [{breakpoint: 1200,settings: {slidesToShow: 3,slidesToScroll: 1}},
		{breakpoint: 600,settings: {slidesToShow: 2,slidesToScroll: 1}}]
	});

	$('.i4-mslider').slick({
		dots: false,
		infinite: true,
		speed: 500,
		fade: false,
		cssEase: 'linear'
	});

	/*$('#tabs-1 .tabCont').hide();
	$("#tabs-1 .tabMenu a").click(function(event) {
		event.preventDefault();
		$(this).parent().addClass("current");
		$(this).parent().siblings().removeClass("current");
		var tab = $(this).attr("href");
		$("#tabs-1 .tabCont").not(tab).css("display", "none");
		$(tab).fadeIn();
	}).filter(':first').click();

	$('#tabs-2 .tabCont').hide();
	$("#tabs-2 .tabMenu a").click(function(event) {
		event.preventDefault();
		$(this).parent().addClass("current");
		$(this).parent().siblings().removeClass("current");
		var tab = $(this).attr("href");
		$("#tabs-2 .tabCont").not(tab).css("display", "none");
		$(tab).fadeIn();
	}).filter(':first').click();

	$('#tabs-3 .tabCont').hide();
	$("#tabs-3 .tabMenu a").click(function(event) {
		event.preventDefault();
		$(this).parent().addClass("current");
		$(this).parent().siblings().removeClass("current");
		var tab = $(this).attr("href");
		$("#tabs-3 .tabCont").not(tab).css("display", "none");
		$(tab).fadeIn();
	}).filter(':first').click();*/

	// solutions tabs
	$('.index3Tabbing .tabCont').hide();
	$(".index3Tabbing").find(".tabMenu").each(function() {
		$(this).find("li > a").click(function(event) {
			event.preventDefault();
			$(this).parent().addClass("current");
			$(this).parent().siblings().removeClass("current");
			var tab = $(this).attr("href");
			$(this).closest(".mainTab").find(".tabCont").not(tab).css("display", "none");
			$(tab).fadeIn();
		}).filter(':first').click();
	});

	// image to background code
	//$(".bannerMain .slide > img.bannerImg, .banner-i2 > img.banner2, .index3-banner-area > img, .index4-banner-area > img").each(function(i, elem) {
	$(".banner-i2 > img.banner2, .index3-banner-area > img, .index4-banner-area > img").each(function(i, elem) {
		var img = $(elem);
		$(this).hide();
		$(this).parent().css({
			"background-image": "url(" + img.attr("src") + ")",
			//background: "url(" + img.attr("src") + ") no-repeat center center",
		});
	});

	// init magnific popup
	//initMagnificPopup('.bnrCTALink > a', false);
	if(getQuery('mock') !== 'true' ) {
		initMagnificPopup('.bnrVideoLink > a', false);
	}
	initMagnificPopup('.servicesBoxInner .srcImg > a', false);
	//initMagnificPopup('.video-gallery-popup', true);

	// disable link
	jQuery('.disable-link > a').click(function(e){
		e.preventDefault();
		if(viewport() < 992){
			jQuery(this).prev('.arrow').click();
		}
	});

	// smooth scrolling onload
	var url = document.URL, idx = url.indexOf("#") ;
	var hash = idx != -1 ? url.substring(idx+1) : "";
	jQuery(window).load(function(){
		// Remove the # from the hash, as different browsers may or may not include it
		var anchor_to_scroll_to = location.hash.replace('#','');
		//console.log('hash',hash);
		//console.log('anchor_to_scroll_to',anchor_to_scroll_to);
		if(anchor_to_scroll_to != '') {
			anchor_to_scroll_to = '#' + anchor_to_scroll_to ;
			jQuery(anchor_to_scroll_to).goTo();
		}
	});
	// smooth scrolling onclick
	//jQuery('ul:not(.enumenu_ul) a[href*=#]:not([href=#]), ul:not(.tabMenu) a[href*=#]:not([href=#])').click(function() {
	jQuery('.dropdown-menu .submenu li a[href*=#]:not([href=#])').click(function(e) {
		//e.preventDefault();

		var target = jQuery(this.hash);
		var anchor_to_scroll_to = this.hash.slice(1);
		//console.log('anchor_to_scroll_to',anchor_to_scroll_to);
		target = target.length ? target : jQuery('[id=' + this.hash.slice(1) +']');
		if (target.length) {
			jQuery('#' + anchor_to_scroll_to).goTo();
		}

		//console.log(window.location.href.split('#')[0].replace(/^.*\/\/[^\/]+/, ''));
		//console.log(jQuery(this).attr('href').split('#')[0].replace(/^.*\/\/[^\/]+/, '').replace('/solutions', ''));
		if(window.location.href.split('#')[0].replace(/^.*\/\/[^\/]+/, '') == jQuery(this).attr('href').split('#')[0].replace(/^.*\/\/[^\/]+/, '').replace('/solutions', '')) {
			return false;
		}
	});

	// add ".add-padding-for-top-bar-title" class to "#wrapper" if #subnav exist
	if(jQuery('#subnav').length) {
		jQuery('#wrapper').addClass('add-padding-for-top-bar-title subnav-exist');
	}

	// init equalheight function for ".company .infocard"
	//var divs = jQuery(".company .equal");
	//equalheight(divs);
	// init equalheight function for ".company .locallogo"
	//var logodivs = jQuery(".company .locallogo");
	//equalheight(logodivs);

	// init sitemap
	initSiteMap();

	// Open overlay
	jQuery('a.openOverlay, li.openOverlay > a').live('click',function(e) {
		var overlay = jQuery('<div class="formOverlayWrapper"><div class="formOverlay"><div class="formOverlayClose"><i class="fa fa-times"></i></div><div class="formOverlayContent" /></div></div>'),
			href = jQuery(this).attr('href'),
			iframe = "<iframe src='" + href + "' allowtransparency='yes' frameborder='0' scrolling='yes' width='100%'></iframe>";
		e.preventDefault();
		disablePageScroll();
		// Create overlay div and fill with iframe content, then fade in
		jQuery('body').append(overlay);
		overlay.find('.formOverlayContent').html(iframe);
		overlay.fadeIn(500);
		centerVertically();
		jQuery(window).bind('resize',centerVertically);
		// Bind click event for closing overlay
		jQuery(document).bind('click',closeOverlayOnOutsideClick);
	});
	// Close on click
	jQuery('.formOverlayWrapper .close').live('click',function(e) {
		e.preventDefault();
		closeOverlay();
	});

	// News functionaility
	//console.log("News is running");
	var size_li = jQuery("#pressWrapper li").size(),
		x = 6, y = 6;
	jQuery('#pressWrapper li').hide();
	jQuery('#pressWrapper li:lt(' + x + ')').show();
	//console.log(size_li);
	//console.log(jQuery('#pressWrapper li:lt(' + x + ')').length);
	jQuery('#loadMore').click(function (e) {
		e.preventDefault();
		x= (x+y <= size_li) ? x+y : size_li;
		var $this = jQuery(this);
		$this.addClass('loading');
		setTimeout(function(){
			jQuery('#pressWrapper li:lt(' + x + ')').show();
			$this.removeClass('loading');
			if(x == size_li){
				$this.hide();
			}
		}, 1500);
	});

	// Blog Essentials - add class to div
	jQuery( ".wrapper.cms-blogpost" ).addClass( "index2" );
	// add ".add-padding-for-top-bar-title" class to "#wrapper" if #subnav exist
	if(jQuery('.banner-top').length) {
		jQuery('#wrapper.cms-blogpost').addClass('add-padding-for-top-bar-title');
	}
	/*
	var blogcount = jQuery(".blogPost").length;
	console.log(blogcount);
	jQuery(".blogPost:gt(4)").hide();
	jQuery(".showAllArticle").click(function(e){
		//e.preventDefault();
		//console.log("you click me");
		jQuery(".blogPost").show();
		//console.log(jQuery(".blogPost:visible").length);
		//console.log(blogcount);
		jQuery(this).hide(); // hide "load more" button
		return false;
	});
	*/

	// Generate cookie if UTM vars exist in URL
	if (getQuery('utm_source') !== null) { createCookie('utm_source',getQuery('utm_source')); }
	if (getQuery('utm_medium') !== null) { createCookie('utm_medium',getQuery('utm_medium')); }
	if (getQuery('utm_campaign') !== null) { createCookie('utm_campaign',getQuery('utm_campaign')); }

	// If cookie is saved and Marketo form exists, plug vars into URL
	var iframeMarketo = jQuery('.midd-container iframe');
	if(iframeMarketo.length) {
		iframeMarketo.each(function() {
			var url = jQuery(this).attr('src'),
				utm_source = readCookie('utm_source'),
				utm_medium = readCookie('utm_medium'),
				utm_campaign = readCookie('utm_campaign');

			if ((url.indexOf('pages.cendyn.com') > -1) && (readCookie('utm_source') !== null)) {
				var newUrl = url + "?utm_source=" + utm_source + "&utm_medium=" + utm_medium + "&utm_campaign=" + utm_campaign;
				//console.log('New URL is - ' + newUrl);
				jQuery(this).attr('src',newUrl);
			}
		});
	}

	// iframe, object, etc adjustments
	/*
	references:
	https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php
	https://benmarshall.me/responsive-iframes/
	http://sproutvideo.com/blog/how-to-make-your-videos-responsive.html
	https://www.thewebflash.com/responsive-embed-youtube-videos/
	*/
	// Target your .container, .wrapper, .post, etc.
	jQuery("#wrapper .midd-container").fitVids();


	// TEMP - USE FOR THE PURPOSE TO LOAD MOCK FILES ONLY!!!!!
	//THIS COMMENT OUT ON 10/26/16 TO GO LIVE
	if(getQuery('mock') == 'true' ) {
		console.log("this is the mock");
		jQuery('#wrapper a').each(function(index, value){
			//console.log(jQuery(this).attr('href',jQuery(this).attr('href') + '?mock=true'));
			jQuery(this).attr('href',jQuery(this).attr('href') + '?mock=true');
		});
	}
});
jQuery(window).load(function() {
	if(getQuery('mock') != 'true' ) {
		// preloader
		//jQuery(".wrapper").css('opacity', '1');
		//jQuery("#loader").css('opacity', '0');
	} else {
		jQuery(".bannerMain").css('opacity', '1');
		//jQuery(".bannerMain, .bannerMain iframe").css('opacity', '1');
	}

	// set equal heights
	//equalheight('#equalHeight1 .secContn, #equalHeight2 .secContn');
	equalheight('#equalHeight1 .secContn');
	equalheight('#equalHeight2 .secContn');
	equalheight('.index4 .i4-slider li span');

	// init equalheight function for ".company .infocard"
	equalheight('.company .equal');
});
jQuery(window).resize(function() {
	cendyn();
	setTimeout(function(){
		//equalheight('#equalHeight1 .secContn, #equalHeight2 .secContn');
		equalheight('#equalHeight1 .secContn');
		equalheight('#equalHeight2 .secContn');
	}, 250);
	equalheight('.index4 .i4-slider li span');

	// init equalheight function for ".company .infocard"
	equalheight('.company .equal');
});
