jQuery(document).ready(function(){
								   
			jQuery('#menuElem').replaceWith(function(){
 			 return jQuery("<ul id='menuElem' itemscope='itemscope' itemtype='https://schema.org/SiteNavigationElement'>").append(jQuery(this).contents());
			});	
			jQuery('#menuElem > li ').replaceWith(function(){
 			 return jQuery("<li itemprop='name' />").append(jQuery(this).contents());
			});
           jQuery('#menuElem > li ul li').replaceWith(function(){
 			 return jQuery("<li itemprop='name' />").append(jQuery(this).contents());
			});
 		   jQuery("#menuElem > li a").attr("itemprop", "url");
		   
		   //$( "#menuElem li a:first-child" ).wrap( "<span itemprop='name'></span>" );
		   
		  // $("a:contains('Accommodations')").html(function(_, html) {
//			   return  html.replace(/(Accommodations)/g, '<span itemprop="name">$1</span>')
//			});
//		   $("a:contains('Amenities')").html(function(_, html) {
//			   return  html.replace(/(Amenities)/g, '<span itemprop="name">$1</span>')
//			});
//		    $("a:contains('Local Attractions')").html(function(_, html) {
//			   return  html.replace(/(Local Attractions)/g, '<span itemprop="name">$1</span>')
//			});
//			 $("a:contains('Meetings')").html(function(_, html) {
//			   return  html.replace(/(Meetings)/g, '<span itemprop="name">$1</span>')
//			});
//			$("a:contains('Area Events')").html(function(_, html) {
//			   return  html.replace(/(Area Events)/g, '<span itemprop="name">$1</span>')
//			});
			 

        });