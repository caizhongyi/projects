<?php defined('IN_IA') or exit('Access Denied');?><input type="hidden" name="reply_id" value="<?php echo $reply['id'];?>" />
<div class="alert alert-block alert-new">
	<a class="close" data-dismiss="alert">×</a>
	<h4 class="alert-heading">微会员信息</h4>
	<table>
		<tbody>
			<?php if(!empty($reply['id'])) { ?>
			<tr>
				<th>查看内容</th>
				<td><a href="<?php echo create_url('index/module', array('do' => 'userlist', 'name' => 'user', 'id' => $reply['rid']))?>">查看会员名单</a></td>
			</tr><?php } ?>
			<tr>
				<th>标题</th>
				<td>
					<input type="text" id="" class="span7" placeholder="" name="title" value="<?php echo $reply['title'];?>">
				</td>
			</tr>        
			<tr>
				<th>图片</th>
				<td>
					<div id="" class="uneditable-input reply-edit-cover">
						<div class="detail">
							<span class="pull-right">大图片建议尺寸：700像素 * 300像素</span>
							<input type="button" id="user-picture" fieldname="picture<?php echo $namesuffix;?>" class="btn btn-sm btn-primary  reply-edit-cover-upload" value="<i class='icon-upload-alt'></i> 上传" style="" />
							<button type="button" class="btn btn-sm btn-primary reply-news-edit-cover-remove" id="upload-delete" onclick="doDeleteItemImage(this, 'user-picture-value')" style="<?php if(empty($reply['thumb'])) { ?> display:none;<?php } ?>"><i class="icon-remove"></i> 删除</button>
						</div>
						<?php if(!empty($reply['thumb'])) { ?>
						<input type="hidden" name="picture-old" value="<?php echo $reply['thumb'];?>">
						<div id="upload-file-view" class="upload-view">
							<input type="hidden" id="user-picture-value" value="<?php echo $reply['thumb'];?>">
							<img width="100" src="<?php echo $_W['attachurl'];?><?php echo $reply['thumb'];?>">&nbsp;&nbsp;
						</div>
						<?php } else { ?>
						<div id="upload-file-view"></div>
						<?php } ?>
					</div>
				</td>
			</tr>
			<tr>
				<th>会员简介</th>
				<td>
					<textarea style="height:150px;" name="description" class="span7" cols="60"><?php echo $reply['description'];?></textarea>
					<div class="help-block">用于图文显示的简介</div>
				</td>
			</tr>
 		</tbody>
	</table>
 </div>
<script type="text/javascript">
kindeditor($('#rule'));
kindeditorUploadBtn($('#user-picture'));

 
</script>