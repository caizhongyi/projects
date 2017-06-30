<?php
/*设置UTF编码*/
header("Content-type: text/html; charset=utf-8"); 
require './source/bootstrap.inc.php';

/*获取领航平台http过去的参数信息*/
$streamingno = isset($_GET['streamingno']) ? $_GET['streamingno'] : '';
$rand = isset($_GET['rand']) ? $_GET['rand'] : '';
$encode = isset($_GET['encode']) ? $_GET['encode'] : '';

/*2.0soap地址*/
$soap_url = "http://fzlediao.com/vieasy/BnetForSIWS.wsdl";
/*代理信息*/
$option = array();
$proxy_host = "192.168.13.19";
$proxy_port = "7777";
if (! empty($proxy_host)) {
	$option = array(
		'proxy_host' => $proxy_host, 
		'proxy_port' => $proxy_port
	);
}

/*发起soap请求*/
$soap = new SoapClient($soap_url,$option);

//领航平台返回应答结果
$request_param = array('streamingno'=>$streamingno,'rand'=>$rand);
$request_res_xml = $soap->getPortalRequest($request_param);

//将返回的XML信息转化为数组
$request_res_array = (array) simplexml_load_string($request_res_xml->getPortalRequestResponse);
var_dump($request_res_array);

/*调用加密数据包，比对第一步获取的encode参数。 2.0的wsdl用XML串加密，1.0的wsdl直接用值拼接成的字符串加密*/
$encode_req_xml = '<?xml version="1.0" encoding="GB2312"?><Package>';
$encode_req_xml .= '<StreamingNo>' . $streamingno . '</StreamingNo>';
$encode_req_xml .= '<Rand>' . $rand . '</Rand>';
$encode_req_xml .= '<CustID>' . $request_res_array['CustID'] . '</CustID>';
$encode_req_xml .= '<ProductID>'. $request_res_array['ProductID'] .'</ProductID>';
$encode_req_xml .= '</Package>';

$encode_param = array('decode'=>$encode_req_xml);

$decode = $soap->getEncodeString($encode_param)->getEncodeStringResponse;

$result = 0;	//平台业务员处理结果。0：失败，1：成功。默认值为0


if($decode == $encode){		//验证通过，处理平台业务
	
	/*平台业务处理*/
	require_once IA_ROOT . '/source/model/member.mod.php';
	
	$opflag = $request_res_array['OPFlag'];
	if($opflag == '0101'){		//订购注册
		$username = 'master@' . $request_res_array['CustName'];
		/*进行用户注册处理*/
	    $member = array();
	    $member['username'] = trim($username);
	    $member['password'] = random(8);
	    
	    $uid = member_register($member);
	    if($uid > 0) {
	       $result = 1;		//订购注册成功
	    }
	    
	}elseif($opflag == '0102'){		//变更
		
		$result = 1; //变更信息成功
		
	}elseif($opflag == '0103'){		//退订注销
		$founders = explode(',', $_W['config']['setting']['founder']);
		if(in_array($uid, $founders)) {
			exit('管理员用户不能删除.');
		}
		
		$member = array();
		$username = 'master@' . $request_res_array['CustName'];
		$member['username'] = trim($username);
		
		$del_res = pdo_delete('members',$member);
		if($del_res > 0){
			$result = 1;	//退订注销成功
		}
		
	}elseif($opflag == '0205'){		//用户认证
		$username = 'master@' . $request_res_array['CustName'];
		$sql = 'select * from ' . tablename('members') . ' where username = "' .$username . '" limit 1';
		$member = pdo_fetch($sql);
		/*登录后台*/
		if(is_array($member)){
			//存入cookie、session
			$cookie = array();
			$cookie['uid'] = $member['uid'];
			$cookie['lastvisit'] = $member['lastvisit'];
			$cookie['lastip'] = $member['lastip'];
			$cookie['hash'] = md5($member['password'] . $member['salt']);
			$session = base64_encode(json_encode($cookie));
			isetcookie('session', $session, 0);
			
			//更新登录信息
			$status = array();
			$status['uid'] = $member['uid'];
			$status['lastvisit'] = TIMESTAMP;
			$status['lastip'] = CLIENT_IP;
			
			$upd_status = member_update($status);
			if($upd_status){	//登录成功
				
				/*业务处理成功，返回应答 提醒省领航平台操作完成*/
				$res_req_xml = '<?xml version="1.0" encoding="GB2312"?><Package>';
				$res_req_xml .= '<StreamingNo>' . $streamingno . '</StreamingNo>';
				$res_req_xml .= '<OPFlag>' . $opflag . '</OPFlag>';
				$res_req_xml .= '<ReturnStatus>00000</ReturnStatus>';
				$res_req_xml .= '<Summary>成功</Summary>';
				$res_req_xml .= '</Package>';
			
				$res_param = array('reqXML'=>$res_req_xml);
				$res_res_xml = $soap->getPortalResult($res_param);
				var_dump($res_res_xml);
				
				/*重定向到平台*/
				hooks('member:login:success');
				$forward = create_url('index/frame');
				
				header('location:'.$forward);
			}
			
		}	
	}
}

/*业务处理成功，返回应答 提醒省领航平台操作完成*/
if($result == 1){
	$res_req_xml = '<?xml version="1.0" encoding="GB2312"?><Package>';
	$res_req_xml .= '<StreamingNo>' . $streamingno . '</StreamingNo>';
	$res_req_xml .= '<OPFlag>' . $request_res_array['OPFlag'] . '</OPFlag>';
	$res_req_xml .= '<ReturnStatus>00000</ReturnStatus>';
	$res_req_xml .= '<Summary>成功</Summary>';
	$res_req_xml .= '</Package>';

	$res_param = array('reqXML'=>$res_req_xml);
	$res_res_xml = $soap->getPortalResult($res_param);
	var_dump($res_res_xml);
}


?>