<?php
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

define('ALIPAY_GATEWAY', 'http://wappaygw.alipay.com/service/rest.htm');
define('BESTPAY_GATEWAY', 'https://wappaywg.bestpay.com.cn/payWap.do');

/**
 * $params['tid']
 * $params['title']
 * $params['fee']
 * $params['user']
 *
 * $alipay['account']
 * $alipay['partner']
 * $alipay['secret']
 *
 * $ret['url']
 */
function alipay_build($params, $alipay = array()) {
    global $_W;
    $tid = $_W['weid'] . ':' . $params['tid'];
    $set = array();
    $set['service'] = 'alipay.wap.trade.create.direct';
    $set['format'] = 'xml';
    $set['v'] = '2.0';
    $set['partner'] = $alipay['partner'];
    $set['req_id'] = $tid;
    $set['sec_id'] = 'MD5';
    $callback = $_W['siteroot'] . 'payment/alipay/return.php';
    $notify = $_W['siteroot'] . 'payment/alipay/notify.php';
    $merchant = $_W['siteroot'] . 'payment/alipay/merchant.php';
    $expire = 10;
    $set['req_data'] = "<direct_trade_create_req><subject>{$params['title']}</subject><out_trade_no>{$tid}</out_trade_no><total_fee>{$params['fee']}</total_fee><seller_account_name>{$alipay['account']}</seller_account_name><call_back_url>{$callback}</call_back_url><notify_url>{$notify}</notify_url><out_user>{$params['user']}</out_user><merchant_url>{$merchant}</merchant_url><pay_expire>{$expire}</pay_expire></direct_trade_create_req>";
    $prepares = array();
    foreach($set as $key => $value) {
        if($key != 'sign') {
            $prepares[] = "{$key}={$value}";
        }
    }
    sort($prepares);
    $string = implode($prepares, '&');
    $string .= $alipay['secret'];
    $set['sign'] = md5($string);
    $response = ihttp_get(ALIPAY_GATEWAY . '?' . http_build_query($set));
    $ret = array();
    @parse_str($response['content'], $ret);
    foreach($ret as &$v) {
        $v = str_replace('\"', '"', $v);
    }
    if(is_array($ret)) {
        if($ret['res_error']) {
            $error = simplexml_load_string($ret['res_error'], 'SimpleXMLElement', LIBXML_NOCDATA);
            if($error instanceof SimpleXMLElement && $error->detail) {
                message("发生错误, 无法继续支付. 详细错误为: " . strval($error->detail));
            }
        }

        if($ret['partner'] == $set['partner'] && $ret['req_id'] == $set['req_id'] && $ret['sec_id'] == $set['sec_id'] && $ret['service'] == $set['service'] && $ret['v'] == $set['v']) {
            $prepares = array();
            foreach($ret as $key => $value) {
                if($key != 'sign') {
                    $prepares[] = "{$key}={$value}";
                }
            }
            sort($prepares);
            $string = implode($prepares, '&');
            $string .= $alipay['secret'];
            if(md5($string) == $ret['sign']) {
                $obj = simplexml_load_string($ret['res_data'], 'SimpleXMLElement', LIBXML_NOCDATA);
                if($obj instanceof SimpleXMLElement && $obj->request_token) {
                    $token = strval($obj->request_token);
                    $set = array();
                    $set['service'] = 'alipay.wap.auth.authAndExecute';
                    $set['format'] = 'xml';
                    $set['v'] = '2.0';
                    $set['partner'] = $alipay['partner'];
                    $set['sec_id'] = 'MD5';
                    $set['req_data'] = "<auth_and_execute_req><request_token>{$token}</request_token></auth_and_execute_req>";
                    $prepares = array();
                    foreach($set as $key => $value) {
                        if($key != 'sign') {
                            $prepares[] = "{$key}={$value}";
                        }
                    }
                    sort($prepares);
                    $string = implode($prepares, '&');
                    $string .= $alipay['secret'];
                    $set['sign'] = md5($string);
                    $url = ALIPAY_GATEWAY . '?' . http_build_query($set);
                    return array('url' => $url);
                }
            }
        }
    }
    message('非法访问.');
}

/**
 * $params['tid']
 * $params['title']
 * $params['fee']
 * $params['user']
 *
 * $bestpay['merchantid']
 * $bestpay['bestpay_key']
 *
 * $ret['url']
 */
