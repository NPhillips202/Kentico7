/*
 * jQuery css bezier animation support -- Jonah Fox
 * version 0.0.1
 * Released under the MIT license.
 * ref: https://github.com/weepy/jquery.path
 */
/*
  var path = $.path.bezier({
    start: {x:10, y:10, angle: 20, length: 0.3},
    end:   {x:20, y:30, angle: -20, length: 0.2}
  })
  $("myobj").animate({path: path}, duration)

*/

;(function($){

	$.path = {};

	var V = {
		rotate: function(p, degrees) {
			var radians = degrees * Math.PI / 180,
			c = Math.cos(radians),
			s = Math.sin(radians);
			return [c*p[0] - s*p[1], s*p[0] + c*p[1]];
		},
		scale: function(p, n) {
			return [n*p[0], n*p[1]];
		},
		add: function(a, b) {
			return [a[0]+b[0], a[1]+b[1]];
		},
		minus: function(a, b) {
			return [a[0]-b[0], a[1]-b[1]];
		}
	};

	$.path.bezier = function( params, rotate ) {
		params.start = $.extend( {angle: 0, length: 0.3333}, params.start );
		params.end = $.extend( {angle: 0, length: 0.3333}, params.end );

		this.p1 = [params.start.x, params.start.y];
		this.p4 = [params.end.x, params.end.y];

		var v14 = V.minus( this.p4, this.p1 ),
			v12 = V.scale( v14, params.start.length ),
			v41 = V.scale( v14, -1 ),
			v43 = V.scale( v41, params.end.length );

		v12 = V.rotate( v12, params.start.angle );
		this.p2 = V.add( this.p1, v12 );

		v43 = V.rotate(v43, params.end.angle );
		this.p3 = V.add( this.p4, v43 );

		this.f1 = function(t) { return (t*t*t); };
		this.f2 = function(t) { return (3*t*t*(1-t)); };
		this.f3 = function(t) { return (3*t*(1-t)*(1-t)); };
		this.f4 = function(t) { return ((1-t)*(1-t)*(1-t)); };

		/* p from 0 to 1 */
		this.css = function(p) {
			var f1 = this.f1(p), f2 = this.f2(p), f3 = this.f3(p), f4=this.f4(p), css = {};
			if (rotate) {
				css.prevX = this.x;
				css.prevY = this.y;
			}
			css.x = this.x = ( this.p1[0]*f1 + this.p2[0]*f2 +this.p3[0]*f3 + this.p4[0]*f4 +.5 )|0;
			css.y = this.y = ( this.p1[1]*f1 + this.p2[1]*f2 +this.p3[1]*f3 + this.p4[1]*f4 +.5 )|0;
			css.left = css.x + "px";
			css.top = css.y + "px";
			return css;
		};
	};

	$.path.arc = function(params, rotate) {
		for ( var i in params ) {
			this[i] = params[i];
		}

		this.dir = this.dir || 1;

		while ( this.start > this.end && this.dir > 0 ) {
			this.start -= 360;
		}

		while ( this.start < this.end && this.dir < 0 ) {
			this.start += 360;
		}

		this.css = function(p) {
			var a = ( this.start * (p ) + this.end * (1-(p )) ) * Math.PI / 180,
			css = {};

			if (rotate) {
				css.prevX = this.x;
				css.prevY = this.y;
			}
			css.x = this.x = ( Math.sin(a) * this.radius + this.center[0] +.5 )|0;
			css.y = this.y = ( Math.cos(a) * this.radius + this.center[1] +.5 )|0;
			css.left = css.x + "px";
			css.top = css.y + "px";
			return css;
		};
	};

	$.fx.step.path = function(fx) {
		var css = fx.end.css( 1 - fx.pos );
		if ( css.prevX != null ) {
			$.cssHooks.transform.set( fx.elem, "rotate(" + Math.atan2(css.prevY - css.y, css.prevX - css.x) + ")" );
		}
		fx.elem.style.top = css.top;
		fx.elem.style.left = css.left;
	};

})(jQuery);


