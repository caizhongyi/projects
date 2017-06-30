<?php defined('IN_IA') or exit('Access Denied');?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="微易、微信营销、微信代运营、微信定制开发、微信托管、微网站、微商城、微营销" name="Keywords">
    <meta content="微易，国内最大的微信公众智能服务平台，微易八大微体系：微菜单、微官网、微会员、微活动、微商城、微推送、微服务、微统计，企业微营销必备。" name="Description">
    <link rel="stylesheet" type="text/css" href="./resource/style/index.css" media="all">
  <!--  <script id="undefined" src="./resource/image/index/inpage_linkid.js" async="" type="text/javascript"></script>-->
    <!--    <script src="./resource/script/analytics.js" async=""></script>
        <script src="./resource/script/ga.js" async="" type="text/javascript"></script>-->
    <script src="./resource/script/jquery-1.7.2.min.js"></script>
    <script src="./resource/script/skdslider.js"></script>
    <script src="./resource/script/base.js"></script>
    <script src="./resource/script/index.js"></script>
    <script src="./resource/script/jquery_lightbox_min.js"></script>
    <script src="./resource/script/backToTop.js"></script>
    <script src="./resource/script/jquery.placeholder.js"></script>
    <title>微易—微信公众服务平台</title>
    <link rel="shortcut icon" href="http://stc.weimob.com/img/favicon.ico">
</head>
<body>

<div class="page-header">
    <div class="head-wrap">
        <div id="header" class="head">
            <div class="top">
                <div class="topnav topnav-mini">
                    <a href="<?php echo create_url('member/register');?>" target="_blank">申请入驻</a><a href="#" target="_blank">渠道代理</a><a href="#" target="_blank">接口定制</a><a href="#" target="_blank" class="fb orange">微信托管</a>
                </div>
                <div class="menu" id="nav" >
                    <a class="active" href="#app">微菜单</a>
                    <a href="#menber">微官网</a>
                    <a href="#sever">微会员</a>
                    <a href="#lps">微活动</a>
                    <a href="#tivi">微统计</a>
                </div>

            </div>
        </div>
    </div>
    <script type="text/javascript">

        function checkEmail() {
            var email = Duomeng.getElementById('username');
            var _email = document.getElementById('email_warn_box');
            var warn = document.getElementById('email_warn');
            var value = email.value;
            if (value) {
                input_correct(email);
                _email.style.visibility = "hidden";
                return true;
            }
            else {
                input_error1(email);
                warn.innerHTML = "用户名不能为空";
                _email.style.visibility = "visible";
                return false;
            }
        }
        function checkPwd() {
            var pwd = Duomeng.getElementById('password');

            var _password = document.getElementById('pw_warn_box');
            var warn1 = document.getElementById('pw_warn');
            if (pwd.value) {
                input_correct(pwd);
                _password.style.visibility = "hidden";
            } else {
                input_error1(pwd);
                warn1.innerHTML = "密码不能为空";
                _password.style.visibility = "visible";
                return false;
            }

            return true;
        }
        setTimeout(function () {
            Duomeng.getElementById('username').value && checkEmail();
            Duomeng.getElementById('password').value && checkPwd();
        }, 500);

        function input_error(el, classname) {
            el.className = classname;
        }

        function input_correct(el) {
            el.className = "input_correct";
        }
        function change_input_bg(el, id) {
            var warn = document.getElementById(id);
            el.className = "input_active";
            warn.style.visibility = "hidden";
        }
        function back_input_bg(el) {
            el.className = "";
        }
        function bgnone(el) {
            el.className = "bgnone";
        }
        function input_error1(el) {
            el.className = "input_error1";
        }

    </script>
    <script type="text/javascript">
        jQuery(document).ready(function () {
            jQuery('#demo').skdslider({'delay': 5000, 'fadeSpeed': 2000, 'autoStart': true});
        });
    </script>
    <div  class="banner" >
        <div id="demo" class="skdslider">
            <ul class="slides">
                <li class="banner-pic1"><a href="<?php echo create_url('member/register');?>" target="_blank"></a></li>
                <li class="banner-pic2"><a href="<?php echo create_url('member/register');?>" target="_blank"></a></li>
            </ul>
        </div>
    </div>
    <div id="login_panel" class="login-window container clearfix">
        <div class="window">
            <div id="panel">
                <div class="title">
                    <span class=" threedhighlight">登录</span><span class=" identity">微易后台</span>
                </div>
                <div class="first">
                    <div class="inputlist input-item" >
                        <div id="email_warn_box" class="warn_box">
                            <p id="email_warn" class="warn"></p>
                            <p class="angle"></p>
                        </div>
                        <div class="email_box input_box">
                            <div class="input_box_inner">
                                <input id="username" class="" placeholder="用户名" onfocus="change_input_bg(this,'email_warn_box')"
                                       onblur="checkEmail()" tabindex="1" maxlength="40" name="LoginForm[username]"
                                       style="outline: 0;" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="inputlist first-item">
                        <div id="pw_warn_box" class="warn_box">
                            <p id="pw_warn" class="warn"></p>
                            <p class="angle"></p>
                        </div>
                        <div class="password_box input_box">
                            <div class="input_box_inner">
                                <input id="password"  placeholder="密码"  onfocus="change_input_bg(this,'pw_warn_box')"
                                       onblur="checkPwd()" tabindex="1" maxlength="40" value="" name="LoginForm[password]"
                                       style="outline: 0;" type="password" data-z-index="98">
                            </div>
                        </div>
                    </div>
                    <div class="first-item"><input id="login-btn" class="btn btn-login" type="submit" value="登 录" /><input id="token" type="hidden" name="token" value="<?php echo $_W['token'];?>" /></div>
                    <div class="tips clearfix">
                        <label  for="hold" class="hold checkbox"><input id="hold" type="checkbox" checked  value="1"/>保持登录状态两周</label>
                        <a class="apply"  href="<?php echo create_url('member/register');?>"  target="_blank">申请试用</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div id="app" class="weiapp  app-block" data-connect="nav">
    <dl class="container">
        <dt>自定义菜单—打造最便捷的微信、易信内置APP</dt>
        <dd>
            <p>微易提供微信公众号自定义菜单管理功能，用户无需再通过输入关键词触发回复，直接点击菜单就可以看相关的内容，微易可与企业原有Wap进行打通，复用企业APP原有功能，同时可定制个性化功能、使用HTML5新技术进行无限拓展，帮助企业打造最便捷、易推广的微信内置APP，此功能如果结合微信3G网站可以使您的公众号用户体验更好，带给粉丝不一样的感受。</p>
            <a href="<?php echo create_url('member/register');?>" target="_blank" class="bottom btn-apply">免费申请入驻</a>
        </dd>
    </dl>
