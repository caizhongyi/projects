/*
* 玩儿道好友及圈子弹出层
* 
* 作者：jgglg
* email:jgglg@163.com
* Date: 2012/3/18 01:57
* 修正：jgglg
* 修正时间：2012/8/4
* 修正原因：网站改版
* 修正历史：
* 1.废除基于JQuery.overlay.js开源库开发模式
* 2.圈子新增1个分类查询：待缴费成员、正式成员
* 用法描述：
*    { comopts: {
        titleid: '', //弹出层文本标题默认到多语言文件里面读取其key值,common_00011为好友查询，common_00012为圈子查询
        id: '', //弹出层ID（被废弃）
        elementid: '', //关联操作弹出层的元素ID（被废弃）
        typename: '',//类型名分为2种：group与friends
        groupid:'',//如果typename为group的时候groupid就应该出现复制而不是为''
        callback: null//回调函数
    }}
*/
function wanerdaoPop(options) {
    var  defaults= {
        titleid: '', //弹出层文本标题
        typename: '',
        groupid: '',
        callback: null//回调函数
    };
    var me = this;
    //初始化
    if (options != undefined && options.comopts != undefined) {
        me.opts = $.extend({}, defaults, options.comopts || {});
    }
    var infopop = {
        dialog: null,
        show: function (opts) {
            var _this = this;
            var html = _getUI(opts);
            var $dialog = $(html).appendTo($('body'));
            if (opts.typename === 'friends') {
                _loadFriendCatory();
            }
            else {
                $("#groupddl").chosen();
            }
            var d=this.dialog = new $.ui.dialog($dialog, {
                callback: { hide: function () { $dialog.remove() } },
                widget: {
                    hide: '.close-3'
                }
            }).show();
            _regEvent(opts);
            
            //确定
            $('#' + opts.typename + 'submit').click(function () {
                if ($('#' + opts.typename + 'selected li input:checked').length > 0) {
                    var data = '{"' + opts.typename + '":[';
                    var tmpitems = '';
                    $('#' + opts.typename + 'selected li input:checked').each(function () {
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
    _loaddata("pop_common.axd", me.opts);
    //构建UI
    function _getUI(optsparam) {
        var ui = '<div class="pop" style="width:850px; margin:10px auto;">';
        ui += '<div class="pop-bg"></div>';
        ui += '<div class="pop-container">';
        ui += '     <div class="pop-hd clearfix"><h3>' + wanerdaoLangTip(optsparam.titleid) + ' </h3><a href="javascript:;" class="close-3" title="' + wanerdaoLangTip('common_00008') + '"></a></div>';
        ui += '     <div class="pop-bd search-friends clearfix">';
        ui += '         <div class="search-right search-list">';//右侧选择后的div
        ui += '             <ul  id="' + optsparam.typename + 'selected"><li id="noli">' + wanerdaoLangTip('common_00020') + '</li></ul>'; //选择后添加的列表
        ui += '             <div class="search-footer clearfix"><label class="selectall f_left"><input  type="checkbox" id="' + optsparam.typename + 'alluncheck"/>&nbsp;' + wanerdaoLangTip('common_00014') + '</label>';
        ui += '             <div class="submit f_right">';
        ui += '             <a href="javascript:;" class="button gay-button" id="' + optsparam.typename + 'cancel"><span class="icon error-1"></span>&nbsp;' + wanerdaoLangTip('common_00015') + ' </a>';
        ui += '             <a href="javascript:;" class="button gay-button" id="' + optsparam.typename + 'submit"><span class="success"></span>&nbsp;' + wanerdaoLangTip('common_00034') + ' </a></div></div>';
        ui += '         </div>';
        ui += '         <div class="search-add overflow">';//搜索所用的div
        ui += '             <div class="search-box"><input  type="text" class="text" inputdefault="' + wanerdaoLangTip('common_00040') + '" id="' + optsparam.typename + 'text" value="' + wanerdaoLangTip('common_00040') + '"</>';
        if (optsparam.typename === 'group' && optsparam.groupid.length>=1) {
            ui += '             <select  id="groupddl"><option value="1">' + wanerdaoLangTip('common_00042') + '</option><option value="0">' + wanerdaoLangTip('common_00043') + '</option></select>';
        }
        if (optsparam.typename === 'friends') {
            ui += '             <select  id="friendsddl"></select>';
        }
        ui += '             <a href="javascript:;" class="button search-button" id="' + optsparam.typename + 'seach"></a></div>';
        //左侧分页导航
        ui += '             <div class="search-addbar clearfix"><label class="f_left"><input type="checkbox" id="' + optsparam.typename + 'headallcheck"/>';
        ui += '              <a href="javascript:;" class="search-add-button"  id="' + optsparam.typename + 'headadd">' + wanerdaoLangTip('common_00013') + '</a></label>';
        ui += '              <div class="pager f_right"><a href="javascript:;" title="' + wanerdaoLangTip('pager_00003') + '" class="prev" id="' + optsparam.typename + 'headpre"></a>';
        ui += '              <span id="' + optsparam.typename + 'headpage"></span><a href="javascript:;" title="' + wanerdaoLangTip('pager_00004') + '" class="next" id="' + optsparam.typename + 'headlast"></a></div></div>';
        if(optsparam.typename==='group')
        {
            ui += '             <ul class="search-add-list search-add-grouplist"  id="' + optsparam.typename + 'list"></ul>';
        }
        else
        {
            ui += '             <ul class="search-add-list"  id="' + optsparam.typename + 'list"></ul>';
        }
        ui += '             <div class="search-addbar clearfix"><label class="f_left"><input type="checkbox" id="' + optsparam.typename + 'tailallcheck"/>';
        ui += '              <a href="javascript:;" class="search-add-button" id="' + optsparam.typename + 'tailadd">' + wanerdaoLangTip('common_00013') + '</a></label>';
        ui += '              <div class="pager f_right"><a href="javascript:;" title="' + wanerdaoLangTip('pager_00003') + '" class="prev-disable" id="' + optsparam.typename + 'tailpre"></a>';
        ui += '              <span id="' + optsparam.typename + 'tailpage"></span><a href="javascript:;" title="' + wanerdaoLangTip('pager_00004') + '" class="next-disable" id="' + optsparam.typename + 'taillast"></a></div></div>';
        ui += '         </div>';
        ui += '     </div>';
        ui += '</div>';
        ui += '</div>';       
        return ui;
    }
    function _loadFriendCatory() {//加载好友分类
        ajaxfunc("fgroup_friend.axd", "{opertype:'getfriendsgroup'}", function (data) {
        }, function (data) {
            if (data !== null) {
                if (data.result && data.total !== "0") {
                    bindDropDownListbyname("friendsddl", data.rows, true);
                }
                else {
                    bindDropDownListbyname("friendsddl", data.rows, false);
                }
            }
            else {
                bindDropDownListbyname("friendsddl", null, false);
            }
        });
    }
    function _regEvent(optsparam) {//注册事件
       
        //左侧事件注册
        $('#' + optsparam.typename + 'headallcheck,#' + optsparam.typename + 'tailallcheck').click(function () {
            if ($(this).attr("checked")) {
                if ($(this).attr("id") !== '#' + optsparam.typename + 'tailallcheck') {
                    $('#' + optsparam.typename + 'tailallcheck').attr("checked", true);
                }
                if ($(this).attr("id") !== '#' + optsparam.typename + 'headallcheck') {
                    $('#' + optsparam.typename + 'headallcheck').attr("checked", true);
                }
                $('#' + optsparam.typename + 'list li :checkbox').attr("checked", true);
            }
            else {
                if ($(this).attr("id") !== '#' + optsparam.typename + 'tailallcheck') {
                    $('#' + optsparam.typename + 'tailallcheck').attr("checked", false);
                }
                if ($(this).attr("id") !== '#' + optsparam.typename + 'headallcheck') {
                    $('#' + optsparam.typename + 'headallcheck').attr("checked", false);
                }
                $('#' + optsparam.typename + 'list li :checkbox').attr("checked", false);
            }
        });
        //左侧添加
        $('#' + optsparam.typename + 'headadd,#' + optsparam.typename + 'tailadd').click(function () {
            if ($('#' + optsparam.typename + 'list li input:checked').length <= 0) {
                return;
            }
            else {
                $('#' + optsparam.typename + 'list li').each(function () {
                    $(this).find("input:checked").each(function () {//.children()
                        if ($(this).parent().parent().find('div a').length < 1) {
                            $(this).parent().find('a:eq(0)').each(function () {
                                _addselect(optsparam.typename, $(this).attr("id"), $(this).text());
                            });
                        }
                        else {
                            $(this).parent().parent().find('div a').each(function () {
                                _addselect(optsparam.typename, $(this).attr("id"), $(this).text());
                            });
                        }
                    });
                });
            }
        });
        //前一页
        $('#' + optsparam.typename + 'headpre,#' + optsparam.typename + 'tailpre').click(function () {
            var t = parseInt($.data(document.body, optsparam.typename + "total"));
            var total = Math.ceil(t / 6);
            var currpage = parseInt($.data(document.body, optsparam.typename + "currPage"));
            if (total > 0 && (currpage - 1) > 0) {
                $.data(document.body, optsparam.typename + "currPage", currpage - 1);
                $('#' + optsparam.typename + 'headpage,#' + optsparam.typename + 'tailpage').text((currpage - 1) + '/' + total);
                _loaddata("pop_common.axd", opts);
            }
        });
        //后一页
        $('#' + optsparam.typename + 'headlast,#' + optsparam.typename + 'taillast').click(function () {
            var t = parseInt($.data(document.body, optsparam.typename + "total"));
            var total = Math.ceil(t / 6);
            var currpage = parseInt($.data(document.body, optsparam.typename + "currPage"));
            if (total > 0 && (currpage + 1) <= total) {
                $.data(document.body, optsparam.typename + "currPage", currpage + 1);
                $('#' + optsparam.typename + 'headpage,#' + optsparam.typename + 'tailpage').text((currpage + 1) + '/' + total);
                _loaddata("pop_common.axd", opts);
            }
        });
        $.data(document.body, optsparam.typename + "currPage", 1);
        //绑定查询 
        $("#" + optsparam.typename + "seach").click(function () {
            _loaddata("pop_common.axd", optsparam);
        });
    }
    function _addselect(typename, id, name) {
        $('#' + id + '_input').attr("checked", true);
        $('#noli').remove();
        var temp = '<li id="' + id + '_rli" class="ellipsis"><label   class="ellipsis"><input type="checkbox" checked="checked"/>{0}</label></li>';
        temp = temp.replace("{0}", name);
        var ab = $('<a href="javascript:;" class="icon icon-blue-close list-del" title="删除"></a>').click(function () {
            $(this).parent().remove();
            $('#' + id + '_input').attr("checked", false);
            $('#' + typename + 'headallcheck,#' + typename + 'tailallcheck').attr("checked", false);
        });
        temp = $(temp).append(ab);
        if ($('#' + id + '_rli').length < 1) {
            $('#' + typename + 'selected').append(temp);
        }
    }
    function _removeselect(typename, id) {
        $('#' + id.replace("_rli", "") + '_input').attr("checked", false);
        $('#' + typename + 'headallcheck,#' + typename + 'tailallcheck').attr("checked", false);
        $("#" + id).remove();
    }
    function _loaddata(axd, optsparam) {
        var otype = "{opertype:'";
        //圈子查找
        if (optsparam.typename !== "friends") {
            if (optsparam.groupid.length>=1) {
                //判断查询输入框是否有值
                if ($("#" + optsparam.typename + "text").val() !== '' && $("#" + optsparam.typename + "text").val() !== '请输入名字') {
                    otype += "mygroupmemeberpopup',name:'" + $("#" + optsparam.typename + "text").val() + "',";
                }
                else {
                    otype += "mygroupmemeberpopup',name:'',";
                }
                otype += "group_id:'" + optsparam.groupid + "',groupcatory:'" + $("#groupddl").children('option:selected').val() + "'"; 
            }
            else {
                if ($("#" + optsparam.typename + "text").val() !== '' && $("#" + optsparam.typename + "text").val() !== '请输入名字') {
                    otype += "mygrouplist',name:'" + $("#" + optsparam.typename + "text").val() + "'";
                }
                else {
                    otype += "mygrouplist',name:''";
                }
           }
        }
        else {//好友查找
            var t = $("#friendsddl").children('option:selected').val();
            if (t) {
                if (t != "-1" && t != "-2") {
                    t = t;
                }
                else {
                    t = "";
                }
            }
            else {
                t = "";
            }
            //判断查询输入框是否有值
            if ($("#" + optsparam.typename + "text").val() !== '' && $("#" + optsparam.typename + "text").val() !== '请输入名字') {
                otype += "getfriendslist',titOrContent:'" + $("#" + optsparam.typename + "text").val() + "',class_id:'" + t + "',pyKey:''";
            }
            else {
                otype += "getfriendslist',titOrContent:'',class_id:'" + t + "',pyKey:''";
            }
        }
        otype += ",pagecurrent:'" + $.data(document.body, optsparam.typename + "currPage") + "',pageSize:'6'}";
        //加载数据'pop_common.axd'
        ajaxfuncbyloadmsg(axd, otype, $('#' + optsparam.typename + 'list'), wanerdaoPop.errorfunc, function (data) {
            if (data.result && data.total !== "0") {
                $('#' + optsparam.typename + 'headpage,#' + optsparam.typename + 'tailpage').text('1/' + Math.ceil(data.total / 6));
                $.data(document.body, optsparam.typename + "total", data.total);
                if (optsparam.typename === "friends") {
                    $('#' + optsparam.typename + 'list').empty();
                    $.each(data.rows, function (i, n) {
                        var temp = '<li><label class="ellipsis"><input id="{0}_input" type="checkbox">';
                        temp += '<img width="25" height="25" src="{1}"/>';
                        temp += '[{2}]';
                        temp += '<a id="{3}" href="/personal/personal_info.html?uid={5}">{4}</a></label><a href="javascript:;" class="icon icon-blue-add list-add"  title="' + wanerdaoLangTip('common_00041') + '"></a></li>';
                        temp = temp.replace("{0}", data.rows[i].user_id).replace("{1}", data.rows[i].logo_small_path);
                        temp = temp.replace("{2}", data.rows[i].relation_name);
                        temp = temp.replace("{3}", data.rows[i].user_id).replace("{4}", data.rows[i].name);
                        temp = temp.replace("{5}", data.rows[i].user_id);
                        $('#' + optsparam.typename + 'list').append(temp);
                    });
                }
                else {//圈子
                    $('#' + optsparam.typename + 'list').empty();
                    if (optsparam.groupid.length>=1) {
                        $.each(data.rows, function (i, n) {
                            var temp = '<li class="clearfix"><label class="ellipsis"><input id="{0}_input" type="checkbox"  class="f_left">';
                            temp += '<img width="25" height="25" src="{1}" class="f_left" />';
                            temp += '<div><a id="{2}" href="/relationship/relationship_mygroup_info.html?id={4}" target="_blank">{3}</a></div></label>';
                            temp += '<a href="javascript:;" class="icon icon-blue-add list-add"  title="' + wanerdaoLangTip('common_00041') + '"></a></li>'; // onclick="_addselect("' + opts.typename + '","{9}","{10}");"
                            temp = temp.replace("{0}", data.rows[i].id).replace("{1}", data.rows[i].logo_small_path);
                            temp = temp.replace("{2}", data.rows[i].id);
                            temp = temp.replace("{3}", data.rows[i].value);
                            temp = temp.replace("{4}", data.rows[i].id);
                            $('#' + optsparam.typename + 'list').append(temp);
                        });
                    }
                    else {
                        $.each(data.rows, function (i, n) {
                            var temp = '<li class="clearfix"><label class="ellipsis"><input id="{0}_input" type="checkbox"  class="f_left">';
                            temp += '<img width="25" height="25" src="/{1}" class="f_left" />';
                            temp += '<div><a id="{2}" href="/relationship/relationship_mygroup_info.html?id={4}" target="_blank">{3}</a></div></label>';
                            temp += '<a href="javascript:;" class="icon icon-blue-add list-add"  title="' + wanerdaoLangTip('common_00041') + '"></a></li>'; // onclick="_addselect("' + opts.typename + '","{9}","{10}");"
                            temp = temp.replace("{0}", data.rows[i].id).replace("{1}", data.rows[i].logo_path);
                            temp = temp.replace("{2}", data.rows[i].id);
                            temp = temp.replace("{3}", data.rows[i].name);
                            temp = temp.replace("{4}", data.rows[i].id);
                            $('#' + optsparam.typename + 'list').append(temp);
                        });
                    }
                    
                }
                $('#' + optsparam.typename + 'list li').find('a').click(function () {
                    var aa = null;
                    if ($(this).parent().find('div a').length < 1) {
                        aa = $(this).parent().find('a');
                    }
                    else {
                        aa = $(this).parent().find('div a');
                    }

                    _addselect(optsparam.typename, aa.attr("id"), aa.text());
                });
                //注册事件
                //全选
                $('#' + optsparam.typename + 'alluncheck').click(function () {
                    if ($(this).attr("checked")) {
                        $('#' + optsparam.typename + 'selected li :checkbox').attr("checked", true);
                    }
                    else {
                        $('#' + optsparam.typename + 'selected li :checkbox').attr("checked", false);
                    }
                });
                //移除
                $('#' + optsparam.typename + 'cancel').click(function () {
                    $('#' + optsparam.typename + 'selected li').each(function () {
                        if ($(this).find("input:checked").length <= 0) {
                            alert(wanerdaoLangTip('common_00004'));
                            return;
                        }
                        else {
                            $(this).find("input:checked").each(function () {
                                $('#' + optsparam.typename + 'alluncheck').attr("checked", false);
                                _removeselect(optsparam.typename, $(this).parent().parent().attr("id"));
                            });
                        }
                    });
                });

            }
            else {
                //暂无数据
                $('#' + optsparam.typename + 'list').empty();
                $('#' + optsparam.typename + 'list').append('<li>' + wanerdaoLangTip('common_00005') + '</li>');
            }
        });
    }
};