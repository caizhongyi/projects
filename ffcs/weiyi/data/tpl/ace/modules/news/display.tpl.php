<?php defined('IN_IA') or exit('Access Denied');?><div id="news-list">
	<?php if(!empty($reply)) { ?>
		<?php if(is_array($reply)) { foreach($reply as $key => $news) { ?>
		<div id="news-wrap-item-<?php echo $key;?>" class="alert alert-block alert-new wrap-item">
			<a data-dismiss="alert" class="close">×</a><h4 class="alert-heading">添加回复内容</h4>
			<div id="news-children-list">
			<?php include $this->template('item')?>
			<?php if(is_array($news['children'])) { foreach($news['children'] as $index => $news) { ?>
				<?php include $this->template('item')?>
			<?php } } ?>
			</div>
			<div class="reply-news-edit-button"><a href="javascript:;" onclick="newsHandler.buildForm('<?php echo $key;?>')" class="btn btn-sm btn-primary"><i class="icon-plus"></i> 添加多条内容</a></div>
		</div>
		<?php } } ?>
	<?php } ?>
</div>
<a href="javascript:;" onclick="newsHandler.buildItem()" class="add-reply-button"><i class="icon-plus"></i> 添加回复内容</a>
<!--span class="help-block">根据此处设置对应的回复内容，可设置多个。</span-->
<script type="text/html" id="news-form-html">
<?php unset($news); include $this->template('item');?>
</script>

<script type="text/javascript">
<!--
	var newsHandler = {
		'buildItem' : function() {
			var item = $('<div class="alert alert-block alert-new wrap-item"></div>');
			var size = $('#news-list').find('.wrap-item').size();
			var itemid = 'news-wrap-item-' + size;
			while ($('#news-list').find('#' + itemid).size() >= 1) {
				var itemid = 'news-wrap-item-' + (++size);
			}
			html = '<a class="close" data-dismiss="alert">×</a><h4 class="alert-heading">添加回复内容</h4><div id="news-children-list"></div><div class="reply-news-edit-button"><a href="javascript:;" onclick="newsHandler.buildForm(\''+size+'\')" class="btn btn-sm btn-primary"><i class="icon-plus"></i> 添加多条内容</a></div>';
			item.attr('id', itemid);
			item.html(html);
			$('#news-list').append(item);
			this.buildForm(size);
		},
		'buildForm' : function(itemid) {
			if ($('#news-children-list .item', $('#' + itemid)).size() >= 8) {
				message('单条图文信息最多添加八条内容！', '', 'error');
				return false;
			}
			this.updateList();
			var itemojb = $('#news-wrap-item-' + itemid);
			var obj = buildAddForm('news-form-html', $('#news-children-list', itemojb));
			obj.html(obj.html().replace(/\(wrapitemid\)/gm, itemojb.attr('id')));

			kindeditor($('#news-children-list', itemojb).find('.richtext-clone'));
			$('.reply-edit-cover-upload', obj).each(function(){
				if ($(this).css('display') != 'none') {
					kindeditorUploadBtn($(this));
				}
			});
		},
		'doEditItem' : function(itemid, wrapitemid) {
			this.updateList();
			var parent = $('#' + itemid, $('#' + wrapitemid));
			$('#form', parent).removeClass('hide').css('display', 'block');
			$('#show', parent).addClass('hide').css('display', 'none');
		},
		'updateList' : function(itemid) {
			$('#news-list .item').each(function(){
				$(this).find('#show').removeClass('hide').css('display', 'block').siblings().addClass('hide').css('display', 'none');
				if ($(this).index() == 0) {
					$(this).find('#show').addClass('reply-news-list-first');
				}
				var thumb = $(this).find('#upload-file-view img').attr('src');
				if (typeof thumb != 'undefined') {
					$(this).find('#show img').attr('src', thumb);
				}
				$(this).find('#show .title').html($(this).find("#form input[name^='news-title']").val());
				$(this).find('#show .content').html($(this).find("#form textarea[name^='news-description']").val());
			});
		}
	};
	<?php if(empty($rid)) { ?>
	$(function(){
		newsHandler.buildItem();
	});
	<?php } else { ?>
	kindeditor($('.richtext-clone'));
	$('.reply-edit-cover-upload').each(function(){
		kindeditorUploadBtn($(this));
	});
	<?php } ?>
//-->
</script>