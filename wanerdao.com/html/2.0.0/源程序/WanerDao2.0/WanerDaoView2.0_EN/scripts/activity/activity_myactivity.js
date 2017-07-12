var pagetype = "";
var pagetotalsearch = "0";
var urltype = decodeURIComponent(getQueryString("urltype"));
var activity_id = "";
var isloadingPlan = "0";
var isPlanEdit="0";
var isloadingWeather = "0";
var isloadingLeavemessage = "0";
var iscarinfor = "0";
var isbudget = "0"; // 判断预算是否重复加载 0未加载显示，1已经加载显示
var ismoneyflow = "0"; //判断收支是否重复加载
var isfinance = "0";//是否财务员
var isoperAdmin = "0"; //是否执行管理员
var isAuditor = "0";//是否审计员
var isAccountant = "0"; //是否会计
var isTeller = "0"; //是否出纳
var isSuperAdmin = "0"; //是否是超级管理员
var isUser = "0"; //普通用户
var arryoperater = [];
var arrfinancer = [];
var managevalue = {
    "activityid": "da19df6383864028933c7d0506d05d9c",
    "createuserid": "123456",
    "creategroupid": "",
    "createusername": "",
    "creategroupname": "",
    "activityname": "活动名字苏州11",
    "activitytags": [
                { "id": "1234", "name": "篮球" },
                { "id": "123", "name": "棒球" }
             ],
    "placeset": {
        "countryid": "74ed9496-ea4c-11e0-8606-00306701b527",
        "provinceid": "bed770fb-068e-11e1-a7b3-00306701b527",
        "cityid": "00007afa-f4b4-11e0-b192-00306701b527",
        "zip": "0100",
        "addr": "地址一11"
    },
    "operationmanager": [
                { "phone": "15873181472", "email": "xubing@qq.com", "id": "7404d5cea55942bfa15ee20adad547a9", "name": "用户名3" }
            ],
    "financialmanager": [
                { "phone": "15873181472", "email": "xubing@qq.com", "id": "84a7175e85f9460782ee4e18b681959b", "name": "用户名1" }
            ],
    "begintime": "2012/2/11 18:33:19",
    "endtime": "2012/2/12 18:33:19",
    "desc": "描述11",
    "reportdatetime": "2012/2/11 18:33:19",
    "SignupInfo": {
        "cost": 13.0,
        "paytypeid": "baeb9939-1515-11e1-b7d1-000c295f9365",
        "paytypename": "银行网上汇款",
        "paydesc": "预计费用说明",
        "subsistdesc": "缴费方式说明11",
        "typeid": "2",
        "typename": "密码验证加入",
        "pass": "pass"
    },
    "limitcondition": [
                  { "id": "123", "name": "经验要求", "value": "12" }
                  ],
    "iskick": true,
    "kickduration": 2.0,
    "remark": null
};

//获取活动的角色
function getactivitymemberrole(v_activityid) {
    ajaxfunc("role_activity.axd", "{opertype:'getactivitymemberrole',activityid:'" + v_activityid + "',userid:''}", errorFunc,
       function (data) {
           //alert($.toJSON(data));
           //alert(data.data.length)
           if (data.result == true) {
               $.each(data.data, function (i, msg) {
                   switch (msg.id) {
                       case "8695ffad-15fd-11e1-bb4e-000c295f9365": isAuditor = "1"; break; //审计员
                       case "86715257-15fd-11e1-bb4e-000c295f9365": isfinance = "1"; break; //财务员
                       case "869d272f-15fd-11e1-bb4e-000c295f9365": isoperAdmin = "1"; break; //执行管理员
                       case "8682b6c9-15fd-11e1-bb4e-000c295f9365": isTeller = "1"; break; //出纳员
                       case "86870ea5-15fd-11e1-bb4e-000c295f9365": isAccountant = "1"; break; //会计员
                       case "867e7daf-15fd-11e1-bb4e-000c295f9365": isSuperAdmin = "1"; break; //超级管理员
                       case "868de60f-15fd-11e1-bb4e-000c295f9365": isUser = "1"; break; //普通用户
                   }
               });
           }
       });
}


$('.activityList_Will').switchClick('switchover', 'li');
$('.opera').hover(function () {
    $(this).addClass('opera-hover');
    $(this).find('.operaList').show();
}, function () {
    $(this).removeClass('opera-hover');
    $(this).find('.operaList').hide();
})
$(function () {
    var type = "list";
    //listschWarp Hide&Show
    $("#listSch_Btn").click(function () {
        type = "list";
        $(this).removeClass("fCgray3").addClass("currentSch");
        $("#mapSch_Btn").removeClass("currentSch").addClass("fCgray3");
        $("#addreesSchWarp").css("display", "block");
        $("#switchBtn").removeClass("hideBox_Btn").addClass("showBox_Btn");
        $(".mapschWarp").hide();
        if ($(".listschWarp").css("display", "none")) {
            $(this).siblings($("#addreesSchWarp").find(".listschWarp").fadeIn()).addClass("currentSch");
        }
    });
    //mapschWarp Hide&Show
    $("#mapSch_Btn").click(function () {
        type = "map";
        $(this).removeClass("fCgray3").addClass("currentSch");
        $("#listSch_Btn").removeClass("currentSch").addClass("fCgray3");
        $("#addreesSchWarp").css("display", "block");
        $("#switchBtn").removeClass("hideBox_Btn").addClass("showBox_Btn");
        $(".listschWarp").hide();
        if ($(".mapschWarp").css("display", "none")) {
            $(this).siblings($("#addreesSchWarp").find(".mapschWarp").fadeIn()).addClass("currentSch");
        }
    });
    $("#switchBtn").click(function () {
        if ($(this).hasClass("hideBox_Btn")) {
            if (type == 'list') {
                $("#listSch_Btn").removeClass("fCgray3").addClass("currentSch");
                $(".listschWarp").fadeIn();
            } else {
                $("#mapSch_Btn").removeClass("fCgray3").addClass("currentSch");
                $(".mapschWarp").fadeIn();
            }
            $(this).removeClass("hideBox_Btn").addClass("showBox_Btn").siblings($("#addreesSchWarp").slideDown());
        }
        else {
            $(this).removeClass("showBox_Btn").addClass("hideBox_Btn").siblings($("#addreesSchWarp").slideUp());
            $("#listSch_Btn").removeClass("currentSch").addClass("fCgray3");
            $("#mapSch_Btn").removeClass("currentSch").addClass("fCgray3");
        }
    })
    $("#txtStartPlanDate").datetimepicker(); //活动计划开始时间
    $("#txtEndPlanDate").datetimepicker(); //活动计划结束时间
    if (urltype == "undefined" || urltype == 'null') {
        getoldactivitycount();
        pagetype = "new";
        getleftsidebar("new");
        $("#bnew").attr("class", "fCblue");
        $("#bold").attr("class", "fCgray3");
        $("#currenttitle").html("未来及现在的活动");
        $("#happraise").hide();
        $(".myhistoryMenu ul>li:gt(1)").hide();
    }
    else {
        getnewactivitycount();
        pagetype = "old";
        getleftsidebar("old");
        $("#bnew").attr("class", "fCgray3");
        $("#bold").attr("class", "fCblue");
        $("#currenttitle").html("历史活动");
        $("#happraise").show();
    }
    //setinitializestyle();

});