// Course Info
var eastCourseInfo = new Array;
	//Rating/Slope Info - Black, Black Caption, Blue, Blue Caption, White, White Caption, Gold, Gold Caption, Red, Red Caption
	eastCourseInfo[0] = ["","","74.0 / 135","Permission From Golf Staff","69.9 / 129","Men","67.0 / 119","High Handicap","72.8 / 144","Women / Juniors"];
	//Hole Info - Hole, Par, Black, Blue, White, Gold, Red, Gold HCP, Red HCP
	eastCourseInfo[1] = ["1","4","","442","381","333","330","5","9"];
	eastCourseInfo[2] = ["2","4","","347","334","330","325","13","13"];
	eastCourseInfo[3] = ["3","5","","601","554","426","420","1","3"];
	eastCourseInfo[4] = ["4","3","","170","145","102","100","15","17"];
	eastCourseInfo[5] = ["5","4","","433","405","356","353","3","7"];
	eastCourseInfo[6] = ["6","4","","402","366","298","295","9","11"];
	eastCourseInfo[7] = ["7","5","","482","468","428","414","11","5"];
	eastCourseInfo[8] = ["8","3","","178","145","127","116","17","15"];
	eastCourseInfo[9] = ["9","5","","535","476","447","445","7","1"];
	eastCourseInfo[10] = ["10","4","","504","455","397","395","4","10"];
	eastCourseInfo[11] = ["11","4","","424","377","367","357","8","8"];
	eastCourseInfo[12] = ["12","3","","240","198","168","163","16","16"];
	eastCourseInfo[13] = ["13","4","","493","466","363","360","2","12"];
	eastCourseInfo[14] = ["14","4","","429","404","364","353","10","6"];
	eastCourseInfo[15] = ["15","4","","451","397","335","332","14","14"];
	eastCourseInfo[16] = ["16","3","","180","172","150","148","18","18"];
	eastCourseInfo[17] = ["17","5","","611","525","513","498","12","2"];
	eastCourseInfo[18] = ["18","4","","433","383","336","334","6","4"];

var eastCourseParInfo = new Array;
	eastCourseParInfo[0] = [""]; // Leave blank
	// Par Coordinates Per Hole - Format is "xCoord,yCoord,angleOfCurve".
	eastCourseParInfo[1] = ["200,479,0","250,240,-50","187,94,50"];
	eastCourseParInfo[2] = ["330,500,0","260,210,50","196,120,50"];
	eastCourseParInfo[3] = ["320,492,0","209,237,50","236,145,-50","291,91,-50"];
	eastCourseParInfo[4] = ["176,381,0","257,133,-50"];
	eastCourseParInfo[5] = ["260,472,0","248,213,-20","267,84,20"];
	eastCourseParInfo[6] = ["165,448,0","291,180,-50","197,86,50"];
	eastCourseParInfo[7] = ["125,442,0","314,240,-50","234,145,50","142,74,50"];
	eastCourseParInfo[8] = ["220,333,0","214,103,-10"];
	eastCourseParInfo[9] = ["132,473,0","278,263,-50","259,166,20","155,88,50"];
	eastCourseParInfo[10] = ["134,408,0","354,153,-50","159,70,50"];
	eastCourseParInfo[11] = ["188,478,0","311,191,-50","204,83,50"];
	eastCourseParInfo[12] = ["266,420,0","263,111,-50"];
	eastCourseParInfo[13] = ["365,410,0","184,146,50","338,71,-50"];
	eastCourseParInfo[14] = ["196,489,0","301,205,-50","193,91,50"];
	eastCourseParInfo[15] = ["189,465,0","281,157,-50","189,82,50"];
	eastCourseParInfo[16] = ["217,407,0","209,135,-10"];
	eastCourseParInfo[17] = ["312,472,0","218,194,50","265,102,-50","296,60,-10"];
	eastCourseParInfo[18] = ["278,423,0","134,198,50","288,76,-50"];

