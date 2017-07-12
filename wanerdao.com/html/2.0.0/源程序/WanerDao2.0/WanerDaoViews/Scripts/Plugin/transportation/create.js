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
        var ui = '<table id="tablecar" width="80%" border="0" cellspacing="1">';
        ui += '<tr>';
        ui += '  <td width="25%" align="right">准备通过：</td>';
        ui += '   <td width="75%">';
        ui += '   <select id="vehicle" name="vehicle" class="w91" ></select>参加活动&nbsp;&nbsp;&nbsp;';
        ui += '   <span id="takecar" style="display:none"><select id="ifVehicle" name="ifVehicle" class="w91" >';
        ui += '     <option value="0">有</option>';
        ui += '     <option value="1">无</option>';
        ui += '</select>车参加活动&nbsp;&nbsp;&nbsp;</span>';
        ui += '   <span id="nocar" style="display:none"><select id="willing" name="willing" class="w120" >';
        ui += '     <option value="0">愿意提供搭车</option>';
        ui += '     <option value="1">不愿意提供搭车</option>';
        ui += '</select>';
        ui += '   <select id="choosePeople" name="choosePeople" class="w120" >';
        ui += '     <option value="0">可选搭车人</option>';
        ui += '     <option value="1">不需选搭车人</option>';
        ui += '</select></span>';
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
        ui += ' <select id="model" name="model" class="w91" ></select> &nbsp;&nbsp;&nbsp;车牌号：<input id="txtcarid" type="text" class="txtInt" /></td>';
        ui += '</tr>';
        ui += '<tr style="display:none">';
        ui += ' <td align="right">年代：</td>';
        ui += ' <td><input id="txtcaryear" type="text" class="txtInt" /> ';
        ui += ' &nbsp;&nbsp;&nbsp;愿意提供空位数：';
        ui += ' <input id="txtcarseat" type="text" class="txtInt" /></td>';
        ui += '</tr>';
        ui += '</table>';
        return ui;
    },
    loaddata: function () {
        var otype = "{opertype:'{0}'";
        //准备通过
        ajaxfunc("create_activity.axd", otype.replace("{0}", "getkeyvaluejsonallvehicletype"), function (data) { }, function (data) {
            bindDropDownList("vehicle", data.rows, true);
            jQuery("#vehicle").change(function () {
                if (jQuery(this).children('option:selected').val() == "0") {
                    jQuery("#takecar").fadeIn();
                    jQuery("#tablecar tr:gt(0)").each(function () {
                        jQuery(this).fadeOut();
                    });
                }
                else {
                    jQuery("#takecar").fadeOut();
                    jQuery("#tablecar tr:gt(0)").each(function () {
                        jQuery(this).fadeOut();
                    });
                }
            });
            //注册是否有车事件
            jQuery("#takecar").change(function () {
                if (jQuery(this).children('option:selected').val() == "0") {
                    jQuery("#nocar").fadeIn();
                    jQuery("#tablecar tr:gt(0)").each(function () {
                        jQuery(this).fadeIn();
                    });
                    //获取搭车费用
                    ajaxfunc("create_activity.axd", otype.replace("{0}", "getkeyvaluejsonallcarpooltype"), function (data) { }, function (data) {
                        bindDropDownList("takeFare", data.rows, true);
                        jQuery("#takeFare").change(function () {
                            if (jQuery(this).children('option:selected').val() == "29720") {
                                jQuery("#peoplemoney").fadeIn();
                            }
                            else {
                                jQuery("#peoplemoney").fadeOut();
                            }
                        });
                    });
                    //获取车牌
                    ajaxfunc("create_activity.axd", otype.replace("{0}", "getkeyvaluejsonallautobrand"), function (data) { }, function (data) {
                        bindDropDownList("licensePlate", data.rows, true);
                    });
                    //获取车型
                    ajaxfunc("create_activity.axd", otype.replace("{0}", "getkeyvaluejsonallautomodel"), function (data) { }, function (data) {
                        bindDropDownList("model", data.rows, true);
                    });
                }
                else {
                    jQuery("#nocar").fadeOut();
                    jQuery("#tablecar tr:gt(0)").each(function () {
                        jQuery(this).fadeOut();
                    });
                }
            });
        });
    }
});