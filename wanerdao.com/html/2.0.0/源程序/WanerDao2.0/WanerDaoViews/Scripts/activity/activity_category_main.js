var categoryid = '';
if (getQueryString("categoryid") != null && getQueryString("categoryid") != "undefined") {
    categoryid = getQueryString("categoryid");
}
var visrc = 'secitionpage/define.jpg';
var vcategory_name = "";
$(function () {

    getActivityCategoryInfor();

    $("p[type=pageid]").myPagination({
        currPage: 1,
        callback: listdata,
        cssStyle: 'noll',
        sidebarpage: true,
        ajax: {
            url: 'pop_common.axd',
            param: {
                pageSize: 16,
                opertype: opertype,
                categoryid: categoryid,
                pagecurrent: "1"
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
    function listdata(data) {

        if (data != null && data.result != false && data.rows != null && data.rows != "") {
            var vRootimgpath = data.rootimgpath;
            var vImgLogo = data.rows[0].logo_path;
            var vImgSrc = "";
            if (vImgLogo != null && vImgLogo != "") {
                vImgSrc = vRootimgpath + vImgLogo;
            } else { vImgSrc = vRootimgpath + "secitionpage/define.jpg"; }
            var strContent = ""; 
            $.each(data.rows, function (i, msg) {
                var vPrepay_nbr = msg.prepay_nbr;
                var vP_nbr = "";
                if (vPrepay_nbr != null && vPrepay_nbr != "") {
                    vP_nbr = msg.prepay_nbr + "$";
                } else { vP_nbr = ""; }
                strContent += ("<div class=\"open_activity\">");
                strContent += ("<p class=\"right_img\"><img src=\"" + vImgSrc + "\" width=\"50\" height=\"50\" /></p>");
                strContent += ("<div class=\"right_descrip\">");
                strContent += ("<div class=\"o_event\"><span class=\"f14\"><a href=\"#\">" + msg.create_name + "</a> 发起 <a href=\"#\">" + msg.activity_name + "</a> " + msg.address + " <font class=\"red\">" + msg.join_member_nbr + "/" + msg.max_nbr + "</font></span></div>");
                strContent += ("<p>" + msg.description + "</p>");
                strContent += ("<p class=\"o_event eInfo\">");
                strContent += ("<span>活动时间：<i>" + getMonthAndDate(msg.begin_datetime) + "-" + getMonthAndDate(msg.end_datetime) + " </i>报名截止时间：<i>" + getMonthAndDate(msg.report_end_datetime) + "</i> 初始费用：<i>" + vP_nbr + "</i> </span>");
                strContent += ("<a href=\"/activity/activity_index.html?id="+msg.id+"\" class=\"detail\"></a>");
                strContent += ("</p>");
                strContent += ("</div>");
                strContent += ("</div>");
            });
            $("#ofh").html(strContent);
        }
        else {
            $("#activity_sub").attr("style", "display:none");
            $("#divPageid").attr("style", "display:none");
        }
    };

    $("#fix4w> li").click(function () {
        var vCurrentIndex = $(this).index();
        if (vCurrentIndex == "0") {
            $("#listSearch").attr("style", "display:block");
            $("#mapSearch").attr("style", "display:none");
            $(this).next().children("a").removeAttr("class");
        } else if (vCurrentIndex == "1") {
            $("#listSearch").attr("style", "display:none");
            $("#mapSearch").attr("style", "display:block");
            $(this).prev().children("a").removeAttr("class");
        }
        $(this).children("a").attr("class", "cur");
    });
});

function getActivityCategoryInfor() {
    $.ajax({
        url: "pagination_activity.axd",
        type: 'POST',
        dataType: "json",
        data: {
            opertype: "activitydefinetotalpagecount",
            section_type: section_type,
            sectionid: categoryid //1:时令 2：一般 3：自定义
        },
        cache: false,
        timeout: 60000,
        error: function (data) {
            alert(data);
        },
        success: function (data) {
            if (data.result == true) {
                vcategory_name = data.data[0].name;
                $("#categoryDes").html("<a href=\"#\" target=\"_blank\" id=\"categoryImg\"><img  src=\"" + data.data[0].logo_path + "\" width=100 height=100 /></a>");
                $("#activity_attention").html("<h2 class=\"yh\"><a href=\"#\" target=\"_blank\">" + data.data[0].name + "</a></h2><p> 近期活动数:<i>" + data.data[0].latelyActivityCount + "</i><br /> 开放的活动数:<i>" + data.data[0].openActivityCount + "</i><br /> 关注度:<i>" + data.data[0].followCount + "</i> </p>");
            }
        }
    });

}



function addfollowactivitycategory() {
    $.ajax({
        url: "activitycategory_follow.axd",
        type: 'POST',
        dataType: "json",
        data: {
            opertype: "followactivitycategory",
            activityCategoryId: categoryid //1:时令 2：一般 3：自定义
        },
        cache: false,
        timeout: 60000,
        error: function (data) {
            alert(data);
        },
        success: function (data) {
            alert(data.msg);
            getActivityCategoryInfor()
        }
    });
}