//样式初始化
function setinitializestyle() {
    isloadingPlan = "0";
    isPlanEdit="0";
    isloadingWeather = "0";
    isloadingLeavemessage = "0";
    iscarinfor = "0";
    isbudget = "0";
    ismoneyflow = "0";
    isfinance = "0"; //是否财务员
    isoperAdmin = "0"; //是否执行管理员
    isAuditor = "0"; //是否审计员
    isAccountant = "0"; //是否会计
    isTeller = "0"; //是否出纳
    isSuperAdmin = "0"; //是否是超级管理员
    isUser = "1";  //普通用户
    valueindexInfor = "";
    $("#myactivityBody").show();
    $("#divsetting").hide();
    $(".ACmod>h4>span").removeClass("uparrow_B").addClass("downarrow_B");
    $(".ACmod>.setMod").hide();
    $("#activityinfor").show();
    $("#divactivitydes").show();
    $("#activitymanageinfo").hide();
    if (pagetype == "new") {
        $("#speditinfor").removeClass("uparrow_B").removeClass("downarrow_B");
        setplannull();
    }
//    else if (pagetype == "old") {
//        $(".ACmod>h4>a").hide();
//    }
    if ($("#setdivactivityplan").is(":visible")) {
        $("#setdivactivityplan").hide();
    }
    getmemberlist(); //成员信息
    getcarowerlist(); //搭车信息
    selectbudgetsumandflowsum();    //查询预算和收支额度统计
}
function getactivitybyclick(obj, objtype) {
    $obj = $(obj);
    $obj.attr("class", "fCblue");
    if (objtype == "new") {
        $obj.next("a").attr("class", "fCgray3");
        $("#currenttitle").html("未来及现在的活动");
        pagetype = "new";
        getleftsidebar("new");
        $("#happraise").hide();
        $(".myhistoryMenu ul>li:gt(1)").hide();
    } else if (objtype == "old") {
        $obj.prev("a").attr("class", "fCgray3");
        $("#currenttitle").html("历史活动");
        pagetype = "old";
        getleftsidebar("old");
        $("#happraise").show();
        $(".myhistoryMenu ul>li:gt(1)").show();
    }
    setinitializestyle();
}

function getleftsidebar(pagetype) {
    $(".sidebox-pager").myPagination({
        showmore: false, //是否显示加载更多
        showpagingnav: false, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        contentid: '.activityList_Will', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: getleftsidebarinfor,
        pagermore: false,
        ajax: {
            url: 'pop_common.axd', //此处必须填写，分页已没有固定处理工厂
            param: {
                pagecurrent: 1,
                pageSize: 15,
                type: pagetype,
                opertype: 'getactivitynewandold'//操作码
            },
            info: {
                first: '', //' <a href=\"###\" class=\"next\" >',
                lastdiscls: 'disable',
                next: '', //'<a href=\"###\" ></a>',
                nextcls: 'next',
                nextdiscls: 'next-disable',
                prev: '', //'<a href=\"###\" ></a>',
                prevcls: 'prev',
                prevdiscls: 'prev-disable',
                first_on: false,
                last_on: false,
                next_on: true,
                prev_on: true,
                msg_on: false
                //tipmsg: wanerdaoLangTip('pager_00010'),
                // nodatamsg: wanerdaoLangTip('pager_00017')//当加载到最后一页时候的提示信息，只适用于"加载更多"、"显示更多"
            }
        }
    });
}

function getleftsidebarinfor(data) {
    var v_content = "暂无内容";
    var total = "0";
    if (data != null && data.rows != null && data.rows != "") {
        v_content = "";
        $.each(data.rows, function (i, msg) {
            v_content += ("<li>");
            v_content += ("<div class=\"selectMenu f_right pR\">");
            v_content += ("<div class=\"fSize-12 pR fCgray3 list-opt\" >");
            v_content += ("<div class=\"opt-button\"><span class=\"f_right\"></span>操作</div>");
            v_content += ("<div class=\"selectMain pA fCgray3\">");
            v_content += ("<p><a href=\"###\">复制活动连接</a></p>");
            //            if (pagetype == "new") {
            //                v_content += ("<p>退出</p>");
            //            }
            v_content += ("</div>");
            v_content += ("</div>");
            v_content += ("</div>");
            v_content += ("<a href=\"###\" onclick=\"getactivityinfor('" + msg.id + "','" + msg.activity_name + "')\">" + msg.activity_name + "</a>");
            v_content += ("<p class=\"fCgray3\">" + msg.begin_datetime + " - " + msg.end_datetime + "     " + msg.join_member_nbr + "/" + msg.max_nbr + "人</p>"); // getMonthAndDate(msg.begin_datetime)    getMonthAndDate(msg.end_datetime)
            v_content += ("<ul class=\"activityDetailList fCblue\">");
            v_content += ("<li><a href=\"#activityindex\" >简介</a></li>");
            v_content += ("<li><a href=\"#plan\" >计划</a></li>");
            v_content += ("<li><a href=\"#finance\" >收支财务</a></li>");
            v_content += ("<li><a href=\"#memberlist\" >成员</a></li>");
            v_content += ("<li><a href=\"#bycarinfor\" >搭车信息</a></li>");
            v_content += ("<li><a href=\"#carline\" >行车路线</a></li>");
            if (pagetype == "new") {
                v_content += ("<li><a href=\"#weather\" >天气预报</a></li>");
            }
            if (pagetype == "old") {
                v_content += ("<li><a href=\"#leavemessage\" >留言板</a></li>");
            }
            v_content += ("</ul>");
            v_content += ("<a id=\"back" + msg.id + "\" href=\"javascript:;\" class=\"icon-packup icon back\" style=\"display:none;\" title=\"缩起\"></a>");
            v_content += ("</li>");
            if (i == "0") {
                var t = getQueryString("id");
                if (t != null && t != "0") {
                    getactivityinfor(t, "");
                }
                else if (t === "0") {
                    $('.ACmod').hide();
                    $("<div id='errormsg'>" + wanerdaoLangTip('common_00028') + "</div>").appendTo($("#myactivityBody"));
                }
                else {
                    getactivityinfor(msg.id, msg.activity_name);
                }
            }
        });
        if (data.total != null && data.total != "") {
            total = data.total;            
        }
        //$(".ACmod").show();
        if (pagetype == "old") { $("#divweather").hide(); }
        /* 回缩按扭 */
               
    }
    else {
        $("#viewalbum").attr("href", "activity_album_view.html?id=0");
        $("#uploadalbum").attr("href", "activity_album_upload.html?id=0");
        $("#editphoto").attr("href", "activity_photo_edit.html?id=0");
        $("#viewmanagerblog").attr("href", "activity_blog.html?id=0");
        $(".ACmod").hide();
    }
    if (pagetotalsearch == "0") {
        if (pagetype == "new") $("#bnew").html("未来及现在的活动（" + total + "）");
        else if (pagetype == "old") $("#bold").html("历史活动（" + data.total + "）");
        pagetotalsearch == "1";
    }
    $(".activityList_Will").html(v_content);
    $('.activityList_Will .back').click(function () {
        $(this).hide().prev().stop().animate({ opacity: 'hide', height: 'hide' });
    });
}

