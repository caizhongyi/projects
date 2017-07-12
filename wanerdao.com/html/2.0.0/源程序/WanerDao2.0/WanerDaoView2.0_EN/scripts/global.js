$(function(){
	wd_init();
});


function wd_init(){
    /* document load fadeIn  */
    $('body').hide().fadeIn();
	
	//==================================inputdefault 输入框属性扩展=============================
	$("[inputdefault]").each(function(){//请勿对输入框和文本区域以外的标签使用inputdefault属性
		if(!$(this).hasClass('search_txt')) $(this).css('color','#999');; 
		
		 // 初始化文本框的颜色
		
		if($(this).is(":focus")){
			if($(this).is(":text")){
				$(this).val("").addClass("focus");
			}else{//textarea
				$(this).html("").addClass("focus");
			}
		}
	})
	$("[inputdefault]").live("focus",function(){
		
		if($(this).is(":text")){
			if($(this).val()==$(this).attr("inputdefault")){
				$(this).val("").addClass("focus");
				if(!$(this).hasClass('search_txt')) $(this).css('color','#666');
			}
		}else{//textarea
			if($(this).html()==$(this).attr("inputdefault")){
				$(this).html("").addClass("focus");
				if(!$(this).hasClass('search_txt')) $(this).css('color','#666');
			}
		}
		
	});
    
	$("[inputdefault]").live("blur",function(){
		
		if($(this).is(":text")){
			if($(this).val()==""){
				$(this).val($(this).attr("inputdefault")).removeClass("focus");
				if(!$(this).hasClass('search_txt')) $(this).css('color','#999');
			}
			else{
				if(!$(this).hasClass('search_txt')) $(this).css('color','#666');
			}
		}else{//textarea
			if($(this).html()==""){
				$(this).html($(this).attr("inputdefault")).removeClass("focus");
				if(!$(this).hasClass('search_txt')) $(this).css('color','#999');
			}
			else{
				if(!$(this).hasClass('search_txt')) $(this).css('color','#666');
			}
		}
	});
	
	//==========================事件 扩展================================
	$("[hoverable='true']").live("mouseover",function(){$(this).addClass("hover");});
	$("[hoverable='true']").live("mouseout",function(){$(this).removeClass("hover");});
	
	$("[focusable='true']").live("focus",function(){$(this).addClass("focus");});
	$("[focusable='true']").live("blur",function(){$(this).removeClass("focus");});
	
	$("[selectedable='true']").live("click",function(){
		if($(this).hasClass("selected")){
			$(this).removeClass("selected");
		}else{
			$(this).addClass("selected");
		}
	});
	
	/* labeltext focus效果 */
	$('.labeltext').live('focus',function(){
		$(this).addClass('labeltext-focus')
	}).live('blur',function(){
		$(this).removeClass('labeltext-focus')
	})
	

	/* select */
    $.fn.chosen && $('select').chosen();
    /*
        trunk8
     */
    $('[trunk8]').each(function(i, n){
        $(n).trunk8 && $(n).trunk8({
            lines : $(n).attr('trunk8')
        });
    })


}