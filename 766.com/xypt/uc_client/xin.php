<?
/**
 * FOR DZ6.1
 * 新游发号系统---总积分、经验值、乐乐币、今日发帖量
 */
if ($pphash != '4798134cdc14b4cb94544f66e82c7cca') {
	$action = '';
}
require_once '../include/common.inc.php';
require_once 'client.php';
$m = date('m',time());
$d = date('d',time());
$y = date('Y',time());
$todaystart = mktime(0,0,0,$m,$d,$y);
$todayend = mktime(23,59,59,$m,$d,$y);
switch ($action) {
	case 'login':
		if ($uid) {
                    $query = $db->query("SELECT uid,username,regdate,credits,posts,extcredits1,extcredits2 FROM cdb_members WHERE uid = '$uid'");
                    if ($record = $db->fetch_array($query)) {
                        $extcredits1 = $record['extcredits1'];
                        $extcredits2 = $record['extcredits2'];
						$regdate = $record['regdate'];
                        $posts = $record['posts'];
                        $credits = $record['credits'];
						$query2 = $db->query("SELECT COUNT(*) AS todayposts FROM cdb_posts WHERE authorid='$uid' AND dateline BETWEEN $todaystart AND $todayend");
						if ($record2 = $db->fetch_array($query2)) {
							$todayposts = $record2['todayposts'];
						}
						$db->close();
                        echo '<extcredits1>'.$extcredits1 .'</extcredits1><extcredits2>'.$extcredits2 .'</extcredits2><posts>'.$posts.'</posts><credits>'.$credits.'</credits><regdate>'.$regdate.'</regdate><todayposts>'.$todayposts.'</todayposts>';
                    }
                }else {
			echo '<actionstat>0</actionstat><userid>0</userid>';
		 }
		break;
        case 'update':
            if ($uid) {
                //更新论坛经验值和乐乐币
                $result = $db->query("UPDATE cdb_members SET extcredits1=$ext1,extcredits2=$ext2 WHERE uid=$uid");
				$db->close();
				echo '<update>'.$result.'</update>';
            }
            break;
        case 'posts':
            if ($uid) {
                //查询用户是否已经回复了帖子
                //echo "SELECT tid,authorid FROM cdb_posts WHERE tid=".$mustreply;exit;
                $query2 = $db->query("SELECT tid,authorid FROM cdb_posts WHERE tid=".$mustreply." AND authorid=".$uid);
                if ($result = $db->fetch_array($query2)) {
                    echo '<mustreply>yes</mustreply>';
                }else {
                    echo '<mustreply>no</mustreply>';
                }
				$db->close();
            }
            break;
		case 'suid':
			if ($uid) {
				//查询所赠送的UID是否存在
				$query3 = $db->query("SELECT uid,username FROM cdb_members WHERE uid = '$uid'");
				if ($result3 = $db->fetch_array($query3)) {
					echo '<uid>yes</uid>';
				}else {
					echo '<uid>no</uid>';
				}
				$db->close();
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