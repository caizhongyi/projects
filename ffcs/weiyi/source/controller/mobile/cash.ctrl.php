<?php 
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

$params = @json_decode(base64_decode($_GPC['params']), true);
if(empty($params) || !array_key_exists($params['module'], $_W['account']['modules'])) {
	message('访问错误.');
}

$type = in_array($_GPC['do'], array('credit2', 'alipay', 'bestpay')) ? $_GPC['do'] : '';

if(!empty($type)) {
	$sql = 'SELECT * FROM ' . tablename('paylog') . ' WHERE `weid`=:weid AND `module`=:module AND `tid`=:tid';
	$pars  = array();
	$pars[':weid'] = $_W['weid'];
	$pars[':module'] = $params['module'];
	$pars[':tid'] = $params['tid'];
	$log = pdo_fetch($sql, $pars);
	if(!empty($log) && $log['status'] != '0') {
		message('这个订单已经支付成功, 不需要重复支付.');
	}
	if($log['fee'] != $params['fee']) {
		pdo_delete('paylog', array('plid' => $log['plid']));
		$log = null;
	}
	if(empty($log)) {
		$fee = $params['fee'];
		$record = array();
		$record['weid'] = $_W['weid'];
		$record['openid'] = $params['user'];
		$record['module'] = $params['module'];
		$record['type'] = $type;
		$record['tid'] = $params['tid'];
		$record['fee'] = $fee;
		$record['status'] = '0';
		if(pdo_insert('paylog', $record)) {
			$plid = pdo_insertid();
			$record['plid'] = $plid;
			$log = $record;
		} else {
			message('系统错误, 请稍后重试.');
		}
	} else {
		if($log['type'] != $type) {
			$record = array();
			$record['type'] = $type;
			pdo_update('paylog', $record, array('plid' => $log['plid']));
		}
	}
	$ps = array();
	$ps['tid'] = $log['plid'];
	$ps['user'] = $log['openid'];
	$ps['fee'] = $log['fee'];
	$ps['title'] = $params['title'];
	$ps['pay_from_user'] = isset($params['pay_from_user'])?$params['pay_from_user']:'';

	if($type == 'alipay') {
		require_once model('payment');
		$ret = alipay_build($ps, $_W['account']['payment']['alipay']);
		if($ret['url']) {
			header("location: {$ret['url']}");
			exit();
		}
	}
    if($type == 'bestpay') {
        require IA_ROOT . '/source/function/bestpay.func.php';
        require_once model('payment');
        $ret = bestpay_build($ps, $_W['account']['payment']['bestpay']);
        $code = get_code('',$ret);
        template('pay/bestpay');exit;
    }
	if($type == 'credit2') {
		$pars = array(':from_user' => $_W['fans']['from_user'], ':weid' => $_W['weid']);
		$row = pdo_fetch("SELECT * FROM " . tablename('card_members') . " WHERE from_user = :from_user AND weid = :weid", $pars);
		if(empty($row)) {
			exit('error');
		}
		if($row['credit2'] < $ps['fee']) {
			message("余额不足以支付, 需要 {$ps['fee']}, 当前 {$row['credit2']}");
		}
		$fee = floatval($ps['fee']);
		$sql = 'UPDATE ' . tablename('card_members') . " SET `credit2`=`credit2`-{$fee} WHERE from_user = :from_user AND weid = :weid";
		if(pdo_query($sql, $pars) == 1) {
			$sql = 'SELECT * FROM ' . tablename('paylog') . ' WHERE `plid`=:plid';
			$pars = array();
			$pars[':plid'] = $ps['tid'];
			$log = pdo_fetch($sql, $pars);
			if(!empty($log) && $log['status'] == '0') {
				$record = array();
				$record['status'] = '1';
				pdo_update('paylog', $record, array('plid' => $log['plid']));

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
						exit($site->$method($ret));
					}
				}
			}
		}
	}
}
