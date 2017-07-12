//分步骤导航
(function ($) {
    $.fn.stepslink = function () {
        return this.each(function () {
            $this = $(this);
//            var loadmsg = $('<img src="/images/loading12.gif" alt="' + wanerdaoLangTip('common_00009') + '" title="' + wanerdaoLangTip('common_00009') + '"/>');
//            $this.after(loadmsg);
            //构建页面
            $this.after(getstepsui());
            //loadmsg.remove();
        });
    };
    //构造分步骤结构
    function getstepsui() {
        var ui = '<ul class="steps yh fb">';
        ui += ' <li id="listep1" class="active"><i>1</i><span>初始参数引用</span></li>';
        ui += ' <li id="listep2" class="link"><i>2</i><span>基本参数设定</span></li>';
        ui += ' <li id="listep3" class="link"><i>3</i><span>报名参数设定</span></li>';
        ui += ' <li id="listep4" class="link"><i>4</i><span>邀请发送</span></li>';
        ui += ' <li id="listep5" class="link"><i>5</i><span>个人报名</span></li>';
        ui += ' <li id="listep6" class="link"><i>6</i><span>参数保存</span></li>';
        ui += '</ul>';
        return ui;
    };
})(jQuery);