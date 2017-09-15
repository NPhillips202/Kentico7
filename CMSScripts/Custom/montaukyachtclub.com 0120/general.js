
 jQuery(window).load(function() {
     //jQuery(".wrapper").css('opacity', '1');
   jQuery('.page-loader').delay(300).fadeOut('slow');
   //jQuery('#seconds').delay(200).fadeOut('slow');
 });

 var jQuery = jQuery.noConflict();

 jQuery(document).ready(function() {
     jQuery('input,textarea').placeholder();
 });


 /*====================== datetimepicker script ends ==============================*/
 jQuery(document).ready(function() {
     jQuery("#datepicker1").datepicker({
         monthNamesShort: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
         dateFormat: 'MM dd, yy',
         minDate: 0,
         showButtonPanel: true,
     });
     jQuery("#datepicker2").datepicker({
         monthNamesShort: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
         dateFormat: 'MM dd, yy',
         minDate: 0,
         showButtonPanel: true,
     });
     jQuery("#datepicker3").datepicker({
         monthNamesShort: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
         dateFormat: 'MM dd, yy',
         minDate: 0,
         showButtonPanel: true,
     });
 });
 /*====================== datetimepicker script ends ==============================*/
//---------- Added
 
 jQuery('.tab-content .tab-pane:first-child').addClass('in active');
 jQuery('ul.nav-tabs li:first-child').addClass('in active');
 jQuery('.enumenu_container #menuElem').prepend('<li class="logo-responsive"><a href="/"><img src="/getmedia/e7f681ef-17c8-4597-92ef-501394416158/logo_bg"></a></li>');
 jQuery('.enumenu_container #menuElem').prepend('<li><img src=" /getmedia/3c10a2b6-78fb-4ec8-9e0d-754caeed86cb/close" class="close-menu" alt="Close" title="Close"></a></li>');

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


//Site Map
    //jQuery(".em footer .top-ftr ul").append('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
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
//---------- End Added

 /*======================slide toggle script starts==============================*/
 var jQuery = jQuery.noConflict();
 jQuery(document).ready(function() {

     jQuery('.em .btn-2').click(function() {
         jQuery('.em header .make_a_reservation').slideDown();
     });
     jQuery('.em .close').click(function(e) {
         e.stopPropagation();
         jQuery('.em header .make_a_reservation').slideUp();
     });

 });
 /*======================slide toggle script end==============================*/

 /*======================slider script start==============================*/


 jQuery('#owl-demo-banner').owlCarousel({
     loop: true,
     margin: 0,
     autoplay: true,
     smartSpeed: 800,
     slideSpeed: 1500,
     mouseDrag: true,
     dots: true,
     paginationSpeed: 1500,
     responsive: {
         0: {
             items: 1
         },
         600: {
             items: 1
         },
         1000: {
             items: 1
         }
     }
 });

 jQuery('#owl-demo-light').owlCarousel({
     loop: true,
     margin: 0,
     navigation: false,
     autoplay: true,
     smartSpeed: 800,
     slideSpeed: 1500,
     mouseDrag: true,
     pagination: true,
     paginationSpeed: 1500,
     rewindSpeed: 100,
     responsive: {
         0: {
             items: 1
         },
         600: {
             items: 1
         },
         1000: {
             items: 1
         }
     }
 });

 var owl = jQuery('#owl-demo-activities').owlCarousel({
     loop: true,
     margin: 0,
     nav: true,
     //autoplay: true,
     navText: ['previous', 'next'],
     navElement: 'div',
     autoplaySpeed: 700,
     navClass: ['owl-prev-activities', 'owl-next-activities'],
     responsive: {
         0: {
             items: 1
         },
         992: {
             items: 1,
             navText: false,
         },
         1000: {
             items: 1
         }
     }
 });


 //owl.on('change.owl.carousel', function(event) {

     //var c = ["rgba(255,255,255,0.5)", "rgba(255,255,255,0.5)", "rgba(21, 40, 77, 0.50);", "rgba(255,255,255,0.5)", "rgba(21, 40, 77, 0.50);"];
     //var currentIndex = jQuery('#owl-demo-activities .owl-stage div.active').index();
     //var getColor = c[currentIndex];

     //jQuery('.owl-prev-activities').css('color', '' + getColor + '');
     //jQuery('.owl-next-activities').css('color', '' + getColor + '');


    // jQuery('.owl-prev-activities::before').css('color', '' + getColor + '');
     //jQuery('.owl-next-activities::before').css('color', '' + getColor + '');
 //});




 jQuery('#owl-demo-wedding').owlCarousel({
     loop: true,
     margin: 53,
     nav: true,
     mouseDrag: false,
     autoplay: false,
     responsive: {
         0: {
             items: 1
         },
         200: {
             items: 1,
             autoHeight: false,
             autoplay: true,
             loop: true,
             mouseDrag: true,
         },
         768: {
             items: 2,
             loop: true,
             margin: 30,
             autoplay: true,
             autoHeight: false,
             mouseDrag: true,
         },

         992: {
             items: 3
         }
     }
 });


