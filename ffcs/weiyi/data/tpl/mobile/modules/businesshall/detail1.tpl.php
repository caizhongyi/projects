<?php defined('IN_IA') or exit('Access Denied');?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
    <meta charset="utf-8" />
    <link type="text/css" rel="stylesheet" href="./resource/style/bootstrap.min.css">
    <link rel="stylesheet" href="./source/modules/businesshall/detail1/css/base.css" type="text/css" />
    <link rel="stylesheet" href="./source/modules/businesshall/detail1/css/extend.css" type="text/css" />
    <link rel="stylesheet" href="./source/modules/businesshall/detail1/css/slideDownMsg.css" type="text/css" />
    <link rel='stylesheet' href='./source/modules/businesshall/detail1/css/nav.css' type='text/css' />
    <script type="text/javascript" src="./resource/script/jquery-1.7.2.min.js"></script>
    <!-- <script type="text/javascript" src="./source/modules/businesshall/detail1/j/lib/jquery.cookie.min.js"></script>
     <script type="text/javascript" src="./source/modules/businesshall/detail1/j/lib/jquery.json.js"></script>-->
    <script type="text/javascript" src="./source/modules/businesshall/detail1/js/common.js"></script>
    <script type="text/javascript" src="./source/modules/businesshall/detail1/js/util.js"></script>
    <script type="text/javascript" src="./source/modules/businesshall/detail1/js/ExtendJQUery.js"></script>
    <script type="text/javascript" src="./source/modules/businesshall/detail1/js/AjaxUtils.js"></script>
    <script type="text/javascript" src="./source/modules/businesshall/detail1/js/init.js"></script>
    <script type="text/javascript" src="./source/modules/businesshall/detail1/js/form.js"></script>
    <script type="text/javascript">
        var contextPath = "";
        var globalActivity = "";
        var globalShowIcon = "";
        var globalFuse = "";
        var globalOrderTotalPrices = "0";
        window.noStock = true;


    </script>


    <title>
        <?php  echo $goods['title'];?>
    </title>
    <script type="text/javascript" src="./source/modules/businesshall/detail1/js/wgt_carousel.js"></script>
    <script type="text/javascript" src="./source/modules/businesshall/detail1/js/hotProducts_heyueji.js"></script>
</head>
<body>
<div class="navbar navbar-inverse navbar-fixed-top">
    <div style="padding:0 5px;" class="navbar-inner">
        <!--            <a class="btn btn-small btn-inverse pull-right" href="mobile.php?act=channel&name=home&weid=64"><i class="icon-user"></i> 个人中心</a>-->
        <a href="mobile.php?act=module&amp;name=shopping&amp;do=mycart&amp;weid={}" class="btn  btn-inverse pull-left"><i class="icon-shopping-cart"></i> 我的购物车</a>
        <a href="mobile.php?act=module&amp;name=shopping&amp;do=myorder&amp;weid=64" class="btn  btn-inverse pull-left"><i class="icon-list"></i> 我的订单</a>
    </div>
</div>
<!--<div class="header">
    <a href="login/initLogin.action?type=mobile#/mobile" class="go_link">小翼好机友<b></b></a>
    <a href="login/initLogin.action" class="go_home"></a>
