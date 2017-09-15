function logMe(str) {
	if (window.console && window.console.log) {
		window.console.log(str);
	};
};

jQuery(function() {
	// Fix for iPhone viewport bug
	if(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
		if (/OS [1-4]/i.test(navigator.userAgent)) {
			jQuery("#footerWrapper").css("position", "static");
		};
	};
	
	// Detect scrollbar width for resizing measurements
	var scrollDiv = document.createElement("div");
	scrollDiv.className = "scrollbar-measure";
	document.body.appendChild(scrollDiv);
	window.scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);
   
	// Navigation dropdowns
	var navElement = jQuery('#topNav > ul > li');
	var navSpeed = 400;
	// Wrap dropdown anchors in span tags for rollovers
	navElement.children('ul').children('li').children('a').each(function() {
		jQuery(this).wrapInner('<span></span>');
	});
    // Reposition dropdowns that are too wide so they are centered
    navElement.each(function() {
        var dropdownWidth = jQuery(this).children('ul').width();
        var buttonWidth = jQuery(this).width();
        var widthDifference = dropdownWidth - buttonWidth;
        if (widthDifference > 0) {
            var margin = Math.round(widthDifference / 2);
            jQuery(this).children('ul').css('left','-'+margin+'px');
        };
    });
	// Open & Close
    if (jQuery(window).width() > 750) {
        navElement.hover(function() {
            if (jQuery(this).children('ul').length > 0) {
                jQuery(this).addClass('active');
                jQuery(this).children('ul').stop(true,false);
                jQuery(this).children('ul').hide(); // Fix for slidedown
                jQuery(this).children('ul').slideDown(navSpeed);
            };
        }, function() {
            jQuery(this).removeClass('active');
            jQuery(this).children('ul:visible').stop(true,false);
            jQuery(this).children('ul:visible').slideUp(navSpeed);	
        });
    });
	
	// Mobile menu
	var menu = jQuery('#topNav');
	jQuery('#mobileMenuBtn').click(function(e) {
		e.preventDefault();
		if (menu.is(':visible')) {
            jQuery('#header').removeClass('navOpen');
			menu.slideUp(600);
		} else {
			menu.slideDown(600, function() {
                jQuery('#header').addClass('navOpen');
            });
		};
	});
	if (jQuery('#mobileMenuBtn').is(':visible')) {
		jQuery('#topNav a, #topNav .menuClose').click(function() {
			menu.slideUp(300);
			return true;
		});
	};
    
    // Add booking link to mobile nav
    if (jQuery(window).width() <= 750) {
        var bookingLink = 'https://gc.synxis.com/rez.aspx?tps=fml&arrive=2014-12-1&adult=1&step=1&hotel=62693&shell=SKBBM&chain=10237&template=SKBBM&avcurrency=USD';
        jQuery('#topNav > ul').prepend('<li class="booking-link"><a href="' + bookingLink + '" target="_blank">Check Availability</a></li>');
    };
    
    // Smooth Scroll
    jQuery('a[rel="relativeanchor"]').click(function(e){
       e.preventDefault();
       jQuery('html, body').animate({
            scrollTop: (jQuery(jQuery.attr(this, 'href')).offset().top) - (jQuery('#header').height() + 10)
        }, 800);
    });
  
    // Subpage content area resizing
    function resizeContentArea() {
        var target = jQuery('#contentAreaSub');
        if (target.length > 0) {
            var headerHeight = jQuery('#header').height();
            var bottomMargin = target.css('marginBottom');
                bottomMargin = parseInt(bottomMargin.replace('px',''));
            var newHeight = jQuery(window).height() - headerHeight - bottomMargin;
            target.css('min-height',newHeight + 'px');
        };
    };
    resizeContentArea();
    jQuery(window).resize(function() {
        resizeContentArea();
    });
    
    // Hide sidebar images if a video exists on subpage - mobile only
    if (jQuery(window).width() <= 750) {
        if ((jQuery('.subGallery').length > 0) && (jQuery('.subVideo').length > 0)) {
            jQuery('.subGallery').hide();
        };
    };
    
    // Replace map description for touch devices
    if (Modernizr.touch) {
        var msg = "Pinch to zoom and swipe to navigate the map.";
        jQuery('.mapDescrip').text(msg);
    };
    
    // Email Form in Footer
    var emailForm = jQuery('#emailForm');
    var defaultValue = "Enter address";
    // Clear text in field when focused
    emailForm.find('.email').focus(function() {
        if (jQuery(this).val() == defaultValue) {
            jQuery(this).val('');
        };
    });
    emailForm.find('.email').blur(function() {
        if (jQuery(this).val() == '') {
            jQuery(this).val(defaultValue);
        };
    });
    // Submit functions
    function submitEmailForm() {
		var email = emailForm.find('.email').val();
		if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
			alert("Please enter a valid email address.");
			return false;
		};
		document.location.href = ('/email-sign-up/?em=' + email);
    };
    emailForm.find('.email').focus(function() {
        jQuery(document.body).delegate('input:text', 'keypress', function(e) {
            if (e.which === 13) {
                e.preventDefault();
                submitEmailForm();
            };
        });
    });
	emailForm.find('.submit').click(function(e) {
		e.preventDefault();
		submitEmailForm();
	});

	// Open footer
	jQuery('#contactDetails a').click(function(e) {
	e.preventDefault();
		var sectionID = jQuery('#footerExpand');
		
		if (jQuery(sectionID).is(':visible')) {
			jQuery(sectionID).slideUp(750, function() {
				jQuery('#contactDetails a').removeClass('on');
			});
		} else {
			jQuery(sectionID).slideDown(750, function() {
				jQuery('#contactDetails a').addClass('on');
			});
		};
	});
	
	function resizeSlideshow() {
		jQuery('.overlaySlideshow .slideshowMainImage img').each(function() {
			var wrapperWidth = jQuery(this).parent().parent().width();
			var wrapperHeight = jQuery(this).parent().parent().height();
			
			// Center images
			if (jQuery(this).width() > wrapperWidth) {
				var difference = Math.floor(jQuery(this).width() - wrapperWidth)/2;
				jQuery(this).css('margin-left', '-' + difference + 'px');
			} else if (jQuery(this).width() < wrapperWidth) {
				var difference = Math.floor(wrapperWidth - jQuery(this).width())/2;
				jQuery(this).css('margin-left', difference + 'px');
			};
		});
	};
	
	function startOverlaySlideshow() {
		// Check if a slideshow is actually on the page
		if (jQuery('.overlaySlideshow').length > 0) {
			// Start slideshow
			jQuery('.overlaySlideshow .slideshowMainImage').cycle({
				fx: 'fade',
				speed: 500,
				timeout: 6000, 
				prev: '.overlaySlideshow .imgPrevArrow',
				next: '.overlaySlideshow .imgNextArrow',
				before: function() {resizeSlideshow();}
			});
			jQuery(window).resize(resizeSlideshow);
		};
	};

    // Site Map
    jQuery(".sitemap-toggle").click(function(e) {
        e.preventDefault();
        if (jQuery('.sitemap-float').is(':visible')) {
            jQuery(".sitemap-float").fadeOut(500);
        } else {
            jQuery(".sitemap-float").fadeIn(500);
        };
    });
	
	// Share widget
	function updateShareWidgetUrls() {
		//var State = History.getState();
		//jQuery('.addthis_toolbox').attr('addthis:url',State.url);
		//addthis.toolbox('.addthis_toolbox');
	};

	// Image Enlarge
	// Rollover icon
	if (Modernizr.touch) {
		// Disable rollover for touch devices
	} else {
		var $enlargeImgArrows = jQuery('<div class="zoomIn" />');
		jQuery('.overlayImgArea .overlayImg').live('hover', function() {
			jQuery(this).append($enlargeImgArrows);
		});
		jQuery('.overlayImgArea .overlayImg').live('mouseout', function() {
			jQuery($enlargeImgArrows).remove();
		});
	};
	
	// Click to enlarge
	jQuery('.overlayImgArea .overlayImg').live('click', function() {
		// Get the image src
		if (jQuery(this).css('background-image') !== 'none') {
			var imgSrc = jQuery(this).css('background-image');
				imgSrc = imgSrc.replace('url(','').replace(')','').replace('"','');
		} else {// Fix for IE8 backgroundsize.htc
			var imgSrc = jQuery(this).children().children('img').attr('src');
		};
		
		var $enlargeImgWrapper = jQuery('<div class="enlargeImgWrapper" />');
		var $enlargeImg = jQuery('<img src="' + imgSrc + '" border="0" alt="" />');
		var $zoomOut = jQuery('<div class="zoomOut" />');
		
		// Create div
		jQuery('.enlargeImgWrapper').remove(); // Clear all existing
		jQuery($enlargeImgWrapper).appendTo(jQuery('.overlayImgArea'));
		jQuery($enlargeImgWrapper).append($enlargeImg);
		jQuery($enlargeImgWrapper).append($zoomOut);
		
		// Set size and position
		var maxWidth = (jQuery('.overlayInner').width() - jQuery('.overlayImgArea').width() + jQuery(this).width());
		var maxHeight = 500;
		var defaultPosition = jQuery(this).position();
		var defaultPositionRight = (jQuery('.overlayImgArea').width() - (defaultPosition.left + jQuery(this).outerWidth()));
		var defaultPositionBottom = (jQuery('.overlayImgArea').height() - (defaultPosition.top + jQuery(this).outerHeight(true)));
		var defaultWidth = jQuery(this).width();
		var defaultHeight = jQuery(this).height();
		var imgWidth = jQuery($enlargeImg).width();
		var imgHeight = jQuery($enlargeImg).height();
		var animateSpeed = 500;
		//logMe("defaultWidth = " + defaultWidth + " | defaultHeight = " + defaultHeight + " | imgWidth = " + imgWidth + " | imgHeight = " + imgHeight + " | maxWidth = " + maxWidth + " | maxHeight = " + maxHeight);
		
		if (jQuery(this).hasClass('img1')) {
			jQuery($enlargeImgWrapper).css('top','0');
			jQuery($enlargeImgWrapper).css('right', defaultPositionRight + 'px');
		} else {
			jQuery($enlargeImgWrapper).css('bottom', defaultPositionBottom + 'px');
			jQuery($enlargeImgWrapper).css('right', defaultPositionRight + 'px');
		};
		
		// Animate expand
		if (imgWidth > maxWidth) {
			jQuery($enlargeImg).css('width', defaultWidth + 'px');
			jQuery($enlargeImg).animate({width:maxWidth + 'px'}, animateSpeed);
		} else {
			jQuery($enlargeImg).css('height', defaultHeight + 'px');
			jQuery($enlargeImg).animate({height:maxHeight + 'px'}, animateSpeed);
		};
		
		// Close enlarged image
		jQuery($enlargeImgWrapper).bind('click', function() {
			jQuery(this).children('img').fadeOut(animateSpeed, function() {
				jQuery(this).remove();
			});
		});
	});

	// ----------------------------------------------------------------------
	// ----------------------------- Box Sizing -----------------------------
	// ----------------------------------------------------------------------
	
	// These are the values for the box widths on various resolutions.
	// The numbers in the first brackets are the number of boxes in each row, 
	// while the second set is the actual widths of each box in that row.
	var colSpans = [];
		//1920+
		colSpans[0] = [[5,4,6],
						[5,4,3,3,2,
						5,4,4,4,
						2,3,4,3,2,3]];
		//1600+
		colSpans[1] = [[4,5,4],
						[5,3,3,3,
						2,3,4,3,2,
                        3,3,5,3,]];
		//1280+
		colSpans[2] = [[3,3,3],
						[5,4,3,
						4,5,3,
						3,5,4]];
		//1024+
		colSpans[3] = [[2,2,3],
						[5,4,
						5,4,
						3,3,3]];
		//750+
		colSpans[4] = [[2,2,2,2,1],
						[4,3,
						4,3,
						3,4,
                        4,3,
                        7]];
		//749-
		colSpans[5] = [[1],
						[5]];
	
	// Set number of columns
	var $container = jQuery('#contentWrapper');
	function setColumns() {
		//logMe("--------------------------------------------------------------");
		// Number of columns
		if ((jQuery(window).width() + window.scrollbarWidth) >= 1920) {
			//logMe('window width(' + jQuery(window).width() + ') + scrollbar width (' + window.scrollbarWidth + ') >= 1920 width');
			window.colNum = 17;
		} else if ((jQuery(window).width() + window.scrollbarWidth) >= 1600) {
			//logMe('window width(' + jQuery(window).width() + ') + scrollbar width (' + window.scrollbarWidth + ') >= 1600 width');
			window.colNum = 14;
		} else if ((jQuery(window).width() + window.scrollbarWidth) >= 1280) {
			//logMe('window width(' + jQuery(window).width() + ') + scrollbar width (' + window.scrollbarWidth + ') >= 1280 width');
			window.colNum = 12;
		} else if ((jQuery(window).width() + window.scrollbarWidth) >= 1024) {
			//logMe('window width(' + jQuery(window).width() + ') + scrollbar width (' + window.scrollbarWidth + ') >= 1024 width');
			window.colNum = 9;
		} else if ((jQuery(window).width()) >= 750) {
			//logMe('window width(' + jQuery(window).width() + ') >= 750 width');
			window.colNum = 7;
		} else if ((jQuery(window).width()) < 750) {
			//logMe('window width(' + jQuery(window).width() + ') < 750 width');
			window.colNum = 5;
		};
		window.colWidth = Math.floor($container.width() / window.colNum);
		
		// Set gutter
		window.gutterWidth = 20;
		jQuery('.contentBox').css('margin-left',window.gutterWidth/2);
		jQuery('.contentBox').css('margin-right',window.gutterWidth/2);
		//logMe("There are " + window.colNum + " columns with a width of " + window.colWidth + "px each");
	};
	
	function resizeGridBoxes($elems) {
		if ($elems) {
			var $selectVisibleBoxes = jQuery($elems);
		} else {
			var $selectVisibleBoxes = jQuery('.contentBox');
		};
		
		// Set the appropriate array index depending on your resolution
		if ((jQuery(window).width() + window.scrollbarWidth) >= 1920) {
			arrIndex = 0;
		} else if ((jQuery(window).width() + window.scrollbarWidth) >= 1600) {
			arrIndex = 1;
		} else if ((jQuery(window).width() + window.scrollbarWidth) >= 1280) {
			arrIndex = 2;
		} else if ((jQuery(window).width() + window.scrollbarWidth) >= 1024) {
			arrIndex = 3;
		} else if ((jQuery(window).width()) >= 750) {
			arrIndex = 4;
		} else if ((jQuery(window).width()) < 750) {
			arrIndex = 5;
		};
		
		// Reset the box heights
		$selectVisibleBoxes.each(function() {
			// Since each box uses a different layout, detect which one it uses and reset it properly
			if (jQuery(this).hasClass('article') && jQuery(this).hasClass('layout1')) {
				jQuery(this).children('.content').css('height','auto');
			} else if (jQuery(this).hasClass('article') && jQuery(this).hasClass('layout2')) {
				jQuery(this).children('.content').css('height','auto');
			} else if (jQuery(this).hasClass('article') && jQuery(this).hasClass('layout3')) {
				jQuery(this).children('.content').css('height','auto');
			} else if (jQuery(this).hasClass('facebook') && jQuery(this).hasClass('layout1')) {
				jQuery(this).children('.content, .imgWrapper').css('height','auto');
			} else if (jQuery(this).hasClass('facebook') && jQuery(this).hasClass('layout2')) {
				jQuery(this).children('.imgWrapper').css('height','auto');
			} else if (jQuery(this).hasClass('gallery') && jQuery(this).hasClass('layout1')) {
				jQuery(this).css('height','auto');
			} else if (jQuery(this).hasClass('gallery') && jQuery(this).hasClass('layout2')) {
				jQuery(this).children('.imgWrapper').css('height','auto');
			} else if (jQuery(this).hasClass('gallery') && jQuery(this).hasClass('layout3')) {
				jQuery(this).children('.imgWrapper').css('height','auto');
			} else if (jQuery(this).hasClass('video') && jQuery(this).hasClass('layout1')) {
				jQuery(this).css('height','auto');
				jQuery(this).children('.playBtn').css('height','auto');
			} else if (jQuery(this).hasClass('twitter') && jQuery(this).hasClass('layout1')) {
				jQuery(this).children('.content').css('height','auto');
			} else if (jQuery(this).hasClass('location') && jQuery(this).hasClass('layout1')) {
				jQuery(this).children('.imgWrapper').css('height','auto');
			} else if (jQuery(this).hasClass('realestate') && jQuery(this).hasClass('layout1')) {
				jQuery(this).children('.content').css('height','auto');
			} else if (jQuery(this).hasClass('quote') && jQuery(this).hasClass('layout1')) {
				jQuery(this).children('.content').css('height','auto');
			};
		});
		
		// Gets the values from the arrays and loops through them endlessly
		var numOfBoxesOnPage = $selectVisibleBoxes.length;
		var boxCount = 0;
		var currWidthIndex = 0;
		var currRowIndex = 0;
		var firstRow = true;
		//logMe("There are " + numOfBoxesOnPage + " boxes on the page");
		// Get the amount of boxes in each row
		boxLoop: for (i=0; i<=colSpans[arrIndex][0].length; i++, currRowIndex++) {
			//logMe("Row " + currRowIndex);
			// Set the widths of each box
			//logMe("Boxes in current row: " + colSpans[arrIndex][0][i]);
			for (j=0; j<=colSpans[arrIndex][0][i]-1; j++, boxCount++, currWidthIndex++) {
				setBoxWidth(colSpans[arrIndex][1][currWidthIndex], boxCount);
				// Loop through set of widths endlessly
				if (currWidthIndex==colSpans[arrIndex][1].length-1) {
					currWidthIndex=-1;
				};
			};
			setRowHeight(colSpans[arrIndex][0][i], boxCount);
			// Stop looping after reaching the last of the items on the page
			if (boxCount>=numOfBoxesOnPage) {
				//logMe("Stopping loop at box " + boxCount);
				firstRow = true; // Reset this var
				break boxLoop;
			};
			// Loop rows endlessly
			if (i==colSpans[arrIndex][0].length-1) i=-1;
		};
		
		function setBoxWidth(colSpan, currentIndex) {
			//logMe("Set box " + (boxCount+1) + " to span " + colSpan + " columns");
			$selectVisibleBoxes.eq(currentIndex).css('width',(window.colWidth * colSpan - window.gutterWidth));
			
			// Shorten the article content
			if ($selectVisibleBoxes.eq(currentIndex).hasClass('article') && $selectVisibleBoxes.eq(currentIndex).hasClass('layout1')) {
				var $content = $selectVisibleBoxes.eq(currentIndex).children('.content');
				var htmlContent = $content.html();
				
				if ($content.width() < 200) {
					var showChar = 115;
				} else if ($content.width() < 400) {
					var showChar = 165;
				} else {
					var showChar = 225;
				};
				
				if(htmlContent.length > showChar) {
					//var c = htmlContent.trim().substring(0, showChar).split(" ").slice(0, -1).join(" ") + "...";
					//$content.html(c);
				};
			};
		};
      
		function setRowHeight(numOfBoxesInRow, currentIndex) {
			// Select the boxes in the row
			var last = (currentIndex);
			var first = (last-numOfBoxesInRow);
			//logMe('Selecting boxes ' + first + ' to ' + (last - 1));
			
			// Find the tallest box
			var maxHeight = -1;
			$selectVisibleBoxes.slice(first,last).each(function() {
				maxHeight = maxHeight > jQuery(this).height() ? maxHeight : jQuery(this).height();
			});
			
			// Assign the same height to all of them
			$selectVisibleBoxes.slice(first,last).each(function() {
				var heightDifference = maxHeight - jQuery(this).height();
				// Since each box uses a different layout, detect which one it uses and add height to the appropriate element
				if (jQuery(this).hasClass('article') && jQuery(this).hasClass('layout1')) {
					jQuery(this).children('.content').css('height','+=' + heightDifference + 'px');
				} else if (jQuery(this).hasClass('article') && jQuery(this).hasClass('layout2')) {
					var topHeight = jQuery(this).children('.topArea').outerHeight() + jQuery(this).children('.divider').outerHeight();
					jQuery(this).children('.imgWrapper').css('top',topHeight + 'px');
					jQuery(this).children('.content').css('height','+=' + heightDifference + 'px');
				} else if (jQuery(this).hasClass('article') && jQuery(this).hasClass('layout3')) {
					jQuery(this).children('.content').css('height','+=' + heightDifference + 'px');
				} else if (jQuery(this).hasClass('facebook') && jQuery(this).hasClass('layout1')) {
					jQuery(this).children('.content, .imgWrapper').css('height','+=' + heightDifference + 'px');
				} else if (jQuery(this).hasClass('facebook') && jQuery(this).hasClass('layout2')) {
					jQuery(this).children('.imgWrapper').css('height','+=' + heightDifference + 'px');
				} else if (jQuery(this).hasClass('gallery') && jQuery(this).hasClass('layout1')) {
					jQuery(this).css('height','+=' + heightDifference + 'px');
				} else if (jQuery(this).hasClass('gallery') && jQuery(this).hasClass('layout2')) {
					jQuery(this).children('.imgWrapper').css('height','+=' + heightDifference + 'px');
				} else if (jQuery(this).hasClass('gallery') && jQuery(this).hasClass('layout3')) {
					jQuery(this).children('.imgWrapper').css('height','+=' + heightDifference + 'px');
				} else if (jQuery(this).hasClass('video') && jQuery(this).hasClass('layout1')) {
					jQuery(this).css('height','+=' + heightDifference + 'px');
					jQuery(this).children('.playBtn').css('height','+=' + heightDifference + 'px');
				} else if (jQuery(this).hasClass('twitter') && jQuery(this).hasClass('layout1')) {
					jQuery(this).children('.content').css('height','+=' + heightDifference + 'px');
				} else if (jQuery(this).hasClass('location') && jQuery(this).hasClass('layout1')) {
					jQuery(this).children('.imgWrapper').css('height','+=' + heightDifference + 'px');
				} else if (jQuery(this).hasClass('realestate') && jQuery(this).hasClass('layout1')) {
					jQuery(this).children('.content').css('height','+=' + heightDifference + 'px');
				} else if (jQuery(this).hasClass('quote') && jQuery(this).hasClass('layout1')) {
					jQuery(this).children('.content').css('height','+=' + heightDifference + 'px');
				};
			});
			//logMe("Set height for this row to " + maxHeight);
		};
	};
	
	// Init function
	function initializeIsotope(init) {
		setColumns();
		resizeGridBoxes();
	};
	
	// Initialize
	initializeIsotope(true);
	jQuery(window).load(initializeIsotope);
	jQuery(window).resize(initializeIsotope);
	
	// Separate the category attributes on the boxes
	jQuery('.contentBox').each(function() {
		var categoryAttr = jQuery(this).attr('category').replace(/\|/g, ' ');
		//logMe(categoryAttr);
		jQuery(this).attr('category', categoryAttr);
	});
});
   
  