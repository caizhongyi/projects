

var pageIndex = 1; //当前页数
var pageSize = 5; //每页记录数
var pageCount = 0; //总页数
var stateCat = '';//
var uid;//用户编号
$(function () {
    uid = getQueryString('uid');
    if (!uid) uid = wd_B.uin.uid;

    $('#stateTab').children('a').click(function () {
        $(this).parent().children('a').each(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
        });
    });

    Init('new');
    //最新更新
    $('#stateTab').children('a:eq(0)').click(function () {
        $(this).addClass('active');
        Init('new');
    });

    //留言
    $('#stateTab').children('a:eq(1)').click(function () {
        $(this).addClass('active');
        Init('message');
    });

    //圈子
    $('#stateTab').children('a:eq(2)').click(function () {
        $(this).addClass('active');
        Init('group');
    });

    //活动
    $('#stateTab').children('a:eq(3)').click(function () {
        $(this).addClass('active');
        Init('activity');
    });


    //    //资道
    //    $('#stateTab').children('a:eq(4)').click(function () {
    //        $(this).addClass('active');
    //        Init();
    //        getStateResultByType('posts');
    //    });


    $('.morebar').click(function () {
        if (hasMore) {
            $('.loading').html('<img src="/images/loading.gif"/>').css({ 'text-align': 'center', 'padding': '5px' });
            $(this).hide();
            getStateResultByType();
        }
    });

    $('.ref').click(function () {
        pageIndex = 1;
//        getStateResult(pageIndex, pageSize, stateCat, function () { }, function (data) {
//            callback(data);
        //        });
        $('.loading').html('<img src="/images/loading.gif"/>').css({ 'text-align': 'center', 'padding': '5px' });
        ajaxfunc("userstate_home.axd", "{opertype:'gethtmlstateresult',pageCurrent:" + pageIndex + ",pageSize:" + pageSize + ",category:'" + stateCat + "',userId:'" + uid + "'}", function () {
            if (error) error();
        }, function (data) {
            $('.loading').empty();
            callback(data);
        });
    });
});

var stateType;
var hasMore = true;
function getStateResultByType() {
    getStateResult(pageIndex, pageSize, stateType, function () { }, function (data) {
        $('.loading').empty();
        callback(data);
    });

}

/*
根据状态获取用户状态
string pageCurrent,string pageSize,string category(new,message,group,activity,posts)         

*/
function getStateResult(p_Index, p_Size, cat, error, success) {
    ajaxfunc("userstate_home.axd", "{opertype:'gethtmlstateresult',pageCurrent:" + p_Index + ",pageSize:" + p_Size + ",category:'" + cat + "',user_id:'" + uid + "'}", function () {
        if (error) error();
    }, function (data) {
        if (success) success(data);
    });
}

function Init(type) {
    stateCat = type;
    $('#statelist').empty();
    $('.loading').html('<img src="/images/loading.gif"/>').css({ 'text-align': 'center', 'padding': '5px' });
    stateType = type;
    pageIndex = 1;
    hasMore = true;
    getStateResultByType();
}

/* 
回调 状态绑定
*/
function callback(data) {
    if (data.result) {
        $.each(data.data, function (i, v) {
            if (v.pageNo) {
                pageIndex = parseInt(v.pageNo) + 1;
                return true;
            }

            var $itm = jQuery(v.content).appendTo($('#statelist'));
            if (uid == wd_B.uin.uid) {
                bindEvent($itm, v.tab_id);
            }
        });

        $('.morebar').show();
    } else {
        hasMore = false;
        $('.loading').html('<div style=" line-height:50px; color: #999;">没有更多更新了</div>');
        $('.morebar').hide();
    }
}

/*
根据类型绑定 处理
*/
function bindEvent($obj, type) {
    $('#statelist').append($obj);

    if ($obj.find('.select').length == 1) {
        new czy.ui.select($obj.find('.select'));
    }


    switch (stateType) {
        case 'new': //最新状态
            BindEvent_New($obj, type);
            break;
        case 'message': //最新留言

            break;
        case 'group': //圈子内更新

            break;
        case 'activity': //活动组更新

            break;
        case 'posts': //资道更新

            break;
    }

}

