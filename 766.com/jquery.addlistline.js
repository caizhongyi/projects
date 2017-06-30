//$('.infolist').addListLine(5,false);
$.fn.addLisLine = function(count,hasLast){
	$(this).find('li:nth-child('+ (count || 5) +'n)').insertAfetr('<li class="line"></li>');
	if(!hasLast){
		var last = $(this).find('li:last-child');
		if(last.hasClass('line')){
			last.remove();
		}
	}
	return this;
}