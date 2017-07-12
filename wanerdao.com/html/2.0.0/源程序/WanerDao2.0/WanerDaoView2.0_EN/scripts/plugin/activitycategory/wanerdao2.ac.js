/*!
* 活动分类弹出层
* 
* 作者：jgglg
* email:jgglg@163.com
* Date: 2012/3/18 01:57
* 修正时间：2012/7/25 21:22
* 用法描述：
* 新用法描述：
* options:{alphopts:{}}
* alphopts默认参数如下：
* var defaults = {
        title: "地区选择", //弹出层文本标题，默认已实现多语言标题，不需要填写
        elementid: '', //关联操作弹出层的元素ID
        callback: null//回调函数，此处必须填写
  }
* 以下内容已被废弃
overlayopts:{}
id:'',//弹出层ID
elementid:'',//关联操作弹出层的元素ID
*///////////////////////
// wanerdaoac Class
function wanerdaoac(options) {
    var me = this;
    var defaults = {
        title: wanerdaoLangTip('common_00038'), //弹出层文本标题
        elementid: '', //关联操作弹出层的元素ID
        callback: null//回调函数
    };
    if (options != undefined && options.alphopts != undefined) {
        me.opts = $.extend({}, defaults, options.alphopts || {});
    }
    infopop = {
        dialog: null,
        show: function (opts) {
            var _this = this;
            var $dialog = null;
            if ($.data(document.body, opts.elementid + 'ac') === undefined) {        //构造UI
                var html = _getUI(opts.elementid, opts.title);
                $dialog = $(html).appendTo($('body'));
                $.data(document.body, opts.elementid + 'ac', $dialog);
            }
            else {
                $dialog = $.data(document.body, opts.elementid + 'ac');
            }
            loadRemoteData('getactivitycategorysettingsinfo', '', opts.elementid);
            _this.dialog = new $.ui.dialog($dialog, {
                callback: { hide: function () {
                    $dialog.remove()
                }
                },
                widget: {
                    hide: '#' + opts.elementid + 'cancel'
                }
            }).show();
            //$('#' + opts.elementid + 'bar>a[id!="gotoback"]').remove();
            regevent(_this, $dialog, opts);
        }
    };
    infopop.show(me.opts);
    //构造UI
    function _getUI(id,title) {
        var htext = '<div id="' + id + 'ac" class="pop" style="width:860px; margin:10px auto;">';
        htext += '<div class="pop-bg"></div>';
        htext += '<div class="pop-container">';
        htext += '<div class="pop-hd clearfix"><h3>' + title + '</h3><a href="javascript:;" class="close-3" title="' + wanerdaoLangTip('common_00008') + '"></a></div>';
        htext += '<div class="pop-bd">';
        htext += '<div id="' + id + 'bar" class="gay-bor-box select-bar clearfix">';
        htext += '<div class="f_left"></div>';
        htext += '<a href="javascript:;" class="f_right" id="gotoback" style="display:none">' + wanerdaoLangTip('common_00039') + '</a>';
        htext += '</div>';
        htext += '<div id="' + id + 'loading" class="blank"></div>';
        htext += '<div class="select-box clearfix" data-type="accountry">';
        htext += '   <dl class="item"><dd></dd></dl>';
        htext += '</div>';
        htext += '<div class="pop-ft">';
        htext += '    <a id="' + id + 'ok" href="javascript:;" class="button button1" >' + wanerdaoLangTip('common_00034') + '</a>';
        htext += '    <a id="' + id + 'cancel" href="javascript:;"  class="button button1-disable" >' + wanerdaoLangTip('common_00016') + '</a>';
        htext += ' </div>';
        htext += ' </div>';
        htext += '</div>';
        htext += '</div>';
        return htext;
    }
    function regevent(_this,dialog,opts) {
        $("#" + opts.elementid + "ok").unbind("click").click(function () {
            if ($('#' + opts.elementid + 'bar a[id!="gotoback"]').length <= 0) {
                var data = '{"result":"false"}';
            }
            else {
                var data = '{"result":"true","acs":[';
                $('#' + opts.elementid + 'bar a[id!="gotoback"]').each(function (i, n) {
                    data += '{"id":"' + $(n).attr("id") + '","name":"' + $(this).text() + '"},';
                });
                data = data.substring(0, data.length - 1);
                data += ']}';
            }
            data = $.parseJSON(data);
            var callback = opts.callback(data);
            eval(callback || function () { });
            dialog.remove();
            _this.dialog.hide();
        });
        $('.close-3').unbind("click").click(function () {
            dialog.remove();
            _this.dialog.hide();
        });
    }
    //加载数据
    function loadRemoteData(otypename, id,loaddivid) {
        var otype = "{opertype:'" + otypename + "',id:'" + id + "'}";
        if (id !== '') {
            jQuery("#gotoback").show().unbind("click").click(function () {
                $(this).hide();
                loadRemoteData('getactivitycategorysettingsinfo', '', loaddivid);
            });
        }
        else {
            jQuery("#gotoback").hide();
        }
        ajaxfuncbyloadmsg('ac_activity.axd', otype, jQuery('#' + loaddivid + 'loading'), function (data) {
            alert(data);
        }, function (data) {
            if (data.result && data.data.length > 0) {
                jQuery('#' + loaddivid + 'ac .select-box[data-type="accountry"]>dl>dd').empty();
                jQuery.each(data.data, function (i, n) {
                    var aa = '<a href="javascript:;" id="{0}" istop="{1}" isbottom="{2}" parent_id="{3}">{4}</a>';
                    aa = aa.replace("{0}", data.data[i].id);
                    aa = aa.replace("{1}", data.data[i].istop);
                    aa = aa.replace("{2}", data.data[i].isbottom);
                    aa = aa.replace("{3}", data.data[i].parent_id);
                    aa = aa.replace("{4}", data.data[i].category_name);
                    jQuery('#' + loaddivid + 'ac .select-box[data-type="accountry"]>dl>dd').append(aa);
                });
                jQuery('#' + loaddivid + 'ac .select-box[data-type="accountry"]>dl>dd>a').click(function () {
                    if ($(this).attr("isbottom") == "true") {
                        if (jQuery('#' + loaddivid + 'bar>a[id="' + $(this).attr("id") + '"]').length < 1) {
                            var t = '<a id="{0}" href="javascript:;">{1}</a>';
                            jQuery('#' + loaddivid + 'bar').fadeIn().append(t.replace("{0}", $(this).attr("id")).replace("{1}", $(this).text()));
                            jQuery('#' + loaddivid + 'bar>a[id!="gotoback"]').unbind("click");
                            jQuery('#' + loaddivid + 'bar>a[id!="gotoback"]').click(function (event) {
                                $(this).remove();
                                event.stopPropagation();
                            });
                        }
                    }
                    else {
                        loadRemoteData('getactivitycategorysettingsinfo', $(this).attr("id"), loaddivid);
                    }
                });
            }
            else {
                jQuery('#' + loaddivid + 'ac .select-box[data-type="accountry"]').empty().append(wanerdaoLangTip('common_00005'));
            }

        })
    }
};