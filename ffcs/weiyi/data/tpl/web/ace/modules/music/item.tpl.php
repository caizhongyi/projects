<?php defined('IN_IA') or exit('Access Denied');?><?php if(empty($item)) { ?>
	<?php $namesuffix = '-new[]';?>
	<?php $itemid = '(itemid)';?>
	<?php $switch = 'on new_add';?>
<?php } else { ?>
	<?php $namesuffix = '['.$item['id'].']'?>
	<?php $itemid = 'music-item-' . $item['id'];?>
	<?php $switch = 'off';?>
<?php } ?>
<div id="show" class="span6 alert alert-info <?php if(empty($item)) { ?>hide<?php } ?>">
	<span class="pull-right">
		<?php if(!empty($item)) { ?><a href="<?php echo create_url('index/module/delete', array('name' => 'music', 'id' => $item['id']))?>" onclick="return doDeleteItem('<?php echo $itemid;?>', this.href)" style="margin-right:5px;">删除</a><?php } else { ?><a onclick="doDeleteItem('<?php echo $itemid;?>');" href="javascript:;" style="margin-right:5px;">删除</a><?php } ?>
		<a style="margin-right:5px;" onclick="doEditItem('<?php echo $itemid;?>');musicHandler.doEditItem('<?php echo $itemid;?>');" id="<?php echo $row['id'];?>" href="javascript:;">编辑</a>
	</span>
	<div class="content" id="music_off"><span class="music_button" style="display:inline-block;width:20px;color:#58859b;cursor:pointer;" music_url="<?php echo $item['url'];?>" music_switch="1"><i class="icon-play icon-large"></i></span><span class="music_title" id="title"><?php echo $item['title'];?></span><span class="jp" id="jp-<?php echo $item['id'];?>"></span></div>
</div>
<div id="form" class="alert alert-block alert-new <?php if(!empty($item)) { ?>hide<?php } ?>">
	<a class="close" onclick="$(this).parents('.item').find('#form').hide();$(this).parents('.item').find('#show').show();musicHandler.doEditItem('<?php echo $itemid;?>');">×</a>
	<h4 class="alert-heading">添加回复内容</h4>
	<table>
		<tr>
			<th>音频标题</th>
			<td>
				<input type="text" id="item-title" class="span7" placeholder="" name="music-title<?php echo $namesuffix;?>" value="<?php echo $item['title'];?>">
			</td>
		</tr>
		<tr>
			<th>音频链接</th>
			<td>
				<?php if(!empty($item)) { ?>
				<input type="hidden" name="music-url-old<?php echo $namesuffix;?>" value="<?php echo $item['url'];?>">
				<?php } ?>
                <div class="input-group input-upload">
                    <input id="item-url" type="text" placeholder="文件..." name="music-url<?php echo $namesuffix;?>" value="<?php echo $item['url'];?>"  class="form-control search-query">
                    <span class="input-group-btn">
                        <button class="btn btn-purple btn-sm" id="music-attach-btn" fieldname="music-attach<?php echo $namesuffix;?>" type="button" value="<i class='icon-upload-alt'></i>">
                            <i class="icon-upload-alt icon-on-right bigger-110"></i>上传
                        </button>
                    </span>
                </div>
				<span class="help-block">选择上传的音频文件或直接输入URL地址，常用格式：mp3</span>
			</td>
		</tr>
		<tr>
			<th>高品质链接</th>
			<td>
				<input type="text" id="" class="span7" placeholder="" name="music-hqurl<?php echo $namesuffix;?>" value="<?php echo $item['hqurl'];?>">
				<span class="help-block">没有高品质音乐链接，请留空。高质量音乐链接，WIFI环境优先使用该链接播放音乐</span>
			</td>
		</tr>
		<tr>
		<th>描述</th>
			<td>
				<textarea style="height:80px;" class="span7" cols="70" name="music-description<?php echo $namesuffix;?>"><?php echo $item['description'];?></textarea>
				<span class="help-block">描述内容将出现在音乐名称下方，建议控制在20个汉字以内最佳</span>
			</td>
		</tr>
		<tr>
			<th></th>
			<td><button type="button" onclick="musicHandler.doAdd('<?php echo $itemid;?>')" class="btn btn-sm btn-primary">完成</button></td>
		</tr>
	</table>
</div>