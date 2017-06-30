<?php defined('IN_IA') or exit('Access Denied');?><div class="page-header">
    <h1>
        <i class="icon-dashboard"></i> 风格设置
    </h1>
</div>
<ul class="nav nav-tabs">
	<li<?php if($action == 'style' && empty($do)) { ?> class="active"<?php } ?>><a href="<?php echo create_url('site/style');?>">风格管理</a></li>
	<?php if($do == 'designer') { ?><li class="active"><a href="<?php echo create_url('site/nav/post');?>">设计风格</a></li><?php } ?>
</ul>