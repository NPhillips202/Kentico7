// Toggle scripts
	function toggle2() {
		var ele = document.getElementById("toggleText2");
		var text = document.getElementById("displayText2");
		if(ele.style.display == "block") {
			ele.style.display = "none";
			text.innerHTML = "<img src='_images/tandc_button.gif' border='0'>";
		}
		else {
			ele.style.display = "block";
			text.innerHTML = "<img src='_images/tandc_button_minus.gif' border='0'>";
		}
	}
	
	function toggleTrumpBio() {
		var ele = document.getElementById("toggleText2");
		var text = document.getElementById("displayText2");
		if(ele.style.display == "block") {
			ele.style.display = "none";
			text.innerHTML = "<img src='_images/tandc_button.gif' border='0'>Click to read the remainder of Mr. Trump's biography.";
		}
		else {
			ele.style.display = "block";
			text.innerHTML = "";
		}
	}

// Subnavigation expand
	function expandSubnav() {
		var target = jQuery('.subNav > ul > li > ul'),
			speed = 300;
		
		jQuery('.subNav').hover(function() {
			target.stop().hide().slideDown(speed);
		}, function() {
			target.stop().slideUp(speed);
		});
	};
	jQuery(function() {
		expandSubnav();
	});

// Main navigation
	// Detect if subnav exists, if so, add an arrow icon
	var icon = "<span class='navArrow'>&raquo;</span>";
	jQuery('#mainNavList li li').each(function() {
		if (jQuery(this).children('ul').length > 0) {
			jQuery(this).children('a').append(icon);
		};
	});
	// Open on hover
	jQuery('#mainNavList li').hover(function() {
		var subNav = jQuery(this).children('ul'),
			speed = 200,
			width = jQuery(this).parent('ul').outerWidth();
		// Check if subnav exists
		if (subNav.length > 0) {
			subNav.css('left', width);
			subNav.stop().hide().slideDown(speed, function() { 
				// Remove overflow hidden so other subnavs show
				subNav.css('overflow','visible');
			});
		};
	// Close on mouseout
	}, function() {
		var subNav = jQuery(this).children('ul'),
			speed = 200;
		subNav.stop().slideUp(speed);
	});

// Sticky navigation positioning
	function stickyNav() {
		// Don't use this script if on the homepage or on mobile
		if (!jQuery('#slideshowWrapper').length > 0 && jQuery('#isMobile').is(':hidden')) {
			// Reset
			var nav = jQuery('#navBorder'),
				topPos = jQuery(document).scrollTop();
			nav.css('top', topPos);
			
			var bottomOfContent = jQuery('.contentArea').offset().top + jQuery('.contentArea').outerHeight(),
				bottomOfNav = nav.offset().top + nav.outerHeight(),
				bottomDifference = bottomOfContent - bottomOfNav;
			
			// Set top positioning
			//console.log('Nav - ' + bottomOfNav + ' | Content - ' + bottomOfContent + ' | Diff - ' + bottomDifference);
			if (bottomDifference < -1) {
				// If bottom of nav is below bottom of content, move nav up
				var newTopPos = jQuery('.contentArea').outerHeight() - nav.outerHeight();
				nav.css('top', newTopPos+'px');
			} else {
				// Else, stick nav to top
				nav.css('top', topPos+'px');
			};
		};
	};
	jQuery(function() {
		stickyNav();
	});
	jQuery(window).resize(function() {
		stickyNav();
	});
	jQuery(window).scroll(function() {
		stickyNav();
	});

// Misc
	function MM_preloadImages() { //v3.0
		var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
		var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
		if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
	}
	
	function MM_swapImgRestore() { //v3.0
		var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
	}
	
	function MM_findObj(n, d) { //v4.01
		var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
		d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
		if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
		for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
		if(!x && d.getElementById) x=d.getElementById(n); return x;
	}
	
	function MM_swapImage() { //v3.0
		var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
		if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
	}

// Mobile resolution detection based off CSS for consistency
//jQuery(function() {
//	if (jQuery('#isMobile').is(':visible')) {
//		console.log('Is mobile');
//	};
//});