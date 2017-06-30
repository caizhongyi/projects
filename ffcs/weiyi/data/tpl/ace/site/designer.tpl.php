<?php defined('IN_IA') or exit('Access Denied');?><?php include template('common/header', TEMPLATE_INCLUDEPATH);?>

<?php include template('site/nav_style', TEMPLATE_INCLUDEPATH);?>
<div class="main">
	<form id="form" class="form-horizontal form" action="" method="post" enctype="multipart/form-data">
		<input type="hidden" name="templateid" value="<?php echo $template['id'];?>">
		<h4>微站风格</h4>
		<table class="tb">
			<tr>
				<th><label for="">模板名称</label></th>
				<td>
					<?php echo $template['title'];?>
				</td>
			</tr>
			<tr>
				<th><label for="">模板路径</label></th>
				<td>
					./themes/mobile/<?php echo $template['name'];?>
				</td>
			</tr>
			<tr>
				<th><label for="">基础图片目录[imgdir]</label></th>
				<td>
					<input type="text" class="span4" name="style[imgdir]" value="<?php echo $styles['imgdir']['content'];?>" />
					<span class="help-block">风格基础图片存放的目录，如果为空则默认为./themes/mobile/<?php echo $template['name'];?>/images目录</span>
				</td>
			</tr>
			<tr>
				<th>首页背景 [indexbgcolor] <br /> [indexbgimg] <br /> [indexbgextra]</th>
				<td>
					<div>
						<input class="span3" type="text" name="style[indexbgcolor]" id="indexbgcolor" value="<?php echo $styles['indexbgcolor']['content'];?>" placeholder="">
						<input class="colorpicker" target="indexbgcolor" value="<?php echo $styles['indexbgcolor']['content'];?>" />
					</div>
					<div style="display:block; margin-top:5px;">
						<input class="span3" type="text" name="style[indexbgimg]" id="indexbgimg" value="<?php echo $styles['indexbgimg']['content'];?>" placeholder="">
						<input type="button" fieldname="indexbgimg" class="btn upload-btn" value="<i class='icon-upload-alt'></i> 上传" style="font-size:14px;width:80px;">
						<button type="button" class="btn" id="upload-delete" onclick="doDeleteItemImage('indexbgimg')"><i class="icon-remove"></i> 删除</button>
					</div>
					<div style="margin-top:5px;"><input class="span3" type="text" name="style[indexbgextra]" value="<?php echo $styles['indexbgextra']['content'];?>" placeholder=""><span class="help-inline">附加属性</span></div>
					<div style="margin-top:5px;" id="indexbgimg_preview"><img src="<?php echo $_W['attachurl'];?><?php echo $styles['indexbgimg']['content'];?>"  alt=' ' width="100" /></div>
					<span class="help-block">上传背景图片后，需要提交生效</span>
				</td>
			</tr>
			<tr>
				<th><label for="">正常字体</label>[fontfamily]</th>
				<td>
					<input type="text" class="span4" name="style[fontfamily]" value="<?php echo $styles['fontfamily']['content'];?>" />
					<span class="help-block"></span>
				</td>
			</tr>
			<tr>
				<th><label for="">正常字体大小</label>[fontsize]</th>
				<td>
					<input type="text" class="span4" name="style[fontsize]" value="<?php echo $styles['fontsize']['content'];?>" />
					<span class="help-block"></span>
				</td>
			</tr>
			<tr>
				<th><label for="">普通文本颜色</label>[fontcolor]</th>
				<td>
					<input type="text" class="span3" id="fontcolor" name="style[fontcolor]" value="<?php echo $styles['fontcolor']['content'];?>" />
					<input class="colorpicker" target="fontcolor" value="<?php echo $styles['fontcolor']['content'];?>" />
					<span class="help-block"></span>
				</td>
			</tr>
			<tr>
				<th><label for="">菜单文本颜色</label>[fontnavcolor]</th>
				<td>
					<input type="text" class="span3" id="fontnavcolor" name="style[fontnavcolor]" value="<?php echo $styles['fontnavcolor']['content'];?>" />
					<input class="colorpicker" target="fontnavcolor" value="<?php echo $styles['fontnavcolor']['content'];?>" />
					<span class="help-block"></span>
				</td>
			</tr>
			<tr>
				<th><label for="">链接文字颜色</label>[linkcolor]</th>
				<td>
					<input type="text" class="span3" id="linkcolor" name="style[linkcolor]" value="<?php echo $styles['linkcolor']['content'];?>" />
					<input class="colorpicker" target="linkcolor" value="<?php echo $styles['linkcolor']['content'];?>" />
					<span class="help-block"></span>
				</td>
			</tr>
			<tr>
				<th>扩展CSS</th>
				<td>
					<textarea name="style[css]" class="span6" cols="70"><?php echo $styles['css']['content'];?></textarea>
					<span class="help-block">附加一些CSS样式</span>
				</td>
			</tr>
			<tr>
				<th></th>
				<td>
					<input name="token" type="hidden" value="<?php echo $_W['token'];?>" />
					<input type="submit" class="btn btn-primary" name="submit" id="submit" value="提交" />
				</td>
			</tr>
		</table>
	</form>
