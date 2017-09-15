var $ = jQuery.noConflict();

jQuery(document).ready(function () {

    jQuery(".datepicker").datepicker();

    jQuery(".bgImage").each(function () {
        $(this).parent().css('background-image', 'url(' + $(this).attr("src") + ')');
    });


    jQuery('.enumenu_ul').responsiveMenu({
        'menuIcon_text': 'Menu',
        menuslide_overlap: true,
        menuslide_direction: 'left',
        onMenuopen: function () { }
    });

    jQuery(".selectbox").selectbox({
        hide_duplicate_option: true,
        onOpen: function () {
            //$(".ui-datepicker").hide();

            $("#datepicker").datepicker("hide");
            $("#datepicker2").datepicker("hide");

        }
    });
    var homeSlider = jQuery('.homeslider');
    if (homeSlider.length) {
        var itemLength_ = homeSlider.find(".banner1").length,
            items_ = itemLength_ > 1 ? true : false,
            //autoplay_ = itemLength_ > 1 ? 3000 : false;
            autoplay_ = itemLength_ > 1 ? 9000 : false;

        homeSlider.find(".banner1").each(function (index) {
            jQuery(this).attr("data-slide", index + 1);

            var li_ = jQuery("<li>", {
                "data-slide": index + 1
            });
            var a_ = jQuery("<a>", {
                "href": "javascript:void(0)",
                title: "Slider"
            });
            li_.append(a_);
            jQuery(".banner-text ul").append(li_);
        });

        /*homeSlider.owlCarousel({
            navigation: items_, // Show next and prev buttons
            slideSpeed: 300,
            loop: items_,
            paginationSpeed: 400,
            items: 1,
            itemsDesktop: false,
            itemsDesktopSmall: false,
            itemsTablet: false,
            itemsMobile: false,
            dots: true,
            autoplay: true,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            touchDrag: false,
            mouseDrag: false,
            onInitialized: function () {
                $(".banner-text ul li").click(function () {
                    $(".banner-text ul li").removeClass("active");
                    $(this).addClass("active");
                    $('.homeslider').trigger('to.owl.carousel', $(this).index());
                });

                $(".banner-text ul li").removeClass("active");
                $(".banner-text ul li[data-slide='" + $('.homeslider .owl-item.active .banner1').attr("data-slide") + "']").addClass("active");


                $(".banner-text .slider-text > span").text($('.homeslider .owl-item.active').find(".banner1").attr("data-title"));

                if (items_) {
                    $(".homeslider .banner1").swipe({
                        //Generic swipe handler for all directions
                        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                            console.log(direction)
                            if (direction == "left") {
                                homeSlider.trigger('next.owl.carousel');
                            } else if (direction == "right") {
                                homeSlider.trigger('prev.owl.carousel');
                            }
                        },
                        allowPageScroll: "auto",
                        //Default is 75px, set to 0 for demo so any distance triggers swipe
                        threshold: 0
                    });
                } else {
                    $(".banner-text ul").hide();
                }
            },
            onTranslated: function () {
                $(".banner-text .slider-text > span").text($('.homeslider .owl-item.active').find(".banner1").attr("data-title"));
                $(".banner-text ul li").removeClass("active");
                $(".banner-text ul li[data-slide='" + $('.homeslider .owl-item.active .banner1').attr("data-slide") + "']").addClass("active");
            }
        });*/
        homeSlider.owlCarousel({
            //navigation: items_, // Show next and prev buttons
            navigation: false, // Show next and prev buttons
            slideSpeed: 300,
            //loop: items_,
            paginationSpeed: 400,

            items: 1,
            itemsDesktop: false,
            itemsDesktopSmall: false,
            itemsTablet: false,
            itemsMobile: false,
            
            autoPlay: autoplay_,
            //autoplay: 3000, //Set AutoPlay to 3 seconds
            //autoplay: true,
            //animateIn: 'fadeIn',
            //animateOut: 'fadeOut',
 
            transitionStyle : "fade",
            touchDrag: false,
            mouseDrag: false,
           
			//loop: false,//true,
			rewindNav : true,
			rewindSpeed: 0,
			scrollPerPage: true,
			pagination: false,
            //dots: true,
			//navigation: true,

            afterInit: function (el) {
            	homeSlider.addClass('owl-loaded owl-text-select-on');

                jQuery(".banner-text ul li").click(function () {
                    jQuery(".banner-text ul li").removeClass("active");
                    jQuery(this).addClass("active");
                   	homeSlider.trigger('owl.goTo', $(this).index());
                });

                jQuery(".banner-text ul li").removeClass("active");
                jQuery(".banner-text ul li[data-slide='" + jQuery('.homeslider .owl-item.active .banner1').attr("data-slide") + "']").addClass("active");

                jQuery(".banner-text .slider-text > span").text($('.homeslider .owl-item.active').find(".banner1").attr("data-title"));

                if (items_) {
                    jQuery(".homeslider .banner1").swipe({
                        //Generic swipe handler for all directions
                        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                            console.log(direction)
                            if (direction == "left") {
                                homeSlider.trigger('owl.next');
                            } else if (direction == "right") {
                                homeSlider.trigger('owl.prev');
                            }
                        },
                        allowPageScroll: "auto",
                        //Default is 75px, set to 0 for demo so any distance triggers swipe
                        threshold: 0
                    });
                } else {
                    jQuery(".banner-text ul").hide();
                }
            },
            afterAction: function (el) {
            	el.find(".owl-item").removeClass("active");
            	el.find(".owl-item").eq(this.currentItem).addClass("active");

                jQuery(".banner-text .slider-text > span").text($('.homeslider .owl-item.active').find(".banner1").attr("data-title"));
                jQuery(".banner-text ul li").removeClass("active");
                jQuery(".banner-text ul li[data-slide='" + $('.homeslider .owl-item.active .banner1').attr("data-slide") + "']").addClass("active");
            }
        });

    }

    /*var owlLeft = $("#left-slider").owlCarousel({
        items: 1,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        nav: false,
        autoplay: false,
        onInitialized: function () {
            toggleArrows();
        },
        onTranslated: function () {
            toggleArrows();
        }
    });

    var owlRight = $("#right-slider").owlCarousel({
        items: 1,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        nav: false,
        autoplay: false,
    });

    jQuery(".event-arrow .left-arrow").on("click", function (e) {
        e.preventDefault();
        owlLeft.trigger('prev.owl.carousel');
        owlRight.trigger('prev.owl.carousel');
    });

    jQuery(".event-arrow .right-arrow").on("click", function (e) {
        e.preventDefault();
		owlLeft.trigger('next.owl.carousel');
        owlRight.trigger('next.owl.carousel');
    });*/

    var owlLeft = $("#left-slider").owlCarousel({
        //items: 1,
		singleItem:true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,

        pagination: false,
        navigation: false,
        //dots:false,
        //nav:false,
        rewindNav : false,

		scrollPerPage: true,

        autoplay: false,
        afterInit: function (el) {
            //toggleArrows();
        	el.find(".owl-item").removeClass("active");
        	el.find(".owl-item").eq(this.currentItem).addClass("active");
            toggleArrows(this.currentItem);
        },
        afterAction: function (el) {
        	el.find(".owl-item").removeClass("active");
        	el.find(".owl-item").eq(this.currentItem).addClass("active");
            toggleArrows(this.currentItem);
        }
    });

    var owlRight = $("#right-slider").owlCarousel({
        //items: 1,
		singleItem:true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,

        pagination: false,
        navigation: false,
        //dots:false,
        //nav:false,
        rewindNav : false,

		scrollPerPage: true,

        autoplay: false,
        afterAction: function (el) {
        	el.find(".owl-item").removeClass("active");
        	el.find(".owl-item").eq(this.currentItem).addClass("active");
        }
    });

    jQuery(".event-arrow .left-arrow").on("click", function (e) {
        e.preventDefault();
        owlLeft.trigger('owl.prev');
        owlRight.trigger('owl.prev');
    });

    jQuery(".event-arrow .right-arrow").on("click", function (e) {
        e.preventDefault();
        owlLeft.trigger('owl.next');
        owlRight.trigger('owl.next');
    });

    jQuery('input, textarea').placeholder();

});

