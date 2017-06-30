<?php
/**
 * 调用第三方数据接口模块
 *
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

class UserApiModuleSite extends WeModuleSite {
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

	public function doWebManage() {
		global $_W, $_GPC;
		$foo = !empty($_GPC['foo']) ? $_GPC['foo'] : 'display';

		if($foo == 'display') {
			require model('rule');
			$pindex = max(1, intval($_GPC['page']));
			$psize = 20;
			$types = array('', '等价', '包含', '正则表达式匹配');

			$condition = 'weid = 0 AND module = \'userapi\'';
			$params = array();

			if (isset($_GPC['status'])) {
				$condition .= " AND status = :status";
				$params[':status'] = intval($_GPC['status']);
			}
			if(isset($_GPC['keyword'])) {
				$condition .= ' AND `name` LIKE :keyword';
				$params[':keyword'] = "%{$_GPC['keyword']}%";
			}
			$ds = rule_search($condition, $params, $pindex, $psize, $total);
			$pager = pagination($total, $pindex, $psize);

			if (!empty($ds)) {
				foreach($ds as &$item) {
					$reply = pdo_fetch('SELECT * FROM ' . tablename($this->tablename) . ' WHERE `rid`=:rid', array(':rid' => $item['id']));
					$item['description'] = $reply['description'];
				}
			}
			$import = false;
			$apis = implode('\',\'', array_keys($this->predefines));
			$apis = "'{$apis}'";
			$sql = 'SELECT DISTINCT `apiurl` FROM ' . tablename($this->tablename) . ' AS `e` LEFT JOIN ' . tablename('rule') . " AS `r` ON (`e`.`rid`=`r`.`id`) WHERE `r`.`weid`='0' AND `apiurl` IN ({$apis})";
			$apiurls = pdo_fetchall($sql);
			if(count($apiurls) != count($this->predefines)) {
				$import = true;
			}
			include $this->template('display');
		}
		if($foo == 'import') {
			$apis = implode('\',\'', array_keys($this->predefines));
			$apis = "'{$apis}'";
			$sql = 'SELECT DISTINCT `apiurl` FROM ' . tablename($this->tablename) . ' AS `e` LEFT JOIN ' . tablename('rule') . " AS `r` ON (`e`.`rid`=`r`.`id`) WHERE `r`.`weid`='0' AND `apiurl` IN ({$apis})";
			$apiurls = pdo_fetchall($sql);
			$as = array();
			foreach($apiurls as $url) {
				$as[] = $url['apiurl'];
			}
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
							pdo_insert('rule_keyword', $data);
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
				$sql = 'DELETE FROM '. tablename('rule_keyword') . ' WHERE `rid`=:rid AND `weid`=0';
				$pars = array();
				$pars[':rid'] = $rid;
				pdo_query($sql, $pars);

				$rows = array();
				$rowtpl = array(
					'rid' => $rid,
					'weid' => 0,
					'module' => $rule['module'],
					'status' => $rule['status'],
					'displayorder' => $rule['displayorder'],
				);
				if (!empty($_GPC['keyword-name'])) {
					foreach ($_GPC['keyword-name'] as $id => $row) {
						if (empty($row) && strlen($row) == 0 && intval($_GPC['keyword-type'][$id]) != 4) {
							continue;
						}
						$rowtpl['content'] = $row;
						$rowtpl['type'] = intval($_GPC['keyword-type'][$id]);
						if($rowtpl['type'] == 4) {
							$rowtpl['content'] = '';
						}
						$rows[md5($rowtpl['type'] . $rowtpl['content'])] = $rowtpl;
					}
				}
				if (!empty($_GPC['keyword-name-new'])) {
					foreach ($_GPC['keyword-name-new'] as $id => $row) {
						if (empty($row) && strlen($row) == 0 && intval($_GPC['keyword-type-new'][$id]) != 4) {
							continue;
						}
						$rowtpl['content'] = $row;
						$rowtpl['type'] = intval($_GPC['keyword-type-new'][$id]);
						if($rowtpl['type'] == 4) {
							$rowtpl['content'] = '';
						}
						$rows[md5($rowtpl['type'] . $rowtpl['content'])] = $rowtpl;
					}
				}
				if(!empty($_GPC['keywords'])) {
					$kwds = explode(',', trim($_GPC['keywords']));
					foreach($kwds as $kwd) {
						$kwd = trim($kwd);
						if(empty($kwd)) {
							continue;
						}
						$rowtpl['content'] = $kwd;
						$rowtpl['type'] = 1;
						$rows[md5($rowtpl['type'] . $rowtpl['content'])] = $rowtpl;
					}
				}
				foreach($rows as $krow) {
					$result = pdo_insert('rule_keyword', $krow);
				}

				$reply = array(
					'rid' => $rid,
					'description' => htmlspecialchars_decode($_GPC['description']),
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
				$rule['kwd-adv'] = false;
				$rule['keywords'] = array();
				foreach($rule['keyword'] as $kwd) {
					if($kwd['type'] != '1') {
						$rule['kwd-adv'] = true;
					} else {
						$rule['keywords'][] = $kwd['content'];
					}
				}
				$rule['keywords'] = implode(',', $rule['keywords']);

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
				2 => array(
					'name' => '包含关键字',
					'description' => '用户进行交谈时，对话中包含上述关键字就执行这条规则。',
				),
				3 => array(
					'name' => '正则表达式匹配',
					'description' => "用户进行交谈时，对话内容符合述关键字中定义的模式才会执行这条规则。<br/><strong>注意：如果你不明白正则表达式的工作方式，请不要使用正则匹配</strong> <br/><strong>注意：正则匹配使用MySQL的匹配引擎，请使用MySQL的正则语法</strong> <br /><br /><strong>示例: </strong><br/><b>^微擎</b>匹配以“微擎”开头的语句<br /><b>微擎$</b>匹配以“微擎”结尾的语句<br /><b>^微擎$</b>匹配等同“微擎”的语句<br /><b>微擎</b>匹配包含“微擎”的语句<br /><b>[0-9\.\-]</b>匹配所有的数字，句号和减号<br /><b>^[a-zA-Z_]$</b>所有的字母和下划线<br /><b>^[[:alpha:]]{3}$</b>所有的3个字母的单词<br /><b>^a{4}$</b>aaaa<br /><b>^a{2,4}$</b>aa，aaa或aaaa<br /><b>^a{2,}$</b>匹配多于两个a的字符串",
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
    /*
     * 手机号码绑定
     */
	public function doMobile_mobile_blind() {
        global $_GPC;
        $from_user = $_GPC['from_user'];
        $user_info = pdo_fetch("SELECT * FROM ".tablename('fans')." WHERE from_user = '".$from_user."' and weid=".$_GET['weid']." limit 1" );
        $mobile = $user_info['mobile'];
        $weid = $_GPC['weid'];
        $loclurl = $this->createMobileUrl('_mobile_blind', array('name' => 'userapi', 'do' => '_mobile_blind','weid'=>$weid, 'from_user' => $from_user));
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
        exit;
	}
    /**
     * 判断手机是否安装易信
     */
    private function has_yixin($mobile){
        $sql = 'select * from '.tablename('share_right').'where phone ='.$mobile.' limit 1';
        $yx_info = pdo_fetch($sql);
        if(!empty($yx_info)){
            return true;
        }else{
            return false;
        }
    }
    /**
     * 分享有礼活动（移动互联网公众帐号）
     */
    public function doMobile_es_share() {
        global $_GPC;
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $user_info = pdo_fetch("SELECT * FROM ".tablename('fans')." WHERE from_user = '".$from_user."' and weid=".$_GET['weid']." limit 1" );

        if($_GPC['action']=='share'){
            $mobile = $user_info['mobile'];
            $post_url = "http://42.121.125.119:8080/tyfx/service/shareMessage";
            $share_mobiles = $_GPC['share_mobile'];
            $receiver = '';
            foreach($share_mobiles as $k=>$share_mobile){
                $receiver .= $share_mobile.',';
            }
            trim($receiver,',');
            $msg = "用易信，短信免费发，更有电话留言、国际漫游等免费功能等你体验！新注册天翼用户送300M流量，次月再送60M流量。全网用户关注“移动互联网应用”易信公众号赢取高端智能机等好礼！";
            $request = "<tyft_share_request><msIsdn>".$mobile."</msIsdn>";
            $request .= "<destTermIds>".$receiver."</destTermIds>";
            $request .= "<msgcontent>".$msg."</msgcontent>";
            $request .= "<webSrc>1065946832</webSrc>";
            $request .= "</tyft_share_request>";
            $res = $this->es_execute($post_url, $request);
            if($res['code'] == 200){
                foreach($share_mobiles as $k=>$receiver){
                    $logs = pdo_fetch("SELECT * FROM ".tablename('share_logs')." WHERE from_user = '".$from_user."' and weid=".$_GET['weid']." and receive_phone = '".$receiver."' and send_phone = '".$mobile."' limit 1" );
                    if(!$logs){
                        pdo_insert('share_logs',array('from_user'=>$from_user,'weid'=>$_GET['weid'],'receive_phone'=>$receiver,'send_phone'=>$mobile,'send_time'=>TIMESTAMP));
                    }
                }
            }
            echo json_encode(array('errno'=>$res['code'],'error'=>$res['msg']));
            die();
        }elseif($_GPC['action']=='check'){
            $receiver=$_GPC['share_mobile'];
            if(!empty($receiver)){
                if(!fj_phone($receiver)){
                    echo json_encode(array('errno'=>-2,'error'=>'手机号码不属于福建省，无法进行分享！'));
                    die();
                }
                if($this->has_yixin($receiver)){
                    echo json_encode(array('errno'=>-3,'error'=>'手机号码已安装易信，无法进行分享！'));
                    die();
                }
            }
            echo json_encode(array('errno'=>200));
            die();
        }else{
            $show_url = $this->createMobileUrl('_es_share',array( 'name' => 'userapi','action'=>'share','weid'=>MOBILE_INTERNET_ID,'from_user' => $_GPC['from_user']));
            $check_url = $this->createMobileUrl('_es_share',array( 'name' => 'userapi','action'=>'check','weid'=>MOBILE_INTERNET_ID,'from_user' => $_GPC['from_user']));
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

    public function post($url , $params = '' , $header = array()){
        $ch = curl_init();// 初始化CURL句柄
        curl_setopt($ch, CURLOPT_URL, $url);//设置请求的URL
        //curl_setopt($ch, CURLOPT_PORT, 80); //设置端口
        curl_setopt($ch, CURLOPT_POST, 1);//启用POST提交
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);//忽略ssl验证
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);//设置POST提交的字符串
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);// 设为TRUE把curl_exec()结果转化为字串，而不是直接输出
        //curl_setopt($ch, CURLOPT_PROXY, '192.168.13.19:7777');//设置代理服务器
        curl_setopt($ch,CURLOPT_HTTPHEADER,$header);//设置HTTP头信息
        $response = curl_exec($ch);//执行预定义的CURL
        curl_close($ch);//关闭CURL
        return $response;
    }

    /**
     * 拜年赢好礼活动
     */
    public function doMobileBainian() {
        global $_GPC;
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $user_info = pdo_fetch("SELECT * FROM ".tablename('fans')." WHERE from_user = '".$from_user."' and weid=".$_GET['weid']." limit 1" );
        if($_GPC['action']=='bainian'){
            $mobile = $user_info['mobile'];
            $bainian_mobiles = $_GPC['mobile'];
            if(!fj_phone($bainian_mobiles)){
                echo json_encode(array('errno'=>-1,'error'=>'手机号码不属于福建省，无法参与活动！'));
                die();
            }
            if(!empty($bainian_mobiles)){
                    $logs = pdo_fetch("SELECT * FROM ".tablename('bainian_logs')." WHERE openid = '".$from_user."' and weid=".$_GET['weid']." limit 1" );
                    if(!$logs){
                        pdo_insert('bainian_logs',array('openid'=>$from_user,'weid'=>$_GET['weid'],'phone'=>$bainian_mobiles,'createtime'=>TIMESTAMP));
                        if(empty($mobile)){
                            //未绑定的手机号码绑定
                            pdo_update('fans',array('mobile'=>$bainian_mobiles),array('weid'=>$_GET['weid'],'from_user'=>$from_user));
                        }
                        echo json_encode(array('errno'=>200,'error'=>'完成报名！'));
                    }else{
                        echo json_encode(array('errno'=>-2,'error'=>'您已报名成功，无需再次报名！'));
                        die();
                    }
            }
        }elseif($_GPC['action']=='check'){
            $receiver=$_GPC['mobile'];
            if(!empty($receiver)){
                if(!fj_phone($receiver)){
                    echo json_encode(array('errno'=>-2,'error'=>'手机号码不属于福建省，无法进行分享！'));
                    die();
                }
            }
            echo json_encode(array('errno'=>200));
            die();
        }elseif($_GPC['action']=='desc'){
            include $this->template('bainian_desc');
        }elseif($_GPC['action']=='sms'){
            $pindex = max(1, intval($_GPC['page']));
            $psize = 5;
            $list = pdo_fetchall("SELECT * FROM ".tablename('bainian_sms')." WHERE 1 LIMIT " . ($pindex - 1) * $psize . ',' . $psize);
            $total = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('bainian_sms')." WHERE 1 ");
            $pager = pagination($total, $pindex, $psize,'',array('before' => 1, 'after' => 1));
            include $this->template('bainian_sms');
        }elseif($_GPC['action']=='baoming'){
            $mobile = $user_info['mobile'];
            $bainian_url = $this->createMobileUrl('Bainian',array( 'name' => 'userapi','action'=>'bainian','weid'=>$_GET['weid'],'from_user' => $_GPC['from_user']));
            $check_url = $this->createMobileUrl('Bainian',array( 'name' => 'userapi','action'=>'check','weid'=>$_GET['weid'],'from_user' => $_GPC['from_user']));
            include $this->template('bainian_baoming');
        }else{
            $baoming_url = $this->createMobileUrl('Bainian',array( 'name' => 'userapi','action'=>'baoming','weid'=>$_GET['weid'],'from_user' => $_GPC['from_user']));
            $desc_url = $this->createMobileUrl('Bainian',array( 'name' => 'userapi','action'=>'desc','weid'=>$_GET['weid'],'from_user' => $_GPC['from_user']));
            $sms_url = $this->createMobileUrl('Bainian',array( 'name' => 'userapi','action'=>'sms','weid'=>$_GET['weid'],'from_user' => $_GPC['from_user']));
            include $this->template('bainian_index');
        }
    }
}