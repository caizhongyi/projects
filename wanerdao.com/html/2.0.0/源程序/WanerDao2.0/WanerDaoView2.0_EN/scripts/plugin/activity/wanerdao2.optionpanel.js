//分步骤导航
(function ($) {
    $.fn.optionpanel = function (options) {
        var defaults = {
            showstep: true
        };
        var opts = $.extend({}, defaults, options);
        return this.each(function () {
            $this = $(this);
            //构建页面
            $this.append(getstepsui());
            if ($.cookies.get("step") == null) {
                firstfadeIn();
            }
            //注册事件
            showuiandaddparamevent(opts);
            loadcache(opts);
        });
    };
    //构造分步骤结构
    function getstepsui() {
        var ui = '<span id="steppre" style="display:none"><input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('active_00079') + '"/>&nbsp;&nbsp;</span>';
        ui += '	<span id="stepnext" style="display:none"><input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('active_00080') + '"/>&nbsp;&nbsp;</span>';
        ui += '<span id="spanactivityoption" style="display:none">';
        ui += '<input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('active_00076') + '"  id="createactivity"/>&nbsp;&nbsp;';
        ui += '<input type="button" class="buttonB btn_w163 btn_h36 btnGary_163 fSize-14" value="' + wanerdaoLangTip('active_00077') + '"  id="saveactivityparam"/>&nbsp;&nbsp;';
        ui += '<input type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + '" id="cancelactivity"/></span>';
        return ui;
    };
    //第一次显示
    function firstfadeIn() {
        $("#guidestep1").initrefparam().fadeIn();
    };
    function showuiandaddparamevent(opts) {
        $('#createactivity').click(function () {
            //$(this).attr("disabled", true);
            activitycreate(0, $(this));
            //$(this).attr("disabled", false);
        });
        $('#saveactivityparam').click(function () {
            //$(this).attr("disabled", true);
            activitycreate(1, $(this));
            //$(this).attr("disabled", false);
        });
        $('#cancelactivity').click(function () {
            new pop({ titleid: 'common_00022', typename: 'confirm',
                msginfo: wanerdaoLangTip('active_00078'),
                callback: function () {
                    location.href = "/activity/activity_main.html";
                }
            });
        });
        if (!opts.showstep) {
            $("#spanactivityoption").fadeIn();
        }
        else {
            //控制下一步
            $("#stepnext").fadeIn().click(function () {
                var step = 2;
                if ($.cookies.get("step") != null) {
                    step = 1 + parseInt($.cookies.get("step"));
                }
                $("#guidestep" + (step - 1)).fadeOut();
                if ($("#guidestep" + step).length > 0 && $("#guidestep" + step + " :last-child").length > 0) {
                    $("#guidestep" + step).fadeIn();
                }
                else {
                    goshowstep(step);
                }
                if (step > 6) {
                    step = 6;
                }
                $.cookies.set("step", step);
                var st = step - 1;
                if (step == 6) {
                    $(this).fadeOut();
                    $("#spanactivityoption").fadeIn();
                }
                $("#listep" + st + ">div").removeClass().addClass("end");
                $("#listep" + step + ">div").removeClass().addClass("start");
                $("#steppre").fadeIn();
            });
            //控制上一步
            $("#steppre").click(function () {
                if ($.cookies.get("step") != null) {
                    var p = parseInt($.cookies.get("step"));
                    $("#guidestep" + p).fadeOut();
                    var sp = p - 1;
                    if ($("#guidestep" + sp).length > 0) {
                        $("#guidestep" + sp).fadeIn();
                    }
                    else {
                        goshowstep(sp);
                    }
                    $.cookies.set("step", sp);
                    $("#listep" + p + ">div").removeClass().addClass("will");
                    $("#listep" + sp + ">div").removeClass().addClass("start");
                    if (p == 2) {
                        $(this).fadeOut();
                    }
                    else {
                        $("#stepnext").fadeIn();
                        $("#spanactivityoption").fadeOut();
                    }

                }
            });
            //            var btns = $("#spanactivityoption input");
            //            $(btns[0]).click(function () {
            //                activitycreate(3);
            //            });
            //            $(btns[1]).click(function () {
            //                activitycreate(1);
            //            });
            //            $(btns[2]).click(function () {
            //                new pop({ titleid: 'common_00022', typename: 'confirm',
            //                    msginfo: "确定关闭本页面并放弃所有已编辑的内容？",
            //                    callback: function () {
            //                        closeWin();
            //                    }
            //                });
            //            });
        }
    };
    function goshowstep(p) {
        switch (p) {
            case 1:
                $("#guidestep1").fadeIn().initrefparam();
                break;
            case 2:
                $("#guidestep2").fadeIn().baseparam();
                break;
            case 3:
                $("#guidestep3").fadeIn().basesignupparam();
                break;
            case 4:
                $("#guidestep4").fadeIn().inviter();
                break;
            case 5:
                $("#guidestep5").fadeIn().selfsignupparam();
                break;
            case 6:
                $("#guidestep6").fadeIn().saveparam();
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
            //            parent.window.opener = null;
            //            parent.window.open("", "_self");
            //            parent.window.close();
            window.opener = null;
            window.open("", "_self");
            window.close();
        }
    };
    function loadcache(opts) {
        if (opts.showstep) {
            if ($.cookies.get("step") != null) {
                var p = parseInt($.cookies.get("step"));
                goshowstep(p);
                $("#listep" + p + ">div").removeClass().addClass("start");
                for (i = 0; i < p; i++) {
                    $("#listep" + i + ">div").removeClass().addClass("end");
                }
                //                $("#listep" + p).removeClass().addClass("active");
                if (p == 6) {
                    $("#steppre").fadeIn();
                    $("#stepnext").fadeOut();
                    $("#spanactivityoption").fadeIn();
                }
                else {
                    if (p == 1) {
                        $("#stepnext").fadeIn();
                        $("#steppre").fadeOut();
                    }
                    else {
                        $("#steppre").fadeIn();
                        $("#stepnext").fadeIn();
                    }
                }
            }
        }
    };
})(jQuery);