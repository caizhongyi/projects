<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'自动回复'),array('title'=>'回复分类管理'),array('title'=>'分类详细设置'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>

<div class="page-header">
    <h1>
        <i class="icon-cog"></i> 分类详细设置
    </h1>
</div>
	<div class="main">
		<form action="" method="post" class="form-horizontal form" enctype="multipart/form-data">
		<input type="hidden" name="parentid" value="<?php echo $parent['id'];?>" />
			<table class="tb">
				<?php if(!empty($parentid)) { ?>
				<tr>
					<th><label for="">上级分类</label></th>
					<td>
						<?php echo $parent['name'];?>
					</td>
				</tr>
				<?php } ?>
				<tr>
					<th><label for="">排序</label></th>
					<td>
						<input type="text" name="displayorder" class="span6" value="<?php echo $category['displayorder'];?>" />
					</td>
				</tr>
				<tr>
					<th><label for="">分类名称</label></th>
					<td>
						<input type="text" name="name" class="span6" value="<?php echo $category['name'];?>" />
					</td>
				</tr>
				<tr>
					<th><label for="">分类描述</label></th>
					<td>
						<textarea name="description" class="span6" cols="70"><?php echo $category['description'];?></textarea>
					</td>
				</tr>
				<tr>
					<th><label for="">分类图片</label></th>
					<td>
						<input type="file" name="icon" class="span6" value="" />
						<?php if($category['icon']) { ?>
						<p ><img src="<?php echo $_W['attachurl'];?><?php echo $category['icon'];?>" width="100"/></p>
						<?php } ?>
					</td>
				</tr>
				<tr>
					<th><label for="">设为栏目</label></th>
					<td>
						<label for="isshow1" class="radio inline"><input type="radio" name="enabled" value="1" id="isshow1" <?php if($category['enabled'] == '1') { ?>checked="true"<?php } ?>> 是</label>&nbsp;&nbsp;&nbsp;<label for="isshow0" class="radio inline"><input type="radio" name="enabled" value="0" id="isshow0"  <?php if($category['enabled'] == '0') { ?>checked="true"<?php } ?>> 否</label>
					</td>
				</tr>
				<tr>
					<th></th>
					<td>
						<input name="submit" type="submit" value="提交" class="btn btn-sm btn-primary">
						<input type="hidden" name="token" value="<?php echo $_W['token'];?>" />
					</td>
				</tr>
			</table>
		</form>
    </div>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>