var westCourseInfo = new Array;
	//Rating/Slope Info - Black, Black Caption, Blue, Blue Caption, White, White Caption, Gold, Gold Caption, Red, Red Caption
	westCourseInfo[0] = ["","","70.7 / 130","Permission From Golf Staff","68.6 / 123","Men","64.8 / 110","High Handicap","70.5 / 131","Women / Juniors"];
	//Hole Info - Hole, Par, Black, Blue, White, Gold, Red, Gold HCP, Red HCP
	westCourseInfo[1] = ["1","4","","354","343","267","263","11","13"];
	westCourseInfo[2] = ["2","4","","415","387","294","289","5","5"];
	westCourseInfo[3] = ["3","4","","429","387","321","318","7","9"];
	westCourseInfo[4] = ["4","4","","374","336","300","294","15","11"];
	westCourseInfo[5] = ["5","3","","176","156","89","87","17","17"];
	westCourseInfo[6] = ["6","4 / 5","","458","413","406","400","1","3"];
	westCourseInfo[7] = ["7","4","","394","326","296","293","9","7"];
	westCourseInfo[8] = ["8","5","","488","439","415","407","3","1"];
	westCourseInfo[9] = ["9","3","","194","175","89","86","13","15"];
	westCourseInfo[10] = ["10","5","","565","470","419","400","2","2"];
	westCourseInfo[11] = ["11","3","","228","188","124","120","16","16"];
	westCourseInfo[12] = ["12","4","","490","439","389","384","6","4"];
	westCourseInfo[13] = ["13","4","","366","345","321","316","10","8"];
	westCourseInfo[14] = ["14","4","","450","362","299","296","4","6"];
	westCourseInfo[15] = ["15","4","","454","376","354","350","14","12"];
	westCourseInfo[16] = ["16","3","","236","176","135","130","18","18"];
	westCourseInfo[17] = ["17","4","","469","356","318","315","12","14"];
	westCourseInfo[18] = ["18","5","","561","501","417","414","8","10"];

var westCourseParInfo = new Array;
	westCourseParInfo[0] = [""]; // Leave blank
	//West hole par info currently not available

	// Set West hole par info 09/16/2016
	// Par Coordinates Per Hole - Format is "xCoord,yCoord,angleOfCurve".
	westCourseParInfo[1] = [
		"242,459,0",
		"250,240,-50",
		"227,114,50"
	];
	westCourseParInfo[2] = [
		"200,402,0",
		"307,222,50",
		"208,73,50"
	];
	westCourseParInfo[3] = [
		"276,455,0",
		//"209,247,50",
		"236,255,-50",
		"250,91,-50"
	];
	westCourseParInfo[4] = [
		"217,480,0",
		"247,270,-50",
		"217,110,-50"
	];
	westCourseParInfo[5] = [
		"227,427,0",
		//"248,213,-20",
		"237,147,20"
	];
	westCourseParInfo[6] = [
		"199,458,0",
		"289,328,-50",
		"229,169,50",
		"129,75,50"
	];
	westCourseParInfo[7] = [
		"202,399,0",
		"308,244,-50",
		"232,144,50",
		"142,74,50"
	];
	westCourseParInfo[8] = [
		"237,433,0",
		"237,263,-50",
		"282,73,50"
	];
	westCourseParInfo[9] = [
		"254,328,0",
		"198,178,20",
		"255,78,50"
	];
	westCourseParInfo[10] = [
		"134,408,0",
		"229,156,20",
		"252,266,-50",
		"244,445,50"
	];
	westCourseParInfo[11] = [
		"228,403,0",
		"236,123,50"
	];
	westCourseParInfo[12] = [
		"337,414,0",
		"178,204,0",
		"178,124,50",
		"318,74,-50"
	];
	westCourseParInfo[13] = [
		"276,432,0",
		"275,282,-50",
		"334,192,50",
		"268,112,-50"
	];
	westCourseParInfo[14] = [
		"206,429,0",
		"250,239,-50",
		"199,79,50"
	];
	westCourseParInfo[15] = [
		"194,405,0",
		"276,218,-50",
		"189,98,50"
	];
	westCourseParInfo[16] = [
		"252,465,0",
		"247,230,-50",
		"273,135,-10"
	];
	westCourseParInfo[17] = [
		"152,430,50",
		"276,190,-50",
		"192,70,-10"
	];
	westCourseParInfo[18] = [
		"313,430,0",
		"213,270,-50",
		"203,161,50",
		"320,76,-50"
	];

