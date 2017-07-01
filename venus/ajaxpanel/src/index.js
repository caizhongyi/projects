/**
 * alienjs-ajaxpanel
 * @project alienjs-ajaxpanel
 * @title ajaxpanel
 * @icon
 * @url http://www.alienjs.net
 * @author zhongyi cai
 */


!(function ($) {

    /**
     * @module  ui
     */

    /**
     * jquery
     * @module  jquery
     */

    /**
     * jquery ui
     * @module  jquery-ui
     */

    /**
     * ajax 加载容器
     * @class AjaxPanel
     * @main AjaxPanel
     * @module ui
     * @uses jquery.transitionEnd
     * @requires  jquery.transitionEnd
     * @constructor
     * */
    var AjaxPanel = function( selector , options){
        this.options = $.extend(true, {}, AjaxPanel.DEFAULTS , options);
        this.$elem = $(selector);
        for( var i in this.options){
            var p = this.$elem.data(i.replace(/[A-Z]+/g,'-$&').toLowerCase());
            this.options[i] = p == null ? this.options[i] : eval(p) ;
        }
        this.init.call( this );
    }

    AjaxPanel.prototype = {
        init : function(){
            this.$elem.addClass('ajaxpanel');
            return this;
        },
        has : function() {
            return this.$elem.children('.loading').length;
        },
        /**
         * Test .loading();
         * @method loading 加载中
         * @chainable
         */
        loading : function(){

            if( !this.has() ){
                this.$loading = $('<div class="loading fade '+ ( this.$elem.data('loadingclass') || this.options.loadingClass )  +'"><div class="loading-mask"></div></div>').appendTo(this.$elem);
                if( this.$elem.data('loadinginfo') || this.options.loadingInfo  ){
                    this.$loading.append('<div class="loading-info slide"></div>');
                }
                else{
                    this.$loading.append('<i class="loading-icon">loading...</i>');
                }
            }
            else{
                this.$loading = $('.loading');
            }


            this.$loading.addClass('in').find('.loading-info').addClass('in').html('<i class="loading-icon"></i>' +  ( this.$elem.data('loadinginfo') || this.options.loadingInfo));

            var btn = this.$elem.find( this.options.loadingBtn );
            btn.addClass('disabled').prop('disabled',true);

            return this;
        },
        /**
         * @method unloading 加载完成
         * @chainable
         */
        unloading : function(){
            this.$loading.removeClass('in');
            var btn = this.$elem.find( this.options.loadingBtn );
            btn.removeClass('disabled').removeAttr('disabled');
            return this;
        },
        _getcallback : function( callback ){
            var self = this;
            return function( data ){
                callback && callback.call( self.$elem , data );
                self.unloading();
            }
        },
      /*  ajax : function( setting ){
            this.loading();
            $.ajax( setting )
        },*/
        get : function( url , data , callback , type ){
            this.loading();
            if(typeof data == 'function'){
                callback = data;
                data = null
            }
            return $.get( url , data, this._getcallback(callback), type )
        },
        /**
         * 异步访问
         * @method post
         * @async
         * @param url {string} 地址
         * @param data {object} 参数
         * @param callback {function} 回调
         * @param type {string} 反回的数据类别 json | html
         * @returns {*}
         */
        post : function( url , data , callback , type ){
            this.loading();
            if(typeof data == 'function'){
                callback = data;
                data = null
            }
            return $.post( url , data, this._getcallback(callback) , type )
        },
        /**
         * @method jsonp 跨域访问
         * @example
         *  client page
         *  $.jsonp('http:www.abc.php',{},function(data){
	     *      console.log(data);
	     *  })
         *
         *  server page
         *  $callback = $_GET["callback"];
         *  echo "{$callback}([ { name:\"John\",password:'xuxiangpan'},{ name:'111',password:'111'},{ name:'222',password:'222'},{ name:'333',password:'333'} ] )";
         */
        jsonp : function(url , data , callback ){
            if ( $.type( data ) == 'function' ) {
                callback = data;
                data = null;
            }
            return $.ajax( {
                // async:false,
                url : url ,
                type : 'get' ,
                dataType : 'jsonp' ,
                //   jsonp: 'jsoncallback',
                data : data ,
                //  timeout: 5000,
                success : callback
                /* success: function (json) {//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
                 callback && $.proxy(callback,json)
                 // genDynamicContent(qsData,type,json);
                 }*/
            } )
        }
    }
    AjaxPanel.DEFAULTS = {
        loadingInfo : '',
        loadingBtn : '[data-loadingbtn]',
        loadingClass: ''
    }

    /**
     * ajaxPanel
     * @class ajaxPanel
     * @namespace jquery
     * @module jquery-ui
     * @param options {object}
     * @param options.loadingInfo {string}
     * @param options.loadingBtn {string}
     * @param options.loadingClass {string}
     * @returns {*}
     */
    $.fn.ajaxPanel = function ( options ) {
        var args = arguments;
        return $( this ).each(function(){
            var data = $(this).data('ajaxPanel');
            if(!data ){
                data = new AjaxPanel( this , options );
                $(this).data('ajaxPanel' , data);
            }
            var g = [];
            for( var i = 1 ; i < args.length ; i ++ ){
                g.push(args[i]);
            }
            // TODO 构造函数
            var fn = new Function( 'data' , 'options' ,'return data[ options ]('+ g.join(',') +')');
            options && data[ options ] && fn( data , options );
        })
    }

    $.fn.ajaxPanel.Constructor =  AjaxPanel;

    if( typeof module === "object" && typeof module.exports === "object"  ){
        module.exports = AjaxPanel;
    }
})(jQuery);

