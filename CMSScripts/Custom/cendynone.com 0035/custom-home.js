//--Homepage slide sizing
	function slideSize() {
		// Set slide height
		var height = jQuery(window).height() - jQuery('header').outerHeight();
		var mobileSlideheight = '285';
		if (jQuery("#mobileQuery").is(":visible")) {
			// -- Mobile - configure to only have full height for first slide
			// Set slide height
			jQuery('.home-slide').first().attr('style', 'height:' + height + 'px !important');
			jQuery('.home-slide').not(':first').attr('style', 'height:' + mobileSlideheight + 'px !important');
			jQuery('.home-slide').not(':first').find('.home-slide-content, .home-slide-content-2').attr('style', 'height:' + mobileSlideheight + 'px !important');
			// Set vertical bar height
			jQuery('.home-slide').first().each(function() {
				var difference = ((jQuery(window).height() - (jQuery(this).find('.slideContentWrapper').outerHeight() + jQuery('header').height())) / 2) + 1;
				jQuery(this).find('.vertLine').height(difference);
			});
			jQuery('.home-slide').not(':first').each(function() {
				var difference = ((mobileSlideheight - jQuery(this).find('.slideContentWrapper').outerHeight()) / 2) + 1;
				jQuery(this).find('.vertLine').height(difference);
			});
		} else {
			// -- Not mobile
			// Set slide height
			jQuery('.home-slide, .home-slide-content, .home-slide-content-2').attr('style', 'height:' + height + 'px !important');
			// Set vertical bar height
			jQuery('.home-slide').each(function() {
				var difference = ((jQuery(window).height() - (jQuery(this).find('.slideContentWrapper').outerHeight() + jQuery('header').height())) / 2) + 1;
				jQuery(this).find('.vertLine').height(difference);
			});
		};
	};
	jQuery(function() {
		slideSize();
	});
	jQuery(window).resize(function() {
        //if (!jQuery('#mobileQuery').is(':visible')) {
            slideSize();
        //};
	});

//--Homepage Parallax
	jQuery(function() {
        if (!Modernizr.touch && jQuery(window).width() > 1200) {
            var s = skrollr.init({
                forceHeight:false
            });
        } else {
            jQuery('body').addClass('noParallax');
        };
	});

//--First slide animated arrow
    jQuery(function() {
        // Animation
        function animateArrow() {
            var target = jQuery('.homeSlideArrow');
            var animateDuration = 1400;
            target.animate({
                bottom:'32px'
            }, animateDuration, "easeOutQuad", function() {
                target.animate({
                    bottom:'20px'
                }, animateDuration, "easeInQuad", function() {
                    animateArrow();
                });
            });
        };
        if (!jQuery('#mobileQuery').is(':visible')) {
        	animateArrow();
		};
        // Click function
        jQuery('.homeSlideArrowWrapper').click(function(e) {
            e.preventDefault();
            position = jQuery('.home-slide.slide-1').offset().top - jQuery('header').outerHeight();
            jQuery('html, body').animate({scrollTop:position+'px'},2200, "easeOutQuad");
        });
    });

//--Singapore Homepage Slide Animated Arrow
    jQuery(function() {
        // Animation
        function animateArrowSingapore() {
            var target = jQuery('#singapore-wrapper-v2 .banner-button i');
            var animateDuration = 1400;
            target.animate({
                left:'5px'
            }, animateDuration, "easeOutQuad", function() {
                target.animate({
                    left:'15px'
                }, animateDuration, "easeInQuad", function() {
                    animateArrowSingapore();
                });
            });
        };
        animateArrowSingapore();
    });

