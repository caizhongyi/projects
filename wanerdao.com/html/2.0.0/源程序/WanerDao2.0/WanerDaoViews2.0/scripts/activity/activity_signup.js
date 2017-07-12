var id = ""; var otype = "{opertype:'{0}'}";
if (getQueryString("id") != null && getQueryString("id") != "undefined") {
    id = getQueryString("id");
}
$(function () {
    ajaxfuncbyloading("signup_activity.axd", "{opertype:'activityindexpage',id:'" + id + "'}", "#activityInfor", errorFunc, successActivityInforFunc);
});
var zip = "";
var countryid = "";
var stateid = "";
var cityid = "";
var address = "";
var phone = "";
var email = "";
function successActivityInforFunc(data) {
    var vRootimgpath = data.data.rootimgpath;
    var vImgLogo = data.data.logo;
    var vImgSrc = "";
    if (vImgLogo != null && vImgLogo != "") {
        vImgSrc = vRootimgpath + vImgLogo;
    } else { vImgSrc = vRootimgpath + "secitionpage/define.jpg"; }
    var strContent = "";
    strContent += ("<div class=\"event_plan\">");
    strContent += ("<p class=\"event_plan_l\"><img width=\"110\" height=\"100\" src=\"" + vImgSrc + "\"></p>");
    strContent += ("<div class=\"event_plan_r\">");
    strContent += ("<h2>" + data.data.activity_name + "</h2>");
    strContent += ("<table width=\"99%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">");
    strContent += ("<tbody>");
    strContent += ("<tr height=\"22\">");
    strContent += ("<td colspan=\"3\"><b>活动地点：</b>" + data.data.address + "</td>");
    strContent += ("</tr>");
    strContent += ("<tr height=\"22\">");
    strContent += ("<td width=\"30%\"><b>发起人：</b>" + data.data.create_name + "</td>");
    strContent += ("<td width=\"34%\"><b>报名截止时间：</b>" + DateFormat(data.data.report_end_datetime, "yyyy-MM-dd") + "</td>");
    strContent += ("<td width=\"36%\"><b>报名方式：</b>" + data.data.apply_type_name + "</td>");
    strContent += ("</tr>");
    strContent += ("<tr height=\"22\">");
    strContent += ("<td><b>人数：</b>" + data.data.join_member_nbr + "/" + data.data.max_nbr + "</td>");
    var vPrepay_nbr = data.data.prepay_nbr;
    var vP_nbr = "0";
    if (vPrepay_nbr != null && vPrepay_nbr != "") {
        vP_nbr = data.data.prepay_nbr + "$";
    }
    strContent += ("<td><b>初始费用：</b>" + vP_nbr + "$</td>");
    var vPayMethods = "";
    if (data.data.PayMethods != null) {
        $.each(data.data.PayMethods, function (i, msg) {
            vPayMethods += (msg.pay_type_name + "&nbsp;/");
        });
        vPayMethods = vPayMethods.substr(0, vPayMethods.length - 1);
    }
    if (vPayMethods === "&nbsp;") {
        vPayMethods = "暂无缴费信息";
    }
    strContent += ("<td><b>缴费性质：</b>" + vPayMethods + "</td>");
    strContent += ("</tr>");
    strContent += ("</tbody>");
    strContent += ("</table>");
    strContent += ("</div>");
    strContent += ("</div>");
    //报名条件
    var vJoinConditions = "";
    if (data.data.JoinConditions != null && data.data.JoinConditions != "") {
        $.each(data.data.JoinConditions, function (i, msg) {
            vJoinConditions += (msg.name + ":" + msg.value) + "&nbsp;/";
        });
        vJoinConditions = vJoinConditions.substr(0, vJoinConditions.length - 1);
    }
    if (vJoinConditions.length === 0) {
        vJoinConditions = "没有报名限制";
     }
    strContent += ("<p class=\"plan_info\"><span>报名条件：</span>"+vJoinConditions+"</p>");
    strContent += ("<p class=\"plan_info\" title='" + data.data.description + "'><span>活动描述：</span>" + subPoints(data.data.description,280) + "</p>");
    strContent += ("<p class=\"plan_info\"><span>活动计划：</span>");
    var strPlanContent = "";
    if (data.data.ActivityPlan != null && data.data.ActivityPlan != "") {
        $.each(data.data.ActivityPlan, function (i, msg) {
            strPlanContent += (msg.start_date + "&nbsp;" + msg.plan_content) + "<br/>";
        });
    }
    strContent += strPlanContent+"</p>";

    var strBudget =0;
    if (data.data.ActivityBudget != null && data.data.ActivityBudget != "") {
        $.each(data.data.ActivityBudget, function (i, msg) {
            strBudget += msg.budget_money;
        });
     }
    strContent += ("<p class=\"plan_info\"><span>活动预算：</span>" + strBudget + "$</p>");
    strContent += ("<p class=\"join_event_plan\"><a href='javascript:;'  onclick=\"validpass(" + data.data.apply_pass.length + ")\" class=\"join-button button\">参加活动</a>&nbsp;&nbsp;<a href='javascript:;'  onclick='copyUrl();' class=\"gay-button_110x28 button\">复制活动链接</a></p>");
    $("#activityInfor").html(strContent);
}
var isloading = "0";
function validpass(p) {
    if (p>0) {
        new authorization({
            params: {
                keyid: id, //后台所要检索的ID
                optype: 'checkauthorization', //操作码
                urlaxd: 'index_activity.axd' //所用axd文件
            },
            callback: function (data) {
                displaysignup();
            }
        });
    }
    else {
        displaysignup();
    }
}
function displaysignup() {
    if ($("#activityPlanInfor").is(":hidden")) { $("#activityPlanInfor").show(); }
    else { $("#activityPlanInfor").hide(); }
    if (isloading =="0") {
        isloading = "1";        
        $("#activity_t4").inviter();//邀请
        $("#activity_t5").selfsignupparam(); //搭车报名
        activityBudget(); //费用交纳
        ajaxfunc("signup_activity.axd", "{opertype:'getcreateactivitypersonalinfo'}", function (data) { }, function (data) {
            countryid = data.data.countryid;
            stateid = data.data.stateid;
            cityid = data.data.cityid;
            zip = data.data.zip;
            address = data.data.address;
            phone = data.data.phone;
            email = data.data.email;
            $("#txtPhone").val(data.data.phone); $("#txtEmail").val(data.data.email); $("#txtAcArea").val(data.data.address);
        });
        $("#chkStartAddressdd").click(function () {
            if ($(this).attr("checked")) {
                if ($("#txtAcArea").val().length > 60) {
                    new pop({ titleid: 'common_00022', typename: 'error', msginfo: wanerdaoLangTip("common_00092").replace("{0}",60) });
                    return false;
                }
                else {
                    ajaxfunc("signup_activity.axd", "{opertype:'setuseraddressinfo',address:'" + $("#txtAcArea").val() + "'}", function (data) { }, function (data) {
                        if (!data.result) {
                            new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.data });
                            return false;
                        }
                    });
                }
            }
            else {
                ajaxfunc("signup_activity.axd", "{opertype:'setuseraddressinfo',address:'" + address + "'}", function (data) { }, function (data) {
                    if (!data.result) {
                        new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.data });
                        return false;
                    }
                });
            }
        });
        $("#chkLink").click(function () {
            if ($(this).attr("checked")) {
                if ($("#txtEmail").val().length > 20) {
                    new pop({ titleid: 'common_00022', typename: 'error', msginfo: wanerdaoLangTip("common_00092").replace("{0}", 20) });
                    return false;
                }
                else if ($("#txtPhone").val().length > 20) {
                    new pop({ titleid: 'common_00022', typename: 'error', msginfo: wanerdaoLangTip("common_00092").replace("{0}", 20) });
                    return false;
                }
                else {
                    ajaxfunc("signup_activity.axd", "{opertype:'setusercontactinfo',email:'" + $("#txtEmail").val() + "',phone:'" + $("#txtPhone").val() + "'}", function (data) { }, function (data) {
                        if (!data.result) {
                            new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.data });
                            return false;
                        }
                    });
                }
            }
            else {
                ajaxfunc("signup_activity.axd", "{opertype:'setusercontactinfo',email:'" + email + "',phone:'" + phone + "'}", function (data) { }, function (data) {
                    if (!data.result) {
                        new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.data });
                        return false;
                    }
                });
            }
        });
    }
}


