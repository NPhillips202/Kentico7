

//--Overlay for Marketo Forms
// Function for disabling main page scrolling
var disablePageScroll = function() {
	if (!jQuery('html').hasClass('noscroll')) {
	    if (jQuery(document).height() > jQuery(window).height()) {
	       var scrollTop = (jQuery('html').scrollTop()) ? jQuery('html').scrollTop() : jQuery('body').scrollTop();
	       jQuery('html').addClass('noscroll').css('top',-scrollTop);
	    };
	};
};

// get query string
var getQuery = function(q) {
	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
};

// Function for enabling main page scrolling
var enablePageScroll = function() {
	var scrollTop = parseInt(jQuery('html').css('top'));
	jQuery('html').removeClass('noscroll');
	jQuery('html,body').scrollTop(-scrollTop);
};

// Function for auto-centering the overlay vertically
var centerVertically = function() {
	jQuery('.formOverlay').css({
		'top' : '50%',
		'margin-top' : -jQuery('.formOverlay').height()/2
	});
};

// Close function
var closeOverlay = function() {
	enablePageScroll();
	jQuery('.formOverlayWrapper').fadeOut(500, function()
	{
		jQuery('.formOverlayWrapper').remove();
		jQuery(window).unbind('resize',centerVertically);
	});
	// Unbind click event for closing overlay
	jQuery(document).unbind('click',closeOverlayOnOutsideClick);
};

// Close on click outside of box
var closeOverlayOnOutsideClick = function(e) {
	if (jQuery('.formOverlayWrapper').is(':visible')) {
		var ele = jQuery(e.target);
		if (!ele.hasClass("formOverlay"))
		{
			closeOverlay();
		};
	};
};

