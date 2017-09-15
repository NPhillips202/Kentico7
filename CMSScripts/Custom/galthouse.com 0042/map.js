/* An InfoBox is like an info window, but it displays
 * under the marker, opens quicker, and has flexible styling.
 * @param {GLatLng} latlng Point to place bar at
 * @param {Map} map The map on which to display this InfoBox.
 * @param {Object} opts Passes configuration options - content,
 * offsetVertical, offsetHorizontal, className, height, width
 */

function InfoBox(opts) {
    google.maps.OverlayView.call(this);
    this.latlng_ = opts.latlng;
    this.map_ = opts.map;
    this.content = opts.content;
    this.offsetVertical_ = -150;
    this.offsetHorizontal_ = 25;
    this.height_ = 'inherit';
    this.width_ = 170;
    var me = this;
    this.boundsChangedListener_ =
        google.maps.event.addListener(this.map_, "bounds_changed", function () {
            return me.panMap.apply(me);
        });
    // Once the properties of this OverlayView are initialized, set its map so
    // that we can display it. This will trigger calls to panes_changed and
    // draw.
    this.setMap(this.map_);
}
/* InfoBox extends GOverlay class from the Google Maps API
 */
InfoBox.prototype = new google.maps.OverlayView();
/* Creates the DIV representing this InfoBox
 */
