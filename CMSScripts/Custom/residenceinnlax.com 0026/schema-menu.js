jQuery(document).ready(function(){
								   
			jQuery('#menuElem').replaceWith(function(){
 			 return jQuery("<ul class='navigation' id='menuElem' itemscope='itemscope' itemtype='https://schema.org/SiteNavigationElement'>").append(jQuery(this).contents());
			});	
			jQuery('#menuElem > li ').replaceWith(function(){
 			 return jQuery("<li itemprop='name' />").append(jQuery(this).contents());
			});
           jQuery('#menuElem > li ul li').replaceWith(function(){
 			 return jQuery("<li itemprop='name' />").append(jQuery(this).contents());
			});
 		   jQuery("#menuElem > li a").attr("itemprop", "url");
		   
		    
			 

        });