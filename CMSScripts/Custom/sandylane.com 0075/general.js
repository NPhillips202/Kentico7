// JavaScript Document
var $ = jQuery.noConflict();
$.fn.isOnScreen = function () {

    var win = $(window);

    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    var bounds = this.offset();
    if (bounds != undefined) {
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    }
};

jQuery(document).ready(function ($) {
    
    // Init datepickers for forms
    $(".FormPanel .datepicker").datepicker({
        minDate: ('+0D')
    });
    $(".FormPanel .datepicker").prop("readonly", true);
    
    // Blackout dates for restaurants
    function datepickerBlackoutDates() {
        var selectedRestaurant = jQuery('.FormPanel .restaurantSelection').val();
        console.log("This is the res" + selectedRestaurant);

        if (selectedRestaurant == "L'Acajou") {

            var blackoutDates = ["2017-05-21",
                                 "2017-05-22",
                                 "2017-05-28",
                                 "2017-05-29",
                                 "2017-06-04",
                                 "2017-06-05",
                                 "2017-06-11",
                                 "2017-06-12",
                                 "2017-06-18",
                                 "2017-06-19",
                                 "2017-06-25",
                                 "2017-06-26",
                                 "2017-09-01",
                                 "2017-09-02",
                                 "2017-09-03",
                                 "2017-09-04",
                                 "2017-09-05",
                                 "2017-09-06",
                                 "2017-09-07",
                                 "2017-09-08",
                                 "2017-09-09",
                                 "2017-09-10",
                                 "2017-09-11",
                                 "2017-09-12",
                                 "2017-09-13",
                                 "2017-09-14",
                                 "2017-09-15",
                                 "2017-09-16",
                                 "2017-09-17",
                                 "2017-09-18",
                                 "2017-09-19",
                                 "2017-09-20",
                                 "2017-09-21",
                                 "2017-09-22",
                                 "2017-09-23",
                                 "2017-09-24",
                                 "2017-09-25",
                                 "2017-09-26",
                                 "2017-09-27",
                                 "2017-09-28",
                                 "2017-09-29",
                                 "2017-09-30",
                                 "2017-10-01",
                                 "2017-10-02",
                                 // and 12/31 every year
                                 "2017-12-31",
                                 "2017-12-31",
                                 "2018-12-31",
                                 "2019-12-31",
                                 "2020-12-31",
                                 "2021-12-31",
                                 "2022-12-31",
                                 "2023-12-31",
                                 "2024-12-31",
                                 "2025-12-31",
                                 "2026-12-31"];

            jQuery(".FormPanel .datepickerBlackout").datepicker('option', {
                beforeShowDay: function(date){
                    var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                    return [ blackoutDates.indexOf(string) == -1 ]
                }
            });

        } else if (selectedRestaurant == "Bajan Blue") {

            var blackoutDates = ["2017-09-11",
                                 "2017-09-12",
                                 "2017-09-13",
                                 "2017-09-14",
                                 "2017-09-15",
                                 "2017-09-16",
                                 "2017-09-17",
                                 "2017-09-18",
                                 "2017-09-19",
                                 "2017-09-20",
                                 "2017-09-21",
                                 "2017-09-22",
                                 "2017-09-23",
                                 "2017-09-24",
                                 // and 12/31 every year
                                 /*"2016-12-22",
                                 "2016-12-23",
                                 "2016-12-24",
                                 "2016-12-25",
                                 "2016-12-26",
                                 "2016-12-27",
                                 "2016-12-28",
                                 "2016-12-29",
                                 "2016-12-30",
                                 "2016-12-31",
                                 "2017-01-01",
                                 "2017-01-02",
                                 "2017-01-03",
                                 "2017-01-04",
                                 "2017-01-05",
                                 "2017-01-06",*/
                                 "2017-12-31",
                                 "2018-12-31",
                                 "2019-12-31",
                                 "2020-12-31",
                                 "2021-12-31",
                                 "2022-12-31",
                                 "2023-12-31",
                                 "2024-12-31",
                                 "2025-12-31",
                                 "2026-12-31"];

            jQuery(".FormPanel .datepickerBlackout").datepicker('option', {
                beforeShowDay: function(date){
                    var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                    return [ blackoutDates.indexOf(string) == -1 ]
                }
            });

        } else if (selectedRestaurant == "The Spa Cafe" || selectedRestaurant == "Lower Terrace") {

            var blackoutDates = ["2016-09-12",
                                 "2016-09-13",
                                 "2016-09-14",
                                 "2016-09-15",
                                 "2016-09-16",
                                 "2016-09-17",
                                 "2016-09-18",
                                 "2016-09-19",
                                 "2016-09-20",
                                 "2016-09-21",
                                 "2016-09-22",
                                 "2016-09-23",
                                 "2016-09-24",
                                 "2016-09-25",
                                 "2016-09-26",
                                // "2016-12-22",
                                  "2016-12-22",
                                 "2016-12-23",
                                 "2016-12-24",
                                 "2016-12-25",
                                 "2016-12-26",
                                 "2016-12-27",
                                 "2016-12-28",
                                 "2016-12-29",
                                 "2016-12-30",
                                 "2016-12-31",
                                 "2017-01-01",
                                 "2017-01-02",
                                 "2017-01-03",
                                 "2017-01-04",
                                 "2017-01-05",
                                 "2017-01-06" 
                                ];

            jQuery(".FormPanel .datepickerBlackout").datepicker('option', {
                beforeShowDay: function(date){
                    var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                    return [ blackoutDates.indexOf(string) == -1 ]
                }
            });

        } else {

            jQuery(".FormPanel .datepickerBlackout").datepicker('option', {
                beforeShowDay: null
            });

        };
    };

    // Set custom times for restaurants
    function setRestaurantTimes() {
        var selectedRestaurant = jQuery('.FormPanel .restaurantSelection').val(),
            timeInput = jQuery('.FormPanel .restaurantTimes');

        if (selectedRestaurant == "L'Acajou") {

            // 6:30pm - 9:30pm

            var validTimes = "",
                validTimes = validTimes + "<option value='6:45 pm'>6:45 pm</option>",
                validTimes = validTimes + "<option value='7:30 pm'>7:30 pm</option>",
                validTimes = validTimes + "<option value='8:15 pm'>8:15 pm</option>",
                validTimes = validTimes + "<option value='9:00 pm'>9:00 pm</option>",
                validTimes = validTimes + "<option value='9:30 pm'>9:30 pm</option>";

        } else if (selectedRestaurant == "Bajan Blue") {

            // 7:00am - 10:00am (breakfast)
            // 12:30pm - 2:30pm (lunch)
            // 7:00pm - 9:30pm (dinner)

            var validTimes = "",
                validTimes = validTimes + "<option value='7:00 am'>7:00 am (Breakfast)</option>",
                validTimes = validTimes + "<option value='7:30 am'>7:30 am (Breakfast)</option>",
                validTimes = validTimes + "<option value='8:00 am'>8:00 am (Breakfast)</option>",
                validTimes = validTimes + "<option value='8:30 am'>8:30 am (Breakfast)</option>",
                validTimes = validTimes + "<option value='9:00 am'>9:00 am (Breakfast)</option>",

                validTimes = validTimes + "<option value='12:30 pm'>12:30 pm (Lunch)</option>",
                validTimes = validTimes + "<option value='1:00 pm'>1:00 pm (Lunch)</option>",
                validTimes = validTimes + "<option value='1:30 pm'>1:30 pm (Lunch)</option>",
                validTimes = validTimes + "<option value='2:00 pm'>2:00 pm (Lunch)</option>",
                validTimes = validTimes + "<option value='2:30 pm'>2:30 pm (Lunch)</option>",

                validTimes = validTimes + "<option value='7:00 pm'>7:00 pm (Dinner)</option>",
                validTimes = validTimes + "<option value='7:30 pm'>7:30 pm (Dinner)</option>",
                validTimes = validTimes + "<option value='8:00 pm'>8:00 pm (Dinner)</option>",
                validTimes = validTimes + "<option value='8:30 pm'>8:30 pm (Dinner)</option>",
                validTimes = validTimes + "<option value='9:00 pm'>9:00 pm (Dinner)</option>",
                validTimes = validTimes + "<option value='9:30 pm'>9:30 pm (Dinner)</option>";

        } else if (selectedRestaurant == "The Spa Cafe") {

            // 12:30pm - 2:30pm

            var validTimes = "",
                validTimes = validTimes + "<option value='12:30 pm'>12:30 pm</option>",
                validTimes = validTimes + "<option value='1:00 pm'>1:00 pm</option>",
                validTimes = validTimes + "<option value='1:30 pm'>1:30 pm</option>",
                validTimes = validTimes + "<option value='2:00 pm'>2:00 pm</option>",
                validTimes = validTimes + "<option value='2:30 pm'>2:30 pm</option>";

        } else if (selectedRestaurant == "The Country Club Restaurant") {

            // 11:30am - 4:30pm
            console.log(validTimes);
            var validTimes = "",
                validTimes = validTimes + "<option value='11:30 am'>11:30 am</option>",
                validTimes = validTimes + "<option value='12:00 pm'>12:00 pm</option>",
                validTimes = validTimes + "<option value='12:30 pm'>12:30 pm</option>",
                validTimes = validTimes + "<option value='1:00 pm'>1:00 pm</option>",
                validTimes = validTimes + "<option value='1:30 pm'>1:30 pm</option>",
                validTimes = validTimes + "<option value='2:00 pm'>2:00 pm</option>",
                validTimes = validTimes + "<option value='2:30 pm'>2:30 pm</option>",
                validTimes = validTimes + "<option value='3:00 pm'>3:00 pm</option>",
                validTimes = validTimes + "<option value='3:30 pm'>3:30 pm</option>",
                validTimes = validTimes + "<option value='4:00 pm'>4:00 pm</option>",
                validTimes = validTimes + "<option value='4:30 pm'>4:30 pm</option>";
                console.log(validTimes);
        } else if (selectedRestaurant == "Lower Terrace") {

            // 3:00pm - 4:30pm

            var validTimes = "",
                validTimes = validTimes + "<option value='3:00 pm'>3:00 pm</option>",
                validTimes = validTimes + "<option value='3:30 pm'>3:30 pm</option>",
                validTimes = validTimes + "<option value='4:00 pm'>4:00 pm</option>",
                validTimes = validTimes + "<option value='4:30 pm'>4:30 pm</option>";

        };

        // Set times
        timeInput.html(validTimes);
      console.log("This is the restaurant selected" + selectedRestaurant);
      console.log(validTimes);
    };

	jQuery(function() {
		// Init first
		jQuery(".FormPanel .datepickerBlackout").datepicker({
			minDate: ('+0D')
		});
		datepickerBlackoutDates(); 
        setRestaurantTimes();
	});
	jQuery('.FormPanel .restaurantSelection').change(function() { 
        datepickerBlackoutDates();
        setRestaurantTimes();
    });
    jQuery(".FormPanel .datepickerBlackout").prop("readonly", true);
    // (Blackout Dates & Times End)
    
    // Selectbox
    $(".selectbox").selectbox({
        //hide_duplicate_option: true
    });

    $(".selectbox2").selectbox({
        //hide_duplicate_option: true
    });

    $(".btn-2").click(function (e) {
        e.preventDefault();
        if ($(window).width() <= 767) {
            $(".select-option-mobile").slideToggle();
        }
    });

    $('nav > ul').addClass('main-nav enumenu_ul menu buttons');
    $('nav > ul > li').addClass('menu_button');
    $('.enumenu_ul').responsiveMenu({
        'menuIcon_text': 'Menu',
        menuslide_overlap: true,
        menuslide_direction: 'left',
        onMenuopen: function () {}
    });
});

