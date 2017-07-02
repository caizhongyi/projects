;
(function ( $ ) {
    /**
     * @description  hex to rgb
     * @website http://www.zerowfe.com
     * */
     // Calculate an in-between color. Returns "#aabbcc"-like string.
    $.fn.calculateColor = function( begin , end , pos ) {
        var color = 'rgb' + ($.support['rgba'] ? 'a' : '') + '('
            + parseInt( (begin[0] + pos * (end[0] - begin[0])) , 10 ) + ','
            + parseInt( (begin[1] + pos * (end[1] - begin[1])) , 10 ) + ','
            + parseInt( (begin[2] + pos * (end[2] - begin[2])) , 10 );
        if ( $.support['rgba'] ) {
            color += ',' + (begin && end ? parseFloat( begin[3] + pos * (end[3] - begin[3]) ) : 1);
        }
        color += ')';
        return color;
    }

    /**
     * @description  rgb to hex
     * */
    // Parse an CSS-syntax color. Outputs an array [r, g, b]
    $.fn.parseColor = function( color ) {
        var match, triplet;
        // Match #aabbcc
        if ( match = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec( color ) ) {
            triplet = [parseInt( match[1] , 16 ), parseInt( match[2] , 16 ), parseInt( match[3] , 16 ), 1];
            // Match #abc
        }
        else if ( match = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec( color ) ) {
            triplet = [parseInt( match[1] , 16 ) * 17, parseInt( match[2] , 16 ) * 17, parseInt( match[3] , 16 ) * 17, 1];
            // Match rgb(n, n, n)
        }
        else if ( match = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec( color ) ) {
            triplet = [parseInt( match[1] ), parseInt( match[2] ), parseInt( match[3] ), 1];
        }
        else if ( match = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec( color ) ) {
            triplet = [parseInt( match[1] , 10 ), parseInt( match[2] , 10 ), parseInt( match[3] , 10 ), parseFloat( match[4] )];
            // No browser returns rgb(n%, n%, n%), so little reason to support this format.
        }
        return triplet;
    }
})( jQuery );