// init sitemap
var initSiteMap = function() {
	//--Site Map Position
	var sitemap_link = jQuery('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
	//jQuery('.footerNav .footerNavCol:last-of-type').find('ul li:last-of-type').after(sitemap_link);
	jQuery('footer .footer-right .footer-menu').find('ul li:first-of-type').before(sitemap_link);
	//--Site Map Click Event
	//jQuery('*').click(function(e) {
	jQuery('*').live('click', function(e) {
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
	/*jQuery(".sitemap-toggle").live('click',function(e) {
		e.preventDefault();
		if (jQuery('.sitemap-float').is(':visible')) {
			jQuery(".sitemap-float").fadeOut(500);
		} else {
			jQuery(".sitemap-float").fadeIn(500);
		}
	});
	jQuery('.sitemap-content li').each(function() {
		jQuery(this).find( "a:contains('Bali'), a:contains('Jakarta')" ).closest('li').addClass( 'sitemap-label' );
	});*/
};

// Submit functions
var submitEmailForm = function(input, value) {
	var email = input.val();
	if (email == value || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
		alert("Please enter a valid email address.");
		//form.find('.emailSignUp').focus();
		input.css( "border", "1px solid red" ).focus();
		return false;
	}
	document.location.href = ('/email-signup/?em=' + email ' );
};
// init email form events
var initEmailFormEvents = function(){
	var emailForm = jQuery('.sign-up-section').find('.form').find('> .feild'),
		//emailInput = emailForm.children('.emailInput'),
		emailInput = emailForm.children('[type="text"]'),
		emailSubmit = emailForm.children('[type="submit"]'),
		defaultValue = emailForm.children('[type="text"]').val();

	//console.log(jQuery('.sign-up-section').find('.form').find('> .feild').length);
	/*
	// Clear text in field when focused
	emailForm.find('.emailSignUp').focus(function() {
		if (jQuery(this).val() === defaultValue) {
			jQuery(this).val('');
		}
	});
	emailForm.find('.emailSignUp').blur(function() {
		if (jQuery(this).val() === '') {
			jQuery(this).val(defaultValue);
		}
	});
	// Email Form Submit
	emailForm.find('.emailSignUp').focus(function() {
		jQuery(document.body).delegate('input:text', 'keypress', function(e) {
			if (e.which === 13) {
				e.preventDefault();
				submitEmailForm(emailForm, defaultValue);
			}
		});
	});
	*/
	// Clear text in field when focused
	emailForm.find('[type="text"]').on('focus blur', function(e){
		if (e.type === 'focus'){
			//alert(e.type);
			if (jQuery(this).val() == defaultValue) {
				jQuery(this).val('');
			}
			jQuery(document.body).delegate('input:text', 'keypress', function(e) {
				if (e.which === 13) {
					e.preventDefault();
					emailInput = jQuery(this);
					submitEmailForm(emailInput, defaultValue);
					//submitEmailForm();
				}
			});
		} else if (e.type === 'blur'){
			//alert(e.type);
			if (jQuery(this).val() === '') {
				jQuery(this).val(defaultValue);
			}
		}
	});
	emailSubmit.click(function(e) {
		e.preventDefault();
		emailInput = jQuery(this).prev();
		submitEmailForm(emailInput, defaultValue);
	});
	// Form On Focus //
	/*var el = jQuery('input[type=text], textarea');
	el.focus(function(e) {
		if (e.target.value === e.target.defaultValue)
			e.target.value = '';
	});
	el.blur(function(e) {
		if (e.target.value === '')
			e.target.value = e.target.defaultValue;
	});*/
};

/*
Thanks to CSS Tricks for pointing out this bit of jQuery
http://css-tricks.com/equal-height-blocks-in-rows/
http://codepen.io/micahgodbolt/pen/FgqLc
It's been modified into a function called at page load
and then each time the page is resized. One large modification
was to remove the set height before each new calculation.
*/
var setConformingHeight = function(el, newHeight) {
	//console.log('actual: '+el.data("originalHeight"));
	// set the height to something new, but remember the original height in case things change
	el.data("originalHeight", (el.data("originalHeight") == undefined) ? (el.height()) : (el.data("originalHeight")));
	el.height(newHeight);
};
var getOriginalHeight = function(el) {
	// if the height has changed, send the originalHeight
	return (el.data("originalHeight") == undefined) ? (el.height()) : (el.data("originalHeight"));
};
var equalHeight = function(container) {
	var currentTallest = 0,
		currentRowStart = 0,
		//rowDivs = new Array(),
		rowDivs = [],
		$el,
		topPosition = 0;
	// find the tallest DIV in the row, and set the heights of all of the DIVs to match it.
	jQuery(container).each(function(ind) {
		$el = jQuery(this);
		jQuery($el).height('auto');
		//topPostion = ($el.position().top == 0) ? $el.parent().position().top : $el.position().top;
		topPostion = ($el.offset().top === 0) ? $el.parent().offset().top : $el.offset().top;

			//console.log('------------------------');
			//console.log('#' + ind);
			//console.log('rowDivs: ' + rowDivs.length);
			//console.log('currentRowStart: ' + currentRowStart);
		//console.log('OLE topPostion: ' + $el.offset().top);
			//console.log('#########################');
			//console.log('topPostion: ' + topPostion);
			//console.log('Parent topPostion: ' + $el.parent().offset().top);
			//console.log('Element topPostion: ' + $el.offset().top);
		//console.log('#########################');
		if (currentRowStart !== topPostion) {
				//console.log('###### Set NEW height #######');
			// we just came to a new row.  Set all the heights on the completed row
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				//console.log('currentDiv: ' + currentDiv);
				setConformingHeight(rowDivs[currentDiv], currentTallest);
				//rowDivs[currentDiv].height(currentTallest);
			}
			// set the variables for the new row
			rowDivs.length = 0; // empty the array
			currentRowStart = topPostion;
			currentTallest = $el.height();
			rowDivs.push($el);

				//console.log('currentRowStart !== topPostion: ' + currentTallest);
		} else {
			// another div on the current row.  Add it to the list and check if it's taller
			rowDivs.push($el);
			currentTallest = (currentTallest < getOriginalHeight($el)) ? (getOriginalHeight($el)) : (currentTallest);
			//currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);

				//console.log('currentRowStart === topPostion: ' + getOriginalHeight($el));
				//console.log('currentRowStart === topPostion: ' + currentTallest);
		}
		//console.log('*************************');
		for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			//console.log('currentDiv: '+currentDiv);
			setConformingHeight(rowDivs[currentDiv], currentTallest);
			//rowDivs[currentDiv].height(currentTallest);

				//console.log(currentTallest);
			//alert(currentTallest);
		}
		//console.log('*************************');
	});
};

/**
 * Cross Browser helper to addEventListener.
 *
 * @param {HTMLElement} obj The Element to attach event to.
 * @param {string} evt The event that will trigger the binded function.
 * @param {function(event)} fnc The function to bind to the element.
 * @return {boolean} true if it was successfuly binded.
 * ref: https://gist.github.com/eduardocereto/955642
 */
var customAddEventListener = function(obj, evt, fnc) {
	// W3C model
	if (obj.addEventListener) {
		obj.addEventListener(evt, fnc, false);
		return true;
	}
	// Microsoft model
	else if (obj.attachEvent) {
		return obj.attachEvent('on' + evt, fnc);
	}
	// Browser don't support W3C or MSFT model, go on with traditional
	else {
		evt = 'on'+evt;
		if(typeof obj[evt] === 'function'){
			// Object already has a function on traditional
			// Let's wrap it with our own function inside another function
			fnc = (function(f1,f2){
				return function(){
					f1.apply(this,arguments);
					f2.apply(this,arguments);
				}
			})(obj[evt], fnc);
		}
		obj[evt] = fnc;
		return true;
	}
	return false;
};

// Add class SVG
(function(_html) {
	_html.className = _html.className.replace(/\bno-js\b/, ' js ');
	_html.className += ('undefined' !== typeof window.SVGRect) ? ' svg ' : ' no-svg ';
})(document.documentElement);

/** Overview Boxes: ref: http://osvaldas.info/examples/responsive-equal-height-blocks/ **/
;( function( jQuery, window, document, undefined ) {
	'use strict';

	//var $list		= jQuery( '#content' ).find('div:not(.empty)').find( '.list-blocks' ),
	var $list		= jQuery( '.list-blocks' ),
		$items		= $list.find( '.list__item__inner' );

	var loadImages = function() {
		$items.filter( '.js-load-images:first' ).each( function() {
			var $this		= jQuery( this ),
				$imgs		= $this.find( 'noscript.list__item__image' ),
				imgTotal	= $imgs.length,
				imgLoaded	= 0;

			$this.addClass( 'is-loading' );
			$imgs.each( function(index) {
				var $noscript	= jQuery( this ),
					$img		= jQuery( $noscript.text() );

				$img.load( function() {
					$noscript.replaceWith( $img );
					imgLoaded++;
					if( imgLoaded >= imgTotal )
					{
						$this.css( 'opacity', 1 ).removeClass( 'js-load-images' ).removeClass( 'is-loading' );
						loadImages();
					}
				});
			});
		});
	};

	$items.addClass( 'js-load-images' );
	loadImages();
})( jQuery, window, document );


/***************/
/** BEGIN OF WINDOW.LOAD FUNCTION **/
/***************/
var onLoad = customAddEventListener(window, 'load', function(){
	equalHeight('.special-offers-listings > .special-offer-listing-item > .list__item__inner');
});
//window.addEventListener('load', function(){
//}, false);
//bindEvent(window, 'load', function () {
//jQuery( window ).load(function() {
//});

/*
ref:
https://jmperezperez.com/medium-image-progressive-loading-placeholder/
https://www.google.com/search?q=medium%20progressive%20image%20loader%20codepen
http://codepen.io/Rplus/pen/XmxENp/
http://codepen.io/Rplus/full/XmxENp/
https://codepen.io/jmperez/pen/yYjPER

https://codepen.io/tag/progressive%20image/
https://codepen.io/jmperez/pen/vGqEYo

https://jmperezperez.com/webp-placeholder-images/
https://www.google.com/search?q=webP%20images%20kentico
https://jmperezperez.com/webp-placeholder-images/
*/

window.onload = function() {
	function loadInPlaceholder(placeholder) {
		var small = placeholder.querySelector('.img-small');

		// 1: load small image and show it
		var img = new Image();
		img.src = small.src;
		img.onload = function () {
			small.classList.add('loaded');
		};

		// 2: load large image
		var imgLarge = new Image();
		imgLarge.src = placeholder.dataset.large;
		imgLarge.onload = function () {
			imgLarge.classList.add('loaded');
		};
		placeholder.appendChild(imgLarge);
	}

	var placeholders = document.querySelectorAll('.placeholder');
	for (var i = 0; i < placeholders.length; i++) {
		loadInPlaceholder(placeholders[i]);
	}
};

/***************/
/** BEGIN OF WINDOW.LOAD AND WINDOW.RESIZE FUNCTION **/
/***************/
var resizeTimer;
var onResize = customAddEventListener(window, 'resize', function(){
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function(){
		equalHeight('.special-offers-listings > .special-offer-listing-item > .list__item__inner');
	}, 300);
});
//window.addEventListener('resize', function(e) {
//}, false);
//bindEvent(window, 'resize', function (e) {
//});

jQuery(function() {
	// Open overlay - Iframe; e.g. Calendar forms, etc.
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

	// fake loading for calendar (AJAX)
	jQuery('.fullCalendar td[style="width:15%;"]').live('click', function() {
		var $this = jQuery(this).closest('.fullCalendar'),
			calendar = $this.closest('.fullCalendar'),
			loader = calendar.find('.loader');
		calendar.fadeTo(1000, 0.5);
		loader.fadeTo(1000, 1).css('z-index',2);
		setTimeout(function(){
			calendar.fadeTo(800, 1);
			loader.fadeTo(800, 0).css('z-index', 0);
		}, 1000);
		//$this.removeAttr('style');
	});

	initSiteMap();
	initEmailFormEvents();
});


// JavaScript Document
var $ = jQuery.noConflict();
$(document).ready(function() {
	$(window).load(function () {
		fixheader();
		$('input, textarea').placeholder();
	});
	$(window).resize(function () {
		fixheader();
	});
	$(window).scroll(function () {
		fixheader();
	});

	var flag = true;
	function fixheader() {
		var obj = $("#stickyribbon");
		var scrollTop = jQuery(window).scrollTop();
		if (scrollTop > jQuery('#stickyribbon').height() && flag) {
			jQuery('body').addClass('navbar-fixed-top');
			obj.removeClass('slideUp').addClass('slideDown');
			obj.removeClass('slideUp').addClass('slideDown');
			setTimeout(function () {
				obj.removeClass("slideDown")
			}, 400)
			flag = false;
		} else if (scrollTop <= jQuery('#stickyribbon').height() && !flag) {
			jQuery('body').removeClass('navbar-fixed-top');
			/*obj.removeClass('slideDown').addClass("slideup")
			setTimeout(function () {
			obj.removeClass("slideup")
			}, 800)*/
			flag = true;
		}
	}

	// v.2.0.0 beta
	/*$('.fadeOut').owlCarousel({
		items: 1,
		autoplay: false,
		loop: true,
		nav: true,
	});*/
	// v.1.3.3
	$('.fadeOut').owlCarousel({
		//items: 1,
		singleItem:true,
		autoplay: false,

		loop: false,//true,
		rewindNav : true,
		//rewindSpeed: 0,
		//navigation: true,

		//touchDrag:true,
		//pullDrag:true,
		//freeDrag:false,

		scrollPerPage: true,
		pagination: false,
		navigation: true,
		afterInit: function(){
			jQuery('.owl-buttons').addClass('owl-nav');
		},
	});
	/*
	// banner
	var special_offers_widget = jQuery(".banner").find("> .fadeOut").data('owlCarousel');
	special_offers_widget.reinit({
		responsiveBaseWidth: jQuery('.banner'),
	});
	// specials
	var special_offers_widget = jQuery(".special-offers-inner").data('owlCarousel');
	special_offers_widget.reinit({
		responsiveBaseWidth: jQuery('.special-offers-wrapper'),
	});
	// facility slider
	var special_offers_widget = jQuery(".our-facility-slider").find("> .fadeOut").data('owlCarousel');
	special_offers_widget.reinit({
		responsiveBaseWidth: jQuery('.our-facility-slider'),
	});
	*/

	// specials widget slideup
	jQuery(".special-offers h4").click(function(){
		var $this = jQuery(this)
		$this.parent().toggleClass("active")
		//$this.next().stop().slideToggle()
		$this.next().slideToggle({
			'fast',
			'linear',
			function () {
				//console.log(jQuery(this).html());
				jQuery(this).next().stop().toggleClass('show-me')
			}
		})

		/*var speed = 400;
		$(this).next().stop().animate({
			opacity: 1,
			top: '100%',
			height : 'auto',
			//left: "+=50",
			//height: "toggle"
		}, speed, function() {
			// Animation complete.
			jQuery(this).addClass('active');
		});*/
		/*var visible = $(this).next().stop().is(":visible");
		$(this).next().stop().slideToggle(500);
		if (visible) {
			$(this).next().stop().animate({
				scrollTop: $(this).next().stop().offset().top
			}, 500);
		}*/
	});
	jQuery(".booknow-section .booknow-title").click(function(){
		if(jQuery(window).width() < 767){
			var $this = jQuery(this)
			$this.parent().toggleClass("active")
			$this.next().stop().slideToggle()
		}
	});


	//$("nav > ul").addClass("main-nav enumenu_ul menu");
	//$('.enumenu_ul').responsiveMenu({
	$('#menuElem.enumenu_ul').responsiveMenu({
		'menuIcon_text': '',
		menuslide_overlap: true,
		menuslide_direction: 'left',
		onMenuopen: function() {}
	});

	$(".datepicker").datepicker();
	$(".selectbox").selectbox({
		hide_duplicate_option: true,
		onOpen: function(){
			//$(".ui-datepicker").hide();
			$("#datepicker").datepicker( "hide" );
		}
	});
	$('body').on('click touchstart', function (e) {
		var container = $(".reservations-top");
		//var container2 = $(".ui-datepicker");
		var container2 = $("#ui-datepicker-div");
		if (!container.is(e.target) && container.has(e.target).length === 0 && !container2.is(e.target) && container2.has(e.target).length === 0) {
			if ($(window).width() <= 1024) {
				$(".reservation-slide").slideUp();
				$('.reservations-top > a').removeClass("active");
				//$(".ui-datepicker").hide();
				$("#datepicker").datepicker( "hide" );
				$("#datepicker2").datepicker( "hide" );
			}
		}
	});

	$(".hasDatepicker, .ui-datepicker, .ui-datepicker-trigger").click(function (event) {
		event.stopPropagation();
	});

	// TEMP!!!!!
	if(getQuery('mock') == 'true') {
		//jQuery('#wrapper a:not(.arrow-wrap), footer a, .sitemap-float a').each(function() {
		jQuery('#wrapper a, footer a, .sitemap-float a').not('.arrow-wrap').each(function() {
			//if(jQuery(this).closest('.Calendar > table > td[colspan="7"]').length == 0) {
			if(jQuery(this).closest('td[colspan="7"]').length == 0) {
				jQuery(this).attr('href', jQuery(this).attr('href') + '?mock=true');
			}
		});
	}

});
