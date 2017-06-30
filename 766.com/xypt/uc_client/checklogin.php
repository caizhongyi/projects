<?
//FOR DZ6.1
if ($pphash != '4798134cdc14b4cb94544f66e82c7cca') {
	$action = '';
}
require_once '../include/common.inc.php';
require_once 'client.php';
switch ($action) {
	case 'login':
		if ($uid) {
			$query = $db->query("SELECT uid,username,password,credits,posts,extcredits1,extcredits2 FROM cdb_members WHERE uid = '$uid'");
			if ($record = $db->fetch_array($query)) {
				$extcredits1 = $record['extcredits1'];
				$extcredits2 = $record['extcredits2'];
				$posts = $record['posts'];
				$credits = $record['credits'];				$db->close();
				echo '<extcredits1>'.$extcredits1 .'</extcredits1><extcredits2>'.$extcredits2 .'</extcredits2><posts>'.$posts.'</posts><credits>'.$credits.'</credits>';
			}			
		}else {
			echo '<actionstat>0</actionstat><userid>0</userid>';
		 }
		break;
        case 'update':
            if ($uid) {
                //更新论坛经验值
                $db->query("UPDATE cdb_members SET extcredits1=$ext WHERE uid=$uid");				$db->close();
            }
            break;
        case 'posts':
            if ($uid) {
                //查询用户是否已经恢复了帖子
                //echo "SELECT tid,authorid FROM cdb_posts WHERE tid=".$mustreply;exit;
                $query2 = $db->query("SELECT tid,authorid FROM cdb_posts WHERE tid=".$mustreply." AND authorid=".$uid);
                if ($result = $db->fetch_array($query2)) {					$db->close();
                    echo '<mustreply>yes</mustreply>';
                }else {
                    echo '<mustreply>no</mustreply>';
                }
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