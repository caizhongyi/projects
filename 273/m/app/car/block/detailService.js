/**
 * @desc        详情页弹出保障服务窗口
 * @author      赵公洲<zhaogz@273.cn>
 * @date        2015-11-19
 */
var $ = require('zepto');
var Widget = require('app/car/common/widget.js');
var Common = require('app/car/common/common.js');
var Log = require('widget/log/js/log.js');
require('widget/map/js/overlay.js');

var DEFAULT_TPL =
    '<div id="service_dialog" class="surv-pop mod-showpop" style="z-index:1001; position: fixed; top: 25%;">'+
    '<div class="showpop-con" style="left: auto; top: auto; position: static; margin: 0 auto;">'+
        '<div class="hd"><a href="javascript:;" title="关闭" class="showpop-close js_close"></a></div>'+
        '<div class="bd">'+
            '<h2 class="tit">保障服务说明</h2>'+
            '<ul class="surv-pop-list">'+
                '<li class="item" id="warranty">'+
                    '<h3 class="t comm-ico"><i class="i-bao"></i><span class="txt">保修服务</span></h3>'+
                    '<p class="c">该车初步具备享受车况宝保修服务的条件</p>'+
                '</li>'+
                '<li class="item" id="ckb">'+
	                '<h3 class="t comm-ico"><i class="i-ckb"></i><span class="txt">车况检测</span></h3>'+
	                '<p class="c">车况已预检，购车前将再进行复检，复检有误，原价退车</p>'+
                '</li>'+
                '<li class="item" id="returncar">'+
                    '<h3 class="t comm-ico"><i class="i-jian"></i><span class="txt">90天退车</span></h3>'+
                    '<p class="c">若车况宝复检时承诺项目检测失误，90天内原价退车</p>'+
                '</li>'+
                '<li class="item" id="installment">'+
                    '<h3 class="t comm-ico"><i class="i-daikuan"></i><span class="txt">分期购车</span></h3>'+
                    '<p class="c">该车辆可享受分期购车服务</p>'+
                '</li>'+
            '</ul>'+
        '</div>'+
    '</div>'+
'</div>';

var detailService = function (options) {
    if (!(this instanceof detailService)) return new detailService(config);
    this.init(options);
};

detailService.defaults = {};

var proto = detailService.prototype = {};

proto.constructor = detailService;

proto.init = function (options) {
    if (!options) {
        throw new Error('配置信息为空');
    }

    if (!options.$el) {
        throw new Error('$el为空');
    }

    this.config = $.extend({data : options.$el.data()}, detailService.defaults, options);
    this.$content =  $(Widget.template(DEFAULT_TPL, {}));
    options.$el.on('click', $.proxy(this._initBox, this)).click();

    return this;
};

proto._initBox = function() {
    this._createDialog(this.$content);
    var me = this;
    var warranty = me.config.data.warranty;
    var returncar = me.config.data.returncar;
    var installment = me.config.data.installment;
    var ckb = me.config.data.ckb;
    if(!warranty || warranty == 0){
        this.$content.find('#warranty').hide()
    }
    if(!returncar || returncar == 0){
        this.$content.find('#returncar').hide()
    }
    if(!installment || installment == 0){
        this.$content.find('#installment').hide()
    }
    if(!ckb || ckb == 0){
        this.$content.find('#ckb').hide()
    }

    var $content = this.$content;
};

proto._createDialog = function($content) {
    this.config.$el.overlay({
        effect: 'none',
        opacity: 0.8,
        closeOnClick: true,
        glossy:true,
        closeBtn:'.js_close',
        onShow: function() {
            var $dialog = $('#service_dialog');
            if ($dialog.length) {
                $dialog.show();
            } else {
                $dialog = $content;

                $('body').append($content);
            }
            dialogPostion($dialog);
        },
        onHide: function() {
            $('#service_dialog').hide();
        },
    });
    $('.overlay,#service_dialog').on("touchmove", function(e) {
        e.preventDefault();
    });
};
function dialogPostion( $dialog ){
}
$(window).resize(function(){
    dialogPostion($('#service_dialog'));
})

module.exports = detailService;
