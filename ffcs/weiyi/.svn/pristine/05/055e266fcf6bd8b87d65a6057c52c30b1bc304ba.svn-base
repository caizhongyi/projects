<?php
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');
include model('setting');
$do = !empty($_GPC['do']) ? $_GPC['do'] : 'display';

if ($do == 'display') {
	$moduleids = array();
	$modules = pdo_fetchall("SELECT * FROM " . tablename('modules') . ' ORDER BY issystem DESC, `mid` ASC', array(), 'mid');
	if (!empty($modules)) {
		foreach ($modules as $mid => $module) {
			$manifest = setting_module_manifest($module['name']);
			if(is_array($manifest) && version_compare($module['version'], $manifest['application']['version']) == -1) {
				$modules[$mid]['upgrade'] = 1;
			}
			$moduleids[] = $module['name'];
		}
	}
	$uninstallModules = array();
	$path = IA_ROOT . '/source/modules/';
	if (is_dir($path)) {
		$uninstallModules = array();
		if ($handle = opendir($path)) {
			while (false !== ($modulepath = readdir($handle))) {
				$manifest = setting_module_manifest($modulepath);
				if (is_array($manifest) && !empty($manifest['application']['identifie']) && !in_array($manifest['application']['identifie'], $moduleids)) {
					$m = setting_module_convert($manifest);
					if(!in_array(IMS_VERSION, $manifest['versions'])) {
						$m['version_error'] = true;
					}
					$uninstallModules[] = $m;
					$moduleids[] = $manifest['application']['identifie'];
				} else {
					$ret = setting_module_manifest_compat($modulepath);
					$manifest = $ret['meta'];
					if (is_array($manifest) && !empty($manifest['application']['identifie']) && !in_array($manifest['application']['identifie'], $moduleids)) {
						$m = $ret['convert'];
						$m['version_error'] = true;
						$uninstallModules[] = $m;
						$moduleids[] = $manifest['application']['identifie'];
					}
				}
			}
		}
	}
	template('setting/module');
} elseif ($do == 'permission') {
	$id = $_GPC['id'];
	$module = pdo_fetch("SELECT mid, name FROM ".tablename('modules')." WHERE name = '{$id}'");
	$isinstall = false;
	if(!empty($module)) {
		$module = $_W['modules'][$module['name']];
		$isinstall = true;
		$manifest = setting_module_manifest($module['name']);
		if(is_array($manifest) && version_compare($module['version'], $manifest['application']['version']) == -1) {
			$module['upgrade'] = 1;
		}
	} else {
		$module = setting_module_manifest($id);
		if(is_array($module) && !empty($module)) {
			$module = setting_module_convert($module);
			$module['subscribes'] = iunserializer($module['subscribes']);
			$module['handles'] = iunserializer($module['handles']);
			$module['options'] = iunserializer($module['options']);
			$module['platform_menus'] = iunserializer($module['platform_menus']);
			$module['site_menus'] = iunserializer($module['site_menus']);
		}
		$isinstall = false;
	}
	if(empty($module)) {
		message('你访问的模块不存在. 请更新缓存, 或者检查你的模块目录来排错, 或者联系你的模块开发商. ');
	}
	$module['isinstall'] = $isinstall;

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

	template('setting/permission');
} elseif ($do == 'install') {
	$id = $_GPC['id'];
	$modulepath = IA_ROOT . '/source/modules/' . $id . '/';
	$manifest = setting_module_manifest($id);
	if (empty($manifest)) {
		message('模块安装配置文件不存在或是格式不正确！', '', 'error');
	}
	manifest_check($id, $manifest);
	if (pdo_fetchcolumn("SELECT mid FROM ".tablename('modules')." WHERE name = '{$manifest['application']['identifie']}'")) {
		message('模块已经安装或是唯一标识已存在！', '', 'error');
	}
	if (!file_exists($modulepath . 'processor.php') && !file_exists($modulepath . 'module.php') && !file_exists($modulepath . 'receiver.php') && !file_exists($modulepath . 'site.php')) {
		message('模块缺少处理文件！', '', 'error');
	}
	$module = setting_module_convert($manifest);
	if (pdo_insert('modules', $module)) {
		cache_build_modules();
		if (strexists($manifest['install'], '.php')) {
			if (file_exists($modulepath . $manifest['install'])) {
				include_once $modulepath . $manifest['install'];
			}
		} else {
			pdo_run($manifest['install']);
		}
		message('模块安装成功！', create_url('setting/module'), 'success');
	} else {
		message('模块安装失败, 请联系模块开发者！');
	}
} elseif ($do == 'uninstall') {
	if (!isset($_GPC['confirm'])) {
		message('卸载模块时同时删除规则数据吗？<a href="'.create_url('setting/module/uninstall', array('id' => $_GPC['id'], 'confirm' => 1)).'">是</a> &nbsp;&nbsp;<a href="'.create_url('setting/module/uninstall', array('id' => $_GPC['id'], 'confirm' => 1)).'">否</a>', '', 'tips');
	} else {
		$id = $_GPC['id'];
		$module = pdo_fetch("SELECT mid, name FROM ".tablename('modules')." WHERE name = '{$id}'");
		if (empty($module)) {
			message('模块已经被卸载或是不存在！', '', 'error');
		}
		if (!empty($module['issystem'])) {
			message('系统模块不能卸载！', '', 'error');
		}
		$modulepath = IA_ROOT . '/source/modules/' . $id . '/';
		$manifest = setting_module_manifest($module['name']);
		if (pdo_delete('modules', array('mid' => $module['mid']))) {
			pdo_delete('wechats_modules', array('mid' => $module['mid']));
			if ($_GPC['confirm'] == '1') {
				pdo_delete('rule', array('module' => $module['name']));
				pdo_delete('rule_keyword', array('module' => $module['name']));
			}
			cache_build_modules();
			if (!empty($manifest['uninstall'])) {
				if (strexists($manifest['uninstall'], '.php')) {
					if (file_exists($modulepath . $manifest['uninstall'])) {
						include_once $modulepath . $manifest['uninstall'];
					}
				} else {
					pdo_run($manifest['uninstall']);
				}
			}
			message('模块卸载成功！', create_url('setting/module'), 'success');
		} else {
			message('模块卸载失败, 请联系模块开发者！');
		}
	}
} elseif ($do == 'upgrade') {
	$id = $_GPC['id'];
	$module = pdo_fetch("SELECT * FROM ".tablename('modules')." WHERE name = '{$id}'");
	if (empty($module)) {
		message('模块已经被卸载或是不存在！', '', 'error');
	}
	$modulepath = IA_ROOT . '/source/modules/' . $id . '/';
	$manifest = setting_module_manifest($module['name']);
	if (empty($manifest)) {
		message('模块安装配置文件不存在或是格式不正确！', '', 'error');
	}
	manifest_check($id, $manifest);
	if(version_compare($module['version'], $manifest['application']['version']) != -1) {
		message('已安装的模块版本不低于要更新的版本, 操作无效.');
	}
	if (!file_exists($modulepath . 'processor.php') && !file_exists($modulepath . 'module.php') && !file_exists($modulepath . 'receiver.php') && !file_exists($modulepath . 'site.php')) {
		message('模块缺少处理文件！', '', 'error');
	}
	$module = setting_module_convert($manifest);
	if(pdo_update('modules', $module, array('name' => $id))) {
		cache_build_modules();
		if (!empty($manifest['upgrade'])) {
			if (strexists($manifest['upgrade'], '.php')) {
				if (file_exists($modulepath . $manifest['upgrade'])) {
					include_once $modulepath . $manifest['upgrade'];
				}
			} else {
				pdo_run($manifest['upgrade']);
			}
		}
		message('模块更新成功！', create_url('setting/module'), 'success');
	} else {
		message('模块更新失败, 请联系模块提供商！');
	}
} elseif ($do == 'convert') {
	$id = $_GPC['id'];
	if (pdo_fetchcolumn("SELECT mid FROM ".tablename('modules')." WHERE name = :name", array(':name' => $id))) {
		message('模块已经安装或是唯一标识已存在！', '', 'error');
	}
	$manifest = setting_module_manifest($id);
	if (!empty($manifest) && is_array($manifest)) {
		message('模块安装配置文件与当前版本兼容, 不需要转换！', '', 'error');
	}
	$m = setting_module_manifest_compat($id);
	if(empty($m) || empty($m['meta']) || empty($m['convert']) || empty($m['manifest'])) {
		message('您的模块定义文件完全不兼容, 系统不能支持自动转换. 请联系模块开发者解决.');
	}
	if($_GPC['confirm'] == '1') {
		header('content-type: paint/xml');
		header('content-disposition: attachment; filename="manifest.xml"');
		exit($m['manifest']);
	} else {
		message("当前的模块支持自动转换版本. 将会把模块\"{$m['convert']['title']}\"从版本\"{$m['convert']['compact']}\"转换至当前版本\"" . IMS_VERSION . "\", 继续操作会提示下载新的版本配置文件, 请将生成的配置文件置于模块目录下覆盖后重新安装(转换后有Bug请联系模块开发者), 是否要继续？<a href=\"".create_url('setting/module/convert', array('id' => $_GPC['id'], 'confirm' => 1)).'">是</a> &nbsp;&nbsp;<a href="javascript:history.go(-1);">否</a>', '', 'tips');
	}
}