//最新活动个数
function getnewactivitycount() {
    $.ajax({
        url: "pop_common.axd",
        type: 'POST',
        dataType: "json",
        data: {
            pagecurrent: 1,
            pageSize: 1,
            type: 'new',
            opertype: 'getactivitynewandold'//操作码
        },
        cache: false,
        timeout: 60000,
        error: function (data) {
            alert(data);
        },
        success: function (data) {
            var total = "0";
            if (data != null && data.rows != null && data.rows != "") {
                if (data.total != null && data.total != "") {
                    total = data.total;
                }
            }
            $("#bnew").html("未来及现在的活动（" + total + "）");
        }
    });

}

//历史活动个数
function getoldactivitycount() { 
    ajaxfunc("activitysetting_activity.axd", "{opertype:'getoldactivitycount',userid:'" + wd_B.uin.uid + "'}", errorFunc, getoldactivitycountFunc);
}
function getoldactivitycountFunc(data) {
    if (data != null && data.total != null && data.total != "") {
        $("#bold").html("历史活动（" + data.total + "）");
    }
    else {
        $("#bold").html("历史活动（0）");
    }
}
function getactivityinfor(id, activityName) {
    $('#back' + id).show().prev().stop().animate({ height: 'show', opacity: 'show' }); ;
    $("#errormsg").remove();
    activity_id = id;
    $('.ACmod').show();
    $("#viewalbum").attr("href", "activity_album_view.html?id="+ activity_id);
    $("#uploadalbum").attr("href", "activity_album_upload.html?id=" + activity_id);
    $("#editphoto").attr("href", "activity_photo_edit.html?id=" + activity_id);
    $("#viewmanagerblog").attr("href", "activity_blog.html?id=" + activity_id);
    setinitializestyle();
    getactivitymemberrole(id);
    ajaxfunc("index_activity.axd", "{opertype:'getactivitymaininfoforjson',activityid:'" + id + "'}", errorFunc,
       function (data) {
           var v_content = "";
           managevalue = data.data;
           var vPrepay_nbr = managevalue.SignupInfo.pay_nbr;
           var vP_nbr = "";
           if (vPrepay_nbr != null && vPrepay_nbr != "") {
               vP_nbr = vPrepay_nbr + "$";
           } else { vP_nbr = ""; }
           v_content += ("<p class=\"tBgb fSize-14\"><span class=\"f_right\">");
           v_content += ("<input type=\"button\" class=\"buttonB btn_w108 btn_h26 btnBlue_108 fSize-12\"  onclick=\"copyUrl();\" value=\"复制活动连接\" />");
           v_content += ("&nbsp;&nbsp;");
           if (pagetype == "new") {
               if (managevalue.isfollow == "0") {
                   v_content += ("<input type=\"button\" id=\"btnfollow\"  class=\"buttonB btn_w70 btn_h26 btnBlue_70 fSize-12\" value=\"+关注\" />");
               }
               else if (managevalue.isfollow == "1") {
                   v_content += ("<input type=\"button\" id=\"btnfollow\"  class=\"buttonB btn_w70 btn_h26 btnBlue_70 fSize-12\" value=\"-取消关注\" />");
               }
           }
           v_content += ("&nbsp;&nbsp;</span><b class=\"fSize-12 fCgray3 fCblue\">" + managevalue.activityname + "</b></p>");
           v_content += ("<p class=\"myact-opera\"><b class=\"fCblue\">关注度</b>&nbsp;<img src=\"../images/defucult/progressbar.jpg\" alt=\"\" />&nbsp;");
           if (pagetype == "new" && (isoperAdmin == "1" || isSuperAdmin == "1")) {
               v_content += ("<a title=\"设置\" class=\"ico icon_1\" href=\"###\" onclick=\"activityset('" + id + "', '" + managevalue.activityname + "')\"></a>");
               v_content += ("<a title=\"打印\" class=\"ico icon_2\" href=\"###\" ></a>");
               v_content += ("<a title=\"编辑\" class=\"ico icon_3\" href=\"###\"  onclick=\"editindexshow('" + id + "')\"></a>");
               v_content += ("<a title=\"退出\" class=\"ico icon_4\" href=\"###\"></a>");
               v_content += ("<a title=\"解散\" class=\"ico icon_5\" href=\"###\"></a>");
               $(".ACmod>h4>a").show();
           }
           else {
               $(".ACmod>h4>a").hide(); 
           }
           v_content += ("</p>");
           var v_creategroupname = "";
           if (managevalue.activitytags != null) {
               $.each(managevalue.activitytags, function (i, msg) {
                   v_creategroupname += msg.name + ",";
               });
               v_creategroupname = v_creategroupname.substr(0, v_creategroupname.length - 1);
           }
           v_content += ("<p><b>活动地：</b>" + managevalue.placeset.addr + "&nbsp;<b>活动时间：</b>" + getMonthAndDate(managevalue.begintime) + "-" + getMonthAndDate(managevalue.endtime) + "</p>");
           v_content += ("<p><b>活动分类：</b>" + v_creategroupname + " </p>");
           v_content += ("<p><b>发起人：</b>" + managevalue.createusername + ";<b>创建时间：</b>" + managevalue.createdatetime + "&nbsp;<b>联系电话：</b>" + managevalue.createuserphone + "&nbsp;<b>邮箱：</b>" + managevalue.createuseremail + "</p>");

           var vCondition = "";
           if (managevalue.limitcondition != null) {
               vCondition = "";
               $.each(managevalue.limitcondition, function (i, msg) {
                   vCondition += msg.value + "/";
               });
               vCondition = vCondition.substr(0, vCondition.length - 1);
           }

           var paytype = "";
           if (managevalue.SignupInfo.paymethodsinfo != null) {
               paytype = managevalue.SignupInfo.paymethodsinfo[0].pay_type_name
           }
           v_content += ("<p><b>报名截止时间：</b>" + managevalue.reportenddatetime + "&nbsp;<b>报名方式：</b>" + managevalue.SignupInfo.typename + "&nbsp;<b>报名条件：</b>" + vCondition + "</p>");
           v_content += ("<p><b>人数：</b>" + managevalue.join_member_nbr + "/" + managevalue.max_nbr + "&nbsp;<b>初始费用：</b>" + vP_nbr + "&nbsp;<b>缴费性质：</b>" + paytype + "</p>");
           var operName = "";
           var financeName = "";
           if (managevalue.operationmanager != null) {
               $.each(managevalue.operationmanager, function (i, msg) {
                   operName += msg.name + "/";
               });
               operName = operName.substr(0, operName.length - 1);
           }
           if (managevalue.financialmanager != null) {
               $.each(managevalue.financialmanager, function (i, msg) {
                   financeName += msg.name + "/";
               });
               financeName = financeName.substr(0, financeName.length - 1);
           }
           v_content += ("<p><b>管理员：</b>" + operName + "</p>");
           v_content += ("<p><b>财务员：</b>" + financeName + "</p>");
           $("#activityinfor").html(v_content);
           $("#activitydes").html(managevalue.desc);
           activity_id = id;
       });
}
/******************以下是活动简介**********************/

