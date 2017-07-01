//import {a} from "test";
//import b from "test1";
//import {default as b} from "test1";
    /**
     * 弹出窗口
     * @class Dialog
     * @main Dialog
     * @module ui
     * @demo node_modules/alienjs-dialog/examples/index.html
     * @uses jquery
     * @uses jquery.animationEnd
     * @param elem {string|object} 选择器
     * @param options {object}
     * @param options.popup {object} 设置触发标签 @default [data-popup]
     * @param options.hide {object} 设置触发隐藏的标签 @default [data-hide]
     * @param options.backdrop {object} 设置是否可以点击遮罩层隐藏 @default true
     * @param options.animate {object} 动画样式类名 @default {show : 'bounceInDown' , hide : 'bounceOutUp'}
     * @param options.context {string|object} 所在的父级容器 @default window
     * @return Dialog {object}
     * @constructor
     */
/*
        new a();
        new b();*/
export default class Dialog {
    constructor( elem , options ) {
        this.$elem = $( elem ) ;
        this.options = $.extend({} , Dialog.DEFAULTS , options );

        for(let i in this.options){
            var p = this.$elem.data(i.replace(/[A-Z]+/g,'-$&').toLowerCase());
            this.options[i] = p == null ? this.options[i] : eval(p) ;
        }

        if( typeof this.options.animate == 'string' ){
            this.options.animate = new Function(" return  "+ this.options.animate )();
            if( typeof this.options.animate != 'object')
                this.options.animate = { show : this.options.animate , hide : '' }
        }

        this.islockvisible = false;

        $( document ).off('click.dialog').on('click.dialog', this.options.popup , function(e){
            e.preventDefault();
            e.stopPropagation();
            $($(this).attr('href')).dialog('show');
        });

        var self = this;
        // this.$elem.appendTo('body');
        $( window ).off('resize.dialog').on('resize.dialog',function(e){
            self.center();
        });

        this.registerEvent();
    }
    registerEvent(){
        // TODO 注册事件
        var self = this;
        var events = [ 'on' , 'off' , 'trigger' ];
        for(var i = 0 ; i < events.length; i ++){
            var e = events[i];
            this[e] = (function(e){
                return function(){
                    // arguments 为传入参数
                    self.$elem[e].apply(  self.$elem , arguments );
                    return self;
                }
            })( e );
        }
    }
    getMask(){
        var $mask = $('.dialog-mask').length == 0 ? $('<div class="dialog-mask"></div>').appendTo('body'): $('.dialog-mask');
        return  $mask;
    }
    getModule( title , content  , hasfoot = true ){
        var $footer = $('<div>', { 'class' : "dialog-footer clearfix" }),
            $btnOK = $('<a>', { 'class' : "btn btn-primary btn-ok" , 'data-hide' : 'true' ,href : "javascript:;"  }).html('确定'),
            $btnCancel = $('<a>', { 'class' : "btn btn-default btn-cancel" , 'data-hide' : 'true', href : "javascript:;" }).html('取消');

        var $dialog = $('<div>', { 'class' : "dialog" }),
            $container = $('<div>', { 'class' : "dialog-container" }),
            $header = $('<div>', { 'class' : "dialog-header clearfix" }).append('<h3 class="dialog-title"> '+ title +'</h3><div class="operate"><a href="javascript:;" class="dialog-hide" data-hide >×</a></div>'),
            $body = $('<div>', { 'class' : "dialog-body dialog-message clearfix" }).html( content );

        $footer.append( $btnOK ).append( $btnCancel ) ;

        if( title != null ){
            $container.append( $header );
        }

        $container.append( $body );

        hasfoot && $container.append( $footer ) ;

        $dialog.append( $container );
        return $dialog;
    }
    center(){
        var $context = $( this.$elem.data('context') || this.options.context );
        var offset = $context.length ? $context.offset() : { left: 0, top: 0 };
        var $container = $context.find('.dialog-container');
        var size = { width: $container.width(), height: $container.height() };
        var left = ( $context.width() - size.width ) / 2;
        var top = ( $context.height() - size.height ) / 2;
        var params = {};
        //  params['left'] = left + (offset.left || 0);
        params['top'] = top + (offset && offset.top || 0) - $context.scrollTop();

        $context.find('.dialog-container').css(params);
        return this;
    }
    /**
     * 显示
     * @returns {Dialog}
     */
    show( time ){
        var self = this;

        if( time ){
            if( this.timer ) clearTimeout( this.timer );
           this.timer =  setTimeout( function(){  self.hide(); } , time );
        }

        this.$container = this.$elem.find('.dialog-container').off('click.dialog').on('click.dialog', this.options.hide ,function(e){
            self.relatedTarget = this ;
            self.hide();
        }).on('click.dialog',function(e){
            e.stopPropagation();
        });

        this.$elem.off('click.dialog').on('click.dialog',function(){
            self.relatedTarget = this ;
            var backdrop =  self.options.backdrop ;

            if( !backdrop ){
                return ;
            }

            self.hide();

        }).addClass('in');

        this.$container.removeClass(this.options.animate.hide).addClass( this.options.animate.show + " animated");

        this.$elem.trigger( $.Event('shown',{ relatedTarget : this.relatedTarget  }));

        //this.center()
        if( $(document).height() > this.$container.height())
            this.$container.css('top', $(document).height()/2 - this.$container.height()/2);
        return this;
    }
    /**
     * 锁定，锁定后无法隐藏或显示
     * @returns {Dialog}
     */
    lock(){
        this.islockvisible = true;
        return this;
    }
    /**
     * 解锁
     * @returns {Dialog}
     */
    unlock(){
        this.islockvisible = false;
        return this;
    }
    /**
     * 隐藏
     * @returns {Dialog}
     */
    hide(){
        var self = this ;
        if( this.islockvisible ) return this;

        this.$container.removeClass(this.options.animate.show).addClass( this.options.animate.hide );

        if( this.$container.animationEnd  && this.options.animate.hide )
            this.$container.animationEnd(  x => self.$elem.removeClass('in') );
        else
            self.$elem.removeClass('in');

        this.$elem.trigger( $.Event('hidden',{ relatedTarget : this.relatedTarget  }));
        return this;
    }
    /**
     * Toggle
     * @returns {Dialog}
     */
    toggle(){
        return this.$elem.hasClass('in') ? this.hide() : this.show();
    }
    alert( title , content  , callback ){
        var self = this;
        this.remove();
      //  callback.bind( self.$elem );

        this.$elem = this.getModule( title , content).addClass('dialog-alert').appendTo('body');
        this.$elem.find('.btn-ok').click(function(){
            callback && callback.call( self.$elem , { relatedTarget: this });
        })
        self.show()
        return this;
    }
    load(){}
    confirm( title , content , callback ){
        var self = this;
        this.remove();
        this.$elem = this.getModule( title , content ).addClass('dialog-confirm').appendTo('body');

        var event = {} ;
        if(typeof callback == 'object'){
            event = callback;
        }
        else{
            event.ok = callback;
        }

        this.$elem.find('.btn-ok').removeAttr( this.options.hide.replace('[','').replace(']','')).click(function(){
            event.ok && event.ok.call( self.$elem , { relatedTarget: this });
        }).end().find('.btn-cancel').click(function(){
            event.cancel && event.cancel.call( self.$elem , { relatedTarget: this });
        })
        self.show();

        return this;
    }
    blank( title , content ){
        var self = this;
        this.remove();
        this.$elem = this.getModule( title , content  , false ).appendTo('body');
        self.show();
        return this;
    }
    remove(){
        this.$elem && this.$elem.remove();
    }
}