</div>
<div id="menber" class="weimenber  app-block" data-connect="nav">
    <dl class="container">
        <dt>微官网—快速帮用户打造超炫微信移动网站</dt>
        <dd>
            <p>微官网是指将企业信息、服务、活动等内容通过微信网页的方式进行表现，用户只要通过简单的设置，就能快速生成属于您自己的微信3G网站，并且有各种精美模板，供您选择，还有自定义模版，可以设计出自己的风格，不但提高了信息量，也使信息的展现更加赏心悦目，进一步提高用户体验。</p>
            <a href="<?php echo create_url('member/register');?>" target="_blank" class="bottom btn-apply">免费申请入驻</a>
        </dd>
        </dd>

    </dl>

</div>
<div id="sever" class="weicustomer  app-block" data-connect="nav">
    <dl class="container">
        <dt>微会员—移动时代的社会化会员管理平台</dt>
        <dd>
            <p>微信会员卡通过在微信内植入会员卡，基于全国4亿微信用户，帮助企业建立集品牌推广、会员管理、营销活动、统计报表于一体的微信会员管理平台。清晰记录企业用户的消费行为并进行数据分析；还可根据用户特征进行精细分类，从而实现各种模式的精准营销。</p>
            <a href="<?php echo create_url('member/register');?>" target="_blank" class="bottom btn-apply">免费申请入驻</a>
        </dd>

    </dl>
</div>
<div id="lps" class="weilsp  app-block" data-connect="nav">
    <dl class="container">
        <dt>微活动—优惠券+刮刮卡+大转盘+微投票+一战到底的会员再营销</dt>
        <dd>
            <p>我们将利用微信的强交互性，让您通过对互动流程、环节和方式的设计，运用各种设计活动从而实现与用户的互动交流,，微整合系统互动符合微信娱乐性强的产品本质，微易内置了专为商家定制的“商家营销服务模块”，包括优惠券推广模块、幸运大转盘推广模块、刮刮卡抽奖模块、微投票、一战到底等功能模块，商家通过发起营销活动，对已有客户进行再营销，通过不断更新补充主题，用户可以反复参与，并可带动周边朋友一起分享，从而形成极强的口碑营销效果。</p>
            <a href="<?php echo create_url('member/register');?>" target="_blank" class="bottom btn-apply">免费申请入驻</a>
        </dd>
    </dl>

