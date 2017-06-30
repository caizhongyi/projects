<?php
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');
include model('setting');
$do = !empty($_GPC['do']) ? $_GPC['do'] : 'display';
$mtypes = array();
$mtypes['text'] = '文本消息(重要)';
$mtypes['image'] = '图片消息';
$mtypes['voice'] = '语音消息';
$mtypes['video'] = '视频消息';
$mtypes['location'] = '位置消息';
$mtypes['link'] = '链接消息';
$mtypes['subscribe'] = '粉丝开始关注';
$mtypes['unsubscribe'] = '粉丝取消关注';
$mtypes['click'] = '菜单消息';
$versions = array();
$versions[] = '0.5';

$available = array();
$available['download'] = class_exists('PharData');
$available['create'] = @is_writable(IA_ROOT . '/source/modules');

$m = array();
$m['platform'] = array();
$m['platform']['subscribes'] = array();
$m['platform']['handles'] = array();
$m['site'] = array();
$m['versions'] = array();
if(checksubmit() && $available[$_GPC['method']]) {
	$m['application']['name'] = trim($_GPC['application']['name']);
	if(empty($m['application']['name'])) {
		message('必须输入模块名称. ');
	}
	$m['application']['identifie'] = trim($_GPC['application']['identifie']);
	if(empty($m['application']['identifie']) || !preg_match('/^[a-z][a-z\d]+$/i', $m['application']['identifie'])) {
		message('必须输入模块标识符(仅支持字母和数字, 且只能以字母开头). ');
	}
	$m['application']['version'] = trim($_GPC['application']['version']);
	if(empty($m['application']['version']) || !preg_match('/^[\d\.]+$/i', $m['application']['version'])) {
		message('必须输入模块版本号(仅支持数字和句点). ');
	}
	$m['application']['ability'] = trim($_GPC['application']['ability']);
	if(empty($m['application']['ability'])) {
		message('必须输入模块功能简述. ');
	}
	$m['application']['description'] = trim($_GPC['application']['description']);
	$m['application']['author'] = trim($_GPC['application']['author']);
	$m['application']['url'] = trim($_GPC['application']['url']);
	$m['application']['setting'] = $_GPC['application']['setting'] == 'true';
	if(is_array($_GPC['subscribes'])) {
		foreach($_GPC['subscribes'] as $s) {
			if(array_key_exists($s, $mtypes)) {
				$m['platform']['subscribes'][] = $s;
			}
		}
	}
	if(is_array($_GPC['handles'])) {
		foreach($_GPC['handles'] as $s) {
			if(array_key_exists($s, $mtypes) && $s != 'unsubscribe') {
				$m['platform']['handles'][] = $s;
			}
		}
	}
	$m['platform']['rule'] = $_GPC['platform']['rule'] == 'true';
	if($m['platform']['rule']) {
		if(!in_array('text', $m['platform']['handles'])) {
			$m['platform']['handles'][] = 'text';
		}
	}
	if($m['platform']['rule'] && is_array($_GPC['options']) && is_array($_GPC['options']['titles']) && is_array($_GPC['options']['dos']) && is_array($_GPC['options']['states'])) {
		$m['platform']['options'] = array();
		foreach($_GPC['options']['titles'] as $k => $t) {
			$opt = array();
			$opt['title'] = htmlspecialchars(trim($t));
			$opt['do'] = $_GPC['options']['dos'][$k];
			$opt['state'] = urlencode($_GPC['options']['states'][$k]);
			if($opt['title'] != '' && preg_match('/^[a-z\d]+$/i', $opt['do'])) {
				$m['platform']['options'][] = $opt;
			}
		}
	}
	$m['platform']['menu'] = $_GPC['platform']['menu'] == 'true';
	if($m['platform']['menu'] && is_array($_GPC['platform']) && is_array($_GPC['platform']['titles']) && is_array($_GPC['platform']['dos'])) {
		$m['platform']['menus'] = array();
		foreach($_GPC['platform']['titles'] as $k => $t) {
			$opt = array();
			$opt['title'] = htmlspecialchars(trim($t));
			$opt['do'] = $_GPC['platform']['dos'][$k];
			if($opt['title'] != '' && preg_match('/^[a-z\d]+$/i', $opt['do'])) {
				$m['platform']['menus'][] = $opt;
			}
		}
	}
	$m['site']['home'] = $_GPC['site']['home'] == 'true';
	$m['site']['profile'] = $_GPC['site']['profile'] == 'true';
	$m['site']['menu'] = $_GPC['site']['menu'] == 'true';
	if($m['site']['menu'] && is_array($_GPC['site']) && is_array($_GPC['site']['titles']) && is_array($_GPC['site']['dos'])) {
		$m['site']['menus'] = array();
		foreach($_GPC['site']['titles'] as $k => $t) {
			$opt = array();
			$opt['title'] = htmlspecialchars(trim($t));
			$opt['do'] = $_GPC['site']['dos'][$k];
			if($opt['title'] != '' && preg_match('/^[a-z\d]+$/i', $opt['do'])) {
				$m['site']['menus'][] = $opt;
			}
		}
	}
	if(is_array($_GPC['versions'])) {
		foreach($_GPC['versions'] as $ver) {
			if(in_array($ver, $versions)) {
				$m['versions'][] = $ver;
			}
		}
	}
	$m['install'] = trim($_GPC['install']);
	$m['uninstall'] = trim($_GPC['uninstall']);
	$m['upgrade'] = trim($_GPC['upgrade']);
	if($_FILES['icon'] && $_FILES['icon']['error'] == '0' && !empty($_FILES['icon']['tmp_name'])) {
		$m['icon'] = $_FILES['icon']['tmp_name'];
	}
	if($_FILES['preview'] && $_FILES['preview']['error'] == '0' && !empty($_FILES['preview']['tmp_name'])) {
		$m['preview'] = $_FILES['preview']['tmp_name'];
	}
	$manifest = manifest($m);
	$mDefine = define_module($m);
	$pDefine = define_processor($m);
	$rDefine = define_receiver($m);
	$sDefine = define_site($m);
	$ident = strtolower($m['application']['identifie']);
	if($_GPC['method'] == 'create') {
		$mRoot = IA_ROOT . "/source/modules/{$ident}";
		if(file_exists($mRoot)) {
			message("目标位置 {$mRoot} 已存在, 请更换标识或删除现有内容. ");
		}
		mkdirs($mRoot);
		f_write("{$mRoot}/manifest.xml", $manifest);
		if($mDefine) {
			f_write("{$mRoot}/module.php", $mDefine);
		}
		if($pDefine) {
			f_write("{$mRoot}/processor.php", $pDefine);
		}
		if($rDefine) {
			f_write("{$mRoot}/receiver.php", $rDefine);
		}
		if($sDefine) {
			f_write("{$mRoot}/site.php", $sDefine);
		}
		mkdirs("{$mRoot}/template");
		if($m['application']['setting']) {
			f_write("{$mRoot}/template/setting.html", "{template 'common/header'}\r\n这里定义页面内容\r\n{template 'common/footer'}");
		}
		if($m['icon']) {
			file_move($m['icon'], "{$mRoot}/icon.jpg");
		}
		if($m['preview']) {
			file_move($m['preview'], "{$mRoot}/preview.jpg");
		}
		message("生成成功. 请访问 {$mRoot} 继续实现你的模块.", 'refresh');
	}
	if($_GPC['method'] == 'download') {
		$fname = IA_ROOT . "/data/tmp.tar";
		$phar = new PharData($fname);
		$phar->addFromString('/manifest.xml', $manifest);
		if($mDefine) {
			$phar->addFromString('/module.php', $mDefine);
		}
		if($pDefine) {
			$phar->addFromString('/processor.php', $pDefine);
		}
		if($rDefine) {
			$phar->addFromString('/receiver.php', $rDefine);
		}
		if($sDefine) {
			$phar->addFromString('/site.php', $sDefine);
		}
		$phar->addEmptyDir('/template');
		if($m['application']['setting']) {
			$phar->addFromString("/template/setting.html", "{template 'common/header'}\r\n这里定义页面内容\r\n{template 'common/footer'}");
		}
		if($m['icon']) {
			$phar->addFile($m['icon'], '/icon.jpg');
			@unlink($m['icon']);
		}
		if($m['preview']) {
			$phar->addFile($m['preview'], '/preview.jpg');
			@unlink($m['preview']);
		}
		header('content-type: application/tar');
		header('content-disposition: attachment; filename="' . $ident . '.tar"');
		readfile($fname);
		unset($phar);
		Phar::unlinkArchive($fname);
	}

}

