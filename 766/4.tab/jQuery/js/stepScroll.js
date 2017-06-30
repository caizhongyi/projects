/* JS Document 
Usefor:		ͼƬ�õ�ƬЧ��-�������ݹ���
Version:	1.0
Date:		2011/05/09
Author:		Youyin Li
Update:		
*/
;(function($){
	$.fn.stepScroll = function(setting){
		//��������
		var defaults = {
			aniTime:500,				//����ʱ�䣬��λ������
			autoPlay:true,				//�Ƿ��Զ��ֲ�
			btn_left:'.rightscroll',	//�������ť
			btn_right:'.leftscroll',	//�ҹ�����ť
			//easingType:'easeOutExpo',	//����Ч��,�Ƽ�easeInOutExpo,easeOutBounce,easeInOutBack
			scrollTime:3000				//�ֲ�ʱ�䣬��λ������
		}
		setting = $.extend({},defaults,setting);
		//����������ʵ��X���ֲ������Ϊ��λ������
		return this.each(function(k){
			//��ʼ��
			var $scroll = $(this);
			var flag = 'close';
			var $ul = $(this).find('ul').eq(0);
			var $liFirst = $(this).find('li').eq(0);
			//�������
			$step = $liFirst.outerWidth(true);		//outerWidth(),�Ӳ���true��ʱ��Ż����߾����ڡ�Ĭ�ϲ���Ϊfalse,Ĭ�ϰ������׺ͱ߿�
			$margin = $ul.find('li:last').outerWidth(true);
			$ul.css('margin-left','-'+$margin+'px');	//���������һ��li�Ŀ�ȣ��ù�������
			$ul.find('li:last').prependTo('.container ul:first');	//�����һ��li�ӵ�ǰ������ʹ����������ȷ�ӵ�һ����ʼ
			//X�����ֲ�
			xScroll = function(){
				$ul.stop().animate(
					{left:"-"+$step+"px"},setting.aniTime,function(){
						$(this).css({left:"0px"}).find('li:first').appendTo(this);
					}
				);
			}
			//X�����ֲ�
			xRScroll = function(){
				$ul.stop().animate(
					//{left:$step+"px"},setting.aniTime,setting.easingType,function(){
					{left:$step+"px"},setting.aniTime,function(){
						$(this).css({left:'0px'}).find('li:last').prependTo(this);
					}
				);
			}
			var time;
			//�Զ��ֲ�
			autoScroll = function(){
				if(flag == 'open'){
					xScroll();
				}
				else{
					flag = 'open';
				}
				time = setTimeout(autoScroll,setting.scrollTime);
			}
			if(setting.autoPlay){
				//��껬��ֹͣ�ֲ��������ָ��ֲ�
				$scroll.hover(function(){
					clearTimeout(time);
				},function(){
					flag='close';
					autoScroll();
				});
				//ִ��һ���ֲ�����
				autoScroll();
			}
			//���
			$scroll.find(setting.btn_left).click(function(){
				xScroll();
				return false;
			});
			//�ҽ�
			$scroll.find(setting.btn_right).click(function(){
				xRScroll();
				return false;
			});
		});
	};
})(jQuery);