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
            index   : 1,
			btn_left:'.rightscroll',	//�������ť
			btn_right:'.leftscroll'		//�ҹ�����ť
		}
		setting = $.extend({},defaults,setting);
		//����������ʵ��X���ֲ������Ϊ��λ������
		return this.each(function(k){
			//��ʼ��
			var $scroll = $(this);
			var flag = 0;
			var $ul = $(this).find('ul').eq(0);
			var length = $ul.find('li').length;
			var $liFirst = $(this).find('li').eq(0);
			var $left = $(setting.btn_left);
			var $right = $(setting.btn_right);
			var $all = $(setting.btn_left+","+setting.btn_right);
			//�������
			$step = $liFirst.outerWidth(true);		//outerWidth(),�Ӳ���true��ʱ��Ż����߾����ڡ�Ĭ�ϲ���Ϊfalse,Ĭ�ϰ������׺ͱ߿�
			$margin = $ul.find('li:last').outerWidth(true);
			$ul.css("width",length*$step+"px");
			//$ul.css('margin-left','-'+$margin+'px');	//���������һ��li�Ŀ�ȣ��ù�������
			//$ul.find('li:last').prependTo('.container ul:first');	//�����һ��li�ӵ�ǰ������ʹ����������ȷ�ӵ�һ����ʼ
			//X�����ֲ�

            flag = setting.index;
            $ul.stop().animate({left:"-"+$step*flag+"px"},setting.aniTime,function(){
                if(flag!=(length-1)){$left.removeClass("scrollStop");}
                if(flag!=0){$right.removeClass("scrollStop");}
            });

            xScroll = function(){
				if(flag==(length-1)){
					return;			
				} else {
					flag++;
					$all.removeClass("scrollStop")
					$ul.stop().animate({left:"-"+$step*flag+"px"},setting.aniTime,function(){
						if(flag==(length-1)){$left.addClass("scrollStop");}
					});				
				}
				//alert("L:"+flag);
			}
			//X�����ֲ�
			xRScroll = function(){
				if(flag==0){
					return;
				} else {
					flag--;
					$all.removeClass("scrollStop")
					$ul.stop().animate({left:"-"+$step*flag+"px"},setting.aniTime,function(){
						if(flag==0){$right.addClass("scrollStop");}
					});				
				}	
				//alert("R:"+flag);
			}
			//���
			$left.click(function(){
				xScroll();
				return false;
			});
			//�ҽ�
			$right.click(function(){
				xRScroll();
				return false;
			});
		});
	};
})(jQuery);