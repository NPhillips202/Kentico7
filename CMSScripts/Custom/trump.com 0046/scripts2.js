// Homepage slideshow get window height for images
    function homeSlideSize() {
      if (jQuery('#isMobile').is(':visible')) {  
        jQuery('#slideshowWrapper, #background').height(jQuery(window).height()-jQuery('#footerWrapper').height());
      };
    };

    jQuery(function() { homeSlideSize() });
    jQuery(window).resize(function() { homeSlideSize() });


// Toggle scripts
	function toggle2() {
		var ele = document.getElementById("toggleText2");
		var text = document.getElementById("displayText2");
		if(ele.style.display == "block") {
			ele.style.display = "none";
			text.innerHTML = "<img src='/getmedia/c69c796c-5d35-4408-ab09-e9bf03175bc4/tandc_button' border='0'>&nbsp;<span class='Underline'>Disclaimer</span>";
		}
		else {
			ele.style.display = "block";
			text.innerHTML = "<img src='/getmedia/f3810f96-6963-4085-a38f-4b6521f286b4/tandc_button_minus' border='0'>&nbsp;<span class='Underline'>Disclaimer</span>";
		}
	}
	
	function toggleTrumpBio() {
		var ele = document.getElementById("toggleText2");
		var text = document.getElementById("displayText2");
		if(ele.style.display == "block") {
			ele.style.display = "none";
			text.innerHTML = "<img src='/getmedia/c69c796c-5d35-4408-ab09-e9bf03175bc4/tandc_button' border='0'>Click to read the remainder of Mr. Trump's biography.";
		}
		else {
			ele.style.display = "block";
			text.innerHTML = "";
		}
	}
//jQuery(window).on('hashchange', function(e){
//    history.replaceState ("", document.title, e.originalEvent.oldURL);
//});

// Subnavigation expand
	function expandSubnav() {
		var target = jQuery('.subNav > ul > li > ul'),
			speed = 300;
		
		jQuery('.subNav').hover(function() {
			target.stop().hide().slideDown(speed);
		}, function() {
			target.stop().slideUp(speed);
		});
	};
	jQuery(function() {
		expandSubnav();

        // Subnav styling class for links between categories and navDividers      
        jQuery('#menuElem').find('.no-cursor').each(function(){
          jQuery(this).nextUntil('.navDivider').addClass('push');
        });
	});
  
//Video Page toggle
  function toggleVideosPage() {
        jQuery('.videoOpener').click(function() {
           var accordion = jQuery(this).next('.videoAccordionWrapper');
           var videoLinkId = jQuery(this).find('.videoLink');
           if (accordion.hasClass('isOpen')) {
             accordion.stop().slideUp('slow');
             accordion.removeClass('isOpen');
             videoLinkId.html('Click to expand videos [+]');
            } else {
              accordion.stop().slideDown('slow');
              accordion.addClass('isOpen');
              videoLinkId.html('Click to hide videos [&ndash;]');
            };
        });
  };
  jQuery(function() {
        toggleVideosPage();
  });
    
