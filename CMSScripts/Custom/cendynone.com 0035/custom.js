//--Append Blog to navigation
	jQuery(function() {
		jQuery('.navigation > ul > li:eq(3)').after('<li><a href="/blog/">Blog</a></li>');
	});

//--Top bar collapse for mobile
	var mobileHeaderCollapse = function() {
		//console.log('test');
		var y = jQuery(this).scrollTop();
		if (y > 50) {
			jQuery('.free-bird').fadeIn(500);
			jQuery('header').addClass('collapsed'); 
            jQuery('#mobile-btn').css('top', '20px'); 
			// Recalc top padding
			var barHeight = jQuery('.header-inner').outerHeight();
			jQuery('.top').css('padding',barHeight+'px 0 0 0');
		} else {
			jQuery('.free-bird').fadeOut(500);
			jQuery('header').removeClass('collapsed');
          jQuery('#mobile-btn').css('top', '-22px'); 
			// Recalc top padding
			var barHeight = jQuery('header').outerHeight();
			jQuery('.top').css('padding',barHeight+'px 0 0 0');
		}
	};


	function enableMobileHeaderCollapse() {
		if (jQuery("#mobileQuery").is(":visible")) {
			jQuery(window).bind('scroll',mobileHeaderCollapse);
		} else {
			jQuery(window).unbind('scroll',mobileHeaderCollapse);
			// Remove classes here
		};
	};
	jQuery(function() {
		enableMobileHeaderCollapse();
	});
	jQuery(window).resize(function() {
		enableMobileHeaderCollapse();
	});