var mountainCourseInfo = new Array;
	//Rating/Slope Info - Black, Black Caption, Blue, Blue Caption, White, White Caption, Gold, Gold Caption, Red, Red Caption
	mountainCourseInfo[0] = ["75.8 / 147","Permission From Golf Staff","71.8 / 143","Men","69.6 / 134","Men","65.2 / 121","High Handicap","69.8 / 127","Women / Juniors"];
	//Hole Info - Hole, Par, Black, Blue, White, Gold, Red, Gold HCP, Red HCP
	mountainCourseInfo[1] = ["1","4","475","375","354","307","300","9","11"];
	mountainCourseInfo[2] = ["2","4","305","298","291","272","212","13","13"];
	mountainCourseInfo[3] = ["3","4","482","427","386","310","299","5","9"];
	mountainCourseInfo[4] = ["4","4","472","414","363","275","265","3","3"];
	mountainCourseInfo[5] = ["5","4","431","419","374","321","311","11","7"];
	mountainCourseInfo[6] = ["6","3","185","175","170","106","102","17","17"];
	mountainCourseInfo[7] = ["7","5","663","605","532","445","434","1","1"];
	mountainCourseInfo[8] = ["8","3","212","199","194","146","114","15","15"];
	mountainCourseInfo[9] = ["9","4","378","367","308","257","246","7","5"];
	mountainCourseInfo[10] = ["10","5","567","519","469","422","411","4","2"];
	mountainCourseInfo[11] = ["11","4","446","428","399","343","300","2","6"];
	mountainCourseInfo[12] = ["12","4","490","420","390","334","321","14","14"];
	mountainCourseInfo[13] = ["13","4","455","416","376","354","255","6","8"];
	mountainCourseInfo[14] = ["14","4","353","343","296","280","215","16","16"];
	mountainCourseInfo[15] = ["15","3","172","168","148","131","115","18","18"];
	mountainCourseInfo[16] = ["16","4","451","395","373","317","307","10","12"];
	mountainCourseInfo[17] = ["17","4","477","408","395","333","321","12","10"];
	mountainCourseInfo[18] = ["18","5","603","530","507","408","397","8","4"];

var mountainCourseParInfo = new Array;
	mountainCourseParInfo[0] = [""]; // Leave blank
	// Par Coordinates Per Hole - Format is "xCoord,yCoord,angleOfCurve".
	mountainCourseParInfo[1] = ["336,497,0","234,156,50","303,91,-30"];
	mountainCourseParInfo[2] = ["228,412,0","243,180,-50","230,120,20"];
	mountainCourseParInfo[3] = ["352,506,0","174,196,50","314,94,-50"];
	mountainCourseParInfo[4] = ["256,492,0","244,220,-50","262,96,25"];
	mountainCourseParInfo[5] = ["271,460,0","237,181,30","215,70,50"];
	mountainCourseParInfo[6] = ["336,407,0","213,137,50"];
	mountainCourseParInfo[7] = ["256,498,0","212,228,50","262,137,-50","243,70,50"];
	mountainCourseParInfo[8] = ["233,393,0","204,108,-30"];
	mountainCourseParInfo[9] = ["316,428,0","191,161,50","312,86,-50"];
	mountainCourseParInfo[10] = ["276,493,0","295,230,-50","270,151,50","273,78,-50"];
	mountainCourseParInfo[11] = ["280,480,0","259,197,-50","267,73,30"];
	mountainCourseParInfo[12] = ["262,487,0","232,190,30","247,60,-50"];
	mountainCourseParInfo[13] = ["243,434,0","141,163,50","246,80,-50"];
	mountainCourseParInfo[14] = ["295,470,0","212,174,40","276,87,-50"];
	mountainCourseParInfo[15] = ["243,317,0","253,110,-50"];
	mountainCourseParInfo[16] = ["280,498,0","263,212,-20","265,94,20"];
	mountainCourseParInfo[17] = ["180,451,0","246,176,-50","194,82,50"];
	mountainCourseParInfo[18] = ["190,393,0","254,222,-50","325,122,-50","302,75,30"];

var courseCoords = new Array;
	//Array is created dynamically

// Set Background
/*jQuery(function() {
	jQuery.supersized({
		// Background image
		slides: [
			{image: '/interactive-scorecards/_images/mountain/bg.jpg'}
		],
		transition: 1,
		autoplay: 0,
		slideshow: 0
	});
});*/

