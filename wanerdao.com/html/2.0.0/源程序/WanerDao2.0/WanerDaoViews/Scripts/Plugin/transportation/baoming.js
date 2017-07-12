(function ($) {
    $.fn.tran = function () {
        return this.each(function () {
            $this = $(this);
            $this.after(jQuery.getUI());
            jQuery.loaddata();
        });
    };
})(jQuery);
jQuery.extend({
    getUI: function () {
        var ui = '<div class="activity_signup_options"><span>准备通过：</span>';
        ui += '   <select id="vehicle" name="vehicle" class="combobox w80px" style="width:90px;" ></select><span>参加活动</span>&nbsp;&nbsp;&nbsp;';
        ui += '   <span id="takecar" style="display:none;width:150px"><select id="ifVehicle" name="ifVehicle" class="combobox w80px" style="width:58px;" >';
        ui += '     <option value="0">有</option>';
        ui += '     <option value="1">无</option>';
        ui += '</select>车参加活动&nbsp;&nbsp;&nbsp;</span>';
        ui += '   <span id="nocar" style="display:none;width:240px"><select id="willing" name="willing" class="w120" >';
        ui += '     <option value="0">愿意提供搭车</option>';
        ui += '     <option value="1">不愿意提供搭车</option>';
        ui += '</select>';
        ui += '   <select id="choosePeople" name="choosePeople" class="w120" >';
        ui += '     <option value="0">可选搭车人</option>';
        ui += '     <option value="1">不需选搭车人</option>';
        ui += '</select></span>';
        ui += '   </div>';
        ui += '<div id="divfare" class="activity_signup_options"><span>搭车费： </span>';
        ui += '  <select id="takeFare" name="takeFare" class="combobox w80px" style="width:90px;" ></select>';
        ui += ' <span id="peoplemoney" style="display:none">每人￥</span><input id="txtmoney" type="text" class="input_b" style="display:none"/>';
        ui += '</div>';
        ui += '<div id="divmodel" class="activity_signup_options"> <span>车型：</span>';
        ui += ' <select id="licensePlate" name="licensePlate" class="combobox w80px" style="width:90px;" ></select>';
        ui += ' <select id="model" name="model" class="combobox w80px" style="width:90px;" ></select><span>车牌号</span><input id="txtcarid" type="text" class="input_b" />';
        ui += '</div>';
        ui += '<div id="divcaryear" class="activity_signup_options"> <span>年代：</span>';
        ui += ' <input id="txtcaryear" type="text" class="input_a" /> ';
        ui += ' &nbsp;&nbsp;愿意提供空位数：';
        ui += ' <input id="txtcarseat" type="text" class="input_b" />';
        ui += '</div>';
        return ui;
    },
    loaddata: function () {
        var otype = "{opertype:'{0}'";
        //准备通过
        ajaxfunc("create_activity.axd", otype.replace("{0}", "getkeyvaluejsonallvehicletype"), function (data) { }, function (data) {
            bindDropDownList("#vehicle", data.rows, true);
            jQuery("#vehicle").change(function () {
                if (jQuery(this).children('option:selected').val() == "0") {
                    jQuery("#takecar").fadeIn();
                    jQuery("#divfare").fadeIn();
                    jQuery("#divmodel").fadeIn();
                    jQuery("#divcaryear").fadeIn();
                }
                else {
                    jQuery("#takecar").fadeOut();
                    jQuery("#divfare").fadeOut();
                    jQuery("#divmodel").fadeOut();
                    jQuery("#divcaryear").fadeOut();
                }
            });
            //注册是否有车事件
            jQuery("#takecar").change(function () {
                if (jQuery(this).children('option:selected').val() == "0") {
                    jQuery("#nocar").fadeIn();
                    jQuery("#divfare").fadeIn();
                    jQuery("#divmodel").fadeIn();
                    jQuery("#divcaryear").fadeIn();
                    //获取搭车费用
                    ajaxfunc("create_activity.axd", otype.replace("{0}", "getkeyvaluejsonallcarpooltype"), function (data) { }, function (data) {
                        bindDropDownList("#takeFare", data.rows, true);
                        jQuery("#takeFare").change(function () {
                            if (jQuery(this).children('option:selected').val() == "29720") {
                                jQuery("#peoplemoney").fadeIn();
                                jQuery("#txtmoney").fadeIn();
                            }
                            else {
                                jQuery("#peoplemoney").fadeOut();
                                jQuery("#txtmoney").fadeOut();
                            }
                        });
                    });
                    //获取车牌
                    ajaxfunc("create_activity.axd", otype.replace("{0}", "getkeyvaluejsonallautobrand"), function (data) { }, function (data) {
                        bindDropDownList("#licensePlate", data.rows, true);
                    });
                    //获取车型
                    ajaxfunc("create_activity.axd", otype.replace("{0}", "getkeyvaluejsonallautomodel"), function (data) { }, function (data) {
                        bindDropDownList("#model", data.rows, true);
                    });
                }
                else {
                    jQuery("#nocar").fadeOut();
                    jQuery("#divfare").fadeOut();
                    jQuery("#divmodel").fadeOut();
                    jQuery("#divcaryear").fadeOut();
                }
            });
        });
    }
});