function bestpay_build($params, $bestpay = array()) {
    global $_W;
    $tid = $_W['weid'] . 's' . $params['tid'];
    $paylog_info = pdo_fetch("SELECT * FROM ".tablename('paylog')." WHERE plid = :plid", array(':plid' => $params['tid']));
    $order_id = $paylog_info['tid'];
    $order_info = pdo_fetch("SELECT * FROM ".tablename('shopping_order')." WHERE id = :id", array(':id' => $order_id));

    $prepare_data = array();
    $prepare_data['gateway_url'] = BESTPAY_GATEWAY;
    $prepare_data['MERCHANTID'] = $bestpay['merchantid']; //商户号
    $prepare_data['MERCHANTURL'] = $_W['siteroot'] . 'payment/bestpay/return.php'; //前台返回地址
    $prepare_data['BACKMERCHANTURL'] = $_W['siteroot'] . 'payment/bestpay/notify.php'; //后台返回地址

    $prepare_data['ENCODETYPE'] = '1'; //加密方式,md5
    $prepare_data['CURTYPE'] = 'RMB'; //币种
    $prepare_data['BUSICODE'] = '0001'; //业务类型

    //买家信息
    $prepare_data['PRODUCTID'] = '08'; //08 一般网购,业务标识
    $prepare_data['CUSTOMERID'] = $params['user']; //客户登录名,客户标识
    $user_info = fans_search($params['user']);
    $prepare_data['TMNUM'] = isset($user_info['mobile'])?$user_info['mobile']:''; //客户联系电话

    //订单信息
    $prepare_data['ORDERSEQ'] = $tid; //订单号
    $prepare_data['ORDERREQTRANSEQ'] = $tid . str_pad(mt_rand(1, 99999), 5, "0", STR_PAD_LEFT); //订单请求交易流水号
    $prepare_data['ORDERDATE'] = date('Ymd'); //订单日期

    // 商品信息
    $prepare_data['ORDERAMOUNT'] = number_format($params['fee'], 2, '.', ''); //订单总金额 单位：分,订单总金额 = 产品金额+附加金额
    $prepare_data['PRODUCTAMOUNT'] = number_format($params['fee'], 2, '.', ''); //产品金额
    $prepare_data['ATTACHAMOUNT'] = '0.00'; //附加金额
    $prepare_data['PRODUCTDESC'] = $params['title']; //产品描述

    $prepare_data['ATTACH'] = $params['pay_from_user']; //描述

    $data = 'MERCHANTID=' . $prepare_data['MERCHANTID'];
    $data .= '&ORDERSEQ=' . $prepare_data['ORDERSEQ'];
    $data .= '&ORDERDATE=' . $prepare_data['ORDERDATE'];
    $data .= "&ORDERAMOUNT=" . $prepare_data['ORDERAMOUNT'];
    $data .= '&KEY=' . $bestpay['bestpay_key'];

    // 数字签名
    $prepare_data['MAC'] = md5($data);

    return $prepare_data;
}

function wechat_build($params, $wechat) {
    global $_W;
    $wOpt['appId'] = $_W['account']['key'];
    $wOpt['timeStamp'] = TIMESTAMP;
    $wOpt['nonceStr'] = random(8);
    $package = array();
    $package['bank_type'] = 'WX';
    $package['body'] = $params['title'];
    $package['attach'] = $_W['weid'];
    $package['partner'] = $wechat['partner'];
    $package['out_trade_no'] = $params['tid'];
    $package['total_fee'] = $params['fee'] * 100;
    $package['fee_type'] = '1';
    $package['notify_url'] = $_W['siteroot'] . 'payment/wechat/notify.php';
    $package['spbill_create_ip'] = CLIENT_IP;
    $package['time_start'] = date('YmdHis', TIMESTAMP);
    $package['time_expire'] = date('YmdHis', TIMESTAMP + 600);
    $package['input_charset'] = 'UTF-8';
    ksort($package);
    $string1 = '';
    foreach($package as $key => $v) {
        $string1 .= "{$key}={$v}&";
    }
    $string1 .= "key={$wechat['key']}";
    $sign = strtoupper(md5($string));

    $string2 = '';
    foreach($package as $key => $v) {
        $v = urlencode($v);
        $string2 .= "{$key}={$v}&";
    }
    $string2 .= "sign={$sign}";

    $string = '';
    $keys = array('appId', 'timeStamp', 'nonceStr', 'package', 'appKey');
    sort($keys);
    foreach($keys as $key) {
        $v = $wOpt[$key];
        if($key == 'appKey') {
            $v = $wechat['signkey'];
        }
        $key = strtolower($key);
        $string .= "{$key}={$v}&";
    }
    $string = rtrim($string, '&');

    $wOpt['package'] = $string2;
    $wOpt['signType'] = 'SHA1';
    $wOpt['paySign'] = sha1($string);
    return $wOpt;
}
