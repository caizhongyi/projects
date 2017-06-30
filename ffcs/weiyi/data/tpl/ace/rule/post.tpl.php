<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'自动回复'),array('title'=>'关键字自动回复'),array('title'=>'添加规则'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>


<div class="page-header">
    <h1>
        <i class="icon-book"></i> 添加规则 <small><i class="icon-double-angle-right"></i> 删除，修改规则、关键字以及回复后，请提交规则以保存操作。</small>
    </h1>
</div>


<div class="main">

	<form class="form-horizontal form" action="" method="post" enctype="multipart/form-data" onsubmit="return formcheck(this)">
		<input type="hidden" name="id" value="<?php echo $rule['rule']['id'];?>">
		<table class="tb">
			<tr>
				<th><label for="">规则名称</label></th>
				<td>
					<input type="text" id="rule-name" class="span6" placeholder="" name="name" value="<?php if(empty($rule['rule']['name']) && !empty($_GPC['name'])) { ?><?php echo $_GPC['name'];?><?php } else { ?><?php echo $rule['rule']['name'];?><?php } ?>">
					<span class="help-block">您可以给这条规则起一个名字, 方便下次修改和查看.<a class="iconEmotion" href="javascript:;" inputid="rule-name"><i class="icon-github-alt"></i> 表情</a></span>
				</td>
			</tr>
			<tr>
				<th><label for="">规则类别</label></th>
				<td>
					<select class="span3" style="margin-right:15px;" name="cate_1" onchange="fetchChildCategory(this.options[this.selectedIndex].value)">
						<option value="0">请选择一级分类</option>
						<?php if(is_array($category)) { foreach($category as $row) { ?>
						<?php if($row['parentid'] == 0) { ?>
						<option value="<?php echo $row['id'];?>" <?php if($row['id'] == $rule['rule']['cate']['0']) { ?> selected="selected"<?php } ?>><?php echo $row['name'];?></option>
						<?php } ?>
						<?php } } ?>
					</select>
					<select class="span3" name="cate_2" id="cate_2"><option value="0">请选择二级分类</option>
					<?php if($rule['rule']['cate']['1']) { ?>
					<?php if(is_array($children[$rule['rule']['cate']['0']])) { foreach($children[$rule['rule']['cate']['0']] as $row) { ?>
						<option value="<?php echo $row['0'];?>" <?php if($row['0'] == $rule['rule']['cate']['1']) { ?> selected="selected"<?php } ?>><?php echo $row['1'];?></option>
					<?php } } ?>
					<?php } ?>
					</select>
				</td>
			</tr>
			<tr>
				<th><label for="">状态</label></th>
				<td>
					<label for="status_1" class="radio inline"><input type="radio" name="status" id="status_1" value="1" <?php if($rule['rule']['status'] == 1 || empty($rule['rule']['status'])) { ?> checked="checked"<?php } ?> /> 启用</label>
					<label for="status_0" class="radio inline"><input type="radio" name="status" id="status_0" value="0" <?php if(!empty($rule) && $rule['rule']['status'] == 0) { ?> checked="checked"<?php } ?> /> 禁用</label>
					<span class="help-block"></span>
				</td>
			</tr>
			<tr>
				<th><label for="">是否置顶</label></th>
				<td>
					<label for="radio_1" class="radio inline"><input type="radio" name="istop" id="radio_1" onclick="$('#displayorder').hide();" value="1" <?php if(!empty($rule['rule']['displayorder']) && $rule['rule']['displayorder'] == 255) { ?> checked="checked"<?php } ?> /> 置顶</label>
					<label for="radio_0" class="radio inline"><input type="radio" name="istop" id="radio_0" onclick="$('#displayorder').show();" value="0" <?php if($rule['rule']['displayorder'] < 255) { ?> checked="checked"<?php } ?> /> 普通</label>
					<span class="help-block">“置顶”时无论在什么情况下均能触发且使终保持最优先级，<span style="color:red">置顶设置过多，会影响系统效率，建议不要超过100个</span>；否则参考设置的“优先级”值</span>
				</td>
			</tr>
			<tr id="displayorder" <?php if(!empty($rule['rule']['displayorder']) && $rule['rule']['displayorder'] == 255) { ?> style="display:none;"<?php } ?>>
				<th><label for="">优先级</label></th>
				<td>
					<input type="text" id="rule-name" class="span2" placeholder="" name="displayorder" value="<?php echo $rule['rule']['displayorder'];?>">
					<span class="help-block">规则优先级，越大则越靠前，最大不得超过254</span>
				</td>
			</tr>
			<tr>
				<th><label for="">回复类型</label></th>
				<td>
					<?php if(empty($rid)) { ?>
					<select name="module" id="module" class="span6" onchange="$(this).next().html($(this.options[this.selectedIndex]).attr('description'));buildModuleForm($(this).val())">
						<?php if(is_array($modules)) { foreach($modules as $key => $mod) { ?>
						<option value="<?php echo $mod['name'];?>" <?php if($mod['name'] == $defaultmodule) { ?> selected="selected"<?php } ?> description="<?php echo $mod['description'];?>"><?php echo $mod['title'];?></option>
						<?php } } ?>
					</select>
					<span class="help-block"></span>
					<?php } else { ?>
					<div><?php echo $_W['modules'][$rule['rule']['module']]['title'];?></div>
					<span class="help-block"><?php echo $_W['modules'][$rule['rule']['module']]['description'];?><input type="hidden" name="module" value="<?php echo $rule['rule']['module'];?>" /></div>
					<?php } ?>
				</td>
			</tr>
			<tr>
				<th><label for="">关键字</label></th>
				<td>
					<div class="keyword-list list" id="keyword-list">
						<?php if(is_array($rule['keyword'])) { foreach($rule['keyword'] as $item) { ?>
						<div class="item" id="keyword-item-<?php echo $item['id'];?>">
							<?php include template('rule/item', TEMPLATE_INCLUDEPATH);?>
						</div>
						<?php } } ?>
					</div>
					<a href="javascript:;" onclick="keywordHandler.buildForm()" class="add-kw-button"><i class="icon-plus"></i> 添加关键字</a>
				</td>
			</tr>
			<tr>
				<th><label for="">回复</label></th>
				<td id="module-form">
					<?php if(!empty($rid)) { ?>
					<?php $rule['reply']->fieldsFormDisplay($rule['rule']['id']);?>
					<?php } else { ?>
					<?php module($defaultmodule)->fieldsFormDisplay();?>
					<?php } ?>
				</td>
			</tr>
			<tr>
				<th></th>
				<td>
					<button type="submit" class="btn  btn-primary" name="submit" value="提交">提交</button>
					<input type="hidden" name="token" value="<?php echo $_W['token'];?>" />
				</td>
			</tr>
		</table>
	</form>
</div>
<script type="text/html" id="keyword-item-html">
<?php unset($item); template('rule/item');?>
</script>
<script type="text/javascript">
<!--
	var category = <?php echo json_encode($children)?>;
	var keywordHandler = {

        'buildForm' : function() {

            var obj = buildAddForm('keyword-item-html', $('#keyword-list'));

			obj.find('.btn-group .btn').on('click', function(){
				$(this).parent().next().html($(this).attr('description'));
				obj.find('#keyword-type-new').val($(this).find('input').attr('value'));
			});

			obj.find('#form').removeClass('hide');
			obj.find('#show').addClass('hide');
		},
		'doAdd' : function(itemid) {
			var parent = $('#' + itemid);
			if ($('.keyword-name-new', parent).val() == '') {
				message('请输入关键字！', '', 'error');
				return false;
			}
			var typetips = $('.active', parent).html();
			$('#show #type', parent).html(typetips);
			$('#show #content', parent).html($('.keyword-name-new', parent).val());
			$('#show', parent).removeClass('hide');
			$('#form', parent).addClass('hide');
		},
		'doEditItem' : function(itemid) {
			$('#keyword-list .item').each(function(){
				$('#form', $(this)).removeClass('hide');
				$('#show', $(this)).addClass('hide');
			});
			doEditItem(itemid);
		}
	};

	function buildModuleForm(module) {
		try {
			$.ajax({
			  url: "<?php echo create_url('member/module', array('do' => 'form', 'id' => $rule['rule']['id']))?>",
			  type: "GET",
			  data: {'name' : module.toLowerCase()},
			  dataType: "html"
			}).done(function(s) {
				if (s && s.indexOf('"type":"error"') >= 0) {
					message('请重新选择公众号！', '<?php echo create_url('rule/post')?>', 'error');
					return false;
				}
				formCheckers = [];
				$('#module-form').html(s);
			});
		}
		catch (e) {
		}
	}

	function formcheck(form) {

        if (form['name'].value == '') {
            message('抱歉，规则名称为必填项，请返回修改！', '', 'error');
			return false;
		}
		if ($('.keyword-name-new').val() == '') {
			message('抱歉，您至少要设置一个触发关键字！', '', 'error');
			return false;
		}
		return true;
	}

	<?php if(empty($rid)) { ?>
	$(function(){

        keywordHandler.buildForm();
	});
	<?php } else { ?>
	$('.btn-group .btn').on('click', function(){
		$(this).parent().next().html($(this).attr('description'));
		$(this).parent().parent().find('#keyword-type-new').val($(this).attr('value'));
	});
	<?php } ?>
//-->
</script>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>
