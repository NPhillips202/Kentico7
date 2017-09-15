/* note: Existing website uses: jQuery v1.8.3 jquery.com | jquery.org/license */

/*
@name			LE Hotels - booking-mask.js
@version		2.0.0
@author-uri		http://cendyn.com
*/
jQuery(function() {
	// Define Variables
	var _thisForm = jQuery('#wrapper .form, .form-tablet').addClass('booking-form');
	var thisForm = jQuery('.booking-form');
	//var thisForm = jQuery('.booking-mask-form');
	//var checkIn = thisForm.find('input[name="arrivalDate"]');
	//var checkOut = thisForm.find('input[name="departDate"]');
	var bookingSubmitBtn = thisForm.find('fieldset .buttons .button, fieldset.submit .submit-button, span.submit .submit-button, fieldset.submit .ipad-booking-button');

	// Promo Code FLyout
	jQuery('.promo-trigger').click(function(e) {
		e.preventDefault();
		var promo_wrapper = jQuery('.promo-wrapper');
		if(promo_wrapper.is(":visible") == true)
			promo_wrapper.fadeOut('fast');
		else
			promo_wrapper.fadeIn('fast');
	});

	jQuery('.promo-close').click(function(e) {
		e.preventDefault();
		jQuery('.promo-wrapper').fadeOut('fast');
	});

	// Booking Mask Programming
	//bookingSubmitBtn.live('click', function () {
	//bookingSubmitBtn.click(function(e) {
	bookingSubmitBtn.bind('click', function () {
		//e.preventDefault();
		var submitBtn = jQuery(this);
		var submitBtnHref = jQuery('#booking-mask-wrapper > a').attr('href');

		//var isHotelSidebar = jQuery(this, '#sidebar-booking') ? true : false;
		var isHotelSidebar = jQuery(this).closest('article').is('#sidebar-booking') ? true : false;
		var isHotelBookingReVamp = jQuery(this).closest('section').is('#booking-engine_widget') ? true : false;

		var src = 'LEH';
		var chain = 6158;
		var start = 'availresults';
		var locale = 'en-US';
		var template = ''; //'hebs-omniture';
		//var level = isHotelSidebar ? 3 : 2;
		var level = 2;

		var country = thisForm.find('input[name="country"]').val();
		var state = thisForm.find('input[name="state"]').val();

		//var city = thisForm.find('select[name="city"]').find('option:selected').val();
		if(isHotelBookingReVamp == false){
			var dest = isHotelSidebar ? thisForm.find('input[name="dest"]').val() : thisForm.find('select[name="city"]').find('option.selected:selected').val();
		} else {
			var dest = thisForm.find('select[name="property"]').find('option.selected:selected').val();
		}

		// set by hidden input field or chosen option
		var hotel = isHotelSidebar ? thisForm.find('input[name="hotel"]').val() : thisForm.find('select[name="property"]').find('option:selected').length ? thisForm.find('select[name="property"]').find('option:selected').attr('id') : '';

		//var isTopBarBooking = jQuery(this).closest('fieldset').is('#booking-mask-fields') ? true : false;
		var isTopBarBooking = jQuery(this).closest('div#booking-mask-wrapper').is('.bookingMaskWrapper') ? true : false;

		console.log(isTopBarBooking);
		//console.log(jQuery('#booking-checkin').get(0).getAttribute('data-value'));
		//console.log(thisForm.find('input[name="checkin"]').getAttribute('data-value'));
		//var arrive = jQuery('#booking-checkin').get(0).getAttribute('data-value').replace('/20','%2F');

		//console.log(jQuery('#booking-checkin').get(0).getAttribute('data-value'));

		/*if(jQuery('#booking-checkin').get(0) !== undefined)
			var arrive = jQuery('#booking-checkin').get(0).getAttribute('data-value').replace('/20','%2F');
		else
			var arrive = thisForm.find('input[name="checkin"]').get(0).getAttribute('data-value').replace('/20','%2F');*/

		var arrive = isTopBarBooking ? jQuery('#booking-mask-wrapper').find('#top-booking-checkin').get(0).getAttribute('data-value').replace('/20','%2F') : jQuery('#booking-checkin').get(0).getAttribute('data-value').replace('/20','%2F');
		//var arrive = thisForm.closest("#booking-mask-fields").length ? jQuery('#booking-checkin').get(0).getAttribute('data-value').replace('/20','%2F') : thisForm.find('input[name="checkin"]').get(0).getAttribute('data-value').replace('/20','%2F');

		//var arrive = thisForm.find('input[name="checkin"]').attr('value').replace('/20','%2F');
		//var arrive = thisForm.find('input[name="checkin"]').val();

		//console.log(jQuery('#booking-checkout').get(0).getAttribute('data-value'));
		//var depart = jQuery('#booking-checkout').get(0).getAttribute('data-value').replace('/20','%2F');

		/*if(jQuery('#booking-checkout').get(0) !== undefined)
			var depart = jQuery('#booking-checkout').get(0).getAttribute('data-value').replace('/20','%2F')
		else
			var depart = thisForm.find('input[name="checkout"]').get(0).getAttribute('data-value').replace('/20','%2F');*/

		var depart = isTopBarBooking ? jQuery('#booking-mask-wrapper').find('#top-booking-checkin').get(0).getAttribute('data-value').replace('/20','%2F') : jQuery('#booking-checkout').get(0).getAttribute('data-value').replace('/20','%2F');
		//var depart = thisForm.closest("#booking-mask-fields").length ? jQuery('#booking-checkout').get(0).getAttribute('data-value').replace('/20','%2F') : thisForm.find('input[name="checkout"]').get(0).getAttribute('data-value').replace('/20','%2F');

		//var depart = thisForm.find('input[name="checkout"]').attr('value').replace('/20','%2F');
		//var depart = thisForm.find('input[name="checkout"]').val();

		//var nights = thisForm.find('select[name="nights"]').val();

		var rooms = thisForm.find('select[name="rooms"]').val();
		var adult = thisForm.find('select[name="adults"]').val();
		var children = thisForm.find('select[name="children"]').val();

		// promo fields
		var group = (thisForm.find('input[name="group"]').val() === '' || thisForm.find('input[name="group"]').val() === undefined) ? '' : thisForm.find('input[name="group"]').val();
		var promo = (thisForm.find('input[name="promo"]').val() === '' || thisForm.find('input[name="promo"]').val() === undefined) ? '' : thisForm.find('input[name="promo"]').val();
		var iata = (thisForm.find('input[name="iata"]').val() === '' || thisForm.find('input[name="iata"]').val() === undefined) ? '' : thisForm.find('input[name="iata"]').val();

		// Main Booking Mask
		//console.log(thisForm.html());
		//console.log(arrive);
		//console.log(depart);
		//console.log(dest);
		//console.log(promo);
		//console.log(isHotelBookingReVamp);

		if ( (dest === '' || dest === undefined) && (isHotelSidebar == false && isHotelBookingReVamp == false) ) {
			alert('Please select City from the list!');
			return false;
		}

		// Tablet Booking Mask
		if (jQuery(this).hasClass('disabled')) {
			return false;
		} else {
			/*var dateIn = Date.fromString(arrive),
				dateOut = Date.fromString(depart);
			log('Booking form submitted with Checkin date: ' + dateIn.asString('mm/dd/yyyy') + ', and Checkout date: ' + dateOut);
			return true;*/
		}

		// Analytics
		/*
		s = s_gi(s_account);
		s.linkTrackVars = 'events,eVar12';
		s.linkTrackEvents = 'event6,scOpen';
		s.linkTrackEvents = 'event6,scOpen';
		s.events = 'event6,scOpen';
		s.eVar12 = siteSettings.name + ' City Search';
		(s.tl(this, 'o', 'Booking Initiated'));
		*/

		// check for mobile
		/*win.resize(function(){
			// add .mobile class to #utility-nav
			if(getViewport() < 740) {
				destinations_navs.addClass('mobile');
			} else {
				destinations_navs.removeClass('mobile');
			}
		}).resize();*/

		//var bookingUrl = 'http://gc.synxis.com/rez.aspx?src=' + src + '&chain=' + chain + '&level=' + level + '&start=' + start + '&locale=' + locale + '&template=' + template + (hotel != '' ? '&hotel=' + hotel : '') + '&dest=' + dest + '&arrive=' + arrive.replace('/', '%2F') + '&depart=' + depart.replace('/', '%2F') + '&rooms=' + rooms + '&adult=' + adult + '&child=' + children + (promo != '' ? '&promo=' + promo : '') + (iata != '' ? '&iata=' + iata : '');
		var bookingUrl = 'http://gc.synxis.com/?src=' + src + '&chain=' + chain + '&level=' + level + '&start=' + start + '&locale=' + locale + '&template=' + template + '&hotel=' + hotel + '&dest=' + dest + '&arrive=' + arrive.replace('/', '%2F') + '&depart=' + depart.replace('/', '%2F') + '&rooms=' + rooms + '&adult=' + adult + '&child=' + children + (group != '' ? '&group=' + group : '') + (promo != '' ? '&promo=' + promo : '') + (iata != '' ? '&iata=' + iata : '');
		submitBtn.attr('href', bookingUrl);
		//window.open(bookingUrl);

		// DEBUG
		/*console.log('0. ' + jQuery('.selected').length);
		console.log('1. ' + thisForm.find('select[name="city"]').next('.newListSelected').find('.selectedTxt').text());
		console.log('2. ' + thisForm.find('select[name="city"]').find('option:selected').length);
		console.log('3. ' + thisForm.find('select[name="city"]').find('option.selected:selected').val());
		console.log('4. ' + dest);
		console.log('5. ' + isHotelSidebar);

		console.log('6. ' + thisForm.find('select[name="property"]').find('option:selected').val());
		console.log('7. ' + thisForm.find('select[name="property"]').find('option:selected').attr('id'));*/

		//console.log(bookingUrl);
		//return false;
	});
});
