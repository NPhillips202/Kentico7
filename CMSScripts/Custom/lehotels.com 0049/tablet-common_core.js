var dl = document.location,
	hash = dl.hash,
	hash = hash.length ? hash.substr(1) : '',
	vars = dl.href.split('?')[1],
	hostname = dl.hostname;

var D = document,
	W = window,
	WW = 0, WH = 0,
	//HOST = "http://" + hostname + "/",
	//HOST = "http://" + hostname + "/lehotels.com-2015/",
    //HOST = window.location.protocol + "//" + hostname + "/",
    HOST = "http://www.lehotels.com/",
	BODY = '',
	BG = '',
	CONTENT = '',
	H1 = '',
	COPY = '',
	BUSY_OBJ = '',
	GALLERY = false,
	TOGGLE_BUTTON = '',
	FEATURED_JSON = '',
	doscroll = ['header', 'content', 'copy', 'scroll', 'long', '#swipegallery'],
	zoom = 1,
	today = new Date(),
	DEV = true,
	RETINA = (window.retina || window.devicePixelRatio > 1);

jQuery.fn.hammer = function (options) {
	return this.each(function () {
		var hammer = new Hammer(this, options);

		var $el = jQuery(this);
		$el.data("hammer", hammer);

		var events = ['hold', 'tap', 'doubletap', 'transformstart', 'transform', 'transformend', 'dragstart', 'drag', 'dragend', 'swipe', 'release'];

		for (var e = 0; e < events.length; e++) {
			hammer['on' + events[e]] = (function (el, eventName) {
				return function (ev) {
					el.trigger(jQuery.Event(eventName, ev));
				};
			})($el, events[e]);
		}
	});
};

$.cookie = function (key, value, options) {
	if (arguments.length > 1 && String(value) !== "[object Object]") {
		options = jQuery.extend({}, options);
		if (value === null || value === undefined) options.expires = -1;
		if (typeof options.expires === 'number') {
			var days = options.expires, t = options.expires = new Date();
			t.setDate(t.getDate() + days);
		}
		value = String(value);
		return (D.cookie = [
			encodeURIComponent(key), '=',
			options.raw ? value : encodeURIComponent(value),
			options.expires ? '; expires=' + options.expires.toUTCString() : '',
			options.path ? '; path=' + options.path : '',
			options.domain ? '; domain=' + options.domain : '',
			options.secure ? '; secure' : ''
		].join(''));
	}
	options = value || {};
	var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
	return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(D.cookie)) ? decode(result[1]) : null;
};

var Url = (function() {
	"use strict";

	var
	// mapping between what we want and <a> element properties
		map = {
			protocol : 'protocol',
			host     : 'hostname',
			port     : 'port',
			path     : 'pathname',
			query    : 'search',
			hash     : 'hash'
		},

		/**
		 * default ports as defined by http://url.spec.whatwg.org/#default-port
		 * We need them to fix IE behavior, @see https://github.com/Mikhus/jsurl/issues/2
		 */
			defaultPorts = {
			"ftp"    : 21,
			"gopher" : 70,
			"http"   : 80,
			"https"  : 443,
			"ws"     : 80,
			"wss"    : 443
		},

		parse = function( self, url) {
			var
				d      = document,
				link   = d.createElement( 'a'),
				url    = url || d.location.href,
				auth   = url.match( /\/\/(.*?)(?::(.*?))?@/) || []
				;

			link.href = url;

			for (var i in map) {
				self[i] = link[map[i]] || '';
			}

			// fix-up some parts
			self.protocol = self.protocol.replace( /:$/, '');
			self.query    = self.query.replace( /^\?/, '');
			self.hash     = self.hash.replace( /^#/, '');
			self.user     = auth[1] || '';
			self.pass     = auth[2] || '';
			self.port     = (defaultPorts[self.protocol] == self.port) ? '' : self.port; // IE fix

			if (!self.protocol && !/^([a-z]+:)?\/\//.test( url)) { // is IE and path is relative
				var
					base     = new Url( d.location.href.match(/(.*\/)/)[0]),
					basePath = base.path.split( '/'),
					selfPath = self.path.split( '/')
					;

				basePath.pop();

				self.protocol = base.protocol;
				self.port     = base.port;

				while (selfPath[0] == '..') { // skip all "../
					basePath.pop();
					selfPath.shift();
				}

				self.path = basePath.join( '/') + '/' + selfPath.join( '/');
			}

			else {
				// fix absolute URL's path in IE
				self.path = self.path.replace( /^\/?/, '/');
			}

			parseQs( self);
		},

		decode = function(s) {
			s = s.replace( /\+/g, ' ');

			s = s.replace( /%([EF][0-9A-F])%([89AB][0-9A-F])%([89AB][0-9A-F])/g,
				function( code, hex1, hex2, hex3) {
					var
						n1 = parseInt( hex1, 16) - 0xE0,
						n2 = parseInt( hex2, 16) - 0x80
						;

					if (n1 == 0 && n2 < 32) {
						return code;
					}

					var
						n3 = parseInt( hex3, 16) - 0x80,
						n = (n1 << 12) + (n2 << 6) + n3
						;

					if (n > 0xFFFF) {
						return code;
					}

					return String.fromCharCode( n);
				}
			);

			s = s.replace( /%([CD][0-9A-F])%([89AB][0-9A-F])/g,
				function( code, hex1, hex2) {
					var n1 = parseInt(hex1, 16) - 0xC0;

					if (n1 < 2) {
						return code;
					}

					var n2 = parseInt(hex2, 16) - 0x80;

					return String.fromCharCode( (n1 << 6) + n2);
				}
			);

			s = s.replace( /%([0-7][0-9A-F])/g,
				function( code, hex) {
					return String.fromCharCode( parseInt(hex, 16));
				}
			);

			return s;
		},

		parseQs = function( self) {
			var qs = self.query;

			self.query = new (function( qs) {
				var re = /([^=&]+)(=([^&]*))?/g, match;

				while ((match = re.exec( qs))) {
					var
						key = decodeURIComponent(match[1].replace(/\+/g, ' ')),
						value = match[3] ? decode(match[3]) : ''
						;

					if (this[key] != null) {
						if (!(this[key] instanceof Array)) {
							this[key] = [this[key]];
						}

						this[key].push( value);
					}

					else {
						this[key] = value;
					}
				}

				this.toString = function() {
					var
						s = '',
						e = encodeURIComponent
						;

					for (var i in this) {
						if (this[i] instanceof Function) {
							continue;
						}

						if (this[i] instanceof Array) {
							var len = this[i].length;

							if (len) {
								for (var ii = 0; ii < len; ii++) {
									s += s ? '&' : '';
									s += e( i) + '=' + e( this[i][ii]);
								}
							}

							else { // parameter is an empty array, so treat as an empty argument
								s += (s ? '&' : '') + e( i) + '=';
							}
						}

						else {
							s += s ? '&' : '';
							s += e( i) + '=' + e( this[i]);
						}
					}

					return s;
				};
			})( qs);
		}
		;

	return function( url) {
		this.toString = function() {
			return (
				(this.protocol && (this.protocol + '://')) +
					(this.user && (this.user + (this.pass && (':' + this.pass)) + '@')) +
					(this.host && this.host) +
					(this.port && (':' + this.port)) +
					(this.path && this.path) +
					(this.query.toString() && ('?' + this.query)) +
					(this.hash && ('#' + this.hash))
				);
		};

		parse( this, url);
	};
}());

function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	return pattern.test(emailAddress);
};

