<?php 
/**
 * 用于微擎版本数据升级到0.4版
 * 
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
require './source/bootstrap.inc.php';
require IA_ROOT . '/source/model/setting.mod.php';

define('IMS_UPDATE_VERSION', '0.5');
$actions = array('', 'show_description', 'database_struct', 'database_data', 'cleanup', 'finish');
$action = $action = in_array($_GET['action'], $actions) ? $_GET['action'] : '';
$step = max(intval($_GET['step']), 1);

if (empty($action)) {
	$action = isset($actions[$step]) ? $actions[$step] : '';
} else {
	$step = array_keys($actions, $action);
}

if (file_exists(IA_ROOT . '/data/update.lock') && $action != 'finish') {
	exit('请删除“data/update.lock”文件后运行此升级文件！');
}

if (IMS_VERSION > IMS_UPDATE_VERSION) {
	exit('你当前使用的版本为'.IMS_VERSION.'，无需使用此升级程序！');
}
header('Content-Type: text/html; charset=utf-8');
if ($action == 'show_description') {
?>
<p>本程序用于“微擎 - 微信公众平台自助引擎”v<?php echo IMS_UPDATE_VERSION ?> 版本数据升级用。</p>
<p>升级前请强烈建议您备份好数据！确认升级请点击<a href="?step=2">“开始升级”</a></p>
<?php 
} elseif ($action == 'database_struct') {
	dropfield('wechats', 'fans');
	dropfield('wechats', 'menuset');
	dropfield('modules', 'settings');

	$sql = <<<EOF
CREATE TABLE IF NOT EXISTS `ims_site_nav` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `displayorder` smallint(5) unsigned NOT NULL COMMENT '排序',
  `name` varchar(50) NOT NULL COMMENT '导航名称',
  `position` tinyint(4) NOT NULL DEFAULT '1' COMMENT '显示位置，1首页，2个人中心',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '链接地址',
  `icon` varchar(500) NOT NULL DEFAULT '' COMMENT '图标',
  `css` varchar(1000) NOT NULL DEFAULT '' COMMENT '扩展CSS',
  `issystem` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否是系统内置菜单',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '0为隐藏，1为显示',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ;
 
CREATE TABLE IF NOT EXISTS `ims_site_styles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `templateid` int(10) unsigned NOT NULL COMMENT '风格ID',
  `variable` varchar(50) NOT NULL COMMENT '模板预设变量',
  `content` varchar(100) NOT NULL COMMENT '变量值',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
 
CREATE TABLE IF NOT EXISTS `ims_site_templates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '标识',
  `title` varchar(30) NOT NULL COMMENT '名称',
  `description` varchar(500) NOT NULL DEFAULT '' COMMENT '描述',
  `author` varchar(50) NOT NULL COMMENT '作者',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '发布页面',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
 
CREATE TABLE IF NOT EXISTS `ims_sessions` (
  `sid` char(32) NOT NULL DEFAULT '' COMMENT 'sessionid唯一标识',
  `weid` int(10) unsigned NOT NULL COMMENT '所属公众号',
  `from_user` varchar(50) NOT NULL COMMENT '用户唯一标识',
  `data` varchar(500) NOT NULL,
  `expiretime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '超时时间',
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
	
EOF;
	runquery($sql);
	$sql = <<<EOF
	ALTER TABLE `ims_rule` ADD `displayorder` INT UNSIGNED NOT NULL DEFAULT '0' COMMENT '规则排序';
	ALTER TABLE `ims_rule` ADD `status` TINYINT( 1 ) UNSIGNED NOT NULL DEFAULT '1' COMMENT '规则状态，0禁用，1启用，2置顶';
	ALTER TABLE `ims_rule_keyword` ADD `displayorder` TINYINT( 3 ) UNSIGNED NOT NULL DEFAULT '1' COMMENT '规则排序，255为置顶，其它为普通排序';
	ALTER TABLE `ims_rule_keyword` ADD `status` TINYINT( 1 ) UNSIGNED NOT NULL DEFAULT '1' COMMENT '规则状态，0禁用，1启用';
	ALTER TABLE `ims_wechats` ADD `type` TINYINT( 1 ) UNSIGNED NOT NULL DEFAULT '1' COMMENT '公众号类型，1微信，2易信' AFTER `hash`;
	ALTER TABLE `ims_wechats` ADD `access_token` VARCHAR( 300 ) NOT NULL DEFAULT '' COMMENT  '存取凭证结构' AFTER  `token`;
	ALTER TABLE `ims_wechats` ADD `styleid` INT UNSIGNED NOT NULL DEFAULT '1' COMMENT '风格ID';
	ALTER TABLE `ims_wechats` ADD `default_message` VARCHAR( 500 ) NOT NULL DEFAULT '';
	ALTER TABLE `ims_modules` CHANGE `version` `version` varchar(10) NOT NULL DEFAULT '' COMMENT '版本' AFTER `title`;
	ALTER TABLE `ims_modules` CHANGE `menus` `options` varchar(1000) NOT NULL DEFAULT '' COMMENT '扩展功能导航项';
	ALTER TABLE `ims_modules` CHANGE `author` `author` varchar(50) NOT NULL COMMENT '作者' AFTER `description`;
	ALTER TABLE `ims_modules` ADD `url` varchar(255) NOT NULL COMMENT '发布页面' AFTER `author`;
	ALTER TABLE `ims_modules` CHANGE `issettings` `settings` tinyint(1) NOT NULL DEFAULT '0' COMMENT '扩展设置项' AFTER `url`;
	ALTER TABLE `ims_modules` ADD `subscribes` varchar(500) NOT NULL DEFAULT '' COMMENT '订阅的消息类型' AFTER `settings`;
	ALTER TABLE `ims_modules` ADD `handles` varchar(500) NOT NULL DEFAULT '' COMMENT '能够直接处理的消息类型' AFTER `subscribes`;
	ALTER TABLE `ims_modules` CHANGE `rulefields` `isrulefields` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否有规则嵌入项' AFTER `handles`;
	ALTER TABLE `ims_modules` ADD `home` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否微站首页嵌入' AFTER `isrulefields`;
	ALTER TABLE `ims_modules` ADD `profile` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否个人中心嵌入';
	ALTER TABLE `ims_modules` ADD `site_menus` varchar(1000) NOT NULL DEFAULT '' COMMENT '微站功能扩展导航项';
	ALTER TABLE `ims_modules` ADD `platform_menus` varchar(1000) NOT NULL DEFAULT '' COMMENT '微站功能扩展导航项';
	ALTER TABLE `ims_wechats_modules` ADD `settings` varchar(1000) NOT NULL DEFAULT '';
	ALTER TABLE `ims_fans` CHANGE `follow` `follow` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否订阅' AFTER `from_user`;
	ALTER TABLE `ims_fans` CHANGE `createtime` `createtime` int(10) unsigned NOT NULL COMMENT '加入时间' AFTER `follow`;
	ALTER TABLE `ims_fans` ADD `salt` CHAR( 8 ) NOT NULL DEFAULT '' COMMENT '加密盐' AFTER `from_user` ;
EOF;
	preg_match_all("/ALTER TABLE `ims_(.*?)` (ADD|CHANGE) `(.*?)` (?:`(.*?)`)?(.*?);/", $sql, $match);
	if (!empty($match[0])) {
		foreach ($match[0] as $index => $sql) {
			$table = $match[1][$index];
			$field = $match[3][$index];
			$operation = $match[2][$index];
			$change = $match[4][$index];
			$extra = $match[5][$index];
			
			if ($operation == 'ADD') {
				if (!fieldexists($table, $field)) {
					pdo_query("ALTER TABLE ".tablename($table)." ADD `{$field}` {$extra};");
				}
			} elseif ($operation == 'CHANGE') {
				if (fieldexists($table, $field)) {
					pdo_query("ALTER TABLE ".tablename($table)." CHANGE `{$field}` `{$change}` {$extra};");
				} else {
					if (!fieldexists($table, $change)) {
						pdo_query("ALTER TABLE ".tablename($table)." ADD `{$change}` {$extra};");
					}
				}
			}
		}
	}
	$struct = cache_build_fans_struct();
	$fanssql = array(
		'fakeid' => "ADD `fakeid` VARCHAR( 30 ) NOT NULL DEFAULT ''",
		'vip' => "ADD `vip` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT 'VIP级别,0为普通会员'",
		'gender' => "ADD `gender` tinyint(1) NOT NULL DEFAULT '0' COMMENT '性别(0:保密 1:男 2:女)'",
		'birthyear' => "ADD `birthyear` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '生日年'",
		'birthmonth' => "ADD `birthmonth` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '生日月'",
		'birthday' => "ADD `birthday` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '生日'",
		'constellation' => "ADD `constellation` varchar(10) NOT NULL DEFAULT '' COMMENT '星座'",
		'zodiac' => "ADD `zodiac` varchar(5) NOT NULL DEFAULT '' COMMENT '生肖'",
		'telephone' => "ADD `telephone` varchar(15) NOT NULL DEFAULT '' COMMENT '固定电话'",
		'idcard' => "ADD `idcard` varchar(30) NOT NULL DEFAULT '' COMMENT '证件号码'",
		'studentid' => "ADD `studentid` varchar(50) NOT NULL DEFAULT '' COMMENT '学号'",
		'grade' => "ADD `grade` varchar(10) NOT NULL DEFAULT '' COMMENT '班级'",
		'address' => "ADD `address` varchar(255) NOT NULL DEFAULT '' COMMENT '邮寄地址'",
		'zipcode' => "ADD `zipcode` varchar(10) NOT NULL DEFAULT '' COMMENT '邮编'",
		'nationality' => "ADD `nationality` varchar(30) NOT NULL DEFAULT '' COMMENT '国籍'",
		'resideprovince' => "ADD `resideprovince` varchar(30) NOT NULL DEFAULT '' COMMENT '居住省份'",
		'residecity' => "ADD `residecity` varchar(30) NOT NULL DEFAULT '' COMMENT '居住城市'",
		'residedist' => "ADD `residedist` varchar(30) NOT NULL DEFAULT '' COMMENT '居住行政区/县'",
		'graduateschool' => "ADD `graduateschool` varchar(50) NOT NULL DEFAULT '' COMMENT '毕业学校'",
		'company' => "ADD `company` varchar(50) NOT NULL DEFAULT '' COMMENT '公司'",
		'education' => "ADD `education` varchar(10) NOT NULL DEFAULT '' COMMENT '学历'",
		'occupation' => "ADD `occupation` varchar(30) NOT NULL DEFAULT '' COMMENT '职业'",
		'position' => "ADD `position` varchar(30) NOT NULL DEFAULT '' COMMENT '职位'",
		'revenue' => "ADD `revenue` varchar(10) NOT NULL DEFAULT '' COMMENT '年收入'",
		'affectivestatus' => "ADD `affectivestatus` varchar(30) NOT NULL DEFAULT '' COMMENT '情感状态'",
		'lookingfor' => "ADD `lookingfor` varchar(255) NOT NULL DEFAULT '' COMMENT ' 交友目的'",
		'bloodtype' => "ADD `bloodtype` varchar(5) NOT NULL DEFAULT '' COMMENT '血型'",
		'height' => "ADD `height` varchar(5) NOT NULL DEFAULT '' COMMENT '身高'",
		'weight' => "ADD `weight` varchar(5) NOT NULL DEFAULT '' COMMENT '体重'",
		'alipay' => "ADD `alipay` varchar(30) NOT NULL DEFAULT '' COMMENT '支付宝帐号'",
		'msn' => "ADD `msn` varchar(30) NOT NULL DEFAULT '' COMMENT 'MSN'",
		'email' => "ADD `email` varchar(50) NOT NULL DEFAULT '' COMMENT '电子邮箱'",
		'taobao' => "ADD `taobao` varchar(30) NOT NULL DEFAULT '' COMMENT '阿里旺旺'",
		'site' => "ADD `site` varchar(30) NOT NULL DEFAULT '' COMMENT '主页'",
		'bio' => "ADD `bio` text NOT NULL COMMENT '自我介绍'",
		'interest' => "ADD `interest` text NOT NULL COMMENT '兴趣爱好'",
	);
	if (!empty($fanssql)) {
		foreach ($fanssql as $field => $sql) {
			if (!in_array($field, $struct)) {
				runquery("ALTER TABLE `ims_fans` {$sql};");
			}
		}
	}
?>
	<p>数据库结构更新完成，正在进行数据更新！如果浏览器未自动跳转，请点击<a href="?step=3">“下一步”</a></p>
	<script type="text/javascript">
		setTimeout(function(){
			location.href = '?step=3';
		}, 2000);
	</script>
<?php 
} elseif ($action == 'database_data') {
	
	$template = array(
		'id' => 1,
		'name' => 'default',
		'title' => '微站默认模板',
		'description' => '由微擎提供默认微站模板套系',
		'author' => 'WeEngine Team',
		'url' => 'http://we7.cc',
	);
	if (pdo_fetchcolumn("SELECT id FROM ".tablename('site_templates')." WHERE id = 1")) {
		pdo_update('site_templates', $template, array('id' => 1));
	} else {
		pdo_insert('site_templates', $template);
	}
	$sql = <<<EOF
INSERT INTO `ims_site_styles` (`templateid`, `variable`, `content`) VALUES
(1, 'indexbgcolor', '#e06666'),
(1, 'fontfamily', 'Tahoma,Helvetica,''SimSun'',sans-serif'),
(1, 'fontsize', '12px/1.5'),
(1, 'fontcolor', '#434343'),
(1, 'fontnavcolor', '#666666'),
(1, 'linkcolor', '#ffffff'),
(1, 'indexbgimg', 'bg_index.jpg');

INSERT INTO `ims_modules` (`name`, `title`, `version`, `ability`, `description`, `author`, `url`, `settings`, `subscribes`, `handles`, `isrulefields`, `options`, `issystem`, `platform_menus`, `home`, `profile`, `site_menus`) VALUES
('fans', '粉丝管理', '1.0', '提供关注的粉丝管理功能', '具有记录粉丝关注及取消关注功能，并集成粉丝个人中心，提供粉丝的常用个人资料管理', 'WeEngine Team', 'http://bbs.we7.cc/forum.php?mod=forumdisplay&amp;fid=36&amp;filter=typeid&amp;typeid=1', '0', 'a:8:{i:0;s:4:"text";i:1;s:5:"image";i:2;s:5:"voice";i:3;s:5:"video";i:4;s:8:"location";i:5;s:4:"link";i:6;s:9:"subscribe";i:7;s:11:"unsubscribe";}', 'a:0:{}', 0, 'a:0:{}', 0, 'a:0:{}', 0, 1, 'a:0:{}'),
('stat', '微擎数据统计', '1.0.2', '提供消息记录及分析统计功能', '能够提供按公众号码查询, 分析统计消息记录, 以及规则关键字命中情况统计', 'WeEngine Team', 'http://bbs.we7.cc/forum.php?mod=forumdisplay&amp;fid=36&amp;filter=typeid&amp;typeid=1', '1', 'a:7:{i:0;s:4:"text";i:1;s:5:"image";i:2;s:8:"location";i:3;s:4:"link";i:4;s:9:"subscribe";i:5;s:11:"unsubscribe";i:6;s:5:"click";}', 'a:7:{i:0;s:4:"text";i:1;s:5:"image";i:2;s:8:"location";i:3;s:4:"link";i:4;s:9:"subscribe";i:5;s:11:"unsubscribe";i:6;s:5:"click";}', 0, 'a:0:{}', 0, 'a:0:{}', 0, 0, 'a:0:{}');
EOF;
	runquery($sql);
?>
	<p>数据库数据更新完成，正在进行数据清理！如果浏览器未自动跳转，请点击<a href="?step=4">“下一步”</a></p>
	<script type="text/javascript">
		setTimeout(function(){
			location.href = '?step=4';
		}, 2000);
	</script>
<?php 	
} elseif ($action == 'cleanup') {
	$sql = <<<EOF

EOF;
	runquery($sql);
	rmdirs(IA_ROOT . '/data/tpl/default', true);
	$users = pdo_fetchall("SELECT uid FROM ".tablename('members') . " WHERE status > '-1'", array(), 'uid');
	if (!empty($users)) {
		foreach ($users as $uid => $user) {
			setting_cache_account_by_uid($uid);
		}
	}
	//cache_build_announcement();
	cache_build_modules();
	cache_build_fans_struct();
	cache_build_hook();
	cache_build_setting();
?>
	<p>数据清理完成！如果浏览器未自动跳转，请点击<a href="?step=5">“下一步”</a></p>
	<script type="text/javascript">
		setTimeout(function(){
			location.href = '?step=5';
		}, 2000);
	</script>
<?php 
} elseif ($action == 'finish') {
	touch(IA_ROOT . '/data/update.lock');
	exit('升级完成！<a href="index.php">体验微擎</a>');
}

function runquery($sql) {
	global $_W;
	$dbprefix = $_W['config']['db']['tablepre'];
	if(!isset($sql) || empty($sql)) return;

	$sql = str_replace("\r", "\n", str_replace(' ims_', ' '.$dbprefix, $sql));
	$sql = str_replace("\r", "\n", str_replace(' `ims_', ' `'.$dbprefix, $sql));

	$ret = array();
	$num = 0;
	foreach(explode(";\n", trim($sql)) as $query) {
		$ret[$num] = '';
		$queries = explode("\n", trim($query));
		foreach($queries as $query) {
			$ret[$num] .= (isset($query[0]) && $query[0] == '#') || (isset($query[1]) && isset($query[1]) && $query[0].$query[1] == '--') ? '' : $query;
		}
		$num++;
	}
	unset($sql);
	foreach($ret as $query) {
		$query = trim($query);
		if($query) {
			$result = pdo_query($query);
		}
	}
	return $result;
}

function dropfield($tablename, $fieldname = '') {
	if (fieldexists($tablename, $fieldname)) {
		pdo_query("ALTER TABLE ".tablename($tablename)." DROP `{$fieldname}`;");
	}
}

function fieldexists($tablename, $fieldname = '') {
	$isexists = pdo_fetch("DESCRIBE ".tablename($tablename)." `{$fieldname}`");
	return !empty($isexists) ? true : false;
}

