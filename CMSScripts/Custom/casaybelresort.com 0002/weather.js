(function(jQuery){

	jQuery.fn.weatherfeed = function(locations, options, fn) {	
	
		// Set plugin defaults
		var defaults = {
			unit: 'c',
			image: true,
			country: false,
			highlow: true,
			wind: true,
			humidity: false,
			visibility: false,
			sunrise: false,
			sunset: false,
			forecast: false,
			link: true,
			showerror: true,
			linktarget: '_self',
			woeid: false
		};  
		var options = jQuery.extend(defaults, options); 
		var row = 'odd';

		// Functions
		return this.each(function(i, e) {
			var $e = jQuery(e);
			
			// Add feed class to user div
			if (!$e.hasClass('weatherFeed')) $e.addClass('weatherFeed');

			// Check and append locations
			if (!jQuery.isArray(locations)) return false;

			var count = locations.length;
			if (count > 10) count = 10;

			var locationid = '';

			for (var i=0; i<count; i++) {
				if (locationid != '') locationid += ',';
				locationid += "'"+ locations[i] + "'";
			}

			// Cache results for an hour to prevent overuse
			now = new Date();

			// Select location ID type
			var queryType = options.woeid ? 'woeid' : 'location';
					
			// Create Yahoo Weather feed API address
			var query = "select * from weather.forecast where "+ queryType +" in ("+ locationid +") and u='"+ options.unit +"'";
			var api = '//query.yahooapis.com/v1/public/yql?q='+ encodeURIComponent(query) +'&rnd='+ now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() +'&format=json&callback=?';

			// Send request
			jQuery.ajax({
				type: 'GET',
				url: api,
				dataType: 'json',
				success: function(data) {

					if (data.query) {
						_process(e, data.query.results.channel, options);

						// Optional user callback function
						if (jQuery.isFunction(fn)) fn.call(this,$e);

					} else {
						if (options.showerror) $e.html('<p>Weather information unavailable</p>');
					}
				},
				error: function(data) {
					if (options.showerror) $e.html('<p>Weather request failed</p>');
				}
			});

			// Function to each feed item
			var _process = function(e, feed, options) {
				var $e = jQuery(e);

				// Check for invalid location
				if (feed.description != 'Yahoo! Weather Error') {

					// Format feed items
					var wd = feed.wind.direction;
					if (wd>=348.75&&wd<=360){wd="N"};if(wd>=0&&wd<11.25){wd="N"};if(wd>=11.25&&wd<33.75){wd="NNE"};if(wd>=33.75&&wd<56.25){wd="NE"};if(wd>=56.25&&wd<78.75){wd="ENE"};if(wd>=78.75&&wd<101.25){wd="E"};if(wd>=101.25&&wd<123.75){wd="ESE"};if(wd>=123.75&&wd<146.25){wd="SE"};if(wd>=146.25&&wd<168.75){wd="SSE"};if(wd>=168.75&&wd<191.25){wd="S"};if(wd>=191.25 && wd<213.75){wd="SSW"};if(wd>=213.75&&wd<236.25){wd="SW"};if(wd>=236.25&&wd<258.75){wd="WSW"};if(wd>=258.75 && wd<281.25){wd="W"};if(wd>=281.25&&wd<303.75){wd="WNW"};if(wd>=303.75&&wd<326.25){wd="NW"};if(wd>=326.25&&wd<348.75){wd="NNW"};
					var wf = feed.item.forecast[0];
		
					// Determine day or night image
					wpd = feed.item.pubDate;
					n = wpd.indexOf(":");
					tpb = _getTimeAsDate(wpd.substr(n-2,8));
					tsr = _getTimeAsDate(feed.astronomy.sunrise);
					tss = _getTimeAsDate(feed.astronomy.sunset);
					
					// get current Temp in Celcuis and Farenheit
					currentTempCelsuis = feed.item.condition.temp;
					currentTempFahrenheit = _convertCelsuisToFahrenheit(feed.item.condition.temp);

					// Get night or day
					if (tpb>tsr && tpb<tss) { daynight = 'day'; } else { daynight = 'night'; }

					// Add item container
					var html = '<div class="weatherItem '+ row +' '+ daynight +'"';
					//if (options.image) html += ' style="background-image: url(http://l.yimg.com/a/i/us/nws/weather/gr/'+ feed.item.condition.code + daynight.substring(0,1) +'.png); background-repeat: no-repeat;"';
					html += '>';
		
					// Add item data					
					//html += '<div class="weatherDesc">'+ feed.item.condition.text +'</div>';
					
					// Weather icons
					var path = "/Casaybelresort.com-0002-2014Redesign/media/casaybelresort.com-0002/Site%20Files/weather/";
					var theme = jQuery('body').attr('theme');
					
					if (theme == "dining") {
						path = path + "dining/";
					} else if (theme == "wedding") {
						path = path + "wedding/";
					} else {
						path = path + "default/";
					};
					
					var weatherType = feed.item.forecast[i].text;
						weatherType = weatherType.toLowerCase();
					
					if (weatherType == "fair") {
						var ImageName = "fair.png"
					} else if (weatherType == "tornado" || weatherType == "windy" || weatherType == "blustery") {
						var ImageName = "windy.png"
					} else if (weatherType == "tropical storm" || weatherType == "severe thunderstorms" || weatherType == "thundershowers" || weatherType == "hurricane" || weatherType == "mixed rain and snow") {
						var ImageName = "storm.png"			
					} else if (weatherType == "thunderstorm" || weatherType == "isolated thunderstorms" || weatherType == "scattered thunderstorms") {
						var ImageName = "thunderstorms.png"		
					} else if (weatherType == "mixed rain and snow" || weatherType == "mixed rain and sleet" || weatherType == "mixed snow and sleet") {
						var ImageName = "sleet.png"				
					} else if (weatherType == "freezing drizzle" || weatherType == "drizzle") {
						var ImageName = "light_rain.png"	
					} else if (weatherType == "showers" || weatherType == "scattered showers") {
						var ImageName = "showers.png"			
					} else if (weatherType == "snow flurries" || weatherType == "light snow showers" || weatherType == "blowing snow" || weatherType == "heavy snow" || weatherType == "scattered snow showers" || weatherType == "heavy snow" || weatherType == "snow showers" || weatherType == "cold") {
						var ImageName = "snow.png"
					} else if (weatherType == "hail") {
						var ImageName = "ice.png"
					} else if (weatherType == "sleet" || weatherType == "mixed rain and sleet" || weatherType == "mixed snow and sleet") {
						var ImageName = "sleet.png"				
					} else if (weatherType == "dust" || weatherType == "foggy" || weatherType == "haze" || weatherType == "smoky" || weatherType == "cloudy	") {
						var ImageName = "cloudy.png"			
					} else if (weatherType == "mostly cloudy (night)" || weatherType == "mostly cloudy (day)" || weatherType == "partly cloudy (Night)" || weatherType == "partly cloudy (day)" || weatherType == "partly cloudy") {
						var ImageName = "cloudy.png"		
					} else if (weatherType == "sunny" || weatherType == "mostly sunny" || weatherType == "hot") {
						var ImageName = "sunny.png"			
					} else if (weatherType == "fair (Night)" || weatherType == "clear (night)" || weatherType == "fair (day)" || weatherType == "mixed rain and hail") {
						var ImageName = "fair.png"					
					} else {
						var ImageName = "fair.png"
					}
					
					html += '<h4 class="weather"><img src="' + path + ImageName + '" /> ' + currentTempFahrenheit +'&deg; F / '+ currentTempCelsuis +'&deg; C</h4>';

				} else {
					var html = '<div class="weatherItem '+ row +'">';
					html += '<div class="weatherError">City not found</div>';
				}

				html += '</div>';

				// Alternate row classes
				if (row == 'odd') { row = 'even'; } else { row = 'odd';	}
		
				$e.append(html);
			};

			// Get time string as date
			var _getTimeAsDate = function(t) {
		
				d = new Date();
				r = new Date(d.toDateString() +' '+ t);

				return r;
			};

			// Get time string as date
			var _convertCelsuisToFahrenheit = function(temp) {
				return Math.round(((((212 - 32) / 100) * temp + 32) * 100) / 100);
			};
			

		});
	};

})(jQuery);

jQuery(document).ready(function () {
	jQuery('#weatherFeed').weatherfeed(['2488768'],{
		woeid: true
	});
});