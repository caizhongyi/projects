<?php defined('IN_IA') or exit('Access Denied');?><!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>微易首页</title>
    <meta content="微翼、微信营销、微信代运营、微信定制开发、微信托管、微网站、微商城、微营销" name="Keywords">
    <meta content="微翼，国内最大的微信公众智能服务平台，微翼八大微体系：微菜单、微官网、微会员、微活动、微商城、微推送、微服务、微统计，企业微营销必备。" name="Description">

    <link href="./resource/style/index/css/wy.css" rel="stylesheet" type="text/css">
    <link rel="shortcut icon" href="http://stc.weimob.com/img/favicon.ico">

    <script src="./resource/script/jquery-1.7.2.min.js"></script>
    <script src="./resource/script/skdslider.js"></script>
    <script src="./resource/script/base.js"></script>
    <script src="./resource/script/index.js"></script>
    <script src="./resource/script/jquery_lightbox_min.js"></script>
    <script src="./resource/script/backToTop.js"></script>
    <script src="./resource/script/jquery.placeholder.js"></script>
</head>

<body>
<!--微易首页-->
<!--微易首页头部top-->
<div class="wy-top">
    <div class="wy-tpm">
        <div class="wy-login">
            <a class="wy-lg" href="###">登 录</a>
            <div class="wy-zhc">没有账户？<a href="<?php  echo create_url('member/register');?>" target="_blank">马上申请试用</a></div>
            <script type="text/javascript">
                $('.wy-lg').click(function(){
                    $(this).hide();
                    $('.wy-zak').fadeIn();
                })
            </script>
            <!--点击“登录”按钮后，展开的登录输入框-->
            <form action="" onsubmit="return false;">
                <div class="wy-zak" style="display: none;">
                    <input name="username" type="text" class="wy-zk-name" id="username" placeholder="用户名">
                    <input name="password" type="password" class="wy-zk-pass" id="password" placeholder="密码">
                    <input type="submit" class="wy-zk-log"  value="登 录" id="login-btn"/><input id="token" type="hidden" name="token" value="<?php  echo $_W['token'];?>" />
                </div>
            </form>
            <div class="form-help-container">
                <span class="form-help" id="username-help"></span>
                <span class="form-help" id="password-help"></span>
            </div>
            <!--end 点击“登录”按钮后，展开的登录输入框-->
        </div>

    </div>
