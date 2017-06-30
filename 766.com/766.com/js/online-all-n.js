$(function() {
	var is980=$("body").hasClass("w980");
	//dropdown
	$(".search .searchlist").mouseover(function(){$(this).find("ul").show();});
	$(".search .searchlist").mouseleave(function(){$(this).find("ul").hide();});
	$(".s2").mouseover(function(){$(this).find("em").show();});
	$(".s2").mouseleave(function(){$(this).find("em").hide();});
	$(".recom-news-l .hd .more").mouseover(function(){$(this).find("ul").show();});
	$(".recom-news-l .hd .more").mouseleave(function(){$(this).find("ul").hide();});
	$(".recom-news-l li#more ul li").mouseover(function(){$(this).find(".delete").show();});
	$(".recom-news-l li#more ul li").mouseleave(function(){$(this).find(".delete").hide();});
	$("#more").mouseover(function(){$(this).find("ul").show();});
	$("#more").mouseleave(function(){$(this).find("ul").hide();});
	//banner
	var sWidth = $(".banner").width();
	var len = $(".banner ul li").length;
	var index = 0;
	var picTimer;
	var btn = "<div class='btnBg'></div><div class='btn'>";
	var $items = $(".banner ul > li");

	for(var i=0; i < len; i++) {
		btn += "<span></span>";
	}
	btn += "</div>";
	$(".banner").append(btn);
	$(".banner .btnBg").css("opacity",0.5);
	$(".banner .btn span").css("opacity",0.4).mouseenter(function(e , i) {
		//	index = $(".banner .btn span").index(this);	
		var i = $(".banner .btn span").index(this);
		if( i!= index){
			index = i ;
			showPics(i);
		}

	}).eq(0).stop(true,true).animate({"opacity":"1"},300)
	$(".banner ul").css("width",sWidth * (len));
	$(".banner ul li").each(function(i){
		$(this).attr('data-index',i);
	})
	$(".banner").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			index++;

			if(index >= len   ) {index = 0;}
			showPics(index);


		},3000);
	}).trigger("mouseleave");

	function showPics(index) { //普通切换
		//var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
		//$("#focus ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
		//$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果

		$(".banner .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,true).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
		//if(index > temp ){
		prev(index)
		//}
		//else{
		//	next(index)
		//}
		//temp = index;
	}

	function next(index){
		var $ul = $(".banner ul");
		$items.eq(index).prependTo($ul);
		$ul.css('left', -sWidth).stop(true,false).animate({"left": 0},300);
	}

	function prev(index){
		var $ul = $(".banner ul"),
			$lis = $ul.children();

		//if(!$ul.is(':animated')){
		$lis.filter('[data-index='+index+']').insertAfter($lis.eq(0));
		//
		$ul.stop(true,true).animate({"left": - sWidth},300,function(){
			$lis.eq(0).appendTo($ul.css('left',0));
		});
		//}

	}


	//tab
	$.fn.tab = function(setting){
		var defaults = {
			menu : '.hd',	//标签菜单
			menuList : 'a',	//菜单单元块
			current : 'active',//被选中的标签菜单块的样式名
			con : '.bd',	//被切换的容器名
			blank : 'http://img.olcdn.com/common/blank.gif', //默认空白图片地址
			mouseType : 'mouseover' //默认鼠标控制标签方式有'click'和'mouseover'
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(k){
			var $box = $(this);
			var $menu = $box.find(setting.menu+':first');
			var $con = $box.find(setting.con);
			var $li = $menu.find(setting.menuList);
			$li.removeClass(setting.current).eq(0).addClass(setting.current);
			$con.hide().eq(0).show();
			$li.each(function(i,j){
				$(j).bind(setting.mouseType,function(){
					$li.removeClass(setting.current).eq(i).addClass(setting.current);
					$con.hide().eq(i).show();
				});
			});
		});
	}
	$(".tab").tab({mouseType:'mouseover'});
	//$(".tab-c").tab({mouseType:'click', menuList:'.hd-item'});
	$(".title-tab").tab({mouseType:'mouseover'});
});

/****************************
 **头部轮播：JS-adscroll
 *****************************/
$("#JS-adscroll ul li").each(function(i,j){
	var $span = $(j).find("span");
	if($span.length > 1){
		$span.hover(function(){
			//alert('move_in');
			$(this).css('opacity',1.0).siblings("span").css('opacity',0.5);
		},function(){
			//alert('move_out');
			$span.css('opacity',1.0);
		});
	}
});

