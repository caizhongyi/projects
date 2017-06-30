
var $tempFloatItem = null;
$('.game-item').on('mouseenter','li',function(){
	$tempFloatItem && $tempFloatItem.removeAttr('data-lock').removeClass('selected').find('.item_detail').hide();
	$tempFloatItem = $(this).addClass('selected');
	$(this).find('.item_detail').show();
}).on('mouseleave','li',function(){
		if($(this).attr('data-lock')){
			return ;
		}
		$(this).removeClass('selected');
		$(this).find('.item_detail').hide();
		$('.floatlightbox').hide();
	})
/* update 2012/09/28 */
$('.lightbox_content').on('click','li',function(){
	$(this).css('z-index',1);
	$(this).find('.choose_list').stop(true,true).show();
}).on('mouseleave','li',function(){
		$(this).css('z-index','');
		$(this).find('.choose_list').stop(true,true).hide();
	});
/* add 2012/09/28 */
//    var $lightbox = $('.lightbox').hide().center({animate: false});
//
//    $('.item_detail .item_detail_text strong a').click(function(){
//        $lightbox.stop(true,true).fadeIn();
//    })
//    $lightbox.find('.lightbox_title a').click(function(){
//        $lightbox.stop(true,true).fadeOut();
//    })
var $tempFloat = null;
$('.recommend').boxFloat('click', ' .item_detail_text strong a', { axis : 'x' , offset : { y : -10 , x : 10}, onShow : function(e){
	showGameServer(this);
	$tempFloat = $(this).closest('li').attr('data-lock',true);
},onHide : function(){
	if($(this).closest('.item_detail').length){
		return ;
	}
	$tempFloat.removeAttr('data-lock').removeClass('selected').find('.item_detail').hide();
}
});

var scrollbar =  $('.sidebarscroll');
$(window).resize(function () {
	// $lightbox.center();
	scrollbar.jScrollPane();
});
scrollbar.jScrollPane();

function showGameServer(obj)
{
	if(!$(obj).attr("game")) return;
	var server = game_servers[$(obj).attr("game")]["server"];
	var game_name = game_servers[$(obj).attr("game")]["name"];
	var game_icon = game_servers[$(obj).attr("game")]["icon"];
	$(".lightbox_title span").html(game_name);
	var html='';
	for(skey in server)
	{
		var server_url = server[skey].url+"?from=pc";
		var target = ' target="_blank"';
		if(sub_account_len>1)
		{
			server_url = 'javascript:;';
			target = '';
		}else if(sub_account_len==1){
			server_url = server[skey].url+'/'+sub_account[0]['id']+"?from=pc";
		}

		html+='<li><a href="'+server_url+'"'+target+' title="'+game_name+server[skey].name+'" icon="'+game_icon+'">'+server[skey].name+'</a>';
		if(sub_account_len>1)
		{
			html+='		<span class="choose"></span>\
						<div class="choose_list">\
							<ul>\
							<li><strong>使用子帐号登录</strong></li>';
			for(ukey in sub_account)
			{
				html+='				<li><a href="'+server[skey].url+'/'+sub_account[ukey].id+'?from=pc" target="_blank" title="'+game_name+server[skey].name+'" icon="'+game_icon+'" cname="'+(sub_account[ukey].name==''?"子帐号"+sub_account[ukey].id:sub_account[ukey].name)+'">'+(sub_account[ukey].name==''?"子帐号"+sub_account[ukey].id:sub_account[ukey].name)+'</a></li>';
			}
			html+='			</ul>\
						</div>';
		}
		html+=	'</li>';
	}

	$(".lightbox_content ul").html(html);
}
