// JavaScript Document
$(document).ready(function(){
	//列表hover
	$(".imporInfo tr").hover(function(){
		$(this).addClass("hover")
			.find(".actView").children().css("visibility","visible");
	},function(){
		$(this).removeClass("hover")
			.find(".actView").children().css("visibility","hidden");
	});
	$(".search_result li").bind("mouseenter mouseleave",function(){
		$(this).toggleClass("active")
			.children(".flBtnDiv").toggle();
	})
	//搜索框
	$(".prInpSty").focus(function(){
		if($(this).val()=="请输入关键字"){
			$(this).val("");
		}
	})
	$(".prInpSty").blur(function(){
		if($(this).val()==""){
			$(this).val("请输入关键字");
		}
	})
	//全反选checkbox
	$(".pr_Tag .T_ckBox").click(function(){
		$(".search_result input[type='checkbox']").each(function(){
			if(this.checked==false){
				this.checked=true;
			}
			else{
				this.checked=false;
			}
		})
	})
	/*
	* 相册编辑hover
	*/
	$(".alb_edit li").bind("mouseenter mouseleave",function(){
		$(this).toggleClass("hover")
			.find(".hr_wp").toggle();
	})
	/*
	* 相册展示hover
	*/
	$(".preview_pic li").bind("mouseenter mouseleave",function(){
		$(this).find(".bm_info").toggle();
	})
	/*
	* 左侧相册上下滚动
	*/
	$(".scrTop_pic li").bind("mouseenter mouseleave",function(){
		$(this).find(".per_hr_ico").toggle();
	})
	var arrTop=$(".scroll_pic_wp").find(".arr_top");
	var arrBm=$(".scroll_pic_wp").find(".arr_bm");
	var _list=$(".scrTop");
	var _li=_list.children();
	var _plas=_li.size()-4;
	arrTop.click(function(){
		if(!_list.is(":animated")){
			if(!parseInt(_list.css("top"))=="0"){
				_list.animate({top:"+=205"})
			}
		}
	})
	arrBm.click(function(){
		if(!_list.is(":animated")){
			if(-parseInt(_list.css("top"))==_plas*205){
				return false;
			}
			else{
				_list.animate({top:"-=205"});
			}
		}
	})
	/*
	* 照片编辑列表
	*/
	$(".pe_list li").bind("mouseenter mouseleave",function(){
		$(this).toggleClass("hover")
			.find(".hover_box").toggle();
	})
	$(".pu_photo_wp li").bind("mouseenter mouseleave",function(){
		$(this).find(".delete").toggle();
	})
	/*
	* 相册预览留言
	*/
	$(".reply_content:gt(2)").hide();
	$("#closed").hide();
	$("#closed").click(function(){
		$(".reply_content:gt(2)").hide();
		$(this).hide()
			.prev().show();
	})
	$("#more_reply").click(function(){
		$(".reply_content:gt(2)").show();
		$(this).hide()
			.next().show();
	})
/*
	* 用户、圈子、活动、帖子列表
	*/
	$(".listM_ri .listM_li").each(function(){
		$(this).mouseout(
			function(){
				$(this).css("backgroundColor","#fff");
				$(this).find(".listbox_ri").hide();
			}	
		);

		$(this).mouseover(
			function(){
				$(this).css("backgroundColor","#f9f9f9");
				$(this).find(".listbox_ri").show();
			}	
		);
	});
	//blog_manages 左边列表
	$(".log_manage_le .listM_li").each(function(){
		$(this).mouseout(
			function(){
				$(this).css("backgroundColor","#fff");
				$(this).find(".listbox_ri").hide();
			}	
		);

		$(this).mouseover(
			function(){
				$(this).css("backgroundColor","#f7f7f7");
				$(this).find(".listbox_ri").show();
			}	
		);
	});
		//blog 左边列表

	
		$(".log_manage_Rlist .listM_li").each(function(){
		$(this).mouseout(
			function(){
				$(this).css("backgroundColor","#fff");
				$(this).find(".listbox_ri").hide();
			}	
		);

		$(this).mouseover(
			function(){
				$(this).css("backgroundColor","#f7f7f7");
				$(this).find(".listbox_ri").show();
			}	
		);
	});
		

		
		$(".market_ri dl").each(function(){
		$(this).mouseout(
			function(){
				$(this).css("backgroundColor","#fff");
				$(this).css("border","1px solid #DFDFDF");
			}	
		);

		$(this).mouseover(
			function(){
				$(this).css("backgroundColor","#eef7fe");
				$(this).css("border","1px solid #60b1d3");
			}	
		);
	});
		

		$(".popup_second .listM_li").each(function(){
		$(this).mouseout(
			function(){
				$(this).css("backgroundColor","#fff");
			}	
		);

		$(this).mouseover(
			function(){
				$(this).css("backgroundColor","#f7f7f7");
			}	
		);
	});
		
	
		
	
	
	$(".inp_modify").each(function(){
		$(this).click(function(){
			obj = $(this).parent().parent().parent().find(".hobby_listB");
			if(obj.css('display')=='none'){
				obj.show();	
			}else{
				obj.hide();	
			}
		});  
	});
	
		$(".cli_pl").each(function(){
		$(this).click(function(){
			obj = $(this).parent().parent().parent().find(".log_view_box");
			if(obj.css('display')=='none'){
				obj.show();	
			}else{
				obj.hide();	
			}
		});  
	});
		
		$(".cli_on").each(function(){
		$(this).click(function(){
			obj = $(this).parent().parent().find(".log_view_box");
			if(obj.css('display')=='none'){
				obj.show();	
			}else{
				obj.hide();	
			}
		});  
	});
		
		$(".cli_hf").each(function(){
		$(this).click(function(){
			obj = $(this).parent().parent().find(".log_view_tabC");
			if(obj.css('display')=='none'){
				obj.show();	
			}else{
				obj.hide();	
			}
		});  
	});

	//blog、blog_view 展开评论
		$(".gxbox").each(function(){
		$(this).click(function(){
			obj = $(this).parent().parent().parent().find(".log_view_box");
			if(obj.css('display')=='none'){
				obj.show();	
			}else{
				obj.hide();	
			}
		});  
	});
	
	//blog、blog_view 收起评论
	$(".log_viewbg09").each(function(){
		$(this).click(function(){									 
			obj = $(this).parent().parent().parent();							 
			//alert(obj.html());
			obj.hide();
		});
	});
	
		//blog_post 收起共享
	$(".shgx").each(function(){
		$(this).click(function(){									 
			obj = $(this).parent().parent();							 
			obj.hide();
		});
	});
	
		//收起评论
	$(".log_viewbg09").each(function(){
		$(this).click(function(){									 
			obj = $(this).parent().parent().parent();							 
			//alert(obj.html());
			obj.hide();
		});
	});
	
	//修改 取消事件
	$(".cancel_modify").each(function(){
		$(this).click(function(){
			hide_modify($(this));
		});
	})
	
	//修改层，obj是 取消按钮的同一层级的对象
	function hide_modify(obj){
		$(obj).parent().parent().parent().parent().hide();
	}
	//onMouseOver="this.style.backgroundColor='#f9f9f9'" onMouseOut="this.style.backgroundColor='#fff'"
})


	//blog_manages 左边列表
	$(".log_manage_le .listM_li").each(function(){
		$(this).mouseout(
			function(){
				$(this).css("backgroundColor","#fff");
				$(this).find(".listbox_ri").hide();
			}	
		);

		$(this).mouseover(
			function(){
				$(this).css("backgroundColor","#f7f7f7");
				$(this).find(".listbox_ri").show();
			}	
		);
	});

