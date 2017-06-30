/* JS Document 
Usefor:		ͼƬ�õ�ƬЧ��-���뵭��
Version:	1.0
Date:		2011/12/26
Author:		Youyin Li
Update:		2012/2/7
*/
(function($){
$.fn.alFadeslider = function(setting){
	//��������
	defaults = {
		box:'#alFade',			//����DIV
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
		var $box = $(setting.box);
		var $pic = $(setting.box + ' ' + setting.pic);
		var $title = $(setting.box + ' ' + setting.title);
		var $picLi = $(setting.box + ' ' + setting.pic + '> li');
		var $titleLi = $(setting.box + ' ' + setting.title + '> li');
		var length = ($picLi.length > $titleLi.length) ? $titleLi.length : $picLi.length;
		var current = setting.on || 'alFade-on';
		var time = '';
		//��������
		var ani = function(x){
			$picLi.stop(true,true).eq(x).fadeIn(800).siblings().fadeOut(800);
			$titleLi.eq(x).addClass(current).siblings().removeClass(current);
			setting.flag = x+1;
			if(setting.flag == length){ setting.flag = 0; }
		}
		//�����
		$titleLi.each(function(i,j){
			$(j).bind(setting.mouseType,function(){
				ani(i);
			});
		});	
		//����
		var play = function(){
			ani(setting.flag);
			if(!setting.isAuto){
				clearTimeout(time);
				return false;
			}
			time = setTimeout(play,setting.timeScroll);
		}
		play();
		//�����ͣ
		$box.hover(function(){
			clearTimeout(time);
		},function(){
			//����ƿ�������ִ�ж���
			/*if(setting.isAuto){
				setTimeout(play,setting.timeScroll);
			}else{
				//to do here
			}*/
			setTimeout(play,1000);
		});
	});
};
})(jQuery);