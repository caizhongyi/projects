<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'公众号管理 '),array('title'=>'特殊消息类型处理'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>
<div class="page-header">
    <h1>
        <i class="icon-cogs"></i> 特殊类型消息处理
    </h1>
</div>
<div class="main">
	<form class="form" action="" method="post">
		<table class="tb">
			<tr>
				<th>说明信息</th>
				<td>
					<div class="alert alert-info" style="width:auto;">
						<p><b>文本以外的消息类型, 计算机很难自行理解. 因此除文本外的其他消息类型, 如果没有文本对话来确定对话语境, 将会将其分配至默认模块</b></p>
						<p>文本以外的消息类型, 没有语境很难确定其行为方式. 比如: 没有任何对话, 直接发送过来一张图片或者音频, 我们很难根据图片或者音频来判断对方的目的. 针对这种情况, 微擎将这里的扩展操作交给第三方模块来实现. 例如: 对方发送过来一张图片, 并且不再任何对话上下文中, 我们会把这张图片的消息交给能够处理图片消息的默认模块中.</p>
						<p>注意: 这里的操作不会影响对话中的图片或者其他消息. (比如: 我们要求对方发送一张图片来作为头像之后, 对方发送了一张图片, 这样使用对话上下文处理时是不影响的. 这里的处理仅针对没有语境, 没有对话上下文的直接图片或其他类型消息.)</p>
					</div>
				</td>
			</tr>
			<?php if(is_array($ds)) { foreach($ds as $row) { ?>
			<tr>
				<th><?php echo $row['title'];?></th>
				<td>
					<label class="radio">
						<input name="<?php echo $row['type'];?>" type="radio" value="" <?php if(!array_key_exists($row['current'], $mtypes)) { ?> checked="checked"<?php } ?> /> 不处理(使用系统默认回复)
					</label>
					<?php if(is_array($row['handles'])) { foreach($row['handles'] as $item) { ?>
					<label class="radio">
						<input name="<?php echo $row['type'];?>" type="radio" value="<?php echo $item['name'];?>" <?php if($row['current'] == $item['name']) { ?> checked="checked"<?php } ?> /> <?php echo $item['title'];?>
					</label>
					<?php } } ?>
					<div class="help-block">如果<?php echo $row['title'];?>到达时, 并且此时并不在对话上下文中, 将会采用选中的模块来处理. 如果选择"不处理", 那么这个消息将会使用系统默认回复来回复</div>
				</td>
			</tr>
			<?php } } ?>
			<tr>
				<th></th>
				<td>
					<input name="submit" type="submit" value="提交" class="btn  btn-primary" />
					<input type="hidden" name="token" value="<?php echo $_W['token'];?>" />
				</td>
			</tr>
		</table>
	</form>
</div>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>
