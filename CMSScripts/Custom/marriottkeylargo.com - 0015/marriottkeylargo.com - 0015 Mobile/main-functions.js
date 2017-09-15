// View Full Site Link
jQuery(function() {
    var fullSiteLink = "<li><a href=\"/?mobileRedirect=false\">VISIT FULL WEBSITE</a></li>";
    jQuery('.md-content > ul:first-child').append(fullSiteLink);
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

	jQuery('a[href], area[href]').on('click', function() {

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
	
});


/***** 4th block *****/
// Fix for iPhone viewport bug
jQuery(document).ready(function(){
	var fixedElements = "header nav, footer nav";
	
	if(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
		if (/OS [1-4]/i.test(navigator.userAgent)) {
			jQuery(fixedElements).each(function() {
				if (jQuery(this).css("position") == "fixed") {
					jQuery(this).css("position","static");
				};
			});
		};
	};
});


/***** 5th block *****/
// swiper effect
if (jQuery('.swiper-container').length) {
	var mySwiper = new Swiper('.swiper-container',{
		pagination: '.pagination',
		autoplay: 5000,
		paginationClickable: true,
		loop:true
	})
}


/***** 6th block *****/
// eSpecials remove links
jQuery(function() {
	jQuery('h2.eSpecials_title').each(function() {
		jQuery(this).html(jQuery(this).children('a').html());
	});	 
 	//jQuery('#eSpecials_MoreSpecials a').html('Click Here for More Offers');
});








