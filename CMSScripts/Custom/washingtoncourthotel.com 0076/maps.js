function mm_initialize_map() {
    if (jQuery('#map_canvas').length > 0) {
        var stylesArray = [
        {
            featureType: "poi.business",
            elementType: "labels",
            stylers: [
                {visibility: "off"}
            ]
         }
        ];
        mapOptions = {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: true,
            minZoom: 12,
            maxZoom: 16,
            styles: stylesArray
        };
    
        window.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    
        for (slug in window.places) {
            page_list = window.places[slug];
    
            for (place_index in page_list) {
                place = page_list[place_index];
    
                if (place['gps']) {
                    MarkerOptions = {
                        position: new google.maps.LatLng(place['gps'][1], place['gps'][0]),
                        title: place['title']
                    }
    
                    if (icon = place['icon']) {
                        if (size = icon['size'])
                            icon['size'] = new google.maps.Size(size['x'], size['y']);
                        else
                            icon['size'] = null;
    
                        if (origin = icon['origin'])
                            icon['origin'] = new google.maps.Point(origin['x'], origin['y']);
                        else
                            icon['anchor'] = null;
    
                        if (anchor = icon['anchor'])
                            icon['anchor'] = new google.maps.Point(anchor['x'], anchor['y']);
                        else
                            icon['anchor'] = null;
    
                        if (scaledSize = icon['scaledSize'])
                            icon['scaledSize'] = new google.maps.Size(scaledSize['x'], scaledSize['y']);
                        else
                            icon['scaledSize'] = null;
    
                        MarkerImage = new google.maps.MarkerImage(icon['url'], icon['size'], icon['origin'], icon['anchor']);
    
                        MarkerOptions['icon'] = MarkerImage;
                    }
    
                    window.places[slug][place_index]['marker'] = new google.maps.Marker(MarkerOptions);
    
                    google.maps.event.clearListeners(window.places[slug][place_index].marker, 'click');
                    google.maps.event.addListener(window.places[slug][place_index].marker, 'click', marker_click);
                }
            }
        }
    
        google.maps.event.addListener(map, 'zoom_changed', function() {
            zoomChangeBoundsListener = google.maps.event.addListener(map, 'bounds_changed', function(event) {
                if (this.getZoom() > 16) // Change max/min zoom here
                    this.setZoom(16);
                    
                google.maps.event.removeListener(zoomChangeBoundsListener);
            });
        });
    
        jQuery("#categories h2").first().addClass("active");
    
        mm_reset_map_places('<?= $terms[0]->slug; ?>', 0);
    
    
        jQuery("input[name=visible_term]").on('click', function(e) {
            target = jQuery(e.target);
            slug = target.attr("value");
    
            checked = target.is(':checked');
    
            mm_reset_map_places(slug, 0);
        });
    };
}

function marker_click(marker) {
	for (slug in window.places) {
		for (place_index in window.places[slug]) {
            if (window.places[slug][place_index].marker) {
    			if (window.places[slug][place_index].marker.getPosition().equals(marker.latLng)) {
    				jQuery(".current_location").removeClass("current_location");
    				jQuery("#" + window.places[slug][place_index].id).addClass("current_location");

    				add_content_label_by_id(slug, place_index);
    				map.setCenter(window.places[slug][place_index].marker.getPosition());
    			} else {
    				remove_label_by_id(slug, place_index);
    			}
            }
		}
	}

    return false;
}

function label_click(e) {
	title = e.target.innerHTML;

	for (slug in window.places) {
		for (place_index in window.places[slug]) {
			if (window.places[slug][place_index].title == title) {
				remove_label_by_id(slug, place_index);

				jQuery(".current_location").removeClass("current_location");
				jQuery("#" + window.places[slug][place_index].id).addClass("current_location");

				add_content_label_by_id(slug, place_index);
				map.setCenter(window.places[slug][place_index].marker.getPosition());
			} else {
				remove_label_by_id(slug, place_index);
			}
		}
	}
}

function add_label_by_id(slug, place_index) {
	if (window.places[slug][place_index].label) {
		remove_label_by_id(slug, place_index);
	}
}

function add_content_label_by_id(slug, place_index) {
	place = window.places[slug][place_index];

	if (place.label) {
		remove_label_by_id(slug, place_index);
	}

	text = '<a class="xbutton" href="javascript:xbutton_click();">X</a>';
	text += '<h3>' + place.title + '</h3>';
	text += place.content;

	window.places[slug][place_index].label = new Label2(
			{
				map: window.map, 
				text: text,
				marker: place.marker
			}
		);
}

function xbutton_click(e) {
	mm_reset_map_places('', 0);
}

function remove_label_by_id(slug, place_index) {
	if (window.places[slug][place_index].label) {
		label = window.places[slug][place_index].label;

		label.onRemove();
		window.places[slug][place_index].label = null;
	}
}

