<?php defined('IN_IA') or exit('Access Denied');?><?php  include $this->template('header', TEMPLATE_INCLUDEPATH);?>
<link type="text/css" rel="stylesheet" href="./source/modules/businesshall/images/common.css">
<style>
.mymember{margin-bottom:10px;}
.table{margin:10px 0;}
.table td, .table th{border:0;}
.table th{font-weight:normal; color:#999;}
.table td{text-align:right; color:#333;}
.table .ordersn{font-size:20px; text-align:center; color:red;}

</style>
<div class="navbar navbar-inverse navbar-fixed-top">
	<div class="navbar-inner" style="padding:0 5px;">
<!--		<a class="btn btn-small btn-inverse pull-right" href="<?php  echo create_url('mobile/channel', array('name' => 'home', 'weid' => $_W['weid']))?>"><i class="icon-user"></i> 个人中心</a>-->
		<a class="btn btn-small btn-inverse pull-left" href="<?php  echo $this->createMobileUrl('list');?>"><i class="icon-chevron-left"></i> 返回</a>
	</div>
</div>
<!--<form action="" method="post" style="overflow:hidden;" onsubmit="return check();">-->
<div class="order-detail">
	<div class="order-detail-list">
        <h3 class="text-center">确认下单</h3>

        <hr class="soften">

        <div class="address">
            收货人：<?php  echo $profile['realname'];?> <br>
            <span class="muted"><?php  echo $profile['address'];?></span> <br>
        </div>

        <hr class="soften">
        <ul class="goods-list clearfix">
            <?php  if(is_array($order_goods_infos)) { foreach($order_goods_infos as $order_goods_info) { ?>
            <?php  $mobile = $this->get_contract_mobile_detail($order_goods_info);?>
            <li>
                <img class="thumb" src="<?php  echo $_W['attachurl'];?><?php  echo $order_goods_info['thumb'];?>" alt=""/>
                <div class="goods-info">
                     <h4><?php  echo $order_goods_info['title'];?><small><?php  if(!empty($mobile['2'])) { ?>(<?php  echo $mobile['2'];?>)<?php  } ?></small></h4>
                     <div class="summary">
                         <span>单价:<?php  echo $order_goods_info['marketprice'];?></span><span>数量:<?php  echo $order_goods_info['total'];?></span><span>商品类型:<?php  if($order_goods_info['type'] == 1) { ?>实物<?php  } else if($order_goods_info['type'] == 2) { ?>虚拟物品<?php  } ?></span>
                         <span>套餐:<?php  echo $mobile['0']['contract_name'];?></span>
                         <span>号码:<?php  echo $mobile['1']['phonenum'];?><span style="color: red;">(号码价格￥<span class="phonenum_price"><?php  echo $mobile['1']['phonenum_price'];?></span>)</span></span>
                     </div>
                    <div class="text-right price">￥<?php  echo $order_goods_info['marketprice']*$order_goods_info['total']?></div>
                </div>
            </li>
            <?php  } } ?>
        </ul>
        <div class="form">
            <div class="form-group text-right">
                <?php  if($order['paytype'] == 1) { ?>
                    <span class="form-label">配送方式:</span><?php  if($order['sendtype'] == 1) { ?>快递<?php  } else if($order['sendtype'] == 2) { ?>自提<?php  } ?> <br>
                   <!-- <?php  if($order['sendtype'] == 1) { ?><span class="form-label">运费:</span><span class="text-danger">12</span><?php  } ?>-->
                <?php  } ?>
               <!-- <span class="form-label">付款方式:</span><?php  if($order['paytype'] == 1) { ?>余额付款<?php  } else if($order['paytype'] == 2) { ?>在线支付<?php  } ?> <br>-->
                <span class="form-label">付款金额:</span><span class="price">￥<?php  echo sprintf('%.2f', $order['price']);?></span><br>
      <!--          <span class="form-label">帐户余额:</span><span class="price">￥<?php  echo sprintf('%.2f', $_W['fans']['credit2']);?></span>-->
            </div>
        </div>

        <hr class="soften">

        <h4>选择支付方式</h4>
        <ul class="paytype">
            <?php  $counts = 0;?>
            <?php  if(is_array($payment_types)) { foreach($payment_types as $payment_name => $payment_type) { ?>
                <?php  if($payment_type['switch']) { ?>
                <li>
                    <?php  if($payment_name == "ondelivery") { ?>
                    <label>
                        <input type="radio" name = "paytype" <?php  if($counts == 0) { ?>checked<?php  } ?> value="<?php  echo $pay_conf[$payment_name]['type'];?>"/>
                        <!--<img class="thumb" src="" alt=""/>-->
                        <div class="paytype-info">
                            <div class="paytype-heading">货到付款</div>
                            <p>支持货到付款</p>
                        </div>
                    </label>
                    <div class="mobile-li" style="padding:5px;display: none;">
                        <form action="<?php  echo $this->createMobileUrl('myorder')?>" method="post" style="overflow:hidden;" >
                            <button class="btn btn-block btn-primary btn-success" type="submit" name="ondelivery">货到付款</button>
                        </form>
                    </div>
                    <?php  } ?>
                    <?php  if($payment_name == "alipay") { ?>
                    <label>
                        <input type="radio" name = "paytype" <?php  if($counts == 0) { ?>checked<?php  } ?>  value="<?php  echo $pay_conf[$payment_name]['type'];?>"/>
                        <!--<img class="thumb" src="" alt=""/>-->
                        <div class="paytype-info">
                            <div class="paytype-heading">支付宝支付</div>
                            <p>支持信用卡、储蓄卡快捷支付及支付宝</p>
                        </div>
                    </label>
                    <div class="mobile-li" style="padding:5px;display: none;">
                        <form action="<?php  echo create_url('mobile/cash/alipay', array('weid' => $_W['weid']));?>" method="post">
                            <input type="hidden" name="params" value="<?php  echo base64_encode(json_encode($params));?>" />
                            <button class="btn btn-block btn-primary btn-success" type="submit" name="alipay">支付宝支付</button>
                        </form>
                    </div>
                    <?php  } ?>
                    <?php  if($payment_name == "bestpay") { ?>
                    <label>
                        <input type="radio" name = "paytype" <?php  if($counts == 0) { ?>checked<?php  } ?>  value="<?php  echo $pay_conf[$payment_name]['type'];?>"/>
                        <!--<img class="thumb" src="" alt=""/>-->
                        <div class="paytype-info">
                            <div class="paytype-heading">翼支付支付</div>
                            <p>支持信用卡、储蓄卡快捷支付及支付宝</p>
                        </div>
                    </label>
                    <div class="mobile-li" style="padding:5px;display: none;">
                        <form action="<?php  echo create_url('mobile/cash/bestpay', array('weid' => $_W['weid']));?>" method="post">
                            <input type="hidden" name="params" value="<?php  echo base64_encode(json_encode($params));?>" />
                            <button class="btn btn-block btn-primary btn-success" type="submit" name="bestpay">翼支付付款</button>
                        </form>
                    </div>
                    <?php  } ?>
                    <?php  if($payment_name == "wechat") { ?>
                    <label>
                        <input type="radio" name = "paytype" <?php  if($counts == 0) { ?>checked<?php  } ?>  value="<?php  echo $pay_conf[$payment_name]['type'];?>"/>
                        <!--<img class="thumb" src="" alt=""/>-->
                        <div class="paytype-info">
                            <div class="paytype-heading">微信支付</div>
                            <p>支持信用卡、储蓄卡快捷支付</p>
                        </div>
                    </label>
                    <div class="mobile-li" style="padding:5px;display: none;">
                        <button class="btn btn-block btn-primary btn-success" id="wBtn" type="button" onclick="doWechatPay();" value="wechat">微信支付</button>
                    </div>
                    <script type="text/javascript">
                        function doWechatPay() {
                            if(!window.WeixinJSBridge) {
                                $('#wBtn').attr('disabled', 'disabled');
                                $('#wBtn').html('微信支付(必须使用微信内置浏览器)');
                                alert('微信支付必须在微信内置浏览器中使用.');
                                return;
                            }
                            WeixinJSBridge.invoke('getBrandWCPayRequest', {
                                'appId' : '<?php  echo $wOpt['appId'];?>',
                                'timeStamp': '<?php  echo $wOpt['timeStamp'];?>',
                                'nonceStr' : '<?php  echo $wOpt['nonceStr'];?>',
                                'package' : '<?php  echo $wOpt['package'];?>',
                                'signType' : '<?php  echo $wOpt['signType'];?>',
                                'paySign' : '<?php  echo $wOpt['paySign'];?>'
                            }, function(res) {
                                if(res.err_msg == 'get_brand_wcpay_request:ok') {
                                } else {
                                    alert('启动微信支付失败, 请检查你的支付参数. 详细错误为: ' + res.err_msg);
                                }
                            });
                        }
                    </script>
                    <?php  } ?>
                    <?php  if($payment_name == "credit") { ?>
                    <label>
                        <input type="radio" name = "paytype" <?php  if($counts == 0) { ?>checked<?php  } ?>  value="<?php  echo $pay_conf[$payment_name]['type'];?>"/>
                        <!--<img class="thumb" src="" alt=""/>-->
                        <div class="paytype-info">
                            <div class="paytype-heading">余额支付</div>
                            <p>通过余额支付</p>
                        </div>
                    </label>
                    <div class="mobile-li" style="padding:5px 5px 10px 5px;display: none;">
                        <form action="<?php  echo create_url('mobile/cash/credit2', array('weid' => $_W['weid']));?>" method="post">
                            <input type="hidden" name="params" value="<?php  echo base64_encode(json_encode($params));?>" />
                            <?php  if($params['fee'] < $_W['fans']['credit2']) { ?>
                            <button class="btn btn-block btn-primary btn-success" type="submit" value="credit">余额支付 （余额支付当前 <?php  echo sprintf('%.2f', $_W['fans']['credit2']);?>元)</button>
                            <?php  } else { ?>
                            <button class="btn btn-block btn-primary" type="button" onclick="location.href='<?php  echo create_url('mobile/module/charge', array('name' => 'member', 'weid' => $_W['weid']))?>'" value="credit">余额充值，（余额支付当前 <?php  echo sprintf('%.2f', $_W['fans']['credit2']);?>)</button>
                            <?php  } ?>
                        </form>
                    </div>
                    <?php  } ?>
                </li>
                <?php  $counts++;?>
                <?php  } ?>
            <?php  } } ?>
        </ul>
        <h4>选择配送方式</h4>
        <ul class="paytype">
            <li>
                <label>
                    <input type="radio" name = "sendtype" checked value="1"/>
                 <!--   <img class="thumb" src="" alt=""/>-->
                    <div class="paytype-info">
                        <div class="paytype-heading">快递</div>
                        <p>快递由商家自选</p>
                    </div>
                </label>
                <label>
                    <input type="radio" name = "sendtype" value="2"/>
                 <!--   <img class="thumb" src="" alt=""/>-->
                    <div class="paytype-info">
                        <div class="paytype-heading">自提</div>
                        <p>持本人有效身份证件到指定商户领取</p>
                    </div>
                </label>
            </li>
        </ul>
        <input type="hidden" name="orderid" value="<?php  echo $orderid;?>" />
        <input type="hidden" name="token" value="<?php  echo $_W['token'];?>" />
        <input type="submit" name="submit" id="submit" class="btn btn-success paybtn  btn-block" value="立即支付" />
	</div>

</div>

<!--</form>-->
<script type="text/javascript">
    $("#submit").click(function(){
        var paytype = $("input[name='paytype']:checked").val();
        var check_form = $("input[name='paytype']:checked").closest('li').find('form');
        if(!paytype){
            alert('请选择支付方式');  return false;
        }
        var sendtype = $("input[name='sendtype']:checked").val();
        if(!sendtype){
            alert('请选择配送方式');  return false;
        }
        $.post('<?php  echo $pay_url;?>', {orderid: "<?php  echo $orderid;?>", token:"<?php  echo $_W['token'];?>",submit:1,sendtype:sendtype,paytype:paytype}, function (rs) {
            if (rs.errno == 200) {
              
                check_form.submit();
            }else if(rs.errno == -1){
                alert(rs.error);
            }
        }, 'json');
    })

</script>
<?php  include $this->template('footer', TEMPLATE_INCLUDEPATH);?>