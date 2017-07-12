//报名参数设定
(function ($) {
    $.fn.basesignupparam = function () {
        return this.each(function () {
            var $this = $(this);
            $this.append(_getLink());
            _loadEvent();
        });
    };
    function _getLink() {
        var ui = '<h4 id="activitybasesignupparam1"><label for="signupparamSwitch"><input type="checkbox" class="checkbox" id="signupparamSwitch" /><b>设定报名参数</b></label></h4>';
        ui += '<h4 id="activitybasesignupparam2"><label for="signuptaxSwitch"><input type="checkbox" class="checkbox" id="signuptaxSwitch" /><b>设定报名费</b></label></h4>';
        ui += '<h4 id="activitybasesignupparam3"><label for="signupconditionSwitch"><input type="checkbox" class="checkbox" id="signupconditionSwitch" /><b>设定加入门槛</b></label></h4>';
        ui += '<h4 id="activitybasesignupparam4"><label for="signupplanSwitch"><input type="checkbox" class="checkbox" id="signupplanSwitch" /><b>拟定预算</b></label></h4>';
        return ui;
    };
    function _aUI() {
        var ui = '<div id="a1" class="setmodList applySet">';
        ui += '<dl>';
        ui += ' <dd class="formTitle">人数限制：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input type="text" class="text" id="txtactivitylimit" value="100"/>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">报名结束日期：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input type="text" class="text" id="txtactivitysignupenddatetime"/>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">报名方式：</dd>';
        ui += ' <dd class="formMain" id="tdsignuptype">';
        ui += '     <div class="tips_G tipW_475" id="trpwd" style="display:none;">';
        ui += '         <span class="upArrow_G"></span>';
        ui += '         <div class="tips_G_main tipW_475">';
        ui += '             <label for="txtactivitypwdjoin" class="pwdWarp">再次输入：<input type="password" class="text" id="txtactivitypwdjoin" style="width:100px"/></label>';
        ui += '             <label for="txtactivitypwdjoinagain" class="pwdWarp">密码设定：<input type="password" class="text" id="txtactivitypwdjoinagain" style="width:100px"/></label>';
        ui += '         </div>';
        ui += '     </div>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle"><input type="checkbox" id="ckactivityisprotect"/></dd>';
        ui += ' <dd class="formMain" id="ddactivityprotectduration"><label for="ckactivityisprotect">启动踢人保护&nbsp;</label>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '</div>';
        return ui;
    }
    function _bUI() {
        var ui = '<div  id="b1" class="setmodList applyFeeSet">';
        ui += '<dl>';
        ui += ' <dd class="formTitle">报名费用：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input type="text" class="text" id="txtactivitycost" value="0" checkbox="checkbox"/>$';
        ui += '     <label for="activitypayneed"><input  type="checkbox" id="activitypayneed"/>报名时必需缴纳</label>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">费用说明：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <textarea class="textarea" id="txtactivitycostdesc" cols="69" rows="4"></textarea>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">支持缴费方式以及&nbsp;<br/>账号或支付地址：</dd>';
        ui += ' <dd class="formMain">';
        ui += '      <select id="ddlactivitypaytype"/><input  type="text" class="text" id="activitypayaddress" style="width:330px;"/>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '</div>';
        return ui;
    }
    function _cUI() {
        var ui = '<div  id="c1" class="setmodList thresholdSet">';
        ui += '<dl>';
        ui += ' <dd class="formTitle">设置报名门槛：</dd>';
        ui += ' <dd class="formMain">';
        //ui += '     <input type="text" class="text" id="txtactivityjoinname"/>';
        ui += '     <select id="ddlactivityjoincondition" />';
        ui += '     <input id="txtactivityjoinvalue" type="text"  class="text"/>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '</div>';
        return ui;
    }
    function _dUI() {
        var ui = '<div  id="d1" class="setmodList preparedbudget">';
        ui += '<dl>';
        ui += ' <dd class="formTitle">财务预算收支：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <label for="ckactivityonshow"><input type="checkbox" id="ckactivityonshow" />公开可见给所有想参加的人</label>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<div class="tabWarp_Gray">';
        ui += ' <table id="tableactivitybudget" cellpadding="0" cellspacing="0" border="0" background="#ededed" width="642" class="preparedList fSize-12 fCgray3">';
        ui += '     <tr class="fCblue" style="font-weight:normal;">';
        ui += '     <th>序号</th>';
        ui += '     <th>收支名目</th>';
        ui += '     <th>预算收支金额</th>';
        ui += '     <th>操作人名</th>';
        ui += '     <th>财务描述</th>';
        ui += '     <th>修改日期</th>';
        ui += '     <th></th>';
        ui += '     </tr>';
        ui += ' </table>';
        ui += '</div>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">预算收支项：</dd>';
        ui += ' <dd class="formMain"></dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">序号：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input type="text" class="text" value="1" id="txtactivitybudgetid" style="width:60px;" />';
        ui += '     &nbsp;收支明目&nbsp;<input type="text" class="text" id="txtactivitybudgetname" />';
        ui += '     &nbsp;预算金额&nbsp;<input type="text" class="text" id="txtactivitybudgetvalue" value="10"/>$';
        ui += '</dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">执行人：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input id="txtactivitybudgetexecuter" type="text" class="text" disabled="disabled"/>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">财务描述：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <textarea class="textarea" id="txtactivitybudgetmark" cols="69" rows="4"></textarea>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">&nbsp;</dd>';
        ui += ' <dd class="formMain">';
        ui += '     操作时间：<input id="tdactivitybudgettimer" type="text" class="text" disabled="disabled"/>';
        ui += '     财务人员：<input id="txtactivitybudgetpeople" type="text" class="text" disabled="disabled"/>';
        ui += '     <input id="btnactivitybudgetadd" type="button" value="添加预算名目" class="buttonG btn_w102 btn_h28 btnGary_102"/>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '</div>';
        return ui;
    }
    function _loadEvent() {
        $("#signupparamSwitch").click(function () {
            if ($(this).attr("checked")) {
                if ($("#a1")[0]) {
                    $("#a1").slideDown();
                }
                else {
                    $("#activitybasesignupparam1").after(_aUI());
                    $("#a1").slideDown();
                    _aEvent();
                    loadcache();
                }
                if ($("#txtactivitystartday")[0] && $("#txtactivitystartday").val() !== '' && $('#txtactivityendday').val() !== '') {
                    var signupday = $("#txtactivitysignupenddatetime");
                    if (signupday[0]) {
                        var d = new Date($('#txtactivitystartday').datetimepicker('getDate').getTime() - 86400000);
                        signupday.datetimepicker('option', 'minDate', new Date($('#txtactivitystartday').datetimepicker('getDate').getTime()));
                        signupday.datetimepicker('option', 'maxDate', new Date($('#txtactivityendday').datetimepicker('getDate').getTime()));
                        signupday.val(d.format('MM/dd/yyyy'));
                    }
                }
            }
            else {
                $("#a1").slideUp();
            }
        });
        $("#signuptaxSwitch").click(function () {
            if ($(this).attr("checked")) {
                if ($("#b1")[0]) {
                    $("#b1").slideDown();
                }
                else {
                    $("#activitybasesignupparam2").after(_bUI());
                    $("#b1").slideDown();
                    _bEvent();
                    loadcache();
                }
            }
            else {
                $("#b1").slideUp();
            }
        });
        $("#signupconditionSwitch").click(function () {
            if ($(this).attr("checked")) {
                if ($("#c1")[0]) {
                    $("#c1").slideDown();
                }
                else {
                    $("#activitybasesignupparam3").after(_cUI());
                    $("#c1").slideDown();
                    //_cEvent();
                    loadcache();
                    //加载报名门槛条件
                    ajaxfunc("create_activity.axd", "{opertype:'getkeyvaluejsonalljoinconditions'}", function (data) {
                    }, function (data) {
                        if (data.result) {
                            bindDropDownList("ddlactivityjoincondition", data.data, true).change(function () {
                                $.cookies.set("ddlactivityjoincondition", $("#ddlactivityjoincondition").children('option:selected').val());
                            });
                        }
                        else
                            bindDropDownList("ddlactivityjoincondition", null, false);
                    });
                }
            }
            else {
                $("#c1").slideUp();
            }
        });
        $("#signupplanSwitch").click(function () {
            if ($(this).attr("checked")) {
                if ($("#d1")[0]) {
                    $("#d1").slideDown();
                }
                else {
                    $("#activitybasesignupparam4").after(_dUI());
                    $("#d1").slideDown();
                    _dEvent();
                    loadcache();
                }
            }
            else {
                $("#d1").slideUp();
            }
        });
    }
    function _aEvent() {
        //获取用户信息
        ajaxfunc("create_activity.axd", "{opertype:'getkeyvaluejsonallsignuptype'}", function (data) {
        }, function (data) {
            if (data.result) {
                $.each(data.data, function (i, n) {
                    var ui = '   <input type="radio" name="add_event" id="{0}"/>';
                    ui += '   <label for="{1}">{2}</label>';
                    ui += '    &nbsp;&nbsp;';
                    ui = ui.replace("{0}", data.data[i].id).replace("{1}", data.data[i].id).replace("{2}", data.data[i].value);
                    $("#trpwd").before(ui);
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
                $("#62534133-5a45-11e1-956c-101f74b66417").attr("checked", "checked");
            }
        });
        //踢人保护
        $("#ckactivityisprotect").change(function () {
            if ($(this).attr("checked")) {
                if (!$("#ddlactivityprotectduration")[0]) {
                    //加载保护期限
                    $("#ddactivityprotectduration").append('<select id="ddlactivityprotectduration"/>');
                    ajaxfunc("create_activity.axd", "{opertype:'getkeyvalueactivitykickduration'}", function (data) {
                    }, function (data) {
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
                    $("#ddlactivityprotectduration_chzn").fadeIn();
                }
            }
            else {
                $("#ddlactivityprotectduration_chzn").fadeOut();
            }
            $.cookies.set("ckactivityisprotect", $("#ckactivityisprotect").attr("checked") !== false ? "on" : "off");
        });
        $('#txtactivitysignupenddatetime').datetimepicker({
            showSecond: true,
            timeFormat: 'hh:mm:ss',
            onSelect: function (selectedDateTime) {
                $.cookies.set("txtactivitysignupenddatetime", selectedDateTime);
            }
        });
        $("#txtactivitypwdjoin").change(function () {
            if ($(this).val().length > 20) {
                new pop({ typename: 'error',
                    msginfo: "密码长度不能大于20个字符"
                });
                return false;
            }
        });
        //当点击“密码验证加入”时候显示
        $("#txtactivitypwdjoinagain").change(function () {
            if ($(this).val() !== $("#txtactivitypwdjoin").val()) {
                new pop({ typename: 'error',
                    msginfo: wanerdaoLangTip('acc_00026')
                });
                $("#txtactivitypwdjoinagain").val("");
            }
            else {
                $.cookies.set("txtactivitypwdjoin", $("#txtactivitypwdjoin").val());
                $.cookies.set("txtactivitypwdjoinagain", $("#txtactivitypwdjoinagain").val());
            }
        });
    }
    function _bEvent() {
        //缴费方式说明
        ajaxfunc("create_activity.axd", "{opertype:'getkeyvaluejsonallpaytype'}", function (data) {
        }, function (data) {
            if (data.result) {
                bindDropDownList("ddlactivitypaytype", data.data, true).change(function () {
                    if ($(this).text() === "现金支付" | $(this).text() === "Paid in cash") {
                        $("#activitypayaddress").hide();
                    }
                    else {
                        $("#activitypayaddress").show();
                    }
                    $.cookies.set("ddlactivitypaytype", $("#ddlactivitypaytype").children('option:selected').val());
                });
            }
            else
                bindDropDownList("ddlactivitypaytype", null, false);
        });
        $("#txtactivitycostdesc,#activitypayaddress").defaultvalue("请详细描述报名费用", "您的付款地址");
    }
    function _dEvent() {
        $("#txtactivitybudgetname,#txtactivitybudgetmark").defaultvalue("请输入收支明细名称", "请输入此收支详细");
        //获取用户信息
        ajaxfunc("create_activity.axd", "{opertype:'getcreateactivitypersonalinfo'}", function (data) {
        }, function (data) {
            if (data.result) {
                $("#txtactivitybudgetexecuter").val(data.data.name);
                $("#txtactivitybudgetpeople").val(data.data.name);
                $.cookies.set("txtactivitybudgetexecuter", data.data.name);
                $.cookies.set("txtactivitybudgetpeople", data.data.name);
            }
        });
        loadtimer();
        $('#txtactivitylimit,#txtactivitycost,#txtactivitycostdesc,#txtactivitypaytypedesc,#txtactivityjoinname,#txtactivityjoinvalue').change(function () {
            $.cookies.set($(this).id, $(this).val());
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
                    trtemp += '<td>' + $("#tdactivitybudgettimer").val() + '</td>';
                    trtemp += '<td  class="table-opt"><a href="javascript:void(0);" class="listEdit" title="编辑"></a> ';
                    trtemp += '<a href="javascript:void(0);" class="listDel" title="删除"></a></td></tr>';
                    $("#tableactivitybudget").append(trtemp);
                    savetableactivitybudgetcache();
                    var i = parseInt($("#txtactivitybudgetid").val());
                    $("#txtactivitybudgetid").val(i + 1);

                }
                else {
                    new pop({ typename: 'warning',
                        msginfo: wanerdaoLangTip('active_00004')
                    });
                }
                $('#tableactivitybudget tr td:last-child a').click(function () {
                    if ($(this).attr("title") == "删除") {
                        $(this).parent().parent().remove();
                        savetableactivitybudgetcache();
                    }
                    else {
                        $("#btnactivitybudgetadd").val("保存预算名目");
                        var p = $(this).parent().parent();
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
                var i = parseInt($("#tableactivitybudget tr:last td:eq(0)").text());
                $("#txtactivitybudgetid").val(i + 1).attr("disabled", "");
                $("#txtactivitybudgetname").val("");
                $("#btnactivitybudgetadd").val("添加预算名目");
                savetableactivitybudgetcache();
            }
        });
    };
    function loadtimer() {
        $("#tdactivitybudgettimer").val(wanerdaoclienttimer("yyyy-MM-dd hh:mm:ss"));
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
    };
})(jQuery);