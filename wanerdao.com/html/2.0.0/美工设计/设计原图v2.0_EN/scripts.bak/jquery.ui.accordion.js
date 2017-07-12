
;(function($) {
	$.ui.accordion = function(selector,options){
		var _options={
			index   		:   0,
			tempIndex		: 	0,
			//maxCount		:	2,
			animate			:   true,   
			collapsible     : true  	,	  //鼠标移开对像后自动回缩
			event			:	"click",
			duration		:	"slow",
			easing			:	"easeOutExpo",
			cssSelected		:   'selected',
			minheight		:	0,
			maxheight		:   'auto',           // auto | int
			widget			: 	{
			    header 		: 	"h3",
				panel		:	"div"
			}
		}
	   	this.extend(selector , _options , options);
        return this;
	}
	$.ui.accordion.extend({
		init : function(){
		   var _this = this;

		   this.$panel.attr({
			 'data-maxheight' : function(){ return $(this).outerHeight()},
			 'data-minheight' : this.minheight()
		   })

		   if(this.minheight() == 0){
			   this.$panel.hide();
		   }
		   else{
		   	   this.$panel.css({overflow : 'hidden' , height : this.minheight() })
		   }

		   // 事件绑定
		
		   this.$.undelegate(this.options.event + '.accordion').delegate(this.options.widget.header, this.options.event + '.accordion' , function(){
               _this.goto(_this.$header.index(this));
		   })
		 
		   //默认值
		   
		   this.show(this.index());
		   return this;
	   },
	   minheight : function(index){
		   return this.minheight == 'auto' ? this.$panel.eq(index).attr('data-minheight') : this.options.minheight;
	   },
	   maxheight : function(index){
		   return this.maxheight == 'auto' ? this.$panel.eq(index).attr('data-maxheight') : this.options.maxheight;
	   },
	   updatePanel : function(){
			$obj.css({ 'height' : 'auto' }).attr({'data-maxheight' :$obj.outerHeight()});
			return this;
	   },
        length : function(){
            return this.$panel.length;
        },
	   show    : function(index , callback){
		   var _this = this;
		   this.index(index);
		   var $obj = this.$panel.eq(this.index())

		   this.$header.eq(this.index()).addClass(this.options.cssSelected);
           if($obj.is(':hidden') && this.options.collapsible){
               if(this.options.animate){
                   this.animate($obj , { height : 'show' , opacity : 1 }, function(){})
               }
               else{
                   $obj.show();
               }

           }
           else{
               this.hide(this.index());
           }

		   return this;
	   },
	   hide    : function(index , callback){
		   var _this = this;
		   var $obj = this.$panel.eq(index);
		   var opacity = this.minheight() == 0 ? 'hide' : 1 ;
		   this.$header.eq(index).removeClass(this.options.cssSelected);
		   if(this.options.animate){
			   this.animate($obj , { height : 'hide' , opacity : opacity } , function(){});
		   }
		   else{
		   	   $obj.hide();
		   }
		   return this;
	   },
	   toggle : function(){
	   	
	   }
	}).extend($.ui.switchObject.prototype);

})(jQuery);