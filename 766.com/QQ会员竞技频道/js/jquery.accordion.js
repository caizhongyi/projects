// accordion

$(function(){
	accordion = function(id,count){
		var $st = $(id+" > dt");
		var $sd = $(id+" > dd");
		//alert($sd);
		var num = count || 0;
		//³õÊ¼»¯×´Ì¬
		$sd.eq(num).show();
		$sd.eq(num).css('cursor','default');
		$st.eq(num).css('cursor','default')	.addClass('slider_open');
		//ÂÖ²¥
		$st.each(function(i,j){
			$(j).hover(function(){
				$st.css('cursor','pointer').removeClass('slider_open');
				$(j).css('cursor','default').addClass('slider_open');	
				$sd.hide();
				$sd.eq(i).show();
			});
		});
	}
	

});

$(function(){
	slidepic = function(id,count){
		var $st = $(id);
		//alert($st);
		var num = count || 0;
		//³õÊ¼»¯×´Ì¬
		$st.find('li:first-child').addClass('sopen');
		//ÂÖ²¥
		$st.each(function(){
			var _this = this;
			$(this).find('li').hover(function(){ 
				$(_this).find('li').stop(true).animate({ width : 180 }).removeClass('sopen');
				$(this).stop(true).animate({ width : 434 }).addClass('sopen');
			});
		});
	}

});