</div>
<div id="tivi" class="weiactivity app-block"  data-connect="nav">
    <dl>
        <dt>微统计——实时数据统计，监控运营效果</dt>
        <dd>
            <p>微易后台可以实时统计微信公众号的粉丝关注情况和用户语音请求数，根据统计对相关推广营销活动效果及某些敏感因素对您的影响作出判断，并对相关市场行为作出相应调整，从一定程度上实现了对市场的监控与及时应对。</p>
            <a href="<?php echo create_url('member/register');?>" target="_blank" class="bottom btn-apply">免费申请入驻</a>
        </dd>
    </dl>
</div>

<div id="about" class="footer app-block"  data-connect="nav">
    <dl class="container">
        <dt>关于我们</dt>
        <dd>
            <p>微易是一个专门针对微信公众账号提供营销推广服务的第三方平台。主要功能是针对微信商家公众号提供与众不同的、有针对性的营销推广服务。通过微易平台，用户可以轻松管理自己的微信各类信息，对微信公众账号进行维护、开展智能机器人、在线发优惠劵、抽奖、刮奖、派发会员卡、打造微官网、开启微团购等多种活动，对微信营销实现有效监控，极大扩展潜在客户群和实现企业的运营目标。微易平台很好的弥补了微信公众平台本身功能不足、针对性不强、交互不便利的问题，为商家公众账号提供更为贴心的、且是核心需求的功能和服务。在线优惠劵、转盘抽奖、微信会员卡等推广服务更是让微信成为商家推广的利器。智能客服的可调教功能让用户真正从微信繁琐的日常客服工作中解脱出来，真正成为商家便利的新营销渠道。</p>
        </dd>
    </dl>
    <div id="fixed_footer"></div>
</div>

<div class="mk_z_footer">
    <div class="mk_z_footer_link">
        <a class="lightbox" href="<?php echo create_url('member/register');?>" target="_blank">申请入驻</a>|
        <a href="#" target="_blank">渠道代理</a>|
        <a href="#" target="_blank">接口定制</a>|
        <a href="#" target="_blank">微信托管</a>
    </div>
    <div class="">
        Copyright <span class="font_arial">©</span>  2011-2013 www.ffcs.cn. All Rights Reserved 福建富士通信息软件有限公司 备案序号:闽ICP备05015294号
    </div>
</div>

<dl id="weimob-wx" class="bg" style="display: none;">
    <dt><img src="./resource/image/index/weimob-code.png"></dt>
</dl>