$("#hactivitydes").click(function () {
    var $obj = $(this).next("div");
    if ($obj.is(":hidden")) {
        $obj.show();
        $("#hactivitydes>span").removeClass("downarrow_B").addClass("uparrow_B");
    } else {
        $obj.hide();
        $("#hactivitydes>span").removeClass("uparrow_B").addClass("downarrow_B");
    }
    $("#speditinfor").removeClass("uparrow_B").removeClass("downarrow_B");

});
$("#iconctivitydes").click(function (event) {
    event.stopPropagation();
    editindexshow(activity_id);
});

function editindexshow(id) {
    $("#activityinfor").hide();
    $("#divactivitydes").hide();
    $("#activitymanageinfo").show();
    $("#setactivitymanageinfo").show();
    $("#activity_t1").initrefparam();
};

$("#btnmanageicancle").click(function () {
    $("#activityinfor").show();
    $("#divactivitydes").show();
    $("#activitymanageinfo").hide();
    $("#setactivitymanageinfo").hide();
});

//修改活动简介保存
$("#btnmanagesave").click(function () {
    managevalue.activityid = activity_id;
    managevalue.createuserphone = $("#txtactivitytelphone").val(); //电话
    managevalue.createuseremail = $("#txtactivityemail").val(); //邮箱
    managevalue.activityname = $("#txtactivityname").val(); //活动名
    managevalue.createdatetime = $("#txtCreateTime").val(); //报名时间
    managevalue.begintime = $("#txtBeginTime").val(); //开始时间
    managevalue.endtime = $("#txtEndTime").val(); //结束时间
    managevalue.desc = $("#txtareaDes").val();  //活动简介
    managevalue.operationmanager = arryoperater;
    managevalue.financialmanager = arrfinancer;

//    ajaxfunc("updateactivitymaininfo_activity.axd", "{opertype:'updateactivitymaininfo',value:" + $.toJSON(managevalue) + "}", errorFunc,
//       function (data) {
//           alert(data.msg);
//       });
//   
        $.ajax({
            url: "updateactivitymaininfo_activity.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: "updateactivitymaininfo",
                value: $.toJSON(managevalue)
            },
            cache: false,
            timeout: 60000,
            error: function (data) {
                alert(data.msg);
            },
            success: function (data) {
                alert(data.msg);
            }
        });
    

});
/******************以上是活动简介**********************/


/******************以下是活动关注**********************/

//关注活动   cancelpersonalactivityfollow
var objfollowbtn = "";
function followactivity(id, objthis, opertype) {
    objfollowbtn = objthis;
    ajaxfunc("activitycategory_follow.axd", "{opertype:'" + opertype + "',attention_id:'" + id + "'}", errorFunc, function (data) {
        var message = data.msg;
        var showtype = "1";
        if (data.result == false) {
            showtype = "0";
        }
        showfollowMessage(showtype, message,10,3);
        if (objthis.val() == "+关注" && data.result == true) {
            objthis.val("-取消关注");
        } else if (objthis.val() == "-取消关注" && data.result == true) {
            objthis.val("+关注");
        }
    });
}
function showfollowMessage(showtype, showmessage,offsetleft,offsettop) {

    var strWidth = objfollowbtn.width();
    var position = objfollowbtn.offset();
    var left = parseInt(position.left) +parseInt(strWidth)+parseInt(offsetleft);
    var top =parseInt(position.top) + parseInt(offsettop);
    var strMessage = "<span  style='color:green;font-size:14px; font-weight:bold;'>" + showmessage + "</span>";
    if (showtype == "0") {
        strMessage = "<span  style='color:red;font-size:14px; font-weight:bold;'>" + showmessage + "</span>";
    }
    $("#showMessage").html(strMessage).css("left", parseInt(left)+"px")
                 .css("top", parseInt(top)+"px").fadeIn(1000).fadeOut(4000);
}

$("#btnfollow,#btnmanagefllow").live("click", function () {
    if ($(this).val() == "+关注") {
        followactivity(activity_id, $(this), "followactivity");
    }
    else if ($(this).val() == "-取消关注") {
        followactivity(activity_id, $(this), "cancelpersonalactivityfollow");
    }
});
/******************以上是活动关注**********************/

//*******以下是活动计划**********************************************//
$("#iconactivityplan").click(function (event) {
    event.stopPropagation();
    $("#viewdivactivityplan").hide();
    $("#setdivactivityplan").show();
    getplanloading();
    setplannull();
});

$("#hactivityplan").click(function () {
    setplannull();
    var $obj = $(this).next("div");
    if ($obj.is(":hidden")) {
        if ($("#setdivactivityplan").is(":visible")) {
            $("#setdivactivityplan").hide();
            $obj.hide();
            $("#hactivityplan>span").removeClass("uparrow_B").addClass("downarrow_B");
        }
        else {
            $obj.show();
            $("#hactivityplan>span").removeClass("downarrow_B").addClass("uparrow_B");
        }
        getplanloading();
    }
    else {
        $obj.hide();
        $("#hactivityplan>span").removeClass("uparrow_B").addClass("downarrow_B");
    }

});
var arrayobj = [];
var planValue = {
    "AcitivtyId": "1111",
    "plans": [{
        "starttime": "2012/2/11 18:33:19",
        "endtime": "2012/2/12 18:33:19",
        "title": "计划2",
        "desc": "描述",
        "id": "1a2d88a2e4794ab49028e1a549e695a3"
    },
             {
                 "starttime": "2012/2/11 18:33:19",
                 "endtime": "2012/2/12 18:33:19",
                 "title": "计划5",
                 "desc": "描述",
                 "id": ""
             }
            ]
};

