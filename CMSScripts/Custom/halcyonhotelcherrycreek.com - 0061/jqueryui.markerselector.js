(function (window, postal) {
  /*
    var channel = postal.channel();
    var subscriptionSelectorChange;*/
  var selected;// = false;

  jQuery.widget("bdesignet.markerselector", {
    // default options
    options: {},
 
    // the constructor
    _create: function () {
      var element = this.element[0],
        options = this.options;

      var channel = postal.channel();
      var subscriptionCategorySelected;
      //var selected = false;
      //this.map = Mapster.create(element, options);
      //console.log("Ceeate markerselector", element);
      //is.addListeners();
      //this._addListeners();
      jQuery(element).click(function (e) {
        //jQuery('.removeable').remove();
        /*
        console.log("markerselector", e);
        console.log("markerselector", element);
        console.log("markerselector", options.category);
        */
        //jQuery('#menu_1').css({color:#dd463c}
        //jQuery('#menu_1').css({color: '#dd463c'});
        //jQuery(element).removeClass("menu_item_unselected").addClass( "menu_item_selected" );
        //console.log(this);
        //console.log(options.category);
        if (_self.selected) {
          jQuery(_self.element).removeClass("menu_item_selected").addClass("menu_item_unselected");
          _self.selected = false;

          postal.publish({
            topic: "showAllCategories",
            data: {
              category: options.category
            }
          });
        } else {
          postal.publish({
            topic: "categorySelected",
            data: {
              category: options.category,
              lat: options.map_data.lat,
              lng: options.map_data.lng,
              zoom: options.map_data.zoom
            }
          });
        }
      });
      var _self = this;
      _self.selected = false;
      subscriptionCategorySelected = channel.subscribe("categorySelected", function (data) {
        //jQuery( "#example1" ).html( "Name: " + data.name );
        /*console.log("selector.change", this);
        console.log("selector.change", _self);
        console.log("selector.change", data)*/
        //console.log("selector.change", _self.options.category);
        //console.log("selector.change this", this);
        //console.log("selector.change this", _self);
        //console.log("data.category",data.category);
        //console.log("selected", selected);
        //console.log("_self.selected", _self.selected);
        if (data.category == _self.options.category) {
          /*if(_self.selected){
            jQuery(_self.element).removeClass("menu_item_selected").addClass( "menu_item_unselected" );
            _self.selected = false;
          }else{*/
          jQuery(_self.element).removeClass("menu_item_unselected").addClass("menu_item_selected");
          _self.selected = true;
          //}
          //jQuery(_self.element).removeClass("menu_item_unselected").addClass( "menu_item_selected" );
          //console.log("selected", selected);
          //selected = true;
        } else {
          jQuery(_self.element).removeClass("menu_item_selected").addClass("menu_item_unselected");

          _self.selected = false;
        }

      });
    },
 
    // called when created, and later when changing options
    _refresh: function () {

    },
    /*_addListeners: function (opts) {
      subscriptionSelectorChange = channel.subscribe( "selector.change", function ( data ) {
        jQuery( "#example1" ).html( "Name: " + data.name );
        console.log("selector.change", this);
        console.log("selector.change", selector.change)
      } );
    },*/
 
    // Add a marker onto the map
    addMarker: function (opts) {
      /*var self = this;
      if (opts.location) {
        this.map.geocode({
          address: opts.location,
          success: function (results) {
            results.forEach(function (result) {
              console.log("----------------------------------------------------------------------------------------------------------");
              console.log("----------------------------------------------------------------------------------------------------------");
              console.log(result);
              console.log("lat", result.geometry.location.lat());
              console.log("lng", result.geometry.location.lng());
              opts.lat = result.geometry.location.lat();
              opts.lng = result.geometry.location.lng();
              opts.icon = "icon.png";*/
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
      /*console.log("----------------------------------------------------------------------------------------------------------");
      self.map.addMarker(opts);
      console.log("----------------------------------------------------------------------------------------------------------");
      console.log("----------------------------------------------------------------------------------------------------------");
    });
  },
  error: function (status) {
    console.error(status)
  }
});
} else {
this.map.addMarker(opts);
}*/
    },
    /*
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
     */
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

} (window, postal))