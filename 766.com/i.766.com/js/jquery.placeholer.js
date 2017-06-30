// 让不支持placeholder的浏览器实现此属性  
$(function(){  
	function supports_input_placeholder(){  
        var i = document.createElement("input");  
		return "placeholder" in i;  
	}  
	var input_placeholder = $("input[placeholder],textarea[placeholder]");  
	  
	if (input_placeholder.length !== 0 && !supports_input_placeholder()) {  
	  
		var color_place = "#A9A9A9";      
		  
		$.each(input_placeholder, function(i){  
			var _this = this;
			var isUserEnter = 0; // 是否为用户输入内容,placeholder允许用户的输入和默认内容一样  
			var ph = $(this).attr("placeholder");  
			var curColor = $(this).css("color");  
			
			if($(this).is(':password')){
				var $wrap = $('<span/>').css({'display' : 'inline-block' , 'position' : 'relative'}),
					$placeholder = $('<span/>').text(ph).css({ 'position':'absolute' , display:'block', left : 0 , top : 0 , width : $(this).width() , height : $(this).height(), background : $(this).css('background'),"color" : color_place }).addClass('placeholder-overlay')
				$(this).wrap($wrap);
				$placeholder.appendTo($(this).parent());
				$placeholder.click(function(){  
					$placeholder.hide();
					$(_this).val("").css("color", curColor).focus(); 
				});  
				$(this).blur(function(){  
					if ($(this).val() == "") {  
						$placeholder.show().css("color", color_place);  
						isUserEnter = 0;  
					}  
				})
			}
			else{
				$(this).val(ph).css("color", color_place);  
			  
				$(this).focus(function(){  
					if ($(this).val() == ph && !isUserEnter) $(this).val("").css("color", curColor);  
				})  
				.blur(function(){  
					if ($(this).val() == "") {  
						$(this).val(ph).css("color", color_place);  
						isUserEnter = 0;  
					}  
				})  
				.keyup(function(){  
					if ($(this).val() !== ph) isUserEnter = 1;  
				});  
			}
			  
		});  
	}  
}) 
