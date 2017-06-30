<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'微站功能 '),array('title'=>'风格设置 '))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>

<?php include template('site/nav_style', TEMPLATE_INCLUDEPATH);?>

<div class="main">
	<ul class="unstyled template-style">
	<?php if(is_array($templates)) { foreach($templates as $item) { ?>
	<li>
		<div class="template-style-pic <?php if($_W['account']['styleid'] == $item['id']) { ?>on<?php } ?>"> <!--设为默认风格时class中加on-->
			<img style="width:175px; height: 265px;" src="./themes/mobile/<?php echo $item['name'];?>/preview.jpg" />
			<span class="icon-ok"></span>
		</div>
		<div class="template-style-button"><a href="<?php echo create_url('site/style/default', array('templateid' => $item['id']))?>">设为默认</a> <a href="<?php echo create_url('site/style/designer', array('templateid' => $item['id']))?>">设计风格</a> <!--a href="<?php echo create_url('site/template', array('templateid' => $item['id']))?>">模板管理</a-->
		<a href="javascript:;" onclick="ajaxpreview('<?php echo $item['id']?>');return false;">预览</a></div>
	</li>
	<?php } } ?>
	</ul>
</div>
<script type="text/javascript">
<!--
	function ajaxpreview(templetid) {
		var modalobj = $('#modal-preview');

		if(modalobj.length == 0) {
			$(document.body).append('<div id="modal-preview" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true" style="position:absolute;top:5%;"></div>');
			var modalobj = $('#modal-preview');
		}
		html = '<iframe width="100%" scrolling="yes" height="100%" frameborder="0" src="<?php echo $_W['siteroot'];?><?php echo create_url('mobile/channel', array('name' => 'index', 'weid' => $_W['weid']))?>&templetid='+templetid+'" id="preview" name="preview" style="width: 320px; overflow: visible; height: 480px;"></iframe><div class="modal-footer"><a href="<?php echo $_W['siteroot'];?><?php echo create_url('mobile/channel', array('name' => 'index', 'weid' => $_W['weid']))?>&templetid='+templetid+'" target="preview" class="btn">首页</a><a href="<?php echo $_W['siteroot'];?><?php echo create_url('mobile/channel', array('name' => 'home', 'weid' => $_W['weid']))?>&templetid='+templetid+'" target="preview" class="btn">个人中心</a><a href="#" class="btn" data-dismiss="modal" aria-hidden="true">关闭</a></div>';
		modalobj.html(html);
		modalobj.css({'width' : 320, 'marginLeft' : 0 - 320 / 2});
		modalobj.css({'height' : 480});
		modalobj.on('hidden', function(){modalobj.remove();});
		return modalobj.modal({'show' : true});
	}
//-->
</script>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>