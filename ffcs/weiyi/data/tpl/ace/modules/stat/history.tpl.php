<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'统计分析 '),array('title'=>'聊天记录'),array('title'=>'关键指标详解'))?>
<?php include $this->template('common/header', TEMPLATE_INCLUDEPATH);?>

<link type="text/css" rel="stylesheet" href="./resource/ace/assets/css/daterangepicker.css" />
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
<div class="page-header">
    <h1>
        <i class="icon-book"></i> 聊天记录
    </h1>
</div>
	<div class="main">
		<div class="stat">

			<div class="stat-div">
                <ul class="nav nav-tabs padding-24 tab-color-blue background-blue ">
                    <li <?php if($_GPC['searchtype'] == 'rule' || empty($_GPC['searchtype'])) { ?>class="active"<?php } ?>><a href="<?php echo create_url('index/module/history', array('name' => 'stat', 'searchtype' => 'rule'))?>">已有规则回复</a></li>
                    <li <?php if($_GPC['searchtype'] == 'default') { ?>class="active"<?php } ?>><a href="<?php echo create_url('index/module/history', array('name' => 'stat', 'searchtype' => 'default'))?>">默认规则回复</a></li>
                </ul>

				<div class="sub-item">
					<form action="" method="get">
					<div class="pull-right">
						<input class="btn btn-sm btn-primary" type="submit" value="搜索">
                        <input class="btn btn-sm btn-primary" name="export"  type="submit" value="导出">
					</div>
					<div class="pull-left">
						<input name="act" type="hidden" value="<?php echo $_GPC['act'];?>" />
						<input name="do" type="hidden" value="<?php echo $_GPC['do'];?>" />
						<input name="name" type="hidden" value="<?php echo $_GPC['name'];?>" />
						<input name="searchtype" type="hidden" value="<?php echo $_GPC['searchtype'];?>" />
						<input type="text" class="span2 form-control" name="keyword" value="<?php echo $_GPC['keyword'];?>" placeholder="请输入关键字">
						<input name="start" type="hidden" value="<?php echo date('Y-m-d', $starttime)?>" />
						<input name="end" type="hidden" value="<?php echo date('Y-m-d', $endtime)?>" />
						<button class="form-control date" id="date-range" type="button"><span class="date-title"><?php echo date('Y-m-d', $starttime)?> 至 <?php echo date('Y-m-d', $endtime)?></span> <i class="icon-caret-down"></i></button>
						<span class="date-section"><a href="javascript:;" onclick="range(7);">7天</a><a href="javascript:;" onclick="range(14);">14天</a><a href="javascript:;" onclick="range(30);">30天</a></span>
					</div>
					</form>
				</div>
				<div class="sub-item" id="table-list">
					<h4 class="sub-title">详细数据</h4>
					<div class="sub-content">
						<table class="table table-striped table-bordered table-hover">
							<thead class="navbar-inner">
								<tr>
									<th style="width:80px;">用户<i></i></th>
									<th class="row-hover">内容<i></i></th>
									<th style="width:110px;">规则<i></i></th>
									<th style="width:80px;">模块<i></i></th>
									<th style="width:100px;">时间<i></i></th>
									<th style="width:110px;">操作</th>
								</tr>
							</thead>
							<tbody>
								<?php if(is_array($list)) { foreach($list as $row) { ?>
								<tr>
									<td><a href="#" class="name" title="<?php echo $row['from_user'];?>"><?php echo cutstr($row['from_user'], 8)?></a></td>
									<td align="left" class="row-hover"><?php echo $row['message'];?></td>
									<td><?php if(empty($row['rid'])) { ?>N/A<?php } else { ?><a target="main" href="<?php echo create_url('rule/post', array('id' => $row['rid']))?>"><?php echo cutstr($rules[$row['rid']]['name'], 6)?></a><?php } ?></td>
									<td><?php echo $row['module'];?></td>
									<td style="font-size:12px; color:#666;">
									<?php echo date('Y-m-d <br /> H:i:s', $row['createtime']);?>
									</td>
									<td>
                                        <?php if($_W['weid'] == Mobile_Internet_Id) { ?>
                                        <a href="javascript:;" class="relay">回复</a>
                                        <?php } else { ?>
                                        <a href="javascript:;">删除</a>
                                        <?php } ?>
									</td>
								</tr>
                                <?php if($_W['weid'] == Mobile_Internet_Id) { ?>
                                <tr >
                                    <td colspan="6" class="hide">
                                        <div class="relay-content">
                                           <div class="input-auto"><textarea name=""></textarea></div>
                                           <div class="replay-footer clearfix">
                                               <div class="replay-tip"></div>
                                               <div class="options">
                                                   <a href="javascript:;" class="btn btn-sm btn-primary">发送</a><a href="javascript:;"  class="btn slideup">收起</a>
                                               </div>
                                           </div>
                                        </div>
                                    </td>
                                </tr>
                                <?php } ?>
								<?php } } ?>
							</tbody>
						</table>
                        <?php if($_W['weid'] == Mobile_Internet_Id) { ?>
                        <script type="text/javascript">
                            var relayContant = {
                                slideUp : function(elem){
                                    $(elem).stop(true,true).slideUp(600 ,function(){ $(this).closest('td').addClass('hide')} );
                                },
                                 slideDown: function(elem){
                                    $(elem).closest('td').removeClass('hide')
                                    $(elem).stop(true,true).slideDown(600);
                                }
                            }


                            $('.stat').on('click','.relay',function(){
                                var $elem = $(this).closest('tr').next() ;
                                relayContant.slideUp($elem.siblings().find('.relay-content'));
                                var $content = $elem.find('.relay-content');
                                if($content.is(':hidden')){
                                    relayContant.slideDown($content);
                                }
                                else{
                                    relayContant.slideUp($content);
                                }
                                //$elem.find('.relay-content').slideToggle();
                            }).on('click','.options .slideup',function(){
                                relayContant.slideUp($(this).closest('tr').find('.relay-content'));
                            }).on('click','.options .btn-primary',function(){
                                var row = $(this).closest('tr') ;
                                var val = row.find('textarea').val();
                                var name = row.prev('tr').find('.name').attr('title');
                                var that = this;
                                $.post("<?php echo create_url('stat/reply');?>",{ openid : name,content:val}, function(data){
                                    if (data.errno == 200) {
                                        //发送成功
                                        row.find('.replay-tip').show().html('发送成功').addClass('text-success pull-left').fadeOut(1000);
                                        //relayContant.slideUp($(that).closest('tr').find('.relay-content'));
                                    }else{
                                        //发送失败
                                        row.find('.replay-tip').show().html(data.error).addClass('text-error pull-left').fadeOut(1000);
                                        //relayContant.slideUp($(that).closest('tr').find('.relay-content'));
                                    }
                                },'json')

                            })
                        </script>
                        <?php } ?>
					</div>
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
