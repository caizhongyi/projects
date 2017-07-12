$(function(){
	$("#list li").bind({
		mouseover:function(){
			var a=$(this).attr("c");
			$(this).removeClass(a).addClass(a+'_all');
		},
		mouseout:function(){
			var a=$(this).attr("c");
			$(this).removeClass(a+'_all').addClass(a);
		}
	})
	$("#chose_all").click(function(){
		$("#list input").attr({'checked':true});						   
	})
	$("#chose_other").click(function(){
		$("#list input").each(function(){
			if($(this).attr('checked')){
				$(this)	.attr({'checked':false});
			}else{
				$(this)	.attr({'checked':true});
			}
		})						   
	})
})