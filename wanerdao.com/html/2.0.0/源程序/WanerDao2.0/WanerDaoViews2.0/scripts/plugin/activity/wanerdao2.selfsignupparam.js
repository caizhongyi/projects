//个人报名
(function ($) {
    $.fn.selfsignupparam = function () {
        return this.each(function () {
            var $this = $(this);
            var pagerloading = $('<div class="pager-loading"><div class="loading-layer"></div></div>');
            //var loadmsg = $('<img src="/images/loading12.gif" alt="' + wanerdaoLangTip('common_00009') + '" title="' + wanerdaoLangTip('common_00009') + '"/>');
            $this.append(pagerloading);
            $this.append(_getUI());
            __loaddata();
            //pagerloading.remove();
        });
        //获取其UI
        function _getUI() {
            var ui = '<div id="divstep" class="setmodList applyPerson">';
            ui += '<dl>';
            ui += ' <dd class="formTitle">准备通过：</dd>';
            ui += ' <dd class="formMain">';
            ui += ' <select id="vehicle" name="vehicle" style="width:110px;"><option value="-2" selected="selected">请选择</option></select>';
            ui += ' 参加活动';
            ui += '<span id="takecar" style="display:none">';
            ui += ' <select id="ifVehicle" name="ifVehicle" style="width:63px;">';
            ui += '     <option value="-2"  selected="selected">请选择</option>';
            ui += '     <option value="0">有</option>';
            ui += '     <option value="1">无</option>';
            ui += ' </select>';
            ui += '车参加活动';
            ui += '</span>';
            ui += '<span id="nocar" style="display:none">';
            ui += ' <select id="willing" name="willing" style="width:110px;">';
            ui += '     <option value="-2" selected="selected">请选择</option>';
            ui += '     <option value="0">愿意提供搭车</option>';
            ui += '     <option value="1">不愿意提供搭车</option>';
            ui += ' </select>';
            ui += '</span>';
            //            ui += '<span id="nowilling" style="display:none">';
            //            ui += ' <select id="choosePeople" name="choosePeople" style="width:110px;">';
            //            ui += '     <option value="-2" selected="selected">请选择</option>';
            //            ui += '     <option value="0">可选搭车人</option>';
            //            ui += '     <option value="1">不需选搭车人</option>';
            //            ui += ' </select>';
            //            ui += '</span>';
            ui += '</dd>';
            ui += '</dl>';
            ui += '<dl class="clear2"/>';
            ui += '<dl id="dlfare" style="display:none">';
            ui += ' <dd class="formTitle">搭车费：</dd>';
            ui += ' <dd class="formMain">';
            ui += '     <select name="takeFare" id="takeFare" style="width:80px;"><option value="-2" selected="selected">请选择</option></select>';
            ui += '     &nbsp;&nbsp;<span id="peoplemoney" style="display:none">每人￥<input id="txtmoney" type="text" class="text" /></span>';
            ui += ' </dd>';
            ui += '</dl>';
            ui += '<dl class="clear2"/>';
            ui += '<dl id="dlmodel" style="display:none">';
            ui += ' <dd class="formTitle">车型：</dd>';
            ui += ' <dd class="formMain">';
            ui += '      <select name="licensePlate" id="licensePlate" style="width:110px;"><option value="-2" selected="selected">请选择</option></select>';
            ui += '     <select id="model" name="model" style="width:114px;"><option value="-2" selected="selected">请选择车型</option></select> &nbsp;&nbsp;&nbsp;';
            ui += '     车牌号：<input id="txtcarid" type="text" class="text"  style="width:113px;"/>';
            ui += ' </dd>';
            ui += '</dl>';
            ui += '<dl class="clear2"/>';
            ui += '<dl id="dlyear" style="display:none">';
            ui += ' <dd class="formTitle">年代：</dd>';
            ui += ' <dd class="formMain">';
            ui += '      <input type="text" class="text" id="txtcaryear"  style="width:189px;"/>';
            ui += '     愿意提供空位数';
            ui += '     <input id="txtcarseat" type="text" class="text"  style="width:113px;" value="0"/>';
            ui += ' </dd>';
            ui += '</dl>';
            ui += '<dl class="clear2"/>';
            ui += '</div>';
            return ui;
        }
        function __loaddata() {
            var otype = "{opertype:'{0}'}";
            //准备通过
            ajaxfunc("create_activity.axd", otype.replace("{0}", "getkeyvaluejsonallvehicletype"), function (data) { }, function (data) {
                bindDropDownList("vehicle", data.data, true);
                $("#vehicle").change(function () {
                    if ($(this).children('option:selected').val() === "0329e2cc-8ae2-11e1-a95e-101f74b66417") {
                        $("#takecar").fadeIn();
                        $("#dlfare").fadeOut();
                        $("#dlmodel").fadeOut();
                        $("#dlyear").fadeOut();
                    }
                    else {
                        $("#nocar").fadeOut();
                        //$("#nowilling").fadeOut();
                        $("#takecar").fadeOut();
                        $("#dlfare").fadeOut();
                        $("#dlmodel").fadeOut();
                        $("#dlyear").fadeOut();
                    }
                });
                $("#willing").chosen();
                //是否愿意提供车辆给人搭乘
                $("#willing").change(function () {
                    if ($(this).children('option:selected').val() == "0" && $(this).children('option:selected').val() !== "-2") {
                        //$("#nowilling").fadeIn();
                        //                        $("#choosePeople").chosen();
                        $("#dlfare").fadeIn();
                    }
                    else {
                        //$("#nowilling").fadeOut();
                        $("#dlfare").fadeOut();
                    }
                });
                $("#ifVehicle").chosen();
                //注册是否有车事件
                $("#ifVehicle").change(function () {
                    if ($(this).children('option:selected').val() == "0" && $(this).children('option:selected').val() !== "-2") {
                        $("#nocar").fadeIn();
                        //$("#dlfare").show();
                        $("#dlmodel").show();
                        $("#dlyear").show();
                        //获取搭车费用
                        ajaxfunc("create_activity.axd", otype.replace("{0}", "getkeyvaluejsonallcarpooltype"), function (data) { }, function (data) {
                            bindDropDownList("takeFare", data.data, true);
                            $("#takeFare").change(function () {
                                if ($(this).children('option:selected').val() !== "a0a72a90-599e-11e1-9350-101f74b66417") {
                                    $("#peoplemoney").fadeIn();
                                }
                                else {
                                    $("#peoplemoney").fadeOut();
                                }
                                if ($(this).children('option:selected').val() == "-2") {
                                    $("#peoplemoney").hide();
                                }

                            });
                        });
                        $("#model").chosen();
                        //获取车牌
                        ajaxfunc("create_activity.axd", otype.replace("{0}", "getkeyvaluejsonallautobrand"), function (data) { }, function (data) {
                            bindDropDownList("licensePlate", data.data, true);
                            $("#licensePlate").change(function () {
                                if ($(this).children('option:selected').val() !== "-2") {
                                    //获取车型
                                    ajaxfunc("create_activity.axd", "{opertype:'getkeyvaluejsonallautomodelbybrandid',brandid:'" + $(this).children('option:selected').val() + "'}", function (data) { }, function (data) {
                                        bindDropDownList("model", data.data, true);
                                    });
                                }
                            });
                        });

                    }
                    else {
                        $("#nocar").fadeOut();
                        //$("#nowilling").fadeOut();
                        $("#dlfare").hide();
                        $("#dlmodel").hide();
                        $("#dlyear").hide();
                    }
                });
            });
        }
    };
})($);