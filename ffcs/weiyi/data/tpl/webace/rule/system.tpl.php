<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'自动回复'),array('title'=>'欢迎与默认回复设置 '))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>
<div class="page-header">
    <h1>
        <i class="icon-cogs"></i> 欢迎与默认回复设置
    </h1>
</div>
<div class="main">
	<form class="form" action="" method="post">
		<input type="hidden" name="id" value="<?php echo $rule['rule']['id'];?>">
		<table class="tb">
			<tr>
				<th>欢迎信息</th>
				<td>
					<?php if($wechat['welcomerid']) { ?>
					<table class=" table table-bordered">
						<tr>
							<th >
									<span class="pull-right"><a onclick="return confirm('取消设置的系统回复，确认吗？');return false;" href="<?php echo create_url('rule/system/cancel', array('type' => 'welcome'))?>">取消</a><a href="<?php echo create_url('rule/post', array('id' => $wechat['welcome']['rule']['id']))?>">编辑</a></span>
									<?php echo $wechat['welcome']['rule']['name'];?> <small>（<?php echo $_W['modules'][$wechat['welcome']['rule']['module']]['title'];?>）</small>
							</th>
						</tr>
						<tr >
							<td >
								<div>
									<?php if(is_array($wechat['welcome']['keyword'])) { foreach($wechat['welcome']['keyword'] as $kw) { ?>
									<span><?php echo $kw['content'];?></span>
									<?php } } ?>
								</div>
							</td>
						</tr>
					</table>
					<?php } else { ?>
					<div class="alert alert-info" style="width:508px;">你可以直接添加欢迎的文字信息, 或者在规则列表中找到已存在的规则, 然后点击"设置为欢迎信息", 将已有的规则设置为欢迎信息. (这种方式可以设置其他类型的消息, 例如:图文和音乐)</div>
					<textarea name="welcome" id="welcome" cols="55" class="span7" style="height:200px;width:508px; "><?php echo $_W['account']['welcome'];?></textarea>
					<?php } ?>
					<div class="help-block">设置用户添加公众帐号好友时，发送的欢迎信息。<a class="iconEmotion" href="javascript:;" inputid="welcome"><i class="icon-github-alt"></i> 表情</a></div>
				</td>
			</tr>
			<tr>
				<th>默认回复</th>
				<td>
					<?php if($wechat['defaultrid']) { ?>
					<table class=" table table-bordered">
						<tr>
							<td >
									<span class="pull-right"><a onclick="return confirm('取消设置的系统回复，确认吗？');return false;" href="<?php echo create_url('rule/system/cancel', array('type' => 'default'))?>">取消</a><a href="<?php echo create_url('rule/post', array('id' => $wechat['default']['rule']['id']))?>">编辑</a></span>
									<?php echo $wechat['default']['rule']['name'];?> <small>（<?php echo $_W['modules'][$wechat['default']['rule']['module']]['title'];?>）</small>
							</td>
						</tr>
						<tr>
							<td>
								<div>
									<?php if(is_array($wechat['default']['keyword'])) { foreach($wechat['default']['keyword'] as $kw) { ?>
									<span><?php echo $kw['content'];?></span>
									<?php } } ?>
								</div>
							</td>
						</tr>
					</table>
					<?php } else { ?>
					<div class="alert alert-info" style="width:508px;">你可以直接添加默认的文字信息, 或者在规则列表中找到已存在的规则, 然后点击"设置为默认信息", 将已有的规则设置为默认信息. (这种方式可以设置其他类型的消息, 例如:图文和音乐)</div>
					<textarea name="default" id="default" cols="55" class="span7" style="height:200px;width:508px;"><?php echo $_W['account']['default'];?></textarea>
					<?php } ?>
					<div class="help-block">当系统不知道该如何回复粉丝的消息时，默认发送的内容。<a class="iconEmotion" href="javascript:;" inputid="default"><i class="icon-github-alt"></i> 表情</a></div>
				</td>
			</tr>
			<tr>
				<th>默认回复时间间隔</th>
				<td>
					<div class="input-append">
						<input type="text" name="default-period" class="span6" value="<?php echo $_W['account']['default_period'];?>" />
						<span class="add-on">秒</span>
					</div>
					<div class="help-block">此条设置只针对“默认回复”。设置“默认回复”对同一用户的回复间隔。为空表示不限制。</div>
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
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>
