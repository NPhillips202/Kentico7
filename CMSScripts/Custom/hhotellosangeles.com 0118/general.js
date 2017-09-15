var ismobile=0;
jQuery(window).resize(function(){
    if(jQuery(window).width() < 767){
        ismobile=1;
    }
});

 jQuery(window).load(function() {
	 jQuery(".wrapper").css('opacity','1');
 });

/*======================slide toggle script starts==============================*/	
jQuery(document).ready(function () {
	  //jQuery('.home-container').parallax("50%", 0.1);
  
  
  
	if(jQuery(window).width()<767){
        ismobile=1;
    }
	if(ismobile==1)	
	{
		jQuery(document).click(function () {
        jQuery('.em header .make_a_reservation').slideUp();
		});
		jQuery('.check-now #btn-2').click(function (e) {
			e.stopPropagation();
			jQuery('.em header .make_a_reservation').slideToggle();
		});
		jQuery('.em header .make_a_reservation').click(function (e) {
			e.stopPropagation();
		});
	}
	else
	{
		jQuery(document).click(function () {
        jQuery('.make_a_reservation-desktop').slideUp();
		});
		jQuery('.check-now #btn-2').click(function (e) {
			e.stopPropagation();
			jQuery('.make_a_reservation-desktop').slideToggle();
		});
		jQuery('.make_a_reservation-desktop').click(function (e) {
			e.stopPropagation();
		});
	}
});
/*======================slide toggle script end==============================*/	

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

//--- Email signup
jQuery(function() {
	// Form submit
    function submitEmailForm() {
		var email = jQuery('.emailSignUp .signUp').val();
		
		if (email == "your email here" || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
			alert("Please enter a valid email address.");
			return false;
		};
        
		document.location.href = ('/email-sign-up/?em=' + email);
	};
    
    // Submit form when user presses Enter
    jQuery('.signUp').focus(function() {
        jQuery(document.body).delegate('input:text', 'keypress', function(e) {
            if (e.which === 13) {
                e.preventDefault();
                submitEmailForm();
            };
        });
    });
  
    // Submit form when user clicks Submit
	jQuery('#emailSubmitBtn').click(function(e) {
		e.preventDefault();
        submitEmailForm();
    });
});

//--- Sitemap


//Site Map
    jQuery(".em footer .top-ftr ul").append('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');

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
/*====================== menu script starts ==============================*/	
 jQuery(document).ready(function() {
            //jQuery('input,textarea').placeholder();
            jQuery('#menuElem').responsiveMenu({
        menuslide_overlap: true,
        menuslide_direction: 'left',
        onMenuopen: function() {
			
		}
		});
});
/*====================== menu script end ==============================*/	

/*====================== banner script start ==============================*/	
jQuery('.bxslider li').each(function () {
        jQuery(this).find('img').addClass('bannerimage');
        var imgSrc = jQuery(this).find('.bannerimage').attr('src');
        imgSrc = "url(" + imgSrc + ")";
        jQuery(this).css("background-image", imgSrc);
    });




//jQuery(document).ready(function(){
 //var getImageSrc = jQuery('.imageDiv img').attr('src');
 //jQuery('.mid-container').css('background-image', 'url(' + getImageSrc + ')');
 //jQuery('.imageDiv').remove();
//});

//jQuery(document).ready(function(){
// var getImageSrc = jQuery('.bg-img img').attr('src');
// jQuery('.em .mid-container .section-1 .bottom-s1 ul li.img-1').css('background-image', 'url(' + getImageSrc + ')');
// jQuery('.bg-img').remove();
//});

//jQuery(document).ready(function(){
// var getImageSrc = jQuery('.em .mid-container .section-1 .bottom-s1 ul li.img-2 .bg-img2 img').attr('src');
// jQuery('.em .mid-container .section-1 .bottom-s1 ul li.img-2').css('background-image', 'url(' + getImageSrc + ')');
// jQuery('.em .mid-container .section-1 .bottom-s1 ul li.img-2 .bg-img2').remove();
//});
//
//jQuery(document).ready(function(){
// var getImageSrc = jQuery('.em .mid-container .section-1 .bottom-s1 ul li.img-3 .bg-img3 img').attr('src');
// jQuery('.em .mid-container .section-1 .bottom-s1 ul li.img-3').css('background-image', 'url(' + getImageSrc + ')');
// jQuery('.em .mid-container .section-1 .bottom-s1 ul li.img-3 .bg-img3').remove();
//});



//jQuery(document).ready(function(){
 //var getImageSrc = jQuery('.imageDiv1 img').attr('src');
 //jQuery('.section2-left-inner').css('background-image', 'url(' + getImageSrc + ')');
 //jQuery('.imageDiv1').remove();
 


