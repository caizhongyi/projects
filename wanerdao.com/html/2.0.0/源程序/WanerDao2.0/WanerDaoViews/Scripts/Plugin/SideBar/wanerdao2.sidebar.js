var countryid ="";
var stateid="";
var cityid = "";
var countryName = "";
var stateidName = "";
var cityName = "";
$(function () {
    getMyPagination('#friendPageid', friendjoinactivityhtmlContent, 'sidebar', 'friendjoinactivity');
    getMyPagination('#newactivityPageid', newactivityhtmlContent, 'sidebar', 'newactivity');
    getMyPagination('#interestPageid', interestactivityhtmlContent, 'sidebar', 'interestactivity');
    getMyPagination('#groupPageid', groupContent, 'searchgrouprelateactivity', vcategory_name);
    $("#search_active").click(search_active);
    $("#selectArea").click(function () {
        wanerdaoArea({
            alphopts: { title: '地区选择框', id: 'tt', elementid: 'selectArea', callback: showdata }
        });
    });
    function showdata(data) {
        if (data.result) {
            countryName = data.country.name;
            stateidName = data.state.name;
            cityName = data.city.name; 
            $("#txtactivitycountryName").val(countryName);
            $("#txtactivitystateName").val(stateidName);
            $("#txtactivitycityName").val(cityName);
            countryid = data.country.id;
            stateid = data.state.id;
            cityid = data.city.id;
        }
    }
});
function getMyPagination(pageid, pageHtmlContent,sidebar, sidebarcategory) {
    $(pageid).myPagination({   //分页插件，详见分页插件说明
        currPage: 1,
        callback: pageHtmlContent,
        cssStyle: 'noll',
        sidebarpage: true,
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
        info: {
            first: '首页',
            last: '尾页',
            next: '下',
            prev: '上',
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
    var strContent =getContent(data,totalCount);   
    $('#interestContent').html(strContent);
}
function getContent(data,totalCount) {
    var strContent = "";
    $.each(data.rows, function (i, msg) {
        var time = DateFormat(msg.begin_datetime, "yyyy-MM-dd");
        var begindate = time; //getMonthAndDate(time);  
        var time = DateFormat(msg.end_datetime, "yyyy-MM-dd");
        var enddate = time; //getMonthAndDate(time);  

        var vSingup = "<a href=\"/activity/Activity_signup.html?id=" + msg.id + "\">报名</a>";
        if (msg.original_id == wd_B.uin.uid) {
            vSingup = "<a href=\"###\">&nbsp;</a>";
        }
        if (msg.cansingup != null) {
            if (msg.cansingup == "0") {
                vSingup = "<a href=\"###\">&nbsp;</a>";
            }
        }
        (totalCount - 1) == i ? strTopClass = "class=\"noBor\"" : strTopClass = "";
        strContent += "<li  " + strTopClass + "><a href=\"/activity/Activity_index.html?id=" + msg.id + "\">" + msg.activity_name + "</a> <br />";
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
      strContent += ("<dt><a href=\"#\" target=\"_blank\" class=\"fb\">" +msg.group_name + "</a> 1000人</dt>");
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
    var reg = new RegExp(',', "g");
    activityNames = ""; catygoryNames = ""; friendsName = ""; groupNames = ""; sightNames = ""; countryId = ""; provinceId = ""; cityId = ""; countryName = "";stateidName = "";cityName="";
    if ($("#txt_activityNames").val() != "关键词") activityNames = $("#txt_activityNames").val().replace(/\s/g, "").replace(reg, ':'); //活动名字串，用“:”分隔 可以缺省默认为空
    if ($("#txt_categoryNames").val() != "请选择活动分类") catygoryNames = $("#txt_categoryNames").val().replace(/\s/g, "").replace(reg, ':'); //分类名字串，用“:”分隔 可以缺省默认为空
    if ($("#txt_friendsName").val() != "好友参加的活动") friendsName = $("#txt_friendsName").val().replace(/\s/g, "").replace(reg, ':'); //朋友名字串，用“:”分隔 可以缺省默认为空
    if ($("#txt_groupNames").val() != "圈子参加的活动") groupNames = $("#txt_groupNames").val().replace(/\s/g, "").replace(reg, ':'); //圈子名字串，用“:”分隔 可以缺省默认为空
    if ($("#txt_sightNames").val() != "景点") sightNames = $("#txt_sightNames").val().replace(/\s/g, "").replace(reg, ':'); //景点名字串，用“:”分隔 可以缺省默认为空
    countryName=$("#txtactivitycountryName").val().replace(/\s/g, "").replace(reg, ':');
    stateidName=$("#txtactivitystateName ").val().replace(/\s/g, "").replace(reg, ':');
    cityName=$("#txtactivitycityName").val().replace(/\s/g, "").replace(reg, ':')
   
    //注意，为什么要用“:” 分隔，是因为后台获取参数时的正则表达式只支持“:”分隔。
    //if ($("#txt_countryId").val() != "美国") countryId = $("#txt_countryId").val(); //国家 可以缺省默认为空
    //if ($("#drp_Provice").val() != "所有州省") provinceId = $("#drp_Provice").val(); //省份 可以缺省默认为空
    //if ($("#drp_City").val() != "所有城市") cityId = $("#drp_City").val(); //城市 可以缺省默认为空    countryid stateid   cityid
    var varParameter = "activityNames=" +encodeURIComponent(activityNames)+ "&catygoryNames=" +encodeURIComponent(catygoryNames)+ "&friendsName=" +encodeURIComponent(friendsName);
    varParameter += "&groupNames=" + encodeURIComponent(groupNames) + "&sightNames=" + encodeURIComponent(sightNames) + "&countryId=" + countryid;
    varParameter += "&provinceId=" + stateid + "&cityId=" + cityid + "&countryName=" + countryName + "&stateidName=" + stateidName + "&cityName=" + cityName;
    //alert(varParameter); stateidName cityName
    window.location.href = "Activity_search.aspx?" + varParameter;
}