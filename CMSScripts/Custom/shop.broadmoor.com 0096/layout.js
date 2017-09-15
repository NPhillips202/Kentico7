var $ = jQuery.noConflict();
jQuery( document ).ready(function($) {

	var $wndw = jQuery(window),
		$html = jQuery('html'),
		$body = jQuery('form'),
		$both = jQuery('form, html');


	String.prototype.capitalize = function() {
		 return this.charAt(0).toUpperCase() + this.slice(1);
	}

	setTimeout(function() {
		$body.addClass( 'docready' );
	}, 250);


	//	Auto submenu
	var sections = [];
	var submenu = '';
	jQuery('.submenutext')
		.each(
			function( i )
			{
				var $h = jQuery(this).parent(),
					id = $h.attr( 'id' ) || 'h' + i;

				$h.attr( 'id', id );

				sections.push( '#' + id );
				submenu += '<li><a href="#' + id + '">' + jQuery(this).text().capitalize() + '</a></li>';
			}
		);

	if ( submenu.length )
	{
		sections = sections.reverse();

		var $h1 = jQuery('h1').first().addClass( 'has-submenu' );

		var $submenu = jQuery('<div class="submenu"><div><ul>' + submenu + '</ul></div></div>')
			.insertAfter( $h1 );

		var fixed = false,
			start = $submenu.offset().top;

		$submenu
			.find( 'a' )
			.each(
				function()
				{
					var href = jQuery(this).attr( 'href' );
					$body
						.find( 'a[href="' + href + '"]' )
						.on( 'click',
							function( e )
							{
								e.preventDefault();
								$both.animate({
									scrollTop: jQuery(href).offset().top - 120
								});
							}
						);
				}
			);
			


		var _selected = -1;
		var $subitems = $submenu
			.find( 'li' );

		$wndw
			.on( 'scroll.submenu',
				function( e )
				{
					var offset = $wndw.scrollTop();
					for ( var s = 0; s < sections.length; s++ )
					{
						if ( jQuery(sections[ s ]).offset().top < offset + 160 )
						{
							if ( _selected !== s )
							{
								_selected = s;
								$subitems
									.removeClass( 'selected' )
									.find( '[href="' + sections[ s ]+ '"]' )
									.parent()
									.addClass( 'selected' );
							}
							break;
						}
					}
				}
			);

		$wndw
			.trigger( 'scroll.submenu' );
	}



	//	The menu
	if ( jQuery.fn.mmenu )
	{

		var API = jQuery('#menu')
			.mmenu({
				extensions		: [ 'widescreen', 'theme-white', 'effect-menu-slide', 'pagedim-black' ],
				counters		: true,
				dividers		: {
					fixed 			: true
				},
				navbar 			: {
					title			: 'The Broadmoor'
				},
				navbars			: [
					//{
						//position	: 'top',
						//content 	: ['searchfield']
					//}, 
                    {
						position	: 'top'
					}
                    //{
						//position	: 'bottom',
						//content 	: ['<div>Hosted by <a href="https://www.byte.nl/" target="_blank">Byte</a></div>']
					//}
				],
				searchfield		: {
					resultsPanel 	: true
				},
				setSelected		: {
					parent			: true
				}

			}, {
				searchfield		: {
					clear 			: true
				}

			})
			.data( 'mmenu' );

		var $burger = jQuery('#hamburger')
			.on( 'click',
				function( e )
				{
					e.preventDefault();
					if ( $html.hasClass( 'mm-opened' ) )
					{
						API.close();
					}
					else
					{
						API.open();
					}
				}
			)
			.children( '.hamburger' );

		API.bind( 'closed', function() {
			setTimeout(function() {
				$burger.removeClass( 'is-active' );
			}, 100);
		});
		API.bind( 'opened', function() {
			setTimeout(function() {
				$burger.addClass( 'is-active' );
			}, 100);
		});
	}



	//	rotate ipad
	jQuery('a.rotate')
		.on( 'click',
			function( e )
			{
				e.preventDefault();
				jQuery(this).parent().toggleClass( 'portrait' );
			}
		);


	//	Download animation
	(function() {
		var $row = jQuery('.download-button');
		$row.find( 'a' ).on( 'click.dl',
			function( e )
			{
				e.preventDefault();
				$row.addClass( 'downloading' );

				var form = jQuery(this).attr( 'data-form' ),
					href = jQuery(this).attr( 'href' );

				if ( form )
				{
					document[ form ].submit();
				}
				else
				{
					window.location.href = href;
				}

				setTimeout(function() {
					window.location.href = window.location.href;
				}, 3000);
			}
		);
	})();


	//	Compose email link, please stop sending me spam...
	setTimeout(function() {
		var b = 'frebsite' + '.' + 'nl',
			o = 'info',
			t = 'mail' + 'to';

		jQuery('#emaillink').attr( 'href', t + ':' + o + '@' + b );
	}, 2000);



	//	Open menu in examples
	var $phones = jQuery('.phone, .tablets');
	if ( $phones.length )
	{
		var offsets = {};
		
		$phones
			.each(
				function()
				{
					var offset = jQuery(this).offset().top - 150;
					if ( offset < 0 )
					{
						offset = 0;
					}

					if ( !offsets[ offset ] )
					{
						offsets[ offset ] = jQuery();
					}
					offsets[ offset ] = offsets[ offset ].add( this );
				}
			);

		$wndw
			.on( 'scroll.phones',
				function()
				{
					var offset = $wndw.scrollTop();
					for ( var o in offsets )
					{
						if ( offset > o )
						{
							offsets[ o ]
								.each(
									function( i )
									{
										var iframe = jQuery(this).find( 'iframe' ),
											countr = 0;

										if ( !iframe.length )
										{
											return;
										}

										iframe = iframe[ 0 ].contentWindow;
										var interv = setInterval(
											function()
											{
												if ( iframe.jQuery )
												{	
													var API = iframe.jQuery('#menu').data( 'mmenu' );
													if ( API )
													{
														if ( API.open )
														{
															API.open();
														}
														clearInterval( interv );
													}
												}

												countr++;
												if ( countr > 50 )
												{
													clearInterval( interv );
												}
											}, 250 + ( i * 250 )
										);
									}
								);
							
							delete offsets[ o ];
						}
					}

					for ( var o in offsets )
					{
						return;
					}
					jQuery(this).off( 'scroll.phones' );
				}
			);

		setTimeout(
			function()
			{
				$wndw.trigger( 'scroll.phones' );
			}, 2500
		);
	}

});