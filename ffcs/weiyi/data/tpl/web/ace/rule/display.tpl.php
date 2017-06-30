<?php defined('IN_IA') or exit('Access Denied');?><?php  if($is_activity) { ?>
<?php  include template('rule/activity_header', TEMPLATE_INCLUDEPATH);?>
<?php  } else { ?>
<?php  include template('rule/common_header', TEMPLATE_INCLUDEPATH);?>
<?php  } ?>
<style>
	ul{list-style:none;}
	.rule ul li{float:left;padding-left:6px;}
</style>
<div class="main">
    <p>
        <a <?php  if($module == 'all') { ?>href="<?php  echo create_url('rule/post');?>"
        <?php  } else { ?>href="<?php  echo create_url('rule/post',array('module'=>$module,'activity'=>$is_activity));?>"<?php  } ?>
         class="btn btn-sm btn-primary"><i class="icon-plus"></i>
        	 添加<?php  if($is_activity) { ?><?php  echo $activity_title;?><?php  } else { ?>规则<?php  } ?></a>
    </p>
    <?php  if(!$is_activity) { ?>
    <!--<ul class="nav nav-tabs" id="myTab">
        <li <?php  if('all' == $module) { ?>class='active'<?php  } ?>><a href="<?php  echo create_url('rule/display', array('module' => 'all', 'keyword' => $_GPC['keyword']))?>">全部</a></li>
        <?php  if(is_array($modules)) { foreach($modules as $row) { ?>
        <?php  if($row['issystem']) { ?><li <?php  if($row['name'] == $module) { ?>class='active'<?php  } ?>><a href="<?php  echo create_url('rule/display', array('module' => $row['name'], 'keyword' => $_GPC['keyword']))?>"><?php  echo $row['title'];?></a></li><?php  } ?>
        <?php  } } ?>
        <li class="dropdown <?php  if(!empty($modules[$module]) && $modules[$module]['issystem'] == 0) { ?>active<?php  } ?>">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">更多 <b class="caret"></b></a>
            <ul class="dropdown-menu dropdown-info">
            <?php  if(is_array($modules)) { foreach($modules as $row) { ?>
                <?php  if(!$row['issystem']) { ?><li <?php  if($row['name'] == $_GPC['module']) { ?>class='active'<?php  } ?>><a href="<?php  echo create_url('rule/display', array('module' => $row['name'], 'keyword' => $_GPC['keyword']))?>"><?php  echo $row['title'];?></a></li><?php  } ?>
        	<?php  } } ?>
        	</ul>
        </li>
	</ul> <br/>-->
    <form action="rule.php" method="get">
         <input type="hidden" name="act" value="display" />
         <input type="hidden" name="module" value="<?php  echo $_GPC['module'];?>" />
         <table class="table table-striped table-bordered table-hover">
             <tbody>
 			    <tr>
	                <th>状态</th>
	                <td>
	                    <select name="status">
	                        <option value="1" <?php  if($_GPC['status'] == '1') { ?> selected<?php  } ?>>启用</option>
	                        <option value="0" <?php  if($_GPC['status'] == '0') { ?> selected<?php  } ?>>禁用</option>
	                    </select>
	                </td>
                </tr>
	 			<tr>
                   <th>关键字</th>
                   <td>
                       <input class="span6" name="keyword" id="" type="text" value="<?php  echo $_GPC['keyword'];?>">
                   </td>
                </tr>
                <tr class="search-submit">
                    <td colspan="2"><button class="btn btn-sm btn-primary"><i class="icon-search"></i> 搜索</button></td>
                </tr>
 			</tbody>
         </table>
     </form>
    <?php  } ?>
   	<div class="rule">
		<form action="" method="post" onsubmit="">
			<div class="sub-content">
		   	<table class="table table-striped table-bordered table-hover">
				<thead class="navbar-inner">
					<tr>
						<th style="<?php  if($module=='all') { ?>width:24%;<?php  } else { ?>width:34%;<?php  } ?>" class="row-hover">规则名称<i></i></th>
						<?php  if($module=='all') { ?><th style="width:10%;">规则类型<i></i></th><?php  } ?>
						<th style="width:30%;">关键字<i></i></th>
						<th style="width:36%;text-align:center;">操作<i></i></th>
					</tr>
				</thead>
				<tbody>
				<?php  if(is_array($list)) { foreach($list as $row) { ?>
					<tr>
						<td><?php  echo $row['name'];?></td>
						<?php  if($module=='all') { ?><td><?php  echo $_W['modules'][$row['module']]['title'];?> <?php  if($row['displayorder'] > 0) { ?>（优先级：<?php  if($row['displayorder'] == '255') { ?>置顶<?php  } else { ?><?php  echo $row['displayorder'];?><?php  } ?>）<?php  } ?></td><?php  } ?>
						<td>
							<div>
		                        <?php  if(is_array($row['keywords'])) { foreach($row['keywords'] as $kw) { ?>
		                        <span class="label  label-success"><?php  echo $kw['content'];?></span>
		                        <?php  } } ?>
		                    </div>
						</td>
						<td>
							<div class="action-buttons" >
		                        <ul style="margin:0px;">
		                        	<?php  if($row['options']) { ?>
			                        <?php  if(is_array($row['options'])) { foreach($row['options'] as $opt) { ?>
			                        <li><a href="<?php  echo $opt['link'];?>" target="_blank"><?php  echo $opt['title'];?></a></li>
			                        <?php  } } ?>
			                        <?php  } ?>
			                        <li><a target="main" href="<?php  echo create_url('site/module/trend', array('name' => 'stat', 'id' => $row['id']))?>">使用率走势</a></li>
		                        	<li><a href="<?php  echo create_url('rule/post', array('id' => $row['id']))?>"><i class="icon-edit"></i> 编辑</a></li>
		                        	
		                        	<li class="dropdown">
							            <a class="dropdown-toggle" data-toggle="dropdown" href="#">更多 <b class="caret"></b></a>
							            <ul class="dropdown-menu dropdown-info">
							            	<li><a onclick="return confirm('删除规则将同时删除关键字与回复，确认吗？');return false;" href="<?php  echo create_url('rule/delete', array('id' => $row['id'], 'type' => 'rule'))?>"><i class="icon-remove-sign"></i> 删除</a></li>
							        		<li><?php  if(is_array($_W['account']['welcome']) && $_W['account']['welcome']['id'] == $row['id']) { ?><a href="<?php  echo create_url('rule/system/cancel', array('type' => 'welcome'))?>" onclick="ajaxopen(this.href, message);return false;" style="color:#FF3300" switch="1">取消欢迎信息</a><?php  } else { ?><a class="a-style" href="<?php  echo create_url('rule/system/set', array('id' => $row['id'], 'type' => 'welcome'))?>" onclick="ajaxopen(this.href, message);return false;" switch="0">设为欢迎信息</a><?php  } ?></li>
							        		<li><?php  if(is_array($_W['account']['default']) && $_W['account']['default']['id'] == $row['id']) { ?><a href="<?php  echo create_url('rule/system/cancel', array('type' => 'default'))?>" onclick="ajaxopen(this.href, message);return false;" style="color:#FF3300" switch="1">取消默认回复</a><?php  } else { ?><a class="a-style" href="<?php  echo create_url('rule/system/set', array('id' => $row['id'], 'type' => 'default'))?>" onclick="ajaxopen(this.href, message);return false;" switch="0">设为默认回复</a><?php  } ?></li>
							        		<li><?php  if(is_array($_W['account']['default_message']) && $_W['account']['default_message']['location']['id'] == $row['id']) { ?><a href="<?php  echo create_url('rule/system/cancel', array('type' => 'location'))?>" onclick="ajaxopen(this.href, message);return false;" style="color:#FF3300" switch="1">取消地理位置回复</a><?php  } else { ?><a class="a-style" href="<?php  echo create_url('rule/system/set', array('id' => $row['id'], 'type' => 'location'))?>" onclick="ajaxopen(this.href, message);return false;" switch="0">设为地理位置回复</a><?php  } ?></li>
							        	</ul>
							        </li>
	                        	</ul>
		                    </div>
						</td>
					</tr>
				<?php  } } ?>
				</tbody>
			</table>
			</div>
		</form>
		<?php  echo $pager;?>
   	</div>
    
</div>
<script type="text/javascript">
<!--
    var category = <?php  echo json_encode($children)?>;

//-->
</script>
<?php  include template('common/footer', TEMPLATE_INCLUDEPATH);?>
