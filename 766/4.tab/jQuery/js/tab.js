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
			menu : '.tab_menu',	//��ǩ�˵�
			cmenu:	'tab_menu',	//��ǩ�˵�����
			menuList : 'li',	//�˵���Ԫ��
			current : 'select',//��ѡ�еı�ǩ�˵������ʽ��
			con : '.tab_main',	//���л���������
			ccon: 'tab_main',	//���л�����������
			//timer : '3000',	//�Զ��ֲ����
			//isAuto : false	//�Ƿ��Զ��ֲ���Ĭ�Ϲر�
			blank : 'http://img.olcdn.com/common/blank.gif', //Ĭ�Ͽհ�ͼƬ��ַ
			mouseType : 'click' //Ĭ�������Ʊ�ǩ��ʽ��'click'��'mouseover'
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(k){
			var $box = $(this);
			var $menu = $box.find(setting.menu).eq(0);
			var $con = $box.find(setting.con);
			var $li = $menu.find(setting.menuList);
			
			$li.removeClass(setting.current).eq(0).addClass(setting.current);
			$con.eq(0).show().siblings(setting.ccon).hide();
			$li.each(function(i,j){
				$(j).bind(setting.mouseType,function(){
					$li.eq(i).addClass(setting.current).siblings(setting.menuList).removeClass(setting.current);
					$con.eq(i).show().siblings(setting.ccon).hide();
					$con.eq(i).find("img").lazyLoadImg({blank:setting.blank});
				});
			});
			//�Զ��ֲ�����add code here
		});
	}
})(jQuery);