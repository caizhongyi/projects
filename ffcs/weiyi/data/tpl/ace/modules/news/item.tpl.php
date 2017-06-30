<?php defined('IN_IA') or exit('Access Denied');?><?php if(empty($news)) { ?>
	<?php $namesuffix = '-new[(wrapitemid)][]';?>
	<?php $itemid = '(itemid)';?>
	<?php $wrapitemid = '(wrapitemid)';?>
<?php } else { ?>
	<?php $namesuffix = '[news-wrap-item-'.$key.']['.$news['id'].']'?>
	<?php $itemid = 'news-item-' . $news['id'];?>
	<?php $wrapitemid = 'news-wrap-item-'.$key;?>
<?php } ?>
<?php if(!empty($news)) { ?>
	<div class="item" id="news-item-<?php echo $news['id'];?>">
<?php } ?>
<div id="show" class="alert alert-info reply-news-list <?php if(!empty($key) && !empty($news['id']) && $key == $news['id']) { ?>reply-news-list-first<?php } ?> <?php if(empty($news)) { ?>hide<?php } ?>">
	<div class="reply-news-list-cover"><img src="<?php echo $_W['attachurl'];?><?php echo $news['thumb'];?>" alt=""></div>
	<div class="reply-news-list-detail">
		<div class="title"><?php echo $news['title'];?></div>
		<div class="content"><?php echo $news['description'];?></div>
		<span class="pull-right"><?php if(!empty($news)) { ?><a href="<?php echo create_url('index/module/delete', array('name' => 'news', 'id' => $news['id']))?>" onclick="return doDeleteItem('news-item-<?php echo $news['id'];?>', this.href)" style="margin-right:5px;">删除</a><?php } else { ?><a onclick="doDeleteItem('<?php echo $itemid;?>')" href="javascript:;" style="margin-right:5px;">删除</a><?php } ?><a onclick="newsHandler.doEditItem('<?php echo $itemid;?>', '<?php echo $wrapitemid;?>')" href="javascript:;">编辑</a></span>
	</div>
</div>
<table id="form" class="tb reply-news-edit <?php if(!empty($news)) { ?>hide<?php } ?>">
	<tr>
		<th>标题<?php echo $_GPC['title'];?></th>
		<td>
			<input type="text" id="" class="span7" placeholder="" name="news-title<?php echo $namesuffix;?>" value="<?php echo $news['title'];?>">
		</td>
	</tr>
	<tr>
		<th>封面</th>
		<td>
			<!-- 此处增加class="reply-news-edit-cover-1"为编辑状态，反之则不显示封面图片，隐藏删除按钮 -->
			<div id="" class="uneditable-input reply-edit-cover">
				<div class="detail">
					<span class="pull-right">大图片建议尺寸：700像素 * 300像素</span>
					<input type="button" id="news-picture" fieldname="news-picture<?php echo $namesuffix;?>" class="btn btn-sm btn-primary reply-edit-cover-upload" value="<i class='icon-upload-alt'></i> 上传" style="" />
					<button type="button" class="btn btn-sm reply-news-edit-cover-remove" id="upload-delete" onclick="doDeleteItemImage(this, 'news-picture-value')" style="<?php if(empty($news['thumb'])) { ?> display:none;<?php } ?>"><i class="icon-remove"></i> 删除</button>
				</div>
				<?php if(!empty($news)) { ?>
				<input type="hidden" name="news-picture-old<?php echo $namesuffix;?>" value="<?php echo $news['thumb'];?>">
				<div id="upload-file-view" class="upload-view">
					<img width="100" src="<?php echo $_W['attachurl'];?><?php echo $news['thumb'];?>">&nbsp;&nbsp;
				</div>
				<?php } else { ?>
				<div id="upload-file-view"></div>
				<?php } ?>
			</div>
		</td>
	</tr>
	<tr>
		<th>描述</th>
		<td>
			<textarea style="height:80px;" class="span7" cols="70" name="news-description<?php echo $namesuffix;?>"><?php echo $news['description'];?></textarea>
		</td>
	</tr>
	<tr>
		<th>内容</th>
		<td>
			<textarea style="height:200px; width:535px;" class="span7 richtext-clone" name="news-content<?php echo $namesuffix;?>" cols="70" id="reply-add-text"><?php echo $news['content'];?></textarea>
		</td>
	</tr>
	<tr>
		<th>来源</th>
		<td>
			<input type="text" id="url" class="span7" placeholder="" name="news-url<?php echo $namesuffix;?>" value="<?php echo $news['url'];?>">
			<?php include_once model('site');?>
			<?php $systemmenus = site_system_menus();?>
			<span class="help-block">设置来源后打开该条图文将跳转到指定链接（注：外部链接需加http://）</span>
			<div class="alert-block" style="padding:3px 0;"><strong class="text-error">使用微站链接:</strong>
				<?php if(is_array($systemmenus)) { foreach($systemmenus as $menu) { ?>
				<a href="javascript:;" class="icon-external-link" onclick="$(this).parent().parent().find('#url').val('<?php echo $menu['url'];?>');"><?php echo $menu['title'];?></a>&nbsp;
				<?php } } ?>
			</div>
		</div>
		</td>
	</tr>
	 <tr>
        <th>直接跳转来源</th>
        <td>
            <?php if(!empty($news['islocation'])) { ?>
            <span><label for="location"><input type="radio" value="0" name="news-islocation<?php echo $namesuffix;?>"  />是<input name="news-islocation<?php echo $namesuffix;?>" type="radio"  value="1"  checked="checked" />否</label></span>
            <?php } else { ?>
            <span><label for="location"><input type="radio" value="0" name="news-islocation<?php echo $namesuffix;?>"  checked="checked" />是<input name="news-islocation<?php echo $namesuffix;?>" type="radio"  value="1" />否</label></span>
            <?php } ?>
        </td>
    </tr>
</table>
<?php if(!empty($news)) { ?>
	</div>
<?php } ?>
