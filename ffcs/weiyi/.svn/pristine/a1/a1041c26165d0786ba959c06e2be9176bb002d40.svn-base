<?php 
/**
 * 自动更新相关功能
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
require model('setting');
if(is_array($_W['isfounder'])) {
	message('访问非法.');
}
$do = !empty($_GPC['do']) && in_array($_GPC['do'], array('upgrade', 'history')) ? $_GPC['do'] : 'upgrade';
if(empty($_W['config']['site']['key']) || empty($_W['config']['site']['token'])) {
	$key = md5(uniqid());
	$token = md5(uniqid());
	$dat = <<<TOKEN

// --------------------------  CONFIG SITE  --------------------------- //
\$config['site']['key'] = '{$key}';
\$config['site']['token'] = '{$token}';
TOKEN;
	$fp = fopen(IA_ROOT . '/data/config.php', 'a+');
	fwrite($fp, $dat);
	fclose($fp);
	message("你的程序需要生成AppKey和Token来进行自动更新过程中的传输校验, 以便保证传输安全.<br/>请将以下资料提交给微擎团队来注册你的AppKey和Token, 然后重试自动更新.<br/>AppKey: {$key}<br/>Token: {$token}");
}

if($do == 'upgrade') {
	if($_W['ispost'] && $_GPC['check-update']) {
		$upgrade = setting_upgrade();
		if($upgrade['upgrade']) {
			message("检测到新版本: <strong>{$upgrade['version']} (Release {$upgrade['release']})</strong>, 请立即更新.", 'refresh');
		} else {
			message('检查结果: 当前没有新版本可供更新. ');
		}
		exit();
	}
	cache_load('upgrade');
	if (!empty($_W['cache']['upgrade'])) {
		$upgrade = iunserializer($_W['cache']['upgrade']);
	}
	if(empty($upgrade) ||  TIMESTAMP - $upgrade['lastupdate'] >= 3600 * 24 || $upgrade['upgrade']) {
		$upgrade = setting_upgrade();
	}
	if($upgrade && $upgrade['upgrade']) {
		$hash = md5(json_encode($upgrade));
		if($_W['ispost'] && $_GPC['do-update'] && $_GPC['hash'] == $hash) {
			$bar = false;
			if($upgrade['attachments']) {
				$bar = setting_upgrade_download($upgrade['attachments']);
				if(!$bar) {
					message('下载升级包失败, 请稍后重试.');
				}
			}
			if($upgrade['attachments'] && $bar) {
				$fp = fopen($bar, 'r');
				if ($fp) {
					$buffer = '';
					while (!feof($fp)) {
						$buffer .= fgets($fp, 4096);
						if($buffer[strlen($buffer) - 1] == "\n") {
							$pieces = explode(':', $buffer);
							$path = base64_decode($pieces[0]);
							$dat = base64_decode($pieces[1]);
							$fname = IA_ROOT . $path;
							mkdirs(dirname($fname));
							file_put_contents($fname, $dat);
							$buffer = '';
						}
					}
					fclose($fp);
				}
				unlink($bar);
			}
			$updatefiles = array();
			if($upgrade['schemas']) {
				$updatedir = IA_ROOT . '/data/update/';
				mkdirs($updatedir);
				$cversion = IMS_VERSION;
				$crelease = IMS_RELEASE_DATE;
				foreach($upgrade['schemas'] as $entry) {
					if($entry['release'] <= $crelease) {
						continue;
					}
					$fname = "update({$crelease}-{$entry['release']}).php";
					$crelease = $entry['release'];
					if(empty($entry['script'])) {
						$entry['script'] = <<<DAT
<?php
require_once model('setting');
setting_upgrade_version('{$upgrade['family']}', '{$entry['version']}', '{$entry['release']}');
return true;
DAT;
					}
					$updatefile = $updatedir . $fname;
					file_put_contents($updatefile, $entry['script']);
					$updatefiles[] = $updatefile;
				}
			}
			if(!empty($updatefiles)) {
				foreach($updatefiles as $file) {
					$evalret = include $file;
					if(!$evalret) {
						message('自动升级执行失败, 请联系开发人员解决.');
					}
					@unlink($file);
				}
				cache_build_fans_struct();
				cache_build_setting();
				cache_build_modules();
			}
			cache_delete('upgrade');
			message('升级成功.<script type="text/javascript">window.top.closetips();</script>', 'refresh');
		}
	}
}
if($do == 'history') {
	$files = glob(IA_ROOT . '/data/update/*');
	$ds = array();
	if(is_array($files)) {
		foreach($files as $entry) {
			$fname = basename($entry);
			if(is_file($entry) && preg_match('/^update\(\d{12}\-\d{12}\)\.php$/', $fname)) {
				$code = str_replace(').php', '', str_replace('update(', '', $fname)); 
				$ds[$code] = array('title' => $code);
			}
		}
	}
	ksort($ds);
	foreach($ds as $k => $v) {
		$pieces = explode('-', $v['title']);
		if($pieces[0] < IMS_RELEASE_DATE || $pieces[1] < IMS_RELEASE_DATE) {
			$ds[$k]['error'] = true;
		}
		if($pieces[0] == IMS_RELEASE_DATE) {
			$ds[$k]['current'] = true;
		}
	}
	$foo = $_GPC['foo'];
	if($foo == 'manual') {
		$ver = $_GPC['version'];
		if($ds[$ver] && $ds[$ver]['current']) {
			$file = IA_ROOT . "/data/update/update({$ver}).php";
			$evalret = include $file;
			if(!$evalret) {
				message('自动升级执行失败, 请联系开发人员解决.');
			}
			cache_build_fans_struct();
			cache_build_setting();
			cache_build_modules();
		}
		cache_delete('upgrade');
		message('升级成功, 请删除此升级.', referer());
	}
	if($foo == 'delete') {
		$ver = $_GPC['version'];
		if($ds[$ver] && $ds[$ver]['error']) {
			$file = IA_ROOT . "/data/update/update({$ver}).php";
			@unlink($file);
		}
		message('执行成功.', referer());
	}
}
template('setting/upgrade');