jQuery.fn.getIndex = function() {
	var $p = jQuery(this).parent().children();
	return $p.index(this);
}

function toggleArrows(index) {
    //var elm = jQuery("#right-slider");
    var elm = jQuery("#left-slider");

    //index = index + 1;

    /*console.log(index);
    elm.find(".owl-wrapper").find("> .owl-item").each(function(){
		console.log('current index: ' + elm.find(".owl-wrapper").eq(index).index());
		//console.log('current index (getIndex): ' + elm.find(".owl-wrapper").getIndex(this));
		console.log('current index: ' + elm.find(".owl-wrapper").eq().index(this));

		console.log('active: ' + elm.find(".owl-wrapper > .owl-item.active").index());
		console.log('first: ' + elm.find(".owl-wrapper > .owl-item").first().index());
		console.log('last: ' + elm.find(".owl-wrapper > .owl-item").first().index());
    });
    console.log('current index: ' + elm.find(".owl-wrapper > .owl-item").eq(index).index());
    console.log('current index (getIndex): ' + elm.find(".owl-wrapper > .owl-item").getIndex());
    console.log('current index (getIndex): ' + elm.find(".owl-wrapper > .owl-item").eq().index());

    console.log('active: ' + elm.find(".owl-wrapper > .owl-item.active").index());
    console.log('first: ' + elm.find(".owl-wrapper > .owl-item").first().index());
    console.log('last: ' + elm.find(".owl-wrapper > .owl-item").first().index());*/

    //if (elm.find(".owl-item").last().hasClass('active') && elm.find(".owl-item.active").index() == elm.find(".owl-item").first().index()) {
    if (elm.find(".owl-wrapper > .owl-item:last").hasClass('active') && elm.find(".owl-item.active").index() == elm.find(".owl-wrapper > .owl-item:first").first().index()) {
        jQuery('.event-arrow .right-arrow').addClass("off").hide();
        jQuery('.event-arrow .left-arrow').addClass("off").hide();
    }
        //disable next
    else if (elm.find(".owl-wrapper > .owl-item:last").hasClass('active')) {
    	//console.log('disable next');
        jQuery('.event-arrow .right-arrow').addClass("off").hide();
        jQuery('.event-arrow .left-arrow').removeClass("off").show();
    }
        //disable previus
    else if (elm.find(".owl-item.active").index() == elm.find(".owl-wrapper > .owl-item:first").index()) {
    	//console.log('disable previous');
        jQuery('.event-arrow .right-arrow').removeClass("off").show();
        jQuery('.event-arrow .left-arrow').addClass("off").hide();
    } else {
        jQuery('.event-arrow .right-arrow, .event-arrow .left-arrow').removeClass("off").show();
    }
}


