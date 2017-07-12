//报名参数设定
(function ($) {
    $.fn.basesignupparam = function () {
        return this.each(function () {
            var $this = $(this);
//            var loadmsg = $('<img src="/images/loading12.gif" alt="' + wanerdaoLangTip('common_00009') + '" title="' + wanerdaoLangTip('common_00009') + '"/>');
//            $this.after(loadmsg);
            $this.after(getui());
            //loadmsg.remove();
            loadseverdata();
            addevent();
            loadcache();
        });
    };
    function getui() {
        var ui = '<div id="divstep3">';
        ui += '<h3 class="activity_h3">参数设定</h3>'; //参数设定
        ui += '<table width="100%" border="0" cellspacing="1">';
        ui += ' <tr>';
        ui += '   <td width="25%" align="right">人数限制：</td>';
        ui += '   <td width="75%"><input id="txtactivitylimit" type="text" class="txtInt" value="10"/></td>';
        ui += ' </tr>';
        ui += '<tr>';
        ui += '  <td align="right">报名结束日期：</td>';
        ui += '  <td><input id="txtactivitysignupenddatetime" type="text" class="txtInt" /></td>';
        ui += '</tr>';
        ui += '<tr>';
        ui += '  <td align="right">报名方式：</td>';
        ui += '  <td id="tdsignuptype">';
        //        ui += '   <input type="radio" name="add_event" id="62533f25-5a45-11e1-956c-101f74b66417" checked="checked"/>';
        //        ui += '   <label for="62533f25-5a45-11e1-956c-101f74b66417">直接加入</label>';
        //        ui += '    &nbsp;&nbsp;';
        //        ui += '    <input type="radio" name="add_event" id="62534133-5a45-11e1-956c-101f74b66417"/>';
        //        ui += '    <label for="62534133-5a45-11e1-956c-101f74b66417">申请批准加</label>';
        //        ui += '    &nbsp;&nbsp;';
        //        ui += '    <input type="radio" name="add_event" id="6253420d-5a45-11e1-956c-101f74b66417"/>';
        //        ui += '   <label for="6253420d-5a45-11e1-956c-101f74b66417">密码验证加入</label>';
        ui += '</td>';
        ui += ' </tr>';
        ui += '<tr id="trpwd" style="display:none;">'; //当点击“密码验证加入”时候显示
        ui += '  <td colspan="2" align="center" class="6253420d-5a45-11e1-956c-101f74b66417"><div class="tipShow"> <ins style="left:240px;"></ins>';
        ui += '      <div class="tCon"> 密码设定：';
        ui += '        <input id="txtactivitypwdjoin" type="text" class="txtInt" />';
        ui += '        &nbsp;&nbsp;';
        ui += '        再次输入：';
        ui += '        <input id="txtactivitypwdjoinagain" type="text" class="txtInt" />';
        ui += '      </div>';
        ui += '    </div></td>';
        ui += '</tr>';
        ui += '<tr>';
        ui += '  <td align="right"><input type="checkbox" id="ckactivityisprotect"/>';
        ui += '    &nbsp;</td>';
        ui += '  <td><label for="ckactivityisprotect">启动踢人保护</label>';
        ui += '    <select id="ddlactivityprotectduration" name="ddlactivityprotectduration" class="" style="display:none;">';
        //ui += '      <option value="AL">保护时限</option>';
        ui += '    </select></td>';
        ui += '</tr>';
        ui += '</table>';

        ui += '<h3 class="activity_h3">报名费拟定</h3>'; //报名费拟定
        ui += '<table width="80%" border="0" cellspacing="1">';
        ui += ' <tr>';
        ui += '    <td width="25%" align="right">报名费用：</td>';
        ui += '    <td width="75%"><input id="txtactivitycost" type="text" class="txtInt" value="10"/>$</td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '     <td align="right" valign="top">预交费用说明：</td>';
        ui += '     <td><textarea id="txtactivitycostdesc" class="txtInt" style="height:88px; width:452px;"></textarea></td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '     <td align="right">缴费方式说明：</td>';
        ui += '     <td><select id="ddlactivitypaytype" name="ddlpaytype" class=""/></td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '    <td>&nbsp;</td>';
        ui += '    <td><textarea id="txtactivitypaytypedesc" class="txtInt" style="height:88px; width:452px;"></textarea></td>';
        ui += ' </tr>';
        ui += '</table>';

        ui += '<h3 class="activity_h3">加入门槛设定</h3>'; //加入门槛设定
        ui += '<table width="80%" border="0" cellspacing="1">';
        ui += ' <tr>';
        ui += '   <td width="25%" align="right">设置报名门槛：</td>';
        ui += '   <td width="75%">';
        ui += '     <input id="txtactivityjoinname" type="text" class="txtInt" value="报名门槛名称" onclick="if(this.value==this.defaultValue){this.value=\'\';this.style.color=\'#000\'}" onblur="if(this.value==\'\'){this.value=this.defaultValue;this.style.color=\'#ccc\';}" style="color:#ccc;" />';
        ui += '     <span id="spanjoin" style="display:none;"><select id="ddlactivityjoincondition" name="ddlactivityjoincondition" class="" />';
        ui += '     <input id="txtactivityjoinvalue" type="text" class="txtInt" value="输入相关值" onclick="if(this.value==this.defaultValue){this.value=\'\';this.style.color=\'#000\'}" onblur="if(this.value==\'\'){this.value=this.defaultValue;this.style.color=\'#ccc\';}" style="color:#ccc;" />';
        ui += '   </span></td>';
        ui += ' </tr>';
        ui += '</table>';

        ui += '<div class="blank10px"></div>';
        ui += '<h3 class="activity_h3">预算拟定<span><input type="checkbox" id="ckactivityedit"/><label for="ckactivityedit">现在就编辑预算</label></span></h3>'; //预算拟定
        ui += '<div id="activity_h3_edit" style="display:none">';
        ui += '<table width="100%" border="0" cellspacing="1" cellpadding="0">';
        //        ui += '  <tr>';
        //        ui += '    <td width="25%" align="right">财务预算收支：</td>';
        //        ui += '    <td colspan="2"><input type="checkbox" id="ckactivityonshow"/><label for="ckactivityonshow">公开可见给所有想参加的人</label></td>';
        //        ui += '  </tr>';
        ui += ' <tr>';
        ui += '     <td colspan="3" align="right">';
        ui += '         <div class="tim_mark_tale tc" style="margin-bottom:10px;">';
        ui += '             <table id="tableactivitybudget" width="100%"   height="170" border="0" cellpadding="0" cellspacing="0">';
        ui += '                 <tr>';
        ui += '                     <th>序号</th><th>收支名目</th><th>预算收支金额</th><th>执行人名</th><th>财务描述</th><th>操作时间</th><th>&nbsp;</th>';
        ui += '                 </tr>';
        ui += '             </table>';
        ui += '         </div>';
        ui += '     </td>';
        ui += ' </tr>';
        ui += '</table>';
        ui += '<table width="80%"   height="170" border="0" cellpadding="0" cellspacing="0">';
        ui += '  <tr>';
        ui += '    <td align="right">预算收支项：</td>';
        ui += '    <td colspan="2">&nbsp;</td>';
        ui += '  </tr>';
        ui += ' <tr>';
        ui += '    <td align="right" style="height:40px;">序号：</td>';
        ui += '    <td colspan="2"><input id="txtactivitybudgetid" type="text"  class="txtInt" value="1" style="width:60px;"/>&nbsp;&nbsp;收支名目';
        ui += '     <input id="txtactivitybudgetname" type="text"  class="txtInt" style="width:148px;"/>&nbsp;&nbsp;';
        ui += '     </td>';
        ui += '  </tr>';
        ui += ' <tr>';
        ui += '    <td align="right">预算金额：</td>';
        ui += '    <td colspan="2"><input id="txtactivitybudgetvalue" type="text"  class="txtInt" style="width:30px;" value="10"/>$</td>';
        ui += '  </tr>';
        ui += ' <tr>';
        ui += '    <td align="right" style="height:40px;">执行人名：</td>';
        ui += '    <td colspan="2"><input id="txtactivitybudgetexecuter" type="text" class="txtInt" disabled="disabled"/></td>';
        ui += '  </tr>';
        ui += ' <tr>';
        ui += '    <td align="right" style="height:40px;">财务描述：</td>';
        ui += '    <td colspan="2"><input id="txtactivitybudgetmark" type="text" class="txtInt" style="height:88px; width:452px;"/></td>';
        ui += '  </tr>';
        ui += ' <tr>';
        ui += '    <td align="right">操作时间：</td>';
        ui += '    <td id="tdactivitybudgettimer" width="39%"></td>';
        ui += '    <td width="36%"><input id="btnactivitybudgetadd" type="button" class="button" value="添加预算名目"/></td>';
        ui += ' </tr>';
        ui += '</table>';
        ui += '</div>';
        return ui;
    };
    function addevent() {
        $('#txtactivitylimit,#txtactivitycost,#txtactivitycostdesc,#txtactivitypaytypedesc,#txtactivityjoinname,#txtactivityjoinvalue').change(function () {
            $.cookies.set($(this).id, $(this).val());
        });
        //报名结束日期 
        //$("#txtactivitysignupenddatetime").datetimepicker();
        $('#txtactivitysignupenddatetime').datetimepicker({
            showSecond: true,
            timeFormat: 'hh:mm:ss',
            onSelect: function (selectedDateTime) {
                $.cookies.set("txtactivitysignupenddatetime", selectedDateTime);
            }
        });
        $("#txtactivitypwdjoin").change(function () {
            if ($(this).val().length > 20) {
                new pop({ titleid: 'common_00022', typename: 'error',
                    msginfo: "密码长度不能大于20个字符"
                });
                return false;
            }
        });
        //当点击“密码验证加入”时候显示
        $("#txtactivitypwdjoinagain").change(function () {
            if ($(this).val() !== $("#txtactivitypwdjoin").val()) {
                new pop({ titleid: 'common_00022', typename: 'error',
                    msginfo: wanerdaoLangTip('acc_00026')
                });
                $("#txtactivitypwdjoinagain").val("");
            }
            else {
                $.cookies.set("txtactivitypwdjoin", $("#txtactivitypwdjoin").val());
                $.cookies.set("txtactivitypwdjoinagain", $("#txtactivitypwdjoinagain").val());
            }
        });
        //踢人保护
        $("#ckactivityisprotect").change(function () {
            if ($(this).attr("checked")) {
                $("#ddlactivityprotectduration").fadeIn();
                //加载保护期限
                ajaxfunc("create_activity.axd", "{opertype:'getkeyvalueactivitykickduration'}", errorfunction, function (data) {
                    if (data.result) {
                        bindDropDownListbyname("ddlactivityprotectduration", data.data, true).change(function () {
                            $.cookies.set("ddlactivityprotectduration", $("#ddlactivityprotectduration").children('option:selected').val());
                        });
                    }
                    else
                        bindDropDownListbyname("ddlactivityprotectduration", null, false);
                });
            }
            else {
                $("#ddlactivityprotectduration").fadeOut();
            }
            $.cookies.set("ckactivityisprotect", $("#ckactivityisprotect").attr("checked") !== false ? "on" : "off");
        });


        //设置报名门槛
        $("#txtactivityjoinname").change(function () {
            if ($("#txtactivityjoinname").val() != '') {
                $("#spanjoin").fadeIn();
                //加载报名门槛条件
                ajaxfunc("create_activity.axd", "{opertype:'getkeyvaluejsonalljoinconditions'}", errorfunction, function (data) {
                    if (data.result) {
                        bindDropDownList("ddlactivityjoincondition", data.data, true).change(function () {
                            $.cookies.set("ddlactivityjoincondition", $("#ddlactivityjoincondition").children('option:selected').val());
                        });
                    }
                    else
                        bindDropDownList("ddlactivityjoincondition", null, false);
                });
            }
            else {
                $("#spanjoin").fadeOut();
            }
        });
        //财务预算收支
        $("#ckactivityedit").change(function () {
            if ($(this).attr("checked")) {
                $("#activity_h3_edit").fadeIn();
            }
            else {
                $("#activity_h3_edit").fadeOut();
            }
            $.cookies.set("ckactivityedit", $("#ckactivityedit").attr("checked") !== false ? "on" : "off");
        });

        //添加预算名目
        $("#btnactivitybudgetadd").click(function () {
            //loadtimer();
            if ($("#btnactivitybudgetadd").val() == "添加预算名目") {
                if ($("#txtactivitybudgetname").val() != '') {
                    loadtimer();
                    var trtemp = '<tr><td align="center">';
                    trtemp += $("#txtactivitybudgetid").val();
                    trtemp += '</td>';
                    trtemp += '<td>' + $("#txtactivitybudgetname").val() + '</td>';
                    trtemp += '<td>' + $("#txtactivitybudgetvalue").val() + '$</td>';
                    trtemp += '<td>' + $("#txtactivitybudgetexecuter").val() + '</td>';
                    trtemp += '<td>' + $("#txtactivitybudgetmark").val() + '</td>';
                    trtemp += '<td>' + $("#tdactivitybudgettimer").text() + '</td>';
                    trtemp += '<td width="120"><p class="opera"><a href="javascript:void(0);" class="icon_Edit" title="编辑"></a> ';
                    trtemp += '<a href="javascript:void(0);" class="icon_Del" title="删除"></a></p></td></tr>';
                    $("#tableactivitybudget").append(trtemp);
                    savetableactivitybudgetcache();
                    var i = parseInt($("#txtactivitybudgetid").val());
                    $("#txtactivitybudgetid").val(i + 1);

                }
                else {
                    new pop({ titleid: 'common_00021', typename: 'warning',
                        msginfo: wanerdaoLangTip('active_00004')
                    });
                }
                $(".tim_mark_tale tr").hover(function () {
                    $(this).addClass("active");
                }, function () {
                    $(this).removeClass("active");
                });
                $('.tim_mark_tale tr td:last-child p a').click(function () {
                    if ($(this).attr("title") == "删除") {
                        $(this).parent().parent().parent().remove();
                        savetableactivitybudgetcache();
                    }
                    else {
                        $("#btnactivitybudgetadd").val("保存预算名目");
                        var p = $(this).parent().parent().parent();
                        var t = p.find("td:lt(3)");
                        $.each(t, function (i) {
                            if (i == 0) {
                                $("#txtactivitybudgetid").val($(t[i]).text());
                            }
                            if (i == 1) {
                                $("#txtactivitybudgetname").val($(t[i]).text());
                            }
                            if (i == 2) {
                                $("#txtactivitybudgetvalue").val($(t[i]).text().replace("$", ""));
                            }
                            if (i == 4) {
                                $("#txtactivitybudgetmark").val($(t[i]).text().replace("$", ""));
                            }
                        });
                        $.data(document.body, "budgetedit", p);
                        $("#txtactivitybudgetid").attr("disabled", "disabled");
                    }
                });
            }
            else {
                var p = $.data(document.body, "budgetedit");
                p.find("td:eq(1)").html($("#txtactivitybudgetname").val());
                p.find("td:eq(2)").html($("#txtactivitybudgetvalue").val() + "$");
                p.find("td:eq(4)").html($("#txtactivitybudgetmark").val());
                var i = parseInt($(".tim_mark_tale tr:last td:eq(0)").text());
                $("#txtactivitybudgetid").val(i + 1).attr("disabled", "");
                $("#txtactivitybudgetname").val("");
                $("#btnactivitybudgetadd").val("添加预算名目");
                savetableactivitybudgetcache();
            }
        });
    };
    function errorfunction(data) {

    };
    function loadtimer() {
        $("#tdactivitybudgettimer").html(wanerdaoclienttimer("yyyy-MM-dd hh:mm:ss"));
    };
    function loadseverdata() {
        //获取用户信息
        ajaxfunc("create_activity.axd", "{opertype:'getkeyvaluejsonallsignuptype'}", $.errorFunc, function (data) {
            if (data.result) {
                $.each(data.data, function (i, n) {
                    var ui = '   <input type="radio" name="add_event" id="{0}"/>';
                    ui += '   <label for="{1}">{2}</label>';
                    ui += '    &nbsp;&nbsp;';
                    ui = ui.replace("{0}", data.data[i].id).replace("{1}", data.data[i].id).replace("{2}", data.data[i].value);
                    $("#tdsignuptype").append(ui);
                });
                //密码验证加入
                $("input[name='add_event']").change(function () {                    
                    if ($(this).attr("id") != '6253420d-5a45-11e1-956c-101f74b66417') {
                        $("#trpwd").fadeOut();
                    }
                    else {
                        if ($(this).attr("checked")) {
                            $("#trpwd").fadeIn();
                        }
                        else {
                            $("#trpwd").fadeOut();
                        }
                    }
                    $.cookies.set("62533f25-5a45-11e1-956c-101f74b66417", $("#62533f25-5a45-11e1-956c-101f74b66417").attr("checked") !== false ? "on" : "off");
                    $.cookies.set("62534133-5a45-11e1-956c-101f74b66417", $("#62534133-5a45-11e1-956c-101f74b66417").attr("checked") !== false ? "on" : "off");
                    $.cookies.set("6253420d-5a45-11e1-956c-101f74b66417", $("#6253420d-5a45-11e1-956c-101f74b66417").attr("checked") !== false ? "on" : "off");
                });
                $("#62533f25-5a45-11e1-956c-101f74b66417").attr("checked", "checked");
            }
        });
        //获取用户信息
        ajaxfunc("create_activity.axd", "{opertype:'getcreateactivitypersonalinfo'}", $.errorFunc, function (data) {
            if (data.result) {
                $("#txtactivitybudgetexecuter").val(data.data.name);
                $("#txtactivitybudgetpeople").val(data.data.name);
                $.cookies.set("txtactivitybudgetexecuter", data.data.name);
                $.cookies.set("txtactivitybudgetpeople", data.data.name);
            }
        });
        //缴费方式说明
        ajaxfunc("create_activity.axd", "{opertype:'getkeyvaluejsonallpaytype'}", errorfunction, function (data) {
            if (data.result) {
                bindDropDownList("ddlactivitypaytype", data.data, true).change(function () {
                    $.cookies.set("ddlactivitypaytype", $("#ddlactivitypaytype").children('option:selected').val());
                });
            }
            else
                bindDropDownList("ddlactivitypaytype", null, false);
        });
        loadtimer();
    };
    //拟定列表cache
    function savetableactivitybudgetcache() {
        $.cookies.set("activitybudgetlist", $("#tableactivitybudget").html());
    };
    function loadcache() {
        if ($.cookies.get("txtactivitylimit") != null) {//人数限制
            $("#txtactivitylimit").cookieBind();
        }
        if ($.cookies.get("txtsavetempactivename") != null) {//报名结束日期
            $("#txtsavetempactivename").cookieBind();
        }
        if ($.cookies.get("62533f25-5a45-11e1-956c-101f74b66417") != null) {//直接加入报名
            $("#62533f25-5a45-11e1-956c-101f74b66417").cookieBind();
        }
        if ($.cookies.get("62534133-5a45-11e1-956c-101f74b66417") != null) {//申请加入报名
            $("#62534133-5a45-11e1-956c-101f74b66417").cookieBind();
        }
        if ($.cookies.get("6253420d-5a45-11e1-956c-101f74b66417") != null) {//密码申请
            $("#6253420d-5a45-11e1-956c-101f74b66417").cookieBind();
            if ($("#6253420d-5a45-11e1-956c-101f74b66417").attr("checked")) {
                $("#trpwd").fadeIn();
                if ($.cookies.get("txtactivitypwdjoin") != null) {
                    $("#txtactivitypwdjoin").cookieBind();
                }
                if ($.cookies.get("txtactivitypwdjoinagain") != null) {
                    $("#txtactivitypwdjoinagain").cookieBind();
                }
            }
            else {
                $("#trpwd").fadeOut();
            }
        }
        if ($.cookies.get("ckactivityisprotect") != null) {//启动踢人保护
            $("#ckactivityisprotect").cookieBind();
            if ($("#ckactivityisprotect").attr("checked")) {
                if ($.cookies.get("ddlactivityprotectduration") != null) {//保护时限
                    $("#ddlactivityprotectduration").cookieBind();
                }
            }
        }
        if ($.cookies.get("txtactivitycost") != null) {//报名费用
            $("#txtactivitycost").cookieBind();
        }
        if ($.cookies.get("txtactivitycostdesc") != null) {//预交费用说明
            $("#txtactivitycostdesc").cookieBind();
        }
        if ($.cookies.get("ddlactivitypaytype") != null) {//缴费方式说明
            $("#ddlactivitypaytype").cookieBind();
        }
        if ($.cookies.get("txtactivitypaytypedesc") != null) {//缴费方式说明描述
            $("#txtactivitypaytypedesc").cookieBind();
        }
        if ($.cookies.get("txtactivityjoinname") != null) {//报名门槛名称
            $("#txtactivityjoinname").cookieBind();
            if ($.cookies.get("ddlactivityjoincondition") != null) {//报名门槛条件
                $("#ddlactivityjoincondition").cookieBind();
            }
            if ($.cookies.get("txtactivityjoinvalue") != null) {//报名门槛值
                $("#txtactivityjoinvalue").cookieBind();
            }
        }
        if ($.cookies.get("ckactivityedit") != null) {//是否预算拟定
            $("#ckactivityedit").cookieBind();
            if ($("#ckactivityedit").attr("checked")) {
                $("#activity_h3_edit").fadeIn();
                if ($.cookies.get("activitybudgetlist") != null) {
                    $("#tableactivitybudget").empty().append($.cookies.get("activitybudgetlist"));
                }
            }
            else {
                $("#activity_h3_edit").fadeOut();
            }
        }
    };
})(jQuery);