//费用列表
function activityBudget() {
    ajaxfunc("signup_activity.axd", "{opertype:'searchactivitybudgetbyactivityid',id:'" + id + "'}", function (data) { }, function (data) {
        var vContent = "";
        var vTotal = "0";
        $.each(data.ActivityBudget, function (i, msg) {
            vTotal = parseFloat(vTotal) + parseFloat(msg.budget_money);
            vContent += ("<tr>");
            vContent += ("<th valign=\"top\" scope=\"row\"><b>序号：</b>"+(i+1)+"</th>");
            vContent += ("<td><i><b>收支名目：</b>" + msg.item_content + "</i> <i><b>预算收支金额：</b>" + msg.budget_money + "$</i><br>");
            vContent += ("<i><b>操作人名：</b>" + msg.username + "</i> <i><b>财务人名：</b>" + msg.username + "</i></td>");
            vContent += ("<td valign=\"bottom\">" + msg.create_date + "</td>");
            vContent += ("</tr>");
        });
        $("#tb_payment").html(vContent);
        $("#totalMoney").html("金额计算：" + vTotal + "$");
    });
}


var value = {
    "id": "",
    "recommenduserid": "", //推荐人ID
    "activityid": "b5812b975fac4ef697b50df3d52fc7a0",
    "userid": "12345", //如果不填 默认为当前登录用户
    "username": "", //可不填写
    "roleid": "", //如果不填 默认为普通用户
    "rolename": "", //可不填写
    "vehicletype": {
        "vehicletypeid": "11111",
        "isauto": true,
        "providercar": {
            "ispermit": true,
            "bycarusers": [
				        { "userid": "11111", "username": "乘车人名字1" },
				        { "userid": "11112", "username": "乘车人名字2" }
			        ],
            "carpooltypeid": "11111",
            "carpoolmoney": 12.5,
            "autobrandid": "11111",
            "automodelid": "11111",
            "autoplate": "110",
            "autoyear": "2001",
            "carpoolnbr": 4
        },
        "bycar": {
            "isneedcarpool": true,
            "carpoolid": "", //搭车人号 如果不填写默认当前登录用户
            "providercarpoolid": "11111" //车主人号
        }
    },
    "startaddress": {
        "address": "湖南省长沙市",
        "countryid": "11111",
        "stateid": "11111",
        "cityid": "11111",
        "zip": "0731"
    },
    "contact": {
        "phone": "15873181478",
        "email": "111@qq.com"
    },
    "paystatus": "11111",
    "invite": {
        "isallgroup": false,
        "isallfriend": false,
        "groupinvite": [
				    { "id": "11111", "name": "圈子1" },
				    { "id": "11112", "name": "圈子2" }
			    ],
        "friendinvite": [
				    { "id": "11111", "name": "好友1" },
				    { "id": "11112", "name": "好友2" }
			    ]
    }
};