function slideShow(topimages){

	BUSY.start();

	var currentSlideshow = $('.slideshow', BG);
	var newSlideshow = $('<div />', {'class': 'slideshow'});

	var preload = new Image();
	var src = (RETINA && topimages[0].path_retina) ? topimages[0].path_retina : topimages[0].path;

	$(preload).load(function () {

		BG.append(newSlideshow);
		window.getComputedStyle(newSlideshow[0]).opacity;
		newSlideshow.append($('<div />', {'class': 'slide'}).css({'background-image': 'url(' + src + ')'}));
		newSlideshow.addClass('active').pause(700, function (){
			if (currentSlideshow.data('swipe')) currentSlideshow.data('swipe').kill();
			currentSlideshow.remove();
		});

		if (topimages.length > 1) {
			newSlideshow.wrapInner('<div class="wrapper" />');
			for (var i = 1, l = topimages.length; i < l; i++) {
				src = (RETINA && topimages[i].path_retina) ? topimages[i].path_retina : topimages[i].path;
				$('.wrapper', newSlideshow).append($('<div />', {'class': 'slide'}).css({'background-image': 'url(' + src + ')'}));
			}
			newSlideshow.data('swipe', Swipe(newSlideshow[0], {
				auto: 3000,
				continuous: true
			}));
		}

		BUSY.stop();

	}).error(function () {

		BG.addClass('loaded');
		BUSY.stop();

	});

	preload.src = src;
}

function initFeatured() {/* NOT USED */
	if (FEATURED_JSON != '' && FEATURED_JSON.data.length > 0) {

		$.each($('#featured li'), function(){
			if($(this).data('property') == propertyId){
				$(this).removeClass('hide');
			}else{
				$(this).addClass('hide');
			}
		});

		$('#featured').removeClass('hide');
	} else {
		$.when(getData(HOST + 'json/featured.json'), getData(HOST + 'json/smartrate.json')).done(function (featured, smartrates) {
			console.log(featured);
			var featuredHtml = "";
			$.each(smartrates[0].rates, function(id, rate){
				rate.price.booking_link = rate.price.booking_link.replace('smart-rate','ipad-smart-rates');
				featuredHtml += '<li class="scroll smartrate" data-property="' + id + '"><span class="featured-thumb" style="background-image:url(' + rate.image + ')"></span><h2>' + rate.h1 + '</h2><p>' + rate.h2 + '</p><a onclick="var s=s_gi(s_account); s.linkTrackVars=\'events,eVar1,eVar12\'; s.linkTrackEvents=\'event6,scOpen\'; s.events=\'event6,scOpen\'; s.eVar1=\'Smart Rate Promo Tile\'; s.eVar12=\'\'; (s.tl(this,\'o\',\'Promo Booking Initiated\'));" class="booklink" href="' + rate.price.booking_link + '" target="_blank">' + rate.price.currency + ' ' + Math.floor(rate.price.roomrate) + '</a></li>';
			});
			$.each(featured[0].data, function(){
				this.descr = this.descr.truncateString(72, true);
				if (this.position == 5) featuredHtml += '<li class="scroll" data-property="' + (this.property_id ? this.property_id : 0) + '"><span class="featured-thumb" style="background-image:url(' + this.image_link + ')"></span><h2>' + this.tile_name + '</h2><p>' + this.descr + '</p><a onclick="var s=s_gi(s_account);s.linkTrackVars=\'eVar1\';s.eVar1=\'' + this.title + '\';(s.tl(this,\'o\',\'Special Promo Button\'));" class="booklink" href="' + this.link + '">' + this.link_title + '</a></li>';
			});
			WRAPPER.append('<div id="featured" class="hide"><ul>' + featuredHtml + '</ul></div>');

			$.each($('#featured li'), function(){
				if($(this).data('property') == propertyId){
					$(this).removeClass('hide');
				}else{
					$(this).addClass('hide');
				}
			});

			window.getComputedStyle($('#featured').get(0)).bottom;

			$('#featured').removeClass('hide');
			
			if (!$('#featured ul li').length) {
				$('#featured').remove();
				$('.qbuttons').css({'margin-bottom':'0'});
			}
		});
	}
};

