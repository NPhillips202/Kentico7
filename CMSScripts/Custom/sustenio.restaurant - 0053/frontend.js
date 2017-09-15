/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
	
+function (jQuery) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    var jQueryel = jQuery(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var jQuerythis = jQuery(this)

    if (jQuerythis.is('.disabled, :disabled')) return

    var jQueryparent  = getParent(jQuerythis)
    var isActive = jQueryparent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !jQueryparent.closest('.navbar-nav').length) {
        // if mobile we we use a backdrop because click events don't delegate
        jQuery('<div class="dropdown-backdrop"/>').insertAfter(jQuery(this)).on('click', clearMenus)
      }

      jQueryparent.trigger(e = jQuery.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      jQueryparent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      jQuerythis.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var jQuerythis = jQuery(this)

    e.preventDefault()
    e.stopPropagation()

    if (jQuerythis.is('.disabled, :disabled')) return

    var jQueryparent  = getParent(jQuerythis)
    var isActive = jQueryparent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) jQueryparent.find(toggle).focus()
      return jQuerythis.click()
    }

    var jQueryitems = jQuery('[role=menu] li:not(.divider):visible a', jQueryparent)

    if (!jQueryitems.length) return

    var index = jQueryitems.index(jQueryitems.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < jQueryitems.length - 1) index++                        // down
    if (!~index)                                      index=0

    jQueryitems.eq(index).focus()
  }

  function clearMenus() {
    jQuery(backdrop).remove()
    jQuery(toggle).each(function (e) {
      var jQueryparent = getParent(jQuery(this))
      if (!jQueryparent.hasClass('open')) return
      jQueryparent.trigger(e = jQuery.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      jQueryparent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent(jQuerythis) {
    var selector = jQuerythis.attr('data-target')

    if (!selector) {
      selector = jQuerythis.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*jQuery)/, '') //strip for ie7
    }

    var jQueryparent = selector && jQuery(selector)

    return jQueryparent && jQueryparent.length ? jQueryparent : jQuerythis.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = jQuery.fn.dropdown

  jQuery.fn.dropdown = function (option) {
    return this.each(function () {
      var jQuerythis = jQuery(this)
      var data  = jQuerythis.data('dropdown')

      if (!data) jQuerythis.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call(jQuerythis)
    })
  }

  jQuery.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  jQuery.fn.dropdown.noConflict = function () {
    jQuery.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  jQuery(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);

/*
 * Front-end Javascript for The Spot
 */
jQuery(document).ready(function (jQuery) {

	// Slide the navbar dropdowns
	jQuery(document).on( 'show.bs.dropdown', function( event ) {
		jQuery( event.target ).find( '.dropdown-menu' ).slideDown( 100 );
	});
	jQuery(document).on( 'hide.bs.dropdown', function( event ) {
		jQuery( event.target ).find( '.dropdown-menu' ).slideUp( 100 );
	});

	// Open collapsed nav menu
	jQuery('.collapsed-menu-toggle .control').click( function() {
		var nav = jQuery(this).parent().parent();
		if ( nav.hasClass( 'open' ) ) {
			nav.removeClass('open');
			nav.find('.nav, .social-menu').each( function() {
				jQuery(this).slideUp( 100 );
			});
		} else {
			nav.addClass('open');
			nav.find('.nav, .social-menu').each( function() {
				jQuery(this).slideDown( 100 );
			});
		}

		return false;
	});


	/**
	 * Throttled browser resize events to show/hide elements that may
	 * have been changed
	 */
	var tspot_resize_check;
	window.onresize = function(){
		clearTimeout(tspot_resize_check);
		tspot_resize_check = setTimeout( tspot_resized, 1000 );
	};

	function tspot_resized(){

		// If the browser window is expanded, let's make sure that any hidden or fixed
		// navigation elements are shown again and remove the open/fixed classes
		if ( jQuery(window).width() >= 768 ) {
			var nav = jQuery( '#masthead .navigation.open, #masthead .navigation .open' );
			nav.removeClass('open');
			jQuery( '.dropdown-menu' ).hide();
			jQuery( '.navbar-nav' ).show();
		}
	}
});

/*
 * Animated footer for The Spot
 */

var tspotColophon;

jQuery(document).ready(function (jQuery) {
		
	tspotColophon = {

		el: jQuery( '#colophon' ),

		// Whether the colophon has been positioned
		initialized: false,

		// Animation speed
		speed: 250,

		padding: function() {
			return ( this.el.outerHeight() - this.el.height() ) / 2;
		},

		offset: function() {
			return this.el.find( '.utility' ).outerHeight() + this.padding();
		},

		isHome: (function() {
			return jQuery( '.home #colophon' ).length;
		})(),

		setCurrentPanel: function( panel ) {

			// Set the height for the absolutely positioned homepage footer
			if ( this.isHome ) {
				var height = this.el.outerHeight();
				this.el.css( 'height', height );
			}
			
			panel.parent().siblings().add( tspotColophon.el.find( '.panel' ) ).removeClass( 'current' );
			panel.parent().add( tspotColophon.el.find( '.panel.' + panel.data( 'target' ) ) ).attr( 'style', 'opacity: 0' ).addClass( 'current' ).animate({
					opacity: 1.0
				},
				tspotColophon.speed
			);

			// Reset any overflow conditions for the homepage footer
			if ( this.isHome ) {
				this.el.css( 'overflow', '' );
			}
		},

		// Reset to the colophon's starting position
		reset: function( e ) {

			// Don't let any click events bubble
			if( typeof e !== 'undefined' ) {
				e.stopPropagation();
			}

			// Remove the close btn because it's jumpy when the panel
			// is sliding down
			jQuery( '#close-colophon' ).hide();

			// Settings for initial page load
			if ( this.initialized === false ) {

				// Add the cover and close button for when its open
				jQuery( 'body' ).append( '<div id="shadow-cover"></div>' );
				this.el.append( '<div id="close-colophon"></div>' );
				jQuery( '#shadow-cover, #close-colophon' ).click( function(e) {
					tspotColophon.reset(e);
				});

				// Register click function on main links
				jQuery( '#colophon .utility a' ).click( function(e) {
					tspotColophon.setCurrentPanel( jQuery(this) );
					tspotColophon.open();
					return false;
				});
				
				this.initialized = true;
			}

			// Fade out the cover and close button
			jQuery( '#shadow-cover' ).fadeOut( this.speed );

			// Slide the footer to its starting position
			this.el.animate(
				{
					'margin-top' : '-' + tspotColophon.offset(),
					height :	tspotColophon.offset()
				},
				{
					duration: this.speed,
					easing: 'linear',
					complete: function() {
						tspotColophon.el.find( '.utility .current, .panel.current' ).removeClass( 'current' );
						tspotColophon.el.css( 'z-index', 'initial' );
						tspotColophon.el.css( 'overflow', 'hidden' );

						// IE leaves the scrollbar in place so this just
						// forces the issue on IE
						tspotColophon.el.css( 'overflow-y', 'hidden' );
						tspotColophon.el.css( '-ms-overflow-y', 'hidden' );

						// This forces a repaint to fix an issue in
						// Chrome. When the scrollbar disappaers,
						// the elements weren't repainted so they
						// didn't "fill in" the scrollbar area. This
						// will get the browser to repaint the
						// whole footer.
						tspotColophon.el.hide().show(0);
					}
				}
			);

			return false;
		},

		// Open the colophon
		open: function() {

			// Unbind click function on colophon
			tspotColophon.el.off( 'click' );

			this.el.css( 'z-index', '1015' );
			jQuery( '#shadow-cover' ).fadeIn( this.speed );

			var height = this.el.find( '.container' ).outerHeight() + this.padding() * 2;

			// If the window height is smaller than the colophon height,
			// we need to cap its height and allow scrolling. There
			// needs to be at least 30px of space to click.
			if ( jQuery(window).innerHeight() < height + this.padding() * 2 ) {
				height = jQuery(window).innerHeight() - this.padding() * 2;
				this.el.css( 'overflow-y', 'scroll' );
				jQuery( '#close-colophon' ).fadeIn( this.speed );
			}

			this.el.animate({
					'margin-top': '-' + height + 'px',
					height: height
				}, this.speed, function() {
			});

			// Re-initialize the google map if one exists within this
			// panel
			if ( this.el.find( '.panel.current .bp-map' ).length ) {
				bp_initialize_map();
			}
		}
	};

	
	// Initalize the position on the homepage
	if ( jQuery( '.home #colophon' ).length ) {
		tspotColophon.reset();

	// Initialize and register click events on other pages
	} else {

		jQuery( '#colophon .utility a' ).click( function(e) {

			tspotColophon.setCurrentPanel( jQuery(this) );

			// Scroll so the link is at the top, so that panels with
			// more information than currently displayed come within
			// view
			// @todo this is triggered on page load
			jQuery('html,body').animate({
				scrollTop: tspotColophon.el.offset().top
			}, tspotColophon.speed);

			// Re-initialize the google map if one exists within this
			// panel
			if ( jQuery( '#colophon .panel.current .bp-map' ).length ) {
				bp_initialize_map();
			}
			
			return false;
		});

		tspotColophon.setCurrentPanel(jQuery( '#colophon .utility a' ).first() );
	}
});
