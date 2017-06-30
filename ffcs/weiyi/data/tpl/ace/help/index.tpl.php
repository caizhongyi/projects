<?php defined('IN_IA') or exit('Access Denied');?><?php include template('common/header', TEMPLATE_INCLUDEPATH);?>

<div class="main">
<!--<table class="table">
    <tr><th colspan="2" class="alert alert-info">用户信息</th></tr>
    <tr>
        <th style="width:250px;">用户ID</th>
        <td><?php echo $info['uid'];?></td>
    </tr>
    <tr>
        <th style="width:250px;">当前公众号</th>
        <td><?php echo $info['account'];?></td>
    </tr>
    <tr><th colspan="2" class="alert alert-info">系统信息</th></tr>
    <tr>
        <th>服务器系统</th>
        <td><?php echo $info['os'];?></td>
    </tr>
    <tr>
        <th>PHP版本 </th>
        <td>PHP Version <?php echo $info['php'];?></td>
    </tr>
    <tr>
        <th>服务器软件</th>
        <td><?php echo $info['sapi'];?></td>
    </tr>
    <tr>
        <th>服务器 MySQL 版本</th>
        <td><?php echo $info['mysql']['version'];?></td>
    </tr>
    <tr>
        <th>上传许可</th>
        <td><?php echo $info['limit'];?></td>
    </tr>
    <tr>
        <th>当前数据库尺寸</th>
        <td><?php echo $info['mysql']['size'];?></td>
    </tr>
    <tr>
        <th>当前附件根目录</th>
        <td><?php echo $info['attach']['url'];?></td>
    </tr>
    <tr>
        <th>当前附件尺寸</th>
        <td><?php echo $info['attach']['size'];?></td>
    </tr>
</table>-->

