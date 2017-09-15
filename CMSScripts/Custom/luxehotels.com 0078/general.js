// JavaScript Document
var $ = jQuery.noConflict();

jQuery(document).ready(function ($) {
    // Form Datepicker
    $(".FormPanel .formDatepicker").datepicker({
        minDate: ('+0D')
    });
    $(".FormPanel .formDatepicker").prop("readonly", true);
  
    // Form Datepicker (Start Date)
    $(".FormPanel .formDatepickerFrom").datepicker({
        minDate: ('+0D'),
        onClose: function( selectedDate ) {
            jQuery(".FormPanel .formDatepickerTo").datepicker( "option", "minDate", selectedDate );
        }
    });
    $(".FormPanel .formDatepickerFrom").prop("readonly", true);
  
    // Form Datepicker (End Date)
    $(".FormPanel .formDatepickerTo").datepicker({
        minDate: ('+0D'),
        onClose: function( selectedDate ) {
            jQuery(".FormPanel .formDatepickerFrom").datepicker( "option", "maxDate", selectedDate );
        }
    });
    $(".FormPanel .formDatepickerTo").prop("readonly", true);
    
    
    $(".selectbox").selectbox({
        hide_duplicate_option: true
    });

    /*$(".btn-check").click(function () {
        if ($(window).width() <= 767) {
            $(".select-option-mobile").slideToggle();
        }
    });*/
    
    $("nav > ul").addClass("main-nav enumenu_ul menu");
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


jQuery(document).load(function ($) {
    var getViewportHeight = function () {
        var height = 0;
        children = slider.children;
        height = jQuery(slider.children[0]).height();;
        return height;
    }
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


    /* -- homepage 6 boxes img -- */
    $('.hotel-rooms-offer li').each(function () {
        $(this).find('img').addClass('bannerimage');
        var imgSrc = $(this).find('.bannerimage').attr('src');
        imgSrc = "url(" + imgSrc + ")";
        $(this).css("background-image", imgSrc);
    });
  
    $('.swiper-container.rooms li').each(function () {
        $(this).find('img').addClass('bannerimage');
        var imgSrc = $(this).find('.bannerimage').attr('src');
        imgSrc = "url(" + imgSrc + ")";
        $(this).css("background-image", imgSrc);
    });
  
    $('.swiper-container.hotel-listing li').each(function () {
        $(this).find('img').addClass('bannerimage');
        var imgSrc = $(this).find('.bannerimage').attr('src');
        imgSrc = "url(" + imgSrc + ")";
        $(this).css("background-image", imgSrc);
    });

});

jQuery(document).ready(function ($) {
    if (jQuery('.bxslider li').length > 1) {
      $('.bxslider').bxSlider({
          slideMargin: 0,
          auto: true,
          pause: 4500,
          touchEnabled: false,
          mode: 'fade',
          controls: true
      });
    } else {
      $('.bxslider').bxSlider({
          slideMargin: 0,
          auto: false,
          touchEnabled: false,
          controls: false
      });
    };
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

$(window).resize(function () {
    var tweetheight = $("header").height();
    $('a.down_arrow[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - tweetheight
        }, 900, 'swing');
    });
});

equalheight = function (container) {
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function () {

        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}

$(document).ready(function () {
    $('input,textarea').placeholder();
    /*
    $("input[name='phone']").keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            //display error message
            return false;
        }
    });
    */
});


$(window).load(function () {
    $('.book-now-main h3').click(function () {
        if ($(window).width() <= 767) {
            $('.select-option').toggle('slow');
        }
    });
    $('body').on('click touchstart', function(e) {
        var container = $(".book-now-main");
        
        //console.log(container.has(e.target).length + ' | ' + dateContainer.has(e.target).length + ' | ' + jQuery(e.target).attr('class'));
        
        if (!container.is(e.target) && container.has(e.target).length === 0){
          
            // Don't close if datepicker
            var ele = jQuery(e.target);
            if (jQuery(ele).attr('class') !== undefined) { var eleClass = jQuery(ele).attr('class'); } else { var eleClass = ''; };
            if (eleClass.indexOf('ui-') == -1) {
                if ($(window).width() <= 767) {
                    $(".select-option").slideUp();
                }
            }
        }
    });
});
$(window).resize(function(){
    if ($(window).width() > 767) {
        $(".select-option").removeAttr("style");
    }
});

//--Top bar sizing || Header Bar //

jQuery(function() {
  function barHeight() {
    var barHeight = jQuery('.header-fixed').outerHeight();
    jQuery('.hotel-caption').css('marginTop',barHeight+'px');
    jQuery('.banner').css('marginTop',barHeight+'px');
    // Photo Gallery
    if (jQuery('#galleria-wrap').length > 0) {
        jQuery('#galleria-wrap').css('paddingTop',barHeight+'px');
        jQuery('#galleria-wrap').height((jQuery(window).innerHeight - barHeight)+'px');
    };
  };
  jQuery(function() {
    barHeight();
  });
  jQuery(window).load(function() { // Late font load fallback
    barHeight();
  });
  jQuery(window).resize(function() {
    barHeight();
  });
});

// Specials Rotation
jQuery(document).ready(function ($) {
  var swiper = new Swiper('.swiper-container.specials', {
      autoHeight: true,
      slidesPerView: 1,
      spaceBetween: 0,
      direction: 'horizontal',
      loop: true,
      autoplay: 6000,
      speed: 600,
      autoplayDisableOnInteraction: false,
      preventClicks: false, 
      preventClicksPropagation: false, 
  });
});

// Rooms Subnav
jQuery(document).ready(function ($) {
  var swiper = new Swiper('.swiper-container.rooms', {
      //pagination: '.swiper-pagination',
      //paginationClickable: true,
      slidesPerView: 4,
      spaceBetween: 0,
      loop: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      //autoplay: 4000,
      autoplayDisableOnInteraction: false,
      preventClicks: false, 
      preventClicksPropagation: false, 
      breakpoints: {
          1000: {
              slidesPerView: 3,
              spaceBetween: 0
          },
          640: {
              slidesPerView: 2,
              spaceBetween: 0
          },
          450: {
              slidesPerView: 1,
              spaceBetween: 0
          }
      }
  });
});

// Hotels Subnav
jQuery(document).ready(function ($) {
  var swiper = new Swiper('.swiper-container.hotel-listing', {
      //pagination: '.swiper-pagination',
      //paginationClickable: true,
      slidesPerView: 3,
      spaceBetween: 0,
      loop: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      //autoplay: 4000,
      autoplayDisableOnInteraction: false,
      preventClicks: false, 
      preventClicksPropagation: false, 
      breakpoints: {
          970: {
              slidesPerView: 2,
              spaceBetween: 0
          },
          680: {
              slidesPerView: 1,
              spaceBetween: 0
          }
      }
  });
});

// General Subnav - Adjust boxes so that they fit appropriately if they won't fit 3 across
jQuery(function() {
    var slides = jQuery('.hotel-rooms-offer > ul > li'),
        numOfSlides = slides.length,
        numOfExtraSlides = 0;
    
    // If only 1 boxes, add class and end function
    if (numOfSlides === 1) {
        slides.addClass('one-col');
        return false;
    };
    
    // If only 2 boxes, add class and end function
    if (numOfSlides === 2) {
        slides.addClass('two-col');
        return false;
    };
    
    // If more than 2 boxes, do all this stuff
    if (numOfSlides > 2) {
        var fullRows = (Math.floor(numOfSlides / 3) * 3);
        numOfExtraSlides = numOfSlides - fullRows;
    };

    if (numOfExtraSlides === 1) {
        // Last row has one box
        if (numOfSlides === 1) {
            // If there's only one box, just center it
            slides.last().addClass('one-col');
        } else {
            // If more than 3 boxes, take the last 4 and make them 50% width for a more even layout
            slides.slice((numOfSlides - 4), numOfSlides).addClass('two-col');
        };
    };

    if (numOfExtraSlides === 2) {
        // Last row has two boxes, so make them both 50% width
        slides.last().prev('li').andSelf().addClass('two-col');
    };
});

// Take the footer links and divide them into three separate columns
jQuery(function() {
    var numOfLists = 3,
        list = jQuery('.footer-links > ul'),
        listLength = list.find("li").size(),
        numInRow = Math.ceil(listLength / numOfLists);

    for (var i=0;i<numOfLists;i++){
        var listItems = list.find("li").slice(0, numInRow),
            newList = jQuery('<ul class="footer-link-box" />').append(listItems);
        jQuery(".footer-links").append(newList);
    };
    jQuery('.footer-links > ul#menuElem').remove();
});


// Email Form in Footer
jQuery(function() {
    var emailForm = jQuery('.email-container .email-form'),
        nameField = emailForm.find('input[name="name"]'),
        emailField = emailForm.find('input[name="email"]');
    // Submit functions
    function submitEmailForm(name, email) {
        if (name.length === 0) {
            alert("Please enter a name.");
            return false;
        };
        
        if (email.length === 0 || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        };
        
        var nameSplit = name.split(' ');
            first = nameSplit[0],
            last = nameSplit[1];
        
        if (last === undefined) {
            last = "";
        };
        
        document.location.href = ('/stayconnected/?first=' + first + '&last=' + last + '&em=' + email);
    };
    emailField.on('focus', function() {
        jQuery(document.body).delegate('input:text', 'keypress', function(e) {
            if (e.which === 13) {
                e.preventDefault();
                submitEmailForm(nameField.val(), emailField.val());
            };
        });
    });
    emailForm.find('button.common-btn').on('click', function(e) {
        e.preventDefault();
        submitEmailForm(nameField.val(), emailField.val());
    });
});

//--Blog Sidebar
    jQuery('.blogMoreBtn').click(function() {
        jQuery('.zoneLeft').fadeIn('slow');
    });
    jQuery('.blogCloseBtn').click(function() {
        jQuery('.zoneLeft').fadeOut('slow');
    });

//--Blog - Make box heights match
    function matchBoxHeights() {
        var highestBox = 0,
            elements = jQuery('.blogPost'),
            numInRow = 3;

        // Adjust number in rows
        if (jQuery(document).width() <= 650) {
          numInRow = 1;
        } else if (jQuery(document).width() <= 1500) {
          numInRow = 2;
        };

        // Loop through and make the rows match to the highest height
        for(var i = 0; i < elements.length; i+=numInRow) {
            highestBox = 0;
            var theseElements = elements.slice(i, i+numInRow);
            theseElements.height('auto');

            theseElements.each(function() {
                if (jQuery(this).height() > highestBox) {  
                    highestBox = jQuery(this).height();
                };
            });
            //console.log('Elements ' + i + ' through ' + (i + numInRow) + ' - ' + highestBox + 'px');
            theseElements.height(highestBox);
        };
    };
    jQuery(function(){ matchBoxHeights(); });
    jQuery(window).resize(function() { matchBoxHeights(); });

//--Remove extra divider from breadcrumb navigation if necessary (for some thank-you pages)
  jQuery(function() {
    var breadcrumbNav = jQuery('.midd-top-container .breadcrumb');
        
        if (breadcrumbNav.length > 0) {
            var breadcrumbText = breadcrumbNav.html(),
                breadcrumbLastChars = breadcrumbText.slice((breadcrumbText.length -3), breadcrumbText.length);
    
            if (breadcrumbLastChars.indexOf('|') > -1) {
                // Replace the divider and plug the HTML back in
                var beginningString = breadcrumbText.slice(0, (breadcrumbText.length - 3)),
                    endString = breadcrumbLastChars.replace('|','');
    
                breadcrumbNav.html(beginningString + endString);
            };
        };
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