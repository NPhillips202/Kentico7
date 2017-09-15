jQuery(function() {
	var img_path = '/Broadmoor.com-0073-2016Redesign/media/Broadmoor/design/interactive-scorecards/';
	jQuery('#no-more-tables_east_1').each(function(index){
		var $this = jQuery(this),
			data_course = $this.attr('data-course');
		$this.append('<div id="mapArea' + data_course + '" class="mapArea">' +
			'<div id="' + data_course + 'CourseMap">' +
				'<div class="locationMarkers">' +
					'<div class="marker" style="left:420px; top:381px;"><a href="#" course="' + data_course + '"><span>1</span></a></div>' +
					'<div class="marker" style="left:356px; top:311px;"><a href="#" course="' + data_course + '"><span>2</span></a></div>' +
					'<div class="marker" style="left:364px; top:382px;"><a href="#" course="' + data_course + '"><span>3</span></a></div>' +
					'<div class="marker" style="left:345px; top:418px;"><a href="#" course="' + data_course + '"><span>4</span></a></div>' +
					'<div class="marker" style="left:304px; top:354px;"><a href="#" course="' + data_course + '"><span>5</span></a></div>' +
					'<div class="marker" style="left:217px; top:251px;"><a href="#" course="' + data_course + '"><span>6</span></a></div>' +
					'<div class="marker" style="left:165px; top:105px;"><a href="#" course="' + data_course + '"><span>7</span></a></div>' +
					'<div class="marker" style="left:118px; top:43px;"><a href="#" course="' + data_course + '"><span>8</span></a></div>' +
					'<div class="marker" style="left:211px; top:42px;"><a href="#" course="' + data_course + '"><span>9</span></a></div>' +
					'<div class="marker" style="left:206px; top:141px;"><a href="#" course="' + data_course + '"><span>10</span></a></div>' +
					'<div class="marker" style="left:129px; top:113px;"><a href="#" course="' + data_course + '"><span>11</span></a></div>' +
					'<div class="marker" style="left:50px; top:89px;"><a href="#" course="' + data_course + '"><span>12</span></a></div>' +
					'<div class="marker" style="left:126px; top:164px;"><a href="#" course="' + data_course + '"><span>13</span></a></div>' +
					'<div class="marker" style="left:65px; top:142px;"><a href="#" course="' + data_course + '"><span>14</span></a></div>' +
					'<div class="marker" style="left:97px; top:221px;"><a href="#" course="' + data_course + '"><span>15</span></a></div>' +
					'<div class="marker" style="left:187px; top:266px;"><a href="#" course="' + data_course + '"><span>16</span></a></div>' +
					'<div class="marker" style="left:235px; top:398px;"><a href="#" course="' + data_course + '"><span>17</span></a></div>' +
					'<div class="marker" style="left:325px; top:458px;"><a href="#" course="' + data_course + '"><span>18</span></a></div>' +
				'</div>' +
				'<img src="' + img_path + data_course + '/overview.png" alt="" border="0" />' +
			'</div>' +
			'<div id="holesMap' + data_course + '"><img src="" border="0" alt="" id="holeImg' + data_course + '" /></div>' +
			'<div id="scorecardMap' + data_course + '"><img src="" border="0" alt="" /></div>' +
			'<div id="buttonArea' + data_course + '" class="buttonArea"><a href="#" course="' + data_course + '" id="' + data_course + 'CourseBtn"><i class="fa fa-arrow-circle-left"></i> Go Back ' + data_course.toUpperCase() + ' Course Map</a></div>' +
		'</div>');
	});
	jQuery('#no-more-tables_west_1').each(function(index){
		var $this = jQuery(this),
			data_course = $this.attr('data-course');
		$this.append('<div id="mapArea' + data_course + '" class="mapArea">' +
			'<div id="' + data_course + 'CourseMap">' +
				'<div class="locationMarkers">' +
					'<div class="marker" style="left:358px; top:520px;"><a href="#" course="' + data_course + '"><span>1</span></a></div>' +
					'<div class="marker" style="left:359px; top:414px;"><a href="#" course="' + data_course + '"><span>2</span></a></div>' +
					'<div class="marker" style="left:292px; top:345px;"><a href="#" course="' + data_course + '"><span>3</span></a></div>' +
					'<div class="marker" style="left:122px; top:305px;"><a href="#" course="' + data_course + '"><span>4</span></a></div>' +
					'<div class="marker" style="left:117px; top:260px;"><a href="#" course="' + data_course + '"><span>5</span></a></div>' +
					'<div class="marker" style="left:212px; top:270px;"><a href="#" course="' + data_course + '"><span>6</span></a></div>' +
					'<div class="marker" style="left:191px; top:80px;"><a href="#" course="' + data_course + '"><span>7</span></a></div>' +
					'<div class="marker" style="left:44px; top:35px;"><a href="#" course="' + data_course + '"><span>8</span></a></div>' +
					'<div class="marker" style="left:85px; top:14px;"><a href="#" course="' + data_course + '"><span>9</span></a></div>' +
					'<div class="marker" style="left:202px; top:0px;"><a href="#" course="' + data_course + '"><span>10</span></a></div>' +
					'<div class="marker" style="left:217px; top:32px;"><a href="#" course="' + data_course + '"><span>11</span></a></div>' +
					'<div class="marker" style="left:253px; top:94px;"><a href="#" course="' + data_course + '"><span>12</span></a></div>' +
					'<div class="marker" style="left:159px; top:185px;"><a href="#" course="' + data_course + '"><span>13</span></a></div>' +
					'<div class="marker" style="left:190px; top:212px;"><a href="#" course="' + data_course + '"><span>14</span></a></div>' +
					'<div class="marker" style="left:264px; top:280px;"><a href="#" course="' + data_course + '"><span>15</span></a></div>' +
					'<div class="marker" style="left:215px; top:311px;"><a href="#" course="' + data_course + '"><span>16</span></a></div>' +
					'<div class="marker" style="left:271px; top:381px;"><a href="#" course="' + data_course + '"><span>17</span></a></div>' +
					'<div class="marker" style="left:318px; top:489px;"><a href="#" course="' + data_course + '"><span>18</span></a></div>' +
				'</div>' +
				'<img src="' + img_path + data_course + '/overview.png" alt="" border="0" />' +
			'</div>' +
			'<div id="holesMap' + data_course + '"><img src="" border="0" alt="" id="holeImg' + data_course + '" /></div>' +
			'<div id="scorecardMap' + data_course + '"><img src="" border="0" alt="" /></div>' +
			'<div id="buttonArea' + data_course + '" class="buttonArea"><a href="#" course="' + data_course + '" id="' + data_course + 'CourseBtn"><i class="fa fa-arrow-circle-left"></i> Go Back ' + data_course.toUpperCase() + ' Course Map</a></div>' +
		'</div>');
	});
	jQuery('#no-more-tables_mountain_1').each(function(index){
		var $this = jQuery(this),
			data_course = $this.attr('data-course');
		$this.append('<div id="mapArea' + data_course + '" class="mapArea">' +
			'<div id="' + data_course + 'CourseMap">' +
				'<div class="locationMarkers">' +
					'<div class="marker" style="left:429px; top:247px;"><a href="#" course="' + data_course + '"><span>1</span></a></div>' +
					'<div class="marker" style="left:381px; top:245px;"><a href="#" course="' + data_course + '"><span>2</span></a></div>' +
					'<div class="marker" style="left:385px; top:313px;"><a href="#" course="' + data_course + '"><span>3</span></a></div>' +
					'<div class="marker" style="left:316px; top:286px;"><a href="#" course="' + data_course + '"><span>4</span></a></div>' +
					'<div class="marker" style="left:137px; top:225px;"><a href="#" course="' + data_course + '"><span>5</span></a></div>' +
					'<div class="marker" style="left:29px; top:148px;"><a href="#" course="' + data_course + '"><span>6</span></a></div>' +
					'<div class="marker" style="left:28px; top:314px;"><a href="#" course="' + data_course + '"><span>7</span></a></div>' +
					'<div class="marker" style="left:94px; top:457px;"><a href="#" course="' + data_course + '"><span>8</span></a></div>' +
					'<div class="marker" style="left:73px; top:367px;"><a href="#" course="' + data_course + '"><span>9</span></a></div>' +
					'<div class="marker" style="left:141px; top:404px;"><a href="#" course="' + data_course + '"><span>10</span></a></div>' +
					'<div class="marker" style="left:156px; top:354px;"><a href="#" course="' + data_course + '"><span>11</span></a></div>' +
					'<div class="marker" style="left:228px; top:396px;"><a href="#" course="' + data_course + '"><span>12</span></a></div>' +
					'<div class="marker" style="left:224px; top:322px;"><a href="#" course="' + data_course + '"><span>13</span></a></div>' +
					'<div class="marker" style="left:147px; top:175px;"><a href="#" course="' + data_course + '"><span>14</span></a></div>' +
					'<div class="marker" style="left:71px; top:98px;"><a href="#" course="' + data_course + '"><span>15</span></a></div>' +
					'<div class="marker" style="left:167px; top:125px;"><a href="#" course="' + data_course + '"><span>16</span></a></div>' +
					'<div class="marker" style="left:124px; top:58px;"><a href="#" course="' + data_course + '"><span>17</span></a></div>' +
					'<div class="marker" style="left:226px; top:80px;"><a href="#" course="' + data_course + '"><span>18</span></a></div>' +
				'</div>' +
				'<img src="' + img_path + data_course + '/overview.png" alt="" border="0" />' +
			'</div>' +
			'<div id="holesMap' + data_course + '"><img src="" border="0" alt="" id="holeImg' + data_course + '" /></div>' +
			'<div id="scorecardMap' + data_course + '"><img src="" border="0" alt="" /></div>' +
			'<div id="buttonArea' + data_course + '" class="buttonArea"><a href="#" course="' + data_course + '" id="' + data_course + 'CourseBtn"><i class="fa fa-arrow-circle-left"></i> Go Back ' + data_course.toUpperCase() + ' Course Map</a></div>' +
		'</div>');
	});
	/*jQuery('.data-tables').each(function(index){
		var $this = jQuery(this);

		//showCourseContent();

		$this.append('<div id="mapArea' + index + '" class="mapArea">' +
			'<!--<div id="defaultMap"><img src="/Broadmoor.com-0073-2016Redesign/media/Broadmoor/design/interactive-scorecards/overview.png" border="0" alt="" /></div>-->' +
			'<div id="eastCourseMap">' +
				'<div class="locationMarkers">' +
					'<div class="marker" style="left:420px; top:381px;"><a href="#" course="east"><span>1</span></a></div>' +
					'<div class="marker" style="left:356px; top:311px;"><a href="#" course="east"><span>2</span></a></div>' +
					'<div class="marker" style="left:364px; top:382px;"><a href="#" course="east"><span>3</span></a></div>' +
					'<div class="marker" style="left:345px; top:418px;"><a href="#" course="east"><span>4</span></a></div>' +
					'<div class="marker" style="left:304px; top:354px;"><a href="#" course="east"><span>5</span></a></div>' +
					'<div class="marker" style="left:217px; top:251px;"><a href="#" course="east"><span>6</span></a></div>' +
					'<div class="marker" style="left:165px; top:105px;"><a href="#" course="east"><span>7</span></a></div>' +
					'<div class="marker" style="left:118px; top:43px;"><a href="#" course="east"><span>8</span></a></div>' +
					'<div class="marker" style="left:211px; top:42px;"><a href="#" course="east"><span>9</span></a></div>' +
					'<div class="marker" style="left:206px; top:141px;"><a href="#" course="east"><span>10</span></a></div>' +
					'<div class="marker" style="left:129px; top:113px;"><a href="#" course="east"><span>11</span></a></div>' +
					'<div class="marker" style="left:50px; top:89px;"><a href="#" course="east"><span>12</span></a></div>' +
					'<div class="marker" style="left:126px; top:164px;"><a href="#" course="east"><span>13</span></a></div>' +
					'<div class="marker" style="left:65px; top:142px;"><a href="#" course="east"><span>14</span></a></div>' +
					'<div class="marker" style="left:97px; top:221px;"><a href="#" course="east"><span>15</span></a></div>' +
					'<div class="marker" style="left:187px; top:266px;"><a href="#" course="east"><span>16</span></a></div>' +
					'<div class="marker" style="left:235px; top:398px;"><a href="#" course="east"><span>17</span></a></div>' +
					'<div class="marker" style="left:325px; top:458px;"><a href="#" course="east"><span>18</span></a></div>' +
				'</div>' +
				'<img src="/Broadmoor.com-0073-2016Redesign/media/Broadmoor/design/interactive-scorecards/east/overview.png" alt="" border="0" />' +
			'</div>' +
			'<div id="westCourseMap">' +
				'<div class="locationMarkers">' +
					'<div class="marker" style="left:358px; top:520px;"><a href="#" course="west"><span>1</span></a></div>' +
					'<div class="marker" style="left:359px; top:414px;"><a href="#" course="west"><span>2</span></a></div>' +
					'<div class="marker" style="left:292px; top:345px;"><a href="#" course="west"><span>3</span></a></div>' +
					'<div class="marker" style="left:122px; top:305px;"><a href="#" course="west"><span>4</span></a></div>' +
					'<div class="marker" style="left:117px; top:260px;"><a href="#" course="west"><span>5</span></a></div>' +
					'<div class="marker" style="left:212px; top:270px;"><a href="#" course="west"><span>6</span></a></div>' +
					'<div class="marker" style="left:191px; top:80px;"><a href="#" course="west"><span>7</span></a></div>' +
					'<div class="marker" style="left:44px; top:35px;"><a href="#" course="west"><span>8</span></a></div>' +
					'<div class="marker" style="left:85px; top:14px;"><a href="#" course="west"><span>9</span></a></div>' +
					'<div class="marker" style="left:202px; top:0px;"><a href="#" course="west"><span>10</span></a></div>' +
					'<div class="marker" style="left:217px; top:32px;"><a href="#" course="west"><span>11</span></a></div>' +
					'<div class="marker" style="left:253px; top:94px;"><a href="#" course="west"><span>12</span></a></div>' +
					'<div class="marker" style="left:159px; top:185px;"><a href="#" course="west"><span>13</span></a></div>' +
					'<div class="marker" style="left:190px; top:212px;"><a href="#" course="west"><span>14</span></a></div>' +
					'<div class="marker" style="left:264px; top:280px;"><a href="#" course="west"><span>15</span></a></div>' +
					'<div class="marker" style="left:215px; top:311px;"><a href="#" course="west"><span>16</span></a></div>' +
					'<div class="marker" style="left:271px; top:381px;"><a href="#" course="west"><span>17</span></a></div>' +
					'<div class="marker" style="left:318px; top:489px;"><a href="#" course="west"><span>18</span></a></div>' +
				'</div>' +
				'<img src="/Broadmoor.com-0073-2016Redesign/media/Broadmoor/design/interactive-scorecards/west/overview.png" border="0" alt="" />' +
			'</div>' +
			'<div id="mountainCourseMap">' +
				'<div class="locationMarkers">' +
					'<div class="marker" style="left:429px; top:247px;"><a href="#" course="mountain"><span>1</span></a></div>' +
					'<div class="marker" style="left:381px; top:245px;"><a href="#" course="mountain"><span>2</span></a></div>' +
					'<div class="marker" style="left:385px; top:313px;"><a href="#" course="mountain"><span>3</span></a></div>' +
					'<div class="marker" style="left:316px; top:286px;"><a href="#" course="mountain"><span>4</span></a></div>' +
					'<div class="marker" style="left:137px; top:225px;"><a href="#" course="mountain"><span>5</span></a></div>' +
					'<div class="marker" style="left:29px; top:148px;"><a href="#" course="mountain"><span>6</span></a></div>' +
					'<div class="marker" style="left:28px; top:314px;"><a href="#" course="mountain"><span>7</span></a></div>' +
					'<div class="marker" style="left:94px; top:457px;"><a href="#" course="mountain"><span>8</span></a></div>' +
					'<div class="marker" style="left:73px; top:367px;"><a href="#" course="mountain"><span>9</span></a></div>' +
					'<div class="marker" style="left:141px; top:404px;"><a href="#" course="mountain"><span>10</span></a></div>' +
					'<div class="marker" style="left:156px; top:354px;"><a href="#" course="mountain"><span>11</span></a></div>' +
					'<div class="marker" style="left:228px; top:396px;"><a href="#" course="mountain"><span>12</span></a></div>' +
					'<div class="marker" style="left:224px; top:322px;"><a href="#" course="mountain"><span>13</span></a></div>' +
					'<div class="marker" style="left:147px; top:175px;"><a href="#" course="mountain"><span>14</span></a></div>' +
					'<div class="marker" style="left:71px; top:98px;"><a href="#" course="mountain"><span>15</span></a></div>' +
					'<div class="marker" style="left:167px; top:125px;"><a href="#" course="mountain"><span>16</span></a></div>' +
					'<div class="marker" style="left:124px; top:58px;"><a href="#" course="mountain"><span>17</span></a></div>' +
					'<div class="marker" style="left:226px; top:80px;"><a href="#" course="mountain"><span>18</span></a></div>' +
				'</div>' +
				'<img src="/Broadmoor.com-0073-2016Redesign/media/Broadmoor/design/interactive-scorecards/mountain/overview.png" border="0" alt="" />' +
			'</div>' +
			'<div id="holesMap"><img src="" border="0" alt="" id="holeImg" /></div>' +
			'<div id="scorecardMap"><img src="" border="0" alt="" /></div>' +
		'</div>' +
	'</div>');
		//$this.append('<div id="holesMap"><img src="" border="0" alt="" id="holeImg" /></div><div id="scorecardMap"><img src="" border="0" alt="" /></div>');
	});*/

	//
	var data_tables = jQuery('.data-tables').addClass('mock');
	// show golf map
	data_tables.each(function(){
		var table = jQuery(this),
			table_id = table.attr('id');
			data_course = table.attr('data-course');

		disableButtons();
		// Show Course Content
		//table.load(function(){showCourseContent();});
		//table.load(function() {showCourseContent(table_id, data_course);});
		//table.bind('click', showCourseContent);
		switch(data_course) {
			case 'east':
				//showContent('eastCourseContent');
				showMap('eastCourseMap', table_id);
				break;
			case 'west':
				//showContent('westCourseContent');
				showMap('westCourseMap', table_id);
				break;
			case 'mountain':
				//showContent('mountainCourseContent');
				showMap('mountainCourseMap', table_id);
				break;
		};

		// Golfer/Ball Animation
		table.find('[id^="holesMap"]').append('<img src="' + img_path + 'golfBall.png" border="0" alt="" id="golfBall' + data_course + '" width="6" height="6" />');
		table.find('[id^="holesMap"]').append('<img src="' + img_path + 'golfFlag.png" border="0" alt="" id="golfFlag' + data_course + '" width="20" height="18" />');
		table.find('[id^="holesMap"]').append('<img src="' + img_path + 'golfer.png" border="0" alt="" id="golfSwing' + data_course + '" width="15" height="40" />');
	});

	//
	var data_holes = jQuery('.data-table').find('tr > th');
	// add link to hole #
	data_holes.each(function(){
		var hole = jQuery(this),
			holeText = hole.text(),
			holeTextToInt = parseInt(holeText, 10),
			data_course = hole.closest('.data-tables').attr('data-course');

		//
		if(isNaN(holeTextToInt)) {
			//console.log('not integer: ' + holeText);
		} else {
			//console.log('is integer: ' + holeText);
			//currLabelAnswer.addClass('integer');
			//hole.html(holeText.replace(/(.\D+)/, '<a href="#" course="' + hole.closest('.data-tables').attr('data-course') + '">$1</a>'));
			hole.html('<a href="#" course="' + data_course + '">' + holeText + '</a>');
		}
	});

	// add color legend on data-table for golf cards
	var data_titles = jQuery('.data-table').find('[data-title="Hole"]');
	data_titles.each(function(){
		//$this.wrapInner('<span class="' + text + '" style="display:inline-block;background:' + text + ';"></span>');
		var $this = jQuery(this).css('position','relative');
		var text = jQuery.trim($this.text().toString().toLowerCase());
		var color;

		// set color legend
		if(text === 'black')
			color = '#000';
		else if(text === 'blue')
			color = '#1f3447';
		else if(text === 'white')
			color = '#fff';
		else if(text === 'gold')
			color = '#c39a3b';
		else if(text === 'red')
			color = '#ae2f36';
		else
			color = 'n/a';

		//console.log(text);
		//console.log(color);
		if(color !== 'n/a')
			$this.prepend('<span class="' + text + '" style="display:inline-block;margin-right:20px;width:40px;height:15px;background:' + color + ';border:1px solid #ccc;"></span>');
	});

	//
	bindClickEvents();

	// Whatever kind of mobile test you wanna do.
	if (screen.width < 500) {
		// :hover will trigger also once the cells are focusable
		// you can use this class to separate things
		jQuery("body").addClass("nohover");
		// Make all the cells focusable
		jQuery("td, th")
		.attr("tabindex", "1")
		// When they are tapped, focus them
		.on("touchstart", function() {
			jQuery(this).focus();
		});
	}

});