// Bind Click Events
function bindClickEvents() {
	jQuery('.buttonArea a').bind('click', showCourseContent);
	//jQuery('.viewScoreCard').bind('click', showScoreCard);
	jQuery('.marker a').bind('click', showHoleContent);
	//jQuery('.data-table tr > th > a').bind('click', swapHoleContent);
	jQuery('th a[course]').bind('click', swapHoleContent);
};

/*jQuery(function() {
	bindClickEvents();
});*/

// Disable Functions During Transition
function disableButtons() {
	//jQuery('#buttonArea a, .viewScoreCard, .marker a, .holeSlider a, #golfSwing').unbind('click');
	//jQuery('.marker a, .data-table tr > th > a, #golfSwing').unbind('click');
	jQuery('.buttonArea a, .marker a, th a[course], [id^="golfSwing"]').unbind('click');
};

// Enable Functions After Transition
function enableButtons() {
	bindClickEvents();
};

// Show Course Content Function
/*function showContent(id) {
	jQuery('#contentArea > div:visible').slideUp(500, function() {
		jQuery('#' + id).slideDown(500, function() {
			enableButtons();
		});
	});
};*/

// Show Course Map Function
function showMap(id, course) {
	//console.log(jQuery('#mapArea' + course + ' > div').is(':visible'));
	jQuery('[data-course="' + course + '"]').find('th a[course]').closest('th').removeClass('selected');
	//if (jQuery('#' + parent_id).find('.mapArea > div').is(':visible')) {
	if (jQuery('#mapArea' + course + ' > div').is(':visible')) {
		//jQuery('#' + parent_id).find('.mapArea > div:visible').slideUp(500, function() {
		jQuery('#mapArea' + course + ' > div:visible').slideUp(500, function() {
			//jQuery('#' + id).css('display', 'none');
			jQuery('#' + id).slideDown(500);
		});
	} else {
		//jQuery('#' + id).css('display', 'inline-block');
		jQuery('#' + id).delay(500).slideDown(500);
		//jQuery('#' + id).css('opacity', 1);
	}
};

// Show Course Content
function showCourseContent() {
	//console.log(jQuery(this));
	//disableButtons();
	var course = jQuery(this).attr('course');
	console.log(jQuery(this).html());
	//console.log(course);

	switch(course) {
		case 'east':
			//showContent('eastCourseContent');
			showMap('eastCourseMap', course);
			break;
		case 'west':
			//showContent('westCourseContent');
			showMap('westCourseMap', course);
			break;
		case 'mountain':
			//showContent('mountainCourseContent');
			showMap('mountainCourseMap', course);
			break;
	};

	jQuery('#buttonArea' + course + ' a').removeClass('selected');
	jQuery(this).addClass('selected');
	return false;
};

