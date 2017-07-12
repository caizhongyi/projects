
;(function($) {
    /**
     * @author caizhongyi
     * @version 1.0
     * @description 手风琴
     * @requires  jquery.1.7.2
     * @class  accordion
     * @param {string} selector 选择器
     * @param {number} [options.index = 0] 当前索引
     * @param {boolean} [options.collapsible = 0] 是否可全部申缩
     * @param {event} [options.index = 'click'] 事件，click
     * @param {string} [options.duration = 'slow'] 动画速度
     * @param {string} [options.duration = 'easeOutExpo'] 动画效果，easing
     * @param {object} [options.widget = { 'header' : 'h3' , panel : 'div' }] 选择器
     * @param {string} [options.cssSelected = 'selected'] 动画效果，easing选种的样式
     * @example new $.ui.accordion('.accordion');
     * html : <div class="accordion">
             <h3>header</h3>
             <div>
             <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
             </div>
             <h3>header</h3>
             <div><br/><br/><br/></div>
             <h3>header</h3>
             <div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>
             </div>
     * */

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