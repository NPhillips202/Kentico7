var $ = jQuery.noConflict();

// get query string
var getQuery = function(q) {
	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
};

jQuery(document).ready(function () {

	//eval("debugger;");

	//swiper header
	//if(getQuery('mock') != 'true') {}
	if(jQuery('.swiper-container').length) {
		var swiper = new Swiper('.swiper-container', {
			autoplay: 4000,
			autoplayDisableOnInteraction: false,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			pagination: '.swiper-pagination',
			effect: 'fade',
			loop: true,
			paginationClickable: true,
			preloadImages: false, // Disable preloading of all images
			lazyLoading: true, // Enable lazy loading
			lazyLoadingInPrevNext: false,
			lazyLoadingOnTransitionStart: true,
		});
	}
	var mySwiper = new Swiper('.swiper-container1', {
		loop: true,
		autoplay:4000,
		effect:'fade',
		nextButton: '.swiper-button-next1',
		prevButton: '.swiper-button-prev1'
	});

	if(jQuery('.swiper-container-2').length) {
		var swiper2 = new Swiper('.swiper-container-2', {
			slidesPerView: 2,
			autoplay: 4000,
			speed:1000,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			spaceBetween: 0,
			loop:true,
			breakpoints: {
				"480": {
					slidesPerView: 1
				}
			}
		});
	}

	if(jQuery('.swiper-room').length) {
		var swiper3 = new Swiper('.swiper-room', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
            autoplay: 4000,
            speed:1000,
			loop: true,
			paginationBulletRender: function (index, className) {
				//return '<span class="bullet' + className + '">' + (parseInt(index) + 1) + '</span>';
				//return '<span class="bullet' + className + '">' + (parseInt(className) + 1) + '</span>';
				return '<span class="swiper-pagination-bullet bullet' + className + '">' + (parseInt(className) + 1) + '</span>';
			}/**/
		});
	}

	if(jQuery('.swiper-container-offers').length) {
		var swiper = new Swiper('.swiper-container-offers', {
			autoplay: 3000,
			loop: true,
			pagination: '.swiper-pagination',
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

	//
	jQuery('input,textarea').placeholder();

	//
	jQuery('.enumenu_ul > ul').responsiveMenu({
	    menuIcon_text: 'menu',
		menuslide_overlap: true,
		menuslide_direction: 'left',
		onMenuopen: function() {}
	});

	// background img with same height same width
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
		} else {
			jQuery(this).addClass("active");
			jQuery(this).next().addClass("active");
		}
	});


	// datepicker
	jQuery(".datepicker").datepicker();
	jQuery("#datepicker").datepicker("hide");
	jQuery("#datepicker2").datepicker("hide");

	var afterHeight = jQuery('.sb-menu').height();
	console.log(afterHeight);

	jQuery('head').append("<style>.three-menu-colum:after{height:" + afterHeight + "px}</style>");


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

	// Main Menu onTouch events
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
			if (jQuery(e.target).closest(".second-menu").length === 0) {
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



	var secondMenu;
	var fixedHeader;
	jQuery(window).load(function () {
		if (jQuery("#slider-carouser").length > 0) {
			var t = jQuery("#slider-carouser").offset().top;
			//alert(t);
			var sc= jQuery("#slider-carouser").outerHeight();
			//alert(sc);
			var sm = jQuery(".second-menu").outerHeight();
			//alert(sm);
			secondMenu = (jQuery("#slider-carouser").offset().top + jQuery("#slider-carouser").outerHeight()) - jQuery(".second-menu").outerHeight();
			fixheader();
			jQuery('.loader').fadeOut();
		};
	});

	jQuery(window).resize(function () {
		if (jQuery("#slider-carouser").length > 0) {
			secondMenu = (jQuery("#slider-carouser").offset().top + jQuery("#slider-carouser").outerHeight()) - jQuery(".second-menu").outerHeight();
			fixheader();
			FixedHeader();
			if(jQuery(window).width() >= 768) {
				jQuery(".guestroom-section").removeAttr("style");
			}
		}
	});

	jQuery(window).scroll(function () {
		fixheader();
	});

	function fixheader() {
		var scrollTop = jQuery(window).scrollTop();
		if (scrollTop >= (secondMenu - jQuery("#stickyribbon").outerHeight())) {
			jQuery(".second-menu").addClass("stickey");
			jQuery(".second-menu").removeClass("stickeyOut");
			jQuery(".second-menu").css("top", $("#stickyribbon").outerHeight(true));
		} else {
			jQuery(".second-menu").css("top", "");
			jQuery(".second-menu").removeClass("stickey");
			jQuery(".second-menu").addClass("stickeyOut");
			jQuery(".second-menu .sub-emnu-accordian").removeClass("active").next().removeClass("active");
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
		} else {
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


	/*var countslide = jQuery(".banner .swiper-wrapper div").length;
	console.log("This is the total slide div" + countslide);
	if(countslide == 6) {
		jQuery(".swiper-button-next,.swiper-button-prev").css("display","none");
	}*/
  
        /*jQuery(function(){
      jQuery(".swiper-wrapper").click(function(){
      console.log("you clikc");
      var tl = jQuery(".swiper-wrapper .swiper-slide").attr("data-swiper-slide-index");
      console.log(tl);
      if(tl < 2){
      jQuery(".swiper-button-next,.swiper-button-prev").css("display","none");
      console.log("arrows remove");
      }else{
      console.log("arrow remain");
      }
      });
     });*/
  
  


	/* jQuery(".swiper-wrapper").each(function(){
	console.log(jQuery('div', this).length));*/
	//fix for ie mobile menu
	fixIeMobileMenu();

	//Smooth Scrolling
	jQuery('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				jQuery('html, body').animate({
					scrollTop: target.offset().top -100
				}, 1000);
				return false;
			}
		}
	});

});


