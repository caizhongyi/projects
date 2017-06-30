<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'自动回复'),array('title'=>'常用服务接入'))?>
<?php include $this->template('common/header', TEMPLATE_INCLUDEPATH);?>
<style>
.table td span{display:inline-block;}
.table td input{margin-bottom:0;}
</style>
<script type="text/javascript">
$(function(){
	$('.ace-switch').on('change', function (e, data) {
		var rids = [];
		$('input[name="switch-field"]:checked').each(function(){
			rids.push($(this).val());
		});
		$.post(location.href, {'rids': rids.toString()}, function(dat){
		});
	});
});
</script>

<div class="page-header">
	<h1>
		<i class="icon-cogs"></i> 常用服务接入
	</h1>
</div>
<form action="" method="post">
<div class="main">
	<div class="alert alert-info">
	你可以为你的公众账号接入一些常用的服务，点击下面的滑块进行开关。打开功能之后，用户对你的公众号输入相应关键字后即可使用相应的功能。
	</div>
		<table class="table table-hover table-bordered ">
			<thead>
				<tr>
					<th style="width:200px;">服务名称</th>
					<th style="min-width:260px;">功能说明</th>
					<th style="width:60px;">状态</th>
				</tr>
			</thead>
			<tbody>
				<?php if(is_array($ds)) { foreach($ds as $row) { ?>
				<tr>
					<td><?php echo $row['title'];?></td>
					<td><?php echo $row['description'];?></td>
					<td>
						<!-- <div class="make-switch" data-on-label="启用" data-off-label="停用">
							<input type="checkbox" value="<?php echo $row['rid'];?>"<?php echo $row['switch'];?> />
						</div> -->
						<label>
							<input type="checkbox" class="ace ace-switch" name="switch-field" value="<?php echo $row['rid'];?>" <?php echo $row['switch'];?> />
							<span class="lbl"></span>
						</label>
					</td>
				</tr>
				<?php } } ?>
			</tbody>
		</table>
</div>
</form>
<?php include $this->template('common/footer', TEMPLATE_INCLUDEPATH);?>
