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
        center: new google.maps.LatLng(39.955517, -75.164663),
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
            //{ "color": "#f9e4b7" }
        ]
    },
 {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            //{"gamma": 0.01 },
            //{"lightness": 20 }
            //{"color": "#756033" }
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
        //{ "color": "#d5c093" }
      ]
  }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            //{ "lightness": 30},
            //{"saturation": 30}
            //{ "color": "#f9e4b7" }
        ]
    },
 {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            //{"saturation": 20}
            //{ "color": "#f1dcaf" }
        ]
    },
 {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
           // { "lightness": 20 },
           //{ "saturation": -20 }
           //{ "color": "#efddad" }
        ]
    }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            //{ "lightness": 10 },
            //{ "saturation": -30 }
            //{ "color": "#fbf9ea" }

        ]
    },{
        "featureType": 'road.highway',
        "elementType": 'geometry',
        "stylers": [
          //{hue: '#ff0022'},
          //{saturation: 60},
          //{lightness: -20}
          //{ "color": "#c0ab7e" }
        ]
      }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            //{"saturation": 25},
            //{"lightness": 25}
            //{ "color": "#e5d0a1" }
        ]
    }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          //{"visibility": "on" },
          //{"saturation": -40},
          //{"hue": '#9A8556'}
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            //{"lightness": -20},//
            //{ "color": "#dbc699" }
        ]
    },

 {
  }
            ]
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  
    var data = [ // The Logan Hotel
      { //The Logan Hotel
        'id':1,
        'content':"<img src='https://www.theloganhotel.com/Theloganhotel.com-0043-2015Redesign/media/theloganhotel.com-0043/graphics/logan-hotel-logo-map-v2.png'/><br>One Logan Square,<br>Philadelphia, PA 19103<br>215.963.1500<br><a href='#'>Directions</a>",
        'position': {
          'lat':39.95656,
          'lng':-75.17006
         }
      },
      { //Franklin Institute
        'id':1,
        'content':'<h2>The Franklin Institute</h2><p>Located in the heart of Philadelphia, The Franklin Institute is one of America\'s most celebrated museums-a renowned leader in science and technology.</p>',
        'position': {
          'lat':39.958211,
          'lng':-75.173135
         }
      },
      { //Free Library of Philadelphia
        'id':2,
        'content':'<h2>Free Library of Philadelphia</h2><p>The Free Library of Philadelphia is the public library system that serves Philadelphia, Pennsylvania. It is the 13th-largest public library system in the United States.</p>',
        'position': {
          'lat':39.959582,
          'lng':-75.171246
         }
      },
      { //Museum of Natural Science
        'id':3,
        'content':'<h2>Academy of Natural Sciences</h2><p>Founded in 1812, the Academy of Natural Sciences of Drexel University is a leading natural history museum dedicated to advancing research, education, and public.</p>',
        'position': {
          'lat':39.957119,
          'lng':-75.171223
         }
      },
      { //Barnes Foundation
        'id':4,
        'content':'<h2>Barnes Foundation</h2><p>The Barnes Foundation is an American educational art and horticultural institution with locations in Lower Merion, Pennsylvania, a suburb of Philadelphia; and Logan Square, Philadelphia.</p>',
        'position': {
          'lat':39.960642,
          'lng':-75.172148
         }
      },
      { //Rodin Museum
        'id':5,
        'content':'<h2>Rodin Museum</h2><p>The Rodin Museum is an art museum located in Philadelphia, Pennsylvania which contains the largest collection of sculptor Auguste Rodin\'s works outside Paris. Opened in 1929, the museum is administered by the Philadelphia Museum of Art.</p>',
        'position': {
          'lat':39.961956,
          'lng':-75.173926
         }
      },
      { //Philadelphia Museum of Art
        'id':6,
        'content':'<h2>Philadelphia Museum of Art</h2><p>The Philadelphia Museum of Art is your Museum. We welcome you to experience this season’s exciting exhibitions, events, and activities. </p>',
        'position': {
          'lat':39.965767,
          'lng':-75.180966
         }
      },
      { //Rittenhouse Square
        'id':7,
        'content':'<h2>Rittenhouse Square</h2><p>Rittenhouse Square is one of the five original open-space parks planned by William Penn and his surveyor Thomas Holme during the late 17th century in central Philadelphia.</p>',
        'position': {
          'lat':39.949458,
          'lng':-75.171993
         }
      },
      { //Philadelphia City Hall
        'id':8,
        'content':'<h2>Philadelphia City Hall</h2><p>Centered in the heart of downtown Philadelphia stands the nation\’s largest municipal building (larger than the U.S. Capitol), serving the city\’s government.</p>',
        'position': {
          'lat':39.95264,
          'lng':-75.163473
         }
      },
      { //Philadelphia Convention Center
        'id':9,
        'content':'<h2>Philadelphia Convention Center</h2><p>The Pennsylvania Convention Center\'s exceptional staff manages nearly 250 events a year, ranging from internationally-attended conventions to regional company retreats.</p>',
        'position': {
          'lat':39.954795,
          'lng':-75.159273
         }
      },
      { //30th Street Station
        'id':10,
        'content':'<h2>30th Street Station</h2><p>The 30th Street Station is the main railroad station in Philadelphia, Pennsylvania, United States and one of the seven stations in Southeastern Pennsylvania Transportation Authority\'s Center City fare zone.</p>',
        'position': {
          'lat':39.955854,
          'lng':-75.181968
         }
      },
      { //Suburban Station
        'id':11,
        'content':'<h2>Suburban Station</h2><p>Suburban Station is an art deco office building and underground commuter rail station in Penn Center, Philadelphia.</p>',
        'position': {
          'lat':39.954125,
          'lng':-75.166804
         }
      },
      { //Urban Farmer Philadelphia
        'id':12,
        'content':'<h2>Urban Farmer Philadelphia</h2><p>A Philadelphia steakhouse staying true to Midwest traditions using local, organic, farm to table ingredients.</p>',
        'position': {
          'lat':39.957088,
          'lng':-75.169942
         }
      },
      { //Assembly Rooftop Lounge
        'id':13,
        'content':'<h2>Assembly Rooftop Lounge</h2><p>Assembly Rooftop Lounge, built atop the Logan Circle hotel formerly known as the Four Seasons</p>',
        'position': {
          'lat':39.956925,
          'lng':-75.170108
         }
      },
      { //Pizzeria Vetri Rittenhouse
        'id':14,
        'content':'<h2>Pizzeria Vetri Rittenhouse</h2><p>While Pizzeria Vetri\’s custom-made, wood-fired Renato oven cranks out pizzas to order that\’s certainly not the only thing it can do. </p>',
        'position': {
          'lat':39.949561,
          'lng':-75.168513
         }
      },
      { //Parc Restaurant Bistro & Cafe
        'id':15,
        'content':'<h2>Parc Restaurant Bistro & Cafe</h2><p>Located in Rittenhouse Square. Includes menu, tour, reservations, hours and directions.</p>',
        'position': {
          'lat':39.949174,
          'lng':-75.170692
         }
      },
      { //Continental Restaurant
        'id':16,
        'content':'<h2>Continental Restaurant</h2><p>Restaurant by Stephen Starr in the Center City area. Provides a menu, virtual tour, directions, and special event information.</p>',
        'position': {
          'lat':39.951994,
          'lng':-75.170467
         }
      },
      { //The Dandelion
        'id':16,
        'content':'<h2>The Dandelion</h2><p>The Dandelion Pub. Stephen Starr\’s traditional British pub in the heart of Philadelphia.</p>',
        'position': {
          'lat':39.951012,
          'lng':-75.170579
         }
      },
      { //Reading Terminal Market
        'id':17,
        'content':'<h2>Reading Terminal Market</h2><p>Reading Terminal Market is an enclosed public market found at 12th and Arch Streets in downtown Philadelphia, Pennsylvania. Over one hundred merchants offer fresh produce, meats, fish, artisan cheese, groceries, ice cream, flowers, grilled cheese, baked goods, crafts, books, clothing, and specialty and ethnic foods.</p>',
        'position': {
          'lat':39.95322,
          'lng':-75.158987
         }
      },
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
			      content: current.content,
            icon: 'https://www.theloganhotel.com/Theloganhotel.com-0043-2015Redesign/media/theloganhotel.com-0043/graphics/marker.png'
        });


        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                ///infowindow.setContent(data[i][0], data[i][6]);
               // infowindow.open(map, marker);
                for (var j = 0; j < markers.length; j++) {
                    markers[j].setIcon("https://www.theloganhotel.com/Theloganhotel.com-0043-2015Redesign/media/theloganhotel.com-0043/graphics/marker.png");
                }
                marker.setIcon("https://www.theloganhotel.com/Theloganhotel.com-0043-2015Redesign/media/theloganhotel.com-0043/graphics/marker-current.png");
            };
        })(marker, i));
		
        markers.push(marker);
  
      google.maps.event.addListener(markers[i], "click", function (e) {
        var infoBox = new InfoBox({
            latlng: this.getPosition(),
            map: map,
            content: this.content
             
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
    google.maps.event.trigger(markers[0], "click");

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