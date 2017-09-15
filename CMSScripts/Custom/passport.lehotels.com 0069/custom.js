/* Automatically Generate Photo Gallery if there is none */
var max = 50;
var existing_gallery = jQuery('.simple-gallery');
var parent = jQuery("#content .gallery-placeholder");
var HTML = ["<div id='test_simeple-gallery' class='simple-gallery' data-pswp-uid='1' itemscope='' itemtype='http://schema.org/ImageGallery'>"];
if(existing_gallery.length < 1) {
	for (var i=0, len=max; i<len; i++) {
		var random = parseInt((Math.random() * 100), 10);
		if(parent.is('.logo')) {
			var color = ('0' + random).slice(-2) + '02' + ('0' + i).slice(-2);
			var img_url = '//fakeimg.pl/768x600/' + color + '/fff/?text=Logo+' + i + '&font=bebas&width=768&height=600&v=' + random;
		} else {
			if (i%3===0 && (i!==0)) {
				var img_url = '//placeimg.com/640/480/arch?width=600&height=480&v=' + random;
			} else {
				var img_url = 'http://lorempixel.com/700/500?width=700&height=500&v=' + random;
			}
		}
		//HTML.push("<a href='" + img_url + "' style='background-image:url(" + img_url + "&maxsidesize=300);' data-size='800x600' data-author='Abbington Banquets' itemprop='associatedMedia' itemscope itemtype='http://schema.org/ImageObject'><img src='" + img_url + "&maxsidesize=300' itemprop='thumbnail' alt='' /><figcaption itemprop='caption description'></figcaption></a>");
		HTML.push("<a href='" + img_url + "' data-size='800x600' data-author='LE Passport' itemprop='associatedMedia' itemscope itemtype='http://schema.org/ImageObject'><img src='" + img_url + "&maxsidesize=300' itemprop='thumbnail' alt='' /><figcaption itemprop='caption description'></figcaption></a>");
		/*if (i%10===0 && (i!==0) {
		    HTML.push("</div>");
		    HTML.push("<div id='test_simeple-gallery' class='simple-gallery' data-pswp-uid='1' itemscope='' itemtype='http://schema.org/ImageGallery'>");
		}*/
	}
	HTML.push("</div>");
	parent.append(HTML.join("\n");
}

//
//jQuery(function(){});
//jQuery(window).bind('load', function() {});

//--Overlay for Popup Forms
// Function for disabling main page scrolling
function disablePageScroll() {
	if (!jQuery('html').hasClass('noscroll')) {
		if (jQuery(document).height() > jQuery(window).height()) {
			var scrollTop = (jQuery('html').scrollTop()) ? jQuery('html').scrollTop() : jQuery('body').scrollTop();
			jQuery('html').addClass('noscroll').css('top',-scrollTop);
		};
	};
};


//--Mobile navigation slideout menu
function initMobileMenu() {
	//console.log(jQuery('#main-menu').length);
	jQuery('#main-menu').mmenu({
		// Options
		navbar: {
			title: 'Passport LE Hotels'
		},
		extensions: [
			"lehotels",
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
			//menuWrapperSelector: "#wrapper",
			//pageNodetype: "form",
			pageSelector: "#wrapper"
		}
	}).on('init', function(){
		var menu = jQuery('.mm-panel').first(),
			socialBar = jQuery('#main-menu_wrapper > .socials').clone();
		socialBar.appendTo(menu);
	}).trigger( "init" );
}

// get query string
function getQuery(q) {
	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
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

// Open overlay - Iframe; e.g. Calendar forms, etc.
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

// Open overlay - Modal popup message - denied access via ?no-access=true
//var no_access = /\?no-access\=|&no-access\=/i.test(location.href));
if(getQuery('no-access') == 'true'){
	jQuery(function() {
		var overlay = jQuery('<div class="formOverlayWrapper variableHeight"><div class="formOverlay"><div class="formOverlayClose"><i class="fa fa-times"></i></div><div class="formOverlayContent" /></div></div>'),
			div = "<div id='content'><h2 class='denied'>You currently do not have access to this area. Please contact the system administrator.</h2></div>";
		//e.preventDefault();
		disablePageScroll();
		// Create overlay div and fill with iframe content, then fade in
		jQuery('body').append(overlay);
		overlay.find('.formOverlayContent').html(div);
		overlay.fadeIn(500);
		centerVertically();
		jQuery(window).bind('resize',centerVertically);
		// Bind click event for closing overlay
		jQuery(document).bind('click',closeOverlayOnOutsideClick);
	});
}

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

// Hide login form if Forgotten Password is Clicked
/*jQuery(function(){
	//console.log(jQuery('.LoginPanelPasswordRetrieval').is(':visible'));
	jQuery('.LogonPageBackground > table [id$="PasswordRetrievalLink"]').click(function(){
		jQuery('.LoginPanelPasswordRetrieval').closest('tr').prev('tr').addClass('hide');
	});
});*/

// Nav Highlighting for Shared Pages
var navHightlighting = function() {
	var highLightedClass = 'HighLighted';
	var thisUrl = window.location.pathname + window.location.search;

	// all navs
	var nav = jQuery('nav > ul');
	//var sub_nav = jQuery('.sidebar nav > ul.submenu');
	nav.each(function(){
		var target = jQuery(this).find('a[href="' + thisUrl + '"]').parent();
		if ( !target.hasClass(highLightedClass) ) {
			target.addClass(highLightedClass);
		};
		var parent_target = jQuery(this).find('li ul a[href="' + thisUrl + '"]').closest('ul').prev('a').closest('li');
		if ( !parent_target.hasClass(highLightedClass) ) {
			parent_target.addClass(highLightedClass);
		};
		var parent_parent_target = jQuery(this).find('li ul a[href="' + thisUrl + '"]').closest('ul').prev('a').closest('ul').prev('a').closest('li');
		if ( !parent_parent_target.hasClass(highLightedClass) ) {
			parent_parent_target.addClass(highLightedClass);
		};
	});
};

// init on dom ready
jQuery(function(){

	// STYLISH SELECT
	var sselect = jQuery('#content .request-access-form, #content .form-monthly-report, #content .FormPanel, #content .portal-links');

	//console.log(sselect.find('select').length);

	if(sselect.length && (sselect.is('.request-access-form') || sselect.is('.form-monthly-report'))) {
		// do onload event
		sselect.find('select').find('option').each(function() {
			var currVal = this.value.toLowerCase() + "/";
			var winVal = window.location.pathname;
			if(currVal == winVal){
				//this.selected = 'selected';
				jQuery(this).attr('selected', true).addClass('selected');
			}
		});
	}

	// init stylish select and onchange events
	if(sselect.find('select').length) {
		sselect.find('select').sSelect();
		if(sselect.length && (sselect.is('.request-access-form') || sselect.is('.form-monthly-report'))) {
			sselect.find('select').change(function(){
				var str = '';
				str = jQuery(this).next('.newListSelected').find('.selectedTxt').text();
				jQuery(this).find('option').attr('selected', false).removeClass('selected');
				jQuery(this).find("option:contains('" + str + "')").attr('selected', true).addClass('selected');

				//var urlToCheck = location.protocol + "//" + window.location.hostname + jQuery(this).val();
				//console.log(urlToCheck);
				//console.log(isThere(urlToCheck));
				window.location.assign(jQuery(this).val());

				//window.location.assign(jQuery(this).val() + '/?hotel=' + str.replace(/[()]+/g, '').replace(/\s+/g, '-').toLowerCase());
			});
		}
	}

	// Append Signout Button on topnav and footer menu
	jQuery('#footer-menu').find('> ul').append(jQuery('<li />').append(jQuery('.logout').removeClass('hide')));

	if(jQuery('#main-menu').length) {
		// main nav mobile
		initMobileMenu();
	}

	// nav highlighting
	navHightlighting();

	// hide empty TD tags within FORMS
	jQuery('.FormPanel td').filter(function() {
		return jQuery.trim(jQuery(this).html()) === '';
	}).addClass('hide');

	// responsive sidebar menu
	//var menu = jQuery('#left-sidebar nav ul.submenu');
	var menu = jQuery('nav > ul.submenu');
	//console.log('hello...');
	//jQuery('#openup').live('click', function(e) {
	jQuery('#openup').on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
	});
	jQuery(window).resize(function() {
		var w = jQuery(this).width();
		if(w > 650 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});
	jQuery('nav > ul.submenu li').on('click', function(e) {
		var w = jQuery(window).width();
		if(w < 650 ) {
			menu.slideToggle();
		}
	});
	jQuery('nav > ul.submenu > li').each(function() {
		if(jQuery(this).find('ul').length) {
			jQuery(this).addClass('has-submenu');
		}
	});
	jQuery('.open-menu').height(jQuery(window).height());


	// calendar adjustment
	jQuery('.Calendar > table > tbody > tr > td > .eventListing > a').each(function(){
		var $this = jQuery(this);
		var text = $this.text();
		var prev_text = $this.closest('td').prev('td').find('> .eventListing > a').text();
		var next_text = $this.closest('td').next('td').find('> .eventListing > a').text();
		console.log($this.closest('td').text());

		//console.log(text);
		//console.log(prev_text);
		//console.log(next_text);
		//if (text == prev_text)
	});


	// calendar adjustment
	//
	jQuery('.request-access-form > div table td')
	.filter(function() {
		return jQuery.trim(jQuery(this).text()) === '' && jQuery(this).children().length == 0
	})
	.addClass('hide hide-siblings');
	jQuery('.hide-siblings').next('td').addClass('hide');

	//
	var radio_buttons = jQuery('.request-access-form > div').find('.RadioButtonList').find(':radio');
	//var radio_buttons = jQuery('.request-access-form > div').find('input[value="member"], input[value="travel-agent"], input[value="internal"]');
	//jQuery('.request-access-form > div .FormButton').on('click', function(){
	radio_buttons.on('change', function(){
		//console.log(jQuery(this).closest('.request-access-form > div').length);
		jQuery(this).closest('.request-access-form > div').addClass('m-progress');
		setTimeout(function(){ jQuery(this).closest('.request-access-form > div').removeClass('m-progress'); }, 3000);
		//return false;
		//e.preventDefault();
	});
});
