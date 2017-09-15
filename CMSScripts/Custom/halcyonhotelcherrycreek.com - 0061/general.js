// JavaScript Document
var $ = jQuery.noConflict();

jQuery(document).ready(function($){
  
    $(".FormPanel .datepicker").datepicker({
		//buttonImage: "/Halcyonhotelcherrycreek.com-0061-2015Redesign/media/halcyonhotelcherrycreek.com-0061/layout/calendar-icon.png",
		//buttonImageOnly: true,
        //showOn: 'both'
	});
    
	$(".selectbox").selectbox({
        hide_duplicate_option: true
    });
	
	$(".btn-2").click(function() {
        if($(window).width() <= 767) {
            $(".select-option-mobile").slideToggle();
        }
    });

	$(".reservation-icon a").click(function(e) {
        e.preventDefault();
        $(".reservation-mobile").slideToggle();
    });
    
    $("nav > ul").addClass("main-nav enumenu_ul menu");

	/*$(".main-menu").click(function(e) {
        e.preventDefault();
		$(this).toggleClass('active');
		$(".header-right").animate({
          'width': 'toggle',
         });
      
    });*/

  
 jQuery(".main-menu").click(function(e) {
        e.preventDefault();
		jQuery(this).toggleClass('active');
		jQuery(".header-right").animate({
          'width': 'toggle',
          'opacity':'toggle'
         },400,'linear',function(){
         
           });
      
    });
	
   jQuery('.enumenu_ul').responsiveMenu({
        'menuIcon_text': 'Menu',
        menuslide_overlap: true,
        menuslide_direction: 'left',
        onMenuopen: function() {}
    });
});

jQuery(window).load(function() {
     jQuery("body").css('opacity','1');
 });
 


 
var maxHeight = 0;

$(document).ready(function () {
$(".banner_room_info").each(function(){
   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
});
$(".banner_room_info").height(maxHeight);
});

$(window).resize(function() {
	
maxHeight = 0;
$(".banner_room_info").removeAttr("style");
$(".banner_room_info").each(function(){
   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
});
$(".banner_room_info").height(maxHeight);
});
 

