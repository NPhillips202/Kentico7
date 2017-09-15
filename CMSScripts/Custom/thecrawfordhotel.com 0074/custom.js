var win = jQuery(window)
viewport = function() {
var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight; 
return x;
}    

//bxslider
jQuery(document).ready(function(jQuery){   
	jQuery ('.bxslider').bxSlider({
               slideMargin:0,
               auto:  true,
               pause: 3000,
			   touchEnabled: false,
               autoHidePager: true,
			   mode: 'fade'
    });   
}); 

  

//bxslider END of Document
 


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
  jQuery('footer .copy-right .main .right ul').append('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
//  Sitemap ENDS 
  
  
  // add target blank to links with ext argument
  function gup( name, url ) {
      if (!url) url = location.href;
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( url );
      return results == null ? null : results[1];
  }
  jQuery('.copy-right .right li > a').each(function(){
      if(gup('ext', jQuery(this).attr('href'))
         jQuery(this).attr('target', '_blank');
  });
  
 
jQuery('.img-box .img-bg').each(function () {
	  jQuery(this).find('img').addClass('bannerimage');
	  var imgSrc = jQuery(this).find('.bannerimage').attr('src');
	  imgSrc = "url(" + imgSrc + ")";
	  jQuery(this).css("background-image", imgSrc);
 });
 jQuery('.bxslider li').each(function () {
	  jQuery(this).find('img').addClass('bannerimage');
	  var imgSrc = jQuery(this).find('.bannerimage').attr('src');
	  imgSrc = "url(" + imgSrc + ")";
	  jQuery(this).css("background-image", imgSrc);
 });
 jQuery('.sub-banner').each(function () {
	  jQuery(this).find('img').addClass('bannerimage');
	  var imgSrc = jQuery(this).find('.bannerimage').attr('src');
	  imgSrc = "url(" + imgSrc + ")";
	 jQuery(this).css("background-image", imgSrc);
 });  
  
 
   
  
  // Photo Gallery Carousel
   win.resize(function(){
      //jQuery('.simple-gallery').slick();
      var gallery = jQuery('.simple-gallery');
      var vp = viewport();
      if(vp < 479) {
         destroy slick slider then reInit
        if(gallery.hasClass('slick-initialized')) {
         gallery.slick('unslick');
        };
        // reInit slick slider
        gallery.slick({
          "slide": ">figure",
          "lazyLoad": "ondemand", 
          "slidesToShow": 1, 
          "slidesToScroll": 1, 
          //"fade": true, 
          "autoplay": false, 
          //"autoplaySpeed": 1500, 
          //"speed": 2500, 
          "mobileFirst": true,
          "centerMode": true,
          "centerPadding": '25px',
          "prevArrow": "<a href=# class='slick-prev fa fa-angle-left'>Previous</a>",
          "nextArrow": "<a href=# class='slick-next fa fa-angle-right'>Next</a>",
          });
      } else {
        // destroy slick slider
        if(gallery.hasClass('slick-initialized')) {
          gallery.slick('unslick');
        };
      };
    }).resize();
  },
                         
                         
 
    //RFP Input datepicker
      jQuery(".datepicker").datepicker({});
                       
                         
                         
//Ridiculously simple accordion   http://jsfiddle.net/nijinvinodan/WtdEh/
  
//var showChar = 250;
//var ellipsestext = "...";
//var moretext = "See More";
//var lesstext = "See Less";
//jQuery('.comments-space').each(function () {
//    var content = jQuery(this).html();
//    if (content.length > showChar) {
//        var show_content = content.substr(0, showChar);
//        var hide_content = content.substr(showChar, content.length - showChar);
//        var html = show_content + '<span class="moreelipses">' + ellipsestext + '</span><span class="remaining-content"><span>' + hide_content + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
//        jQuery(this).html(html);
//    }
//});

//jQuery(".morelink").click(function () {
//    if (jQuery(this).hasClass("less")) {
//        jQuery(this).removeClass("less");
//        jQuery(this).html(moretext);
//    } else {
//        jQuery(this).addClass("less");
//        jQuery(this).html(lesstext);
//    }
//    jQuery(this).parent().prev().toggle();
//    jQuery(this).prev().toggle();
//    return false;
// });                      
                         
}); //End Of Document ready
