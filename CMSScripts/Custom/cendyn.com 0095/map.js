function initialize() {
	/*var locations = [
	['North American Headquarters <br /> 980 N Federal Hwy, 2nd Floor Boca Raton, IN 46208, USA', 34.105653, -85.565794],
	['Atlanta <br /> 730 Peachtree St NE, Suite 560 Atlanta, GA 30308 USA', 33.748995, -84.387982],
	['Boston <br /> 5 Central Square, Suite 303 Stoneham, MA 02180 USA', 42.360082, -71.058880],
	['San Diego <br /> 333 H Street, Suite 5000 Chula Vista, CA 91910 USA', 32.715738, -117.161084],
	['London <br /> 1 Heddon Street, Mayfair London W1B FBD, UK', 51.507351, -0.127758],
	['Toronto <br /> 25 Sheppard Ave West, Suite 300 Toronto, ON, Canada M2N 6S6', 43.653226, -79.383184],
	['Singapore <br /> 19 Cecil Street, The Quadrant #05-13, Singapore 049704', 1.352083, 103.819836]
	];*/

	//var defaultMarker = "images/pointer-blue.png";
	//var HeadQuarterMarker = "images/pointer.png";

	var markers = [];
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 2,//3
		disableDefaultUI: true,
		zoomControl: false,
		scrollwheel: false,
		center: new google.maps.LatLng(31.791702, -7.092620),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infowindow = new google.maps.InfoWindow();

	var marker, i;

	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			icon: i == 0 ? HeadQuarterMarker : defaultMarker,
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
		markers.push(marker);
	}
}
//google.maps.event.addDomListener(window, 'load', initialize);
//google.maps.event.addDomListener(window, 'resize', initialize);

$(document).ready(function () {
	$(".Locations_txt span").click(function () {
        if($('.openMap').is(":visible")){
            $('.openMap').slideUp(function(){
    
            });
        } else {
            $('.openMap').slideDown(function(){
                //initialize();
                $(window).trigger("resize");
            });
        }

	});
});
