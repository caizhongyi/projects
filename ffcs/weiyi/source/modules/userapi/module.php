<?php
/**
 * 调用第三方数据接口模块
 *
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

class UserapiModule extends WeModule {
	public $tablename = 'userapi_reply';
	
	private $predefines = array(
		'weather.php' => array(
			'title' => '城市天气',
			'description' => '"城市名+天气", 如: "北京天气"',
			'keywords' => array(
				array('3', '^.+天气$')
			)
		),
		'baike.php' => array(
			'title' => '百度百科',
			'description' => '"百科+查询内容" 或 "定义+查询内容", 如: "百科姚明", "定义自行车"',
			'keywords' => array(
				array('3', '^百科.+$'),
				array('3', '^定义.+$'),
			)
		),
		'translate.php' => array(
			'title' => '即时翻译',
			'description' => '"@查询内容(中文或英文)"',
			'keywords' => array(
				array('3', '^@.+$'),
			)
		),
		'calendar.php' => array(
			'title' => '今日老黄历',
			'description' => '"日历", "万年历", "黄历"或"几号"',
			'keywords' => array(
				array('1', '日历'),
				array('1', '万年历'),
				array('1', '黄历'),
				array('1', '几号'),
			)
		),
		'news.php' => array(
			'title' => '看新闻',
			'description' => '"新闻"',
			'keywords' => array(
				array('1', '新闻'),
			)
		),
		'express.php' => array(
			'title' => '快递查询',
			'description' => '"快递+单号", 如: "申通1200041125"',
			'keywords' => array(
				array('3', '^(申通|圆通|中通|汇通|韵达|顺丰|EMS) *[a-z0-9]{1,}$')
			)
		),
	);

	public $phone = "8659522947945";
	public $key = "49114734";
	public $url = "http://open.fjii.com:8088/httpIntf/dealIntf";
	
	public function fieldsFormDisplay($rid = 0) {
		global $_W;
		if (!empty($rid)) {
			$row = pdo_fetch("SELECT * FROM ".tablename($this->tablename)." WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $rid));
			if (!strexists($row['apiurl'], 'http://') && !strexists($row['apiurl'], 'https://')) {
				$row['apilocal'] =  $row['apiurl'];
				$row['apiurl'] = '';
			}

		} else {
			$row = array(
				'cachetime' => 0,
			);
		}

		$path = IA_ROOT . '/source/modules/userapi/api';
		if (is_dir($path)) {
			$apis = array();
			if ($handle = opendir($path)) {
				while (false !== ($file = readdir($handle))) {
					if ($file != "." && $file != "..") {
						$apis[] = $file;
					}
				}
			}
		}
		$admin = $_W['isfounder'];
		include $this->template('form');
	}

	public function fieldsFormValidate($rid = 0) {
		global $_GPC;
		if (($_GPC['type'] && empty($_GPC['apiurl'])) || (empty($_GPC['type']) && empty($_GPC['apilocal']))) {
			message('请填写接口地址！', create_url('rule/post', array('module' => $_GPC['module'])), 'error');
		}
		if ($_GPC['type'] && empty($_GPC['token'])) {
			message('请填写Token值！', create_url('rule/post', array('module' => $_GPC['module'])), 'error');
		}
		return true;
	}

	public function fieldsFormSubmit($rid = 0) {
		global $_GPC, $_W;
		$id = intval($_GPC['reply_id']);
		$insert = array(
			'rid' => $rid,
			'apiurl' => empty($_GPC['type']) ? $_GPC['apilocal'] : $_GPC['apiurl'],
			'token' => $_GPC['wetoken'],
			'default_text' => $_GPC['default-text'],
			'cachetime' => intval($_GPC['cachetime']),
			'req_type' => $_GPC['req_type'],
			'resp_type' => $_GPC['resp_type'],
		);
		if (!empty($insert['apiurl'])) {
			if (empty($id)) {
				pdo_insert($this->tablename, $insert);
			} else {
				pdo_update($this->tablename, $insert, array('id' => $id));
			}
		}
		return true;
	}

	public function ruleDeleted($rid = 0) {
		pdo_delete($this->tablename, array('rid' => $rid));
	}

	public function settingsFormDisplay($settings = array()) {
		include $this->template('userapi/setting');
	}
	
	
	/**
	 * 以POST方式提交数据到指定地址并返回相应值
	 * @param unknown_type $url
	 * @param unknown_type $params
	 */
	public function post($url , $params = '' , $header = array()){
		$ch = curl_init();// 初始化CURL句柄
		curl_setopt($ch, CURLOPT_URL, $url);//设置请求的URL
		//curl_setopt($ch, CURLOPT_PORT, 80); //设置端口
		curl_setopt($ch, CURLOPT_POST, 1);//启用POST提交
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);//忽略ssl验证
		curl_setopt($ch, CURLOPT_POSTFIELDS, $params);//设置POST提交的字符串
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);// 设为TRUE把curl_exec()结果转化为字串，而不是直接输出
		curl_setopt($ch, CURLOPT_PROXY, '192.168.13.19:7777');//设置代理服务器
		curl_setopt($ch,CURLOPT_HTTPHEADER,$header);//设置HTTP头信息
		$response = curl_exec($ch);//执行预定义的CURL
		curl_close($ch);//关闭CURL
		return $response;
	}
	/**
	 * 获取请求参数包
	 * @param $method 方法名
	 * 				 $body   请求body
	 * */
	public function get_request($method, $body){
		/* $this->spid = "516847";
		$this->appid = "430";
		$this->password = sha1("ffcsemper");
		$this->url = "http://open.fjii.com:8088/httpIntf/dealIntf";
		$this->phone = "8659522947945";
		$this->key = "49114734";
		$this->tel = "15806036527"; */
		$spid = "516847";
		$appid = "430";
		$password = sha1("ffcsemper");
		$timestamp = date('YmdHis', time());
		$authenticator = sha1($timestamp . $method . $spid . $password);
		$request_data = "<Request><Head>";
		$request_data .= "<MethodName>".$method."</MethodName>";
		$request_data .= "<Spid>".$spid."</Spid>";
		$request_data .= "<Appid>".$appid."</Appid>";
		$request_data .= "<Passwd>".$password."</Passwd>";
		$request_data .= "<Timestamp>".date('YmdHis', time())."</Timestamp>";
		$request_data .= "<Authenticator>".$authenticator."</Authenticator>";
		$request_data .= "</Head><Body>";
		$request_data .= $body;
		$request_data .= "</Body></Request>";	
		
		return $request_data;
	}
	/**
	 * 请求接口得到应答结果
	 * */
	public function execute($request_data){
		$params = "postData=".$request_data;
		$data = $this->post($this->url, $params);
		return $data;
	}
	
	/**
	 * 接口响应
	 * status : 1成功 0失败
	 * msg : 响应消息
	 * /
	public function response($status, $msg){
		echo json_encode(array(
					'status' => $status,
					'msg' => $msg
				));
		exit();
	}
	
	/**
	 * 判断是否正处于某个通话过程中
	 * */
	public function is_actioning(){
		/* $process = $this->get_session('process');
		//不为空说明在某种通话过程中
		if($process == 'start'){
			$this->response(-1, '请结束当前通话后再发起新的通话。');
		} */
	}
	
	/**
	 * 点击拨号能力 - 点击拨号接口
	 * */
	public function dodial(){ 
		global $_GPC;
		$this->is_actioning();
		$callingphone = $this->get_session('calling');
		$callingphone = $callingphone ? $callingphone : '';//$_GPC['calling']; 主叫号码
		if(empty($callingphone)){
			$this->response(0, '请先设置主叫号码。');
		}
		$this->set_session('action', 'Dial');
		$this->set_session('process', 'start');
		$calledphone = $_GPC['called'] ? $_GPC['called'] : ''; //呼叫自定义号码
		if(empty($calledphone)){
			$calledid = $_GPC['id'] ? intval($_GPC['id']) : 0;  //被叫号码
			$sql = "select phone from ims_address_book where id = ".$calledid;
			$result = pdo_fetchall($sql);
			if(empty($result)){
				$this->response(0, '该被叫号码不存在。');
			}
			$calledphone = $result[0]['phone'];
		} 
		if($callingphone == $calledphone){
			$this->response(0, '主叫和被叫号码一样，请更换其中之一的号码后重试。');
		}
		$request_body = "<DisplayNbr>".$this->phone."</DisplayNbr>";
		$request_body .= "<Key>".$this->key."</Key>";
		$request_body .= "<ChargeNbr>".$this->phone."</ChargeNbr>";
		$request_body .= "<CallerNbr>".$callingphone."</CallerNbr>";
		$request_body .= "<CalleeNbr>".$calledphone."</CalleeNbr>";
		$request_body .= "<Record>0</Record>";
		$request_data = $this->get_request('Dial', $request_body); 
		$data = $this->execute($request_data);
		$xml = simplexml_load_string($data);
		
		if($xml->Head->Result == 0){
			$this->set_session('dial_sessionid', $xml->Head->Sessionid);
			$sessionid = $this->get_session('dial_sessionid');
			$this->response(1, '正在拨号中……');
		}elseif($xml->Head->Result == '-1'){
			$this->response(0, '主叫号码或被叫号码无效，请更换号码重试。');
		}else{
			$this->response(0, '拨号失败，请稍后重试……');
		}
	}
	
	/**
	 * 点击拨号能力 - 中断呼叫
	 * */
	public function dial_stop(){
		$Sessionid = $this->get_session('dial_sessionid');
		if(empty($Sessionid)){
			$this->response(0, '请先拨号。');
		}
		$request_body = "<Sessionid>".$Sessionid."</Sessionid>";
		$request_data = $this->get_request('DialStop', $request_body);
		$data = $this->execute($request_data);
		$xml = simplexml_load_string($data);
		if($xml->Head->Result == 0){
			$this->response(1, '挂断成功，通话结束。');
		}else{
			$this->response(0, '挂断失败，请稍后重试……');
		}
	}
	
	/**
	 * 多方通话 - 通话
	 * */
	public function dotalks(){
		global $_GPC;
		$this->is_actioning();
		
		$callingphone = $this->get_session('calling');
		if(empty($callingphone)){
			$this->response(0, '请先设置主叫号码。');
		}
		$calls = $_GPC['calleds'] ? trim($_GPC['calleds'], ',') : '';
		if(empty($calls)){
			$this->set_session('action', 'Talks');
			$this->set_session('process', 'start');
			$callids = $_GPC['callids'] ? trim($_GPC['callids'], ',') : '';
			if(empty($callids)){
				$this->response(0, '请选择被叫号码。');
			}
			$sql = "select phone from ims_address_book where id in (".$callids.")";
			$result = pdo_fetchall($sql);
			if(empty($result)){
				$this->response(0, '该被叫号码不存在。');
			}
			foreach ($result as $rs){
				$callarr[] = $rs['phone'];
			}
			$calls = implode(',', $callarr);
		}
		
		$calls = $callingphone . ',' . $calls;
		$arr = explode(',', $calls);
		$cls = array_unique($arr); //号码去重复
		if(sizeof($cls) == 1){
			$this->response(0, '请输入和主叫号码不同的被叫号码。');
		}
		$calls = implode(',', $cls);
		
		$request_body = "<DisplayNbr>".$this->phone."</DisplayNbr><Key>".$this->key."</Key>";
		$request_body .= "<ChargeNbr>".$this->phone."</ChargeNbr><CalledNbr>".$calls."</CalledNbr>";
		$request_data = $this->get_request('Talks', $request_body);
		$data = $this->execute($request_data);
		$xml = simplexml_load_string($data);
		if($xml->Head->Result == 0){
			$this->set_session('talks_sessionid', $xml->Head->Sessionid);
			$this->response(1, '多方通话成功，正在呼叫中……');
		}else{
			$this->response(0, '多方通话拨号失败，请稍后重试……');
		}
	}
	/**
	 * 多方通话 - 中断
	 * */
	public function talks_stop(){
		$Sessionid = $this->get_session('talks_sessionid');
		if(empty($Sessionid)){
			$this->response(0, '请先拨号。');
		}
		$request_body = "<Sessionid>".$Sessionid."</Sessionid>";
		$request_data = $this->get_request('TalksStop', $request_body);
		$data = $this->execute($request_data);
		$xml = simplexml_load_string($data);
		if($xml->Head->Result == 0){
			$this->response(1, '挂断成功，通话结束。');
		}else{
			$this->response(0, '挂断失败，请稍后重试……');
		}
	}
	
	/**
	 * 语音通知
	 * */
	public function dovoice_notice(){
		global $_GPC;
		$this->is_actioning();
		$this->set_session('action', 'VoiceNotic');
		$this->set_session('process', 'start');
		$calling = $_GPC['calling'] ? $_GPC['calling'] : '';
		if($calling == 'self'){
			$calledphone = $this->get_session('calling');
			if(empty($calledphone)){
				$this->response(0, '请先设置主叫号码。');
			}
		}else{
			$calledid = $_GPC['id'] ? intval($_GPC['id']) : 0;  //被叫号码
			$sql = "select phone from ims_address_book where id = ".$calledid;
			$result = pdo_fetchall($sql);
			if(empty($result)){
				$this->response(0, '该被叫号码不存在。');
			}
			$calledphone = $result[0]['phone'];
		}
		
		$msg = $_GPC['msg'] ? urldecode($_GPC['msg']) : '您现在正在体验语音通知接口';
		$request_body = "<DisplayNbr>".$this->phone."</DisplayNbr><Key>".$this->key."</Key>";
		$request_body .= "<ChargeNbr>".$this->phone."</ChargeNbr><CalleeNbr>".$calledphone."</CalleeNbr>";
		$request_body .= "<VoiceName></VoiceName><TTSContent>".$msg."</TTSContent>";//love of my life
		$request_body .= "<vReplay>1</vReplay><ReplayTTS>1</ReplayTTS>";
		$request_data = $this->get_request('VoiceNotice', $request_body);
		$data = $this->execute($request_data);
		$xml = simplexml_load_string($data);
		if($xml->Head->Result == 0){
			$this->set_session('voice_sessionid', $xml->Head->Sessionid);
			$this->response(1, '正在发起语音通知……');
		}else{
			$this->response(0, '发起语音通知失败，请稍后重试……');
		}
	}
	
	/**
	 * 获取通话状态 - 向上推送地址设置
	 * */
	public function docall_status_url(){
		$request_body = "<Url>http://42.121.125.119/vieasy/index.php?act=module&name=userapi&do=receive</Url>";
		$request_data = $this->get_request('CallStatusUrl', $request_body);
		$data = $this->execute($request_data);
		var_dump($data);
	}
	/**
	 * 设置主叫号码
	 * */
	public function doset_calling(){
		global $_GPC;
		$calling = $_GPC['calling'] ? trim($_GPC['calling']) : '';
		if(empty($calling)){
			$this->response(0, '主叫号码不能为空。');
		}
		$call = $this->get_session('calling');
		if(!empty($call) && ($call == $calling) ){
			$this->response(1, '您已设置过的主叫号码未改变。');
		}
		$this->set_session('calling', $calling);
		$this->response(1, '主叫号码设置成功！');
	}
	
	public function dotest(){
		$data = $this->addressbook();
		$result = $data['result'];
		$pagetool = $data['pagetool'];
		$calling = $data['calling'];
		include $this->template('userapi/call');
	}
	
	/**
	 * 点击拨号页面
	 * */
	public function dodialout(){
		$calling = $this->get_session('calling');
		include $this->template('userapi/dial');
	}
	
	/**
	 * 多方通话页面
	 * */
	public function dotalkout(){
		$calling = $this->get_session('calling');
		include $this->template('userapi/talks');
	}
	
	/**
	 * 语音通知页面
	 * */
	public function dovoiceout(){
		$calling = $this->get_session('calling');
		include $this->template('userapi/voice');
	}
	
	/**
	 * 通讯录页面
	 * */
	public function doaddress(){
		$data = $this->addressbook();
		$result = $data['result'];
		$pagetool = $data['pagetool'];
		$calling = $data['calling'];
		include $this->template('userapi/address');
	}
	
	public function response($status, $msg){
		echo json_encode(array(
					'status' => $status,
					'msg' => $msg	
				));
		exit();
	}
	
	/**
	 * 获取通讯录
	 * */
	public function addressbook(){
		global $_GPC;
		$page = $_GPC['page'] ? intval($_GPC['page']) : 1;
		$pagesize = 50;
		$sql = "select * from ims_address_book order by id desc limit ".(($page-1)*$pagesize).",".$pagesize;
		$data['result'] = $result = pdo_fetchall($sql);
		$_sql = "select count(*) as count from ims_address_book";
		$totalcount = pdo_fetchall($_sql);
		$data['pagetool'] = $pagetool = pagination($totalcount[0]['count'], $page, $pagesize);
		
		$data['calling'] = $calling = $this->get_session('calling');
		return $data;
	}
	
	public function set_session($param, $value){
		setcookie($param, $value);
		
	}
	public function get_session($param){
		return $_COOKIE[$param];
	}
	
	/**
	 * 接收呼叫返回状态
	 * vCallState: IMS状态
						NEW:发起呼叫
						RINGING:振铃
						ANSWERING:SDP协商中（振铃后可能会有多次SDP协商） 
						ANSWERED:接听
						DISCONNECTED:挂机
						FAILED:呼叫失败（可能是挂机、无应答或拒绝）
	 * */
	public function doreceive(){
		$info['vType'] = $_REQUEST['vType'];
		$info['vServiceType'] = $_REQUEST['vServiceType'];
		$info['vSessionsId'] = $_REQUEST['vSessionsId'];
		$info['vCallerNbr'] = $_REQUEST['vCallerNbr'];
		$info['vCalleeNbr'] = $_REQUEST['vCalleeNbr'];
		$info['vCallState'] = $_REQUEST['vCallState'];
		$info['vIsincomingcall'] = $_REQUEST['vIsincomingcall'];
		$info['vStateTime'] = $_REQUEST['vStateTime'];
		pdo_insert('api_record', $info);
	}
	/**
	 * 获取提示：获取用户通话状态的提示
	 * */
	public function doget_record(){
		/**
		 * $action ---
		 * 		Dial : 点击拨号
		 * 		Talks : 多方通话
		 * 		VoiceNotice : 语音通知
		 * */
		$process = $this->get_session('process');
		if($process == 'end'){
			$this->response(-2, '');
		}
		
		$action = $this->get_session('action');
		if(empty($action)){
			$this->response(-2, '');
		}
		
		$where = "vServiceType = '".$action."' and vCallerNbr = '".$this->phone."'";
		if($action == 'Dial'){
			$sessionid = $this->get_session('dial_sessionid');
		}elseif($action == 'Talks'){
			$sessionid = $this->get_session('talks_sessionid');
		}elseif($action == 'VoiceNotic'){
			$sessionid = $this->get_session('voice_sessionid');
		}
		
		if(empty($sessionid)){
			$this->response(-2, '');
		}
		$sql = "select * from ims_api_record where " . $where . " and vSessionsId = ".$sessionid." order by id desc limit 1";
		$result = pdo_fetchall($sql);
		if(!empty($result)){
			$this->get_status($result[0]['vCallState'], $result[0]['vCalleeNbr']);
		}else{
			$this->response(-2, '');
		}
		
	}
	
	/**
	 * 获取应答状态提示
	 * */
	public function get_status($status, $called){
		$calling = $this->get_session('calling');
		if($called == '0'.$calling || $called == '86'.$calling){
			$data = array(
						'RINGING'=>'主叫振铃中……',
						'ANSWERED' => '主叫已接听。',
						'DISCONNECTED' => '主叫已挂机',
						'FAILED' => '呼叫失败（可能是挂机、无应答或拒绝）。'
					);
		}else{
			$data = array(
					'RINGING'=>'被叫'.$called.'振铃中……',
					'ANSWERED' => '被叫'.$called.'已接听。',
					'DISCONNECTED' => '被叫'.$called.'已挂机',
					'FAILED' => '呼叫'.$called.'失败（可能是挂机、无应答或拒绝）。'
			);
		}
		if($status == 'RINGING'){
			$this->response(1, $data['RINGING']);
		}elseif($status == 'ANSWERED'){
			$this->response(1, $data['ANSWERED']);
		}elseif($status == 'DISCONNECTED'){
			$this->set_session('process', 'end');
			$this->response(1, $data['DISCONNECTED']);
		}elseif($status == 'FAILED'){
			$this->set_session('process', 'end');
			$this->response(1, $data['FAILED']);
		}
	}
	
	public function dosendmsg(){
		$url = "http://42.121.125.119/vieasy/index.php?act=module&name=userapi&do=receive";
		$url .= "&vType=1&vServiceType=ims&vSessionsId=283845&vCallerNbr=12949499&vCalleeNbr=199940505&vCallState=answered&vIsincomingcall=1&vStateTime=20131204101010";
		$bool = $this->get($url);
		var_dump($bool);
	}
	
	public function get($url,$second=20,$header = array()) {
		$ch = curl_init();
		curl_setopt($ch,CURLOPT_TIMEOUT,$second);
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch,CURLOPT_HTTPHEADER,$header);//设置HTTP头信息
	//	curl_setopt($ch, CURLOPT_PROXY, '192.168.13.19:7777');//设置代理服务器
		$data = curl_exec($ch);
		curl_close($ch);
		if ($data){
			return $data;
		}else{
			return false;
		}
	}
	
	/**
	 * 通讯录列表
	 * */
	public function doaddress_book(){
		$sql = "select * from ims_address_book order by id desc";
		$result = pdo_fetchall($sql);
		
		include $this->template('userapi/addressbook');
	}
	/**
	 * 添加通讯录
	 * */
	public function doaddress_add(){
		$username = $_POST['username'] ? addslashes($_POST['username']) : '';
		$userphone = $_POST['userphone'] ? addslashes($_POST['userphone']) : '';
		if(empty($username) || empty($userphone)){
			echo '用户名称或电话号码不能为空';exit();
		}
		$data = array(
					'name' => urldecode($username),
					'phone' => $userphone,
					'create_time' => time()
				);
		$bool = pdo_insert('address_book', $data);
		$id = pdo_insertid();
		if($bool) echo $id;
		else echo 0;
		exit();
	}
	/**
	 * 删除单个通讯录记录
	 * */
	public function doaddress_delete_by_id(){
		$id = $_POST['id'] ? addslashes($_POST['id']) : 0;
		if($id == 0){
			echo '参数错误';exit();
		}
		$where = array(
					'id' => $id
				);
		$bool = pdo_delete('address_book', $where);
		if($bool) echo 1;
		else echo 0;
		exit();
	}
	/**
	 * 删除多个选中通讯录记录
	 * */
	public function doaddress_delete_selected(){
		$ids = $_POST['ids'] ? trim($_POST['ids'], ',') : '';
		if(empty($ids)){
			echo 0;exit();
		}
		
		$sql = 'delete from ims_address_book where id in (' . $ids . ')';
		$bool = pdo_query($sql);
		if($bool) echo 1;
		else echo 0;
		exit();
	}
	/**
	 * 修改单个通讯录记录
	 * */
	public function doaddress_update_by_id(){
		$id = $_POST['id'] ? addslashes($_POST['id']) : 0;
		if($id == 0){
			echo 0;exit();
		}
		$where = array(
				'id' => $id
		);
		$username = $_POST['username'] ? addslashes($_POST['username']) : '';
		$userphone = $_POST['userphone'] ? addslashes($_POST['userphone']) : '';
		if(empty($username) || empty($userphone)){
			echo 0;exit();
		}
		$data = array(
				'name' => urldecode($username),
				'phone' => $userphone
		);
		$bool = pdo_update('address_book', $data, $where);
		if($bool) echo 1;
		else echo 0;
		exit();
	}
