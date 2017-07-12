//参数保存
(function ($) {
    $.fn.saveparam = function () {
        return this.each(function () {
            var $this = $(this);
            $this.append(_getUI());
            _addevent();
            _loaddatacache();
        });
    };
    function _getUI() {
        var ui = '<div id="divstep6" class="setmodList saveParameter">';
        ui += '<div class="saveParameterWarp">';
        ui += ' <dl>';
        ui += '   <dd class="fSize-12 fCblue">';
        ui += '     <p class="icon16 circle">合理保存常用的活动参数，可以让创佳更加快捷</p>';
        ui += '   </dd>';
        ui += ' </dl>';
        ui += ' <dl>';
        ui += '   <dd class="saveParameterForm">';
        ui += '     <input type="checkbox" id="ckactivitysaveset">';
        ui += '     <label for="ckactivitysaveset">保存活动设置</label>&nbsp;';
        ui += '     <input id="txtsavetempactivename" type="text" style="width:160px;display:none;" class="text">';
        ui += '   </dd>';
        ui += ' </dl>';
        ui += ' </div>';
        ui += '</div>';
        return ui;
    };
    function _addevent() {
        $("#ckactivitysaveset,#txtsavetempactivename").change(function () {
            if ($(this).attr("checked")) {
                $('#txtsavetempactivename').fadeIn().val($('#txtactivitytitle').val());
            }
            else {
                $('#txtsavetempactivename').fadeOut();
            }
            $.cookies.set("ckactivitysaveset", $("#ckactivitysaveset").attr("checked") !== false ? "on" : "off");
            $.cookies.set("txtsavetempactivename", $("#txtsavetempactivename").val());
        });
    };
    function _loaddatacache() {
        if ($.cookies.get("ckactivitysaveset") != null) {
            $("#ckactivitysaveset").cookieBind();
            $('#txtsavetempactivename').fadeIn().val($('#txtactivitytitle').val());
        }
        if ($.cookies.get("txtsavetempactivename") != null) {
            $("#txtsavetempactivename").cookieBind();
        }
    };
})(jQuery);