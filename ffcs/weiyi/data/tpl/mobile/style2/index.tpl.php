<?php defined('IN_IA') or exit('Access Denied');?><?php  include template('header', TEMPLATE_INCLUDEPATH);?>
<?php  include template('slide', TEMPLATE_INCLUDEPATH);?>
<style>
body{
font:<?php  echo $_W['styles']['fontsize'];?> <?php  echo $_W['styles']['fontfamily'];?>;
color:<?php  echo $_W['styles']['fontcolor'];?>;
padding:0;
margin:0;
background-image:url('<?php  if(!empty($_W['styles']['indexbgimg'])) { ?><?php  echo $_W['styles']['indexbgimg'];?><?php  } ?>');
background-size:cover;
background-color:<?php  if(empty($_W['styles']['indexbgcolor'])) { ?>#F9F9F9<?php  } else { ?><?php  echo $_W['styles']['indexbgcolor'];?><?php  } ?>;
<?php  echo $_W['styles']['indexbgextra'];?>
}
a{color:<?php  echo $_W['styles']['linkcolor'];?>; text-decoration:none;}
<?php  echo $_W['styles']['css'];?>
.box{width:100%;overflow:hidden;margin-top:10px;}
.box .box-item{float:left;text-align:center;display:block;text-decoration:none;outline:none;width:25%;height:90px;margin-bottom:8px;position:relative; color:#333;}
.box .box-item i{
display:inline-block;
width:60px;
height:60px;
line-height:60px;
font-size:35px;
color:#e4c393;
text-shadow: 0 -1px 0 rgba(0,0,0,0.25);
background-color: #9e0b36;
background-image: -moz-linear-gradient(top,#b61345,#8c052e);
background-image: -webkit-gradient(linear,0 0,0 100%,from(#b61345),to(#8c052e));
background-image: -webkit-linear-gradient(top,#b61345,#8c052e);
background-image: -o-linear-gradient(top,#b61345,#8c052e);
background-image: linear-gradient(to bottom,#b61345,#8c052e);
background-repeat: repeat-x;
overflow:hidden;
border:2px #FFF solid;
}
.box .box-item span{color:<?php  echo $_W['styles']['fontnavcolor'];?>;display:block;font-size:14px; margin-top:-5px; position:absolute; bottom:0; width:100%;}
</style>
<div class="box">
	<?php  if(is_array($navs)) { foreach($navs as $nav) { ?>
	<a href="<?php  echo $nav['url'];?>" class="box-item">
		<?php  if(!empty($nav['icon'])) { ?>
		<i style="background:url(<?php  echo $_W['attachurl'];?><?php  echo $nav['icon'];?>) no-repeat;background-size:cover;" class="img-rounded"></i>
		<?php  } else { ?>
		<i class="<?php  echo $nav['css']['icon']['icon'];?> img-rounded" style="<?php  echo $nav['css']['icon']['style'];?>"></i>
		<?php  } ?>
		<span style="<?php  echo $nav['css']['name'];?>"><?php  echo $nav['name'];?></span>
	</a>
	<?php  } } ?>
</div>
<?php  include template('footer', TEMPLATE_INCLUDEPATH);?>