//Plays video in iframe    
    jQuery(document).ready(function() {
        jQuery('.videoSingle a').click (function() {
            var video = jQuery(this).attr('href');
            jQuery('#videoContainer').attr('src', video);
            jQuery("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });
    });

// Main navigation
	// Detect if subnav exists, if so, add an arrow icon
	jQuery(function() {
        jQuery('#mainNavList li li').each(function() {
            if (jQuery(this).children('ul').length > 0) {
                jQuery(this).children('a').addClass('navArrow');
            };
        });
    });

	/*
	// Open on hover
	jQuery('#mainNavList li').hover(function() {
		var subNav = jQuery(this).children('ul'),
		//var subNav = jQuery(this).children('div'),
			speed = 200,
			width = jQuery(this).parent('ul').outerWidth();
		// Check if subnav exists
		if (subNav.length > 0) {
			subNav.css('left', width);
			subNav.stop().hide().slideDown(speed, function() { 
				// Remove overflow hidden so other subnavs show
				subNav.css('overflow','visible');
			});
		};
	// Close on mouseout
	}, function() {
		var subNav = jQuery(this).children('ul'),
		//var subNav = jQuery(this).children('div'),
			speed = 200;
		subNav.stop().slideUp(speed);
	});*/

    // docs - http://www.smartmenus.org/docs/
	jQuery(function() {
		jQuery('#mainNavList').find('>ul').smartmenus({
			mainMenuSubOffsetX: 0,
			mainMenuSubOffsetY: 0,
			subMenusSubOffsetX: -20,
			subMenusSubOffsetY: 0,
			//keepInViewport: true,
			subIndicators: false,//true,
			//subIndicatorsPos: 'append',
			//subIndicatorsText: '<span class='navArrow'>&raquo;</span>',
			//subIndicatorsText: '+',
			scrollInterval: 50,
			scrollStep: 100,
			subMenusMinWidth: 256,
            showTimeout: 0,
            hideTimeout: 0
		});
	});
	
// Mobile Main Navigation
	mobileNav = function() {		
		// init mobile menu, ref: http://mmenu.frebsite.nl/documentation/options
		jQuery('#mainNavList').mmenu({
		//jQuery('nav#menu').mmenu({
			extensions: [
				"trump", 
				"border-full",
				"effect-slide-menu",
				"pageshadow"
			],
			//classes: "mm-sage",
			//counters: true,
			//slidingSubmenus: false,
			labels: true,
			offCanvas: {
				position: "right",
			},
			"navbar": {
				"title": "The Trump Organization"
            },
			"navbars": [
				{
					"position": "bottom",
					"content": [
						//jQuery('#footerInner .footerEmail').html(),
						jQuery('#footerInner .footerEmail').clone().wrapInner('<div class="footerEmail" />').html()
						//"<a class='fa fa-envelope' href='#/'></a>",
						//"<a class='fa fa-twitter' href='#/'></a>",
						//"<a class='fa fa-facebook' href='#/'></a>"
					]
				}
			],/**/
		}, {
			// configuration
			clone: true
		});
        
        // apply some adjustments for Kentico server
		//jQuery('#ui-datepicker-div').parent().removeClass('mm-page mm-slideout');
        //console.log(jQuery('#form').length);
		//jQuery('#form').addClass('mm-page mm-slideout');
		
	};
	jQuery(function() {
        //console.log(jQuery('#form').length);
		mobileNav();
	});

// Sticky navigation positioning
	function stickyNav() {
		// Don't use this script if on the homepage or on mobile
		if (!jQuery('#slideshowWrapper').length > 0 && jQuery('#isMobile').is(':hidden')) {
            // Reset
            var nav = jQuery('#navBorder'),
                topPos = jQuery(document).scrollTop();
            nav.css('top', topPos);
			
			var bottomOfContent = jQuery('.contentArea').offset().top + jQuery('.contentArea').outerHeight(),
				bottomOfNav = nav.offset().top + nav.outerHeight(),
				bottomDifference = bottomOfContent - bottomOfNav;
			
            // Do an initial check to see if the nav isn't taller than the content area, if so, increase the content area height
            if (nav.outerHeight() > jQuery('.contentArea').outerHeight()) {
                jQuery('#contentBorder .content').css('min-height', function() {
                    var navHeight = nav.height(),
                        contentPaddingTop = parseInt(jQuery('.content').css('padding-top'), 10),
                        contentPaddingBtm = parseInt(jQuery('.content').css('padding-bottom'), 10);
                    return (navHeight - contentPaddingTop - contentPaddingBtm) + 'px';
                });
                return false;
            };
            
			// Set top positioning
			//console.log('Nav - ' + bottomOfNav + ' | Content - ' + bottomOfContent + ' | Diff - ' + bottomDifference);
			if (bottomDifference < -1) {
				// If bottom of nav is below bottom of content, move nav up
				var newTopPos = jQuery('.contentArea').outerHeight() - nav.outerHeight();
                nav.css('top', newTopPos+'px');
            } else {
				// Else, stick nav to top
				nav.css('top', topPos+'px');
			};
		} else {
            // else reset to top
            jQuery('#navBorder').css('top', '0px');
        };
	};
	jQuery(function() {
		stickyNav();
	});
	jQuery(window).resize(function() {
		stickyNav();
	});
	jQuery(window).scroll(function() {
		stickyNav();
	});
              
//--Site Map
    function sitemapToggle() {
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
    };
    jQuery(function() { 
      sitemapToggle();
    });

// Misc
	function MM_preloadImages() { //v3.0
		var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
		var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
		if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
	}
	
	function MM_swapImgRestore() { //v3.0
		var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
	}
	
	function MM_findObj(n, d) { //v4.01
		var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
		d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
		if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
		for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
		if(!x && d.getElementById) x=d.getElementById(n); return x;
	}
	
	function MM_swapImage() { //v3.0
		var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
		if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
	}

// Mobile resolution detection based off CSS for consistency
//jQuery(function() {
//	if (jQuery('#isMobile').is(':visible')) {
//		console.log('Is mobile');
//	};
//});

      
// Email Form in Footer
    jQuery(function() {
        var emailForm = jQuery('.footerEmail'),
            emailFormInput = emailForm.find('.emailInput'),
            defaultValue = "Enter eMail Address";
        // Clear text in field when focused
        emailFormInput.on('focus', function() {
            if (jQuery(this).val() == defaultValue) {
                jQuery(this).val('');
            };
        });
        emailFormInput.on('blur', function() {
            if (jQuery(this).val() == '') {
                jQuery(this).val(defaultValue);
            };
        });
        // Submit functions
        function submitEmailForm(val) {
            var email = val;
            if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
                alert("Please enter a valid email address.");
                return false;
            };
            document.location.href = ('/emailsignup/?em=' + email);
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
        emailForm.find('.submit').on('click', function(e) {
            e.preventDefault();
            var val = jQuery(this).parent().find('.emailInput').val();
            submitEmailForm(val);
        });
    });
 
// Fix background height on short pages
function fixBackgroundHeight() {
	var background = jQuery('#pageBg'),
		wrapper = jQuery('#pageWrapper');
	if (background.height() > wrapper.height()) {
		background.height(wrapper.height());
	};
};
jQuery(function() {
	fixBackgroundHeight();
};
jQuery(window).resize(function() {
	fixBackgroundHeight();
};


//script for Viewmap Popup

jQuery(document).ready(function() {
	jQuery('#videos a').click (function() {
      var video = jQuery(this).attr('href');
		//alert(video);
		jQuery('#videoContainer').attr('src', video);
		return false;
	});
    
    /** Setting popup top and Left **/
    var window_width = jQuery(window).width();
    var window_height = jQuery(window).height();
    jQuery("#popUpDiv").css('top','calc((100% - 466px) / 2)');
    
    if(window_width > 1201){
        jQuery("#popUpDiv").css('left','calc((100% - 579px) / 2)');
    }
    if(window_width < 1200){
        jQuery("#popUpDiv").css('left','calc((100% - 579px) / 2)');
    }
    if(window_width < 767){
        jQuery("#popUpDiv").css('top','calc((100% - 200px) / 2)');
    }
    if(window_width < 700){
        jQuery("#popUpDiv").css('left','calc((100% - 86%) / 2)');
    }
  
});

function toggle(div_id) {
	var el = document.getElementById(div_id);
	if ( el.style.display == 'none' ) {	el.style.display = 'block';}
	else {el.style.display = 'none';}
}
function blanket_size(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportheight = window.innerHeight;
	} else {
		viewportheight = document.documentElement.clientHeight;
	}
	if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
		blanket_height = viewportheight;
	} else {
		if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
			blanket_height = document.body.parentNode.clientHeight;
		} else {
			blanket_height = document.body.parentNode.scrollHeight;
		}
	}
	var blanket = document.getElementById('blanket');
	blanket.style.height = blanket_height + 'px';
	var popUpDiv = document.getElementById(popUpDivVar);
	popUpDiv_height=blanket_height/2-200;//200 is half popup's height
	
}
function window_pos(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportwidth = window.innerHeight;
	} else {
		viewportwidth = document.documentElement.clientHeight;
	}
	if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
		window_width = viewportwidth;
	} else {
		if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
			window_width = document.body.parentNode.clientWidth;
		} else {
			window_width = document.body.parentNode.scrollWidth;
		}
	}
	var popUpDiv = document.getElementById(popUpDivVar);
	window_width=window_width/2-200;//200 is half popup's width
	
}
function openpopup(windowname) {
  
	blanket_size(windowname);
	window_pos(windowname);
	toggle('blanket');
	toggle(windowname);		
}


