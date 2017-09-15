/* Modified from: https://gist.github.com/2208329 */

(function(jQuery) {
	// Finding min and max values in array
	Array.prototype.min = function() {return Math.min.apply({},this);};
	Array.prototype.max = function() {return Math.max.apply({},this);};
	jQuery.fn.masonry = function() {
		this.each(function() {
			var wall = jQuery(this);
			if (wall.children().length > 0) { // Check if the element has anything in it
				if (wall.children('.masonry-wrap').length === 0) { // checks if the `.masonry-wrap` div is already there
					wall.wrapInner('<div class="masonry-wrap"></div>');
				}
				var m_w = wall.children('.masonry-wrap'),
					brick = m_w.children(),
					b_w = brick.outerWidth(true),
					c_c = Math.floor(m_w.width() / b_w),
					c_h = [], this_col, i;
				for (i = 0; i < c_c; i++) {
					c_h[i] = 0;
				}
				m_w.css('position','relative');
				brick.css({
					'float':'none',
					'position':'absolute',
					'display':'block'
				}).each(function() {
					for (i = c_c - 1; i > -1; i--) {
						if (c_h[i] == c_h.min()) {
							this_col = i;
						}
					}
					jQuery(this).css({
						'top':c_h[this_col],
						'left':b_w * this_col
					});
					c_h[this_col] += jQuery(this).outerHeight(true);
				});
				m_w.height(c_h.max()).parent().addClass('start-transition');
			}
			return this;
		});
	};
})(jQuery);

jQuery(window).on("resize", function() {
	jQuery('#blog-container').masonry();
}).trigger("resize");