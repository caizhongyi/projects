var setLayerCount = '1'; // 设置层数
var commentCount = '1'; // 每一层回复显示个数
$(function () {
    $("#pageid").myPagination({
        currPage: 1,
        callback: test1,
        cssStyle: 'noll',
        sidebarpage: true,
        ajax: {
            param: {
                pageSize: 5,
                opertype: 'leavemessage',
                SetLayer: setLayerCount, //设置显示层数
                CommentCount: commentCount //每一层回复显示个数
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

    function test1(data) {
        //$('#totalMesage').html('(' + data.total + '条留言)');
        var strContent = "";
        strContent = appendHtml(data.rows, 0, parseFloat(setLayerCount + 1)); //alert(strContent);
        $('#messageContent').html(strContent);

    }

    $("a[type =hide]").live('click', function () {
        $(this).parent().hide();
        $parent = $(this).parent().prevAll();
        $.each($parent, function (i) {
            var currentIndex = $(this).index(); // alert(currentIndex); alert($(this).html());
            if (currentIndex > parseInt(commentCount)) {
                $(this).hide();
            }
            else {
                $(this).show();
            }
        });
    });

})

function appendHtml(Data, currentLayer, showLayer) {
    var strContent = "";
    if (parseInt(currentLayer) < parseInt(showLayer)) {
        $.each(Data, function (i, msg) {
            strContent += ("<div class=\"hdpj_g_box\">");
            strContent += ("<ul>");
            strContent += ("<li>");
            strContent += ("<span class=\"hd_pj_leftex\"><a href=\"#\" class=\"blue\">" + msg.username + "</a>&nbsp;&nbsp;<a href=\"#\">" + msg.subject + "</a> <i class=\"page_state_wd\">[已读]</i></span>");
            strContent += ("</li>");
            strContent += ("<li>" + msg.content + "</li>");
            strContent += ("<li class=\"oInfo\">");
            strContent += ("<p class=\"replyOpera\">");
            rowsDate = msg.rows;
            oneDate = "";
            varRowTotalCount = "";
            if (rowsDate != null && rowsDate != "") {
                oneData = $.parseJSON(rowsDate);
                varRowTotalCount = oneData.rowCount
                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_1\"  onclick=\"showDetReply(this)\" title=\"展开\">(" + varRowTotalCount + ")</a>");
            }
            strContent += ("<a href=\"javascript:void(0);\" class=\"ico_2\" title=\"标题\"></a>");
            strContent += ("<a href=\"javascript:void(0);\" class=\"ico_3\" title=\"标题\"></a>");
            strContent += ("<a href=\"javascript:void(0);\" class=\"ico_4\" title=\"标题\"></a>");
            strContent += ("<a href=\"javascript:void(0);\" class=\"ico_5\" title=\"标题\"></a>");
            strContent += ("</p>");
            strContent += ("<span class=\"pTime\">" + msg.createdate + "</span>");
            strContent += ("</li>");
            strContent += ("</ul>");
            strContent += ("<div class=\"pl_yuedu\"><a href=\"#\"><img src=\"../images/img_43x43.png\" width=\"50\" height=\"50\" /></a></div>");

            rowsDate = msg.rows;
            if (rowsDate != null && rowsDate != "") {
                
                strContent += ("<div class=\"hd_picpl_box_con hidden\">");
                strContent += ("<div class=\"hd_picpl_box\">");
                strContent += ("<ins></ins>");
                strContent += ("<div class=\"hd_picpl_mid\">");
                strContent += ("<div class=\"picpl_form_box\">");
                strContent += ("");
                strContent += ("<div>");
                strContent += ("<span><input type=\"text\" name=\"textfield\" id=\"textfield\" class=\"picpl_hf_kuang\" hidefocus=\"ture\" style=\"outline:none;\"/></span>");
                strContent += ("<span><input type=\"submit\" name=\"button\" id=\"button\" value=\"回复\" class=\"picpl_hf_an01\" tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(images/picpl_hf_an01b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(images/picpl_hf_an01a.jpg)'\"  onfocus=\"this.blur()\"/></span>");
                strContent += ("<span><input type=\"reset\" name=\"button2\" id=\"button2\" value=\"取消\" class=\"picpl_hf_an02\"tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(images/picpl_hf_an02b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(images/picpl_hf_an02a.jpg)'\"  onfocus=\"this.blur()\"/></span>");
                strContent += ("</div>");
                strContent += ("");
                strContent += ("</div>");
                $.each(oneData.data, function (j, oneMsg) {
                    active_posts_id = oneMsg.active_posts_id;
                    follow_id = oneMsg.follow_id;
                    strContent += ("<div class=\"picpl_huif_box\">");
                    strContent += ("<div class=\"huif_left\"><img src=\"../images/img_43x43.png\" width=\"37\" height=\"37\" /></div>");
                    strContent += ("<div class=\"huif_right\">");
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
                strContent += ("<div class=\"huif_open_an\"><a href=\"###\"  onclick='outspreadContent(this," + varRowTotalCount + "," + active_posts_id + "," + follow_id + ")'>更多回复</a></div>");
                strContent += ("</div>");
                strContent += ("");
                strContent += ("</div>");
                strContent += ("</div>");
                strContent += ("</div>");
            }
            strContent += ("<div class=\"xia_b_xian\"></div>");
            strContent += ("</div>");
        });
    }
    return strContent;

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
                strContent += ("<div class=\"huif_right\">");
                strContent += ("<div class=\"huif_text\">");
                strContent += msg.content;
                strContent += ("</div>");
                strContent += ("<div class=\"huif_line\">");
                strContent += ("<span class=\"huif_time\">" + msg.createdate + "</span>");
                strContent += ("<span class=\"huif_huif\"><a href=\"#\">回复</a></span>");
                strContent += ("<span class=\"huif_delete\"><a href=\"#\">删除</a></span>");
                strContent += ("</div>");
                strContent += ("</div>");
                strContent += ("</div>");
            });

            $(obj).parent().parent().prev().after(strContent);
            $(obj).hide();
        }
    });
}