// Show Scorecard Content
/*function showScoreCard() {
	disableButtons();
	//Pull data from array
	var course = jQuery(this).attr('course');
	var arrayPos = 0;

	switch(course) {
		case 'east':
			var black = eastCourseInfo[arrayPos][0];
			var blackCaption = eastCourseInfo[arrayPos][1];
			var blue = eastCourseInfo[arrayPos][2];
			var blueCaption = eastCourseInfo[arrayPos][3];
			var white = eastCourseInfo[arrayPos][4];
			var whiteCaption = eastCourseInfo[arrayPos][5];
			var gold = eastCourseInfo[arrayPos][6];
			var goldCaption = eastCourseInfo[arrayPos][7];
			var red = eastCourseInfo[arrayPos][8];
			var redCaption = eastCourseInfo[arrayPos][9];
			break;
		case 'west':
			var black = westCourseInfo[arrayPos][0];
			var blackCaption = westCourseInfo[arrayPos][1];
			var blue = westCourseInfo[arrayPos][2];
			var blueCaption = westCourseInfo[arrayPos][3];
			var white = westCourseInfo[arrayPos][4];
			var whiteCaption = westCourseInfo[arrayPos][5];
			var gold = westCourseInfo[arrayPos][6];
			var goldCaption = westCourseInfo[arrayPos][7];
			var red = westCourseInfo[arrayPos][8];
			var redCaption = westCourseInfo[arrayPos][9];
			break;
		case 'mountain':
			var black = mountainCourseInfo[arrayPos][0];
			var blackCaption = mountainCourseInfo[arrayPos][1];
			var blue = mountainCourseInfo[arrayPos][2];
			var blueCaption = mountainCourseInfo[arrayPos][3];
			var white = mountainCourseInfo[arrayPos][4];
			var whiteCaption = mountainCourseInfo[arrayPos][5];
			var gold = mountainCourseInfo[arrayPos][6];
			var goldCaption = mountainCourseInfo[arrayPos][7];
			var red = mountainCourseInfo[arrayPos][8];
			var redCaption = mountainCourseInfo[arrayPos][9];
			break;
		};

	//jQuery('#contentArea > div:visible').slideUp(500);
	jQuery('#mapArea' + course + ' > div:visible').slideUp(500, function() {
		//var scorecardImg = '/interactive-scorecards/_images/titles/' + course + '_scorecard.gif';
		var scorecardImg = '//placeholder.it/300?text=' + course;
		var scorecardMapImg = '/Broadmoor.com-0073-2016Redesign/media/Broadmoor/design/interactive-scorecards/' + course + '/scorecard.jpg';
		jQuery('.scorecardImage').attr('src', scorecardImg);
		jQuery('#scorecardMap' + course + ' img').attr('src', scorecardMapImg);

		//Hide black bar if value is empty
		if ((black == "") || (black == null)) {
			jQuery('.scorecardBar.black').hide();
		} else {
			jQuery('.scorecardBar.black').show();
			jQuery('.scorecardBar.black').html('<div>Black: ' + black + '</div>' + blackCaption);
		};

		//Set Values
		jQuery('.scorecardBar.blue').html('<div>Blue: ' + blue + '</div>' + blueCaption);
		jQuery('.scorecardBar.white').html('<div>White: ' + white + '</div>' + whiteCaption);
		jQuery('.scorecardBar.gold').html('<div>Gold: ' + gold + '</div>' + goldCaption);
		jQuery('.scorecardBar.red').html('<div>Red: ' + red + '</div>' + redCaption);
		jQuery('.printScoreCard a').attr('href','/interactive-scorecards/_pdf/scorecard-' + course + '.pdf#zoom=100');

		//Show content
		jQuery('#scorecardMap' + course + ' img').load(function() {
			jQuery('#scorecardMap' + course).slideDown(500);
			jQuery('#scorecardContent' + course).slideDown(500, function() {
				enableButtons();
			});
		});
	});
	return false;
};*/

// Show Hole Content
function showHoleContent() {
	//Do nothing if already selected
	if (jQuery(this).attr('class') == 'selected') {
		return false;
	};

	disableButtons();

	//Pull data from array
	var course = jQuery(this).attr('course');
	var hole = jQuery.trim(jQuery(this).text());
	var arrayPos = hole;
	var clickedBtn = jQuery(this).attr('class');

	clearHoleAnimation(course);

	/*jQuery.each(jQuery('th a[course]').data('events'), function(i, event){
		jQuery.each(event, function(i, handler){
			console.log( handler.toString() );
		});
	});*/

	//jQuery('#contentArea > div:visible').slideUp(500);
	//jQuery('#mapArea > div:visible').slideUp(500, function() {
	//if (jQuery(this).closest('.data-tables').find('.mapArea > div:visible').slideUp(500, function() {
	jQuery('#mapArea' + course + ' > div:visible').slideUp(500, function() {
		var holeMapImg = '/Broadmoor.com-0073-2016Redesign/media/Broadmoor/design/interactive-scorecards/' + course + '/Hole-' + hole + '.png';
		jQuery('#holeImg' + course).attr('src', holeMapImg);
		jQuery('[data-course="' + course + '"]').find('th a[course]').each(function() {
			jQuery(this).attr('course', course);
		});

		//Add selected class
		jQuery('[data-course="' + course + '"]').find('th a[course]').closest('th').removeClass('selected');
		jQuery('[data-course="' + course + '"]').find('th a[course]').each(function() {
			if (jQuery.trim(jQuery(this).text()) == hole) {
				jQuery(this).closest('th').addClass('selected');
			}
		});

		//Show content
		//jQuery('#mapArea' + course + ' > div:visible').slideUp(500, function() {
			jQuery('#holeImg' + course).load(function() {
				jQuery('#holeImg' + course).unbind('load');
				//jQuery('#courseHoles' + course).slideDown(500);
				//jQuery('#courseHoles' + course).animate({
				//	opacity: 1,
				//}, 500, function() {}).css('display', 'inline-block');
				jQuery('#courseHoles' + course).fadeIn(500);
				//jQuery('#holesMap' + course).slideDown(500, function() {
				//jQuery('#holesMap' + course).animate({
				//	opacity: 1,
				//}, 500, function() {
				jQuery('#holesMap' + course).fadeIn(500, function() {
					console.log("---------------------");
					console.log("Load complete (show function)");
					startHoleAnimation(course, hole);
					enableButtons();
				});
			});
		//});
	});
	return false;
};

