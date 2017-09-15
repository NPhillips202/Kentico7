// JavaScript Document
var $ = jQuery.noConflict();

// Preloading a Google font so I can fire off height functions only after the nav is sized properly
    //WebFontConfig = {
    //    google: { families: ['Lato:400,100,700,900italic'], ['Playfair+Display:400,400italic,700,700italic,900,900italic'], ['Work+Sans:400,100,300,500,600,700,800,900,200'] },
    //    active: function() {
            // Functions to trigger after preload is done
    //        headerHeight();
    //    }
    //};
    //(function() {
    //    var wf = document.createElement('script');
    //    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    //    wf.type = 'text/javascript';
    //    wf.async = 'true';
    //    var s = document.getElementsByTagName('script')[0];
    //    s.parentNode.insertBefore(wf, s);
    //})();

// Header Height
    function headerHeight() {
        var height = jQuery('header').height();
        jQuery('.wrapper').css('marginTop',height+'px');
        
        // Slider fix
        jQuery('#masterslider').css('marginTop','-'+height+'px');
    }
    jQuery(window).ready(function() { 
        headerHeight();
    });
    jQuery(window).resize(function() { headerHeight(); });

// Booking Mask Promo Code Section
    jQuery(function() {
        jQuery('.promo-link').click(function() {
            var ele = jQuery('.promo-inputs');
          
            if (ele.is(':visible')) {
                ele.css('overflow','hidden');
                ele.slideUp(300);
            } else {
                ele.slideDown(300, function() {
                    ele.css('overflow','visible');
                });
            };
        });
    });

jQuery(document).ready(function($){
    // Move dropdown into the room section (combine repeaters)
    jQuery('.roomTypeDropdownNav').prependTo(jQuery('.singleroom .main.cf:first .col-5')).removeClass('roomTypeDropdownNav');
	// Selectbox Dropdowns
    jQuery(".selectbox").selectbox({
        hide_duplicate_option: true
    });
    // Add groupings for property selection on corporate booking mask
    jQuery(".propertyDD .sbOptions li a").each (function() {
        var v = jQuery(this).attr("rel");
        if (v.substring(0,1)=="*") {
            jQuery(this).addClass("sbGroup")
        }
    });
    // Room Type Dropdown Nav
    jQuery(".singleroom .selectbox").selectbox({
        hide_duplicate_option: true
    }).change(function() {
        var url = jQuery(this).val();
        if (url !== "SELECT ROOM CATEGORY") {
            window.location.href = url;
       };
    });
    // Main Subnav Dropdown Nav
    jQuery(".main-content .selectbox").selectbox({
        hide_duplicate_option: true
    }).change(function() {
        var url = jQuery(this).val();
        if (url !== "SELECT CATEGORY") {
            window.location.href = url;
       };
    });
    
    // Booking Dropdown
	$(".book-btn").click(function() {
        var ele = jQuery(".book-now-main");
                         
        if (ele.is(':visible')) {
            ele.css('overflow','hidden');
            ele.slideUp(300);
        } else {
            ele.slideDown(300, function() {
                ele.css('overflow','visible');
            });
        };
    });
    // Responsive Menu
    $('nav .mainNavigation > ul').addClass('main-nav enumenu_ul menu');
    //$('.enumenu_ul').responsiveMenu({
    //    'menuIcon_text': 'Menu',
    //    menuslide_overlap: true,
    //    menuslide_direction: 'left',
    //    onMenuopen: function() {}
    //});
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
            offCanvas: {
                pageSelector: ".wrapper"
            }
        }).on('init', function(){
            //var menu = jQuery('.mm-panel').first(),
            //    footerNav = jQuery('#footerNav ul li').not(':last');
            //footerNav.clone().appendTo(menu.children('ul'));
        }).trigger( "init" );
    });

//--Main navigation dropdowns
    var navElement = jQuery('#mainNav > ul li'),
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
    //jQuery(function() {
        navElement.hover(function() {
            if (jQuery(this).children('ul').length > 0) {
                jQuery(this).addClass('active');
                jQuery(this).children('ul').stop(true,false);
                jQuery(this).children('ul').hide(); // Fix for slidedown
                jQuery(this).children('ul').slideDown(navSpeed, function() {
                    jQuery(this).css('overflow','visible');
                });
            };
        }, function() {
            jQuery(this).removeClass('active');
            jQuery(this).children('ul:visible').stop(true,false);
            jQuery(this).children('ul:visible').css('overflow','hidden');
            jQuery(this).children('ul:visible').slideUp(navSpeed);  
        });
    //});

