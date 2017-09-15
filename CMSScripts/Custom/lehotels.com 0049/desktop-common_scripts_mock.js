$(function(){

	// ATTR target="_blank"

	//$('a[rel="external"], form.form-external, a[href^="http"][href*="://"]:not([href*="' + window.location.host + '"]), a[href*=".pdf"]').attr('target', '_blank');
	$('a[rel="external"], .form.form-external, a[href^="http"][href*="://"]:not([href*="' + window.location.host + '"]), a[href*=".pdf"]').attr('target', '_blank');

	// TOKENS

	if ($('#ping').length) $('#ping').after($('<input>').attr({'name':'pong','value':$('#ping').val(),'class':'hide'}));

	// SOCIAL ICONS

	$('#header .socials').addClass('interactive').prepend($('<a />', {'class': 'trigger', 'text': 'More'}).click(function(){
		$(this).parent().toggleClass('expanded');
	}));

	// TOP IMAGE ROTATION

	var photosSlideshow = null;

	if ($('#photos img').length > 1) {
		photosSlideshow = new PhotosSlideshow($('#photos'));
		photosSlideshow.init();
	}

	// STYLISH SELECT

	//$('#header .hotel-finder select, .booking select, #content .form select, #calendar-filter select').sSelect();
	//var sselect = jQuery('#header .hotel-finder select, .booking select, #content .form select, #calendar-filter select');
	var sselect = jQuery('#header .hotel-finder, .booking, #booking-mask-fields, #content .form , #content .special-packages-sorter-wrapper, #calendar-filter');
	sselect.find('select').sSelect({ddMaxHeight: '300px'});
	sselect.find('select').change(function(){
		var str = '';
		str = jQuery(this).next('.newListSelected').find('.selectedTxt').text();
		jQuery(this).find('option').attr('selected', false).removeClass('selected');
		jQuery(this).closest('p, .properties, .special-packages-sorter-wrapper').find("option:contains('" + str + "')").attr('selected', true).addClass('selected');
		console.log(str);
	});
	//}).trigger('change');

	// BOOKING

	HeBS_Link_Checkin_Checkout_Inputs('#booking-checkin', '#booking-checkout');

	//
	var testCallback = function($td, thisDate, month, year)
	{
	if ($td.is('.current-month') && thisDate.getDay() == 4) {
	var d = thisDate.getDate();
	$td.bind(
	'click',
	function()
	{
	alert('You clicked on ' + d + '/' + (Number(month)+1) + '/' + year);
	}
	).addClass('thursday');
	} else if (thisDate.getDay() == 5) {
	$td.html('Friday the ' + $td.html() + 'th');
	}
	}

	$('.datepicker, .date-pick').each(function(){
		$(this).attr('autocomplete', 'off');
		$(this).attr('data-value', $(this).val());
	}).datePicker({
		'clickInput': true,
		'showYearNavigation': false,
	}).bind('dateSelected', function(e, selectedDate, $td) {
		$(this).attr('data-value', $(this).val());
	}).dpSetPosition($.dpConst.POS_TOP, $.dpConst.POS_RIGHT);

	$('#header-booking .codes h4').click(function(){
		$(this).parent().toggleClass('expanded');
	});

	//$('#header-booking form').submit(function(){
	/*if ($('select[name="city"]', this).val() == '') {
	alert('Please select City from the list!');
	return false;
	}*/
	//$('#header-booking .form .submit-button').click(function(){
	/*
	$('.submit-button').on('click', function(){
	if ($('select[name="city"] option:selected', this).val() == '') {
	alert('Please select City from the list!');
	return false;
	}

	// Analytics
	s = s_gi(s_account);
	s.linkTrackVars = 'events,eVar12';
	s.linkTrackEvents = 'event6,scOpen';
	s.linkTrackEvents = 'event6,scOpen';
	s.events = 'event6,scOpen';
	s.eVar12 = siteSettings.name + ' City Search';
	(s.tl(this, 'o', 'Booking Initiated'));

	// submit me
	//var bookingUrl = '/search?country=' + country + '&state=' + state + '&city=' + city;
	//bookingSubmitBtn.attr('href', bookingUrl);
	//window.open(bookingUrl);
	});
	*/

	// PROMO TILES

	$('#promos .slideshow').each(function(){
		var slideshow = $(this);
		var promos = $('.promo', slideshow);
		var totalPromos = promos.length;
		var currentPromo = 0;

		if (promos.length > 1) {
			slideshow.append('<nav><a class="previous" /><a class="next" /></nav>');
			$('.wrapper', slideshow).wrapInner($('<div />', {'class': 'list'}).css('width', promos.width() * totalPromos));

			//if(getQuery('mock') === "true") {
				$('.wrapper', slideshow).append($('<ul />', {'class': 'dots'}));
				$('.list').find('.promo').each(function(index){
					$('.dots').append('<li class="dot" data-dot="' + index + '"><a href="#"></a></li>');

					$('.promo').eq(currentPromo).addClass('active');
					$('.dot').eq(currentPromo).addClass('active');
				});
			//}

			//$('nav a', slideshow).click(function(){
			$('.dots a', slideshow).click(function(){
				var nextPromo;

				if ($(this).hasClass('previous')) nextPromo = currentPromo - 1;
				else nextPromo = currentPromo + 1;

				if (nextPromo == totalPromos) nextPromo = 0;
				if (nextPromo < 0) nextPromo = totalPromos - 1;

				//console.log($(this).attr("data-dot"))
				if($(this).closest('li').attr("data-dot") !== "")
					$('.list', slideshow).css('left', -parseInt($(this).closest('li').attr("data-dot")) * promos.width() + 'px');
				else
					$('.list', slideshow).css('left', -nextPromo * promos.width() + 'px');

				//
				$('.list').find('.promo').removeClass('active previous');
				$('.list').find('.promo').eq(currentPromo).addClass('previous');
				$('.list').find('.promo').eq(nextPromo).addClass('active');
				//
				$('.dots').find('.dot').removeClass('active previous');
				$('.dots').find('.dot').eq(currentPromo).addClass('previous');
				$('.dots').find('.dot').eq(nextPromo).addClass('active');

				currentPromo = nextPromo;

				return false;
			});
			var goToNextSlide = function (){
				nextPromo = currentPromo + 1;
				if (nextPromo == totalPromos) nextPromo = 0;
				if (nextPromo < 0) nextPromo = totalPromos - 1;

				$('.list', slideshow).css('left', -nextPromo * promos.width() + 'px');

				//
				$('.list').find('.promo').removeClass('active previous');
				$('.list').find('.promo').eq(currentPromo).addClass('previous');
				$('.list').find('.promo').eq(nextPromo).addClass('active');
				//
				$('.dots').find('.dot').removeClass('active previous');
				$('.dots').find('.dot').eq(currentPromo).addClass('previous');
				$('.dots').find('.dot').eq(nextPromo).addClass('active');

				currentPromo = nextPromo;

				//
				//console.log('promo:',$('.list').find('.promo').attr('class'));
				//console.log('promo:',$('.dots').find('.dot').attr('class'));
				//console.log('currentPromo:',currentPromo,'nextPromo:',nextPromo);

			}

			var time = 5000;
			var interval = setInterval(goToNextSlide, time);

			slideshow.hover(function() {
				clearInterval(interval);
			}, function() {
				interval = setInterval(goToNextSlide, time);
			});

		}
	});

	// BLOG FEED

	/*
	if ($('#blog-feed').length) {
	var blogFeedContainer = $('#blog-feed');
	var blogFeedDateFormat = 'F, d';
	var blogFeedPostsLimit = 3;
	var blogURL = 'http://blog.lehotels.com/';

	$.ajax({
	url: '//lehotels.com/skins/lehotels/assets/desktop/wp-rss.php?url=' + encodeURIComponent(blogURL + 'feed/') + '&date_format=' + encodeURIComponent(blogFeedDateFormat) + '&posts_limit=' + blogFeedPostsLimit,
	//url: '//lehotels.com/assets/desktop/wp-rss.php?url=' + encodeURIComponent(blogURL + 'feed/') + '&date_format=' + encodeURIComponent(blogFeedDateFormat) + '&posts_limit=' + blogFeedPostsLimit,
	//url: templateURL + 'assets/desktop/wp-rss.php?url=' + encodeURIComponent(blogURL + 'feed/') + '&date_format=' + encodeURIComponent(blogFeedDateFormat) + '&posts_limit=' + blogFeedPostsLimit,
	dataType: "json"
	}).done(function(feed) {
	$(feed).each(function(){
	blogFeedContainer.append('<article class="blog-post"><p>' + this.title + '</p><time>' + this.pubDate + '</time><a href="' + this.link + '">Read more</a></article>');
	});
	blogFeedContainer.append('<a href="' + blogURL + '" class="view-all" target="_blank">View all blog posts</a>');
	blogFeedContainer.slideDown();
	});
	}
	*/

	// VALIDATION & NEWSLETTER

	//$("#content .form").validationEngine({promptPosition: "topLeft", prettySelect: true, usePrefix: 'sSelect_'});
	//$("#newsletter form").validationEngine({promptPosition: "topLeft", scroll: false});
	//$("#newsletter .form").validationEngine({promptPosition: "topLeft", scroll: false});

	// Contest Form

	if ($('#contest_rfp').length) {

		var form = $('#contest_rfp'),
			iata = $('#row_iata', form),
			meetingsplanned = $('#row_meetingsplanned', form);

		iata.hide();
		$('label', iata).prepend('<em>*</em>');
		$('input', iata).attr("class", "validate[optional,length[0,128]]");

		meetingsplanned.hide();
		$('label', meetingsplanned).prepend('<em>*</em>');
		$('input', meetingsplanned).attr("class", "validate[optional,length[0,128]]");

		$('input[type=radio][name=type]', form).on("change", function () {

			if (this.value == 'travelagent') {
				meetingsplanned.slideUp();
				iata.slideDown();
				$('input', iata).attr("class", "validate[required,length[0,128]]");
				$('input', meetingsplanned).attr("class", "validate[optional,length[0,128]]");
			}

			if (this.value == 'meetingplaner') {
				iata.slideUp();
				meetingsplanned.slideDown();
				$('input', meetingsplanned).attr("class", "validate[required,length[0,128]]");
				$('input', iata).attr("class", "validate[optional,length[0,128]]");
			}

		});

	}

	// PLACEHOLDER

	//inputPlaceholder($('#newsletter input[type="text"]'));

	// GALLERY

	if (typeof galleryJSON != 'undefined') {
		var galleryImages = [];

		$.each(galleryJSON, function() {
			for (var length = this.images.length, index = 0; index < length; index++) {
				this.images[index].image = this.images[index].full;
				this.images[index].description = this.images[index].caption;
				if ($('html').hasClass('property') && !$('html').hasClass('gallery')) {
					galleryImages.push(this.images[index]);
				}
			}
		});

		$("#content-area .gallery a").click(function() {
			if (galleryImages.length) {
				initGallery(null, galleryImages, $(this).index('#content-area .gallery a'));
			} else {
				initGallery($(this).data('gallery-id'));
			}
			return false;
		});
	}

	// GOOGLE MAP

	// Generate array for map from search results
	if (jQuery('article#search').length > 0) {
		var searchResultLocations = [];

		jQuery('article.search-result').each(function(i) {
			var i = {
				// Map vars
				name: jQuery(this).find('.map-hotelName').text(),
				link: jQuery(this).find('.thumbnail > a').attr('href'),
				image: jQuery(this).find('.thumbnail > a').css('background-image'),
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
            console.log(i.name);
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

		// Populate static map counts
		jQuery('.regions-list a').each(function() {
		  // Loop the array for matching results
		  var numOfResults = 0,
		    valToMatch = jQuery(this).attr('class').toLowerCase().replace(/-/g,'');

		  for (i=0; i < searchResultLocations.length; i++) {
		    var thisVal = searchResultLocations[i].region.toLowerCase();
		    if (thisVal === valToMatch) {
		      numOfResults++;
		    };
		  };
		  // Append number
		  jQuery(this).find('span').text(' (' + numOfResults + ')');
		});


		//console.log(window.location.href.indexOf('?searchtext='));

		// Logic to determine which map should show (remove the extra one)
		if (
			(window.location.href.indexOf('?searchtext=') != -1) ||         // If user has used the search box
			(window.location.href.indexOf('?mock=') != -1) ||         // If user has used the search box
			//(jQuery('#regionFilter .destination-and-hotel input[type="text"]').val(":checked")) ||         // If user has used the search box
			(jQuery('#regionFilter input:not(:first)').is(":checked")) ||   // If a region is selected
			(jQuery('#countryFilter input:not(:first)').is(":checked")) ||  // If a country is selected
			(jQuery('#stateNameFilter input').is(":checked")) ||            // If a state is selected (via querystring search)
			(jQuery('#stateFilter input').is(":checked")) ||                // If a state is selected
			(jQuery('#cityFilter input:not(:first)').is(":checked")) ||     // If a city is selected (first letter section)
			(jQuery('#cityNameFilter input').is(":checked")) ||             // If a city is selected (via querystring search)
			(jQuery('#categoryFilter input').is(":checked"))                // If a category is selected
			)
		{
			// Show interactive - ditch the static map
			//console.log('Show interactive map');
			jQuery('#header-map').first().remove();
		}
		else
		{
			// Show static - ditch the interactive map
			//console.log('Show static map');
			jQuery('#header-map.interactive-map').remove();
		}

	};


	if (jQuery('#map-canvas').length) initGoogleMap(siteSettings, 'map-canvas');

	if (jQuery('#header-map-canvas').length) {
		if (typeof searchResultLocations != 'undefined') {
			initGoogleMap(siteSettings, 'header-map-canvas', searchResultLocations);
		} else {
			initGoogleMap(siteSettings, 'header-map-canvas');
		}
	}

	// BOOKING AND HOTEL FINDER
	if(getQuery('mock') !== "true"){

	/*if (booking_tree && booking_vars) {

	//$('.country select[name="country"]').change(function() {
	//var form = $(this).parents('form');
	$('.country select[name="country"]').change(function() {
		var form = $(this).parents('.form');

		var country_abbr = $(this).val();
		//var country_abbr = $(this).find('option:selected').val();
		if (country_abbr && typeof booking_tree != 'undefined' && typeof booking_tree[country_abbr] != 'undefined') {
			var country = booking_tree[country_abbr];
			if (_count(country['states'])) {
				populateStatesDropdown(form, country['states']);
				populateCitiesDropdown(form);
			} else {
				populateStatesDropdown(form);
				populateCitiesDropdown(form, country['cities']);
			}
		} else {
			populateStatesDropdown(form);
			populateCitiesDropdown(form);
		}
	});

	//$('.state select[name="state"]').change(function() {
	//var form = $(this).parents('form');
	$('.state select[name="state"]').change(function() {
      var form = $(this).parents('.form');

      var country_abbr = $('.country select[name="country"]', form).val();
      //var country_abbr = $('.country select[name="country"] option:selected', form).val();
      if (country_abbr && typeof booking_tree != 'undefined' && typeof booking_tree[country_abbr] != 'undefined') {
        var country = booking_tree[country_abbr];
        var state_abbr = $(this).val();
        //var state_abbr = $(this).find('option:selected').val();
        if (state_abbr && typeof country['states'][state_abbr] != 'undefined') {
          var state = country['states'][state_abbr];
          populateCitiesDropdown(form, state['cities']);
        } else {
          populateCitiesDropdown(form);
        }
      } else {
        populateCitiesDropdown(form);
      }
	});

	function populateStatesDropdown(scope, states) {
      var dropdown = $('.state select[name="state"]', scope);
      dropdown.val('').empty();
      dropdown.append($('<option>', { 'value' : '' }).html('- Select -'));

      if (typeof states != 'undefined') {
        $.each(states, function(abbr, state) {
          dropdown.append($('<option>', { 'value' : abbr }).html(state.name));
        });
        dropdown.prop('disabled', false);
        if (dropdown.data('behavior') == 'search') {
          dropdown.parent().removeClass('hide');
        }
      } else {
        dropdown.prop('disabled', true);
        if (dropdown.data('behavior') == 'search') {
          dropdown.parent().removeClass('hide').addClass('hide');
        }
      }
      dropdown.resetSS();
	}

	function populateCitiesDropdown(scope, cities) {
      var dropdown = $('.city select[name="city"]', scope);
      dropdown.val('').empty();
      dropdown.append($('<option>', { 'value' : '' }).html('- Select -'));

      if (typeof cities != 'undefined') {
        $.each(cities, function(abbr, city) {
          if (city['properties'].length) {
            var first_property_id = city['properties'][0];
            if (typeof booking_vars[first_property_id] != 'undefined') {
              var res = booking_vars[first_property_id];
              dropdown.append($('<option>', { 'value' : dropdown.data('behavior') == 'search' ? abbr : res['dest'] }).html(city.name));
            }
          }
        });
        dropdown.prop('disabled', false);
        if (dropdown.data('behavior') == 'search') {
          dropdown.parent().removeClass('hide');
        }
      } else {
        dropdown.prop('disabled', true);
        if (dropdown.data('behavior') == 'search') {
          dropdown.parent().removeClass('hide').addClass('hide');
        }
      }
      dropdown.resetSS();
	}

	function _count($o) {
      if (typeof $o == 'object') {
        var count = 0;
        $.each($o, function() {
          count++;
        });
        return count;
      }

      try {
        return $o.length;
      } catch(e) {
        return 0;
      }
	}

	}

	// Search form submit
	jQuery('.hotel-finder input[type="submit"]').on('click', function(e) {
		e.preventDefault();
		var cityVal = jQuery('.hotel-finder .city option:selected').val().replace(".","_"),
			stateVal = jQuery('.hotel-finder .state option:selected').val();

		//console.log(cityVal + ' | ' + stateVal);

		if (cityVal !== "") {
			document.location.href = "/search/city/" + cityVal + "/";
		} else {
			document.location.href = "/search/state/" + stateVal + "/";
		}
	});*/

	}


});


// get query string
function getQuery(q) {
	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
};

// PLACEHOLDER FOR INPUT

jQuery.support.placeholder = (function(){
  var i = document.createElement('input');
  return 'placeholder' in i;
})();

// PLACEHOLDER FUNCTION

function inputPlaceholder(input) {

  if(!input.attr('placeholder') || input.attr('placeholder') == '' || $.support.placeholder) return;

  var placeholderText = input.attr('placeholder');

  var placeholder = $('<label for="'+input.attr('id')+'" class="input-placeholder"></label>').text(placeholderText);

  input.after(placeholder);

  input.click(function() {
    $(this).addClass("blur");
  }).blur(function(){
    $(this).removeClass("blur");
  });
  input.on('input keyup mouseup', function(e) {
    if (input.val() == '') placeholder.show();
    else placeholder.hide();
  });

}

function initGallery(id, plainImagesArray, currentImage) {
  $('html').addClass('selection-disabled');

  var photos = plainImagesArray ? plainImagesArray : galleryJSON[id].images;
  var galleryOptions = {
    dataSource: photos,
    show: currentImage ? currentImage :0
  };

  $('body').append(
    $('<div />', {'id': 'hebs-gallery'})
      .append($('<div />', {'class': 'galleria'}))
      .append($('<a />', {'class': 'close-button'}))
  );

  if (id) {
    var categoriesSelector = $('<select />', {'class': 'category-selector'});
    $.each(galleryJSON, function(index, value) { categoriesSelector.append($('<option />', {'value': index, 'text': value.name})) });

    if ($('option', categoriesSelector).length > 1) {
      categoriesSelector.val(id);
      categoriesSelector.appendTo('#hebs-gallery');
    }
  }

  if (photos.length == 1) $('#hebs-gallery').addClass('no-controls');

  $('#hebs-gallery').fadeIn(200, function(){
    Galleria.run('#hebs-gallery .galleria', galleryOptions);
  });

  Galleria.ready(function(){
    var gallery = this;

    $('#hebs-gallery .close-button').click(function(){
      gallery.pause();
      $('#hebs-gallery').fadeOut(200, function(){
        gallery.destroy();
        $(this).remove();
        $('html').removeClass('selection-disabled');
      })
    });

    $('#hebs-gallery .category-selector').change(function(){
      var photos = galleryJSON[$(this).val()].images;
      if (photos.length == 1) $('#hebs-gallery').addClass('no-controls');
      else $('#hebs-gallery').removeClass('no-controls');
      gallery.load(photos);
    });
  });
  $("#hebs-gallery select").sSelect();
}
var mark2 = "/getmedia/06b4dd55-07da-4257-913d-721b0ee375de/blue-dot_2/";
var mark3 = "/getmedia/e10743ce-5e78-462d-ac3b-04bcaa5842d0/blue-dot_3/";
var mark4 = "/getmedia/56b177c0-3189-46a9-838a-868a1a3ea6b3/blue-dot_4/";
var mark5 = "/getmedia/11be9350-4d48-4a6f-85b9-77ace0ee79c7/blue-dot_5/";
var mark6 = "/getmedia/716d647f-ee38-4579-b5a4-451959f11923/blue-dot_6/";

var markersToChange = [{name:"Lugano Imperial Suites", icon: mark4, breakpoint: 9},{name:"Urban Suites Recoleta Boutique Hotel", icon: mark2, breakpoint: 7}, {name:"Sunborn London", icon: mark2, breakpoint: 7},{name:"Hotel Le Littré", icon: mark6, breakpoint: 7}, {name:"Relais Villa L'Olmo", icon: mark2, breakpoint: 6},{name:"Hotel Roger de Lluria", icon: mark3, breakpoint: 10},{name:"Hotel Opera", icon: mark2, breakpoint: 7},{name:"OD Ocean Drive", icon: mark2, breakpoint: 9},{name:"OD Port Portals", icon: mark2, breakpoint: 8},{name:"Hotel Concordia", icon: mark3, breakpoint: 10},{name:"Medusa", icon: mark3, breakpoint: 8},{name:"Seascape Beach Resort on Monterey Bay", icon: mark6, breakpoint: 5},{name:"Luxe City Center Hotel", icon: mark5, breakpoint: 7},{name:"The Bristol Hotel", icon: mark2, breakpoint: 6},{name:"Eurostars Wall Street", icon: mark2, breakpoint: 6}];
var markers = [];
var indexOfMarkers = {};
var diffBetwZoomz = 0;
var prevZoom = 3;

function initGoogleMap(siteSettings, mapCanvasID, locations) {
	var bounds = new google.maps.LatLngBounds();

	var target = typeof mapCanvasID !== 'undefined' ? mapCanvasID : 'map-canvas';
	var latLng = new google.maps.LatLng(siteSettings.lat, siteSettings.lng);

	//if(getQuery('mock') !== "true"){
		var content = '<div class="map-content-"><h4>'+siteSettings.name+'</h4><p>'+siteSettings.adr+'<br>Phone: '+siteSettings.phone+'</p><p><a href="http://maps.google.com/maps?f=d&geocode=&daddr='+siteSettings.lat+','+siteSettings.lng+'&z=15" target="_blank">Get directions</a></p></div>';
	//} else {
		//var content = '<div class="map-content"><a href="#" style="padding-top:15px;width:100%;height:150px;background-repeat:no-repeat;background-size:cover;background-image:url("'+siteSettings.image+'");"><h4>'+siteSettings.name+'</h4></a></div>';
	//}

	var mapOptions = {
		zoom: 16,
		center: latLng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false
	};
	window.map = new google.maps.Map(document.getElementById(target), mapOptions);

    map.addListener('zoom_changed', function() {
      diffBetwZoomz = prevZoom - map.zoom;
      markers.forEach(function(item,index){
      	//console.log(item.breakpoint);
      	console.log(map.zoom);
      	//console.log(item.index);
      	//console.log(markers);
		if(map.zoom == item.breakpoint && diffBetwZoomz == -1) {
		//console.log("diffBetwZoomz: " + diffBetwZoomz);
		console.log(map.zoom);
		item.setMap(null);
		item.icon ='/Lehotels.com-0049-2015Transfer/media/Lehotel/blue-dot.png';
		/*var locationMarker = new google.maps.Marker({
		        position: new google.maps.LatLng(indexOfMarkers.location.lat, indexOfMarkers.location.lng),
		        map: map,
		        icon: '/Lehotels.com-0049-2015Transfer/media/Lehotel/blue-dot.png'
		});*/
		item.setMap(map);
		}
		else if(map.zoom == (item.breakpoint - 1)  && diffBetwZoomz == 1){
		console.log("diffBetwZoomz: " + diffBetwZoomz);
		console.log(map.zoom);
		item.setMap(null);
		item.icon = item.numberedIcon;
		/*var locationMarker = new google.maps.Marker({
		        position: new google.maps.LatLng(indexOfMarkers.location.lat, indexOfMarkers.location.lng),
		        map: map,
		        icon: '/getmedia/56b177c0-3189-46a9-838a-868a1a3ea6b3/blue-dot_4.png'
		});*/
		item.setMap(map);
		}
		prevZoom = map.zoom;
      });
    });
	var infowindow = new google.maps.InfoWindow({
		maxWidth: 173
	});
    
	if (locations) {
		var firstLocation;
		var locationsCount = 0;
		
		$.each(locations, function (index, location) {
			if (!firstLocation) firstLocation = location;
			var image = '/Lehotels.com-0049-2015Transfer/media/Lehotel/blue-dot.png';
			
			
			for(var i = 0; i < markersToChange.length; i++){
		      //console.log("loc1:" + markersToChange[i].name);
			  //console.log("loc2:" + location.name);
              if(location.name == markersToChange[i].name){

	              indexOfMarkers.index = index;
	              indexOfMarkers.location = {lat: location.lat,lng:location.lng};
	              var locationMarker = new google.maps.Marker({
					position: new google.maps.LatLng(location.lat, location.lng),
					map: map,
	                zIndex: 900,
					icon: markersToChange[i].icon,
					breakpoint: markersToChange[i].breakpoint,
					numberedIcon: markersToChange[i].icon
				  });
				  
				  markers.push(locationMarker);
				  break;
	            }
	            else {
		            var locationMarker = new google.maps.Marker({
	                  position: new google.maps.LatLng(location.lat, location.lng),
	                  map: map,
	                  icon: image
	                });
	            }
            }
			//console.log(location.image);
			//console.log(location.link);
			//console.log('<div class="map-content"><a href="'+location.link+'" style=background-image:'+location.image+';><h4>'+location.name+'</h4></a></div>');

			/*if(getQuery('mock') !== "true") {
				var locationContent = '<div class="map-content"><h4>' + location.name + '</h4><p>' + location.street_address + '<br>' + location.phone + '</p><p><a href="http://maps.google.com/maps?f=d&amp;geocode=&amp;daddr=' + location.lat + '%2C%20' + location.lng + '&amp;z=14" target="_blank">Get directions</a></p></div>';
			} else {*/
				var locationContent = '<div class="map-content revamp"><a href="' + location.link + '" style=background-image:' + location.image + ';><h4>' + location.name + '<br><small>' + location.city + location.state + location.country + '</small></h4></a></div>';
			//}

			google.maps.event.addListener(locationMarker, "click", function () {
				infowindow.close();
				infowindow.setContent(locationContent);
				infowindow.open(map, locationMarker);
			});

			bounds.extend(new google.maps.LatLng(location.lat, location.lng));

			locationsCount++;
		});

		if (locationsCount > 1) {
			map.fitBounds(bounds);
		} else {
			map.setCenter(new google.maps.LatLng(firstLocation.lat, firstLocation.lng));
			map.setZoom(16);
		}
	} else {
		var pointer = '/Lehotels.com-0049-2015Transfer/media/Lehotel/pointer.png';
		var marker = new google.maps.Marker({
			position: latLng,
			map: map,
			icon: pointer
		});

		infowindow.setContent(content);
		infowindow.open(map, marker);

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		});
	}

	// *
	// START INFOWINDOW CUSTOMIZE.
	// The google.maps.event.addListener() event expects
	// the creation of the infowindow HTML structure 'domready'
	// and before the opening of the infowindow, defined styles are applied.
	// *
	//if(getQuery('mock') === "true") {

	google.maps.event.addListener(infowindow, 'domready', function() {

		if(jQuery('.map-content').length == 1) {

			// Reference to the DIV that wraps the bottom of infowindow
			var iwOuter = jQuery('.gm-style-iw');

			/* Since this div is in a position prior to .gm-div style-iw.
			* We use jQuery and create a iwBackground variable,
			* and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
			*/
			var iwBackground = iwOuter.prev();

			// Removes background shadow DIV
			iwBackground.children(':nth-child(2)').css({ 'left': 15, 'top': 17, 'box-shadow': 'rgba(0, 0, 0, 1) 0px 1px 4px -1px', 'width': 196, 'height': 100 });
			//iwBackground.children(':nth-child(2)').css({'display' : 'none'});

			// Removes white background DIV
			iwBackground.children(':nth-child(4)').css({'display' : 'none'});

			// Parent
			//iwOuter.parent().css({width: '173px'});
			//iwOuter.parent().css({height: '100px'});

			// Moves the infowindow 115px to the right.
			//iwOuter.parent().parent().css({left: '115px'});

			// Moves the shadow of the arrow 76px to the left margin.
			//iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

			// Moves the arrow 76px to the left margin.
			//iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

			// Changes the desired tail shadow color.
			iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(0, 0, 0, 0.6) 0px 1px 6px', 'z-index' : 1});

			// Reference to the div that groups the close button elements.
			var iwCloseBtn = iwOuter.next();

			// Apply the desired effect to the close button
			iwCloseBtn.css({opacity: 1, right: 12, top: 12, 'border-radius': 13, 'box-shadow': '0 0 5px #000'});
			//iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

			// If the content of infowindow not exceed the set maximum height, then the gradient is removed.
			if(jQuery('.iw-content').height() < 140){
				jQuery('.iw-bottom-gradient').css({display: 'none'});
			}

			// hide info window if image does not exist
			//console.log(siteSettings.image)
			//console.log(siteSettings.name)
			//if(siteSettings.image == "")
			//	var iwOuterParent = iwOuter.parent().css('display','block');

			// The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
			iwCloseBtn.mouseout(function(){
				jQuery(this).css({opacity: 1});
			});

		}
	});

	//}

}

function HeBS_Link_Checkin_Checkout_Inputs(checkin_selector, checkout_selector) {
  Date.format = 'mm/dd/yy';

  $(checkin_selector).bind('dateSelected', function(e, selectedDate, $td, state) {
    var t = new Date(selectedDate);
    var dt = t;
    var edate = new Date.fromString($(checkout_selector).val());
    var one_day=1000*60*60*24;
    var days_diff = Math.ceil((edate.getTime() - dt.getTime())/(one_day));

    if(edate.getTime() <= dt.getTime()) {
      $(checkout_selector).val(t.addDays(1).asString());
      $(checkout_selector).dpSetSelected(t.asString());
      $(checkout_selector).dpSetDisplayedMonth(t.getMonth(), t.getFullYear());
    }
  });

  $(checkout_selector).bind('dateSelected', function(e, selectedDate, $td, state) {
    var t = new Date(selectedDate);
    var dt = new Date.fromString($(checkin_selector).val());
    var edate = t;
    var one_day=1000*60*60*24;
    var days_diff = Math.ceil((edate.getTime() - dt.getTime())/(one_day));

    if(edate.getTime() <= dt.getTime()) {
      $(checkin_selector).val(t.addDays(-1).asString());
      $(checkin_selector).dpSetSelected(t.asString());
      $(checkin_selector).dpSetDisplayedMonth(t.getMonth(), t.getFullYear());
    }
  });

  var today = new Date();
  $(checkin_selector).val(today.asString());
  $(checkout_selector).val(today.addDays(1).asString());

  $(checkout_selector).dpSetStartDate(today.asString());
}

function PhotosSlideshow (container){
  if (!(this instanceof PhotosSlideshow)) return new PhotosSlideshow();

  this.container = container;
  this.navigation = $('<nav />').appendTo(this.container);
  this.slideSelector = 'figure';
  this.totalPhotos = $(this.slideSelector, this.container).length;
  this.currentPhoto = 0;
  this.rotationSpeed = 6000;
  this.transitionSpeed = 1000;
  this.interval = 0;
  this.isAnimating = false;

  this.init = function(){
    var slideshow = this;

    slideshow.navigation.append($('<a />', {'class': 'previous','href': '#'}), $('<a />', {'class': 'next','href': '#'}));

    $('nav a', slideshow.container).hover(function(){
      slideshow.stopAutomaticSlideshow();
    }, function(){
      slideshow.startAutomaticSlideshow();
    }).click(function(){
      if (slideshow.isAnimating) return false;

      var nextPhoto = 0;

      if ($(this).hasClass('previous')) nextPhoto = slideshow.currentPhoto - 1;
      else nextPhoto = slideshow.currentPhoto + 1;

      if (nextPhoto == slideshow.totalPhotos) nextPhoto = 0;
      if (nextPhoto < 0) nextPhoto = slideshow.totalPhotos - 1;

      slideshow.switchSlides(nextPhoto);
      return false;
    });

    slideshow.startAutomaticSlideshow();
  };

  this.startAutomaticSlideshow = function(){
    var slideshow = this;

    this.interval = setInterval(function(){
      slideshow.switchSlides();
    }, this.rotationSpeed);
  };

  this.stopAutomaticSlideshow = function(){
    clearInterval(this.interval);
  };

  this.switchSlides = function(nextPhoto){
    var slideshow = this;

    if (slideshow.currentPhoto == nextPhoto) return false;

    if (typeof nextPhoto === 'undefined') {
      nextPhoto = slideshow.currentPhoto + 1;
      if (nextPhoto == slideshow.totalPhotos) nextPhoto = 0;
    }

    $('a', slideshow.navigation).removeClass('active').eq(nextPhoto).addClass('active');

    slideshow.isAnimating = true;

    $(slideshow.slideSelector, slideshow.container).eq(nextPhoto).css('z-index', 1).show();
    $(slideshow.slideSelector, slideshow.container).eq(slideshow.currentPhoto).css('z-index', 2).fadeOut(slideshow.transitionSpeed, function(){
      slideshow.currentPhoto = nextPhoto;
      slideshow.isAnimating = false;
    });
  };
}
