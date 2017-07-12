//初始参数引用
(function ($) {
    $.fn.initrefparam = function () {
        return this.each(function () {
            $this = $(this);
//            var loadmsg = $('<img src="/images/loading12.gif" alt="' + wanerdaoLangTip('common_00009') + '" title="' + wanerdaoLangTip('common_00009') + '"/>');
//            $this.after(loadmsg);
            //构建页面
            $this.after(getinitrefparamUI());
           // loadmsg.remove();
            //加载数据
            loadinitrefparamdata();
            //从cookie里面获取保存数据
            loadinitrefparamcookiedata();
            //注册事件
            addinitrefparamevent();
            //saveinitrefparamcookiedata();
        });
    };
    function getinitrefparamUI() {
        var ui = '<div id="divstep1">';
        ui += '<table width="100%" border="0" cellspacing="1">';
        ui += ' <tr>';
        ui += '   <td width="25%" align="right">从之前活动复制初始参数：</td>';
        ui += '   <td width="75%">';
        ui += '    <div class="relate">';
        ui += '     <select id="ddlactivityhistory" name="ddlactivityhistory" class="combobox w128px" TabIndex="0" />';
        ui += '    </div>';
        ui += '   </td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '  <td align="right">从保存活动中复制初始参数：</td>';
        ui += '  <td><select id="ddlactivitycraft" name="ddlactivitycraft" class="combobox w128px" TabIndex="1" /></td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '  <td align="right">发起活动者：</td>';
        ui += '  <td><select id="ddlactivitycreater"  name="ddlactivitycreater" class="combobox w123px"  TabIndex="2" /> ';
        ui += '<select id="ddlactivitygrouplist" name="ddlactivitygrouplist" class="combobox w123px" style="display:none"   TabIndex="3"/></td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '  <td align="right">创建人联系方式：</td>';
        ui += '  <td>电话&nbsp;<input id="txtactivitytelphone" type="text" class="txtInt" TabIndex="4"/>';
        ui += '  &nbsp;邮箱<input id="txtactivityemail" type="text" class="txtInt"  TabIndex="5"/></td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '  <td align="right">超级管理员：</td>';
        ui += '  <td><input id="txtactivitysuper" type="text" class="txtInt" style="width:120px;" disabled="disabled"/>&nbsp;&nbsp;';
        ui += '  财务管理员：<input id="txtactivitytreasurer" type="text" class="txtInt" style="width:120px;"  disabled="disabled"/></td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '  <td align="right"><input type="checkbox" id="ckactivityispublic"/></td>';
        ui += '  <td><label for="ckactivityispublic" TabIndex="6">活动公开让所有人可见</label></td>';
        ui += ' </tr>';
        ui += ' </table>';
        ui += '</div>';
        return ui;
    };
    function loadinitrefparamdata() {
        //从之前活动复制初始参数
        ajaxfunc("create_activity.axd", "{opertype:'getkeyvalueactivityparambyuserid'}", $.errorFunc, function (data) {
            //alert(data);
            if (data.result) {
                bindDropDownList("ddlactivityhistory", data.data, true);
            }
            else
                bindDropDownList("ddlactivityhistory", null, false);
        });
        //从保存活动中复制初始参数
        ajaxfunc("create_activity.axd", "{opertype:'getkeyvaluepersonalactivityarchivesparam'}", $.errorFunc, function (data) {
            if (data.result) {
                bindDropDownList("ddlactivitycraft", data.data, true);
            }
            else
                bindDropDownList("ddlactivitycraft", null, false);
        });
        //发起活动者
        ajaxfunc("create_activity.axd", "{opertype:'getactivitycreatetype'}", $.errorFunc, function (data) {
            if (data.result) {
                bindDropDownList("ddlactivitycreater", data.data, true);
                $("#ddlactivitycreater").change(function () {
                    if ($(this).children('option:selected').val() == "02fbb8fc-599c-11e1-9350-101f74b66417" && $(this).children('option:selected').val() != "-2") {
                        $("#ddlactivitygrouplist").fadeIn();
                        //加载圈子
                        ajaxfunc("create_activity.axd", "{opertype:'getkevaluecreateactivitybygroup'}", $.errorFunc, function (data) {
                            if (data.result) {
                                bindDropDownList("ddlactivitygrouplist", data.data, true);
                                var groupid = getQueryString("gid");
                                if (groupid != undefined) {
                                    $("#ddlactivitygrouplist").val(groupid);
                                }
                            }
                            else
                                bindDropDownList("ddlactivitygrouplist", null, false);
                        });
                    }
                    else {
                        jQuery("#ddlactivitygrouplist").fadeOut();
                    }
                    saveinitrefparamcookiedata();
                });
            }
            else
                bindDropDownList("ddlactivitycreater", null, false);
        });
        //获取用户信息
        ajaxfunc("create_activity.axd", "{opertype:'getcreateactivitypersonalinfo'}", $.errorFunc, function (data) {
            if (data.result) {
                $("#txtactivitytelphone").val(data.data.phone);
                $("#txtactivityemail").val(data.data.email);
                $("#txtactivitysuper").val(data.data.name);
                $("#txtactivitytreasurer").val(data.data.name);
                $.cookies.set("userid", data.data.id);
            }
        });
    };
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
        if ($.cookies.get("ddlactivitygrouplist") != null) {
            $("#ddlactivitygrouplist").cookieBind();
        }
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
                ajaxfunc("create_activity.axd", "{opertype:'getactivityparambyactivityid',id:'" + $(this).children('option:selected').val() + "'}", $.errorFunc, function (data) {
                    if (data.result) {
                        $.cookies.set("activityhistory", data.data);
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
                ajaxfunc("create_activity.axd", "{opertype:'getactivityparambypersonactivityarchivesid',id:'" + $(this).children('option:selected').val() + "'}", $.errorFunc, function (data) {
                    if (data.result) {
                        $.cookies.set("activitycraft", data.data);
                    }
                });
            }
            saveinitrefparamcookiedata();
        });
        //电话,邮箱
        $("#txtactivitytelphone,#txtactivityemail,#ckactivityispublic").change(function () {
            saveinitrefparamcookiedata();
        });
    };
    function errorFunc(data) {
        //alert(data.status);
    };
})(jQuery);
