/**
 * Created with JetBrains WebStorm.
 * User: cai
 * Date: 12-10-10
 * Time: 下午4:47
 * To change this template use File | Settings | File Templates.
 * author : czy
 * depends : jquery.1.7.2.js +
 *          jquery.class.js
 */

;(function ($) {
     Class.chosenLottery = Class.get({
        EVENT_CHECK:'check',
        initialize : function(selector , options){
           var _this = this;
           this.$ = $(selector);
           this.$items = this.$.children();
           this.$items.off('click.lottery').on('click.lottery',function(){
               if(!_this.$.attr('disable')){
                   _this.trigger(_this.EVENT_CHECK,{ index : $(this).index() , $sender : $(this), $items : _this.$items });
                   $(this).addClass('lottery-result');
                  // _this.$.attr('disable','true');
               }
           }).off('mousedown.lottery').on('mousedown.lottery',function(){
               if(!_this.$.attr('disable'))
                $(this).addClass('lottery-cursor');
           }).off('mouseup.lottery').on('mouseup.lottery',function(){
                $(this).removeClass('lottery-cursor');
           })

        },
        reload : function(callback){
            this.$.removeAttr('disable');
            this.$items.removeClass('lottery-result').css('background','');
            callback && $.proxy(callback,this);
            return this;
        }
    });

})(jQuery);