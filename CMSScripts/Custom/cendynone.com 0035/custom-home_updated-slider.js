////--Homepage Animated Birds
//  var slide1Flag = false,
//      slide2Flag = false,
//      slide3Flag = false,
//      slide4Flag = false,
//      slide5Flag = false,
//      productsBtnFlag = false,
//      screenHeightToStartAnimation = jQuery(window).height() * 0.5; //When top of slide is 25% from top of screen
//      screenHeightToStartAnimationForServicesBar = jQuery(window).height() * 0.5; //Services bar is smaller, so it should animate earlier
//
//  jQuery(function() {
//      if (!jQuery('#mobileQuery').is(':visible')) {
//          // Trigger first slide animation on load
//          setTimeout(function() {
//              slide0Bird();
//          }, 1000);
//      };
//  });
//  /*jQuery(window).scroll(function() {
//      if (!jQuery('#mobileQuery').is(':visible') && jQuery(window).width() > 1024) {
//          // Trigger other animations as the user scrolls
//          animationTrigger();
//      };
//  });*/
//
//  // Animation Functions
//  function slide0Bird() {
//      var slide0Flag = true,
//          slide = jQuery('.slide-0');
//      // Set animation values
//      var birdFacing = 'right',
//	  	  birdImagePath = '/getmedia/36f22dbf-b257-40d4-b1cf-6751bd1c42ae/aniBird_right_white/';
//          startPositionX = slide.width() * 0.1,
//          startPositionY = -99,
//          startBezierAngle = 40,
//          startBezierLength = 0.3,
//          endPositionX = slide.width() + 99,
//          endPositionY = slide.height() * 0.95,
//          endBezierAngle = 40,
//          endBezierLength = 0.3;
//      animateBird(birdFacing,birdImagePath,slide,startPositionX,startPositionY,startBezierAngle,startBezierLength,endPositionX,endPositionY,endBezierAngle,endBezierLength);
//  };
//
//  function animateBird(birdFacing,birdImagePath,slide,startPositionX,startPositionY,startBezierAngle,startBezierLength,endPositionX,endPositionY,endBezierAngle,endBezierLength) {
//      //console.log(slide + ' | ' + startPositionX + ' | ' + startPositionY + ' | ' + startBezierAngle + ' | ' + startBezierLength + ' | ' + endPositionX + ' | ' + endPositionY + ' | ' + endBezierAngle + ' | ' + endBezierLength + ' | ' + duration);
//      // Create bird
//      var bird = "<div class='aniBird " + birdFacing + "Facing' style='display:none;'><img src='" + birdImagePath + "' width='85' height='92' class='aniBirdImg' /></div>";
//      slide.append(bird);
//      // Animate bird
//      var path = {
//          start: {
//              x: startPositionX,
//              y: startPositionY,
//              angle: startBezierAngle,
//              length: startBezierLength
//          },
//          end: {
//              x: endPositionX,
//              y: endPositionY,
//              angle: endBezierAngle,
//              length: endBezierLength
//          }
//      };
//	  var duration = 6000;
//      slide.find('.aniBirdImg').load(function() {
//          slide.find('.aniBird').show().animate({path: new jQuery.path.bezier(path)}, duration, "linear", function() {
//              // Remove bird
//              jQuery(this).delay(duration).remove();
//          });
//      });
//  };


/**
 * isMobile.js v0.3.9 - https://github.com/kaimallea/isMobile
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
 * and any kind of seven inch device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 */
