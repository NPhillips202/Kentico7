(function (indow, Mapster) {

  jQuery.widget("bdesignet.mapster", {
    // default options
    options: {},
 
    // the constructor
    _create: function () {
      var element = this.element[0],
        options = this.options;
      this.map = Mapster.create(element, options);

      var channel = postal.channel();
      var subscriptionCategorySelected;
      var subscriptionShowAllCategories;

      var _self = this;
      subscriptionCategorySelected = channel.subscribe("categorySelected", function (data) {
        //jQuery( "#example1" ).html( "Name: " + data.name );
        //console.log("selector.change", this);
        //console.log("selector.change", _self);
        //console.log("selector.change", data)
        _self.map.removeBy(function (marker) {
          return marker.data.Category != data.category;
        });
        _self.map.addBy(function (marker) {
          //console.log("marker.data.Category", marker.data.Category)
          return marker.data.Category === data.category;
        });
        _self.map.setViewport(data.zoom, data.lat, data.lng);/*
        _self.map.setZoom(data.zoom);
        _self.map.setCenter(new google.maps.LatLng({lat: data.lat, lng: data.lng}));*/
        jQuery('#overlap').popover('hide');
        //console.log("selector.change", _self.options.category)
        /*if(data.category ==_self.options.category){
          jQuery(_self.element).removeClass("menu_item_unselected").addClass( "menu_item_selected" );
        }else{
          jQuery(_self.element).removeClass("menu_item_selected").addClass( "menu_item_unselected" );
        }*/
      });

      subscriptionShowAllCategories = channel.subscribe("showAllCategories", function (data) {
        _self.map.addBy(function (marker) {
          //console.log("marker.data.Category", marker.data.Category)
          return marker;
        });
        _self.map.setViewport(12, 39.68602753445075, -104.92379477144472);
      });
    },
 
    // called when created, and later when changing options
    _refresh: function () {

    },
 
    // Add a marker onto the map
    addMarker: function (opts) {
      var self = this;
      if (opts.location) {
        this.map.geocode({
          address: opts.location,
          success: function (results) {
            results.forEach(function (result) {
              /*console.log("----------------------------------------------------------------------------------------------------------");
              console.log("----------------------------------------------------------------------------------------------------------");
              console.log(result);
              console.log("lat", result.geometry.location.lat());
              console.log("lng", result.geometry.location.lng());*/
              opts.lat = result.geometry.location.lat();
              opts.lng = result.geometry.location.lng();
              opts.icon = "/getmedia/5cc480c8-a562-4ec2-9228-ee29a0371cfe/icon";
              //opts.icon = "https://www.theloganhotel.com/Theloganhotel.com-0043-2015Redesign/media/theloganhotel.com-0043/graphics/marker-hotel.png";
              /*events: [{
                name: 'click',
                callback: function (e, marker) {
                  console.log('Im clicked **');
                  console.log(this);
                  console.log(e);
                  console.log(marker);
                  console.log('-----');
                  console.log(jQuery(marker));
                  console.log('Im clicked');
                  alert('Im clicked');
                }
              }],*/
              /*var contentString = '<div class="info-window">' +
                '<h3>Info Window Content</h3>' +
                '<div class="info-content">' +
                '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>' +
                '</div>' +
                '</div>';
              opts.content = contentString;*/
              //console.log("----------------------------------------------------------------------------------------------------------");
              self.map.addMarker(opts);
              //console.log("----------------------------------------------------------------------------------------------------------");
              //console.log("----------------------------------------------------------------------------------------------------------");
            });
          },
          error: function (status) {
            //console.error(status)
          }
        });
      } else {
        this.map.addMarker(opts);
      }
    },

    findMarkers: function (callback) {
      return this.map.findBy(callback);
    },

    removeMarkers: function (callback) {
      this.map.removeBy(callback);
    },

    markers: function () {
      return this.map.markers.items;
    },

    setPano: function (selector, opts) {
      var elements = jQuery(selector),
        self = this;
      jQuery.each(elements, function (key, element) {
        self.map.setPano(element, opts);
      });
    },
 
    // events bound via _on are removed automatically
    // revert other modifications here
    _destroy: function () {

    },
 
    // _setOptions is called with a hash of all options that are changing
    // always refresh when changing options
    _setOptions: function () {
      // _super and _superApply handle keeping the right this-context
      this._superApply(arguments);
      this._refresh();
    },
 
    // _setOption is called for each individual option that is changing
    _setOption: function (key, value) {
      this._super(key, value);
    }
  });

} (window, Mapster))