<?php defined('IN_IA') or exit('Access Denied');?><?php  $_W['breadcrumb'] = array(array('title'=>'公众号管理'),array('title'=>'公众号列表'))?>

<?php  include template('common/header', TEMPLATE_INCLUDEPATH);?>
<div class="page-header">
    <h1>
        <i class="icon-cogs"></i> 公众号列表
    </h1>
</div>
	<script type="text/javascript" src="./resource/script/jquery.zclip.min.js"></script>
	<ul class="nav nav-tabs">
		<li <?php  if(empty($_GPC['type']) || $_GPC['type'] == 1) { ?>class="active"<?php  } ?>><a href="<?php  echo create_url('account/display', array('type' => 1))?>">微信公众号</a></li>
		<li <?php  if($_GPC['type'] == 2) { ?>class="active"<?php  } ?>><a href="<?php  echo create_url('account/display', array('type' => 2))?>">易信公众号</a></li>
	</ul>
	<div class="tabbable account">
			<div class="tab-content no-border padding-24 no-padding-left no-padding-right">
			<p>
	            <a class="btn btn-sm btn-primary"  href="<?php  echo create_url('account/post')?>"><i class="icon-pencil"></i>添加公众号</a>
	        </p>
			<?php  if(is_array($list)) { foreach($list as $row) { ?>
			<div class="navbar-inner thead">
				<h4>
					<span class="pull-right"><a onclick="return confirm('删除帐号将同时删除全部规则及回复，确认吗？');return false;" href="<?php  echo create_url('account/delete', array('id' => $row['weid']))?>">删除</a><a href="<?php  echo create_url('account/post', array('id' => $row['weid']))?>">编辑</a><a href="<?php  echo create_url('account/switch', array('id' => $row['weid']))?>">切换</a></span>
					<span class="pull-left"><?php  echo $row['name'];?> <small>（微信号：<?php  echo $row['account'];?>）（所属用户：<?php  if(in_array($row['uid'], $founder)) { ?><span>创始人</span><?php  } else { ?><span><?php  echo $users[$row['uid']]['username'];?></span><?php  } ?>）</small></span>
				</h4>
			</div>
			<div class="tbody">
				<div class="con">
					<div class="name pull-left">API地址</div>
					<div class="input-group" id="api_<?php  echo $row['weid'];?>">
						<input id="" class="form-control" type="text" value="<?php  echo $_W['siteroot'];?>api.php?hash=<?php  echo $row['hash'];?>">
						<span class="input-group-btn">
						<button class="btn btn-info btn-sm" type="button">复制</button>
						</span>
					</div>
				</div>
				<div class="con">
					<div class="name pull-left">Token</div>
					<div class="input-group" id="token_<?php  echo $row['weid'];?>">
						<input id="" class="form-control" type="text" value="<?php  echo $row['token'];?>"><span class="input-group-btn">
						<button class="btn btn-info btn-sm" type="button">复制</button></span>
					</div>
				</div>
			</div>
			<script>
				$(function() {
					$("#api_<?php  echo $row['weid'];?> button").zclip({
						path:'./resource/script/ZeroClipboard.swf',
						copy:$('#api_<?php  echo $row['weid'];?> input').val()
					});
					$("#token_<?php  echo $row['weid'];?> button").zclip({
						path:'./resource/script/ZeroClipboard.swf',
						copy:$('#token_<?php  echo $row['weid'];?> input').val()
					});
				});
			</script>
			<?php  } } ?>
		</div>
		<?php  echo $pager;?>
	</div>
<?php  include template('common/footer', TEMPLATE_INCLUDEPATH);?>