jQuery(window).load(function () {
    jQuery("body").css('opacity', '1');
});


$(document).ready(function () {

    $('.bxslider li').each(function () {
        $(this).find('img').addClass('bannerimage');
        var imgSrc = $(this).find('.bannerimage').attr('src');
        imgSrc = "url(" + imgSrc + ")";
        $(this).css("background-image", imgSrc);
    });

    $('.banner_inner').each(function () {
        $(this).find('img').addClass('bannerimage2');
        var imgSrc = $(this).find('.bannerimage2').attr('src');
        imgSrc = "url(" + imgSrc + ")";
        $(this).css("background-image", imgSrc);
    });


    if ($('.overlay-img1 img').length > 0) {
        var getImageSrc = $('.overlay-img1 img').attr('src');
        $('.resorts_list_right1').css('background-image', 'url(' + getImageSrc + ')');
        $('.resort-info1').css('background-image', 'url(' + getImageSrc + ')');
        $('.overlay-img1').remove();
    };

    if ($('.overlay-img2 img').length > 0) {
        var getImageSrc1 = $('.overlay-img2 img').attr('src');
        $('.resorts_list_right2').css('background-image', 'url(' + getImageSrc1 + ')');
        $('.resort-info2').css('background-image', 'url(' + getImageSrc1 + ')');
        $('.overlay-img2').remove();
    };

    if ($('.overlay-img3 img').length > 0) {
        var getImageSrc2 = $('.overlay-img3 img').attr('src');
        $('.resorts_list_right3').css('background-image', 'url(' + getImageSrc2 + ')');
        $('.resort-info3').css('background-image', 'url(' + getImageSrc2 + ')');
        $('.overlay-img3').remove();
    };

    if ($('.overlay-img4 img').length > 0) {
        var getImageSrc3 = $('.overlay-img4 img').attr('src');
        $('.resorts_list_right4').css('background-image', 'url(' + getImageSrc3 + ')');
        $('.resort-info4').css('background-image', 'url(' + getImageSrc3 + ')');
        $('.overlay-img4').remove();
    };

    if ($('.discover_banner .discoverDiv img').length > 0) {
        var getImageSrc4 = $('.discover_banner .discoverDiv img').attr('src');
        $('.discover_banner').css('background-image', 'url(' + getImageSrc4 + ')');
        $('.discoverDiv').remove();
    };

    if ($('.video_area .videoImage img').length > 0) {
        var getImageSrc4 = $('.video_area .videoImage img').attr('src');
        $('.video_area').css('background-image', 'url(' + getImageSrc4 + ')');
        $('.videoImage').remove();
    };


    jQuery(document).ready(function ($) {
        $('.bxslider').bxSlider({
            slideMargin: 0,
            auto: true,
            pause: 3000,
            touchEnabled: false,
            mode: 'fade',
            preloadImages: 'all'
        });

        $('.bxslider2').bxSlider({
            slideMargin: 0,
            auto: true,
            pause: 3000,
            touchEnabled: false,
            mode: 'fade'
        });
    });







    var maxHeight = 0;
    $(document).ready(function () {
        $(".resorts_info_area p").each(function () {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).height();
            }
        });
        $(".resorts_info_area p").height(maxHeight);
    });

    $(window).resize(function () {

        maxHeight = 0;
        $(".resorts_info_area p").removeAttr("style");
        $(".resorts_info_area p").each(function () {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).height();
            }
        });
        $(".resorts_info_area p").height(maxHeight);
    });



    var maxHeight = 0;
    $(document).ready(function () {
        $(".resorts_info_area h6").each(function () {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).height();
            }
        });
        $(".resorts_info_area h6").height(maxHeight);
    });

    $(window).resize(function () {

        maxHeight = 0;
        $(".resorts_info_area h6").removeAttr("style");
        $(".resorts_info_area h6").each(function () {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).height();
            }
        });
        $(".resorts_info_area h6").height(maxHeight);
    });

});