$(document).ready(function () {

 $('.bxslider li').each(function () {
	  $(this).find('img').addClass('bannerimage');
	  var imgSrc = $(this).find('.bannerimage').attr('src');
	  imgSrc = "url(" + imgSrc + ")";
	  $(this).css("background-image", imgSrc);
 });
 
  $('.bxslider2 li').each(function () {
	  $(this).find('img').addClass('bannerimage');
	  var imgSrc = $(this).find('.bannerimage').attr('src');
	  imgSrc = "url(" + imgSrc + ")";
	  $(this).css("background-image", imgSrc);
 });
 
   $('.bxslider3 li').each(function () {
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
 

 
var getImageSrc = $('.imageDiv img').attr('src');
$('.comfort_img_1').css('background-image', 'url(' + getImageSrc + ')');
$('.imageDiv').remove();

 var getImageSrc2 = $('.imageDiv2 img').attr('src');
$('.comfort-bottom-image').css('background-image', 'url(' + getImageSrc2+ ')');
$('.imageDiv2').remove();
 
}); 
 
 
  
jQuery(document).ready(function(jQuery){
	jQuery('.bxslider').bxSlider({
        slideMargin:0,
        auto: true,
        pause: 5500,
        touchEnabled: false,
        mode: 'fade',
        
        //controls: true,
        //nextSelector: '#slider-next',
        //prevSelector: '#slider-prev'
    });
    // .roomsslider-wrapper
    if(jQuery('.bxslider').is('.roomsslider')){
        jQuery('.bxslider').closest('.bx-wrapper').addClass('roomsslider-wrapper');
    }
	jQuery('.bxslider2').bxSlider({
        slideMargin:0,
        auto: true,
        pause: 5500,
        touchEnabled: false,
        mode: 'fade'
    });
	jQuery('.bxslider3').bxSlider({
        infiniteLoop: true,
        pause: 5500,
        mode: 'fade',
        auto: true, /*false*/
        hyperlinks:true,
        autoHover:'true',
        captions:'true'
    });


 var getImageSrc1 = $('.imageDiv_1 img').attr('src');
     $('.headline-middle').css('background-image', 'url(' + getImageSrc1 + ')');
   $('.imageDiv_1').remove();
   
 var getImageSrc2 = $('.imageDiv_2 img').attr('src');
     $('.bottom-img1').css('background-image', 'url(' + getImageSrc2 + ')');
   $('.imageDiv_2').remove();
   
    var getImageSrc3 = $('.imageDiv_3 img').attr('src');
     $('.headline-bottom-img').css('background-image', 'url(' + getImageSrc3 + ')');
   $('.imageDiv_3').remove();
   
   
    var getImageSrc4 = $('.imageDiv_4 img').attr('src');
     $('.accommodations.accommodations-banner').css('background-image', 'url(' + getImageSrc4 + ')');
   $('.imageDiv_4').remove();
   
 var getImageSrc5 = $('.imageDiv_5 img').attr('src');
     $('.accommodations.comfort-home').css('background-image', 'url(' + getImageSrc5 + ')');
   $('.imageDiv_5').remove();

});

   
var tweetheight = $("header").height();  
$(document).ready(function(){
$('a.down_arrow[href^="#"]').on('click',function (e) {
 e.preventDefault();
 var target = this.hash;
 var $target = $(target);
 /*$('html, body').stop().animate({
   'scrollTop': $target.offset().top - tweetheight
 }, 900, 'swing');
 });*/
}); 
  
$(window).resize(function() {
var tweetheight = $("header").height();  
 $('a.down_arrow[href^="#"]').on('click',function (e) {
 e.preventDefault();
 var target = this.hash;
 var $target = $(target);
 /*$('html, body').stop().animate({
   'scrollTop': $target.offset().top - tweetheight
 }, 900, 'swing');*/
 
 
 
 
 });
 
 
 
});


$(document).ready(function() {
        //Horizontal Tab
        $('#parentHorizontalTab').easyResponsiveTabs(
		{
            type: 'vertical', //Types: default, vertical, accordion
            width: 'auto', //auto or any width like 600px
            fit: true, // 100% fit in a container
            tabidentify: 'hor_1', // The tab groups identifier
            activate: function(event) { // Callback function if tab is switched
                var $tab = $(this);
                var $info = $('#nested-tabInfo');
                var $name = $('span', $info);
                $name.text($tab.text());
                $info.show();
            }
			
        });
    });
	
//Placeholder
jQuery(document).ready(function(){
//jQuery('input,textarea').placeholder();
});
 


//--Top bar sizing
jQuery(function() {
	function barHeight() {
		var barHeight = jQuery('.header_top').outerHeight();
		jQuery('#eventsrfp').css('marginTop',barHeight+'px');
	};
	jQuery(function() {
		barHeight();
	});
	jQuery(window).resize(function() {
		barHeight();
	});
});

//-- Site Map
jQuery(function() {
    jQuery('*').click(function(e) {
        var target = jQuery(e.target);
        if (target.hasClass('sitemap-toggle')) {
            e.preventDefault();
            e.stopPropagation();
            if (jQuery('.sitemap-float').is(':visible')) {
                jQuery(".sitemap-float").fadeOut(500);
            } else {
                jQuery(".sitemap-float").fadeIn(500);
            };
        } else {
            if (jQuery('.sitemap-float').is(':visible') && !target.hasClass('sitemap-float') && !jQuery('.sitemap-float').has(target).length > 0) {
                if (!target.hasClass('.sitemap-float')) {
                    jQuery('.sitemap-float').fadeOut(500);
                };
            };
        };
    });
});  
//-- Site Map Position
//jQuery('footer .copy-right .main .right ul').append('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
jQuery('.ftr-btm-nav ul').append('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
//  Sitemap ENDS 





 


/*open booking when reservation click */
/*
jQuery(".has-children").mouseenter(function(){
 jQuery(".sub-menu,.bookingMask").toggleClass("flipMaskDown");
 jQuery(".sub-menu,.bookingMask").toggleClass("flipMask");
 jQuery(".reserv_now_area").toggleClass("shownow");
});
*/

jQuery('.main-link').click( function(){
    if ( jQuery(this).hasClass('has-children') ) {
        jQuery(this).removeClass('has-children');
       jQuery(".closeBooking").css("display","none");
        
    } else {
        jQuery('.has-children').removeClass('has-children');
       jQuery(this).addClass('has-children');  
       jQuery(".closeBooking").css("display","inline-block");
    }
});


$(".reserv_now_area").click(function(){
    $('.has-children').removeClass('has-children');
})

/*
$(".reserv_now_area").click(function(){
    $('.has-children').removeClass('has-children');
})
*/
/*close booking mask */
  jQuery('.closebtn').click( function(){
    //jQuery(".reserv_now_area").css("display","none");
    if ( jQuery(".main-link").hasClass('has-children') ) {
        jQuery(".main-link").removeClass('has-children');
    } else {
        jQuery('.has-children').removeClass('has-children');
       jQuery(this).addClass('has-children');  
      
    }
    
    
$(".reserv_now_area").click(function(){
    $('.has-children').removeClass('has-children');
})
});
  
  
  
  
jQuery(".closebtn").click(function(){
  // jQuery(".reserv_now_area").addClass("bkClose");
  /*if ( jQuery(this).hasClass('has-children') ) {
        jQuery(this).removeClass('has-children');
    } else {
        jQuery('.has-children').removeClass('has-children');
       jQuery(this).addClass('has-children');    
    }*/
  
   // jQuery(".closebtn").css("display","none");
// jQuery(".reserv_now_area").css("display","none");
  });






/*The X button on the booking Mask to close it */
jQuery(".closeBooking").click(function(){
   // if ( jQuery(".main-link").hasClass('has-children') ) {
       // jQuery(".main-link").removeClass('has-children');
  // };
});



//jQuery('.closeBooking').click( function(){
    //if ( jQuery(".main-link").hasClass('has-children') ) {
      //  jQuery(".main-link").removeClass('has-children');
       // jQuery(".closeBooking").css("display","none");
        
   // } ;
//});

// Email Signup Submit functions
var submitEmailForm = function(input, value) {
	var email = input.val();
  console.log(email);
	if (email == value || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
		alert("Please enter a valid email address.");
		//form.find('.emailSignUp').focus();
		input.css( "border", "1px solid red" ).focus();
		return false;
	}
	//document.location.href = ('/rest-(1)/email-sign-up-(1)/?em=' + email ');
 //document.location.href = ('/rest/email-sign-up/?mock=true&em=' + email ');
 //document.location.href = ('/rest/email-sign-up/?&em=' + email ');
 document.location.href = ('/hotel/email-sign-up/?&em=' + email ');                          
 
  
};
	
// Email Form in Footer
    var emailForm = jQuery('.email-wrap');
    var emailInput = emailForm.find('.email');
    var emailSubmit = emailForm.find('.submit');
    var defaultValue = "Enter Your Email";


// Clear text in field when focused
	emailForm.find('.email').on('focus blur', function(e){
		if (e.type == 'focus'){
			//alert(e.type);
			if (jQuery(this).val() == defaultValue) {
				jQuery(this).val('');
			};
			jQuery(document.body).delegate('input:text', 'keypress', function(e) {
				if (e.which === 13) {
					e.preventDefault();
					emailInput = jQuery(this);
					submitEmailForm(emailInput, defaultValue);
					//submitEmailForm();
				};
			});
		} else if (e.type == 'blur'){
			//alert(e.type);
			if (jQuery(this).val() == '') {
				jQuery(this).val(defaultValue);
			};
		}
	});	
	/*
	emailForm.find('.email').on({
		focus: function(e) {
			if (jQuery(this).val() == defaultValue) {
				jQuery(this).val('');
			};
			jQuery(document.body).delegate('input:text', 'keypress', function(e) {
				if (e.which === 13) {
					e.preventDefault();
					submitEmailForm(emailForm, defaultValue);
					//submitEmailForm();
				};
			});
		},
		blur: function(e) {
			if (jQuery(this).val() == '') {
				jQuery(this).val(defaultValue);
			};
		},
	});
	*/
	
	emailSubmit.on('click', function(e) {
		e.preventDefault();
		emailInput = jQuery(this).prev();
        submitEmailForm(emailInput, defaultValue);
		//submitEmailForm(emailInput, defaultValue);
		//submitEmailForm();
	});




// TEMP - USE FOR THE PURPOSE TO LOAD MOCK FILES ONLY!!!!!

// get query string
var getQuery = function(q) {
	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
};

  //THIS COMMENT OUT ON 10/26/16 TO GO LIVE
 
if(getQuery('mock') == 'true' ) {
console.log("this is the mock");
 jQuery('header a:not(.resvBtnLink,.resvBtnLink2,.clsBk),.ftr-btm-nav a, .sitemap-content a').each(function(index,value){
   console.log($(this).attr('href',jQuery(this).attr('href') + '?mock=true'));
   });
  


  
}

}); 


//check for navigation time API support
/*
if(window.performance)

{

if(performance.navigation.type  == 1 )
          {
            console.log('page reloaded');
                  if (jQuery('.logo').hasClass('wow')) {
                    console.log('found');
                  jQuery(this).removeClass('wow');
                  jQuery(this).removeAttr('style');
                jQuery('.logo').css("visibility","visible !important;");
                 new WOW().init();
              }
           }
          
}*/

// script to trigger and show hidden menu on wedding menu page for mobile
  
//show the plated dinner 
      jQuery(document).ready(function(){
console.log("Will run now");
//var hiddenBtn = document.getElementById("#show-dinner");
jQuery("#show-plated-dinner").on("click", function(e){
	e.preventDefault();
	//alert("Button click ");
    console.log("Plated Button click");
    console.log(" Hide Buffet Dinner");
   jQuery(".wedding-menu-right").hide();
    jQuery(".wedding-menu-left").slideToggle();
//jQuery(".wedding-menu-section2,.wedding-menu-left").slideToggle();
    jQuery(window).resize(function(){location.reload();});
return false;
  
});

});
  
//show the buffet dinner
    jQuery(document).ready(function(){
//console.log("Will run now");
//var hiddenBtn = document.getElementById("#show-dinner");
jQuery("#show-buffet-dinner").on("click", function(e){
	e.preventDefault();
	//alert("Button click ");
    console.log("Buffet Button click");
    console.log(" Hide Plated Dinner");
   jQuery(".wedding-menu-left").hide();
  jQuery(".wedding-menu-right").slideToggle();
  //jQuery(".wedding-menu-section2,.wedding-menu-right").slideToggle();
jQuery(window).resize(function(){location.reload();});
return false;
  
});

});
  

  /* ########## FAQ Accordion ########## */
    jQuery( function() {
         var i = 0;
      jQuery("#accordion > div").each(function () {
          if(i==0) {
            jQuery(this).accordion({ header: "h2", heightStyle: "content", autoHeight: false, collapsible: true, active: false}); 
          }else {
            jQuery(this).accordion({ header: "h2", heightStyle: "content", autoHeight: false, collapsible: true, active: false});
          }
          i++;
      });
  });

  
	
//jQuery(window).resize(function(){location.reload();});
   