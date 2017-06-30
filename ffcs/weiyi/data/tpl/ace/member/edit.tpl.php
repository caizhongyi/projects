<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'系统管理'),array('title'=>'用户管理 '),array('title'=>'编辑用户'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>

<script type="text/javascript">
	function checkProfile() {
		if($('#password').val() != $('#repassword').val()) {
			message('两次输入的密码不一致.', '', 'error');
			return false;
		}
		return true;
	}

	var pIndex = 1;
	var action = '';
	var uid = '<?php echo $uid;?>';
	$(function(){
		$('#aWechat').click(function(){
			pIndex = 1;
			action = 'wechat';
			ajaxshow('<?php echo create_url('member/select', array('do' => 'account', 'owner'=>$uid));?>', '请选择所属的公众号码', {width: 800, height: 700}, {hidden: function(){location.href = location.href;}});
		});
		$('#aModule').click(function(){
			pIndex = 1;
			ajaxshow('<?php echo create_url('member/select', array('do' => 'module', 'owner'=>$uid));?>', '请选择允许访问的模块', {width: 800, height: 700}, {hidden: function(){location.href = location.href;}});
		});
	});
	var aW = {};
	aW.query = function() {
		var kwd = $('#wKeyword').val();
		$.post('<?php echo create_url('member/select', array('do' => 'account', 'owner'=>$uid));?>', {keyword: kwd, page: pIndex}, function(dat){
			$('#modal-message .modal-body').html(dat);
		});
	}
	aW.auth = function(weid) {
		if(isNaN(parseInt(weid))) {
			return;
		}
		$.post('<?php echo create_url('member/edit');?>', {'do': 'auth', 'mod': 'account', uid: uid, wechat: weid}, function(dat){
			if(dat == 'success') {
				aW.query();
			} else {
				alert('操作失败, 请稍后重试, 服务器返回信息为: ' + dat);
			}
		});
	}
	aW.revo = function(weid) {
		if(isNaN(parseInt(weid))) {
			return;
		}
		if(!confirm('确定要收回这个公众号的管理权限吗? 在重新分配用户之前, 只有管理员才能访问此公众号.')) {
			return;
		}
		$.post('<?php echo create_url('member/edit');?>', {'do': 'revo', 'mod': 'account', uid: uid, wechat: weid}, function(dat){
			if(dat == 'success') {
				aW.query();
			} else {
				alert('操作失败, 请稍后重试, 服务器返回信息为: ' + dat);
			}
		});
	}
	aW.revos = function() {
		if($('.wechats:checked').length == 0) {
			return;
		}
		var weids = [];
		$('.wechats:checked').each(function(){
			weids.push($(this).val());
		});
		$.post('<?php echo create_url('member/edit');?>', {'do': 'revos', 'mod': 'account', uid: uid, wechats: weids.join(',')}, function(dat){
			if(dat == 'success') {
				location.href = location.href;
			} else {
				alert('操作失败, 请稍后重试, 服务器返回信息为: ' + dat);
			}
		});
	}

	var aM = {};
	aM.query = function() {
		$.post('<?php echo create_url('member/select', array('do' => 'module', 'owner'=>$uid));?>', function(dat){
			$('#modal-message .modal-body').html(dat);
		});
	}
	aM.auth = function(mid) {
		if(isNaN(parseInt(mid))) {
			return;
		}
		$.post('<?php echo create_url('member/edit');?>', {'do': 'auth', 'mod': 'module', uid: uid, mid: mid}, function(dat){
			if(dat == 'success') {
				aM.query();
			} else {
				alert('操作失败, 请稍后重试, 服务器返回信息为: ' + dat);
			}
		});
	}
	aM.revo = function(mid) {
		if(isNaN(parseInt(mid))) {
			return;
		}
		if(!confirm('确定要收回这个模块的访问权限吗? ')) {
			return;
		}
		$.post('<?php echo create_url('member/edit');?>', {'do': 'revo', 'mod': 'module', uid: uid, mid: mid}, function(dat){
			if(dat == 'success') {
				aM.query();
			} else {
				alert('操作失败, 请稍后重试, 服务器返回信息为: ' + dat);
			}
		});
	}
	aM.revos = function() {
		if($('.modules:checked').length == 0) {
			return;
		}
		var mids = [];
		$('.modules:checked').each(function(){
			mids.push($(this).val());
		});
		$.post('<?php echo create_url('member/edit');?>', {'do': 'revos', 'mod': 'module', uid: uid, mids: mids.join(',')}, function(dat){
			if(dat == 'success') {
				location.href = location.href;
			} else {
				alert('操作失败, 请稍后重试, 服务器返回信息为: ' + dat);
			}
		});
	}

	function p(url, p, state) {
		pIndex = p;
		if(action == 'wechat') {
			aW.query();
		}
	}
</script>
<style>
.form th {
	width: auto;
}
</style>
<div class="page-header">
    <h1>
        <i class="icon-book"></i> 编辑用户 <small><i class="icon-double-angle-right"></i> 编辑用户信息，分配用户权限、设置用户访问模块，请提交规则以保存操作。</small>
    </h1>
</div>
<div class="main ">
	<div class="stat">
		<div class="stat-div">
			<div class="navbar navbar-static-top">
				<div class="navbar-inner">
					<span class="brand">编辑用户资料</span>
				</div>
			</div>
			<form action="" class="form-horizontal form" onsubmit="return checkProfile();" method="post">
			<table class="tb" >
				<tr>
					<th style="width:90px;"><label for="">用户名</label></th>
					<td>
						<span class="uneditable-input span6"><?php echo $member['username'];?></span>
						<span class="help-block">当前编辑的用户名</span>
					</td>
				</tr>
				<tr>
					<th><label for="">新密码</label></th>
					<td>
						<input id="password" name="password" type="password" class="span6" value="" />
						<span class="help-block">请填写密码，最小长度为 8 个字符</span>
					</td>
				</tr>
				<tr>
					<th><label for="">确认新密码</label></th>
					<td>
						<input id="repassword" type="password" class="span6" value="" />
						<span class="help-block">重复输入密码，确认正确输入</span>
					</td>
				</tr>
				<tr>
					<th><label for="">备注</label></th>
					<td>
						<textarea id="" name="remark" style="height:80px;" class="span6"><?php echo $member['remark'];?></textarea>
						<span class="help-block">方便注明此用户的身份</span>
					</td>
				</tr>
				<tr>
					<th><label for="">上次登录时间</label></th>
					<td>
						<input id="lastvisit" name="lastvisit" type="text" class="span6" value="<?php echo date('Y-m-d H:i:s', $member['lastvisit']);?>" />
					</td>
				</tr>
				<tr>
					<th><label for="">上次登录IP</label></th>
					<td>
						<input id="lastip" name="lastip" type="text" class="span6" value="<?php echo $member['lastip'];?>" />
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<input type="submit" class="btn btn-sm btn-primary" name="profile" value="保存用户资料" /><input type="hidden" name="token" value="<?php echo $_W['token'];?>" />
					</td>
				</tr>
			</table>
			</form>
		</div>
	</div>
	<div class="stat" style="padding-top:0;">
		<div class="stat-div" style="padding-bottom:50px;">
			<div class="navbar navbar-static-top">
				<div class="navbar-inner">
					<span class="brand">分配用户权限</span>
				</div>
			</div>
			<div class="sub-item" id="table-list">
				<h4 class="sub-title">当前用户所属的公众号</h4>
				<div class="sub-content">
					<table class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th style="width:80px;" class="row-first">选择</th>
								<th>公众号名称<i></i></th>
								<th>微信号码</th>
								<th>公众号类型</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
						<?php if(is_array($wechats)) { foreach($wechats as $wechat) { ?>
							<tr>
								<td class="row-first"><input class="wechats" type="checkbox" value="<?php echo $wechat['weid'];?>" /></td>
								<td><?php echo $wechat['name'];?></td>
								<td><?php echo $wechat['account'];?></td>
								<td><?php if(!empty($wechat['key']) && !empty($wechat['secret'])) { ?><span class="badge badge-info">服务号</span><?php } else { ?><span class="badge badge-success">订阅号</span><?php } ?></td>
								<td><a href="<?php echo create_url('account/post', array('id' => $wechat['weid']));?>">编辑</a></td>
							</tr>
						<?php } } ?>
						</tbody>
					</table>
				</div>
			</div>
			<div class="btn-group" style="margin-left:20px;">
				<input id="aWechat" class="btn  btn-primary" type="button" value="选择所属的公众号">
				<button class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu">
					<li><a href="javascript:;" onclick="aW.revos();">收回所选账号管理权限</a></li>
				</ul>
			</div>
			<div class="sub-item" id="table-list">
				<h4 class="sub-title">设置当前用户允许访问的模块</h4>
				<div class="sub-content">
					<table class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th style="width:80px;" class="row-first">选择</th>
								<th>模块名称</th>
								<th>模块标识</th>
								<th>功能简介</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<?php if(is_array($modules)) { foreach($modules as $module) { ?>
							<tr>
								<td class="row-first"><?php if(!$module['issystem']) { ?><input class="modules" type="checkbox" value="<?php echo $module['mid'];?>" /><?php } ?></td>
								<td><?php echo $module['title'];?></td>
								<td><?php echo $module['name'];?></td>
								<td><?php echo $module['ability'];?></td>
								<td><?php if($module['issystem']) { ?><span class="label label-success">系统模块</span><?php } ?></td>
							</tr>
							<?php } } ?>
						</tbody>
					</table>
				</div>
			</div>
			<div class="btn-group" style="margin-left:20px;">
				<input id="aModule" class="btn  btn-primary" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" type="button" value="选择允许访问的模块">
				<button class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu">
					<li><a href="javascript:;" onclick="aM.revos();">收回所选模块访问权限</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>
