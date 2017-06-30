<?php
/**
 * 
 * 
 * 
 */
defined('IN_IA') or exit('Access Denied');

class VoteModuleProcessor extends WeModuleProcessor {
	
	public $name = 'VoteModuleProcessor';

	public function isNeedInitContext() {
		return 0;
	}
	
    public function respond() {
        global $_W;
        $rid = $this->rule;
        $reply = pdo_fetch("SELECT * FROM " . tablename('vote_reply') . " WHERE `rid`=:rid LIMIT 1", array(':rid' => $rid));
        if($reply==false || $reply['end_time']<time()){
            //$message='活动已经取消了';
            //return $this->respText($message);
        }
        if($reply['start_time']>time()|| $reply['end_time']<time()){
            //$message='活动暂时没有开始，请稍候!';
            //return $this->respText($message);
        }
        $result = pdo_fetchall("SELECT * FROM ".tablename('vote_option')." WHERE rid = :rid ORDER by `id` ASC", array(':rid' => $rid));
        if($result==false){
            //$message='活动暂时没有开始，请稍候';
            //return $this->respText($message);
        }
        if($_W['weid'] == MOBILE_INTERNET_ID){
            //获取粉丝投票信息
            $fans_info = pdo_fetch("SELECT * FROM " . tablename('fans') . "where weid=" . MOBILE_INTERNET_ID." and from_user ='".$this->message['from']."'" );
            if(empty($fans_info['mobile'])){
                $response['FromUserName'] = $this->message['to'];
                $response['ToUserName'] = $this->message['from'];
                $response['MsgType'] = 'news';
                $response['ArticleCount'] = 1;
                $response['Articles'] = array();
                $response['Articles'][] = array(
                    'Title' => $reply['title'],
                    'Description' =>  '亲，为了确保投票的有效性，请输入您的手机号',
                    'PicUrl' =>empty($reply['thumb'])?'':$_W['attachurl'] . $reply['thumb'],
                    'Url' => $_W['siteroot'].$this->createMobileUrl('_mobile_blind', array( 'name' => 'vote', 'id' => $rid,'from_user' => base64_encode(authcode($this->message['from'], 'ENCODE')))),
                    'TagName' => 'item',
                );
                return $response;
            }else{
                $dianxin_info = pdo_fetch("SELECT * FROM " . tablename('dianxin_phone') . " WHERE `phone`=:phone LIMIT 1", array(':phone' => $fans_info['mobile']));
                if(empty($dianxin_info)&&$rid==314){
                    return $this->respText("对不起，只有福建电信员工才可进行投票（手机号以OA通信录中登记的手机号为准）");
                }
            }
        }

        $response['FromUserName'] = $this->message['to'];
        $response['ToUserName'] = $this->message['from'];
        $response['MsgType'] = 'news';
        $response['ArticleCount'] = 1;
        $response['Articles'] = array();
        $response['Articles'][] = array(
            'Title' => $reply['title'],
            'Description' => $reply['description'],
            'PicUrl' =>empty($reply['thumb'])?'':$_W['attachurl'] . $reply['thumb'],
            'Url' => $_W['siteroot'].$this->createMobileUrl('list', array( 'name' => 'vote', 'id' => $rid,'from_user' => base64_encode(authcode($this->message['from'], 'ENCODE')))),
            'TagName' => 'item',
        );
        return $response;

    }

	public function isNeedSaveContext() {
		return false;
	}
}
