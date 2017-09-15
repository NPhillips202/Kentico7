jQuery(document).ready(function() {
       jQuery("body").addClass('em');
});  
  
//after page load page display start here
jQuery(window).load(function() {
	 jQuery(".em .wrapper").css('opacity','1');
});
// after page load display end here
/*================== nav script sarts ===================*/
var $ = jQuery.noConflict();
jQuery(document).ready(function() {
    //$('input,textarea').placeholder();
    jQuery('.enumenu_ul').responsiveMenu({
        onMenuopen: function() {}
    });	
});
/*================== nav script ends ===================*/
//bxslider homepage banner start here
jQuery(document).ready(function(){
 jQuery('.bxslider').bxSlider({
	  auto:true,
  });
});
//bx slider homepage banner end here
//img to bg start here
var getImageSrc = jQuery('.banner1 .banner-image1 img').attr('src');
jQuery('.banner1').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.banner-image1').remove();
var getImageSrc = jQuery('.banner2 .banner-image2 img').attr('src');
jQuery('.banner2').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.banner-image2').remove();
var getImageSrc = jQuery('.banner3 .banner-image3 img').attr('src');
jQuery('.banner3').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.banner-image3').remove();

var getImageSrc = jQuery('this .info-image1 img').attr('src');
jQuery(this).css('background-image', 'url(' + getImageSrc + ')');
jQuery(this).remove();

/*var getImageSrc = jQuery('.infobanner1 .info-image1 img').attr('src');
jQuery('.infobanner1').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.info-image1').remove();
var getImageSrc = jQuery('.infobanner2 .info-image2 img').attr('src');
jQuery('.infobanner2').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.info-image2').remove();
var getImageSrc = jQuery('.infobanner3 .info-image3 img').attr('src');
jQuery('.infobanner3').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.info-image3').remove();
var getImageSrc = jQuery('.infobanner4 .info-image4 img').attr('src');
jQuery('.infobanner4').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.info-image4').remove();
var getImageSrc = jQuery('.infobanner5 .info-image5 img').attr('src');
jQuery('.infobanner5').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.info-image5').remove();
var getImageSrc = jQuery('.infobanner6 .info-image6 img').attr('src');
jQuery('.infobanner6').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.info-image6').remove();
*/

var getImageSrc = jQuery('this .divImage img').attr('src');
jQuery('this').css('background-image', 'url(' + getImageSrc + ')');
jQuery('this').remove();
/*
var getImageSrc = jQuery('.eventimage1 .divImage img').attr('src');
jQuery('.eventimage1').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.divImage').remove();
var getImageSrc = jQuery('.eventimage2 .divImage2 img').attr('src');
jQuery('.eventimage2').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.divImage2').remove();
var getImageSrc = jQuery('.eventimage3 .divImage3 img').attr('src');
jQuery('.eventimage3').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.divImage3').remove();
var getImageSrc = jQuery('.eventimage4 .divImage4 img').attr('src');
jQuery('.eventimage4').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.divImage4').remove();
var getImageSrc = jQuery('.eventimage5 .divImage5 img').attr('src');
jQuery('.eventimage5').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.divImage5').remove();
var getImageSrc = jQuery('.eventimage6 .divImage6 img').attr('src');
jQuery('.eventimage6').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.divImage6').remove();
var getImageSrc = jQuery('.inner-banner .inner-banner-1 img').attr('src');
jQuery('.inner-banner').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.inner-banner-1').remove();
var getImageSrc = jQuery(' .s5info-image .s5image img').attr('src');
jQuery('.section5 .s5info-image').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.s5image').remove();
var getImageSrc = jQuery('.s9info-image .s9image img').attr('src');
jQuery('.s9info-image').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.s9image').remove();
*/
//img to bg end here

//section 1 start here
            jQuery(document).ready(function() {
				
				var owl = jQuery('#owl-demo.owl-carousel');
              owl.owlCarousel({
                margin: 10,
                nav: true,
                loop: true,
                responsive: {
                  0: {
                    items:1,
					slideBy:1
                  },
                
				   480: {
                    items: 1,
					slideBy:1
					
                  },
				  600: {
                    items:1,
					slideBy: 1
					
                  },
                  1200: {
                    items: 1,
					slideBy:1
                  }
                }
              })
			  		
//section 1 start here				
				
//services start here
              var owl = jQuery('#owl-demo2 .owl-carousel');
              owl.owlCarousel({
                margin: 10,
                nav: true,
                loop: true,
                responsive: {
                  0: {
                    items:1,
					slideBy:1
                  },
                
				   481: {
                    items: 2,
					slideBy:2
					
                  },
				  600: {
                    items: 3,
					slideBy: 3
					
                  },
				   850: {
                    items: 3,
					slideBy: 3
					
                  },
                  1200: {
                    items: 4,
					slideBy:4
                  }
                }
              })
  //services end here
//logos area script start here
			  var owl = jQuery('#owl-demo3 .owl-carousel');
              owl.owlCarousel({
                margin: 10,
                nav: true,
                loop: true,
                responsive: {
                  0: {
                    items: 1,
					slideBy: 1
                  },
				     481: {
                    items: 2,
					slideBy:2
					
                  },
                  600: {
                    items: 2,
					slideBy:2
					
                  },
				     850: {
                    items: 3,
					slideBy: 3
					
                  },
                  1200: {
                    items: 5,
					slideBy: 5
                  }
                }
              })
            })
