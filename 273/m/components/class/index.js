!(function(){

    var  obj = typeof module != 'undefined' ?  require('./class') : window.Class ;
    var  $ =  typeof module != 'undefined' ?  require('zepto') : window.Zepto ;

    var d, c , g ;
    d = obj.defaults ;
    c = ["unbind", "bind", "trigger", "on", "off" ];
    $.each(c, function (f, e) {
        if ($.isFunction($.fn[e])) {
            d[e] = function () {
                $.fn[e].apply($(this), arguments);
                return this
            }
        }
    });

    g = ["eq" ,"end" ];
    $.each(g, function (f, e) {
        if ($.isFunction($.fn[e])) {
            if( e == 'end'){
                d[e] = function () {
                    this.$ = this.$.prevObject;
                    return this
                }
            }
            else{
                d[e] = function () {
                    this.$ = $.fn[e].apply($(this.$), arguments);
                    return this
                }
            }

        }
    });

    if(typeof module != 'undefined') module.exports = obj ; else window.Class = obj;

})();