jQuery(window).load(function () {
    fixheader();
});
jQuery(window).resize(function () {
    fixheader();
})
jQuery(window).scroll(function () {
    fixheader();
})
var flag = true;

function fixheader() {
    var scrollTop = jQuery(window).scrollTop();
	/* var obj = $("#stickyribbon");

	if (scrollTop > jQuery('#stickyribbon').height() && flag) {
	jQuery('#stickyribbon').addClass('navbar-fixed-top');
	if (!$(".blankDiv").length) {
	var blankDiv = $("<div>", {
	"class": "blankDiv"
	});
	blankDiv.height(jQuery('#stickyribbon').height());
	blankDiv.insertAfter(jQuery('#stickyribbon'));
	//stickyribbon
	}
	obj.removeClass('slideUp').addClass('slideDown');
	obj.removeClass('slideUp').addClass('slideDown');
	setTimeout(function () {
	obj.removeClass("slideDown")
	}, 400)
	flag = false;
	} else if (scrollTop <= jQuery('#stickyribbon').height() && !flag) {
	jQuery('#stickyribbon').removeClass('navbar-fixed-top');
	$(".blankDiv").remove();
	obj.removeClass('slideDown').addClass("slideup")
	setTimeout(function () {
	obj.removeClass("slideup")
	}, 701)
	flag = true;
	}*/
	var val_ = parseInt(jQuery('#stickyribbon').find('> .header-main .logo').height()) + parseInt(jQuery('#stickyribbon').find('> .header-main .nav-menu').height());
    if (scrollTop > 23) {
    //if (scrollTop > 100) {
        jQuery('#stickyribbon').addClass('navbar-fixed-top');
        if (!$(".blankDiv").length) {
            var blankDiv = $("<div>", {
                "class": "blankDiv"
            });
            //blankDiv.height(jQuery('#stickyribbon').height() +20);
            //blankDiv.height(247);
            blankDiv.height(jQuery('#stickyribbon').height());
            blankDiv.insertAfter(jQuery('#stickyribbon'));
            //stickyribbon
        }
        jQuery("body").addClass("fixedHeader");

    } else {
        jQuery(".blankDiv").animate({
            height: '+=87px'
        }, 60);
        jQuery(".blankDiv").remove();
        jQuery('#stickyribbon').removeClass('navbar-fixed-top');
        jQuery("body").removeClass("fixedHeader");
    }
}
//Reservations-top
jQuery(window).load(function () {
    jQuery('.reservations-top > a').click(function (e) {
        e.preventDefault();
        if (jQuery(this).hasClass("active")) {
            jQuery(this).removeClass("active");
            if (jQuery(window).width() <= 1024) {
                jQuery('.reservation-slide').slideUp('slow');
            } else {
               jQuery('.reservation-slide').hide('slide', {
                   direction: 'right'
                }, 1000);
            }
        } else {
           jQuery(this).addClass("active");
            if (jQuery(window).width() <= 1024) {
                jQuery('.reservation-slide').slideDown('slow');
                jQuery(".reservation-slide").css('overflow','visible');

            } else {
                jQuery('.reservation-slide').show('slide', {
                   direction: 'right'
                }, 1000);
                jQuery(".reservation-slide").css('overflow','visible');

            }
       }
    });
    jQuery('body').on('click touchstart', function (e) {
        var container = $(".reservations-top");
        //var container2 = $(".ui-datepicker");
        var container2 = $("#ui-datepicker-div");
        if (!container.is(e.target) && container.has(e.target).length === 0 && !container2.is(e.target) && container2.has(e.target).length === 0) {
            if (jQuery(window).width() <= 1024) {
                jQuery(".reservation-slide").slideUp();
                jQuery('.reservations-top > a').removeClass("active");
                //$(".ui-datepicker").hide();
                jQuery("#datepicker").datepicker("hide");
                jQuery("#datepicker2").datepicker("hide");
            }
        }
    });

    jQuery(".hasDatepicker, .ui-datepicker, .ui-datepicker-trigger").click(function (event) {
        event.stopPropagation();
    });


});
jQuery(window).resize(function () {
    if (jQuery(window).width() > 1024) {
        jQuery(".reservation-slide").removeAttr("style");
        jQuery('.reservations-top > a').removeClass("active");
    }
});
(function (jQuery) {
    jQuery('ul').each(function () {
        jQuery(this).find('li').first().addClass('first');
        jQuery(this).find('li').last().addClass('last');
    });
})(jQuery);
