
/*
====================================================================================================
@name			Amzak - team.js (customized)
@version		1.0.0
@author			Les Fleurimond / Cendyn/ONE, Viral Patel / viralpatel.net
@author-uri		http://cendynone.com, http://viralpatel.net/blogs/dynamically-shortened-text-show-more-link-jquery/
@copyright		2014 Les Fleurimond / Cendyn/ONE
====================================================================================================
*/

var showChar = 60,
	ellipsestext = '...',
	moretext = 'read more <i class="fa fa-caret-right"></i>',//'read more &raquo;',
	lesstext = '<i class="fa fa-caret-left"></i> back',//'&laquo; close',
    baseLang = null,
	team_members_content = jQuery('.team-members').find('span.team-members-content');




jQuery(function() {
	// Shorten text - Read more and Read less link
	// ref: http://viralpatel.net/blogs/dynamically-shortened-text-show-more-link-jquery/
  
      /*
  -if userLanguage exists they're in IE, else firefox
  -get the first two letters in lowercase to guarantee 
   an easily evaluated base language
  */
  
  if (window.location.search) {
    baseLang = window.location.search.substring(6,8).toLowerCase();
  } else if (navigator.userLanguage) {
    baseLang = navigator.userLanguage.substring(0,2).toLowerCase();
  } else if (navigator.language) {
    baseLang = navigator.language.substring(0,2).toLowerCase();
  } else {
    baseLang = 'en';
  }

  //check languages
  switch(baseLang)
  {
    case 'es':
      //Spanish
      moretext = 'Ver más <i class="fa fa-caret-right"></i>';
      lesstext = '<i class="fa fa-caret-left"></i> cerca';
      break;
    default:
      moretext = 'read more <i class="fa fa-caret-right"></i>';
      lesstext = '<i class="fa fa-caret-left"></i> back';
  }
  
  
	team_members_content.each(function(index) {
		var content = jQuery(this).html(),
			set_content_id = jQuery(this).attr('id','content-' + index),
			content_id = set_content_id.attr('id');
		if(content.length > 1) {
			var a = content.substr(0, showChar);
				a = a.substr(0, Math.min(a.length, a.lastIndexOf(" ")));
			//var h = content.substr(showChar, content.length - showChar);
			var html = '<span class="shortDescrip">' + a + '</span><span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + content + '</span>&nbsp;<a href="#' + content_id + '" class="more">' + moretext + '</a></span>';
			jQuery(this).html(html);
		} 
	}); 
	jQuery('.team-members .more').click(function(){
		var morelink = jQuery(this);
		if(morelink.hasClass('less')) {
			//morelink.removeClass('less');
			jQuery('.team-members .more').removeClass('less');
			morelink.html(moretext);
			morelink.closest('li').removeClass('shadow');
			jQuery('.team-members .more').closest('li').removeClass('hide');
			jQuery(this).parent().parent().children('.shortDescrip').show();
		} else {
			jQuery('.team-members .more').addClass('less').attr('href','#team-members');
			morelink.html(lesstext);
			morelink.closest('li').addClass('shadow');
			jQuery('.team-members .more').closest('li:not(.shadow)').addClass('hide');
			jQuery(this).parent().parent().children('.shortDescrip').hide();
		}
		morelink.parent().prev().toggle();
		morelink.prev().toggle();
	});
	
});
