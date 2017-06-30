<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'系统管理 '),array('title'=>'模块管理'),array('title'=>'设计新模块'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>

<script type="text/javascript">
$(function() {
	$(':checkbox[name="platform[rule]"]').click(function(){
		if($(this).attr('checked')) {
			$('.rule-ops').show();
			$(':checkbox[name="handles[]"]').eq(0).attr('checked', 'checked');
			$(':checkbox[name="handles[]"]').eq(0).attr('disabled', 'disabled');
		} else {
			$('.rule-ops').hide();
			$(':checkbox[name="handles[]"]').eq(0).removeAttr('disabled');
		}
	});
	$(':checkbox[name="platform[menu]"]').click(function(){
		if($(this).attr('checked')) {
			$('.pmenu').show();
		} else {
			$('.pmenu').hide();
		}
	});
	$(':checkbox[name="site[menu]"]').click(function(){
		if($(this).attr('checked')) {
			$('.smenu').show();
		} else {
			$('.smenu').hide();
		}
	});
});
function formcheck() {
	var msg = '';
	if($.trim($(':text[name="application[name]"]').val()) == '') {
		msg += '必须输入模块名称. <br />';
	}
	var identifie = $.trim($(':text[name="application[identifie]"]').val());
	if(identifie == '' || !(/^[a-z][a-z\d]+$/i).test(identifie)) {
		msg += '必须输入模块标识(只能包括字母和数字, 且只能以字母开头). <br />';
	}
	var ver = $.trim($(':text[name="application[version]"]').val());
	if(identifie == '' || !(/^[\d\.]+$/i).test(ver)) {
		msg += '必须输入模块版本号(只能包括数字和句点). <br />';
	}
if($.trim($(':text[name="application[ability]"]').val()) == '') {
		msg += '必须输入模块简述. <br />';
	}
	if($(':checkbox[name="versions[]"]:checked').length == 0) {
		msg += '必须选择模块支持的微擎版本. <br />';
	}
	if(msg != '') {
		message(msg, '', 'error');
		return false;
	}
	if($(':hidden[name=do]').val() == '') {
		return false;
	}
	return true;
}
function addOption(o) {
	var html = '<li>' +
					'<div class="input-prepend">' +
						'<span class="add-on">操作名称</span>' +
						'<input class="span3" name="options[titles][]" type="text" placeholder="请输入操作名称">' +
					'</div> ' +
					'<div class="input-prepend">' +
						'<span class="add-on">操作入口标识</span>' +
						'<input class="span3" name="options[dos][]" type="text" placeholder="请输入操作入口标志">' +
					'</div> ' +
					'<div class="input-prepend">' +
						'<span class="add-on">操作附加数据</span>' +
						'<input class="span3" name="options[states][]" type="text" placeholder="请输入操作附加数据">' +
					'</div> ' +
					'&nbsp; &nbsp; &nbsp; <a href="javascript:;" onclick="deleteOption(this)" class="icon-remove-sign" title="删除此操作"></a>' +
				'</li>';
	$('.rule-ops ul').append(html);
}
function deleteOption(o) {
	$(o).parent().remove();
}
</script>
<style type="text/css">
small a{color:#999;}
table li{padding:5px 0;}
.rule-ops a{font-size:14px;}
a:hover, a:active{text-decoration:none; color:red;}
</style>

<div class="page-header">
    <h1>
        <i class="icon-briefcase"></i> 设计新模块
    </h1>
</div>
<ul class="nav nav-tabs padding-24 tab-color-blue background-blue ">
	<li><a href="<?php echo create_url('setting/module');?>">模块列表</a></li>
	<li class="active"><a href="<?php echo create_url('setting/designer');?>">设计新模块</a></li>
</ul>
<div class="main">
	<form class="form-horizontal form" action="" method="post" enctype="multipart/form-data" onsubmit="return formcheck()">
		<input type="hidden" name="id" value="<?php echo $rule['rule']['id'];?>">
		<h4>模块基本信息 <small>这里来定义你自己模块的基本信息</small></h4>
		<table class="tb">
			<tr>
				<th><label for="">模块名称</label></th>
				<td>
					<input type="text" class="span4" placeholder="" name="application[name]" value="<?php echo $m['application']['name'];?>" />
					<span class="help-block">模块的名称, 由于显示在用户的模块列表中. 不要超过10个字符 </span>
				</td>
			</tr>
			<tr>
				<th><label for="">模块标识</label></th>
				<td>
					<input type="text" class="span2" placeholder="" name="application[identifie]" value="<?php echo $m['application']['identifie'];?>" />
					<span class="help-block">模块标识符, 应对应模块文件夹的名称, 微擎系统按照此标识符查找模块定义, 只能由字母数字下划线组成 </span>
				</td>
			</tr>
			<tr>
				<th><label for="">版本</label></th>
				<td>
					<input type="text" class="span2" placeholder="" name="application[version]" value="<?php echo $m['application']['version'];?>" />
					<span class="help-block">模块当前版本, 此版本号用于模块的版本更新</span>
				</td>
			</tr>
			<tr>
				<th><label for="">模块简述</label></th>
				<td>
					<input type="text" class="span8" placeholder="" name="application[ability]" value="<?php echo $m['application']['ability'];?>" />
					<span class="help-block">模块功能描述, 使用简单的语言描述模块的作用, 来吸引用户 </span>
				</td>
			</tr>
			<tr>
				<th><label for="">模块介绍</label></th>
				<td>
					<textarea class="span6" name="application[description]" rows="4"><?php echo $m['application']['description'];?></textarea>
					<span class="help-block">模块详细描述, 详细介绍模块的功能和使用方法 </span>
				</td>
			</tr>
			<tr>
				<th><label for="">作者</label></th>
				<td>
					<input type="text" class="span3" placeholder="" name="application[author]" value="<?php echo $m['application']['author'];?>" />
					<span class="help-block">模块的作者, 留下你的大名吧</span>
				</td>
			</tr>
			<tr>
				<th><label for="">发布页</label></th>
				<td>
					<input type="text" class="span8" placeholder="" name="application[url]" value="<?php echo $m['application']['url'];?>" />
					<span class="help-block">模块的发布页, 用于发布模块更新信息的页面, 推荐使用微擎模块版块</span>
				</td>
			</tr>
			<tr>
				<th><label for="">设置项</label></th>
				<td>
					<label class="checkbox">
						<input type="checkbox" name="application[setting]" value="true" <?php if($m['application']['setting']) { ?>checked="checked"<?php } ?> />
						存在全局设置项
					</label>
					<span class="help-block">此模块是否存在全局的配置参数, 此参数是针对公众账号独立保存的</span>
				</td>
			</tr>
		</table>
		<h4>公众平台消息处理选项 <small>这里来定义公众平台消息相关处理</small></h4>
		<table class="tb">
			<tr>
				<th><label for="">订阅的消息类型</label></th>
				<td>
					<?php if(is_array($mtypes)) { foreach($mtypes as $k => $v) { ?>
					<label class="checkbox">
						<input name="subscribes[]" type="checkbox" value="<?php echo $k;?>" <?php if(in_array($v, $m['platform']['subscribes'])) { ?> checked="checked"<?php } ?> /> <?php echo $v;?>
					</label>
					<?php } } ?>
					<span class="help-block">订阅特定的消息类型后, 此消息类型的消息到达微擎系统后将会以通知的方式(消息数据只读, 并不能返回处理结果)调用模块的接受器, 用这样的方式可以实现全局的数据统计分析等功能. 请参阅 <a href="http://www.we7.cc/docs/#flow-module-subscribe">模块消息订阅</a></span>
					<div class="alert-warning alert" style="width:auto;margin-top:5px;">注意: 订阅的消息信息是只读的, 只能用作分析统计, 不能更改, 也不能改变微擎处理主流程</div>
				</td>
			</tr>
			<tr>
				<th><label for="">直接处理的类型</label></th>
				<td>
					<?php if(is_array($mtypes)) { foreach($mtypes as $k => $v) { ?>
					<?php if($k != 'unsubscribe' && $k != 'click') { ?>
					<label class="checkbox">
						<input name="handles[]" type="checkbox" value="<?php echo $k;?>" <?php if(in_array($v, $m['platform']['handles'])) { ?> checked="checked"<?php } ?> /> <?php echo $v;?>
					</label>
					<?php } ?>
					<?php } } ?>
					<span class="help-block">当前模块能够直接处理的消息类型(没有上下文的对话语境, 能直接处理消息并返回数据). 如果公众平台传递过来的消息类型不在设定的类型列表中, 那么系统将不会把此消息路由至此模块</span>
					<div class="alert-warning alert" style="width:auto;margin-top:5px;">
					注意: 关键字路由只能针对文本消息有效, 文本消息最为重要. 其他类型的消息并不能被直接理解, 多数情况需要使用文本消息来进行语境分析, 再处理其他相关消息类型<br>
					注意: 上下文锁定的模块不受此限制, 上下文锁定期间, 任何类型的消息都会路由至锁定模块
					</div>
				</td>
			</tr>
			<tr>
				<th><label for="">是否要嵌入规则</label></th>
				<td>
					<label class="checkbox">
						<input type="checkbox" name="platform[rule]" value="true" <?php if($m['platform']['rule']) { ?>checked="checked"<?php } ?> />
						需要嵌入规则
					</label>
					<span class="help-block">是否要在规则编辑时添加此规则的相应的规则</span>
					<div class="alert-warning alert" style="width:auto;margin-top:5px;">注意: 如果需要嵌入规则, 那么此模块必须能够处理文本类型消息 (需要定义Processor)</div>
				</td>
			</tr>
			<tr class="rule-ops<?php if(!$m['platform']['rule']) { ?> hide<?php } ?>">
				<th><label for="">规则扩展的操作</label></th>
				<td>
					<ul class="unstyled"></ul>
					<div class="well well-small" style="margin-top:20px;">
						<a href="javascript:;" onclick="addOption();">添加操作 <i class="icon-plus-sign" title="添加菜单"></i></a>
					</div>
					<span class="help-block">规则扩展操作将会显示在规则列表中当前模块的规则上, 用于显示此规则的相关信息(附加在规则的扩展区域, 请参考微信墙模块). </span>
					<div class="alert-warning alert" style="width:auto;margin-top:5px;">注意: 扩展的规则操作定义于 WeModule 类的实现中</div>
				</td>
			</tr>
			<tr>
				<th><label for="">是否要扩展菜单</label></th>
				<td>
					<label class="checkbox">
						<input type="checkbox" name="platform[menu]" value="true" <?php if($m['platform']['menu']) { ?>checked="checked"<?php } ?>>
						需要扩展菜单
					</label>
					<span class="help-block">是否要在主导航栏更多功能中生成一条此模块功能的菜单链接</span>
				</td>
			</tr>
			<tr class="pmenu<?php if(!$m['platform']['menu']) { ?> hide<?php } ?>">
				<th><label for="">扩展的菜单</label></th>
				<td>
					<div class="input-prepend">
						<span class="add-on">菜单名称</span>
						<input class="span3" name="platform[titles][]" type="text" placeholder="请输入菜单名称">
					</div>
					<div class="input-prepend">
						<span class="add-on">操作入口标识</span>
						<input class="span2" name="platform[dos][]" type="text" placeholder="请输入菜单操作入口">
					</div>
					<span class="help-block">扩展菜单将会展示在主导航菜单的更多功能中, 用以快速访问当前模块的全局功能. </span>
					<div class="alert-warning alert" style="width:auto;margin-top:5px;">注意: 扩展的菜单定义于 WeModule 类的实现中</div>
				</td>
			</tr>
		</table>
		<h4>微站功能相关选项 <small>这里来定义此功能模块中相关微站的扩展选项</small></h4>
		<table class="tb">
			<tr>
				<th><label for="">微站首页图标</label></th>
				<td>
					<label class="checkbox">
						<input type="checkbox" name="site[home]" value="true" <?php if($m['site']['home']) { ?>checked="checked"<?php } ?> />
						微站首页图标入口
					</label>
					<span class="help-block">此模块的微站功能, 是否要在微站首页增加图标链接</span>
				</td>
			</tr>
			<tr>
				<th><label for="">微站用户中心链接</label></th>
				<td>
					<label class="checkbox">
						<input type="checkbox" name="site[profile]" value="true" <?php if($m['site']['profile']) { ?>checked="checked"<?php } ?> />
						用户中心管理入口
					</label>
					<span class="help-block">此模块的微站功能, 是否要在微站用户中心里增加管理链接</span>
				</td>
			</tr>
			<tr>
				<th><label for="">导航菜单</label></th>
				<td>
					<label class="checkbox">
						<input type="checkbox" name="site[menu]" value="true" <?php if($m['site']['menu']) { ?>checked="checked"<?php } ?>>
						需要导航菜单
					</label>
					<span class="help-block">是否要在主导航栏微站功能中生成一条此模块中微站相关功能的菜单链接</span>
				</td>
			</tr>
			<tr class="smenu<?php if(!$m['site']['menu']) { ?> hide<?php } ?>">
				<th><label for="">扩展的菜单</label></th>
				<td>
					<div class="input-prepend">
						<span class="add-on">菜单名称</span>
						<input class="span3" name="site[titles][]" type="text" placeholder="请输入菜单名称">
					</div>
					<div class="input-prepend">
						<span class="add-on">操作入口标识</span>
						<input class="span2" name="site[dos][]" type="text" placeholder="请输入菜单操作入口">
					</div>
					<span class="help-block">扩展菜单将会展示在主导航菜单的更多功能中, 用以快速访问当前模块的全局功能. </span>
					<div class="alert-warning alert" style="width:auto;margin-top:5px;">注意: 扩展的微站导航定义于 WeSite 类的实现中</div>
				</td>
			</tr>
		</table>
		<h4>模块发布 <small>这里来定义模块发布时需要的配置项</small></h4>
		<table class="tb">
			<tr>
				<th><label for="">兼容的微擎版本</label></th>
				<td>
					<?php if(is_array($versions)) { foreach($versions as $v) { ?>
					<label class="checkbox">
						<input name="versions[]" type="checkbox" value="<?php echo $v;?>" <?php if(in_array($v, $m['versions'])) { ?> checked="checked"<?php } ?> />WeEngine <?php echo $v;?>
					</label>
					<?php } } ?>
					<span class="help-block">当前模块兼容的微擎系统版本, 安装时会判断版本信息, 不兼容的版本将无法安装</span>
				</td>
			</tr>
			<tr>
				<th><label for="">模块缩略图</label></th>
				<td>
					<div class="fileupload fileupload-new" data-provides="fileupload">
						<div class="fileupload-preview thumbnail"></div>
						<div>
							<span class="btn btn-file"><span class="fileupload-new">选择图片</span><span class="fileupload-exists">更改</span><input name="icon" type="file" /></span>
							<a href="#" class="btn btn-sm btn-gray fileupload-exists" data-dismiss="fileupload">移除</a>
						</div>
					</div>
					<span class="help-block">用 48*48 的图片来让你的模块更吸引眼球吧</span>
				</td>
			</tr>
			<tr>
				<th><label for="">模块封面</label></th>
				<td>
					<div class="fileupload fileupload-new" data-provides="fileupload">
						<div class="fileupload-preview thumbnail"></div>
						<div>
							<span class="btn btn-file"><span class="fileupload-new">选择图片</span><span class="fileupload-exists">更改</span><input name="preview" type="file" /></span>
							<a href="#" class="btn btn-sm btn-gray fileupload-exists" data-dismiss="fileupload">移除</a>
						</div>
					</div>
					<span class="help-block">模块封面, 大小为 600*350, 更好的设计将会获得官方推荐位置</span>
				</td>
			</tr>
			<tr>
				<th><label for="">模块安装脚本</label></th>
				<td>
					<textarea class="span6" name="install" rows="4"><?php echo $m['install'];?></textarea>
					<span class="help-block">当前模块全新安装时所执行的脚本, 可以定义为SQL语句. 也可以指定为单个的php脚本文件, 如: install.php</span>
				</td>
			</tr>
			<tr>
				<th><label for="">卸载脚本</label></th>
				<td>
					<textarea class="span6" name="uninstall" rows="4"><?php echo $m['uninstall'];?></textarea>
					<span class="help-block">当前模块卸载时所执行的脚本, 可以定义为SQL语句. 也可以指定为单个的php脚本文件, 如: uninstall.php</span>
				</td>
			</tr>
			<tr>
				<th><label for="">模块升级脚本</label></th>
				<td>
					<textarea class="span6" name="upgrade" rows="4"><?php echo $m['upgrade'];?></textarea>
					<span class="help-block">当前模块更新时所执行的脚本, 可以定义为SQL语句. 也可以指定为单个的php脚本文件, 如: upgrade.php. (推荐使用php脚本, 方便检测字段及兼容性)</span>
					<input type="hidden" name="token" value="<?php echo $_W['token'];?>" />
				</td>
			</tr>
			<tr>
				<th></th>
				<td>
					<input name="method" type="hidden" value="download"/>
					<input name="token" type="hidden" value="<?php echo $_W['token'];?>" />
					<?php if($available['create']) { ?>
					<input type="submit" class="btn btn-sm btn-primary" name="submit" onclick="$(':hidden[name=method]').val('create');" value="直接生成模块模板" />
					<?php } else { ?>
					<input type="submit" class="btn btn-sm btn-primary disabled" disabled="disabled" name="submit" value="直接生成模块模板" />
					<div class="alert-warning alert" style="width:auto;margin-top:5px;">需要 source/modules 目录具有可写权限</div>
					<?php } ?>
					<span class="help-block">点此直接在源码目录 source/modules/{identifie} 处生成模块开发的模板文件, 方便快速开发</span>
				</td>
			</tr>
			<tr>
				<th></th>
				<td>
					<?php if($available['download']) { ?>
					<input type="submit" class="btn btn-sm btn-primary" name="submit" onclick="$(':hidden[name=method]').val('download');" value="下载模块模板" />
					<?php } else { ?>
					<input type="submit" class="btn btn-sm btn-primary disabled" disabled="disabled" name="submit" value="下载模块模板" />
					<div class="alert-warning alert" style="width:auto;margin-top:5px;">需要启用 Phar 模块</div>
					<?php } ?>
					<span class="help-block">如果您的服务器不能直接读写文件, 请下载后上传至服务器目录 source/modules/{identifie} 下来编辑开发 </span>
				</td>
			</tr>
		</table>
	</form>
</div>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>
