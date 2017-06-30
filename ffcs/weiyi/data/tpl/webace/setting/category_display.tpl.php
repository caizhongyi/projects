<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'自动回复'),array('title'=>'回复分类管理'),array('title'=>'管理分类'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>


    <div class="page-header">
        <h1>
            <i class="icon-coffee"></i> 管理分类
        </h1>
    </div>
	<div class="main">
        <p>
            <a class="btn btn-sm btn-primary" href="<?php echo create_url('setting/category/post')?>"><i class="icon-pencil"></i>添加分类</a>
        </p>
        <div class="category">
			<form action="" method="post" onsubmit="return formcheck(this)">
			<table class="table table-striped table-bordered table-hover">
				<thead>
					<tr>
						<th style="width:80px;">显示顺序</th>
						<th>分类名称</th>
						<th style="width:80px;">设为栏目</th>
						<th style="width:80px;">操作</th>
					</tr>
				</thead>
				<tbody>
				<?php if(is_array($category)) { foreach($category as $row) { ?>
					<tr>
						<td><input type="text" class="span1" name="displayorder[<?php echo $row['id'];?>]" value="<?php echo $row['displayorder'];?>"></td>
						<td><div class="type-parent"><?php echo $row['name'];?>&nbsp;&nbsp;<?php if(empty($row['parentid'])) { ?><a href="<?php echo create_url('setting/category/post', array('parentid' => $row['id']))?>"><i class="icon-plus-sign-alt"></i> 添加子分类</a><?php } ?></div></td>
						<td><?php echo $row['enabled'] ? '是' : '否'?></td>
						<td><a href="<?php echo create_url('setting/category/post', array('id' => $row['id']))?>">编辑</a>&nbsp;&nbsp;<a href="<?php echo create_url('setting/category/delete', array('id' => $row['id']))?>" onclick="return confirm('确认删除此分类吗？');return false;">删除</a></td>
					</tr>
					<?php if(is_array($children[$row['id']])) { foreach($children[$row['id']] as $row) { ?>
					<tr>
						<td><input type="text" class="span1" name="displayorder[<?php echo $row['id'];?>]" value="<?php echo $row['displayorder'];?>"></td>
						<td><div class="type-child"><?php echo $row['name'];?>&nbsp;&nbsp;<?php if(empty($row['parentid'])) { ?><a href="<?php echo create_url('setting/category/post', array('parentid' => $row['id']))?>"><i class="icon-plus-sign-alt"></i> 添加子分类</a><?php } ?></div></td>
						<td><?php echo $row['enabled'] ? '是' : '否'?></td>
						<td><a href="<?php echo create_url('setting/category/post', array('id' => $row['id']))?>">编辑</a>&nbsp;&nbsp;<a href="<?php echo create_url('setting/category/delete', array('id' => $row['id']))?>" onclick="return confirm('确认删除此分类吗？');return false;">删除</a></td>
					</tr>
					<?php } } ?>
				<?php } } ?>
					<tr>
						<td colspan="4">
							<input name="submit" type="submit" class="btn btn-sm btn-primary" value="提交">
							<input type="hidden" name="token" value="<?php echo $_W['token'];?>" />
						</td>
					</tr>
				</tbody>
			</table>
			</form>
    </div></div>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>