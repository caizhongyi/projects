var url = SITEURL+'index.php?m=pay&c=mycart&a=order_list'; //订单列表页

$(function(){
	/*
	//导航栏购物车
	$('.shop-tool').mouseenter(function() {
		$.ajax({
			url: SITEURL+'index.php?m=pay&c=topcart&a=update&math='+Math.random(),
			dataType: 'JSON',
			success: function(json) {
				if (json['output']) {
					$('.shopcard-panel').show();
					$('.shopcard-panel').html(json['output']);
				}
			}
		});
	});
	
	$('.shop-tool').mouseleave(function() {
		$('.shopcard-panel').hide();
	});
	*/
	
	//修改数量
	$('.table').on('keyup','.text_quantity',function(){	
		var attr_key = $(this).attr('attr_key');
		var text_quantity = $(this).val();
		if(!check_number(text_quantity)){
			text_quantity = $(this).attr('attr_value');
			$.errorTip('错误','请输入正确的数量!');
		}
		$('.text_quantity_'+attr_key).val(text_quantity);
		$('.text_quantity_'+attr_key).attr('attr_value',text_quantity);
		updateProduct(attr_key,text_quantity);
	});

	$('.table').on('click','.left_quantity',function(){	
		var attr_key = $(this).next('.text_quantity').attr('attr_key');
		var text_quantity = parseInt($(this).next('.text_quantity').val());
		if(check_number(text_quantity)&&(text_quantity>1)){
			text_quantity--;
			$('.text_quantity_'+attr_key).val(text_quantity);
			$('.text_quantity_'+attr_key).attr('attr_value',text_quantity);
			updateProduct(attr_key,text_quantity);
		}
	});

	$('.table').on('click','.right_quantity',function(){
		var attr_key = $(this).prev('.text_quantity').attr('attr_key');
		var text_quantity = parseInt($(this).prev('.text_quantity').val());
		if(check_number(text_quantity)){
			text_quantity++;
			$('.text_quantity_'+attr_key).val(text_quantity);
			$('.text_quantity_'+attr_key).attr('attr_value',text_quantity);
			updateProduct(attr_key,text_quantity);
		}
	});

	$('.mycart_td_btn').on('click','.btn_use_coupon',function(){
		$('#use_coupon_tip').remove();
		var attr_key = $(this).attr('attr_key');
		var html="";
		html+='<div id="use_coupon_tip" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
		html+='<div class="modal-dialog">';
		html+='<div class="modal-content">';
		html+='<div class="modal-header">';
		html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onClick="$(\'#use_coupon_tip\').modal(\'hide\');">&times;</button>';
		html+='<h4 class="modal-title">使用优惠券</h4>';
		html+='</div>';
		html+='<div class="modal-body">';
        html+='<form action="" role="form" class="form-horizontal">';
        html+='<div class="form-group" >';
        html+='<label for="" class="col-sm-3 control-label">优惠券号码:</label><div class="col-sm-4"><input type="text" class="form-control" placeholder="请您输入卡号" id="coupon_code"/></div>';
        html+='</div>';
        html+='<div class="form-group">';
        html+='<div class="col-sm-offset-3 col-sm-10"><input style="margin-right:10px;" type="button" class="btn btn-primary" aria-hidden="true" value="确定" attr_key="'+attr_key+'" id="btn_use_coupon"/><input type="button" class="btn btn-primary" aria-hidden="true" value="取消" onclick="$(\'#use_coupon_tip\').modal(\'hide\');"/></div>';
        html+='</div>';
        html+='</form>';
    	html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		$('body').append(html);
		$('#use_coupon_tip').modal('show');
	});
    

	$('body').on('click','#btn_use_coupon',function(){
		var attr_key = $(this).attr('attr_key');
		$.ajax({
			url: SITEURL+'index.php?m=pay&c=mycart&a=ajax_use_coupon&math='+Math.random(),
			type: 'post',
			data: 'code=' + $('#coupon_code').val()+'&key='+attr_key,
			dataType: 'json',
			success: function(json) {			
				if (json['error']==1) {
					alert(json['msg']);
				}else{
					$('#mycart_tr_'+attr_key).find('.mycart_td_discount').html(json['product']['discount']);
					$('#mycart_tr_'+attr_key).find('.cart_total_'+attr_key).html(json['product']['total']);
					$('#mycart_tr_'+attr_key).find('.mycart_td_btn').html('<a href="javascript:void(0);" class="btn btn-primary btn_cancel_coupon" attr_key="'+attr_key+'">取消优惠券</a>');
					$('.cart_total_data').html(json['total']);
					$('#use_coupon_tip').modal('hide');
				}		
			}
		});
	});
	
	$('.mycart_td_btn').on('click','.btn_cancel_coupon',function(){
		var attr_key = $(this).attr('attr_key');
		$.ajax({
			url: SITEURL+'index.php?m=pay&c=mycart&a=ajax_cancel_coupon&math='+Math.random(),
			type: 'post',
			dataType: 'json',
			data: 'key='+attr_key,
			success: function(json) {
				$('#mycart_tr_'+attr_key).find('.mycart_td_discount').html(json['product']['discount']);
				$('#mycart_tr_'+attr_key).find('.cart_total_'+attr_key).html(json['product']['total']);
				$('#mycart_tr_'+attr_key).find('.mycart_td_btn').html('<a href="javascript:void(0);" class="btn btn-primary btn_use_coupon" attr_key="'+attr_key+'">使用优惠券</a>');
				$('.cart_total_data').html(json['total']);
			}
		});
	});
		
	//确认订购
	$('#pay-button').click(function(){
		//清除表单
		$('#div_repay').remove();
		$.ajax({
		   type: "POST",
		   url : SITEURL+"index.php?m=pay&c=mycart&a=ajax_re_pay_recharge",
		   dataType:'json',
		   async: false,
		   data:'pay_type='+$('input[name=pay_type]:checked').val(),
		   success: function(data){
			   if(data['status']==0){
					$.errorTip('错误',data['msg']);
				}else if(data['status']==1){
					location.href = url;
				}else{
					$('body').append('<div id="div_repay" style="display:none;">'+data['code']+'</div>');
					$('#repay-button').click();
					var html="";
					html+='<div id="commit_pay_tip" data-backdrop="static" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
					html+='<div class="modal-dialog">';
					html+='<div class="modal-content">';
					html+='<div class="modal-header">';
					html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onClick="$(\'#commit_pay_tip\').modal(\'hide\');">&times;</button>';
					html+='<h4 class="modal-title">支付提示</h4>';
					html+='</div>';
					html+='<div class="modal-body">';
					html+='<p class="contain" style="font-size: 16px;font-weight: bold;margin: 25px 0;text-align: center;">请尽快完成支付，支付完成前请勿关闭该窗口。</p>';
					html+='</div>';
					html+='<div class="modal-footer" style="text-align:center;">';
					html+='<a href="javascript:void(0);" class="btn btn-danger" onclick="location.href=\''+url+'\';">已完成支付</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
					html+='<a href="javascript:void(0);" class="btn btn-default" onclick="commit_pay_fail(\''+data['order_id']+'\');">支付遇到问题重新支付</a>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
					$('body').append(html);
					$('#commit_pay_tip').modal('show');
				}
		   }
		});
	});
	
});