jQuery(document).ready(function(){
 var getImageSrc = jQuery('.imageDiv2 img').attr('src');
 jQuery('.section2-left-inner2').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv2').remove();
 
});

jQuery(document).ready(function(){
 var getImageSrc = jQuery('.imageDiv3 img').attr('src');
 jQuery('.section2-left-inner3').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv3').remove();
 
});

jQuery(document).ready(function(){
 var getImageSrc = jQuery('.imageDiv4 img').attr('src');
 jQuery('.room-view-left-inner').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv4').remove();
 
}); 

jQuery(document).ready(function(){
 var getImageSrc = jQuery('.imageDiv5 img').attr('src');
 jQuery('.col-righttop').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv5').remove();
 
});

jQuery(document).ready(function(){
 var getImageSrc = jQuery('.imageDiv6 img').attr('src');
 jQuery('.col-rightbottom').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv6').remove();
 
});

jQuery(document).ready(function(){
 var getImageSrc = jQuery('.imageDiv7 img').attr('src');
 jQuery('.kitchen-left-inner').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv7').remove();
 
});

jQuery(document).ready(function(){
 var getImageSrc = jQuery('.imageDiv8 img').attr('src');
 jQuery('.kitchen-col-righttop').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv8').remove();
 
});

jQuery(document).ready(function(){
 var getImageSrc = jQuery('.imageDiv9 img').attr('src');
 jQuery('.kitchen-col-rightbottom').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv9').remove();
 
});

jQuery(document).ready(function(){
 var getImageSrc = jQuery('.imageDiv10 img').attr('src');
 jQuery('.chef-image').css('background-image', 'url(' + getImageSrc + ')');
 jQuery('.imageDiv10').remove();
 
});

/*====================== banner script end ==============================*/	

/*======================Sticky start==============================*/	
    function stickyBar() {
        var scroll = jQuery(window).scrollTop();

        if (scroll >= 5) {
            jQuery('header').addClass('sticky');
            jQuery('.banner').addClass('banner-active');
        } else {
             jQuery('header').removeClass('sticky'); 
            jQuery('.banner').removeClass('banner-active');
        }
    }

    jQuery(function() { stickyBar(); });
    jQuery(window).scroll(function() { stickyBar(); });
/*======================Sticky ends==============================*/


/*======================Sticky start==============================*/	
jQuery(document).ready(function() {
//var headerheight = jQuery('.main-header').height();
    jQuery('a.scroll-nav[href^=#]')
      .bind('click.smoothScroll', function(event) {
        event.preventDefault();
        jQuery('html, body').animate({ scrollTop: jQuery( jQuery(this).attr('href') ).offset().top - 86 }, 1000);
      });

});
/*======================Sticky ends==============================*/

/*======================Menu And Reservation Hide Show Start==============================*/
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
/*======================Menu And Reservation Hide Show End==============================*/


/*************************************equal height script start here**************************/ 
jQuery(document).ready(function(){
 var rightblock = jQuery('.section2-right').height() ;
 jQuery('.section2-left-inner').css('height',rightblock);
 jQuery('.section2-right-inner').css('height',rightblock);

}); 

jQuery(window).resize(function(){
 var rightblock = jQuery('.section2-right').height() ;
 jQuery('.section2-left-inner').css('height',rightblock);
 jQuery('.section2-right-inner').css('height',rightblock);
});


jQuery(document).ready(function(){
 var rightblock = jQuery('.section2-right-block').height() ;
 jQuery('.section2-left-inner2').css('height',rightblock);
  jQuery('.section2-right-inner').css('height',rightblock);

}); 

jQuery(window).resize(function(){
 var rightblock = jQuery('.section2-right-block').height() ;
 jQuery('.section2-left-inner2').css('height',rightblock);
  jQuery('.section2-right-inner').css('height',rightblock);
});


jQuery(document).ready(function(){
 var rightblock = jQuery('.section3-right-block').height() ;
 jQuery('.section2-left-inner3').css('height',rightblock);
  jQuery('.section2-right-inner').css('height',rightblock);

}); 

jQuery(window).resize(function(){
 var rightblock = jQuery('.section2-right').height() ;
 jQuery('.section2-left-inner3').css('height',rightblock);
  jQuery('.section2-right-inner').css('height',rightblock);
});



jQuery(".menudesk").mouseover(function(){
    jQuery("hover").addClass("color");
}); 