</div>-->
<div class="clearHeader"></div>
<div class="pro_top">
    <!--<div class="pro_pic_list" id="picWrap">
        <ul id="pic_list"><li class="pic"><img src="images/pro01.jpg" /></li><li class="pic"><img src="images/pro02.jpg" /></li><li class="pic"><img src="images/pro01.jpg" /></li></ul>
    </div>
    <script type="text/javascript">
        //初始化图片展示=============
        new Carousel('picWrap')
    </script>-->
    <style type="text/css">
        .box_swipe {
            overflow: hidden;
            position: relative;
            visibility: hidden;
        }
        .box_swipe ul {
            overflow: hidden;
            position: relative;
        }
        .box_swipe ul > li {
            float: left;
            position: relative;
            width: 100%;
        }
        .box_swipe ul li span {
            bottom: 5px;
            color: #FFFFFF;
            display: inline-block;
            left: 10px;
            position: absolute;
            width: 75%;
        }
        .box_swipe > ol {
            height: 20px;
            margin-top: -25px;
            padding-right: 15px;
            position: relative;
            text-align: center;
            z-index: 10;
        }
        .box_swipe > ol > li {
            background-color: #CDCDCD;
            border-radius: 8px;
            display: inline-block;
            height: 8px;
            margin: 5px 0;
            width: 8px;
        }
        .box_swipe > ol > li.on {
            background-color: rgba(235, 102, 25, 0.9);
        }
    </style>
    <script type="text/javascript" src="./themes/mobile/default/script/swipe.js"></script>
    <div id="banner_box" class="box_swipe">

    </div>


    <div class="pro_title">
        <h1 id="pro_title"><?php  echo $goods['title'];?><span></span></h1>
        <h2 class="pad_rl_10"><span id="pro_intro"><!--3G高速网络，E/G双网双待，谷歌Android 2.2智能系统3G高速网络--></span></h2>
    </div>
    <div class="pro_price clearfix pad_rl_10">
        <span>价格：<b class="red">￥<i id="pro_price" price="<?php  echo $goods['marketprice'];?>"><?php  echo $goods['marketprice'];?></i></b> </span>  <span id="returnCash" class="red"></span> <span id="numberPrice" class="red"></span>
        <!--<span class="sales">已销售：<b id="pro_sales">&lt;!&ndash;8888&ndash;&gt;</b>件</span>-->
    </div>
    <div class="pro_color_video clearfix pad_rl_10">
        <div class="pro_color">
            <ul>
                <li class="proColor">选择颜色：<span id="changeColor">
                    <?php  $colornum = 0;?>
                    <?php  if(is_array($color_infos)) { foreach($color_infos as $colorval => $color) { ?>
                        <?php  if($color['checked']) { ?>
                            <a  class="<?php  if($colornum==0) { ?>cur<?php  } ?>" data-thumb="<?php  if($color['path']&&is_array($color['path'])) { ?><?php  echo implode(',',$color['path']);?><?php  } ?>" href="javascript:;"><?php  echo $colorval;?><i></i></a>
                            <?php  $colornum++;?>
                        <?php  } ?>
                    <?php  } } ?>
                </span>
                </li>
                <li>购买件数：1件</li>
            </ul>
        </div>
        <script type="text/javascript">
            $('#changeColor').on('click','a',function(){
                var thumbs = $(this).data('thumb').split(','),$ul = $('<ul></ul>'), $ol =$('<ol></ol>');
                for(var i = 0; i < thumbs.length ;i++){
                    $ul.append('<li> <img src="'+"<?php  echo $_W['attachurl'];?>"+thumbs[i] +'" /></li>')
                    $ol.append('<li></li> ')
                }
                $('#banner_box').empty().append($ul).append($ol);
                new Swipe(document.getElementById('banner_box'), {
                    speed:500,
                    auto:3000,
                    callback: function(){
                        var lis = $(this.element).next("ol").children();
                        lis.removeClass("on").eq(this.index).addClass("on");
                    }
                });
            }).find('a:eq(0)').click();
        </script>
        <div class="pro_video">
            <a href="javascript:;" id="pro_video_link" style="display:none">
                <img id="pro_video_pic" src="" alt="" class="none" /><span>靓声美<br/>女介绍</span><i id="video_play_bg"></i>
            </a>
            <div id="player"></div>
            <!--<audio controls="controls" id="pro_video_play">
                <source src="" type="audio/ogg">
                <source src="" type="audio/mpeg">
            </audio>-->
        </div>
    </div>
</div>

<div class="pro_select">
    <div class="pro_select_title" id="hyjh_title">合约计划：<b></b></div>
    <div class="pro_select_main hyjh clearfix none">
        <ul id="hyjh_list">
            <?php  if(is_array($contracts)) { foreach($contracts as $k => $contract) { ?>
                <li><label><input type="radio" name="tc"
                                  data-compare ="<?php  echo $contract['thumb'];?>"
                                  data-period="<?php  echo $contract['contract_period'];?>"
                                  data-price="月租(元),<?php  echo $contract['contract_price'];?>"
                                  data-calltime="国内通话时长(分钟),<?php  echo $contract['call_time'];?>"
                                  data-flow="国内上网流量(M),<?php  echo $contract['mobile_inter_traffic'];?>"
                                  data-sms="国内短信(条),<?php  echo $contract['mobile_text'];?>"
                                  data-wifi="国内WIFI上网时长(分钟),<?php  echo $contract['wifi'];?>"
                                  data-callover="超出套餐之外的国内通话收费标准(元/分钟),<?php  echo $contract['call_bill_overflow'];?>"
                                  data-flowover="超出流量后的流量收费标准(元/M),<?php  echo $contract['inter_bill_overflow'];?>"
                                  data-smsover="超出套餐之外的短信收费标准(元/条),<?php  echo $contract['text_bill_overflow'];?>"
                                  value="<?php  echo $contract['contract_id'];?>"><?php  echo $contract['contract_name'];?></label></li>
            <?php  } } ?>
        </ul>
    </div>
