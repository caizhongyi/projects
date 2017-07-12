///登录方法///
function Login(account, pwd, issave, btn, funcValdate, funcSucess, funcError) {
    if (funcValdate()) {
        var issl = 0;
        if (issave) {
            issl = 1;
        }
        $.ajax({
            url: "../wanerdao_login.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'login',account:'" + account + "',password:'" + pwd + "',isSaveLogin:'" + issl + "'}",
            error: function (data) {
                if (funcError != null) {
                    funcError();
                } else {
                    btn.removeAttr("disabled");
                    alert("请求失败！");
                }
            },
            success: function (data) {
                btn.removeAttr("disabled");
                if (data.result) {
                    if (funcSucess != null) {
                        funcSucess();
                    } else {
                        window.location.href = "index.aspx";
                    }
                }
                else {
                    if (funcError != null) {
                        funcError();
                    } else {
                        btn.removeAttr("disabled");
                        alert(data.msg);
                    }
                }
            }
        });
    }
}

///首页登录（没有滑动按钮）///
function IndexLogin(account, pwd, issave, btn, funcValdate, funcSucess, funcError) {
    if (funcValdate()) {
        var issl = 0;
        if (issave) {
            issl = 1;
        }
        $.ajax({
            url: "../wanerdao_login.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'indexlogin',account:'" + account + "',password:'" + pwd + "',isSaveLogin:'" + issl + "'}",
            error: function (data) {
                if (funcError != null) {
                    funcError();
                } else {
                    btn.removeAttr("disabled");
                    alert(data.msg);
                }
            },
            success: function (data) {
                btn.removeAttr("disabled");
                if (data.result) {
                    if (funcSucess != null) {
                        funcSucess();
                    } else {
                        alert("登录成功");
                        window.location.href = "index.aspx";
                    }
                }
                else {
                    if (funcError != null) {
                        funcError();
                    } else {
                        btn.removeAttr("disabled");
                        alert(data.msg);
                    }
                }
            }
        });
    }
}

///注册///
function PersonRegister(usermail, userpass, username, usersex, useryear, usermonth, userday, iQapTcha, btn, funcSucess) {
    $.ajax({
        url: "../wanerdao_registered.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'register',usermail:'" + usermail + "',userpass:'" + userpass + "',username:'" + username + "',usersex:'" + usersex + "',useryear:'" + useryear + "',usermonth:'" + usermonth + "',userday:'" + userday + "',iQapTcha:'" + iQapTcha + "'}",
        error: function () {
            btn.removeAttr("disabled");
            alert("发送请求失败！");
        },
        success: function (data) {
            btn.removeAttr("disabled");
            if (data.result) {
                if (funcSucess != null) {
                    funcSucess();
                } else {
                    alert(data.msg);
                }
            } else {
                alert(data.msg);
            }
        }
    });

}