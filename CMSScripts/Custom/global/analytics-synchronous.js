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
		//logMe('stripUrl err');
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
	//logMe('strippedUrl' + url);
	return (doesNotContains(url, location.hostname) && (!isBookingDomainLink(url)));
}

function isSameHostname(hostname) {
	return hostname == location.hostname;
}

function logMe(str) {
	if (window.console && window.console.log) {
		window.console.log(str);
	}
}

function getLinkerUrl(url) {
	return pageTracker._getLinkerUrl(url);
}

function trackPageview(str) {
	pageTracker._trackPageview(str);
}

function trackEvent(category, action, opt_label, opt_value, opt_noninteraction) {
	pageTracker._trackEvent(category, action);
}

jQuery(document).ready(function() {

	jQuery('a[href], area[href]').live('click', function() {

		var url = jQuery(this).attr('href');
		var hostname = jQuery(this).attr('hostname');

		//logMe('current hostname: ' + location.hostname + ' -> destination hostname: ' + hostname);

		if (isSameHostname(hostname)) {
			//logMe('isSameHostname');
			return true;
		}

		if (isJsLink(url)) {
			//logMe('isJsLink');
			return true;
		}

		if (isMailToLink(url)) {
			trackPageview('/mailto/' + stripUrl(url));
			//logMe('isMailToLink');
			return true;
		}

		if (isBookingDomainLink(url)) {

			trackPageview('/outgoing/check-availability');

			if (jQuery(this).hasClass("popup")) {
				var popup_params = 'resizable,scrollbars,width=1020,height=600,top=800,left=800';
				if (jQuery(this).attr('rel') != undefined) {
					popup_params = jQuery(this).attr('rel');
				}
				window.open(getLinkerUrl(url), '', popup_params);
				return false;
			}

			jQuery(this).attr('href', getLinkerUrl(url));
			//logMe('isBookingDomainLink');
			return true;
		}

		if (isInternalRelativeLink(url)) {
			//logMe('isInternalRelativeLink');
			return true;
		}

		if (isExternalLinkButNotBookingDomain(url)) {
			//logMe('isExternalLinkButNotBookingDomain');
			trackPageview('/outgoing/' + stripUrl(url));
			return true;
		}

		//logMe('is Returning true by default - absolute internal links - should not reach here. same domain returning b4 now');
		return true;

	});
});