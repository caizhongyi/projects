<?php
/**
 * User ucͬ����¼��
 * @package user
 */
class User {
	var $Ani_uid;
	var $Ani_username;
	/**
	 * �ж��û��Ƿ��½
	 * 
	 * @return null
	 */
	function islogin(){
		/*include './uc_client/client.php';
		if(!empty($_COOKIE['CAS_auth'])) {
			list($this->Ani_uid, $this->Ani_username) = explode("\t", uc_authcode($_COOKIE['CAS_auth'], 'DECODE', "ae5D3zeo5I1z1Bfm5E7S0jeZ0t0rcR1t575Uc92qcxeacMcO3e099u027maKe98y"));
		} else {
			$this->Ani_uid = $this->Ani_username = 'huangchao';
		}*/
		$this->Ani_uid = $this->Ani_username = 'huangchao';
	}
	/**
	 * ���ص�ǰ�û�id
	 *
	 * @return int
	 */
	function get_uid(){
		return $this->Ani_uid;
	}
	/**
	 * ���ص�ǰ�û���
	 *
	 * @return string
	 */
	function get_username(){
		return iconv('utf-8', 'gbk', $this->Ani_username);
	}
	/**
	 * ���ص�ǰ���������
	 *
	 */
	function get_score()
	{
		if ($this->Ani_uid) {
			$handle = fopen("http://bbs.766.com/766/get/whatsnew.php?feature=5&guid={$this->Ani_uid}&gid=6", "r");
			$score = fread($handle,1024);
			return $score;
		}else{
			return 0;
		}
	}
	/**
	 * ���Ͷ���
	 * 
	 * @return null
	 */
	function uc_pm_send_uc($fromuid, $msgto, $subject, $message, $instantly = 1, $replypmid = 0, $isusername = 0){
		include_once('./uc_client/client.php');
		return uc_pm_send($fromuid, $msgto, $subject, $message, $instantly = 1, $replypmid = 0, $isusername = 0);
	}
}