/*!
* 基于JQuery.overlay.js的玩儿道按字母顺序弹出层
* 
* 作者：jgglg
* email:jgglg@163.com
* Date: 2012/3/18 01:57
* 用法描述：
* 此字母顺序弹出层是基于JQuery.overlay.js开源库，所以参数有2种，一种是应用与JQuery.overlay.js(overlaypts参数)，
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
//jQuery.fn.area = function (options) {
//    options = options || {};
//    return this.each(function () {
//        var node = this.nodeName.toLowerCase(), self = this;
//    });
//};
// wanerdaoArea Class
$(function () {
    var area = jQuery('<div id="tt" style="width:820px;margin: 0 auto; z-index:9999;display:none;"></div>');
    $(area).appendTo(document.body);    
})
function wanerdaoArea(options) {    
    //初始化地区选择本身参数display:none;
    if (options != undefined && options.alphopts != undefined) {
        this.opts = jQuery.extend({}, wanerdaoArea.defaults, options.alphopts || {});
    }
//    var htext = wanerdaoArea.getUI(this.opts);
//    jQuery("#" + this.opts.id).empty();
//    jQuery("#" + this.opts.id).append(htext);
//    //加载国家数据
//    wanerdaoArea.loadajax('country', '');
//    wanerdaoArea.addevent(this.opts);
    //alert(1);
    if (jQuery.data(document.body, this.opts.elementid) == undefined) {        //构造UI

        var htext = wanerdaoArea.getUI(this.opts);
        jQuery("#" + this.opts.id).empty();
        jQuery("#"+this.opts.id).append(htext);
        //加载国家数据
        wanerdaoArea.loadajax('country', '');
        wanerdaoArea.addevent(this.opts);
        jQuery.data(document.body, this.opts.elementid, jQuery("#" + this.opts.elementid));
    }
    
    if (options != undefined && options.overlaypts != undefined) {
        jQuery("#" + this.opts.elementid).overlay(options.overlaypts);
    }
    else {
        jQuery("#" + this.opts.elementid).overlay({ oneInstance: false });
    }

};
//wanerdaoArea.prototype = {
//    
//};
jQuery.extend(wanerdaoArea, {
    defaults: {
        title: '', //弹出层文本标题
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
        htext += '<div id="bar" class="control select-bar clearfix">';
        htext += '<a href="javascript:;"  style="display:none;" id="country"></a>';
        htext += '<a href="javascript:;"  style="display:none;" id="state"></a>';
        htext += '<a href="javascript:;"  style="display:none;" id="city"></a>';
        htext += '<a id="gopreLayer" href="javascript:;" class="right back" >返回上一层</a>';
        htext += '</div>';
        htext += '<div class="blank"></div>';
        //<!-- data-type : country | state | city-->
        //此处使用参数控制内容列表
        htext += '<div id="content">';
        htext += '<div class="select-box clearfix" data-type="country"></div>';
        htext += '<div class="select-box clearfix" style="display:none;" data-type="state"></div>';
        htext += '<div class="select-box clearfix" style="display:none;" data-type="city"></div>';
        htext += '</div>';
        htext += '<div class="dialog_buttons" style="margin:10px 0 -10px 0;">';
        htext += '<input id="btnOK" type="button" class="input-submit"/>&nbsp;&nbsp;';
        htext += '<input type="button" class="input-cancel close" value="' + wanerdaoLangTip('common_00016') + '"/>';
        htext += '</div></div></div></td>';
        htext += '<td class="pop_border"></td>';
        htext += '</tr><tr><td class="pop_bottomleft"></td><td class="pop_border"></td>';
        htext += '<td class="pop_bottomright"></td></tr>';
        htext += '</tbody></table>';
        return htext;
    },
    loaddata: function (aid, aname, atype) {
        var bar = $('.select-bar').fadeIn();
        switch (atype) {
            case 'country':
                $('.select-box[data-type=country]').hide().next().show();
                wanerdaoArea.addhide(bar, 'countryhide', aid + "&" + aname);
                $('.select-box[data-type=state]').empty();
                bar.find('#country').text(aname).addClass('selected').fadeIn();
                wanerdaoArea.loadajax('state', aid);
                wanerdaoArea.loadpredata(atype);
                break;
            case 'state':
                $('.select-box[data-type=state]').hide().next().show();
                wanerdaoArea.addhide(bar, 'statehide', aid + "&" + aname);
                $('.select-box[data-type=city]').empty();
                bar.find('#state').text(aname).addClass('selected').fadeIn(); //.fadeIn();
                wanerdaoArea.loadajax('city', aid);
                wanerdaoArea.loadpredata(atype);
                break;
            case 'city':
                wanerdaoArea.addhide(bar, 'cityhide', aid + "&" + aname);
                bar.find('#city').text(aname).addClass('selected').fadeIn();
                wanerdaoArea.loadpredata(atype);
                break;
        }

    },
    loadpredata: function (pretypename) {
        jQuery('.select-bar .back').unbind("click");
        jQuery('.select-bar .back').click(function () {
            var bar = jQuery('.select-bar');
            switch (pretypename) {
                case 'country':
                    bar.hide();
                    bar.find('#countryhide').remove();
                    var varcountry = $('.select-box[data-type=state]');
                    if (varcountry.length > 0) {
                        varcountry.hide().prev().fadeIn();                        
                    }
                    else {
                        $('.select-box[data-type=country]').fadeIn();
                    }
                    
                    break;
                case 'state':
                    bar.find('#state').hide();
                    bar.find('#statehide').remove();
                    $('.select-box[data-type=state]').hide().next().fadeOut();
                    $('.select-box[data-type=state]').empty().hide().prev().show();
                    wanerdaoArea.loadpredata('country');
                    break;
                case 'city':
                    bar.find('#cityhide').remove();
                    $('.select-bar #city').removeClass('selected').fadeOut();
                    $('.select-box[data-type=city]').empty().hide().prev().show();
                    wanerdaoArea.loadpredata('state');
                    break;
            }
            jQuery('#nodatatip').remove();
        });
    },
    addhide: function (o, hidename, hidevalue) {
        o.find('#' + hidename + '').remove();
        o.append('<input id="' + hidename + '" type="hidden" value="' + hidevalue + '">');
    },
    addevent: function (opts) {
        //确定按钮
        jQuery("#btnOK").click(function () {
            //e.`
            if (jQuery("input[type='hidden']").length <= 0) {
                var data = '{"result":"false"}';
            }
            else {
                var data = '{"result":"true",';
                jQuery("input[type='hidden']").each(function (i, n) {
                    var arr = jQuery(n).val().split('&');
                    data += '"' + jQuery(n).attr("id").replace("hide", "") + '":{"id":"' + arr[0] + '","name":"' + arr[1] + '"},';
                });
                data = data.substring(0, data.length - 1);
                data += '}';
            }
            data = jQuery.parseJSON(data);
            var callback = opts.callback(data);
            eval(callback || function () { });
            jQuery("#" + opts.elementid).overlay({ oneInstance: false }).close();
            return false;
        });
        jQuery(".close").click(function () {
            jQuery("#" + opts.elementid).overlay({ oneInstance: false }).close();
        });
    },
    loadajax: function (otypename, id) {
        var otype = "{opertype:'" + otypename + "',id:'" + id + "'}";
        ajaxfuncbyloadmsg('area_common.axd', otype, jQuery('#content'), wanerdaoArea.errorfunc, function (data) {
            if (data.result && data.total !== "0") {
                jQuery.each(data.rows, function (i, n) {
                    var fchar = data.rows[i].firstchar;
                    jQuery('.select-box[data-type=' + otypename + ']').append('<dl class="item"><dt><strong>' + fchar + '</strong><em>|</em></dt><dd id="' + fchar + '"></dd></dl>');
                    if (data.rows[i].name.indexOf('|') > 0) {
                        var countrys = data.rows[i].name.split('|');
                        for (i = 0; i < countrys.length; i++) {
                            var c = countrys[i].split(',');
                            jQuery('.select-box[data-type=' + otypename + ']>dl>dd[id="' + fchar + '"]').append('<a href="javascript:;" id="' + c[0] + '">' + c[1] + '</a>');
                        }
                    }
                    else {
                        var c = data.rows[i].name.split(',');
                        jQuery('.select-box[data-type=' + otypename + ']>dl>dd[id="' + fchar + '"]').append('<a href="javascript:;" id="' + c[0] + '">' + c[1] + '</a>');
                    }
                });
                jQuery('.select-box[data-type=' + otypename + ']>dl>dd>a').click(function () { wanerdaoArea.loaddata($(this).attr("id"), $(this).text(), otypename) });
            }
            else {
                jQuery('.select-box[data-type=' + otypename + ']').hide();
                var tipcontent = jQuery("<div id='nodatatip'></div>").append(wanerdaoLangTip('common_00005'));
                //jQuery('#content div:last').remove(); 
                jQuery('#content').append(tipcontent);

            }

        })
    },
    errorfunc: function (data) {

    }
});