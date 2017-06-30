$(document).ready(function(){
	//初始化：是否开启DIV弹出窗口功能
	//0 表示开启; 1 表示不开启;
	var popupStatus = 0;
	//使用Jquery加载弹窗 
	function loadPopup(){   
	//仅在开启标志popupStatus为0的情况下加载  
	if(popupStatus==0){   
		$("#backgroundPopup").css({   
			"opacity": "0.7"  
		});   
		$("#backgroundPopup").fadeIn("slow");   
		$("#popupContact").fadeIn("slow");   
		popupStatus = 1;   
		}   
	}  
	//使用Jquery去除弹窗效果 
	function disablePopup(){   
	//仅在开启标志popupStatus为1的情况下去除
		if(popupStatus==1){   
				$("#backgroundPopup").fadeOut("slow");   
				$("#popupContact").fadeOut("slow");   
				popupStatus = 0;   
			}   
	} 
	//将弹出窗口定位在屏幕的中央
	function centerPopup(){   
	//获取系统变量
		var windowWidth = document.documentElement.clientWidth;   
		var windowHeight = document.documentElement.clientHeight;   
		var popupHeight = $("#popupContact").height();   
		var popupWidth = $("#popupContact").width();   
		//居中设置   
		$("#popupContact").css({   
			"top": windowHeight/2-popupHeight/2,   
			"left": windowWidth/2-popupWidth/2   
		});   
		//以下代码仅在IE6下有效
		  
		$("#backgroundPopup").css({   
			"height": $(document).height()   
		});   

		var	$backToTopEle = $('#popupContact'), 
			$backToTopFun = function() {
			var st = $(document).scrollTop();
			//IE6下的定位
			if (!window.XMLHttpRequest) {
				$backToTopEle.css("top", st + windowHeight/2-popupHeight/2);
			}
		};
		$(window).bind("scroll", $backToTopFun);

	}

	//浏览器窗口大小改变时 
	$(window).resize(function() { centerPopup()	});
	
	//打开弹出窗口   
	//按钮点击事件!
	$("#button").click(function(){   
		//调用函数居中窗口
		centerPopup();   
		//调用函数加载窗口
		loadPopup();   
	});
	//关闭弹出窗口   
	//点击"X"所触发的事件
	$("#popupContactClose").click(function(){   
			disablePopup();   
	});   
	//点击窗口以外背景所触发的关闭窗口事件!
	$("#backgroundPopup").click(function(){   
		disablePopup();   
	});   
	//键盘按下ESC时关闭窗口!
	$(document).keypress(function(e){   
		if(e.keyCode==27 && popupStatus==1){   
			disablePopup();   
		}   
	});  


});