template('setting/designer');

function manifest($m) {
	$versions = implode(',', $m['versions']);
	$setting = $m['application']['setting'] ? 'true' : 'false';
	$subscribes = '';
	foreach($m['platform']['subscribes'] as $s) {
		$subscribes .= "\r\n\t\t\t<message type=\"{$s}\" />";
	}
	$handles = '';
	foreach($m['platform']['handles'] as $h) {
		$handles .= "\r\n\t\t\t<message type=\"{$h}\" />";
	}
	$rule = $m['platform']['rule'] ? 'true' : 'false';
	$options = '';
	if(is_array($m['platform']['options'])) {
		foreach($m['platform']['options'] as $o) {
			$options .= "\r\n\t\t\t<option title=\"{$o['title']}\" do=\"{$o['do']}\" state=\"{$o['state']}\" />";
		}
	}
	$pMenu = $m['platform']['menu'] ? 'true' : 'false';
	$pMenus = '';
	if(is_array($m['platform']['menus'])) {
		foreach($m['platform']['menus'] as $o) {
			$pMenus .= "\r\n\t\t\t<menu title=\"{$o['title']}\" do=\"{$o['do']}\" />";
		}
	}
	$home = $m['site']['home'] ? 'true' : 'false';
	$profile = $m['site']['profile'] ? 'true' : 'false';
	$sMenu = $m['site']['menu'] ? 'true' : 'false';
	$sMenus = '';
	if(is_array($m['site']['menus'])) {
		foreach($m['site']['menus'] as $o) {
			$sMenus .= "\r\n\t\t\t<menu title=\"{$o['title']}\" do=\"{$o['do']}\" />";
		}
	}
	$tpl = <<<TPL
<?xml version="1.0" encoding="utf-8"?>
<manifest versionCode="{$versions}">
	<application setting="{$setting}">
		<name><![CDATA[{$m['application']['name']}]]></name>
		<identifie><![CDATA[{$m['application']['identifie']}]]></identifie>
		<version><![CDATA[{$m['application']['version']}]]></version>
		<ability><![CDATA[{$m['application']['ability']}]]></ability>
		<description><![CDATA[{$m['application']['description']}]]></description>
		<author><![CDATA[{$m['application']['author']}]]></author>
		<url><![CDATA[{$m['application']['url']}]]></url>
	</application>
	<platform>
		<subscribes>{$subscribes}
		</subscribes>
		<handles>{$handles}
		</handles>
		<rule embed="{$rule}">{$options}
		</rule>
		<menus embed="{$pMenu}">{$pMenus}
		</menus>
	</platform>
	<site>
		<home embed="{$home}" />
		<profile embed="{$profile}" />
		<menus embed="{$sMenu}">{$sMenus}
		</menus>
	</site>
	<install><![CDATA[{$m['install']}]]></install>
	<uninstall><![CDATA[{$m['uninstall']}]]></uninstall>
	<upgrade><![CDATA[{$m['upgrade']}]]></upgrade>
</manifest>
TPL;
	return ltrim($tpl);
}