//--Header Height
//function headerHeight() {
// var header_height = jQuery('header').outerHeight();
// jQuery('.banner-and-guestroom-section').css('margin-top', (header_height - 8) + 'px');
//}

jQuery(document).ready(function () {
	function headerHeight() {
		windowHeight = jQuery('header').outerHeight();
		//jQuery('.banner-and-guestroom-section').css('margin-top', windowHeight - 9);
        jQuery('.banner-and-guestroom-section').css('margin-top', windowHeight - 32);
	};
	//headerHeight();
	jQuery(window).resize(function () {
		headerHeight();
	});
});


function fixIeMobileMenu() {
	if(jQuery(window).width() < 750) {
		jQuery(".win.ie .enumenu_ul .enumenu_container > ul").addClass("mob");
		jQuery(".win.ie .enumenu_ul .enumenu_container > ul").removeClass("desk");
		jQuery( ".win.ie .enumenu_ul .enumenu_container > ul > li" ).prepend( '<span class="arrow"></span>');
	}
}
//jQuery(function() { headerHeight(); });
//jQuery(window).resize(function() {
//headerHeight();
//fixIeMobileMenu();
//});


//toggle the component with class accordion_body
jQuery(document).ready(function(){
	jQuery(".accordion_head").click(function(){
		if (jQuery('.accordion_body').is(':visible')) {
			jQuery(".accordion_body").slideUp(300);
			jQuery(".plusminus").text('+');
		}
		if( jQuery(this).next(".accordion_body").is(':visible')){
			jQuery(this).next(".accordion_body").slideUp(300);
			jQuery(this).children(".plusminus").text('+');
		}else {
			jQuery(this).next(".accordion_body").slideDown(300);
			jQuery(this).children(".plusminus").text('-');
		}
	});
});



//show or hide arrows based on slide
jQuery(function(){
  var tl = jQuery(".swiper-wrapper .swiper-slide").attr("data-swiper-slide-index");
      console.log(tl);
      if(tl < 2){
      jQuery(".swiper-button-next,.swiper-button-prev").css("display","none");
      console.log("arrows remove");
      }else{
      console.log("arrow remain");
      }
});