// -- Gallery 
var initPhotoSwipeFromDOM = function(gallerySelector) {

		// parse slide data (url, title, size ...) from DOM elements
		// (children of gallerySelector)
		var parseThumbnailElements = function(el) {
			var thumbElements = el.childNodes,
				numNodes = thumbElements.length,
				items = [],
				figureEl,
				childElements,
				linkEl,
				size,
				item;

			for(var i = 0; i < numNodes; i++) {


				figureEl = thumbElements[i]; // <figure> element

				// include only element nodes
				if(figureEl.nodeType !== 1) {
					continue;
				}

				linkEl = figureEl.children[0]; // <a> element

				size = linkEl.getAttribute('data-size').split('x');

				// create slide object
				item = {
					src: linkEl.getAttribute('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10)
				};



				if(figureEl.children.length > 1) {
					// <figcaption> content
					item.title = figureEl.children[1].innerHTML;
				}

				if(linkEl.children.length > 0) {
					// <img> thumbnail element, retrieving thumbnail url
					item.msrc = linkEl.children[0].getAttribute('src');
				}

				item.el = figureEl; // save link to element for getThumbBoundsFn
				items.push(item);
			}

			return items;
		};

		// find nearest parent element
		var closest = function closest(el, fn) {
			return el && ( fn(el) ? el : closest(el.parentNode, fn) );
		};

		// triggers when user clicks on thumbnail
		var onThumbnailsClick = function(e) {
			e = e || window.event;
			e.preventDefault ? e.preventDefault() : e.returnValue = false;

			var eTarget = e.target || e.srcElement;

			var clickedListItem = closest(eTarget, function(el) {
				return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
			});

			if(!clickedListItem) {
				return;
			}


			// find index of clicked item
			var clickedGallery = clickedListItem.parentNode,
				childNodes = clickedListItem.parentNode.childNodes,
				numChildNodes = childNodes.length,
				nodeIndex = 0,
				index;

			for (var i = 0; i < numChildNodes; i++) {
				if(childNodes[i].nodeType !== 1) {
					continue;
				}

				if(childNodes[i] === clickedListItem) {
					index = nodeIndex;
					break;
				}
				nodeIndex++;
			}



			if(index >= 0) {
				openPhotoSwipe( index, clickedGallery );
			}
			return false;
		};

		// parse picture index and gallery index from URL (#&pid=1&gid=2)
		var photoswipeParseHash = function() {
			var hash = window.location.hash.substring(1),
			params = {};

			if(hash.length < 5) {
				return params;
			}

			var vars = hash.split('&');
			for (var i = 0; i < vars.length; i++) {
				if(!vars[i]) {
					continue;
				}
				var pair = vars[i].split('=');
				if(pair.length < 2) {
					continue;
				}
				params[pair[0]] = pair[1];
			}

			if(params.gid) {
				params.gid = parseInt(params.gid, 10);
			}

			if(!params.hasOwnProperty('pid')) {
				return params;
			}
			params.pid = parseInt(params.pid, 10);
			return params;
		};

		var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
			var pswpElement = document.querySelectorAll('.pswp')[0],
				gallery,
				options,
				items;

			items = parseThumbnailElements(galleryElement);

			// define options (if needed)
			options = {
				index: index,

				// define gallery index (for URL)
				galleryUID: galleryElement.getAttribute('data-pswp-uid'),

				getThumbBoundsFn: function(index) {
					// See Options -> getThumbBoundsFn section of docs for more info
					var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
						pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
						rect = thumbnail.getBoundingClientRect();

					return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
				},

				// history & focus options are disabled on CodePen
				// remove these lines in real life:
			   history: false,
			   focus: false

			};

			if(disableAnimation) {
				options.showAnimationDuration = 0;
			}

			// Pass data to PhotoSwipe and initialize it
			gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
		};

		// loop through all gallery elements and bind events
		var galleryElements = document.querySelectorAll( gallerySelector );

		for(var i = 0, l = galleryElements.length; i < l; i++) {
			galleryElements[i].setAttribute('data-pswp-uid', i+1);
			galleryElements[i].onclick = onThumbnailsClick;
		}

		// Parse URL and open gallery if it contains #&pid=3&gid=1
		var hashData = photoswipeParseHash();
		if(hashData.pid > 0 && hashData.gid > 0) {
			openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );
		}
	};

	// execute above function
	initPhotoSwipeFromDOM('.my-simple-gallery');
	// get the value from the URL parameter
	var getQueryParams = function( name, url ) {
		if (!url) url = location.href
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( url );
		return results == null ? null : results[1];
	};
	jQuery(window).bind('load', function() {
		jQuery('.my-simple-gallery > figure > a').each(function(){
			var fw = getQueryParams('width', jQuery(this).find('> img').attr('src'));//jQuery(this).find('> img').width();
			var fh = getQueryParams('height', jQuery(this).find('> img').attr('src'));//jQuery(this).find('> img').height();
			jQuery(this).attr('data-size', fw + 'x' + fh);
		});
	});
