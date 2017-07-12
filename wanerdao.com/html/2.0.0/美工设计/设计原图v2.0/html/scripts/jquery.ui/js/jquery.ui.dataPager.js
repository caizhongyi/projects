;(function($) {   
    $.ui.dataPager = function(selector,options) {

        var _options = {
            halfcount	: 	3, // 显示的分页数 *2 +1 
            recordCount : 	0,
            pageSize	: 	1,
            pageIndex	: 	1,
			csscurrent	:	'current',
			cssnormal	:	'normal',
			cssbutton	:	'button',
			cssdisable	:	'disable',
			url			:	'',
			param		:	'',
			method		:	'get',
			callback	:   function(){},
			Objects		: 	{
				prev	: 	'.prev',
				next	:	'.next',
				first	:	'.first',
				last	:	'.last',
				pages	:   '.pages',
				pageIndex	: '.pageindex',
				totalPage 	: '.totalpage'
			}
		}
        this.extend(selector, _options , options );
		this.init.apply(this, arguments);
		return this;
    }
	$.ui.dataPager.extend({
		init 	: function(){
			var _this = this;
			
			this.registEvent('afterLoad');
			
			var attr = { 'href' : 'javascript:void(0)'};
			this.$first.unbind('click').click(function(){
				_this.first();
			})
			this.$prev.unbind('click').click(function(){
				_this.prev();
			})
			this.$next.unbind('click').click(function(){
				_this.next();
			})
			this.$last.unbind('click').click(function(){
				_this.last();
			})
			this.create(null);
		},
		/*
			@range  		[function]	返回第一页和最后一页
			@pageIndex	[int]		当前页
			@count			[int]		总显示的页码数 /2 -1
			@pageCount		[int]		显示的页数
			@return 		[object]	{first : [int : 第一页] , last : [int : 最后一页]}
		*/
		range	: function(pageIndex , count ,pageCount){
				count = parseInt(count);
				pageIndex = parseInt(pageIndex);
				var resoult = { first : (pageIndex - count) ,last : (pageIndex + count) > pageCount  ?  pageCount :  (pageIndex + count)}; 
				
				if( pageCount > count * 2 + 1)
				{
					if( pageIndex - count <= 0 )
					{ 
						resoult.last = resoult.last - (pageIndex - count) + 1;
						resoult.first = 1;
					}
					else if( pageIndex + count >= pageCount )
					{
						resoult.first -= (pageIndex + count - pageCount);
					}
				}
				else
				{
					resoult.first = 1;
					resoult.last = pageCount;
				}

				return resoult; 
		},
		/*
			@render		[function]  	渲染
			@range 		[object]		{first : [int : 第一页] , last : [int : 最后一页]}	
		*/
		render	:	function(range){
			var _this = this;

			this.$pages.empty();
			
			if(range.first != 1){
				this.$pages.append(
					$('<a href="javascript:;" data-index="'+ 1 +'">'+ 1 +'</a>')
					.unbind('click.datapage')
					.bind('click.datapager',function(){
						_this.first();
					})
				).append('<span>...</span>');
			}
			
			for(var i = range.first ; i <= range.last ; i ++ )
			{	
				if( i == this.pageIndex){
					var a = '<span href="javascript:;" data-index="'+ i +'">'+ i +'</span>';
					
					var $number = $(a);
					$number.addClass(this.csscurrent);
				}
				else{
					var a = '<a href="javascript:;" data-index="'+ i +'">'+ i +'</a>';
					var $number = $(a).unbind('click.datapager').bind('click.datapager',function(){
						 _this.goto($(this).attr('data-index'));
					})
					$number.addClass(this.cssnormal);
				}
				
				this.$pages.append($number);
			}
			
			if(range.last !=  this.pageCount() ){
				this.$pages.append('<span>...</span>').append(
					$('<a href="javascript:;" data-index="'+ this.pageCount() +'">'+ this.pageCount() +'</a>')
					.unbind('click.datapage')
					.bind('click.datapager',function(){
						_this.last();
					})
				);
			}
			return this;
		},
			
		create	: function(callback){
			this.load(this.url,this.param,this.method, callback);
			return this;
		},

		pageCount : function()
		{
			var count = parseInt( this.recordCount / this.pageSize );
			return this.recordCount % this.pageSize > 0 ? count + 1 : count;
		},
		prev : function(callback)
		{
			this.goto( -- this.pageIndex,callback);
		},
		next : function(callback)
		{
			this.goto( ++ this.pageIndex,callback);
		},
		last : function(callback)
		{
			this.goto(this.pageCount(),callback);
		},
		first : function(callback)
		{
			this.goto(1,callback);
		},
		/*  
			异步获取数据时默认自动传入参数: 
			@pageIndex [int]  当前页
			@pageSize  [int]  分页大小
			服器传回参数:
			@recordCount [int] or @totalPage [int] 
		*/
	    load : function(url , param , method, callback){
			var _this = this;
			//method =  method || this.method ;
			param = param || {};
			param.pageIndex = this.pageIndex;
			param.pageSize = this.pageSize;
			$.get(url, param , function(data){ 
				 try
				 {
					 data = eval('('+ data +')');
					 _this.recordCount = data.recordCount || _this.recordCount ;
					 _this.totalPage = data.totalPage || _this.pageCount();
					 var e = {
						target : _this , 
						$target : _this.$,
						pageIndex: _this.pageIndex,
						pageSize : _this.pageSize,
						totalPage : _this.totalPage
					 }
					 if(callback) callback(data , e);
					 if(_this.callback) _this.callback(data , e);
					 
	
					 var range = _this.range(_this.pageIndex, _this.halfcount ,_this.pageCount());
					 if(_this.pageCount() <= 1) { 
						 _this.$.fadeOut();
					 }
					 else{
						 _this.$.fadeIn();
					 }
					 _this.render(range);
					 _this.$totalPage.html(_this.totalPage);
					 _this.$pageIndex.html(_this.pageIndex);	 
				 }
				 catch(e){
				 }
			})
		},
		goto : function(pageIndex,callback)
		{
			var pageCount = this.pageCount();
			this.pageIndex = pageIndex;
			if(this.pageIndex <= 0 ){
				 this.pageIndex = 1 ;
				 return this; 
			}
			else if(this.pageIndex > pageCount ){ 
				this.pageIndex = pageCount ; 
				return this;
			}
			this.create(callback);
			//this.doEvent('afterLoad',{target : this , $target : this.$ });
			return this;
		}
	}).extend($.ui.object.prototype);

})(jQuery);