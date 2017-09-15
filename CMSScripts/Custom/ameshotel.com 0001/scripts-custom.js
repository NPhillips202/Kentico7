//--Log Function
	function logMe(str) {
		if (window.console && window.console.log) {
			window.console.log(str);
		};
	};

//--Scroll to top on page load
	/(iPhone|iPod|iPad)/i.test(navigator.userAgent) && !location.hash && setTimeout(function () {
		if (!pageYOffset) window.scrollTo(0, 1);
	}, 1);

//--Mobile menu
	jQuery(function() {
		var menu = jQuery('#navigationMobileExpand');
		jQuery('#navigationMobile .menuBtn').click(function(e) {
			e.preventDefault();
			if (menu.is(':visible')) {
				menu.slideUp(600);
			} else {
				menu.slideDown(600);
			};
		});
		
		if (jQuery('#navigationMobile .menuBtn').is(':visible')) {
			jQuery('#navigationMobileExpand a, #navigationMobileExpand .menuClose').click(function() {
				menu.slideUp(300);
				return true;
			});
		};
	});

//--Open/Close Curiosity Boxes
	var curiosityBoxAnimateSpeed = 1700;
	var imageAnimateSpeed = 2300;
	var maxValueOnRandom = 1300;
	var slideSpeed = 1000;
	
	function toggleCuriosityBoxes() {
		curiosityBoxTarget = jQuery('#homeContentWrapper .contentBoxInner');
		if (window.boxToggle == "off") {
			window.boxToggle = "on";
			window.allBoxesVisible = "on";
			window.boxesToggledOff = "no";
			curiosityBoxTarget.each(function() {
				var delay = Math.floor((Math.random()*maxValueOnRandom)+1);
				jQuery(this).css('display','block');
				jQuery(this).delay(delay).stop().animate({'opacity':'1'}, curiosityBoxAnimateSpeed);
				jQuery(this).delay(delay).children('.imageLayer').stop().animate({'margin-top':'0px'}, imageAnimateSpeed);
			});
			jQuery('.toggleBoxes').text('Close All');
		} else {
			window.boxToggle = "off";
			window.allBoxesVisible = "off";
			window.boxesToggledOff = "yes";
			curiosityBoxTarget.each(function() {
				if (!jQuery(this).hasClass('slideBox')) {
					var delay = Math.floor((Math.random()*maxValueOnRandom)+1);
					jQuery(this).delay(delay).stop().animate({'opacity':'0'}, curiosityBoxAnimateSpeed, function() {
						jQuery(this).css('display','none');
					});
					jQuery(this).delay(delay).children('.imageLayer').stop().animate({'margin-top':'400px'}, imageAnimateSpeed);
				} else {
					jQuery(this).animate({'margin-top':'-' + jQuery(this).height() + 'px'}, slideSpeed);
				};
			});
			jQuery('.toggleBoxes').text('Open All');
		};
	};
	
	jQuery(function() {
		window.boxToggle = "off";
		window.allBoxesVisible = "off";
		window.boxesToggledOff = "no";
		jQuery('.toggleBoxes').click(toggleCuriosityBoxes);
		
		// Curiosity Box Hover State
		jQuery('#homeContentWrapper .contentBox').hover(function() {
			if (window.allBoxesVisible == "off" && window.boxesToggledOff == "no") {
				jQuery(this).children('.contentBoxInner').stop().animate({'opacity':'1'}, curiosityBoxAnimateSpeed);
				jQuery(this).children('.contentBoxInner').children('.imageLayer').stop().animate({'margin-top':'0px'}, imageAnimateSpeed);
			};
		}, function() {
			if (window.allBoxesVisible == "off" && window.boxesToggledOff == "no") {
				jQuery(this).children('.contentBoxInner:not(.visible)').stop().animate({'opacity':'0'}, curiosityBoxAnimateSpeed);
				jQuery(this).children('.contentBoxInner:not(.visible)').children('.imageLayer').stop().animate({'margin-top':'400px'}, imageAnimateSpeed);
			};
		});
		
		// Instructions Box
		jQuery('#homeContentWrapper #instructionsBox .openBox').click(function(e) {
			e.preventDefault();
			jQuery('#homeContentWrapper #instructionsBox .contentBoxInner').animate({'margin-top':'0px'}, slideSpeed, function() {
				toggleCuriosityBoxes();
			});
		});
		
		// Show default boxes after a few seconds
		//setTimeout(function(){
		//	jQuery('#navBox').children('.contentBoxInner').stop().animate({'opacity':'1'}, curiosityBoxAnimateSpeed);
		//	jQuery('#navBox').children('.contentBoxInner').children('.imageLayer').stop().animate({'margin-top':'0px'}, imageAnimateSpeed);
		//}, 2250);
		//setTimeout(function(){
		//	jQuery('#offersBox').children('.contentBoxInner').stop().animate({'opacity':'1'}, curiosityBoxAnimateSpeed);
		//	jQuery('#offersBox').children('.contentBoxInner').children('.imageLayer').stop().animate({'margin-top':'0px'}, imageAnimateSpeed);
		//}, 2900);
		//setTimeout(function(){
		//	jQuery('#bestOfBostonBox').children('.contentBoxInner').stop().animate({'opacity':'1'}, curiosityBoxAnimateSpeed);
		//	jQuery('#bestOfBostonBox').children('.contentBoxInner').children('.imageLayer').stop().animate({'margin-top':'0px'}, imageAnimateSpeed);
		//}, 3650);
        
        // Show all boxes by default
        // ! This overwrites all hover functionality !
        jQuery(function() {
            setTimeout(function(){
            	toggleCuriosityBoxes();
            }, 1000);
        });
	});

