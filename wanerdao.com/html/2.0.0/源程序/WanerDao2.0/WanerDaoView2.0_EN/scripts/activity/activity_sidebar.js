var countryid = "";
var stateid = "";
var cityid = "";
var address = "";
var activityNames = "";
var catygoryNames = "";
var friendsName = "";
var groupNames = "";
var sightNames = "";   

$(function () {
    getMyPagination('#friendPageid', friendjoinactivityhtmlContent, 'sidebar', 'friendjoinactivity');
    getMyPagination('#newactivityPageid', newactivityhtmlContent, 'sidebar', 'newactivity');
    getMyPagination('#interestPageid', interestactivityhtmlContent, 'sidebar', 'interestactivity');
    getMyPagination('#groupPageid', groupContent, 'searchgrouprelateactivity', vcategory_name);
    $("#search_active").click(search_active);
//    $("#selectArea").click(function () {
//        wanerdaoArea({
//            alphopts: { title: '地区选择框', id: 'tt', elementid: 'selectArea', callback: showdata }
//        });
//    });
//    function showdata(data) {
//        if (data.result) {
//            countryName = data.country.name;
//            stateidName = data.state.name;
//            cityName = data.city.name;
//            $("#txtactivitycountryName").val(countryName);
//            $("#txtactivitystateName").val(stateidName);
//            $("#txtactivitycityName").val(cityName);
//            countryid = data.country.id;
//            stateid = data.state.id;
//            cityid = data.city.id;
//        }
//    }
});
function getMyPagination(pageid, pageHtmlContent, sidebar, sidebarcategory) {
    $(pageid).myPagination({   //分页插件，详见分页插件说明
//        currPage: 1,
//        callback: pageHtmlContent,
//        cssStyle: 'noll',
//        sidebarpage: true,
        showmore: false, //是否显示加载更多
        showpagingnav: false, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        contentid: '', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: pageHtmlContent,
        pagermore: false,
        ajax: {
            url: 'pop_common.axd',
            param: {
                pageSize: 5,
                opertype: sidebar, //业务类型  
                sidebarcategory: sidebarcategory,     // 'newactivity'   
                userId: wd_B.uin.uid,
                pagecurrent: "1",
                category_name: '自定义活动'
            }
        },
//        info: {
//            first: '首页',
//            last: '尾页',
//            next: '下',
//            prev: '上',
//            first_on: false,
//            last_on: false,
//            next_on: true,
//            prev_on: true,
//            showpageno: false,
//            tipmsg: '第{tip}页',
//            msg_on: false,
//            link: '#',
//            msg: '<span>&nbsp;&nbsp;跳{currText}/{sumPage}页</span>',
//            text: {
//                width: '22px'
//            }
//        }

        info: {
            first:'', //' <a href=\"###\" class=\"next\" >',
            lastdiscls: 'disable',
            next:'',//'<a href=\"###\" ></a>',
            nextcls: 'next',
            nextdiscls: 'next-disable',
            prev: '',//'<a href=\"###\" ></a>',
            prevcls: 'prev',
            prevdiscls: 'prev-disable',
            first_on: false,
            last_on: false,
            next_on: true,
            prev_on: true,
            msg_on: false,
            tipmsg: wanerdaoLangTip('pager_00010'),
            nodatamsg: wanerdaoLangTip('pager_00017')//当加载到最后一页时候的提示信息，只适用于"加载更多"、"显示更多"
        }


    });
}

//好友参加活动
function friendjoinactivityhtmlContent(data) {
    var totalCount = data.total;
    $("#friendTotal").html("（" + totalCount + "）");
    var strContent = getContent(data, totalCount);
    $('#friendContent').html(strContent);
}

//最新活动
function newactivityhtmlContent(data) {
    var totalCount = data.total;
    $("#newTotal").html("（" + totalCount + "）");
    var strContent = getContent(data, totalCount);
    $('#newActivityContent').html(strContent);
}

