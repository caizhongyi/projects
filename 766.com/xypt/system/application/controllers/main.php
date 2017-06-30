<?php
/**
 * PHP-
 * Copyright (c) 2010 网游
 * All rights reserved.
 *
 * @package    
 * @author     陈乔华 <cqhmb@163.com>
 * @copyright  2010 766项目
 * @version    v1.0
 */
class Main extends Controller
{
	private $base_url;
	function __construct()
	{
		parent::__construct();
		$this->load->library('user');
		//当前项目连接
		$this->base_url = base_url();
		$this->load->model('main_model');
		$this->tpl->assign('base_url', $this->base_url);
	}
	/**
	 * 首页显示
	 *
	 */
	function index()
	{
		$this->game_point();
		$this->tpl->display('index.tpl');
	}
	//查看战绩
	function game_point(){
		$uid='';
		$this->user->islogin();
		if($this->user->get_uid()){
			$uid=$this->user->get_uid();
			$result_uid=$this->main_model->select_point($uid);
			if(!empty($result_uid)){
				$this->tpl->assign('zhanji','您当前最高战绩是：'.$result_uid[0]['point'].'分');
			}else {
				$this->tpl->assign('zhanji','抱歉，您当前还没有战绩！赶紧去体验吧(*^__^*)！');
			}
		}else {
			$this->tpl->assign('zhanji','抱歉，您当前还没登录(*^__^*)！');
		}
	}
	//拼图游戏积分入库
	function ptpoint(){
		//判断用户是否登录
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
				//判断用户是否在积分表里存在记录 有则更新  无则插入
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
	//拼图游戏日志记录
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
	//判断是否登陆
	function is_login(){
		$this->user->islogin();
		if($this->user->get_uid()){
			$uid=$this->user->get_uid();
			$username=$this->user->get_username();
			echo 'sf=1';   //已经登录
		}else{
			echo 'sf=0';  //还没登录
		}
	}
	//判断当天是否已经玩过
	function is_use(){
		$this->user->islogin();
		if($this->user->get_uid()){
			$uid=$this->user->get_uid();
			$pointslog=$this->main_model->logs_count($uid);
			if($pointslog<5){
				echo '_first=1';   //可以玩
			}else {
				echo '_first=0';  //不可以玩
			}
		}
	}
}
?>