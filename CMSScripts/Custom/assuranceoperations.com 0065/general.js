jQuery(window).load(function () {
    jQuery(".wrapper").css('opacity', '1');
});

jQuery(document).ready(function () {
    jQuery('.enumenu_ul').responsiveMenu({
        'menuIcon_text': '',
        onMenuopen: function () {}
    });
    var slider = jQuery('.bxslider').bxSlider({
        speed: 1000,
        infiniteLoop: true,
		touchEnabled: true,
        mode: 'fade',
        responsive: true,
        auto: true,
        pause: 5000,
        stopAuto: false,
        hideControlOnEnd: false
    });
    jQuery('.bx-prev, .bx-next').click(function (e) {
        slider.stopAuto();
        setTimeout(function () {
            slider.startAuto();
        }, 300);
        return false;
    });
});

var maxHeight = 0;
var maxHeight1 = 0;
jQuery(document).ready(function () {
    jQuery(".categories-area ul li h3").each(function () {
        if (jQuery(this).height() > maxHeight) {
            maxHeight = jQuery(this).height();
        }
    });
    jQuery(".categories-area ul li h3").height(maxHeight);

    jQuery(".categories-area ul li p").each(function () {
        if (jQuery(this).height() > maxHeight1) {
            maxHeight1 = jQuery(this).height();
        }
    });
    jQuery(".categories-area ul li p").height(maxHeight1);

});

jQuery(window).resize(function () {
    maxHeight = 0;
    maxHeight1 = 0;
    jQuery(".categories-area ul li h3").removeAttr("style");
    jQuery(".categories-area ul li h3").each(function () {
        if (jQuery(this).height() > maxHeight) {
            maxHeight = jQuery(this).height();
        }
    });
    jQuery(".categories-area ul li h3").height(maxHeight);

    jQuery(".categories-area ul li p").removeAttr("style");
    jQuery(".categories-area ul li p").each(function () {
        if (jQuery(this).height() > maxHeight1) {
            maxHeight1 = jQuery(this).height();
        }
    });
    jQuery(".categories-area ul li p").height(maxHeight1);
});

jQuery(document).ready(function () {
    if (jQuery('.popup-gallery').length > 0) {
        jQuery('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            //    titleSrc: function (item) {
            //        return item.el.attr('title');
            //    }
            },
            //callbacks: {
            //    change: function () {
                    /*console.log(this.content);
                    console.log(jQuery(this.content).addClass("zoomIn"))*/
            //    },
            //    beforeClose: function () {
            //        //console.log(jQuery(this.content).removeClass("zoomIn").addClass("zoomOut"))
            //    },
            //},
            zoom: {
                enabled: true,
                duration: 300
            }
        });
    };
});