function getplanloading() {
    if (isloadingPlan == "0") {
        isloadingPlan = "1";
        var showopertype = "";
        var showplanmessage = "";
        if (arguments.length == 3) {
            showopertype = arguments[0];
            showplanmessage = arguments[1];
            objfollowbtn = arguments[2];
        }
        ajaxfunc("pagination_activity.axd", "{opertype:'getactivityplanmanageforjson',activityid:'" + activity_id + "'}", errorFunc,
       function (data) {
           planValue = data.data;
           var vcontent = "";
           var vcontentedit = "";
           if (planValue != null) {
               arrayobj = planValue.plans;
               if (planValue.plans != null) {
                   vcontent = getplancontentview(arrayobj);
                   if (pagetype == "new") {
                       vcontentedit = getplancontentedit(arrayobj);
                   }
               }
           }
           $("#pactivityplan").html(vcontent);
           $("#tblactivityplan").html(vcontentedit);
           if (isPlanEdit == "1") {
               isPlanEdit = "0";
               objfollowbtn = $("#btnplanadd");
               if (showfollowMessage == "删除成功") showfollowMessage(showopertype, showplanmessage, 80,3);
               else showfollowMessage(showopertype, showplanmessage,80,3);
           }
       });
    }
}

function getplancontentview(data) {
    var vcontent = "";
    $.each(data, function (i, msg) {
        vcontent += (msg.starttime + "<b>-</b>" + msg.endtime + "&nbsp;&nbsp;" + subPoints(msg.title, 25) + "&nbsp;&nbsp;" + subPoints(msg.desc, 40) + "<br />");
    });
    return vcontent;
}
function getplancontentedit(data) {
    var v_content = "";
    $.each(data, function (i, msg) {
        v_content += ("<tr>");
        v_content += ("<td title='" + msg.title + "'>" + subPoints(msg.title, 15) + "</td>");
        v_content += ("<td title='" + msg.desc + "'>" + subPoints(msg.desc, 20) + "</td>");
        v_content += ("<td>" + msg.starttime + "</td>");
        v_content += ("<td>" + msg.endtime + "</td>");
        v_content += ("<td>");
        v_content += ("<a href=\"javascript:void(0);\" onclick=\"plansingleedit('" + i + "','" + msg.id + "')\" class=\"listEdit\">&nbsp;</a> <a href=\"javascript:void(0);\" onclick=\"plansingledel('" + i + "','" + msg.id + "')\" class=\"listDel\">&nbsp;</a></td>");
        v_content += ("</tr>");
    });
    return v_content;
}

var isarrayid = "";
function updageactivityplanjson() {
    if (validationplancontent()) {
        var plansstarttime = $("#txtStartPlanDate").val();
        var plansendtime = $("#txtEndPlanDate").val();
        var plansitle = $("#txtPlanTitle").val();
        var plansdesc = $("#txtPlanDes").val();
        if (isarrayid == "") {
            var obj1 = { "starttime": plansstarttime, "endtime": plansendtime, "title": plansitle, "desc": plansdesc, "id": "" }
            if (arrayobj == null) {
                arrayobj = [];
            }
            arrayobj.push(obj1);
        }
        else {
            arrayobj[isarrayid].starttime = plansstarttime;
            arrayobj[isarrayid].endtime = plansendtime;
            arrayobj[isarrayid].title = plansitle;
            arrayobj[isarrayid].desc = plansdesc;
        }
        planValue.plans = arrayobj;
        updageactivityplanAjax($("#btnplanadd"),"保存成功");
    }
}
function updageactivityplanAjax(pbtn,pshowmessage) {

    $.ajax({
        url: "pagination_activity.axd",
        type: 'POST',
        dataType: "json",
        data: {
            opertype: "updageactivityplanjson",
            value: $.toJSON(planValue)
        },
        cache: false,
        timeout: 60000,
        error: function (data) {
            getplanloading("0", data.msg);
        },
        success: function (data) {
            //alert(data.msg);
            isPlanEdit = "1";
            isloadingPlan = "0";
            getplanloading("1", pshowmessage, pbtn);
        }
    });
}


function plansingleedit(i, id) {
    $("#txtStartPlanDate").val("");
    $("#txtEndPlanDate").val("");
    $("#txtPlanTitle").val("");
    $("#txtPlanDes").val("");
    $("#txtStartPlanDate").val(arrayobj[i].starttime);
    $("#txtEndPlanDate").val(arrayobj[i].endtime);
    $("#txtPlanTitle").val(arrayobj[i].title);
    $("#txtPlanDes").val(arrayobj[i].desc);
    isarrayid = i;
}
function plansingledel(i, id) {
    arrayobj.splice(i, 1);
    planValue.plans = arrayobj;
    updageactivityplanAjax($("#iconactivityplan"), "删除成功");
}
//清空活动计划内容
function setplannull() {
    $("#txtStartPlanDate").val("");
    $("#txtEndPlanDate").val("");
    $("#txtPlanTitle").val("");
    $("#txtPlanDes").val("");
    isarrayid = "";
}
//验证活动计划输入内容
function validationplancontent() {
    if ($("#txtStartPlanDate").val().replace(/\s/g, "") == "") {
        alert("很抱歉，计划起始时间不能为空");
        $("#txtStartPlanDate").focus();
        return false;
    }
    if ($("#txtEndPlanDate").val().replace(/\s/g, "") == "") {
        alert("很抱歉，计划结束时间不能为空");
        $("#txtEndPlanDate").focus();
        return false;
    }
    if ($("#txtPlanTitle").val().replace(/\s/g, "") == "") {
        alert("很抱歉，计划安排不能为空");
        $("#txtPlanTitle").focus();
        return false;
    }
    if ($("#txtPlanDes").val().replace(/\s/g, "") == "") {
        alert("很抱歉，计划描述不能为空");
        $("#txtPlanDes").focus();
        return false;
    }
    if ($("#txtPlanDes").val().replace(/\s/g, "").length > 200) {
        alert("很抱歉，计划描述超出200个字符，请确认！");
        $("#txtPlanDes").focus();
        return false;
    }
    return true;

}