/* 最新 状态 */
function BindEvent_New($obj, type) {
    $obj.find('.photo').PersonalInfo({ uid: $obj.find('.uid').val() });
    switch (type) {
        case 'publish_state': //发表状态
            //options_reply($obj);
            $obj.find('.content>a:eq(0)').PersonalInfo({ uid: $obj.find('.uid').val() });
            break;
        case 'publish_link': //发表链接
           // options_reply($obj);

            $obj.find('.main>a:eq(0)').PersonalInfo({ uid: $obj.find('.uid').val() });
            break;
        case 'publish_image': //发表图片
            options_reply($obj, 'photosinglemessage', type);

            $obj.find('.main>a:eq(0)').PersonalInfo({ uid: $obj.find('.uid').val() });
            break;
        case 'publish_video': //发表视频
           // options_reply($obj);

            $obj.find('.main>a:eq(0)').PersonalInfo({ uid: $obj.find('.uid').val() });
            break;
        case 'publish_blog': //发表日志
            //options_reply($obj);

            break;
        case 'upload_image': //上传相册
            //options_reply($obj,'photosinglemessage');

            break;
        case 'forward_state': //someone 转发 someone's 发表状态
            //options_reply($obj);
     
            break;
        case 'forward_link': //someone 转发 someone's 发表链接
            //options_reply($obj);

            break;
        case 'forward_image': //someone 转发 someone's 发表图片
            options_reply($obj, 'photosinglemessage', type);

            break;
        case 'forward_video': //someone 转发 someone's 发表视频
            

            break;
        case 'forward_blog': //someone 转发 someone's 日志
            //options_reply($obj);

            break;
        case 'forward_uploadimage': //someone 转发 someone's 相册
            //options_reply($obj);

            break;
        case 'join_activity': //参加了 活动

            break;
        case 'join_group': //加入了 圈子

            break;
        case '': //添加了 好友

            break;
        case '': // 即将过生日

            break;
        case '': // 送礼物

            break;
        case '': // 姓名

            break;
    }
}


/* 最新 留言 */
function BindEvent_Msg($obj, type) {
    switch (type) {
        case '': //好友送礼

            break;
        case '': //好友留言

            break;
        case '': //帖子回复

            break;
    }
}

/* 圈子 更新 */
function BindEvent_Group($obj, type) {
    switch (type) {
        case '': //someone 加入圈子

            break;
        case '': //someone 退出圈子

            break;
        case '': //圈子 发帖

            break;
        case '': //圈子更新

            break;
        case '': //圈子 发起投票

            break;
        case '': //圈子发起活动

            break;
    }
}

/* 活动 更新 */
function BindEvent_Activity($obj, type) {
    switch (type) {
        case '': //加入活动

            break;
        case '': //退出活动

            break;
        case '': //活动发言

            break;
        case '': //活动更新

            break;
        case '': //活动发起投票

            break;
    }
}


/* 资道 更新 
function BindEvent_Posts($obj, type) {
switch (type) {
case '': //资道 发帖

break;
}
}
*/

/* Tools */

//回复功能
function options_reply($obj, opertype, category) {
    var tool_reply = jQuery('<a href="javascript:;" class="replay">回复(110)</a>').appendTo($obj.find('.options'));
    tool_reply.click(function () {
        var $box = $(this).parent().parent();

        if ($box.find('.replay-content').length == 0) {
            var $box = $(this).parent().parent();
            $box.append('<div class="replay-content">'
                            + '<img class="arrowhead" src="images/home/ico_17x9.png"/>'
                            + '<input  type="text" class="text"/><input  type="submit" class="submit" onclick="addComment(\'' + $obj.find('.infoId').val() + '\',\'' + category + '\', $(this).prev(), -1);" value="回复"/>'
                            + '<div class="replylist"></div>');

            //+ '<div class="txt-r"><a href="javascript:;" class="showall">加载中</a></div>'
            getLeavmessage($box.find('.replylist'), $obj.find('.stateId').val(), $obj.find('.infoId').val(), opertype, category);
        } else {
            $box.find('.replay-content').toggle();
        }
    });

    

//    </div>

}
/*Tools end*/


/* operation */

/*************         回复               **************/