function initEvents() {

	D.ontouchmove = function (e) {
		e = e || window.event;
		var view = e.target || e.srcElement;
		if ($(view).parents('#featured').length || $(view).parents('#gal-inner').length || view.id == "gal-inner" || view.id.slice(0, 4) == "cid_" || view.id == "main" || $(view).parents('#main').length || CONTENT.hasClass('open') ? $.inArray(view.id, doscroll) : 0) {
			return true;
		}
		e.preventDefault();
	}

	

	/* Share This Site */

	var shareOverlay = $('<div id="share-overlay" class="overlay"><div></div><ins></ins></div>');
	shareOverlay.appendTo(WRAPPER);

	$('a.share').on("click", function(e) {
		e.preventDefault();
		$("div", shareOverlay).load($(this).attr("href"));
		$('#menu').removeClass('hover');
		shareOverlay.removeClass("hide").addClass("hover");
		BUSY.stop();
	});

	$("ins", shareOverlay).on("click", function() {
		shareOverlay.removeClass("hover");
		BUSY.stop();
	});

	$(W).bind('orientationchange', function (event) {
		if (window.orientation == 90 || window.orientation == -90) $('html').addClass('landscape').removeClass('portrait');
		else $('html').removeClass('landscape').addClass('portrait');
	});
	$(W).trigger('orientationchange');

	$('.menus > span').click(function () {
		$('.menus').not($(this).parent()).removeClass("hover");
		$(this).parent().toggleClass('hover');
	});

	/*$(document).on("click", ".gallery a", function(e){
		e.preventDefault();
		initGallery(($(this).data("gallery-id")));
		return false;
	});*/

	/*$(document).on("click", 'a[href*="' + hostname + '"]', function (e) {
		if ($(this).attr("target") != "_blank") {
			e.preventDefault();
			var path = $(this).attr("href").split(hostname)[1].substring(1);
			loadContent(path);
			if($("#main").has($(this)) || $("#left-menu").has($(this))){
				$('#menu, #left-menu').removeClass('hover');
			}
			return false;
		}
	});

	$(document).on("click", "a[href^='/']", function (e) {

		$.each(standaloneJSON, function (i, v) {
			var attributes = JSON.parse(v.attributes);
			$.each(attributes, function (j, k) {
				if (k.slug == "no-tablet") $('a[href*="/' + v.path + '"]').attr("target", "_blank");
			})
		});

		if ($(this).attr("target") != "_blank") {
			e.preventDefault();
			var path = $(this).attr("href").substring(1);
			loadContent(path);
			return false;
		}
	});*/


	CONTENT.hammer({
		swipe_min_distance: 30,
		swipe_time: 300
	}).bind('click',function (event) {
			if(!$(this).hasClass('open') || $(event.target).attr('id') == 'toggle-content'){
				var t = $(this);
				t.toggleClass('open');
				$('#featured').toggleClass('hide', t.hasClass('open'));
				TOGGLE_BUTTON.toggleClass('loaded', t.hasClass('open'));
				$('#menu').removeClass('hover');
			}
		}).bind('swipe', function (event) {
			if (event.direction == 'up') {
				$(this).addClass('open');
				TOGGLE_BUTTON.addClass('loaded');
				$('#menu').removeClass('hover');
				$('#featured').addClass('hide');
			}
		});

	TOGGLE_BUTTON.hammer({
		swipe_min_distance: 30,
		swipe_time: 300
	}).bind('swipe open',function (event) {
			if(TOGGLE_BUTTON.hasClass("closeCategory")){
				TOGGLE_BUTTON.removeClass("closeCategory");
				$("#gallery-window").css({top:"100%"});
				return false;
			}
			if(TOGGLE_BUTTON.hasClass("close-gallery")){
				TOGGLE_BUTTON.removeClass("close-gallery");
				if (GALLERY) GALLERY.trigger('close-gallery');
				return false;
			}
			if (event.direction == 'right' || event.type == 'open') {
				var bookingForm = $('#booking-form');
				if (propertyId == 0){
					$("#text-hotel").trigger('click');
					$('#selected-hotel').empty();
					bookingForm.attr('action', bookingForm.data('booking-url'))
				} else {
					$('#text-checkin').trigger('click');
					$('#selected-hotel').text(propertyName);
					bookingForm.attr('action', bookingForm.data('property-booking-url') + propertyId)
				}
				CONTENT.removeClass('loaded open');
				$('#featured').addClass('hide');
				$('#menu').removeClass('hover');
				$('#toggle-button, #booking-wrapper').removeClass('hide load loaded').addClass('hover');
				//run_omniture('booking');
				setTimeout(function(){
					$('#featured').remove();
				}, 500);
			}
			if (event.direction == 'left') {
				$('#swipegallery').trigger('close-gallery');
				TOGGLE_BUTTON.trigger('close');
			}
		}).bind('click close', function (event) {
			if(TOGGLE_BUTTON.hasClass("closeCategory")){
				TOGGLE_BUTTON.removeClass("closeCategory");
				$("#gallery-window").css({top:"100%"});
				return false;
			}
			if(TOGGLE_BUTTON.hasClass("close-gallery")){
				TOGGLE_BUTTON.removeClass("close-gallery");
				if (GALLERY) GALLERY.trigger('close-gallery');
				return false;
			}
			if (TOGGLE_BUTTON.hasClass('hover') || event.type == 'close') {
				$('#toggle-button, #booking-wrapper').removeClass('hover');
				setTimeout(function () {
					showContent();
					//initFeatured();
				}, 500);
			} else {
				TOGGLE_BUTTON.trigger('open');
			}
		});

	$('#qmap a').click(function (e) {
		e.preventDefault();
		initMap();
		$('#googlemap').addClass('hover');
	});
    
    if (jQuery('#showMap').length > 0) {
		initMap();
		$('#googlemap').addClass('hover');
    };

	/*$('#qgallery a').click(function (e) {
		e.preventDefault();
		initGallery();
	});*/

	$('#qfullscreen a').click(function (e) {
		e.preventDefault();
		if ($('html').hasClass('fullscreen')) {
			exitFullScreen();
		} else {
			enterFullScreen();
		}
	})
}