//--Homepage Animated Birds
  var slide1Flag = false,
      slide2Flag = false,
      slide3Flag = false,
      slide4Flag = false,
      productsBtnFlag = false,
      screenHeightToStartAnimation = jQuery(window).height() * 0.5; //When top of slide is 25% from top of screen
      screenHeightToStartAnimationForServicesBar = jQuery(window).height() * 0.5; //Services bar is smaller, so it should animate earlier
  
  // Initial Trigger
  function animationTrigger() {
      // Slide 1
      if (slide1Flag == false) {
          var currSlideTopPosition = jQuery('.slide-1').offset().top - jQuery(window).scrollTop();
          if (currSlideTopPosition < screenHeightToStartAnimation) {
              slide1Bird();
          };
      };
      // Slide 2
      if (slide2Flag == false) {
          var currSlideTopPosition = jQuery('.slide-2').offset().top - jQuery(window).scrollTop();
          if (currSlideTopPosition < screenHeightToStartAnimation) {
              slide2Bird();
          };
      };
      // Slide 3
      if (slide3Flag == false) {
          var currSlideTopPosition = jQuery('.slide-3').offset().top - jQuery(window).scrollTop();
          if (currSlideTopPosition < screenHeightToStartAnimation) {
              slide3Bird();
          };
      };
      // Slide 4
      if (slide4Flag == false) {
          var currSlideTopPosition = jQuery('.slide-4').offset().top - jQuery(window).scrollTop();
          if (currSlideTopPosition < screenHeightToStartAnimation) {
              slide4Bird();
          };
      };
      // Products Button
      if (productsBtnFlag == false) {
          var currSlideTopPosition = jQuery('#productServicesBar').offset().top - jQuery(window).scrollTop();
          if (currSlideTopPosition < screenHeightToStartAnimationForServicesBar) {
              productsBtnBird();
          };
      };
  };
  
  jQuery(function() {
      if (!jQuery('#mobileQuery').is(':visible')) {
          // Trigger first slide animation on load
          setTimeout(function() {
              slide0Bird();
          }, 1000);
      };
  });
  jQuery(window).scroll(function() {
      if (!jQuery('#mobileQuery').is(':visible') && jQuery(window).width() > 1024) {
          // Trigger other animations as the user scrolls
          animationTrigger();
      };
  });
  
  // Animation Functions
  function slide0Bird() {
      var slide0Flag = true,
          slide = jQuery('.slide-0');
      // Set animation values
      var birdFacing = 'right',
	  	  birdImagePath = '/getmedia/36f22dbf-b257-40d4-b1cf-6751bd1c42ae/aniBird_right_white/';
          startPositionX = slide.width() * 0.1,
          startPositionY = -99,
          startBezierAngle = 40,
          startBezierLength = 0.3,
          endPositionX = slide.width() + 99,
          endPositionY = slide.height() * 0.95,
          endBezierAngle = 40,
          endBezierLength = 0.3;
      animateBird(birdFacing,birdImagePath,slide,startPositionX,startPositionY,startBezierAngle,startBezierLength,endPositionX,endPositionY,endBezierAngle,endBezierLength);
  };
  
  function slide1Bird() {
      slide1Flag = true;
          slide = jQuery('.slide-1');
      // Set animation values
      var birdFacing = 'right',
	  	  birdImagePath = '/getmedia/432b4757-e09c-424b-9165-8532a900be77/aniBird_right_purple/';
          startPositionX = -99,
          startPositionY = slide.height() * 0.1,
          startBezierAngle = 0,
          startBezierLength = 0.4,
          endPositionX = slide.width() + 99,
          endPositionY = slide.height() * 0.7,
          endBezierAngle = 330,
          endBezierLength = 0.3;
      animateBird(birdFacing,birdImagePath,slide,startPositionX,startPositionY,startBezierAngle,startBezierLength,endPositionX,endPositionY,endBezierAngle,endBezierLength);
  };
  
  function slide2Bird() {
      slide2Flag = true;
          slide = jQuery('.slide-2');
      // Set animation values
      var birdFacing = 'left',
	  	  birdImagePath = '/getmedia/d632a226-5d1c-4705-9b6f-bb594c71d91c/aniBird_left_purple/';
          startPositionX = slide.width() + 99,
          startPositionY = slide.height() * 0.1,
          startBezierAngle = 340,
          startBezierLength = 0.4,
          endPositionX = -99,
          endPositionY = slide.height() * 0.4,
          endBezierAngle = 50,
          endBezierLength = 0.4;
      animateBird(birdFacing,birdImagePath,slide,startPositionX,startPositionY,startBezierAngle,startBezierLength,endPositionX,endPositionY,endBezierAngle,endBezierLength);
  };
  
  function slide3Bird() {
      slide3Flag = true;
          slide = jQuery('.slide-3');
      // Set animation values
      var birdFacing = 'right',
	  	  birdImagePath = '/getmedia/432b4757-e09c-424b-9165-8532a900be77/aniBird_right_purple/';
          startPositionX = -99,
          startPositionY = slide.height() * 0.1,
          startBezierAngle = 20,
          startBezierLength = 0.3,
          endPositionX = slide.width() + 99,
          endPositionY = slide.height() * 0.8,
          endBezierAngle = 340,
          endBezierLength = 0.3;
      animateBird(birdFacing,birdImagePath,slide,startPositionX,startPositionY,startBezierAngle,startBezierLength,endPositionX,endPositionY,endBezierAngle,endBezierLength);
  };
  
  function slide4Bird() {
      slide4Flag = true;
          slide = jQuery('.slide-4');
      // Set animation values
      var birdFacing = 'left',
	  	  birdImagePath = '/getmedia/2e41b85c-c343-4568-9382-734a84439717/aniBird_left_white/';
          startPositionX = slide.width() + 99,
          startPositionY = slide.height() * 0.1,
          startBezierAngle = 340,
          startBezierLength = 0.5,
          endPositionX = -99,
          endPositionY = slide.height() * 0.4,
          endBezierAngle = 40,
          endBezierLength = 0.5;
      animateBird(birdFacing,birdImagePath,slide,startPositionX,startPositionY,startBezierAngle,startBezierLength,endPositionX,endPositionY,endBezierAngle,endBezierLength);
  };
  
  function productsBtnBird() {
      productsBtnFlag = true;
          slide = jQuery('#productServicesBar');
      // Set animation values
      var birdFacing = 'right',
	  	  birdImagePath = '/getmedia/432b4757-e09c-424b-9165-8532a900be77/aniBird_right_purple/';
          startPositionX = -99,
          startPositionY = slide.height() * 0.1,
          startBezierAngle = 340,
          startBezierLength = 0.3,
          endPositionX = slide.width() + 99,
          endPositionY = slide.height() * 0.9,
          endBezierAngle = 350,
          endBezierLength = 0.3;
      animateBird(birdFacing,birdImagePath,slide,startPositionX,startPositionY,startBezierAngle,startBezierLength,endPositionX,endPositionY,endBezierAngle,endBezierLength);
  };
  
  function animateBird(birdFacing,birdImagePath,slide,startPositionX,startPositionY,startBezierAngle,startBezierLength,endPositionX,endPositionY,endBezierAngle,endBezierLength) {
      //console.log(slide + ' | ' + startPositionX + ' | ' + startPositionY + ' | ' + startBezierAngle + ' | ' + startBezierLength + ' | ' + endPositionX + ' | ' + endPositionY + ' | ' + endBezierAngle + ' | ' + endBezierLength + ' | ' + duration);
      // Create bird
      var bird = "<div class='aniBird " + birdFacing + "Facing' style='display:none;'><img src='" + birdImagePath + "' width='85' height='92' class='aniBirdImg' /></div>";
      slide.append(bird);
      // Animate bird
      var path = {
          start: {
              x: startPositionX,
              y: startPositionY,
              angle: startBezierAngle,
              length: startBezierLength
          },
          end: {
              x: endPositionX,
              y: endPositionY,
              angle: endBezierAngle,
              length: endBezierLength
          }
      };
	  var duration = 6000;
      slide.find('.aniBirdImg').load(function() {
          slide.find('.aniBird').show().animate({path: new jQuery.path.bezier(path)}, duration, "linear", function() {
              // Remove bird
              jQuery(this).delay(duration).remove();
          });
      });
  };

