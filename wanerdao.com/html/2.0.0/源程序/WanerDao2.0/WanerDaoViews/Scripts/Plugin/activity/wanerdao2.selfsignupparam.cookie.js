//个人报名
(function ($) {
    $.fn.selfsignupparam = function () {
        return this.each(function () {
            $this = $(this);
//            var loadmsg = $('<img src="/images/loading12.gif" alt="' + wanerdaoLangTip('common_00009') + '" title="' + wanerdaoLangTip('common_00009') + '"/>');
//            $this.after(loadmsg);
            $this.after(getsignupfparamUI());
            //loadmsg.remove();
            loadsignupfparamdata();
            loadcache();
        });
    };
    function getsignupfparamUI() {
        var ui = '<div id="divstep5">';
        ui += '<table id="tablecar" width="80%" border="0" cellspacing="1">';
        ui += '<tr>';
        ui += '  <td width="25%" align="right">准备通过：</td>';
        ui += '   <td width="75%">';
        ui += '   <select id="vehicle" name="vehicle" class="w91" ></select>参加活动&nbsp;&nbsp;&nbsp;';
        ui += '   <span id="takecar" style="display:none"><select id="ifVehicle" name="ifVehicle" class="w91" >';
        ui += '     <option value="-2">请选择</option>';
        ui += '     <option value="0">有</option>';
        ui += '     <option value="1">无</option>';
        ui += '</select>车参加活动&nbsp;&nbsp;&nbsp;</span>';
        ui += '   <span id="nocar" style="display:none"><select id="willing" name="willing" class="w120" >';
        ui += '     <option value="-2">请选择</option>';
        ui += '     <option value="0">愿意提供搭车</option>';
        ui += '     <option value="1">不愿意提供搭车</option>';
        ui += '</select>';
        //        ui += '   <select id="choosePeople" name="choosePeople" class="w120" >';
        //        ui += '     <option value="-2">请选择</option>';
        //        ui += '     <option value="0">可选搭车人</option>';
        //        ui += '     <option value="1">不需选搭车人</option>';
        //        ui += '</select>';
        ui += '</span>';
        ui += '   </td>';
        ui += '</tr>';
        ui += '<tr style="display:none">';
        ui += ' <td align="right">搭车费：</td>';
        ui += ' <td>';
        ui += '  <select id="takeFare" name="takeFare" class="w91" ></select>&nbsp;&nbsp;&nbsp;<span id="peoplemoney" style="display:none">每人￥<input id="txtmoney" type="text" class="txtInt" /></span></td>';
        ui += '</tr>';
        ui += '<tr style="display:none">';
        ui += ' <td align="right">车型：</td>';
        ui += ' <td>';
        ui += ' <select id="licensePlate" name="licensePlate" class="w91" ></select>&nbsp;&nbsp;&nbsp;';
        ui += ' <select id="model" name="model" class="w91" ><option value="-2">请选择车型</option></select> &nbsp;&nbsp;&nbsp;车牌号：<input id="txtcarid" type="text" class="txtInt" /></td>';
        ui += '</tr>';
        ui += '<tr style="display:none">';
        ui += ' <td align="right">年代：</td>';
        ui += ' <td><input id="txtcaryear" type="text" class="txtInt" /> ';
        ui += ' &nbsp;&nbsp;&nbsp;愿意提供空位数：';
        ui += ' <input id="txtcarseat" type="text" class="txtInt" /></td>';
        ui += '</tr>';
        ui += '</table>';
        ui += '</div>';
        return ui;
    };
    function loadsignupfparamdata() {
        var otype = "{opertype:'{0}'}";
        //准备通过
        ajaxfunc("create_activity.axd", otype.replace("{0}", "getkeyvaluejsonallvehicletype"), function (data) { }, function (data) {
            bindDropDownList("vehicle", data.data, true);
            jQuery("#vehicle").change(function () {
                if ($(this).children('option:selected').val() == "0329e2cc-8ae2-11e1-a95e-101f74b66417") {
                    jQuery("#takecar").fadeIn();
                    jQuery("#tablecar tr:gt(0)").each(function () {
                        jQuery(this).fadeOut();
                    });
                }
                else {
                    jQuery("#nocar").fadeOut();
                    jQuery("#takecar").fadeOut();
                    jQuery("#tablecar tr:gt(0)").each(function () {
                        jQuery(this).fadeOut();
                    });
                }
                $.cookies.set("vehicle", $("#vehicle").children('option:selected').val());
            });
            //注册是否有车事件
            jQuery("#ifVehicle").change(function () {
                if (jQuery(this).children('option:selected').val() == "0" && $(this).children('option:selected').val() !== "-2") {
                    jQuery("#nocar").fadeIn();
                    jQuery("#tablecar tr:gt(0)").each(function () {
                        jQuery(this).show();
                    });
                    //获取搭车费用
                    ajaxfunc("create_activity.axd", otype.replace("{0}", "getkeyvaluejsonallcarpooltype"), function (data) { }, function (data) {
                        bindDropDownList("takeFare", data.data, true);
                        jQuery("#takeFare").change(function () {
                            if (jQuery(this).children('option:selected').val() !== "a0a72a90-599e-11e1-9350-101f74b66417") {
                                jQuery("#peoplemoney").fadeIn();
                            }
                            else {
                                jQuery("#peoplemoney").fadeOut();
                            }
                            if (jQuery(this).children('option:selected').val() == "-2") {
                                jQuery("#peoplemoney").hide();
                            }

                            $.cookies.set("takeFare", $("#takeFare").children('option:selected').val());
                        });
                    });
                    //获取车牌
                    ajaxfunc("create_activity.axd", otype.replace("{0}", "getkeyvaluejsonallautobrand"), function (data) { }, function (data) {
                        bindDropDownList("licensePlate", data.data, true);
                        jQuery("#licensePlate").change(function () {
                            if (jQuery(this).children('option:selected').val() !== "-2") {
                                //获取车型
                                ajaxfunc("create_activity.axd", "{opertype:'getkeyvaluejsonallautomodelbybrandid',brandid:'" + jQuery(this).children('option:selected').val() + "'}", function (data) { }, function (data) {
                                    bindDropDownList("model", data.data, true).change(function () {
                                        $.cookies.set("model", $("#model").children('option:selected').val());
                                    }); ;
                                });
                            }

                            $.cookies.set("licensePlate", $("#licensePlate").children('option:selected').val());
                        });
                    });

                }
                else {
                    jQuery("#nocar").fadeOut();
                    jQuery("#tablecar tr:gt(0)").each(function () {
                        jQuery(this).hide();
                    });
                }
                $.cookies.set("ifVehicle", $("#ifVehicle").children('option:selected').val());
            });
        });
        //willing
        jQuery("#willing").change(function () {
            $.cookies.set("willing", $("#willing").children('option:selected').val());
        });
        $("#txtmoney,#txtcarid,#txtcaryear,#txtcarseat").change(function () {
            $.cookies.set($(this).attr("id"), $(this).val());
        });
    };
    //加载cache
    function loadcache() {
        if ($.cookies.get("vehicle") != null) {//参加活动方式
            $("#vehicle").cookieBind();
        }
        if ($.cookies.get("ifVehicle") != null) {//参加活动是否有车
            $("#ifVehicle").cookieBind();
        }
        if ($.cookies.get("willing") != null) {//愿意提供搭车
            $("#willing").cookieBind();
        }
        if ($.cookies.get("takeFare") != null) {//搭车费
            $("#takeFare").cookieBind();
        }
        if ($.cookies.get("txtmoney") != null) {//每人花费
            $("#txtmoney").cookieBind();
        }
        if ($.cookies.get("licensePlate") != null) {//汽车厂家
            $("#licensePlate").cookieBind();
        }
        if ($.cookies.get("model") != null) {//车型
            $("#model").cookieBind();
        }
        if ($.cookies.get("txtcarid") != null) {//车牌
            $("#txtcarid").cookieBind();
        }
        if ($.cookies.get("txtcaryear") != null) {//年代
            $("#txtcaryear").cookieBind();
        }
        if ($.cookies.get("txtcarseat") != null) {//愿意提供空位数
            $("#txtcarseat").cookieBind();
        }
    };
})(jQuery);
