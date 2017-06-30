<?php defined('IN_IA') or exit('Access Denied');?><?php  if($_GPC['act'] == 'display') { ?>
    <?php  $_W['breadcrumb'] = array(array('title'=>'自动回复'),array('title'=>'关键字自动回复'),array('title'=>'规则管理'))?>
    <?php  include template('common/header', TEMPLATE_INCLUDEPATH);?>
    <div class="page-header">
        <h1>
            <i class="icon-book"></i> 规则管理
        </h1>
    </div>
<?php  } else { ?>
    <?php  $_W['breadcrumb'] = array(array('title'=>'自动回复'),array('title'=>'关键字自动回复'),array('title'=>'添加规则'))?>
    <?php  include template('common/header', TEMPLATE_INCLUDEPATH);?>
    <div class="page-header">
        <h1>
            <i class="icon-book"></i> 添加规则 <small><i class="icon-double-angle-right"></i> 删除，修改规则、关键字以及回复后，请提交规则以保存操作。</small>
        </h1>
    </div>
<?php  } ?>