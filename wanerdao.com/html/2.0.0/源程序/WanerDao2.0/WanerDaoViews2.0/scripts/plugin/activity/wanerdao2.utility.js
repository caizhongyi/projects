//获取table的tr集合。id为table的id，trindex为从第几行获取tr集合
function gettabletrs(id, trindex) {
    $("#" + id + " tr:gt(" + trindex + ")");
}
//计划
function parsespantoarrayplan(obj) {
    var array = [];
    $.each(obj, function (i, n) {
        var o = $(obj[i]);
        var s = o.find("td:eq(2)").text();
        var vday = s.substring(0, s.indexOf("("));
        var vv = s.substring(s.indexOf("(") + 1, s.indexOf(")")).split("-");
        var obj1 = { starttime: vday + " " + vv[0], endtime: vday + " " + vv[1], title: o.find("td:eq(0)").text(), desc: o.find("td:eq(1)").text() };
        array.push(obj1);
    });
    return array;
}
//财务
function parsespantoarraybudget(obj) {
    var array = [];
    $.each(obj, function (i, n) {
        var o = $(obj[i]);
        var cost = o.find("td:eq(2)").text();
        var obj1 = { receipt: o.find("td:eq(1)").text(), budgetcost: parseFloat(cost.substring(0, cost.length - 1)),  budgetdesc: o.find("td:eq(4)").text() };
        array.push(obj1);
    });
    return array;
}
function parsespantoarray(obj) {
    var array = [];
    $.each(obj, function (i, n) {
        //var o = { id: obj[i], name: obj[i].text() };
        var o = $(obj[i]);
        var obj1 = { id: o.attr("id"), name: o.text() };
        array.push(obj1);
    });
    return array;
}
function activitycreate(typestring,objbutton) {
    var createtype =  $("#ddlactivitycreater").children('option:selected').val();
    if ($("#ddlactivitycreater").children('option:selected').val() === "02fbb8fc-599c-11e1-9350-101f74b66417") {
        if ($("#ddlactivitygrouplist").children('option:selected').val() === "-2") {
                new pop({ titleid: 'common_00022', typename: 'error',
                    msginfo: wanerdaoLangTip('active_00058')
                });
                return false;
            }
            else {
                createtype += "|" + $("#ddlactivitygrouplist").children('option:selected').val();
            }
    }
    //判断定制周期是否被选择
//    if ($("#customCycleSwitch").attr("checked")===undefined) {
//        new pop({ titleid: 'common_00022', typename: 'error',
//            msginfo: wanerdaoLangTip('active_00059')
//        });
//        return false;
//    }
    //设定地址
    if ($("#addressSetSwitch").attr("checked")) {
        if ($("#txtactivityaddress").val() === "") {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: wanerdaoLangTip('active_00060')
            });
            return false;
        }
        if ($("#txtarea").val() === "") {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: wanerdaoLangTip('active_00061')
            });
            return false;
        }
    }
    else {
        new pop({ titleid: 'common_00022', typename: 'error',
            msginfo: wanerdaoLangTip('active_00062')
        });
        return false;
    }
    //设定活动参数
    if ($("#activityparamSwitch").attr("checked")) {
        if ($("#txtactivitystartday").val() === "") {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: wanerdaoLangTip('active_00063')
            });
            return false;
        }
        if ($("#txtactivityendday").val() === "") {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: wanerdaoLangTip('active_00064')
            });
            return false;
        }
        if ($("#divaclist li:first-child").length<=0) {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: wanerdaoLangTip('active_00065')
            });
            return false;
        }
        if ($("#txtactivitytitle").val().length <= 0|$("#txtactivitytitle").val()===wanerdaoLangTip('active_00056')) {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: wanerdaoLangTip('active_00066')
            });
            return false;
        }
        if ($("#txtactivitymark").val().length <= 0|$("#txtactivitymark").val()===wanerdaoLangTip('active_00057')) {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: wanerdaoLangTip('active_00067')
            });
            return false;
        }       
    }
    else {
        new pop({ titleid: 'common_00022', typename: 'error',
            msginfo:  wanerdaoLangTip('active_00068')
        });
        return false;
    }
    //拟定计划
    var plans=null;
    if ($("#activityplanSwitch").attr("checked")) {
        if ($("#tableplanlist tr:first-child").length <= 0) {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: wanerdaoLangTip('active_00069')
            });
            return false;
        }
        else{
            plans=parsespantoarrayplan($("#tableplanlist tr"));
        }
    }
