/* JS Document 
User for:	js��Ч-�����˵�
Version:	1.0
Date:		2011/04/12
Author:		Youyin Li
Update:
*/
;(function($){
	$.fn.bigMenu = function(setting){
		var defaults = {
			container : '.popmenu_hole',	//������
			list : '.popmenu_list',			//��һ���˵�DIV
			box : '.popmenu_box',			//�����˵�DIV
			cur : 'ph_select'				//��ǰѡ�еĲ˵�class��
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(){
			var time = time_class = '';
			var $li = $(setting.list+" > li");
			var $box = $(setting.box);
			var $ul = $(setting.box+" > ul");
			//���������˵�
			$li.each(function(i,j){
				$(j).hover(function(){
					clearTimeout(time);
					clearTimeout(time_class);
					$li.removeClass(setting.cur);
					$(j).addClass(setting.cur);
					$box.slideDown("normal");
				},function(){
					time = setTimeout(function(){$box.stop(true,true).slideUp("normal"); },100);
					time_class = setTimeout(function(){ $li.removeClass(setting.cur); },100);
				});
			});
			//����ڵ����˵��ϵ��¼�
			$box.hover(function(){
				clearTimeout(time);
				clearTimeout(time_class);
			},function(){
				time = setTimeout(function(){$box.stop(true,true).slideUp("normal"); },100);
				$li.removeClass(setting.cur);
			});
			//����ƶ����Ӳ˵�����Ӧ���˵������ࣻע�͸öδ����ȡ����Ч��
			$ul.each(function(i,j){
				$(j).mouseover(function(){
					$li.removeClass(setting.cur);
					$li.eq(i).addClass(setting.cur);
				});
			});
		});
	}	
})(jQuery);