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
			//var latlng = new google.maps.LatLng(p.lat, p.lng);
			//var aMarker= new google.maps.Marker({
				//position: latlng, //it will place marker based on the addresses, which they will be translated as geolocations.
				//map: map
			//});
			//if(coordinate == 'lat') coordinatesData = p.lat;
			//if(coordinate == 'lng') coordinatesData = p.lng;
			//return p;
		});
		//if(coordinate == 'lat') return jdata;
		//if(coordinate == 'lng') return jdata;
	};
	address = '1 Lake Ave, Colorado Springs, CO 80906';
	geocoder_link = '//maps.googleapis.com/maps/api/geocode/json?address='+address+'&sensor=false';
	//console.log(getLatLng('lat', geocoder_link).done(function(data){ console.log(data.lat); }));
	//console.log(getLatLng('lng', geocoder_link));

	var initialize = function() {
		// Instantiate a directions service.
		directionsService = new google.maps.DirectionsService();
		// set map center position
		latlng = new google.maps.LatLng(38.7910428,-104.8504693);
		// set map options
		var mapOptions = {
			zoom: 13,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false,
			backgroundColor:
		};
		var mapOptionsHeader = {
			zoom: 13,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.TERRAIN,
			scrollwheel: false,
		};
		//map = new google.maps.Map(document.getElementById('map'), mapOptions);
		//console.log(jQuery('.map').get(0));
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
		map_header = new google.maps.Map(document.getElementById('headerAreaSub'), mapOptionsHeader);

		// Create a renderer for directions and bind it to the map.
		var rendererOptions = {
			map: map
		}
		directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
		directionsDisplay.setPanel(document.getElementById('directions-panel'));

		// Instantiate an info window to hold step text.
		stepDisplay = new google.maps.InfoWindow();

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

		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: 'The Broadmoor'
		});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
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

		// create virtual tour map
		//var tourLatlng = new google.maps.LatLng(26.088701,-80.226856);
		//exusTourLatlng = new google.maps.LatLng(26.089275,-80.227498);
		//tourLatlng = new google.maps.LatLng(38.7910428,-104.8504693);
		var panoramaOptions = {
			position: latlng,//tourLatlng,
			pov: {
				heading: 50,//110
				pitch: 10
			},
			zoom: 0,
			visible: true,
			scrollwheel: false,
		};
		var tour = new google.maps.StreetViewPanorama(document.getElementById('tour'),panoramaOptions);
	};

	var calcRoute = function() {
		// First, remove any existing markers from the map.
		for (var i = 0; i < markerArray.length; i++) {
			markerArray[i].setMap(null);
		}

		// Now, clear the array itself.
		markerArray = [];

		// Retrieve the start and end locations and create
		// a DirectionsRequest using DRIVING directions.
		var start = document.getElementById('landmark').value;
		var end = document.getElementById('end').value;
		//var end = new google.maps.LatLng(26.089149, -80.227463);
		//var end = new google.maps.LatLng(26.096949,-80.230579);

		var request = {
			origin:start,
			destination:end,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};

		// Route the directions and pass the response to a
		// function to create markers for each step.
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				var warnings = document.getElementById('warnings_panel');
				warnings.innerHTML = '<b>' + response.routes[0].warnings + '</b>';
				directionsDisplay.setDirections(response);
				showSteps(response);
			}
		});
	};

	var setLandmark = function(landmark) {
		var address;

		switch (landmark) {
			case "cos":
				address = '7770 Milton E Proby Pkwy, Colorado Springs, CO 80916';
				break;
			case "den":
				address = '8500 Peña Blvd, Denver, CO 80249';
				break;
			case "fll":
				address = '100 Terminal Drive, Fort Lauderdale, FL 33315';
				break;
			case "mia":
				address = '2100 Northwest 42nd Avenue, Miami, FL 33126';
				break;
			default:
				address = '';
				break;
		}

		document.getElementById('landmark').value = address;
	};

	var clearLandmark = function() {
		document.getElementById('landmark').value = "";
	};

	var showSteps = function(directionResult) {
		// For each step, place a marker, and add the text to the marker's
		// info window. Also attach the marker to an array so we
		// can keep track of it and remove it when calculating new
		// routes.
		var myRoute = directionResult.routes[0].legs[0];

		for (var i = 0; i < myRoute.steps.length; i++) {
			var marker = new google.maps.Marker({
			position: myRoute.steps[i].start_point,
			map: map
		});
		attachInstructionText(marker, myRoute.steps[i].instructions);
			markerArray[i] = marker;
		}
	};

	var attachInstructionText = function(marker, text) {
		google.maps.event.addListener(marker, 'click', function() {
			// Open an info window when the marker is clicked on,
			// containing the text of the step.
			stepDisplay.setContent(text);
			stepDisplay.open(map, marker);
		});
	};

	// configure click event
	var setDirections = function(id) {
		directions_panel.fadeIn(200);
		setLandmark(id);
		calcRoute();
		clearLandmark();
	};

	// check tab scrolling
	var checkScrolling = function(tabs){
		var totalTabWidth = parseInt(tabs.children('.cd-tabs-navigation').width()),
		 	tabsViewport = parseInt(tabs.width());
		if( tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
			tabs.parent('.cd-tabs').addClass('is-ended');
		} else {
			tabs.parent('.cd-tabs').removeClass('is-ended');
		}
	};

	// start loading scripts
	jQuery(document).ready(function() {

		// tabs
		tabs.each(function(){
			var tab = jQuery(this),
				tabItems = tab.find('ul.cd-tabs-navigation'),
				tabContentWrapper = tab.find('ul.cd-tabs-content'),
				//tabContentWrapper = tab.children('ul.cd-tabs-content'),
				tabNavigation = tab.find('nav');

			tabItems.on('click', 'a', function(event){
				event.preventDefault();
				var selectedItem = jQuery(this);
				if( !selectedItem.hasClass('selected') ) {
					var selectedTab = selectedItem.data('content'),
						selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
						selectedContentHeight = selectedContent.innerHeight();

					tabItems.find('a.selected').removeClass('selected');
					selectedItem.addClass('selected');
					selectedContent.addClass('selected').siblings('li').removeClass('selected');
					//animate tabContentWrapper height when content changes
					tabContentWrapper.animate({
						'height': selectedContentHeight
					}, 200);
				}
				if(map_elems.length >= 1 && selectedItem.is('.directions-link')) {
					tabContentWrapper.css('margin-right', directions_panel.width() + 'px');
					//setDirections(selectedItem.attr('id'));
				}/**/
			});

			//hide the .cd-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
			checkScrolling(tabNavigation);
			tabNavigation.on('scroll', function(){
				checkScrolling(jQuery(this));
			});
		});

		jQuery(window).on('resize', function(){
			tabs.each(function(){
				var tab = jQuery(this);
				checkScrolling(tab.find('nav'));
				tab.find('.cd-tabs-content').css('height', 'auto');
			});
		});

		// init gmaps directions from landmarks
		if(map_elems.length >= 1) {

			// Enable the visual refresh
			google.maps.visualRefresh = true;

			// init Google maps
			google.maps.event.addDomListener(window, 'load', initialize);

			//if(map_elems.length >= 1 && selectedItem.is('.directions-link')) {}
			directions_link.click(function(event){
				setDirections(jQuery(this).attr('id'));
			});
            google.maps.event.addDomListener(window, 'load', function(){
                setDirections(jQuery('.directions-link.selected').attr('id'));
                jQuery('.cd-tabs-content').css('margin-right', directions_panel.width() + 'px');
            });

			// Close directions
			close_dir.on('click', function(e) {
				directions_panel.fadeOut(200);
				return false;
			});

		}

	});

    // on loads
    /*window.addEventListener('load', function(){
        setDirections(jQuery('.directions-link.selected').attr('id'));
    }, false);*/

})();
