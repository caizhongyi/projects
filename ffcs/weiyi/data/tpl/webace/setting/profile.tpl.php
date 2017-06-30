<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'系统管理'),array('title'=>'个人资料 '))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>


<div class="page-header">
    <h1>
        <i class="icon-globe "></i> 个人资料
    </h1>
</div>
	<div class="main">
		<form action="" method="post" class="form-horizontal form" onsubmit="return formcheck(this)">
			<table class="tb">
				<tr>
					<th><label for="">帐号</label></th>
					<td>
						<input type="text" name="name" class="span6" value="<?php echo $_W['username'];?>" readonly />
						<div class="help-block">只能用'0-9'、'a-z'、'A-Z'、'.'、'@'、'_'、'-'、'!'以内范围的字符</div>
					</td>
				</tr>
				<tr>
					<th><label for="">密码</label></th>
					<td>
						<input type="password" name="pw" class="span6" value="" />
					</td>
				</tr>
				<tr>
					<th style="color:red;">新密码</th>
					<td>
						<input type="password" name="pw2" class="span6" value="" />
					</td>
				</tr>
				<tr>
					<th style="color:red;">确认密码</th>
					<td>
						<input type="password" name="pw3" class="span6" value="" />
					</td>
				</tr>
				<tr>
					<th></th>
					<td>
						<input name="submit" type="submit" value="提交" class="btn btn-sm btn-primary" />
						<input type="hidden" name="token" value="<?php echo $_W['token'];?>" />
					</td>
				</tr>
			</table>
		</form>
    </div>
	<script type="text/javascript">
	function formcheck(form) {
		if (!form['name'].value) {
			alert('请填写管理员帐号！');
			form['name'].focus();
			return false;
		}
		if (!form['pw'].value) {
			alert('请填写管理员密码！');
			form['pw'].focus();
			return false;
		}
		if (!form['pw2'].value) {
			alert('请填写新密码！');
			form['pw2'].focus();
			return false;
		}
		if (form['pw'].value == form['pw2'].value) {
			alert('新密码与原密码一致，请检查！');
			form['pw'].focus();
			return false;
		}
		if (form['pw2'].value.length < 6 ) {
			alert('管理员密码不得小于6个字符！');
			form['pw2'].focus();
			return false;
		}
		if (form['pw2'].value != form['pw3'].value) {
			alert('两次输入的新密码不一致，请重新输入！');
			form['pw2'].focus();
			return false;
		}
	}
	</script>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>