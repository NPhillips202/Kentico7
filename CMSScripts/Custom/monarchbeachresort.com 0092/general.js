var $ = jQuery.noConflict();


jQuery(document).ready(function () {
  
   
  
    //swiper
  var swiper = new Swiper('.swiper-container', {
            autoplay: 5000,
            autoplayDisableOnInteraction: false,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            pagination: '.swiper-pagination',
            effect: 'fade',
            loop: true,
            paginationClickable: true
        });
  }
  
  //magnific popup
  jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
  
  
	jQuery(".tipso-tooltip").mouseenter(function () {
	jQuery(this).prev("div").fadeIn("slow");
	})
	.click(function () {
	jQuery(this).prev("div").fadeIn();
	})
	.mouseout(function () {
	jQuery(this).prev("div").fadeOut();
	});
	jQuery(".tooltip").click(function () {
	jQuery(this).fadeOut();
	});	


	jQuery('input,textarea').placeholder();
	jQuery('.enumenu_ul > ul').responsiveMenu({
		 'menuIcon_text': 'Menu',
        menuslide_overlap: true,
        menuslide_direction: 'left',
        onMenuopen: function() {}
	});

	//background img with same height same width
	jQuery(".bgImage").each(function () {
		jQuery(this).parent().css('background-image', 'url(' + jQuery(this).attr("src") + ')');
		jQuery(this).remove();
	});

	//slider
  
    //var owl = jQuery('#slider-carouser')
	//var items_ = owl.find(".item").length > 1 ? true : false;
	//owl.owlCarousel({
		//items: 1,
		//mouseDrag: items_,
		//touchDrag: items_,
		//pullDrag: items_,
		//nav: true,
		//loop: items_,
		//pagination: false,
		//autoplay: true,
		//animateOut: 'fadeOut',
		//animateIn: 'fadeIn',
        ////navSpeed: 2000,
        //smartSpeed: 2000,
        //afterAction: function(current) {
        //current.find('video').get(0).play();
	    //}
	//});                     

     

	jQuery(document.documentElement).keyup(function (event) {
		var direction = null;
		if (event.keyCode == 37) {
			owl.trigger('prev.owl.carousel');
		} else if (event.keyCode == 39) {
			owl.trigger('next.owl.carousel');
		}
	});

	jQuery("#owl-demo").owlCarousel({
		loop: true,
		autoplay: true,
		autoplayTimeout: 5000,
		nav: true,
		items: 2,
		//navSpeed: 2000,
		smartSpeed: 2000,
		responsive: {
			0: {
				items: 1,
				nav: true
			},

			600: {
				items: 2,

			}
		}

	});



	jQuery(document.documentElement).keyup(function (event) {
		var direction = null;
		if (event.keyCode == 37) {
			jQuery("#owl-demo").trigger('prev.owl.carousel');
		} else if (event.keyCode == 39) {
			jQuery("#owl-demo").trigger('next.owl.carousel');
		}
	});



	jQuery(".second-menu .sub-emnu-accordian").click(function (e) {
		e.preventDefault();
        if(jQuery(this).hasClass("active")){
            jQuery(this).removeClass("active");
            jQuery(this).next().removeClass("active");
            jQuery(".second-menu  > ul a").removeClass("link");
            jQuery(".second-menu  > ul li").removeClass("hover");
        }else{
            jQuery(this).addClass("active");
            jQuery(this).next().addClass("active")
        }
	})


	// datepicker
	jQuery(".datepicker").datepicker();
	jQuery("#datepicker").datepicker("hide");
	jQuery("#datepicker2").datepicker("hide");

	var afterHeight = jQuery('.sb-menu').height();
	console.log(afterHeight)

	jQuery('head').append("<style>.three-menu-colum:after{height:" + afterHeight + "px}</style>")
    
    
    /* Validation */

	/*$("#subscribe_forms").validate({
		ignore: [],
		rules: {
			email: {
				required: true,
				email: true
			}
		},
		errorClass: 'error',
		validClass: 'valid',
		errorElement: 'div',
		highlight: function (element, errorClass, validClass) {
			$(element).addClass(errorClass).removeClass(validClass);
		},
		unhighlight: function (element, errorClass, validClass) {
			$(element).removeClass(errorClass).addClass(validClass);
		},
		messages: {

		},
		errorPlacement: function (error, element) {
			error.insertAfter(element);
		},
		submitHandler: function (form) { // for demo
			$('#subscribe_forms .successmsg').fadeIn();
			setTimeout(function () {
				$('#subscribe_forms .successmsg').fadeOut();

				$('#subscribe_forms')[0].reset();
				$(".valid").removeClass("valid");

				$('#subscribe_forms input').focus().blur();

			}, 3000)

			return false;
		}
	});*/
    
    if ( 'ontouchstart' in window ) {
        jQuery(".second-menu  > ul > li > a").addClass("firstLevel");
        jQuery(".second-menu  > ul a").click(function(e){
           if (!jQuery(this).hasClass("link") && jQuery(this).next().length > 0) {
               e.preventDefault();
               if (jQuery(this).hasClass("firstLevel")) {
                    jQuery(".second-menu  > ul a").removeClass("link");
                    jQuery(".second-menu  > ul li").removeClass("hover");
               }
               jQuery(this).addClass("link");
               jQuery(this).parent().addClass('hover');
           }
        });
        jQuery('body').on('click touchstart', function(e) {
            if (jQuery(e.target).closest(".second-menu").length == 0) {
                jQuery(".second-menu  > ul").find("a").each(function(){
                    jQuery(this).removeClass("link");
                    jQuery(this).parent().removeClass("hover");
                });
            }
        });
        
    }
    
    jQuery(".header-top a.btn").click(function(e){
       if(jQuery(window).width() < 768) {
           e.preventDefault();
           jQuery(".guestroom-section").slideToggle();
       }
    });

    
    
});

