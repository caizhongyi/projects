/* JS Document 
Usefor:		ͼƬ�õ�ƬЧ��-���뵭��
Version:	1.0
Date:		2011/12/26
Author:		Youyin Li
Update:		2012/2/7
*/
;(function($){
$.fn.alFadeslider = function(setting){
	//��������
	defaults = {
		//box:'#alFade',			//����DIV
		pic:'.alFade-pic',		//ͼƬDIV
		title:'.alFade-flag',	//����DIV
		mouseType:'click',		//�����Ʒ�ʽ
		on:'alFade-on',			//ѡ�б�ǩ����
		flag:0,					//Ĭ�ϵ�һ����ʾ�����ݣ�һ�㲻���޸�
		isAuto:true,			//�Ƿ��Զ�����
		timeScroll:3000			//�ֲ�ʱ�� - ��
	};
	setting = $.extend({},defaults,setting);
	return this.each(function(){
		//������ʼ��
		var $box = $(this);
		var $pic = $box.children(setting.pic);
		var $title = $box.children(setting.title);
		var $picLi = $pic.children('li');
		var $titleLi = $title.children('li');
		var length = ($picLi.length > $titleLi.length) ? $titleLi.length : $picLi.length;
		var current = setting.on || 'alFade-on';
		var time = index = '';
		var flag = setting.flag;
		//��������
		var ani = function(x){
			$picLi.stop(true,true).eq(x).fadeIn(1000).siblings().fadeOut(1000);
			$titleLi.eq(x).addClass(current).siblings().removeClass(current);
		}
		//����¼���
		$titleLi.each(function(i,j){
			$(j).bind(setting.mouseType,function(){
				ani(i);
				flag = i;
			});
		});	
		//�Զ�����
		var play = function(){
			ani(flag);
			flag++;
			if(flag == length){ flag = 0; }
			time = setTimeout(function(){
				play();
			}, setting.timeScroll);
		}
		//�Ƿ�ִ���Զ�����
		if(setting.isAuto){
			play();
			//�����ͣ
			$box.hover(function(){
				clearTimeout(time);
			},function(){
				play();
			});
		}else{
			ani(setting.flag);
		}
	});
};
})(jQuery);