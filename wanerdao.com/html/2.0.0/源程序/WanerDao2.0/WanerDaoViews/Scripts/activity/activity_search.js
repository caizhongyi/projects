vcategory_name = '活动';
activityNames = decodeURIComponent(getQueryString2("activityNames"));
catygoryNames = decodeURIComponent(getQueryString2("catygoryNames"));
friendsName = decodeURIComponent(getQueryString2("friendsName"));
groupNames = decodeURIComponent(getQueryString2("groupNames"));
sightNames = decodeURIComponent(getQueryString2("sightNames"));
countryId1 = getQueryString2("countryId");
provinceId1 = getQueryString2("provinceId");
cityId1 = getQueryString2("cityId");
countryName1 = decodeURIComponent(getQueryString2("countryName"));
stateidName1 = decodeURIComponent(getQueryString2("stateidName"));
cityName1 = decodeURIComponent(getQueryString2("cityName"));
$(function () {
    $("p[type=pageid]").myPagination({   //分页插件，详见分页插件说明
        currPage: 1,
        callback: SearchList,
        cssStyle: 'noll',
        sidebarpage: true,
        ajax: {
            url: 'pop_common.axd',
            param: {
                pagecurrent: 1, //当前页
                opertype: "searchactivitybymanycondition", //业务处理类别
                pageSize: '10', //页码数
                activityNames: activityNames, //活动名字串，用“:”分隔
                catygoryNames: catygoryNames, //分类名字串，用“:”分隔
                friendsName: friendsName, //朋友名字串，用“:”分隔
                groupNames: groupNames, //圈子名字串，用“:”分隔
                sightNames: sightNames, //景点名字串，用“:”分隔
                countryId: countryId1, //国家
                provinceId: provinceId1, //省份
                cityId: cityId1 // 城市
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
    function SearchList(data) {
        var strContent = "";
        var rootImagepath = data.rootimgpath;
        if (data.result != false) {
            $.each(data.rows, function (i, msg) {
                var headimg = "../images/talk_peo_img.png"
                if (msg.logo_small_path != "") {
                    headimg = rootImagepath + msg.logo_small_path
                }
                strContent += ("<div class=\"open_activity\">");
                strContent += ("<p class=\"right_img\"><img src=\"" + headimg + "\" width=\"50\" height=\"50\" /></p>");
                strContent += ("<div class=\"right_descrip\">");
                strContent += ("<div class=\"o_event\"><span class=\"f14\"><a>" + msg.name + "</a> 发起 <a href=\"/activity/activity_index.html?id=" + msg.id + "\" target=\"_blank\">" + msg.activity_name + "</a> [" + msg.address + "] <font class=\"red\">" + msg.join_member_nbr + "/" + msg.max_nbr + "</font></span>" + msg.datetime + "</div>");
                strContent += ("<p></p>");
                strContent += ("<p class=\"o_event eInfo\">");
                strContent += ("<span>活动时间：<i>" + getMonthAndDate(msg.begin_datetime) + "-" + getMonthAndDate(msg.end_datetime) + " </i>报名截止时间：<i>" + getMonthAndDate(msg.begin_datetime) + "</i> 初始费用：<i>" + msg.prepay_nbr + "$</i> </span>");
                strContent += ("<a href=\"/activity/activity_index.html?id=" + msg.id + "\" target=\"_blank\" class=\"detail\"></a>");
                strContent += ("</p>");
                strContent += ("</div>");
                strContent += ("</div>");

            });
        }
        activityNames = decodeURIComponent(getQueryString2("activityNames"));
        catygoryNames = decodeURIComponent(getQueryString2("catygoryNames"));
        friendsName = decodeURIComponent(getQueryString2("friendsName"));
        groupNames = decodeURIComponent(getQueryString2("groupNames"));
        sightNames = decodeURIComponent(getQueryString2("sightNames"));
        countryId1 = getQueryString2("countryId");
        provinceId1 = getQueryString2("provinceId");
        cityId1 = getQueryString2("cityId");
        countryName1 = decodeURIComponent(getQueryString2("countryName"));
        stateidName1 = decodeURIComponent(getQueryString2("stateidName"));
        cityName1 = decodeURIComponent(getQueryString2("cityName"));
        if (activityNames != "") $("#txt_activityNames").val(activityNames);
        if (catygoryNames != "") $("#txt_categoryNames").val(catygoryNames);
        if (friendsName != "") $("#txt_friendsName").val(friendsName);
        if (groupNames != "") $("#txt_groupNames").val(groupNames);
        if (sightNames != "") $("#txt_sightNames").val(sightNames);
        if (countryId1 != "") countryid = countryId1;
        if (provinceId1 != "") stateid = provinceId1;
        if (cityId1 != "") cityid = cityId1;
        if (countryName1 != "") $("#txtactivitycountryName").val(countryName1);
        if (stateidName1 != "") $("#txtactivitystateName").val(stateidName1);
        if (cityName1 != "") $("#txtactivitycityName").val(cityName1);
        $("#searchList").html(strContent);
    }
});

function getQueryString2(name) {
    var hrefStr = location.search;
    var params = hrefStr.substr(hrefStr.indexOf('?') + 1).toLowerCase().split('&');
    var value;
    for (var i in params) {
        //if (/^\w+\=[\w-]*$/.test(params[i])) {
        var arr = params[i].split('=');
        if (arr[0].toLowerCase() == name.toLowerCase()) {
            value = arr[1];
            break;
        }
        // }
    }
    return value;
}