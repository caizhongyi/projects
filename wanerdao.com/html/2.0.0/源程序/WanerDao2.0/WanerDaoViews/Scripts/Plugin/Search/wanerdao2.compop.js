/*!
* 基于JQuery.overlay.js的玩儿道好友及圈子弹出层
* 
* 作者：jgglg
* email:jgglg@163.com
* Date: 2012/3/18 01:57
* 用法描述：
* 此字母顺序弹出层是基于JQuery.overlay.js开源库，所以参数有2种，一种是应用与JQuery.overlay.js(overlaypts参数)，
* 一种应用于字母顺序弹出层(alphopts参数)
*/
$(function () {
    var area = jQuery('<div id="ff" style="width:770px;margin: 0 auto; z-index:9999;display:none;"></div>');
    $(area).appendTo(document.body);
    var area1 = jQuery('<div id="gg" style="width:770px;margin: 0 auto; z-index:9999;display:none;"></div>');
    $(area1).appendTo(document.body);
})
function wanerdaoPop(options) {
    //初始化
    if (options != undefined && options.comopts != undefined) {
        this.opts = jQuery.extend({}, wanerdaoPop.defaults, options.comopts || {});
    }
    if (jQuery.data(document.body, this.opts.id) == undefined) {        
        //构造UI
        var htext = wanerdaoPop.getUI(this.opts);
        jQuery("#" + this.opts.id).append(htext);
        wanerdaoPop.loadddldata(this.opts);
        wanerdaoPop.addevent(this.opts);
//        //加载国家数据
//        wanerdaoPop.loadajax('country', '');
        jQuery.data(document.body, this.opts.id, jQuery("#" + this.opts.id));
    }
    if (options != undefined && options.overlaypts != undefined) {
        jQuery("#" + this.opts.elementid).overlay(options.overlaypts);
    }
    else {
        jQuery("#" + this.opts.elementid).overlay({oneInstance: false});
    }
};
jQuery.extend(wanerdaoPop, {
    defaults: {
        titleid: '', //弹出层文本标题
        id: '', //弹出层ID
        elementid: '', //关联操作弹出层的元素ID
        typename: '',
        callback: null//回调函数
    },
    getUI: function (opts) {
        var htext = '<table class="pop_dialog_table" style="width: 100%; height: 100%;">';
        htext += '<tbody><tr><td class="pop_topleft"></td><td class="pop_border"></td><td class="pop_topright"></td></tr>';
        htext += '<tr><td class="pop_border"></td><td class="pop_content">';
        htext += '<h2>' + wanerdaoLangTip(opts.titleid) + ' <a href="javascript:;" class="close" title="';
        htext += wanerdaoLangTip('common_00008') + '">' + wanerdaoLangTip('common_00008') + '</a></h2>';
        htext += '<div class="dialog_body">';
        //此处使用参数控制导航条
        htext += '<div id="' + opts.typename + 'bar" class="dialog_body transmit sf clearfix">';
        htext += '<div class="l">';
        htext += '<p class="t">';
        htext += '<input type="text" placeholder="' + wanerdaoLangTip('common_00017') + '" id="' + opts.typename + 'text" class="input-text">';
        if (opts.typename === "friends") {
            htext += '<select class="t" id="friendsddl"></select>';
        }
        htext += '<a href="javascript:;" class="btn" id="' + opts.typename + 'seach"></a>';
        htext += '</p>';
        htext += '<div class="blank"></div>';
        htext += '<ul class="s clearfix">';
        htext += '<li class="left"><input type="checkbox" id="' + opts.typename + 'headallcheck"/><a href="javascript:;" class="btn" id="' + opts.typename + 'headadd">' + wanerdaoLangTip('common_00013') + '</a></li>';
        htext += '<li class="right"><a href="javascript:;" class="l" id="' + opts.typename + 'headpre"></a><span id="' + opts.typename + 'headpage"></span><a class="r" href="javascript:;" id="' + opts.typename + 'headlast"></a></li>';
        htext += '</ul>';
        htext += '<div class="blank"></div>';
        htext += '<ul class="l" id="' + opts.typename + 'list"></ul>';
        htext += '<div class="blank"></div>';
        htext += '<ul class="s clearfix">';
        htext += '<li class="left"><input type="checkbox" id="' + opts.typename + 'tailallcheck"/><a href="javascript:;" class="btn" id="' + opts.typename + 'tailadd">' + wanerdaoLangTip('common_00013') + '</a></li>';
        htext += '<li class="right"><a href="javascript:;" class="l" id="' + opts.typename + 'tailpre"></a><span id="' + opts.typename + 'tailpage"></span><a class="r" href="javascript:;" id="' + opts.typename + 'taillast"></a></li>';
        htext += '</ul>';
        htext += '<div class="blank"></div>';
        htext += '</div>';
        htext += '<div id="' + opts.typename + 'right" class="r" style="display:none;">';
        htext += '<ul id="' + opts.typename + 'selected"><li id="noli"><a  href="javascript:;" class="desc">' + wanerdaoLangTip('common_00020') + '</a></li></ul>';
        htext += '<div class="blank"></div>';
        htext += '<div class="dialog_buttons clearfix">';
        htext += '<label class="left"><input type="checkbox" id="' + opts.typename + 'alluncheck"/>' + wanerdaoLangTip('common_00014') + '</label>';
        htext += '<a class="input-submit" id="' + opts.typename + 'submit"></a><a href="javascript:;" class="input-cancel" id="' + opts.typename + 'cancel">' + wanerdaoLangTip('common_00015') + '</a>';
        htext += '</div>';
        htext += '</div>';
        htext += '</div>';
        htext += '</div></td>';
        htext += '<td class="pop_border"></td>';
        htext += '</tr>';
        htext += '<tr><td class="pop_bottomleft"></td><td class="pop_border"></td><td class="pop_bottomright"></td></tr>';
        htext += '</tbody></table>';
        return htext;
    },
    loadddldata: function (opts) {
        if (opts.typename === "friends") {
            ajaxfunc("fgroup_friend.axd", "{opertype:'getfriendsgroup'}",wanerdaoPop.errorfunc, function (data) {
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
    },
    addevent: function (opts) {
        jQuery(".close").click(function () {
            jQuery("#" + opts.elementid).overlay({oneInstance: false}).close();
        });
        //        jQuery('div[id="#' + opts.typename + 'bar"]>div>ul>li>input[type="checkbox"]').each(function () {
        //            alert(jQuery(this).attr["type"]);
        //        });
        //左侧事件注册' + opts.typename + 'bar
        jQuery('#' + opts.typename + 'headallcheck,#' + opts.typename + 'tailallcheck').click(function () {
            //jQuery('div[id="#' + opts.typename + 'bar"]').children('input[type="checkbox"]').click(function () {
            //alert(jQuery(this).attr("id"));
            if (jQuery(this).attr("checked")) {
                if (jQuery(this).attr("id") !== '#' + opts.typename + 'tailallcheck') {
                    jQuery('#' + opts.typename + 'tailallcheck').attr("checked", true);
                }
                if (jQuery(this).attr("id") !== '#' + opts.typename + 'headallcheck') {
                    jQuery('#' + opts.typename + 'headallcheck').attr("checked", true);
                }
                //alert(2);
                jQuery('#' + opts.typename + 'list li :checkbox').attr("checked", true);
            }
            else {
                //alert(3);
                if (jQuery(this).attr("id") !== '#' + opts.typename + 'tailallcheck') {
                    jQuery('#' + opts.typename + 'tailallcheck').attr("checked", false);
                }
                if (jQuery(this).attr("id") !== '#' + opts.typename + 'headallcheck') {
                    jQuery('#' + opts.typename + 'headallcheck').attr("checked", false);
                }
                jQuery('#' + opts.typename + 'list li :checkbox').attr("checked", false);
            }
        });
        //左侧添加
        jQuery('#' + opts.typename + 'headadd,#' + opts.typename + 'tailadd').click(function () {
            if (jQuery('#' + opts.typename + 'list li input:checked').length <= 0) {
                //alert(wanerdaoLangTip('video_00007'));
                return;
            }
            else {
                jQuery('#' + opts.typename + 'list li').each(function () {
                    jQuery(this).find("input:checked").each(function () {//.children()
                        if (jQuery(this).parent().parent().find('div a').length < 1) {
                            jQuery(this).parent().find('a:eq(0)').each(function () {
                                wanerdaoPop.addselect(opts.typename, jQuery(this).attr("id"), jQuery(this).text());
                            });
                        }
                        else {
                            jQuery(this).parent().parent().find('div a').each(function () {
                                wanerdaoPop.addselect(opts.typename, jQuery(this).attr("id"), jQuery(this).text());
                            });
                        }                        
                    });
                });
            }
        });
        //前一页
        jQuery('#' + opts.typename + 'headpre,#' + opts.typename + 'tailpre').click(function () {
            //alert(jQuery.data(document.body, opts.typename + "total"));
            var t = parseInt(jQuery.data(document.body, opts.typename + "total"));
            var total = Math.ceil(t / 6);
            var currpage = parseInt(jQuery.data(document.body, opts.typename + "currPage"));
            if (total > 0 && (currpage - 1) > 0) {
                jQuery.data(document.body, opts.typename + "currPage", currpage - 1);
                jQuery('#' + opts.typename + 'headpage,#' + opts.typename + 'tailpage').text((currpage - 1) + '/' + total);
                wanerdaoPop.loaddata("pop_common.axd", opts);
            }
        });
        //后一页
        jQuery('#' + opts.typename + 'headlast,#' + opts.typename + 'taillast').click(function () {
            var t = parseInt(jQuery.data(document.body, opts.typename + "total"));
            var total = Math.ceil(t / 6);
            var currpage = parseInt(jQuery.data(document.body, opts.typename + "currPage"));
            if (total > 0 && (currpage + 1) <= total) {
                jQuery.data(document.body, opts.typename + "currPage", currpage + 1);
                jQuery('#' + opts.typename + 'headpage,#' + opts.typename + 'tailpage').text((currpage + 1) + '/' + total);
                wanerdaoPop.loaddata("pop_common.axd", opts);
            }
        });
        jQuery.data(document.body, opts.typename + "currPage", 1);
        //绑定查询 
        //var otype = "{opertype:'" + otypename + "',id:'" + id + "'}";
        //ajaxfuncbyloadmsg('pop_common.axd', otype, jQuery('#content'), wanerdaoArea.errorfunc, function (data) {
        jQuery("#" + opts.typename + "seach").click(function () {
            wanerdaoPop.loaddata("pop_common.axd", opts);
        });

    },
    addselect: function (typename, id, name) {
        jQuery('#' + id + '_input').attr("checked", true);
        jQuery('#noli').remove();
        var temp = '<li id="' + id + '_rli" ><input type="checkbox"/>';
        if (name.indexOf("(") > 0) {
            temp += '<a  id="' + id + '_ra"  href="javascript:;" class="desc">' + name.substring(0, name.indexOf("(")) + '</a>';
        }
        else {
            temp += '<a  id="' + id + '_ra"  href="javascript:;" class="desc">' + name.replace("选择","") + '</a>';
        }

        temp += '</li>';
        var ab = jQuery('<a class="selected" href="javascript:;">选择</a>').click(function () {
            jQuery(this).parent().remove();
            jQuery('#' + id + '_input').attr("checked", false);
            jQuery('#' + typename + 'headallcheck,#' + typename + 'tailallcheck').attr("checked", false);
        });
        temp = jQuery(temp).append(ab);
        if (jQuery('#' + id + '_rli').length < 1) {
            jQuery('#' + typename + 'selected').append(temp);
        }
    },
    removeselect: function (typename, id) {
        //jQuery('#' + typename + 'selected').find('#' + id + '_rli').remove();'#' + opts.typename + 'headallcheck,#' + opts.typename + 'tailallcheck'
        jQuery('#' + id + '_input').attr("checked", false);
        jQuery('#' + typename + 'headallcheck,#' + typename + 'tailallcheck').attr("checked", false);
    },
    loaddata: function (axd, opts) {
        var otype = "{opertype:'";
        // "{opertype:'" + otypename + "',id:'" + id + "'}";
        //圈子查找
        if (opts.typename !== "friends") {
            //判断查询输入框是否有值
            if (jQuery("#" + opts.typename + "text").val() !== '') {
                otype += "mygrouplist',group_name:'" + jQuery("#" + opts.typename + "text").val() + "'";
            }
            else {
                otype += "mygrouplist',group_name:''";
            }
            //alert(otype);
        }
        else {//好友查找
            var t = jQuery("#friendsddl").children('option:selected').val();
            if (t != "-1" && t != "-2") {
                t = t;
            }
            else {
                t = "";
            }
            //判断查询输入框是否有值
            if (jQuery("#" + opts.typename + "text").val() !== '') {
                otype += "getfriendslist',titOrContent:'" + jQuery("#" + opts.typename + "text").val() + "',class_id:'" + t + "',pyKey:''";
            }
            else {
                otype += "getfriendslist',titOrContent:'',class_id:'" + t + "',pyKey:''";
            }
        }
        otype += ",pagecurrent:'" + jQuery.data(document.body, opts.typename + "currPage") + "',pageSize:'6'}";
        //加载数据'pop_common.axd'
        ajaxfuncbyloadmsg(axd, otype, jQuery('#' + opts.typename + 'list'), wanerdaoPop.errorfunc, function (data) {
            if (data.result && data.total !== "0") {
                if (jQuery.data(document.body, opts.typename + "total") == undefined) {
                    jQuery('#' + opts.typename + 'headpage,#' + opts.typename + 'tailpage').text('1/' + Math.ceil(data.total / 6));
                }
                jQuery.data(document.body, opts.typename + "total", data.total);
                if (opts.typename === "friends") {
                    jQuery('#' + opts.typename + 'list').empty();
                    jQuery.each(data.rows, function (i, n) {
                        var temp = '<li><input id="{0}_input" type="checkbox">';
                        temp += '<img width="25" height="25" src="{1}"/>';
                        temp += '<span>[{2}]</span>';
                        temp += '<a id="{3}" href="" class="name">{4}</a><a class="selected" href="javascript:;">选择</a></li>';
                        temp = temp.replace("{0}", data.rows[i].user_id).replace("{1}", data.rows[i].logo_small_path);
                        temp = temp.replace("{2}", data.rows[i].relation_name);
                        temp = temp.replace("{3}", data.rows[i].user_id).replace("{4}", data.rows[i].name);
                        jQuery('#' + opts.typename + 'list').append(temp);
                    });
                }
                else {//圈子
                    jQuery('#' + opts.typename + 'list').empty();
                    jQuery.each(data.rows, function (i, n) {
                        var temp = '<li class="clearfix"><div class="left"><input id="{0}_input" type="checkbox">';
                        temp += '<img width="25" height="25" src="{1}" class="lg" /></div>';
                        temp += '<div class="left"><a id="{2}" href="#">{3}<span class="red">({4})</span></a>';
                        temp += '<p>';
                        temp += '关注度：<span class="percent"><em class="num">{5}%</em><em style="width:{6}%;" class="pcent"></em></span> ';
                        temp += '活跃度：<span class="percent"><em class="num">{7}%</em><em style="width:{8}%;" class="pcent"></em></span>';
                        temp += '</p></div>';
                        temp += '<a class="selected" href="javascript:;">选择</a></li>'; // onclick="wanerdaoPop.addselect("' + opts.typename + '","{9}","{10}");"
                        temp = temp.replace("{0}", data.rows[i].id).replace("{1}", data.rows[i].logo_path);
                        temp = temp.replace("{2}", data.rows[i].id);
                        temp = temp.replace("{3}", data.rows[i].name).replace("{4}", data.rows[i].member_nbr);
                        temp = temp.replace("{5}", data.rows[i].follow_score).replace("{6}", data.rows[i].follow_score);
                        temp = temp.replace("{7}", data.rows[i].activity_score).replace("{8}", data.rows[i].activity_score);
                        //temp = temp.replace("{9}", data.rows[i].id).replace("{10}", data.rows[i].name)
                        jQuery('#' + opts.typename + 'list').append(temp);
                    });
                }
                jQuery('#' + opts.typename + 'list li').find('a').click(function () {
                    var aa = null;

                    if (jQuery(this).parent().find('div a').length < 1) {
                        aa = jQuery(this).parent().find('a');
                    }
                    else {
                        aa = jQuery(this).parent().find('div a');
                    }

                    wanerdaoPop.addselect(opts.typename, aa.attr("id"), aa.text());
                });
                //如果右侧选择栏隐藏则显示
                if (jQuery('#' + opts.typename + 'right').is(":hidden")) {
                    jQuery('#' + opts.typename + 'right').fadeIn();
                    //注册事件
                    //全选
                    jQuery('#' + opts.typename + 'alluncheck').click(function () {
                        if (jQuery(this).attr("checked")) {
                            jQuery('#' + opts.typename + 'selected li :checkbox').attr("checked", true);
                        }
                        else {
                            jQuery('#' + opts.typename + 'selected li :checkbox').attr("checked", false);
                        }
                    });
                    //移除
                    jQuery('#' + opts.typename + 'cancel').click(function () {
                        jQuery('#' + opts.typename + 'selected li').each(function () {
                            $(this).find("input:checked").each(function () {
                                jQuery('#' + opts.typename + 'alluncheck').attr("checked", false);
                                wanerdaoPop.removeselect(opts.typename,$(this).parent().attr("id").replace("_rli", ""));
                                $(this).parent().remove();
                            });
                        });
                    });
                    //确定
                    jQuery('#' + opts.typename + 'submit').click(function () {
                        if (jQuery('#' + opts.typename + 'selected li input:checked').length > 0) {
                            var data = '{"' + opts.typename + '":[';
                            var tmpitems = '';
                            jQuery('#' + opts.typename + 'selected li a[id]').each(function () {
                                tmpitems += '{"id":"' + jQuery(this).attr("id").replace("_ra", "") + '","name":"' + jQuery(this).text() + '"},';
                            });
                            tmpitems = tmpitems.substring(0, tmpitems.length - 1);
                            data = data + tmpitems + ']}';
                            data = jQuery.parseJSON(data);
                            var callback = opts.callback(data);
                            eval(callback || function () { });
                            jQuery("#" + opts.elementid).overlay({oneInstance: false}).close();
                        }
                        else {
                            alert(wanerdaoLangTip('common_00004'));
                        }
                    });
                }
            }
            else {
                //暂无数据
                jQuery('#' + opts.typename + 'list').append('<li>' + wanerdaoLangTip('common_00005') + '</li>');
            }
        });
    },
    errorfunc: function (data) {

    }
});