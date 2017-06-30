var foolurl = 'http://js.olcdn.com/festival/';
;document.write('<link rel="stylesheet" href="'+ foolurl +'fools/fools.css">');
$(function(){

	if($('body').hasClass('w980')){
		$('<img/>').appendTo('body').attr('src',foolurl + 'fools/fools-980-clicked.jpg').hide();
	}
	else{
		$('<img/>').appendTo('body').attr('src',foolurl + 'fools/fools-1220-clicked.jpg').hide();
	}

	$('body').click(function(){
		if($(this).hasClass('w980')){
			$(this).addClass('fools-980-clicked');
		}
		else
			$(this).addClass('fools-1220-clicked');
	});
	$('#wrap').click(function(e){
		e.stopPropagation();
	})
});