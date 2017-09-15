//var $ = jQuery.noConflict();

 jQuery(document).ready(function () {    
	 jQuery(".wrapper").css('opacity','1');
	 
 }); 



/*======================slide toggle script starts==============================*/	
 
 jQuery(document).ready(function () {    
    
  // jQuery(document).click(function () {
    //    alert('slide up');
       // jQuery('.make_a_reservation').slideUp();
  //  });
   
    jQuery('.check-now #btn-2').click(function (e) {
         //alert('slide down'); 
 		e.stopPropagation();
        jQuery('.make_a_reservation').slideToggle();
    }); 
   
    jQuery('.make_a_reservation').click(function (e) {
        e.stopPropagation();
    });
   
   jQuery('.mid-container, .nav-area').click(function () {
       //alert('slide up');
       jQuery('.make_a_reservation').slideUp();
    });
   
}); 

/*======================slide toggle script end==============================*/	

/*======================Custom selectbox script starts==============================*/	
jQuery(document).ready(function(){
	jQuery(".selectbox").selectbox({
        hide_duplicate_option: true
    });
});
/*======================Custom selectbox script ends==============================*/
/*====================== bxslider script starts ==============================*/	

var jQuery = jQuery.noConflict();
jQuery(document).ready(function() {
	jQuery('.bxslider').bxSlider({
	  auto: true
     }); 
});
/*====================== bxslider script ends ==============================*/	

/*====================== datetimepicker script ends ==============================*/
jQuery(function () {
    jQuery("#datepicker1").datepicker({
        dateFormat: 'mm/dd/yy',
		minDate: 0,
		showButtonPanel: true,

    });
    jQuery("#datepicker2").datepicker({
        dateFormat: 'mm/dd/yy',
		minDate: 0,
		showButtonPanel: true,

    });
	jQuery("#datepicker3").datepicker({
        dateFormat: 'mm-dd-yy',
		minDate: 0,
		showButtonPanel: true,

    });
	jQuery("#datepicker4").datepicker({
        dateFormat: 'mm-dd-yy',
		minDate: 0,
		showButtonPanel: true,

    });

});
/*====================== datetimepicker script ends ==============================*/
	
/*====================== menu script starts ==============================*/	
 jQuery(document).ready(function() {
            //$('input,textarea').placeholder();
            jQuery('.enumenu_ul').responsiveMenu({
        menuslide_overlap: true,
        menuslide_direction: 'left',
        onMenuopen: function() {}
            });

});
/*====================== menu script end ==============================*/	

jQuery('.bxslider li').each(function () {
        jQuery(this).find('img').addClass('bannerimage');
        var imgSrc = jQuery(this).find('.bannerimage').attr('src');
        imgSrc = "url(" + imgSrc + ")";
        jQuery(this).css("background-image", imgSrc);
    });


jQuery(document).ready(function(){
 var getImageSrc = jQuery('.section-work img').attr('src');
 jQuery('.section-work').css('background-image', 'url(' + getImageSrc + ')');
});



/*======================equal height start==============================*/
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
	equalheight('.em .mid-container .section-work .work-area ul li');
	equalheight('.em .mid-container .area-height');
});

jQuery(window).resize(function(){
equalheight('.em .mid-container .section-work .work-area ul li');
	equalheight('.em .mid-container .area-height');
});
/*======================equal height end==============================*/

if (jQuery(window).width() < 481) {


jQuery(document).ready(function(){
    jQuery(".menu-icon").click(function(){
    jQuery(".make_a_reservation").css('display','none');
    });
});


jQuery(document).ready(function(){
    jQuery("#btn-2").click(function(){
       
    jQuery(".em").removeClass('menu-open');
    jQuery(".menu-icon ").removeClass('active');
    
    });
});



  

}