function enterFullScreen (){
	$('html').addClass('fullscreen');
	$(".qbuttons li, #featured, #toggle-button").addClass("hide");
	hideContent();
}

function exitFullScreen (){
	$('html').removeClass('fullscreen');
	$(".qbuttons li, #featured, #toggle-button").removeClass("hide");
	showContent();
}

function initMap() {
    if (locationList) {
        // Debug
        for (i=0; i < locationList.length; i++) {
            //console.log(locationList[i].name + ', ' + locationList[i].street_address + ', ' + locationList[i].city_name + ', ' + locationList[i].state_abbreviation + ', ' + locationList[i].zip + ', ' + locationList[i].phone + ', ' + locationList[i].lat + ', ' + locationList[i].lng + ', ' + locationList[i].id);
        };
    
        // Build map
        var image = '/Lehotels.com-0049-2015Transfer/media/Lehotel/blue-dot.png';
        var settings = {
            zoom: 15,
            scrollwheel: false,
            navigationControl: false,
            scaleControl: false,
            streetViewControl: false,
            draggable: true,
            mapTypeControl: false,
            navigationControl: true,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    
        var map = new google.maps.Map(document.getElementById("googlemap"), settings);
    
        var red_road_styles = [
            {
                featureType: "all",
                stylers: [
                    { saturation: -100 }
                ]
            },
            {
                featureType: "road",
                stylers: [
                    { hue: "#d2a664" },
                    { saturation: 40 }
                ]
            },
            {
                featureType: "road.highway",
                stylers: [
                    { hue: "#d2a664" },
                    { saturation: 100 }
                ]
            },
            {
                featureType: "poi.park",
                stylers: [
                    {hue: "#c8dfb0"},
                    { saturation: 20 }
                ]
            },
            {
                featureType: "water",
                stylers: [
                    {hue: "#7cc1f7"},
                    { saturation: 100 }
                ]
            },
            {
                featureType: "poi.business",
                stylers: [
                    {hue: "#c8dfb0"},
                    { saturation: 60 }
                ]
            }
        ];
    
        var infowindow = new google.maps.InfoWindow({
            content: "",
            maxWidth:250
        });
    
        var bounds = new google.maps.LatLngBounds();
        
        // Add markers
        jQuery.each(locationList, function(i) {
            var infoContent = '<h3>' + locationList[i].name + '</h3><p>' + locationList[i].street_address + ', ' + locationList[i].city_name + ', ' + locationList[i].state_abbreviation + ' ' + locationList[i].zip + '<br> Phone: ' + locationList[i].phone + '<br><a href="http://maps.google.com/maps?f=d&amp;geocode=&amp;daddr=' + locationList[i].lat + '%2C%20' + locationList[i].lng + '&amp;z=14" target="_blank">Get directions</a>';
            var latlng = new google.maps.LatLng(locationList[i].lat, locationList[i].lng);
            var locationMarker = new google.maps.Marker({
                position: latlng,
                map: map,
                icon: image
            });
            google.maps.event.addListener(locationMarker, "click", function() {
                infowindow.close();
                infowindow.setContent(infoContent);
                infowindow.open(map, locationMarker);
            });
            bounds.extend(latlng);
            if(jQuery("#map-canvas").data("propertyid") == "corporate"){
                jQuery("#map-property-"+ locationList[i].id).click(function(e){
                    e.preventDefault();
                    jQuery('html,body').animate({scrollTop: jQuery("#map-canvas").offset().top}, 100);
                    infowindow.setContent(infoContent);
                    infowindow.open(map, locationMarker);
                    return false;
                });
            }
        });
        
        var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.002, bounds.getNorthEast().lng() + 0.002);
        var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.002, bounds.getNorthEast().lng() - 0.002);
        bounds.extend(extendPoint1);
        bounds.extend(extendPoint2);
    
        map.fitBounds(bounds);
    
        map.setOptions({styles: red_road_styles});
        jQuery('#menu').removeClass('hover');
        BUSY.stop();
    };
};

function getData(url, callback) {
	log('Loading data from URL: ' + url);
	return $.getJSON(url, function (result) {
		log('Data loading completed: ' + url);
		if (callback) callback(result);
	});
};

function showContent() {
	CONTENT.addClass('loaded');
};

function hideContent() {
	log('Hide content!');
	var done = $.Deferred();

//	BG.removeClass('loaded');
	CONTENT.removeClass('loaded open');


	setTimeout(function () {
		done.resolve()
	}, 400);
	return done.promise();
};

