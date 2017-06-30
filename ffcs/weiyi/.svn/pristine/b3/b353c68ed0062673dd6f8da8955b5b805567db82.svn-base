<?php
/**
 * 语音回复处理类
 * 
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

class EggModuleProcessor extends WeModuleProcessor {

	public function respond() {
		global $_W;
		$rid = $this->rule;
		$sql = "SELECT * FROM " . tablename('egg_reply') . " WHERE `rid`=:rid LIMIT 1";
		$row = pdo_fetch($sql, array(':rid' => $rid));
		if (empty($row['id'])) {
			return array();
		}
		if($row == false || (!empty($row['end_time']) && $row['end_time'] < time())){
			$message = '活动已经取消或结束了';
			return $this->respText($message);
		}
		if(!empty($row['start_time']) && $row['start_time'] > time()){
			$message = '活动暂时没有开始，请稍候!';
			return $this->respText($message);
		}
		
		$title = pdo_fetchcolumn("SELECT name FROM ".tablename('rule')." WHERE id = :rid LIMIT 1", array(':rid' => $rid));		
		return $this->respNews(array(
			'Title' => $title,
			'Description' => $row['description'],
			'PicUrl' => $_W['attachurl'] . $row['picture'],
			'Url' => $this->createMobileUrl('lottery', array('id' => $rid)),
		));
	}
}