//*******以上是活动计划************************************************//

//*******以下是天气预报************************************************//

//天气预报
var weatherData = {
    "Current": // 当天情况
            {
            "condition": "Clear", //天气情况
            "temp_c": "20", //温度 ℃
            "temp_f": "68", //
            "humidity": "Humidity: 56%", //湿度
            "wind_condition": "Wind: S at 9 mph", //风向风速
            "picPath": "http://www.google.com/ig/images/weather/sunny.gif"
        },
    "Forecasts": // 未来情况
            [{
                "condition": "Mostly Sunny", //天气情况
                "day_of_week": "Tue", //星期
                "low": "54", //最低温度
                "high": "81", //最高温度
                "picPath": "http://www.google.com/ig/images/weather/mostly_sunny.gif", //
                "DateTime": "2012/4/18"//日期
            }, { "condition": "Partly Sunny",
                "day_of_week": "Wed",
                "low": "54", "high": "82",
                "picPath": "http://www.google.com/ig/images/weather/mostly_sunny.gif",
                "DateTime": "2012/4/19"
            },
             { "condition": "Chance of Storm",
                 "day_of_week": "Thu",
                 "low": "50",
                 "high": "81",
                 "picPath": "http://www.google.com/ig/images/weather/chance_of_storm.gif",
                 "DateTime": "2012/4/20"
             },
              { "condition": "Mostly Sunny",
                  "day_of_week": "Fri",
                  "low": "52",
                  "high": "77",
                  "picPath": "http://www.google.com/ig/images/weather/mostly_sunny.gif",
                  "DateTime": "2012/4/21"
              }
               ]
};


$("#hweather").click(function () {
    var $obj = $(this).next("div");
    if ($obj.is(":hidden")) {
        if (isloadingWeather == "0") {
            isloadingWeather = "1";
            ajaxfunc("signup_activity.axd", "{opertype:'getactivityweatherinfojson', activityid: '" + activity_id + "'}", errorFunc, function (data) {
                weatherData = data.data;
                var v_content = "";
                if (weatherData != null) {
                    $.each(weatherData.Forecasts, function (i, msg) {
                        if (i < 3) {
                            v_content += ("<li>");
                            v_content += ("<div class=\"weatherDate\">" + msg.DateTime + "(" + msg.day_of_week + ")</div>");
                            v_content += ("<div class=\"weatherImg\"><img src=\"../images/defucult/weather2.jpg\" width=\"48\" alt=\"\" /><img src=\"../images/defucult/weather1.jpg\" width=\"48\" alt=\"\" /></div>");
                            v_content += ("<div class=\"weatherMain\">" + msg.condition + "  " + msg.low + "/" + msg.high + "°C</div>");
                            v_content += ("</li>");
                        }
                    });
                }
                $("#ulweatherlist").html(v_content);
            });
        }
        $obj.show();
        $("#hweather>span").removeClass("downarrow_B").addClass("uparrow_B");
    } else {
        $obj.hide();
        $("#hweather>span").removeClass("uparrow_B").addClass("downarrow_B");
    }
});

//*******以上是天气预报************************************************//

//*******以下是留言板************************************************//
$("#hleavemessage").click(function () {
    var $objDiv = $(this).next("div");
    if ($objDiv.is(":hidden")) {
        $objDiv.show();
        $("#hleavemessage>span").removeClass("downarrow_B").addClass("uparrow_B");
        if (isloadingLeavemessage == "0") {
            isloadingLeavemessage = "1";
            $("#imgUserlogo").attr("title", wd_B.uin.name);
            $("#imgUserlogo").attr("src", wd_B.uin.small_logo);
            $("#imgUserlogo").attr("alt", wd_B.uin.name);
            getleavmessage(activity_id);
        }
    }
    else {
        $objDiv.hide();
        $("#hleavemessage>span").removeClass("uparrow_B").addClass("downarrow_B");
    }
});

//*******以上是留言板************************************************//

//*******以下是活动设置************************************************//
function activityset(activityid, activityname) {
    activity_id = activityid;
    $("#myactivityBody").hide();
    $("#divsetting").show();
    $("#bsetactivityname").html(activityname + "_活动设置");
    $("#txtcontact_email").val("");
    $("#is_email_event").attr("checked", false);
    $("#is_notice_event").attr("checked", false);
    $("#is_email_updates").attr("checked", false);
    $("#is_notice_updates").attr("checked", false);
    $("#drpUserName").empty();
    var strUserContent = "";
    $.ajax({
        url: "activitysetting_activity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getactivitysetting',activity_id:'" + activity_id + "'}",
        error: function (data) { },
        success: function (data) {
            if (data.rows) {
                $("#txtcontact_email").val(data.rows[0].contact_email);
                if (data.rows[0].is_email_event.toLowerCase() == "true") $("#is_email_event").attr("checked", true);
                if (data.rows[0].is_notice_event.toLowerCase() == "true") $("#is_notice_event").attr("checked", true);
                if (data.rows[0].is_email_updates.toLowerCase() == "true") $("#is_email_updates").attr("checked", true);
                if (data.rows[0].is_notice_updates.toLowerCase() == "true") $("#is_notice_updates").attr("checked", true);
            }
            if (data.rowsUser) {
                var strContent = "<option  value=\"0\">请选择</option>";
                $.each(data.rowsUser, function (i, msg) {
                    strUserContent += "<option  value=\"" + msg.user_ID + "\">" + msg.name + "</option>";
                });
                $("#drpUserName").html(strUserContent);
                $(".duration").chosen();
            }
        }
    });
}

//活动设置保存
$("#btnsetsave").click(function () {
    //    var pars = "{opertype:'saveactivitysetting',activity_id:'" + activity_id + "',contact_email:'" + $("#txtcontact_email").val() + "',is_email_event:'" + (!!($("#is_email_event").attr("checked")) == true ? "1" : "0") + "',is_notice_event:'" + (!!($("#is_notice_event").attr("checked")) == true ? "1" : "0") + "',is_email_updates:'" + (!!($("#is_email_updates").attr("checked")) == true ? "1" : "0") + "',is_notice_updates:'" + (!!($("#is_notice_updates").attr("checked")) == true ? "1" : "0") + "'}";
    //    $.ajax({
    //        url: "activitysetting_activity.axd",
    //        type: "POST",
    //        dataType: "json",
    //        cache: false,
    //        data: pars,
    //        error: function (data) { },
    //        success: function (data) {
    //            alert("保存成功");
    //        }
    //    })

    activitysetupdate();
});

//活动设置取消
$("#btbsetcancel").click(function () {
    $("#myactivityBody").show();
    $("#divsetting").hide();
});