/****************************
 **.bbt 给力报
 *****************************/
var $bbta = $(".bbt li a");
$bbta.bind('mouseenter',function(){
	$bbta.removeClass('bbt-hover');
	$(this).addClass('bbt-hover');
});

/****************************
 **IE6
 *****************************/
var b_v = navigator.appVersion;
var IE9 = b_v.search(/MSIE 9/i) != -1,
	IE8 = b_v.search(/MSIE 8/i) != -1,
	IE7 = b_v.search(/MSIE 7/i) != -1,
	IE6 = b_v.search(/MSIE 6/i) != -1;
if(IE9 || IE8 || IE7){
	IE6 = false;
}
/****************************
 **fixed修正函数
 *****************************/
(function($){
	$.fn.IE6Fixed = function(setting){
		var defaults = {
			isBottom:false,	//是否底部fixed
			boxHeight:0,	//底部内容高度，底部对齐时才需要
			flag:true	//是否窗口垂直居中
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(obj){
			var $box = $(this),
				$win = $(window),
				$docu = $(document),
				$boxPosy = 0;
			$box.css({position:'absolute'});
			if(setting.isBottom){
				var $top = parseInt($win.height()-setting.boxHeight);
			}else{
				var $top = parseInt($box.css("top"));
			}
			if(setting.flag){
				$boxPosy = $docu.scrollTop() + ($win.height() - $box.height())/2 + "px";
				$box.css("top",$boxPosy);
				alert($box.css('top'))
			}
			var setTop = function(){
				if(setting.flag){
					$boxPosy = $docu.scrollTop() + ($win.height() - $box.height())/2 + "px";
				}else{
					$boxPosy = $docu.scrollTop() + $top + "px";
				}
				$box.css("top",$boxPosy);
			}
			$win.bind('scroll',setTop);
		});
	}
})(jQuery);

/****************************
 **sidebar 滚动绑定
 *****************************/
var top = 0,
	$sidebar_top = $("#sidebar").offset().top,
	$tab = $('.sidetab'),
	$opena = $('.open > a');
var wScroll = function(obj,offset){
	var winS = $(document).scrollTop();
	if(winS > offset - 10){//scroll大于内容所在高度		
		top = winS - offset;
		if ($.browser.msie && $.browser.version == "6.0"){
			$(obj).css({top:top+'px'});
		}else{
			$(obj).css({position:'fixed', top:0});
		}
	}else{
		if ($.browser.msie && $.browser.version == "6.0"){
			$(obj).css({position:'absolute', top:0});
		}else{
			$(obj).css({position:'fixed', top:offset+'px'})	;
		}
	}
}

if($("body").hasClass("w980")){
	$("#sidebar .tab").hide();
	$("#sidebar .tab").eq(0).show();
	//sidebar height
	var sidebar_posy = $('.recom-news').position().top;
	$('.w980 #sidebar .booking').css('top',sidebar_posy+'px');
}else{
	$(window).bind('scroll', function(){
		wScroll('#sidebar',$sidebar_top);
	});
}

/****************************
 **sidebar 收缩/展开函数：opea > a click event
 *****************************/
$('.cms-newgame').css({height:'auto', overflow:'auto'});
$('.cms-newgame li:gt(4)').addClass('hide');
$('.cms-newgame li:gt(9)').removeClass('hide').hide();
$opena.each(function(i,j){
	$(j).click(function(){
		var cur=$(j).text();
		if(cur=="收缩"){
			$(j).text("展开").parent().parent().find(".hide").hide();
		}else if(cur=='展开'){
			$opena.text("展开").eq(i).text("收缩");
			$tab.find(".hide").hide();
			$(j).parent().parent().find(".hide").show();
		}
		return false;
	});
});

/****************************
 **客户端排行榜：JS-toplist
 *****************************/
var $toplist = $('.clientDown .JS-toplist');
$toplist.each(function(i,j){
	$(j).mouseenter(function(){
		$toplist.find("p").removeClass("JS-show").eq(i).addClass("JS-show");
	});
});
//热门活动
var $hotact = $('.hotAct .JS-toplist');
$hotact.each(function(i,j){
	$(j).mouseenter(function(){
		$hotact.find("p").removeClass("JS-show").eq(i).addClass("JS-show");
	});
});

