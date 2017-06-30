<?php
error_reporting(0);
define('IN_MOBILE', true);
if(empty($_REQUEST)){
    exit('无数据响应.');
}
$receive_data = $_REQUEST;
$pieces = explode('s', $receive_data['ORDERSEQ']);
if(!is_array($pieces) || count($pieces) != 2) {
    exit('订单号不正确.');
}
$_GET['weid'] = $pieces[0];
require '../../source/bootstrap.inc.php';
require IA_ROOT . '/source/function/bestpay.func.php';
logging($receive_data['ORDERSEQ'] . ' - get获得数据：' . var_export($receive_data, 1));
if(empty($_W['account']['payment'])) {
    logging('支付方式错误.');
    exit('支付方式错误.');
}
$bestpay = $_W['account']['payment']['bestpay'];
if(empty($bestpay)) {
    logging('支付方式错误.');
    exit('支付方式错误.');
}
$return_data = receive($receive_data,$bestpay);
logging('分析支付回调数据：' . var_export($return_data, 1));
if ($return_data['order_status']=='0') {
    logging('get-支付成功');
    $plid = $pieces[1];
    $sql = 'SELECT * FROM ' . tablename('paylog') . ' WHERE `plid`=:plid';
    $params = array();
    $params[':plid'] = $plid;
    $log = pdo_fetch($sql, $params);
    if(!empty($log)) {
        if($log['status'] == '0') {
            $record = array();
            $record['status'] = '1';
            pdo_update('paylog', $record, array('plid' => $log['plid']));
        }

        $site = WeUtility::createModuleSite($log['module']);
        if(!is_error($site)) {
            $site->module = $_W['account']['modules'][$log['module']];
            $site->weid = $_W['weid'];
            $site->inMobile = true;
            $method = 'payResult';
            if (method_exists($site, $method)) {
                $ret = array();
                $ret['result'] = 'success';
                $ret['type'] = $log['type'];
                $ret['from'] = 'return';
                $ret['tid'] = $log['tid'];
                $ret['user'] = $log['openid'];
                $ret['fee'] = $log['fee'];
                $ret['weid'] = $log['weid'];
                $ret['attach'] = $return_data['attach'];
                logging('分析支付成功处理数据：' . var_export($ret, 1));
                exit($site->$method($ret));
            }
        }
    }
} else {
    logging('get-支付失败');
    exit('支付失败.');
}