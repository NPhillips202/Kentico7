var browser = {
  touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch
};

$(function(){
	
	var counter = 0;
	//show links
	//$('.show-bookings, #m03 a[href$="/find"], a[href$="/find"]').click(function(event){
	$(document).on('click', '.show-bookings, a[href$="/search/"], a[href$="/find"], a[href$="/search/category/leisure/"], a[href$="/search/category/business/"]', function(event){
		
        //if(jQuery(this).attr('href') == "/book") {
        //console.log(jQuery(this).attr('href'));
        //console.log(jQuery(this).is('[href^="https://mobile"]'));
        //console.log(!jQuery(this).is('.show-bookings'));
        if(jQuery(this).is('.show-bookings') && jQuery(this).is('[href^="https://mobile"]')){
            return true;
        } else {
            event.preventDefault();
            
            if(!$('body').hasClass("property")) {
                if ($(this).parents('#booking').length) switchHotelFinderLinks('booking');
                else switchHotelFinderLinks('pages');
            }
    
            openFind();
        }
	});
	
	$("#find-close").click(function(event){
		event.preventDefault();
		closeFind();
	});
	$("#find-back").click(function(){
		findBack();
	});
	$(".show-next").click(function(event){
		event.preventDefault();
		var current = $(this);
		$('html, body').animate({
			scrollTop: $("#find-header").offset().top
		}, 300, function(){
			$(current).next().addClass("current").css({
				display:"block"
			}).animate({left:"0"}, 500, function(){
				$("#find-back").html("Locations > " + current.text());
			});
		});
		return false;
	});
	
	$(".show-before").click(function(event){
		event.preventDefault();
		findBack();
	});
		
	$("#find-by a").click(function(event){
		event.preventDefault();

		$("#find-by a").removeClass("active");
		$(this).addClass("active");

		if($(this).attr("id") == "find-by-property"){
			
			if(!$("#by-property").hasClass("current")){
				$('html, body').animate({
					scrollTop: $("#find-header").offset().top
				}, 200, function(){
					$("#by-property").css({
						display:"block",
						zIndex:"100"
					}).animate({left:0},500,function(){
						$("#by-location").css({
							display:"none",
							position:"absolute",
							top:"101px",
							left:'100%'
						}).removeClass("current");
						$("#by-property").addClass("current").css({
							position:"relative",
							top:"auto",
							left:"auto",
							zIndex:"1"
						});
						findBack();
					});
				});
			}

		}else{
			if(!$("#by-location").hasClass("current")){
				$('html, body').animate({
					scrollTop: $("#find-header").offset().top
				}, 200, function(){
					$("#by-location").css({
						display:"block",
						zIndex:"100"
					}).animate({left:0},500,function(){
						$("#by-property").css({
							display:"none",
							position:"absolute",
							top:"101px",
							left:'100%'
						}).removeClass("current");
						$("#by-location").addClass("current").css({
							position:"relative",
							top:"auto",
							left:"auto",
							zIndex:"1"
						});
						findBack();
					});
				});
			}

		}
        return false;
	});
	
	if($('#photo ul > li').length > 1 ) {
		$('#photo').glide({
			autoplay: 5000,
			arrows: (browser.touch) ? false : true,
			nav: false
		});
		setTimeout(function(){ $('#photo').addClass('glidejs-slider')}, 500);
	}
	
	$('#menu, #hidden-menu .close').click(function(){
		if( $('#header').hasClass('open') ) {
			$('#header').removeClass('open');
			$('#book').show();
		} else {
			$('#header').addClass('open');
			$('#book').hide();
		}
	});
	
	$('#book').click(function(e){
        //if(jQuery(this).attr('href') == "#") {
            e.preventDefault();
            if( $('#header').hasClass('closed') ) {
                $(this).removeClass('closed');
                $('#header').removeClass('closed');
            } else {
                $(this).addClass('closed');
                $('#header').addClass('closed');
            }
        //} else {
        //    return true;
        //}
	})

    /*if( $('#gallery').length ) {
        $('.gallery a').click(function(e){
            //e.preventDefault();
            var id = $(this).data('id');
            initGallery(imgList[id], $(this).parent().index());
        });
    }*/
	
	if( $('body').hasClass('home') ) {
		var k = ($('#content > h1 + h2').length) ? 2 : 1;
		$('#content > *').each(function(i){
			if( i > k && !$(this).hasClass('rarr') ) {
				$(this).addClass('hide');
			}
		});
	}
	
 	$('#read-more').click(function(e){
 		e.preventDefault();
		
		if( $(this).hasClass('opened') ){
			$('#read-more').removeClass('opened');
			$('#content .hide').hide();
		} else {
			$('#read-more').addClass('opened');
			$('#content .hide').show();
		}
		
		
 	});
	
	//STAY CONNECTED SIMPLE VALIDATION
	/*$('#stayconnected').submit(function () {

	    var name = $.trim($('#newsletter-email').val());
	    if (name === '') {
	        alert('Email is empty.');
	        return false;
	    }
	});*/

});

/*function initGallery(imgs, curImg){
	var galleryWrap = $('<div />', {id: "bigimage"}),
			gallerySwipe = $('<div />', {id: 'gallerySwipe'}),
			galleryList = $('<ul />'),
			li;
	
	gallerySwipe.appendTo(galleryWrap);
	
	$.each(imgs, function(i, val){
		li = $('<li />');
		$('<img />', {src: val.path, title: val.caption}).appendTo(li);

		if(val.caption)	$('<p />').html(val.caption).appendTo(li);

		li.appendTo(galleryList);
	});	
	$('<i class="close" />').appendTo('body');
	galleryList.appendTo(gallerySwipe);
	galleryWrap.appendTo('body').show();

    var glide = $('#gallerySwipe').glide({
        autoplay: 5000,
        arrows: (browser.touch) ? false : true,
        nav: false
    }).data('api_glide');

    glide.jump(curImg+1);

	$('.close').click(function(e){
		$(this).remove();
		galleryWrap.remove();
	});
	
}*/

function openFind(){
	$("#viewport-wrap, body, html").css({height:"100%"});
	$("#find-location").css({display:"block"}).animate({left:"0"}, 500, function(){
		$("#header, #content,#footer").hide();
	});
}
function closeFind(){
	$("#find-location").animate({left:"100%"}, 500, function(){
		$("#find-location").css({display:"none"});
		$("#find-location ul ul").css({
			display:"none",
			left:"100%"
		});
	});
	$("#header, #content,#footer").show();
	$("#viewport-wrap, body, html").css({height:"auto"});
}
function findBack(){
	$("#by-location ul ul").animate({
		left:"100%"
	},500, function(){
		$("#by-location ul ul").css({
			display:"none"
		});
		$("#find-back").text("Find a Hotel");
	});
}

function switchHotelFinderLinks (switchTo){
	switchTo = switchTo || 'pages';

	$('#find-location .link').each(function() {
		var target = $(this);
		var slug = target.data('slug');
		var bookingLink = target.data('booking-link');
		var omniture = target.data('omniture');

		if (switchTo == 'booking') {
			target.attr({
				'href': bookingLink,
				'target': '_blank',
				'onclick': omniture
			})
		} else {
			target.attr({
				'href': slug,
				'target': null,
				'onclick': null
			})
		}
	});
}