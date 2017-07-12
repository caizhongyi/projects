$(function(){
	
	/*代码没有整理 有点乱 就这样吧 应该看得懂*/
	$(".cbLeft li:not('.gray')").each(function(){
		$(this).hover(function(){
			$(this).addClass("selected");	
		},function(){
			$(this).removeClass("selected");	
		});	
	});
	
	//输入框默认效果
	$(".textS").each(function(){
		var defaultStr = $(this).attr("default")?$(this).attr("default"):"";
		textFocus(this,defaultStr);
	});
	
	
	//footbar模式切换
	$(".doSlide").click(function(){
		if($(this).attr("type")=="down"){
			$(".footBar").animate({"bottom":-37},200,function(){
				$(".footBarSmall").animate({"bottom":0},200)
			});	
		}else{
			$(".footBarSmall").animate({"bottom":-37},200,function(){
				$(".footBar").animate({"bottom":0},200)
			});	
		}
	});
	
	/*计算器展开*/
	$(".doDmBox").click(function(){
		if(!$(this).parents(".calculator").hasClass("open")){
			$(this).parents(".calculator").addClass("open");
			$(this).html("收起");
		}else{
			$(this).parents(".calculator").removeClass("open");
			$(this).html("展开");
		}
	});
	
	/*dateNotice*/
	$(".dateNotice").each(function(){
		var popDateTips = $(".dateConBox.day .popDateTips")
		$(this).click(function(){
			if(popDateTips.is(":hidden")){
				//计算位置
				var t = $(this).offset().top - $(this).parents(".datePop").offset().top - 95 - popDateTips.height();
				var l = $(this).offset().left - $(this).parents(".datePop").offset().left - popDateTips.width();
				popDateTips.css({"top":t,"left":l}).show();	
			}else{
				popDateTips.hide();	
			}
		});	
	})
	
	$(".rolNotice").each(function(){
		var popDateTips = $(".dateConBox.weeky .popDateTips")
		$(this).click(function(){
			if(popDateTips.is(":hidden")){
				//计算位置
				var t = $(this).offset().top - $(this).parents(".datePop").offset().top - 95 - popDateTips.height();
				var l = $(this).offset().left - $(this).parents(".datePop").offset().left - popDateTips.width();
				popDateTips.css({"top":t,"left":l}).show();	
			}else{
				popDateTips.hide();	
			}
		});	
	})
	
	$(".dateListClass tbody td").each(function(){
		$(this).hover(function(){
			$(this).addClass("on");
		},function(){
			$(this).removeClass("on");
		});
	});
	
	
	$(".dateB li").each(function(){
		var popDateTips = $(".dateConBox.week .popDateTips")
		$(this).click(function(){
			if(popDateTips.is(":hidden")){
				//计算位置
				var t = $(this).offset().top - $(this).parents(".datePop").offset().top - 95 - popDateTips.height();
				var l = $(this).offset().left - $(this).parents(".datePop").offset().left - popDateTips.width();
				popDateTips.css({"top":t,"left":l}).show();	
			}else{
				popDateTips.hide();	
			}
		});	
	});
	
	$(".popDateEditClose").click(function(){
		$(".popDateEdit").hide();
	});
	
	
	
	/**/
	$(".configBox,.cbRightR li,.favUl li").hover(function(){
		$(this).addClass("selected");
		},function(){
		$(this).removeClass("selected");
	});
	$(".tLi").click(function(){
		var ff = $(this).parents(".popDiv").find(".favRight");
		if(ff.is(":hidden")){
			ff.show();
			initFavList();
		}else{
			ff.hide();
		}
	});
	
	$(window).resize(function(){
		initLayout();	
	});
	
});


function showDate(id){
	$(".dateConRight .dateConBox").hide();
	$(".dateConBox."+id).show();
}

function textFocus(dom_,str_){
	$(dom_).each(function(){
		if($(this).is(":input")){
			$(this).focus(function(){
				if($(this).val()==str_){
					$(this).val("").addClass("focus");
				}
			});	
			$(this).blur(function(){
				if($(this).val()==""){
					$(this).val(str_).removeClass("focus");
				}
			});	
		}else{
			$(this).focus(function(){
				if($(this).html()==str_){
					$(this).html("").addClass("focus");
				}
			});	
			$(this).blur(function(){
				if($(this).html()==""){
					$(this).html(str_).removeClass("focus");
				}
			});		
		}
	});
}


function initFavList(){
	$(".favList").height($(".favFolder").height()-20);
	$(".noteBookRight").height($(".noteBook").height()-40);
	
}

function initLayout(){
	if($("#popBg").size()>0){
		$("#popBg").css({
			height:	$(document).height(),
			width:	$(document).width()
		})
	}
}


function closeWin(content_){
	$(content_).hide();
	$("#popBg").hide();
}


function openWin(id_,title_,content_){
	
	if(!$(content_).is(":hidden")){
		closeWin(content_);
		return;
	}
	
	//只允许同时存在一个弹窗
	if($(".popDiv:hidden").size()<$(".popDiv").size()){
		closeWin(".popDiv");
	}
	
	
	if($("#popBg").size()==0){
		$("body").append('<div id="popBg"></div>');
	}
	$("#popBg").css({
		height:	$(document).height(),
		width:	$(document).width()
	}).show()
	
	$(content_).show();
}