/****************************
 **大小图轮播: bigThumbScroll
 *****************************/
var bigThumbScroll = function(){
	var $big = $('#focus'),
		$bigpic = $big.find('img'),
		$thumbpic = $('#thumb'),
		$thumbli = $thumbpic.find('li'),
		$thumblipic = $thumbli.find('img'),
		flag = 0,
		$scroll = $('#JS-scroll'),
		scrollStop = false,
		length = $thumbli.length;
	//autoplay
	var time = setInterval(function(){
		if(!scrollStop){
			flag++;
			if(flag == length){
				flag = 0;
			}
			$thumbli.removeClass('current').eq(flag).addClass('current');
			$bigpic.attr('src',$thumblipic.eq(flag).attr('bigsrc'))
				.attr('alt',$thumblipic.eq(flag).attr('title'));
			$big.find('a').attr('href',$thumbli.eq(flag).find('a').attr('href'))
				.attr('title',$thumbli.eq(flag).find('a').attr('title'));
		}
	},3000);
	//hover
	$scroll.hover(function(){
		scrollStop = true;
	},function(){
		scrollStop = false;
	});
	//goto
	$thumbli.each(function(i,j){
		$(j).mouseenter(function(){
			$thumbli.removeClass('current').eq(i).addClass('current');
			$bigpic.attr('src',$thumblipic.eq(i).attr('bigsrc'))
				.attr('alt',$thumblipic.eq(i).attr('title'));
			$big.find('a').attr('href',$thumbli.eq(i).find('a').attr('href'))
				.attr('title',$thumbli.eq(i).find('a').attr('title'));
			flag = i;
		});
	});
};
bigThumbScroll();

/****************************
 **赛事报道：id=JS-report
 *****************************/
var $report = $('#JS-report'),
	$reportLi = $report.find("li"),
	$reportSpan = $report.find('span'),
	timerReport = '';
$reportLi.each(function(i,j){
	$(j).hover(function(){
		timerReport = setTimeout(function(){
			$reportSpan.removeClass('JS-show').eq(i).addClass('JS-show');
		},300);
	},function(){
		clearTimeout(timerReport);
	});
	$reportSpan.eq(i).mouseleave(function(){
		$reportSpan.eq(i).removeClass('JS-show');
	});
});

/****************************
 **ad s2
 *****************************/
var ad_s2 = function(){
	var obj_s2 = document.getElementById('s2');
	var strs2 = strs2big = '';
	if(s2_thumb.type=='swf'){
		strs2 = '<a href="'+ s2_thumb.url +'"><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" \
			codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0">\
			<param name="allowScriptAccess" value="sameDomain" />\
			<param name="movie" value="'+s2_thumb.img+'" />\
			<param name="quality" value="high" />\
			<param name="wmode" value="transparent" />\
			<embed height="370" width="60" type="application/x-shockwave-flash" \
				pluginspage="http://www.macromedia.com/go/getflashplayer" \
				wmode="transparent" quality="high" src="'+s2_thumb.img+'"/>\
			</object></a>';
	}else{
		strs2 = '<a href="'+ s2_thumb.url +'"><img width="370" height="60" border="0" src="'+ s2_thumb.img +'" alt="" /></a>';
	}
	if(s2_big.type=='swf'){
		strs2big = '<em class="none"><a href="'+ s2_thumb.url +'"><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" \
			codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0">\
			<param name="allowScriptAccess" value="sameDomain" />\
			<param name="movie" value="'+s2_big.img+'" />\
			<param name="quality" value="high" />\
			<param name="wmode" value="transparent" />\
			<embed height="370" width="165" type="application/x-shockwave-flash" \
				pluginspage="http://www.macromedia.com/go/getflashplayer" \
				wmode="transparent" quality="high" src="'+s2_big.img+'"/>\
			</object></a></em>';
	}else{
		strs2big = '<em class="none"><a href="'+ s2_thumb.url +'"><img width="370" height="165" border="0" src="'+ s2_big.img +'" /></a></em>';
	}
	obj_s2.innerHTML = strs2 + strs2big;
}
if(typeof(s2_thumb)=='object' && typeof(s2_big)=='object'){
	ad_s2();
}

/****************************
 **ad 海景-底部-前弹
 *****************************/
