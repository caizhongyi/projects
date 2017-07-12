/*!
* 基于JQuery.overlay.js的玩儿道按字母顺序弹出层
* 
* 作者：jgglg
* email:jgglg@163.com
* Date: 2012/3/18 01:57
* 用法描述：
* 此活动分类弹出层是基于JQuery.overlay.js开源库，所以参数有2种，一种是应用与JQuery.overlay.js(overlaypts参数)，
* 一种应用于字母顺序弹出层(alphopts参数)
* options:{alphopts:{},overlayopts:{}}
* alphopts默认参数如下：
*     var defaults = {
title: "地区选择", //弹出层文本标题
id:'',//弹出层ID
elementid:'',//关联操作弹出层的元素ID
closetitle:'',//关闭文本提示框
callback: null//回调函数
}
* overlaypts参数请参照：http://jquerytools.org/documentation/overlay/index.html
*/
// wanerdaoac Class
$(function () {
    var area = jQuery('<div id="ac" style="width:820px;margin: 0 auto; z-index:9999;display:none;"></div>');
    $(area).appendTo(document.body);
    $("#ac").overlay({oneInstance: false}).load();
})
function wanerdaoac(options) {
    //初始化地区选择本身参数display:none;
    if (options != undefined && options.alphopts != undefined) {
        this.opts = jQuery.extend({}, wanerdaoac.defaults, options.alphopts || {});
    }
    //alert(1);
    if (jQuery.data(document.body, this.opts.elementid) == undefined) {        //构造UI

        var htext = wanerdaoac.getUI(this.opts);
        jQuery("#" + this.opts.id).empty();
        jQuery("#" + this.opts.id).append(htext);
        wanerdaoac.loadajax('getactivitycategorysettingsinfo', '');
        jQuery.data(document.body, this.opts.elementid, jQuery("#" + this.opts.elementid));
    }
//    if (jQuery.data(document.body, this.opts.elementid) == undefined) {        //构造UI

//        var htext = wanerdaoac.getUI(this.opts);
//        jQuery("#" + this.opts.id).empty();
//        jQuery("#" + this.opts.id).append(htext);
//        wanerdaoac.addevent(this.opts);
//        //加载顶级分类数据
//        wanerdaoac.loadajax('getactivitycategorysettingsinfo', '');
//        jQuery.data(document.body, this.opts.elementid, jQuery("#" + this.opts.elementid));
//    }
    wanerdaoac.addevent(this.opts);
    //加载顶级分类数据
    //wanerdaoac.loadajax('getactivitycategorysettingsinfo', '');
    if (options != undefined && options.overlaypts != undefined) {
        jQuery("#" + this.opts.elementid).overlay(options.overlaypts);
    }
    else {
        jQuery("#" + this.opts.elementid).overlay({oneInstance: false});
    }

};
jQuery.extend(wanerdaoac, {
    defaults: {
        title: '活动分类', //弹出层文本标题
        id: '', //弹出层ID
        elementid: '', //关联操作弹出层的元素ID
        callback: null//回调函数
    },

    getUI: function (opts) {
        var htext = '<table class="pop_dialog_table" style="width: 100%; height: 100%;">';
        htext += '<tbody><tr><td class="pop_topleft"></td><td class="pop_border"></td><td class="pop_topright"></td></tr>';
        htext += '<tr><td class="pop_border"></td><td class="pop_content">';
        htext += '<h2>' + opts.title + ' <a href="javascript:;" class="close" title="';
        htext += wanerdaoLangTip('common_00008') + '">' + wanerdaoLangTip('common_00008') + '</a></h2>';
        htext += '<div class="dialog_body">';
        //此处使用参数控制导航条
        htext += '<div id="acbar" class="control select-bar clearfix">';
        htext += '<a href="javascript:;" class="right back" style="display:none">返回上一层</a>';
        htext += '</div>';
        htext += '<div class="blank"></div>';
        //<!-- data-type : accountry | acstate | city-->
        //此处使用参数控制内容列表
        htext += '<div id="accontent">';
        htext += '  <div class="select-box clearfix" data-type="accountry">';
        htext += '      <dl class="item"><dd></dd></dl>';
        htext += '  </div>';
        htext += '</div>';
        htext += '<div class="dialog_buttons" style="margin:10px 0 -10px 0;">';
        htext += '<input id="acbtnOK" type="button" class="input-submit"/>&nbsp;&nbsp;';
        htext += '<input type="button" class="input-cancel close" value="' + wanerdaoLangTip('common_00016') + '"/>';
        htext += '</div></div></div></td>';
        htext += '<td class="pop_border"></td>';
        htext += '</tr><tr><td class="pop_bottomleft"></td><td class="pop_border"></td>';
        htext += '<td class="pop_bottomright"></td></tr>';
        htext += '</tbody></table>';
        return htext;
    },
    addevent: function (opts) {
        //确定按钮
        jQuery("#acbtnOK").unbind("click").click(function () {
            if (jQuery('#acbar a[class!="right back"]').length <= 0) {
                var data = '{"result":"false"}';
            }
            else {
                var data = '{"result":"true","acs":[';
                jQuery('#acbar a[class!="right back"]').each(function (i, n) {
                    data += '{"id":"' + jQuery(n).attr("id") + '","name":"' + $(this).text() + '"},';
                });
                data = data.substring(0, data.length - 1);
                data += ']}';
            }
            data = jQuery.parseJSON(data);
            var callback = opts.callback(data);
            eval(callback || function () { });
            jQuery("#" + opts.elementid).overlay({oneInstance: false}).close();
        });
        jQuery(".close").unbind("click").click(function () {
            jQuery("#" + opts.elementid).overlay({oneInstance: false}).close();
        });

    },
    loadajax: function (otypename, id) {
        var otype = "{opertype:'" + otypename + "',id:'" + id + "'}";
        if (id !== '') {
//            jQuery(".back").attr("id", id).show().unbind("click").click(function () {
//                $(this).hide();
//                wanerdaoac.loadajax('getactivitycategorysettingsinfo', $(this).attr("id"));
//            });
            jQuery(".back").show().unbind("click").click(function () {
                $(this).hide();
                wanerdaoac.loadajax('getactivitycategorysettingsinfo', '');
            });
        }
        else {
            jQuery(".back").hide();
        }
        ajaxfuncbyloadmsg('ac_activity.axd', otype, jQuery('#accontent'), wanerdaoac.errorfunc, function (data) {
            if (data.result && data.data.length > 0) {
                jQuery('#accontent .select-box[data-type="accountry"]>dl>dd').empty();
                jQuery.each(data.data, function (i, n) {
                    var aa = '<a href="javascript:;" id="{0}" istop="{1}" isbottom="{2}" parent_id="{3}">{4}</a>';
                    aa = aa.replace("{0}", data.data[i].id);
                    aa = aa.replace("{1}", data.data[i].istop);
                    aa = aa.replace("{2}", data.data[i].isbottom);
                    aa = aa.replace("{3}", data.data[i].parent_id);
                    aa = aa.replace("{4}", data.data[i].category_name);
                    jQuery('#accontent .select-box[data-type="accountry"]>dl>dd').append(aa);
                });
                jQuery('#accontent .select-box[data-type="accountry"]>dl>dd>a').click(function () {
                    if ($(this).attr("isbottom") == "true") {
                        if (jQuery('#acbar>a[id="' + $(this).attr("id") + '"]').length < 1) {
                            var t = '<a id="{0}" href="javascript:;">{1}</a>';
                            jQuery('#acbar').fadeIn().append(t.replace("{0}", $(this).attr("id")).replace("{1}", $(this).text()));
                            jQuery('#acbar>a[class!="right back"]').unbind("click");
                            jQuery('#acbar>a[class!="right back"]').click(function (event) {
                                $(this).remove();
                                event.stopPropagation();
                            });
                        }
                    }
                    else {
                        wanerdaoac.loadajax('getactivitycategorysettingsinfo', $(this).attr("id"));
                    }
                });
            }
            else {
                jQuery('#accontent').empty().append(wanerdaoLangTip('common_00005'));
                jQuery('#accontent .select-box[data-type="accountry"]').hide();
            }

        })

    },
    errorfunc: function (data) {

    }
});