<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'统计分析 '),array('title'=>'规则使用率'),array('title'=>'未触发规则'))?>
<?php include $this->template('common/header', TEMPLATE_INCLUDEPATH);?>
<div class="page-header">
    <h1>
        <i class="icon-folder-close-alt  icon-folder-open-alt"></i> 未触发规则
    </h1>
</div>
	<div class="main">
		<div class="stat">
			<div class="stat-div">
				<?php include $this->template('rule_search', TEMPLATE_INCLUDEPATH);?>
				<div class="sub-item" id="table-list">
					<h4 class="sub-title">详细数据</h4>
					<form action="" method="post" onsubmit="">
					<div class="sub-content">
						<table class="table table-striped table-bordered table-hover">
							<thead class="navbar-inner">
								<tr>
									<th class="row-hover row-first">规则名称<i></i></th>
									<th style="width:80px;">模块<i></i></th>
									<th style="width:150px;">操作</th>
								</tr>
							</thead>
							<tbody>
								<?php if(is_array($list)) { foreach($list as $row) { ?>
								<tr>
									<td class="row-hover row-first"><a target="main" href="<?php echo create_url('rule/post', array('id' => $row['id']))?>"><?php echo $row['name'];?></a></td>
									<td><?php echo $row['module'];?></td>
									<td>
										<a target="main" href="<?php echo create_url('index/module/trend', array('name' => 'stat', 'id' => $row['rid']))?>">使用率走势</a>
									</td>
								</tr>
								<?php } } ?>
							</tbody>
						</table>
						<table class="table">
							<tr>
								<td class="row-first"><?php echo $rules[$row['rid']]['module'];?><!--input type="checkbox" name="select[]" value=""--></td>
								<td>
									<input type="submit" name="delete" value="提交" class="btn btn-sm btn-primary" />
									<input type="hidden" name="token" value="<?php echo $_W['token'];?>" />
								</td>
							</tr>
						</table>
					</div>
					</form>
					<?php echo $pager;?>
				</div>
			</div>
		</div>
	</div>

<script>
$(function() {
	//详细数据相关操作
	var tdIndex;
	$("#table-list thead").delegate("th", "mouseover", function(){
		if($(this).find("i").hasClass("")) {
			$("#table-list thead th").each(function() {
				if($(this).find("i").hasClass("icon-sort")) $(this).find("i").attr("class", "");
			});
			$("#table-list thead th").eq($(this).index()).find("i").addClass("icon-sort");
		}
	});
	$("#table-list thead th").click(function() {
		if($(this).find("i").length>0) {
			var a = $(this).find("i");
			if(a.hasClass("icon-sort") || a.hasClass("icon-caret-up")) { //递减排序
				/*
					数据处理代码位置
				*/
				$("#table-list thead th i").attr("class", "");
				a.addClass("icon-caret-down");
			} else if(a.hasClass("icon-caret-down")) { //递增排序
				/*
					数据处理代码位置
				*/
				$("#table-list thead th i").attr("class", "");
				a.addClass("icon-caret-up");
			}
			$("#table-list thead th,#table-list tbody:eq(0) td").removeClass("row-hover");
			$(this).addClass("row-hover");
			tdIndex = $(this).index();
			$("#table-list tbody:eq(0) tr").each(function() {
				$(this).find("td").eq(tdIndex).addClass("row-hover");
			});
		}
	});
});
</script>
<?php include $this->template('common/footer', TEMPLATE_INCLUDEPATH);?>
