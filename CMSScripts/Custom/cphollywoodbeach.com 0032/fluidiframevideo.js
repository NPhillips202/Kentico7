jQuery(function(){var a=jQuery("iframe, object, embed"),b=jQuery("#mainContent");a.each(function(){jQuery(this).attr("data-aspectRatio",this.height/this.width).removeAttr("height").removeAttr("width")}),jQuery(window).resize(function(){var c=b.width();a.each(function(){var a=jQuery(this);a.width(c).height(c*a.attr("data-aspectRatio"))})}).resize()});