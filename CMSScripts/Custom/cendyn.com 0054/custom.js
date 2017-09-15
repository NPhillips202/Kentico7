// Set Viewport
var viewport = function() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;	
    return x;
};

jQuery( document ).ready(function() {

//-- Fullscreen Background Image
    //jQuery("#background-image").fullscreenBackground();

//-- Animate Home page
wow = new WOW(
    {
      boxClass:     'wow',      // default
      animateClass: 'animated', // default
      offset:       0,          // default
      mobile:       false,       // default
      live:         true,        // default
	 // duration:		0.1
    }
  )
  wow.init();

//-- Equal Height Rows
	// conditions
	jQuery(window).resize(function(){
		if(viewport() <= 725) {
			jQuery('.equal').addClass('was-equal').removeClass('equal').height('auto');
			jQuery('.equal-2').addClass('was-equal-2').removeClass('equal-2').height('auto');
		} else {
			jQuery('.was-equal').addClass('equal').removeClass('was-equal');
			jQuery('.was-equal-2').addClass('equal-2').removeClass('was-equal-2');
		};
	}).resize();
	// call equal function
	jQuery('.equal').responsiveEqualHeightGrid();
	jQuery('.equal-2').responsiveEqualHeightGrid();
	
	
//-- MMenu 
jQuery("#main-navigation").mmenu({
        "extensions": [
            'pageshadow',
            'border-full',
            'effect-slide-menu'
        ],
        offCanvas: {
            position: 'right'
        },
        labels: true,
        "navbar": {
            title: 'Cendyn'
        },
        "navbars": [
            {
                position: 'bottom',
                content: [
                    '<a href="https://www.facebook.com/CendynONE" target="_blank"><i class="fa fa-facebook"></i></a>',
                    '<a href="https://twitter.com/CendynONE" target="_blank"><i class="fa fa-twitter"></i></a>',
                    '<a href="https://www.linkedin.com/company/cendyn-one" target="_blank"><i class="fa fa-linkedin"></i></a>',  
                    '<a href="https://www.instagram.com/cendyn_/" target="_blank"><i class="fa fa-instagram"></i></a>'    
                ]
            }
        ],
    }, {
        // configuration
        clone: true,
        offCanvas: {
            pageSelector: "#page-wrap"
        }
        //classNames:{
        //    fixedElements: {
        //        fixed: "header",
        //    }
        //}
    });
    //jQuery.mmenu.configuration.classNames.fixedElements = {
        //fixed: ".fixed-elem"
    //};
  
// Custom adjustment for mmenu slide content
    // apply some adjustments for Kentico server
    //jQuery('#ui-datepicker-div').closest('div').removeClass('mm-page mm-slideout');
    //jQuery('#form').addClass('mm-page mm-slideout');
	
//-- Mobile Navigation 
	jQuery('#nav-icon4').click(function(){
		if (jQuery(this).hasClass('open')) {
			//jQuery(this).removeClass('open');
			//jQuery('.mobile-nav').css('display','none');
			//jQuery('body').css('overflow','inherit');
		} else {
			jQuery(this).addClass('open');
			//jQuery('.mobile-nav').css('display' , 'block');
			//jQuery('body').css('overflow','hidden');
		};
	});
	
//--Top bar sizing
	function barHeight() {
		var barHeight = jQuery('header').outerHeight();
		jQuery('.top-bar').css('padding-top',barHeight+'px');
		//jQuery('.top-bar').css('overflow', 'hidden');
	};
	jQuery(function() {
		barHeight();
	});
	jQuery(window).resize(function() {
		barHeight();
	});
  
  
   //--Site Map
	jQuery(function() {
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
	});
  
//--Contact Form Hide Colons
	jQuery('.contact-form label').each(function() {
		var text = jQuery(this).text();
			text = text.replace(':','');
		jQuery(this).text(text);
	});
  
//--Contact Form Move Labels on Focus
    var formEle = jQuery('.contact-form input[type=text], .contact-form textarea, .contact-form select');
	var labelMargin = "-30px";
	var inputMargin = "30px";
	
    formEle.focus(function(e) {
        if (e.target.value == e.target.defaultValue) {
            jQuery(this).parent().parent().children('label').css('margin-top',labelMargin);
			jQuery(this).css('margin-top',inputMargin);
        };
    });
    formEle.change(function(e) {
        if (e.target.value == '') {
            jQuery(this).parent().parent().children('label').css('margin-top','0');
			jQuery(this).css('margin-top','0');
        } else {
            jQuery(this).parent().parent().children('label').css('margin-top',labelMargin);
            jQuery(this).css('margin-top',inputMargin);
        };
    });
    formEle.blur(function(e) {
        if (e.target.value == '') {
            jQuery(this).parent().parent().children('label').css('margin-top','0');
			jQuery(this).css('margin-top','0');
        };
    });
    jQuery(function() {
        formEle.each(function() {
            if (jQuery(this).val() !== '') {
				jQuery(this).parent().parent().children('label').css('margin-top',labelMargin);
				jQuery(this).css('margin-top',inputMargin);
            };
        });
    });
  
 //--Contact form product columns
    jQuery(function() {
        if (jQuery('.contact, .contact-page-form').length > 0) {
            var checkboxWrapper = jQuery('.checkbox > div');
            var inputs = checkboxWrapper.find('td');
            inputs.unwrap().unwrap().unwrap();
            for (var i=0; i<inputs.length; i+=6) {
                inputs.slice(i,i+6).wrapAll("<div class='check'></div>");
            };
            jQuery('.check td').wrap("<div></div>");
            jQuery('.check input').unwrap();
        };
    });

//--Contact form custom checkboxes
    jQuery(function() {
        // Create custom labels
        var form = jQuery(".contact, .contact-page-form, .cendyn-contact-form");
        var items = form.find("input[type=checkbox]"); 
        items.each(function(){
            var value = jQuery(this).attr('id');
            var label = "<label  for='"+ value +"' class='checkboxLabel'></label>";
            jQuery(this).parent().prepend(label);
        });
        
        // Functionality
        var CBtarget = jQuery('.check input[type="checkbox"]');
        // On change
        CBtarget.change(function(e) {
            var label = jQuery(this).parent().children('.checkboxLabel');
            if (jQuery(this).is(':checked')) {
                label.addClass('checked');
            } else {
                label.removeClass('checked');
            };
        });
        // On load
        CBtarget.each(function() {
            var label = jQuery(this).parent().children('.checkboxLabel');
            if (jQuery(this).is(':checked')) {
                label.addClass('checked');
                //console.log("checked");
            } else {
                label.removeClass('checked');
                //console.log("not checked");
            };
        });
    });
  
  
  // Jssor Slider
  jssor_slider1_starter = function (containerId) {

            var _SlideshowTransitions = [
            //Fade
            { $Duration: 1200, $Opacity: 2 }
            ];

            var options = {
                $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
                $AutoPlaySteps: 1,                                  //[Optional] Steps to go for each navigation request (this options applys only when slideshow disabled), the default value is 1
                $AutoPlayInterval: 3000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
                $PauseOnHover: 1,                               //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

                $ArrowKeyNavigation: true,   			            //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
                $SlideDuration: 500,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
                $MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20
                //$SlideWidth: 600,                                 //[Optional] Width of every slide in pixels, default value is width of 'slides' container
                //$SlideHeight: 300,                                //[Optional] Height of every slide in pixels, default value is height of 'slides' container
                $SlideSpacing: 0, 					                //[Optional] Space between each slide in pixels, default value is 0
                $DisplayPieces: 1,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
                $ParkingPosition: 0,                                //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
                $UISearchMode: 1,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
                $PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
                $DragOrientation: 3,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)

                $SlideshowOptions: {                                //[Optional] Options to specify and enable slideshow or not
                    $Class: $JssorSlideshowRunner$,                 //[Required] Class to create instance of slideshow
                    $Transitions: _SlideshowTransitions,            //[Required] An array of slideshow transitions to play slideshow
                    $TransitionsOrder: 1,                           //[Optional] The way to choose transition to play slide, 1 Sequence, 0 Random
                    $ShowLink: true                                    //[Optional] Whether to bring slide link on top of the slider when slideshow is running, default value is false
                },

                $BulletNavigatorOptions: {                                //[Optional] Options to specify and enable navigator or not
                    $Class: $JssorBulletNavigator$,                       //[Required] Class to create navigator instance
                    $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                    $AutoCenter: 1,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                    $Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
                    $Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
                    $SpacingX: 10,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
                    $SpacingY: 10,                                   //[Optional] Vertical space between each item in pixel, default value is 0
                    $Orientation: 1                                 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
                },

                $ArrowNavigatorOptions: {
                    $Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
                    $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                    $Steps: 1                                       //[Optional] Steps to go for each navigation request, default value is 1
                }
            };
            var jssor_slider1 = new $JssorSlider$(containerId, options);

            //responsive code begin
            //you can remove responsive code if you don't want the slider scales while window resizes
            function ScaleSlider() {
                var parentWidth = jssor_slider1.$Elmt.parentNode.clientWidth;
                if (parentWidth)
                    jssor_slider1.$ScaleWidth(Math.min(parentWidth, 600));
                else
                    $Jssor$.$Delay(ScaleSlider, 30);
            }

            ScaleSlider();
            $Jssor$.$AddEvent(window, "load", ScaleSlider);

            $Jssor$.$AddEvent(window, "resize", $Jssor$.$WindowResizeFilter(window, ScaleSlider));
            $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
            //responsive code end
        };
  
  
  
}); //End Of Document ready

