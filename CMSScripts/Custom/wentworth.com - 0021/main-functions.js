jQuery(document).ready(function() {
    jQuery('.img .img').each(function() {
        jQuery(this).delay(800).fadeIn(1200);
    });
});

/*
if ((jQuery.cookie('ceuceweu') != '1') || (jQuery.cookie('cc_cookie_accept') == "cc_cookie_accept")) {
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-25092469-1']);    
	
	_gaq.push(['_setDomainName', 'thesagamore.com']);
	_gaq.push(['_setAllowLinker', true]);
	
	_gaq.push(['_trackPageview']);
	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
}
*/

/***** 1st block *****/
//ver 6.2 (contains new boolean functions for clarity and jquery hasAttribute) + console logging

//mh jquery implementation of formerly itHappened() function    
function stripUrl(inStrip) {
    try {
        inStrip = inStrip.replace(/http:/gi, '');
        inStrip = inStrip.replace(/https:/gi, '');
        inStrip = inStrip.replace(/www./gi, '');
        inStrip = inStrip.replace(/&/gi, '_');
        inStrip = inStrip.replace(/#/gi, ''); //remove hashes
        inStrip = inStrip.replace(/\/\//gi, ''); //remove slashes
        return inStrip;
    } catch (Error) {
        logMe('stripUrl err');
        return "";
    }
}

function contains(haystack, needle) {
    return haystack.indexOf(needle) > -1;
}

function doesNotContains(haystack, needle) {
    return haystack.indexOf(needle) == -1;
}

function isJsLink(url) {
    return contains(url, 'javascript:');
}

function isMailToLink(url) {
    return contains(url, 'mailto:');
}

function isBookingDomainLink(url) {
    url = stripUrl(url);
    return contains(url, jQuery('#Booking_Domain_Input').val())
}

function isInternalRelativeLink(url) {
    return doesNotContains(url, ':');
}

function isExternalLinkButNotBookingDomain(url) {
    url = stripUrl(url);
    logMe('strippedUrl' + url);
    //seems to have bug it it absolute url on same domain
    return (doesNotContains(url, location.hostname) && (!isBookingDomainLink(url)));
}

function isSameHostname(hostname) {
    return hostname == location.hostname;
}

//this shows in firebug or ies console if active
function logMe(str) {
    if (window.console && window.console.log) {
        window.console.log(str);
    }
}


/***** 2nd block *****/
/* misc functions */
function getLinkerUrl(url) {
    var tracker = _gaq._getAsyncTracker();
    var linkerUrl = tracker._getLinkerUrl(url);
    return linkerUrl;         
}

function trackPageview(str) {
    _gaq.push(['_trackPageview', str]);
}

function trackEvent(category, action, opt_label, opt_value, opt_noninteraction) {
    _gaq.push(['_trackEvent', category, action]);
} 


/***** 3rd block *****/
/* misc scripts */
jQuery(document).ready(function() {

	jQuery('a[href], area[href]').live('click', function() {

		var url = jQuery(this).attr('href');
		var hostname = jQuery(this).attr('hostname');

		logMe('current hostname: ' + location.hostname + ' -> destination hostname: ' + hostname);

		if (isSameHostname(hostname)) {
			logMe('isSameHostname');
			return true;
		}

		if (isJsLink(url)) {
			logMe('isJsLink');
			return true;
		}

		if (isMailToLink(url)) {
			trackPageview('/mailto/' + stripUrl(url));
			logMe('isMailToLink');
			return true;
		}

		if (isBookingDomainLink(url)) {

			trackPageview('/outgoing/check-availability');

			//for reservation links that open in pop-up windows, can put params in rel attribute                
			if (jQuery(this).hasClass("popup")) {
				var popup_params = 'resizable,scrollbars,width=1020,height=600,top=800,left=800';
				//pull popup parameters from forms' rel attribute
				if (jQuery(this).attr('rel') != undefined) {
					popup_params = jQuery(this).attr('rel');
				}
				window.open(getLinkerUrl(url), '', popup_params);
				return false;
			}

			//sets getLinkerUrl href here
			jQuery(this).attr('href', getLinkerUrl(url));
			logMe('isBookingDomainLink');
			return true;
		}

		if (isInternalRelativeLink(url)) {
			logMe('isInternalRelativeLink');
			return true;
		}

		//if the hostname is not in the href url (external links)
		if (isExternalLinkButNotBookingDomain(url)) {
			logMe('isExternalLinkButNotBookingDomain');
			trackPageview('/outgoing/' + stripUrl(url));
			return true;
		}

		logMe('is Returning true by default - absolute internal links - should not reach here. same domain returning b4 now');
		return true;

	});
	
	//mh
	//GoBooking Replacement
	//Strategy: Unobtrusive Approach which will work w/ every booking engine by using the form as the primary driver,
	//instead of hard-coding urls into js, use the form to create the parameters of the url and then redirect it to Google Tracking + window.open.
	//Since the form is supplied by the vendor or can easily be copied this should work w/ every booking engine.


	//form tag:  class="Booking_Mask" needed and class = "popup" for popup window
	//    <form id="frmRoomInventory" name="frmRoomInventory" class="Booking_Mask popup selectboxplugin" method="get"
	//    action="https://indecorp.ibe.netbooker.com/web/FrontController.nb4" target="_blank" rel="resizable,scrollbars,width=800,height=600,top=500,left=500">
	//resnet has very different form from others give form extra class of resnet   class="Booking_Mask iframe resnet"

	//classes:  Booking_Mask, popup, noGoogleLinkerUrl, resnet, iframe, (.startmonth ->zeroBasedMonth)
	
	//if booking mask overrides datepickers from document.ready
	if (jQuery(".Booking_Mask").length > 0) {


		jQuery(".selectboxplugin select").selectbox({
			onChangeCallback: selectBoxChanged

		});
		//all selects in booking mask prettied & styled. put styles at bottom of styles.css.

		//Booking Mask Form Submitted
		jQuery(".Booking_Mask").submit(function() {

			if (jQuery('.numbernights').length > 0) {

				pushDate(getPushdate());
			}

			//serialize all form values
			var values = jQuery(this).serialize();
			var action = jQuery(this).attr('action')
			var strLink = action + '?' + values;

			var linkerUrl = getLinkerUrl(strLink);  //gets url w/ GA link params

			//myfidelio throws errors if u send google vars - doesnt support.
			if (jQuery(this).hasClass("noGoogleLinkerUrl")) linkerUrl = strLink;

			//track here as after this  point all outgoing links.        
			trackPageview('/outgoing/check-availability/');   //calls gif asynch

			//resnet has custom url /w iframe
			if (jQuery(this).hasClass("resnet")) {
				GoBooking_Resnet(action);
				// alert('resnet');
				return false;
			}

			//need to handle iframe here -- target self - same site so no outgoing
			if (jQuery(this).hasClass("iframe")) {
				window.open(linkerUrl, jQuery(this).attr('target'), '');
				return false;

			}


			if (jQuery(this).hasClass("popup")) {
				var popup_params = 'resizable,scrollbars,width=1020,height=600,top=800,left=800';

				//pull popup parameters from forms' rel attribute
				if (jQuery(this).attr('rel') != undefined) {
					popup_params = jQuery(this).attr('rel');
				}
				window.open(linkerUrl, '', popup_params);
				return false;  //so form doesn't submit as well as popup
			}

			//if not popup class returns  w/ target=_blank
			window.open(linkerUrl, jQuery(this).attr('target'), '');
			return false;

		}); //end .Booking_Mask submit

		dateFormat = 'm/d/yy'

		//start datepickers

		//TODO: calc numberOfNights based on startdate.getValue - enddate.getvalue
		if (jQuery("#startdate").length > 0) {


			jQuery.datepicker.setDefaults({
				minDate: 0,
				buttonText: '',
				defaultDate: +1,
				showOn: 'both',
				buttonImageOnly: false,
				dateFormat: dateFormat //leading zeros breaks selectbox plugin integration -should handle that at b4 sending to selectbox -- resnet needs leading zeros
			});

			jQuery('#startdate').datepicker({

				onClose: function() {
					pushDate(getPushdate())
					fillStartDateDropdowns(jQuery(this).val())  //instance data issue here if no #enddate - cascading to ?

				}
				//TODO: push dropdowns ahead
			});

			jQuery('#enddate').datepicker({
				beforeShow: minRange,
				defaultDate: +0,
				onClose: function() {
					fillEndDateDropdowns(jQuery(this).val())
				}
			});

			//initial setup after initialize datePickers()

			pushDate(getPushdate());


		} //end datepicker

		//if submit button is img tag w/ mouseovers already attached so i can't change to <input type=image
		jQuery('.booking_submit').click(function() {
			jQuery('.Booking_Mask').submit();
		})


	} //end if booking mask form 
});


/***** 4th block *****/
// iPad Dropdown Fix
jQuery(function() {
	var marginTop = "-900px";
	if (Modernizr.touch) {
		jQuery('*').click(function(e) {
			thisEle = jQuery(this);
			if (thisEle.is('#nav > li > div > a')) {
				e.stopPropagation();
				var dd = thisEle.parent('div').children('ul');
				if (dd.css('margin-top') == marginTop) {
					jQuery('#nav > li > div > ul').css('margin-top',marginTop);
					dd.css('margin-top','0px');
					return false;
				};
			} else {
				jQuery('#nav > li > div > ul').css('margin-top',marginTop);
			};
		});
	} else {
		jQuery('*').mouseover(function(e) {
			thisEle = jQuery(this);
			if (thisEle.is('#nav > li > div')) {
				e.stopPropagation();
				var dd = thisEle.children('ul');
				if (dd.css('margin-top') == marginTop) {
					dd.css('margin-top','0px');
				};
			} else {
				jQuery('#nav > li > div > ul').css('margin-top',marginTop);
			};
		});
	};
});


/***** 5th block *****/
/* colorbox */
jQuery(function(){
	// Events
	if (jQuery(window).width() <= 650) {
		var eventWidth = jQuery(document).width();
		var eventHeight = "80%";
	} else {
		var eventWidth = "400px";
		var eventHeight = "500px";
	};
	// Gift Card colorbox popup
	jQuery("a.gCard").colorbox({
		width:eventWidth, 
		height:eventHeight, 
		iframe:true});
	// Mini Gallery colorbox popup
	jQuery('a.gallery').colorbox({
		rel:'gallery1',
		closeButton:true});
	// Map colorbox popup
	jQuery('a.map').colorbox({
		rel:'gallery2',
		closeButton:true});
	// Video colorbox popup
	jQuery(".iframe").colorbox({
		iframe:true, 
		width:650, 
		height:387});
});


/***** 6th block *****/
/* jquery.bxslider and easy-responsive-tabs
jQuery(function() {
	jQuery('.carousel').bxSlider({
	  slideSelector: '.eSpecials_all_table',
	  mode: 'horizontal',
	  minSlides: 1,
	  maxSlides: 2,
	  moveSlides: 1,
	  slideWidth: 9999,
	  startSlide: 0,
	  preloadImages: 'all',
	  pager: false
	});
	// Initialize tabs after slider is loaded
	jQuery('#horizontalTab').easyResponsiveTabs({
		type: 'default',  
		width: 'auto',
		fit: true
	});
	
	var txt = jQuery('.carousel .eSpecials_all_table .eSpecials_more_info');
	txt.each(function() {
		var txtLink = jQuery(this).children('a').attr('href');
		jQuery(this).html('<a href="' + txtLink + '" class="eSpecials_TextLink">MORE INFO</a>');
	});
	
	jQuery('#horizontalTab').css('height','auto');
	jQuery('#horizontalTab').css('overflow','visible');
	if (document.width <= collapseWidth) {
		closeTabs();
	};
	jQuery('.carousel2').bxSlider({
	  slideSelector: '.slide2',
	  mode: 'horizontal',
	  minSlides: 1,
	  maxSlides: 5,
	  moveSlides: 1,
	  startSlide: 0,
	  preloadImages: 'all',
	  pager: false,
	  onSliderLoad: function() {
		// Initialize tabs after slider is loaded
		jQuery('#horizontalTab').easyResponsiveTabs({
			type: 'default',  
			width: 'auto',
			fit: true
		});
		
		var txt = jQuery('.carousel .eSpecials_all_table .eSpecials_more_info');
		txt.each(function() {
			var txtLink = jQuery(this).children('a').attr('href');
			jQuery(this).html('<a href="' + txtLink + '" class="eSpecials_TextLink">MORE INFO</a>');
		});
		
		jQuery('#horizontalTab').css('height','auto');
		jQuery('#horizontalTab').css('overflow','visible');
		if (document.width <= collapseWidth) {
			closeTabs();
		};
	  }
	});
	jQuery('.carousel-compact').bxSlider({
	  pager: true,
	  adaptiveHeight: true,
	  slideWidth: 745,
	  minSlides: 1,
	  maxSlides: 1
	});
  
	// Close button scripts
	function closeTabsBtn() {
		if (!jQuery('.close-tabs').hasClass('collapsed')) {
			jQuery('.tabs-area .inner2').css('overflow','hidden');
			//jQuery('.booking h3').animate({'top':'-4px'},500);
			jQuery('.availabityFormDiv h3').animate({'top':'-3px'},500);
			jQuery('.tabs-area .inner2 > table').animate({'margin-top':'155px'},500, function() {
				jQuery('.resp-tab-active').removeClass('resp-tab-active');
				jQuery('.close-tabs').addClass('collapsed');
				jQuery('.close-tabs span').html('open');
			});
		};
	};
	jQuery('.close-tabs').click(function() {
		closeTabsBtn();
	});
	
	function openTabsBtn() {
		if (jQuery('.close-tabs').hasClass('collapsed')) {
			//jQuery('.booking h3').animate({'top':'0px'},500);
			jQuery('.availabityFormDiv h3').animate({'top':'0px'},500);
			jQuery('.tabs-area .inner2 > table').animate({'margin-top':'0px'},500, function() {
				jQuery('.tabs-area .inner2').css('overflow','visible');
			});
			jQuery('.close-tabs').removeClass('collapsed');
			jQuery('.close-tabs span').html('close');
		};
	};
	jQuery('.tabs, .booking').click(function() {
		openTabsBtn();
	});
	
	// Functions for closing/opening tabs on load/orientation change
	var collapseWidth = 996;
	
	function closeTabs() {
		openTabsBtn();
		jQuery('.resp-tab-content-active').each(function() {
			jQuery(this).removeClass('resp-tab-content-active');
			jQuery(this).hide();
		});
		jQuery('.resp-tab-active').removeClass('resp-tab-active');
	};
	
	function openDefaultTab() {
		closeTabs();
		jQuery('.resp-tab-content').first().addClass('resp-tab-content-active');
		jQuery('.resp-tab-content').first().show();
		jQuery('.resp-tab-item').first().addClass('resp-tab-active');
	};
	
	if (document.width <= collapseWidth) {
		// Open/close tabs on orientation switch on iPad
		function updateOrientation() {
			switch(window.orientation) {
				case 0:
						closeTabs();
						break;	
				case 90:
						openDefaultTab();
						break;
				case -90:
						openDefaultTab();
						break;
				case 180:
						closeTabs();
						break;	
			}
		}
		window.onorientationchange=updateOrientation;
	};
	
	jQuery(window).resize(function() {
		if (document.width <= collapseWidth) {
			closeTabs();
		} else {
			openDefaultTab();
		};
	});
}); */


/***** 7th block *****/
/* qTip */
jQuery(function() {
	jQuery('.pgal-float ul li a').qtip({
		hide: {
			fixed: true,
				delay: 500,
				type: 'fade'
			},
		position: {
			at: 'top left',
			adjust: {
				y: -28,
				x:10
			}
		}
	});
});


/***** 8th block *****/
/* selectbox */
jQuery(function () {
	jQuery(".select").selectbox();
	jQuery(".select2").selectbox({
		classHolder : "sbHolder2",
		classSelector : "sbSelector2"
		});
});


/***** 9th block *****/
/* nivo slider */
jQuery(window).load(function() {
	jQuery('#slider').nivoSlider({
		effect: 'fade', // Specify sets like: 'fold,fade,sliceDown'
		slices: 15, // For slice animations
		boxCols: 8, // For box animations
		boxRows: 4, // For box animations
		animSpeed: 1200, // Slide transition speed
		pauseTime: 8000, // How long each slide will show
		startSlide: 0, // Set starting Slide (0 index)
		directionNav: true, // Next & Prev navigation
		controlNav: false, // 1,2,3... navigation
		controlNavThumbs: false, // Use thumbnails for Control Nav
		pauseOnHover: false, // Stop animation while hovering
		manualAdvance: false, // Force manual transitions
		prevText: 'Prev', // Prev directionNav text
		nextText: 'Next', // Next directionNav text
		randomStart: false, // Start on a random slide
		beforeChange: function(){}, // Triggers before a slide transition
		afterChange: function(){}, // Triggers after a slide transition
		slideshowEnd: function(){}, // Triggers after all slides have been shown
		lastSlide: function(){} // Triggers when last slide is shown
	});
});


/***** 10th block *****/
/* Interactive Map */
jQuery(window).ready(function() {
	var button = jQuery('#intMapBtn');
	var target = jQuery('#intMapFrame');
	var frameHeight = '500px';
	var speed = 600;
	
	button.click(function(e) {
		e.preventDefault();
		if (jQuery('.top').hasClass('open')) {
			jQuery('.top').removeClass('open');
			button.removeClass('open');
			target.animate({'height':'0'},speed);
		} else {
			if (target.children('iframe').attr('src') < 1) {
				target.children('iframe').attr('src','http://www.opalcollection.com/interactive-map/');
			};
			jQuery('.top').addClass('open');
			button.addClass('open');
			target.animate({'height':frameHeight},speed);
			jQuery('html, body').animate({scrollTop:target.offset().top}, speed);
		};
	});
});


/***** 11th block *****/
/* eSpecials */
jQuery(function() {
	jQuery('.eSpecials_image img').each(function() {
		var width = jQuery(this).width();
		var height = jQuery(this).height();
		
		if (width > height) {
			jQuery(this).height(150);
			jQuery(this).width('auto');
			
			var currentWidth = jQuery(this).width();
			var margin = ((currentWidth - 150) / 2);
			jQuery(this).css('margin-left','-' + margin + 'px');
		} else {
			jQuery(this).height('auto');
			jQuery(this).width(150);
		};
	});
});


/***** 12th block *****/
/* booking */
function avSubmitOPL4Website() {
	var hcfull, hc = $("#hotelCode").val();
	if (hc=="") {  // if no properties Selected
		jQuery("#hotelCodeContainer .sbHolder").addClass("redIt");setTimeout(function() {	$("#hotelCodeContainer .sbHolder").removeClass("redIt");},1000);
	} else {
		_gaq.push(['_trackPageview', '/outgoing/check-availability']);
		
		var requestTypeInput = jQuery('#requestType');
		var promoCodeInput = jQuery('#promo');
		if (requestTypeInput.val() != '' && promoCodeInput.val() != '' && promoCodeInput.val() != 'Promo Code') {
			jQuery("#availabilityform").submit();
		} else {
			requestTypeInput.attr('name','');
			promoCodeInput.attr('name','');
			jQuery("#availabilityform").submit();
			requestTypeInput.attr('name','requestType');
			promoCodeInput.attr('name','code');
		};
	}
}
jQuery(function() {
	// Special Rates
	jQuery('.update-code').click(function(e) {
		e.preventDefault();
		jQuery('.special-rates-overlay').fadeIn(300);
	});
	
	function updatePromo() {
		if (jQuery('#requestType').val() != '' && jQuery('#promo').val() != '' && jQuery('#promo').val() != 'Promo Code') {
			jQuery('.no-rate').hide();
			jQuery('.rate').show();
			jQuery('.special-rates .rate .code').text(jQuery('#promo').val());
		} else {
			jQuery('.no-rate').show();
			jQuery('.rate').hide();
		};
	};
	
	jQuery('.submit-promo').click(function() {
		if (jQuery('.special-rates-overlay').is(':visible')) {
			jQuery('#requestType').selectbox('close');
			updatePromo();
			jQuery('.special-rates-overlay').fadeOut(300);
		};
	});
	
	// Dropdowns
	jQuery("#adults").selectbox({
		classHolder:'sbHolder2',
		classSelector:'sbSelector2',
		effect:"slide"	
	});
	
	jQuery("#children").selectbox({
		classHolder:'sbHolder2',
		classSelector:'sbSelector2',
		effect:"slide"	
	});
	jQuery("#nights").selectbox({
		classHolder:'sbHolder2',
		classSelector:'sbSelector2',
		effect:"slide"	
	});
	jQuery("#requestType").selectbox({
		classHolder:'sbHolderPromo',
		classSelector:'sbSelectorPromo',
		effect:"slide"	
	});
    jQuery("#rooms").selectbox({
		classHolder:'sbHolder2',
		classSelector:'sbSelector2',
		effect:"slide"	
	});
  jQuery("#guests").selectbox({
		classHolder:'sbHolder2',
		classSelector:'sbSelector2',
		effect:"slide"	
	});
});

setInititialDates();





