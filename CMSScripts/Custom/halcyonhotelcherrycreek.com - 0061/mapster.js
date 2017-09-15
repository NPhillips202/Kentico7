(function (window, google, List) {

  var Mapster = (function () {//module, storing a self containing function
    function Mapster(element, opts) {//constructor
      this.gMap = new google.maps.Map(element, opts);//accesible externally, no recommended to call it directly
      this.proj = null;
      var overlay = new google.maps.OverlayView();
      overlay.draw = function () { };
      overlay.setMap(this.gMap);

      this._on({
        obj: this.gMap,
        event: 'dragend',
        //event:'click',
        //callback:function(e){
        callback: function (e, map) {
          //alert('click');
          /*console.log('dragend');
          console.log('lat', this.gMap.getCenter().lat());
          console.log('lng', this.gMap.getCenter().lng());*/
          //console.log(e);
          //console.log();
          //console.log(this);//map object itself
        }
      });
      this._on({
        obj: this.gMap,
        event: 'idle',
        //event:'click',
        //callback:function(e){
        callback: function (e, map) {
          //alert('click');
          //console.log('idle');
          this.proj = overlay.getProjection();
          /*console.log(overlay);
          console.log(this.proj);
          console.log('idle');*/
        }
      });
      
      
      /*this._on({
        obj: this.gMap,
        event: 'bounds_changed',
        //event:'click',
        //callback:function(e){
        callback: function (e, map) {
          //alert('click');
          //console.log('bounds_changed');
          //console.log("zoom", map.getZoom())
         // console.log("center", map.getCenter())
          //lat 39.71983760037442Mapster.js:19:11
//lng -104.95312740923158
//17
        }
      });*/
      
      //this.markers = [];
      this.markers = List.create();
      /*if (opts.cluster) {
        this.markerClusterer = new MarkerClusterer(this.gMap, [], opts.cluster.options);
      }*/
      if (opts.geocoder) {
        this.geocoder = new google.maps.Geocoder();
      }
    }
    Mapster.prototype = {//create more functions
      zoom: function (level) {//works like a getter or setter
        if (level) {
          this.gMap.setZoom(level);
        } else {
          return this.gMap.getZoom();
        }
      },
      _on: function (opts) {
        var _self = this;//Master
        google.maps.event.addListener(opts.obj, opts.event, function (e) {
          //console.log(this);
          //console.log(_self);
          opts.callback.call(_self, e, opts.obj);//call the function but also sets the scope of it in this case Master
        });
      },
      geocode: function (opts) {
        this.geocoder.geocode({
          address: opts.address
        }, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            opts.success.call(this, results, status);
          } else {
            opts.error.call(this, status);
          }
        });
      },
      setPano: function (element, opts) {
        var panorama = new google.maps.StreetViewPanorama(element, opts);
        if (opts.events) {
          this._attachEvents(panorama, opts.events);
        }
        this.gMap.setStreetView(panorama);
      },
      setViewport:function(zoom, lat,lng){
        this.gMap.setZoom(zoom);
        this.gMap.setCenter(new google.maps.LatLng({lat: lat, lng: lng}));
        
      },
      /* _on:function(event, callback){
       var self = this;
       google.maps.event.addListener(this.gMap,event,function(e){
         callback.call(_self, e);//call the function but also sets the scope of it in this case Master
       });
       },*/
      addMarker: function (opts) {
        var marker;
        opts.position = {
          lat: opts.lat,
          lng: opts.lng
        }
        marker = this._createMarker(opts);
        /*if (this.markerClusterer) {
          this.markerClusterer.addMarker(marker);
        }*/
        this._addMarker(marker);

        if (opts.content) {
          this._on({
            obj: marker,
            event: 'click',
            callback: function () {
              var infoWindow = new google.maps.InfoWindow({
                content: opts.content
              });

              infoWindow.open(this.gMap, marker);
            }
          });
        } else if (opts.event) {
          this._on({
            obj: marker,
            event: opts.event.name,
            callback: opts.event.callback
          });
        }
        if (opts.events) {
          this._attachEvents(marker, opts.events);
        }

        return marker;
      },
      _attachEvents: function (obj, events) {
        var self = this;//Mapster
        events.forEach(function (event) {
          self._on({
            obj: obj,
            event: event.name,
            callback: event.callback
          });
        });
      },
      _addMarker: function (marker) {
        //this.markers.push(marker);
        this.markers.add(marker);
      },
      findBy: function (callback) {
        this.markers.find(callback);
      },
      removeBy: function (callback) {
        var self = this;
        self.markers.find(callback, function (markers) {
          markers.forEach(function (marker) {
            /*if (self.markerClusterer) {
              self.markerClusterer.removeMarker(marker);
            } else {*/
              marker.setMap(null);
            //}
            //marker.setMap(null);
          });
        });
      },
      addBy: function (callback) {
        var self = this;
        self.markers.find(callback, function (markers) {
          markers.forEach(function (marker) {
            //console.log("marker.data.Category", marker.data.Category)
            /*if (self.markerClusterer) {
              self.markerClusterer.addMarker(marker);
            } else {*/
              marker.setMap(self.gMap);
            //}
            //marker.setMap(null);
          });
        });
      },
      /* _removeMarker: function(marker) {
         var indexOf = this.markers.indexOf(marker);
         if (indexOf !== -1) {
           this.markers.splice(indexOf, 1);
           marker.setMap(null);
         }
       },
       findMarkerByLat: function(lat) {
         var i = 0;
         for(; i < this.markers.length; i++) {
           var marker = this.markers[i];
           if (marker.position.lat() === lat) {
             return marker;
           }
         }
     },*/
      _createMarker: function (opts) {
        opts.map = this.gMap;
        return new google.maps.Marker(opts);
      }
      /*addMarker: function(lat, lng, draggable) {
        this._createMarker(lat, lng, draggable);
      },
      _createMarker: function(lat, lng, draggable) {
        var opts = {
          position: {
            lat: lat,
            lng: lng
          },
		  //icon:
          draggable: draggable,
          map: this.gMap
        };
        return new google.maps.Marker(opts);
      }*/
      /*_on:function(event, callback){
      google.maps.event.addListener(this.gMap,event,callback);//this is the map object
      }*/
    };
    return Mapster;
  } ());

  Mapster.create = function (element, opts) {
    return new Mapster(element, opts);
  };

  window.Mapster = Mapster;

} (window, google, List));