var $topad = $('#topAd'),
	$topad1 = $('#topAd1'),
	$ad2 = $('#ad2'),
	$ad4 = $('#ad4'),
	$bottomAd = $('.bottomAd'),
	$bottomAd1 = $('.bottomAd1'),
	timerTopad1 = timerTopad2 = timerAd2 = timerBtmAd1 = timerBtmAd2 = timerAd4 = '',
	isBtmAdClose = isTop_ad = false;
//广告
var a = {
	time:{
		topAd:6000,
		btmAd:8000,
		top:8000
	},
	//获取cookie
	getcookie: function(name){
		var CookieFound = false;
		var start = 0;
		var end = 0;
		var CookieString = document.cookie;
		var i = 0;
		while(i <= CookieString.length){
			start = i;
			end = start + name.length;
			if (CookieString.substring(start, end) == name){
				CookieFound = true;
				break;
			}
			i++;
		}
		if(CookieFound){
			start = end + 1;
			end = CookieString.indexOf(";",start);
			if (end < start)end = CookieString.length;
			var getvalue = CookieString.substring(start, end);
			return unescape(getvalue);
		}
		return "";
	},
	//设置cookie
	setcookie: function(name,value,stime,domain){
		try{
			domain = domain==null ? top.location.hostname : domain;
		}catch(e){
			domain = domain==null ? location.hostname : domain;
		}
		//60 * 60 * 1000 = 1小时
		//目前cookie设置成3小时
		stime = stime==null ? (3 * 60 * 60 * 1000) : stime;
		var extime= new Date();
		extime.setTime(extime.getTime() + stime);
		value = escape(value);
		var nameString = name + "=" + value;
		var expiryString = ";expires="+ extime.toGMTString();
		var domainString = ";domain="+domain;
		var pathString = ";path=/";
		var setvalue = nameString + expiryString + domainString + pathString;
		document.cookie = setvalue;
	}
};
//收藏 & 设置首页
$("#fav").click(function(){
	a.addFavorite();
	return false;
});
$("#setHomePage").click(function(){
	a.setHomePage(this);
	return false;
});

//广告主体
var adInit = function(){
	//floatAd直接显示右下角广告
	floatAd();

	//ad1&ad2&ad3-header广告
	//document.getElementById("ad2_2").innerHTML = document.getElementById("ad2_1").innerHTML;
	var	isSameAd1 = $('#ad1 a').attr("class"),
		isSameAd2 = $('#ad2_1 a').attr("class"),
		isSameAd3 = $('#ad3 a').attr("class");
	//4广告同时显示一个
	if((isSameAd1==isSameAd2) && (isSameAd1 == isSameAd3)){
		$('#ad1,.game-nav-wp').css({
			marginBottom : 0
		});
		$('#ad1,#ad3,#ad2_1,#ad2_2').bind('mouseover',function(){
			timerAd4 = setTimeout(function(){
				$ad4.css({ display:'block' });
			},500);
		}).bind('mouseout',function(){
				clearTimeout(timerAd4);
			});
		$ad4.bind('mouseleave',function(){
			$ad4.css({display:'none'});
		});
	}else{
		$('#ad2_1,#ad2_2').bind('mouseover',function(){
			timerAd2 = setTimeout(function(){
				$ad2.css({ display:'block' });
			},500);
		}).bind('mouseout',function(){
				clearTimeout(timerAd2);
			});
		$ad2.bind('mouseleave',function(){
			$ad2.css({display:'none'});
		});
	}

	//海景广告是否存在
	if(document.getElementById("topAd").innerHTML!=''){
		timerTopad1 = setTimeout(function(){
			$topad1.hide();
			//----------前弹广告开始----------//
			//top_ad();
			//----------底部广告开始----------//
			bottomAd();
		},a.time.topAd);
		//close
		$topad1.append("<div class='close' style='height:14px; width:14px; background:url(\""+baseurl+"img/close.gif\") no-repeat 0 0; position: absolute; bottom:0px; right:0px; cursor:pointer; z-index: 2;'></div>");
		$topad1.find('.close').bind('click',function(){
			$topad1.css({display:'none'});
			if(!isBtmAdClose){
				clearTimeout(timerTopad1);
				bottomAd();
			}
		});
		$topad1.show();
		//topAd-海景控制
		$topad.bind('mouseover',function(){
			timerTopad2 = setTimeout(function(){
				//$topad.hide();
				$topad1.css({ display:'block' });
			},200);
		}).bind('mouseout',function(){
				clearTimeout(timerTopad2);
			});
		$topad1.bind('mouseleave',function(){
			$topad1.css({display:'none'});
		});
	}else{
		//----------底部广告开始----------//
		bottomAd();
	}
}

