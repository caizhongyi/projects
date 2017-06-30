<?php defined('IN_IA') or exit('Access Denied');?><?php  $_W['breadcrumb'] = array(array('title'=>'微官网 '),array('title'=>'导航管理'))?>
<?php  include template('common/header', TEMPLATE_INCLUDEPATH);?>
<?php  if($visiables['profile']) { ?>
<div class="page-header">
    <h1>
        <i class="icon-book"></i> 导航管理
    </h1>
</div>
<?php  } ?>

<ul class="nav nav-tabs">
    <?php  if($visiables['home']) { ?><li<?php  if($do == 'display' && $position == '1') { ?> class="active"<?php  } ?>><a href="<?php  echo create_url('site/nav', array('position' => 1, 'name' => $modulename));?>">首页导航管理</a></li><?php  } ?>
    <?php  if($visiables['shortcut']) { ?><li<?php  if($do == 'display' && $position == '3') { ?> class="active"<?php  } ?>><a href="<?php  echo create_url('site/nav', array('position' => 3, 'name' => $modulename));?>">快捷导航管理</a></li><?php  } ?>
    <?php  if($visiables['profile']) { ?><li<?php  if($do == 'display' && $position == '2') { ?> class="active"<?php  } ?>><a href="<?php  echo create_url('site/nav', array('position' => 2, 'name' => $modulename));?>">个人中心导航管理</a></li><?php  } ?>
    <?php  if(empty($modulename)) { ?>
    <li<?php  if($do == 'post' && empty($id)) { ?> class="active"<?php  } ?>><a href="<?php  echo create_url('site/nav/post');?>"><i class="icon-plus"></i> 添加导航条目</a></li>
    <?php  if($do == 'post' && !empty($id)) { ?><li class="active"><a href="<?php  echo create_url('site/nav/post', array('id' => $id));?>"><i class="icon-edit"></i> 编辑导航条目</a></li><?php  } ?>
    <?php  } ?>
</ul>