function commit_pay_fail(order_id){
	//清除表单
	$('#div_repay').remove();
	$.ajax({
	   type: "POST",
	   url : SITEURL+"index.php?m=pay&c=mycart&a=ajax_re_pay_recharge",
	   dataType:'json',
	   async: false,
	   data:'order_id='+order_id+'&pay_type='+$('input[name=pay_type]:checked').val(),
	   success: function(data){
			if(data['status']==0){
				$.errorTip('错误',data['msg']);
			}else if(data['status']==1){
				location.href = url;
			}else{
				$('body').append('<div id="div_repay" style="display:none;">'+data['code']+'</div>');
				$('#repay-button').click();
			}
	   }
	});
}

//限制整数
function check_number(val) {
	var pattern=/^[1-9]\d*$/;
    return pattern.test(val);
}

//更新购物车
function updateProduct(key,quantity){
	$.ajax({
		url: SITEURL+'index.php?m=pay&c=topcart&a=update&math='+Math.random(),
		type: 'post',
		data: 'key=' + key+'&quantity='+quantity,
		dataType: 'json',
		success: function(json) {			
			if (json['output']) {
				//更新购物车单价
				$('.cart_total_'+key).html(json['products'][key]['total']);
				//更新购物车总价
				$('.cart_total_data').html(json['total_data']);
			}			
		}
	});
}

