//--Side navigation animation
    jQuery("#side-blocks > div").hover(function(){
        jQuery(this).stop(true, false).animate({ width: "150px" });
    }, function() {
        jQuery(this).stop(true, false).animate({ width: "100px" });
    });

//--Something you should never do
   jQuery(function() {
       jQuery(".navigation .inner li a:contains('Strategic Meetings Management')").html("Strategic Meetings<br> Management");
       jQuery(".navigation .inner li a:contains('Corporate Ticket Management')").html("Corporate Ticket<br> Management");
       jQuery(".navigation .inner li a:contains('Hotels & Suppliers')").html("Hotels &<br> Suppliers");
   });

//--Homepage video caption fadeout
    jQuery(function() {
        if (jQuery(window).scrollTop() > 150) {
          jQuery(".center").hide();
       }
   });
    jQuery(window).scroll(function() {
       if (jQuery(window).scrollTop() > 150) {
            jQuery(".center").fadeOut('slow');
       } else {
          jQuery(".center").fadeIn('slow');
       }
   });

    jQuery(window).scroll(function() {
      
        //if(getQuery('mock') == "true"){
            if (jQuery(window).scrollTop() > 450) {
                jQuery(".navigation").css('background', '#005dab');
            } else {
                jQuery(".navigation").css('background', 'rgba(0,93,171,0.86)');
            }
        //} else {
           // if (jQuery(window).scrollTop() > 450) {
           //     jQuery(".navigation").css('background', '#515150');
           // } else {
           //     jQuery(".navigation").css('background', 'rgba(53, 53, 53, 0.86)');
           // }
        //}
        /*if (jQuery(window).scrollTop() > 450) {
            jQuery(".navigation").css('background', '#005dab');
        } else {
            jQuery(".navigation").css('background', 'rgba(0,93,171,0.86)');
        }*/

    });
  

  jQuery(document).ready(function() {
     if (jQuery(document).width() <= 710) {
        jQuery('#mobile-nav ul#menuElem').prepend('<li><a href="/schedule-a-demo/">Schedule A Demo</a></li>');
    };
  });

//--Homepage video
    jQuery(document).ready(function () {
        if (jQuery('.vidWrap').length > 0) {
            jQuery(document.body).vide({
                mp4:'/getmedia/ee661e6a-db10-44fa-9360-e3f570b3556b/home',
                webm:'/getmedia/57b7b2d4-04f6-4a5c-b8db-adc08b132221/home',
                ogv:'/getmedia/8ae9f4e8-0179-446c-99cc-68ed1ecb75d0/home',
                poster:'/getmedia/99013f0f-b2ea-491a-b07b-3f6b12147a4f/home'
            });
            var instance = jQuery(document.body).data("vide");
            var video = instance.getVideoObject();
            //instance.destroy(); // Destroy instance
        };
    });

//--Homepage scroll button
    jQuery('a[rel="relativeanchor"]').click(function(event){
        event.preventDefault();
        //console.log('clicked!');
        jQuery('html, body').animate({
            scrollTop: jQuery( jQuery.attr(this, 'href') ).offset().top - jQuery('.header').height()
            //scrollTop: jQuery('.header').height()
        }, 800);
        return false;
    });

//--Mobile navigation
    var mobile_nav = jQuery('.sidebar').clone().show().appendTo('body').wrap('<div id="mobile-nav"></div>');
    jQuery( "#mobile-nav" ).simpleSidebar({
        settings: {
            opener: "#open-sb",
            wrapper: "#wrapper",
            ignore: "#mobile-header",
            //ignore: "#wrapper",
            animation: {
                easing: "easeOutQuint"
            }
        },
        sidebar: {
            align: "right",
            width: 200,
            closingLinks: 'a'
        }
    });
    jQuery('#mobile-nav ul').append('<li><a href="/blog/">Blog</a></li>');