<?php  if($do == 'post') { ?>
<form class="form-horizontal form" action="" method="post" enctype="multipart/form-data">
<div class="main">
	<input type="hidden" name="id" value="<?php  echo $id;?>" />
	<input type="hidden" name="templateid" value="<?php  echo $template['id'];?>">
	<h4>微站导航</h4>
	<table class="tb">
		<!--<tr>
			<th><label for="">微站导航位置</label></th>
			<td>
				<?php  if(empty($item['position'])) { ?>
				<select name="position">
					<?php  if(is_array($positions)) { foreach($positions as $key => $p) { ?>
					<option value="<?php  echo $key;?>"<?php  if($item['position'] == $p) { ?> selected="selected"<?php  } ?>><?php  echo $p['title'];?></option>
					<?php  } } ?>
				</select>
				<span class="help-block">这个导航链接将显示在微站指定页面. 注意: 此项添加后不能修改.</span>
				<?php  } else { ?>
				<span class="help-block">这个导航链接将显示在微站<?php  echo $positions[$item['position']]['title'];?>页面</span>
				<?php  } ?>
			</td>
		</tr>-->
		<tr>
			<th><label for="">导航名称</label></th>
			<td>

				<input type="text" class="span5" name="title" id="name" value="<?php  echo $item['name'];?>" />
			</td>
		</tr>
		<tr>
			<th><label for="">导航链接</label></th>
			<td>
				<input class="span5" type="text" name="url" id="url" value="<?php  echo $item['url'];?>" />
                <button data-toggle="modal" data-target="#modal-link" class="btn btn-link link-icon" ><i class="icon-plus-sign"></i></button>
				<span class="help-block">指定这个导航的链接目标</span>

			</td>
		</tr>
		<tr>
			<th><label for="">状态</label></th>
			<td>
				<label for="status_1" class="radio inline"><input autocomplete="off" type="radio" name="status" id="status_1" value="1" <?php  if($item['status'] == 1 || empty($item)) { ?> checked="checked"<?php  } ?> /> 显示</label>
				<label for="status_0" class="radio inline"><input autocomplete="off" type="radio" name="status" id="status_0" value="0" <?php  if(!empty($item) && $item['status'] == 0) { ?> checked="checked"<?php  } ?> /> 隐藏</label>
				<span class="help-block">设置导航菜单的显示状态</span>
			</td>
		</tr>
		<tr>
			<th><label for="">排序</label></th>
			<td>
				<input type="text" class="span2" name="displayorder" value="<?php  echo $item['displayorder'];?>" />
				<span class="help-block">导航排序，越大越靠前</span>
			</td>
		</tr>
	</table>


    <div class="collapse-panel">
       <!-- <div class="text-right">高级<a href="###" class="icon-chevron-down" data-toggle="collapse" data-target="#demo"></a></div>-->
     <!--   <button type="button" class="btn btn-danger" data-toggle="collapse" data-target="#demo">
           高级
        </button>-->

        <div id="demo" class="collapse in">
            <div class="preview-container">
              <!--  <div class="mobile-preview">
                    <iframe src="<?php  echo create_url('site/preview')?>&styleid=<?php  echo $_W['account']['styleid'];?>" frameborder="0"></iframe>
                </div>-->
                <div class="preview-main">
                    <h4>导航样式</h4>
                    <table class="tb">
                        <tr>
                            <th>系统图标</th>
                            <td>
                                <div class="input-append" style="display:block; margin-top:5px;">
                                    <input class="span3" type="text" name="icon[icon]" id="icon" value="<?php  echo $item['css']['icon']['icon'];?>" placeholder=""><button class="btn btn-primary" onclick="w = ajaxshow('<?php  echo create_url('site/icon')?>', '图标列表', {width : 800});return false;">选择图标</button>
                                </div>
                                <span class="help-block">导航的背景图标，微翼系统提供丰富的图标ICON。</span>
                            </td>
                        </tr>
                        <tr>
                            <th><label for="">图标颜色</label></th>
                            <td>
                                <input type="text" class="span3" id="iconcolor" name="icon[color]" value="<?php  echo $item['css']['icon']['color'];?>" />
                                <input class="colorpicker" target="iconcolor" value="<?php  echo $item['css']['icon']['color'];?>" />
                                <span class="help-block">图标颜色，上传图标时此设置项无效</span>
                            </td>
                        </tr>
                        <tr>
                            <th>图标大小</th>
                            <td>
                                <input class="span2" type="text" name="icon[size]" id="icon" value="<?php  if($item['css']['icon']['size']) { ?><?php  echo $item['css']['icon']['size'];?><?php  } else { ?>35<?php  } ?>"><span class="help-inline">PX</span>
                                <span class="help-block">图标的尺寸大小，单位为像素，上传图标时此设置项无效</span>
                            </td>
                        </tr>
                        <tr>
                            <th><label for="">上传图标</label></th>
                            <td>
                                <div class="fileupload fileupload-new" data-provides="fileupload">
                                    <div class="fileupload-preview thumbnail" style="width: 200px; height: 200px;"><?php  if($item['fileicon']) { ?><img src="<?php  echo $_W['attachurl'];?><?php  echo $item['fileicon'];?>" width="50" /><?php  } ?></div>
                                    <div>
                                        <span class="btn btn-file btn-primary"><span class="fileupload-new">选择图片</span><span class="fileupload-exists">更改</span><input name="icon" type="file" /></span>
                                        <?php  if($item['fileicon']) { ?><button type="submit" name="fileupload-delete" value="<?php  echo $item['fileicon'];?>" class="btn fileupload-new btn-danger">删除</button><?php  } ?>
                                        <a href="#" class="btn fileupload-exists btn-danger" data-dismiss="fileupload">移除</a>
                                    </div>
                                </div>
                                <input type="hidden" name="icon_old" value="<?php  echo $item['fileicon'];?>" />
                                <span class="help-block">自定义上传图标图片，“系统图标”优先于此项</span>
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td>
                                <input name="token" type="hidden" value="<?php  echo $_W['token'];?>" />
                                <input type="submit" class="btn btn-primary" name="submit" value="提交" />
                            </td>
                        </tr>
                    </table>
                </div>
             </div>
        </div>
    </div>

</div>
</form>

<!-- Modal -->
<div class="modal fade modal-small" id="modal-link" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header modal-header-tab">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#link" data-toggle="tab">分类链接</a></li>
                    <li><a href="#custom" data-toggle="tab">自定义链接</a></li>
                </ul>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
                <!-- Tab panes -->
                <div class="tab-content">
                    <ul class="tab-pane active systemmenus" id="link">
                        <?php  if(is_array($systemmenus)) { foreach($systemmenus as $menu) { ?>
                        <li>
                            <a href="javascript:;" class="icon-external-link"><?php  echo $menu['title'];?></a> &nbsp;<button type="button"  onclick="$('#url').val('<?php  echo $menu['url'];?>');" class="btn btn-primary" data-dismiss="modal">选择</button>
                        </li>
                        <?php  } } ?>
                    </ul>
                    <div class="tab-pane" id="custom">
                        <form class="form form-default form-block">
                            <div class="form-group">
                                <label class="form-label">您可以自定义导航链接:</label>
                                <input type="text" class="span4" value="http://" placeholder="http://"/><button type="button" class="btn btn-primary" data-dismiss="modal" onclick="$('#url').val($(this).prev().val())">确定</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script type="text/javascript" src="./resource/script/colorpicker/spectrum.js"></script>
<link type="text/css" rel="stylesheet" href="./resource/script/colorpicker/spectrum.css" />
<link type="text/css" rel="stylesheet" href="./resource/script/kindeditor/themes/default/default.css" />
<script type="text/javascript">
	$(function(){
		colorpicker();
	});
</script>
<?php  } else if($do == 'display') { ?>
<script type="text/javascript">
$(function(){
/*	$('div.make-switch').on('switch-change', function (e, data) {
		var dat = data.el.attr('data');
		var ret = data.value;
		$.post(location.href, {dat: dat, ret: ret}, function(resp){
			if(resp == 'success') {

				window.setTimeout(function(){location.href = location.href;}, 300);
			}
		});
	});*/
});
</script>
<style>
.table td input{margin-bottom:0;}
</style>
<form action="" method="post">
<div class="main">
	<div class="stat"><br/>
		<?php  if($position == '1') { ?>
		<h4 class="sub-title">选择要显示在微站首页的信息 <small>这里提供了<?php  if($mod) { ?>"<?php  echo $mod['title'];?>"功能中<?php  } ?>能够显示在微站首页的信息, 你可以选择性的自定义或显示隐藏</small>&nbsp;<button class="btn btn-primary" type="button" data-toggle="modal" data-target="#modal-preview">预览</button></h4>
		<?php  } ?>
        <?php  if($position == '2') { ?>
        <h4 class="sub-title">选择要显示在微站个人中心的信息 <small>这里提供了<?php  if($mod) { ?>"<?php  echo $mod['title'];?>"功能中<?php  } ?>能够显示在微站个人中心的信息, 你可以选择性的自定义或显示隐藏</small>&nbsp;<button class="btn btn-primary" type="button" data-toggle="modal" data-target="#modal-preview">预览</button></h4>
        <?php  } ?>
		<?php  if($position == '3') { ?>
		<h4 class="sub-title">选择要显示在微站快捷选项的信息 <small>这里提供了<?php  if($mod) { ?>"<?php  echo $mod['title'];?>"功能中<?php  } ?>能够显示在微站快捷选项的信息(需要微站模板支持), 你可以选择性的自定义或显示隐藏</small>&nbsp;<button class="btn btn-primary" type="button" data-toggle="modal" data-target="#modal-preview">预览</button></h4>
		<?php  } ?>
		<div class="preview-container">
           <!-- <div class="mobile-preview">
                <iframe src="<?php  echo create_url('site/preview')?>&styleid=<?php  echo $_W['account']['styleid'];?>" frameborder="0"></iframe>
            </div>-->

            <div class="preview-main">
                <table class="table table-striped table-bordered table-hover">
                    <thead class="navbar-inner">
                    <tr>
                        <th style="width:10%;">图标</th>
                        <th style="width:10%;">标题</th>
                        <th style="width:30%;">链接</th>
                        <th style="width:15%;">来源</th>
                        <th style="width:5%;">排序</th>
                        <th style="width:30%;">是否在微站上显示此导航?</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php  if(is_array($ds)) { foreach($ds as $item) { ?>
                    <tr>
                        <td><?php  if($item['css']['icon']['icon'] && empty($item['icon'])) { ?><i class="<?php  echo $item['css']['icon']['icon'];?> icon-2x"></i><?php  } else { ?><?php  if($item['icon']) { ?><img src="<?php  echo $_W['attachurl'];?><?php  echo $item['icon'];?>" width="30" /><?php  } ?><?php  } ?></td>
                        <td><?php  if($item['remove']) { ?><span><?php  echo $item['title'];?></span><!--<input type="text" class="span3" name="title[<?php  echo $item['id'];?>]" value="<?php  echo $item['title'];?>" />--><?php  } else { ?><?php  echo $item['title'];?><?php  } ?></td>
                        <td>
                            <span><?php  echo $item['url'];?></span>
                            <!-- <input class="span5" type="text" value="<?php  echo $item['url'];?>">-->
                        </td>
                        <td><?php  if($item['module']) { ?>"<?php  echo $_W['modules'][$item['module']]['title'];?>" <?php  } ?><?php  echo $froms[$item['from']];?></td>
                        <td><?php  if($item['remove']) { ?><span><?php  echo $item['displayorder'];?></span><!--<input type="text" class="span1" name="displayorder[<?php  echo $item['id'];?>]" value="<?php  echo $item['displayorder'];?>" />--><?php  } else { ?>无效<?php  } ?></td>
                        <td style="text-align:right;">
                            <a href="<?php  echo create_url('site/nav/post', array('id' => $item['id']));?>" class="btn btn-xs btn-info edit"<?php  if(!$item['checked']) { ?> style="display:none;"<?php  } ?> title="编辑"><i class="icon-edit bigger-120"></i></a>
                            <a href="<?php  echo create_url('site/nav/delete', array('id' => $item['id'], 'name' => $modulename));?>" class="btn btn-xs btn-danger "<?php  if(!$item['remove']) { ?> style="display:none;"<?php  } ?> title="删除"><i class="icon-trash bigger-120"></i></a>
                        <span   class="make-switch switch-small" data-on-label="是" data-off-label="否">
                            <label style="margin: 0px;">
                                <input class="ace ace-switch " type="checkbox" value="20"<?php  if($item['checked']) { ?> checked="checked"<?php  } ?> data="<?php  echo base64_encode(json_encode($item));?>" />
                                <span class="lbl"></span>
                            </label>
                        </span>
                        </td>
                    </tr>
                    <?php  } } ?>
                    <script type="text/javascript">
                        $('.ace-switch ').on('change',function(){
                            if($(this).prop('checked')){
                                var ret = true;
                            }else{
                                var ret = false;
                            }
                            $(this).closest('.make-switch').parent().find('.edit').toggle();
                            var dat = $(this).attr('data');
                            $.post(location.href, {dat: dat, ret: ret}, function(resp){
                                if(resp == 'success') {
                                  //  $('.mobile-preview iframe').contents()[0].location.reload()
                                }
                            });
                        })
                    </script>
                    </tbody>
                    <tr>
                        <td colspan="6">
                            <span class="text-danger">*</span>部分风格模板不支持图标显示，可不必设置 <br><br>
                            <!--  <input name="token" type="hidden" value="<?php  echo $_W['token'];?>" />
                              <input type="hidden" name="do" value="saves" />
                              <input type="submit" class="btn btn-primary" name="submit" value="提交" />-->
                        </td>
                    </tr>
                </table>

            </div>
		</div>

	</div>
</div>
</form>
<div aria-labelledby="myModalLabel" aria-hidden="false" role="dialog" tabindex="-1" class="modal   " id="modal-preview" >
    <div style="width:342px;" class="modal-dialog">
        <div class="modal-content">
            <div style="padding: 0;" class="modal-body">
                <iframe src="<?php  echo create_url('site/preview')?>&styleid=<?php  echo $_W['account']['styleid'];?>"  width="100%" scrolling="yes" height="100%" frameborder="0" style="width: 320px; overflow: visible; height: 480px;" name="preview" id="preview" ></iframe>
                <div style="margin-top: -10px;" class="modal-footer">
                    <a class="btn" target="preview" href="<?php  echo create_url('site/preview')?>&styleid=<?php  echo $_W['account']['styleid'];?>">首页</a>
                    <a class="btn" target="preview" href="<?php  echo create_url('site/preview')?>">个人中心</a>
                    <a aria-hidden="true" data-dismiss="modal" class="btn" href="#">关闭</a>
                </div>
            </div>
        </div>
    </div>
</div>
<?php  } ?>
<?php  include template('common/footer', TEMPLATE_INCLUDEPATH);?>
