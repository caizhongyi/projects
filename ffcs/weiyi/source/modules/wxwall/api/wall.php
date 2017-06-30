<?php
header("Content-Type: text/html; charset=UTF-8");

class wall{
	public function wall(){
		
		$nickname = $this->_param('nickname');
		$realname = $this->_param('realname');
		$mobile = $this->_param('mobile');
		$data = "";
		if(!empty($nickname)){
			$data .= " nickname = '".$nickname."',";
		}
		if(!empty($realname)){
			$data .= " realname = '".$realname."',";
		}
		if(!empty($mobile)){
			$data .= " mobile = '".$mobile."',";
		}
		
		$from_user = $this->_param('from_user');
		$weid = $this->_param('weid');
		$params = array();
		if(!empty($from_user) && !empty($weid)){
			/* $mysql_server_name='127.0.0.1:3306';
			$mysql_username='root';
			$mysql_password='root';
			$mysql_database='weiyi'; */ 
			$mysql_server_name='10.241.133.54:3306';
			$mysql_username='wyuser';
			$mysql_password='wyuser8838';
			$mysql_database='wydb';
			
			$conn=mysql_connect($mysql_server_name,$mysql_username,$mysql_password,$mysql_database);
			mysql_query("set names utf8");
			if (!$conn)
			{
				die('Could not connect: ' . mysql_error());
			}
			mysql_select_db($mysql_database,$conn);
			
			
			$params = "from_user = '".$from_user."' and weid = ".$weid;
			$sql = "update ims_fans set ".trim($data, ',')." where ".$params;
			$bool = mysql_query($sql);
			if($bool === false){
				echo 0;
			}else{
				echo 1;
			}
			mysql_close($conn);
		}else{
			echo 0;
		}
		exit();
	}
	
	private function _param($name){
		if(isset($_GET[$name]) && !empty($_GET[$name])){
			return trim($_GET[$name]);
		}elseif(isset($_POST[$name]) && !empty($_POST[$name])){
			return trim($_POST[$name]);
		}else{
			return '';
		}
	}
}
$wall = new wall();
$wall->wall();