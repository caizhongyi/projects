var isType = "";
var pgType = decodeURIComponent(getQueryString("pgType"));
function getOldActivityCount() {
    $.ajax({
        url: "activitysetting_activity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getoldactivitycount',userid:'" + wd_B.uin.uid + "'}",
        error: function (data) { },
        success: function (data) {
            if (data != null && data.total != null && data.total != "") {
                $("#oldTotal").html("（" + data.total + "）");
            }
            else {
                $("#oldTotal").html("（0）");
            }
        }
    })
}

function getNewActivityCount() {
    $("#pageid").myPagination({
        callback: getListNewCount,
        cssStyle: 'noll',
        ajax: {
            url: 'pop_common.axd',
            param: {
                pageSize: 5,
                opertype: 'getactivitynewandold',
                type: "1",
                pagecurrent: "1"
            }
        },
        info: {
            first: '',
            last: '',
            next: "",
            prev: "",
            first_on: false,
            last_on: false,
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
}

function getListNewCount(data) {
    var strContent = "暂无内容";
    var total = "0";
    if (data != null && data.rows != null && data.rows != "") {
        if (data.total != null && data.total != "") {
            total = data.total;
        }
    }
      $("#newTotal").html("（" + total + "）");
    
}


$(".actList li").live("click", function () {
    $(this).addClass("mHover").siblings().removeClass("mHover");
})

$(".actList li a").live("click", function (event) {
    event.stopPropagation();
});
function getActivitybyClick(obj, type) {
    $obj = $(obj);
    varHtml = $obj.children("span").eq(0).html();
    $("#searchTitle").html(varHtml);
    isType = type;
    getActivity(type);
     $obj.attr("class", "fuNow");
    if (type == "1") {
        $obj.next().attr("class", "before");
        $("#evaluate").hide();
    } else if (type == "2") {
        $obj.prev().attr("class", "before");
        $("#evaluate").show();

    }
}

function getActivity(type) {
   
    $("#pageid").myPagination({
        callback: getList,
        cssStyle: 'noll',
        ajax: {
            url: 'pop_common.axd',
            param: {
                pageSize: 5,
                opertype: 'getactivitynewandold',
                type: type,
                pagecurrent: "1"
            }
        },
        info: {
            first: '首页',
            last: '尾页',
            next: " <img src=\"images/none.gif\" class=\"pre\"/>",
            prev: " <img src=\"images/none.gif\" class=\"next hasMore\"/>",
            first_on: false,
            last_on: false,
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
}

function getList(data) {
    var strContent = "暂无内容";
    var total = "0"; 
    if (data != null && data.rows != null && data.rows != "") {
        strContent = "";
        
        $.each(data.rows, function (i, msg) {
            strContent += ("<li>");
            strContent += ("<dl class=\"sInfo\">");
            strContent += ("<dt class=\"bflag\">");
            strContent += ("<a href=\"#\" class=\"aTit\" onclick=\"getActivityInfor('" + msg.id + "','" + msg.activity_name + "')\">" + msg.activity_name + "</a>");
            strContent += ("<i class=\"iOpera\" onmouseout=\"this.className='iOpera'\" onmouseover=\"this.className +=' oCur';\">");
            strContent += ("<i class=\"selName\">操作</i>");
            strContent += ("<p class=\"vMenu\">");
            strContent += ("<a href=\"javascript:void(0);\" class=\"copyLink\">复制活动链接</a><br />");
            if (isType == "1") {
                strContent += ("<a href=\"javascript:void(0);\">退出</a>");
            }
            strContent += ("</p>");
            strContent += ("</i>");
            strContent += ("</dt>");
            strContent += ("<dd>" + getMonthAndDate(msg.begin_datetime) + "-" + getMonthAndDate(msg.end_datetime) + "  " + msg.join_member_nbr + "/" + msg.max_nbr + "人  </dd>");
            strContent += ("</dl>");
            strContent += ("<p class=\"items\">");
            strContent += ("·<a href=\"#activityIndex\" class=\"fb\">简介</a><br />");
            strContent += ("·<a href=\"#plan\">计划</a><br />");
            strContent += ("·<a href=\"#finance\">收支财务</a><br />");
            strContent += ("·<a href=\"#memberlist\">成员</a><br />");
            strContent += ("·<a href=\"#bycarinfor\">搭车信息</a><br />");
            strContent += ("·<a href=\"#carline\">行车路线</a><br />");
            strContent += ("·<a href=\"#weather\">天气预报</a><br />");
            strContent += ("·<a href=\"#leavemessage\">留言板</a>");
            strContent += ("</p>");
            strContent += ("</li>");
            if (i == 0) {
                getActivityInfor(msg.id, msg.activity_name);
            }
        });
        if (data.total != null && data.total != "") {
            total = data.total;
        }
        
    }
    if (isType == "1") $("#newTotal").html("（" + total + "）");
    else if (isType == "2") $("#oldTotal").html("（" + total + "）");
    $("#actList").html(strContent);
}

//(function (window, undefined) {
//   getOldActivityCount();
//   getActivity("1");
//  isType ="1";
//})(window);


$(function () {
    // getOldActivityCount();
    if (pgType == "undefined") {
        getOldActivityCount();
        isType = "1";
        getActivity("1"); $("#evaluate").hide();
    }
    else {
        getNewActivityCount(); 
        isType = "2";
        getActivity("2"); $("#evaluate").show();
        $("#searchTitle").html("历史活动");
        $("#actTotal").html("<a href=\"#\" class=\"before\" onclick=\"getActivitybyClick(this,1)\"><span>未来及现在活动</span><span id=\"newTotal\">（）</span></a> <a href=\"#\" class=\"fuNow\" onclick=\"getActivitybyClick(this,2)\"><span>历史活动</span><span id=\"oldTotal\">（）</span></a>")
    }
});