<style type="text/css">
    h3{ border-bottom: 1px solid #ddd;}
    .box-title{ border-bottom: 1px solid #ddd; margin-bottom: 10px; margin-top: 30px;}
    .nav-tabs { background: none; border-bottom: 1px solid #ddd;}
    .nav-tabs .active{ border: 1px solid #ddd; border-bottom: none;}
    dt{ font-weight: normal;}

    .icon-error{ color: red;}
    .icon-success{ color: green;}
</style>
<div class="container-fluid">
<h3><i class="icon-cog"></i>使用指南</h3>

<div class="box">
    <div class="box-title"><h4><a id="weixin">2.1、如何注册微信公众号？</a></h4></div>
    <div class="box-content">

        <p>登录<a href="http://mp.weixin.qq.com" target="_blank">mp.weixin.qq.com</a>，点击注册填写相关信息即可申请微信公众号，微信公众号只能在PC端登录，不能用手机端，公众号分服务号和订阅号，企业可申请服务号，个人、自媒体申请订阅号，服务号每个月限制群发一条，而订阅号每天可发送一次，但消息会折叠起来放在一个订阅号的消息盒子里，服务号仍然是放在聊天列表。</p>
        <p><img src="./resource/image/guide/zhuce.png"></p>
    </div>

</div>
<div class="box">
    <div class="box-title"><h4><a id="yixin">2.2、如何注册易信公众号？</a></h4></div>
    <div class="box-content">
        <p>登录<a href="https://plus.yixin.im" target="_blank">https://plus.yixin.im</a>，点击注册填写相关信息即可申请易信公众号，易信公众号只能在PC端登录，不能用手机端。</p>
        <p><img src="./resource/image/guide/yixin.jpg"></p>
    </div>

</div>
<div class="box">
    <div class="box-title"><h4><a id="pt">2.3、如何注册微易平台？</a></h4></div>
    <div class="box-content">
        <p>直接网址输入www.vieasy.com或者百度输入微易，点击进入微易官方网站，点击免费试用填写用户名、密码、邮箱即可进行在线注册，前期邀请码开放，后期功能稳定则需要邀请码，所以大家珍惜机会，赶紧注册。</p>
        <p><img src="./resource/image/guide/reg.jpg"></p>

    </div>

</div>

<div class="box">
    <div class="box-title"><h4><a id="zh">2.3、如何添加公众号？</a></h4></div>
    <div class="box-content">
        <p>微易平台同时支持微信和易信公众号。</p>
        <p><img src="./resource/image/guide/account_add.jpg"></p>
        <h5>1、公众号名称与微信，易信公众平台公众号名称保持一致。</h5>
        <h5>2、公众号类型选择微信或易信类型。</h5>
        <h5>3、填写公众号对应的AppId，AppSecre。</h5>
        <h5>4、公众号原始id，这个很重要，微信公众平台进行通讯就靠这个ID，所以不能填错，如果在填的时候遇到问题可以点不懂就问我或者直接联系在线客服。</h5>
        <p>a. 登录微信公众平台mp.weixin.qq.com，点设置，查看帐号信息</p>
        <p><img src="./resource/image/guide/zh3.gif"></p>
        <h5>5、点击二维码图片保存到电脑桌面，查看图片的名称gh_开头的就是原始公众号，如：gh_3e468dea019b 提别提示：不是gh_3e468dea019b_430,是gh_3e468dea019b，一定要把_430去掉，gh_3e468dea019b才是正确的。</h5>
        <p><img src="./resource/image/guide/zh4.gif"></p>
        <h5>6、微信号：公众号的英文名称，这个是唯一的。</h5>
        <p><img src="./resource/image/guide/account_commit.jpg"></p>
        <p>点击提交，提示将接口地址和TOKEN绑定到公众平台;</p>
        <p><img src="./resource/image/guide/token.jpg"></p>
        <h5>6、绑定URL和TOKEN。</h5>
        <p>a. 登录公众平台(注意需提前注册好公众号)</p>
        <p>b. 点击高级功能，进入开发模式。（注：如果没有高级功能说明你注册的账号还在审核中，审核通过后会有高级功能）</p>
        <p>c. 开启开发模式（注：开启开发模式编辑模式则不能用，两者只能选其一）</p>
        <p><img src="./resource/image/guide/zh7.png"></p>
        <p>d. 填写接口URL和对应TOKEN，点击提交。如果提示提交成功，说明公众号绑定成功，如果出现服务器无法正确响应TOKEN验证，说明URL或者TOKEN有问题，请仔细检查。如果遇到问题可以随时咨询微易客服。</p>
        <p><img src="./resource/image/guide/zh8.png"></p>
        <!--    <p>在公众号绑定完URL和TOKEN，整个添加公众号的操作完毕，可以看到如下界面。</p>
            <p><img src="./resource/image/guide/zh9.png"></p>-->

    </div>

</div>


<!--
<div class="row-fluid">
    <div class="box-title">
        <h4 class="text-warning"><strong class="text-info">微活动：</strong>优惠券+刮刮卡+大转盘+微投票+一战到底</h4>
        <h5>微活动，强大的交互体验，极大提高了用户粘性和粉丝活跃度。</h5>
        <p>
            您可以在<a target="main" href="member.php?act=module&amp;">模块设置</a>中添加规则
        </p>
    </div>
    <div class="box-content clearfix">

        <ul class="nav nav-tabs " id="myTab">
            <li class="active"><a data-toggle="tab" href="#Coupon">优惠券</a></li>
            <li class=""><a data-toggle="tab" href="#Scratch">刮刮卡</a></li>
            <li class=""><a data-toggle="tab" href="#Wheel">大转盘</a></li>
            <li class=""><a data-toggle="tab" href="#Vote">微投票</a></li>
            &lt;!&ndash; <li class=""><a data-toggle="tab" href="#yzdd">小黄鸡自动回复</a></li>&ndash;&gt;
        </ul>
        <div class="tab-content" id="myTabContent">
            <div id="Coupon" class="tab-pane fade active in">
                <dl>
                    <dt class="span7">
                    <p>优惠券是用于微信上与顾客互动的一种营销方式，不仅可以展现自己的产品，更能让顾客在使用此项功能时感受到更多的乐趣。</p>

                    <h3>使用方法：</h3>

                    <p>1、新增优惠券活动：编辑活动开始的内容，包括关键词、活动名称、成功抢到说明、简介、活动起始时间、活动说明、兑换券使用说明；</p>

                    <p>2、编辑活动结束内容：填写活动公告主题和活动说明；</p>

                    <p>3、 点击下一步，进行活动设置。设置优惠券的名称、数量，兑奖密码、sn码生成设置、sn码重新命名、手机号重新命名、设置抽奖页面是否显示奖品数量，提交保存活动；</p>

                    <p>4、 设置活动开始；（点击开始活动后，就不能再修改活动奖项，但可以修改其他活动内容,活动开启会自动生成SN码，也就是兑奖码）</p>

                    <p>5、 设置活动结束；（你设置的活动结束时间到了会自动结束活动，你也可以时间没有到直接结束活动）</p>

                    <p>6、 兑奖，查看活动粉丝中奖详情；（点击SN码管理查看详情）</p>

                    <p>7、 删除活动（最好是在最后兑奖时间过了，再删除活动）&#12288;</p>

                    <p>备注：每个网友每次活动只能领取一张优惠劵。</p>
                    </dt>
                    <dd class="span5"><img src="./resource/image/guide/Coupon.png"></dd>
                </dl>
            </div>

            <div id="Scratch" class="tab-pane fade">
                <dl>
                    <dt class="span7">
                    <p>该模块可为商家提供刮刮卡抽奖服务，全网第一个可以通过微信玩刮刮卡，用户通过手机屏幕进行刮奖的游戏！</p>

                    <h3>使用方法：</h3>

                    <p>1、设置抽奖前需要先编辑一条图文消息，提前一天或者当天推送给所有粉丝，告知在某个时间段发某个关键词可以参与刮奖；</p>

                    <p>2、进入抽奖设置，设定活动时间、中奖几率、触发关键词和相应的奖品，确定设置后系统会根据设定的中奖几率产生相应的SN码；</p>

                    <p>
                        3、活动设定后，在规定时间到时，网友发送关键词如“我要抽奖”，就会发送给他一张刮刮卡，粉丝通过屏幕进行刮奖，中奖后会得到一个SN码，网友到店时向商家出示SN码，商家根据系统产生的SN码进行比对，确认无误后即可兑换奖品。</p>

                    <p>备注：每个网友每次活动只能参与一次刮奖。</p>
                    </dt>
                    <dd class="span5"><img src="./resource/image/guide/Scratch.png"></dd>
                </dl>
            </div>

            <div id="Wheel" class="tab-pane fade">
                <dl>
                    <dt class="span7">
                    <p>该模块可为商家提供转盘抽奖服务，商家通过设置活动时间，预计参加抽奖人数，相应奖项和触发关键词，由网友在线参与抽奖。</p>

                    <h3>使用方法：</h3>

                    <p>1、设置抽奖前需要先编辑一条图文消息，提前一天或者当天推送给所有粉丝，告知在某个时间段发某个关键词可以参与抽奖；</p>

                    <p>2、进入抽奖设置，设定活动的类别，设定活动的预热时间，已经活动的开始和结束时间，设置活动回复关键词“我要抽奖”，确定设置后系统会根据设定的中奖几率产生相应的SN码；</p>

                    <p>3、活动设定后，在规定时间到时，网友发送关键词如“我要抽奖”，就可以参与三次转盘，中奖后会得到一个SN码，网友到店时向商家出示SN码，商家根据系统产生的SN码进行比对，确认无误后即可兑换奖品。</p>

                    <p>备注：每个网友每次活动只能领取一张优惠劵。</p>
                    </dt>
                    <dd class="span5"><img src="./resource/image/guide/Wheel.png"></dd>
                </dl>
            </div>

            <div id="Vote" class="tab-pane fade">
                <dl>
                    <dt class="span7">
                    <p>商家采用投票的活动来吸引用户，与用户之间产生互动，从而促进企业营销的一种手段。</p>

                    <h3>使用方法：</h3>

                    <p>1、商家发布一个活动名称，例如：“您愿意把微易介绍给您的朋友吗？”商家还可以为本次活动上传封面，吸引更多的用户来参加；</p>

                    <p>2、商家可以设置两个选项：愿意、不愿意，每个用户只能选择一个选项；</p>

                    <p>3、设置活动的回复关键词为“我要投票”；</p>

                    <p>4、编辑活动说明，例如：“每位参与投票的朋友都将获得商家送出的尊贵礼品，同时你还将参加抽奖，有机会获得iphone5等大奖。”；</p>

                    <p>5、设置活动的起开始时间和活动的结束时间。</p>
                    </dt>
                    <dd class="span5"><img src="./resource/image/guide/Vote.png"></dd>
                </dl>
            </div>

            <div id="yzdd" class="tab-pane fade">
                <dl>
                    <dt class="span7">
                    <p>
                        该模块是以答题比赛的方式，给用户带来乐趣的一种营销性活动。如果这一季您连续参加了答题，系统会根据答题正确率和答题速度自动计算您的积分，赛季结束以后，商家会根据最终的比赛结果，评选出一二三等奖各5名，精美礼品等着您！</p>

                    <h3>使用方法：</h3>

                    <p>
                        1、新增，进入“新建一战到底活动”页，编辑活动名称，活动时间，触发关键词（如：一战到底），图文封面，活动说明，活动规则，每道系统题目分值、每道自定义题目分值（均可使用默认图片及内容，也可上传图片及自定义内容）；</p>

                    <p>2、奖品设置、数量设置，根据商家需求填写，会在用户答题完毕显示； </p>

                    <p>3、保存并设置考题，进入题目设置页面，可自定义添加题目，插入行业相关问题提高用户的认知，答题时间也可自定义（默认20秒/题），如不设置直接保存，则系统默认使用原有题库。 </p>

                    <p>备注：</p>

                    <p>（1）每天每个用户只能参加一次答题，每次10道,答对加分，答错不扣分；</p>

                    <p>（2）用户参加答题需提交姓名及手机号码，商家可查询；</p>

                    <p>（3）同样积分者，答题速度优先的用户排名为先；</p>

                    <p>（4）积分累计到活动结束后，可在统计图表内查询排名顺序参与人数、答题率及用户信息。</p>
                    </dt>
                    <dd class="span5"><img src="./resource/image/guide/yzdd.jpg"></dd>
                </dl>
            </div>
        </div>
    </div>
</div>

<div class="row-fluid">
    <div class="box-title">
        <h4 class="text-warning"><strong class="text-info">微会员(SCRM)：</strong>移动时代的社会化会员管理平台</h4>
        <h5>微会员通过在微易平台内植入会员卡，帮助企业建立新一代的移动会员管理系统。清晰记录企业用户的消费行为并进行数据分析;还可根据用户特征进行精细分类，从而实现各种模式的精准营销。</h5>

    </div>

    &lt;!&ndash;微会员(SCRM)&ndash;&gt;
    <div class="box-content">
        <ul class="nav nav-tabs" >
            <li class="active"><a data-toggle="tab" href="#cardset">会员卡设置</a></li>
            <li class=""><a data-toggle="tab" href="#cardman">会员管理</a></li>
            <li class=""><a data-toggle="tab" href="#consumeman">消费管理</a></li>
            <li class=""><a data-toggle="tab" href="#statistics">数据统计</a></li>
            <li class=""><a data-toggle="tab" href="#storeset">门店管理</a></li>


        </ul>

        <div class="tab-content" >

            <div id="cardset" class="tab-pane fade active in">
                <dl>

                    <dt class="span7">
                    <p>会员卡设置是指商家通过在微易平台内植入会员卡，对会员卡的设置来管理会员。</p>
                    <h3>使用方法：</h3>
                    <p>  1、	设置商家信息，包括商家名称、触发关键词、商户所在地、商家类别、商家详细地址、联系方式、商家兑换密码。</p>
                    <p>2、	点击下一步，设置卡片信息。包括会员卡名称、会员卡名称颜色、会员卡的背景、自己设计的背景、图文消息封面上传、会员卡的图标上传、卡号文字颜色、首页提示文字。</p>
                    <p>3、	提交信息。</p>
                    <p>4、	添加会员特权管理，设置标题、正文内容、可使用次数、时间限制，点击保存即可。</p>

                    </dt>

                    <dd class="span5">
                        <img src="./resource/image/guide/cardset.png">
                    </dd>
                </dl>
            </div>

            <div id="cardman" class="tab-pane fade">
                <dl>
                    <dt class="span7">
                    <p>会员管理是指商家可以通过微易平台后台查看到用户领取会员卡的记录。</p>
                    <h3>使用方法：</h3>
                    <p>1、商家可以通过输入用户名或者手机号码查询已经领取会员卡的用户信息，包括：会员卡号、姓名、手机号码、领卡时间、状态。</p>
                    <p>2、商家可以点击“冻结”、“解冻”对用户的状态进行设置。</p>
                    </dt>

                    <dd class="span5">
                        <img src="./resource/image/guide/cardman.png">
                    </dd>

                </dl>
            </div>


            <div id="consumeman" class="tab-pane fade">
                <dl>
                    <dt class="span7">
                    <p>消费管理是指商家可以通过微易平台后台查看到用户特权消费管理的信息。</p>
                    <h3>使用方法：</h3>
                    <p>1、商家可以通过输入SN码查询特权消费用户的信息，包括：特权名称、用户名、电话、SN码、SN码派发时间、使用时间、消费门店、消费金额/(元)、状态。</p>
                    <p>2、商家可以选择需要管理的用户，进行批量启用或者批量停用操作来改变用户的状态。</p>

                    </dt>
                    <dd class="span5">
                        <img src="./resource/image/guide/consumeman.png">
                    </dd>

                </dl>
            </div>


            <div id="statistics" class="tab-pane fade">
                <dl>

                    <dt class="span7">
                    <p>数据统计是指商家可以通过微易后台查询最近一个月新增会员的趋势和最近一个月消费次数趋势的走向图。</p>
                    <h3>使用方法：</h3>
                    <p> 1、商家可以通过点击最近一个月新增会员的趋势图横坐标上的小圆点，查看到当天新增会员的人数。</p>
                    <p>2、同时可以通过查看右侧新增会员的区域，查看到今日新增会员人数、昨日新增会员人数和目前总会员人数。</p>
                    <p>3、商家还可以点击最近一个月消费次数的趋势图横坐标上的小圆点，查看到当天消费的人数。</p>
                    <p>4、同样的通过右侧消费次数的区域内，可以查看到今日消费次数、昨日消费次数数和目前总消费次数。</p>

                    </dt>
                    <dd class="span5">
                        <img src="./resource/image/guide/statistics.png">
                    </dd>
                </dl>
            </div>

            <div id="storeset" class="tab-pane fade">
                <dl>

                    <dt class="span7">
                    <p>门店设置是指商家通过微易平台设置自己的商铺信息，从而让用户更加详细的了解商家的确切资料</p>
                    <h3>使用方法：</h3>
                    <p>1、点击“添加门店”，设置门店基本信息。包括：门店的名称、电话、地址、上传门店的图片。</p>
                    <p> 2、设置门店标识：通过滚动地图和拖拽地图来查找门店的位置，然后点击标记门店位置。</p>
                    <p>3、填写门店简介。</p>
                    <p>4、点击保存即可。</p>
                    </dt>
                    <dd class="span5">
                        <img src="./resource/image/guide/storeset.png">
                    </dd>
                </dl>
            </div>


        </div>
    </div>
</div>

<div class="box">
    <div class="box-title">
        <h4 class="text-warning"><strong class="text-info">微官网：</strong>五分钟打造超炫微信3G网站</h4>
    </div>

    <div class="box-content">
        <dl>
            <dd class="span5">
                <img src="./resource/image/guide/microwebsite.png">
            </dd>
            <dt class="span6">
            <p>微易全国首创微信3G网站，用户只要通过简单的设置，就能快速生成属于您自己的微信3G网站，并且有各种精美模板，供您选择，还有自定义模版，可以设计出自己的风格，让您的粉丝有种惊艳的感觉。在微易官方微信号输入"首页"体验微信3G网站。</p>
            <p>1、微官网设置：商家可以设置微官网的标题、触发关键词、匹配模式、图文消息标题、上传图文消息封面、编辑图文消息简介，设置完全符合商家需求的个性化网站。</p>
            <p>2、首页幻灯片设置：商家可以设置幻灯片名称、显示顺序、上传幻灯片图片、填写外链网站或活动，设置在首页显示。</p>
            <p>3、分类管理：点击添加分类，设置分类名称、分类描述、显示顺序、上传分类图片、是否显示在首页、添加外链网站或活动、选择图标，这样就创建了一个分类。</p>
            <p>4、模板管理：首先选择栏目首页模板风格，然后选择图文列表模板风格，最后选择图文详细模板，这样就完成了一套完整的模板设置。</p>

            </dt>
        </dl>
    </div>

</div>
</div>
-->

</div>
</div>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>