function activitysignup() {
    if ($("#txtAcArea").val().length > 60) {
        new pop({ titleid: 'common_00022', typename: 'error', msginfo: wanerdaoLangTip("common_00092").replace("{0}", 60) });
        return false;
    }
    if ($("#txtPhone").val().length > 20) {
        new pop({ titleid: 'common_00022', typename: 'error', msginfo: wanerdaoLangTip("common_00092").replace("{0}", 20) });
        return false;
    }
    if ($("#txtEmail").val().length > 20) {
        new pop({ titleid: 'common_00022', typename: 'error', msginfo: wanerdaoLangTip("common_00092").replace("{0}", 20) });
        return false;
    }
    value.activityid = id;
    value.userid = wd_B.uin.uid;
    value.startaddress.address = $("#txtAcArea").val();
    value.startaddress.countryid = countryid;
    value.startaddress.stateid = stateid;
    value.startaddress.cityid = cityid;
    value.startaddress.zip = zip;
    value.contact.phone = $("#txtPhone").val().replace(/\s/g, "");
    value.contact.email = $("#txtEmail").val().replace(/\s/g, "");
    var vehicletypeid = $("#drpvehicletype").children('option:selected').val()
    if (vehicletypeid != -1) {
        value.vehicletype.vehicletypeid = $("#drpvehicletype").children('option:selected').val();
    }
    if (vehicletypeid == "0329e2cc-8ae2-11e1-a95e-101f74b66417") {
        var isauto = $("#drpishavecar").children('option:selected').val() == "1" ? true : false;
        value.vehicletype.isauto = isauto;
        if (isauto == true) {
            var ispermit = $("#drphavecar").children('option:selected').val() == "1" ? true : false;
            value.vehicletype.providercar.ispermit = ispermit;
            if (ispermit == true) {
                var takeFare = $("#takeFare").children('option:selected').val(); //
                if (takeFare != "-2") {
                    value.vehicletype.providercar.carpooltypeid = takeFare;
                    if (value == "a0a72d9f-599e-11e1-9350-101f74b66417") { //车主定价
                        $("#carpooltypeid").val()
                        value.vehicletype.providercar.carpoolmoney = $("#carpooltypeid").val();
                    }
                }
                var licensePlate = $("#licensePlate").children('option:selected').val();
                if (licensePlate != "-2") {
                    value.vehicletype.providercar.autobrandid = licensePlate;
                    var model = $("#model").children('option:selected').val();
                    if (model == "-2") {
                        value.vehicletype.providercar.automodelid = model;
                        value.vehicletype.providercar.autoplate = $("#autoplate").val();
                    }
                }
                value.vehicletype.providercar.autoyear = $("#autoyear").val();
                value.vehicletype.providercar.carpoolnbr = $("#carpoolnbr").val();
            }
        }

    }
    
    $.ajax({
        url: "activitysignup_activity.axd",
        type: 'POST',
        dataType: "json",
        data: {
            opertype: "activitysignup",
            value: $.toJSON(value)
        },
        cache: false,
        timeout: 60000,
        beforeSend: function () {
            $('#btnactivitysignup').removeClass().addClass("buttonB btn_w163 btn_h36 btnGary_163 fSize-14").attr("disabled", true); 
            $('#btnactivitysignup').notice("数据提交中...", 2);
        },
        error: function (data) {
            $('#btnactivitysignup').unnotice(2);
            $('#btnactivitysignup').notice(data.msg, 2);
            $('#btnactivitysignup').removeClass().addClass("buttonB btn_w135 btn_h36 btnBlue_135 fSize-14").attr("disabled", false);
        },
        success: function (data) {
            //{"result":false,"data":"\r\n        您已经已经参加了此活动\r\n    "}
            $('#btnactivitysignup').removeClass().addClass("buttonB btn_w135 btn_h36 btnBlue_135 fSize-14").attr("disabled", false);
            $('#btnactivitysignup').unnotice(2);
            if (data.result == false) {                                
                $('#btnactivitysignup').notice(data.data, 2);                
                //alert(data.data);
            } else if (data.result == true) {
                $('#btnactivitysignup').notice(data.msg, 2);
                location.href = "/activity/activity_myactivity.html";
            }
        }
    });
}




 
 