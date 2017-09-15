jQuery(function() {	
	/*
	var x = 3,
		press_wrapper = jQuery('#pressWrapper'),
		size_li = press_wrapper.find('li').size(),
		load_more = jQuery('#loadMore'),
		load_less = jQuery('#showLess');
	*/
		
	var size_li = jQuery("#pressWrapper li").size(),
		x = 6, y = 6;
    jQuery('#pressWrapper li:lt(' + x + ')').show();
	
	//console.log(size_li);
	//console.log(jQuery('#pressWrapper li:lt(' + x + ')').length);
    
	jQuery('#loadMore').click(function () {
        x= (x+y <= size_li) ? x+y : size_li;
		var $this = jQuery(this);
		$this.addClass('loading');
		setTimeout(function(){ 
			jQuery('#pressWrapper li:lt(' + x + ')').show();
			//jQuery('#showLess').show();
			$this.removeClass('loading');
			if(x == size_li){
				$this.hide();
			}
		}, 1500);
		//console.log('more: ' + jQuery('#pressWrapper li:lt(' + x + ')').length);
    });
    /*jQuery('#showLess').click(function () {
        x = (x-y < 0) ? x : x-y;
        jQuery('#pressWrapper li').not(':lt(' + x + ')').hide();
        jQuery('#loadMore').show();
        jQuery('#showLess').show();
        if(x == x){
            jQuery('#showLess').hide();
        }
		console.log('less: ' + jQuery('#pressWrapper li:lt(' + x + ')').length);
    });*/
	
});
