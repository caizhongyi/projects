<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'微站功能 '),array('title'=>'导航管理'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>
<div class="page-header">
    <h1>
        <i class="icon-cog"></i> 导航管理
    </h1>
</div>
<?php include template('site/nav_menu', TEMPLATE_INCLUDEPATH);?>
<style>
.table td span{display:inline-block;margin-top:4px;}
.table td input{margin-bottom:0;}
</style>
<form action="" method="post">
<div class="main">
	<div>
		<table class="table table-striped table-bordered table-hover">
			<thead>
				<tr>
					<th style="width:30px;"></th>
					<th style="width:60px;">排序</th>
					<th style="width:45px;">图标</th>
					<th style="width:100px;">名称</th>
					<th style="width:60px;">位置</th>
					<th style="width:60px;">类型</th>
					<th style="width:200px;">链接</th>
					<th style="min-width:60px;">操作</th>
				</tr>
			</thead>
			<tbody>
				<?php if(is_array($navs)) { foreach($navs as $item) { ?>
				<tr>
					<td><input type="checkbox" name="status[<?php echo $item['id'];?>]" value="1" <?php if($item['status']) { ?> checked<?php } ?> /></td>
					<td><input type="text" class="span1" name="displayorder[<?php echo $item['id'];?>]" value="<?php echo $item['displayorder'];?>" /></td>
					<td><?php if($item['css']['icon']['icon']) { ?><i class="<?php echo $item['css']['icon']['icon'];?> icon-2x" ></i><?php } else { ?><?php if($item['icon']) { ?><img src="<?php echo $_W['attachurl'];?><?php echo $item['icon'];?>" style="width:30px;" /><?php } ?><?php } ?></td>
					<td><input type="text" class="span3" name="name[<?php echo $item['id'];?>]" value="<?php echo $item['name'];?>" /></td>
					<td><span><?php echo $position[$item['position']];?></span></td>
					<td><span><?php if($item['issystem']) { ?>内置<?php } else { ?>自定义<?php } ?></span></td>
					<td><span><?php echo $item['url'];?></span></td>
					<td><span><a href="<?php echo create_url('site/nav/post', array('id' => $item['id']))?>">编辑</a>&nbsp;<a href="<?php echo create_url('site/nav/delete', array('id' => $item['id']))?>">删除</a></span></td>
				</tr>
				<?php } } ?>
                <tr>
                    <td colspan="8">
                        <input name="submit" type="submit" class="btn btn-sm btn-primary" value="提交">
                        <input type="hidden" name="token" value="<?php echo $_W['token'];?>" />
                    </td>
                </tr>
			</tbody>
		</table>
	</div>
</div>
</form>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>