var dragdrop = (function(){
	
		var selected = null, // Object of the element to be moved
		 x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
		 x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

			// Will be called when user starts dragging an element
			function _drag_init(elem) {
				// Store the object of the element which needs to be moved
				selected = elem;
				x_elem = x_pos - selected.offsetLeft;
				y_elem = y_pos - selected.offsetTop;
			}

			// Will be called when user dragging an element
			function _move_elem(e) {
				x_pos = document.all ? window.event.clientX : e.pageX;
				y_pos = document.all ? window.event.clientY : e.pageY;
				if (selected !== null) {
					selected.style.left = (x_pos - x_elem) + 'px';
					selected.style.top = (y_pos - y_elem) + 'px';
				}
			}

			// Destroy the object when we are done
			function _destroy() {
				selected = null;
			}

			// Bind the functions...
            if (jQuery('#popUpDiv').length > 0) {
                document.getElementById('popUpDiv').onmousedown = function () {
			    	_drag_init(this);
			    	return false;
			    };
            };
            
			document.onmousemove = _move_elem;
			document.onmouseup = _destroy;
			
	 
	 })();
	 
	 jQuery(window).resize(function(){
		var window_width = jQuery(window).width();
        jQuery("#popUpDiv").css('top','calc((100% - 466px) / 2)');
        if(window_width > 1201){
			jQuery("#popUpDiv").css('left','calc((100% - 579px) / 2)');
		}
        if(window_width < 1200){
			jQuery("#popUpDiv").css('left','calc((100% - 579px) / 2)');
		}
        if(window_width < 767){
            jQuery("#popUpDiv").css('top','calc((100% - 200px) / 2)');
        }
        if(window_width < 700){
            jQuery("#popUpDiv").css('left','calc((100% - 86%) / 2)');
        }
	});