var setLayerCount = 2; //回复层数
var commentCount = '5'; // 每一层回复显示个数
/* comment */
function getLeavmessage($box, stateId, infoId, operType, category) {

    $(".other_action").myPagination({
        currPage: 1,
        callback: getContent,
        cssStyle: 'noll',
        sidebarpage: true,
        url: '../pagination_common.axd',
        ajax: {
            param: {
                pageSize: 5,
                opertype: operType,
                SetLayer: setLayerCount, //设置显示层数
                CommentCount: commentCount, //每一层回复显示个数
                id: infoId
            }
        },
        info: {
            first: '首页',
            last: '尾页',
            next: '下一页',
            prev: '上一页',
            first_on: true,
            last_on: true,
            next_on: true,
            prev_on: true,
            showpageno: false,
            tipmsg: '第{tip}页',
            msg_on: false,
            link: '#',
            msg: '<span>&nbsp;&nbsp;跳{currText}/{sumPage}页</span>',
            text: {
                width: '22px'
            }
        }

    });

    function getContent(data) {
        //$('#totalMesage').html('(' + data.total + '条留言)');
        var strContent = "";
        if (data.result && data.rows) {
            strContent = appendHtml(data.rows, 0, parseFloat(setLayerCount + 1));

            $box.html(strContent);
        }
    }

    function appendHtml(Data, currentLayer, showLayer) {
        var strContent = "";
        if (parseInt(currentLayer) < parseInt(showLayer)) {
            $.each(Data, function (i, msg) {
                strContent += ("<div class=\"hdpj_g_box\">");
                strContent += ("<ul>");
                strContent += ("<li>");
                strContent += ("<span class=\"hd_pj_leftex\">&nbsp;&nbsp;<a href=\"#\">&nbsp;</a> <i style=\"display:none;\" class=\"page_state_wd\">[已读]</i></span>");
                strContent += ("</li>");
                strContent += ("<li>" + msg.content + "</li>");
                strContent += ("<li class=\"oInfo\">");
                strContent += ("<p class=\"replyOpera\">");
                rowsDate = msg.rows;
                oneDate = "0";
                varRowTotalCount = "0";
                if (rowsDate != null && rowsDate != "") {
                    oneData = $.parseJSON(rowsDate);
                    varRowTotalCount = oneData.rowCount
                }
                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_1\"  onclick=\"showDetReply(this)\" title=\"展开\">(" + varRowTotalCount + ")</a>");
                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_2\" title=\"标题\"></a>");
                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_3\" title=\"标题\"></a>");
                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_4\" title=\"标题\"></a>");
                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_5\" title=\"标题\"></a>");
                strContent += ("</p>");
                strContent += ("<span class=\"pTime\">" + msg.date + "</span>");
                strContent += ("</li>");
                strContent += ("</ul>");
                strContent += ("<div class=\"pl_yuedu\"><a href=\"#\"><img src=\"../images/img_43x43.png\" width=\"50\" height=\"50\" /></a></div>");
                strContent += ("<div class=\"hd_picpl_box_con hidden\">");
                strContent += ("<div class=\"hd_picpl_box\">");
                strContent += ("<ins></ins>");
                strContent += ("<div class=\"hd_picpl_mid\" style='margin:0 40px 0 40px;width:760px;'>");
                strContent += ("<div class=\"picpl_form_box\">");
                strContent += ("<div>");
                strContent += ("<input type=\"text\" name=\"textfield\" id=\"textTwofield\" class=\"picpl_hf_kuang\" hidefocus=\"ture\" style=\"outline:none;\"/>");
                strContent += ("<input type=\"button\" name=\"button\" onclick=\"addComment('" + stateId + "','" + category + "',$(this).prev(),'" + msg.id + "')\" id=\"buttonTwo\" value=\"回复\" class=\"picpl_hf_an01\" tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(../images/picpl_hf_an01b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(../images/picpl_hf_an01a.jpg)'\"  onfocus=\"this.blur()\"/>");
                strContent += ("<input type=\"button\" name=\"button2\" id=\"buttonTwoCancel\" value=\"取消\" class=\"picpl_hf_an02\"tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(../images/picpl_hf_an02b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(../images/picpl_hf_an02a.jpg)'\"  onfocus=\"this.blur()\"/>");
                strContent += ("</div>");
                strContent += ("</div>");
                rowsDate = msg.rows;
                if (rowsDate != null && rowsDate != "") {
                    $.each(oneData.data, function (j, oneMsg) {
                        active_posts_id = oneMsg.active_posts_id;
                        follow_id = oneMsg.follow_id;
                        strContent += ("<div class=\"picpl_huif_box\">");
                        strContent += ("<div class=\"huif_left\"><img src=\"../images/img_43x43.png\" width=\"37\" height=\"37\" /></div>");
                        strContent += ("<div class=\"huif_right\" style=\"width:710px;\">");
                        strContent += ("<div class=\"huif_text\">");
                        strContent += oneMsg.content;
                        strContent += ("</div>");
                        strContent += ("<div class=\"huif_line\">");
                        strContent += ("<span class=\"huif_time\">" + oneMsg.createdate + "</span>");
                        strContent += ("<span class=\"huif_huif\"><a href=\"#\">回复</a></span>");
                        strContent += ("<span class=\"huif_delete\"><a href=\"#\">删除</a></span>");
                        strContent += ("</div>");
                        strContent += ("</div>");
                        strContent += ("</div>");
                    });
                    strContent += ("<div class=\"huif_more\">");
                    strContent += ("<div class=\"huif_colse_an\"><a href=\"###\" onclick=\"hideDetReply(this);\">收起</a></div>");
                    strContent += ("<div class=\"huif_open_an\"><a href=\"###\"  onclick=\"outspreadContent(this,'" + varRowTotalCount + "','" + active_posts_id + "','" + follow_id + "')\">更多回复</a></div>");
                    strContent += ("</div>");
                }
                strContent += ("</div>");
                strContent += ("</div>");
                strContent += ("</div>");
                strContent += ("<div class=\"xia_b_xian\"></div>");
                strContent += ("</div>");
            });
        }
        return strContent;
    }
}


