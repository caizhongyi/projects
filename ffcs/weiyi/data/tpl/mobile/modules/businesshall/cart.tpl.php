<?php defined('IN_IA') or exit('Access Denied');?><?php  include $this->template('header', TEMPLATE_INCLUDEPATH);?>
<link type="text/css" rel="stylesheet" href="./source/modules/businesshall/images/common.css">
<div class="navbar navbar-inverse navbar-fixed-top">
	<div class="navbar-inner" style="padding:0 5px;">
<!--		<a class="btn btn-small btn-inverse pull-right" href="<?php  echo create_url('mobile/channel', array('name' => 'home', 'weid' => $_W['weid']))?>"><i class="icon-user"></i> 个人中心</a>-->
		<button class="btn btn-small btn-inverse pull-left" onclick="history.go(-1);"><i class="icon-chevron-left"></i> 返回</button>
	</div>
</div>
<div class="dish-main">
	<div class="order-hd">
		<span class="pull-right"><em>总计：</em><span class="total"><?php  echo $price;?></span>元</span>
		<span class="pull-left">请确认商品后提交订单</span>
	</div>
	<div class="order-detail">
		<div class="order-detail-hd">
			<span class="pull-right">
				<a class="btn btn-primary  btn-success" href="<?php  echo $this->createMobileUrl('list');?>"><i class="icon-plus"></i> 再逛逛</a>
				<a class="btn btn-default" href="<?php  echo $this->createMobileUrl('clear');?>" onclick="return confirm('此操作不可恢复，确认？'); return false;"><i class="icon-trash"></i> 清空</a>
			</span>
			<span class="pull-left">我的购物车</span>
		</div>
		<div class="order-detail-list">
            <?php  if(is_array($goods)) { foreach($goods as $item) { ?>
            <div class="media" data-itemid="<?php  echo $item['id'];?>">
                <a class="pull-left" href="#">
                    <img class="media-object"  src="<?php  echo $_W['attachurl'];?><?php  echo $item['thumb'];?>">
                </a>
                <div class="media-body">
                    <?php  $mobile = $this->get_contract_mobile_detail($item);?>
                    <h4 class="media-heading">
                        <div class="title"><?php  echo $item['title'];?>&nbsp;<small><?php  if(!empty($mobile['2'])) { ?>(<?php  echo $mobile['2'];?>)<?php  } ?></small></div>
                    </h4>
                    <!-- Nested media object -->
                    <div class="media">
                        <div class="price"><span><?php  echo $item['marketprice']?></span>元<?php  if($item['unit']) { ?> / <?php  echo $item['unit'];?><?php  } else { ?>/件<?php  } ?></div>
                        <div class="summary">
                            <span>数量：<span class="media-num"><?php  echo $item['total'];?></span><?php  echo $item['unit'];?></span>
                            <span>套餐:<?php  echo $mobile['0']['contract_name'];?></span>
                            <span>号码:<?php  echo $mobile['1']['phonenum'];?><span style="color: red;">(号码价格￥<span class="phonenum_price"><?php  echo $mobile['1']['phonenum_price'];?></span>)</span></span>
                        </div>
                    </div>

      <!--              <div class="option " >
                        <span class="img-circle menu-list-button reduce" >-</span>
                        <span class="menu-list-num"><?php  echo $item['total'];?></span>
                        <span class="img-circle menu-list-button add" >+</span>

                    </div>-->

                </div>
            </div>
            <?php  } } ?>

		</div>
	</div>
	<div class="order-detail myinfo">
		<div class="order-detail-hd">
			<span class="pull-left">我的信息</span>
		</div>
		<form id="formOrder" action="" method="post" onsubmit="return checkform(this); return false;">
			<table class="form-table">
				<tr>
					<th><label for="">真实姓名</label></th>
					<td><input type="text" id="" name="realname" value="<?php  echo $profile['realname'];?>"></td>
				</tr>
				<tr>
					<th><label for="">地区</label></th>
					<td>
						<select name="resideprovince" id="sel-provance" onChange="selectCity();" class="pull-left" style="width:30%; margin-right:5%;">
							<option value="" selected="true">省/直辖市</option>
						</select>
						<select name="residecity" id="sel-city" onChange="selectcounty()" class="pull-left" style="width:30%; margin-right:5%;">
							<option value="" selected="true">请选择</option>
						</select>
						<select name="residedist" id="sel-area" class="pull-left" style="width:30%;">
							<option value="" selected="true">请选择</option>
						</select>
					</td>
				</tr>
				<tr>
					<th><label for="">详细地址</label></th>
					<td><input type="text" id="" name="address" value="<?php  echo $profile['address'];?>" /></td>
				</tr>
				<tr>
					<th><label for="">手机</label></th>
					<td><input type="text" id="" name="mobile" value="<?php  echo $profile['mobile'];?>" /></td>
				</tr>
				<tr>
					<th><label for="">QQ(选填)</label></th>
					<td><input type="text" id="" name="qq" value="<?php  echo $profile['qq'];?>" /></td>
				</tr>
			</table>
