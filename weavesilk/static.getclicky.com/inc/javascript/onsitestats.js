var _OSS = {
	
	// these will be (re)defined/localized by /ajax/onsitestats
	hq:  '',
	site_id: '',
	heatmap_header: 'Date range',
	heatmap_body: '', // static calendar, never need to reload from server
	site_header: 'Visitors online now',
	page_header: 'Visitors on this page now',
	
	secondary_current: '',
	
	heatmap_date: 'today',
	
	secondary_reset: function() {
		jQuery('#_oss_body').html('');
		_OSS.secondary_current = '';
		_OSS.secondary_header('');
		_OSS.secondary_loading(1);
		_OSS.secondary_display(1);
		_OSS.heatmap_date = 'today';
		_OSS.heatmap_body = _OSS.heatmap_body_original;
		if( window._heatmap_destroy ) _heatmap_destroy();
	},
	
	
	secondary_display: function( hide ) {
		if( hide ) {
			jQuery('#_oss_secondary').addClass('_oss_hideme');
		}
		else {
			jQuery('#_oss_secondary').removeClass('_oss_hideme');
		}
	},
	
	
	secondary_loading: function( hide ) {
		if( hide ) {
			jQuery('#_oss_loading').addClass('_oss_hideme');
		}
		else {
			jQuery('#_oss_loading').removeClass('_oss_hideme');
		}
	},
	
	
	secondary_header: function ( e ) {
		jQuery('#_oss_header').html( e ).find('a').each( function() {
			jQuery(this).click( function() {
				jQuery('#_oss_header a').removeClass('_oss_current');
				jQuery(this).addClass('_oss_current');
				_OSS[ _OSS.secondary_current ]( jQuery(this).data('report'));
				return false;
			});
		});;
	},
	
	
	secondary_content: function( e ) {
		_OSS.secondary_loading(1);
		
		// inject the html then search for links with 'data' attribs in them, do magic things
		jQuery('#_oss_body').html( e ).find('a').each( function() {
			
			var d = jQuery(this).data();
			
			if( d.heatmapdate ) {
				jQuery(this).click( function() {
					jQuery('#_oss_body a').removeClass('_oss_current');
					jQuery(this).addClass('_oss_current');
					_OSS.heatmap( '', d.heatmapdate );
					_OSS.heatmap_body = jQuery('#_oss_body').html(); // update heatmap calendar cache - we'll revert when menu is closed via reset() above
					return false;
				});
			}
			
			if( d.heatmapsub && d.heatmapsubitem ) {
				jQuery(this).click( function() {
					jQuery('#_oss_body a').removeClass('_oss_current');
					jQuery(this).addClass('_oss_current');
					_OSS.heatmap( d.heatmapsub, '', d.heatmapsubitem );
					return false;
				});
			}
		});
		
		
		// create an overlay to accept clicks to close secondary box, in order to avoid dealing with event propagation
		var h = document.getElementById("dummy-click-box");
		if( h ) return;
		
		var h = document.createElement("div");
		h.id = "dummy-click-box";
		document.getElementsByTagName("body")[0].appendChild( h );
		h = document.getElementById("dummy-click-box");
		
		var wh = _genericStats.doc_wh();
		
		h.style.position = "absolute";
		h.style.top = 0;
		h.style.left = 0;
		h.style.width = (wh.w-20)+"px";
		h.style.height = (wh.h-20)+"px";
		
		if( h.addEventListener ) { 
			h.addEventListener( "click", function(){ _OSS.secondary_reset(); document.body.removeChild( document.getElementById("dummy-click-box")) }, false );
		}
		else if( h.attachEvent ) {
			h.attachEvent( "onclick", function(){ _OSS.secondary_reset(); document.body.removeChild( document.getElementById("dummy-click-box")) } );
		}
	},
	
	
	
	// sets secondary view "fresh"
	
	secondary: function( type ) {
		
		_OSS.secondary_reset();
		
		_OSS.secondary_current = type;
		
		if( type == 'heatmap' ) {
			_OSS.secondary_header( _OSS.heatmap_header );
			_OSS.heatmap('calendar'); // we only load heatmap via secondary() when it's first opened, when switching tabs and back to it, heatmap() is called with sub='calendar'
		}
		else if( type == 'online' ) {
			_OSS.secondary_header( _OSS.site_header ); 
			_OSS.online();
		}
		else if( type == 'online_page' ) { // must use underscores to match method names below, for easier sub-report loading
			_OSS.secondary_header( _OSS.page_header ); 
			_OSS.online_page();
		}
		
		_OSS.secondary_display();
		_OSS.secondary_loading();
	},
	
	
	heatmap: function( sub, date, subitem ) {
		if( sub == 'calendar' ) {
			_OSS.secondary_content( _OSS.heatmap_body );
			sub = ''; // otherwise it will be passed back to the ajax script and we dont need this particular one
		}
		if( date ) _OSS.heatmap_date = date;
		_OSS.secondary_loading();
		_genericStats.heatmap( _OSS.heatmap_date, sub, subitem );
	},
	
	online: function( sub ) {
		_OSS.visitors_load( 1, '', sub );
	},
	
	online_page: function( sub ) {
		_OSS.visitors_load( 1, 1, sub );
	},
	
	
	
	
	// page = page number, href = page being viewed, sub = sub-report (e.g. searches for these visitors)
	visitors_load: function( page, href, sub ) {
		
		_OSS.secondary_loading();
		
		if( href && typeof href != 'string' ) href = _genericStats.get_href();
		
		_genericStats.inject( _OSS.hq + '/ajax/onsitestats/visitors?site_id=' + _OSS.site_id + ( _OSS.sitekey ? '&sitekey=' + _OSS.sitekey : '' ) + '&page=' + ( page||1 ) + ( href ? '&href=' + href + '&domain=' + location.hostname : '' ) + ( sub ? '&sub=' + sub : '' ) + '&x=' + Math.random());
	},
	
	
	visitors_inject: function( v ) {
		_OSS.secondary_content( v );
		_OSS.secondary_loading(1);
	}
}












