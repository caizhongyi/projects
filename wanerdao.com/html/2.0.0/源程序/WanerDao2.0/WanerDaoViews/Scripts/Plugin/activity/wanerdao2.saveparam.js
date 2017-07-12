//参数保存
(function ($) {
    $.fn.saveparam = function () {
        return this.each(function () {
            var $this = $(this);
//            var loadmsg = $('<img src="/images/loading12.gif" alt="' + wanerdaoLangTip('common_00009') + '" title="' + wanerdaoLangTip('common_00009') + '"/>');
//            $this.after(loadmsg);
            $this.after(getui());
            //loadmsg.remove();
            addevent();
            loaddatacache();
        });
    };
    function getui() {
        var ui = '<div id="divstep6">';
        ui += '<div class="save_var">';
        ui += ' <div class="svTop"></div>';
        ui += '   <div class="svCon">';
        ui += '   <p>合理的保存常用的活动参数，可以让创建更加快捷。</p>';
        ui += '    <div class="checkbox_save">';
        ui += '     <input type="checkbox" id="ckactivitysaveset">';
        ui += '     <label for="ckactivitysaveset">保存活动设置</label>&nbsp;';
        ui += '     <input id="txtsavetempactivename" type="text" style="width:155px;" class="txtInt">';
        ui += '   </div>';
        ui += ' </div>';
        ui += ' <div class="svBtm"></div>';
        ui += ' </div>';
        ui += '</div>';
        return ui;
    };
    function addevent() {
        $("#ckactivitysaveset,#txtsavetempactivename").change(function () {
            $.cookies.set("ckactivitysaveset", $("#ckactivitysaveset").attr("checked") !== false ? "on" : "off");
            $.cookies.set("txtsavetempactivename", $("#txtsavetempactivename").val());
        });
    };
    function loaddatacache() {
        if ($.cookies.get("ckactivitysaveset") != null) {
            $("#ckactivitysaveset").cookieBind();
        }
        if ($.cookies.get("txtsavetempactivename") != null) {
            $("#txtsavetempactivename").cookieBind();
        }
    };
})(jQuery);