$(window).load(function(){
    var totalElem = $(".select-room .row .col-4");
    for(i=0; i<totalElem.length; i++) {
        var elem1 = $($(".select-room .row .col-4")[i]).siblings();
        var elem2 = $(".select-room .row .col-4")[i];
        $(elem1).find("img").height("auto");
        $(elem2).find("img").height("auto");
        if($(elem1).outerHeight() > $(elem2).outerHeight()) {
            // $(elem2).height($(elem1).outerHeight());
            $(elem2).find("img").height($(elem1).outerHeight());
        } else {
            // $(elem1).height($(elem2).outerHeight());
            $(elem1).find("img").height($(elem2).outerHeight());
        }
    }
});
$(window).resize(function(){
    var totalElem = $(".select-room .row .col-4");
    for(i=0; i<totalElem.length; i++) {
        var elem1 = $($(".select-room .row .col-4")[i]).siblings();
        var elem2 = $(".select-room .row .col-4")[i];
        $(elem1).find("img").height("auto");
        $(elem2).find("img").height("auto");
        if($(elem1).outerHeight() > $(elem2).outerHeight()) {
            // $(elem2).height($(elem1).outerHeight());
            $(elem2).find("img").height($(elem1).outerHeight());
        } else {
            // $(elem1).height($(elem2).outerHeight());
            $(elem1).find("img").height($(elem2).outerHeight());
        }
    }
});
$(window).load(function(){
    if($(".best-awards").isOnScreen()) {
        $(".best-awards .bx-prev,.best-awards .bx-next").addClass("bxNavButtonsReset");
    }
    $(window).scroll(function(){
        if($(".best-awards").isOnScreen()) {
            $(".best-awards .bx-prev,.best-awards .bx-next").addClass("bxNavButtonsReset");
        }
    })
})
$.fn.isOnScreen = function(x, y){
    if(x == null || typeof x == 'undefined') x = 1;
    if(y == null || typeof y == 'undefined') y = 1;
    
    var win = $(window);
    
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    
    var height = this.outerHeight();
    var width = this.outerWidth();
 
    if(!width || !height){
        return false;
    }
    
    var bounds = this.offset();
    bounds.right = bounds.left + width;
    bounds.bottom = bounds.top + height;
    
    var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    
    if(!visible){
        return false;   
    }
    
    var deltas = {
        top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
        bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height),
        left : Math.min(1, ( bounds.right - viewport.left ) / width),
        right : Math.min(1, ( viewport.right - bounds.left ) / width)
    };
    
    return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;
};

// bsSlider Adjustments
var bxSliderAdjustments = function() {
  var con = jQuery('.singleroom .bx-viewport');
  
  con.each(function() {
    // Reset values
    var img = jQuery(this).find('li img');
    img.css('width','100%');
    img.css('height','auto');
    img.css('margin-top','0');
    img.css('margin-left','0');
    
    var contentHeight = jQuery(this).parent().parent('.col-7').prev('.col-5').height(),
        conHeight = jQuery(this).height(),
        conWidth = jQuery(this).width();
    
    //jQuery(this).css('height', contentHeight + 'px');
    
    var conHeight = jQuery(this).height(); // Change var to new height
    
    img.each(function() {
      var imgHeight = jQuery(this).height(),
          gap = (imgHeight - conHeight) / 2;
      
      //console.log('gap - ' + gap);
      if (gap > 0) {
        // Image is taller
        jQuery(this).attr('gap',gap);
        jQuery(this).attr('size','tall');
        
        jQuery(this).css('margin-top', -gap + 'px');
      } else {
        // Image is wider
        jQuery(this).attr('gap',gap);
        jQuery(this).attr('size','wide');
        
        jQuery(this).height(conHeight + 'px');
        jQuery(this).css('width','auto');
        var gap = (jQuery(this).width() - conWidth) / 2;
        jQuery(this).css('margin-left', -gap + 'px');
      };
    });
  });
};