</div>
<script type="text/javascript">
    $(function(){
        $("#hyjh_list").on('click','label',function(){
            var hyxx_title_html = $(this).text();
            var input = $(this).find('input');
            var cid =  input.val();
            period = input.data('period');
            compare =input.data('compare');//图片
            console.log(compare);
            price = input.data('price').split(',')['1'];
            calltime = input.data('calltime').split(',')['1'];
            flow = input.data('flow').split(',')['1'];
            sms = input.data('sms').split(',')['1'];
            wifi = input.data('wifi').split(',')['1'];
            callover = input.data('callover').split(',')['1'];
            flowover = input.data('flowover').split(',')['1'];
            smsover = input.data('smsover').split(',')['1'];
            compare_html = '';
            if(compare){
                compare_html = '<h3><img alt="" src="<?php  echo $_W['attachurl'];?>'+compare+'"></h3>';
            }

            $.get("<?php  echo $getcontracturl;?>"+"&id="+cid,function(data){

                tbody_html = "<tr><td>月租(元)</td><td>国内通话时长(分钟)</td><td>国内上网流量(M)</td><td>国内短信(条)</td></tr>" +
                        "<tr><td>"+price+"</td><td>"+calltime+"</td><td>"+flow+"</td><td>"+sms+"</td></tr>" +
                        "<tr><td>国内WIFI上网时长(分钟)</td><td>超出套餐之外的国内通话收费标准(元/分钟)</td><td>超出流量后的流量收费标准(元/M)</td><td>超出套餐之外的短信收费标准(元/条)</td></tr>" +
                        "<tr><td>"+wifi+"</td><td>"+callover+"</td><td>"+flowover+"</td><td>"+smsover+"</td> </tr>";
                tbody_html +=data;
                tbody_html += '<h3><img alt="" src="/images/Phone/compare/sxs4289pk389.gif"></h3>';
                var html ='<h2 id="heiyue_name">合约信息：<span>' +hyxx_title_html+' 合约期'+period+'个月</span></h2>'
                html +='<table width="100%" cellspacing="0" cellpadding="0" border="0" class="table_border table_4d">\
            <tbody>' + tbody_html +'</tbody>\
            </table>' + compare_html ;
                $("#hyxx").html(html);
            });

        });
    })
</script>

<div class="pro_select no_marginT no_borderT">
    <div class="pro_select_title" id="hyxx_title">合约信息：<b></b></div>
    <div class="pro_select_main hyxx none" id="hyxx">
        <div class="red">请选择合约计划</div>
    </div>
</div>
<input type="hidden" id="getphoneurl" value="<?php  echo $getphoneurl;?>"/>
<input type="hidden" id="car_url" value="<?php  echo $car_url;?>"/>
<input type="hidden" id="pay_url" value="<?php  echo $pay_url;?>"/>
<input type="hidden" id="id" value="<?php  echo $goodsid;?>"/>
<input type="hidden" id="token" value="<?php  echo $_W['token'];?>"/>
<div class="pro_select">
    <div class="pro_select_title" id="hmxz_title">号码选择：<b></b></div>

    <div class="pro_select_main hmxz clearfix none">
        <h2 id="number_types">
            <?php  if(is_array($phone_infos)) { foreach($phone_infos as $n => $phone_info) { ?><a href="javascript:;" numberpagecur='0' class="<?php  if($n== 0) { ?>cur<?php  } ?>" phoneid = <?php  echo $phone_info['phone_package_id'];?> prestore="<?php  echo $phone_info['phonenum_price']?>" minconsume="<?php  if($phone_info['min_consumption']=='0') { ?>无限制<?php  } else { ?><?php  echo $phone_info['min_consumption'];?>元<?php  } ?>" ><?php  echo $phone_info['phonenum_name'];?> </a><?php  } } ?>
        </h2>
        <h3>
            <span id="minConsume"></span>
            <a href="javascript:;" id="btn_change_number">换一批</a>
        </h3>
        <ul id="number_list">
            <script type="text/javascript">
                $(function(){
                    $('#number_types > a:eq(0)').trigger('click')
                })
            </script>
        </ul>
    </div>
</div>

<div class="btn_sure"><a href="javascript:;" class="btn btn-primary" id="submitBtn">立即购买</a>  <!--&nbsp; &nbsp; <a href="javascript:;" class="btn cancelBtn" id="addShopcartBtn">加入购物车</a>--></div>

<div class="pro_select">
    <div class="pro_select_title" id="bbxq_title">宝贝详情：<b></b></div>
    <div class="pro_select_main bbxq none" id="bbxq">
        <table width="100%" cellspacing="0" cellpadding="0" border="0" class="table_border table_3d">
            <tbody id="details_list">
            <?php  echo $goods_detail;?>
            </tbody>
        </table>
        <img id="details_pic" src="<?php  if(!empty($goods['thumb'])) { ?><?php  echo $_W['attachurl'];?><?php  echo $goods['thumb'];?><?php  } ?>" alt="" />
        <a class="bbxq_goTop none" id="bbxq_goTop" href="javascript:;"></a>
    </div>
</div>



<div class="pro_select">
    <div class="pro_select_title" >购买流程：<b></b></div>
    <div class="pro_select_main clearfix gmlc none">
        <ul>
            <li><h2><b>1、选手机</b>选择你中意的手机</h2></li>
            <li><h2><b>2、选择合约套餐</b>选择经济的套餐</h2></li>
            <li><h2><b>4、下单</b>提交订单</h2></li>
            <li><h2><b>3、选号码</b>选择靓号</h2></li>
        </ul>
        <b class="arrow1"></b>
        <b class="arrow2"></b>
        <b class="arrow3"></b>
    </div>
</div>

<script type="text/javascript">
    if(window.noStock){
        $(function(){
          /*  $("#submitBtn").hide();
            $("#addShopcartBtn").hide();*/
        });
    }
</script>


<div class="footer"><b style="color: #429dff;"></b></div>
</body>
</html>