//--Collapse Curiosity Boxes on Mobile
	jQuery(function() {
		var collapseBtn = jQuery('.contentBoxCollapseBtn');
		var collapseTarget = jQuery('#homeContentWrapper');
		var speed = 900;
		collapseBtn.click(function() {
			if (collapseBtn.hasClass('collapsed')) {
				collapseBtn.removeClass('collapsed');
				collapseTarget.animate({'height':'198px'}, speed);
			} else {
				collapseBtn.addClass('collapsed');
				collapseTarget.animate({'height':'45px'}, speed);
			};
		});
	});

//--Update instructions for touch devices
	jQuery(function() {
		if (Modernizr.touch) {
			var msg = "Touch inside any box to learn about Ames";
			jQuery('#instructionsBox .instructionsText').text(msg);
		};
	});

//--Site Map
	jQuery(function() {
		jQuery(".sitemap-toggle").click(function(e) {
			e.preventDefault();
			if (jQuery('.sitemap-float').is(':visible')) {
				jQuery(".sitemap-float").fadeOut(500);
			} else {
				jQuery(".sitemap-float").fadeIn(500);
			};
		});
	});

//--Subnav Box Layout
	jQuery(function() {
		var divs = jQuery('#subNavBoxWrapper > a');
		for (var i=0, e=1; i<divs.length; i+=2) {
			var theseElements = divs.slice(i, i+2);
            if (theseElements.length < 2) {
              return false;
            };
            
            if (e==1) {
              e=2;
              theseElements.wrapAll("<div class='subNavBoxRow v1'></div>");
            } else if (e==2) {
              e=1;
              theseElements.wrapAll("<div class='subNavBoxRow v2'></div>");
            };
		};
	});

//--Main Navigation Collapsing
    jQuery(function() {
        var links = jQuery('#navigation li');
        for (var i=0; i<links.length; i+=3) {
            links.eq(i+2).addClass('topRowEnd');
            links.eq(i+2).append('<div class="break"></div>');
        };
    });

//--Remove right column if empty
    jQuery(function() {
		if (jQuery('#specials').length > 0) { // Extra statement to avoid errors
			if (!jQuery('#specials').html().replace(/ /g,'').length > 0) {
				jQuery('#specials').remove();
			};
		};
    });

    jQuery(function() { 
        if ((jQuery(document).width() <= 615) || (jQuery(window).width() <= 615)) {
           jQuery('#menuElem').append('<li><a href="/"><img src="/getmedia/22b18f3f-e191-4fc7-9ee9-e4dc7bf3f3db/us-flag"></a><a href="/Page-d’accueil-de-l’hotel-Ames-Boston"><img src="/getmedia/eba0222c-2880-4fbe-94d8-543a72b634f5/fr-flag"></a><a href="/Pagina-de-inicio-de-Ames-Boston-Hotel"><img src="/getmedia/712b3489-8582-49b8-98ef-285d41ac5868/es-flag"></a><a href="/艾姆斯波士顿酒店登录页"><img src="/getmedia/55b52ed3-0e2a-460a-8126-1ab785de301f/cn-flag"></a></li>');
           jQuery('#menuElem li:last-child a').css('display','inline');
           jQuery('#menuElem li:last-child').css('padding-left','23px');
           jQuery('#menuElem li:last-child a').css('padding','7px 10px 7px 0');
        };
    });