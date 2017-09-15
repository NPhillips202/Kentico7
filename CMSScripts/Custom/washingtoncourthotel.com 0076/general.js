// JavaScript Document
var jQuery = jQuery.noConflict();

jQuery(document).ready(function(jQuery){
	
	jQuery(".selectbox").selectbox({
        hide_duplicate_option: true
    });
	
	jQuery(".btn-2").click(function() {
        if(jQuery(window).width() <= 767) {
            jQuery(".select-option-mobile").slideToggle();
        }
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

jQuery(document).ready(function () {
jQuery(".banner_room_info").each(function(){
   if (jQuery(this).height() > maxHeight) { maxHeight = jQuery(this).height(); }
});
jQuery(".banner_room_info").height(maxHeight);
});

jQuery(window).resize(function() {
	
maxHeight = 0;
jQuery(".banner_room_info").removeAttr("style");
jQuery(".banner_room_info").each(function(){
   if (jQuery(this).height() > maxHeight) { maxHeight = jQuery(this).height(); }
});
jQuery(".banner_room_info").height(maxHeight);
});
 

jQuery(document).ready(function () {

 jQuery('.bxslider li').each(function () {
	  jQuery(this).find('img').addClass('bannerimage');
	  var imgSrc = jQuery(this).find('.bannerimage').attr('src');
	  imgSrc = "url(" + imgSrc + ")";
	  jQuery(this).css("background-image", imgSrc);
 });
 
  jQuery('.banner_inner').each(function () {
	  jQuery(this).find('img').addClass('bannerimage2');
	  var imgSrc = jQuery(this).find('.bannerimage2').attr('src');
	  imgSrc = "url(" + imgSrc + ")";
	  jQuery(this).css("background-image", imgSrc);
 });
 

 
var getImageSrc = jQuery('.imageDiv img').attr('src');
jQuery('.room_banner_1').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.imageDiv').remove();

 
  var getImageSrc1 = jQuery('.imageDiv2 img').attr('src');
jQuery('.room_banner_2').css('background-image', 'url(' + getImageSrc1 + ')');
jQuery('.imageDiv2').remove();

  var getImageSrc2 = jQuery('.imageDiv3 img').attr('src');
jQuery('.locally_banner').css('background-image', 'url(' + getImageSrc2 + ')');
jQuery('.imageDiv3').remove();


 
   //var getImageSrc3 = jQuery('.imageDiv4 img').attr('src');
//jQuery('.acc_banner1').css('background-image', 'url(' + getImageSrc3 + ')');
//jQuery('.imageDiv4').remove();

   var getImageSrc4 = jQuery('.imageDiv5 img').attr('src');
jQuery('.acc_banner2').css('background-image', 'url(' + getImageSrc4 + ')');
jQuery('.imageDiv5').remove();


   var getImageSrc5 = jQuery('.imageDiv6 img').attr('src');
jQuery('.acc_banner3').css('background-image', 'url(' + getImageSrc5 + ')');
jQuery('.imageDiv6').remove();


   var getImageSrc6 = jQuery('.imageDiv7 img').attr('src');
jQuery('.acc_banner4').css('background-image', 'url(' + getImageSrc6 + ')');
jQuery('.imageDiv7').remove();

   var getImageSrc7 = jQuery('.imageDiv8 img').attr('src');
jQuery('.acc_banner5').css('background-image', 'url(' + getImageSrc7 + ')');
jQuery('.imageDiv8').remove();

   var getImageSrc8 = jQuery('.imageDiv9 img').attr('src');
jQuery('.acc_banner6').css('background-image', 'url(' + getImageSrc8 + ')');
jQuery('.imageDiv9').remove();


  var getImageSrc9 = jQuery('.imageDiv10 img').attr('src');
jQuery('.acc_banner7').css('background-image', 'url(' + getImageSrc9 + ')');
jQuery('.imageDiv10').remove();

  var getImageSrc10 = jQuery('.imageDiv11 img').attr('src');
jQuery('.acc_banner8').css('background-image', 'url(' + getImageSrc10 + ')');
jQuery('.imageDiv11').remove();



}); 
 
 
  
jQuery(document).ready(function(jQuery){
	jQuery('.bxslider').bxSlider({
             	slideMargin:0,
               auto: true,
               pause: 3000,
			   touchEnabled: false,
			   mode: 'fade'
    });
	
	jQuery('.bxslider2').bxSlider({
             	slideMargin:0,
               auto: true,
               pause: 3000,
			   touchEnabled: false,
			   mode: 'fade'
    });

});

if (jQuery('#map-canvas').length > 0) {
   var map;
  // var chicago = new google.maps.LatLng(38.9023641, -77.0128018);
   var chicago = new google.maps.LatLng(38.896888, -77.010858);
 // 38.9023641,-77.0128018,14
   

    function initialize() {
        var mapOptions = {
            zoom: 16,
            center: chicago,
             zoomControl: false, scrollwheel: false,draggable:false,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'usroadatlas']
            }
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        var styledMapOptions = {
            
        };

         var marker = new google.maps.Marker({
              position: chicago,
              map: map,
             // "lat": '38.9023641',
             // "lng": '-77.0128018',
             "lat": '38.896888',
            "lng": '-77.010858',
              title: '525 New Jersey Avenue, NW Washington DC 20001'
          });

    }

    google.maps.event.addDomListener(window, 'load', initialize);
};
  
// Homepage arrow scroll
jQuery('a.down_arrow[href^="#"]').on('click',function (e) {
	e.preventDefault();
	var tweetheight = jQuery("header").height(),
		target = this.hash,
		jQuerytarget = jQuery(target);

	jQuery('html, body').stop().animate({
		'scrollTop': jQuerytarget.offset().top - tweetheight
	}, 900, 'swing');
});
 
 
 
 
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