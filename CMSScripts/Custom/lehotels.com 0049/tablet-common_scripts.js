jQuery(document).ready(function(){
	jQuery('body').on('click', '.faq a', function(e){
		e.preventDefault();
		console.log(jQuery('#copy').position().top);
		jQuery('#copy').scrollTop($('a[name="' + $(this).attr('href').replace('#','') + '"]').position().top);
	});
});

jQuery(function(){
	// Generate array for filtering from search results
    if (jQuery('article#search').length > 0) {
        var searchResultLocations = [];
        
        jQuery('article.search-result').each(function(i) {
            var i = {
            	// Map vars
                name: jQuery(this).find('.map-hotelName').text(),
                street_address: jQuery(this).find('.map-streetAddress').text(),
                phone: jQuery(this).find('.map-phone').text(),
                lat: jQuery(this).attr('lat'),
                lng: jQuery(this).attr('lng'),
                // Search vars
                region: jQuery(this).find('.map-region').text(),
                country: jQuery(this).find('.map-country').text(),
                state: jQuery(this).find('.map-state').text(),
                city: jQuery(this).find('.map-city').text(),
                leisureCat: jQuery(this).find('.map-categories').attr('leisurecat'),
                businessCat: jQuery(this).find('.map-categories').attr('businesscat'),
                meetingsCat: jQuery(this).find('.map-categories').attr('meetingscat'),
                boutiqueCat: jQuery(this).find('.map-categories').attr('boutiquecat'),
                spaCat: jQuery(this).find('.map-categories').attr('spacat'),
                golfCat: jQuery(this).find('.map-categories').attr('golfcat'),
                skiCat: jQuery(this).find('.map-categories').attr('skicat'),
                weddingsCat: jQuery(this).find('.map-categories').attr('weddingscat')
            };
            searchResultLocations.push(i);
        });

        // Search Counts & Filtering
        // # OF RESULTS
        var numOfResults = jQuery('article.search-result').length;
        jQuery('#content h1').after('<h2>Matching results: ' + numOfResults + '</h2>');
        
        // REGION
        jQuery('#regionFilter').find('label').not(':first').each(function() {
        	// Loop the array for matching results
        	var numOfResults = 0,
        		valToMatch = jQuery(this).text().toLowerCase().replace(/&/g,'').replace(/ /g,'');
	        for (i=0; i < searchResultLocations.length; i++) {
	        	var thisVal = searchResultLocations[i].region.toLowerCase();
	        	if (thisVal === valToMatch) {
	        		numOfResults++;
	        	};
	        };
	        // Append number if not 0, otherwise hide option
	        if (numOfResults > 0) {
		        jQuery(this).append(' (' + numOfResults + ')');
		    } else {
		    	jQuery(this).next('br').hide();
		    	jQuery(this).prev('input').hide();
		    	jQuery(this).hide();
	        }
        });

        // COUNTRY
        jQuery('#countryFilter').find('label').not(':first').each(function() {
        	// Loop the array for matching results
        	var numOfResults = 0,
        		valToMatch = jQuery(this).text().toLowerCase().replace(/&/g,'').replace(/ /g,'');
	        for (i=0; i < searchResultLocations.length; i++) {
	        	var thisVal = searchResultLocations[i].country.toLowerCase().replace(/ /g,'');
	        	if (thisVal === valToMatch) {
	        		numOfResults++;
	        	};
	        };
	        // Append number if not 0, otherwise hide option
	        if (numOfResults > 0) {
		        jQuery(this).append(' (' + numOfResults + ')');
		    } else {
		    	jQuery(this).next('br').hide();
		    	jQuery(this).prev('input').hide();
		    	jQuery(this).hide();
	        }
        });

        // STATE
        jQuery('#stateFilter').find('label').not(':first').each(function() {
          // Loop the array for matching results
          var numOfResults = 0,
            valToMatch = jQuery(this).text().toLowerCase().replace(/&/g,'').replace(/ /g,'').replace(/,/g,'');
          for (i=0; i < searchResultLocations.length; i++) {
            var thisVal = searchResultLocations[i].state.toLowerCase().replace(/ /g,'').replace(/,/g,'');
            if (thisVal === valToMatch) {
              numOfResults++;
            };
          };
          // Append number if not 0, otherwise hide option
          if (numOfResults > 0) {
            jQuery(this).append(' (' + numOfResults + ')');
        } else {
          jQuery(this).next('br').hide();
          jQuery(this).prev('input').hide();
          jQuery(this).hide();
          }
        });
        // Remove state area if not USA or CAN selected
        if (!jQuery('#countryFilter').find('input[value*="USA"]').is(':checked') && !jQuery('#countryFilter').find('input[value*="CAN"]').is(':checked')) {
          jQuery('#stateFilter').prev('h5').remove();
          jQuery('#stateFilter').next('br').remove();
          jQuery('#stateFilter').remove();
        };
        // If user clicks to any other country, reset this filter
        jQuery('#countryFilter input, #countryFilter label').click(function(e) {
          jQuery('#stateFilter').find('input').prop('checked',false);
        });
        // Unchecked default radio button fix
        if (jQuery('#stateFilter input:checked').length === 0) {
          jQuery('#stateFilter input:first').prop('checked', true);
        };

        // CITY
        jQuery('#cityFilter').find('label').not(':first').each(function() {
        	// Loop the array for matching results
        	var numOfResults = 0,
        		valToMatch = jQuery(this).text().toLowerCase();

        	switch(valToMatch) {
        		case "a-c":
        			valToMatch = new RegExp(/([a-c])/g);
        			break;
        		case "d-l":
        			valToMatch = new RegExp(/([d-l])/g);
        			break;
        		case "m-r":
        			valToMatch = new RegExp(/([m-r])/g);
        			break;
        		case "s-z":
        			valToMatch = new RegExp(/([s-z])/g);
        			break;
        	}

	        for (i=0; i < searchResultLocations.length; i++) {
	        	var thisVal = searchResultLocations[i].city.toLowerCase().slice(0,1);
	        	if (thisVal.match(valToMatch)) {
	        		numOfResults++;
	        	};
	        };
	        // Append number if not 0, otherwise hide option
	        if (numOfResults > 0) {
		        jQuery(this).append(' (' + numOfResults + ')');
		    } else {
		    	jQuery(this).next('br').hide();
		    	jQuery(this).prev('input').hide();
		    	jQuery(this).hide();
	        }
        });

        // CATEGORIES
        jQuery('#categoryFilter').find('label').each(function() {
            // Loop the array for matching results
            var numOfResults = 0,
                label = jQuery(this).text().toLowerCase().replace(' hotel',''),
                valToMatch = "true";
            for (i=0; i < searchResultLocations.length; i++) {
                switch(label) {
                    case "leisure":
                        var thisVal = searchResultLocations[i].leisureCat.toLowerCase();
                        break;
                    case "business":
                        var thisVal = searchResultLocations[i].businessCat.toLowerCase();
                        break;
                    case "meetings":
                        var thisVal = searchResultLocations[i].meetingsCat.toLowerCase();
                        break;
                    case "boutique":
                        var thisVal = searchResultLocations[i].boutiqueCat.toLowerCase();
                        break;
                    case "spa":
                        var thisVal = searchResultLocations[i].spaCat.toLowerCase();
                        break;
                    case "golf":
                        var thisVal = searchResultLocations[i].golfCat.toLowerCase();
                        break;
                    case "ski":
                        var thisVal = searchResultLocations[i].skiCat.toLowerCase();
                        break;
                    case "weddings":
                        var thisVal = searchResultLocations[i].weddingsCat.toLowerCase();
                        break;
                }
                
                if (thisVal === valToMatch) {
                    numOfResults++;
                };
            };
            // Append number if not 0, otherwise hide option
            if (numOfResults > 0) {
                jQuery(this).append(' (' + numOfResults + ')');
            } else {
                jQuery(this).next('br').hide();
                jQuery(this).prev('input').hide();
                jQuery(this).hide();
            }
        });
    
        //console.log(searchResultLocations);
});