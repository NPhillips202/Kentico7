var map;
var chicago = new google.maps.LatLng(29.753707, -95.373156);
function initialize() {
    var roadAtlasStyles = [
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                { "saturation": -100 },
                { "lightness": -8 },
                { "gamma": 1.18 }
            ]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                { "saturation": -100 },
                { "gamma": 1 },
                { "lightness": -24 }
            ]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                { "saturation": -100 }
            ]
        }, {
            "featureType": "administrative",
            "stylers": [
                { "saturation": -100 }
            ]
        }, {
            "featureType": "transit",
            "stylers": [
                { "saturation": -100 }
            ]
        }, {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                { "saturation": -100 }
            ]
        }, {
            "featureType": "road",
            "stylers": [
              { "saturation": -100 }
            ]
        }, {
            "featureType": "administrative",
            "stylers": [
              { "saturation": -100 }
            ]
        }, {
            "featureType": "landscape",
            "stylers": [
              { "saturation": -100 }
            ]
        }, {
            "featureType": "poi",
            "stylers": [
              { "saturation": -100 }
            ]
        }, {
        }
    ]
    var mapOptions = {
        zoom: 16,
        center: chicago,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        suppressInfoWindows:true,
        mapTypeControlOptions: {
            apTypeIds: [google.maps.MapTypeId.ROADMAP, 'usroadatlas']
        }
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var styledMapOptions = { };

    var marker = new google.maps.Marker({
        position: chicago,
        map: map,
        "icon": 'images/marker.png',
        "lat": '29.753707',
        "lng": '-95.373156',
        title: '1700 Smith Street Houston, TX 77002'
    });
    // variable to define the content of Info Window
    var content = '<div id="iw_container">' +
                    '<div class="iw_title"></div>' +
                    '<div class="iw_content"><p>The Whitehall, Downtown Houston <br>1700 Smith Street <br> Houston, TX 77002 <br><span>1.713.739.8800 SALES</span></p></div>' +
                  '</div>';

    // creates the new Info Window with reference to the variable infowindow and establishes the content
    var infowindow = new google.maps.InfoWindow({
        content: content
    });
    // procedure to show the Info Window using a click on the marker
    /*google.maps.event.addListener(marker, 'click', function() {
    // map and marker are the variables defined previously
    });*/
    infowindow.open(map,marker);
  
    /*// event to close the infowindow with a click on the map
    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
    });*/

    var usRoadMapType = new google.maps.StyledMapType(roadAtlasStyles, styledMapOptions);
    
    map.mapTypes.set('usroadatlas', usRoadMapType);
    map.setMapTypeId('usroadatlas');
}

google.maps.event.addDomListener(window, 'load', initialize);