//--Navigation dropdowns
    jQuery(document).ready(function(){ 
        //jQuery("#nav ul.child").removeClass("child");
        jQuery(".navigation li").has("ul").hover(function(){
            var child = jQuery(this).children("ul");
            var parent = jQuery(this);
            if (child.width() < parent.width()) {
                child.width(parent.width());
            };
            jQuery(this).addClass("current").children("ul").fadeIn();
        }, function() {
            jQuery(this).removeClass("current").children("ul").hide();
        });
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

//--Form On Focus
    //var el = jQuery('input[type=text], textarea');
    //el.focus(function(e) {
    //    if (e.target.value == e.target.defaultValue)
    //        e.target.value = '';
    //});
    //el.blur(function(e) {
    //    if (e.target.value == '')
    //        e.target.value = e.target.defaultValue;
    //});

//--Contact Form Hide Colons
	jQuery('.contactForm label, .interests span').each(function() {
		var text = jQuery(this).text();
			text = text.replace(':','');
		jQuery(this).text(text);
	});

//--Contact Form Move Labels on Focus
    var el = jQuery('.contactForm input[type=text], .contactForm textarea');
	var labelMargin = "-30px";
	var inputMargin = "30px";
	
    el.focus(function(e) {
        if (e.target.value == e.target.defaultValue) {
            jQuery(this).parent().parent().children('label').css('margin-top',labelMargin);
			jQuery(this).css('margin-top',inputMargin);
        };
    });
    el.change(function(e) {
        jQuery(this).parent().parent().children('label').css('margin-top',labelMargin);
		jQuery(this).css('margin-top',inputMargin);
    });
    el.blur(function(e) {
        if (e.target.value == '') {
            jQuery(this).parent().parent().children('label').css('margin-top','0');
			jQuery(this).css('margin-top','0');
        };
    });
    jQuery(function() {
        el.each(function() {
            if (jQuery(this).val() != '') {
				jQuery(this).parent().parent().children('label').css('margin-top',labelMargin);
				jQuery(this).css('margin-top',inputMargin);
            };
        });
    });

//--Contact form product columns
    jQuery(function() {
        if (jQuery('.contactForm').length > 0) {
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
        var form = jQuery(".contactForm");
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

//--Homepage box text fade-in
	function boxFlyIn() {
		var wrapper = jQuery('.middleInner');
        if (wrapper.length > 0 && wrapper.hasClass('home')) {
            var items = wrapper.find('.columnInner');
            var pageBottom = jQuery(document).scrollTop() + jQuery(window).height();
            var elementTop = wrapper.offset();
                elementTop = elementTop.top;
            var offset = 250;
            var speed = 1200;
            
            if (elementTop <= (pageBottom - offset) && window.toggled == false) {
                window.boxesToggled = true;
                items.each(function(i) {
                    var delay = (i/3) * 1000;
                    var thisElement = jQuery(this);
                    thisElement.delay(delay).animate({
                        top:0,
                        opacity:1,
                        easing:'easeOutQuad'
                    }, speed);
                });
            };
        };
	};
	jQuery(function() {
		window.boxesToggled = false;
		boxFlyIn();
	});
	jQuery(document).scroll(function() {
		boxFlyIn();
	});

//--Strategy icons fly-in
	function flyIn() {
        var wrapper = jQuery('.strategy');
        if (wrapper.length > 0 && wrapper.hasClass('home')) {
            var items = wrapper.find('.strategyColumn');
            var exploreBtn = jQuery('.cta');
            var pageBottom = jQuery(document).scrollTop() + jQuery(window).height();
            var elementTop = wrapper.offset();
                elementTop = elementTop.top;
            var offset = 250;
            var speed = 1200;
            
            if (elementTop <= (pageBottom - offset) && window.toggled == false) {
                window.toggled = true;
                items.each(function(i) {
                    var delay = (i/3) * 1000;
                    var thisElement = jQuery(this);
                    thisElement.delay(delay).animate({
                        right:0,
                        easing:'easeOutQuad'
                    }, speed);
                });
                exploreBtn.delay(2000).animate({
                    opacity:1
                }, speed);
            };
        };
	};
	jQuery(function() {
		window.toggled = false;
		flyIn();
	});
	jQuery(document).scroll(function() {
		flyIn();
	});

//--Make page titles lowercase if they are certain product names
    jQuery(function() {
        var titleWrapper = jQuery('.pageTitle h2');
        var titleText = titleWrapper.text();
        var productsList = ["eProposal","eBrochure","eLeads","eMenus","eDine","ePlanner","eSurvey","eInsight","eFaceTime", "eContract", "eCard", "uOrder", "eP LITE" ];
        for (i=0; i<productsList.length; i++) {
            var compareVarTitle = titleText.toLowerCase();
            var compareVarProducts = productsList[i].toLowerCase();
            if (compareVarTitle.indexOf(compareVarProducts) > -1) {
                var newTitlePart1 = "<span>" + productsList[i].slice(0,1) + "</span>";
                var newTitlePart2 = productsList[i].slice(1,productsList[i].length);
                var newTitle = titleText.replace(productsList[i], newTitlePart1 + newTitlePart2);
                titleWrapper.html(newTitle);
            };
        };
    });

//--Center H1 tags properly on product pages
    jQuery(function() {
        var logo = jQuery('.smallLogo');
        var target = jQuery('.content h1').first();
        if (logo.length > 0) {
            //var position = logo.outerWidth() + 'px';
            //target.css('paddingRight',position);
            var h1 = target;
            target.remove();
            jQuery('.content').prepend(h1);
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

    // get query
    var getQuery = function(q){
        return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
    };
	
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