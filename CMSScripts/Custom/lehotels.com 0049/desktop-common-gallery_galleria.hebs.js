/*
 * Galleria HeBS Theme
 * http://www.hebsdigital.com/
 *
 * Copyright (c) 2013, HeBS digital
 */
//console.log(location.host);
//console.log(location.hostname);

(function($) {

Galleria.addTheme({
    name: 'hebs',
    author: 'HeBS digital',
    css: '/CMSPages/GetResource.ashx?stylesheetname=Lehotels.com0049-Desktop-Common-Gallery_Galleria-Hebs',
    defaults: {
		autoplay: false,
		debug: false,
		fullscreenDoubleTap: false,
		imageCrop: false,
		imagePan: false,
		initialTransition: 'fade',
		layerFollow: false,
		maxScaleRatio: 1,
		preload: 3,
		queue: false,
		showCounter: false,
		thumbCrop: true,
		thumbQuality: 'auto',
		transition: 'fade',
		transitionSpeed: 300,
		trueFullscreen: false
	},
    init: function(options) {

		var gallery = this;

		gallery.bind('loadstart', function() {
			gallery.$('loader').fadeIn(200);
        });

		gallery.bind('loadfinish', function() {
			gallery.$('loader').fadeOut(200);
        });

    }
});

}(jQuery));
