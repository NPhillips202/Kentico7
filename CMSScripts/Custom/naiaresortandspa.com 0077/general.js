var $ = jQuery.noConflict();
 

jQuery(window).load(function() {
	 jQuery(".wrapper").css('opacity','1');
 });
 
 // Cal height of div
var calcContainerHeight = function(){
    jQuery('body').height(jQuery(window).height());
    //jQuery('#background_cycler').hide();//comment
    jQuery('.midd-container').height(jQuery(window).height());
    jQuery('.left-container').height(jQuery(window).height());
    jQuery('.right-container').height(jQuery(window).height()).css('padding-bottom', jQuery('footer').outerHeight() + 30);
    //jQuery('.right-container').css('padding-bottom', jQuery('footer').outerHeight() + 30);
    var demoheight = jQuery(window).height() - jQuery('header').height() - jQuery('footer').height() - 30;
    jQuery(".logo-container").css("height", demoheight);
};

jQuery(document).ready(function() { calcContainerHeight(); });
jQuery( window ).resize(function() { calcContainerHeight(); });

// body slider img

function cycleImages(){
      var $active = jQuery('#background_cycler .active');
      var $next = (jQuery('#background_cycler .active').next().length > 0) ? jQuery('#background_cycler .active').next() : jQuery('#background_cycler div:first');
      $next.css('z-index',2);//move the next image up the pile
	  $active.fadeOut(1500,function(){//fade out the top image
	  $active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
      $next.css('z-index',3).addClass('active');//make the next image the top one
      });
    }

    jQuery(window).load(function(){
		jQuery('#background_cycler').fadeIn(1500);
		  // run every 7s
		  setInterval('cycleImages()', 7000);
    })


jQuery(document).ready(function() {
	jQuery('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		//removalDelay: 250,
		midClick: true,
		mainClass: 'my-mfp-zoom-in',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
			}
		}
	});
});

jQuery(document).ready(function(){
 var getImageSrc = jQuery('.imageDiv img').attr('src');
 jQuery('.img-1').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv').remove();
 
  var getImageSrc = jQuery('.imageDiv1 img').attr('src');
 jQuery('.img-2').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv1').remove();

  var getImageSrc = jQuery('.imageDiv2 img').attr('src');
 jQuery('.img-3').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv2').remove();
 
   var getImageSrc = jQuery('.imageDiv3 img').attr('src');
 jQuery('.img-4').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv3').remove();
 
   var getImageSrc = jQuery('.imageDiv4 img').attr('src');
 jQuery('.img-5').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv4').remove();
 
   var getImageSrc = jQuery('.imageDiv5 img').attr('src');
 jQuery('.img-6').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv5').remove();
 
   var getImageSrc = jQuery('.imageDiv6 img').attr('src');
 jQuery('.img-7').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv6').remove();
 
   var getImageSrc = jQuery('.imageDiv7 img').attr('src');
 jQuery('.img-8').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv7').remove();
 
   var getImageSrc = jQuery('.imageDiv8 img').attr('src');
 jQuery('.img-9').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv8').remove();
 
});

jQuery('.main-nav li').click(function() {
	jQuery('.main-nav li.active').removeClass('active');
    jQuery(this).addClass('active');
})

jQuery("body").on("click",".mfp-outer-title .next",function(){
    jQuery(".mfp-arrow-right").trigger("click")
})

jQuery("body").on("click",".mfp-outer-title .prev",function(){
    jQuery(".mfp-arrow-left").trigger("click")
})




jQuery(window).load(function() {
 jQuery("#status").fadeOut();
 jQuery("#loader").delay(100).fadeOut("slow");
    jQuery("body").css('opacity','1');
})