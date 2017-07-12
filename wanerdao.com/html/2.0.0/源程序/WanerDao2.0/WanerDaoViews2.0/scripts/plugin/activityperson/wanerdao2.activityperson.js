/*
* 玩儿道活动人员弹出层
* 
* 作者：jgglg
* email:jgglg@163.com
* Date: 2012/9/24 22:57
* 用法描述：
*    { activityid:'',活动ID，callback: null//回调函数}
*/
function activityperson(options) {
    var defaults = {
        activityid:'',//活动ID
        callback: null//回调函数
    };
    var me = this;
    //初始化
    if (options != undefined) {
        me.opts = $.extend({}, defaults, options || {});
    }
    var infopop = {
        dialog: null,
        show: function (opts) {
            var _this = this;
             var html = _getUI(opts);
            var $dialog = $(html).appendTo($('body'));
            var d = this.dialog = new $.ui.dialog($dialog, {
                callback: { hide: function () { $dialog.remove() } },
                widget: {
                    hide: '.close-3'
                }
            }).show();
            _regEvent(opts);
            _loaddata("activitymember_common.axd");
            //确定
            $('#acpersonsubmit').click(function () {
                if ($('#acpersonselected li input:checked').length > 0) {
                    var data = '{"acperson":[';
                    var tmpitems = '';
                    $('#acpersonselected li input:checked').each(function () {
                        var p = $(this).parent().parent()
                        tmpitems += '{"id":"' + p.attr("id").replace("_rli", "") + '","name":"' + p.text() + '"},';
                    });
                    tmpitems = tmpitems.substring(0, tmpitems.length - 1);
                    data = data + tmpitems + ']}';
                    data = $.parseJSON(data);
                    var callback = opts.callback(data);
                    eval(callback || function () { });
                    d.hide();
                }
                else {
                    alert(wanerdaoLangTip('common_00004'));
                }
            });
        },
        hide: function () {
            this.dialog && this.dialog.hide();
        }
    };
    infopop.show(me.opts);
    //构建UI
    function _getUI(optsparam) {
        var ui = '<div class="pop" style="width:850px; margin:10px auto;">';
        ui += '<div class="pop-bg"></div>';
        ui += '<div class="pop-container">';
        ui += '     <div class="pop-hd clearfix"><h3>' + wanerdaoLangTip('common_00056') + ' </h3><a href="javascript:;" class="close-3" title="' + wanerdaoLangTip('common_00008') + '"></a></div>';
        ui += '     <div class="pop-bd search-friends clearfix">';
        ui += '         <div class="search-right search-list">'; //右侧选择后的div
        ui += '             <ul  id="acpersonselected"><li id="noli">' + wanerdaoLangTip('common_00020') + '</li></ul>'; //选择后添加的列表
        ui += '             <div class="search-footer clearfix"><label class="selectall f_left"><input  type="checkbox" id="acpersonalluncheck"/>&nbsp;' + wanerdaoLangTip('common_00014') + '</label>';
        ui += '             <div class="submit f_right">';
        ui += '             <a href="javascript:;" class="button gay-button" id="acpersoncancel"><span class="icon error-1"></span>&nbsp;' + wanerdaoLangTip('common_00015') + ' </a>';
        ui += '             <a href="javascript:;" class="button gay-button" id="acpersonsubmit"><span class="success"></span>&nbsp;' + wanerdaoLangTip('common_00034') + ' </a></div></div>';
        ui += '         </div>';
        ui += '         <div class="search-add overflow">'; //搜索所用的div
        ui += '             <div class="search-box"><input  type="text" class="text" inputdefault="' + wanerdaoLangTip('common_00040') + '" id="acpersontext" value="' + wanerdaoLangTip('common_00040') + '"</>';
        ui += '             <a href="javascript:;" class="button search-button" id="acpersonseach"></a></div>';
        //左侧分页导航
        ui += '             <div class="search-addbar clearfix"><label class="f_left"><input type="checkbox" id="acpersonheadallcheck"/>';
        ui += '              <a href="javascript:;" class="search-add-button"  id="acpersonheadadd">' + wanerdaoLangTip('common_00013') + '</a></label>';
        ui += '              <div class="pager f_right"><a href="javascript:;" title="' + wanerdaoLangTip('pager_00003') + '" class="prev" id="acpersonheadpre"></a>';
        ui += '              <span id="acpersonheadpage"></span><a href="javascript:;" title="' + wanerdaoLangTip('pager_00004') + '" class="next" id="acpersonheadlast"></a></div></div>';
        ui += '             <ul class="search-add-list"  id="acpersonlist"></ul>';
        ui += '             <div class="search-addbar clearfix"><label class="f_left"><input type="checkbox" id="acpersontailallcheck"/>';
        ui += '              <a href="javascript:;" class="search-add-button" id="acpersontailadd">' + wanerdaoLangTip('common_00013') + '</a></label>';
        ui += '              <div class="pager f_right"><a href="javascript:;" title="' + wanerdaoLangTip('pager_00003') + '" class="prev-disable" id="acpersontailpre"></a>';
        ui += '              <span id="acpersontailpage"></span><a href="javascript:;" title="' + wanerdaoLangTip('pager_00004') + '" class="next-disable" id="acpersontaillast"></a></div></div>';
        ui += '         </div>';
        ui += '     </div>';
        ui += '</div>';
        ui += '</div>';
        return ui;
    }
    function _regEvent(optsparam) {//注册事件

        //左侧事件注册
        $('#acpersonheadallcheck,#acpersontailallcheck').click(function () {
            if ($(this).attr("checked")) {
                if ($(this).attr("id") !== 'acpersontailallcheck') {
                    $('#acpersontailallcheck').attr("checked", true);
                }
                if ($(this).attr("id") !== 'acpersonheadallcheck') {
                    $('#acpersonheadallcheck').attr("checked", true);
                }
                $('#acpersonlist li :checkbox').attr("checked", true);
            }
            else {
                if ($(this).attr("id") !== 'acpersontailallcheck') {
                    $('#acpersontailallcheck').attr("checked", false);
                }
                if ($(this).attr("id") !== 'acpersonheadallcheck') {
                    $('#acpersonheadallcheck').attr("checked", false);
                }
                $('#acpersonlist li :checkbox').attr("checked", false);
            }
        });
        //左侧添加
        $('#acpersonheadadd,#acpersontailadd').click(function () {
            if ($('#acpersonlist li input:checked').length <= 0) {
                $('#acpersonlist li input').attr("checked", true);
                $('#acpersonheadallcheck,#acpersontailallcheck').attr("checked", true);
            }
            $('#acpersonlist li').each(function () {
                $(this).find("input:checked").each(function () {//.children()
                    if ($(this).parent().parent().find('div a').length < 1) {
                        $(this).parent().find('a:eq(0)').each(function () {
                            _addselect($(this).attr("id"), $(this).text());
                        });
                    }
                    else {
                        $(this).parent().parent().find('div a').each(function () {
                            _addselect($(this).attr("id"), $(this).text());
                        });
                    }
                });
            });
        });
        //前一页
        $('#acpersonheadpre,#acpersontailpre').click(function () {
            var t = parseInt($.data(document.body, "acpersontotal"));
            var total = Math.ceil(t / 6);
            var currpage = parseInt($.data(document.body, "acpersoncurrPage"));
            if (total > 0 && (currpage - 1) > 0) {
                $.data(document.body, "acpersoncurrPage", currpage - 1);
                $('#acpersonheadpage,#acpersontailpage').text((currpage - 1) + '/' + total);
                _loaddata("activitymember_common.axd");
            }
        });
        //后一页
        $('#acpersonheadlast,#acpersontaillast').click(function () {
            var t = parseInt($.data(document.body, "acpersontotal"));
            var total = Math.ceil(t / 6);
            var currpage = parseInt($.data(document.body, "acpersoncurrPage"));
            if (total > 0 && (currpage + 1) <= total) {
                $.data(document.body, "acpersoncurrPage", currpage + 1);
                $('#acpersonheadpage,#acpersontailpage').text((currpage + 1) + '/' + total);
                _loaddata("activitymember_common.axd");
            }
        });
        $.data(document.body, "acpersoncurrPage", 1);
        //绑定查询 
        $("#acpersonseach").click(function () {
            _loaddata("activitymember_common.axd");
        });
    }
    function _addselect(id, name) {
        $('#' + id + '_input').attr("checked", true);
        $('#noli').remove();
        var temp = '<li id="' + id + '_rli" class="ellipsis"><label   class="ellipsis"><input type="checkbox" checked="checked"/>{0}</label></li>';
        temp = temp.replace("{0}", name);
        var ab = $('<a href="javascript:;" class="icon icon-blue-close list-del" title="删除"></a>').click(function () {
            $(this).parent().remove();
            $('#' + id + '_input').attr("checked", false);
            $('#acpersonheadallcheck,#acpersontailallcheck').attr("checked", false);
        });
        temp = $(temp).append(ab);
        if ($('#' + id + '_rli').length < 1) {
            $('#acpersonselected').append(temp);
        }
    }
    function _removeselect( id) {
        $('#' + id.replace("_rli", "") + '_input').attr("checked", false);
        $('#acpersonheadallcheck,#acpersontailallcheck').attr("checked", false);
        $("#" + id).remove();
    }
    function _loaddata(axd) {
        var otype = "{opertype:'";
        //圈子查找
        if ($("#acpersontext").val() !== '' && $("#acpersontext").val() !== '请输入名字') {
            otype += "getactivitymemberbypage',uname:'" + $("#acpersontext").val() + "'";
        }
        else {
            otype += "getactivitymemberbypage'";
        }
        otype += ",activityid:'" + me.opts.activityid + "',pagecurrent:'" + $.data(document.body, "acpersoncurrPage") + "',pageSize:'6'}";
        //加载数据'pop_common.axd'
        ajaxfuncbyloadmsg(axd, otype, $('#acpersonlist'), function (data) {
        }, function (data) {
            if (data.result && data.total !== "0") {
                $('#acpersonheadpage,#acpersontailpage').text('1/' + Math.ceil(data.total / 6));
                $.data(document.body, "acpersontotal", data.total);
                $('#acpersonlist').empty();
                $.each(data.rows, function (i, n) {
                    var temp = '<li><label class="ellipsis"><input id="{0}_input" type="checkbox">';
                    temp += '<a id="{1}" href="/personal/personal_info.html?uid={2}">{3}</a></label><a href="javascript:;" class="icon icon-blue-add list-add"  title="' + wanerdaoLangTip('common_00041') + '"></a></li>';
                    temp = temp.replace("{0}", data.rows[i].uid).replace("{1}", data.rows[i].uid);
                    temp = temp.replace("{2}", data.rows[i].uid).replace("{3}", data.rows[i].uname);
                    $('#acpersonlist').append(temp);
                });
                $('#acpersonlist li').find('a').click(function () {
                    var aa = null;
                    if ($(this).parent().find('div a').length < 1) {
                        aa = $(this).parent().find('a');
                    }
                    else {
                        aa = $(this).parent().find('div a');
                    }
                    _addselect(aa.attr("id"), aa.text());
                });
                //注册事件
                //全选
                $('#acpersonalluncheck').click(function () {
                    if ($(this).attr("checked")) {
                        $('#acpersonselected li :checkbox').attr("checked", true);
                    }
                    else {
                        $('#acpersonselected li :checkbox').attr("checked", false);
                    }
                });
                //移除
                $('#acpersoncancel').click(function () {
                    $('#acpersonselected li').each(function () {
                        if ($(this).find("input:checked").length <= 0) {
                            alert(wanerdaoLangTip('common_00004'));
                            return;
                        }
                        else {
                            $(this).find("input:checked").each(function () {
                                $('#acpersonalluncheck').attr("checked", false);
                                _removeselect($(this).parent().parent().attr("id"));
                            });
                        }
                    });
                });

            }
            else {
                //暂无数据
                $('#acpersonlist').empty();
                $('#acpersonlist').append('<li>' + wanerdaoLangTip('common_00005') + '</li>');
            }
        });
    }
};