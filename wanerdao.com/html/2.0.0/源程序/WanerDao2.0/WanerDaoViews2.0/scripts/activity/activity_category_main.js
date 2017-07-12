var categoryid = '';
if (getQueryString("categoryid") != null && getQueryString("categoryid") != "undefined") {
    categoryid = getQueryString("categoryid");
}
var opertype = 'activityitempagesearchactivity';

var visrc = 'secitionpage/define.jpg';
var vcategory_name = "";
$(function () {
    getActivityCategoryInfor();
    $(".pageList").myPagination({
        showmore: false, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        contentid: '.active-list', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: listdata,
        pagermore: true,
        ajax: {
            url: 'pop_common.axd', //此处必须填写，分页已没有固定处理工厂
            param: {
                pagecurrent: 1,
                pageSize: 15,
                opertype: opertype, //操作码
                categoryid: categoryid
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
                strContent += ("<li class=\"clearfix\">");
                strContent += ("<p class=\"right_img\"><img width=\"50\" height=\"50\" src=\"" + vImgSrc + "\"></p>");
                strContent += ("<div class=\"right_descrip\">");
                strContent += ("<div class=\"o_event\"><span class=\"f14\"><a target=\"_bank\" href=\"/personal/personal_info.html?uid=" + msg.original_id + "\">" + msg.original_name + "</a> " + wanerdaoLangTip('active_00048') + " <a href=\"/activity/activity_index.html?id=" + msg.id + "\">" + msg.activity_name + "</a><a href='javascript:;' title='" + msg.address + "'> [" + subPoints(msg.address, 20) + "]</a> &nbsp;现人数/总数：(<font class=\"red\">" + msg.join_member_nbr + "/" + msg.max_nbr + "</font>)</span>" + dateStr(msg.datetime) + "</div>");
                strContent += ("<p title='" + msg.description + "'>" + subPoints(msg.description,96) + "</p>");
                strContent += ("<p class=\"o_event eInfo\">");
                strContent += ("<span>" + wanerdaoLangTip('active_00027') + "：<i>" + getMonthAndDate(msg.begin_datetime) + "-" + getMonthAndDate(msg.end_datetime) + "</i>" + wanerdaoLangTip('active_00026') + "：<i>" + getMonthAndDate(msg.report_end_datetime) + "</i> " + wanerdaoLangTip('active_00045') + "：<i>" + vP_nbr + "</i> </span>");
                strContent += ("<a class=\"detail\"  target=\"_bank\" href=\"/activity/activity_index.html?id=" + msg.id + "\">" + wanerdaoLangTip('common_00054') + "</a>");
                strContent += ("</p>");
                strContent += ("</div>");
                strContent += ("</li>");
            });
            $(".active-list").html(strContent);
        }
        else {
            $(".active-list").html(wanerdaoLangTip('common_00005'));
        }
    };


});

function getActivityCategoryInfor() {
    $(".activity_description").html("");
    ajaxfuncbyloadmsg("pagination_activity.axd", "{opertype:'activitydefinetotalpagecount',sectionid:'" + categoryid  + "'}", ".activity_description", errorFunc, successFunc);
}
function successFunc(data) {
    var vContent = "";
    if (data.result == true) {
        vcategory_name = data.data[0].name;
        $("#litTitle").html(vcategory_name+wanerdaoLangTip('active_00049'));
        vContent += ("<a href=\"#\" class=\"attention\"></a>");
        vContent += ("<p class=\"f_left\"><a target=\"_blank\" href=\"###\"><img width=\"100\" height=\"100\" src=\"" + data.data[0].logo_path + "\"></a></p>");
        if (data.data[0].isfollow == "0") {
            vContent += ("<div class=\"activity_attention\"><a id=\"afollow\" class=\"button button1\" type=\"1\" href=\"javascript:;\"  action=\"follow\"  >+&nbsp;" + wanerdaoLangTip('active_00050') + "</a>");
        }
        else {
            vContent += ("<div class=\"activity_attention\"><a id=\"afollow\" class=\"button button1\" type=\"0\" href=\"javascript:;\"  action=\"follow\"  >-&nbsp;" + wanerdaoLangTip('active_00051') + "</a>");

        }
          vContent += ("<h2 class=\"yh\">" + data.data[0].name + "</h2>");
        vContent += ("<p>");
        vContent += (wanerdaoLangTip('active_00052') + ":<em>" + data.data[0].latelyActivityCount + "</em><br>");
        vContent += (wanerdaoLangTip('active_00053') + ":<em>" + data.data[0].openActivityCount + "</em><br>");
        vContent += (wanerdaoLangTip('common_00044') + ":<em>" + data.data[0].followCount + "</em>");
        vContent += ("</p>");
        vContent += ("</div>");
    }
    $(".activity_description").html(vContent);
}

//function addfollowactivitycategory() {
//    ajaxfunc("activitycategory_follow.axd", "{opertype:'followactivitymodule',sectionId:'" + categoryid + "'}", errorFunc, successfollowactivitycategory);
//}

function followactivitycategory(opertype) {
    ajaxfunc("activitycategory_follow.axd", "{opertype:'" + opertype + "',moduleId:'" + categoryid + "'}", errorFunc, successfollowactivitycategory);
}
function successfollowactivitycategory(data) {
    //alert(data.msg);
    if (data.result == true) {
        new pop({ titleid: 'common_00023', typename: 'confirm',
            msginfo: data.msg,
            callback: function () {
                getActivityCategoryInfor();
            }
        });        
    }
    else {
        new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.msg });
    }
}

$("a[action=follow]").live("click", function () {
    var objtype = $(this).attr("type");
    if (objtype == "1") {
        followactivitycategory('followactivitymodule');
    }
    else if (objtype == "0") {
        followactivitycategory('cancelactivitymodulefollow');
    }
});
