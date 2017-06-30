<?php
/**
 * PHP-
 * Copyright (c) 2010 ����
 * All rights reserved.
 *
 * @package    
 * @author     ���ǻ� <cqhmb@163.com>
 * @copyright  2010 766��Ŀ
 * @version    v1.0
 */
class Main extends Controller
{
	private $base_url;
	function __construct()
	{
		parent::__construct();
		$this->load->library('user');
		//��ǰ��Ŀ����
		$this->base_url = base_url();
		$this->load->model('main_model');
		$this->tpl->assign('base_url', $this->base_url);
	}
	/**
	 * ��ҳ��ʾ
	 *
	 */
	function index()
	{
		$this->game_point();
		$this->tpl->display('index.tpl');
	}
	//�鿴ս��
	function game_point(){
		$uid='';
		$this->user->islogin();
		if($this->user->get_uid()){
			$uid=$this->user->get_uid();
			$result_uid=$this->main_model->select_point($uid);
			if(!empty($result_uid)){
				$this->tpl->assign('zhanji','����ǰ���ս���ǣ�'.$result_uid[0]['point'].'��');
			}else {
				$this->tpl->assign('zhanji','��Ǹ������ǰ��û��ս�����Ͻ�ȥ�����(*^__^*)��');
			}
		}else {
			$this->tpl->assign('zhanji','��Ǹ������ǰ��û��¼(*^__^*)��');
		}
	}
	//ƴͼ��Ϸ�������
	function ptpoint(){
		//�ж��û��Ƿ��¼
		$uid='';
		$username='';
		$this->user->islogin();
		if($this->user->get_uid()){
			$uid=$this->user->get_uid();
			$username=$this->user->get_username();
		}
		$name = $this->input->post('username', true);
		if(empty($name)){
			exit();
		}
		$tel = $this->input->post('tel', true) ? $this->input->post('tel') : '';
		$qq = $this->input->post('qq', true) ? $this->input->post('qq') : '';
		$email = $this->input->post('email', true) ? $this->input->post('email') : '';
		$jf = $this->input->post('jf') ? intval($this->input->post('jf')) : 0;
		$jq = $this->input->post('jq') ? $this->input->post('jq') : 0;
		$strmd5 = base64_encode("fjasdgiyoirhtgohgo".$jf."eihdfsafeefhawdkf");
		$strmd5substr = substr($strmd5, 10, 5);
		
		if($jf>0){
			if ($jq == $strmd5substr){
				$data=array(
					'uid'=>$uid,
					'username'=>$username,
					'name'=>$name,
					'telphone'=>$tel,
					'qq'=>$qq,
					'email'=>$email,
					'point'=>$jf,
					'createtime'=>time()
				);
				
				$result_uid=$this->main_model->select_point($uid);
				//�ж��û��Ƿ��ڻ��ֱ�����ڼ�¼ �������  �������
				if(!empty($result_uid)){
					$point=$result_uid[0]['point'];
					if($jf > $point){
						$data=array('point'=>$jf,'name'=>$name,'telphone'=>$tel,'qq'=>$qq,'email'=>$email);
						$this->main_model->update_point($uid,$data);
					}
				}else {
					$this->main_model->insert_data($data);
				}
			}
		}
	}
	//ƴͼ��Ϸ��־��¼
	function logs($jf){
		$uid='';
		$username='';
		$this->user->islogin();
		if($this->user->get_uid()){
			$uid=$this->user->get_uid();
			$username=$this->user->get_username();
		}
		//$jf=$this->uri->segment(3);
		$data=array('uid'=>$uid,'username'=>$username,'point'=>$jf,'createtime'=>strtotime(date('Ymd')));		
		$this->main_model->insert_logs($data);
	}
	//�ж��Ƿ��½
	function is_login(){
		$this->user->islogin();
		if($this->user->get_uid()){
			$uid=$this->user->get_uid();
			$username=$this->user->get_username();
			echo 'sf=1';   //�Ѿ���¼
		}else{
			echo 'sf=0';  //��û��¼
		}
	}
	//�жϵ����Ƿ��Ѿ����
	function is_use(){
		$this->user->islogin();
		if($this->user->get_uid()){
			$uid=$this->user->get_uid();
			$pointslog=$this->main_model->logs_count($uid);
			if($pointslog<5){
				echo '_first=1';   //������
			}else {
				echo '_first=0';  //��������
			}
		}
	}
}
?>