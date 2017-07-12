var setLayerCount = '2'; // 设置层数
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
                opertype: 'leavesinglemessage',
                SetLayer: setLayerCount, //设置显示层数
                CommentCount: commentCount, //每一层回复显示个数
                id: 5
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
        $('#totalMesage').html('(' + data.total + '条留言)');
        var strContent = "";
        strContent = appendHtml(data.rows, 0, parseFloat(setLayerCount + 1)); //alert(strContent);
        $('#d6').html(strContent);

    }

    $("a[type =hide]").live('click', function () {
        $(this).parent().hide();
        $parent = $(this).parent().prevAll();
        $.each($parent, function (i) {
            var currentIndex = $(this).index();// alert(currentIndex); alert($(this).html());
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
        varBotHtml = "";
        varTopHtml = "<div class=\"newsList\">"
        varRowTotalCount = "";
        var active_posts_id="";
        var follow_id="";
        var isTop;
        if (currentLayer != 0) {
            strContent += "<div style='margin-left:20px; margin-top:20px;'>";
            varTopHtml = "<div class=\"newsListHf\">"
            Data = $.parseJSON(Data);
            varRowTotalCount = Data.rowCount;
            Data = Data.data;
            varBotHtml = "</div>"
            isTop = 1;
        }
        else { isTop = 0; }
        currentLayer++;
        $.each(Data, function (i, msg) {
            if (isTop == 0) { varTopHtml = "<div class=\"newsList\">"; } 
            else { varTopHtml = "<div class=\"newsListHf\">"; active_posts_id=msg.active_posts_id;follow_id=msg.follow_id;}
            strContent += varTopHtml;
            strContent += "<div  class=\"avatar50\"><a href=\"#\"><img src=\"../../images/PluginImages/leavemessage/avatar.jpg\" width=\"50\" height=\"50\" alt=\"用户头像\"></a></div>";
            strContent += "<div   class=\"newsSubject marginL10\">";
            strContent += "<div class=\"overBox\">";
            strContent += "<span class=\"linkList\">";
            strContent += "<ul>";
            strContent += "<li><a class=\"marginR5\" href=\"#\">" + msg.username + "</a></li>";
            strContent += "<li><a title=\"加为好友\" href=\"#\">";
            strContent += "<img src=\"../../images/PluginImages/leavemessage/addfrd.gif\" /></a></li>";
            strContent += "<li><a title=\"发信息\" href=\"#\">";
            strContent += "<img src='../../images/PluginImages/leavemessage/sendmsg.gif' /></a></li>";
            strContent += "<li><a title=\"用户资料\" href=\"#\">";
            strContent += "<img src=\"../../images/PluginImages/leavemessage/user_ifm.gif\" /></a></li>";
            strContent += "<li><a>回复</a></li>";
            strContent += "</ul>";
            strContent += "</span><span class=\"floatRight gray9\"><span class=\"time03 marginR20\"><span class=\"act_attLv\">活跃度：</span><span title=\"45\" class=\"proWhite\"><span style=\"width:45%\" class=\"proYellow\"></span></span></span>发表时间：" + msg.createdate + "</span></div>";
            strContent += "<div class=\"overBox\">" + msg.content + "</div>";
            rowsDate = msg.rows;
            if (rowsDate) {
                strContent += appendHtml(rowsDate, currentLayer, showLayer);
            }
            strContent += "</div>";
            strContent += "</div>";

        })
        if (isTop != 0) {
            if (parseInt(commentCount) < parseInt(varRowTotalCount)) {
                strContent += "<div style='font-weight:bold; float:right' ><a href='###' onclick='outspreadContent(this,"+varRowTotalCount+","+active_posts_id+","+follow_id+")'>展开<a/></div><div style='clear:both;'></div>";
            }
        }
        strContent += varBotHtml;

    }
    return strContent;
}

function outspreadContent(obj, rowTotalCount, active_posts_id, follow_id) {
     $obj = $(obj).parent().nextAll();
    var count = 0;
    if ($obj != null) {
        $.each($obj, function (i) {
            if (count >0) {
                $(this).show();
            }
            count++;
        });
    }
    if (count < 2) {
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
                    strContent += "<div class=\"newsListHf\">";
                    strContent += "<div  class=\"avatar50\"><a href=\"#\"><img src=\"../../images/PluginImages/leavemessage/avatar.jpg\" width=\"50\" height=\"50\" alt=\"用户头像\"></a></div>";
                    strContent += "<div   class=\"newsSubject marginL10\">";
                    strContent += "<div class=\"overBox\">";
                    strContent += "<span class=\"linkList\">";
                    strContent += "<ul>";
                    strContent += "<li><a class=\"marginR5\" href=\"#\">" + msg.username + "</a></li>";
                    strContent += "<li><a title=\"加为好友\" href=\"#\">";
                    strContent += "<img src=\"../../images/PluginImages/leavemessage/addfrd.gif\" /></a></li>";
                    strContent += "<li><a title=\"发信息\" href=\"#\">";
                    strContent += "<img src='../../images/PluginImages/leavemessage/sendmsg.gif' /></a></li>";
                    strContent += "<li><a title=\"用户资料\" href=\"#\">";
                    strContent += "<img src=\"../../images/PluginImages/leavemessage/user_ifm.gif\" /></a></li>";
                    strContent += "<li><a>回复</a></li>";
                    strContent += "</ul>";
                    strContent += "</span><span class=\"floatRight gray9\"><span class=\"time03 marginR20\"><span class=\"act_attLv\">活跃度：</span><span title=\"45\" class=\"proWhite\"><span style=\"width:45%\" class=\"proYellow\"></span></span></span>发表时间：" + msg.createdate + "</span></div>";
                    strContent += "<div class=\"overBox\">" + msg.content + "</div>";
                    strContent += "</div>";
                    strContent += "</div>";
                });
                strContent += "<div style='float:right;font-weight:bold'> <a href='###' type='hide' >隐藏</a></div><div style='clear:both;'></div>"
                $(obj).parent().parent().append(strContent);
                $(obj).parent().hide();
            }
        });
    }
    else {
        $(obj).parent().hide();
    }
}