//底部广告函数主体
var bottomAd = function(){
	//底部广告是否存在
	if(document.getElementById('bottomAd').innerHTML!='' && document.getElementById('bottomAd1').innerHTML!=''){
		$bottomAd.css({display:'none'});
		$bottomAd1.css({display:'block'});
		timerBtmAd1 = setTimeout(function(){
			$bottomAd1.css({display:'none'});
			$bottomAd.css({display:'block'});
			//----------前弹广告开始----------//
			top_ad();
		},a.time.btmAd);
		//添加关闭按钮-底部广告控制
		$('#bottomAd1').append("<div class='close' style='height:14px; width:14px; background:url(\""+baseurl+"img/close.gif\") no-repeat 0 0; position: absolute; top:0px; right:0px; cursor:pointer; z-index: 2;'></div>");
		$('#bottomAd1 .close').bind('click',function(){
			clearTimeout(timerBtmAd1);
			clearTimeout(timerBtmAd2);
			$bottomAd1.css({display:'none'});
			$bottomAd.css({display:'block'});
			if(!isTop_ad){//确保前弹执行一次
				top_ad();
			}
		});
		$('#bottomAd').append("<div id='btmAd_replay'>重播</div><div id='btmAd_close'>关闭</div>");
		$('#btmAd_replay').live('click',function(){
			$bottomAd.css({display:'none'});
			$bottomAd1.css({display:'block'});
			timerBtmAd2 = setTimeout(function(){
				$bottomAd1.css({display:'none'});
				$bottomAd.css({display:'block'});
			},a.time.btmAd);
		});
		$('#btmAd_close').live('click',function(){
			//isBtmAdClose = true;
			$bottomAd.css({display:'none'});
			$bottomAd1.css({display:'none'});
		});
	}else{
		//----------前弹广告开始----------//
		top_ad();
	}
	isBtmAdClose = true;
}

//前弹广告函数主体
var smallThumbWidth = $(window).width()>=1330 ? 230 : 230; //前弹缩略图尺寸
var top_ad = function(){
	var $doc = $('body'),
		timerTa = timerTa2 = '',
		$topThumb = $("#top_thumb"),
		hasPlay = true;
	//前弹广告存在
	if(typeof(front)=='object' && typeof(front_wthumb)=='object' && typeof(front_thumb)=='object'){
		var top_thumb = smallThumbWidth == 230 ? front_wthumb : front_thumb;

		thumb_func = function(){
			if(top_thumb.type=='swf'){
				$topThumb.hide().html("<a href='"+ top_thumb.url +"' style='width:"+ smallThumbWidth +"px; height:80px;'><object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='"+ smallThumbWidth +"' height='80'><param name='movie' value='"+ top_thumb.img +"'><param name='quality' value='high'><param name='wmode' value='transparent'><embed src='"+ top_thumb.img +"' quality='high' wmode='transparent' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='"+ smallThumbWidth +"' height='80'></embed></object></a><div id='top_thumb_replay'>重播</div><div id='top_thumb_close'>关闭</div>");
			}else{

				$topThumb.hide().html("<a href='"+ top_thumb.url +"' style='width:"+ smallThumbWidth +"px; height:80px;'><img src='"+ top_thumb.img +"' /></a><div id='top_thumb_replay'>重播</div><div id='top_thumb_close'>关闭</div>");
			}
		}
		if(front.type=='swf'){
			$doc.append("<div class='top_ad' style='width:800px; height:400px; margin:-200px 0 0 -400px; z-index:9999999; position:fixed; left:50%; top:50%;'><div id='top_ad' style='position:relative;'><a href='"+ front.url +"'><object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='800' height='400'><param name='movie' value='"+ front.img +"'><param name='quality' value='high'><param name='wmode' value='transparent'><embed src='"+ front.img +"' quality='high' wmode='transparent' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='800' height='400'></embed></object></a></div></div>");
			//top_ad_thumb
			thumb_func();
			timerTa = setTimeout(function(){
				$('.top_ad').hide();
				$topThumb.show();
				hasPlay = false;
				//----------底部广告开始----------//
				//bottomAd();
			},a.time.top);
		}else{
			$doc.append("<div class='top_ad' style='width:800px; height:400px; margin:-200px 0 0 -400px; z-index:9999999; position:fixed; left:50%; top:50%;'><div id='top_ad' style='position:relative;'><a href='"+ front.url +"'><img src='"+ front.img +"' /></a></div></div>");
			//top_ad_thumb
			thumb_func();
			timerTa = setTimeout(function(){
				$('.top_ad').hide();
				$topThumb.show();
				hasPlay = false;
				//----------底部广告开始----------//
				//bottomAd();
			},a.time.top);
		}

		//前弹广告fixed
		if(IE6){
			var topAdH = $('.top_ad').height();
			//alert(topAdH)
			$(".top_ad").IE6Fixed({
				isBottom:true,
				boxHeight:topAdH,
				flag:false
			});
		}

		//close
		$('#top_ad').append("<div class='close' style='height:14px; width:14px; background:url(\""+baseurl+"img/close.gif\") no-repeat 0 0; position: absolute; top:0px; right:0px; cursor:pointer; z-index: 2;'></div>");
		$('#top_ad .close').live('click',function(){
			$('.top_ad').hide();
			$('#top_thumb').show();
		});

		//replay
		$("#top_thumb_replay").live('click',function(){
			$('#top_thumb').hide();
			$('.top_ad').show();
			timerTa2 = setTimeout(function(){
				$('.top_ad').hide();
				$('#top_thumb').show();
			},a.time.top);
		});


		//close window
		$("#top_thumb_close").live('click',function(){
			clearTimeout(timerTa);
			clearTimeout(timerTa2);
			$('#top_thumb').hide();
		});
	}
	//执行过一次前弹广告
	isTop_ad = true;
}

