var time_1;
var time_2;
var time_3;
var slider_started;

function index_ready(){
	
	set_booking_css_index();
	
	$('.slide._1 > img').imagesLoaded(function(){
		setTimeout(function(){
			$('.slide._1 > img').addClass('firstSlideHome');
		},500);
		
		timer_show_pay = setTimeout(show_pay,1300);
		timer_show_scroll = setTimeout(show_scroll,2600);
	});
	
	

	
	if($(window).scrollTop() >= $(window).height()/2-45 && !$('#menu').hasClass('fixed')){
		$('#menu').addClass('fixed');
	} else {
		start_slider();
	}
	
	$('.lower._1 .w35 img:eq(0)').imagesLoaded(function(){
		setTimeout(function(){
			$('.lower._1 .content').each(function(){
				$(this).css('top',($('.lower._1 .w35 img').height()-$(this).height())/2+'px');
			})
		},500);	
	});
	
	$('.lower._2 .w35 img:eq(0)').imagesLoaded(function(){
		setTimeout(function(){
			$('.lower._2 .content .side_text').each(function(){
				$(this).css('top',($('.side_title').height()/4)+($('.lower._2 .w35 img').height()-$(this).height())/2+'px');
			})
		},500);	
	});
	
	$('#index .lower._2 .discover_more').bind(_mouseenter,function(){
		$('#index .lower._2 .w35:eq('+$(this).index('.discover_more')+')').trigger(_mouseenter);
	}).bind(_mouseleave,function(){
		$('#index .lower._2 .w35:eq('+$(this).index('.discover_more')+')').trigger(_mouseleave);
	});
	
	$(window).resize(function(){
		$('.lower._1 .content').each(function(){
			$(this).css('top',($('.lower._1 .w35 img').height()-$(this).height())/2+'px');
		})
		$('.lower._2 .content .side_text').each(function(){
				$(this).css('top',($('.side_title').height()/4)+($('.lower._2 .w35 img').height()-$(this).height())/2+'px');
			})
	})

}

function index_scroll(){
	
	if($(window).scrollTop() >= 10 && $('.booking_label').hasClass('hidden_panel')){	
		setTimeout(function(){
		$('.booking_label').removeClass('hidden_panel');
		$('.booking_panel').removeClass('hidden_panel');
		},150);
	}
	
	
	if($(window).scrollTop() == 0){
		$('.booking_label,.booking_panel').addClass('hidden_panel');

		if(!$('#menu').hasClass('opened')){
		timer_show_pay = setTimeout(show_pay,1000);
			if(!slider_started){
				start_slider();
			}
		}
	}
	
	if($(window).scrollTop() > 0 && slider_started){
		stop_slider();
	}
	
	if($(window).scrollTop() > $('.lower._1').position().top-$(window).height() && !$('.lower._1').hasClass('visible')){
		$('.lower._1').addClass('visible');
		$('.lower._1 > div').each(function(i){
			setTimeout(function(){$('.lower._1 >div:eq('+i+')').removeClass('hidden_by_scaling_low')},100*i);
		})
		$('.lower._1 .frame').each(function(i){
			setTimeout(function(){$('.lower._1 .frame:eq('+i+')').removeClass('hidden_by_scaling_low')},700+(100*i));
			setTimeout(function(){$('.lower._1 .title:eq('+i+')').removeClass('top_single')},1000+(100*i));
			setTimeout(function(){$('.lower._1 .separator:eq('+i+')').removeClass('top_single')},1100+(100*i));
			setTimeout(function(){$('.lower._1 .subtitle:eq('+i+')').removeClass('top_single')},1050+(100*i));
			setTimeout(function(){$('.lower._1 .view:eq('+i+')').removeClass('top_single')},1250+(100*i));
			setTimeout(function(){$('.lower._1 .expandable:eq('+i+')').css('opacity','1')},725+(100*i));


		})
		
	}
	

	if($(window).scrollTop() > $('.lower._2').position().top-$(window).height() && !$('.lower._2').hasClass('visible')){
		$('.lower._2').addClass('visible');
		$('.lower._2 > div').each(function(i){
			setTimeout(function(){$('.lower._2 >div:eq('+i+')').removeClass('hidden_by_scaling_low')},100*i);
		})
		$('.lower._2 .frame').each(function(i){
			setTimeout(function(){$('.lower._2 .frame:eq('+i+')').removeClass('hidden_by_scaling_low')},700+(100*i));
			setTimeout(function(){$('.lower._2 .title:eq('+i+')').removeClass('top_single')},1000+(100*i));
			setTimeout(function(){$('.lower._2 .separator:eq('+i+')').removeClass('top_single')},1100+(100*i));
			setTimeout(function(){$('.lower._2 .subtitle:eq('+i+')').removeClass('top_single')},1050+(100*i));
			setTimeout(function(){$('.lower._2 .expandable:eq('+i+')').css('opacity','1')},725+(100*i));

		})
		
	}
}