function initForms() {/* NOT USED */
	$('.form').off('submit').on('submit',function(event) {
		event.preventDefault();
		var f = $(this), data = [],
			params = 'format=json&submit_ok=Submit&'+f.serialize(),
			p = params.split('&');

		if($('#submit_ok', f).length < 1){
			var check = true;
			$('p', f).removeClass('error');
			$.each($('input', f), function(){
				if(($(this).hasClass('validate[required]') && $(this).val() == "") || ($(this).hasClass('validate[required,custom[email]]') && ($(this).val() == "" || !isValidEmailAddress($(this).val())))){
					$(this).parent().addClass('error');
					check = false;
				}
			});
			if(!check){
				$(COPY).scrollTop(0);
				return false;
			}
		}

		$('#submit_ok').attr({disabled:'disabled'}).addClass('disabled');

		$.post(f.attr('action'),params,function(json) {
			if (json) {
				$('#submit_ok').removeAttr('disabled').removeClass('disabled');
				if (json.errors) {
					var top = 10000;
					$('p',f).removeClass('error');
					$.each(json.errors,function(n,e) {
						var ntop = $('#'+n).parent().position().top;
						if (ntop<top) top = ntop;
						$('#'+n,f).parent().addClass('error');
					});
					$('#copy').scrollTop(Math.abs($('#copy .form').position().top));
				} else {
					log('Form successfully submited...');
					loadContent(window.location.pathname+"/thankyou");
				}
			} else {
			}
		}).error(function(){});

		return false;
	});
}

function run_omniture(type, code) {/* NOT USED */
	var s = s_gi(s_account);

	s.linkTrackVars = 'events,eVar12';
	s.linkTrackEvents = 'event7';

	switch (type) {
		case 'facebook':
			s.eVar12 = 'Facebook';
			s.tl(this, 'e', 'Website Referral');
			break;
		case 'twitter':
			s.eVar12 = 'Twitter';
			s.tl(this, 'e', 'Website Referral');
			break;
		case 'tripadvisor':
			s.eVar12 = 'Tripadvisor';
			s.tl(this, 'e', 'Website Referral');
			break;
		case 'instagram':
			s.eVar12 = 'Instagram';
			s.tl(this, 'e', 'Website Referral');
			break;
		case 'google+':
			s.eVar12 = 'Google+';
			s.tl(this, 'e', 'Website Referral');
			break;
		case 'booking':
			s.linkTrackEvents = 'event6,scOpen';
			s.events = 'event6, scOpen';
			s.tl(this, 'o', 'Booking Initiated');
			break;
		case 'page':
			eval(code);
			s.t();
			break;
	}
	return true;
}

function loadContent(path, pushToHistory) {/* NOT USED IN SOME PLACES */
	
	if($('html').hasClass('fullscreen')){
		exitFullScreen();
	}

	path = typeof path  != "undefined" ? path : "" ;
	pushToHistory = typeof pushToHistory  == "undefined" ? true : false ;
	path = path.charAt(0) != "/" ? path : path = path.substring(1);

	BUSY.start();

	$('#toggle-button, #booking-wrapper').removeClass('hover');

	$('#featured').addClass('hide');
	setTimeout(function(){
		$('#featured').remove();
	}, 500);

	if ($('a[href="' + HOST + path + '"]').length ) {
		var menuitem = $('a[href="' + HOST + path + '"]');
	}else{
		var newPath = path.split('/');
		newPath.pop();
		newPath = newPath.join('/');
		var menuitem = $('a[href="' + HOST + newPath + '"]');
	}

	$('#menu a, #menu li, #menu ul, #left-menu a, #left-menu li, #left-menu ul').removeClass('active');

	menuitem.addClass('active').parents('ul, li').addClass('active');

	TOGGLE_BUTTON.removeClass('hide close-gallery loaded back closeCategory');

	if (GALLERY) GALLERY.trigger('close-gallery');

	//$.when(getData(HOST + path + '?format=json'), hideContent()).done(function (content) {
	$.when().done(function (content) {

		/*$.when(omniture_async).done(function() {
			run_omniture('page', content[0].omniture);
		});*/

		/*propertyId = content[0].property.id ? content[0].property.id : 0;
		propertyName = content[0].property.name ? content[0].property.name : '';

		$('html').toggleClass('property', propertyId > 0);

		$('.main-menu').toggleClass('hide', (propertyId > 0));
		$('body').attr('class', 'property-' + propertyId);

		$('#inner-wrapper').html(content[0].content);
		$(COPY).scrollTop(0);
		D.title = content[0].menu_title;*/

		if ($('#ping').length) {
			$('#ping').after($('<input>', {name: 'pong', id: 'pong', value: $('#ping').val(), 'class': 'hide'}));
		}

		$('#googlemap').removeClass('hover');

		if ($('#map-canvas', COPY).length) {
			$('#googlemap').addClass('hover');
			setTimeout(initMap, 500);
		}

		/*if (content[0].top_images.length) {
			slideShow(content[0].top_images);
		}*/

		//showContent();

		//initFeatured();

		//initForms();

		try {
			initPoi();
		} catch (err) {}

		/*if(pushToHistory){
			window.history.pushState({},"", "/"+path);
		}*/
	});
}

