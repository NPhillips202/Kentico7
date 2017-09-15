// Do Google map stuff
// https://developers.google.com/maps/documentation/javascript/examples/marker-simple
// http://www.w3schools.com/googleAPI/ref_mapoptions.asp
// https://developers.google.com/maps/documentation/javascript/streetview#StreetViewOverlays

(function(){
	"use strict";

	// Do our DOM lookups beforehand
	// set jQuery vars
	// map vars
	var map_elems = jQuery('.map'),
		close_dir = jQuery('#close-dir'),
		directions_link = jQuery('.directions-link'),
		directions_panel = jQuery('#directions-panel'),
		tabs = jQuery('.cd-tabs');

	// set initial vars
	var map,
		map_header,
		address,
		coordinatesData,
		geocoder,
		geocoder_link,
		directionsDisplay,
		directionsService,
		latlng,
		tourLatlng,
		stepDisplay,
		markerArray = [];

	var getLatLng = function(coordinate, geocoder_link) {
		var jqxhr = jQuery.getJSON(geocoder_link, null, function (data) {
			var p = data.results[0].geometry.location;
		});
	};
	address = '1 Lake Ave, Colorado Springs, CO 80906';
	geocoder_link = '//maps.googleapis.com/maps/api/geocode/json?address='+address+'&sensor=false';

	var initialize = function() {
		// Instantiate a directions service.
		directionsService = new google.maps.DirectionsService();
		// set map center position
		latlng = new google.maps.LatLng(38.7910428,-104.8504693);
		var mapOptionsHeader = {
			zoom: 13,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.TERRAIN,
			scrollwheel: false,
		};
		map_header = new google.maps.Map(document.getElementById('headerAreaSub'), mapOptionsHeader);

		var contentString = '<div id="content" style="text-align:center;">'+
				'<div id="siteNotice">'+
				'</div>'+
				//'<h3 id="firstHeading" class="firstHeading">The Broadmoor</h3>'+
				'<img style="max-width:50%;" id="firstHeading" class="firstHeading" src="/getmedia/6e7d4918-cbbc-4ebe-90f9-416a9c1ee4a8/main-logo" alt="The Broadmoor" />'+
				'<div id="bodyContent">'+
					'<p style="padding:8px 0;">'+
					//'<b>Phone: </b>954.587.8005<br />' +
					//'<b>Email: </b>info@nexusshooting.com<br /><b>Location:</b> '+
					'1 Lake Ave, Colorado Springs, CO 80906'+
					'</p>'+
				'</div>'+
			'</div>';
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		var marker_header = new google.maps.Marker({
			position: latlng,
			map: map_header,
			title: 'The Broadmoor'
		});
		google.maps.event.addListener(marker_header, 'click', function() {
			infowindow.open(map_header, marker_header);
		});
		infowindow.open(map_header, marker_header);
	};

	var attachInstructionText = function(marker, text) {
		google.maps.event.addListener(marker, 'click', function() {
			// Open an info window when the marker is clicked on,
			// containing the text of the step.
			stepDisplay.setContent(text);
			stepDisplay.open(map, marker);
		});
	};

	// start loading scripts
	jQuery(document).ready(function() {

		// init gmaps directions from landmarks
		if(map_elems.length >= 1) {

			// Enable the visual refresh
			google.maps.visualRefresh = true;

			// init Google maps
			google.maps.event.addDomListener(window, 'load', initialize);

		}

	});

})();