// Show Hole Content - if already on hole
function swapHoleContent() {
	//Do nothing if already selected
	if (jQuery(this).attr('class') == 'selected') {
		return false;
	};

	disableButtons();

	//Pull data from array
	var course = jQuery(this).attr('course');
	var hole = jQuery.trim(jQuery(this).text());
	var arrayPos = hole;
	var clickedBtn = jQuery(this).attr('class');

	//console.log(course);
	clearHoleAnimation(course);

	var holeMapImg = '/Broadmoor.com-0073-2016Redesign/media/Broadmoor/design/interactive-scorecards/' + course + '/Hole-' + hole + '.png';
	jQuery('[data-course="' + course + '"]').find('th a[course]').each(function() {
		jQuery(this).attr('course', course);
	});

	//Add selected class
	jQuery('[data-course="' + course + '"]').find('th a[course]').closest('th').removeClass('selected');
	jQuery('[data-course="' + course + '"]').find('th a[course]').each(function() {
		if (jQuery.trim(jQuery(this).text()) == hole) {
			jQuery(this).closest('th').addClass('selected');
		}
	});

	jQuery('#buttonArea' + course).css('display','none');
	//console.log(jQuery('#mapArea' + course + ' > div:visible').length);
	//jQuery('#mapArea' + course + ' > div:visible').slideUp(500, function() {
	jQuery('#mapArea' + course + ' > div:visible').fadeOut(500, function() {
		jQuery('#holeImg' + course).attr('src', holeMapImg);
		//Show content
		jQuery('#holeImg' + course).load(function() {
			jQuery('#holeImg' + course).unbind('load');
			//jQuery('#holesMap' + course).slideDown(500, function() {
			jQuery('#holesMap' + course).fadeIn(500, function() {
				//eval("debugger;");
				console.log(course, hole);
				console.log("---------------------");
				console.log("Load complete (swap function)");
				startHoleAnimation(course, hole);
				enableButtons();
			});
			jQuery('#buttonArea' + course).css('display','block');
		});
	});
	return false;
};

function startHoleAnimation(course, hole) {
	window.uniqueVar = course + hole;
	courseCoords.length = 0;  // Clear previous array values

	// Pull data from array and split into another array
	if (course == "east") {
		for (var i=0; i<eastCourseParInfo[hole].length; i++) {
			var coordsToSplit = eastCourseParInfo[hole][i];
			var coords = coordsToSplit.split(',');
			courseCoords[i] = coords;
		}
	} else if (course == "west") {
		for (var i=0; i<westCourseParInfo[hole].length; i++) {
			var coordsToSplit = westCourseParInfo[hole][i];
			var coords = coordsToSplit.split(',');
			courseCoords[i] = coords;
		}/**/
	} else if (course == "mountain") {
		for (var i=0; i<mountainCourseParInfo[hole].length; i++) {
			var coordsToSplit = mountainCourseParInfo[hole][i];
			var coords = coordsToSplit.split(',');
			courseCoords[i] = coords;
		}
	} else {
		return false;
	}

	// Log array to console
	//for (var i=0; i<courseCoords.length; i++) {
	//	console.log("courseCoords[" + i + "] = " + courseCoords[i]);
	//	for (var k=0; k<courseCoords[i].length; k++) {
	//		console.log("courseCoords[" + i + "][" + k + "] = " + courseCoords[i][k]);
	//	};
	//};

	// Run animation
	var i = 0;
	function aniLoop (course, hole) {
		if (window.animationDelay == "undefined" || window.animationDelay == null) {
			window.animationDelay = 0;
		};

		setTimeout(function () {
			if (course + hole == window.uniqueVar) {
				if (i == courseCoords.length-1) {
					golfAniEnd(i, course, hole);
					//enableButtons();
					window.animationDelay = 0; // Reset delay after script finishes
				} else {
					window.animationDelay = 2750;
					golfAniLoop(i, course, hole);
					i++;
					aniLoop(course, hole);
				}
			}
		}, window.animationDelay);
	};
	aniLoop(course, hole);
	return false;
};