function define_module($m) {
	$name = ucfirst($m['application']['identifie']);

	$rule = '';
	if($m['platform']['rule']) {
		$rule = <<<TPL
	public function fieldsFormDisplay(\$rid = 0) {
		//要嵌入规则编辑页的自定义内容，这里 \$rid 为对应的规则编号，新增时为 0
	}

	public function fieldsFormValidate(\$rid = 0) {
		//规则编辑保存时，要进行的数据验证，返回空串表示验证无误，返回其他字符串将呈现为错误提示。这里 \$rid 为对应的规则编号，新增时为 0
		return '';
	}

	public function fieldsFormSubmit(\$rid) {
		//规则验证无误保存入库时执行，这里应该进行自定义字段的保存。这里 \$rid 为对应的规则编号
	}

	public function ruleDeleted(\$rid) {
		//删除规则时调用，这里 \$rid 为对应的规则编号
	}

TPL;
	}

	$setting = '';
	if($m['application']['setting']) {
		$setting = <<<TPL
	public function settingsDisplay(\$settings) {
		//点击模块设置时将调用此方法呈现模块设置页面，\$settings 为模块设置参数, 结构为数组。这个参数系统针对不同公众账号独立保存。
		//在此呈现页面中自行处理post请求并保存设置参数（通过使用\$this->saveSettings()来实现）
		if(checksubmit()) {
			//字段验证, 并获得正确的数据\$dat
			\$this->saveSettings(\$dat);
		}
		//这里来展示设置项表单
		include \$this->template('settings');
	}

TPL;
	}

	$dos = '';
	if(is_array($m['platform']['options'])) {
		foreach($m['platform']['options'] as $opt) {
			$dName = ucfirst($opt['do']);
			$dos .= <<<TPL
	public function do{$dName}(\$rid, \$state) {
		//这个操作被定义用来呈现规则的扩展操作，\$rid 为规则编号，\$state 为设定好的附加数据，可能为空
	}

TPL;
		}
	}
	if(is_array($m['platform']['menus'])) {
		foreach($m['platform']['menus'] as $opt) {
			$dName = ucfirst($opt['do']);
			$dos .= <<<TPL
	public function do{$dName}() {
		//这个操作被定义用来呈现主导航栏上扩展菜单，每个模块只能呈现一个扩展菜单，有更多选项，请在页面内使用标签页来表示
	}

TPL;
		}
	}
	$tpl = <<<TPL
<?php
/**
 * {$m['application']['name']}模块定义
 *
 * @author {$m['application']['author']}
 * @url {$m['application']['url']}
 */
defined('IN_IA') or exit('Access Denied');

class {$name}Module extends WeModule {
{$rule}
{$setting}
{$dos}
}
TPL;
	return ltrim($tpl);
}