jQuery('#lessItems').owlCarousel({

     loop: true,
     margin: 55,
     nav: true,
     autoplay: false,
     touchDrag: false,
     mouseDrag: false,
     transitionStyle: "fade",
     responsive: {
         0: {
             items: 1
         },
         200: {
             items: 1,
             margin: 30,
             loop: true,
             autoplay: false,
             touchDrag: true,
             mouseDrag: true,
             autoHeight: true
         },
         768: {
             items: 2,
             margin: 30,
             loop: true,
             autoplay: false,
             touchDrag: true,
             mouseDrag: true
         },

         1000: {
             //items: function() { return ( (jQuery('#owl-demo1').length > 2) ? 3 : 2) }
             items: 2
         }
     }
 });

 jQuery('.main-site').owlCarousel({

     loop: true,
     margin: 55,
     nav: true,
     autoplay: true,
     touchDrag: false,
     mouseDrag: false,
     transitionStyle: "fade",
     responsive: {
         0: {
             items: 1
         },
         200: {
             items: 1,
             margin: 30,
             loop: true,
             autoplay: true,
             touchDrag: true,
             mouseDrag: true,
             autoHeight: true
         },
         768: {
             items: 2,
             margin: 30,
             loop: true,
             autoplay: true,
             touchDrag: true,
             mouseDrag: true
         },

         1000: {
             //items: function() { return ( (jQuery('#owl-demo1').length > 2) ? 3 : 2) }
             items: 3
         }
     }
 });



 

 /*======================slider script start==============================*/
//jQuery('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  //owl.init();
//})

jQuery(document).ready(function () {
    
    initialize_owl(jQuery('#owl-rooms1'));

    jQuery('a.navTab1').on('shown.bs.tab', function () {
        initialize_owl(jQuery('#owl-rooms1'));
    }).on('hide.bs.tab', function () {
        destroy_owl(jQuery('#owl-rooms1'));
    });

    jQuery('a.navTab2').on('shown.bs.tab', function () {
        initialize_owl(jQuery('#owl-rooms2'));
    }).on('hide.bs.tab', function () {
        destroy_owl(jQuery('#owl-rooms2'));
    });

    jQuery('a.navTab3').on('shown.bs.tab', function () {
        initialize_owl(jQuery('#owl-rooms3'));
    }).on('hide.bs.tab', function () {
        destroy_owl(jQuery('#owl-rooms3'));
    });

    jQuery('a.navTab4').on('shown.bs.tab', function () {
        initialize_owl(jQuery('#owl-rooms4'));
    }).on('hide.bs.tab', function () {
        destroy_owl(jQuery('#owl-rooms4'));
    });
});

function initialize_owl(el) {
    el.owlCarousel({
    loop:false,
    margin:40,
    nav:true,
    touchDrag:false,
    mouseDrag:false,
	transitionStyle:"fade",
		items:3,
        responsive:{
        0:{
            items:1
        },
        200:{
            items:1,loop:true,autoplay:true,autoHeight:true,touchDrag:true,mouseDrag:true
        },
    768:{
            items:2,margin:30,loop:true,autoplay:true,nav:false,touchDrag:true,mouseDrag:true,autoHeight:true
        },
  
        992:{
            items:3
        }
    }
    });
}

