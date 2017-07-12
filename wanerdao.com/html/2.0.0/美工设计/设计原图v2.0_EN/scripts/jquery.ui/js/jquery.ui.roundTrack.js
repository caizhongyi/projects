;(function($) {

   $.ui.roundTrack = function(selector,options) {
       var _options = {
            r				: 	{ x : 500 , y : 100},				 //半径
			angles			:	[] ,
			angleOffset		:	5,
			duration		:   'normal',
			position		:	{ x : 0 , y : 0 },                  //左上角的位置
			widget 			:	{
				trackObj	:   'li'
			}
        }
		this.extend(selector ,  _options , options );
        return this;
    }
	
	$.ui.roundTrack.extend({
		init : function(){
		   var _this = this;
		   this.$.css({'position' : 'relative'});
		   this.clientPosition = { x : this.options.position.x + this.options.r.x , y : this.options.position.y + this.options.r.y}; //相对于父级层的位置
 		   this._size = { width : this.$trackObj.outerWidth() , height : this.$trackObj.outerHeight()}
		   /* 设置初始的间距 */
           if(!this.options.angles.length) 
		   {
			   this.options.angles = [];
			   var len = this.$trackObj.length;
			   for(var i = 0 ; i< len ; i++)
			   {
				   var a = i==0 ? 1  : 360/(len) * i ;
				   this.options.angles.push(a);
			   }
			 
		   }

		   this.$trackObj.each(function(i , n){
				 _this.step($(n) , _this.options.angles[i] , _this.zIndex(_this.options.angles[i]) , _this.size(_this.options.angles[i]));
				 //_this.sizes.push({ width : $(n).width() , height:$(n).height()  });
				 $(n).hover(function(){_this.stop();},function(){_this.start();})
				 $(n).click(function(){
			 		 // $(this).animate({ width : function(){$(this.width)}, height : ''});
			     })
		   })
		   
		   this.start();
		   return this;
		   
		},
		duration  : function(duration)
		{
			switch(duration)
			{
				case 'fast' 	:  return 100; 
				case 'slow' 	:  return 700;
				case 'normal'	:  return 500;
				default : return duration;
			}
		},
		//获取当前角度的大小
		size 	   : function(angle)
		{
			 var zoom = Math.sin(angle*Math.PI/180) * 0.5  + 1;
			 var s = { width : this._size.width * zoom , height : this._size.height * zoom}
             return s;
		},
		//当前侦
		step     : function($obj , angle , zIndex , size )
		{
			var _this = this;
			if(angle >= 360 )
			{
				angle = angle - 360 ; 
			}
			$obj.css({ 'left' : function(){ return _this.clientPosition.x + _this.options.r.x *Math.cos(angle*Math.PI/180);} , 'top' : function(){ return  _this.clientPosition.y + _this.options.r.y *Math.sin(angle*Math.PI/180);} ,'z-index' : zIndex ,width : size.width , height : size.height});
			return this;
			
		},
		//获取当前角度的zIndex
		zIndex   : function(angle)
		{
			var zIndex = Math.sin(angle*Math.PI/180) ;
			var powexpt = this.$trackObj.length.toString().length;
			var powval =  Math.pow(10,powexpt);
			zIndex = parseInt(zIndex * powval) + powval ;
		    return zIndex;
		},
		stop	   : function()
		{
			clearInterval(this.timer);
			this.timer = null ;
			return this;
		},
		start      : function()
		{
			 var _this = this;
			 this.track(this.$trackObj.css({'position' : 'absolute'}), this.options.r , this.options.angles ,this.options.angleOffset , this.clientPosition );
			 if(!this.timer)
				 this.timer = setInterval(function(){_this.track()}, this.duration(this.options.duration));
			 return this;
		},
		//设置轨迹
		track : function(){
			var _this = this;
			this.$trackObj.each(function(i , n){
				_this.options.angles[i] += _this.options.angleOffset ;
				_this.step($(n) , _this.options.angles[i] , _this.zIndex(_this.options.angles[i]) , _this.size(_this.options.angles[i]) );
			})
			return this;
		}
	}).extend($.ui.object.prototype);
	
	
	$.ui.roundTracks = function(selector , options){
		var array = [];
		$(selector).each(function(i , n){
			array.push(new $.ui.roundTrack(n , options));
		})
		return array;
	}
})(jQuery); 