(function (global) {

    var apple_phone         = /iPhone/i,
        apple_ipod          = /iPod/i,
        apple_tablet        = /iPad/i,
        android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        android_tablet      = /Android/i,
        amazon_phone        = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        amazon_tablet       = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        windows_phone       = /IEMobile/i,
        windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        other_blackberry    = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera         = /Opera Mini/i,
        other_chrome        = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
        seven_inch = new RegExp(
            '(?:' +         // Non-capturing group

            'Nexus 7' +     // Nexus 7

            '|' +           // OR

            'BNTV250' +     // B&N Nook Tablet 7 inch

            '|' +           // OR

            'Kindle Fire' + // Kindle Fire

            '|' +           // OR

            'Silk' +        // Kindle Fire, Silk Accelerated

            '|' +           // OR

            'GT-P1000' +    // Galaxy Tab 7 inch

            ')',            // End non-capturing group

            'i');           // Case-insensitive matching

    var match = function(regex, userAgent) {
        return regex.test(userAgent);
    };

    var IsMobileClass = function(userAgent) {
        var ua = userAgent || navigator.userAgent;
        // Facebook mobile app's integrated browser adds a bunch of strings that
        // match everything. Strip it out if it exists.
        var tmp = ua.split('[FBAN');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        this.apple = {
            phone:  match(apple_phone, ua),
            ipod:   match(apple_ipod, ua),
            tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.amazon = {
            phone:  match(amazon_phone, ua),
            tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua)
        };
        this.android = {
            phone:  match(amazon_phone, ua) || match(android_phone, ua),
            tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
        };
        this.windows = {
            phone:  match(windows_phone, ua),
            tablet: match(windows_tablet, ua),
            device: match(windows_phone, ua) || match(windows_tablet, ua)
        };
        this.other = {
            blackberry:   match(other_blackberry, ua),
            blackberry10: match(other_blackberry_10, ua),
            opera:        match(other_opera, ua),
            firefox:      match(other_firefox, ua),
            chrome:       match(other_chrome, ua),
            device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
        };
        this.seven_inch = match(seven_inch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;
        // excludes 'other' devices and ipods, targeting touchscreen phones
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;
        // excludes 7 inch devices, classifying as phone or tablet is left to the user
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

        if (typeof window === 'undefined') {
            return this;
        }
    };

    var instantiate = function() {
        var IM = new IsMobileClass();
        IM.Class = IsMobileClass;
        return IM;
    };

    if (typeof module != 'undefined' && module.exports && typeof window === 'undefined') {
        //node
        module.exports = IsMobileClass;
    } else if (typeof module != 'undefined' && module.exports && typeof window !== 'undefined') {
        //browserify
        module.exports = instantiate();
    } else if (typeof define === 'function' && define.amd) {
        //AMD
        define('isMobile', [], global.isMobile = instantiate());
    } else {
        global.isMobile = instantiate();
    }

})(this);


// New Master Slider
//(function () {
//jQuery(function(){

//console.log(isMobile.tablet , ' - ' , isMobile.phone);

//( window.MSReady = window.MSReady || [] ).push( function( $ ) {
	"use strict";

	var slider = new MasterSlider();

	slider.control('arrows' , {
		autohide: false,
		insertTo:'#masterslider .ms-container',
		hideUnder: 650
	});
	//slider.control('bullets');

	slider.setup('masterslider' , {
		width:980,//1135,//1600,//1024,
		height:690,//768,
		space:0,//5,
		view:'basic',//'fade',//'parallaxMask',
		layout:'fullscreen',
		fullscreenMargin:44,//57,
		speed:40,
		preload:'all',
		autoplay: true,
		loop: true,
		hideLayers: false,
		//instantStartLayers: (window.matchMedia('only screen and (max-width: 739px)').matches) ? true : false,
		//instantStartLayers: (isMobile.tablet || isMobile.phone) ? false : true,
		instantStartLayers: true,
		overPause: true,
		startOnAppear: true
	});

	// add scroll parallax effect
	MSScrollParallax.setup(slider, 50, 80, true);

	//window.masterslider_instances = window.masterslider_instances || {};
	//window.masterslider_instances["11_8682"] = slider;
	window.masterslider_instances = window.masterslider_instances || []
	window.masterslider_instances.push( slider );

//});
//})();
//})( jQuery );

// Set Viewport
var viewport = function() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return x;
};

// doc ready
jQuery(function(){
	// jQuery('#masterslider .ms-container').find('[class^="ms-nav-"]').wrapAll('<div class="ms-nav" />');
});

// onload and resize
jQuery(window).bind('load resize', function() {
	var win_height = jQuery(window).height(),
		//top_height = jQuery('.top .header-inner').outerHeight(),
		top_height = jQuery('.top header').outerHeight(),
		height = win_height - top_height;

	//console.log(win_height);
	//console.log(top_height);
	//console.log(height);

	jQuery('#masterslider').css('height', height + 'px');
	jQuery('#masterslider .ms-mask-frame').css('height', height + 'px');
	jQuery('#masterslider .ms-view').css('height', height + 'px');
	jQuery('#masterslider .ms-slide').css('height', height + 'px');
});