function define_processor($m) {
	$name = ucfirst($m['application']['identifie']);
	$tpl = '';
	if($m['platform']['handles']) {
	$tpl = <<<TPL
<?php
/**
 * {$m['application']['name']}模块处理程序
 *
 * @author {$m['application']['author']}
 * @url {$m['application']['url']}
 */
defined('IN_IA') or exit('Access Denied');

class {$name}ModuleProcessor extends WeModuleProcessor {
	public function respond() {
		\$content = \$this->message['content'];
		//这里定义此模块进行消息处理时的具体过程, 请查看微擎文档来编写你的代码
	}
}
TPL;
	}
	return ltrim($tpl);
}

function define_receiver($m) {
	$name = ucfirst($m['application']['identifie']);
	$tpl = '';
	if($m['platform']['subscribes']) {
	$tpl = <<<TPL
<?php
/**
 * {$m['application']['name']}模块订阅器
 *
 * @author {$m['application']['author']}
 * @url {$m['application']['url']}
 */
defined('IN_IA') or exit('Access Denied');

class {$name}ModuleReceiver extends WeModuleReceiver {
	public function receive() {
		\$type = \$this->message['type'];
		//这里定义此模块进行消息订阅时的, 消息到达以后的具体处理过程, 请查看微擎文档来编写你的代码
	}
}
TPL;
	}
	return ltrim($tpl);
}

function define_site($m) {
	$name = ucfirst($m['application']['identifie']);
	$tpl = '';
	if($m['site']['home'] || $m['site']['profile'] || !empty($m['site']['menu'])) {
		$home = '';
		if($m['site']['home']) {
			$home .= <<<TPL
	public function getHomeTiles() {
		//这个操作被定义用来呈现微站主页上的导航图标，返回值为数组结构, 每个元素将被呈现为一个链接. 元素结构为 array('title'=>'标题', 'url'=>'链接目标')
	}

TPL;
		}

		$profile = '';
		if($m['site']['profile']) {
			$profile .= <<<TPL
	public function getProfileTiles() {
		//这个操作被定义用来呈现微站个人中心上的管理链接，返回值为数组结构, 每个元素将被呈现为一个链接. 元素结构为 array('title'=>'标题', url'=>'链接目标')
	}

TPL;
		}

		$dos = '';
		if(is_array($m['site']['menus'])) {
			foreach($m['site']['menus'] as $opt) {
				$dName = ucfirst($opt['do']);
				$dos .= <<<TPL
	public function doWeb{$dName}() {
		//这个操作被定义用来呈现主导航栏上扩展菜单，每个模块只能呈现一个扩展菜单，有更多选项，请在页面内使用标签页来表示
	}

TPL;
			}
		}

		$tpl = <<<TPL
<?php
/**
 * {$m['application']['name']}模块微站定义
 *
 * @author {$m['application']['author']}
 * @url {$m['application']['url']}
 */
defined('IN_IA') or exit('Access Denied');

class {$name}ModuleSite extends WeModuleSite {

{$home}
{$profile}
{$dos}
}
TPL;
	}
	return ltrim($tpl);
}

function f_write($filename, $data) {
	global $_W;
	mkdirs(dirname($filename));
	file_put_contents($filename, $data);
	@chmod($filename, $_W['config']['setting']['filemode']);
	return is_file($filename);
}