var tweetheight = $("header").height();
$(document).ready(function () {
    $('a.down_arrow[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - tweetheight
        }, 900, 'swing');
    });
});

/*$(document).ready(function(){
$('a.down_arrow[href^="#"]').on('click',function (e) {
 e.preventDefault();
 var target = this.hash;
 var $target = $(target);
 $('html, body').stop().animate({
   'scrollTop': $target.offset().top - 100
 }, 900, 'swing');
 });
}); */

$(window).resize(function () {
    $('a.down_arrow[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - tweetheight
        }, 900, 'swing');
    });
});

//--Toggle off datepicker on desktop
    function toggleDatepicker() {
        if (jQuery('.make_a_reservation_calender').is(':visible')) {
            //console.log('disable datepicker');
            jQuery('.bookingForm .checkIn, .bookingForm .checkOut').datepicker('disable');
        } else {
            //console.log('enable datepicker');
            jQuery('.bookingForm .checkIn, .bookingForm .checkOut').datepicker('enable');
        };
    };
    //jQuery(function() { toggleDatepicker(); });
    jQuery(window).resize(function(){ toggleDatepicker(); });


$(document).ready(function () {

    jQuery(".make_a_reservation, .check-now .btn-2").click(function (e) {
        e.stopPropagation();
    })
    jQuery(document).click(function () {
        jQuery(".make_a_reservation").slideUp()
    })

    //jQuery(".chat_sect").click(function(e){
    // e.stopPropagation();
    //})
    //jQuery(document).click(function(){
    // jQuery(".chat_content").slideUp();
    //})


    jQuery(".chat_content, .chat_heading").click(function (e) {
        e.stopPropagation();
    })
    jQuery(document).click(function () {
        jQuery(".chat_content").slideUp()
        $('.chat_area').removeClass('active');
    })



    $(".toogle-nav").click(function () {
        $(this).toggleClass('active');
        $(".hidden-menu").animate({
            width: "toggle"
        });
    });

    // Booking mask toggle
    $(".check-now .btn-2").click(function (e) {
        e.preventDefault();
        $(".make_a_reservation").slideToggle("slow", function() {
            jQuery(this).css('overflow','visible');
        });
        toggleDatepicker();
    });


    $(".chat_heading").click(function () {
        $('.chat_area').toggleClass('active');
        $(".chat_content").slideToggle("slow");
    });

    $('.video_area').click(function () {
        video = '<iframe src="' + $(this).attr('data-video') + '" class="videoFrame"></iframe>';
        $(this).replaceWith(video);
    });
});
/*
$(document).ready(function(){
var maxHeight = 0;
$(document).ready(function () {
$(".accommodations_box").each(function(){
   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
});
$(".accommodations_box").height(maxHeight);
});

$(window).resize(function() {
maxHeight = 0;
$(".accommodations_box").removeAttr("style");
$(".accommodations_box").each(function(){
   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
});
$(".accommodations_box").height(maxHeight);
 });
  });*/