<!--			<div class="order-detail-hd">
				<span class="pull-left">其他</span>
			</div>-->
			<?php  if($goodstype == 1) { ?>
			<!--<table class="form-table">
				<tr>
					<th><label for="">付款方式</label></th>
					<td>
						<select name="paytype">
							<option value="2">在线支付</option>
							<option value="3">货到付款</option>
						</select>
					</td>
				</tr>
				<tr>
					<th><label for="">配送方式</label></th>
					<td>
						<select name="sendtype">
							<option value="1">快递</option>
							<option value="2">自提</option>
						</select>
					</td>
				</tr>
			</table>-->
			<?php  } else { ?>
			<!--<table class="form-table">
				<tr>
					<th><label for="">付款方式</label></th>
					<td>
						<select name="paytype">
							<option value="1">余额支付</option>
							<option value="2">在线支付</option>
						</select>
					</td>
				</tr>
			</table>-->
			<?php  } ?>
		<input type="hidden" name="goodstype" value="<?php  echo $goodstype;?>" />
        <div class=""><input type="submit" value="√ 我要购买" name="submit" class="btn btn-sm btn-primary btn-success btn-block" ></div>
		<input type="hidden" name="token" value="<?php  echo $_W['token'];?>" />
	</div>
	</form>
</div>
<script type="text/javascript" src="./resource/script/cascade.js"></script>
<script type="text/javascript">
cascdeInit('<?php  echo $profile['resideprovince'];?>','<?php  echo $profile['residecity'];?>','<?php  echo $profile['residedist'];?>'); //开启地区三级联动
function accMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}
//给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg){
    return accMul(arg, this);
};

//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m;
}
//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg){
    return accAdd(arg,this);
}
function priceTotal() {
	var a = 0;

	$('.order-detail-list > .media').each(function() {
	    var price = parseFloat($(this).find('.price span').html());
        var phone_price = parseFloat($(this).find('.phonenum_price').html());
        count = parseFloat($(this).find('.media-num').html());

        a = a.add((price+phone_price).mul(count));
	});

	$('.order-hd .total').html(a);
	$('.order-detail-list li:last').css("border-bottom", 0);
}
priceTotal();
$('.order-detail-list').delegate(".add", "click", function(){
    var self = this;
    var itemid = $(this).closest('.media').data('itemid');
    order.add(itemid, function( data ){
        if( data.status ){
            var a = $(self).parent().parent();
            a.find('.menu-list-num').html(function() {
                return parseFloat($(this).html()) + 1;
            });

            priceTotal();
        }
    })
});
$('.order-detail-list').delegate(".reduce", "click", function(){
	var a = $(this).closest('.media');
    var itemid = $(this).closest('.media').data('itemid');
	if(a.find('.menu-list-num').html() == 1 || a.find('.menu-list-num').html() < 0) {
		if(confirm("确定要删除吗？")) {
			a.remove();
		} else {
			return false;
		}
	}
	a.find('.menu-list-num').html(function() {
		return parseFloat($(this).html()) - 1;
	});
	priceTotal();
    order.reduce(itemid);
});

var order = {
	'add' : function(goodsid , callback ) {
		var $this = this;
		$this.cart(goodsid, 'add' , callback);
	},
	'reduce' : function(goodsid , callback) {
		var $this = this;
		$this.cart(goodsid, 'reduce' , callback);
	},
	'cart' : function(goodsid, operation , callback) {
		if (!goodsid) {
			alert('请选择商品！');
			return;
		}
		operation = operation ? operation : 'add';
		$.getJSON('<?php  echo $this->createMobileUrl('updatecart');?>', {'op' : operation, 'goodsid' : goodsid}, function(s){
			if (s.message.status) {
				$('#goodsnum_'+goodsid).html(s.message.total);
			} else {
				alert(s.message.message);
			}
            callback && callback.call(this , s.message)
		});
	}
};

function checkform(form) {
	if (!form['realname'].value) {
		alert('请输入您的真实姓名！');
		return false;
	}
	if (!form['address'].value) {
		alert('请输入您的详细地址！');
		return false;
	}
	if (!form['mobile'].value) {
		alert('请输入您的手机号码！');
		return false;
	}
	if (!form['paytype'].value) {
		alert('请选择付款方式！');
		return false;
	}
	<?php  if($goodstype == 1) { ?>
	if (form['sendpay'] && !form['sendpay'].value) {
		alert('请选择配送方式！');
		return false;
	}
	<?php  } ?>
 /*       $.post( window.location.href ,$('#formOrder').serializeArray() , function(data){
            console.log( data )
            location.href = "http://localhost/weiyi/mobile.php?act=module&orderid=20&name=businesshall&do=pay&weid=46"
        })
    return false;*/
}
</script>
<?php  include $this->template('footer', TEMPLATE_INCLUDEPATH);?>