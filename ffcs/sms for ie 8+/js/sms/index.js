$(function(){
	$('#create-list').click(function(){
		var listname = $('#listname').val();
		var sendtype = $('input[name="sendtype"]:checked').val();
		var objecttype = $('input[name="objecttype"]:checked').val();
		var ids = '',idsstr = '';
		if(objecttype == 1){
			$("input[name='push_ids[]']:checked").each(function(i, j){
				if($(j).val() != '' && $(j).val() != null){
					ids += $(j).val() + ',';
				}
			});
			idsstr = ids;
		}else if(objecttype == 2){
			$("input[name='push_ids[]']").each(function(i, j){
				if($(j).val() != '' && $(j).val() != null){
					ids += $(j).val() + ',';
				}
			});
			 idsstr = ids;
			 if(objecttype == 3){
					ids = 'all';
			 }
		}
		if(idsstr == '') {alert("请选择短信发送对象");return false;}
		
		$('#idsstr').val(ids);
		
		$('#title').val(listname);
		$('input[name="data[sendtypeid]"]').each(function(){
			$(this).removeAttr('disabled');
			if(sendtype == $(this).val()){
				 $(this).attr('checked', 'checked');
			}else{
				$(this).removeAttr('checked');
				 if(sendtype == 1 && $(this).val() != 1){
					$(this).attr('disabled','disabled');
				 }
			}
		});
		
		$('#show-modal').click();
	});
	
	 $.formValidator.initConfig({wideword:true,autotip:true,formid:"createform",onerror:function(msg){},onsuccess:function(){}});
	 
	 $("#title").formValidator({onshow:"请填写名称",onfocus:"请填写名称",onempty:"请填写名称", empty:false}).inputValidator({min:1,max:30,onerror:"名称字符应在1-30个之间"})
	 /*$("#content").formValidator({onshow:"请填写消息内容",onfocus:"请填写消息内容",onempty:"请填写消息内容", empty:false}).inputValidator({min:1,max:500,onerror:"消息内容字符应在1-500个之间"})*/
	 $("#count").formValidator({onshow:"请填写分割条数",onfocus:"请填写分割条数",onempty:"请填写分割条数", empty:false}).inputValidator({min:1,max:1,onerror:"分割条数必须为1-9以内的数字"})
	 $("#signature").formValidator({onshow:"请填写短信签名",onfocus:"请填写短信签名",onempty:"请填写短信签名", empty:false}).inputValidator({min:1,max:30,onerror:"短信签名字符应在1-30个之间"})

});