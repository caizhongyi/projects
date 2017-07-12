//警告或者确定弹出层
$(function () {
    var area = jQuery('<div id="wanerdaomsgpop" style="width:490px;margin: 0 auto; z-index:9999;display:none;"></div>');
    $(area).appendTo(document.body);
    $("#wanerdaomsgpop").overlay(); //.close();
});
function pop(options) {
    //初始化
    if (options != undefined) {
        this.opts = jQuery.extend({}, pop.defaults, options);
    }
    $("#wanerdaomsgpop").empty();
    $("#wanerdaomsgpop").append(pop.getUI(this.opts));
    $("#wanerdaomsgpop").overlay().load();
    pop.addevent(this.opts);
//    //构造UI
//    var loadmsg = $('<img src="/images/loading12.gif" alt="' + wanerdaoLangTip('common_00009') + '" title="' + wanerdaoLangTip('common_00009') + '"/>');
//    var area = jQuery('<div id="wanerdaomsgpop" style="width:490px;margin: 0 auto; z-index:9999;display:none;"></div>');
//    area.remove();
//    $(area).append(pop.getUI(this.opts)).appendTo(document.body).fadeIn();
//    loadmsg.remove();
//    pop.addevent(this.opts);
};
jQuery.extend(pop, {
    defaults: {
        titleid: '', //弹出层文本标题(此处错误标题请从multipleLanguage\zh-cn.js获取)
        /*    common_00021: '信息警告',
        common_00022: '信息错误',
        common_00023: '信息确认',
        common_00024: '信息提示',
        common_00025: '信息成功',*/
        typename: 'confirm', //warning是警告弹出层，error是错误弹出层，confirm是确认弹出层,success是成功，message是信息提示
        msginfo: '',
        callback: null//回调函数
    },
    getUI: function (opts) {
        var htext = '<table class="pop_dialog_table" style="width: 100%; height: 100%;">';
        htext += '<tbody><tr><td class="pop_topleft"></td><td class="pop_border"></td><td class="pop_topright"></td></tr>';
        htext += '<tr><td class="pop_border"></td>';
        htext += '<td class="pop_content">';
        htext += '<div class="dialog_content '; 
//        if (opts.typename != "confirm") {
//            htext += opts.typename;
        //        }
        htext += opts.typename;
        htext += '">';     
        htext += '<h2>' + wanerdaoLangTip(opts.titleid) + ' <a href="javascript:;" class="close" title="';
        htext += wanerdaoLangTip('common_00008') + '">' + wanerdaoLangTip('common_00008') + '</a></h2>';
        htext += '  <div class="dialog_body">';
        htext += '		<p class="msg">';
        htext += '		<br/>';
        htext += opts.msginfo;
        htext += '		<br/>';
        htext += '		<br/>';
        htext += '		</p>';
        htext += '	</div>';
        htext += '	<div class="dialog_buttons tc">';
        if (opts.typename == "confirm") {
            htext += '	<input id="wanerdaopopconfirm" type="button" class="input-submit">';
        }
        htext += '	<input id="wanerdaopopclose" type="button" class="input-cancel">';
        htext += '	</div>';
        htext += '</div></td>';
        htext += '<td class="pop_border"></td>';
        htext += '</tr>';
        htext += '<tr><td class="pop_bottomleft"></td><td class="pop_border"></td><td class="pop_bottomright"></td></tr>';
        htext += '</tbody></table>';
        return htext;
    },
    addevent: function (opts) {
        if (opts.typename == "confirm") {
            jQuery("#wanerdaopopconfirm").click(function () {
                var callback = opts.callback();
                eval(callback || function () { });
                $("#wanerdaomsgpop").overlay().close();
                //jQuery("#wanerdaomsgpop").fadeOut().remove();
            }); 
        }
        jQuery(".close,#wanerdaopopclose").click(function () {
            $("#wanerdaomsgpop").overlay().close();
            //jQuery("#wanerdaomsgpop").fadeOut().remove();
        });
    }
});