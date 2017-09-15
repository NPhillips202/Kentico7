$(document).ready(function () {

	var isiPad = navigator.userAgent.match(/iPad/i) != null;

	if (typeof poi_json !== "undefined" && $("#poi").length) {

		var map = new google.maps.Map(document.getElementById("poi_map"), {
			mapTypeId:google.maps.MapTypeId.ROADMAP,
			scrollwheel:false
		});

		var infowindow = new google.maps.InfoWindow({
			content:""
		});

		$("#poi-list").append('<thead><tr><th class="name">Place Name</th><th class="address">Address</th><th class="phone">Phone</th><th class="distance">Distance</th><th class="th-showonmap">Show on map</th></tr></thead>');

		function addMarker(point, marker_nr) {
			var marker = new google.maps.Marker({
				position:new google.maps.LatLng(point.lat, point.lng),
				map:map,
				icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
			});
			var infoContent = '<div class="map-content"><h4>' + point.name + '</h4><p>' + point.address + '<br>' + point.phone + '</p><p><a href="http://maps.google.com/maps?f=d&amp;geocode=&amp;daddr=' + point.lat + '%2C%20' + point.lng + '&amp;z=14" target="_blank">Get directions</a></p></div>';

			google.maps.event.addListener(marker, "click", function () {
				infowindow.setContent(infoContent);
				infowindow.open(map, marker);
			});
			$("#point-" + marker_nr + " .show-on-map").click(function (e) {
				if (isiPad) $('#copy').animate({scrollTop:$("#poi_map").position().top}, 100);
				else $('html,body').animate({scrollTop:$("#poi_map").offset().top}, 100);
				infowindow.setContent(infoContent);
				infowindow.open(map, marker);
			});

			$("#point-more-" + marker_nr + " .c-show-on-map").click(function (e) {
				e.preventDefault();
				if (isiPad) $('#copy').animate({scrollTop:$("#poi_map").position().top}, 100);
				else $('html,body').animate({scrollTop:$("#poi_map").offset().top}, 100);
				infowindow.setContent(infoContent);
				infowindow.open(map, marker);
			});

			$("#point-" + marker_nr + " .poi-expand").not(".disabled").click(function (e) {

				var desc = $("#point-more-" + marker_nr + " div");

				if ($(this).hasClass("expanded")) {
					$(this).removeClass("expanded");
					desc.slideUp(200);
				} else {
					$(this).addClass("expanded");
					desc.slideDown(200);
				}

			});

			$("#point-" + marker_nr + " .show-on-map").hover(
				function () {
					marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
				}, function () {
					marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
				}
			);
		}

		$.each(poi_json.points, function (i, point) {

			var thumbnail = point.image_link ? "<img src='" + point.image_link + "'>" : "";
			var moreExtraClass = "";
			if (thumbnail == "" && point.descr == "" && point.url_name == "") moreExtraClass = " disabled";
			var pointContent = "<tr id='point-" + i + "'><td class='name'><span class='poi-expand" + moreExtraClass + "'>" + point.name + "</span></td><td class='address'>" + point.address + "</td><td class='phone'>" + point.phone + "</td><td class='distance'>" + point.distance + "</td><td class='td-showonmap'><span class='show-on-map'>Show on map</span></td></tr><tr id='point-more-" + i + "' class='poi-more'><td colspan='5'><div>" + thumbnail + "<span class='poi-descr'>" + point.descr + "<br><a href='" + point.link + "' target='_blank'>" + point.url_name + "</a><br><a href='#' class='c-show-on-map'>show on map</a></span></div></td></tr>";
			$("#poi-list").append(pointContent);
			addMarker(point, i);
		});

		/* Hotel marker, address from site settings */

		var marker = new google.maps.Marker({
			position:new google.maps.LatLng(poi_json.hotel_info.lat, poi_json.hotel_info.lng),
			map:map,
			icon:templateURL+"assets/desktop/images/pointer.png"
		});
		var infoContent = '<div class="map-content"><h4>' + poi_json.hotel_info.title + '</h4><p>' + poi_json.hotel_info.address + '</p><p><a href="http://maps.google.com/maps?f=d&amp;geocode=&amp;daddr=' + poi_json.hotel_info.lat + '%2C%20' + poi_json.hotel_info.lng + '&amp;z=14" target="_blank">Get directions</a></p></div>';

		google.maps.event.addListener(marker, "click", function () {
			infowindow.setContent(infoContent);
			infowindow.open(map, marker);
		});

		/* ---- */

		var bounds = new google.maps.LatLngBounds();
		var extendPointHotel = new google.maps.LatLng(poi_json.hotel_info.lat, poi_json.hotel_info.lng);
		bounds.extend(extendPointHotel);

		$.each(poi_json.points, function (i, point) {
			bounds.extend(new google.maps.LatLng(point.lat, point.lng));
		});

		if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
			var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.006, bounds.getNorthEast().lng() + 0.006);
			var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.006, bounds.getNorthEast().lng() - 0.006);
			bounds.extend(extendPoint1);
			bounds.extend(extendPoint2);
		}

		map.fitBounds(bounds);

		$("#show-all").click(function (e) {
			infowindow.close();
			map.fitBounds(bounds);
			return false;
		});
	}
});