function manifest_check($id, $m) {
	if(is_string($m)) {
		message('模块配置项定义错误, 具体错误内容为: <br />' . $m);
	}
	if(!in_array(IMS_VERSION, $m['versions'])) {
		message('模块与微擎版本不兼容. ');
	}
	if(empty($m['application']['name'])) {
		message('模块名称未定义. ');
	}
	if(empty($m['application']['identifie']) || !preg_match('/^[a-z][a-z\d]+$/i', $m['application']['identifie'])) {
		message('模块标识符未定义或格式错误(仅支持字母和数字, 且只能以字母开头). ');
	}
	if(strtolower($id) != strtolower($m['application']['identifie'])) {
		message('模块名称定义与模块路径名称定义不匹配. ');
	}
	if(empty($m['application']['version']) || !preg_match('/^[\d\.]+$/i', $m['application']['version'])) {
		message('模块版本号未定义(仅支持数字和句点). ');
	}
	if(empty($m['application']['ability'])) {
		message('模块功能简述未定义. ');
	}
	if($m['platform']['isrulefields'] && !in_array('text', $m['platform']['handles'])) {
		message('模块功能定义错误, 嵌入规则必须要能够处理文本类型消息. ');
	}
	if(is_array($m['platform']['options'])) {
		foreach($m['platform']['options'] as $o) {
			if(trim($o['title']) == ''  || !preg_match('/^[a-z\d]+$/i', $o['do'])) {
				message('规则扩展项定义错误, (title, do)格式不正确.');
			}
		}
	}
	if(is_array($m['platform']['menus'])) {
		foreach($m['platform']['menus'] as $o) {
			if(trim($o['title']) == ''  || !preg_match('/^[a-z\d]+$/i', $o['do'])) {
				message('平台扩展导航菜单定义错误, (title, do)格式不正确.');
			}
		}
	}
	if(is_array($m['site']['menus'])) {
		foreach($m['site']['menus'] as $o) {
			if(trim($o['title']) == ''  || !preg_match('/^[a-z\d]+$/i', $o['do'])) {
				message('微站扩展导航菜单定义错误, (title, do)格式不正确.');
			}
		}
	}
	if(!is_array($m['versions'])) {
		message('兼容版本格式错误. ');
	}
}