var secondMenu
var fixedHeader
jQuery(window).load(function () {
	var t = jQuery("#slider-carouser").offset().top;
	//alert(t);
	var sc= jQuery("#slider-carouser").outerHeight();
	//alert(sc);
	var sm = jQuery(".second-menu").outerHeight();
	//alert(sm);
	secondMenu = (jQuery("#slider-carouser").offset().top + jQuery("#slider-carouser").outerHeight()) - jQuery(".second-menu").outerHeight()
	fixheader();
    
    jQuery('.loader').fadeOut();
});

jQuery(window).resize(function () {
	secondMenu = (jQuery("#slider-carouser").offset().top + jQuery("#slider-carouser").outerHeight()) - jQuery(".second-menu").outerHeight()
	fixheader();
    FixedHeader();
    if(jQuery(window).width() >= 768) {
        jQuery(".guestroom-section").removeAttr("style");
    }
})

jQuery(window).scroll(function () {
	fixheader();
})

function fixheader() {
	var scrollTop = jQuery(window).scrollTop();
	if (scrollTop >= (secondMenu - jQuery("#stickyribbon").outerHeight())) {
		jQuery(".second-menu").addClass("stickey");
		jQuery(".second-menu").css("top", $("#stickyribbon").outerHeight(true));
	} else {
		jQuery(".second-menu").css("top", "");
		jQuery(".second-menu").removeClass("stickey");

		jQuery(".second-menu .sub-emnu-accordian").removeClass("active").next().removeClass("active")
	}
}




//first get the value for the header, banner and set the offser value
var banner_height = 493;//jQuery(".banner-and-guestroom-section").height();
   var header_height = jQuery("header").height();
   var offset_val = banner_height - header_height;
 
 function FixedHeader(){
   var scrollval = jQuery(window).scrollTop();
   //determine when to show and  hide the  reservation bar 2
    	
   if(scrollval >= offset_val){
   //$("header").css({"height",600);}
    jQuery("header").addClass("resizeHeader");
    //$(".logo").addClass("showOther");
    jQuery(".logo1").css("display","none");
   jQuery(".scrollImage").css("display","block");
 	jQuery(".header-top ul li").css("display","none");
 	jQuery(".header-navigation").addClass("adjust");

       }else{
        jQuery("header").removeClass("resizeHeader");
        //$(".logo").removeClass("logoAdjust");
         jQuery(".logo1").css("display","block");
      jQuery(".header-top ul li").css("display","inline-block");
      	jQuery(".header-navigation").removeClass("adjust");
      	 jQuery(".scrollImage").css("display","none");
       }
       

       //reset if less 
        if(jQuery(window).width() < 750) {
        	  jQuery("header").removeClass("resizeHeader");
        //$(".logo").removeClass("logoAdjust");
         jQuery(".logo1").css("display","block");
      jQuery(".header-top ul li").css("display","inline-block");
      	jQuery(".header-navigation").removeClass("adjust");
      	 jQuery(".scrollImage").css("display","none");
     	}
   }
       
       //when scrol call the function
   jQuery(window).scroll(FixedHeader);