//--Overlay for Marketo Forms
    // Function for disabling main page scrolling
    function disablePageScroll() {
        if (!jQuery('html').hasClass('noscroll')) {
            if (jQuery(document).height() > jQuery(window).height()) {
               var scrollTop = (jQuery('html').scrollTop()) ? jQuery('html').scrollTop() : jQuery('body').scrollTop();
               jQuery('html').addClass('noscroll').css('top',-scrollTop);         
            };
        };
    };
    
    // Function for enabling main page scrolling
    function enablePageScroll() {
        var scrollTop = parseInt(jQuery('html').css('top'));
        jQuery('html').removeClass('noscroll');
        jQuery('html,body').scrollTop(-scrollTop);
    };
	
	// Function for auto-centering the overlay vertically
	function centerVertically() {
		jQuery('.formOverlay').css({
			'top' : '50%',
			'margin-top' : -jQuery('.formOverlay').height()/2
		});
	};
	
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

//--UTM var passing for Marketo
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
    
    // Generate cookie if UTM vars exist in URL
    if (getParameterByName('utm_source') !== null) { createCookie('utm_source',getParameterByName('utm_source')); }
    if (getParameterByName('utm_medium') !== null) { createCookie('utm_medium',getParameterByName('utm_medium')); }
    if (getParameterByName('utm_campaign') !== null) { createCookie('utm_campaign',getParameterByName('utm_campaign')); }
    
    // If cookie is saved and Marketo form exists, plug vars into URL
    jQuery('iframe').each(function() {
        var url = jQuery(this).attr('src'),
            utm_source = readCookie('utm_source'),
            utm_medium = readCookie('utm_medium'),
            utm_campaign = readCookie('utm_campaign');

        if ((url.indexOf('pages.cendyn.com') > -1) && (readCookie('utm_source') !== null)) {
            var newUrl = url + "?utm_source=" + utm_source + "&utm_medium=" + utm_medium + "&utm_campaign=" + utm_campaign;
            //console.log('New URL is - ' + newUrl);
            jQuery(this).attr('src',newUrl);
        };
    });


 