//anonymous function closure.
(function () {

	//moved ready to end
	function hideAllEvents() {
		//normal events
		jQuery('.event-normal-bg').removeClass('event-normal-bg');
		jQuery('.event-normal .hover-icon-wrap').parent().children('.hidden').hide();
		//removes current class & hides.
		jQuery('.event-normal .hover-icon-wrap').parent().attr('id', '');
		//mystery events
		jQuery('.event-mystery .hover-icon-wrap').parent().attr('id', '');
		jQuery('.vis-hidden').css('visibility', 'hidden');
	}
	function hideExplanation() {
		jQuery('.event-explanation').attr('id', '');
		jQuery('.event-explanation .hover-icon-wrap').parent().children('.hidden').hide();
	}
	/*function isCurrentlyAnimatingUp() {
		return window.anim === 'move-up';
	}
	function isCurrentlyAnimatingDn() {
		return window.anim === 'move-dn';
	}*/
	function isMobile() {
		var deviceAgent = navigator.userAgent.toLowerCase();
		var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
		if (agentID === null) {
			return false;
		}
		if (agentID.indexOf("iphone") >= 0) {
			//logMe("iphone");
			return true;
		}
		if (agentID.indexOf("ipod") >= 0) {
			// logMe("ipod");
			return true;
		}
		if (agentID.indexOf("ipad") >= 0) {
			// logMe("ipad");
			return true;
		}
		if (agentID.indexOf("android") >= 0) {
			// logMe("android");
			return true;
		}
		return false;
	}
	//repositions events for narrow onLoad according
	//to if body has id of #narrow or #wide(defualt) or supawide.
	function repositionEvents() {
		//this pushes All the events down to give space at top
		var topOffset = 300;
		var pixelsPerYear = 1;
		//distance between elements on the timeline
		var minDistance = 130;

		//if (jQuery('body').attr('id') === 'wide') {
		//already setting this width (may remove from asp classic);
		//}

		if (jQuery('body').attr('id') === 'narrow') {
			pixelsPerYear = 0.3;
			topOffset = 220;
			minDistance = 100;
		}
		if (jQuery('body').attr('id') === 'supawide') {
			pixelsPerYear = 2;
		}
		if (isMobile()) {
			pixelsPerYear = 4;
			minDistance = 130;
		} else {
			jQuery('.event-explanation').remove(); //remove explanation in desktop now.
		}

		var startYear = jQuery('.event-wrap').first().attr('year');
		var prevPosBottomEdge = -1000;
		jQuery('.event-wrap').each(function (i) {
			var eventYear = jQuery(this).attr('year');
			//  var isRegularEvent = jQuery(this).hasClass('event-normal');
			var topPos = Math.round((eventYear - startYear) * pixelsPerYear + topOffset);
			//'make sure they are at least minDistance px apart so years don't overlap
			if (prevPosBottomEdge > topPos) {
				topPos = topPos + minDistance; //'add it to this one
				topOffset = topOffset + minDistance; //'add it to the stack
			}
			prevPosBottomEdge = topPos + minDistance;
			//this is where the magic happens (and jQuery(this) has its topPos set)
			jQuery(this).css('top', topPos);
		});
		//resize the menu_holder to be relative to the events
		if (!isMobile()) {
			jQuery('#menu_holder').height(prevPosBottomEdge);
		}
	}
	function cannotAnimUp() {
		var firstEvent = jQuery('.event-wrap').first();
		return (firstEvent.offset().top > jQuery(window).height() / 2);
	}
	function cannotAnimDn() {
		var lastEvent = jQuery('.event-wrap').last();
		return (lastEvent.offset().top < jQuery(window).height() / 2);
	}
	//anim stops by easing in the same dir it was going!
	/*function stopAnim() {
		jQuery('.timeline-move').removeClass('hover');
		if (window.anim === 'move-neu') {
			//logMe('stop  called after already stopped ' + window.anim);
			return;
		}
		if (window.anim === '') {
			//logMe('empty ' + window.anim);
			return;
		}
		var direction = '';
		if (isCurrentlyAnimatingUp()) {
			//logMe('stop after going up ' + window.anim);
			direction = '+=';
		}
		if (isCurrentlyAnimatingDn()) {
			//logMe('stop after going down ' + window.anim);
			direction = '-=';
		}
		if (direction === '') {
			//logMe('direction empty');
			return;
		}
		jQuery("#slider").stop();
		var easing = 'easeOutCirc';
		var dur = 1000;
		var movement = direction + '10px';
		//logMe('movement: ' + movement);
		jQuery("#slider").animate({
			top: [movement, easing]
		},
		{
			queue: false,
			duration: dur,
			complete: function () {
				//logMe('stop complete');
			}
		});
		window.anim = 'move-neu';
		//logMe('reached end of stop');
	}
	function stopAnimationBeforeEventsOffScreen() {
		//firstEvent = jQuery('.event-wrap').first();
		//lastEvent = jQuery('.event-wrap').last();
		if (isCurrentlyAnimatingUp()) {
			jQuery('.move-down').removeClass('disabled');
			if (cannotAnimUp()) {
				//stop 1st event going offscreen
				//logMe('stopping this craziness! first event');
				jQuery('.move-up').addClass('disabled');
				stopAnim();
			} else {
				jQuery('.move-up').removeClass('disabled');
			}
		}
		if (isCurrentlyAnimatingDn()) {
			jQuery('.move-up').removeClass('disabled');
			if (cannotAnimDn()) {
				//stop last event going offscreen
				//logMe('stopping this craziness! last event');
				jQuery('.move-down').addClass('disabled');
				stopAnim();
			} else {
				jQuery('.move-down').removeClass('disabled');
			}
		}
	}
	//desktop zones when they mouseover the timeline moves
	function zoneHoverUi() {
		//re-use selectors!
		//var $slider = jQuery("#slider");
		//var $sliderHeight = $slider.height();

		//stop animation for a couplesecs after click in case they are trying to click on stuff
		jQuery(".move-up, .down").click(function () {
			stopAnim();

			jQuery('.move-up').addClass('was-up').removeClass('move-up');
			jQuery('.down').addClass('was-down').removeClass('down');

			window.resetTimer = window.setTimeout(function () {
				jQuery('.was-down').removeClass('was-down').addClass('down');
				jQuery('.was-up').removeClass('was-up').addClass('move-up');
			}, 1500);
		});

		jQuery('#footer, #logo').hover(function () {
			//logMe('entered footer or logo');
			stopAnim();
		});

		window.anim = '';

		jQuery(".timeline-move").hover(function () {
			//closeAllMenuSliders(); //ignore jslint
			var jQuerySelector = jQuery(this);
			if (jQuerySelector.hasClass('move-neutral')) {
				stopAnim();
				window.anim = 'neu'; //for next time
				return;
			}
			var direction;
			if (jQuerySelector.hasClass('disabled')) {
				return;
			}
			if (jQuerySelector.hasClass('move-down')) {
				//if they scroll hide the explanation texty!
				hideExplanation();
				jQuery('.move-down').addClass('hover');
				if (cannotAnimDn()) {
					return;
				}
				direction = '-=';
				window.anim = 'move-dn';
			}
			if (jQuerySelector.hasClass('move-up')) {
				jQuery('.move-up').addClass('hover');
				direction = '+=';
				if (cannotAnimUp()) {
					return;
				}
				direction = '+=';
				window.anim = 'move-up';
			}
			var dur = 1000000; //slow
			if (jQuerySelector.hasClass('move-fast')) {
				dur = parseInt(dur / 3);
				//logMe('dur' + dur);
			}
			dur = Math.round(dur);

			var move = direction + "58000px";
			var easing = 'swing';

			jQuery("#slider").animate({
				top: [move, easing]
			},
			{
				queue: false,
				duration: dur
			},
			function () {
				jQuery("#slider").stop();
				//logMe('anim fin');
			});
		},
			function () {
				stopAnim(); //added w/ triangles
		});

		//if leave entire window - ie8 doesnt like
		jQuery('body').mouseleave(function () {
			// alert('left the entire bdy! ie~');
			stopAnim();
		});
	}*/

	//when they mouseover the events - desktop
	function eventsHoverUi() {
		//normal events
		jQuery('.event-normal .hover-icon-wrap').hover(function () {
			//stopAnim();
			jQuery(this).parent().children().show();
			jQuery(this).parent().attr('id', 'current-event');
		},
		function (e) {
			jQuery(this).parent().children('.hidden').hide();
			jQuery(this).parent().attr('id', '');
		});

		//mysteryies & histories events
		jQuery('.event-mystery .hover-icon-wrap').hover(function (e) {
			//stopAnim();
			//make the Histories and Mysteries popup open up so it doesnt go off screen!
			if (!jQuery(this).hasClass('alteredToOpenUp')) {
				//1. move parent ".event-mystery" up proportional to its own height
				//2. move this ".hover-icon-wrap"
				//the same distance so that its alignment has changed

				var h = jQuery(window).height();
				var vPos = e.pageY;
				//   var twoThirdsScreen = h * (2 / 3);
				var eventMysteryHeight = jQuery(this).parent().height();
				var footerH = jQuery('#footer').height();
				var topOfFooter = h - footerH;
				var bottomOfEventMystery = vPos + eventMysteryHeight;
				if (bottomOfEventMystery > topOfFooter) {
					var wrapHeight = 32;
					var distanceToMove = eventMysteryHeight - wrapHeight;
					var currentParentTop = parseInt(jQuery(this).parent().css('top').replace(/px/gi, ''));
					var calcTop = currentParentTop - distanceToMove;
					jQuery(this).parent().css('top', calcTop + 'px');
					jQuery(this).css('top', distanceToMove);
					jQuery(this).addClass('alteredToOpenUp').attr('moved', distanceToMove);
				}
			}
			jQuery(this).parent().children().show()
				.css('visibility', 'visible').children().show().css('visibility', 'visible');
			jQuery(this).parent().attr('id', 'current-event');
		},
		function (e) {
			//can hide them all
			jQuery('.vis-hidden').css('visibility', 'hidden');
			jQuery(this).parent().attr('id', '');
			//todo reset boxes that have been alteredToOpenUp to open up
			//set alteredToOpenUp box back to orig..
			if (jQuery(this).hasClass('alteredToOpenUp')) {
				var currentParentTop = parseInt(jQuery(this).parent().css('top').replace(/px/gi, ''));
				var distanceToMove = parseInt(jQuery(this).attr('moved'));
				var calcTop = currentParentTop + distanceToMove;
				jQuery(this).parent().css('top', calcTop + 'px');
				jQuery(this).css('top', '0');
				jQuery(this).removeClass('alteredToOpenUp');
			}
		});
	}
	//---mobile stuff!

	//mobile ipad interface
	function mobileUi() {
		jQuery('body').addClass('mobile');
		// jQuery('#wrap-move-zones').remove();
		jQuery('#wrap-move-zones .move-fast').remove();
		//iScroll plugin
		/*var myScroll;
		myScroll = new iScroll('menu_holder', {
			hScroll: false,
			hScrollbar: true,
			vScrollbar: true,
			scrollbarClass: 'myScrollbar',
			onScrollMove: function () {
				hideAllEvents();
			}
			//onScrollEnd: function () {
			//topOffset: pullDownOffset,
			//onRefresh: function () {
		});*/

		//Y not let them click on the years!
		jQuery('.event-normal').click(function (e) {
			jQuery(this).addClass('event-normal-bg');
			if (jQuery(this).attr('id') !== 'current-event') {
				hideAllEvents();
				jQuery(this).children().show();
				jQuery(this).attr('id', 'current-event');
			} else {
				//if is already current stay hidden
				hideAllEvents();
			}
		});
		jQuery('.event-mystery').click(function (e) {
			if (jQuery(this).attr('id') !== 'current-event') {
				hideAllEvents();
				jQuery(this).children().show().css('visibility', 'visible')
					.children().show().css('visibility', 'visible')
					.attr('id', 'current-event');
			} else {
				//if is already current stay hidden
				hideAllEvents();
			}
		});
	}

	jQuery(function(){
		// jQuery('div').dbgBdr('rand');
		//explanation text show
		jQuery('.event-explanation').children().show();
		//var hideExplanationTimer =
		window.setTimeout(function () {
			hideExplanation();
		}, 8000);
		//disable move-up onload since they cannot go that way at 1st
		jQuery('.move-up').addClass('disabled');
		var slideshow_interval = 7000; //ignore jslint
		var counter = 0;
		repositionEvents();
		//adjustStyle onResize
		jQuery(window).resize(function () {
			repositionEvents();
		});
		// var animTimer =
		/*window.setInterval(function () {
			stopAnimationBeforeEventsOffScreen();
		}, 750);*/
		if (isMobile()) {
			mobileUi();
		} else {
			//zoneHoverUi();
			eventsHoverUi();
		}
		/*jQuery.supersized({
			//Functionality
			slideshow: 1,   //Slideshow on/off
			autoplay: 0,   //Slideshow starts playing automatically
			start_slide: 1, //Start slide (0 is random)
			slide_interval: 7000, //Length between transitions
			slides: [		//Slideshow Images
				{
					image: '/_images/_home/era1800Img.jpg',
					title: ''
				}
			]
		});*/
	});

})();

//mh
//function to put a red border around a jQuery selector in order to debug its layout box.
//params: jQuery('#id').dbgBdr('Green'), or jQuery('#id').dbgBdr('rand')
//for random or jQuery('#id').dbgBdr() default to 'Red'
//Random is great for debugging mouseovers since it shows a change on mouseover/leave etc
(function () {
	jQuery.fn.extend({
		//pass the options variable to the function
		dbgBdr: function (color) {
			//if color not passed default to 'Red'
			if (typeof color === 'undefined') {
				color = 'Red';
			}
			return this.each(function () {
				if (color === 'rand') {
					color = '#' + Math.floor(Math.random() * 16777215).toString(16);
				}
				jQuery(this).css('border', '1px solid ' + color);
			});
		}
	});
})();
