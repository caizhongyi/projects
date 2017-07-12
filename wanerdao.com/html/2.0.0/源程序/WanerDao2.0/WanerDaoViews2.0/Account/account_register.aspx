<%@ Page Language="C#" AutoEventWireup="true" CodeFile="account_register.aspx.cs"
    Inherits="Account_account_register" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>注册-账号维护-玩儿道</title>
    <meta name="keywords" content="欢迎来到玩儿道，新用户注册，玩儿道，生活社交网络" />
    <meta name="description" content="新用户正确填写必要信息以后注册玩儿道" />
    <link rel="stylesheet" type="text/css" href="../css/style.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/layout.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/form.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/account.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css"
        media="all" />
    <link href="../scripts/openplugin/qapTcha/QapTcha.jquery.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .QapTcha
        {
            margin-left: 120px;
        }
        #password-strength
        {
            width: 220px;
            line-height: 8px;
            margin-left: 110px;
            margin-top: 5px;
        }
        span.password-min-char
        {
            line-height: 8px;
            height: 8px;
            width: 90px;
            font-size: 8px;
        }
        span.password-strength-bar
        {
            height: 8px;
            line-height: 8px;
        }
        span.password-strength-bar-conatiner
        {
            width: 150px;
            height: 8px;
            border: solid 1px #eee;
            display: block;
            float: left;
        }
        .sex_lbl
        {
            position: relative;
        }
        .sex_lbl .fail
        {
            position: absolute;
            left: 200px;
        }
        .fail
        {
            color: Red;
        }
    </style>
</head>
<body class="pBgB">
    <div class="header_wrapper pBgH">
        <div class="header layout">
            <a href="/" class="logo"></a>
        </div>
    </div>
    <div class="container layout">
        <div class="tabs">
            <ul class="tabs-nav">
                <li><a href="login.html">用户登录</a></li><li class="current"><a href="javascript:;">新用户注册</a></li><li>
                    <a href="find_account.html">找回账号 </a></li>
                <li><a href="find_pass.html">找回密码</a></li>
            </ul>
            <div class="bigbox">
                <div class="box_hd">
                </div>
                <div class="box_bd">
                    <form id="accout_edit_form">
                    <div class="form reigst-form" style="text-align: left;">
                        <ul>
                            <li>
                                <label class="label">
                                    电子邮件：
                                </label>
                                <input type="text" class="text" id="email" name="email" maxlength="60" /></li>
                            <li>
                                <label class="label">
                                    设置密码：
                                </label>
                                <input type="password" id="pwd" name="pwd" class="text" maxlength="60" />
                                
                            </li>
                            <li>
                                <label class="label">
                                    再次确认密码：
                                </label>
                                <input type="password" id="repwd" name="repwd" class="text" maxlength="60" /></li>
                            <li>
                                <label class="label">
                                    真实姓名：
                                </label>
                                <input type="text" id="truename" name="truename" class="text" maxlength="60" /></li>
                            <li class="sex_lbl">
                                <label class="label">
                                    性别：
                                </label>
                                <select id="reg_sex" name="reg_sex" style="width: 90px;">
                                    <option value="">选择性别</option>
                                    <option value="1">男</option>
                                    <option value="0">女</option>
                                </select></li>
                            <li>
                                <label class="label">
                                    生日：
                                </label>
                                <select style="width: 70px;" name="year" id="year">
                                </select>&nbsp;&nbsp;年&nbsp;&nbsp;<select style="width: 70px;" name="month" id="month"></select>&nbsp;&nbsp;月&nbsp;&nbsp;<select
                                    style="width: 70px;" name="day" id="day"></select>&nbsp;&nbsp;日</li>
                        </ul>
                        <div class="QapTcha" title="请解锁滑动按钮启用“注册账号”按钮">
                        </div>
                        <div class="submit">
                            <input type="button" class="button button1" value="注册账号" id="btnRegister" /></div>
                    </div>
                    </form>
                </div>
                <div class="box_ft">
                </div>
            </div>
        </div>
    </div>
    <!--loginMain-->
    <div class="footer layout">
        <span class="f_right">Copyright @ 2012 Savorboard Corporation, All right reserved.</span>
        <p class="footer_link">
            <a href="javascript:;">特色</a><a href="javascript:;">开发应用</a><a href="javascript:;">法律声明</a><a
                href="javascript:;">招聘团队</a><a href="javascript:;">建议</a><a href="javascript:;">帮助</a></p>
    </div>
    <!--页面脚本区-->
    <script src="/scripts/jquery-1.4.2.min.js"></script>
    <script src="/scripts/plugin/cookie/wanerdao2.cookies.js"></script>
    <script src="/scripts/multiplelanguage/loader.js"></script>
    <script src="/scripts/global.js"></script>
    <script src="/Scripts/openplugin/jquery.metadata.js"></script>
    <script src="/scripts/openplugin/jquery.validate.min.js" type="text/javascript"></script>
    <script src="/Scripts/openplugin/digitalspaghetti.password.js"></script>
    <script src="/scripts/jquery.chosen/jquery.chosen.js"></script>
    <script src="/Scripts/common/wandao.js"></script>
    <script src="/Scripts/common/wanerdaoutils.js"></script>
    <script src="/scripts/account/register.js" type="text/javascript"></script>
    <script src="/scripts/openplugin/jquery-ui.js"></script>
    <script src="/scripts/jquery.ui.touch.js"></script>
    <script src="/scripts/openplugin/QapTcha.jquery.js"></script>
    <script type="text/javascript">
        $('.QapTcha').QapTcha({});
    </script>
</body>
</html>
