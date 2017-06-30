<?php defined('IN_IA') or exit('Access Denied');?><div class="page-header">
    <h1>
        <?php if($action == 'style' && (empty($do) || $do == 'uninstalltemplates')) { ?>
        <i class="icon-dashboard"></i> 风格设置
        <?php } ?>
        <?php if($action == 'style' && $do == 'designer') { ?>
        <i class="icon-dashboard"></i> 风格详细设计
        <?php } ?>
    </h1>
</div>