InfoBox.prototype.remove = function () {
    if (this.div_) {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};
/* Redraw the Bar based on the current projection and zoom level
 */
InfoBox.prototype.draw = function () {
    // Creates the element if it doesn't exist already.
    this.createElement();
    if (!this.div_) return;
    // Calculate the DIV coordinates of two opposite corners of our bounds to
    // get the size and position of our Bar
    var pixPosition = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (!pixPosition) return;
    // Now position our DIV based on the DIV coordinates of our bounds
    this.div_.style.width = this.width_ + "px";
    this.div_.style.left = (pixPosition.x + this.offsetHorizontal_) + "px";
    this.div_.style.height = this.height_ + "px";
    this.div_.style.top = (pixPosition.y + this.offsetVertical_) + "px";
    this.div_.style.display = 'block';
};
/* Creates the DIV representing this InfoBox in the floatPane. If the panes
 * object, retrieved by calling getPanes, is null, remove the element from the
 * DOM. If the div exists, but its parent is not the floatPane, move the div
 * to the new pane.
 * Called from within draw. Alternatively, this can be called specifically on
 * a panes_changed event.
 */
InfoBox.prototype.createElement = function () {
    var panes = this.getPanes();
    var div = this.div_;
    if (!div) {
        // This does not handle changing panes. You can set the map to be null and
        // then reset the map to move the div.
        div = this.div_ = document.createElement("div");
            div.className = "infobox"
        var contentDiv = document.createElement("div");
            contentDiv.className = "content"
            contentDiv.innerHTML = this.content;
        var closeBox = document.createElement("div");
            closeBox.className = "close";
            closeBox.innerHTML = "x";
        div.appendChild(closeBox);

        function removeInfoBox(ib) {
            return function () {
                ib.setMap(null);
            };
        }
        google.maps.event.addDomListener(closeBox, 'click', removeInfoBox(this));

        div.appendChild(contentDiv);
        div.style.display = 'none';
        panes.floatPane.appendChild(div);
        this.panMap();
    } else if (div.parentNode != panes.floatPane) {
        // The panes have changed. Move the div.
        //div.parentNode.removeChild(div);
        //panes.floatPane.appendChild(div);
    } else {
        // The panes have not changed, so no need to create or move the div.
    }
}
/* Pan the map to fit the InfoBox.
 */
InfoBox.prototype.panMap = function () {
    // if we go beyond map, pan map
    var map = this.map_;
    var bounds = map.getBounds();
    if (!bounds) return;
    // The position of the infowindow
    var position = this.latlng_;
    // The dimension of the infowindow
    var iwWidth = this.width_;
    var iwHeight = this.height_;
    // The offset position of the infowindow
    var iwOffsetX = this.offsetHorizontal_;
    var iwOffsetY = this.offsetVertical_;
    // Padding on the infowindow
    var padX = 40;
    var padY = 40;
    // The degrees per pixel
    var mapDiv = map.getDiv();
    var mapWidth = mapDiv.offsetWidth;
    var mapHeight = mapDiv.offsetHeight;
    var boundsSpan = bounds.toSpan();
    var longSpan = boundsSpan.lng();
    var latSpan = boundsSpan.lat();
    var degPixelX = longSpan / mapWidth;
    var degPixelY = latSpan / mapHeight;
    // The bounds of the map
    var mapWestLng = bounds.getSouthWest().lng();
    var mapEastLng = bounds.getNorthEast().lng();
    var mapNorthLat = bounds.getNorthEast().lat();
    var mapSouthLat = bounds.getSouthWest().lat();
    // The bounds of the infowindow
    var iwWestLng = position.lng() + (iwOffsetX - padX) * degPixelX;
    var iwEastLng = position.lng() + (iwOffsetX + iwWidth + padX) * degPixelX;
    var iwNorthLat = position.lat() - (iwOffsetY - padY) * degPixelY;
    var iwSouthLat = position.lat() - (iwOffsetY + iwHeight + padY) * degPixelY;
    // calculate center shift
    var shiftLng =
        (iwWestLng < mapWestLng ? mapWestLng - iwWestLng : 0) +
        (iwEastLng > mapEastLng ? mapEastLng - iwEastLng : 0);
    var shiftLat =
        (iwNorthLat > mapNorthLat ? mapNorthLat - iwNorthLat : 0) +
        (iwSouthLat < mapSouthLat ? mapSouthLat - iwSouthLat : 0);
    // The center of the map
    var center = map.getCenter();
    // The new map center
    var centerX = center.lng() - shiftLng;
    var centerY = center.lat() - shiftLat;
    // center the map to the new shifted center
    map.setCenter(new google.maps.LatLng(centerY, centerX));
    // Remove the listener after panning is complete.
    google.maps.event.removeListener(this.boundsChangedListener_);
    this.boundsChangedListener_ = null;
};

function initialize() {
    var markers = []; // makers array
  
    var myOptions = { // map settings
        zoom: 15,
        center: new google.maps.LatLng(38.257642, -85.755470),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        sensor: 'true',
        zoomControl: true,
        zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT
            },
        disableDoubleClickZoom: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
               style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            },
        scaleControl: true,
        scrollwheel: true,
        panControl: true,
        streetViewControl: true,
        draggable : true,
        overviewMapControl: true,
        overviewMapControlOptions: {
               opened: false,
            },
        styles: [
  {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            { "color": "#f9e4b7" }
        ]
    },
 {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            //{"gamma": 0.01 },
            //{"lightness": 20 }
              {"color": "#756033" }
        ]
    },
 {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
           // { "saturation": -31 },
           // { "lightness": -33 },
           //  { "weight": 2 },
           // { "gamma": 0.8 },
            //{"color": "#ffeec0" }
        ]
    },
{
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            { "visibility": "off" }
            //{"color": "#ff0000" }

        ]
    },
 {
      "featureType": "transit",
      "stylers": [
        //{ "saturation": -100 }
         { "color": "#5e5e5e" }
      ]
  }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            //{ "lightness": 30},
            //{"saturation": 30}
            { "color": "#e6e6e6" }
        ]
    },
 {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            //{"saturation": 20}
            { "color": "#a6a6a6" }
        ]
    },
 {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
           // { "lightness": 20 },
           //{ "saturation": -20 }
           { "color": "#cccccc" }
        ]
    }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            //{ "lightness": 10 },
            //{ "saturation": -30 }
           { "color": "#fbf9ea" }

        ]
    },{
        "featureType": 'road.highway',
        "elementType": 'geometry',
        "stylers": [
          //{hue: '#ff0022'},
          //{saturation: 60},
          //{lightness: -20}
          { "color": "#b1b1b1" }
        ]
      }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            //{"saturation": 25},
            //{"lightness": 25}
            { "color": "#5e5e5e" }
        ]
    }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {"visibility": "on" },
          {"saturation": -100},
          {"hue": '#9A8556'}
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            //{"lightness": -20},//
            { "color": "#6a6a6a" }
        ]
    },

 {
  }
            ]
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  
    var data = [
      { 
        'id':2,
        'content':"",
        'position': {
          'lat':38.257642,
          'lng': -85.755470
         },
         'icon': 'http://i.stack.imgur.com/rU427.png',
      } 
    ]
 	
 	//for (var i = 0; i < data.length; i++) {
    //  var current = data[i];
  
    //  var marker = new google.maps.Marker({
    //    position: new google.maps.LatLng(current.position.lat, current.position.lng),
    //    map: map,
    //    content: current.content,
    //    icon: 'http://templates.cendyn.com/theloganhotel-2015-homepage-2016/custom-google-maps-info-window/graphics/marker.png'
   //   });
  
   //   markers.push(marker);
   
   
   
      
    var infowindow = new google.maps.InfoWindow();
    //var iconBase = 'https://cdn3.iconfinder.com/data/icons/musthave/24/';
    var marker, i;

    for (var i = 0; i < data.length; i++) {
		var current = data[i];
		
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(current.position.lat, current.position.lng),
            map: map,
			   //   content: current.content,
            icon: {
                url: 'https://www.galthouse.com/getmedia/2f4824f0-ebb2-4fbb-98ce-3bfa2bda88fd/GH_Home5/',
                size: new google.maps.Size(84, 80),//size of the icon
                origin: new google.maps.Point(0, 0), //start count point from botom left of the icon(0,0)
                anchor: new google.maps.Point(42, 40),// to position center of the icon in the center move half way on the right and top of the icon
                //scaledSize: new google.maps.Size(25, 25)
            }
        });


        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                ///infowindow.setContent(data[i][0], data[i][6]);
               // infowindow.open(map, marker);
                for (var j = 0; j < markers.length; j++) {
                    //markers[j].setIcon("https://www.galthouse.com/getmedia/2f4824f0-ebb2-4fbb-98ce-3bfa2bda88fd/GH_map_pointer.png/");
                     markers[j].icon(this);
                }
                //marker.setIcon("https://www.galthouse.com/getmedia/2f4824f0-ebb2-4fbb-98ce-3bfa2bda88fd/GH_map_pointer.png/");
            };
        })(marker, i));
		
        markers.push(marker);
  
      google.maps.event.addListener(markers[i], "click", function (e) {
        var infoBox = new InfoBox({
       //     latlng: this.getPosition(),
       //     map: map,
       //     content: this.content
             
        });
		//infowindow.open(map,marker[2],data);
      });
	  //infowindow.open(map,marker[2],data);
    }

    //google.maps.event.addListener(map, "click", function(event){
      //  this.setOptions({scrollwheel:true});
   // });

