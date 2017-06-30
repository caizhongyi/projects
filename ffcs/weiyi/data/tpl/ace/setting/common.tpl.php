<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'系统管理 '),array('title'=>'其他设置'),array('title'=>'系统锁操作'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>


<div class="page-header">
    <h1>
        <i class="icon-cog "></i> 系统锁操作
    </h1>
</div>
	<div class="main">
		<form action="" method="post" class="form-horizontal form" onsubmit="return formcheck(this)">
			<table class="tb">
				<tr>
					<th>删除升级锁</th>
					<td>
						<input name="bae_delete_update" type="submit" value="删除" class="btn btn-sm btn-light" />
						<div class="help-block">升级“微擎”系统时，需要先删除升级锁，确保升级正常进行。</div>
					</td>
				</tr>
				<tr>
					<th>删除安装锁</th>
					<td>
						<input name="bae_delete_install" type="submit" value="删除" class="btn btn-sm btn-light" />
						<div class="help-block">重新安装“微擎”系统时，需要先删除安装锁。</div>
					</td>
				</tr>
			</table>
		</form>
	</div>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>
