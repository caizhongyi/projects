<?php
/**
 * 留言墙模块处理程序
 *
 * @author 超级无聊
 * @url 
 */
defined('IN_IA') or exit('Access Denied');

class MessageModuleProcessor extends WeModuleProcessor {
	
	public function respond() {
		global $_W;
		$rid = $this->rule;
		$sql = "SELECT * FROM " . tablename('message_reply') . " WHERE `rid`=:rid LIMIT 1";
		$row = pdo_fetch($sql, array(':rid' => $rid));

		$response['FromUserName'] = $this->message['to'];
		$response['ToUserName'] = $this->message['from'];
		$response['MsgType'] = 'news';
		$response['ArticleCount'] = 1;
		$response['Articles'] = array();
		$response['Articles'][] = array(
			'Title' => $row['title'],
			'Description' => $row['description'],
			'PicUrl' => empty($row['thumb'])?'':$_W['attachurl'].$row['thumb'],
            'Url' => $_W['siteroot'].$this->createMobileUrl('list', array( 'name' => 'message', 'id' => $rid, 'weid'=>$_W['weid'], 'from_user' => base64_encode(authcode($this->message['from'], 'ENCODE')))),
			'TagName' => 'item',
		);

		return $response;
	}
}