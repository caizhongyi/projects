/* JS Document 
Usefor:		返回顶部效果
Version:	1.0
Date:		2011/12/06
Author:		Youyin Li
Update:		
*/
$(function(){
	//显示的文字
	var $alBackText = "返回顶部";	
	var $alBackBox = $('<div class="backToTop"></div>').appendTo($("body"))
		//title属性设置成该文字
		.text($alBackText).attr("title", $alBackText).click(function() {
			$("html, body").animate({ scrollTop: 0 }, 120);
	});
	var $alBackFunc = function() {
		//获取滚动条高度和浏览器宽度
		var st = $(document).scrollTop(), winh = $(window).height();
		(st > 0)? $alBackBox.show(): $alBackBox.hide();	
		//IE6下的定位
		if (!window.XMLHttpRequest) {
			$alBackBox.css("top", st + winh - 166);	
		}
	};
	//为滚动事件绑定函数
	$(window).bind("scroll", $alBackFunc);
	$alBackFunc();
});