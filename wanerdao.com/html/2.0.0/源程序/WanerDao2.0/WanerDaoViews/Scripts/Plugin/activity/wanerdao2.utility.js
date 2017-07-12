//获取table的tr集合。id为table的id，trindex为从第几行获取tr集合
function gettabletrs(id,trindex) {
    $("#" + id + " tr:gt(" + trindex + ")");
}
//计划
function parsespantoarrayplan(obj) {
    var array = [];
    $.each(obj, function (i, n) {
        var o = $(obj[i]);
        var s = o.find("td:eq(3)").text();
        var vday = s.substring(0, s.indexOf("("));
        var vv = s.substring(s.indexOf("(") + 1, s.indexOf(")")).split("-");
        var obj1 = { starttime: vday + " " + vv[0], endtime: vday + " " + vv[1], title: o.find("td:eq(1)").text(), desc: o.find("td:eq(2)").text() };
        array.push(obj1);
    });
    return array;
}
//财务
function parsespantoarraybudget(obj) {
    var array = [];
    $.each(obj, function (i, n) {
        var o = $(obj[i]);
        var cost=o.find("td:eq(2)").text();
        var obj1 = { id: o.find("td:eq(0)").text(), receipt: o.find("td:eq(1)").text(), budgetcost: parseFloat(cost.substring(0, cost.length - 1)), executor: o.find("td:eq(3)").text(), budgetdesc: o.find("td:eq(4)").text() };
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
function activitycreate(typestring) {
    var createtype = "";
    if ($("#ddlactivitycreater").children('option:selected').val() == "-2") {
        new pop({ titleid: 'common_00022', typename: 'error',
            msginfo: "请选择正确的发起活动者"
        });
        return false;
    }
    createtype = $("#ddlactivitycreater").children('option:selected').val();
    if ($("#ddlactivitycreater").children('option:selected').val() === "02fbb8fc-599c-11e1-9350-101f74b66417") {        
        if ($("#ddlactivitygrouplist").children('option:selected').val() !== undefined) {
            if ($("#ddlactivitygrouplist").children('option:selected').val() == "-2") {
                new pop({ titleid: 'common_00022', typename: 'error',
                    msginfo: "请选择正确的圈子"
                });
                return false;
            }
            else {
                createtype += "|" + $("#ddlactivitygrouplist").children('option:selected').val();
            }
        }
        else {
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: "请选择正确的圈子"
            });
            return false;
        }    
    }
    if ($("#ddlactivityduration").children('option:selected').val() == "-2") {
        new pop({ titleid: 'common_00022', typename: 'error',
            msginfo: "请选择正确的活动周期定制"
        });
        return false;
    }
    if ($("#ddlactivityduration").children('option:selected').val() == "-2") {
        new pop({ titleid: 'common_00022', typename: 'error',
            msginfo: "请选择正确的活动周期定制"
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
    var ptype = '';
   if ($.cookies.get("62533f25-5a45-11e1-956c-101f74b66417") != null&&$("#62533f25-5a45-11e1-956c-101f74b66417").attr("checked")) {//直接加入报名
       ptype='62533f25-5a45-11e1-956c-101f74b66417';
        }
   if ($.cookies.get("62534133-5a45-11e1-956c-101f74b66417") != null && $("#62534133-5a45-11e1-956c-101f74b66417").attr("checked")) {//申请加入报名
       ptype = '62534133-5a45-11e1-956c-101f74b66417';
        }
   if ($.cookies.get("6253420d-5a45-11e1-956c-101f74b66417") != null && $("#6253420d-5a45-11e1-956c-101f74b66417").attr("checked")) {//密码申请
       ptype = '6253420d-5a45-11e1-956c-101f74b66417';
        }
   if (ptype === '') {
       ptype = '62533f25-5a45-11e1-956c-101f74b66417';
    }
    var value = {
        "createtype": createtype,
        "telephone": $("#txtactivitytelphone").val(),
        "email": $("#txtactivityemail").val(),
        "activityvisible": $("#ckactivityispublic").attr("checked"),
        "activityschedule": {
            "typeid": $("#ddlactivityduration").children('option:selected').val(),
            "isdirectlybuild": $("#ddlbuild").children('option:selected').val(),
            "gapperiod": $("#ddlactivityperiod").children('option:selected').val(),
            "tellemail": $("#ckactivityemail").attr("checked"),
            "tellinbox": $("#ckactivityinbox").attr("checked"),
            "emaildates": $("#ckactivityemail").attr("checked")===false?'-2':$("#ddlactivityemail").children('option:selected').val(),
            "inboxdates": $("#ckactivityinbox").attr("checked")===false?'-2':$("#ddlactivityinbox").children('option:selected').val()
        },
        "placeset": {
            "countryid": $("#hidecountryid").val(),
            "provinceid": $("#hidestateid").val(),
            "cityid": $("#hidecityid").val(),
            "zip": $("#txtactivitypostid").val(),
            "addr": $("#txtactivityaddress").val() !== '' ? $("#txtactivityaddress").val() : $("#hideaddressid").val()
        },
        "activitybegintime": $("#txtactivitystartday").val(),
        "activityendtime": $("#txtactivityendday").val(),
        "activitydays": $("#txtactivitytotalday").val(),
        "activitytags": $("#divaclist span").length > 0 ? parsespantoarray($("#divaclist span")) : null,
		"activitytitle": $("#txtactivitytitle").val(),
		"activityname": $("#txtactivitytitle").val(),
        "activitydesc": $("#txtactivitymark").val(),
        "plan": parsespantoarrayplan($("#tableplanlist tr:gt(0)")),
		"activitylimit": $("#txtactivitylimit").val(),
		"activityovertime": $("#txtactivitysignupenddatetime").val(),
		"signuptype": ptype,//$("input[name='add_event'][checked]").attr("id"),
        "signuppass": $("#txtactivitypwdjoinagain").val(),
        "protectpeople": $("#ckactivityisprotect").attr("checked") == true ? $("#ddlactivityprotectduration").children('option:selected').val() : '0',
        "activitycost": parseFloat($("#txtactivitycost").val()),
        "activitysubsistdesc": $("#txtactivitycostdesc").val(),
        "activitypaytype": $("#ddlactivitypaytype").children('option:selected').val(),
        "activitypaydesc": $("#txtactivitypaytypedesc").val(),
        "limitcondition": $("#txtactivityjoinname").val()==='报名门槛名称'?null:[
								{
								    "id": $("#ddlactivityjoincondition").children('option:selected').val(),
								    "name": $("#txtactivityjoinname").val(),
								    "value": $("#txtactivityjoinvalue").val()
								}
					],
		"budget": parsespantoarraybudget($("#tableactivitybudget tr:gt(0)")),
        "invite": {
            "isallgroup": $("#allfriends").attr("checked"),
            "isallfriend": $("#allgroups").attr("checked"),
            "groupinvite": $("#allgroups").attr("checked") == false ? parsespantoarray($("#groupnewlist span")) : null,
            "friendinvite": $("#allfriends").attr("checked") == false ? parsespantoarray($("#friendnewlist span")) : null
        },
        "vehicletype": {
            "vehicletypeid": $("#vehicle").children('option:selected').val(),
            "isauto": $("#ifVehicle").children('option:selected').val() == "0" ? true : false,
            "providercar": $("#willing").children('option:selected').val() == "0" ?{
                "ispermit": true,
                "bycarusers": null,
                "carpooltypeid": $("#takeFare").children('option:selected').val(),
                "carpoolmoney": $("#txtmoney").val()===''?0:parseFloat($("#txtmoney").val()),
                "autobrandid": $("#licensePlate").children('option:selected').val(),
                "automodelid": $("#model").children('option:selected').val(),
                "autoplate": $("#txtcarid").val(),
                "autoyear": $("#txtcaryear").val(),
                "carpoolnbr": parseInt($("#txtcarseat").val())
            }:null,
            "bycar": null
        },
        "archivesname": $("#ckactivitysaveset").attr("checked") == true ? $("#txtsavetempactivename").val() : '',
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
        error: function (data) {
            alert(data.msg);
        },
        success: function (data) {
            new pop({ titleid: 'common_00024', typename: 'message',
                msginfo: data.msg
            });
        }
    });
//    ajaxfunc("create_activity.axd", "{opertype:'activitycreatepage',value: " + $.toJSON(value) + "}", $.errorFunc, function (data) {
//        new pop({ titleid: 'common_00024', typename: 'message',
//            msginfo: data.msg
//        });
//    });
}