/*---------------------------------------------------- 能力展示接口-end --------------------------------------------------------*/

/*---------------------------------------------------- 分享有礼活动-star --------------------------------------------------------*/
//
//注：加前缀es ,区别别的活动接口
//
/*---------------------------------------------------- 分享有礼活动-star --------------------------------------------------------*/

    /**
     * 短信分享接口调用
     *
     * 问题 限制发送频率 上限10次/s 5条/次
     * */
    public function do_es_share(){
        global $_GPC;
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $user_info = pdo_fetch("SELECT * FROM ".tablename('fans')." WHERE from_user = '".$from_user."' and weid=".$_GET['weid']." limit 1" );

        if($_GPC['action']=='share'){
            $mobile = $user_info['mobile'];
//            $share_mobile = $_GPC['share_mobile'];
            $post_url = "http://42.121.125.119:8080/tyfx/service/shareMessage";

            $receiver = $_GPC['share_mobile'] ? addslashes($_GPC['share_mobile']) : '';
            if(empty($receiver)){
                echo json_encode(array('errno'=>-1,'error'=>'分享号码不为空'));
                die();
            }
            if(!fj_phone($receiver)){
                echo json_encode(array('errno'=>-2,'error'=>'您分享的手机号码不属于福建省，分享失败！'));
                die();
            }
            $msg = "分享有礼活动！装易信送红包！ ";
            $request = "<tyft_share_request><msIsdn>".$mobile."</msIsdn>";
            $request .= "<destTermIds>".$receiver."</destTermIds>";
            $request .= "<msgcontent>".$msg."</msgcontent>";
            $request .= "<webSrc>1065946832</webSrc>";
            $request .= "</tyft_share_request>";
            $res = $this->es_execute($post_url, $request);
            if($res['code'] == 200){
                $logs = pdo_fetch("SELECT * FROM ".tablename('share_logs')." WHERE from_user = '".$from_user."' and weid=".$_GET['weid']." and receive_phone = '".$receiver."' and send_phone = '".$mobile."' limit 1" );
                if(!$logs){
                    pdo_insert('share_logs',array('from_user'=>$from_user,'weid'=>$_GET['weid'],'receive_phone'=>$receiver,'send_phone'=>$mobile,'send_time'=>TIMESTAMP));

                }
            }
            echo json_encode(array('errno'=>$res['code'],'error'=>$res['msg']));
            die();
        }else{
            $show_url = create_url('index/module', array('do' => '_es_share','action'=>'share','name' => 'userapi', 'weid'=>MOBILE_INTERNET_ID, 'from_user' => $_GPC['from_user']));
            include $this->template('share');
        }
    }

    public function es_execute($url, $request){
    $response = $this->post($url, $request);
    $res_string = simplexml_load_string($response);
    $res = explode(',',$res_string);
    $code = trim($res['0']);
    $msg = trim($res['1']);
    $num = 0;
    while($code == '108'&& $num<3){
        sleep(1);
        $num++;
        $response = $this->post($url, $request);
        $res_string = simplexml_load_string($response);
        $res = explode(',',$res_string);
        $code = trim($res['0']);
        $msg = trim($res['1']);
    }
    if($code ==0){
        $code =200;
        $msg ='分享成功！';
        //分享成功入库
    }
    return array('code'=>$code,'msg'=>$msg);
}

    /**
     * 接口返回信息
     * */
    public function es_response($status, $msg){
        if($status == 0){ //0为成功码 其余为异常
            $code = sha1(md5($msg.'weiyi123456'));
            setcookie('checkcode', $msg);
        }elseif($status == 108){ //每秒10条的发送限制!
            //稍后重试
        }
    }


