<?php defined('IN_IA') or exit('Access Denied');?><?php  if($do == 'post') { ?><?php  $_W['breadcrumb'] = array(array('title'=>'系统管理'),array('title'=>'用户组管理 '),array('title'=>'添加用户组 '))?><?php  } ?>
<?php  if($do == 'display') { ?><?php  $_W['breadcrumb'] = array(array('title'=>'系统管理'),array('title'=>'用户组管理 '),array('title'=>'用户组列表 '))?><?php  } ?>
<?php  include template('common/header', TEMPLATE_INCLUDEPATH);?>
<div class="page-header">
    <h1>
        <?php  if($do == 'post') { ?><i class="icon-pencil"></i> 添加用户组<?php  } else { ?><i class="icon-user"></i> 用户组列表<?php  } ?>
    </h1>
</div>
<?php  if($do != 'display') { ?>
<ul class="nav nav-tabs" style="margin-bottom: 20px;">
	<li <?php  if($do == 'post') { ?>class="active"<?php  } ?>><a href="<?php  echo create_url('member/group/post');?>"><?php  if($id) { ?>编辑<?php  } else { ?>添加<?php  } ?>用户组</a></li>
	<li <?php  if($do == 'display') { ?>class="active"<?php  } ?>><a href="<?php  echo create_url('member/group/display');?>">用户组列表</a></li>
</ul>
<?php  } ?>
<?php  if($do == 'post') { ?>
<form class="form-horizontal form" action="" method="post" enctype="multipart/form-data">
<div class="main">
	<input type="hidden" name="id" value="<?php  echo $id;?>" />
	<input type="hidden" name="templateid" value="<?php  echo $template['id'];?>">
	
	<div class="widget-box" >
		<div id="accordion" class="accordion-style1 panel-group">
			<!-- one begin -->
			<div class="panel-heading">
				<h4 class="panel-title">
					<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
						<i class="bigger-110 icon-angle-down" data-icon-hide="icon-angle-down" data-icon-show="icon-angle-right"></i>
						基本信息
					</a>
				</h4>
			</div>
			<div class="panel-collapse in" id="collapseOne" style="height: auto;">
				<div class="panel-body" style="border:none;">
					<table class="tb" style="margin-top:-15px;">
						<tr>
							<th><label for="">名称</label></th>
							<td>
								<input type="text" class="span4" name="name" id="name" value="<?php  echo $item['name'];?>" />
							</td>
						</tr>
						<tr>
							<th><label for="">公众号数量</label></th>
							<td>
								<input type="text" class="span4" name="maxaccount" value="<?php  echo $item['maxaccount'];?>" />
								<span class="help-block">限制公众号的数量，为0则不限制。</span>
							</td>
						</tr>
                        <tr>
							<th><label for="">用户组管理员</label></th>
							<td>
								<select id="parent_group">
                                	<option value="0">无</option>
                                    <?php  if(is_array($arr_groups)) { foreach($arr_groups as $key_group => $val_group) { ?>
                                    <option value="<?php  echo $key_group;?>" <?php  if($item['parent_group']==$key_group) { ?>selected="selected"<?php  } ?>><?php  echo $val_group;?></option>
                                    <?php  } } ?>
                                </select>
                                <select name="parent_ids">
                                    <option value="0">无</option>
                                </select>(该用户组管理员可以查看当前用户组下所有的公众帐号)
							</td>
						</tr>
					</table>
                    <script>
                    	$(function(){
							$('#parent_group').change(function(){
								change_group($(this).val(),0);
							});
							change_group($('#parent_group').val(),"<?php  echo $item['parent_ids'];?>");
						});
						function change_group(groupid,uid){
							$.ajax({
								url: "member.php?act=group&do=get_members&groupid="+groupid+"&uid="+uid,
								dataType: 'html',
								success: function(html) {
									$('select[name=parent_ids]').html(html);
								}
							});
						}
                    </script>
				</div>
			</div>
			<div class="panel-heading">
				<h4 class="panel-title">
					<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
						<i class="bigger-110 icon-angle-down" data-icon-hide="icon-angle-down" data-icon-show="icon-angle-right"></i>
						设置当前用户允许访问的模块
					</a>
				</h4>
			</div>
			<div class="panel-collapse in" id="collapseTwo" style="height: auto;">
				<div class="panel-body" style="border:none;">
				<table class="tb" style="margin-top:-15px;">
					<tr>
						<td colspan="2">
							<div class="sub-item" id="table-list">
								<div class="sub-content">
									<table class="table table-hover">
										<thead class="navbar-inner">
											<tr>
												<th style="width:40px;" class="row-first">选择</th>
												<th>模块名称</th>
												<th>模块标识</th>
												<th>功能简介</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											<?php  if(is_array($modules)) { foreach($modules as $module) { ?>
											<tr>
												<td class="row-first"><?php  if(!$module['issystem']) { ?><input class="modules" type="checkbox" value="<?php  echo $module['mid'];?>" name="modules[]" <?php  if(!empty($item['modules']) && in_array($module['mid'], $item['modules'])) { ?>checked<?php  } ?> /><?php  } else { ?><input class="modules" type="checkbox" value="<?php  echo $module['mid'];?>" name="modules[]" disabled checked /><?php  } ?></td>
												<td><?php  echo $module['title'];?></td>
												<td><?php  echo $module['name'];?></td>
												<td><?php  echo $module['ability'];?></td>
												<td><?php  if($module['issystem']) { ?><span class="label label-success">系统模块</span><?php  } ?></td>
											</tr>
											<?php  } } ?>
										</tbody>
									</table>
								</div>
							</div>
						</td>
					</tr>
				</table>
				</div>
			</div>
			<div class="panel-heading">
				<h4 class="panel-title">
					<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
						<i class="bigger-110 icon-angle-down" data-icon-hide="icon-angle-down" data-icon-show="icon-angle-right"></i>
						设置当前用户允许访问的模板
					</a>
				</h4>
			</div>
			<div class="panel-collapse in" id="collapseThree" style="height: auto;">
				<div class="panel-body" style="border:none;">
				<table class="tb" style="margin-top:-15px;">
					<tr>
						<td colspan="2">
							<div class="sub-item" id="table-list">
								<div class="sub-content">
									<table class="table table-hover">
										<thead class="navbar-inner">
											<tr>
												<th style="width:40px;" class="row-first">选择</th>
												<th>模板名称</th>
												<th>模板标识</th>
												<th>功能简介</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											<?php  if(is_array($templates)) { foreach($templates as $temp) { ?>
											<tr>
												<td class="row-first"><?php  if($temp['name'] != 'default') { ?><input class="modules" type="checkbox" value="<?php  echo $temp['id'];?>" name="templates[]" <?php  if(!empty($item['templates']) && in_array($temp['id'], $item['templates'])) { ?>checked<?php  } ?> /><?php  } else { ?><input class="modules" type="checkbox" value="<?php  echo $temp['id'];?>" name="templates[]" disabled checked /><?php  } ?></td>
												<td><?php  echo $temp['title'];?></td>
												<td><?php  echo $temp['name'];?></td>
												<td><?php  echo $temp['description'];?></td>
												<td></td>
											</tr>
											<?php  } } ?>
										</tbody>
									</table>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th></th>
						<td>
							<input name="token" type="hidden" value="<?php  echo $_W['token'];?>" />
							<input type="submit" class="btn btn-primary" name="submit" value="提交" />
						</td>
					</tr>
				</table>
				</div>
			</div>
		</div>
	</div>
</div>
</form>
<?php  } else if($do == 'display') { ?>
<p>
    <a href="<?php  echo create_url('member/group/post');?>" class="btn btn-sm btn-primary"><i class="icon-plus"></i> 添加用户组</a>
</p>
<form action="" method="post">
<div class="main">
	<div>
		<table class="table table-striped table-bordered table-hover">
			<thead class="navbar-inner">
				<tr>
					<th style="width:30px;">删？</th>
					<th style="width:150px;">名称</th>
					<th style="width:550px;">允许模块权限</th>
					<th>允许模板权限</th>
					<th>公众号数量</th>
					<th style="min-width:60px;">操作</th>
				</tr>
			</thead>
			<tbody>
				<?php  if(is_array($list)) { foreach($list as $item) { ?>
				<tr>
					<td><input type="checkbox" name="delete[]" value="<?php  echo $item['id'];?>" /></td>
					<td><?php  echo $item['name'];?></td>
					<td>
					<?php  if(is_array($item['modules'])) { foreach($item['modules'] as $module) { ?>
					<span class="label label-success"><?php  echo $module['title'];?></span>&nbsp;
					<?php  } } ?>
					</td>
					<td>
					<?php  if(is_array($item['templates'])) { foreach($item['templates'] as $temp) { ?>
					<span class="label label-success"><?php  echo $temp['title'];?></span>&nbsp;
					<?php  } } ?>
					</td>
					<td><?php  if(empty($item['maxaccount'])) { ?>不限<?php  } else { ?><?php  echo $item['maxaccount'];?><?php  } ?></td>
					<td>
						<span><a class="btn btn-info btn-xs" href="<?php  echo create_url('member/group/post', array('id' => $item['id']))?>">编辑</a></span>  &nbsp;
						<span>
							<a class="btn btn-primary btn-xs btn-priv" data-toggle="modal" data-target="#myModal2" data-id="<?php  echo $item['id'];?>">设置权限</a>
						</span>
					</td>
				</tr>
				<?php  } } ?>
			</tbody>
		</table>
        <div>
            <input name="token" type="hidden" value="<?php  echo $_W['token'];?>" />
            <input type="submit" class="btn btn-sm btn-primary" name="submit" value="提交" />
        </div>
	</div>
</div>
</form>
<script>
$(function(){
	$('.btn-priv').click(function(){
		var $id = $(this).attr('data-id');
		var $html = '<iframe id="iframe" src="member.php?act=group&do=priv&id='+$id+'" style="width:100%;height:500px;padding:10px 10px;" frameborder=0></iframe>';
		$('#modal-body').html($html);
	});
	$('#save-iframe').click(function(){
		$('#iframe').contents().find('[name=myform]').submit();
        $('#myModal2').modal('hide');
	});
});
</script>
<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">用户组设置权限</h4>
      </div>
      <div class="modal-body" id="modal-body" style="width:100%;margin:0 auto;text-align:center;">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary" id="save-iframe">保存</button>
      </div>
    </div>
  </div>
</div>

<?php  } ?>
<?php  include template('common/footer', TEMPLATE_INCLUDEPATH);?>