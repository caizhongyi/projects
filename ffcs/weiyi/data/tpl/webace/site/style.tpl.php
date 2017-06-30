<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'微站功能 '),array('title'=>'风格设置 '))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>

<?php include template('site/nav_style', TEMPLATE_INCLUDEPATH);?>
<?php if($_W['isfounder']) { ?>
<ul class="nav nav-tabs">
    <li <?php if(empty($do)) { ?>class="active"<?php } ?>><a href="<?php echo create_url('site/style')?>">已安装风格</a></li>
    <li <?php if($do == 'uninstalltemplates') { ?>class="active"<?php } ?>><a href="<?php echo create_url('site/style',array('do'=>'uninstalltemplates'))?>">未安装风格</a></li>
</ul>
<?php } ?>
<div class="main">
	<?php if($do != 'uninstalltemplates') { ?>
	<ul class="unstyled template-style" style="list-style-type:none">
	<?php if(is_array($templates)) { foreach($templates as $item) { ?>
	<li>
		<div class="template-style-pic <?php if($_W['account']['styleid'] == $item['id']) { ?>on<?php } ?>"> <!--设为默认风格时class中加on-->
            <div class="title">
            	<?php if($_W['isfounder']) { ?><a href="<?php echo create_url('site/style/uninstall', array('templateid' => $item['name']))?>" class="icon-remove" title="移除"></a><?php } ?>
            <span class="pull-left"><?php echo $item['title'];?> (<?php echo $item['name'];?>)</span></div>
            <img style="max-width: 100%; height: auto;" src="./themes/mobile/<?php echo $item['name'];?>/preview.png" />
			<?php if($_W['account']['styleid'] == $item['id']) { ?><span class="icon-ok"></span><?php } ?>
		</div>
		<div class="template-style-button"><a href="<?php echo create_url('site/style/default', array('templateid' => $item['id']))?>">设为默认</a> <a href="<?php echo create_url('site/style/designer', array('templateid' => $item['id']))?>">设计风格</a>
            <a href="javascript:;" onclick="ajaxpreview('<?php echo $item['id']?>');return false;">预览</a></div>
	</li>
	<?php } } ?>
	</ul>
	<?php } ?>
    <ul class="unstyled template-style clearfix" style="list-style-type:none">
        <?php if(is_array($uninstallTemplates)) { foreach($uninstallTemplates as $item) { ?>
        <li>
            <div class="template-style-pic">
                <div class="title"><span class="pull-left"><?php echo $item['title'];?> (<?php echo $item['name'];?>)</span></div>
                <img src="./themes/mobile/<?php echo $item['name'];?>/preview.png" />
                <span class="icon-ok"></span>
                <a href="<?php echo create_url('site/style/install', array('templateid' => $item['name']))?>" class="btn btn-danger pull-right" style="position:absolute; bottom:5px; right:5px;">安装</a>
            </div>
        </li>
        <?php } } ?>
    </ul>
	</div>
<script type="text/javascript">
<!--
    function ajaxpreview(templetid) {
        var modalobj = $('#modal-preview');

        if(modalobj.length == 0) {
            $(document.body).append('<div id="modal-preview" class="modal  fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel" >\
                                                <div class="modal-dialog" style="width:380px;">\
                                                <div class="modal-content" >\
                                                    <div class="modal-header">\
                                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                                        <h4 class="modal-title" id="myModalLabel">预览</h4>\
                                                    </div>\
                                                    <div class="modal-body"></div>\
                                                    <div class="modal-footer"><a href="<?php echo $_W['siteroot'];?><?php echo create_url('mobile/channel', array('name' => 'index', 'weid' => $_W['weid']))?>&templetid='+templetid+'" target="preview" class="btn btn-sm btn-primary">首页</a><a href="<?php echo $_W['siteroot'];?><?php echo create_url('mobile/channel', array('name' => 'home', 'weid' => $_W['weid']))?>&templetid='+templetid+'" target="preview" class="btn btn-sm btn-primary">个人中心</a><a href="#" class="btn" data-dismiss="modal" aria-hidden="true">关闭</a></div>' +
                        '</div>' +
                        '</div>' +
                '</div>');
            var modalobj = $('#modal-preview');
        }
        html = '<iframe width="100%" scrolling="yes" height="100%" frameborder="0" src="<?php echo $_W['siteroot'];?><?php echo create_url('mobile/channel', array('name' => 'index', 'weid' => $_W['weid']))?>&templetid='+templetid+'" id="preview" name="preview" style="width: 320px; overflow: visible; height: 480px;"></iframe>';
        modalobj.find('.modal-body').html(html);
        foot = '<a href="<?php echo $_W['siteroot'];?><?php echo create_url('mobile/channel', array('name' => 'index', 'weid' => $_W['weid']))?>&templetid='+templetid+'" target="preview" class="btn">首页</a><a href="<?php echo $_W['siteroot'];?><?php echo create_url('mobile/channel', array('name' => 'home', 'weid' => $_W['weid']))?>&templetid='+templetid+'" target="preview" class="btn">个人中心</a><a href="#" class="btn" data-dismiss="modal" aria-hidden="true">关闭</a>';
        modalobj.find('.modal-footer').html(foot);
        modalobj.on('hidden', function(){modalobj.remove();});
        return modalobj.modal({'show' : true});
    }
//-->
</script>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>