
;(function($) {
	$.ui.tag = function(selector,options)
	{
		var _options = {
			maxCount  	  	:  10,
			itemHTML 	  	: '<li title="{val}"><a href="javascript:;">{val}</a><a href="javascript:;" class="tags_del tag-remove"></a></li>', 
			widget  	  	: {
				panel 	 	: '.tag-panel',    //标签容器
				labels	 	: '.tag-labels',	//现在可选择标签
				remove	 	: '.tag-remove',	//移除的标签button
				add		 	: '.tag-add',		//加标签button
				selected 	: '.tag-selected',
				count	 	: '.tag-count',
				maxCount 	: '.tag-maxcount',
				input	 	: '.tag-input',		//输入标签框
				mutilInput 	: '.tag-mutilinput'
			}
		}
	   	this.extend(selector , _options  , options);
        return this;
	}
	$.ui.tag.extend({
	   init : function()
	   {
		   var _this = this;
		   //标签 为 panel 的 title 值
		   this.$title = $('<span/>').text(this.$panel.attr('title')).appendTo(this.$panel);
		   //标签添加容器
		   this.$panel.css({'position' : 'relative' , overflow : 'hidden'});
		   if(this.$panel.children('ul').length == 0){
		   	 this.$panel = $('<ul/>').appendTo(this.$panel);
		   }
		   else{
		   	 this.$panel = this.$panel.children('ul');
		   }
		   if(!this.isEmpty()){
		   	  this.$title.hide();
		   }
			
		   this.$maxCount.text ( this.options.maxCount );
		   this.$count.text (this.$panel.children().length);
		   /* 事件上绑定 */
		 
		   this.$add.unbind('click.tag').bind('click.tag',function(){
			 	if(_this.$input.length > 0)_this.add(null , _this.$input.val())
				if(_this.$mutilInput.length > 0){
					var tags = _this.$mutilInput.val().split(' ');
					for(var i = 0 ; i < tags.length ; i ++){
						_this.add(null , tags[i])
					}
				}
		   })  
		   this.$labels.undelegate('click.tag').delegate('li','click.tag',function(e){
			 	_this.add($(this).attr('title') , $(this).text());
		   })
		   this.$.undelegate('click.tag').delegate(this.options.widget.remove,'click.tag',function(){
			    var $li = $(this).closest('li');
		     	_this.remove($li);
		   });
		   return this;
	   },
	   //标签是否为空
	   isEmpty : function(){
	   	  return this.$panel.children().length > 0 ? false : true;
	   },
	   //是否存在该标签
	   has	 : function(title){
		    var has = false;
	   		this.$panel.children().each(function(i,n){
				if($.trim($(n).attr('title')) == $.trim(title)){
					has = true;
					return ;
				}
			})
			return has;
	   },
	   defaultView : function(){
	   	  if(this.isEmpty()){
		   	  this.$title.stop(true,true).fadeIn();
		  }
		  else{
		  	  this.$title.stop(true,true).hide();
		  }
		  return this;
	   },
	   //加标签
	   add   : function(title , value){
		  var val , $obj;
		  if($.type(title) == 'object'){
		  	 val  = $obj.attr('title');
			 $obj = title;
		  }
		  else if(!title){
		  	val = title = value;
			$obj = this.options.itemHTML.replace('{title}' , title).replace('{val}' , value);
		  }
		  else{
		  	$obj = this.options.itemHTML.replace('{title}' , title).replace('{val}' , value);
			val = title;
		  }

		  var count = this.$panel.children().length;
	   	  if(count < this.options.maxCount && !this.has(val) && val != ''){
			  $($obj).appendTo(this.$panel).hide().stop(true,true).fadeIn(); 
			  this.$count.text(++count);
		  }
		  this.defaultView();
		  return this;
	   },
	   remove : function(title){
	   	    var _this = this;
		    var val = $.type(title) == 'object' ? title.attr('title') : title; 
			
	   		this.$panel.children().each(function(i,n){
				if($.trim($(n).attr('title')) == $.trim(val)){
					$(n).css('position','relative').stop(true,true).animate({ left : '500', opacity : 'hide'},function(){
						$(this).remove();
						_this.$count.text(_this.$panel.children().length);
						if(_this.isEmpty()){
						   _this.$title.stop(true,true).fadeIn();
					    }
						else{
						  _this.$title.stop(true,true).fadeOut();
						}
						_this.defaultView();
					});
					return this;
				}
			})
		  return this;
	   },
	   destory : function(){
	   	  return this;
	   }
	}).extend($.ui.object.prototype);
	
	$.ui.tags = function(selector , options){
		var array = [];
		$(selector).each(function(i , n){
			array.push(new $.ui.tag(n , options));
		})
		return array;
	}
})(jQuery);﻿