//移除商品
function removeCart(key) {
	var html="";
	html+='<div id="removeCart" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
	html+='<div class="modal-dialog">';
	html+='<div class="modal-content">';
	html+='<div class="modal-header">';
	html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onClick="$(\'#removeCart\').modal(\'hide\');">&times;</button>';
	html+='<h4 class="modal-title">删除</h4>';
	html+='</div>';
	html+='<div class="modal-body">';
	html+='<p>您确定要删除？</p>';
	html+='</div>';
	html+='<div class="modal-footer">';
	html+='<a href="javascript:void(0);" class="btn btn-default" onclick="confirm_remove(\''+key+'\');$(\'#removeCart\').modal(\'hide\');">确定</a>';
	html+='<a href="javascript:void(0);" class="btn btn-default btn-danger" onclick="$(\'#removeCart\').modal(\'hide\');">取消</a>';
	html+='</div>';
	html+='</div>';
	html+='</div>';
	html+='</div>';
	$('body').append(html);
	$('#removeCart').modal('show');
}
//确定移除
function confirm_remove(key){
	$('#mycart_tr_'+key).remove();
	$.ajax({
		url: SITEURL+'index.php?m=pay&c=topcart&a=update&math='+Math.random(),
		type: 'post',
		data: 'remove=' + key,
		dataType: 'json',
		success: function(json) {			
			if (json['output']) {
				$('.shopcard-panel').html(json['output']);
				$('.shopcard-panel').show();
				//更新购物车总价
				$('.cart_total_data').html(json['total_data']);
				//如果购物车为空
				if(!json['countProducts']){
					$('#cart_has_products').hide();
					$('#cart_no_products').show();
				}
			}			
		}
	});
}

//加入购物车
function addToCart(product_id, quantity) {
	quantity = typeof(quantity) != 'undefined' ? quantity : 1;

	$.ajax({
		url: SITEURL+'index.php?m=pay&c=topcart&a=add&math='+Math.random(),
		type: 'post',
		data: 'product_id=' + product_id + '&quantity=' + quantity,
		dataType: 'json',
		success: function(json) {			
			if (json['success']) {
				var cart_url = SITEURL+'index.php?m=pay&c=mycart&a=init';
				var html="";
				html+='<div id="addCart" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
				html+='<div class="modal-dialog">';
				html+='<div class="modal-content">';
				html+='<div class="modal-header">';
				html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onClick="$(\'#addCart\').modal(\'hide\');">&times;</button>';
				html+='<h4 class="modal-title">套餐加入购物车成功</h4>';
				html+='</div>';
				html+='<div class="modal-body">';
				html+='<p>套餐加入购物车成功</p>';
				html+='</div>';
				html+='<div class="modal-footer">';
				html+='<a class="btn btn-default" data-dismiss="modal" onclick="$(\'#addCart\').modal(\'hide\');">关闭</a>';				
				html+='<a href="'+cart_url+'" class="btn btn-primary gotocart" onclick="$(\'#addCart\').modal(\'hide\');">去购物车</a>';
				html+='</div>';
				html+='</div>';
				html+='</div>';
				html+='</div>';
				$('body').append(html);
				
				$('#addCart').modal('show');
				
			}	
		}
	});
}