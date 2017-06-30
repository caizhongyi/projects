<?php
/**
 * 
 * 
 * 
 */
defined('IN_IA') or exit('Access Denied');

class MicromemberModuleProcessor extends WeModuleProcessor {
	
	public $name = 'MicromemberModuleProcessor';

	public function isNeedInitContext() {
		return 0;
	}
	
	public function respond() {
		global $_W;
		$rid = $this->rule;
		$sql = "SELECT * FROM " . tablename('Micromember_reply') . " WHERE `rid`=:rid LIMIT 1";
		$row = pdo_fetch($sql, array(':rid' => $rid));
		$content = trim($this->message['content']);
        $response['FromUserName'] = $this->message['to'];
        $response['ToUserName'] = $this->message['from'];
        $response['MsgType'] = 'news';
        $response['ArticleCount'] = 1;
        $response['Articles'] = array();
        $response['Articles'][] = array(
            'Title' =>  $row['title'],
            'Description' => $row['description'],
            'PicUrl' => $_W['attachurl'] . $row['thumb'],
            'Url' => $_W['siteroot'] . create_url('index/module', array('do' => 'list', 'name' => 'micromember', 'id' => $rid,'weid'=>$_W['weid'],'from_user' => base64_encode(authcode($this->message['from'], 'ENCODE')))),
            'TagName' => 'item',
        );
		return $response;
	}

	public function isNeedSaveContext() {
		return false;
	}
}
