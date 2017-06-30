<?php
/**
 * 微信墙模块
 *
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

class WxwallModule extends WeModule {
	public $tablename = 'wxwall_reply';

	public function fieldsFormDisplay($rid = 0) {
		global $_W;
		if (!empty($rid)) {
			$reply = pdo_fetch("SELECT * FROM ".tablename($this->tablename)." WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $rid));
			$reply['syncwall'] = unserialize($reply['syncwall']);
		} else {
			$reply = array(
				'isshow' => 0,
				'timeout' => 0,
			);
		}
		if (empty($reply['start_time'])) {
			$reply['start_time'] = date('Y-m-d', time()); //默认当前时间
		} else {
			$reply['start_time'] = date('Y-m-d H:i:s', $reply['start_time']);
		}
		if (empty($reply['end_time'])) {
			$reply['end_time'] = date('Y-m-d', time() + 3600 * 24 * 7); //默认一周后
		} else {
			$reply['end_time'] = date('Y-m-d H:i:s', $reply['end_time']);
		}
		include $this->template('form');
	}

	public function fieldsFormValidate($rid = 0) {
		return true;
	}

	public function fieldsFormSubmit($rid = 0) {
		global $_GPC, $_W;
		$id = intval($_GPC['reply_id']);
		$insert = array(
			'rid' => $rid,
			'enter_tips' => $_GPC['enter-tips'],
			'quit_tips' => $_GPC['quit-tips'],
			'send_tips' => $_GPC['send-tips'],
			'timeout' => $_GPC['timeout'],
			'isshow' => intval($_GPC['isshow']),
			'quit_command' => $_GPC['quit-command'],
			'logo' => $_GPC['logo'],
			'background' => $_GPC['background'],
			'syncwall' => array(
				'tx' => array(
					'status' => intval($_GPC['walls']['tx']['status']),
					'subject' => $_GPC['walls']['tx']['subject'],
				),
			),
			'start_time' => strtotime($_GPC['start']),
			'end_time' => strtotime($_GPC['end'])
		);
		
		$insert['syncwall'] = serialize($insert['syncwall']);
		if (empty($id)) {
			pdo_insert($this->tablename, $insert);
		} else {
			pdo_update($this->tablename, $insert, array('id' => $id));
		}
	}

	public function ruleDeleted($rid = 0) {
		
	}
	
}
