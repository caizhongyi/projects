/* JS Document 
Usefor:		���ض���Ч��
Version:	1.0
Date:		2011/12/06
Author:		Youyin Li
Update:		
*/
$(function(){
	//��ʾ������
	var $alBackText = "���ض���";	
	var $alBackBox = $('<div class="backToTop"></div>').appendTo($("body"))
		//title�������óɸ�����
		.text($alBackText).attr("title", $alBackText).click(function() {
			$("html, body").animate({ scrollTop: 0 }, 120);
	});
	var $alBackFunc = function() {
		//��ȡ�������߶Ⱥ���������
		var st = $(document).scrollTop(), winh = $(window).height();
		(st > 0)? $alBackBox.show(): $alBackBox.hide();	
		//IE6�µĶ�λ
		if (!window.XMLHttpRequest) {
			$alBackBox.css("top", st + winh - 166);	
		}
	};
	//Ϊ�����¼��󶨺���
	$(window).bind("scroll", $alBackFunc);
	$alBackFunc();
});