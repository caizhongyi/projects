!(function( $ ){

    $.console = function( message ){
        window.console && console.log( message );
        return this;
    }
})( window.jQuery || Zepto );