$(document).ready(function () {
    var getImageSrc = $('.imageDiv1 img').attr('src');
    $('.box-bg.box-bg1').css('background-image', 'url(' + getImageSrc + ')');
    $('.imageDiv1').remove();

    var getImageSrc = $('.imageDiv2 img').attr('src');
    $('.box-bg.box-bg2').css('background-image', 'url(' + getImageSrc + ')');
    $('.imageDiv2').remove();

    var getImageSrc = $('.imageDiv3 img').attr('src');
    $('.box-bg.box-bg3').css('background-image', 'url(' + getImageSrc + ')');
    $('.imageDiv3').remove();

});

$(window).load(function () {
    isVisibleSectionFun();
});
$(window).resize(function () {
    isVisibleSectionFun();
});
$(window).scroll(function () {
    isVisibleSectionFun();
})


function isVisibleSectionFun() {
    $(".resorts_area").each(function () {
        var this_ = $(this);
        if (this_.isOnScreen() && this_.hasClass("hidden_by_scaling_low")) {
            setTimeout(function () {
                this_.removeClass("hidden_by_scaling_low");
                setTimeout(function () {
                    this_.find(".frame").removeClass("hidden_by_scaling_low");
                }, 600);
            }, 200);
        }
    });
}

var maxHeight1 = 0;
$(window).load(function () {
    $(".resorts_area_row1 .lower .w35").each(function () {
        if ($(this).height() > maxHeight1) {
            maxHeight1 = $(this).height();
        }
    });
    $(".resorts_area_row1 .resorts_list_left").height(maxHeight1 - 4);
});

