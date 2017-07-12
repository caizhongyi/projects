//初始参数引用
(function ($) {
    $.fn.initrefparam = function () {
        return this.each(function () {
            $this = $(this);
            //构建页面
            $this.html("");
            $this.append(getinitrefparamUI());
            //加载数据
            loadinitrefparamdata();
            //从cookie里面获取保存数据
            loadinitrefparamcookiedata();
            //注册事件
            //addinitrefparamevent();
        });
    };
    function getinitrefparamUI() {
        var ui = '<div id="divstep1" class="setmodList basicQuote">';
        //        ui += '<dl class="pR">';
        //        ui += '   <dd class="formTitle">从之前活动复初始制参数：</dd>';
        //        ui += '   <dd class="formMain">';
        //        ui += '     <select id="ddlactivityhistory" name="ddlactivityhistory" TabIndex="0" />';
        //        ui += '    </dd>';
        //        ui += ' </dl>';
        //        ui += ' <dl class="clear2"/>';
        //        ui += ' <dl>';
        //        ui += '  <dd class="formTitle">从保存活动中复制初始制参数：</dd>';
        //        ui += '  <dd class="formMain">';
        //        ui += '     <select id="ddlactivitycraft" name="ddlactivitycraft"  TabIndex="1" />';
        //        ui += ' </dd>';
        //        ui += '</dl>';
        //        ui += ' <dl class="clear2"/>';
        ui += ' <dl>';
        ui += '     <dd class="formTitle">发起活动者：</dd>';
        ui += '     <dd class="formMain">';
        ui += '     <select id="ddlactivitycreater"  name="ddlactivitycreater" TabIndex="2" /> ';
        //ui += '     <select id="ddlactivitygrouplist" name="ddlactivitygrouplist" style="display:none"   TabIndex="3"/>';
        ui += '     </dd>';
        ui += '</dl>';
        ui += ' <dl class="clear2"/>';
        ui += ' <dl>';
        ui += '  <dd class="formTitle">电话：</dd>';
        ui += '     <dd class="formMain"><input id="txtactivitytelphone" type="text" class="text" TabIndex="4"/>';
        ui += '  &nbsp;&nbsp;邮箱:<input id="txtactivityemail" type="text" class="text"  TabIndex="5"/>';
        ui += ' </dd>';
        ui += ' <dl class="clear2"/>';

        ui += ' <dl>';
        ui += '  <dd class="formTitle">活动名：</dd>';
        ui += '  <dd class="formMain"><input type="text" id="txtactivityname" class="text" style="width:236px;" />';
        ui += ' &nbsp;<input type="checkbox" id="ckactivityispublic"/><label for="ckactivityispublic" TabIndex="6">活动公开让所有人可见</label></dd>';
        ui += ' </dl>';
        ui += ' <dl class="clear2"/>';

        ui += '<dl>';
        ui += '   <dd class="formTitle">活动简介：</dd>';
        ui += '  <dd class="formMain" >&nbsp;';
        ui += '     <textarea  id="txtareaDes" cols="69" rows="4"></textarea>';
        ui += '  </dd>';
        ui += ' </dl>';
        ui += ' <dl class="clear2"/>';

        ui += '<dl>';
        ui += '<dd class="formTitle">报名时间：</dd> ';
        ui += ' <dd class="formMain">';
        ui += '  <input type="text"   id="txtCreateTime" class="text"   />';
        ui += ' </dd>';
        ui += ' </dl>';
        ui += ' <dl class="clear2" />';
        ui += '<dl>';
        ui += '<dd class="formTitle">活动时间：</dd>';
        ui += '<dd class="formMain">从&nbsp;';
        ui += '<input type="text" id="txtBeginTime" class="text"  />';
        ui += ' &nbsp;到&nbsp;&nbsp;';
        ui += ' <input type="text"  id="txtEndTime" class="text"   />';
        ui += ' </dd>';
        ui += '</dl>';
        ui += ' <dl class="clear2" />';


        ui += '<dl>';
        ui += '   <dd class="formTitle">分类标记：</dd>';
        ui += '  <dd class="formMain" >';
        ui += '     <input id="btnactivityac" style="background: url(../images/buttons/gray_white.png) no-repeat scroll 0 0 transparent; height:28px;width:56px;border:medium none;"  type="button"  value="选择" rel="#ac" />';
        ui += ' <div class="tips_G tipW_435 pR"><span class="upArrow_G" style="left:180px;"></span>';
        ui += ' <div class="tips_G_main tipW_435">';
        ui += '           <ul id="activitytagsul"></ul>';
        ui += '  </div>';
        ui += ' </div>';
        ui += '  </dd>';
        ui += ' </dl>';
        ui += ' <dl class="clear2"/>';
        ui += ' <dl>';
        ui += '  <dd class="formTitle">超级管理员：</dd>';
        ui += '  <dd class="formMain" >';
        ui += '     <input id="btnoperationmanager" style="background: url(../images/buttons/gray_white.png) no-repeat scroll 0 0 transparent; height:28px;width:56px;border:medium none;"  type="button"  value="选择" rel="#ac" />';
        ui += ' <div class="tips_G tipW_435 pR"><span class="upArrow_G" style="left:180px;"></span>';
        ui += ' <div class="tips_G_main tipW_435">';
        ui += '           <ul id="operationmanagerul"></ul>';
        ui += '  </div>';
        ui += ' </div>';
        ui += '  </dd>';
        ui += '</dl>';
        ui += ' <dl class="clear2"/>';

        ui += ' <dl>';
        ui += '  <dd class="formTitle">财务管理员：</dd>';
        ui += '  <dd class="formMain">';
        ui += '     <input id="btnfinancialmanager" style="background: url(../images/buttons/gray_white.png) no-repeat scroll 0 0 transparent; height:28px;width:56px;border:medium none;"  type="button"  value="选择" rel="#ac" />';
        ui += ' <div class="tips_G tipW_435 pR"><span class="upArrow_G" style="left:180px;"></span>';
        ui += ' <div class="tips_G_main tipW_435">';
        ui += '           <ul id="financialmanagerul"></ul>';
        ui += '  </div>';
        ui += ' </div>';
        ui += ' </dd>';
        ui += ' <dl class="clear2"/>';

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
        ui += ' <dd class="formTitle" style="margin-left:15px;"><input type="checkbox" id="ckactivityisprotect"/></dd>';
        ui += ' <dd class="formMain" id="ddactivityprotectduration"><label for="ckactivityisprotect">启动踢人保护&nbsp;</label>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';

        ui += '<dl>';
        ui += ' <dd class="formTitle">报名费用：</dd>';
        ui += ' <dd class="formMain">';
        ui += '   <input type="text"  id="txtypaymoney" class="text" />';
        ui += '   &nbsp;缴费方式：';
        ui += '  <select   id="ddlactivitypaytype"></select>';
        ui += ' </dd>';
        ui += ' </dl>';
        ui += ' <dl class="clear2" />';
        ui += ' <dl>';
        ui += ' <dd class="formTitle">预交费用说明：</dd>';
        ui += '  <dd class="formMain">&nbsp;';
        ui += '    <textarea name="" id="Textarea2" cols="69" rows="4"></textarea>';
        ui += '  </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2" />';
        ui += '</div>';

        ui += '<div id="divactivitybase2" class="setmodList addressSet" style="display:none;">';
        ui += '<ul class="setBar">';
        ui += ' <li><span id="listSch_Btn" class="currentSch">列表查找</span></li>';
        ui += ' <li><span id="mapSch_Btn" class="fCgray3">地图查找</span></li>';
        ui += ' <li><span id="switchBtn" class="buttonW showBox_Btn"></span></li>';
        ui += '</ul>';
        ui += '<div class="address-show">';
        ui += ' <div class="MapSchBar">';
        ui += '     <label for="spanactivitypersonaddress">我的位置：<input type="text" class="text" id="spanactivitypersonaddress" /></label>';
        ui += '     <label for="spanactivitypersonpostid">邮编：<input type="text" class="text" id="spanactivitypersonpostid" /></label>';
        ui += '     <input type="text" class="text" id="txtactivitypersonarea" style="width:240px;" />';
        ui += '     <input id="hidepersoncountryid" type="hidden">';
        ui += '     <input id="hidepersonstateid" type="hidden">';
        ui += '     <input id="hidepersoncityid" type="hidden">';
        ui += ' </div>';
        ui += '</div>';
        ui += '<div id="addreesSchWarp" class="addreesSchWarp clearfix" >';
        ui += ' <div class="listschWarp">';
        ui += '     <div class="listSchBar">';
        ui += '         <ul class="activityCat">';
        ui += '             <li> <a href="javascript:viod(0);" class="prevBtn"></a> </li>';
        ui += '             <li class="tabs-clip" style="width:540px; overflow:hidden">';
        ui += '                 <ul class="AC_catList"  id="ulactivitycategory"> </ul>';
        ui += '             <li> <a href="javascript:viod(0);" class="nextBtn"></a> </li>';
        ui += '             <li> <a href="javascript:viod(0);" class="backBtn" style="display:none"></a> </li>';
        ui += '         </ul>';
        ui += '     </div>';
        ui += '     <div class="listSchMain">'; //列表
        ui += '         <div class="listSchContent">';
        ui += '             <div class="pageList"></div>';
        ui += '             <ul id="sightlist"></ul>';
        ui += '             <div class="pageList"></div>';
        ui += '         </div>';
        ui += '     </div>';
        ui += '</div>';
        ui += '<div class="mapschWarp">';
        ui += '';
        ui += '';
        ui += '';
        ui += '';
        ui += '';
        ui += '</div>';
        ui += '</div>';
        ui += '<dl class="clearfix">';
        ui += ' <dd class="formTitle">位置：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input type="text" class="text" id="txtactivityaddress" style="width:300px;"/>';
        ui += '         <input id="hideaddressid" type="hidden">';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clearfix">';
        ui += ' <dd class="formTitle">邮编：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input type="text" class="text" id="txtactivitypostid" style="width:300px;"/>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">地区：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input type="text" class="text" readonly="readonly" id="txtarea" style="width:300px;"/>';
        ui += '         <input id="hidecountryid" type="hidden">';
        ui += '         <input id="hidestateid" type="hidden">';
        ui += '         <input id="hidecityid" type="hidden">';
        //ui += '     <input type="button" class="buttonG btn_w56 btn_h28 btnGary_56"  id="btnchoosearea"  value="选择地区" />';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '</div>';
        return ui;
    };

    function loadinitrefparamdata() {

        if (managevalue.isfollow == "0") {
            $("#btnmanagefllow").val("+关注");
        } else if (managevalue.isfollow == "1") {
            $("#btnmanagefllow").val("-取消关注");
        }

        //财务管理员
        $("#btnfinancialmanager").live("click", function () {
            //alert(managevalue.activityid);
            var v_content = "";
            new activityperson({ activityid: managevalue.activityid, callback: function (data) {
                if (data.acperson != null) {
                    arrfinancer = [];
                    $.each(data.acperson, function (i, n) {
                        var temp = '<li id="{0}"><a href="{1}" target="_blank">{2}</a><a href="javascript:;"><img src="/images/del_pep.png"/></a></span>';
                        temp = temp.replace("{0}", data.acperson[i].id);
                        temp = temp.replace("{1}", data.acperson[i].id);
                        temp = temp.replace("{2}", data.acperson[i].name);
                        v_content += temp;
                        //  alert("你使用的是success按钮生成的分类，你选择的是: " + data.acperson[i].id + "|" + data.acperson[i].name);
                        var objfinace = { "id": data.acperson[i].id, "name": data.acperson[i].name }
                        arrfinancer.push(objfinace);
                    });
                }
                $("#financialmanagerul").html(v_content);
            }
            });
        });

        $("#financialmanagerul li a").live("click", function () {
            $(this).parent().remove();
        });



        //超级管理员
        $("#btnoperationmanager").live("click", function () {
            //alert(managevalue.activityid);
            var v_content = "";
            new activityperson({ activityid: managevalue.activityid, callback: function (data) {
                if (data.acperson != null) {
                    arryoperater = [];
                    $.each(data.acperson, function (i, n) {
                        var temp = '<li id="{0}"><a href="{1}" target="_blank">{2}</a><a href="javascript:;"><img src="/images/del_pep.png"/></a></span>';
                        temp = temp.replace("{0}", data.acperson[i].id);
                        temp = temp.replace("{1}", data.acperson[i].id);
                        temp = temp.replace("{2}", data.acperson[i].name);
                        v_content += temp;
                        var objoperater = { "id": data.acperson[i].id, "name": data.acperson[i].name }
                        arryoperater.push(objoperater);
                        //  alert("你使用的是success按钮生成的分类，你选择的是: " + data.acperson[i].id + "|" + data.acperson[i].name);
                    });
                }
                $("#operationmanagerul").html(v_content);
            }
            });
        });

        $("#operationmanagerul li a").live("click", function () {
            $(this).parent().remove();
        });


        //发起活动者
        ajaxfunc("create_activity.axd", "{opertype:'getactivitycreatetype'}", errorFunc, function (data) {
            if (data.result) {
                bindDropDownList("ddlactivitycreater", data.data, true);
                $("#ddlactivitycreater").change(function () {
                    if ($(this).children('option:selected').val() == "02fbb8fc-599c-11e1-9350-101f74b66417" && $(this).children('option:selected').val() != "-2") {
                        $("#ddlactivitycreater_chzn").after('<select id="ddlactivitygrouplist" name="ddlactivitygrouplist" TabIndex="3"/>');
                        //                        $("#ddlactivitygrouplist").fadeIn();
                        //                        $("#ddlactivitygrouplist_chzn").fadeIn();
                        //加载圈子
                        ajaxfunc("create_activity.axd", "{opertype:'getkevaluecreateactivitybygroup'}", errorFunc, function (data) {
                            if (data.result) {
                                bindDropDownList("ddlactivitygrouplist", data.data, true);
                                var groupid = getQueryString("gid");
                                if (groupid != undefined) {
                                    $("#ddlactivitygrouplist").val(groupid);
                                }
                            }
                            else {
                                bindDropDownList("ddlactivitygrouplist", null, false);
                                //                                $("#ddlactivitygrouplist").fadeOut();
                                //                                $("#ddlactivitygrouplist_chzn").fadeOut();
                            }
                        });
                    }
                    else {
                        $("#ddlactivitygrouplist").remove();
                        $("#ddlactivitygrouplist_chzn").remove();
                    }
                    //saveinitrefparamcookiedata();
                });
            }
            else
                bindDropDownList("ddlactivitycreater", null, false);
        });


        //缴费方式说明 綁定下拉菜单基础数据
        ajaxfunc("create_activity.axd", "{opertype:'getkeyvaluejsonallpaytype'}", function (data) {
        }, function (data) {
            if (data.result) {
                bindDropDownList("ddlactivitypaytype", data.data, true).change(function () {
                    $.cookies.set("ddlactivitypaytype", $("#ddlactivitypaytype").children('option:selected').val());
                });
            }
            else
                bindDropDownList("ddlactivitypaytype", null, false);
        });

        //报名方式
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
            }
        });


        //活动参数设定-分类标记
        $("#btnactivityac").click(function () {
            wanerdaoac({
                alphopts: { title: '活动分类', id: 'ac', elementid: 'btnactivityac', callback: function (data) {
                    if (data.result) {
                        $('#divaclist li').remove();
                        //此处填充<span><a href="#">周华建</a><a href="#"><img src="images/del_pep.png"></a></span> 
                        $.each(data.acs, function (i, n) {
                            var temp = '<li id="{0}"><a href="{1}" target="_blank">{2}</a><a href="javascript:;"><img src="/images/del_pep.png"/></a></span>';
                            temp = temp.replace("{0}", data.acs[i].id);
                            temp = temp.replace("{1}", data.acs[i].id);
                            temp = temp.replace("{2}", data.acs[i].name);
                            if (!($('#activitytagsul li[id="' + data.acs[i].id + '"]') != null
                            && $('#activitytagsul li[id="' + data.acs[i].id + '"]').length >= 1)) {
                                $('#activitytagsul').append(temp);
                            }

                        });
                        $('#activitytagsul li a').click(function () {
                            $(this).parent().remove();
                        });
                    }
                }
                }
            });
        });
        //活动分类集合
        function saveactivitycategorylist() {
            $.cookies.set("activitycategorylist", $('#activitytagsul').html());
        };


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


        //获取用户信息
        $("#txtCreateTime").datetimepicker(); //报名时间
        $("#txtBeginTime").datetimepicker();
        $("#txtEndTime").datetimepicker();
        ajaxfunc("create_activity.axd", "{opertype:'getcreateactivitypersonalinfo'}", errorFunc, function (data) {
            if (data.result) {
                $("#txtactivitytelphone").val(managevalue.createuserphone); // (data.data.phone); valueindexInfor.createuserphone
                $("#txtactivityemail").val(managevalue.createuseremail); // (data.data.email);
                $("#txtactivityname").val(managevalue.activityname);
                $("#txtCreateTime").val(managevalue.createdatetime); //报名时间
                $("#txtBeginTime").val(managevalue.begintime);
                $("#txtEndTime").val(managevalue.endtime);
                $("#txtareaDes").val(managevalue.desc);

                //活动分类标记
                var v_managecontent = "";
                if (managevalue.activitytags != null) {
                    $.each(managevalue.activitytags, function (i, msg) {
                        var temp = '<li id="{0}"><a href="{1}" target="_blank">{2}</a><a href="javascript:;"><img src="/images/del_pep.png"/></a></span>';
                        temp = temp.replace("{0}", msg.id);
                        temp = temp.replace("{1}", msg.id);
                        temp = temp.replace("{2}", msg.name);
                        v_managecontent += temp;
                    });
                }
                $("#activitytagsul").html(v_managecontent);
                saveactivitycategorylist();
                //超级管理员     
                v_managecontent = "";
                if (managevalue.operationmanager != null) {
                    arryoperater = [];
                    $.each(managevalue.operationmanager, function (i, msg) {
                        var temp = '<li id="{0}"><a href="{1}" target="_blank">{2}</a><a href="javascript:;"><img src="/images/del_pep.png"/></a></span>';
                        temp = temp.replace("{0}", msg.id);
                        temp = temp.replace("{1}", msg.id);
                        temp = temp.replace("{2}", msg.name);
                        v_managecontent += temp;
                        var objoperater = { "id": msg.id, "name": msg.name }
                        arryoperater.push(objoperater);
                    });
                }
                $("#operationmanagerul").html(v_managecontent);

                //财务管理员
                v_managecontent = "";
                if (managevalue.financialmanager != null) {
                    arrfinancer = [];
                    $.each(managevalue.financialmanager, function (i, msg) {
                        var temp = '<li id="{0}"><a href="{1}" target="_blank">{2}</a><a href="javascript:;"><img src="/images/del_pep.png"/></a></span>';
                        temp = temp.replace("{0}", msg.id);
                        temp = temp.replace("{1}", msg.id);
                        temp = temp.replace("{2}", msg.name);
                        v_managecontent += temp;
                        var objfinace = { "id": msg.id, "name": msg.name }
                        arrfinancer.push(objfinace);
                    });
                }
                $("#financialmanagerul").html(v_managecontent);

                if (managevalue.SignupInfo != null) {
                    var managepay = managevalue.SignupInfo;
                    if (managepay.typeid != null) {
                        $("#" + managepay.typeid).attr("checked", "checked");
                    }
                    $("#txtypaymoney").val(managepay.cost);
                    if (managepay.paymethodsinfo != null) {
                        $("#ddlactivitypaytype").val(managepay.paymethodsinfo[0].pay_type_id);
                        $("#ddlactivitypaytype").chosen();

                    }
                }
            }
        });

    };



    function loadinitrefparamcookiedata() {

        if ($.cookies.get("ddlactivitycreater") != null) {
            $("#ddlactivitycreater").cookieBind();
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

        if ($.cookies.get("ckactivityispublic") != null) {
            $("#ckactivityispublic").cookieBind();
        }
    };
    //function saveinitrefparamcookiedata() {
    //临时保存到cookie里面
    //        $.cookies.set("ddlactivityhistory", $("#ddlactivityhistory").children('option:selected').val());
    //        $.cookies.set("ddlactivitycraft", $("#ddlactivitycraft").children('option:selected').val());
    //        $.cookies.set("ddlactivitycreater", $("#ddlactivitycreater").children('option:selected').val());
    //        $.cookies.set("ddlactivitygrouplist", $("#ddlactivitygrouplist").children('option:selected').val());
    //        $.cookies.set("txtactivitytelphone", $("#txtactivitytelphone").val());
    //        $.cookies.set("txtactivityemail", $("#txtactivityemail").val());
    //        $.cookies.set("txtactivitysuper", $("#txtactivitysuper").val());
    //        $.cookies.set("ckactivityispublic", $("#ckactivityispublic").attr("checked") !== false ? "on" : "off");
    //};
    //    function addinitrefparamevent() {
    //        $("#ddlactivitygrouplist").change(function () {
    //            saveinitrefparamcookiedata();
    //        });
    //        //电话,邮箱

    //        $("#txtactivitytelphone,#txtactivityemail,#ckactivityispublic").change(function () {
    //            saveinitrefparamcookiedata();
    //        });
    //        $("#ddlactivitygrouplist_chzn").fadeOut();
    //    };
    //    function errorFunc(data) {
    //    };
})(jQuery);
