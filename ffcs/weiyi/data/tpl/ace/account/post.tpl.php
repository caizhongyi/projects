<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'公众号管理'),array('title'=>'公众号列表'),array('title'=>设置公众号 ))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>

<div class="page-header">
    <h1>
        <i class="icon-laptop"></i> <?php if(empty($id)) { ?>
			添加公众帐号
			<?php } else { ?>
			设置公众号
			<?php } ?>
    </h1>
</div>
	<div class="main">
		<form action="" method="post" class="form-horizontal form">
		<input type="hidden" name="id" value="<?php echo $wechat['weid'];?>" />
			
			<table class="tb">
				<tr>
					<th><label for="">公众号名称</label></th>
					<td>
						<input type="text" name="name" class="span6" value="<?php echo $wechat['name'];?>" autocomplete="off">
						<span class="help-block">您可以给此公众号起一个名字, 方便下次修改和查看.</span>
					</td>
				</tr>
				<tr>
					<th><label for="">公众号类型</label></th>
					<td>
						<select name="type" id="type" onchange="verifyGen()">
							<option value="1" <?php if($wechat['type'] == 1) { ?> selected<?php } ?>>微信公众平台</option>
							<option value="2" <?php if($wechat['type'] == 2) { ?> selected<?php } ?>>易信公众平台</option>
						</select>
						<span class="help-block">选择您公众号所在平台.</span>
					</td>
				</tr>
				<?php if(!empty($id)) { ?>
				<tr>
					<th style="color:red">接口地址</th>
					<td>
						<input type="text" class="span6" value="<?php echo $_W['siteroot'];?>api.php?hash=<?php echo $wechat['hash'];?>" readonly="readonly" autocomplete="off"/>
						<div class="help-block">设置“公众平台接口”配置信息中的接口地址</div>
					</td>
				</tr>
				<tr>
					<th style="color:red">Token</th>
					<td>
						<input type="text" name="wetoken" class="span6" value="<?php echo $wechat['token'];?>" readonly="readonly" /> <a href="javascript:;" onclick="tokenGen();">生成新的</a>
						<div class="help-block">与公众平台接入设置值一致，必须为英文或者数字，长度为3到32个字符. 请妥善保管, Token 泄露将可能被窃取或篡改微信平台的操作数据.</div>
					</td>
				</tr>
				<?php } ?>
				<tr>
					<th>公众号AppId</th>
					<td>
						<input type="text" name="key" class="span6" value="<?php echo $wechat['key'];?>" autocomplete="off"/>
						<div class="help-block">请填写公众平台后台的AppId</div>
					</td>
				</tr>
				<tr>
					<th>公众号AppSecret</th>
					<td>
						<input type="text" name="secret" class="span6" value="<?php echo $wechat['secret'];?>" autocomplete="off"/>
						<div class="help-block">请填写公众平台后台的AppSecret, 只有填写这两项才能管理自定义菜单</div>
					</td>
				</tr>
				<!--<tr>
					<th><label for="">微信号</label></th>
					<td>
						<input type="text" name="account" class="span6" value="<?php echo $wechat['account'];?>" autocomplete="off" />
						<span class="help-block">您的微信帐号，本平台支持管理多个微信公众号</span>
					</td>
				</tr>
				<tr>
					<th><label for="">原始帐号</label></th>
					<td>
						<input type="text" name="original" class="span6" value="<?php echo $wechat['original'];?>" autocomplete="off" />
						<span class="help-block">微信公众帐号的原ID串，<a href="index.php?act=help&amp;do=wx_uid" target="blank">怎么查看微信的原始帐号？</a></span>
					</td>
				</tr>-->
				<?php if(!empty($wechat['username'])) { ?>
				<tr>
					<th>二维码</th>
					<td>
						<img class="img-polaroid" src="<?php echo $_W['attachurl'];?>/qrcode_<?php echo $wechat['weid'];?>.jpg?weid=<?php echo $wechat['account'];?>" width="150" />
					</td>
				</tr>
				<?php } ?>
				<?php if(!empty($wechat['username'])) { ?>
				<tr>
					<th>头像</th>
					<td>
						<img class="img-polaroid" src="<?php echo $_W['attachurl'];?>/headimg_<?php echo $wechat['weid'];?>.jpg?weid=<?php echo $wechat['account'];?>" width="85" />
					</td>
				</tr>
				<?php } ?>
			</table>
			<h4>设置帐号<small>设置用户名密码后，程序会自动采集您的公众号相关信息。</small></h4>
			<table class="tb">
				<tr>
					<th><label for="">公众帐号</label></th>
					<td>
						<input type="text" name="wxusername" id="username" class="span6" value="<?php echo $wechat['username'];?>" autocomplete="off" onblur="verifyGen()" />
						<span class="help-block">请输入你的公众平台用户名</span>
					</td>
				</tr>
				<tr>
					<th><label for="">公众帐号登录密码</label></th>
					<td>
						<input type="password" name="wxpassword" class="span6" value="" autocomplete="off"  />
						<span class="help-block">请输入你的公众平台密码</span>
					</td>
				</tr>
				<tr>
					<th><label for="">登录验证码</label></td>
					<td>
						<input type="text" name="verify" class="txt grid-1 alpha pin" value="" autocomplete="off" />
						<span class="help-inline"><img src="" id="imgverify"> <a href="javascript:;" onclick="verifyGen()">换一张</a></span>
					</td>
				</tr>
				<tr>
					<th></th>
					<td>
						<label class="checkbox inline"><input type="checkbox" name="islogin" value="1" checked="checked" /> 是否验证登录</label>
						<div class="help-inline">&nbsp;勾选此选项后，提交后将验证您的公众帐号。如果有任何异常信息，请取消此选项。</div>
					</td>
				</tr>
				<?php if(!empty($wechat['username'])) { ?>
				<tr>
					<th></th>
					<td>
						<a href="<?php echo create_url('account/sync', array('id' => $wechat['weid']))?>">同步公众平台帐号信息</a>
						<div class="help-block">填写公众号帐号密码后，如果发现信息没有同步成功，请点击此选项进行手动同步。</div>
					</td>
				</tr>
				<?php } ?>
				<tr>
					<th></th>
					<td>
						<input name="submit" type="submit" value="提交" class="btn  btn-primary " />
						<input type="hidden" name="token" value="<?php echo $_W['token'];?>" />
					</td>
				</tr>
			</table>
		</form>
	</div>
<script type="text/javascript">
<!--
	var codeurl = {'1':'https://mp.weixin.qq.com/cgi-bin/verifycode', '2':'https://plus.yixin.im/captcha'};
	function verifyGen() {
		if ($('#username').val()) {
			var type = $('#type').val() ? $('#type').val() : 1;
			$('#imgverify').attr('src', codeurl[type] + '?username='+$('#username').val()+'&r='+Math.round(new Date().getTime()));
		} else {
			//message('请先输入微信公众平台用户名');
		}
	}
	verifyGen();
//-->
</script>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>