//右下角广告函数主体
var floatAd = function(){
	var n = a.getcookie('starAd1_766_video').toString();
	n = n=='' ? '0' : n;
	n = parseInt(n);
	var floatTimer = '';
	if(typeof(star_ad1)=='object' && n<=0){
		var $body = $('body');
		if(star_ad1.type=='swf'){
			$body.append('<div id="star_ad1" style="position:fixed; bottom:0; right:0; width:300px; height:250px; z-index:9999999;"><div style="position:relative;"><a href="'+ star_ad1.url +'"><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" \
				codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="300" height="250">\
				<param name="allowScriptAccess" value="sameDomain" />\
				<param name="movie" value="'+star_ad1.img+'" />\
				<param name="quality" value="high" />\
				<param name="wmode" value="transparent" />\
				<embed height="250" width="300" type="application/x-shockwave-flash" \
					pluginspage="http://www.macromedia.com/go/getflashplayer" \
					wmode="transparent" quality="high" src="'+star_ad1.img+'"/>\
				</object></a><div class="close" style="height:14px; width:14px; background:url(\''+baseurl+'img/close.gif\') no-repeat 0 0; position: absolute; top:0px; right:0px; cursor:pointer; z-index: 2;"></div></div></div>');
		}else if(star_ad1.type=='flv'){
			var videourl = "http://static.766.com/source/flash/winPlayer.swf?ads="+star_ad1.img+"&link="+star_ad1.url;
			$body.append('<div id="star_ad1" style="position:fixed; bottom:0; right:0; width:300px; height:250px; z-index:9999999;"><div style="position:relative;"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" \
				codebase=" http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" \
				width="300" height="250">\
				<param name="movie" value="'+videourl+'">\
				<param name="quality" value="high">\
				<param name="wmode" value="transparent">\
				<embed src="'+videourl+'" \
					quality="high" wmode="transparent"\
					pluginspage=" http://www.macromedia.com/go/getflashplayer"\
					type="application/x-shockwave-flash" \
					width="300"  height="250">\
				</embed>\
			</object><div class="close" style="height:14px; width:14px; background:url(\''+baseurl+'img/close.gif\') no-repeat 0 0; position: absolute; top:5px; right:5px; cursor:pointer; z-index: 2;"></div></div></div>');
			/*floatTimer = setTimeout(function(){
			 $('#star_ad1').hide();
			 },10*1000);
			 $('#star_ad1 .close').bind('click',function(){
			 clearTimeout(floatTimer);
			 });	*/
		}else{
			$body.append('<div id="star_ad1" style="position:fixed; bottom:0; right:0; width:300px; height:250px; z-index:9999999;"><div style="position:relative;"><a href="'+ star_ad1.url +'"><img src="'+ star_ad1.img +'" width="300" height="250" border="0" /></a><div class="close" style="height:14px; width:14px; background:url(\''+baseurl+'img/close.gif\') no-repeat 0 0; position: absolute; top:0px; right:0px; cursor:pointer; z-index: 2;"></div></div></div>');
		}
		$('#star_ad1 .close').bind('click',function(){
			$('#star_ad1').hide();
		});
		//右下角广告3小时出现一次
		a.setcookie('starAd1_766_video', (n + 1).toString(), (3 * 60 * 60 * 1000), '766.com');
	}
}
//初始换广告
adInit();

