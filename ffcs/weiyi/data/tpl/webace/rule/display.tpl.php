<?php defined('IN_IA') or exit('Access Denied');?><?php if($is_activity) { ?>
<?php include template('rule/activity_header', TEMPLATE_INCLUDEPATH);?>
<?php } else { ?>
<?php include template('rule/common_header', TEMPLATE_INCLUDEPATH);?>
<?php } ?>
<div class="main">
    <p>
        <a href="<?php if($is_activity) { ?><?php echo create_url('rule/post',array('module'=>$module,'activity'=>1))?><?php } else { ?><?php echo create_url('rule/post')?><?php } ?>" class="btn btn-sm btn-primary"><i class="icon-pencil"></i>添加<?php if($is_activity) { ?><?php echo $activity_title;?><?php } else { ?>规则<?php } ?></a>
    </p>
    <div class="widget-box">
        <div class="widget-header">
            <h4>
                <i class="icon-search"></i>
                规则查找
            </h4>
        </div>
        <div class="widget-body">
            <div class="widget-main">

                <form action="rule.php" method="get">
                    <input type="hidden" name="act" value="display" />
                    <table class="table table-bordered tb">
                        <tbody>
                        <tr>
                            <th>规则类型</th>
                            <td>
                                <ul class="nav nav-pills">
                                    <li <?php if('all' == $module) { ?>class='active'<?php } ?>><a href="<?php echo create_url('rule/display', array('module' => 'all', 'keyword' => $_GPC['keyword']))?>">全部</a></li>
                                    <?php if(is_array($modules)) { foreach($modules as $row) { ?>
                                    <?php if($row['issystem']) { ?><li <?php if($row['name'] == $module) { ?>class='active'<?php } ?>><a href="<?php echo create_url('rule/display', array('module' => $row['name'], 'keyword' => $_GPC['keyword']))?>"><?php echo $row['title'];?></a></li><?php } ?>
                                    <?php } } ?>
                                    <li class="dropdown">
                                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">更多 <b class="caret"></b></a>
                                        <ul class="dropdown-menu">
                                            <?php if(is_array($modules)) { foreach($modules as $row) { ?>
                                            <?php if(!$row['issystem']) { ?><li <?php if($row['name'] == $_GPC['module']) { ?>class='active'<?php } ?>><a href="<?php echo create_url('rule/display', array('module' => $row['name'], 'keyword' => $_GPC['keyword']))?>"><?php echo $row['title'];?></a></li><?php } ?>
                                    <?php } } ?>
                                </ul>
                                </li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th>状态</th>
                            <td>
                                <select name="status">
                                    <option value="1" <?php if($_GPC['status'] == '1') { ?> selected<?php } ?>>启用</option>
                                    <option value="0" <?php if($_GPC['status'] == '0') { ?> selected<?php } ?>>禁用</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>关键字</th>
                            <td>
                                <input class="span6" name="keyword" id="" type="text" value="<?php echo $_GPC['keyword'];?>">
                            </td>
                        </tr>
                        <tr class="search-submit">
                            <td colspan="2"><button class="btn btn-sm btn-primary"><i class="icon-search"></i> 搜索</button></td>
                        </tr>
                        </tbody>
                    </table>
                </form></div>
        </div>
    </div>
    <div class="rule">
        <?php if(is_array($list)) { foreach($list as $row) { ?>
        <table class="tb table table-bordered">
            <tr class="control-group">
                <td class="rule-content">
                    <h4>
                        <span class="pull-right"><a onclick="return confirm('删除规则将同时删除关键字与回复，确认吗？');return false;" href="<?php echo create_url('rule/delete', array('id' => $row['id'], 'type' => 'rule'))?>">删除</a><a href="<?php echo create_url('rule/post', array('id' => $row['id']))?>">编辑</a></span>
                        <?php echo $row['name'];?> <small>（<?php echo $_W['modules'][$row['module']]['title'];?>）<?php if($row['displayorder'] > 0) { ?>（<?php if($row['displayorder'] == '255') { ?>置顶<?php } else { ?><?php echo $row['displayorder'];?><?php } ?>）<?php } ?></small>
                    </h4>
                </td>
            </tr>
            <tr class="control-group">
                <td class="rule-kw">
                    <div>
                        <?php if(is_array($row['keywords'])) { foreach($row['keywords'] as $kw) { ?>
                        <span><?php echo $kw['content'];?></span>
                        <?php } } ?>
                    </div>
                </td>
            </tr>
            <tr class="control-group">
                <td class="rule-manage">
					<span class="rule-type pull-right">
					<?php if($row['cate']['0']) { ?><a href="#"><?php echo $row['cate']['0']['name'];?></a><?php } ?>
					<?php if($row['cate']['1']) { ?><a href="#"><?php echo $row['cate']['1']['name'];?></a><?php } ?>
					</span>
                    <div>
                        <?php if(is_array($_W['account']['welcome']) && $_W['account']['welcome']['id'] == $row['id']) { ?><a href="<?php echo create_url('rule/system/cancel', array('type' => 'welcome'))?>" onclick="ajaxopen(this.href, message);return false;" style="color:#FF3300" switch="1">取消欢迎信息</a><?php } else { ?><a href="<?php echo create_url('rule/system/set', array('id' => $row['id'], 'type' => 'welcome'))?>" onclick="ajaxopen(this.href, message);return false;" switch="0">设为欢迎信息</a><?php } ?>
                        <?php if(is_array($_W['account']['default']) && $_W['account']['default']['id'] == $row['id']) { ?><a href="<?php echo create_url('rule/system/cancel', array('type' => 'default'))?>" onclick="ajaxopen(this.href, message);return false;" style="color:#FF3300" switch="1">取消默认回复</a><?php } else { ?><a href="<?php echo create_url('rule/system/set', array('id' => $row['id'], 'type' => 'default'))?>" onclick="ajaxopen(this.href, message);return false;" switch="0">设为默认回复</a><?php } ?>
                        <a target="main" href="<?php echo create_url('stat/trend/rule', array('id' => $row['id']))?>">使用率走势</a>
                        <?php if($row['options']) { ?>
                        <?php if(is_array($row['options'])) { foreach($row['options'] as $opt) { ?>
                        <a href="<?php echo $opt['link'];?>" target="_blank"><?php echo $opt['title'];?></a>
                        <?php } } ?>
                        <?php } ?>
                    </div>
                </td>
            </tr>
        </table>
        <?php } } ?>
    </div>
    <?php echo $pager;?>
</div>
<script type="text/javascript">
    <!--
    var category = <?php echo json_encode($children)?>;

    //-->
</script>

<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>
