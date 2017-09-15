jQuery(function() {

    var $allVideos = jQuery("iframe, object, embed"),
    $fluidEl = jQuery("#mainContent");

	$allVideos.each(function() {

	  jQuery(this)
	    // jQuery .data does not work on object/embed elements
	    .attr('data-aspectRatio', this.height / this.width)
	    .removeAttr('height')
	    .removeAttr('width');

	});

	jQuery(window).resize(function() {

	  var newWidth = $fluidEl.width();
	  $allVideos.each(function() {

	    var $el = jQuery(this);
	    $el
	        .width(newWidth)
	        .height(newWidth * $el.attr('data-aspectRatio'));

	  });

	}).resize();

});