//--Top bar sizing
	function barHeight() {
		var barHeight = jQuery('header').outerHeight();
		jQuery('.top').css('padding',barHeight+'px 0 0 0');
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

//--Navigation dropdowns
	jQuery(".navigation li").has("ul").hover(function(){
		var child = jQuery(this).children("ul");
		var parent = jQuery(this);
		if (child.width() < parent.width()) {
			child.width(parent.width());
		};
		jQuery(this).addClass("current").children("ul").fadeIn(330);
	}, function() {
		jQuery(this).removeClass("current").children("ul").hide();
	});

//--Mobile Navigation
	jQuery(function() {
		 var mobile_menu = jQuery('<nav />').attr('id', 'menu');
		 var ul = jQuery('<ul></ul>');
		 var nav_clone = jQuery('.navigation > ul').clone();
		 nav_clone.find('> li').each(function() {
			 ul.append(jQuery(this));
		 });
		 mobile_menu.append(ul);
		 mobile_menu.prependTo('body');
		 jQuery('nav#menu').mmenu({
			 offCanvas: {
				position  : "top",
				zposition : "front",
				classes: "mm-light"
			 },
		 })
			  .on( 'opening.mm', function() {
			jQuery( '#nav-toggle' ).addClass('active');
		})
		// navicon animation
		.on( 'closing.mm', function() {//.on( 'closed.mm', function() {
			jQuery( '#nav-toggle' ).removeClass('active');
		});
	});


//--Map
    jQuery(document).ready(function() {  
    // Disable scroll zooming and bind back the click event
      var onMapMouseleaveHandler = function (event) {
        var that = jQuery(this);
    
        that.on('click', onMapClickHandler);
        that.off('mouseleave', onMapMouseleaveHandler);
        that.find('iframe').css("pointer-events", "none");
      }
    
      var onMapClickHandler = function (event) {
        var that = jQuery(this);
    
        // Disable the click handler until the user leaves the map area
        that.off('click', onMapClickHandler);
    
        // Enable scrolling zoom
        that.find('iframe').css("pointer-events", "auto");
    
        // Handle the mouse leave event
        that.on('mouseleave', onMapMouseleaveHandler);
      }
    
      // Enable map zooming with mouse scroll when the user clicks the map
      jQuery('.maps.embed-container').on('click', onMapClickHandler);
    });

//--Remove footer Image
    if (jQuery('.contact-page-form').length > 0) {
      jQuery('.top-footer-image').css('display','block');
    } else {
      jQuery('.top-footer-image').css('display','none');
    };

//--Contains
    jQuery("label:contains('Interactive Design + Development')").addClass('last-one');
    jQuery(".page-title:contains('Solutions we Provide')").attr('id', 'solutions-we-provide');

//--Site Map Position
    var sitemap_link = jQuery('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
    jQuery('.footer-navigation, .col-1 .footer-nav').find('ul li:nth-last-child(2)').after(sitemap_link);
	
//--Product accordion for mobile
	jQuery(function() {
	    if (jQuery("#mobileQuery").is(":visible")) {
	        jQuery('.accordion .subArrow').click(function(e) {
	            e.preventDefault();
	            var currentLink = jQuery(this);
	            var delay = 500;

	            jQuery('.accordion .image, .accordion .content-drop').slideUp(delay);
	            if (jQuery(this).hasClass('on')) {
	                jQuery('.subArrow').removeClass('on');
	            } else {
	                jQuery('.subArrow').removeClass('on');
	                jQuery(this).addClass('on');

	                var top = jQuery('.accordion .acc-wrapper').first().offset().top - jQuery('header').height();
	                jQuery('html, body').animate({
	                    scrollTop: top
	                }, delay);
	                setTimeout(function() {
	                    var top = jQuery(currentLink).offset().top - jQuery('header').height();
	                    currentLink.parent().find('.content-drop').slideDown(delay, function() {
	                        currentLink.parent().parent().find('.image').slideDown(delay);
	                    });
	                    jQuery('html,body').animate({
	                        scrollTop: top
	                    }, delay);
	                }, delay);
	            };
	        });
	    };
	});
 

// Navigation 
    jQuery('.navigation ul').prepend('<li class="menu"><a href="#menu"><i class="fa fa-plus"></i> Menu</a></li> <li class="front-side Next"><a id="nav-toggle" href="#"></a></li>');

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

//--Anchor Links
    jQuery('.sub-navigation-links a.anchor').click(function(e){  
        e.preventDefault();
        var targetId = jQuery(this).attr("href");
        var top = jQuery(targetId).offset().top - jQuery('header').height();
        jQuery('html, body').stop().animate({scrollTop: top }, 1500);
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
        var form = jQuery(".contact, .contact-page-form");
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



//--Custom Scrollbar for Parallax
	//jQuery(function() {
	//	//window.dzsscr_init(jQuery('#wrapper'),{
	//	jQuery('#wrapper').scroller({
	//		'type':'scrollTop',
	//		'settings_skin':'skin_default',
	//		enable_easing: 'on',
	//		settings_autoresizescrollbar: 'on',
	//		settings_chrome_multiplier : 0.06
	//		//settings_refresh:10000
	//	});
    //});

//--Subpage Navigation Animation
	jQuery(function() {
		var wrapperWidth = jQuery('.sub-navigation').width();
		var navWidth = jQuery('.sub-navigation-inner').width();
		var difference = wrapperWidth - navWidth;
		if (difference < 0) {
			jQuery('.sub-navigation-inner').css('margin-left',difference);
			jQuery('.sub-navigation-inner').animate({
				 marginLeft: '0',
				 border: '1px solid #000'
			}, 600);
		};
	});

//--Superscript register icons on product listing pages
    jQuery(function() {
        jQuery('.right-blade .new-product-title, .left-blade .new-product-title').each(function() {
            var text = jQuery(this).text();
            if (text.slice(text.length-1,text.length) == "®") {
                var newText = text.slice(0,text.length-1) + "<sup>®</sup>";
              jQuery(this).html(newText);
            };
        });
    });

//--Stick footer to bottom if it isn't touching bottom of screen
    function footerHeight() {
        // Set to defaults
        jQuery('.content').height('auto');
        // Vars
        var footerHeight = jQuery('footer').outerHeight();
        var footerBottom = jQuery('footer').offset();
            footerBottom = footerBottom.top + footerHeight;
        var windowBottom = jQuery(document).height();
        var difference = windowBottom - footerBottom;
        // Check if footer is touching bottom of document
        if (difference > 0) {
            var contentHeight = jQuery('.content').height() + difference;
            jQuery('.content').height(contentHeight);
        };
    };
    
    jQuery(function() {
        if (!jQuery('.contact').length > 0) {
            footerHeight();
        };
    });
    
    jQuery(window).resize(function() {
        if (!jQuery('.contact').length > 0) {
            footerHeight();
        };
    });

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