//--What's New Functionality
	function openWhatsNewNav() {
		var btn = jQuery('.whatsNewLabel'),
			nav = jQuery('#whatsNewNav'),
			overlay = jQuery('#whatsNewOverlay'),
			content = jQuery('#whatsNewContent'),
			speed = 400;
		
		btn.click(function(e) {
			if (nav.is(':visible')) {
				btn.children('.fa').attr('class','fa fa-caret-right');
				nav.fadeOut(speed);
				content.fadeOut(speed);
				overlay.css('width','auto');
                jQuery('html').removeClass('overlayOpen');
                enableScroll();
			} else {
				btn.children('.fa').attr('class','fa fa-times-circle');
                jQuery('html').addClass('overlayOpen');
				nav.fadeIn(speed);
			};
		});
	};
	
	function openWhatsNewContent () {
		var thumb = jQuery('#whatsNewThumbnailWrap img'),
			overlay = jQuery('#whatsNewOverlay'),
			nav = jQuery('#whatsNewNav'),
			content = jQuery('#whatsNewContent'),
			banners = jQuery('.whatsNewBanner'),
			slider = jQuery('#whatsNewBannerSlider'),
			fadeSpeed = 400,
			slideSpeed = 700;
		
		thumb.click(function(e) {
			var banner = jQuery(this).attr('banner'),
				selectedBanner = jQuery('.whatsNewBanner[banner=' + banner + ']'),
				currIndex = selectedBanner.index();
			
            // Click straight through to the landing page if on mobile
            if (!jQuery("#mobileQuery").is(":visible")) {
                e.preventDefault();
            };
            
			banners.removeClass('current');
			banners.eq(currIndex).addClass('current');
			overlay.css('width','100%');
			disableScroll();
			whatsNewBannerPositioning(false);
			
			if (content.is(':hidden')) { 
				// If content is not visible, fade it in at the appropriate slide
				var newPosition = -(parseInt(selectedBanner.css('left').replace('px','')));
				slider.css('left', newPosition);
				content.fadeIn(fadeSpeed);
				banners.eq(currIndex).delay(100).animate({scrollTop:0}, 0);
			} else {
				// Otherwise, animate to position
				var newPosition = -(parseInt(selectedBanner.css('left').replace('px','')));
				banners.eq(currIndex).animate({scrollTop:0}, 0);
				slider.stop().animate({
					left: newPosition
				}, slideSpeed);
			};
			
		});
	};
	
	function whatsNewBannerPositioning(fixPosition) {
		// Position banners side by side via css left
		var banners = jQuery('.whatsNewBanner'),
			bannerWidth = jQuery(document).width() - jQuery('#whatsNewNav').width(),
			slider = jQuery('#whatsNewBannerSlider'),
			currentBanner = jQuery('.whatsNewBanner.current'),
			currIndex = currentBanner.index();
		
		banners.each(function(i) {
			var position = bannerWidth * i;
			jQuery(this).css('left', position);
		});
		if (fixPosition == true) {
			// Fix position of visible banner (for resize)
			if (currentBanner.length > 0) {
				var position = -(parseInt(currentBanner.css('left').replace('px','')));
				slider.css('left', position);
			};
		};
	};
    
    function disableScroll() {
        if (!jQuery('html').hasClass('noscroll')) {
            if (jQuery(document).height() > jQuery(window).height()) {
               var scrollTop = (jQuery('html').scrollTop()) ? jQuery('html').scrollTop() : jQuery('body').scrollTop();
               jQuery('html').addClass('noscroll').css('top',-scrollTop);         
            };
        };
    };
    
    function enableScroll() {
        var scrollTop = parseInt(jQuery('html').css('top'));
        jQuery('html').removeClass('noscroll');
        jQuery('html,body').scrollTop(-scrollTop);
    };
	
	jQuery(function() {
		openWhatsNewNav();
		openWhatsNewContent();
		whatsNewBannerPositioning(true);
	});
	jQuery(window).resize(function() {
		whatsNewBannerPositioning(true);
	});