function set_booking_css_index () {
	$('#searchbox form').attr('target','_blank');
	
	if($('#searchbox form').length != 0 && booking_is_ready){
		if(navigator.userAgent.match(/iPad/i) != null){
			$('#searchbox input.hasDatepicker, input.hasDatePicker').datepicker('destroy').removeClass('hasDatepicker').removeClass('hasDatePicker').attr('type','date');
			$('#searchbox input[type="date"]').css('margin-top','-1px').css('width','100px');
			$('#searchbox select').css('margin-top','2px');
		}
		$('#searchbox form > div:eq(0)').css({
			'width': '200px',
			'height': '20px',
			'float': 'left'
		});
		$('#searchbox form > div:eq(1)').css({
			'width': '208px',
			'height': '20px',
			'float': 'left',
			'margin-left':'15px'
		});
		$('#searchbox form > div:eq(2)').css({
			'width': '110px',
			'float': 'left',
			'margin-left':'15px'
		});
		
		$('#searchbox form > div:eq(3)').css({
			'clear': 'both',
			'width': '199px',
			'float': 'left',
			'margin-top':'8px'
		});
		
		$('#searchbox form > div:eq(2) select').css({
			'margin-top':'-3px',
			'height': '20px',
			'float': 'right',
			'position': 'relative',
			'border': '1px solid #FFFFFF'
		});
		
		$('#searchbox form > div:eq(3) select').css({
			'margin-top':'-3px',
			'height': '20px',
			'float': 'right',
			'position': 'relative',
			'border': '1px solid #FFFFFF',
			'width':'45px',
			'text-align':'center'
		});
		
		$('#searchbox form > div:eq(5)').css({
			'margin-top': '7px',
			'width': '208px',
			'float': 'left',
			'margin-left':'16px'
			
		});
		
		$('#searchbox form > div:eq(4)').hide();
		
		
	} else {
		setTimeout(set_booking_css_index,100);
	}
}

function show_pay(){
	$('.slide .pay img.logo').removeClass('bottom_single');
	
	setTimeout(function(){$('.slide .pay h3').removeClass('bottom_single');},100);

	
	setTimeout(function(){$('.slide .pay .pay_separator').removeClass('bottom_single');},200);
	
	
	
	setTimeout(function(){$('.slide .pay h4').removeClass('bottom_single');},300);
	
}

function remove_pay(){
	$('.slide .pay img.logo').addClass('no_opacity');
	setTimeout(function(){$('.slide .pay h3').addClass('no_opacity');},50);

	

	
	
	setTimeout(function(){$('.slide .pay .pay_separator').addClass('no_opacity');},100);
	
	
	setTimeout(function(){$('.slide .pay h4').addClass('no_opacity');},150);
	$('.slide .pay h4').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
		$('.slide .pay h4').unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
		$('#full_slider .slide .pay img,#full_slider .slide .pay h3,#full_slider .slide .pay h4,.pay_separator').addClass('bottom_single').removeClass('no_opacity');
    });
}

function start_slider(){
	slider_started = true;
	function change_slide(){
		time_1 = setTimeout(remove_pay,6000);
		time_2 = setTimeout(function(){slide_forward('#full_slider')},6500);
		time_3 = setTimeout(function(){show_pay();change_slide();},7300);
	}
	
	change_slide();
}

function stop_slider(){
	clearTimeout(time_1);
	clearTimeout(time_2);
	clearTimeout(time_3);
	slider_started = false;
}

