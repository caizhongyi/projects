//初始参数引用
(function ($) {
    $.fn.initrefparam = function () {
        return this.each(function () {
            $this = $(this);
            //构建页面
            $this.append(getinitrefparamUI());
            //加载数据
            loadinitrefparamdata();
            //从cookie里面获取保存数据
            loadinitrefparamcookiedata();
            //注册事件
            addinitrefparamevent();
        });
    };
    function getinitrefparamUI() {
        var ui = '<div id="divstep1" class="setmodList basicQuote">';
        ui += '<dl class="pR">';
        ui += '   <dd class="formTitle">从之前活动复初始制参数：</dd>';
        ui += '   <dd class="formMain">';
        ui += '     <select id="ddlactivityhistory" name="ddlactivityhistory" TabIndex="0" />';
        ui += '    </dd>';
        ui += ' </dl>';
        ui += ' <dl class="clear2"/>';
        ui += ' <dl>';
        ui += '  <dd class="formTitle">从保存活动中复制初始制参数：</dd>';
        ui += '  <dd class="formMain">';
        ui += '     <select id="ddlactivitycraft" name="ddlactivitycraft"  TabIndex="1" />';
        ui += ' </dd>';
        ui += '</dl>';
        ui += ' <dl class="clear2"/>';
        ui += ' <dl>';
        ui += '     <dd class="formTitle">发起活动者：</dd>';
        ui += '     <dd class="formMain">';
        ui += '     <select id="ddlactivitycreater"  name="ddlactivitycreater" TabIndex="2" /> ';
        //ui += '     <select id="ddlactivitygrouplist" name="ddlactivitygrouplist" style="display:none"   TabIndex="3"/>';
        ui += '     </dd>';
        ui += '</dl>';
        ui += ' <dl class="clear2"/>';
        ui += ' <dl>';
        ui += '  <dd class="formTitle">创建联系人方式：</dd>';
        ui += '     <dd class="formMain">电话&nbsp;<input id="txtactivitytelphone" type="text" class="text" TabIndex="4"/>';
        ui += '  &nbsp;邮箱<input id="txtactivityemail" type="text" class="text"  TabIndex="5"/>';
        ui += ' </dd>';
        ui += ' <dl class="clear2"/>';
        ui += ' <dl>';
        ui += '  <dd class="formTitle">超级管理员：</dd>';
        ui += '  <dd class="formMain"><input id="txtactivitysuper" type="text" class="text" style="width:80px;" disabled="disabled"/>&nbsp;&nbsp;';
        ui += '  财务管理员：<input id="txtactivitytreasurer" type="text" class="text" style="width:80px;"  disabled="disabled"/>';
        ui += ' </dd>';
        ui += ' <dl class="clear2"/>';
        ui += ' <dl>';
        ui += '  <dd class="formTitle"><label><input type="checkbox" id="ckactivityispublic" checked="checked"/></label></dd>';
        ui += '  <dd class="formMain"><label for="ckactivityispublic" TabIndex="6">活动公开让所有人可见</label></dd>';
        ui += ' <dl class="clear2"/>';
        ui += '</div>';
        //$("#ddlactivitygrouplist_chzn").fadeOut();
        return ui;
    };
    function loadinitrefparamdata() {
        //从之前活动复制初始参数
        ajaxfunc("create_activity.axd", "{opertype:'getkeyvalueactivityparambyuserid'}", errorFunc, function (data) {
            //alert(data);
            if (data.result) {
                bindDropDownList("ddlactivityhistory", data.data, true);
            }
            else
                bindDropDownList("ddlactivityhistory", null, false);
        });
        //从保存活动中复制初始参数
        ajaxfunc("create_activity.axd", "{opertype:'getkeyvaluepersonalactivityarchivesparam'}", errorFunc, function (data) {
            if (data.result) {
                bindDropDownList("ddlactivitycraft", data.data, true);
            }
            else
                bindDropDownList("ddlactivitycraft", null, false);
        });
        //发起活动者
        var groupid = getQueryString("gid");
        ajaxfunc("create_activity.axd", "{opertype:'getactivitycreatetype'}", errorFunc, function (data) {
            if (data.result) {
                bindDropDownListNoDefault("ddlactivitycreater", data.data, true);
                if (groupid != null) {
                    $("#ddlactivitycreater option[value='02fbb8fc-599c-11e1-9350-101f74b66417']").attr("selected", true);
                    $("#ddlactivitycreater").chosen();
                    _buildgroup(groupid);
                }
                $("#ddlactivitycreater").change(function () {
                    if ($(this).children('option:selected').val() == "02fbb8fc-599c-11e1-9350-101f74b66417") {
                        _buildgroup(groupid);
                    }
                    else {
                        $("#ddlactivitygrouplist").remove();
                        $("#ddlactivitygrouplist_chzn").remove();
                    }
                    saveinitrefparamcookiedata();
                });
            }
            else
                bindDropDownList("ddlactivitycreater", null, false);
        });
        //获取用户信息
        ajaxfunc("create_activity.axd", "{opertype:'getcreateactivitypersonalinfo'}", errorFunc, function (data) {
            if (data.result) {
                $("#txtactivitytelphone").val(data.data.phone);
                $("#txtactivityemail").val(data.data.email);
                $("#txtactivitysuper").val(data.data.name);
                $("#txtactivitytreasurer").val(data.data.name);
                $.cookies.set("userid", data.data.id);
            }
        });
    };
    function _buildgroup(groupid) {
        if ($("#ddlactivitygrouplist").length <= 0) {
            $("#ddlactivitycreater_chzn").after('<select id="ddlactivitygrouplist" name="ddlactivitygrouplist" TabIndex="3"/>');
            //加载圈子
            ajaxfunc("create_activity.axd", "{opertype:'getkevaluecreateactivitybygroup'}", errorFunc, function (data) {
                if (data.result) {
                    bindDropDownList("ddlactivitygrouplist", data.data, true);
                    if (groupid != null) {
                        $("#ddlactivitygrouplist option[value='" + groupid + "']").attr("selected", true);
                        $("#ddlactivitygrouplist").chosen();
                    }
                }
                else {
                    bindDropDownList("ddlactivitygrouplist", null, false);
                }
            });
        }
    }
    function loadinitrefparamcookiedata() {
        if ($.cookies.get("ddlactivityhistory") != null) {
            $("#ddlactivityhistory").cookieBind();
        }
        if ($.cookies.get("ddlactivitycraft") != null) {
            $("#ddlactivitycraft").cookieBind();
        }
        if ($.cookies.get("ddlactivitycreater") != null) {
            $("#ddlactivitycreater").cookieBind();
        }
        //        if ($.cookies.get("ddlactivitygrouplist") != null) {
        //            $("#ddlactivitygrouplist").cookieBind();
        //        }
        if ($.cookies.get("txtactivitytelphone") != null) {
            $("#txtactivitytelphone").cookieBind();
        }
        if ($.cookies.get("txtactivityemail") != null) {
            $("#txtactivityemail").cookieBind();
        }
        if ($.cookies.get("txtactivitysuper") != null) {
            $("#txtactivitysuper").cookieBind();
        }
        if ($.cookies.get("txtactivitytreasurer") != null) {
            $("#txtactivitytreasurer").cookieBind();
        }
        if ($.cookies.get("ckactivityispublic") != null) {
            $("#ckactivityispublic").cookieBind();
        }
    };
    function saveinitrefparamcookiedata() {
        //临时保存到cookie里面
        $.cookies.set("ddlactivityhistory", $("#ddlactivityhistory").children('option:selected').val());
        $.cookies.set("ddlactivitycraft", $("#ddlactivitycraft").children('option:selected').val());
        $.cookies.set("ddlactivitycreater", $("#ddlactivitycreater").children('option:selected').val());
        $.cookies.set("ddlactivitygrouplist", $("#ddlactivitygrouplist").children('option:selected').val());
        $.cookies.set("txtactivitytelphone", $("#txtactivitytelphone").val());
        $.cookies.set("txtactivityemail", $("#txtactivityemail").val());
        $.cookies.set("txtactivitysuper", $("#txtactivitysuper").val());
        $.cookies.set("txtactivitytreasurer", $("#txtactivitytreasurer").val());
        $.cookies.set("ckactivityispublic", $("#ckactivityispublic").attr("checked") !== false ? "on" : "off");
    };
    function addinitrefparamevent() {
        //从之前活动复制初始参数
        $("#ddlactivityhistory").change(function () {
            if ($(this).children('option:selected').val() != "-1" && $(this).children('option:selected').val() != "-2") {
                //获取以前参加活动的信息
                //获取用户信息
                ajaxfunc("create_activity.axd", "{opertype:'getactivityparambyactivityid',id:'" + $(this).children('option:selected').val() + "'}", errorFunc, function (data) {
                    if (data.result) {
                        _bindHistoryData(data.data);
                    }
                });
            }
            saveinitrefparamcookiedata();
        });
        $("#ddlactivitygrouplist").change(function () {
            saveinitrefparamcookiedata();
        });

        //从保存活动中复制初始参数
        $("#ddlactivitycraft").change(function () {
            if ($(this).children('option:selected').val() != "-1" && $(this).children('option:selected').val() != "-2") {
                //获取以前参加活动的信息
                //获取用户信息
                ajaxfunc("create_activity.axd", "{opertype:'getactivityparambypersonactivityarchivesid',id:'" + $(this).children('option:selected').val() + "'}", errorFunc, function (data) {
                    if (data.result) {
                        _bindHistoryData(data.data);
                    }
                });
            }
            saveinitrefparamcookiedata();
        });
        //电话,邮箱
        $("#txtactivitytelphone,#txtactivityemail,#ckactivityispublic").change(function () {
            saveinitrefparamcookiedata();
        });
        $("#ddlactivitygrouplist_chzn").fadeOut();
    };
    function errorFunc(data) {
    };
    function _bindHistoryData(data) {
        $("#ddlactivitycreater").attr("value", data.createtype);
        $("#txtactivitytelphone").val(data.telephone);
        $("#txtactivityemail").val(data.email);
        $("#ckactivityispublic").attr("checked", data.activityvisible);
        if ($("#txtactivitytitle").length < 0) {
            $.cookies.set("txtactivitytitle", data.activityname);
        }
        else {
            $("#txtactivitytitle").val(data.activityname);
        }
        if ($("#txtactivitymark").length < 0) {
            $.cookies.set("txtactivitymark", data.activitydesc);
        }
        else {
            $("#txtactivitymark").val(data.activitydesc);
        }
        if ($("#txtactivitylimit").length < 0) {
            $.cookies.set("txtactivitylimit", data.activitylimit);
        }
        else {
            $("#txtactivitylimit").val(data.activitydesc);
        }
        if ($("#txtactivitysignupenddatetime").length < 0) {
            $.cookies.set("txtactivitysignupenddatetime", data.activityovertime);
        }
        else {
            $("#txtactivitysignupenddatetime").val(data.activityovertime);
        }
        if ($("#txtactivitycost").length < 0) {
            $.cookies.set("txtactivitycost", data.activitycost);
        }
        else {
            $("#txtactivitycost").val(data.activitycost);
        }
        if ($("#txtactivitycostdesc").length < 0) {
            $.cookies.set("txtactivitycostdesc", data.activitysubsistdesc === null ? "" : data.activitysubsistdesc);
        }
        else {
            $("#txtactivitycostdesc").val(data.activitysubsistdesc === null ? "" : data.activitysubsistdesc);
        }
    }
})(jQuery);
