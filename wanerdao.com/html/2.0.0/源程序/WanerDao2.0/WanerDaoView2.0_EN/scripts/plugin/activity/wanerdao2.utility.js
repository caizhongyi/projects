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
                    msginfo: "请选择正确的圈子"
                });
                return false;
            }
            else {
                createtype += "|" + $("#ddlactivitygrouplist").children('option:selected').val();
            }
    }
    //判断定制周期是否被选择
    if ($("#customCycleSwitch").attr("checked")===undefined) {
        new pop({ titleid: 'common_00022', typename: 'error',
            msginfo: "请选择定制周期"
        });
        return false;
    }
    //设定地址
    if ($("#addressSetSwitch").attr("checked")) {
        if ($("#txtactivityaddress").val() === "") {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: "请选择景区地址"
            });
            return false;
        }
        if ($("#txtarea").val() === "") {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: "请选择景区所在城市"
            });
            return false;
        }
    }
    else {
        new pop({ titleid: 'common_00022', typename: 'error',
            msginfo: "请选择设定地址"
        });
        return false;
    }
    //设定活动参数
    if ($("#activityparamSwitch").attr("checked")) {
        if ($("#txtactivitystartday").val() === "") {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: "请选择活动开始时间"
            });
            return false;
        }
        if ($("#txtactivityendday").val() === "") {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: "请选择活动结束时间"
            });
            return false;
        }
        if ($("#divaclist li:first-child").length<=0) {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: "请选择活动分类"
            });
            return false;
        }
        if ($("#txtactivitytitle").val().length <= 0) {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: "活动标题不允许为空！"
            });
            return false;
        }
        if ($("#txtactivitymark").val().length <= 0) {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: "活动描述不允许为空！"
            });
            return false;
        }       
    }
    else {
        new pop({ titleid: 'common_00022', typename: 'error',
            msginfo: "请选择设定活动参数"
        });
        return false;
    }
    //拟定计划
    if ($("#activityplanSwitch").attr("checked")) {
        if ($("#tableplanlist tr:first-child").length <= 0) {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: "请选择编辑活动计划"
            });
            return false;
        }
    }
    else {
        new pop({ titleid: 'common_00022', typename: 'error',
            msginfo: "请选择拟定计划"
        });
        return false;
    }
    //设定报名参数
    if ($("#signupparamSwitch").attr("checked")===undefined) {
        new pop({ titleid: 'common_00022', typename: 'error',
            msginfo: "请选择设定报名参数"
        });
        return false;
    }
        //设定报名费
    if ($("#signuptaxSwitch").attr("checked")===undefined) {
        new pop({ titleid: 'common_00022', typename: 'error',
            msginfo: "请选择设定报名费"
        });
        return false;
    }
    if ($("#vehicle").children('option:selected').val() === "-2") {
        new pop({ titleid: 'common_00022', typename: 'error',
            msginfo: "请填写个人报名信息"
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
    var ptype = '';
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
    var password = "";
    if ($("#txtactivitypwdjoinagain").length > 0) {
        password = $("#txtactivitypwdjoinagain").val();
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
    var activitysubsistdesc = "暂无描述信息";
    var activitypaytype = "-2";
    var pay_address = "";
    if ($("#signupparamSwitch").attr("checked")) {
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
                if (x!="您的付款地址") {
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
        "activityschedule": {
            "typeid": $("#ddlactivityduration").children('option:selected').val(),
            "isdirectlybuild": isbuild,
            "gapperiod": gapperiod,
            "floatcycle": btime,
            "tellemail": cemail,
            "tellinbox": cinbox,
            "emaildates": cemaildate,
            "inboxdates": cinboxdate
        },
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
        "plan": parsespantoarrayplan($("#tableplanlist tr")),
        "activitylimit": $("#txtactivitylimit").val(),
        "activityovertime": DateFormat(getUTCDateString($("#txtactivitysignupenddatetime").val()), 'yyyy-MM-dd'),
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
            "isallgroup": $("#allfriends").attr("checked") === "checked"?true:false,
            "isallfriend": $("#allgroups").attr("checked") === "checked" ? true : false,
            "groupinvite": $("#allgroups").attr("checked") !== "checked" ? parsespantoarray($("#groupnewlist span")) : null,
            "friendinvite": $("#allfriends").attr("checked") !== "checked" ? parsespantoarray($("#friendnewlist span")) : null
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
            } : null,
        },
        "archivesname": $("#ckactivitysaveset").attr("checked") === "checked" ? $("#txtsavetempactivename").val() : '',
        "committype": typestring //0 只?保À¡ê存ä?活?动¡¥ 1 只?保À¡ê存ä?参?数ºy 3都?保À¡ê存ä?        
    };
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
            $("#spanactivityoption").notice("数据提交中...", 2);
        },
        error: function (data) {
            $('#spanactivityoption').unnotice(2);
            $('#spanactivityoption').notice("活动创建失败", 2);
            objbutton.attr("disabled", false);
        },
        success: function (data) {            
            //$("#spanactivityoption").append(data.msg);
            $('#spanactivityoption').unnotice(2);
            $('#spanactivityoption').notice(data.msg, 2);
            location.href = "/activity/activity_myactivity.html";
            /*
            new pop({ titleid: 'common_00024', typename: 'message',
                msginfo: data.msg
            });
            */
        }
    });
}