<script type="text/javascript">jQuery(document).ready(function ($) {
    $('.lightbox').lightbox();
});</script>
<div id="returnTop" href="javascript:;" style="bottom: -50px">回到顶部</div>
<script>
    $(function () {
        try{
            $("#returnTop").returntop();
        }catch(ex){}

        $('#login-btn').click(function () {
            var userAgent = window.navigator.userAgent.toLowerCase();
            var ie6 = $.browser.msie && /msie 6\.0/i.test(userAgent);
            if (ie6) {
                alert('请不要使用ie6及以下等低版本浏览器');
                return false;
            }
            $.post('<?php echo create_url('member/login');?>', {username: $('#username').val(), password: $('#password').val(), keepalive: $('#hold').val(),indexlogin:1,submit:$('#login-btn').val(),token:$('#token').val()}, function (rs) {
                if (rs.errno == 200) {
                    location.href = rs.url_route;
                }else if(rs.errno == -1){
                    var email = Duomeng.getElementById('username');
                    var _email = document.getElementById('email_warn_box');
                    var warn = document.getElementById('email_warn');
                    var value = email.value;
                    input_error1(email);
                    warn.innerHTML = rs.error;
                    _email.style.visibility = "visible";
                }else if(rs.errno == -2){
                    var pwd = Duomeng.getElementById('password');
                    var _password = document.getElementById('pw_warn_box');
                    var warn1 = document.getElementById('pw_warn');
                    input_error1(pwd);
                    warn1.innerHTML = rs.error;
                    _password.style.visibility = "visible";
                }else {
                    alert(rs.error);
                }
            }, 'json');
        });

        $("#password").keyup(function (e) {
            if (e.keyCode == 13) {
                $("#login-btn").click();
                return false;
            }
        });
        var temp = ' <div id="qihoo_ie6_tips" style="CLEAR: both; FONT-SIZE: 12px; BACKGROUND: #f8efb4; WIDTH: 100%; COLOR: #503708; LINE-HEIGHT: 42px; PADDING-TOP: 7px; BORDER-BOTTOM: #eed64d 1px solid; FONT-FAMILY: SimSun; HEIGHT: 42px; TEXT-ALIGN: center"> '
                + ' <div id="qihoo_ie6_tips" style="CLEAR: both; FONT-SIZE: 12px; BACKGROUND: #f8efb4; WIDTH: 100%; COLOR: #503708; LINE-HEIGHT: 42px; PADDING-TOP: 7px; BORDER-BOTTOM: #eed64d 1px solid; FONT-FAMILY: SimSun; HEIGHT: 42px; TEXT-ALIGN: center"> '
                + '<div style="WIDTH: 990px"><em style="DISPLAY: inline-block; BACKGROUND: url(http://w.qhimg.com/images/v2/360se/2012/06/01/13385405772638.png); MARGIN: 0px 5px 2px; VERTICAL-ALIGN: middle; WIDTH: 40px; HEIGHT: 33px"></em>'
                + '您使用的浏览器内核为IE6，不兼容此系统,落后于全球76.2%用户！推荐您：安装<a id="qihoo_ie6_tips_se" style="DISPLAY: inline-block; BACKGROUND: url(http://w.qhimg.com/images/v2/360se/2012/06/01/13385405772638.png) 0px -33px; MARGIN: 0px 5px 2px; VERTICAL-ALIGN: middle; WIDTH: 194px; HEIGHT: 32px" href="http://down.360safe.com/cse/360cse_7.1.0.350.exe"></a>或直接升级到<a id="qihoo_ie6_tips_ie8" style="DISPLAY: inline-block; BACKGROUND: url(http://w.qhimg.com/images/v2/360se/2012/06/01/13385405772638.png) -152px 0px; MARGIN: 0px 5px 2px; VERTICAL-ALIGN: middle; WIDTH: 50px; HEIGHT: 32px" href="http://windows.microsoft.com/zh-CN/internet-explorer/downloads/ie-8"></a> &nbsp; </div> </div>'
        var p = /Windows NT 5.2/.test(navigator.userAgent), d = /MSIE 6/i.test(navigator.userAgent) && !/MSIE [^6]/i.test(navigator.userAgent);
        if (!p && d) {
            document.body.insertAdjacentHTML("afterBegin", temp);
        }

    });
</script>
    <div style="position: fixed; top: 0px; left: 0px; opacity: 0.6; display: none; z-index: 99998;" id="1381470765609"
         class="jquery-lightbox-overlay"></div>
    <div style="position: absolute; z-index: 99999; top: -999px;" class="jquery-lightbox-move">
        <div class="jquery-lightbox jquery-lightbox-mode-image">
            <div class="jquery-lightbox-border-top-left"></div>
            <div class="jquery-lightbox-border-top-middle"></div>
            <div class="jquery-lightbox-border-top-right"></div>
            <a class="jquery-lightbox-button-close" href="#close"><span>Close</span></a>

            <div class="jquery-lightbox-navigator"><a class="jquery-lightbox-button-left" href="#"><span>Previous</span></a><a
                    class="jquery-lightbox-button-right" href="#"><span>Next</span></a></div>
            <div class="jquery-lightbox-buttons">
                <div class="jquery-lightbox-buttons-init"></div>
                <a class="jquery-lightbox-button-left" href="#"><span>Previous</span></a><a
                    class="jquery-lightbox-button-max" href="#"><span>Maximize</span></a>

                <div class="jquery-lightbox-buttons-custom"></div>
                <a class="jquery-lightbox-button-right" href="#"><span>Next</span></a>

                <div class="jquery-lightbox-buttons-end"></div>
            </div>
            <div class="jquery-lightbox-background"></div>
            <div class="jquery-lightbox-html"></div>
            <div class="jquery-lightbox-border-bottom-left"></div>
            <div class="jquery-lightbox-border-bottom-middle"></div>
            <div class="jquery-lightbox-border-bottom-right"></div>
        </div>
    </div>

</body>
</html>