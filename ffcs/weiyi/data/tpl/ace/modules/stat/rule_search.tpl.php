<?php defined('IN_IA') or exit('Access Denied');?><link type="text/css" rel="stylesheet" href="./resource/ace/assets/css/daterangepicker.css" />
<script type="text/javascript" src="./resource/script/daterangepicker.js"></script>
<script type="text/javascript">
$(function() {
	$('#date-range').daterangepicker({
		format: 'YYYY-MM-DD',
		startDate: $(':hidden[name=start]').val(),
		endDate: $(':hidden[name=end]').val(),
		locale: {
			applyLabel: '确定',
			cancelLabel: '取消',
			fromLabel: '从',
			toLabel: '至',
			weekLabel: '周',
			customRangeLabel: '日期范围',
			daysOfWeek: moment()._lang._weekdaysMin.slice(),
			monthNames: moment()._lang._monthsShort.slice(),
			firstDay: 0
		}
	}, function(start, end){
		$('#date-range .date-title').html(start.format('YYYY-MM-DD') + ' 至 ' + end.format('YYYY-MM-DD'));
		$(':hidden[name=start]').val(start.format('YYYY-MM-DD'));
		$(':hidden[name=end]').val(end.format('YYYY-MM-DD'));
	});
});
function range(days) {
	var start = moment().add('days', 0 - days).format('YYYY-MM-DD');
	var end = moment().format('YYYY-MM-DD');
	$('#date-range .date-title').html(start + ' 至 ' + end);
	$(':hidden[name=start]').val(start);
	$(':hidden[name=end]').val(end);
	$('form[method=get]')[0].submit();
}
</script>

<ul class="nav nav-tabs padding-24 tab-color-blue background-blue ">
    <li <?php if($_GPC['foo'] == 'hit' || empty($_GPC['foo'])) { ?>class="active"<?php } ?>><a href="<?php echo create_url('index/module/rule', array('name' => 'stat', 'foo' => 'hit'))?>">已触发规则</a></li>
    <li <?php if($_GPC['foo'] == 'miss') { ?>class="active"<?php } ?>><a href="<?php echo create_url('index/module/rule', array('name' => 'stat', 'foo' => 'miss'))?>">未触发规则</a></li>
</ul>
<div class="sub-item">
	<form action="" method="get">
	<input type="hidden" name="act" value="<?php echo $_GPC['act'];?>" />
	<input type="hidden" name="do" value="<?php echo $_GPC['do'];?>" />
	<input type="hidden" name="name" value="<?php echo $_GPC['name'];?>" />
	<input type="hidden" name="foo" value="<?php echo $_GPC['foo'];?>" />
	<div class="pull-right">
		<input class="btn btn-sm btn-primary" type="submit" value="搜索">
	</div>
	<div class="pull-left">
		<input name="searchtype" type="hidden" value="<?php echo $_GPC['searchtype'];?>" />
		<input type="text" class="span2 form-control" name="keyword" value="<?php echo $_GPC['keyword'];?>" placeholder="请输入关键字">
		<input name="start" type="hidden" value="<?php echo date('Y-m-d', $starttime)?>" />
		<input name="end" type="hidden" value="<?php echo date('Y-m-d', $endtime)?>" />
		<button class="form-control date" id="date-range"  type="button"><span class="date-title"><?php echo date('Y-m-d', $starttime)?> 至 <?php echo date('Y-m-d', $endtime)?></span> <i class="icon-caret-down"></i></button>
		<span class="date-section"><a href="javascript:;" onclick="range(7);">7天</a><a href="javascript:;" onclick="range(14);">14天</a><a href="javascript:;" onclick="range(30);">30天</a></span>
	</div>
	</form>
</div>
