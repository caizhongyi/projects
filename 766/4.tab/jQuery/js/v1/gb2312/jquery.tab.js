/* JS Document 
Version:	1.0
Date:		2012/02/08
Author:		Youyin Li
Update:
*/
;(function($){
	//ͼƬ�л�����
	$.fn.lazyLoadImg = function(setting){
		var defaults = {
			lazySrc:'imgsrc',	//���ʵ��ͼƬ�ĵ�ַ���÷���<img src="�հ�СͼƬ�ĵ�ַ" imgsrc="ʵ��ͼƬ��ַ" />
			blank:'http://img.ue.766.com/common/blank.gif'	//͸��СͼƬ��Ĭ�ϵ�ַ
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(i){
			if(!$(this).attr(setting.lazySrc)){
				return;
			}
			if($(this).attr("src")=='' || $(this).attr("src")==setting.blank){
				$(this).attr("src",$(this).attr(setting.lazySrc));
			}
		});
	}
	$.fn.tab = function(setting){
		var defaults = {
			box : '#tab',		//������
			menu : '.tab_menu',	//��ǩ�˵�
			menuList : 'li',	//�˵���Ԫ��
			current : 'select',//��ѡ�еı�ǩ�˵������ʽ��
			con : '.tab_main',	//���л���������
			//timer : '3000',	//�Զ��ֲ����
			//isAuto : false	//�Ƿ��Զ��ֲ���Ĭ�Ϲر�
			blank : 'http://img.ue.766.com/common/blank.gif', //Ĭ�Ͽհ�ͼƬ��ַ
			mouseType : 'click' //Ĭ�������Ʊ�ǩ��ʽ��'click'��'mouseover'
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(k){
			var $box = $(setting.box);
			var $menu = $(setting.box + ' > ' + setting.menu);
			var $con = $(setting.box + ' > ' + setting.con);
			var $li = $(setting.box + ' > ' + setting.menu + ' > ' + setting.menuList);
			$box.find("img").each(function(i,j){
				if($(j).attr("src")==""){
					$(j).attr("src",setting.blank);
				}
			});
			$li.removeClass(setting.current).eq(0).addClass(setting.current);
			$con.hide().eq(0).show();
			$li.each(function(i,j){
				$(j).bind(setting.mouseType,function(){
					$li.removeClass(setting.current).eq(i).addClass(setting.current);
					$con.hide().eq(i).show();
					$con.eq(i).find("img").lazyLoadImg();
				});
			});
			//�Զ��ֲ�����add code here
		});
	}
})(jQuery);