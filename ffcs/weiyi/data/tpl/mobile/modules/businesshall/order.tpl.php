<?php defined('IN_IA') or exit('Access Denied');?><?php  include $this->template('header', TEMPLATE_INCLUDEPATH);?>
<link type="text/css" rel="stylesheet" href="./source/modules/businesshall/images/common.css">
<style>
.table{font-size:12px;}
.table td{padding:5px 0;}
.table .title{border-top:0; font-weight:600; color:#51a351;}
.table .price{}
.table .price .total{font-size:14px; font-weight:bold; display:inline-block; }
.table .price .btn{margin-top:5px;}
.table .price .payover{font-size:14px; font-weight:bold;}
</style>
<div class="navbar navbar-inverse navbar-fixed-top">
	<div class="navbar-inner" style="padding:0 5px;">
<!--		<a class="btn btn-small btn-inverse pull-right" href="<?php  echo create_url('mobile/channel', array('name' => 'home', 'weid' => $_W['weid']))?>"><i class="icon-user"></i> 个人中心</a>-->
		<button class="btn btn-small btn-inverse pull-left" onclick="history.go(-1);"><i class="icon-chevron-left"></i> 返回</button>
	</div>
</div>
<div class="order-main">
	<div class="order-hd">
		<!--<span class="pull-right"><em>我的余额：</em><span class="total"><?php  echo $_W['fans']['credit2'];?></span>元</span>-->
	</div>
	<div class="order-detail">
		<div class="order-detail-hd">我的订单</div>
		<div class="order-detail-list">
			<?php  if(is_array($list)) { foreach($list as $item) { ?>
			<table class="table">
				<tr>
					<td class="title" colspan="3">
						<span class="pull-right"><?php  echo date('Y-m-d H:i', $item['createtime'])?></span>
						<span class="pull-left">★订单号：<?php  echo $item['ordersn'];?></span>
					</td>
				</tr>
				<?php  if(is_array($item['goods'])) { foreach($item['goods'] as $goods) { ?>
				<tr>
                    <?php  $mobile = $this->get_contract_mobile_detail($goods);?>
					<td style="width:60%;"><?php  echo $goods['title'];?><?php  if(!empty($mobile['2'])) { ?>(<?php  echo $mobile['2'];?>)<?php  } ?>
                        <?php  if($goods['type_id'] == CONTRACT_MOBILE) { ?>
                        <br>套餐：<?php  echo $mobile['0']['contract_name'];?>
                        <br>号码:<?php  echo $mobile['1']['phonenum'];?><span style="color:red;">(号码价格￥<span class="phonenum_price"><?php  echo $mobile['1']['phonenum_price'];?></span></span>)
                        <?php  } ?>
                    </td>
					<td style="width:25%; text-align:right;">数量：<?php  echo $goods['total'];?><br><?php  echo $goods['marketprice'];?>元 / <?php  echo $goods['unit'];?></td>
				</tr>
				<?php  } } ?>
				<tr>
					<td class="price" colspan="3">
						<div class="pull-right">
							<span class="total">总计：<?php  echo $item['price'];?>元</span>
							<?php  if($item['status'] == 0) { ?>
								<?php  if($item['paytype'] == 3) { ?>
								货到付款
								<?php  } else { ?>
								<a href="<?php  echo $this->createMobileUrl('pay', array('orderid' => $item['id']))?>" class="btn btn-danger btn-small">立即付款</a>
								<?php  } ?>
							<?php  } else { ?>
								<span class="text-success payover">已付款</span>
							<?php  } ?>
						</div>
					</td>
				</tr>
			</table>
			<?php  } } ?>
		</div>
	</div>
</div>
<script>
$(function() {
	$('.order-detail-list li:last').css("border-bottom", 0);
});
</script>
<?php  include $this->template('footer', TEMPLATE_INCLUDEPATH);?>