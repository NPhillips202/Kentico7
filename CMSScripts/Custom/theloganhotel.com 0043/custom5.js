jQuery( document ).ready(function() {
  
//scripts conflicting on home page placed in this seperate file
  
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
  jQuery('footer #footerWrapper #footerBottom .footer-nav ul').append('<li><a href="#" class="sitemap-toggle sitemap-toggle-photo">Site Map</a></li>');

  
//Booking Mask sticky header
   var wrap = jQuery('#wrap');
      wrap.on('scroll', function (e) {
          if (this.scrollTop > 510 {
              wrap.addClass('fix-booking');
          } else {
              wrap.removeClass('fix-booking');
          }
      });
      //# sourceURL=pen.js

//Top navigation sticky header
     var wrap = jQuery('#wrap');
      wrap.on('scroll', function (e) {
          if (this.scrollTop > 30) {
              wrap.addClass('fix-topNavigation');
          } else {
              wrap.removeClass('fix-topNavigation');
          }
      });
      //# sourceURL=pen.js

//mobile menu
    //if less that 767 slideup menu
             if (jQuery(document).width() < 767) {
				  //jQuery(".inside-content02").removeAttr('style');  
				   jQuery(".inside-content02").css('display', '')
				  
             } else {
                 //else show menu with sticky vertical scroll	 
                 var wrap = jQuery('#wrap');
                 wrap.on('scroll', function(e) {
                     if (this.scrollTop > 30) {
                         wrap.addClass('fix-topMenu');
                         jQuery(this).next('.inside-content02').slideToggle('');
                         jQuery(this).toggleClass('active');
                         jQuery(".inside-content02").not(jQuery(this).next()).slideUp('');
                         jQuery(".inside-content02").not(jQuery(this).next()).prev()
                             .removeClass('active');
                     } else {
                         wrap.removeClass('fix-topMenu');
                         jQuery(".inside-content02").not(jQuery(this).next()).slideDown( '');
                         jQuery(".inside-content02").not(jQuery(this).next()).prev()
                             .addClass('active');
                     }
                 });
                 //# sourceURL=pen.js
             }

//browser resize when menu closed
            function checkWidth() {
                if (jQuery(window).width() < 767) {
                    jQuery('#navigaton .faq-div h2').addClass('active2');
                } else {
                    jQuery('#navigaton .faq-div h2').removeClass('active2');
                }
            }
            jQuery(window).resize(checkWidth);

//Select Box
    jQuery('select').selectBox();
    
//Taps for Tablets    
     jQuery('.circular.taphover').on('touchstart', function (e) {
        'use strict'; //satisfy code inspectors
        var link = $(this); //preselect the link
        if (link.hasClass('hover')) {
            return true;
        } else {
            link.addClass('hover');
            jQuery('.circular.taphover').not(this).removeClass('hover');
            e.preventDefault();
            return false; //extra, and to make sure the function has consistent return points
        }
    });
    
    
}); //End Of Document ready



   jQuery(document).ready(function() {
	 jQuery('.popup-youtube').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
})
     
     
     
  //change the content height for art page
  var mq = window.matchMedia("(max-width:915px)");
  if(mq.matches){
    var res = jQuery("#artcontentPara").text().length;
    
   
    console.log(res);
    console.log("Matches");
   }else{
     console.log("Dont matches");
     }  

//Getting the width of images on art page 
jQuery(function(){
  //loop through  all images on page
  jQuery(".right > span.artimage").each(function(){
    var  imageWidth = jQuery(this).width();
    console.log(imageWidth);
      if(imageWidth <= 170){
        //jQuery(".right > span.artimage img").css({
         // "right":"93px"
         // "position":"absolute"
          });
       }
         // jQuery(".right > span.artcontent").css("right" , "98px");
     });
 });

//bxSlider
jQuery( document ).ready(function() {
if(jQuery('.bxslider').length) {
  jQuery('.bxslider').bxSlider({
  		mode: 'fade',
  		auto: true,
  		autoControls: false,
         pause: 8000,
  		pager: false,
          speed: 1000,
          //speed: 5000,
  		nextText: '<img src="https://www.theloganhotel.com/Theloganhotel.com-0043-2015Redesign/media/theloganhotel.com-0043/graphics/left-arrow.png" height="52" width="24"/>',
          prevText: '<img src="/Theloganhotel.com-0043-2015Redesign/media/theloganhotel.com-0043/graphics/right-arrow.png" height="52" width="24"/>'
	});
}
 });                                                 
                                                    