/**
 * 配置
 * @type {{popup: string, hide: string, backdrop: boolean, animate: {show: string, hide: string}, context: Window}}
 */
Dialog.DEFAULTS = {
    popup   : '[data-popup]',
    hide    : '[data-hide]',
    backdrop: true,
    animate : { show : 'bounceInDown' , hide : 'bounceOutUp'},
    context : window
};

!(function ($) {
    /**
     * 弹出窗口
     * @class dialog
     * @module jquery-ui
     * @namespace jquery
     * @main dialog
     * @param options {object}
     * @param options {object}
     * @param options {object}
     * @param options {object}
     * @returns jquery {object}
     */
    $.fn.dialog = function ( options ) {
        var args = arguments;
        return $( this ).each(function(){
            var data = $(this).data('dialog');
            if(!data ){
                data = new Dialog( this , options );
                $(this).data('dialog' , data);
            }
            var g = [];
            for( var i = 1 ; i < args.length ; i ++ ){
                g.push(args[i]);
            }
            // TODO 构造函数
            var fn = new Function( 'data' , 'options' , 'args' ,'return data[ options ](args)');

            options && data[ options ] && fn( data , options , g.join(','));
        })
    }
    $.dialog = {} ;

    $.dialog.active = null ;

    function createDialog( options ){
        $.dialog.active && $.dialog.active.remove();
        return  new Dialog( null , options);
    }

    /**
     * 弹出提示框
     * @param title   {string}  标题
     * @param content  {string} 内容
     * @param callback  {function} 回调函数
     * @param options  {object} 配置
     * @returns {*|HTMLElement|Tabs.$elem|Calendar.$elem|Collapse.$elem|Carousel.$elem}
     */
    $.dialog.alert = function( title , content , callback , options ){
        return  $.dialog.active = createDialog( options ).alert( title , content , callback).$elem ;
    }

    /**
     * 确认提示框
     * @param title   {string}  标题
     * @param content  {string} 内容
     * @param callback  {function |object} 回调函数 | { ok : {function} , cancel : {function}}
     * @param options  {object} 配置
     * @returns {*|HTMLElement|Tabs.$elem|Calendar.$elem|Collapse.$elem|Carousel.$elem}
     */
    $.dialog.confirm = function( title , content , callback , options ){
        return  $.dialog.active = createDialog( options ).confirm( title , content ,callback ).$elem;
    }
    /**
     * 确认提示框
     * @param title   {string}  标题
     * @param content  {string} 内容
     * @param callback  {function} 回调函数
     * @param options  {object} 配置
     * @returns {*|HTMLElement|Tabs.$elem|Calendar.$elem|Collapse.$elem|Carousel.$elem}
     */
    $.dialog.blank = function( title , content , options ){
        return  $.dialog.active = createDialog( options ).confirm( title , content ).$elem;
    }

    /**
     * 提示坚屏浏览网页窗口
     * @class browserLowVersion
     * @module jquery-ui
     * @namespace jquery
     * @param message {string} 提示信息
     * @param callback  {function} 回调
     * @param options  {string} 提示信息
     * @returns jquery {object}
     */

    $.dialog.mobileIsOri = function( message  , callback , options){
        // TODO 提示使用坚屏浏览网页
        $(window).on('orientationchange',function(){
            if( window.orientation == 90 || window.orientation == -90)
                $.dialog.alert('提示' , message || '请坚屏浏览网页!' , callback , options);
        })
        return this;
    }

    /**
     * 浏览器版检测 本小于ie6 eie7提示窗口
     * @class browserLowVersion
     * @module jquery-ui
     * @namespace jquery
     * @param message {string} 提示信息
     * @param callback {function} 回调
     * @param options {object} 操作
     * @returns jquery {object}
     */
    $.dialog.browserLowVersion = function( message  , callback , options){
        var browser = navigator.appName;
        if( browser == "Microsoft Internet Explorer" ){
            var b_version = navigator.appVersion;
            var version = b_version.split(";");
            var trim_Version = version[1].replace(/[ ]/g,"");
            if( trim_Version=="MSIE7.0"){
                $.dialog.alert( null , message || '您当前浏览器版本较低，为了更好的浏效果请更新至最新版本!' , callback , options);
            }
            else if( trim_Version=="MSIE6.0"){
                $.dialog.alert( null , message || '您当前浏览器版本较低，为了更好的浏效果请更新至最新版本!' , callback , options);
            }
        }

        return this;
    }

    $.fn.dialog.Constructor =  Dialog;

    /**
     * 绑定于元素上点击事件，并弹出对话窗体
     * @class confirm
     * @module jquery-ui
     * @namespace jquery
     * @param title   {string}  标题
     * @param content  {string} 内容
     * @param callback  {function} 回调函数
     * @param options  {object} 配置
     * @returns jquery {object}
     */
    $.fn.confirm  = function( title , content , callback , options  ){
        return $(this).off('click.confirm').on('click.confirm',function(){
            $.dialog.confirm( title , content , callback , options );
        })
    }

    /**
     * 绑定于元素上点击事件，并弹出窗体
     * @class alert
     * @module jquery-ui
     * @namespace jquery
     * @param title   {string}  标题
     * @param content  {string} 内容
     * @param callback  {function} 回调函数
     * @param options  {object} 配置
     * @returns jquery {object}
     */
    $.fn.alert  = function( title , content , callback , options  ){
        return $(this).off('click.confirm').on('click.confirm',function(){
            $.dialog.alert( title , content , callback , options );
        })
    }
/*
    if( typeof module === "object" && typeof module.exports === "object"  ){
        module.exports = Dialog;
    }
    else{
        window.Dialog = Dialog ;
    }*/

})(window.jQuery);