/*function initGallery(open) {
	$('#swipegallery, .bullets').remove();
	//$.when(getData(HOST + 'json/gallery.json?pid=' + propertyId)).done(function (gallery) {
	$.when(getData(HOST + 'json/gallery.json?pid=' + propertyId)).done(function (gallery) {
		var galleryHTML = '<div id="swipegallery"><div id="gal-inner">';
		$.each(gallery.data,function(index){
			galleryHTML += '<div class="gallery-category" id="galcat-'+this.id+'" data-nr="'+index+'"><span class="category-image"><span class="img-bg"></span><span class="img-bg"></span><img src="'+this.images[0].thumb+'"></span><span class="category-title">'+this.name+'</span></div>';
		});
		galleryHTML += '</div></div>';
		TOGGLE_BUTTON.addClass('close-gallery');
		$('#menu').removeClass('hover');
		$(galleryHTML).appendTo(WRAPPER);
		window.getComputedStyle($('#swipegallery').get(0)).opacity;
		$('#swipegallery').addClass('active');
		$('<div id="gallery-window"></div>').appendTo("#swipegallery");
		$(".gallery-category").click(function(){
			$("#gallery-window").empty().unbind();
			var galleryHTML = '<div class="galleria-gallery">';
			$.each(gallery.data[$(this).data("nr")].images, function (n, i) {
				galleryHTML += '<img src="' + i.full + '">';
			})
			galleryHTML += '</div>';
			$(galleryHTML).appendTo("#gallery-window");

			window.getComputedStyle($('#gallery-window').get(0)).top;

			$("#gallery-window").css({
				top:"0",
				opacity:"1"
			});
			Galleria.run('.galleria-gallery');
			$("#toggle-button").addClass("closeCategory");

		});

		if(open != undefined){
			$('#galcat-'+open).trigger('click');
		}
		GALLERY = $('#swipegallery');
		GALLERY.bind('close-gallery', function () {
			GALLERY.removeClass('active').pause(300, function () {
				$(this).remove();
			});
		});
	})
};*/

function log(e) {
	if (DEV) console.log(e);
};

$.fn.pause = function (time, callback) {
	jQuery.fx.step.delay = function () {
	};
	return this.animate({delay: 1}, time, callback);
}

function initPoi() {

	var isiPad = navigator.userAgent.match(/iPad/i) != null;

	if (typeof poi_json !== "undefined" && $("#poi").length) {

		var map = new google.maps.Map(document.getElementById("poi_map"), {
			mapTypeId:google.maps.MapTypeId.ROADMAP,
			scrollwheel:false
		});

		var infowindow = new google.maps.InfoWindow({
			content:""
		});

		$("#poi-list").append('<thead><tr><th class="name">Place Name</th><th class="address">Address</th><th class="phone">Phone</th><th class="distance">Distance</th><th class="th-showonmap">Show on map</th></tr></thead>');

		function addMarker(point, marker_nr) {
			var marker = new google.maps.Marker({
				position:new google.maps.LatLng(point.lat, point.lng),
				map:map
			});
			var infoContent = '<div class="map-content"><h4>' + point.name + '</h4><p>' + point.address + '<br>' + point.phone + '</p><p><a href="http://maps.google.com/maps?f=d&amp;geocode=&amp;daddr=' + point.lat + '%2C%20' + point.lng + '&amp;z=14" target="_blank">Get directions</a></p></div>';

			google.maps.event.addListener(marker, "click", function () {
				infowindow.setContent(infoContent);
				infowindow.open(map, marker);
			});
			$("#point-" + marker_nr + " .show-on-map").click(function (e) {
				if (isiPad) $('#copy').animate({scrollTop:$("#poi_map").position().top}, 100);
				else $('html,body').animate({scrollTop:$("#poi_map").offset().top}, 100);
				infowindow.setContent(infoContent);
				infowindow.open(map, marker);
			});

			$("#point-more-" + marker_nr + " .c-show-on-map").click(function (e) {
				e.preventDefault();
				if (isiPad) $('#copy').animate({scrollTop:$("#poi_map").position().top}, 100);
				else $('html,body').animate({scrollTop:$("#poi_map").offset().top}, 100);
				infowindow.setContent(infoContent);
				infowindow.open(map, marker);
			});

			$("#point-" + marker_nr + " .poi-expand").not(".disabled").click(function (e) {

				var desc = $("#point-more-" + marker_nr + " div");

				if ($(this).hasClass("expanded")) {
					$(this).removeClass("expanded");
					desc.slideUp(200);
				} else {
					$(this).addClass("expanded");
					desc.slideDown(200);
				}

			});

			$("#point-" + marker_nr + " .show-on-map").hover(
				function () {
					marker.setIcon('//maps.google.com/mapfiles/ms/icons/blue-dot.png')
				}, function () {
					marker.setIcon('//maps.google.com/mapfiles/ms/icons/red-dot.png')
				}
			);
		}

		$.each(poi_json.points, function (i, point) {

			var thumbnail = point.image_link ? "<img src='" + point.image_link + "'>" : "";
			var moreExtraClass = "";
			if (thumbnail == "" && point.descr == "" && point.url_name == "") moreExtraClass = " disabled";
			var pointContent = "<tr id='point-" + i + "'><td class='name'><span class='poi-expand" + moreExtraClass + "'>" + point.name + "</span></td><td class='address'>" + point.address + "</td><td class='phone'>" + point.phone + "</td><td class='distance'>" + point.distance + "</td><td class='td-showonmap'><span class='show-on-map'>Show on map</span></td></tr><tr id='point-more-" + i + "' class='poi-more'><td colspan='5'><div>" + thumbnail + "<span class='poi-descr'>" + point.descr + "<br><a href='" + point.link + "' target='_blank'>" + point.url_name + "</a><br><a href='#' class='c-show-on-map'>Show on map</a></span></div></td></tr>";
			$("#poi-list").append(pointContent);
			addMarker(point, i);
		});

		/* Hotel marker, address from site settings */

		var marker = new google.maps.Marker({
			position:new google.maps.LatLng(poi_json.hotel_info.lat, poi_json.hotel_info.lng),
			map:map,
			icon:templateURL+"images/pointer.png"
		});
		var infoContent = '<div class="map-content"><h4>' + poi_json.hotel_info.title + '</h4><p>' + poi_json.hotel_info.address + '</p><p><a href="http://maps.google.com/maps?f=d&amp;geocode=&amp;daddr=' + poi_json.hotel_info.lat + '%2C%20' + poi_json.hotel_info.lng + '&amp;z=14" target="_blank">Get directions</a></p></div>';

		google.maps.event.addListener(marker, "click", function () {
			infowindow.setContent(infoContent);
			infowindow.open(map, marker);
		});

		/* ---- */

		var bounds = new google.maps.LatLngBounds();
		var extendPointHotel = new google.maps.LatLng(poi_json.hotel_info.lat, poi_json.hotel_info.lng);
		bounds.extend(extendPointHotel);

		$.each(poi_json.points, function (i, point) {
			bounds.extend(new google.maps.LatLng(point.lat, point.lng));
		});

		if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
			var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.006, bounds.getNorthEast().lng() + 0.006);
			var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.006, bounds.getNorthEast().lng() - 0.006);
			bounds.extend(extendPoint1);
			bounds.extend(extendPoint2);
		}

		map.fitBounds(bounds);

		$("#show-all").click(function (e) {
			infowindow.close();
			map.fitBounds(bounds);
			return false;
		});
	}
}

