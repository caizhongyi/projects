//分步骤导航
(function ($) {
    $.fn.optionpanel = function (options) {
        var defaults = {
            showstep: true
        };
        var opts = $.extend({}, defaults, options);
        return this.each(function () {
            $this = $(this);
            //            var loadmsg = $('<img src="/images/loading12.gif" alt="' + wanerdaoLangTip('common_00009') + '" title="' + wanerdaoLangTip('common_00009') + '"/>');
            //            $this.append(loadmsg);
            //构建页面
            $this.append(getstepsui());
            //loadmsg.remove();
            if ($.cookies.get("step") == null) {
                firstshow();
            }
            //注册事件
            showuiandaddparamevent(opts);
            loadcache(opts);
        });
    };
    //构造分步骤结构
    function getstepsui() {
        var ui = '<span id="steppre" style="display:none"><a href="javascript:;" class="btn_135x36">上一步</a>&nbsp;&nbsp;</span>';
        ui += '	<span id="stepnext" style="display:none"><a href="javascript:;" class="btn_135x36">下一步</a>&nbsp;&nbsp;</span>';
        ui += '<span id="spanactivityoption" style="display:none">';
        ui += '<a href="javascript:;" class="btn_135x36" id="createactivity">创建活动</a>&nbsp;&nbsp;';
        ui += '<a href="javascript:;" class="btn_163x36" id="saveactivityparam">保存参数暂不创建</a>&nbsp;&nbsp;';
        ui += '<a href="javascript:;" class="btn_97x36">取消</a></span>';
        return ui;
    };
    //第一次显示
    function firstshow() {
        $(".steps").initrefparam();
    };
    function showuiandaddparamevent(opts) {
        $('#createactivity').click(function () {
            activitycreate(0)
        });
        $('#saveactivityparam').click(function () {
            activitycreate(1)
        });
        if (!opts.showstep) {
            $("#spanactivityoption").fadeIn();
        }
        else {
            //控制下一步
            $("#stepnext").show().click(function () {
                var step = 2;
                if ($.cookies.get("step") != null) {
                    step = 1 + parseInt($.cookies.get("step"));
                }
                $("#divstep" + (step - 1)).hide();
                if ($("#divstep" + step).length > 0) {
                    $("#divstep" + step).show();
                }
                else {
                    goshowstep(step);
                }
                if (step > 6) {
                    step = 6;
                }
                $.cookies.set("step", step);
                $("#listep" + (step - 1)).removeClass().addClass("visited");
                $("#listep" + step).removeClass().addClass("active");
                if (step == 6) {
                    $(this).fadeOut();
                    $("#spanactivityoption").show();
                }
                $("#steppre").show();
            });
            //控制上一步
            $("#steppre").click(function () {
                if ($.cookies.get("step") != null) {
                    var p = parseInt($.cookies.get("step"));
                    $("#divstep" + p).hide();
                    if ($("#divstep" + (p - 1)).length > 0) {
                        $("#divstep" + (p - 1)).show();
                    }
                    else {
                        goshowstep(p - 1);
                    }
                    $.cookies.set("step", p - 1);
                    $("#listep" + (p - 1)).removeClass().addClass("active");
                    $("#listep" + p).removeClass().addClass("link");
                    if (p == 2) {
                        $(this).hide();
                    }
                    else {
                        $("#stepnext").show();
                        $("#spanactivityoption").hide();
                    }

                }
            });
            var btns = $("#spanactivityoption a");
            $(btns[0]).click(function () {
                activitycreate(3);
            });
            $(btns[1]).click(function () {
                activitycreate(1);
            });
            $(btns[2]).click(function () {
                new pop({ titleid: 'common_00022', typename: 'confirm',
                    msginfo: "确定关闭本页面并放弃所有已编辑的内容？",
                    callback: function () {
                        closeWin();
                    }
                });
            });
        }
    };
    function goshowstep(p) {
        switch (p) {
            case 1:
                $(".steps").initrefparam();
                break;
            case 2:
                $(".steps").baseparam();
                break;
            case 3:
                $(".steps").basesignupparam();
                break;
            case 4:
                $(".steps").inviter();
                break;
            case 5:
                $(".steps").selfsignupparam();
                break;
            case 6:
                $(".steps").saveparam();
                break;
        }
    };
    //兼容浏览器关闭函数
    function closeWin() {
        //alert("关闭窗口");
        //获取浏览器的头部信息
        var ua = navigator.userAgent;
        var ie = navigator.appName == "Microsoft Internet Explorer" ? true : false; //是否ie浏
        if (ie) {
            var IEversion = parseFloat(ua.substring(ua.indexOf("MSIE") + 5, ua.indexOf(";", ua.indexOf("MSIE "))));
            if (IEversion < 5.5) {
                var str = '<object id=noTipClose classid="clsid:ADB880A6-D8FF-11CF-9377-00AA003B7A11">';
                str += '<param name="Command" value="Close">';
                //只有ie支持
                document.body.insertAdjacentHTML("beforeEnd", str);
                document.all.noTipClose.click();

            }
            else {

                window.opener = null;
                window.close();
            }

        } else {
            parent.window.opener = null;
            parent.window.open("", "_self");
            parent.window.close();
        }
    };
    function loadcache(opts) {
        if (opts.showstep) {
            if ($.cookies.get("step") != null) {
                var p = parseInt($.cookies.get("step"));
                goshowstep(p);
                for (i = 0; i < p; i++) {
                    $("#listep" + i).removeClass().addClass("visited");
                }
                $("#listep" + p).removeClass().addClass("active");
                if (p == 6) {
                    $("#steppre").show();
                    $("#stepnext").hide();
                    $("#spanactivityoption").show();
                }
                else {
                    if (p == 1) {
                        $("#stepnext").show();
                        $("#steppre").hide();
                    }
                    else {
                        $("#steppre").show();
                        $("#stepnext").show();
                    }
                }
            }
        }
    };
})(jQuery);