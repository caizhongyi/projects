vcategory_name = '活动';
$(function () {
    activityNames = decodeURIComponent(getQueryString2("activityNames"));
    catygoryNames = decodeURIComponent(getQueryString2("catygoryNames"));
    friendsName = decodeURIComponent(getQueryString2("friendsName"));
    groupNames = decodeURIComponent(getQueryString2("groupNames"));
    sightNames = decodeURIComponent(getQueryString2("sightNames"));
    countryid = getQueryString2("countryId");
    stateid = getQueryString2("provinceId");
    cityid = getQueryString2("cityId");
    address = decodeURIComponent(getQueryString2("address"));
    if (activityNames != "") $("#txt_activityNames").val(activityNames);
    if (catygoryNames != "") $("#txt_categoryNames").val(catygoryNames);
    if (friendsName != "") $("#txt_friendsName").val(friendsName);
    if (groupNames != "") $("#txt_groupNames").val(groupNames);
    if (sightNames != "") $("#txt_sightNames").val(sightNames);
    if (address != "") $("#txtactivitycountryName").val(address);
    $(".pageList").myPagination({
        showmore: false, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        contentid: '.active-list', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: searchList,
        pagermore: true,
        ajax: {
            url: 'pop_common.axd', //此处必须填写，分页已没有固定处理工厂
            param: {
                pagecurrent: 1,
                pageSize: 15,
                opertype: 'searchactivitybymanycondition', //操作码
                activityNames: activityNames, //活动名字串，用“:”分隔
                catygoryNames: catygoryNames, //分类名字串，用“:”分隔
                friendsName: friendsName, //朋友名字串，用“:”分隔
                groupNames: groupNames, //圈子名字串，用“:”分隔
                sightNames: sightNames, //景点名字串，用“:”分隔
                countryId: countryid, //国家
                provinceId: stateid, //省份
                cityId: cityid // 城市
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
                msg_on: true, //如果为true显示第几页以及总页数，否则不显示
                tipmsg: '第{tip}页'
            }
        }
    });

    function searchList(data) {
        var strContent = "";
        var rootImagepath = data.rootimgpath;
        if (data.result != false) {
            $.each(data.rows, function (i, msg) {
                var headimg = "/images/talk_peo_img.png"
                if (msg.logo_small_path != null && msg.logo_small_path != "") {
                    headimg = msg.logo_small_path;  //rootImagepath + msg.logo_small_path
                }
                strContent += ("<li class=\"clearfix\">");
                strContent += ("<p class=\"right_img\"><img width=\"50\" height=\"50\" src=\"" + headimg + "\"></p>");
                strContent += ("<div class=\"right_descrip\">");
                strContent += ("<div class=\"o_event\"><span class=\"f14\"><a href=\"/personal/personal_info.html?uid=" + msg.original_id + "\" target=\"_bank\">" + msg.name + "</a> 发起 <a href=\"/activity/activity_index.html?id=" + msg.id + "\" target=\"_blank\">" + subPoints(msg.activity_name, 40) + "</a> [" + msg.address + "] <font class=\"red\">" + msg.join_member_nbr + "/" + msg.max_nbr + "</font></span>" + dateStr(msg.datetime) + "</div>"); //" + dateStr(msg.datetime) + "
                strContent += ("<p>" + msg.description + "</p>");
                strContent += ("<p class=\"o_event eInfo\">");
                strContent += ("<span>活动时间：<i>" + getMonthAndDate(msg.begin_datetime) + "-" + getMonthAndDate(msg.end_datetime) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报名截止时间：<i>" + getMonthAndDate(msg.begin_datetime) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;初始费用：<i>" + msg.prepay_nbr + "$</i> </span>");
                strContent += ("<a class=\"detail\" href=\"/activity/activity_index.html?id=" + msg.id + "\" target=\"_blank\" >查看详细</a>");
                strContent += ("</p>");
                strContent += ("</div>");
                strContent += ("</li>");
            });
        }
        $(".active-list").html(strContent);
      
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