jQuery(document).ready(function($){
	jQuery('.bxslider').bxSlider({
		slideMargin:0,
		auto: false,
		pause: 10000,
		touchEnabled: true,
		buildPager: function(slideIndex) {
			var title = jQuery('.wc-section .bxslider img:eq(' + slideIndex + ')').attr('title'),
			title = '<span class="pager-link-text">' + title + '</span>'
			return title;
		}
	});
    
    if (jQuery('.single-rm-slider').length > 0) {
        jQuery('.single-rm-slider').each(function() {
            if (jQuery(this).find('img').length < 2) {
                var auto = false;
            } else {
                var auto = true;
            };
            
            jQuery(this).bxSlider({
              slideMargin:0,
              auto: auto,
              pause: 5000,
              touchEnabled: true,
              onSliderLoad: function() {
                //bxSliderAdjustments();
              }
            });
            window.addEventListener('resize', bxSliderAdjustments, false);
        });
    };
    
	jQuery('.resort-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1]
		},
	});
	jQuery('.gallerypopup').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1]
		},
	});
	jQuery(".video-box a").click(function(event){
		event.preventDefault();
		event.stopPropagation();
        jQuery('.gallery .video-bg .video iframe').attr('src',(jQuery('.gallery .video-bg .video iframe').attr('videoUrl')));
		jQuery('.gallery .video-bg .video').show();
	});
	jQuery("body .close-btn").click(function(){
		if( jQuery(".gallery .video-bg").length > 0 )
		{
			jQuery(".gallery .video-bg .video").hide();
			var iframe = jQuery(".gallery .video-bg .video").find("iframe");
			//var source = iframe.attr('src');
			//source = source+"&autoplay=0";
			//iframe.attr('src',source);
            iframe.attr('src','');
		}
	})
});

jQuery('.imgbox').each(function () {
	jQuery(this).find('img').addClass('bannerimage');
	var imgSrc = jQuery(this).find('.bannerimage').attr('src');
	imgSrc = "url(" + imgSrc + ")";
	jQuery(this).css("background-image", imgSrc);
});

jQuery('.gallery-box a').each(function () {
	jQuery(this).find('img').addClass('galleryimage');
	var imgSrc = jQuery(this).find('.galleryimage').attr('src').replace("(","%28").replace(")","%29");
        imgSrc = "url(" + imgSrc + ")";
	jQuery(this).css("background-image", imgSrc);
});

jQuery(function() {
	// Animation
	/*function animateArrow() {
		var target = jQuery('.homeSlideArrow');
		var animateDuration = 1400;
		target.animate({
			bottom:'32px'
		}, animateDuration, "easeOutQuad", function() {
			target.animate({
				bottom:'20px'
			}, animateDuration, "easeInQuad", function() {
				animateArrow();
			});
		});
	};
	if (!jQuery('#mobileQuery').is(':visible')) {
		animateArrow();
	};*/
	// Click function
	jQuery('.homeSlideArrowWrapper').click(function(e) {
		e.preventDefault();
		//position = jQuery('.home-slide.slide-1').offset().top - jQuery('header').outerHeight();
		//jQuery('html, body').animate({scrollTop:position+'px'},2200, "easeOutQuad");
		var home_slide = jQuery('#special-offers-section');
		console.log(home_slide.length);
		//var home_slide = jQuery(this).closest('.home-slide').next('div');
		position = home_slide.offset().top - jQuery('header').outerHeight();
		jQuery('html, body').animate({scrollTop:position+'px'}, 750, "easeOutExpo");
	});
});

jQuery(window).load(function(){
	jQuery('a.taphover').on("touchstart", function (e) {
	    "use strict"; //satisfy the code inspectors
	    var link = jQuery(this); //preselect the link
	    if (link.hasClass('hover')) {
	        return true;
	    } else {
	        link.addClass("hover");
	        jQuery('a.taphover').not(this).removeClass("hover");
	        e.preventDefault();
	        return false; //extra, and to make sure the function has consistent return points
	    }
	});
});

