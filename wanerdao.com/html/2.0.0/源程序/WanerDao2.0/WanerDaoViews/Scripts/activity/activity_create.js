//一个页面整个文件方式创建活动
//初始参数引用
function active_initrefparam() {
    //从之前活动复制初始参数
    ajaxfunc("create_activity.axd", "{opertype:'getkeyvalueactivityparambyuserid'}", errorFunc, successhistoryactiveFunc);
    //从保存活动中复制初始参数
    ajaxfunc("create_activity.axd", "{opertype:'getkeyvaluepersonalactivityarchivesparam'}", errorFunc, successcraftactiveFunc);
    //发起活动者
    ajaxfunc("create_activity.axd", "{opertype:'getactivitycreatetype'}", errorFunc, createactivefunc);
    //获取用户信息
    getuserinfo();
}

function errorFunc(data) {

}
//从之前活动复制初始参数
function successhistoryactiveFunc(data) {    
    if (data.result) {
        bindDropDownList("ddlhistoryactive", data.data, true);
    }
    else
        bindDropDownList("ddlhistoryactive", data.data, false);
}
//从保存活动中复制初始参数
function successcraftactiveFunc(data) {
    if (data.result) {
        bindDropDownList("ddlcraftactive", data.data, true);
    }
    else
        bindDropDownList("ddlcraftactive", data.data, false);
}
//发起活动者
function createactivefunc(data) {
    if (data.result) {
        bindDropDownList("ddlactivecreater", data.data, true);
        $("#ddlactivecreater").change(function () {
            if ($(this).children('option:selected').val() == "1") {
                $("#ddlgrouplist").fadeIn();
                //加载圈子
                ajaxfunc("create_activity.axd", "{opertype:'getkevaluecreateactivitybygroup'}", errorFunc, function (data) {
                    if (data.result) {
                        bindDropDownList("ddlgrouplist", data.data, true);
                    }
                    else
                        bindDropDownList("ddlgrouplist", data.data, false);
                });
            }
            else {
                jQuery("#ddlgrouplist").fadeOut();
            }
        });
    }
    else
        bindDropDownList("ddlactivecreater", data.data, false);
}
//获取用户信息
function getuserinfo() {
    ajaxfunc("create_activity.axd", "{opertype:'getcreateactivitypersonalinfo'}", errorFunc, function (data) {
        if (data.result) {
            $("#txtusertelphone").val(data.data.phone);
            $("#txtuseremail").val(data.data.email);
            $("#txtsuper").val(data.data.name);
            //$("#txtmangeuser").val(data.data.name);
            $("#txtfinancialer").val(data.data.name);
        }
    });
}
//周期订制
function active_cyclebook() {
    //活动周期定制
    ajaxfunc("create_activity.axd", "{opertype:'getkeyvalueactivityduration'}", errorFunc, function (data) {
        if (data.result) {
            bindDropDownList("ddlduration", data.data, true);
        }
        else
            bindDropDownList("ddlduration", data.data, false);
    });
    //间隔周期
    ajaxfunc("create_activity.axd", "{opertype:'getkeyvalueactivityintervalduration'}", errorFunc, function (data) {
        if (data.result) {
            bindDropDownList("ddlperiod", data.data, true);
        }
        else
            bindDropDownList("ddlperiod", data.data, false);
    });
    //活动周期创建形式
    ajaxfunc("create_activity.axd", "{opertype:'getkeyvaluecreatemode'}", errorFunc, function (data) {
        if (data.result) {
            bindDropDownList("ddlbuild", data.data, true);
        }
        else
            bindDropDownList("ddlbuild", data.data, false);
    });
    //发送email周期性
    ajaxfunc("create_activity.axd", "{opertype:'getactivityemailduration'}", errorFunc, function (data) {
        if (data.result) {
            bindDropDownList("ddlemail", data.data, true);
        }
        else
            bindDropDownList("ddlemail", data.data, false);
    });
    //发送站内信息周期性
    ajaxfunc("create_activity.axd", "{opertype:'getsitemessageduration'}", errorFunc, function (data) {
        if (data.result) {
            bindDropDownList("ddlzhannei", data.data, true);
        }
        else
            bindDropDownList("ddlzhannei", data.data, false);
    });
}
//地址设定
function active_addrbook() {
    
}
//活动参数设定
function active_baseparam() {
    
}
//计划拟定
function active_plan() {
}
//参数设定
function active_paramset() {

}
//报名费拟定
function active_signup() 
{
}
//加入门槛设定
function active_condition() 
{
}


function ui_load() {
    $.ajax({
        url: "search_activity.axd",
        type: 'POST',
        dataType: "json",
        data: {
            opertype: "searchactivitydetailsinfobyid",
            id: id
        },
        cache: false,
        timeout: 60000,
        error: function (data) {
            alert(data);
        },
        success: creatactivitydetailsinfopage
    });
}