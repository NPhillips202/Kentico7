jQuery(function() {
    jQuery('.availabityFormDiv button').click(function(e) {
      e.preventDefault();
      
      var hcfull, hc = jQuery("#hotelCode").val();
      if (hc=="") {  // if no properties Selected
          jQuery("#hotelCodeContainer .sbHolder").addClass("redIt");setTimeout(function() {	jQuery("#hotelCodeContainer .sbHolder").removeClass("redIt");},1000);
      } else {
          var form = jQuery('.availabityFormDiv');
          
          var checkIn = form.find('#startDate').val();
          var checkOut = form.find('#endDate').val();
          var rooms = form.find('#rooms').val();
          var guests = form.find('#guests').val();
          
          var requestTypeInput = jQuery('#requestType');
          var promoCodeInput = jQuery('#promo');
          if (requestTypeInput.val() != '' && promoCodeInput.val() != '' && promoCodeInput.val() != 'Promo Code') {
              var promo = "&corporateCode=" + promoCodeInput.val();
          } else {
              var promo = "";
          };
          
          var bookingLink = "https://www.marriott.com/reservation/availability.mi?propertyCode=PBIDR&PTNR=ocean_pbidr&fromDate=" + checkIn + "&toDate=" + checkOut + "&numberOfRooms=" + rooms + "&numberOfGuests=" + guests + promo;
          window.open(bookingLink);
      };
  });
  
	// Special Rates
	jQuery('.update-code').click(function(e) {
		e.preventDefault();
		jQuery('.special-rates-overlay').fadeIn(300);
	});
	
	function updatePromo() {
		if (jQuery('#requestType').val() != '' && jQuery('#promo').val() != '' && jQuery('#promo').val() != 'Promo Code') {
			jQuery('.no-rate').hide();
			jQuery('.rate').show();
			jQuery('.special-rates .rate .code').text(jQuery('#promo').val());
		} else {
			jQuery('.no-rate').show();
			jQuery('.rate').hide();
		};
	};
	
	jQuery('.submit-promo').click(function() {
		if (jQuery('.special-rates-overlay').is(':visible')) {
			jQuery('#requestType').selectbox('close');
			updatePromo();
			jQuery('.special-rates-overlay').fadeOut(300);
		};
	});
	
	// Dropdowns
	jQuery("#rooms").selectbox({
		classHolder:'sbHolder2',
		classSelector:'sbSelector2',
		effect:"slide"	
	});
	
	jQuery("#guests").selectbox({
		classHolder:'sbHolder2',
		classSelector:'sbSelector2',
		effect:"slide"	
	});
	
	jQuery("#requestType").selectbox({
		classHolder:'sbHolderPromo',
		classSelector:'sbSelectorPromo',
		effect:"slide"	
	});
});

setInititialDates();