function initBooking() {

	$("#booking-city").change(function(){
		if($('#booking-city :selected').val() != 0){
			$('#selected-hotel').text($('#booking-city :selected').text());
			$("#hotel-select").fadeOut(function(){
				$('#progressbar span').attr('class', 'step1');
				$('#booking-calendar').fadeIn();
			});
		}
	});

	$("#text-hotel").die().click(function(){
		$('#booking-statue p').removeClass('active');
		$(this).addClass('active');

		$('#selected-hotel').text('');

		$('#logo').removeAttr('class');

		$('#hotel option').removeAttr('selected');

		$('#booking-statue').attr('rev', 'arrival');

		$('#submit-form').addClass('disabled');
		$('#booking-statue td').removeClass('departure').removeClass('arrival').removeClass('selected').removeClass('selection');
		$('#DateOut, #DateIn').val('');

		var d = today.asString('mm/dd/yyyy');

		$('#booking-calendar').dpSetStartDate(d).dpSetEndDate('12/31/3000');
		$('#booking-calendar td').removeClass('arrival').removeClass('departure');
		$('#booking-calendar td.other-month').unbind().empty();


		$('#booking-additional, #booking-calendar').fadeOut(function () {
			$('#progressbar span').removeAttr('class');
			$('#hotel-select').fadeIn();
		});
	});

	$('#booking-calendar')
		.empty()
		.datePicker({inline: true, showYearNavigation: false, renderCallback: function () {
			$('#booking-calendar td.other-month').unbind().empty();
		}})
		.bind('dateSelected',function (e, selectedDate, $td) {
			var state = $('#booking-statue').attr('rev'),
				dateIn, dateOut,
				button = $('#submit-form');

			if (state == 'arrival') {

				$td.addClass('arrival');
				dateIn = selectedDate.asString('mm/dd/yyyy');
				dateOut = selectedDate.addDays(1).asString('mm/dd/yyyy');
				$('#booking-calendar').dpSetStartDate(selectedDate.asString('mm/dd/yyyy'));
				button.addClass('disabled');
				$('#text-checkin', $('#booking-statue')).removeClass('active');
				$('#text-checkout', $('#booking-statue')).addClass('active');
				$('#booking-statue').attr('rev', 'departure');
				log('CheckIn date selected: ' + dateIn);

				$('#DateIn').val(dateIn);
				$('#progressbar span').attr('class', 'step2');
			}
			if (state == 'departure') {

				$('#booking-statue td').removeClass('departure');

				$td.addClass('departure');

				dateIn = $('#DateIn').val();
				dateOut = selectedDate.asString('mm/dd/yyyy');
				button.removeClass('disabled');
				$('#text-checkout', $('#booking-statue')).removeClass('active');
				$('#text-additional', $('#booking-statue')).addClass('active');
				$('#booking-statue').attr('rev', 'done');
				log('CheckOut date selected: ' + dateOut);

				$('#DateOut').val(dateOut);
				$('#booking-calendar').fadeOut(function () {
					$('#booking-additional').fadeIn();
					$('#progressbar span').attr('class', 'step3');
				});
			}

			$td.not('.departure').removeClass('selected');

		}).hammer({
			swipe_min_distance: 30,
			swipe_time: 300
		}).bind('swipe',function (event) {
			BUSY.start();
			if (event.direction == 'left') {
				$('.jCalendar tbody').addClass('sleft').pause(500, function () {
					$('.dp-nav-next-month').trigger('click');
				});
			}
			if (event.direction == 'right') {

				$('.jCalendar tbody').addClass('sright').pause(500, function () {
					$('.dp-nav-prev-month').trigger('click');
				});
			}
			setTimeout(function () {
				BUSY.stop();
				$('.jCalendar tbody').removeClass('sleft sright');
			}, 1000);
		}).bind('dpMonthChanged', function () {
			BUSY.stop();
		});

	$('#text-checkin').die().click(function () {
		if (propertyId == 0 && !$('#booking-city').val()) return false;

		$('#booking-statue p').removeClass('active');
		$(this).addClass('active');

		$('#booking-statue').attr('rev', 'arrival');
		$('#submit-form').addClass('disabled');
		$('#booking-statue td').removeClass('departure').removeClass('arrival').removeClass('selected').removeClass('selection');
		$('#DateOut, #DateIn').val('');

		var d = today.asString('mm/dd/yyyy');

		$('#booking-calendar').dpSetStartDate(d).dpSetEndDate('12/31/3000');
		$('#booking-calendar td').removeClass('arrival').removeClass('departure');
		$('#booking-calendar td.other-month').unbind().empty();


		$('#booking-additional, #hotel-select').fadeOut(function () {
			$('#progressbar span').attr('class', 'step1');
			$('#booking-calendar').fadeIn();
		});
	});

	$('#text-checkout').die().click(function () {
		if (!$('#DateIn').val()) return false;
		$('#booking-statue p').removeClass('active');
		$(this).addClass('active');

		$('#booking-statue').attr('rev', 'departure');
		$('#submit-form').addClass('disabled');
		$('#DateOut').val('');

		$('#booking-calendar').dpSetStartDate($('#DateIn').val()).dpSetEndDate('12/31/3000');
		$('#booking-calendar td').removeClass('departure').removeClass('selected');

		$('#booking-additional').fadeOut(function () {
			$('#progressbar span').attr('class', 'step2');
			$('#booking-calendar').fadeIn();
		});

	});

	$('#submit-form').hover(function () {
		$('#progressbar span').attr('class', 'done');
	}, function () {
		$('#progressbar span').attr('class', 'step3');
	});

	$('#closeBooking').die().click(function () {

		$('#booking-statue').attr('rev', 'arrival');
		$('#submit-form').addClass('disabled');
		$('#booking-statue td').removeClass('departure').removeClass('arrival').removeClass('selected').removeClass('selection');
		$('#booking-form p').removeClass('active');
		$('#text-checkin', $('#booking-statue')).addClass('active');
		$('#progressbar span').removeAttr('class')
		$('#DateIn, #DateOut').val('');

		var d = today.asString('mm/dd/yyyy');

		$('#booking-calendar').dpSetStartDate(d).dpSetEndDate('12/31/3000');
		$('#booking-calendar td').removeClass('arrival').removeClass('departure');
		$('#booking-calendar td.other-month').unbind().empty();
	})

	$('#submit-form').bind('click', function () {
		if ($(this).hasClass('disabled')) return false;
		var dateIn = Date.fromString($('#DateIn').val()),
			dateOut = Date.fromString($('#DateOut').val());
		log('Booking form submitted with Checkin date: ' + dateIn.asString('mm/dd/yyyy') + ', and Checkout date: ' + dateOut);
		return true;
	});
}

