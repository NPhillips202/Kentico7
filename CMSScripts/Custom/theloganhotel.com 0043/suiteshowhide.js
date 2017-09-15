<script type="text/javascript">
		jQuery(function() {
			jQuery('.toggleBtn').click(function(e) {
				e.preventDefault();
				var thisBtn = jQuery(this);
				var target = jQuery(this).attr('href');
					target = jQuery(target);
				var speed = 500;
				
				if (target.is(':hidden')) {
					target.stop().slideDown(speed);
					
				} else {
					target.stop().slideUp(speed);
					
				};
			});
		});
		</script>