function destroy_owl(el) {
    el.data('owlCarousel').destroy();
}




 /*======================slider script end==============================*/


 /*======================Sticky start==============================*/
 jQuery(document).ready(function() {
     var stickyNavTop = jQuery('header').offset().top;

     var stickyNav = function() {
         var scrollTop = jQuery(window).scrollTop();

         if (scrollTop > stickyNavTop) {
             jQuery('header').addClass('sticky');
         } else {
             jQuery('header').removeClass('sticky');
         }
     };

     stickyNav();

     jQuery(window).scroll(function() {
         stickyNav();
     });
 });
 /*======================Sticky ends==============================*/

 /*************************************equal height script start here**************************/


 ;
 (function(jQuery) {
     jQuery.fn.equalHeight = function(option) {
         var jQuerythis = this
         var get_height = function() {
             var maxheight = 0;
             jQuerythis.css("height", "")
             jQuerythis.each(function() {
                 maxheight = jQuery(this).height() > maxheight ? jQuery(this).height() : maxheight;
             })
             jQuerythis.height(maxheight)
         }
         var init = function() {
             get_height()
             jQuery(window).bind("resize", get_height)
         }
         jQuerythis.destroy = function() {
             jQuerythis.css("height", "")
             jQuery(window).unbind("resize", get_height)

         }
         init()
         return this
     }
 })(jQuery)

 jQuery(window).load(function() {
     jQuery(".em .restaurants-detail .restaurants-view-content").equalHeight();
     //jQuery(".em .room-wrap-class").equalHeight();
     jQuery(".em .section-wedding .restaurants-view-content h5").equalHeight();
     jQuery(".em .section-wedding .restaurants-view-content h3").equalHeight();
     jQuery(".em .section-wedding .restaurants-view-content p").equalHeight();
     jQuery(".em .section-wedding .restaurants-view-content a").equalHeight();
     jQuery(".em .see-menu-btn").equalHeight();
     jQuery(".em .room-view-content").equalHeight();
 });

 jQuery(window).resize(function() {
     jQuery(".em .restaurants-detail .restaurants-view-content").equalHeight();
     //jQuery(".em .room-wrap-class").equalHeight();
     jQuery(".em .section-wedding .restaurants-view-content h5").equalHeight();
     jQuery(".em .section-wedding .restaurants-view-content h3").equalHeight();
     jQuery(".em .section-wedding .restaurants-view-content p").equalHeight();
     jQuery(".em .section-wedding .restaurants-view-content a").equalHeight();
     jQuery(".em .restaurants-block").equalHeight();
     jQuery(".em .room-view-content").equalHeight();
 });







 /* background image js */

 /*banner image*/
 jQuery(document).ready(function() {
     var getImageSrc = jQuery('.imgdiv img').attr('src');
     jQuery('.owl-carousel .slide-1').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.imgdiv').remove();
 });

 jQuery(document).ready(function() {
     var getImageSrc = jQuery('.imgdiv2 img').attr('src');
     jQuery('.owl-carousel .slide-2').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.imgdiv2').remove();
 });

 jQuery(document).ready(function() {
     var getImageSrc = jQuery('.imgdiv3 img').attr('src');
     jQuery('.owl-carousel .slide-3').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.imgdiv3').remove();
 });

 /*lightbox slider image*/
 jQuery(document).ready(function() {
     var getImageSrc = jQuery('.lightimg1 img').attr('src');
     jQuery('.owl-carousel .light-1').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.lightimg1').remove();
 });
 jQuery(document).ready(function() {
     var getImageSrc = jQuery('.lightimg2 img').attr('src');
     jQuery('.owl-carousel .light-2').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.lightimg2').remove();
 });
 jQuery(document).ready(function() {
     var getImageSrc = jQuery('.lightimg3 img').attr('src');
     jQuery('.owl-carousel .light-3').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.lightimg3').remove();
 });
 jQuery(document).ready(function() {
     var getImageSrc = jQuery('.lightimg4 img').attr('src');
     jQuery('.owl-carousel .light-4').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.lightimg4').remove();
 });


 /*beach slider image*/
 jQuery(document).ready(function() {
     var getImageSrc = jQuery('.beachimg1 img').attr('src');
     jQuery('.owl-carousel .beach1').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.beachimg1').remove();
 });
 jQuery(document).ready(function() {
     var getImageSrc = jQuery('.beachimg2 img').attr('src');
     jQuery('.owl-carousel .beach2').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.beachimg2').remove();
 });
 jQuery(document).ready(function() {
     var getImageSrc = jQuery('.beachimg3 img').attr('src');
     jQuery('.owl-carousel .beach3').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.beachimg3').remove();
 });
 jQuery(document).ready(function() {
     var getImageSrc = jQuery('.beachimg4 img').attr('src');
     jQuery('.owl-carousel .beach4').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.beachimg4').remove();
 });



 /*wedding slider image*/
 jQuery(document).ready(function() {
     var getImageSrc = jQuery('.wedding img').attr('src');
     jQuery('.wedding-img').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.wedding').remove();
 });
 jQuery(document).ready(function() {
     var getImageSrc = jQuery('.wedding2 img').attr('src');
     jQuery('.wedding-img2').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.wedding2').remove();
 });
 jQuery(document).ready(function() {
     var getImageSrc = jQuery('.wedding3 img').attr('src');
     jQuery('.wedding-img3').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.wedding3').remove();
 });


 /* sub page*/


 jQuery(document).ready(function() {
     var getImageSrc = jQuery('.imageDiv1 img').attr('src');
     jQuery('.banner-fixed').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.imageDiv1').remove();


     var getImageSrc = jQuery('.imageDiv2 img').attr('src');
     jQuery('.restaurants-view').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.imageDiv2').remove();


     var getImageSrc = jQuery('.imageDiv3 img').attr('src');
     jQuery('.restaurants-view-2').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.imageDiv3').remove();


     var getImageSrc = jQuery('.imageDiv4 img').attr('src');
     jQuery('.restaurants-view-3').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.imageDiv4').remove();


     var getImageSrc = jQuery('.imageDiv5 img').attr('src');
     jQuery('.banner-fixed-room').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.imageDiv5').remove();


     var getImageSrc = jQuery('.imageDiv6 img').attr('src');
     jQuery('.room-view-1').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.imageDiv6').remove();


     var getImageSrc = jQuery('.imageDiv7 img').attr('src');
     jQuery('.room-view-2').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.imageDiv7').remove();


     var getImageSrc = jQuery('.imageDiv8 img').attr('src');
     jQuery('.room-view-3').css('background-image', 'url(' + getImageSrc + ')');
     jQuery('.imageDiv8').remove();


 });



 /*======================Menu And Reservation Hide Show Start==============================*/
 var jQuery = jQuery.noConflict();
 if (jQuery(window).width() < 481) {
     jQuery(document).ready(function() {
         jQuery(".menu-icon").click(function() {
             jQuery(".make_a_reservation").css('display', 'none');
         });
     });


     jQuery(document).ready(function() {
         jQuery("#btn-2").click(function() {

             jQuery(".em").removeClass('menu-open');
             jQuery(".menu-icon ").removeClass('active');

         });
     });
 }

 jQuery(document).ready(function() {
     jQuery(".close-menu").click(function() {
         jQuery(".menu-open").removeClass('menu-open');
     });
 });

 /*======================Menu And Reservation Hide Show End==============================*/




 /*====================== menu script starts ==============================*/
 var jQuery = jQuery.noConflict();
 jQuery(document).ready(function() {
     //jQuery('input,textarea').placeholder();
     jQuery('#menuElem').responsiveMenu({
         'menuIcon_text': '',
         menuslide_push: true,
         menuslide_direction: 'left',
         onMenuopen: function() {}
     });

 });

// -- Gallery 
  jQuery(function() {
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

	});


 /*====================== menu script end ==============================*/