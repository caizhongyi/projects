(function ( $ ) {
    /**
     * @website http://www.zerowfe.com
     * */
    jQuery.fn.autoiframe = function ( selector , event ) {
        var that = this;

        function resetiframe() {
            return jQuery( that ).height( jQuery( that ).contents().find( 'body' ).height() );
        }

        selector = selector || 500;
        if ( typeof selector == 'number' ) {
            setInterval( function () {
                resetiframe();
            } , selector );
        }
        else if ( typeof selector == 'string' ) {
            event = (event || 'click') + '.autoiframe';
            $( this ).contents().off( event ).on( event , selector , function () {
                resetiframe();
            } )
        }
        else if ( typeof selector == 'object' ) {
            var items = [];

            function has( event ) {
                for ( var i = 0 ; i < items.length ; i ++ ) {
                    if ( items[i].event == event ) {
                        return true
                    }
                }
                return false;
            }

            $( selector ).each( function () {
                if ( typeof this == 'string' ) {
                    if ( has( this ) ) {
                        return
                    }
                    else {
                        items.push( { selector : this , event : 'click.autoiframe'} );
                    }
                }
                else {
                    if ( has( this.event ) ) {
                        return
                    }
                    items.push( { selector : this , event : this.event + '.autoiframe'} );
                }
            } )
            for ( var i = 0 ; i < items.length ; i ++ ) {
                var item = items[i];
                $( this ).contents().off( item.event ).on( item.event , item.selector , function () {
                    resetiframe();
                } )
            }
        }
        return this;
    };
})( jQuery )