function mm_reset_map_places(slug, place_id) {
	x1 = 0;
	x2 = 0;
	y1 = 0;
	y2 = 0;

    hotel = 0;

    for (slug in window.places) {
    	place_list = window.places[slug];
    	bounds = new google.maps.LatLngBounds();

    	for (place_index in place_list) {
    		place = place_list[place_index];

    		if (! place['gps']) {
    			continue;
    		}

            if (place.persist && ( place.title.indexOf('Hotel') >= 0 ) ) {
                pos = window.places[slug][place_index].marker.position;

                window.hotel = place;
            }

    		if (place_id) {
    			if (place_id == place['id']) {
    				window.places[slug][place_index].marker.setMap(window.map);
                    
                    google.maps.event.clearListeners(window.places[slug][place_index].marker, 'click');
            		google.maps.event.addListener(window.places[slug][place_index].marker, 'click', marker_click);

    				pos = window.places[slug][place_index].marker.position;

    				if (! y1) {
    					y1 = pos.lat();
    					y2 = pos.lat();
    					x1 = pos.lng();
    					x2 = pos.lng();
    				} else {
    					if (pos.lat() < y1)
    						y1 = pos.lat();
    					else if (pos.lat() > y2)
    						y2 = pos.lat();

    					if (pos.lng() < x1)
    						x1 = pos.lng();
    					else if (pos.lng() > x2)
    						x2 = pos.lng();
    				}

        			remove_label_by_id(slug, place_index);
					add_label_by_id(slug, place_index);
    			} else {
    				window.places[slug][place_index].marker.setMap(null);
    				remove_label_by_id(slug, place_index);
    			}
    		} else {
    			is_enabled = jQuery('input[type=checkbox][value=' + slug + ']').is(':checked');

    			if (is_enabled || place.persist) {
    				window.places[slug][place_index].marker.setMap(window.map);
                    google.maps.event.clearListeners(window.places[slug][place_index].marker, 'click');
            		google.maps.event.addListener(window.places[slug][place_index].marker, 'click', marker_click);

    				pos = window.places[slug][place_index].marker.position;

    				if (! y1) {
    					y1 = pos.lat();
    					y2 = pos.lat();
    					x1 = pos.lng();
    					x2 = pos.lng();
    				} else {
    					if (pos.lat() < y1)
    						y1 = pos.lat();
    					else if (pos.lat() > y2)
    						y2 = pos.lat();

    					if (pos.lng() < x1)
    						x1 = pos.lng();
    					else if (pos.lng() > x2)
    						x2 = pos.lng();
    				}

        			remove_label_by_id(slug, place_index);
					add_label_by_id(slug, place_index);
    			} else {
    				window.places[slug][place_index].marker.setMap(null);
    				remove_label_by_id(slug, place_index);
    			}
    		}
    	}

        if (x1 && y1 && x2 && y2) {
            if (window.hotel) {
                h_pos = window.hotel.marker.getPosition();

                h_x = h_pos.lng();
                h_y = h_pos.lat();

                diff_l = h_x - x1;
                diff_r = x2 - h_x;

                if (diff_l > diff_r) {
                    x2 = h_x + diff_l;
                } else {
                    x1 = h_x - diff_r;
                }

                diff_t = h_y - y1;
                diff_b = y2 - h_y;

                if (diff_t > diff_b) {
                    y2 = h_y + diff_t;
                } else {
                    y1 = h_y - diff_b;
                }
            }

            bounds = new google.maps.LatLngBounds(new google.maps.LatLng(y1, x1), new google.maps.LatLng(y2, x2));

            window.map.fitBounds(bounds);
        }
    }
}

google.maps.event.addDomListener(window, 'load', mm_initialize_map);

// Define the overlay, derived from google.maps.OverlayView
function Label2(opt_options) {
     // Initialization
     this.setValues(opt_options);
 
     // Here go the Label2 styles
     var span = this.span_ = document.createElement('span');
 	 span.className += "mm_maplabel larger";
     var div = this.div_ = document.createElement('div');
     var marker = this.marker_ = opt_options.marker;
     div.appendChild(span);
     div.style.cssText = 'position: absolute; display: none';
};
 
Label2.prototype = new google.maps.OverlayView;
 
Label2.prototype.onAdd = function() {
     var pane = this.getPanes().overlayImage;
     pane.appendChild(this.div_);
 
     // Ensures the Label2 is redrawn if the text or position is changed.
     var me = this;
     this.listeners_ = [
          google.maps.event.addListener(this, 'position_changed',
               function() { me.draw(); }),
          google.maps.event.addListener(this, 'text_changed',
               function() { me.draw(); }),
          google.maps.event.addListener(this, 'zindex_changed',
               function() { me.draw(); })
     ];
};
 
// Implement onRemove
Label2.prototype.onRemove = function() {
	if (this.div_.parentNode != undefined) {
    	this.div_.parentNode.removeChild(this.div_);
    }

    if (! this.listeners_ )
        return false;
 
	// Label2 is removed from the map, stop updating its position/text.
	for (var i = 0, I = this.listeners_.length; i < I; ++i) {
		google.maps.event.removeListener(this.listeners_[i]);
	}
};
 
// Implement draw
Label2.prototype.draw = function() {
     var projection = this.getProjection();
     var div = this.div_;
     var marker = this.marker_;

     var position = projection.fromLatLngToDivPixel(this.marker_.getPosition());

     div.style.left = position.x + 'px';
     div.style.top = position.y + 'px';
     div.style.display = 'block';
     this.span_.innerHTML = this.get('text').toString();
};

function show_label_by_place_id(id) {
    for (slug in window.places) {
        page_list = window.places[slug];

        for (place_index in page_list) {
            place = page_list[place_index];

            if (place['id'] == id) {
                window.places[slug][place_index].label = '';

                add_content_label_by_id(slug, place_index);
                return;
            }
        }
    }
}

jQuery(document).ready(function() {
    jQuery(".term-link").click(function(e) {
        t = jQuery(e.target);

        if (! t.is('a')) {
            t = t.parents('a');
        }

        e.preventDefault();

        id = t.attr("href").substring(1);

        box = jQuery("input[value=" + id + "]");

        box.attr("checked", !box.is(":checked"));

        mm_reset_map_places('', 0);

        return false;
    });

    jQuery(".place-link").click(function(e) {
        e.preventDefault(0);

        t = jQuery(e.target);

        if (! t.is('a')) {
            t = t.parents('a');
        }

        id = 1*t.attr("href").substring(1);

        mm_reset_map_places('', id);

        show_label_by_place_id(id);
    });
});