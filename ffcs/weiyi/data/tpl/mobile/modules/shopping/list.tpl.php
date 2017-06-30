<?php defined('IN_IA') or exit('Access Denied');?><?php  include $this->template('header', TEMPLATE_INCLUDEPATH);?>
<link type="text/css" rel="stylesheet" href="./source/modules/shopping/images/common.css">


<header>
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="navbar-inner" style="padding:0 5px;">
<!--            <a class="btn btn-small btn-inverse pull-right" href="<?php  echo create_url('mobile/channel', array('name' => 'home', 'weid' => $_W['weid']))?>"><i class="icon-user"></i> 个人中心</a>-->
            <a class="btn btn-small btn-inverse pull-left" href="<?php  echo $this->createMobileUrl('mycart')?>"><i class="icon-shopping-cart"></i> 我的购物车</a>
            <a class="btn btn-small btn-inverse pull-left" href="<?php  echo $this->createMobileUrl('myorder')?>"><i class="icon-reorder"></i> 我的订单</a>
        </div>
    </div>
    <nav class="clearfix">
        <a <?php  if(empty($_GPC['pcate']) && empty($_GPC['ccate'])) { ?> class="current"<?php  } ?> href="<?php  echo $this->createMobileUrl('list')?>">全部</a>
        <?php  $i = 0 ;?>
        <?php  if(is_array($category)) { foreach($category as $item) { ?>
            <?php  if($i < 2 ) { ?>
                <a <?php  if($item['id'] == $_GPC['pcate']) { ?> class="current"<?php  } ?> href="<?php  echo $this->createMobileUrl('list', array('pcate' => $item['id']))?>"><?php  echo $item['name'];?></a>
           <!-- <?php  if(is_array($children[$item['id']])) { foreach($children[$item['id']] as $citem) { ?>
                <a<?php  if($citem['id'] == $_GPC['ccate']) { ?> class="current"<?php  } ?> href="<?php  echo $this->createMobileUrl('list', array('ccate' => $citem['id']))?>"><?php  echo $citem['name'];?></a>
            <?php  } } ?>-->
            <?php  } else { ?>
                <?php  if($i == 2) { ?>
                <span class="more">
                    <a href="###">更多</a>
                   <ul >
                <?php  } ?>
                       <li><a <?php  if($item['id'] == $_GPC['pcate']) { ?> class="current"<?php  } ?> href="<?php  echo $this->createMobileUrl('list', array('pcate' => $item['id']))?>"><?php  echo $item['name'];?></a></li>
                <?php  if($i == $category.length - 1) { ?>
                   </ul>
                </span>
                <?php  } ?>
            <?php  } ?>
            <?php  $i ++ ;?>
        <?php  } } ?>

        <script type="text/javascript">
            $('nav .more').click(function(e){
                e.stopPropagation()
                $(this).toggleClass('shown')
            })
            $(document).click(function(){
                $('nav .more').removeClass('shown')
            })
        </script>
    </nav>
</header>


