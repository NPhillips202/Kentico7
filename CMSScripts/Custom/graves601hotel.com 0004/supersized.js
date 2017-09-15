jQuery(function($){
	var wrapper = $('#wrapper');
	if(wrapper.length){
		wrapper.supersized({		  
			// Functionality
			slideshow               :   1,			// Slideshow on/off
			autoplay				:	1,			// Slideshow starts playing automatically
			start_slide             :   1,			// Start slide (0 is random)
			stop_loop				:	0,			// Pauses slideshow on last slide
			random					: 	0,			// Randomize slide order (Ignores start slide)
			slide_interval          :   4500,		// Length between transitions
			transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
			transition_speed		:	2500,		// Speed of transition
			new_window				:	1,			// Image links open in new window/tab
			pause_hover             :   0,			// Pause slideshow on hover
			keyboard_nav            :   1,			// Keyboard navigation on/off
			performance				:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
			image_protect			:	1,			// Disables image dragging and right click with Javascript
			 
			// Size & Position						   
			min_width		        :   0,			// Min width allowed (in pixels)
			min_height		        :   0,			// Min height allowed (in pixels)
			vertical_center         :   1,			// Vertically center background
			horizontal_center       :   1,			// Horizontally center background
			fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
			fit_portrait         	:   1,			// Portrait images will not exceed browser height
			fit_landscape			:   0,			// Landscape images will not exceed browser width
			 
			// Components							
			slide_links				:	'blank',	// Individual links for each slide (Options: false, 'number', 'name', 'blank')
			thumb_links				:	0,			// Individual thumb links for each slide
			thumbnail_navigation	:   0,			// Thumbnail navigation
			slides 					:  	[			// Slideshow Images	  	
				{image : '/getmedia/c670a715-b3fc-468a-a560-531b7e3b8824/home.aspx; .asp; .swf; .mp4' },
				{image : '/getmedia/682a01d3-9ea8-4f9d-a978-ab4cdee80956/home2.aspx; .asp; .swf; .mp4' },
				{image : '/getmedia/147cdac0-081d-4a86-abe2-0dd88dcd5ef3/home3.aspx; .asp; .swf; .mp4' },
				{image : '/getmedia/89b44f00-0c33-492f-ae88-61b231ea2bcb/home4.aspx; .asp; .swf; .mp4' },
				{image : '/getmedia/579e4bb9-5020-4d8a-90fa-1219e18b62fe/home5.aspx; .asp; .swf; .mp4' }		
			],
			
			// Theme Options			   
			progress_bar			:	1,			// Timer for each slide							
			mouse_scrub				:	0
		});	
	}
});