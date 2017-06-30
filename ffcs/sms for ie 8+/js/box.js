/**
 * 通用弹窗
 */

(function($){	
		  
	
	$.mymodal = {
	   show : function(id){
		  return $('#'+ id ).addClass('in').show().animate({ opacity : 1 , top :100});
	   },
	   hide : function(id){
		   return $('#'+ id ).removeClass('in').animate({ opacity : 0 , top :0},function(){
			   $(this).hide();
		   }); 
	   }
	}
	/**
	 * showmessage提示框
	 * @param string url	//处理地址
	 * @param array  datas	//提交参数
	 * @param string method	//处理方式 get或post  默认post
	 */
	$.showmessageTip = function(url,datas,method){
		var method         = method || 'post';
		$.ajax({
		  type: method,
		  url: url,
		  data: datas,
		  dataType: "json",
		  success: function(data){		
				var message = data['message'];
				var url_forward = data['url_forward'];
				var ms = data['ms'];
				if(url_forward=='goback'||url_forward=='blank')
				{
					$.timereturnTip('提示',message,"location.reload(); ",ms);
				}
				else if(typeof url_forward == 'object')
				{
					var i=0;
					var gourl;
					for(var key	 in url_forward){
						if((url_forward[key]!='')&&(i==0)){
							gourl = url_forward[key];
							i++;
						}
					}
					$.errorTip('提示',message,"location.href =\'"+gourl+"\'; ",ms);
				}
				else 
				{
					$.timereturnTip('提示',message,"location.href =\'"+url_forward+"\'; ",ms);
				}
			}
		});
	}
	
	/**
	 * 定时跳转提示框
	 */
	$.timereturnTip = function(title,message,fun,time,divid){
		var divid         = divid || 'successTip';
		if($('#'+divid).length){
			$('#'+divid).remove();
		}
		var title         = title || '成功';
		var message       = message || '操作完成！';
		var fun       = fun || '';
		var time       = time || 5000;
		if(time==1250){time=5000;}
		var html='';
		html+='<div id="'+divid+'" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">';
		html+='<div class="modal-dialog">';
		html+='<div class="modal-content">';
        html+='<div class="modal-header">';
        html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onClick="$.mymodal.hide(\''+ divid +'\');">&times;</button>';
        html+='<h4 class="modal-title">'+title+'</h4>';
        html+='</div>';
        html+='<div class="modal-body">';
		html+='<p class="contain" style="font-size: 16px;font-weight: bold;margin: 25px 0;text-align: center;">'+message+'</p>';
        html+='</div>';
        html+='<div class="modal-footer">';
        html+='<a href="javascript:void(0);" class="btn btn-danger" id="btn_tipconfirm" onclick="$.mymodal.hide(\''+ divid +'\');'+fun+'">确 定</a>';
        html+='</div>';
    	html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='<script>';
		html+='setTimeout(function(){$(\'#btn_tipconfirm\').click();}, '+time+');';
		html+='</script>';
		$('body').append(html);
		$.mymodal.show(divid);
	}
	
	/**
	 * 成功确认框
	 */
	$.successTip = function(title,message,fun,divid){
		var divid         = divid || 'successTip';
		if($('#'+divid).length){
			$('#'+divid).remove();
		}
		var title         = title || '成功';
		var message       = message || '操作完成！';
		var fun       = fun || '';
		var html='';
		html+='<div id="'+divid+'" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">';
		html+='<div class="modal-dialog">';
		html+='<div class="modal-content">';
        html+='<div class="modal-header">';
        html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onClick="$.mymodal.hide(\''+ divid +'\');">&times;</button>';
        html+='<h4 class="modal-title">'+title+'</h4>';
        html+='</div>';
        html+='<div class="modal-body">';
		html+='<p class="contain" style="font-size: 16px;font-weight: bold;margin: 25px 0;text-align: center;">'+message+'</p>';
        html+='</div>';
        html+='<div class="modal-footer">';
        html+='<a href="javascript:void(0);" class="btn btn-danger" onclick="$.mymodal.hide(\''+ divid +'\');'+fun+'">确 定</a>';
        html+='</div>';
    	html+='</div>';
    	html+='</div>';
		html+='</div>';
		$('body').append(html);
		$.mymodal.show(divid);
	}
	
	/**
	 * 错误确认框
	 */
	$.errorTip = function(title,message,fun,divid){
		var divid         = divid || 'errorTip';
		if($('#'+divid).length){
			$('#'+divid).remove();
		}
		var title         = title || '错误';
		var message       = message || '操作失败！';
		var fun       = fun || '';
		
		var html='';
		html+='<div id="'+divid+'" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">';
		html+='<div class="modal-dialog">';
		html+='<div class="modal-content">';
        html+='<div class="modal-header">';
        html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="$.mymodal.hide(\''+ divid +'\');">&times;</button>';
        html+='<h4 class="modal-title">'+title+'</h4>';
        html+='</div>';
        html+='<div class="modal-body">';
		html+='<p class="contain" style="font-size: 16px;font-weight: bold;margin: 25px 0;text-align: center;">'+message+'</p>';
        html+='</div>';
        html+='<div class="modal-footer">';
        html+='<a href="javascript:void(0);" class="btn btn-danger" onclick="$.mymodal.hide(\''+ divid +'\');'+fun+'">确 定</a>';
        html+='</div>';
    	html+='</div>';
    	html+='</div>';
		html+='</div>';
		$('body').append(html);
		$.mymodal.show(divid);

	}
	
	/**
		* 居中提示
	*/
	$.centerTip = function(title,message,divid){
		if(!divid){
			divid='centerTip';
		}
		if($('#'+divid).length){
			$('#'+divid).remove();
		}
		
		var html='';
		html+='<div id="'+divid+'" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">';
		html+='<div class="modal-dialog">';
		html+='<div class="modal-content">';
        html+='<div class="modal-header">';
        html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onClick="$.mymodal.hide(\''+ divid +'\');">&times;</button>';
        html+='<h4 class="modal-title">'+title+'</h4>';
        html+='</div>';
        html+=message;
    	html+='</div>';
		html+='</div>';
		html+='</div>';
		$('body').append(html);
		$.mymodal.show(divid);
	}
	
	/**
	 * 提示确认框
	 */
	$.confirmTip = function(title,message,fun,divid){
		var divid         = divid || 'confirmTip';
		if($('#'+divid).length){
			$('#'+divid).remove();
		}
		
		var html='';
		html+='<div id="'+divid+'" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
		html+='<div class="modal">';
        html+='<div class="modal-header">';
        html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onClick="$(\'#'+divid+'\').modal(\'hide\');">&times;</button>';
        html+='<h4>'+title+'</h4>';
        html+='</div>';
        html+='<div class="modal-body">';
		html+='<p class="contain" style="font-size: 16px;font-weight: bold;margin: 25px 0;text-align: center;">'+message+'</p>';
        html+='</div>';
        html+='<div class="modal-footer">';
        html+='<a href="javascript:void(0);" class="btn btn-danger" onclick="'+fun+'">确 定</a>';
		html+='<a href="javascript:void(0);" class="btn" onclick="$(\'#'+divid+'\').modal(\'hide\');">取 消</a>';
        html+='</div>';
    	html+='</div>';
		html+='</div>';
		$('body').append(html);
		$('#'+divid).modal('show');
	}
})(jQuery);
