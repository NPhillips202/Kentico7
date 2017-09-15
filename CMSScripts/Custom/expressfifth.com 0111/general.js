jQuery(document).ready(function() {

var $ = jQuery.noConflict();


/*================== body script sarts ===================*/
 jQuery(window).load(function() {
 jQuery("body").css('opacity','1');
});
/*================== body script ends ===================*/


//Sticky header start

 var header = jQuery('.main_header'),
		blueSection = jQuery('.main_header'),
    // Calculate when to change the color.
		offset = blueSection.offset().top;

jQuery(window).scroll(function(){
  var scroll = jQuery(window).scrollTop();

	
  if (scroll >= offset) {
    jQuery('.main_header').addClass('sticky');
  }
  else{
  jQuery('.main_header').removeClass('sticky');}
	
});

//Sticky header end

//bx slider image start
//var getImageSrc = jQuery('.slide_01 .slide1_img img').attr('src');
//jQuery('.slide_01').css('background-image', 'url(' + getImageSrc + ')');
//jQuery('.slide1_img').remove();

//var getImageSrc = jQuery('.slide_02 .slide2_img img').attr('src');
//jQuery('.slide_02').css('background-image', 'url(' + getImageSrc + ')');
//jQuery('.slide2_img').remove();

//var getImageSrc = jQuery('.slide_03 .slide3_img img').attr('src');
//jQuery('.slide_03').css('background-image', 'url(' + getImageSrc + ')');
//jQuery('.slide3_img').remove();

//var getImageSrc = jQuery('.slide_04 .slide4_img img').attr('src');
//jQuery('.slide_04').css('background-image', 'url(' + getImageSrc + ')');
//jQuery('.slide4_img').remove();

//var getImageSrc = jQuery('.slide_05 .slide5_img img').attr('src');
//jQuery('.slide_05').css('background-image', 'url(' + getImageSrc + ')');
//jQuery('.slide5_img').remove();

//var getImageSrc = jQuery('.banner2 .banner2_img img').attr('src');
//jQuery('.banner2').css('background-image', 'url(' + getImageSrc + ')');
//jQuery('.banner2_img').remove();
  
var getImageSrc = jQuery('.newHeaderImage .banner2_img img').attr('src');
jQuery('.newHeaderImage').css('background-image', 'url(' + getImageSrc + ')');
jQuery('.banner2_img').remove();  

//var getImageSrc = jQuery('.room-banner1 .room-banner1-img img').attr('src');
//jQuery('.room-banner1').css('background-image', 'url(' + getImageSrc + ')');
//jQuery('.room-banner1-img').remove();

//var getImageSrc = jQuery('.room-banner2 .room-banner2-img img').attr('src');
//jQuery('.room-banner2').css('background-image', 'url(' + getImageSrc + ')');
//jQuery('.room-banner2-img').remove();

//var getImageSrc = jQuery('.bedroom-banner .bedroom-banner_img img').attr('src');
//jQuery('.bedroom-banner').css('background-image', 'url(' + getImageSrc + ')');
//jQuery('.bedroom-banner_img').remove();


//bx slider image end


//bx slider start
jQuery('.bxslider').bxSlider({
	  	auto: true,
          speed: 1000,
          pause:5000,
          controls: false,
          pager: false,
        });
//bx slider end


//equal height start here
equalheight = function(container){
var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     $el,
     topPosition = 0;
 jQuery(container).each(function() {

   $el = jQuery(this);
   jQuery($el).height('auto')
   topPostion = $el.position().top;

   if (currentRowStart != topPostion) {
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
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
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
 }
 });
}

jQuery(window).load(function() {	
  equalheight('.em .innerpage .room-info p');
  equalheight('.em .innerpage .room-area .room-info h4');
  equalheight('.em .innerpage .room-area .room-info h3');
  equalheight('.em .hbox_text h2');
  equalheight('.em .hbox_text p');
});


jQuery(window).resize(function(){
  equalheight('.em .innerpage .room-info p');
  equalheight('.em .innerpage .room-area .room-info h4');
equalheight('.em .innerpage .room-area .room-info h3');
equalheight('.em .hbox_text h2');
equalheight('.em .hbox_text p');
});


//equal height end here		


});  		