String.prototype.truncateString = function(limit, ellipsis) {
	if (this.length <= limit) return this;
	var breakPoint = this.substr(0, limit).lastIndexOf(' ');
	if (breakPoint && breakPoint < this.length - 1) return this.substr(0, breakPoint) + (ellipsis ? ' &hellip;' : '');
};

/* DOCUMENT READY */

$(function () {
	
	$('.main-menu > li > a[href$="press"]').not('a[data-type="links"]').remove();

	BODY = $('body');
	WRAPPER = $('#wrapper');
	BG = $('#background');
	CONTENT = $('#content');
	H1 = $('h1', CONTENT);
	COPY = $('#copy');
	BUSY_OBJ = $('#busy');
	TOGGLE_BUTTON = $('#toggle-button');

	WW = $(W).width();
	WH = $(W).height();

	BUSY = {
		start: function (){
			BUSY_OBJ.removeClass('stop').addClass('active');
		},
		stop: function (){
			BUSY_OBJ.removeClass('active').pause(600, function (){
				BUSY_OBJ.addClass('stop');
			});
		}
	}

	window.onpopstate = function () {
		window.onpopstate = function (event) {
			loadContent(document.location.pathname, false);
		}
	}

	showContent();
	BG.empty();
    
    if (jQuery("#background").length > 0) {
        slideShow(topimages); /* topimages initialised in widget */
    };

	if ($('#map-canvas', COPY).length) {
		$('#googlemap').addClass('hover');
		initMap();
	}

	//initFeatured();
	initBooking();
	initEvents();
	//initForms();
	initPoi();

});

// Booking on tablet
jQuery('.ipad-booking-button').on('click',function(e) {
    var bookingForm = jQuery('#booking-form'),
      arrive = bookingForm.find('#DateIn').val(),
      depart = bookingForm.find('#DateOut').val(),
      dest = bookingForm.find('#booking-city option:checked').val(), // Option not being checked on selection
      hotel = bookingForm.find('input[name="hotel"]').val(),
      rooms = bookingForm.find('#booking-rooms option:checked').val(), // Option not being checked on selection
      adults = bookingForm.find('#booking-adults option:checked').val(), // Option not being checked on selection
      children = bookingForm.find('#booking-children option:checked').val(), // Option not being checked on selection
      rewards = "",
      corporate = bookingForm.find('#booking-corporate-code').val(),
      iata = bookingForm.find('#booking-iata-code').val();
  
  if (rewards !== "") {
      rewards = '&rewards=' + rewards;
  } else {
      rewards = "";
  }
  if (corporate !== "") {
      corporate = '&promo=' + corporate;
  } else {
      corporate = "";
  }
  if (iata !== "") {
      iata = '&IATA=' + iata;
  } else {
      iata = "";
  }
  
  //?Dest=AAUS-LosAnge&Rooms=1&Adult=1&Child=0&IATA=&promo=
  //var bookingUrl = 'https://gc.synxis.com/rez.aspx?Src=LEH&Chain=6158&start=availresults&locale=en-US&template=hebs-omniture' + '&Dest=' + dest+ '&Arrive=' + arrive+ '&Depart=' + depart+ '&Rooms=' + rooms+ '&Adult=' + adults+ '&Child=' + children + rewards + corporate + iata;
  var bookingUrl = 'https://gc.synxis.com/?src=LEH&chain=6158' + '&hotel=' + hotel + '&start=availresults&locale=en-US&level=2&template=hebs-omniture' + '&Dest=' + dest+ '&Arrive=' + arrive+ '&Depart=' + depart+ '&Rooms=' + rooms+ '&Adult=' + adults+ '&Child=' + children + rewards + corporate + iata;
  jQuery(this).attr('href',bookingUrl);
});