//--General Subnav - Adjust boxes so that they fit nicely regardless of how many there are
    jQuery(function() {
        var slides = jQuery('.subNav > div'),
            numOfSlides = slides.length,
            numOfExtraSlides = 0;
    
        function isOdd(num) { return !!(num % 2) }
    
        // Remove default 50% width so we can apply other widths
        slides.removeClass('col-6');
    
        if (numOfSlides === 1) {
            // If only 1 box, make full width and end function
            slides.addClass('col-12');
        } else {
            // If more than 1 box, do all this stuff
            var fullRows = (Math.floor(numOfSlides / 2));
            numOfExtraSlides = numOfSlides - (fullRows * 2);
            //console.log(fullRows + ' | ' + numOfExtraSlides);
    
            var i = 1;
            slides.each(function()
            {
                var isEvenRow = Math.ceil(i / 2) % 2 == 0;
                var isCellAlternate = i % 2 == isEvenRow ? 0 : 1;
    
                if (isCellAlternate) {
                    jQuery(this).addClass('col-8');
                } else {
                    jQuery(this).addClass('col-4');
                };
                i++;
            });
    
            if (numOfExtraSlides === 1) {
                // Any leftover slide gets full width
                slides.last().removeClass('col-4').removeClass('col-8').addClass('col-12');
            };
        };
    });

//--Specials- Make box heights match
    function matchBoxHeights() {
        var highestBox = 0,
            elements = jQuery('.specialsListItem'),
            numInRow = 3;
        
        // Adjust number in rows
        if (jQuery('.one-per-row').css('display') == 'block') {
          numInRow = 1;
        } else if (jQuery('.two-per-row').css('display') == 'block') {
          numInRow = 2;
        };

        // Loop through and make the rows match to the highest height
        for(var i = 0; i < elements.length; i+=numInRow) {
            highestBox = 0;
            var theseElements = elements.slice(i, i+numInRow);
            theseElements.height('auto');

            theseElements.each(function() {
                if (jQuery(this).height() > highestBox) {  
                    highestBox = jQuery(this).height();
                };
            });
            //console.log('Elements ' + i + ' through ' + (i + numInRow) + ' - ' + highestBox + 'px');
            theseElements.height(highestBox);
        };
    };
    jQuery(function(){ matchBoxHeights(); });
    jQuery(window).resize(function() { matchBoxHeights(); });

//--Remove content area if empty
    if (jQuery('.main-content').length > 0) {
        if (jQuery('.main-content .main').html().replace(/ /g,"").replace(/\n/g,"").length < 1) {
            jQuery('.main-content').hide();
        };
    };

//--Email Form in Footer
    jQuery(function() {
        var emailForm = jQuery('.newsletter'),
            emailFormInput = emailForm.find('.text-box'),
            emailFormSubmit = emailForm.find('.btn-go'),
            defaultValue = "Your Email Here";
        // Clear text in field when focused
        //emailFormInput.on('focus', function() {
        //    if (jQuery(this).val() == defaultValue) {
        //        jQuery(this).val('');
        //    };
        //});
        //emailFormInput.on('blur', function() {
        //    if (jQuery(this).val() == '') {
        //        jQuery(this).val(defaultValue);
        //    };
        //});
        // Submit functions
        function submitEmailForm(val) {
            var email = val;
            if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
                alert("Please enter a valid email address.");
                return false;
            };
            document.location.href = ('/newsletter-sign-up/?em=' + email);
        };
        emailFormInput.on('focus', function() {
            jQuery(document.body).delegate('input:text', 'keypress', function(e) {
                if (e.which === 13) {
                    e.preventDefault();
                    var val = jQuery(this).val();
                    submitEmailForm(val);
                };
            });
        });
        emailFormSubmit.on('click', function(e) {
            e.preventDefault();
            var val = emailFormInput.val();
            submitEmailForm(val);
        });
    });

//--Site Map
    jQuery(function() {
        jQuery(".site-map a, .sitemap-close").click(function(e) {
            e.preventDefault();
            if (jQuery('.sitemap-float').is(':visible')) {
                jQuery(".sitemap-float").fadeOut(500);
            } else {
                jQuery(".sitemap-float").fadeIn(500);
            };
        });
    });