</div>
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

            $.post('<?php  echo create_url('member/login');?>', {
                username: $('#username').val(),
                password: $('#password').val(),
                keepalive: $('#hold').val() || 1,
                indexlogin:1,
                submit:$('#login-btn').val(),
                token:$('#token').val()
            }, function (rs) {
                $('.form-help').hide();
                if (rs.errno == 200) {
                    location.href = rs.url_route;
                }else if(rs.errno == -1){
                   $('#username-help').fadeIn().html(rs.error);
                }else if(rs.errno == -2){
                   $('#password-help').fadeIn().html(rs.error);
                }else {
                    alert(rs.error);
                }
            }, 'json');
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
<!--end 微易首页头部top-->
<!--微易首页主体main-->
<div class="wy-main">
    <div class="wy-mn">
        <div class="wy-gong">
            <img src="./resource/style/index/images/wy-gy.png">
            <span class="wy-gn-wz">功能介绍</span>
        </div>
        <ul>
            <li style="margin-left:0px;height:128px;">
                <div class="wy-lbtp">
                    <img src="./resource/style/index/images/wy-tb01.png">
                    <img src="./resource/style/index/images/wy-tb01-hover.png" style="display: none">
                    <span class="wy-lbwz2">基础服务</span>
                </div>
                <div class="wy-mn-xw">微翼为用户提供优越的基础服务体验，包括默认回复、欢迎信息、图文回复等。</div>
            </li>
            <li>
                <div class="wy-lbtp">
                    <img src="./resource/style/index/images/wy-tb02.png">
                    <img src="./resource/style/index/images/wy-tb02-hover.png" style="display: none">
                    <span class="wy-lbwz2">自定义菜单</span>
                </div>
                <div class="wy-mn-xw">微翼自定义菜单，让用户快速上手，配置丰富的底部菜单，让您的公众帐号更精彩。</div>
            </li>
            <li>
                <div class="wy-lbtp">
                    <img src="./resource/style/index/images/wy-tb03.png">
                    <img src="./resource/style/index/images/wy-tb03-hover.png" style="display: none">
                    <span class="wy-lbwz2">微官网</span>
                </div>
                <div class="wy-mn-xw">微翼手机3G网站，用户只要通过简单的设置，就能快速生成属于自己的手机3G网站。</div>
            </li>
            <li>
                <div class="wy-lbtp">
                    <img src="./resource/style/index/images/wy-tb04.png">
                    <img src="./resource/style/index/images/wy-tb04-hover.png" style="display: none">
                    <span class="wy-lbwz2">微活动</span>
                </div>
                <div class="wy-mn-xw">微翼提供丰富多样的活动版块，利用微信强互动黏性，形成极强的口碑营销效果。</div>
            </li>
            <li style="margin-left:0px;">
                <div class="wy-lbtp">
                    <img src="./resource/style/index/images/wy-tb05.png">
                    <img src="./resource/style/index/images/wy-tb05-hover.png" style="display: none">
                    <span class="wy-lbwz2">微会员</span>
                </div>
                <div class="wy-mn-xw">微翼会员卡帮助企业建立集品牌推广、会员管理、营销活动、统计报表于一体的微信……</div>
            </li>
            <li>
                <div class="wy-lbtp">
                    <img src="./resource/style/index/images/wy-tb06.png">
                    <img src="./resource/style/index/images/wy-tb06-hover.png" style="display: none">
                    <span class="wy-lbwz2">微统计</span>
                </div>
                <div class="wy-mn-xw">通过微统计，商家可轻松了解公众帐号信息，不错过任何一个潜在客户。统计数据将……</div>
            </li>
            <li>
                <div class="wy-lbtp">
                    <img src="./resource/style/index/images/wy-tb07.png">
                    <img src="./resource/style/index/images/wy-tb07-hover.png" style="display: none">
                    <span class="wy-lbwz2">微相册</span>
                </div>
                <div class="wy-mn-xw">您可以方便的创建相册轻松地发布您需要展示的照片，还可以拓展为商家开展的活动……</div>
            </li>
            <li>
                <div class="wy-lbtp">
                    <img src="./resource/style/index/images/wy-tb08.png">
                    <img src="./resource/style/index/images/wy-tb08-hover.png" style="display: none">
                    <span class="wy-lbwz2">微调研</span>
                </div>
                <div class="wy-mn-xw">微翼微调研可以实现各类调研投票服务，具备有对微信用户进行生活形态研究的能力。</div>
            </li>
            <li style="margin-left:0px;">
                <div class="wy-lbtp">
                    <img src="./resource/style/index/images/wy-tb09.png">
                    <img src="./resource/style/index/images/wy-tb09-hover.png" style="display: none">
                    <span class="wy-lbwz2">微营业厅</span>
                </div>
                <div class="wy-mn-xw">微翼营业厅是微翼倾力打造的营业厅解决方案客户可以通过微营业厅实现业务办理……</div>
            </li>
            <li>
                <div class="wy-lbtp">
                    <img src="./resource/style/index/images/wy-tb10.png">
                    <img src="./resource/style/index/images/wy-tb10-hover.png" style="display: none">
                    <span class="wy-lbwz2">微商城</span>
                </div>
                <div class="wy-mn-xw">微翼打造基于移动互联网的商城应用服务产品商家与客户的微信在线互动，实现微信在……</div>
            </li>
            <li>
                <div class="wy-lbtp">
                    <img src="./resource/style/index/images/wy-tb11.png">
                    <img src="./resource/style/index/images/wy-tb11-hover.png" style="display: none">
                    <span class="wy-lbwz2">微房产</span>
                </div>
                <div class="wy-mn-xw">微房产是微翼打造的房产解决方案，其功能非常强大，包含了楼盘介绍、子楼盘管理……</div>
            </li>
            <li>
                <div class="wy-lbtp">
                    <img src="./resource/style/index/images/wy-tb12.png">
                    <img src="./resource/style/index/images/wy-tb12-hover.png" style="display: none">
                    <span class="wy-lbwz2">微预约</span>
                </div>
                <div class="wy-mn-xw">微预约是商家利用微翼平台实现在线预约的一种服务，可以运用于汽车、房产、酒店……</div>
            </li>
        </ul>
    </div>
</div>
<div style="clear:both"></div>
<!--end微易首页主体main-->
<!--微易首页成功案例-->
<div class="wy-suc">
    <div class="wy-anl">
        <div class="wy-gong">
            <img src="./resource/style/index/images/wy-cg.png">
            <span class="wy-gn-wz2">成功案例</span>
        </div>
        <ul>
            <li style="margin-left:0;">
                <a href="" class="wy-lj01"></a>
                <span class="wy-ljwz">中国电信</span>
            </li>
            <li>
                <a href="" class="wy-lj02"></a>
                <span class="wy-ljwz">福建地税</span>
            </li>
            <li>
                <a href="" class="wy-lj03"></a>
                <span class="wy-ljwz">东南快报</span>
            </li>
            <li>
                <a href="" class="wy-lj04"></a>
                <span class="wy-ljwz">海峡都市报</span>
            </li>
            <li>
                <a href="" class="wy-lj05"></a>
                <span class="wy-ljwz">福建少儿频道</span>
            </li>
            <li>
                <a href="" class="wy-lj06"></a>
                <span class="wy-ljwz">欢唱KTV</span>
            </li>
            <li>
                <a href="" class="wy-lj07"></a>
                <span class="wy-ljwz">更多</span>
            </li>
        </ul>
    </div>
</div>
<!--end 微易首页成功案例-->
<!--微易首页底部bottom-->
<div class="wy-bottom">
    Copyright © 2011-2013 www.weimob.com. All Rights Reserved 上海晖硕信息科技有限公司版权所有 沪ICP备13021836号-1
</div>
<!--end 微易首页底部bottom-->
<!--end 微易首页-->
<script type="text/javascript">
    $('.wy-mn').on('mouseenter','li',function(){
        $(this).addClass('wy-mn-wbk').find('img:eq(1)').show().end().find('img:eq(0)').hide();
    }).on('mouseleave','li',function(){
        $(this).removeClass('wy-mn-wbk').find('img:eq(0)').show().end().find('img:eq(1)').hide();
    })
</script>
</body>
</html>