$(window).resize(function () {

    maxHeight1 = 0;
    $(".resorts_area_row1 .lower .w35").removeAttr("style");
    $(".resorts_area_row1 .lower .w35").each(function () {
        if ($(this).height() > maxHeight1) {
            maxHeight1 = $(this).height();
        }
    });
    $(".resorts_area_row1 .resorts_list_left").height(maxHeight1 - 4);
});


var maxHeight2 = 0;
$(window).load(function () {
    $(".lower .w35").each(function () {
        if ($(this).height() > maxHeight2) {
            maxHeight2 = $(this).height();
        }
    });
    $(".expandable img").height(maxHeight2);
});

$(window).resize(function () {

    maxHeight2 = 0;
    $(".lower .w35").removeAttr("style");
    $(".lower .w35").each(function () {
        if ($(this).height() > maxHeight2) {
            maxHeight2 = $(this).height();
        }
    });
    $(".expandable img").height(maxHeight2);
});

var maxHeight3 = 0;
$(window).load(function () {
    $(".resorts_area_row2 .lower .w35").each(function () {
        if ($(this).height() > maxHeight3) {
            maxHeight3 = $(this).height();
        }
    });
    $(".resorts_area_row2 .resorts_list_left").height(maxHeight3-3);
});

$(window).resize(function () {

    maxHeight3 = 0;
    $(".resorts_area_row2 .lower .w35").removeAttr("style");
    $(".resorts_area_row2 .lower .w35").each(function () {
        if ($(this).height() > maxHeight3) {
            maxHeight3 = $(this).height();
        }
    });
    $(".resorts_area_row2 .resorts_list_left").height(maxHeight3-3);
});