var array = [];
var activitysettingValue = {
    "id": '', //主键
    "user_id": wd_B.uin.uid, //
    "user_email": $("#txtcontact_email").val(), //用户邮箱地址
    "activity_id": activity_id, //
    "is_kick_protected": false, //是否启动搭车踢人防护
    "kick_carpool_duration": "", //踢人防护周期
    "contact_email": $("#txtcontact_email").val(), //联系邮箱
    "is_email_event": !!($("#is_email_event").attr("checked")), //是否通过邮件接受重要通知
    "is_notice_event": !!($("#is_notice_event").attr("checked")), //是否通过站内信息接受重要通知
    "is_email_updates": !!($("#is_email_updates").attr("checked")), //是否通过邮件接受即时更新
    "is_notice_updates": !!($("#is_notice_updates").attr("checked")), //是否通过站内信息接受即时圈子更新
    "is_email_digest": !!($("#is_email_digest").attr("checked")), //是否通过邮件接受圈子简要
    "is_notice_digest": !!($("#is_notice_digest").attr("checked")), //是否通过站内信息接受圈子摘要
    "digest_duration": $("#timeSpan").val(), //接受圈子更新简要时间间隔
    "is_allow_msg": true, //是否允许短消息
    "persons": [  //例外名单
                    {"id": "111121", "name": "人名1" },
				    { "id": "11112", "name": "人名2" },
                    { "id": "11113", "name": "人名3" }
			    ]
};

function activitysetupdate() {
    //activitysettingValue.persons = array;
    $.ajax({
        url: "pagination_activity.axd",
        type: 'POST',
        dataType: "json",
        data: {
            opertype: "updatepersongactivitysettings",
            value: $.toJSON(activitysettingValue)
        },
        cache: false,
        timeout: 60000,
        error: function (data) {
            alert(data.msg);
        },
        success: function (data) {
            alert(data.msg);
        }
    });
}


function getpersongactivitysettingsjosnforjson() {
    $.ajax({
        url: "pagination_activity.axd",
        type: 'POST',
        dataType: "json",
        data: {
            opertype: "getpersongactivitysettingsjosnforjson",
            activityid: activity_id,
            userid: wd_B.uin.uid
        },
        cache: false,
        timeout: 60000,
        error: function (data) {
            alert(data);
        },
        success: function (data) {
            alert($.toJSON(data));
            activitysettingValue = data.data;
        }
    });
}

//*******以上是活动设置************************************************//


//*******以下是搭车信息************************************************//
$("#hbycarinfor").click(function () {
    var $obj = $(this).next("div");
    if ($obj.is(":hidden")) {
        $obj.show();
        $("#hbycarinfor>span").removeClass("downarrow_B").addClass("uparrow_B");
        if (iscarinfor == "0") {
            $("#activity_t5").selfsignupparam(); //搭车报名
            iscarinfor = "1";
        }
    } else {
        $obj.hide();
        $("#hbycarinfor>span").removeClass("uparrow_B").addClass("downarrow_B");
    }
});

