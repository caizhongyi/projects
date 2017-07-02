/**
 * @descrption : js文件加载
 * http://www.alienjs.net
 * */
;(function ( window ) {
    window.loader = window.loader || {};
    window.loader.load = function ( tag , callback ) {
        var domscript = tag;
        domscript.doneState = { loaded : true , complete : true};
        if ( domscript.onreadystatechange !== undefined ) {
            // IE6+ support, chrome, firefox not support
            domscript.onreadystatechange = function () {
                if ( domscript.doneState[domscript.readyState] ) {
                    callback && callback.call( this );
                }
            }
        }
        else {
            // IE9+, chrome, firefox support
            domscript.onload = function () {
                callback && callback.call( this );
            };
        }
        return this;
    };
    window.loader.loadScript = function ( src , charset , callback ) {
        if ( typeof src == 'object' && src.length ) {
            for ( var i = 0 ; i < src.length ; i ++ ) {
                var item = src[i];
                if ( typeof item == 'string' ) {
                    window.loader.loadScript( item );
                }
                else {
                    window.loader.loadScript( item[0] , item[1] , item[2] );
                }
            }

            return this;
        }
        if ( typeof charset == 'function' ) {
            callback = charset;
            charset = null;
        }
        var script = document.createElement( 'script' );
        script.type = "text/javascript";
        script.charset = charset || 'utf-8';
        script.src = src;
        document.body.appendChild( script );
        window.loader.load( script , callback );
        return this;
    };
    window.loader.loadCss = function ( href , charset , callback ) {
        if ( typeof href == 'object' && href.length ) {
            var item = array[i];
            if ( typeof item == 'string' ) {
                window.loader.loadCss( item );
            }
            else {
                window.loader.loadCss( item[0] , item[1] , item[2] );
            }
            return this;
        }
        if ( typeof charset == 'function' ) {
            callback = charset;
            charset = null;
        }
        var csslink = document.createElement( 'link' );
        csslink.type = 'text/css';
        csslink.rel = "stylesheet";
        csslink.charset = charset || 'utf-8';
        csslink.href = href;
        document.body.appendChild( csslink );
        window.loader.load( csslink , callback );
        return this;
    };
    window.loader.loadjQuery = function ( src , charset , callback ) {
        window.loader.loadScript( "http://ajax.googleapis.com/ajax/libs/jquery/" + ( '1.7.2') + "/jquery.min.js" , function () {
            ! window.jQuery && window.loader.loadScript( src , charset , callback );
        } );
        return this;
    };
    window.loader.loadswf = function ( id , options ) {
        options = options || {};
        var opts = {
            width : options.width || 500 ,
            height : options.height || 400 ,
            src : options.src ,
            wmode : options.wmode || 'transparent' ,
            quality : options.quality || 'high' ,
            name : options.name || '' ,
            allowScriptAccess : options.allowScriptAccess || 'sameDomain'
        }
        var html = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="' + opts.width + '"    height="' + opts.height + '"  align="middle">\
			<param name="allowScriptAccess" value="' + opts.allowScriptAccess + '" />\
			<param name="movie" value="' + opts.src + '" />\
			<param name="quality" value="' + opts.quality + '" />\
			<param name="wmode" value="' + opts.wmode + '" />\
			<embed src="' + opts.src + '" quality="' + opts.quality + '" wmode="' + opts.wmode + '" width="' + opts.width + '"  height="' + opts.height + '" name="' + opts.name + '" align="middle" allowScriptAccess="' + opts.allowScriptAccess + '"  type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />\
			</object>';
        if ( typeof id == 'object' || id == null ) {
            var span = document.createElement( 'span' );
            span.innerHTML = html;
            document.body.appendChild( span );
        }
        else {
            if ( document.getElementById( id ) )
                document.getElementById( id ).innerHTML = html;
        }
        return this;
    }
})( window );
