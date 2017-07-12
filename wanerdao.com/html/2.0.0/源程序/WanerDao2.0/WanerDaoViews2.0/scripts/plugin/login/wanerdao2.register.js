/*!
* 注册弹出层
* 
* 作者：jgglg
* email:jgglg@163.com
* Date: 2012/10/2 23:33
*/
function wanerdaoregister() {
    $.metadata.setType("attr", "validate");
    infopop = {
        dialog: null,
        show: function () {
            var _this = this;
            var $dialog = null;
            var html = _getUI();
            $dialog = $(html).appendTo($('body'));
            _bindSelect();
            _this.dialog = new $.ui.dialog($dialog, {
                callback: { hide: function () {
                    $dialog.remove()
                }
                },
                widget: {
                    hide: '.close-3'
                }
            }).show();
            _regevent(_this, $dialog);
        }
    };
    infopop.show();
    function _getUI() {
        var ui = '<div class="pop" style="width:750px; margin:10px auto;">';
        ui += ' <div class="pop-bg"></div>';
        ui += ' <div class="pop-container">';
        ui += '     <div class="pop-hd clearfix"><h3>' + wanerdaoLangTip('common_00058') + '</h3><a href="javascript:;" class="close-3" title="' + wanerdaoLangTip('common_00008') + '"></a></div>';
        ui += '     <div class="pop-bd">';
        ui += '         <div class="form reigst-form" style="text-align:left;">';
        ui += '         <form id="formpopregister">';
        ui += '             <ul>';
        ui += '                 <li><label class="label">' + wanerdaoLangTip('common_00062') + '</label><input type="text" class="text" id="txtpopregemail" name="txtpopregemail"  maxlength="60"/></li>';
        ui += '                 <li><label class="label">' + wanerdaoLangTip('common_00063') + ' </label><input type="password" class="text" id="txtpopregpwd" name="txtpopregpwd" maxlength="60"/></li>';
        ui += '                 <li><label class="label">' + wanerdaoLangTip('common_00064') + ' </label><input type="password" class="text" id="txtpopregrepwd" name="txtpopregrepwd" maxlength="60"/></li>';
        ui += '                 <li><label class="label">' + wanerdaoLangTip('common_00065') + ' </label><input type="text" class="text" id="txtpopregtruename" name="txtpopregtruename" maxlength="60"/></li>';
        ui += '                 <li><label class="label">' + wanerdaoLangTip('common_00066') + ' </label><select id="reg_sex" name="reg_sex" style="width: 90px;"><option value="">选择性别</option><option value="1">男</option><option value="0">女</option></select></li>';
        ui += '                 <li  class="birthday"><label class="label">' + wanerdaoLangTip('common_00067') + ' </label><select style="width: 70px;" name="year" id="year"></select>&nbsp;&nbsp;年&nbsp;&nbsp;<select style="width: 70px;" name="month" id="month"></select>&nbsp;&nbsp;月&nbsp;&nbsp;<select style="width: 70px;" name="day" id="day"></select>&nbsp;&nbsp;日</li>';
        //ui += '                 <li id="liregpopmsg"></li>';
        ui += '             </ul>';
        ui += '             <div class="QapTcha" title="请解锁滑动按钮启用“注册账号”按钮"></div>';
        ui += '             <div class="submit">';
        ui += '                 <a class="button button1" href="javascript:;" id="btnpopreg">' + wanerdaoLangTip('common_00068') + ' </a>';
        ui += '                 <a class="button button1" href="javascript:;" id="btnpopback">' + wanerdaoLangTip('common_00069') + ' </a>';
        ui += '                 <a class="button button1-disable" href="javascript:;" id="btnpopregclose">' + wanerdaoLangTip('common_00016') + ' </a>';
        ui += '             </div>';
        ui += '         </form>';
        ui += '         </div>';
        ui += '     </div>';
        ui += ' </div>';
        ui += '</div>';
        return ui;
    }
    function _regevent(_this, dialog) {
        $('.QapTcha').QapTcha({});
        var email = getQueryString('email');
        var tname = getQueryString('truename');
        var sex = getQueryString('sex');
        var b_y = getQueryString('b_y');
        var b_m = getQueryString('b_m');
        var b_d = getQueryString('b_d');

        if (email)
            $('#txtpopregemail').val(email);

        if (tname)
            $('#txtpopregtruename').val(tname);

        if (sex) {
            $('#reg_sex').val(sex).chosen();
        }
        if (b_y) {
            $('#year').val(b_y);
            var lastDay = new Date($('#year').val(), $('#month').val(), 0).getDate();
            $('#day').empty();
            for (i = 1; i <= lastDay; i++) {
                $('#day').append($wd.format('<option value="{0}">{0}</option>', i));
            }

            if (b_m) {
                $('#month').val(b_m);
                var lastDay = new Date($('#year').val(), $('#month').val(), 0).getDate();
                $('#day').empty();
                for (i = 1; i <= lastDay; i++) {
                    $('#day').append($wd.format('<option value="{0}">{0}</option>', i));
                }

                if (b_d) {
                    $('#day').val(b_d);
                }
            }
            $('select').chosen();
        }
        $("#txtpopregpwd").pstrength({
            'displayMinChar': true,
            'minChar': 8,
            'minCharText': '',
            'colors': ["#f00", "#c06", "#f60", "#3c0", "#3f0"],
            'scores': [20, 40, 50, 65],
            'verdicts': ['很不安全', '不安全', '一般', '安全', '非常安全'],
            'raisePower': 1.4
        });
        $("#formpopregister").validate({
            rules: {
                txtpopregemail: {
                    required: true,
                    email: true
                },
                txtpopregpwd: {
                    required: true,
                    rangelength: [8, 20]
                },
                txtpopregrepwd: {
                    required: true,
                    equalTo: "#txtpopregpwd"
                },
                txtpopregtruename: "required",
                reg_sex: "required"

            }, messages: {
                txtpopregemail: {
                    required: wanerdaoLangTip('acc_00009'),
                    email: wanerdaoLangTip('acc_00010')
                },
                txtpopregpwd: {
                    required: wanerdaoLangTip('acc_00002'),
                    rangelength: $.format(wanerdaoLangTip('acc_00008'))
                },
                txtpopregrepwd: {
                    required: wanerdaoLangTip('acc_00011'),
                    equalTo: wanerdaoLangTip('acc_00012')
                },
                txtpopregtruename: wanerdaoLangTip('acc_00017'),
                reg_sex: wanerdaoLangTip('acc_00046')

            }, submitHandler: function (form) {
                if ($("#iQapTcha").val()) {
                    alert(wanerdaoLangTip('acc_00031'));
                    return false;
                }
                else {
                    _PersonRegister(Trim($("#txtpopregemail").val()), Trim($("#txtpopregpwd").val()), Trim($("#txtpopregtruename").val()), $("#reg_sex").val(), $("#year").val(), $("#month").val(), $("#day").val(), $("#iQapTcha").val(), $("#btnpopreg"));
                }
            }
        });

        $("#btnpopreg").click(function () {
            $("#formpopregister").submit();
            return false;
        });

        $("#txtpopregemail, #txtpopregpwd, #txtpopregrepwd,#txtpopregtruename").bind("keydown", function (event) {
            if (event.keyCode == "13") {
                $("#formpopregister").valid();
            }
        });
        $("#txtpopregemail").focus(function () {
            $(this).parent().find(".validemail").css("display", "none");
        });
        $("#txtpopregemail").blur(function () {
            if ($(this).valid()) {
                if ($(this).parent().find(".validemail").length == 0) {
                    $(this).parent().append('<label class="validemail" style="display:inline;"></label>');
                }
                $(this).parent().find(".validemail").css("display", "inline").html(wanerdaoLangTip('acc_00016'));

                $.ajax({
                    url: "../wanerdao_personsecurity.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'checkaccountexist',account:'" + $("#txtpopregemail").val() + "'}",
                    error: function () {
                        $("#txtpopregemail").parent().find(".validemail").css("color", "#f00").html(wanerdaoLangTip('common_00001'));
                    },
                    success: function (data) {
                        if (data.result) {
                            $("#txtpopregemail").parent().find(".validemail").css("color", "#f00").html(data.msg);
                        } else {
                            $("#txtpopregemail").parent().find(".validemail").css("color", "#000").html(data.msg);
                        }
                    }
                });
            }
        });
        $("#txtpopregemail").focus();
        $('#btnpopback').unbind("click").click(function () {
            window.location.href = "/account/login.html";
        });
        $('#btnpopregclose').unbind("click").click(function () {
            dialog.remove();
            _this.dialog.hide();
        });
    }
    function _bindSelect() {
        var date = new Date();
        for (i = date.getFullYear(); i >= date.getFullYear() - 99; i--) {
            $('#year').append($wd.format('<option value="{0}">{0}</option>', i));
        }
        for (i = 1; i <= 12; i++) {
            $('#month').append($wd.format('<option value="{0}">{0}</option>', i));
        }

        var lastDay = new Date($('#year').val(), $('#month').val(), 0).getDate();
        for (i = 1; i <= lastDay; i++) {
            $('#day').append($wd.format('<option value="{0}">{0}</option>', i));
        }
        $('select').chosen();
        $('#year').change(function () { $('#month').val('1'); $('#month').chosen(); });

        $('#year, #month').change(function () {
            $('#day').empty();
            var lastDay = new Date($('#year').val(), $('#month').val(), 0).getDate();
            for (i = 1; i <= lastDay; i++) {
                $('#day').append($wd.format('<option value="{0}">{0}</option>', i));
            }
            $('#day').chosen();
        });
    }
    ///注册///
    function _PersonRegister(usermail, userpass, username, usersex, useryear, usermonth, userday, iQapTcha, btn) {
        $(".QapTcha").notice(wanerdaoLangTip('common_00001'), 2); ;
        btn.removeClass("button button1").addClass("button button1-disable").attr('disabled', true);
        $.ajax({
            url: "../wanerdao_registered.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'register',usermail:'" + usermail + "',userpass:'" + userpass + "',username:'" + username + "',usersex:'" + usersex + "',useryear:'" + useryear + "',usermonth:'" + usermonth + "',userday:'" + userday + "',iQapTcha:'" + iQapTcha + "'}",
            error: function () {
                btn.removeClass("button button1-disable").addClass("button button1").removeAttr("disabled");
                $(".QapTcha").notice(wanerdaoLangTip('common_00001'),2);
            },
            success: function (data) {
                if (data.result) {
                    $(".QapTcha").notice(data.msg, 2);
                    //location.href = '/personal';
                    window.location.reload();
                } else {
                    $(".QapTcha").notice(data.msg, 2);
                    btn.removeClass("button button1-disable").addClass("button button1").removeAttr("disabled");
                }
            }
        });
    }
}