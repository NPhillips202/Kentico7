//jQuery Cycle//
    jQuery(document).ready(function(){
        jQuery('#slideshow').cycle({ 
            fx: 'fade', 
            slideResize: false,
            speed:    2000, 
            timeout:  1000,
          	next: '.next', 
    		prev: '.prev' 
        });
    });
	
// Navigation //
//jQuery(document).ready(function() {
//	jQuery('#mobileMenuBtn').click(function(e) {
	//		e.preventDefault(); 
	//	jQuery('#menuElem:visible').stop().fadeOut(800);
		
	//	jQuery('#menuElem').not(":visible").stop().fadeIn(800);
//	});
//});

//Swiper//
jQuery(function(){
  var mySwiper = jQuery('.swiper-container').swiper({
    mode:'horizontal',
    autoplay:4000,
    speed:500,
    grabCursor:true,
    autoplayDisableOnInteraction:false,
        loop:true
  });
})

// Mobile Navigation //
jQuery('#mobileMenuBtn').toggle(function() {
    jQuery(this).parent().find("#menuElem").slideDown("800");
}, function() {
    jQuery(this).parent().find("#menuElem").slideUp("800");
});

// Sub Navigation //
jQuery(document).ready(function()
{
 jQuery('#pollSlider-button').click(function() {
    if(jQuery(this).css("margin-left") == "700px")
    {
        jQuery('.pollSlider').animate({"margin-left": '-=700'});
        jQuery('#pollSlider-button').animate({"margin-left": '-=700'});
		jQuery('#pollSlider-button').html('<span>Explore this section</span><i class="fa fa-angle-right"></i>');
		
    }
    else
    {
        jQuery('.pollSlider').animate({"margin-left": '+=700'});
        jQuery('#pollSlider-button').animate({"margin-left": '+=700'});
		jQuery('#pollSlider-button').html('<span>Close this section</span><i class="fa fa-angle-left"></i>');
    }
  });
 });     

//Site Map
jQuery(function() {
    jQuery(".sitemap-toggle").live('click',function(e) {
        e.preventDefault();
        if (jQuery('.sitemap-float').is(':visible')) {
            jQuery(".sitemap-float").fadeOut(500);
        } else {
            jQuery(".sitemap-float").fadeIn(500);
        };
    });
});

// Weather Widget //
jQuery(document).ready(function() {
  jQuery.simpleWeather({
    location: 'st. lucia, west indies',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
        html += '<li>/</li>';
       html += '<li>'+weather.alt.temp+'&deg;C</li></ul>';
      jQuery("#weather").html(html);
    },
    error: function(error) { 
      //jQuery("#weather").html('<p>'+error+'</p>');
    }
  });
});

//Fact Page //
jQuery('.open-close-toggle').on("click", function(){
    var jQueryarrows = jQuery(this).find("img");
    jQuery(this).next('.toggle-section').slideToggle(function(){
        jQueryarrows.toggle();
    });
});
jQuery(document).ready(function() {
 jQuery("#button, #buttonOne").click(function () {
     jQuery("#content, #contentOne").stop().slideToggle();
     return false;
 });
 });

// Remove Last Border in Nav //
//jQuery(document).ready(function() {
	//jQuery('.nav ul li').last().addClass('last');
//});
//jQuery(document).ready(function() {
	//jQuery('.subNav ul li').last().addClass('last');
//});

//Select Boxes//
jQuery(document).ready(function() {
		jQuery('.selectbox').selectbox();
	});
	


//Video Container//
jQuery(window).load(function(){
     jQuery('.video').click(function(){
            var video = '<div class="video-container"><iframe src="http://www.ladera.com/Paradise-Ridge-Video/"></iframe></div>';
            jQuery('.video').hide();
         jQuery('.tube').html(video);

        });
}); 