//--Blog Sidebar
    jQuery('.blogMoreBtn').click(function() {
        jQuery('.zoneLeft').fadeIn('slow');
    });
    jQuery('.blogCloseBtn').click(function() {
        jQuery('.zoneLeft').fadeOut('slow');
    });

//--Site Map
    jQuery(function() {
        jQuery(".site-map a, .sitemap-close").click(function(e) {
            e.preventDefault();
            if (jQuery('.sitemap-float').is(':visible')) {
                jQuery(".sitemap-float").fadeOut(500);
            } else {
                jQuery(".sitemap-float").fadeIn(500);
            };
        });
    });


// Email Form in Footer
    jQuery(function() {
        var emailForm = jQuery('.form-section .form-left .form-area'),
            emailFormInput = emailForm.find('.inputbox'),
            defaultValue = "Enter Email Address";
        // Clear text in field when focused
        emailFormInput.on('focus', function() {
            if (jQuery(this).val() == defaultValue) {
                jQuery(this).val('');
            };
        });
        emailFormInput.on('blur', function() {
            if (jQuery(this).val() == '') {
                jQuery(this).val(defaultValue);
            };
        });
        // Submit functions
        function submitEmailForm(val) {
            var email = val;
            if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
                alert("Please enter a valid email address.");
                return false;
            };
            document.location.href = ('/newsletter-sign-up/?em=' + email);
        };
        emailFormInput.on('focus', function() {
            jQuery(document.body).delegate('input:text', 'keypress', function(e) {
                if (e.which === 13) {
                    e.preventDefault();
                    var val = jQuery(this).val();
                    submitEmailForm(val);
                };
            });
        });
        emailForm.find('.submit-btn').on('click', function(e) {
            e.preventDefault();
            var val = jQuery(this).parent().parent().find('.inputbox').val();
            submitEmailForm(val);
        });
    });

//--Resort Map Overlay
    // Function for disabling main page scrolling
    function disablePageScroll() {
        if (!jQuery('html').hasClass('noscroll')) {
            if (jQuery(document).height() > jQuery(window).height()) {
               var scrollTop = (jQuery('html').scrollTop()) ? jQuery('html').scrollTop() : jQuery('body').scrollTop();
               jQuery('html').addClass('noscroll').css('top',-scrollTop);         
            };
        };
    };
    
    // Function for enabling main page scrolling
    function enablePageScroll() {
        var scrollTop = parseInt(jQuery('html').css('top'));
        jQuery('html').removeClass('noscroll');
        jQuery('html,body').scrollTop(-scrollTop);
    };
	
	// Function for auto-centering the overlay vertically
	function centerVertically() {
		jQuery('.formOverlay').css({
			'top' : '50%',
			'margin-top' : -jQuery('.formOverlay').height()/2
		});
	};
	
	// Open overlay
	jQuery('a.openOverlay').live('click',function(e) {
		var overlay = jQuery('<div class="formOverlayWrapper"><div class="formOverlay"><div class="formOverlayClose">Close X</div><div class="formOverlayContent" /></div></div>'),
			href = 'http://demo.cendyn.com/sandy-lane/resort-map/index.html',
			iframe = "<iframe src='" + href + "' allowtransparency='yes' frameborder='0' scrolling='no' width='100%'></iframe>";
		e.preventDefault();
		//disablePageScroll();
		// Create overlay div and fill with iframe content, then fade in
		jQuery('body').append(overlay);
		overlay.find('.formOverlayContent').html(iframe);
		overlay.fadeIn(500);
		centerVertically();
		jQuery(window).bind('resize',centerVertically);
		// Bind click event for closing overlay
		jQuery(document).bind('click',closeOverlayOnOutsideClick);
	});
	
	// Close function
	function closeOverlay() {
		//enablePageScroll();
		jQuery('.formOverlayWrapper').fadeOut(500, function() 
		{
			jQuery('.formOverlayWrapper').remove();
			jQuery(window).unbind('resize',centerVertically);
		});
		// Unbind click event for closing overlay
		jQuery(document).unbind('click',closeOverlayOnOutsideClick);
	};
	
	// Close on click
	jQuery('.formOverlayWrapper .close').live('click',function(e) {
		e.preventDefault();
		closeOverlay();
	});
	
	// Close on click outside of box
	function closeOverlayOnOutsideClick(e) { 
		if (jQuery('.formOverlayWrapper').is(':visible')) {
			var ele = jQuery(e.target);
			if (!ele.hasClass("formOverlay"))
			{
				closeOverlay();
			};
		};
	};