</div>
<script type="text/javascript" src="./resource/script/colorpicker/spectrum.js"></script>
<link type="text/css" rel="stylesheet" href="./resource/script/colorpicker/spectrum.css" />
<link type="text/css" rel="stylesheet" href="./resource/script/kindeditor/themes/default/default.css" />
<script type="text/html" id="item-form-html">
	<tr>
		<td></td>
		<td><input type="text" class="span3" id="linkhightcolor" name="style[content][]" /></td>
		<td>
			<input type="text" class="span3" id="linkhightcolor" name="style[content][]" />
		</td>
	</tr>
</script>
<script type="text/javascript">
<!--
    function kindeditorUploadBtn(obj, callback) {
        if (typeof KindEditor == 'undefined') {
            $.getScript('./resource/script/kindeditor/kindeditor-min.js', initUploader);
        } else {
            initUploader();
        }
    //上传成功回调
        /*function kuploadSuccess(url){
         alert(1)
         }*/
    //删除成功回调
        /*function kdeleteSuccess(){}*/
        function initUploader() {
            var uploadbutton = KindEditor.uploadbutton({
                button : obj,
                fieldName : 'imgFile',
                url : './index.php?act=attachment&do=upload',
                width : 100,
                afterUpload : function(data) {
                    if (data.error === 0) {
                        var url = KindEditor.formatUrl(data.url, 'absolute');
                        $(uploadbutton.div.parent().parent()[0]).find('#indexbgimg_preview').html('<input value="'+data.filename+'" type="hidden" name="'+obj.attr('fieldname')+'" id="'+obj.attr('id')+'-value" /><img id="'+obj.attr('id')+'-view" src="'+url+'" width="100" />');
                        $(uploadbutton.div.parent().parent()[0]).find('#indexbgimg_preview').addClass('upload-view');
                        $(uploadbutton.div.parent().parent()[0]).find('#upload-delete').show();
                        $('#indexbgimg').val(data.filename);
                        callback && callback.uploadSuccess && callback.uploadSuccess(obj ,data.url)//上传成功回调
                    } else {
                        message('上传失败，错误信息：'+data.message);
                    }
                },
                afterError : function(str) {
                    message('上传失败，错误信息：'+str);
                }
            });
            uploadbutton.fileBox.change(function(e) {
                uploadbutton.submit();
            });
        }
    }

	$('.upload-btn').each(function(){
		kindeditorUploadBtn($(this), uploadHander);
	});

	function uploadHander(obj, data) {
		$("#"+obj.button.attr('fieldname')).val(data.filename);
		$("#"+obj.button.attr('fieldname') + '_preview').html('<img src="'+data.url+'" width="100" />');
	}

	function buildForm() {
		$('#append-list').append($('#item-form-html').html());
	}

	function doDeleteItemImage(id) {
		var filename = $('#' + id).val();
		ajaxopen('./index.php?act=attachment&do=delete&filename=' + filename, function(){
			$('#' + id).val('');
			$('#submit').trigger('click');
		});
	}

	$(function(){
		colorpicker();
	});




//-->
</script>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>