/*---------------------------------------------------- 分享有礼活动-end --------------------------------------------------------*/


/*---------------------------------------------------- 针对移动互联网公众帐号手机绑定-start --------------------------------------------------------*/
    public function do_mobile_blind($status, $msg){
            global $_GPC;
            $from_user = $_GPC['from_user'];
            $user_info = pdo_fetch("SELECT * FROM ".tablename('fans')." WHERE from_user = '".$from_user."' and weid=".$_GET['weid']." limit 1" );
            $mobile = $user_info['mobile'];
            $loclurl = $this->createMobileUrl('_mobile_blind', array('name' => 'userapi', 'do' => '_mobile_blind','weid'=>4, 'from_user' => $from_user));
            if($_GPC['action']=='edit'){
                $user_info_data = array(
                    'nickname' => $_GPC['nickname'],
                    'realname' => $_GPC['realname'],
                    'mobile' => $_GPC['mobile'],
                    'qq' => $_GPC['qq'],
                    'gender' => $_GPC['gender'],
                    'age' => $_GPC['age'],
                    'from_user'=>$from_user,
                    'weid'=>$_GET['weid'],
                    'avatar'=>' '
                );
                if ($user_info==false) {
                    $user_info_data['createtime']=time();
                    if(pdo_insert('fans', $user_info_data)){
                        echo json_encode(array('errno'=>200,'url'=>$loclurl));
                    }else{
                        echo json_encode(array('errno'=>-1,'error'=>'添加错误'));
                    }
                } else {
                    if(pdo_update('fans', $user_info_data, array('from_user' => $from_user,'weid'=>$_GET['weid']))!==false){
                        echo json_encode(array('errno'=>200,'url'=>$loclurl));
                    }else{
                        echo json_encode(array('errno'=>-2));
                    }
                }
                die();//ajax请求入口直接关闭
            }
        if(empty($mobile)){
            include $this->template('blind_mobile');
        }else{
            include $this->template('member_info');
        }
    }
