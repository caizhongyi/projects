<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'统计分析 '),array('title'=>'粉丝统计'),array('title'=>'粉丝列表'))?>
<?php include $this->template('common/header', TEMPLATE_INCLUDEPATH);?>
<style>
.field label{float:left;margin:0 !important; width:140px; font-size: 12px;}
</style>
<div class="page-header">
    <h1>
        <i class="icon-book"></i> 粉丝列表
    </h1>
</div>
<div class="main">
	<div class="stat">
		<div class="stat-div">
			<div class="sub-item">
					<h4 class=""><i class="icon-search"></i> 搜索</h4>
					<form action="<?php echo create_url('index')?>">
					<input type="hidden" name="act" value="module" />
					<input type="hidden" name="name" value="fans" />
					<input type="hidden" name="do" value="display" />
					<table class="table sub-search">
					<tbody>
						<tr>
							<th style="width:80px;">登记情况</th>
							<td class="field">
								<?php if(is_array($fields)) { foreach($fields as $field => $comment) { ?>
								<label class="checkbox inline"><input type="checkbox" name="select[]" value="<?php echo $field;?>" <?php if(in_array($field, $select)) { ?> checked<?php } ?> /> <?php echo $comment;?></label>
								<?php } } ?>
							</td>
						</tr>
						<tr>
                            <th>关注时间</th>
                            <td>
                                <button class="form-control span5" id="date-range" type="button"><span class="date-title"><?php echo date('Y-m-d', $starttime)?> 至 <?php echo date('Y-m-d', $endtime)?></span> <i class="icon-caret-down"></i></button>
                                <input name="start" type="hidden" value="<?php echo date('Y-m-d', $starttime)?>" />
                                <input name="end" type="hidden" value="<?php echo date('Y-m-d', $endtime)?>" />
                            </td>
                        </tr>
                        <tr>
                            <th>openid</th>
                            <td>
                                <input type="text" value="<?php echo $from_user;?>" class="span5" name="from_user">
                            </td>
                        </tr>
						<tr>
							<th></th>
							<td>
                                <input type="submit" name="" value="搜索" class="btn btn-sm btn-primary">

                            </td>

						</tr>
					</tbody>
					</table>
					</form>
				</div>

            <!--<table class="table sub-search">
                <tr>
                    <th style="width:80px;">批量回复</th>
                    <td>
                        <div>
                            <iframe name="aa" style="display: none;"></iframe>
                            <form id="reply_form" enctype="multipart/form-data" target="aa" action="<?php echo create_url('index/module/display', array('name' => 'fans'));?>" method="post" onsubmit="return confirm_check();">
                                <input type="file" name="file" id="file">
                                <input type="hidden" name="submit_reply" value="1">
                                <input type="submit" name="" id ="reply_btn" value="回复" class="btn btn-sm btn-primary">
                                <span style="color: red;">注：请勿重复导入，导入成功后，后台每分钟发送100条信息！</span>
                            </form>
                            <script type="text/javascript">
                                function confirm_check(){
                                    return confirm('确认回复');
                                }
                            </script>
                        </div>

                    </td>

                </tr>
            </table>-->


			<div class="sub-item" id="table-list">
				<h4 class="sub-title">详细数据</h4>
				<form action="" method="post" onsubmit="">
				<div class="sub-content">
					<table class="table table-striped table-bordered table-hover">
						<thead class="navbar-inner">
							<tr>
								<th style="width:80px;" class="row-first">选择</th>
								<th class="row-hover" style="width:260px;">用户openid<i></i></th>
								<?php if(is_array($select)) { foreach($select as $field) { ?>
								<th><?php echo $fields[$field];?><i></i></th>
								<?php } } ?>
								<th style="width:110px;">关注时间<i></i></th>
                                <?php if($_W['weid'] == Mobile_Internet_Id) { ?>
                                <th style="width:110px;">操作<i></i></th>
                                <?php } ?>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<?php if(is_array($list)) { foreach($list as $row) { ?>
							<tr>
								<td class="row-first"><input type="checkbox" name="select[]" value="<?php echo $row['id'];?>" /></td>
								<td class="row-hover"><span href="#" class="name" title="<?php echo $row['from_user'];?>"><?php echo $row['from_user'];?></span></td>
								<?php if(is_array($select)) { foreach($select as $field) { ?>
								<th><?php echo $row[$field];?><i></i></th>
								<?php } } ?>
								<td style="font-size:12px; color:#666;">
								<?php echo date('Y-m-d <br /> H:i:s', $row['createtime']);?>
								</td>
                                <?php if($_W['weid'] == Mobile_Internet_Id) { ?>
                                <td>
                                <a href="javascript:;" class="relay">回复</a>
                                </td>
                                <?php } ?>
								<td></td>
							</tr>
                            <?php if($_W['weid'] == Mobile_Internet_Id) { ?>
                            <tr >
                                <td colspan="100" class="hide">
                                    <div class="relay-content">
                                        <div class="input-auto"><textarea name=""></textarea></div>
                                        <div class="replay-footer clearfix">
                                            <div class="replay-tip"></div>
                                            <div class="options">
                                                <a href="javascript:;" class="btn  btn-sm btn-primary">发送</a><a href="javascript:;"  class="btn slideup">收起</a>
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
					<table class="table">
						<tr>
							<td class="row-first"></td>
							<td>
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
<link type="text/css" rel="stylesheet" href="./resource/ace/assets/css/daterangepicker.css" />
<script type="text/javascript" src="./resource/script/daterangepicker.js"></script>
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
</script>
<?php include $this->template('common/footer', TEMPLATE_INCLUDEPATH);?>