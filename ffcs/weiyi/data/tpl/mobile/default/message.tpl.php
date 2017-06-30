<?php defined('IN_IA') or exit('Access Denied');?><!DOCTYPE html>
<html>
<head>
	<title><?php  if($title) { ?><?php  echo $title;?><?php  } else { ?><?php  if(!empty($_W['account']['name'])) { ?><?php  echo $_W['account']['name'];?><?php  } ?><?php  } ?></title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<!-- Mobile Devices Support @begin -->
	<meta content="application/xhtml+xml;charset=UTF-8" http-equiv="Content-Type">
	<meta content="no-cache,must-revalidate" http-equiv="Cache-Control">
	<meta content="no-cache" http-equiv="pragma">
	<meta content="0" http-equiv="expires">
	<meta content="telephone=no, address=no" name="format-detection">
	<meta content="width=device-width, initial-scale=1.0" name="viewport">
	<meta name="apple-mobile-web-app-capable" content="yes" /> <!-- apple devices fullscreen -->
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<!-- Mobile Devices Support @end -->
	<meta name="keywords" content="微信,微信公众平台" />
	<link type="text/css" rel="stylesheet" href="./resource/style/bootstrap.css">
	<link type="text/css" rel="stylesheet" href="./resource/style/font-awesome.min.css" />
	<link type="text/css" rel="stylesheet" href="./themes/mobile/default/style/common.mobile.css">
	<script type="text/javascript" src="./resource/script/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="./resource/script/bootstrap.js"></script>
	<script type="text/javascript" src="./resource/script/cascade.js"></script>
	<!--[if IE 7]>
	<link rel="stylesheet" href="./resource/style/font-awesome-ie7.min.css">
	<![endif]-->
	<style>
	/*快捷菜单*/
	.footer-menu{position:fixed;bottom:10px;left:10px;}
	.footer-menu .menu-button{color:#00AFF0; background:#FFF; font-size:50px; width:43px; height:43px; position:relative;}
	.footer-menu .menu-button i{margin-top:-3px; position:absolute;}
	.footer-menu .menu-main{background:rgba(0, 0, 0, 0.1); padding:2px; display:none; margin-bottom:10px;}
	.footer-menu .menu-main ul{margin:0; background:#FFF; border:1px #CCC solid; position:relative; overflow:hidden;}
	.footer-menu .menu-main a{padding:0 10px;text-decoration:none;border-bottom:1px #CCC solid;display:block;height:30px;line-height:30px;position:relative;margin-bottom:-1px; font-size:14px;}
	.footer-menu .menu-main a i{margin-right:10px; color:#00AFF0;}
	.footer-menu .menu-main a span{color:#333;}
	/*适应手机端的div样式*/
	.mobile-div{border:1px #CCC solid; margin:10px 5px; background:#FFF; overflow:hidden;}
	.mobile-hd{
		height:35px;
		line-height:35px;
		padding:0 10px;
		color: #666;
		text-shadow: 0 1px #FFF;
		border-bottom:1px solid #C6C6C6;
		background-color:#E1E1E1;
		background-image: linear-gradient(bottom, #E7E7E7 0%, #f9f9f9 100%);
		background-image: -o-linear-gradient(bottom, #E7E7E7 0%, #f9f9f9 100%);
		background-image: -moz-linear-gradient(bottom, #E7E7E7 0%, #f9f9f9 100%);
		background-image: -webkit-linear-gradient(bottom, #E7E7E7 0%, #f9f9f9 100%);
		background-image: -ms-linear-gradient(bottom, #E7E7E7 0%, #f9f9f9 100%);
		background-image: -webkit-gradient(
		linear,
		left bottom,
		left top,
		color-stop(0, #E7E7E7),
		color-stop(1, #f9f9f9)
		);
		-webkit-box-shadow: 0 1px 0 #FFFFFF inset, 0 1px 0 #EEEEEE;
		-moz-box-shadow: 0 1px 0 #FFFFFF inset, 0 1px 0 #EEEEEE;
		box-shadow: 0 1px 0 #FFFFFF inset, 0 1px 0 #EEEEEE;
		-webkit-border-radius: 5px 5px 0 0;
		-moz-border-radius: 5px 5px 0 0;
		-o-border-radius: 5px 5px 0 0;
		border-radius: 5px 5px 0 0;
	}
	.mobile-hd i{line-height:35px;}
	.mobile-content{margin:10px; overflow:hidden;}
	.mobile-content .help-block{margin-bottom:0; margin-top:3px; color:#AAA;}
	.mobile-div .collapse .mobile-content{margin-top:0; padding:0 5px; color:#666; border-left:3px #EEE solid; background:#F9F9F9;}
	.mobile-img img{width:100%;}
	.mobile-submit{margin:0 5px;}
	.mobile-li{display:block; text-decoration:none; color:#666; height:35px; line-height:35px; font-size:14px; padding:0 10px; border-top:1px #CCC solid;}
	.mobile-li:first-child{border-top:0;}
	.mobile-li i{line-height:35px;}
	.mobile-li:hover{text-decoration:none; color:#333;}
	.mobile-li .btn.pull-right,.mobile-li .btn.pull-left{margin-top:6px;}
	.alert.mobile-alert{overflow:hidden; margin:10px 5px 0 5px;}
	.alert.mobile-alert h4{line-height:25px; text-align:center;}
	/*手机端导航*/
	.navbar-inner{min-height:35px; line-height:35px;}
	/*提示信息*/
	.message{margin:10% 10px 40% 10px; overflow:hidden; padding-left:80px;}
	.message i{float:left; font-size:60px; margin-left:-70px;}
	.message h3{line-height:30px;}
	.message span{color:#666; font-size:14px; line-height:23px; display:block;}
	/*商家信息*/
	.business .accordion-toggle span{display:inline-block; width:80px; margin-right:5px; font-weight:bold;}
	.business .accordion-toggle{background:#F7F7F7;}
	/*风格设置*/
	<?php  if($name == 'home') { ?>
	body {background-image:url(<?php  echo $_W['styles']['homebgimg'];?>); background-color:<?php  echo $_W['styles']['homebgcolor'];?>; <?php  echo $_W['styles']['homebgextra'];?>; }
	<?php  } ?>
	</style>
</head>
<body>

<div class="alert alert-<?php  echo $type;?> message">
	<i class="icon-<?php  if($type == 'success') { ?>ok<?php  } ?><?php  if($type == 'error') { ?>remove<?php  } ?><?php  if($type == 'block' || $type == 'sql') { ?>warning-sign<?php  } ?><?php  if($type == 'info') { ?>info-sign<?php  } ?>"></i>
	<?php  if($type == 'sql') { ?>
		<h3>MYSQL 错误：</h3>
		<span><?php  echo cutstr($msg['sql'], 300, 1);?></span>
		<span><b><?php  echo $msg['error']['0'];?> <?php  echo $msg['error']['1'];?>：</b><?php  echo $msg['error']['2'];?></span>
	<?php  } else { ?>
	<h3><?php  if($type == 'success') { ?>成功<?php  } ?><?php  if($type == 'error') { ?>错误<?php  } ?><?php  if($type == 'block') { ?>警告<?php  } ?><?php  if($type == 'info') { ?>提示<?php  } ?></h3>
	<span><?php  echo $msg;?></span>
	<?php  if($redirect) { ?>
	<p style="margin-top:20px;"><a href="<?php  echo $redirect;?>">正在跳转</a></p>
	<script type="text/javascript">
		setTimeout(function () {
			location.href = "<?php  echo $redirect;?>";
		}, 3000);
	</script>
	<?php  } else { ?>
	<p style="margin-top:20px;">[<a href="javascript:history.go(-1);">返回上一页</a>] &nbsp; [<a href="<?php  echo create_url('mobile/channel', array('name' => 'index', 'weid' => $_W['weid']))?>">首页</a>]</p>
	<?php  } ?>
	<?php  } ?>
</div>
	<div id="footer">&copy;<?php  if(empty($_W['account']['name'])) { ?>微翼团队<?php  } else { ?><?php  echo $_W['account']['name'];?><?php  } ?></div>
</div>
<?php  if(!empty($quick)) { ?>
<div class="footer-menu">
	<div class="menu-main img-rounded">
		<ul class="unstyled img-rounded">
			<?php  if(is_array($quick)) { foreach($quick as $nav) { ?>
			<li>
			<a href="<?php  echo $nav['url'];?>" class="box-item">
				<i class="<?php  echo $nav['css']['icon']['icon'];?>" style="<?php  echo $nav['css']['icon']['style'];?>"></i>
				<span style="<?php  echo $nav['css']['name'];?>"><?php  echo $nav['name'];?></span>
			</a>
			</li>
			<?php  } } ?>
		</ul>
	</div>
	<div class="menu-button img-circle"><i class="icon-plus-sign"></i></div>
</div>
<?php  } ?>
<script type="text/javascript">
$(function() {
	$(window).scroll(function(){
		$(".menu-button").find("i").removeClass("icon-minus-sign").addClass("icon-plus-sign");
		$(".menu-main").hide();
	});
	$(".menu-main a").click(function(){ $(".menu-main").hide(); });

});
</script>
</body>
</html>