/*---------------------------------------------------- 针对移动互联网公众帐号手机绑定-end --------------------------------------------------------*/

    
    /*
     * 返回测试
     * */
    public function doreq(){
    	global $_W, $_GPC;
    	$postdata = $GLOBALS["HTTP_RAW_POST_DATA"];
    	$data['Content'] = $_GPC['Content'];
    	$data['FromUserName'] = $_GPC['fromUsername'];
    	$data['ToUserName'] = $_GPC['toUsername'];
    	$xml = "<xml><ToUserName>ef628b53555a3edbc3061cd18d77b7a0</ToUserName><FromUserName>d0107dd03915942dc3061cd18d77b7a0</FromUserName><CreateTime>".time()."</CreateTime><MsgType>news</MsgType><Content>monday</Content><ArticleCount>1</ArticleCount><Articles><item><Title>title name</Title><Description>this is a news</Description><PicUrl>https://nos.163.com/yixinpublic/pr_xfpiivwz69pv-a8iqcezmq==_1389341896_708696</PicUrl><Url>http://baidu.com</Url></item></Articles></xml>";
    	
    	echo $xml;
    	die();
    }
   	
	public function doSwitch() {
		global $_W, $_GPC;
		$m = array_merge($_W['modules']['userapi'], $_W['account']['modules'][$_W['modules']['userapi']['mid']]);
		$cfg = $m['config'];
		if($_W['ispost']) {
			$rids = explode(',', $_GPC['rids']);
			if(is_array($rids)) {
				$cfg = array();
				foreach($rids as $rid) {
					$cfg[intval($rid)] = true;
				}
				$this->_saveing_params['weid'] = $_W['weid'];
				$this->_saveing_params['mid'] = $_W['modules']['userapi']['mid'];
				$this->saveSettings($cfg);
			}
			exit();
		}
		require model('rule');
		$rs = rule_search("weid = 0 AND module = 'userapi' AND `status`=1");
		$ds = array();
		foreach($rs as $row) {
			$reply = pdo_fetch('SELECT * FROM ' . tablename($this->tablename) . ' WHERE `rid`=:rid', array(':rid' => $row['id']));
			$r = array();
			$r['title'] = $row['name'];
			$r['rid'] = $row['id'];
			$r['description'] = $reply['description'];
			$r['switch'] = $cfg[$r['rid']] ? ' checked="checked"' : '';
			$ds[] = $r;
		}
		include $this->template('switch');
	}

	public function doSwitchManage() {
		global $_W, $_GPC;
		$foo = !empty($_GPC['foo']) ? $_GPC['foo'] : 'display';

		if($foo == 'display') {
            $params = array();
			require model('rule');
			$pindex = max(1, intval($_GPC['page']));
			$psize = 20;
			$types = array('', '等价', '包含', '正则表达式匹配');
			$condition = '';

			if (isset($_GPC['status'])) {
				$condition .= " AND status = {$_GPC['status']}";
			}
			$ds = rule_search("weid = 0 {$condition} AND module = 'userapi'" . (!empty($_GPC['keyword']) ? " AND `name` LIKE '%{$_GPC['keyword']}%'" : ''), $params, $pindex, $psize, $total);
			$pager = pagination($total, $pindex, $psize);

			if (!empty($ds)) {
				foreach($ds as &$_item) {
					$reply = pdo_fetch('SELECT * FROM ' . tablename($this->tablename) . ' WHERE `rid`=:rid', array(':rid' => $_item['id']));
					$_item['description'] = $reply['description'];
				}
			}
			
			$import = false;
			$apis = implode('\',\'', array_keys($this->predefines));
			$apis = "'{$apis}'";
			$sql = 'SELECT DISTINCT `apiurl` FROM ' . tablename($this->tablename) . " WHERE `apiurl` IN ({$apis})";
			$apiurls = pdo_fetchall($sql);
			if(count($apiurls) != count($this->predefines)) {
				$import = true;
			}
			include $this->template('display');
		}
		if($foo == 'import') {
			$apis = implode('\',\'', array_keys($this->predefines));
			$apis = "'{$apis}'";
			$sql = 'SELECT DISTINCT `apiurl` FROM ' . tablename($this->tablename) . " WHERE `apiurl` IN ({$apis})";
			$apiurls = pdo_fetchall($sql);
			$as = array();
			foreach($apiurls as $url) {
				$as[] = $url['apiurl'];
			}
			require model('rule');
			foreach($this->predefines as $key => $v) {
				if(!in_array($key, $as)) {
					$rule = array(
						'weid' => 0,
						'cid' => 0,
						'name' => $v['title'],
						'module' => 'userapi',
						'displayorder' => 255,
						'status' => 1,
					);
					pdo_insert('rule', $rule);
					$rid = pdo_insertid();
					if(!empty($rid)) {
						foreach($v['keywords'] as $row) {
							$data = array(
								'content' => $row[1],
								'type' => $row[0],
								'rid' => $rid,
								'weid' => 0,
								'module' => 'userapi',
								'status' => $rule['status'],
								'displayorder' => $rule['displayorder'],
							);
							rule_insert_keyword($data);
						}
						$reply = array(
							'rid' => $rid,
							'description' => $v['description'],
							'apiurl' => $key,
							'token' => '',
							'default_text' => '',
							'cachetime' => 0
						);
						pdo_insert($this->tablename, $reply);
					}
				}
			}
			message('成功导入.', referer());
		}
		if($foo == 'delete') {
			$rid = intval($_GPC['rid']);
			$sql = 'DELETE FROM ' . tablename('rule') . " WHERE `weid`=0 AND `module`='userapi' AND `id`={$rid}";
			pdo_query($sql);
			$sql = 'DELETE FROM ' . tablename('rule_keyword') . " WHERE `weid`=0 AND `module`='userapi' AND `rid`={$rid}";
			pdo_query($sql);
			$sql = 'DELETE FROM ' . tablename($this->tablename) . " WHERE `rid`={$rid}";
			pdo_query($sql);
			message('成功删除.', referer());
		}
		if($foo == 'post') {
			$rid = intval($_GPC['id']);
			require model('rule');
			if(checksubmit()) {
				if (empty($_GPC['name'])) {
					message('抱歉，规则名称为必填项，请选回修改！');
				}
				if (($_GPC['type'] && empty($_GPC['apiurl'])) || (empty($_GPC['type']) && empty($_GPC['apilocal']))) {
					message('请填写接口地址！');
				}
				if ($_GPC['type'] && empty($_GPC['token'])) {
					message('请填写Token值！');
				}
				$rule = array(
					'weid' => 0,
					'cid' => 0,
					'name' => $_GPC['service'],
					'module' => 'userapi',
					'displayorder' => 255,
					'status' => intval($_GPC['status']),
				);
				if($rid) {
					pdo_update('rule', $rule, array('id' => $rid));
				} else {
					pdo_insert('rule', $rule);
					$rid = pdo_insertid();
				}
				if(empty($rid)) {
					message('增加服务失败, 请稍后重试. ');
				}
				if (!empty($_GPC['keyword-name'])) {
					foreach ($_GPC['keyword-name'] as $id => $row) {
						if (empty($row) && strlen($row) == 0 && intval($_GPC['keyword-type'][$id]) != 4) {
							continue;
						}
						$data = array(
							'content' => $row,
							'type' => intval($_GPC['keyword-type'][$id]),
							'rid' => $rid,
							'id' => $id,
							'weid' => 0,
							'module' => 'userapi',
							'status' => $rule['status'],
							'displayorder' => $rule['displayorder'],
						);
						rule_insert_keyword($data);
					}
				}
				if (!empty($_GPC['keyword-name-new'])) {
					foreach ($_GPC['keyword-name-new'] as $id => $row) {
						if (empty($row) && strlen($row) == 0 && intval($_GPC['keyword-type-new'][$id]) != 4) {
							continue;
						}
						$data = array(
							'content' => $row,
							'type' => intval($_GPC['keyword-type-new'][$id]),
							'rid' => $rid,
							'weid' => 0,
							'module' => 'userapi',
							'status' => $rule['status'],
							'displayorder' => $rule['displayorder'],
						);
						rule_insert_keyword($data);
					}
				}

				$reply = array(
					'rid' => $rid,
					'description' => $_GPC['description'],
					'apiurl' => empty($_GPC['type']) ? $_GPC['apilocal'] : $_GPC['apiurl'],
					'token' => $_GPC['wetoken'],
					'default_text' => $_GPC['default-text'],
					'cachetime' => intval($_GPC['cachetime']),
				);
				if($_GPC['id']) {
					if(pdo_update($this->tablename, $reply, array('rid' => $rid)) !== false) {
						message('编辑服务成功. ', 'refresh');
					} else {
						message('编辑服务失败, 请稍后重试. ');
					}
				} else {
					if(pdo_insert($this->tablename, $reply)) {
						message('增加服务成功. ', 'refresh');
					} else {
						message('增加服务失败, 请稍后重试. ');
					}
				}
			}
			$rid = intval($_GPC['id']);
			if (!empty($rid)) {
				$rule = rule_single($rid);
				$row = pdo_fetch("SELECT * FROM ".tablename($this->tablename)." WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $rid));
				if (!strexists($row['apiurl'], 'http://') && !strexists($row['apiurl'], 'https://')) {
					$row['apilocal'] =  $row['apiurl'];
					$row['apiurl'] = '';
				}
			} else {
				$row = array(
					'cachetime' => 0,
				);
			}
			$types = array(
				1 => array(
					'name' => '完全相等',
					'description' => '用户进行交谈时，对话内容完全等于上述关键字才会执行这条规则。',
				),
				2 => array(
					'name' => '包含关键字',
					'description' => '用户进行交谈时，对话中包含上述关键字就执行这条规则。',
				),
				3 => array(
					'name' => '正则表达式匹配',
					'description' => "用户进行交谈时，对话内容符合述关键字中定义的模式才会执行这条规则。<br/><strong>注意：如果你不明白正则表达式的工作方式，请不要使用正则匹配</strong> <br/><strong>注意：正则匹配使用MySQL的匹配引擎，请使用MySQL的正则语法</strong> <br /><br /><strong>示例: </strong><br/><b>^微翼</b>匹配以“微翼”开头的语句<br /><b>微翼$</b>匹配以“微翼”结尾的语句<br /><b>^微翼$</b>匹配等同“微翼”的语句<br /><b>微翼</b>匹配包含“微翼”的语句<br /><b>[0-9\.\-]</b>匹配所有的数字，句号和减号<br /><b>^[a-zA-Z_]$</b>所有的字母和下划线<br /><b>^[[:alpha:]]{3}$</b>所有的3个字母的单词<br /><b>^a{4}$</b>aaaa<br /><b>^a{2,4}$</b>aa，aaa或aaaa<br /><b>^a{2,}$</b>匹配多于两个a的字符串",
				),
				4 => array(
					'name' => '直接接管',
					'description' => "如果没有比这条回复优先级更高的回复被触发，那么直接使用这条回复。<br/><strong>注意：如果你不明白这个机制的工作方式，请不要使用直接接管</strong>",
				)
			);

			$path = IA_ROOT . '/source/modules/userapi/api';
			if (is_dir($path)) {
				$apis = array();
				if ($handle = opendir($path)) {
					while (false !== ($file = readdir($handle))) {
						if ($file != "." && $file != "..") {
							$apis[] = $file;
						}
					}
				}
			}
			include $this->template('post');
		}
	}
	
}

