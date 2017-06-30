$(function(){
	$('#area_a').change(function(event,area_b_value){
		$('#area_c').hide();
		var selectedId = $('#area_a option:selected') .val();
		if(selectedId!=''){
			$.getJSON('?m=member&c=index&a=public_getlinkage', {bid:selectedId,date:new Date().getTime()},function(json){
				if(json!=''){
					  $('#area_b').html("<option value=''>请选择市县</option>");
				      for(var i=0;i<json.length;i++){
							if(json[i].linkageid==area_b_value){
				    			$('#area_b').append("<option selected value="+json[i].linkageid+">"+json[i].name+"</option>");
				    		}else{
				    			$('#area_b').append("<option  value="+json[i].linkageid+">"+json[i].name+"</option>");
				    		}
					  }
				}
		     }); 
		 }else{
			   $('#area_b').html("<option value=''>请选择市县</option>");
			   $('#area').val('');		  
		}
	});
	$('#area_b').change(function(){
		var selectedId = $('#area_b option:selected') .val();
		 if(selectedId!=''){
			 $('#area').val(selectedId);
		 }else{
			 $('#area').val('');
		 }
	});
	//$('#area_a').change();
	$('#area_a').trigger("change",[$("#c_area_b").val()]);
	$("#sex").val($("#c_sex").val());
	$("#modal_submit").click(function(){
		$('#myModal').find('iframe').contents().find('#dosubmit').click();
	});
	//搜索按钮
	$("#searchBtn").click(function(){
		$("#myform").attr("method","get");
	});
	//删除按钮
	$("#deleteBtn").click(function(){
		$("#myform").attr("method","post");
		$("#myform").attr('action',"?m=customer&c=index&a=delete");
		if(confirm('确认要删除吗？')){
			checkuid();
		}
	});
	//导出按钮
	$("#export").click(function(data){
		$("#myform").attr("method","get");
		var ids='';
		$("input[name='push_ids[]']:checked").each(function(i, n){
			ids += $(n).val() + ',';
		});
		$("input[name='a']").val("export");
		$("#myform").submit();
	});
	
	
	
});
//判断是否选择记录
function checkuid() {
	var ids='';
	$("input[name='push_ids[]']:checked").each(function(i, n){
		ids += $(n).val() + ',';
	});
	if(ids=='') {
		$('#modaltip #myModalBody').html("你未作选择删除哪些数据");
		$('#modaltip').modal();
		return false;
	} else {
		myform.submit();
	}
}
function add(configid){
	if(!configid){
		alert("请先创建报表，才能添加客户");
		return false;
	}
	$('#myModal #myModalLabel').html("添加客户");
	$('#myModal').find('iframe').attr("src",'?m=customer&c=index&a=add&configid='+configid);	
}
function edit(customerid){
	$('#myModal #myModalLabel').html("编辑客户");
	$('#myModal').find('iframe').attr("src",'?m=customer&c=index&a=edit&customerid='+customerid);
}
function report_add(){
	$('#myModal #myModalLabel').html("创建报表");
	$('#myModal').find('iframe').attr("src",'?m=customer&c=index&a=report_add');	
}
function report_edit(configid){
	$('#myModal #myModalLabel').html("编辑报表");
	$('#myModal').find('iframe').attr("src",'?m=customer&c=index&a=report_edit&configid='+configid);	
}
//删除报表
function report_delete(configid){
	if(confirm('确认要删除吗？删除报表的同时该报表的所创建的客户会一并删除')){
		$.post('?m=customer&c=index&a=report_delete&configid='+configid,function(data){
			alert(data);
			window.location="?m=customer&c=index&a=init";
		});
	}
}
//删除客户
function report_customerDelete(configid){
	if(confirm('确认要删除吗?')){
		$.post('?m=customer&c=index&a=report_customerDelete&configid='+configid,function(data){
			alert(data);
			window.location="?m=customer&c=index&a=init";
		});
	}
}
//模板下载
function tpl_download(tpl_path){
	if(!tpl_path){
		alert("该报表无模板");
	}else{
		window.location=tpl_path;
	}
}
function modal_close(){
	$(".close").click();
}