$(function(){
	wd_init();
});


function wd_init(){
    /* document load fadeIn  */
	//==================================inputdefault 输入框属性扩展=============================
	$("[inputdefault]").each(function(){//请勿对输入框和文本区域以外的标签使用inputdefault属性
        var color = '#d7d6d6';
        if($(this).hasClass('search_txt')){
            color =  $(this).css('color');
        }
        $(this).wrap('<span style="display: inline-block;position: relative;"></span>');
        var _this = this;
        var left = parseFloat($(this).css('padding-left')) + parseFloat($(this).css('margin-left')) + 5;
        var inputCss = {
            'position':'absolute',
            color : color,
            left : left,
            top : 0,
            width : $(this).width(),
            marginTop :$(this).css('margin-top'),
            marginBottom :$(this).css('margin-bottom'),
            height : $(this).outerHeight()
        };
        if(this.tagName == 'INPUT'){
            inputCss.lineHeight = $(this).css('height');
        }
        else{
            inputCss.lineHeight = $(this).css('line-height');
            inputCss.paddingTop = $(this).css('padding-top');
            inputCss.paddingBottom = $(this).css('padding-bottom');
        }

        var $label = $('<span>'+ $(this).attr("inputdefault") +'</span>').insertAfter($(this)).css(inputCss).hide().click(function(){
            $(_this).focus();
        });
        $(this).attr({
            'data-left' : left
        });
        if($(this).val() == ""){
            $label.text($(this).attr("inputdefault")).show();
        }
	}).live("keyup",function(){
//        if($(this).val() == $(this).attr("inputdefault")){
//            $(this).val("").addClass("focus");
//            if(!$(this).hasClass('search_txt')) $(this).css('color','#666');
//        }
//        else if($(this).val()==""){
//            $(this).val($(this).attr("inputdefault")).removeClass("focus");
//            if(!$(this).hasClass('search_txt')) $(this).css('color','#999');
//        }
//        else{
//            if(!$(this).hasClass('search_txt')) $(this).css('color','#666');
//        }

        var $label = $(this).next();
        if($(this).val() != '' ){
            $label.stop(true).animate({left: 200 , opacity : 'hide'},'fast');
        }
	}).live('blur',function(){
        var $label = $(this).next();
        if($(this).val() == '' ){
            $label.stop(true).animate({left: $(this).attr('data-left') , opacity : 'show'},'fast');
        }
    });
	
	//==========================事件 扩展================================
	$("[hoverable='true']").live("mouseover",function(){$(this).addClass("hover");}).live("mouseout",function(){$(this).removeClass("hover");});

	$("[focusable='true']").live("focus",function(){$(this).addClass("focus");}).live("blur",function(){$(this).removeClass("focus");});
	
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
            lines : $(n).attr('trunk8'),
            fill: '&hellip; <a id="read-more" href="#">read more</a>'
        });
    })

    $('#read-more').live('click', function (event) {
        $(this).parent().trunk8('revert').append(' <a id="read-less" href="#">read less</a>');

        return false;
    });

    $('#read-less').live('click', function (event) {
        $(this).parent().trunk8();

        return false;
    });


     $('input[button-loading]').click(function(){
         $(this).val($(this).attr('button-loading'));
         $(this).removeAttr('class').addClass($(this).attr('button-loading-class')).attr('disabled','true')
     })

}