//--Golf Cards
	$('.course-card:not(#old-nine)').each(function(){
		var theCard = $(this);
		var fx = 'scrollHorz';
		var detailsHeight = $('.course-positioner',theCard).css('top');
		$('.course-positioner',theCard).addClass('showOverview');
		theCard.cycle({
			fx: fx,
			timeout: 0,
			nowrap: 1,
			cleartypeNoBg: true,
			slideExpr: '.hole-content'
		});
		$('.hole-nav li',theCard).not(':last').not(':first').click(function(e){
		  e.preventDefault();
			var theHole = $(this);
			var theList = theHole.parents('ul');
			var theIndex = $('li',theList).index(theHole);
			//console.log(theIndex);
			if (!$('.course-positioner',theCard).hasClass('showOverview') && theHole.hasClass('selected')) {//show the overview again
				$('.course-positioner',theCard).addClass('showOverview').animate({top:detailsHeight});
			} else {//show the hole
				if ($('.course-positioner',theCard).hasClass('showOverview')) { fx = 'none'; }//from overview, don't slide, go directly
				else { fx = 'scrollHorz'; }//from another hole, slide to the new
				theCard.cycle(theIndex-1,fx);
				$('.course-positioner',theCard).animate({top:0}).removeClass('showOverview');
				$('.hole-nav li',theCard).removeClass('selected');
				$('.hole-nav li:eq('+theIndex+')',theCard).addClass('selected');
			}
		});
	});

	var openFnHoleModal=function(hash){	
		var currentTab = $(hash.t).parents('.hole-content');
		var thumbImg = $(hash.t).find('img').attr('src');
		var largeImg = thumbImg.replace('thumbs','full');
		var holeNum = currentTab.attr('id').split("-");
		var holeDetail = $('.hole-description p',currentTab).clone();
		$('#hole-modal').css({left:($(window).width()-$('#hole-modal').width())/2,top:$(window).scrollTop()+10});
		$('.course-aerial-large img').attr('src','').hide();
		$('.jqmHoleTitle h3 span').html(holeNum[1]);
		$('.hole-info-content p').remove();
		$('.hole-info-content').prepend(holeDetail);
		$('.course-aerial-large img').attr('src',largeImg).show();
		hash.w.show();
	};

	var hideFn=function(hash){
		hash.w.hide();
		$('.course-aerial-large img').attr('src','').hide();
		hash.o.remove();
	};

	//$('#hole-modal').jqm({trigger: '.hole-aerial', onShow: openFnHoleModal, onHide: hideFn});

//--Spa Services Dropdown Styling
    jQuery(function() {
        jQuery('.spa-services option').each(function() {
            var thisText = jQuery(this).text();
    
            if (thisText.indexOf('--') > -1) {
                //var newText = thisText.substr(2);
                //jQuery(this).html(newText);
                jQuery(this).addClass('option-section');
            };
        });
    });


//--Reposition dropdowns that are too wide so they are centered
    function centerDropdowns() {
        jQuery('nav > div > ul#menuElem > li').each(function() {
            var dropdownWidth = jQuery(this).children('ul').outerWidth();
            var buttonWidth = jQuery(this).outerWidth();
            var widthDifference = dropdownWidth - buttonWidth;
            if (widthDifference > 0) {
                var margin = Math.round(widthDifference / 2);
                jQuery(this).children('ul').css('left','-'+margin+'px');
            };
        });
    };
    jQuery(function() { centerDropdowns(); });
    jQuery(window).resize(function() { centerDropdowns(); });

//--Remove empty next/prev links
    jQuery(function() {
        jQuery('.next-left, .next-right').each(function() {
            var url = jQuery(this).children('a').attr('href');
            if (url == "/") {
                jQuery(this).remove();
            };
        });
    });