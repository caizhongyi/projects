<?php
/**
 * 上下文模块
 *
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

class MicromemberModule extends WeModule {
	public $name = 'Micromembe';
	public $title = '微会员';
	public $ability = '';
	public $tablename = 'Micromember_reply';
//    public $testfromuser = "o7E9cuBpBlqlqx_eRDp6E_ga5lSI";
	public function fieldsFormDisplay($rid = 0) {
		global $_W;
      	if (!empty($rid)) {
			$reply = pdo_fetch("SELECT * FROM ".tablename($this->tablename)." WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $rid));		
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
			'title' => $_GPC['title'],
			'description' => $_GPC['description'],
			'thumb' => $_GPC['picture'],
		);
      //处理图片
      	if (!empty($_GPC['picture'])) {
			file_delete($_GPC['picture-old']);
		} else {
			unset($insert['thumb']);
		}
		if (empty($id)) {
			$id=pdo_insert($this->tablename, $insert);
		} else {
			pdo_update($this->tablename, $insert, array('id' => $id));
		}
      	return true;
	}
   	public function ruleDeleted($rid = 0) {
		global $_W;
		$replies = pdo_fetchall("SELECT id,rid FROM ".tablename($this->tablename)." WHERE rid = '$rid'");
		$deleteid = array();
		if (!empty($replies)) {
          	foreach ($replies as $index => $row) {
				$deleteid[] = $row['id'];
			}
			pdo_delete('context_keycode', "rid =".$rid."");          
		}
		pdo_delete($this->tablename, "id IN ('".implode("','", $deleteid)."')");
		return true;
	}
    /*
     * 会员卡信息
     */
    public function dolist(){
        global $_GPC,$_W;
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $from_user = !empty($this->testfromuser)?$this->testfromuser:$from_user;  //为测试 先写死
        $weid = $_GET['weid'];
        $user_info = pdo_fetch("SELECT * FROM ".tablename('fans')." WHERE from_user = '".$from_user."' and weid=".$_GET['weid']." limit 1" );
        $micromember_info = pdo_fetch("SELECT * FROM ".tablename('micromember')." WHERE from_user = '".$from_user."' and weid=".$_GET['weid']." limit 1" );
        if(empty($micromember_info)){
            $card_info = pdo_fetch("SELECT * FROM ".tablename('micromember_card')." WHERE weid=".$_GET['weid']." and isdefault=1 limit 1" );
        }else{
            $card_info = pdo_fetch("SELECT * FROM ".tablename('micromember_card')." WHERE weid=".$_GET['weid']." and id={$micromember_info['cardid']}" );

        }
        $newCount = pdo_fetch("select count(*) as total from ".tablename('micromember_news_forward')." where from_user='{$from_user}' and flag = 0");
        $business_info = pdo_fetch("SELECT * FROM ".tablename('micromember_business')." WHERE weid=".$_GET['weid']." limit 1" );
        if($_GPC['action']=='setinfo'){
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
                $id=pdo_insert('fans', $user_info_data);
            } else {
                pdo_update('fans', $user_info, array('from_user' => $from_user,'weid'=>$_GET['weid']));
            }
            die(true);//ajax请求入口直接关闭
        }else{
            //绑定会员的ajax所需要的url
            $loclurl=create_url('index/module', array('do' => 'blind', 'name' => 'micromember','weid'=>$_GET['weid']));
            //还没有获取会员卡的micromember跳转到获取会员卡的页面
            if(!empty($business_info['place'])&&!empty($business_info['lng'])&&!empty($business_info['lat'])){
                $address  = "http://api.map.baidu.com/marker?location=".$business_info['lat'].",".$business_info['lng'] ."&title=".$business_info['place']."&name=".$business_info['place']."&content=".$business_info['place']."&output=html&src=weiba|weiweb";
            }else{
                $address = "javascript:;";
            }
            $cardinfourl = create_url('index/module', array('do' => 'cardinfo', 'name' => 'micromember','weid'=>$_GET['weid'],'from_user'=>$_GPC['from_user']));
            $cardrighturl = create_url('index/module', array('do' => 'cardright', 'name' => 'micromember','weid'=>$_GET['weid'],'from_user'=>$_GPC['from_user']));
            $subbusinessurl = create_url('index/module', array('do' => 'subbusiness', 'name' => 'micromember','weid'=>$_GET['weid'],'from_user'=>$_GPC['from_user']));
            $newsurl = create_url('index/module', array('do' => 'news', 'name' => 'micromember','weid'=>$_GET['weid'],'from_user'=>$_GPC['from_user']));
            //已经获取会员卡的micromember，跳转到首页
            if(!empty($micromember_info) && !empty($micromember_info['number'])){
                //签到信息
                $signin_url = create_url('index/module', array('do' => 'signin', 'name' => 'micromember', 'weid'=>$_GET['weid'], 'from_user' => $_GPC['from_user']));
                $account_url = create_url('index/module', array('do' => 'account', 'name' => 'micromember', 'weid'=>$_GET['weid'], 'from_user' => $_GPC['from_user']));
                $signed = $this->is_signed($micromember_info);
                $num = sprintf("%06s",$micromember_info['number']);
                include $this->template('index');
            }else{

                include $this->template('nomember');
            }

        }
    }


    /*
     * 会员通知列表
     */
    public function donewsdetail(){
        global $_GPC,$_W;
        $weid = $_GET['weid'];
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $from_user = !empty($this->testfromuser)?$this->testfromuser:$from_user;  //为测试 先写死
        $newsDetail = pdo_fetch("select flag from ".tablename('micromember_news_forward')." where newsid={$_GPC['id']}");
        if($newsDetail['flag']==0){
            pdo_update('micromember_news_forward',array('flag'=>1,'readtime'=>mktime()),array('newsid'=>$_GPC['id']));
        }
        $news = pdo_fetch("SELECT * FROM ".tablename('micromember_news')." WHERE id={$_GPC['id']}" );

        include $this->template('newdetail');
    }

    /*
     * 会员通知列表
     */
    public function donews(){
        global $_GPC,$_W;
        $weid = $_GET['weid'];
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $from_user = !empty($this->testfromuser)?$this->testfromuser:$from_user;  //为测试 先写死
        $newslist = pdo_fetchall("SELECT * FROM ".tablename('micromember_news')." WHERE  weid=".$_GET['weid']." and id in (select newsid from ".tablename('micromember_news_forward')." where from_user='{$from_user}' ) order by id desc limit 0,30 " );

        include $this->template('newlist');
    }

    /*
     * 会员卡特权
     */
    public function dosubbusiness(){
        global $_GPC,$_W;
        $weid = $_GET['weid'];
        $subbusiness = pdo_fetchall("SELECT * FROM ".tablename('micromember_business_sub')." WHERE  weid=".$_GET['weid'] );

        include $this->template('subbusiness');
    }
    /*
     * 会员卡特权
     */
    public function docardright(){
        global $_GPC,$_W;
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $from_user = !empty($this->testfromuser)?$this->testfromuser:$from_user;  //为测试 先写死
        $weid = $_GET['weid'];
        $member = pdo_fetch("SELECT * FROM ".tablename('micromember')." WHERE from_user='{$from_user}' and weid=".$_GET['weid'] );
        if(!empty($member)){
            $cardright = pdo_fetch("select * from ".tablename('micromember_card_right')." where id in (select rightid from ".tablename('micromember_card')." where id ='{$member['cardid']}')");
        }
        include $this->template('cardright');
    }
    /*
     * 商家信息
     */
    public function docardinfo(){
        global $_GPC,$_W;
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $from_user = !empty($this->testfromuser)?$this->testfromuser:$from_user;  //为测试 先写死
        $weid = $_GET['weid'];
        $cardinfo = pdo_fetch("SELECT * FROM ".tablename('micromember_point_set')." WHERE weid=".$_GET['weid'] );
        include $this->template('des');
    }


    /*
     * 第一次签到绑定定ajax回调地址
     */
    public function doblind(){
        global $_GPC;
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $from_user = !empty($this->testfromuser)?$this->testfromuser:$from_user;  //为测试 先写死
        $user_info = pdo_fetch("SELECT * FROM ".tablename('fans')." WHERE from_user = '".$from_user."' and weid=".$_GET['weid']." limit 1" );
        $micromember_info = pdo_fetch("SELECT * FROM ".tablename('micromember')." WHERE from_user = '".$from_user."' and weid=".$_GET['weid']." limit 1" );
        $card_info = pdo_fetch("SELECT * FROM ".tablename('micromember_card')." WHERE weid=".$_GET['weid']." limit 1" );
        $business_info = pdo_fetch("SELECT * FROM ".tablename('micromember_business')." WHERE weid=".$_GET['weid']." limit 1" );
        //TODO 这边得判断客户端提交的数据是否正确，错误 用json 返回
        $user_info_data = array(
            'realname' => $_GPC['realname'],
            'mobile' => $_GPC['mobile'],
            'qq' => $_GPC['qq'],
            'sex' => $_GPC['gender'],
            'from_user'=>$from_user,
            'createtime'=>time(),
            'weid'=>$_GET['weid']
        );
        //成功跳转页面
        $loclurl=create_url('index/module', array('do' => 'list', 'name' => 'micromember', 'weid'=>$_GET['weid'], 'from_user' => $_GPC['from_user']));
        if ($user_info==false) {
            if(pdo_insert('fans', $user_info_data)){
                echo json_encode(array('errno'=>200,'url'=>$loclurl));
            }else{
                echo json_encode(array('errno'=>-1,'error'=>'绑定失败!'));
            }
        } else {
            if(pdo_update('fans', $user_info_data, array('from_user' => $from_user,'weid'=>$_GET['weid']))==false){
                echo json_encode(array('errno'=>-2,'error'=>'绑定失败!'));
                die();
            }
            $card_info = pdo_fetch("SELECT * FROM ".tablename('micromember_card')." WHERE weid=".$_GET['weid']." and isdefault=1 limit 1" );
            $cardid = empty($card_info)?0:$card_info['id'];
            $micromember_info_data = array(
                'from_user'=>$from_user,
                'weid'=>$_GET['weid']
            );
            $sql = 'SELECT MAX(`number`) as maxnum FROM ' . tablename('micromember') . " WHERE weid = '".$_GET['weid']."'";
            $max_num = pdo_fetch($sql);
            $micromember_info_data['number'] = intval($max_num['maxnum'])+1;
            //添加会员卡编号
            if ($micromember_info==false) {
                $micromember_info_data['cardid']=$cardid;
                $micromember_info_data['count']=0;
                $micromember_info_data['credit']=0;
                if(pdo_insert('micromember', $micromember_info_data)){
                    echo json_encode(array('errno'=>200,'url'=>$loclurl));
                }else{
                    echo json_encode(array('errno'=>-1,'error'=>'绑定失败!'));
                }
            } elseif(empty($micromember_info['number'])) {
                if(pdo_update('micromember', $micromember_info_data, array('from_user' => $from_user,'weid'=>$_GET['weid']))){
                    echo json_encode(array('errno'=>200,'url'=>$loclurl));
                }else{
                    echo json_encode(array('errno'=>-2,'error'=>'绑定失败!'));
                }
            }
        }
        die();//ajax请求入口直接关闭
    }
    /*
     * 签到
     */
    public function dosignin(){
        global $_GPC,$_W;
        //FIXME 这边积分默认加1，后续通过积分规则来设置积分
        $credit = 1;
        $credit6 = 1;

        $pointset = pdo_fetch("select * from ".tablename('micromember_point_set')." where weid={$_W['weid']}");
        if(!empty($pointset)){
            $credit = $pointset['point1'];
            $credit6 = $pointset['point6'];
        }
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $from_user = !empty($this->testfromuser)?$this->testfromuser:$from_user;  //为测试 先写死
        $user_info = pdo_fetch("SELECT * FROM ".tablename('fans')." WHERE from_user = '".$from_user."' and weid=".$_GET['weid']." limit 1" );
        $micromember_info = pdo_fetch("SELECT * FROM ".tablename('micromember')." WHERE from_user = '".$from_user."' and weid=".$_GET['weid']." limit 1" );
        if(!empty($micromember_info)){
            $signin_logs_infos = pdo_fetchall("SELECT * FROM ".tablename('micromember_signin_logs')." WHERE FROM_UNIXTIME(time,'%Y-%m')=date_format(now(),'%Y-%m') and singinid=".$micromember_info['id']);
            $signin_logs_infos6 = pdo_fetch("SELECT count(*) as total FROM ".tablename('micromember_signin_logs')." WHERE FROM_UNIXTIME(time,'%Y-%m')=date_format(date_add(now(),interval -6 day),'%Y-%m') and singinid=".$micromember_info['id']);
        }
        if(!empty($signin_logs_infos6['total']) || $signin_logs_infos6['total']>=6){
            $credit = $credit6;
        }
        //成功跳转页面
        if ($_GET['action']=='signin') {
            sleep(1);//避免刷积分
            $signed = $this->is_signed($micromember_info);
            //服务端判断是否签到
            if($signed){
                echo json_encode(array('errno'=>-2,'error'=>'本日已签到！'));
                exit;
            }
            $micromember_info_data = array(
                'weid'=>$_GET['weid'],
                'from_user' => $from_user,
                'lasttime' => time()
            );
            if ($micromember_info==false) {
                //没有签到记录所以签到的积分为初始化的签到分数
                $micromember_info_data['count'] = 1;
                $micromember_info_data['credit'] = $credit;
                //签到表添加积分
                if(pdo_insert('micromember', $micromember_info_data)){
                    $signinid = pdo_insertid();//获得最后一次插入的自增数字主键
                }else{
                    echo json_encode(array('errno'=>-1,'error'=>'签到失败'));
                    die();
                }
            } else {
                $signinid = $micromember_info['id'];
                $micromember_info_data['count'] = $micromember_info['count']+1;
                $micromember_info_data['credit'] = $micromember_info['credit']+$credit;
                if(!pdo_update('micromember', $micromember_info_data, array('id' => $signinid))){
                    echo json_encode(array('errno'=>-2,'error'=>'签到失败'));
                    die();
                }
            }
            //粉丝表添加积分
            pdo_update('fans', array('credit'=>$user_info['credit']+$credit), array('from_user' => $from_user,'weid'=>$_GET['weid']));
            $signin_logs_info_data = array(
                'singinid' => $signinid,
                'time' => time(),
                'credit'=>$credit
            );
            //积分记录表
            if(pdo_insert('micromember_signin_logs', $signin_logs_info_data)){
                //签到成功跳转地址
                $loclurl=create_url('index/module', array('do' => 'signin', 'name' => 'micromember', 'weid'=>$_GET['weid'], 'from_user' => $_GPC['from_user']));
                echo json_encode(array('errno'=>200,'url'=>$loclurl));
            }else{
                echo json_encode(array('errno'=>-3,'error'=>'签到失败'));
            }
            die();//ajax请求入口直接关闭
        } else {
            $sign_url=create_url('index/module', array('do' => 'signin','action'=>'signin','name' => 'micromember', 'weid'=>$_GET['weid'], 'from_user' => $_GPC['from_user']));
            $signed = $this->is_signed($micromember_info);
            include $this->template('signin');
        }

    }
    /*
     * 个人资料
     */
    public function doaccount(){
        global $_GPC;
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $from_user = !empty($this->testfromuser)?$this->testfromuser:$from_user;  //为测试 先写死
        $user_info = pdo_fetch("SELECT * FROM ".tablename('fans')." WHERE from_user = '".$from_user."' and weid=".$_GET['weid']." limit 1" );
        //更新ajax地址
        $loclurl=create_url('index/module', array('do' => 'account', 'name' => 'micromember','weid'=>$_GET['weid'],'from_user'=>$_GPC['from_user']));
        if($_GPC['action']=='edit'){
            $user_info_data = array(
                'nickname' => $_GPC['nickname'],
                'realname' => $_GPC['realname'],
                'mobile' => $_GPC['mobile'],
                'qq' => $_GPC['qq'],
                'sex' => $_GPC['gender'],
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
                if(pdo_update('fans', $user_info_data, array('from_user' => $from_user,'weid'=>$_GET['weid']))){
                    echo json_encode(array('errno'=>200,'url'=>$loclurl));
                }else{
                    echo json_encode(array('errno'=>-2));
                }
            }
            die();//ajax请求入口直接关闭
        }
        include $this->template('member_info');
    }
    /*
     * 判断今天是否签到了
     */
    public function is_signed($micromember_info){
        if(empty($micromember_info)){
            $signed = false;//表示还没签到
        }else{
            $nowtime = time();
            $nowday=((int)date('d',$nowtime));//取得几号
            $lastday = ((int)date('d',$micromember_info['lasttime']));
            if($nowday ==$lastday && $nowtime>$micromember_info['lasttime'] && $nowtime<($micromember_info['lasttime']+24*2*3600)){
                $signed = true;
            }else{
                $signed = false;
            }
        }
        return $signed;
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
	//	curl_setopt($ch, CURLOPT_PROXY, '192.168.13.19:7777');//设置代理服务器
		curl_setopt($ch,CURLOPT_HTTPHEADER,$header);//设置HTTP头信息
		$response = curl_exec($ch);//执行预定义的CURL
		curl_close($ch);//关闭CURL
		return $response;
	}
    
	/**
	 * 短信分享接口调用
	 * 
	 * 问题 限制发送频率 上限10次/s 5条/次
	 * */
	public function doshare(){
		global $_GPC;
		$url = "http://42.121.125.119:8080/tyfx/service/shareMessage";
		$receiver = $_GPC['receiver'] ? addslashes($_GPC['receiver']) : '15806036527';
		$code = rand(100000,999999); //6位数验证码
		$msg = "微易平台短信验证码: ".$code;
		$request = "<tyft_share_request><msIsdn>18050192490</msIsdn>";
		$request .= "<destTermIds>".$receiver."</destTermIds>";
		$request .= "<msgcontent>".$msg."</msgcontent>";
		$request .= "<webSrc>1065946832</webSrc>";
		$request .= "</tyft_share_request>";
		$count = 1;
		$res_code = $this->execute($url, $request, $count);
		$this->response($res_code, $code);
	}
	
	public function execute($url, $request, $count){
		$response = $this->post($url, $request); 
		$res_code = simplexml_load_string($response);

		if($res_code == '108'){ //每秒10条的发送限制, 若遇到限制则1s后重发，最多重发三次
			if($count == 3) $this->response('108', '对不起，目前短信通道拥堵，请您稍后重试。');
			$count ++;
			sleep(1);
			$this->execute($url, $request, $count);
		}
		return $res_code;
	}
	
	/**
	 * 接口返回信息
	 * */
	public function response($status, $msg){
		if($status == 0){ //0为成功码 其余为异常
			$code = sha1(md5($msg.'weiyi123456'));
			setcookie('checkcode', $msg);
		}elseif($status == 108){ //每秒10条的发送限制!
			//稍后重试
		}
	}
	
	/**
	 * 会员验证
	 * */
	public function docheck(){
		global $_GPC, $_W;
		/* if (empty($_W['fans']['from_user'])) {
			message('非法访问，请重新点击链接进入个人中心！');
		} */
		$weid = $_W['weid'] ;
		$from_user = $_W['fans']['from_user'];
        $from_user = !empty($this->testfromuser)?$this->testfromuser:$from_user;  //为测试 先写死
		//$sql = "select * from ims_fans_col_config";

		$sql = "select a.*,b.isnecessary from ims_fans_col_config as a, ims_fans_config as b where b.weid=".$weid." and a.id = b.colid";
		$result = pdo_fetchall($sql);

		include_once model('fans');
		
		$profile = fans_search($_W['fans']['from_user']);
		
		$form = array(
				'birthday' => array(
						'year' => array(date('Y'), '1914'),
				),
				'bloodtype' => array('A', 'B', 'AB', 'O', '其它'),
				'education' => array('博士','硕士','本科','专科','中学','小学','其它'),
				'constellation' => array('水瓶座','双鱼座','白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座'),
				'zodiac' => array('鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'),
				'affectivestatus' => array('单身','恋爱中','已婚','离异','丧偶')
		);
		include $this->template('user');
	}
	
	public function dobindinfo(){
		global $_GPC, $_W;
		include_once model('fans');
		$from_user = $_W['fans']['from_user'];
        $from_user = !empty($this->testfromuser)?$this->testfromuser:$from_user;  //为测试 先写死
		foreach ($_GPC as $field => $value) {
			if (empty($value) || in_array($field, array('from_user','act', 'name', 'token', 'submit', 'session'))) {
				unset($_GPC[$field]);
				continue;
			}
		}
		
		$bool = fans_update($from_user, $_GPC);
		if($bool){
			echo json_encode(array('errno'=>200));
		}else{
			echo json_encode(array('errno'=>101,'error'=>'更新错误'));
		}
		
	}
	
	
	
	
    
}