// 感兴趣的活动
function interestactivityhtmlContent(data) {
    var totalCount = data.total;
    $("#interestTotal").html("（" + totalCount + "）");
    var strContent = getContent(data, totalCount);
    $('#interestContent').html(strContent);
}
function getContent(data, totalCount) {
    var strContent = "";
    $.each(data.rows, function (i, msg) {
        var time = DateFormat(msg.begin_datetime, "yyyy-MM-dd");
        var begindate = time; //getMonthAndDate(time);  
        var time = DateFormat(msg.end_datetime, "yyyy-MM-dd");
        var enddate = time; //getMonthAndDate(time);  
        var vSingup = "<a href=\"/activity/activity_signup.html?id=" + msg.id + "\">报名</a>";
        if (msg.original_id == wd_B.uin.uid) {
            vSingup = "<a href=\"###\">&nbsp;</a>";
        }
        if (msg.cansingup != null) {
            if (msg.cansingup == "0") {
                vSingup = "<a href=\"###\">&nbsp;</a>";
            }
        }
        (totalCount - 1) == i ? strTopClass = "class=\"noBor\"" : strTopClass = "";
        strContent += "<li  " + strTopClass + "><a href=\"/activity/activity_index.html?id=" + msg.id + "\">" + msg.activity_name + "</a> <br />";
        strContent += msg.description;
        strContent += "<p><span>" + msg.join_member_nbr + "/" + msg.max_nbr + "人&nbsp;&nbsp;" + begindate + "&nbsp;-" + enddate + "</span>" + vSingup + "</p>";
        strContent += "</li>";
    });
    return strContent
}

function groupContent(data) {
    var strContent = "";
    $.each(data.rows, function (i, msg) {
        strContent += ("<li>");
        strContent += ("<a href=\"#\" target=\"_blank\"><img src=\"../images/img_43x43.png\" width=\"50\" height=\"50\" class=\"lPic\" /></a>");
        strContent += ("<dl>");
        strContent += ("<dt><a href=\"#\" target=\"_blank\" class=\"fb\">" + msg.group_name + "</a> 1000人</dt>");
        strContent += ("<dd>关注：<em class=\"orange\">23</em></dd>");
        strContent += ("<dd>");
        strContent += ("<i class=\"right\"><a href=\"#\" target=\"_blank\">详情</a> <a href=\"javascript:void(0);\">+关注</a></i>");
        strContent += ("活跃：<em class=\"orange\">12</em>");
        strContent += ("</dd>");
        strContent += ("</dl>");
        strContent += ("</li>");
    });
    $("#groupTotal").html("（" + data.total + "）");
    $("#groupContent").html(strContent);
}


function search_active() {
//    alert(countryid);
//     alert(stateid);
//     alert(cityid);

    var reg = new RegExp(',', "g");
    if ($("#txt_activityNames").val() != "关键词") activityNames = $("#txt_activityNames").val().replace(/\s/g, "").replace(reg, ':'); //活动名字串，用“:”分隔 可以缺省默认为空
    else { activityNames = ""; }
    if ($("#txt_categoryNames").val() != "请选择活动分类") catygoryNames = $("#txt_categoryNames").val().replace(/\s/g, "").replace(reg, ':'); //分类名字串，用“:”分隔 可以缺省默认为空
    else { catygoryNames = ""; }
    if ($("#txt_friendsName").val() != "好友参加的活动") friendsName = $("#txt_friendsName").val().replace(/\s/g, "").replace(reg, ':'); //朋友名字串，用“:”分隔 可以缺省默认为空
    else { friendsName = ""; }
    if ($("#txt_groupNames").val() != "圈子参加的活动") groupNames = $("#txt_groupNames").val().replace(/\s/g, "").replace(reg, ':'); //圈子名字串，用“:”分隔 可以缺省默认为空
    else { groupNames = ""; }
    if ($("#txt_sightNames").val() != "景点") sightNames = $("#txt_sightNames").val().replace(/\s/g, "").replace(reg, ':'); //景点名字串，用“:”分隔 可以缺省默认为空
    else { sightNames = ""; }
    if ($("#txtactivitycountryName").val() == "请选择地区") {
        countryid = "";
        cityid = "";
        stateid = "";
        address = "";
    } else {
        address= $("#txtactivitycountryName").val().replace(/\s/g, "").replace(reg, ':'); 
    }
    var varParameter = "activityNames=" + encodeURIComponent(activityNames) + "&catygoryNames=" + encodeURIComponent(catygoryNames) + "&friendsName=" + encodeURIComponent(friendsName);
    varParameter += "&groupNames=" + encodeURIComponent(groupNames) + "&sightNames=" + encodeURIComponent(sightNames) + "&countryId=" + countryid;
    varParameter += "&provinceId=" + stateid + "&cityId=" + cityid + "&address=" + address;
    window.location.href = "activity_search.html?" + varParameter;
}



$("#txtactivitycountryName").click(function () {
    new wanerdaoArea({ comopts: { elementid: "#txtactivitycountryName", callback: function (data) {
        countryid = data.country.id;
        stateid = data.state.id;
        cityid = data.city.id;
        address = $("#txtactivitycountryName").val();
    }
    }
    });
});