//logos area script end here



//home page box slider in mobile end here
//innerpage hide show start here
jQuery(document).ready(function(){
jQuery( ".fullview" ).click(function() {
  jQuery( ".s8info-cover" ).slideToggle("slow");
  jQuery(".fullview").toggleClass("open");
  });
  
  
  jQuery( "this" ).hover(function() {
  jQuery( ".desk-images this" ).fadeToggle("slow");
  jQuery(".showimage").toggleClass("showimage");  
  });
  
 /* 
jQuery( ".showimage2" ).hover(function() {
  jQuery( ".desk-images .eventimage2" ).fadeToggle("slow");
  jQuery(".showimage").toggleClass("showimage");  
  });
jQuery( ".showimage3" ).hover(function() {
  jQuery( ".desk-images .eventimage3" ).fadeToggle("slow");
  jQuery(".showimage").toggleClass("showimage");    
});
jQuery( ".showimage4" ).hover(function() {
  jQuery( ".desk-images .eventimage4" ).fadeToggle("slow");
  jQuery(".showimage").toggleClass("showimage");    
});
jQuery( ".showimage5" ).hover(function() {
  jQuery( ".desk-images .eventimage5" ).fadeToggle("slow");
  jQuery(".showimage").toggleClass("showimage");    
});
jQuery( ".showimage6" ).hover(function() {
  jQuery( ".desk-images .eventimage6" ).fadeToggle("slow");
  jQuery(".showimage").toggleClass("showimage");    
});*/
  
});
//inner page hide show end here
/*======================Custom selectbox script starts==============================*/	
jQuery(document).ready(function() {
	jQuery(".selectbox").selectbox({
       hide_duplicate_option: true
    });
});
/*======================Custom selectbox script ends==============================*/	
//index3 hover start here section10
jQuery('.s10-item').hover(function() {
    jQuery(this).find('.info1').slideDown();
}, function() {
    jQuery(this).find('.info1').slideUp();
});
//index3 hover end here section10

//banner mobile content start here
jQuery(".btn-go").click(function(){
    jQuery(".em .banner-area ul li").toggleClass("mobileslide");
}); 
//banner mobile content end here
//banner mobile content start here
jQuery(document).ready(function() {
jQuery(".open1").click(function(){
    jQuery(".b1").toggleClass("active");
}); 
jQuery(".open2").click(function(){
    jQuery(".b2").toggleClass("active");
});
jQuery(".open3").click(function(){
    jQuery(".b3").toggleClass("active");
});
jQuery(".open4").click(function(){
    jQuery(".b4").toggleClass("active");
}); 
jQuery(".open5").click(function(){
    jQuery(".b5").toggleClass("active");
});
jQuery(".open6").click(function(){
    jQuery(".b6").toggleClass("active");
});
});
//banner mobile content end here


/*==================== Accordion Style==============================================*/
function toggleIcon(e) {
   jQuery(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');
}
jQuery('.panel-group').on('hidden.bs.collapse', toggleIcon);
jQuery('.panel-group').on('shown.bs.collapse', toggleIcon);


/*==================== Filter Property==============================================*/
jQuery(function(){
  //check if united state is selected and show all US.
  jQuery("#unitedState").on("click",function(){
    jQuery(".property-type").show();
    console.log("United Stated Selected");
    jQuery(".property-type").not(".US").hide();
    });
  
    //check if canada is selected and show all CA.
  jQuery("#canada").on("click",function(){
    jQuery(".property-type").show();
    console.log("Canada Selected");
    jQuery(".property-type").not(".CA").hide();
    });
  
   //check if canada is selected and show all CA.
  jQuery("#restaurant").on("click",function(){
        console.log("alert111");
    jQuery(".property-type").show();
    console.log("Restaurant Selected");
    jQuery(".property-type").not(".Culinary").hide();
    });
  
    //check if marriott is selected and show all CA.
  jQuery("#myBrand").on("click",function(){
    console.log("alert");
      jQuery(".myBrandList").css("display","inline-block");
    console.log("alert");
    jQuery(".property-type").show();
    console.log("marriott Selected");
    jQuery(".property-type").not(".Mariott").hide();
    });
  
   //check if canada is selected and show all CA.
  jQuery("#all").on("click",function(){
    console.log("Show all property");
    jQuery(".property-type").show();
    });
  
  });

/*=================================SiteMap Script ====================================*/
jQuery( document ).ready(function() {

//  Sitemap STARTS 
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
 jQuery('.ftr-btm-nav ul').append('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
//  Sitemap ENDS 
  
  
  
 
}); //End Of Documenent ready


  