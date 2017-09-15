   /**
 * Global Javascript global.js
*/



/**
 * jQuery Wrapper
 *
 * Allows the use of the dollar sign insted of jQuery when other
 * libraries or scripts are included and are using the dollar sign.
*/

(
	function( jQuery, document, undefined )
	{
		jQuery(document).ready(function() {
			 
 
			window.size_sections = jQuery("section.content > div.content");

			/* Style fixes...  It's just easier to do them here. */
			jQuery(window).bind('resize load', function() {
				jQuery("section.content").each(function() {
					var jthis = jQuery(this);

					window.t = jthis;

					jthis.find(".background-overlay").css("height", jthis.find("div.content").height());
				});

				 
			});

			jQuery(window).trigger('resize');


			if (jQuery("section.content.initial").length < 1) {
				
			}

			// Capitol Hill Legend
			if( jQuery("#map_key").length )
			{
				jQuery("#map_key_header").on( 'click', function(e){
					e.preventDefault();
					jQuery("#map_key_items").slideToggle();
				});
			}

		 

		});
	}
	
) ( jQuery, document );