//获取成员搭车信息
function getcarowerlist() {
    $("#divbycarlist").myPagination({
        showmore: false, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        contentid: '', //#actList此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: getcarowerlistinfor,
        pagermore: true,
        ajax: {
            url: 'pop_common.axd', //此处必须填写，分页已没有固定处理工厂
            param: {
                pagecurrent: 1,
                pageSize: 15,
                activityid: activity_id,
                opertype: 'getcarowerlist'//操作码
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
}
function getcarowerlistinfor(data) {
    var v_content = "<tr class=\"memberHead fCblue\"><td width=\"36\">&nbsp;</td><td align=\"center\">头像</td><td align=\"center\">姓名</td><td>角色图标</td><td>联系方式</td><td>费用方式</td><td>操作</td><td></td></tr>";
    if (data.result == true && data.rows != null && data.rows != "") {
        $.each(data.rows, function (i, msg) {
            v_content += ("<tr>");
            v_content += ("<td align=\"center\"></td>");
            v_content += ("<td align=\"center\"><img src=\"../images/defucult/48-48.jpg\" width=\"38\" height=\"38\"  alt=\"\" /></td>");
            v_content += ("<td align=\"center\"><span class=\"roleName\">我自己</span></td>");
            v_content += ("<td>深圳市南山区凯丽花园<a href=\"#\">[地图]</a></td>");
            v_content += ("<td>13811201120</td>");
            v_content += ("<td>现金支付</td>");
            v_content += ("<td><div class=\"opera\"> <a href=\"javascript:void(0);\" class=\"operaicon\"></a>");
            v_content += ("<ul class=\"operaList\">");
            v_content += ("<li><a href=\"javascript:void(0);\"><b>批准</b></a></li>");
            v_content += ("<li><a href=\"javascript:void(0);\">拒绝</a></li>");
            v_content += ("</ul>");
            v_content += ("</div></td>");
            v_content += ("<td><span class=\"delBtn\" style=\"width:16px; height:16px; display:block;\"></span></td>");
            v_content += ("</tr>");
        });
    }
    $("#tbbycar").html(v_content);
    $("#sbycarCurrentTotal").html("（" + data.total + "）");
    $("#sbycarTotal").html("（" + data.total + "）");
}


//*******以上是搭车信息************************************************//

 
//*******以下是成员列表信息************************************************//
$("#hmemberlist").click(function () {
    var $obj = $(this).next("div");
    if ($obj.is(":hidden")) {
        $obj.show();
        $("#hmemberlist>span").removeClass("downarrow_B").addClass("uparrow_B");
        //        if (ismemberlist == "0") {
        //            ismemberlist = "1";
        //            getmemberlist();
        //        }
    } else {
        $obj.hide();
        $("#hmemberlist>span").removeClass("uparrow_B").addClass("downarrow_B");
    }
});
function getmemberlist() {
    $("#divmemberlist").myPagination({
        showmore: false, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        contentid: '', //#actList此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: getmemberlistinfor,
        pagermore: true,
        ajax: {
            url: 'memberlist_common.axd', //此处必须填写，分页已没有固定处理工厂
            param: {
                pagecurrent: 1,
                pageSize: 15,
                activityid: activity_id,
                opertype: 'getactivitymemberpaging'//操作码
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
}
function getmemberlistinfor(data) {
    var v_content = "<tr class=\"memberHead fCblue\"><td width=\"36\">&nbsp;</td><td align=\"center\">头像</td><td>姓名</td><td>角色图标</td><td>费用</td><td>交通</td><td>距离</td><td>出发地</td><td>加入时间</td><td>操作</td></tr>";
    if (data.result == "True" && data.rows != null && data.rows != "") {
        $.each(data.rows, function (i, msg) {
            v_content += ("<tr>");
            v_content += ("<td align=\"center\"><input type=\"checkbox\"  /></td>");
            v_content += ("<td align=\"center\"><a target=\"_bank\" href=\"/personal/personal_info.html?uid=" + msg.user_id + "\"><img src=\"" + msg.logo_small_path + "\" width=\"38\" height=\"38\"  alt=\"\" /></a></td>");
            v_content += ("<td ><span class=\"roleName\">" + msg.user_name + "</span></td>");
            v_content += ("<td><img src=\"../images/icons/role1.jpg\" alt=\"\" /></td>");
            v_content += ("<td><div class=\"submited\">" + msg.type_name + "</div></td>");
            var v_carpool = "有车/愿意提供";
            if (msg.is_need_carpool == "False") v_carpool = "自行前往";
            v_content += ("<td>" + v_carpool + "</td>");
            v_content += ("<td>" + msg.distance + "</td>");
            v_content += ("<td>" + msg.address + "</td>");
            v_content += ("<td>" + getMonthAndDate(msg.join_date) + "</td>");
            v_content += ("<td><div class=\"opera\"> <a href=\"javascript:void(0);\" class=\"operaicon\"></a>");
            v_content += ("<!--- <a href=\"javascript:void(0);\" class=\"icon icon-edit\"></a>-->");
            v_content += ("<ul class=\"operaList\">");
            //if (wd_B.uin.uid == msg.user_id) { }
            v_content += ("<li><a href=\"javascript:void(0);\"><b>批准</b></a></li>");
            v_content += ("<li><a href=\"javascript:void(0);\">拒绝</a></li>");
            v_content += ("</ul>");
            v_content += ("</div></td>");
            v_content += ("</tr>");
        });
    }
    $("#tbmember").html(v_content);
    $("#sCurrentTotal").html("(" + data.total + ")");
}
//*******以上是成员列表信息************************************************//

//*******以下是收支财务************************************************//
$("#hfinance").click(function () {
    var $obj = $(this).next("div");
    if ($obj.is(":hidden")) {
        $obj.show();
        $("#hfinance>span").removeClass("downarrow_B").addClass("uparrow_B");
        initializebudget();
    } else {
        $obj.hide();
        $("#hfinance>span").removeClass("uparrow_B").addClass("downarrow_B");
    }
});


function initializebudget() {
    $("#afinancebudget").attr("class", "current");
    $("#afinancecurrent").removeClass("current");
    if ($("#divbudget").is(":hidden")) $("#divbudget").show();
    //if ($("#divcurrentfinance").is(":visible")) $("#divcurrentfinance").hide();
    if ($("#divmoneyflow").is(":visible")) $("#divmoneyflow").hide();
    if (isbudget == "0") {
        isbudget = "1";
        if (isfinance == "1" || isSuperAdmin == "1") {
            $("#activity_t6").basebudetparam();
        }
        getactvitybudgetpageformanage();
    }
}
//预算收支项目
$("#afinancebudget").click(function () {
    initializebudget();
});
//实际收支项目
$("#afinancecurrent").click(function () {
    $(this).attr("class", "current");
    $("#afinancebudget").removeClass("current");
    if ($("#divbudget").is(":visible")) $("#divbudget").hide();
    //if ($("#divcurrentfinance").is(":hidden")) $("#divcurrentfinance").show();
    if ($("#divmoneyflow").is(":hidden")) $("#divmoneyflow").show();
    if (ismoneyflow == "0") {
        ismoneyflow = "1";
        $("#activity_t7").moneyflowparam();
        getactivitymoneyflowmanageforjson();
    }
});

//查询预算和收支额度统计
function selectbudgetsumandflowsum() {
    ajaxfunc("selectbudgetsumandflowsum_activity.axd", "{opertype:'selectbudgetsumandflowsum',activityid:'" + activity_id + "'}", errorFunc, function (data) {
        var v_budget_count = "0";
        var v_flow_count = "0";
        if (data.result == "True") {
            if (data.budget_count == "") v_budget_count = "0";
            else v_budget_count = data.budget_count;
            if (data.flow_count == "") v_flow_count = "0";
            else v_flow_count = data.flow_count
        }
        $("#sfinancebudget").html("（" + v_budget_count + "$）");
        $("#sfinanceflow").html("（" + v_flow_count + "$）");
        $("#sfinancebalance").html("（" + parseFloat(parseFloat(v_budget_count) - parseFloat(v_flow_count)) + "$）");

    });
}

//*******以上是收支财务************************************************//

//*******以下是行车路线************************************************//
/*
2012-9-20 徐蓓添加
*/
//加载行车路线，param格式为{ origin: "中国江苏省徐州", dest: "中国江苏省南京" }
function renderRouteMap(param) {
    var $memList = $("#memberlineList").html('<li class="moveL"></li>');
    var $li;
    $.each(param, function (i, item) {
        $li = $('<li>' + item.name + '</li>').css("cursor", "pointer");
        $li.click(function () {
            $memList.find("li").removeClass("selected");
            $(this).addClass("selected");
            $("#mainMap").wanerdaomap(item);
        });
        $memList.append($li);
    });
    $memList.append('<li class="moveR"></li>');

    $memList.find("li").eq(1).addClass("selected");
    $("#mainMap").wanerdaomap(param[0]);
}

//点击名字切换路线
$("#routeMap").click(function () {
    var $obj = $(this).next("div");
    if ($obj.is(":hidden")) {
        $obj.show();
        $("#routeMap>span").removeClass("downarrow_B").addClass("uparrow_B");

        //传入参数的格式
        var param = [{ name: "徐蓓1", origin: "中国江苏省徐州", dest: "中国江苏省南京 " }, { name: "徐蓓2", origin: "中国江苏省苏州", dest: "中国江苏省南京 " },
        { name: "徐蓓2", origin: "中国江苏省苏州", dest: "中国江苏省南京 " }, { name: "徐蓓2", origin: "中国江苏省苏州", dest: "中国江苏省南京 " }, { name: "徐蓓2", origin: "中国江苏省苏州", dest: "中国江苏省南京 " }, { name: "徐蓓2", origin: "中国江苏省苏州", dest: "中国江苏省南京 " }
        , { name: "徐蓓2", origin: "中国江苏省苏州", dest: "中国江苏省南京 " }, { name: "徐蓓2", origin: "中国江苏省苏州", dest: "中国江苏省南京 " }, { name: "徐蓓2", origin: "中国江苏省苏州", dest: "中国江苏省南京 "}];
        renderRouteMap(param);

    } else {
        $obj.hide();
        $("#routeMap>span").removeClass("uparrow_B").addClass("downarrow_B");
    }
});
//*******以上是行车路线************************************************//