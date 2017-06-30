/* JS Document 
Version:	1.0
Date:		2012/02/08
Author:		Youyin li
Update:
*/
(function($){
$.fn.menusdl=function(){
	jQuery($).hoverIntent(function(){ 
			$(this).children("dd").show();
			$(this).children("dt").attr("class","cur");
	},function(){
		$(this).children("dd").hide();
		$(this).children("dt").attr("class","");
	});
	return this;
};
$.fn.menu=function(style){	
	$(this).hoverIntent(function(){
		$(this).children("ul").show();
		$(this).children("a").attr("class","select"+style);
	},function(){
		$(this).children("ul").hide();
		$(this).children("a").attr("class",""+style);
	});
	return this;
};
})(jQuery);


