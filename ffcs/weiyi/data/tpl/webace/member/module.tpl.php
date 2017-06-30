<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'公众号管理'),array('title'=>'模块设置'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>

<div class="page-header">
    <h1>
        <i class="icon-user"></i> 模块设置
    </h1>
</div>

<style type="text/css">
    .thumbnail{ height: auto; /* height:245px; */ margin-bottom: 20px;}
    .thumbnail img{ max-width: 100%;}
</style>
<div class="main">
		<div class="module">
            <div class="row">
				<?php if(is_array($modulelist)) { foreach($modulelist as $row) { ?>
                <div class="col-xs-4" style="height:auto;">
                    <div class="thumbnail">
                        <div class="module-pic">
                            <img src="./source/modules/<?php echo strtolower($row['name']);?>/preview.jpg" onerror="this.src='./resource/image/module-nopic-big.jpg'" <?php if(!$row['enabled']) { ?>class="gray"<?php } ?>>
                            <div class="module-detail">
                                <h5 class="module-title"><?php echo $row['title'];?><small>（标识：<?php echo $row['name'];?>）</small></h5>
                                <p class="module-brief"><?php echo $row['ability'];?></p>
                                <p class="module-description"><?php echo $row['description'];?> <?php if($row['isrulefields']) { ?><a href="<?php echo create_url('rule/post', array('module' => $row['name']))?>" class="text-info">添加规则</a><?php } ?></p>
                            </div>
                        </div>
                        <div class="module-button">
                            <?php if($row['displayorder'] > '-1') { ?>
                            <?php if($row['enabled']) { ?>
                            <?php if($row['displayorder'] == '-1') { ?>
                            <a href="#" class="pull-right"><span>系统模块</span></a>
                            <?php } else if($row['displayorder'] == 127) { ?>
                            <a class="pull-right module-priority">优先级：<span>默认级别</span></a>
                            <?php } else { ?>
                            <a class="pull-right module-priority">优先级：<span><?php echo $row['displayorder'];?></span></a>
                            <?php } ?>
                            <a id="enabled_<?php echo $row['mid'];?>_0" href="<?php echo create_url('member/module/enable', array('mid' => $row['mid'], 'enabled' => 0))?>" onclick="return ajaxopen(this.href)" class="btn btn-sm btn-primary module-button-switch">禁用</a>
                            <?php } else { ?>
                            <a id="enabled_<?php echo $row['mid'];?>_1" href="<?php echo create_url('member/module/enable', array('mid' => $row['mid'], 'enabled' => 1))?>" onclick="return ajaxopen(this.href);" class="btn btn-sm btn-danger module-button-switch">启用</a>
                            <?php } ?>
                            <?php } else { ?>
                            <span class="pull-right module-priority text-error">系统模块始终优先</span>
                            <?php } ?>
                            <?php if($row['settings'] && $row['enabled']) { ?><a href="<?php echo create_url('member/module/setting', array('mid' => $row['mid']))?>" class="btn btn-sm btn-primary module-button-switch">设置</a><?php } ?>
                            <div class="popover top navbar-inverse">
                                <div class="arrow"></div>
                                <h3 class="popover-title">选择优先级</h3>
                                <div class="popover-content">
                                    <?php if($row['enabled']) { ?>
                                    <?php if(!$row['issystem']) { ?>
                                    <select onchange="ajaxopen('<?php echo create_url('member/module/displayorder', array('mid' => $row['mid']))?>&displayorder=' + this.options[this.selectedIndex].value)">
                                        <option <?php if($row['displayorder'] == 0) { ?> selected="selected"<?php } ?> value="0">默认级别</option>
                                        <option <?php if($row['displayorder'] == 1) { ?> selected="selected"<?php } ?>value="1">1</option>
                                        <option <?php if($row['displayorder'] == 2) { ?> selected="selected"<?php } ?>value="2">2</option>
                                        <option <?php if($row['displayorder'] == 3) { ?> selected="selected"<?php } ?>value="3">3</option>
                                        <option <?php if($row['displayorder'] == 4) { ?> selected="selected"<?php } ?>value="4">4</option>
                                        <option <?php if($row['displayorder'] == 5) { ?> selected="selected"<?php } ?>value="5">5</option>
                                    </select>
                                    <?php } else { ?>
                                    系统模块始终优先
                                    <?php } ?>
                                    <?php } ?>
                                    <p>优先级数字越大，模块执行越优先，反之则反。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				<?php } } ?>
			</div>
			<div>
				<?php echo $pager;?>
			</div>
		</div>
		<!-- The End -->
	</div>
</div>
	<script type="text/javascript">
		function toggle_description(id) {
			var container = $('#'+id).parent().parent().parent();
			var status = $('#'+id).attr("status");
			if(status == 1) {
				$('#'+id).attr("status", "0")
				container.find(".module_description").show();
			} else {
				$('#'+id).attr("status", "1")
				container.find(".module_description").hide();
			}
		}
		$(function() {
			$('.module .thumbnails').delegate('li .module-button-switch', 'click', function(){ //控制模块开关
				if($(this).hasClass('btn-primary')) { //禁用模块
					$(this).removeClass('btn-primary').addClass('btn-danger').html('开启');
				} else if($(this).hasClass('btn-danger')) { //开启模块
					$(this).removeClass('btn-danger').addClass('btn-primary').html('禁用');
				}
				$(this).parent().parent().find('.module-pic img').toggleClass('gray');
			});
			$('.module .thumbnails').delegate('li', 'hover', function(){ //控制模块详细信息
				$(this).find('.module-title,.module-brief').toggle();
				$(this).find('.module-description').toggle('fast');
			});
			$('.module .thumbnails').delegate('li a.module-priority', 'click', function(){ //控制优先级对话框
				$(this).parent().find('.popover').toggle();
			});
			$('.module .thumbnails').delegate('li .popover select', 'change', function(){ //设置优先级之后
				$(this).parent().parent().hide().parent().find('.module-priority span').html($(this).val());
			});
			$('.module .thumbnails li').each(function(i) {
				//if(i%3==0) $(this).css('margin-left', '0');
			});
		});
	</script>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>