function golfAniLoop(i, course, hole) {
	var nextXAxis = parseInt(courseCoords[i+1][0],10);
	var nextYAxis = parseInt(courseCoords[i+1][1],10);
	var nextAngle = parseInt(courseCoords[i+1][2],10);
	var currentXAxis = parseInt(courseCoords[i][0],10);
	var currentYAxis = parseInt(courseCoords[i][1],10);
	var currentAngle = parseInt(courseCoords[i][2],10);

	console.log("Loop " + (i+1) + "/" + courseCoords.length + " for " + course + hole + " | currentXAxis=" + currentXAxis + ", currentYAxis=" + currentYAxis + ", currentAngle=" + currentAngle + ", nextXAxis=" + nextXAxis + ", nextYAxis=" + nextYAxis);

	jQuery('#golfFlag' + course + ', #golfSwing' + course).hide();
	jQuery('#golfSwing' + course).css({
		left: currentXAxis - 13 + 'px',
		top: currentYAxis - 38 + 'px'
	});
	jQuery('#golfSwing' + course).delay(250).fadeIn(500, function() {
		jQuery('#golfSwing' + course).attr('src', '/Broadmoor.com-0073-2016Redesign/media/Broadmoor/design/interactive-scorecards/golfer2.png');
		jQuery('#golfSwing' + course).delay(1000).fadeOut(500, function() {
			jQuery('#golfSwing').attr('src','/Broadmoor.com-0073-2016Redesign/media/Broadmoor/design/interactive-scorecards/golfer.png');
		});
		jQuery('#golfBall' + course).css({
			left: currentXAxis + 'px',
			top: currentYAxis + 'px'
		});
		jQuery('#golfBall' + course).show();

		var bezier_params = {
			start:{
				x:currentXAxis,
				y:currentYAxis,
				angle:nextAngle,
				length:0.3
			},
			end:{
				x:nextXAxis,
				y:nextYAxis
			}
		};
		jQuery('#golfBall' + course).animate({
			path: new jQuery.path.bezier(bezier_params)
		}, 2000);
	});
};

function golfAniEnd(i, course, hole) {
	var currentXAxis = parseInt(courseCoords[i][0],10);
	var currentYAxis = parseInt(courseCoords[i][1],10);

	console.log("End  " + (i+1) + "/" + courseCoords.length + " for " + course + hole + " | currentXAxis=" + currentXAxis + ", currentYAxis=" + currentYAxis);

	jQuery('#golfBall' + course).delay(250).fadeOut(500, function() {
		jQuery('#golfFlag' + course).css({
			left: currentXAxis - 7 + 'px',
			top: currentYAxis - 12 + 'px'
		});
		jQuery('#golfFlag' + course).fadeIn(500);
	});
};

function clearHoleAnimation(course) {
	window.animationDelay = 0;
	//jQuery('#golfBall' + course + ', #golfFlag' + course + ', #golfSwing' + course).hide();
	//jQuery('#golfSwing' + course).attr('src','/Broadmoor.com-0073-2016Redesign/media/Broadmoor/design/interactive-scorecards/golfer.png');
	//jQuery('#golfBall, #golfFlag, #golfSwing').hide();
	//jQuery('#golfSwing').attr('src','/Broadmoor.com-0073-2016Redesign/media/Broadmoor/design/interactive-scorecards/golfer.png');
	jQuery('[id^="golfBall"], [id^="golfFlag"], [id^="golfSwing"]').hide();
	jQuery('[id^="golfSwing"]').attr('src','/Broadmoor.com-0073-2016Redesign/media/Broadmoor/design/interactive-scorecards/golfer.png');
};
