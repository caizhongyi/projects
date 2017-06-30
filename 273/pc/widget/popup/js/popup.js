/**
 * Created by Administrator on 2015/7/24.
 */
;(function () {
    var obj = typeof module != 'undefined' ?  require('class') : window.Class ;
    var $ = typeof module != 'undefined' ?  require('jquery') : window.jQuery ;

    /**
     * 弹出窗口
     * @return object
     * */
      var Popup = obj.create({
          initialize: function( selector , options ) {
              this.$ = $(selector);
              var _this = this;
              this.$.off('click.dialog').on('click.dialog','[data-close]',function(){
                  _this.hide();
              })
          },
          /**
           * @description 显示窗口
           * */
          show : function(){
              this.$.stop(true,true).fadeIn('fast');
              this.trigger("shown");
              return this;
          },
          /**
           * @description 隐藏窗口
           * */
          hide : function(){
              this.$.stop(true,true).fadeOut('fast')
              this.trigger("hidden");
              return this;
          }
      });

 /*   Alert.
    var Alert = obj.create( Popup,{
        initialize: function( selector , options ) {
            this.$ = $('<div></div>');
            var _this = this;
            this.$.off('click.dialog').on('click.dialog','[data-close]',function(){
                _this.hide();
            })
        }
    });*/

    if(typeof module != 'undefined') module.exports = Popup ;  else window.Popup = Popup;

})();