// Mobile thumbnail caption sizing
function wrapThumbnailSections() {
	var thumbTitles = jQuery('.propertyButtons h2');
	thumbTitles.each(function(i) {
		var thisSection = jQuery(this).nextUntil('h2');
		thisSection.wrapAll('<div class="thumbSection" />');
	});
};

function resizeThumbnailCaptions() {
	var thumbs = jQuery('.propertyButtons .button'),
		captions = thumbs.find('.buttonCaptionText span');
	// Detect if mobile
	if (jQuery(document).width() < 700) {
		// Detect if thumbnails are divided by h2 titles or not
		if (jQuery('.propertyButtons h2 ').length > 0) {
			// Select each section of thumbnails
			jQuery('.thumbSection').each(function() {
				var thumbs = jQuery(this).find('.button');
				// Select every 2 thumbnails
				for(var i=0; i < thumbs.length; i+=2) {
					// Compare heights and match to highest
					var divs = thumbs.slice(i, i+2), 
						captionEles = divs.find('.buttonCaptionText span'),
						height = Math.max(captionEles.eq(0).height(), captionEles.eq(1).height());
					captionEles.css('height', height);
				};
			});
		} else {
			// Select every 2 thumbnails
			for(var i=0; i < thumbs.length; i+=2) {
				// Compare heights and match to highest
				var divs = thumbs.slice(i, i+2), 
					captionEles = divs.find('.buttonCaptionText span'),
					height = Math.max(captionEles.eq(0).height(), captionEles.eq(1).height());
				captionEles.css('height', height);
			};
		};
	} else {
		// Non-mobile fallback
		captions.css('height','39px');
	};
};
jQuery(function() {
	wrapThumbnailSections();
	resizeThumbnailCaptions();
});
jQuery(window).resize(function() {
	resizeThumbnailCaptions();
});


//load the overlay on the home page
/*jQuery('#overlay2').css({'opacity': 0, 'display': "block"});
jQuery('#overlay2').animate({'opacity': 1}, 1000).on("click", function() {
    jQuery('#overlay2').animate({'opacity': 0}, 1000);
});*/


// get query string
/*var getQuery = function(q) {

	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
};*/
