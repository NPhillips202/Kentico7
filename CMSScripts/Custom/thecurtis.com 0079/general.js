// JavaScript Document
var jQuery = jQuery.noConflict();

 jQuery(window).load(function() {
     jQuery("body").css('opacity','1');
 });

jQuery(document).ready(function() {
    jQuery("#datepicker").datepicker({});
    /*jQuery(".datepicker").datepicker({
          
        })*/
    jQuery("#datepicker").focus(function() {
        jQuery(this).addClass('view');
        /*setTimeout(function () {
                jQuery("#datepicker").datepicker("show")
            }, 10)*/
    });

    jQuery("#datepicker1").datepicker({

    });
    jQuery("#datepicker1").focus(function() {
        //.datepicker("show")
        jQuery("#datepicker1").addClass('view');
    });

    /*jQuery(".hasDatepicker, .ui-datepicker, .ui-datepicker-trigger").click(function (event) {
            event.stopPropagation();
        });*/

    jQuery("body").on("click touchstart", function(e) {

        //alert(jQuery(e.target).closest('div#ui-datepicker-div').length)
        if (jQuery(window).width() > 767) {
            if (jQuery(e.target).closest('div#ui-datepicker-div').length == 1) {} else {
                //jQuery('.ui-datepicker').hide();
                if (jQuery(window).width() > 767) {
                    jQuery('.datepicker').each(function() {
                        if (!jQuery(this).hasClass('view')) {
                            //jQuery('.ui-datepicker').hide();
                            jQuery('.datepicker').datepicker("hide");
                            jQuery('.datepicker').removeClass('view').blur();
                            jQuery('.selectbox').parent().focus();
                            //jQuery('.datepicker').blur();
                            // jQuery('.selectbox').focus();
                            //jQuery('.datepicker').removeClass('view')
                        }

                    });
                }
            }
        }
    });

    jQuery("#datepicker2").datepicker({

    });

    jQuery("#datepicker2").focus(function() {


        jQuery(this).addClass('view');
        setTimeout(function() {
            jQuery("#datepicker2").datepicker("show")
        }, 10)
    });

    jQuery("#datepicker3").datepicker({

    });
    jQuery("#datepicker3").focus(function() {
        jQuery("#datepicker3").datepicker("show").addClass('view');;
    });

    jQuery(".hasDatepicker, .ui-datepicker, .ui-datepicker-trigger").click(function(event) {
        event.stopPropagation();
    });

    jQuery("body").on("click touchstart", function(e) {

        //alert(jQuery(e.target).closest('div#ui-datepicker-div').length)
        if (jQuery(window).width() > 767) {
            if (jQuery(e.target).closest('div#ui-datepicker-div').length == 1) {} else {
                //jQuery('.ui-datepicker').hide();
                if (jQuery(window).width() > 767) {
                    jQuery('.datepicker').each(function() {
                        if (!jQuery(this).hasClass('view')) {
                            //jQuery('.ui-datepicker').hide();
                            jQuery('.datepicker').datepicker("hide");
                            jQuery('.datepicker').removeClass('view').blur();
                            jQuery('.selectbox').parent().focus();
                            //jQuery('.datepicker').blur();
                            // jQuery('.selectbox').focus();
                            //jQuery('.datepicker').removeClass('view')
                        }

                    });
                }
            }
        }
    });
    jQuery(".content-1").mCustomScrollbar({
        theme: "dark"
    });
    
    jQuery('.enumenu_ul').responsiveMenu({
        'menuIcon_text': '',
        'menuslide_overlap': true,
        'menuslide_direction': "left",
        onMenuopen: function() {}
    });
  
  /*Add book now to list
   jQuery(document).ready(function() {
  jQuery("#menuElem").append("<li class=''> <a href='#' title='BOOK-A-ROOM' class='book-btn'>book-a-room</a> </li>");
  });*/
 


    jQuery(".book-btn").click(function(e) {
        e.preventDefault();
        jQuery(".book-room-box").slideToggle()
    });

    jQuery(".btn-bookroom").click(function(e) {
        e.preventDefault();
        jQuery(".banner-bookroom").slideToggle()
    });

    jQuery(".selectbox").selectbox({
        hide_duplicate_option: true
    });
});
jQuery(window).load(equalHeight);
jQuery(window).resize(equalHeight);

function equalHeight() {
    if (jQuery(window).width() > 747) {
        jQuery(".mrg .auto-height").css("height", "auto");
        jQuery(".mrg").each(function() {
            jQuery(this).find(".col-4 .auto-height").height((jQuery(this).find(".col-8 .auto-height").height() / 2) - 1);
        })
    } else {
        jQuery(".mrg .auto-height").css("height", "auto");
    }
}

// Homepage booking mask - show when you scroll past the one in the slides
function showBookingMaskOnScroll() {
    if ((jQuery('.home-bookroom').length > 0) && (jQuery('.menu-icon').is(':hidden'))) {
        var bottomOfBookingMask = (jQuery('.home-bookroom').offset().top - 21) + jQuery('.home-bookroom').outerHeight(),
            windowScrollDistance = jQuery(window).scrollTop();

        if (windowScrollDistance >= bottomOfBookingMask) {
            // Show fixed booking mask
            jQuery('.book-top').fadeIn(300);
        } else {
            // Hide fixed booking mask
            jQuery('.book-top').fadeOut(300);
        }
    }
};
jQuery(window).scroll(function() {
    showBookingMaskOnScroll();
})
jQuery(window).resize(function() {
    showBookingMaskOnScroll();
})
  
 