//--Fade in page on load
    jQuery(window).load(function() {
        headerHeight();
        bxSliderAdjustments();
      
        // Scroll to gallery section on load
        var hash = location.hash.replace('#','');
        if (hash != '' && jQuery('h2[category="' + hash + '"]').length > 0) {
            jQuery('html, body').animate({ scrollTop: (jQuery('h2[category="' + hash + '"]').offset().top - jQuery('header').height() - 10)}, 1);
        };
      
        // Fade in page
        jQuery("body, header").css('opacity','1');
    });

//--Make Google Map scrollable after clicking into it
    jQuery('.map').click(function() {
        jQuery(this).children('iframe').css('pointer-events','all');
    });

//--Custom Overlay
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
    
    // Function for setting 16:9 ratio
    function setRatio() {
    	// Set width first, if it's too large then change to height
    	var width = (jQuery('.formOverlay').height()/9)*16,
    		height = (jQuery('.formOverlay').width()/16)*9;

    	if (width < (jQuery(window).width() * 0.8) ){
    		console.log('Resize width');
			jQuery('.formOverlay').css({
				'width' : width+'px',
				'height' : '90%'
			});
		} else {
    		console.log('Resize height');
			jQuery('.formOverlay').css({
				'width' : '80%',
				'height' : height+'px'
			});
		};
    };
	
	// Function for auto-centering the overlay vertically and horizontally
	function centerOverlay() {
		jQuery('.formOverlay').css({
			'top' : '50%',
			'left' : '50%',
			'margin-top' : -jQuery('.formOverlay').height()/2,
			'margin-left' : -jQuery('.formOverlay').width()/2
		});
	};
	
	// Open overlay
	jQuery('a.openOverlay, li.openOverlay > a').live('click',function(e) {
		var overlay = jQuery('<div class="formOverlayWrapper"><div class="formOverlay"><div class="formOverlayClose"></div><div class="formOverlayContent" /></div></div>'),
			href = jQuery(this).attr('href'),
			iframe = "<iframe src='" + href + "' allowtransparency='yes' frameborder='0' scrolling='yes' width='100%'></iframe>";
		e.preventDefault();
		disablePageScroll();
		// Create overlay div and fill with iframe content, then fade in
		jQuery('body').append(overlay);
		overlay.find('.formOverlayContent').html(iframe);
		overlay.fadeIn(500);
        setRatio();
		centerOverlay();
		jQuery(window).bind('resize',setRatio);
		jQuery(window).bind('resize',centerOverlay);
		// Bind click event for closing overlay
		jQuery(document).bind('click',closeOverlayOnOutsideClick);
	});
	
	// Close function
	function closeOverlay() {
		enablePageScroll();
		jQuery('.formOverlayWrapper').fadeOut(500, function() 
		{
			jQuery('.formOverlayWrapper').remove();
			jQuery(window).unbind('resize',setRatio);
			jQuery(window).unbind('resize',centerOverlay);
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

//--Screen reader adjustments
    jQuery(function() {
        jQuery(".mm-menu .mm-next").append("<span class='hide'>Open the submenu</span>");
        jQuery(".mm-menu .mm-prev").append("<span class='hide'>Go to previous menu</span>");
        //jQuery('.mm-menu a').each(function() {
        //    var link = jQuery(this).attr('href');
    
        //    if (link.charAt(0) == "#") {
        //        jQuery(this).attr('aria-hidden','true');
        //    };
        //});
    });

//--Error label text change
    jQuery(function() {
        var errorLabel = jQuery('.ErrorLabel');
        if (errorLabel.text() == "The entered values cannot be saved. Please see the fields below for details.") {
        	errorLabel.text("Oops! Looks like you're missing one of the required fields.");
        };
    });
    jQuery(function() {
      jQuery('#dd').next().on('click', function(){if(jQuery(this).children().first().hasClass('sbToggleOpen')) {jQuery(this).css('z-index','99999')} else{jQuery(this).css('z-index','0')}});
    });
//--Level 2 page subnav workaround
    jQuery(function() {
        if (jQuery('.main-content').length > 0 && jQuery('.select-room').length > 0) {
            jQuery('.main-content').addClass('hasSubnav');
        };
    });