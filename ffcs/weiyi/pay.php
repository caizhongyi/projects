<?php
/**
 * 支付
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
//define('IN_MOBILE', true);
require 'source/bootstrap.inc.php';
require 'source/function/bestpay.func.php';
if($_POST){
    logging('远程支付用户 - post获得数据：' . var_export($_POST, 1));
    if(!empty($_POST['type'])&&!empty($_POST['weid'])&&!empty($_POST['from_user'])&&!empty($_POST['ordersn'])&&!empty($_POST['price'])&&!empty($_POST['module'])){
        $type = $_POST['type'];
        $weid = $_POST['weid'];
        $from_user = $_POST['from_user'];
        $ordersn = $_POST['ordersn'];
        $price = $_POST['price'];
        $module = $_POST['module'];
        $wechats_name = pdo_fetchcolumn("SELECT name FROM ".tablename('wechats')." WHERE weid='".$weid."'");
        if(!$wechats_name){
            echo '公众帐号不存在';
        }elseif(!array_key_exists($from_user, $_W['config']['pay_from_users'])){
            echo '支付来源不存在';
        }elseif(!array_key_exists($type, $_W['config']['payment'])){
            echo '支付类型不存在';
        }elseif($price <= 0){
            echo '支付错误, 金额小于0';
        }else{
            $order_info = pdo_fetch("SELECT * FROM ".tablename('shopping_order')." WHERE weid='".$weid."' AND ordersn='".$ordersn."'");
            if(!$order_info){
                $paytype = $_W['config']['payment'][$type]['type'];
                $order_info = $data = array(
                    'weid' => $weid,
                    'from_user' => $from_user,
                    'ordersn' => $ordersn,
                    'price' => $price,
                    'status' => 0,
                    'sendtype' => 0,
                    'paytype' => $paytype,
                    'goodstype' => 1,
                    'createtime' => TIMESTAMP,
                );
                pdo_insert('shopping_order', $data);
                $order_info['id'] = pdo_insertid();
            }
            if(!$order_info){
                echo '抱歉，生成订单失败！';
            }elseif($order_info['status'] != '0'){
                echo '抱歉，您的订单已经付款或是被关闭，请重新进入付款！';
            }elseif($order_info['price'] != $price){
                echo '抱歉，您的订单金额不正确！';
            }else{
                $params = array();
                $params['tid'] = $order_info['id'];
                $params['user'] = $order_info['from_user'];
                $params['fee'] = $order_info['price'];
                $params['title'] = $wechats_name . "商城订单{$order_info['ordersn']}";
                $params['type'] = $order_info['paytype'];
                $params['module'] = $module;
                $params['pay_from_user'] = $from_user;
                if($type=='bestpay'){
                    $html = '<div style="display: none;">';
                    $html .= '<form action="'.create_url('mobile/cash/bestpay', array('weid' => $weid)).'" method="post">';
                    $html .= '<input type="hidden" name="params" value="'.base64_encode(json_encode($params)).'" />';
                    $html .= '<button type="submit" id="btn_bestpay" name="bestpay"></button>';
                    $html .= '</form>';
                    $html .= '<script>document.getElementById("btn_bestpay").click();</script>';
                    $html .= '</div>';
                    echo $html;
                }
            }
        }
    }else{
        echo '数据不完整';
    }
}else{
    echo '没有数据';
}