//    else {
//        new pop({ titleid: 'common_00022', typename: 'error',
//            msginfo: wanerdaoLangTip('active_00070')
//        });
//        return false;
//    }
    if ($("#vehicle").children('option:selected').val() === "-2") {
        new pop({ titleid: 'common_00022', typename: 'error',
            msginfo:  wanerdaoLangTip('active_00073')
        });
        return false;
    }    
    var activityvisible = false;//是否公开
    if ($("#ckactivityispublic").attr("checked")) {
        activityvisible = true;
    }
    //是否直接创建
    var isbuild = "-2";
    if ($("#ddlbuild").length > 0) {
        isbuild = $("#ddlbuild").children('option:selected').val();
    }
    //周期间隔
    var gapperiod = "-2";
    if ($("#ddlactivityperiod").length > 0) {
        gapperiod  = $("#ddlactivityperiod").children('option:selected').val();
    }
    //浮动周期
    var now = new Date();
    var btime = DateFormat(now.toUTCString(), 'yyyy-MM-dd');
    if ($("#txtBookTime").length > 0&&$("#txtBookTime").val().length>0) {
        btime = DateFormat(getUTCDateString($("#txtBookTime").val()), 'yyyy-MM-dd');
    }
    var cemail = false; //是否邮件提醒
    var cemaildate = "-2";
    if ($("#ckactivityemail").length > 0) {
        if ($("#ckactivityemail").attr("checked")) {
            cemail = true;
        }
    }
    if ($("#ddactivityemail").length > 0) {
        cemaildate = $("#ddactivityemail").children('option:selected').val();
    }
    var cinbox = false; //是否站内信息提醒
    var cinboxdate = "-2";
    if ($("#ckactivityinbox").length > 0) {
        if ($("#ckactivityinbox").attr("checked")) {
            cinbox = true;
        }
    }
    if ($("#ddactivityinbox").length > 0) {
        cinboxdate = $("#ddactivityinbox").children('option:selected').val();
    }
    var ptype = '62533f25-5a45-11e1-956c-101f74b66417';
    var password = "";
    var _activitylimit=100;
    var d=new Date($('#txtactivitystartday').datetimepicker('getDate').getTime() - 86400000);
    var _reporttime=DateFormat(getUTCDateString(d), 'yyyy-MM-dd')
        //设定报名参数
    if ($("#signupparamSwitch").attr("checked")) {
            if ($.cookies.get("62533f25-5a45-11e1-956c-101f74b66417") != null && $("#62533f25-5a45-11e1-956c-101f74b66417").attr("checked") === "checked") {//直接加入报名
            ptype = '62533f25-5a45-11e1-956c-101f74b66417';
        }
        if ($.cookies.get("62534133-5a45-11e1-956c-101f74b66417") != null && $("#62534133-5a45-11e1-956c-101f74b66417").attr("checked") === "checked") {//申请加入报名
            ptype = '62534133-5a45-11e1-956c-101f74b66417';
        }
        if ($.cookies.get("6253420d-5a45-11e1-956c-101f74b66417") != null && $("#6253420d-5a45-11e1-956c-101f74b66417").attr("checked") === "checked") {//密码申请
            ptype = '6253420d-5a45-11e1-956c-101f74b66417';
        }
        if (ptype === '') {
            ptype = '62533f25-5a45-11e1-956c-101f74b66417';
        }        
        if ($("#txtactivitypwdjoinagain").length > 0) {
            password = $("#txtactivitypwdjoinagain").val();
        }
        _activitylimit=parseInt($("#txtactivitylimit").val())===null?100:parseInt($("#txtactivitylimit").val());
         var signupday = $("#txtactivitysignupenddatetime");
        if (signupday[0]) {
            _reporttime=DateFormat(getUTCDateString(signupday.val()), 'yyyy-MM-dd');
        }
    }
    
    //启动踢人保护
    var cprotect = "0";
    if ($("#ckactivityisprotect").attr("checked")) {
        cprotect = $("#ddlactivityprotectduration").children('option:selected').val();
    }
    //设定报名费此处可选
    //var activitycost = 0;
    var pay_nbr = 0;
    var is_pay_need = false;
    var activitysubsistdesc = wanerdaoLangTip('common_00079');
    var activitypaytype = "-2";
    var pay_address = "";
    if ($("#signuptaxSwitch").attr("checked")) {
        pay_nbr = parseFloat($("#txtactivitycost").val());
        if ($("#activitypayneed").attr("checked") ) {
            is_pay_need = true;
        }
        activitysubsistdesc = $("#txtactivitycostdesc").val();
        if ($("#ddlactivitypaytype").children('option:selected').val() != "-2") {
            activitypaytype = $("#ddlactivitygrouplist").children('option:selected').val();
            var t=$('#ddlactivitypaytype option:selected').text();
            if (t!= "现金支付" | t != "Paid in cash") {
            var x=$("#activitypayaddress").val();
                if (x!=wanerdaoLangTip('active_00074')) {
                    pay_address=x;
                }
        }
    }
    }
    //设定加入门槛此处可选
    var limitcondition = null;
    if ($("#signupconditionSwitch").attr("checked") ) {
        if ($("#ddlactivityjoincondition").children('option:selected').val() != "-2") {
            limitcondition = [
								{
								    "id": $("#ddlactivityjoincondition").children('option:selected').val(),
								    "value": $("#txtactivityjoinvalue").val()
								}
					];
        }
}
//预算
var budget = null;
if ($("#signupplanSwitch").attr("checked")) {
    if ($("#tableactivitybudget tr:first-child").length > 0) {
        budget = parsespantoarraybudget($("#tableactivitybudget tr:gt(0)"));
    }
}
//搭车

    var value = {
        "createtype": createtype,
        "telephone": $("#txtactivitytelphone").val(),
        "email": $("#txtactivityemail").val(),
        "activityvisible": activityvisible,
        "activityschedule":$("#signuptaxSwitch").attr("checked")? {
            "typeid": $("#ddlactivityduration").children('option:selected').val(),
            "isdirectlybuild": isbuild,
            "gapperiod": gapperiod,
            "floatcycle": btime,
            "tellemail": cemail,
            "tellinbox": cinbox,
            "emaildates": cemaildate,
            "inboxdates": cinboxdate
        }:null,
        "placeset": {
            "countryid": $("#hidecountryid").val(),
            "provinceid": $("#hidestateid").val(),
            "cityid": $("#hidecityid").val(),
            "zip": $("#txtactivitypostid").val(),
            "addr": $("#txtactivityaddress").val() !== '' ? $("#txtactivityaddress").val() : $("#hideaddressid").val()
        },
        "activitybegintime": DateFormat(getUTCDateString($("#txtactivitystartday").val()),'yyyy-MM-dd'),
        "activityendtime": DateFormat(getUTCDateString($("#txtactivityendday").val()), 'yyyy-MM-dd'),
        "activitytags": $("#divaclist li").length > 0 ? parsespantoarray($("#divaclist li")) : null,
        "activityname": $("#txtactivitytitle").val(),
        "activitydesc": $("#txtactivitymark").val(),
        "plan": plans,
        "activitylimit": _activitylimit,
        "activityovertime": _reporttime,
        "signuptype": ptype, //$("input[name='add_event'][checked]").attr("id"),
        "signuppass": password,
        "protectpeople": cprotect,
        "activitycost": 0,
        "activitysubsistdesc": activitysubsistdesc,
         "pay_description": activitysubsistdesc,
        "is_pay_need": is_pay_need, // 是否必须交
        "pay_nbr": pay_nbr,
        "paymethodsinfo": [
              {
                  "pay_type_id": activitypaytype,
                  "pay_address": pay_address,
                  "name": "",
                  "description":  "",
                  "notice": ""
              }
           ],
         "limitcondition": limitcondition,
        "budget": budget,
        "invite": {
            "isallgroup": $("#allgroups").attr("checked") === "checked"?true:false,
            "isallfriend": $("#allfriends").attr("checked") === "checked" ? true : false,
            "groupinvite": $("#allgroups").attr("checked")!== "checked"? parsespantoarray($("#groupnewlist li")) : null,
            "friendinvite": $("#allfriends").attr("checked") !== "checked"? parsespantoarray($("#friendnewlist li")) : null
        },
        "vehicletype": {
            "vehicletypeid": $("#vehicle").children('option:selected').val(),
            "isauto": $("#ifVehicle").children('option:selected').val() == "0" ? true : false,
            "providercar": $("#willing").children('option:selected').val() == "0" ? {
                "ispermit": true,
                "carpooltypeid": $("#takeFare").children('option:selected').val(),
                "carpoolmoney": $("#txtmoney").val() === '' ? 0 : parseFloat($("#txtmoney").val()),
                "autobrandid": $("#licensePlate").children('option:selected').val(),
                "automodelid": $("#model").children('option:selected').val(),
                "autoplate": $("#txtcarid").val(),
                "autoyear": $("#txtcaryear").val(),
                "carpoolnbr": parseInt($("#txtcarseat").val())
            } :null,
        },
        "archivesname": $("#ckactivitysaveset").attr("checked") === "checked" ? $("#txtsavetempactivename").val() : '',
        "committype": typestring //0 只?保À¡ê存ä?活?动¡¥ 1 只?保À¡ê存ä?参?数ºy 3都?保À¡ê存ä?        
    };
    var tmp=objbutton.val();
    var tmpcls=objbutton.attr('class');
    $.ajax({
        url: "pagination_activity.axd",
        type: 'POST',
        dataType: "json",
        data: {
            opertype: "activitycreatepage",
            value: $.toJSON(value)
        },
        cache: false,
        timeout: 60000,
        beforeSend: function () {
            objbutton.attr("disabled", true);
            if (typestring==="0") {
                objbutton.removeAttr('class').addClass(objbutton.attr('button-loading-class'));
                objbutton.val(objbutton.attr('button-loading'));                
            }
            else{
            //.removeClass("buttonB btn_w163 btn_h36 btnBlue_163 fSize-14").addClass("buttonB btn_w163 btn_h36 btnGary_163 fSize-14");
                objbutton.val(wanerdaoLangTip('common_00071'));
            }
        },
        error: function (data) {
            $('#spanactivityoption').unnotice(2);
            $('#spanactivityoption').notice(wanerdaoLangTip('active_00075'), 2);
            objbutton.attr("disabled", false);
            objbutton.val(tmp);
            if (typestring==="0") {
                objbutton.removeAttr('class').addClass(tmpcls);
            }
        },
        success: function (data) {     
            objbutton.removeAttr('class').addClass(tmpcls);       
            objbutton.val(data.msg);
            $("#62533f25-5a45-11e1-956c-101f74b66417").attr("checked",true);
            $.cookies.del("62533f25-5a45-11e1-956c-101f74b66417");
            $.cookies.del("62534133-5a45-11e1-956c-101f74b66417");
            $.cookies.del("6253420d-5a45-11e1-956c-101f74b66417");
            location.href = "/activity/activity_myactivity.html";
            /*
            new pop({ titleid: 'common_00024', typename: 'message',
                msginfo: data.msg
            });
            */
        }
    });
}