//User interacts with the map (mousedown) -> set zoomable
//Mouse rests on the map for over 1 second -> set zoomable
//Mouse goes out of the map -> set not zoomable

  //google.maps.event.addListener(map, 'mousedown', function(event){
  //  this.setOptions({scrollwheel:true});
 // });
 // google.maps.event.addListener(map, 'mouseover', function(event){
 //   self = this;
 //   timer = setTimeout(function() {
 //     self.setOptions({scrollwheel:true});
  //  }, 1000);
//  });
//  google.maps.event.addListener(map, 'mouseout', function(event){
 //   this.setOptions({scrollwheel:false});
 //   clearTimeout(timer);
 // });

 

    // Close infowindows
    jQuery('#map_canvas').click(function(e) {
      if (jQuery('.infobox').length > 0 && !jQuery(e.target).closest('.infobox').length > 0) {
          jQuery('.infobox').remove();
      };
    });
    //Open infoBox by default
    //google.maps.event.trigger(markers[0], "click");

}    

    //Disable mouse scroll wheel zoom on embedded Google Maps
    google.maps.event.addDomListener(window, 'load', initialize);

    jQuery( document ).ready(function() {
        jQuery('#map_canvas').addClass('scrollof');
        jQuery('#canvas').on('click', function() {
          jQuery('#map_canvas').removeClass('scrollof');
        });
        jQuery( "#map_canvas" ).mouseleave(function() {
           jQuery('#map_canvas').addClass('scrollof');
        });

    });


//  $(document).ready(function() {
//  $('.maps').click(function () {
//        $('.maps iframe').css("pointer-events", "auto");
//    });
    
//    $( ".maps" ).mouseleave(function() {
//      $('.maps iframe').css("pointer-events", "none"); 
//    });
//    });                  



jQuery(document).ready(function(){
    initialize();
});