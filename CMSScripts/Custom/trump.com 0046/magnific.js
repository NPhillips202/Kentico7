jQuery(document).ready(function() {

var groups = {};
jQuery('.galleryItem').each(function() {
  var id = parseInt(jQuery(this).attr('data-group'), 10);
  
  if(!groups[id]) {
    groups[id] = [];
  } 
  
  groups[id].push( this );
});


jQuery.each(groups, function() {
  
  jQuery(this).magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      gallery: { enabled:true }
  })
  
});

  
  jQuery('.video').magnificPopup({
  type: 'iframe'   
});
  
  
  jQuery('.gallery').each(function() { // the containers for all your galleries
    jQuery(this).magnificPopup({
        delegate: 'a', // the selector for gallery item
        type: 'image',
        gallery: {
          enabled:true
        }
    });
});

});