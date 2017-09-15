jQuery(document).ready(function() {

jQuery(".left-menu").append(jQuery(".right-menu").html())

	jQuery('.enumenu_ul').responsiveMenu({
		'menuIcon_text': '',
		menuslide_overlap: true,
		menuslide_direction: 'right',
		onMenuopen: function() {}
	});

	jQuery("<div class='close-cross'></div>").insertAfter(".left-menu")

	jQuery(".selectbox").selectbox({hide_duplicate_option:true});

    jQuery(".book-now-btn").click(function(){
		 jQuery(this).toggleClass('active');
	  	 jQuery(".book-now-form").slideToggle('500', function(){
             if(jQuery(".book-now-btn").hasClass("active")){
             jQuery(".book-now-form").css('overflow','visible');
           }
         });

	});

    jQuery("body").on("click",".close-cross",function(){
        if(jQuery("body").hasClass("menu-open")){
            var obj = jQuery(this)
            obj.addClass("fadeOut")
            setTimeout(function(){
               obj.removeClass("fadeOut")
            },800)
        }
		jQuery(".menu-icon").trigger("click");
        jQuery("body").removeClass("menu-open")
	})
});
jQuery(function() {
            jQuery( "#datepicker" ).datepicker({
                showOn: "button",
				showOtherMonths: true,
			selectOtherMonths: true
            });
			jQuery("#datepicker").focus(function(){
			  jQuery("#datepicker").datepicker("show");
			});

            jQuery( "#datepicker1" ).datepicker({
                showOn: "button",
				showOtherMonths: true,
			selectOtherMonths: true
            });
			jQuery("#datepicker1").focus(function(){
			  jQuery("#datepicker1").datepicker("show");
			});
});

var maxHeight = 0;
jQuery(document).ready(function () {
jQuery(".special-packages .package-info p").each(function(){
   if (jQuery(this).height() > maxHeight) { maxHeight = jQuery(this).height(); }
});
jQuery(".special-packages .package-info p").height(maxHeight);
});

jQuery(window).resize(function() {
maxHeight = 0;
jQuery(".special-packages .package-info p").removeAttr("style");
jQuery(".special-packages .package-info p").each(function(){
   if (jQuery(this).height() > maxHeight) { maxHeight = jQuery(this).height(); }
});
jQuery(".special-packages .package-info p").height(maxHeight);
 });

 jQuery(window).load(function() {
	 jQuery(".wrapper").css('opacity','1');
 });

// Collapse logo when the user scrolls
function collapseLogo() {
	var currentScroll = jQuery(document).scrollTop(),
		collapseLogoAfterScrollingThisMuch = 440;

	if (currentScroll > collapseLogoAfterScrollingThisMuch) {
		jQuery('.logo-inner').addClass('collapsed');
	} else {
		jQuery('.logo-inner').removeClass('collapsed');
	};
};
jQuery(function() {
	collapseLogo();
});
jQuery(window).scroll(function() {
	collapseLogo();
});


// Email Signup Form in Footer
    jQuery(function() {
         var emailForm = jQuery('.signup-main'),
            emailFormInput = emailForm.find('.newsletter-input'),
            defaultValue = "";
        // Submit functions
        function submitEmailForm(val) {
            var email = val;
            if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
                alert("Please enter a valid email address.");
                return false;
            };
            document.location.href = ('/email-sign-up/?em=' + email);
        };
        emailFormInput.on('focus', function() {
            jQuery(document.body).delegate('input:text', 'keypress', function(e) {
                if (e.which === 13) {
                    e.preventDefault();
                    var val = jQuery(this).val();
                    submitEmailForm(val);
                };
            });
        });
        emailForm.find('.join-btn').on('click', function(e) {
            e.preventDefault();
            var val = jQuery(this).parent().find('.newsletter-input').val();
            submitEmailForm(val);
        });
    });

	//--BxSlider
	jQuery(window).bind('load', function(){
	    // Initialize slider
	    var numOfSlides = jQuery('.bxslider img').length;
	    if (numOfSlides > 1) {
	        jQuery('.bxslider').bxSlider({
				auto: true,
				speed:1000,
				pause: 6000//,
				//preloadImages: 'all',
				//autoScaleSlider:false,
				//autoHeight: false
	        });
	    } else {
	        jQuery('.bxslider').bxSlider({
	            auto: false
	        });
	    };

		/*function fireOnResizeEvent() {
			var width, height;
			if (navigator.appName.indexOf("Microsoft") != -1) {
				width  = document.body.offsetWidth;
				height = document.body.offsetHeight;
			} else {
				width  = window.outerWidth;
				height = window.outerHeight;
			}
			window.resizeTo(width - 1, height);
			window.resizeTo(width + 1, height);
		}

		window.onresize = function() {
			if (jQuery('.bxslider').length > 0) {
				slider.reloadSlider();
			}
		}*/
	});


    // Center images vertically
    function centerSlideshowImageVertically() {
        var slides = jQuery('.banner-container-main ul li img');
        slides.each(function(){
            var imageHeight = jQuery(this).height(),
                containerHeight = jQuery(this).parent().height(),
                difference = (containerHeight - imageHeight) / 2;
            //console.log(imageHeight + ' | ' + containerHeight + ' | ' + difference);
            jQuery(this).css('marginTop', difference + 'px');
        });
    };

    jQuery('.banner-container-main ul li img').load(function() {
        centerSlideshowImageVertically();
    });

    jQuery(window).resize(function() {
        centerSlideshowImageVertically();
    });

//--Site Map
    jQuery(".sitemap-toggle").click(function(e) {
        e.preventDefault();
        if (jQuery('.sitemap-float').is(':visible')) {
            jQuery(".sitemap-float").fadeOut(500);
        } else {
            jQuery(".sitemap-float").fadeIn(500);
        };



    });