function setting_module_manifest_compat($modulename) {
	$manifest = array();
	$filename = IA_ROOT . '/source/modules/' . $modulename . '/manifest.xml';
	if (!file_exists($filename)) {
		return array();
	}
	$xml = str_replace(array('&'), array('&amp;'), file_get_contents($filename));
	$xml = @simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA);
	if (empty($xml)) {
		return array();
	}
	$attributes = $xml->attributes();
	$manifest['version'] = strval($attributes['versionCode']);
	$manifest['install'] = strval($xml->install);
	$manifest['uninstall'] = strval($xml->uninstall);
	$manifest['upgrade'] = strval($xml->upgrade);
	$attributes = $xml->application->attributes();
	$manifest['application'] = array(
		'name' => strval($xml->application->name),
		'identifie' => strval($xml->application->identifie),
		'version' => strval($xml->application->version),
		'ability' => strval($xml->application->ability),
		'description' => strval($xml->application->description),
		'author' => strval($xml->application->author),
		'setting' => strval($attributes['setting']) == 'true',
	);
	$hooks = @(array)$xml->hooks->children();
	if (!empty($hooks['hook'])) {
		foreach ((array)$hooks['hook'] as $hook) {
			$manifest['hooks'][strval($hook['name'])] = strval($hook['name']);
		}
	}
	$menus = @(array)$xml->menus->children();
	if (!empty($menus['menu'])) {
		foreach ((array)$menus['menu'] as $menu) {
			$manifest['menus'][] = array(strval($menu['name']), strval($menu['value']));
		}
	}
	$ret = array();
	$ret['meta'] = $manifest;
	$ret['meta']['compact'] = $manifest['version'];
	if($ret['meta']['compact'] == '0.41' || $ret['meta']['compact'] == '0.4') {
		//Compact 0.41
		$ret['convert'] = setting_module_convert($manifest);
		$ret['convert']['compact'] = $manifest['version'];
		$handles = iunserializer($ret['convert']['handles']);
		if($ret['meta']['hooks'] && $ret['meta']['hooks']['rule']) {
			$handles[] = 'text';
			$ret['convert']['isrulefields'] = true;
		}
		$ret['convert']['handles'] = iserializer($handles);
		if(is_array($ret['meta']['menus'])) {
			$options = iunserializer($ret['convert']['options']);
			foreach($ret['meta']['menus'] as $row) {
				$opt = array();
				$opt['title'] = $row[0];
				$urls = parse_url($row[1]);
				parse_str($urls['query'], $vars);
				$opt['do'] = $vars['do'];
				$opt['state'] = $vars['state'];
				$options[] = $opt;
			}
			$ret['convert']['options'] = iserializer($options);
		}

		$m = $ret['convert'];
		$m['install'] = $manifest['install'];
		$m['uninstall'] = $manifest['uninstall'];
		$m['upgrade'] = $manifest['upgrade'];
		$versions = IMS_VERSION;
		$setting = $m['setting'] ? 'true' : 'false';
		$handles = '';
		$hs = iunserializer($m['handles']);
		if(is_array($hs)) {
			foreach($hs as $h) {
				$handles .= "\r\n\t\t\t<message type=\"{$h}\" />";
			}
		}
		$rule = $m['isrulefields'] ? 'true' : 'false';
		$options = '';
		$os = iunserializer($m['options']);
		if(is_array($os)) {
			foreach($os as $o) {
				$options .= "\r\n\t\t\t<option title=\"{$o['title']}\" do=\"{$o['do']}\" state=\"{$o['state']}\" />";
			}
		}
		$tpl = <<<TPL
<?xml version="1.0" encoding="utf-8"?>
<manifest versionCode="{$versions}">
	<application setting="{$setting}">
		<name><![CDATA[{$m['title']}]]></name>
		<identifie><![CDATA[{$m['name']}]]></identifie>
		<version><![CDATA[{$m['version']}]]></version>
		<ability><![CDATA[{$m['ability']}]]></ability>
		<description><![CDATA[{$m['description']}]]></description>
		<author><![CDATA[{$m['author']}]]></author>
		<url><![CDATA[{$m['url']}]]></url>
	</application>
	<platform>
		<subscribes>
		</subscribes>
		<handles>{$handles}
		</handles>
		<rule embed="{$rule}">{$options}
		</rule>
		<menus embed="false">
		</menus>
	</platform>
	<install><![CDATA[{$m['install']}]]></install>
	<uninstall><![CDATA[{$m['uninstall']}]]></uninstall>
	<upgrade><![CDATA[{$m['upgrade']}]]></upgrade>
</manifest>
TPL;
		$ret['manifest'] = ltrim($tpl);
		return $ret;
	}
	return array();
}
