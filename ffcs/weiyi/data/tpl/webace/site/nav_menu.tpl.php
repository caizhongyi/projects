<?php defined('IN_IA') or exit('Access Denied');?>
<?php if($action == 'nav' && empty($do)) { ?>
    <p>
        <a class="btn btn-sm btn-primary" href="<?php echo create_url('site/nav/post');?>"><i class="icon-pencil"></i><?php if($id) { ?>更新导航<?php } else { ?>添加导航 <?php } ?></a>
    </p>

<?php } ?>

<?php if($action == 'nav' && $do == 'post') { ?>

<?php } ?>