function showDetReply(obj) {
    var reObj = $(obj).parent().parent().parent().parent().find(".hd_picpl_box_con").eq(0)
    var fObj = reObj.parent();
    if (reObj.hasClass("hidden")) {
        $(obj).attr("title", "隐藏");
        reObj.removeClass("hidden");
        fObj.addClass("hdpj_on");
    }
    else {
        reObj.addClass("hidden");
        fObj.removeClass("hdpj_on");
        $(obj).attr("title", "展开")
    }
}
function hideDetReply(obj) {
    var reObj = $(obj).parent().parent().parent().parent().parent();
    var fObj = reObj.parent();
    reObj.addClass("hidden");
    fObj.removeClass("hdpj_on");
}

function outspreadContent(obj, rowTotalCount, active_posts_id, follow_id) {
    var strContent = "";
    $.ajax({
        url: "leavemessage_activity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'displayleavemessage',active_posts_id:'" + active_posts_id +
                    "',follow_id:'" + follow_id + "',offsetcount:" + commentCount +
                     ",rcount:" + parseInt(parseInt(rowTotalCount) - parseInt(commentCount)) + "}",
        error: function (data) { },
        success: function (data) {
            $.each(data.rows, function (i, msg) {
                strContent += ("<div class=\"picpl_huif_box\">");
                strContent += ("<div class=\"huif_left\"><img src=\"../images/img_43x43.png\" width=\"37\" height=\"37\" /></div>");
                strContent += ("<div class=\"huif_right\" style=\"width:710px;\" >");
                strContent += ("<div class=\"huif_text\">");
                strContent += msg.content;
                strContent += ("</div>");
                strContent += ("<div class=\"huif_line\">");
                strContent += ("<span class=\"huif_time\">" + msg.createdate + "</span>");
                strContent += ("<span class=\"huif_huif\"><a href=\"###\">回复</a></span>");
                strContent += ("<span class=\"huif_delete\"><a href=\"###\">删除</a></span>");
                strContent += ("</div>");
                strContent += ("</div>");
                strContent += ("</div>");
            });

            $(obj).parent().parent().prev().after(strContent);
            $(obj).hide();
        }
    });
}

//回复评论
function addComment(id, category, $content, followId) {
    alert(id);
    var content = $content.val();
    if (content) {
        ajaxfunc("userstate_home.axd", "{opertype:'replaycomment',category:'" + category + "',id:'" + id + "',content:'" + content + "',followId:'" + followId + "'}", function (data) {
            alert(data.msg);
        }, function (data) {

        });
    } else {
        alert('请输入回复内容！');
    }
}

/*************         回复     end          **************/


/* operation end */