/****************************
 **fixed修正函数
 *****************************/
if(IE6){
	//底部广告fixed
	if (document.getElementById('bottomAd').innerHTML){//如果是IE6，则执行修正；否则不修正
		var btmAdH1 = $bottomAd.height(),
			btmAdH2 = $bottomAd1.height();
		$(".bottomAd").IE6Fixed({
			isBottom:true,
			boxHeight:btmAdH1,
			flag:false
		})

		$(".bottomAd1").IE6Fixed({
			isBottom:true,
			boxHeight:btmAdH2,
			flag:false
		})
	}

	//右下角广告
	if(typeof(star_ad1)=='object'){
		var $star_ad1 = $('#star_ad1');
		var floatAdH = $star_ad1.height();
		$star_ad1.IE6Fixed({
			isBottom:true,
			boxHeight:floatAdH,
			flag:false
		});
	}
}

/****************************
 **首页：新手引导功能
 *****************************/
var newVersionTeach = function(){
	var n = a.getcookie('new_version_766').toString();
	var m = a.getcookie('new_version_766_oneday').toString();
	var	$home = $('.home-ug'),
		$ug1 = $('.ug-1'),
		$ug2 = $('.ug-2'),
		$ug3 = $('.ug-3'),
		$ug4 = $('.ug-4'),
		$today = $('.today-news');
	var $home_posy = $today.offset().top + 100;
	$home.css('top',$home_posy+'px');
	n = n=='' ? '0' : n;
	n = parseInt(n);
	m = m=='' ? '0' : m;
	m = parseInt(m);
	if(n<=0 && m<=0){
		$home.show();
		$('.ug-close, .ug-1 .ug-btn-r, .ug-4 .ug-btn-r').bind('click',function(){
			$(".teach_box").remove();
			$home.hide();
		});
		$('.ug-close, .ug-1 .ug-btn-r').bind('click',function(){
			//我知道了一天内不再显示
			a.setcookie('new_version_766_oneday', (n + 1).toString(), (24 * 60 * 60 * 1000), '766.com');
		});
		$('.ug-4 .ug-btn-r').bind('click',function(){
			//新手导航1年出现一次
			a.setcookie('new_version_766', (n + 1).toString(), (365 * 24 * 60 * 60 * 1000), '766.com');
		});
		//开始
		$('.ug-1 .ug-btn-l').bind('click',function(){
			$today.append('<div class="teach_box" style="position:absolute;top:33px;left:0;width:100%;height:295px;background:#111;opacity:0.6;filter:Alpha(opacity=60);"></div><div class="teach_box" style="position:absolute;top:0;left:0;width:100%;height:33px;background:#79CDFB;opacity:0.5;filter:Alpha(opacity=50);"></div>');
			$ug1.hide();
			$ug2.show();
		});
		//下一步
		$('.ug-2 .ug-btn-r').bind('click',function(){
			$(".teach_box").remove();
			$('.recom-news-l').append('<div class="teach_box" style="position:absolute;top:33px;left:0;width:100%;height:347px;background:#111;opacity:0.6;filter:Alpha(opacity=60);"></div><div class="teach_box" style="position:absolute;top:0;left:0;width:100%;height:33px;z-index:21;background:#79CDFB;opacity:0.5;filter:Alpha(opacity=50);"></div>');
			$ug2.hide();
			$ug3.show();
		});
		//下一步
		$('.ug-3 .ug-btn-r').bind('click',function(){
			$(".teach_box").remove();
			$ug3.hide();
			$ug4.show();
		});
	}
}
/*newVersionTeach();*/