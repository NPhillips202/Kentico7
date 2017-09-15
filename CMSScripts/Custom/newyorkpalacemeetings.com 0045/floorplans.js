function filterRooms(room, layout, level) {
	//console.log(room + ' | ' + layout);
	
	if (room !== null) {
		// Filter to room
		var filteredElements = jQuery('.panel-body[floor="' + level + '"]').find('.venueListing[room="' + room + '"]');
		showRooms(filteredElements, level);
	} else if (layout !== null) {
		// Filter to layout
		var filteredElements = jQuery('.panel-body[floor="' + level + '"]').find('.venueListing[layout*="' + layout + '"]');
		showRooms(filteredElements, level);
	};
};

function showRooms(filteredElements, level) {
	var slideDelay = 250,
		scrollDelay = 500;
	
	jQuery('.panel-body[floor="' + level + '"]').find('.venueWrapper').slideUp(slideDelay, function() {
		jQuery('.panel-body[floor="' + level + '"]').find('.venueListing').hide();
		filteredElements.show();
		jQuery('.panel-body[floor="' + level + '"]').find('.venueWrapper').slideDown(slideDelay, function() {
			var scrollToPosition = (jQuery('.panel-body[floor="' + level + '"]').find('.venueWrapper').offset().top - jQuery('header').outerHeight()) - 15;
			jQuery('html, body').animate({
				scrollTop: scrollToPosition
			}, scrollDelay);
		});
	});
};

jQuery(function() {
	// Filter room when floorplans is clicked on
	jQuery('.floor-plan-img area').click(function(e) {
		e.preventDefault();
		var room = jQuery(this).attr('href');
			room = room.replace('#',''),
			level = jQuery(this).closest('.panel-body').attr('floor');
		
		// Clear layout selections and show filtered rooms
		jQuery('.panel-body[floor="' + level + '"]').find('.floor-plan-navigation a').removeClass('active');
		filterRooms(room, null, level);
	});
	
	// Filter room layouts when layout buttons are clicked on
	jQuery('.floor-plan-navigation a').click(function(e) {
		e.preventDefault();
		var layout = jQuery(this).attr('href');
			layout = layout.replace('#',''),
			level = jQuery(this).closest('.panel-body').attr('floor');
		
		// Clear layout selections, select new layout, and show filtered rooms
		jQuery('.panel-body[floor="' + level + '"]').find('.floor-plan-navigation a').removeClass('active');
		jQuery(this).addClass('active');
		filterRooms(null, layout, level);
	});
	
	// Scroll to accordion section
	jQuery('.accordion-toggle').click(function() {
		var scrollDelay = 400,
			thisEle = jQuery(this);
		
		setTimeout(function(){
			jQuery('html, body').animate({
				scrollTop: (thisEle.offset().top - jQuery('header').outerHeight()) - 15
			}, scrollDelay);
		}, 350);
	});
});