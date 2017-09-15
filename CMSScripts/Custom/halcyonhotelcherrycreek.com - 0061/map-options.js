(function(window, google, mapster) {
  var styles = [
  {
		featureType: 'water',
		elementType: 'labels',
		stylers: [
      { color: '#666f7d' }
			/*{ hue: '#C4C4C4' },
			{ saturation: -100 },
			{ lightness: -14 },
			{ visibility: '' }*/
		]
	},
  {
		featureType: 'poi',
		elementType: 'geometry',
		stylers: [
      { color: '#c0c9d7' }
			//{ hue: '#C4C4C4' },
			//{ saturation: -100 },
			//{ lightness: -14 },
			//{ visibility: '' }
		]
	},
  {
    "featureType": "poi.attraction",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.government",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },
  {
    "featureType": "poi.school",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
		featureType: 'landscape',
		elementType: 'geometry',
		stylers: [
      { color: '#dde6f4' }
			//{ hue: '#C4C4C4' },
			//{ saturation: -100 },
			//{ lightness: -14 },
			//{ visibility: '' }
		]
	},
  {
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
      { color: '#aeb7c5' }
			/*{ hue: '#C4C4C4' },
			{ saturation: -100 },
			{ lightness: -14 },
			{ visibility: '' }*/
		]
	}
/*{
    featureType: 'all',
    elementType: 'labels',
    stylers: [
      { visibility: 'off' }  
    ]
  }, {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      { color: '#3498db' }  
    ]
  }, {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      { color: '#27ae60' }  
    ]
  }, {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      { color: '#27ae60' }  
    ]
  }, {
    featureType: 'transit',
    elementType: 'geometry', 
    stylers: [
      { color: '#27ae60' }  
    ]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      { color: '#34495e' }  
    ]
  }, {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      { color: '#ecf0f1' }  
    ]
  }*/];
  
  mapster.MAP_OPTIONS = {
    center: {
      /*lat: 37.791350,
      lng: -122.435883*/
      //lat: 39.6929737,
      //lng: -104.97342739999999
      //lat: 39.72013468571634,//*****************
      //lng: -104.95839526773683//*****************
      //lat: 39.68602753445075, //comment out 12/13/16 to fix zooming issue client requested
      //lng: -104.92379477144472//comment out 12/13/16 to fix zooming issue client requested
      lat: 39.720378,//39.72013468571634,
      lng:-104.957337 //-104.95839526773683
    },
    //zoom: 16,//*****************
    zoom: 17,/*12,*/
    disableDefaultUI: false,
    scrollwheel: true,
    draggable: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: true,
    /*scrollwheel: false,*/
    /*panControl: true,*/
    //draggable: false,
    //disableDoubleClickZoom: true,
    keyboardShortcuts: false,
    //panControlOptions: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
      style: google.maps.ZoomControlStyle.DEFAULT
    },
    /*panControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },*/
    /*cluster: {
      options: {
        imagePath: 'images/m'
      }
    },*/
    geocoder: true,
    styles: styles
  };
  
}(window, google, window.Mapster || (window.Mapster = {})))