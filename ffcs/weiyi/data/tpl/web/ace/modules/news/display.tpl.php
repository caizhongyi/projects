<?php defined('IN_IA') or exit('Access Denied');?> <div id="modal-module-menus" class="modal  fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-dialog"  style=" width:600px;">
        <div class="modal-content">
            <div class="modal-header"><button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button><h3 id="myModalLabel">扩展模块菜单</h3></div>
            <div class="modal-body">
                <table class="tb">
                    <tr>
                        <th><label for="">模块</label></th>
                        <td>
                            <select id="channel" autocomplete="off">
                                <option value="">选择类型</option>
                                <option value="article">文章</option>
                                <option value="album">相册</option>
                                <option value="business">商户</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="">搜索关键字</label></th>
                        <td>
                            <div class="input-append" style="display:block;">
                                <input type="text" class="span3" name="keyword" value="" id="keyword" /><button class="btn btn-sm btn-primary" onclick="buildNewsForm(); return false;">搜索</button>
                            </div>
                        </td>
                    </tr>
                </table>
                <div id="module-menus">

                </div>
            </div>
            <div class="modal-footer"><a href="#" class="btn" data-dismiss="modal" aria-hidden="true">关闭</a></div>
        </div>
    </div>
</div>

<div id="news-list">
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
	var w;
	var itemid = '';
	var newsHandler = {
		'buildItem' : function() {
			var item = $('<div class="alert alert-block alert-new wrap-item"></div>');
			var size = $('#news-list').find('.wrap-item').size();
			var itemid = 'news-wrap-item-' + size;
			while ($('#news-list').find('#' + itemid).size() >= 1) {
				var itemid = 'news-wrap-item-' + (++size);
			}
			html = '<a class="close" data-dismiss="alert">×</a><h4 class="alert-heading">添加回复内容</h4><div id="news-children-list"></div><div class="reply-news-edit-button"><a href="javascript:;" onclick="newsHandler.buildForm(\''+size+'\')" class="btn"><i class="icon-plus"></i> 添加多条内容</a></div>';
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
			$('#form', parent).removeClass('hide');
			$('#show', parent).addClass('hide');
		},
		'updateList' : function(itemid) {
			$('#news-list .item').each(function(){
				$(this).find('#show').removeClass('hide').siblings().addClass('hide');
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

	function buildNewsForm() {
		var module = $('#channel').val();
		if (!module) {
			return false;
		}
		try {
			$.ajax({
			  url: "<?php echo create_url('index/module', array('name' => 'news', 'do' => 'getresource'))?>",
			  type: "GET",
			  data: {'channel' : $('#channel').val(), 'keyword' : $('#keyword').val()},
			  dataType: "html"
			}).done(function(s) {
				if (!s) {
					$('#module-menus').html('此模块未有扩展菜单');
					return false;
				}
				$('#module-menus').html(s);
			});
		}
		catch (e) {
		}
	}

	function showNewsForm(id) {
        w = $('#modal-module-menus').modal();
		itemid = id;
		return false;
	}

	function addModuleMenu(id) {
		if (!list[id]) {
			alert('资源不存在或是已经被删除！');
		}
		if (list[id]['title']) {
			$('#' + itemid).find('#title').val(list[id]['title']);
		}
		if (list[id]['url']) {
			$('#' + itemid).find('#url').val(list[id]['url']);
		}
		if (list[id]['description']) {
			$('#' + itemid).find('#description').val(list[id]['description']);
		}
		if (list[id]['picurl']) {
			$('#' + itemid).find('#picurl').val(list[id]['picurl']);
			$('#' + itemid).find('#upload-file-view').html($('#' + itemid).find('#upload-file-view').html() + '<img width="100" src="<?php echo $_W['attachurl'];?>'+list[id]['picurl']+'">&nbsp;&nbsp;');
		}
		w.modal('hide');
	}

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