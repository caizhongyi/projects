<?php
/**
 * 小黄鸡处理类
 *
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

class SimsimiModuleProcessor extends WeModuleProcessor {
	public $name = 'SimsimiRobotModuleProcessor';
	public $cookie_jar;

	public function respond() {
		global $_W;
		$result = $this->getSimsimiReply($this->message['content']);
		if ($result['result'] == '200' || $result['result'] == '404') {
			return $this->respText($result['msg']);
		} else {
			//XXX 此处预留默认回复话语
			$response['Content'] = '';
			return array();
		}
		
	}

	private function getSimsimiReply($sendtext='') {
		$url = 'http://api.we7.cc/v1/simsimi.php?msg='.urlencode($sendtext);
		$response = ihttp_request($url);
		if (!empty($response['content'])) {
			return json_decode($response['content'], true);
		} else {
			return array();
		}
	}

}