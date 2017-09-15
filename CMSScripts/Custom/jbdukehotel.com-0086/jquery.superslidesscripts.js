// Superslides
if(jQuery('#banner').hasClass('homeBanner')){
	jQuery('#slides').superslides({
		pagination: false,
        hashchange: false,
		animation: 'fade',
		animation_easing:'linear',
		play:5000
	});
} else {
	jQuery('#slides').superslides({
		nav: '.slides-navigation',
        hashchange: false,
		animation: 'fade',
		animation_easing:'linear',
		play:5000
	});
}