<div class="list-main">
	<!--<div class="menu-button">
		<ul class="unstyled">
			<li><a style="text-align:left; padding:0; padding-left:10px; font-weight:bold; font-size:14px;"<?php  if(empty($_GPC['pcate']) && empty($_GPC['ccate'])) { ?> class="active"<?php  } ?> href="<?php  echo $this->createMobileUrl('list')?>">全部</a><span class="img-circle"></span></li>
		<?php  if(is_array($category)) { foreach($category as $item) { ?>
			<li><a style="text-align:left; padding:0; padding-left:10px; font-weight:bold; font-size:14px;"<?php  if($item['id'] == $_GPC['pcate']) { ?> class="active"<?php  } ?> href="<?php  echo $this->createMobileUrl('list', array('pcate' => $item['id']))?>"><?php  echo $item['name'];?></a><span class="img-circle"></span></li>
			<?php  if(is_array($children[$item['id']])) { foreach($children[$item['id']] as $citem) { ?>
			<li><a<?php  if($citem['id'] == $_GPC['ccate']) { ?> class="active"<?php  } ?> href="<?php  echo $this->createMobileUrl('list', array('ccate' => $citem['id']))?>"><?php  echo $citem['name'];?></a><span class="img-circle"></span></li>
			<?php  } } ?>
		<?php  } } ?>
		</ul>
	</div>-->

    <ul class="mobile-lists">
        <?php  if(is_array($list)) { foreach($list as $item) { ?>
        <li class="item">
            <div class="inner">
                <div class="thumb">
                    <a href="<?php  echo $this->createMobileUrl('detail', array('id' => $item['id']))?>"><img src="<?php  echo $_W['attachurl'];?><?php  echo $item['thumb'];?>"></a>
                </div>
                <div class="info">
                    <p class="name text-ellipsis"><a href="<?php  echo $this->createMobileUrl('detail', array('id' => $item['id']))?>"><?php  echo $item['title'];?></a><?php  if($item['type'] == '2') { ?>(虚拟)<?php  } ?></p>
                    <p>
                        <span class="price">￥<?php  echo $item['marketprice'];?> <?php  if($item['unit']) { ?> / <?php  echo $item['unit'];?><?php  } ?></span>
                        <span style="display: none;"><?php  echo cutstr($item['description'], 20)?></span>
                        <span style="display: none;" id="goodsnum_<?php  echo $item['id'];?>"></span>
                    </p>
                </div></div>
        </li>
        <?php  } } ?>
    </ul>
    <?php  echo $pager;?>

	<!--<div class="menu-list">
		<ul class="unstyled">
			<?php  if(is_array($list)) { foreach($list as $item) { ?>
			<li>
				<div class="pull-right">
					<div class="img-circle menu-list-button add" onclick="order.add(<?php  echo $item['id'];?>)">+</div>
					<div class="menu-list-num" id="goodsnum_<?php  echo $item['id'];?>"></div>
					<div class="img-circle menu-list-button reduce" onclick="order.reduce(<?php  echo $item['id'];?>);">-</div>
				</div>
				<div class="pull-left menu-pic">
					<a href="<?php  echo $this->createMobileUrl('detail', array('id' => $item['id']))?>"><img src="<?php  echo $_W['attachurl'];?><?php  echo $item['thumb'];?>" class="img-rounded"></a>
				</div>
				<div class="pull-left menu-detail">
					<span class="title"><a href="<?php  echo $this->createMobileUrl('detail', array('id' => $item['id']))?>"><?php  echo $item['title'];?></a><?php  if($item['type'] == '2') { ?>(虚拟)<?php  } ?></span>
					<span class="click"><?php  echo cutstr($item['description'], 20)?></span>
					<span class="price"><?php  echo $item['marketprice'];?>元 <?php  if($item['unit']) { ?> / <?php  echo $item['unit'];?><?php  } ?></span>
				</div>
			</li>
			<?php  } } ?>
		</ul>
		<?php  echo $pager;?>
	</div>-->
<!--	<input type="button" value="我的购物车" onclick="location.href = '<?php  echo $this->createMobileUrl('mycart')?>'" class="btn btn-sm btn-primary  btn-success" style="position:fixed; bottom:20px; right:20px;">-->
</div>
<script>
function menuData(a) {
	var a = $(a);
	var e = 0;
	var b = $('.menu-button li a:[class=active]').parent();
	a.parent().parent().find('.menu-list-num').each(function(i) {
		e = parseInt($(this).html()) + e;
	});
	if(b.find('.img-circle').html() == '') b.find('.img-circle').html(0);
	b.find('.img-circle').html(e);
	if(e != 0) {
		b.find('.img-circle').show();
	} else {
		b.find('.img-circle').hide();
	}
	e = 0;
}

$(".menu-button").css({"position":"absolute", "top":"36px"});
$(".list-main, .menu-button, .menu-list").height($(window).height()-36);
var order = {
	'add' : function(goodsid) {
		var $this = this;
		$this.cart(goodsid, 'add');
	},
	'reduce' : function(goodsid) {
		var $this = this;
		$this.cart(goodsid, 'reduce');
	},
	'cart' : function(goodsid, operation) {
		if (!goodsid) {
			alert('请选择商品！');
			return;
		}
		operation = operation ? operation : 'add';
		$.getJSON('<?php  echo $this->createMobileUrl('updatecart');?>', {'op' : operation, 'goodsid' : goodsid}, function(s){
			if (s.message.status) {
				$('#goodsnum_'+goodsid).html(s.message.total);
				menuData('#goodsnum_'+goodsid);
			} else {
				alert(s.message.message);
			}
		});
	}
};
</script>
<?php  $footer_off = 1;?>
<?php  include $this->template('footer', TEMPLATE_INCLUDEPATH);?>