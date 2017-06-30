<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'微站功能 '),array('title'=>'导航管理'),array('title'=>'微站导航'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>
<div class="page-header">
    <h1>
        <i class="icon-cog"></i> 微站导航
    </h1>
</div>
<?php include template('site/nav_menu', TEMPLATE_INCLUDEPATH);?>

<form class="form-horizontal form" action="" method="post" enctype="multipart/form-data">
<div class="main">
	<input type="hidden" name="id" value="<?php echo $id;?>" />
	<input type="hidden" name="templateid" value="<?php echo $template['id'];?>">
	<table class="tb">
		<tr>
			<th><label for="">状态</label></th>
			<td>
				<label for="status_1" class="radio inline"><input autocomplete="off" type="radio" name="status" id="status_1" value="1" <?php if($rule['rule']['status'] == 1 || empty($rule['rule']['status'])) { ?> checked="checked"<?php } ?> /> 显示</label>
				<label for="status_0" class="radio inline"><input autocomplete="off" type="radio" name="status" id="status_0" value="0" <?php if(!empty($rule) && $rule['rule']['status'] == 0) { ?> checked="checked"<?php } ?> /> 隐藏</label>
				<span class="help-block">设置导航菜单的显示状态</span>
			</td>
		</tr>
		<tr>
			<th><label for="">排序</label></th>
			<td>
				<input type="text" class="span2" name="displayorder" value="<?php echo $navinfo['displayorder'];?>" />
				<span class="help-block">导航排序，越大越靠前</span>
			</td>
		</tr>
		<tr>
			<th><label for="">名称</label></th>
			<td>
				<input type="text" class="span4" name="name" id="name" value="<?php echo $navinfo['name'];?>" />
			</td>
		</tr>
		<tr>
			<th><label for="">显示位置</label></th>
			<td>
				<select name="position" class="position"  id="position" onchange="togglemenu($(this).val())" autocomplete="off">
					<?php if(is_array($position)) { foreach($position as $posid => $posname) { ?>
					<option value="<?php echo $posid;?>" <?php if($navinfo['position'] == $posid) { ?> selected<?php } ?>><?php echo $posname;?></option>
					<?php } } ?>
				</select>
				<span class="help-block">选择导航链接将显示的页面</span>
			</td>
		</tr>
		<tr>
			<th><label for="">链接类型</label></th>
			<td>
				<div class="radio inline"><label for="type_1"><input type="radio" name="type" value="0" id="type_1" <?php if($navinfo['issystem']==0 || empty($navinfo)) { ?> checked<?php } ?> autocomplete="off" /> 系统内置菜单</label></div>
                <div class="radio inline"><label for="type_2"><input type="radio" name="type" value="1" id="type_2" <?php if($navinfo['issystem']==1 && !empty($navinfo)) { ?> checked<?php } ?> autocomplete="off" /> 自定义菜单</label></div>
                <div class="radio inline"><label for="type_3"><input type="radio" name="type" value="2" id="type_3" <?php if($navinfo['issystem']==2 && !empty($navinfo)) { ?> checked<?php } ?> autocomplete="off" /> 分类菜单</label></div>
                <span class="help-block"></span>
			</td>
		</tr>
		<tbody id="tbody_0" <?php if($navinfo['issystem']!=0) { ?> style="display:none;"<?php } ?>>
		<tr>
			<th><label for="">链接</label></th>
			<td>
				<?php include_once model('site');?>
				<?php $systemmenus = site_system_menus();?>
				<select name="sysurl" autocomplete="off">
					<?php if(is_array($systemmenus)) { foreach($systemmenus as $menu) { ?>
					<option value="<?php echo $menu['url'];?>" <?php if($navinfo['url'] == $menu['url']) { ?> selected<?php } ?>><?php echo $menu['title'];?></option>
					<?php } } ?>
				</select>
				<span class="help-block">选择系统内置的导航链接</span>
			</td>
		</tr>
		</tbody>
		<tbody id="tbody_1" <?php if($navinfo['issystem']!=1) { ?> style="display:none;"<?php } ?>>
		<tr>
			<th><label for="">链接</label></th>
			<td>
				<div class="input-group span4" >
					<input  type="text" class="form-control" name="url" id="url" value="<?php echo $navinfo['url'];?>" placeholder=""><span class="input-group-btn"><button class="btn btn-sm btn-primary" onclick="w = $('#modal-module-menus').modal();buildModuleMenuForm();return false;">选择模块扩展链接</button></span>
				</div>
				<span class="help-block">链接可以添加直接URL链接，也可以通过“选择模块扩展链接”界面添加模块扩展出的菜单。</span>
			</td>
		</tr>
		</tbody>

        <tbody id="tbody_2" <?php if($navinfo['issystem']!=2) { ?> style="display:none;"<?php } ?>>
        <tr>
            <th><label for="">链接</label></th>
            <td>
                <div  class="input-group span4" >
                    <input class="form-control" type="text" name="url" id="groupurl" value="<?php echo $navinfo['url'];?>" placeholder=""><span class="input-group-btn"><button class="btn btn-sm btn-primary" onclick="w = $('#modal-group-menus').modal();buildGroupMenuForm();return false;">选择分类链接</button></span>
                </div>
                <span class="help-block">链接可以添加直接URL链接，也可以通过“选择分类”界面选择需要添加的分类内容。</span>
            </td>
        </tr>
        </tbody>

	</table>
	<h4>导航样式</h4>
	<table class="tb">
		<tr>
			<th>系统图标</th>
			<td>
				<div class="input-group span4">
					<input  type="text" class="form-control" name="icon[icon]" id="icon" value="<?php echo $navinfo['css']['icon']['icon'];?>" placeholder="">
					<span class="input-group-btn">
						<button class="btn btn-sm btn-primary" onclick="w = ajaxshow('<?php echo create_url('site/icon')?>', '图标列表', {width : 800});return false;">选择图标</button>
					</span>
				</div>
				<span class="help-block">导航的背景图标，微擎系统提供丰富的图标ICON。</span>
			</td>
		</tr>
		<tr>
			<th><label for="">图标颜色</label></th>
			<td>
				<input type="text" class="span3" id="iconcolor" name="icon[color]" value="<?php echo $navinfo['css']['icon']['color'];?>" />
				<input class="colorpicker" target="iconcolor" value="<?php echo $navinfo['css']['icon']['color'];?>" />
				<span class="help-block">图标颜色，上传图标时此设置项无效</span>
			</td>
		</tr>
		<tr>
			<th>图标大小</th>
			<td>
				<input class="span2" type="text" name="icon[size]" id="icon" value="<?php if($navinfo['css']['icon']['size']) { ?><?php echo $navinfo['css']['icon']['size'];?><?php } else { ?>35<?php } ?>"><span class="help-inline">PX</span>
				<span class="help-block">图标的尺寸大小，单位为像素，上传图标时此设置项无效</span>
			</td>
		</tr>
		<tr>
			<th><label for="">上传图标</label></th>
			<td>
				<div class="fileupload fileupload-new" data-provides="fileupload">
					<div class="fileupload-preview thumbnail" ><?php if($navinfo['fileicon']) { ?><img src="<?php echo $_W['attachurl'];?><?php echo $navinfo['fileicon'];?>" width="50" /><?php } ?></div>
					<div>
						<span class="btn btn-sm btn-primary btn-file"><span class="fileupload-new">选择图片</span><span class="fileupload-exists">更改</span><input name="icon" type="file" /></span>
						<a href="#" class="btn btn-sm fileupload-exists" data-dismiss="fileupload">移除</a>
					</div>
				</div>
				<input type="hidden" name="icon_old" value="<?php echo $navinfo['fileicon'];?>" />
				<span class="help-block">自定义上传图标图片，“系统图标”优先于此项</span>
			</td>
		</tr>
		<tr>
			<th></th>
			<td>
				<input name="token" type="hidden" value="<?php echo $_W['token'];?>" />
				<input type="submit" class="btn btn-sm btn-primary" name="submit" value="提交" />
			</td>
		</tr>
	</table>
</div>
<div id="modal-module-menus" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" style="position:fixed;top:5%; left:200px; overflow-y: auto;background-color: #fff; height: 500px; width:600px; ">
	<div class="modal-header"><button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button><h3 id="myModalLabel">扩展模块菜单</h3></div>
	<div class="modal-body">
		<table class="tb">
			<tr>
				<th><label for="">模块</label></th>
				<td>
					<select name="module" id="module" onchange="buildModuleMenuForm()" autocomplete="off">
						<option value="">选择模块</option>
						<?php if(is_array($modules)) { foreach($modules as $mod) { ?>
						<option value="<?php echo $mod['name'];?>"><?php echo $mod['title'];?></option>
						<?php } } ?>
					</select>
				</td>
			</tr>
			<tr>
				<th><label for="">显示位置</label></th>
				<td>
					<select class="position" onchange="togglemenu($(this).val())" autocomplete="off">
						<?php if(is_array($position)) { foreach($position as $posid => $posname) { ?>
						<option value="<?php echo $posid;?>" <?php if($navinfo['position'] == $posid) { ?> selected<?php } ?>><?php echo $posname;?></option>
						<?php } } ?>
					</select>
					<span class="help-block">选择导航链接将显示的页面</span>
				</td>
			</tr>
			<tr>
				<th><label for="">搜索关键字</label></th>
				<td>
					<div class="input-append" style="display:block;">
						<input type="text" class="span3" name="keyword" value="" id="keyword" /><button class="btn btn-sm btn-primary" onclick="buildModuleMenuForm(); return false;">搜索</button>
					</div>
				</td>
			</tr>
		</table>
		<div id="module-menus">

		</div>
	</div>
	<div class="modal-footer"><a href="#" class="btn" data-dismiss="modal" aria-hidden="true">关闭</a></div>
</div>

<!--////////////////////////20131205 claude add group select menu/////////////////////////////////////-->
<div id="modal-group-menus" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" style="position:fixed;top:5%; left:200px; overflow-y: auto;background-color: #fff; height: 500px; width:600px; ">
    <div class="modal-header"><button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button><h3 id="myGroupLabel">分类菜单</h3></div>
    <div class="modal-body">
        <table class="tb">
            <tr>
                <th><label for="">搜索关键字</label></th>
                <td>
                    <div class="input-append" style="display:block;">
                        <input type="text" class="span3" name="keyword" value="" id="groupKeyword" /><button class="btn btn-sm btn-primary" onclick="buildGroupMenuForm(); return false;">搜索</button>
                    </div>
                </td>
            </tr>
        </table>
        <div id="group-menus">

        </div>
    </div>
    <div class="modal-footer"><a href="#" class="btn" data-dismiss="modal" aria-hidden="true">关闭</a></div>
</div>


</form>
<script type="text/javascript" src="./resource/script/colorpicker/spectrum.js"></script>
<link type="text/css" rel="stylesheet" href="./resource/script/colorpicker/spectrum.css" />
<link type="text/css" rel="stylesheet" href="./resource/script/kindeditor/themes/default/default.css" />
<script type="text/javascript">
<!--
    var w;
    function buildGroupMenuForm() {

        try {
            $.ajax({
                url: "<?php echo create_url('site/nav/group')?>&time="+new Date().getTime(),
                type: "GET",
                data: {'keyword' : $('#groupKeyword').val()},
                dataType: "html"
            }).done(function(s) {
                        if (!s) {
                            $('#group-menus').html('此模块未有扩展菜单');
                            return false;
                        }
                        $('#group-menus').html(s);
                    });
        }
        catch (e) {
        }
    }

	function buildModuleMenuForm() {
		var module = $('#module').val();
		if (!module) {
			return false;
		}
		try {
			$.ajax({
			  url: "<?php echo create_url('site/nav/module')?>",
			  type: "GET",
			  data: {'name' : module.toLowerCase(), 'position' : $('#position').val(), 'keyword' : $('#keyword').val()},
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

	function togglemenu(position) {
		$('#home').show();
		$('#profile').show();
		$('.position').find("option[value='"+position+"']").attr("selected",true);
		switch (position)
		{
			case '1':
				$('#home').show();
				$('#profile').hide();
			break;
			case '2':
				$('#home').hide();
				$('#profile').show();
			break;
		}
	}

	$("input[name='type']").click(function(){
		$("tbody[id^='tbody']").hide();
		$("#tbody_"+$(this).val()).show();
	});

	$(function(){
        window.colorpicker && colorpicker();
	});
//-->
</script>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>