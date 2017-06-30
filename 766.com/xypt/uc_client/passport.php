<?

//FOR DZ6.1
//用户登录到 UC 数据库

if ($pphash != '4798134cdc14b4cb94544f66e82c7cca') {
	$action = '';
}

require_once '../include/common.inc.php';

switch ($action) {
	case 'login':
		if ($username && $password) {
			$db2 = new dbstuff;
			$db2->connect(UC_DBHOST, UC_DBUSER, UC_DBPW, UC_DBNAME, $pconnect, true, UC_DBCHARSET);
			$query = $db2->query("SELECT uid , username , password , salt  FROM ".UC_DBTABLEPRE."members WHERE username = '$username'");
			if ($record = $db2->fetch_array($query)) {	
				if ($record['password'] ==  md5($password.$record['salt'])) {
					$actionstat = 1;
					$userid = $record['uid'];
					$username = $record['username'];
					$adminid = $record['adminid'];
					$groupid = $record['groupid'];
					$query = $db2->query("UPDATE ".UC_DBTABLEPRE."members SET lastlogintime=$timestamp WHERE uid = $userid");
					$llbnum = $db->result_first("SELECT `groupid` FROM {$tablepre}members WHERE uid = $userid LIMIT 1");
					$adminid = $db->result_first("SELECT `adminid` FROM {$tablepre}members WHERE uid = $userid LIMIT 1");
				} else {
					$actionstat = 0;
					$userid = $record['uid'];
					$username = $record['username'];
					$adminid = 0;
					$llbnum = 0;
				}
			} else {
				$actionstat = 0;
				$userid = 0;
				$username = 0;
				$llbnum = 0;
			}
			$db2->close();
			echo '<actionstat>'.$actionstat.'</actionstat><userid>'.$userid.'</userid><llbnum>'.$llbnum.'</llbnum><adminid>'.$adminid.'</adminid><username>'.$username.'</username>';
		} else {
			echo '<actionstat>0</actionstat><userid>0</userid><llbnum>0</llbnum><username>0</username>';
		}
		break;
	default:
		echo '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">'."\r\n";
		echo '<html><head>'."\r\n";
		echo '<title>400 Bad Request</title>'."\r\n";
		echo '</head><body>'."\r\n";
		echo '<h1>Bad Request</h1>'."\r\n";
		echo '<p>Your browser sent a request that this server could not understand.<br />'."\r\n";
		echo '</p>'."\r\n";
		echo '</body></html>'."\r\n";
}
?>