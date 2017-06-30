/*
 Powered by 766.com Copyright (c) All rights reserved.
 @By GhostWei
 @Email: ghostwei#gmail.com
 @11:55 2009-7-24
 @update 2011-8-30
 */

var v766Loader = v766Loader || {};

;(function(window){
	window.loader = window.loader || {};
	window.loader.load = function(tag,callback){
		var domscript = tag;
		domscript.doneState = { loaded: true, complete: true};
		if(domscript.onreadystatechange !== undefined) {
			// IE6+ support, chrome, firefox not support
			domscript.onreadystatechange = function() {
				if(domscript.doneState[domscript.readyState] ) {
					callback && callback.call(this);
				}
			}
		} else {
			// IE9+, chrome, firefox support
			domscript.onload = function() {
				callback && callback.call(this);
			};
		}
	};
	window.loader.loadScript = function(src,callback){
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = src;
		document.body.appendChild(script);
		window.loader.load(script,callback);
	};

	window.loader.loadCss = function(href,callback){
		var csslink = document.createElement('link');
		csslink.type = 'text/css';
		csslink.rel = "stylesheet";
		csslink.href = href;
		document.body.appendChild(csslink);
		window.loader.load(csslink,callback);
	};

	window.loader.loadjQuery = function(src,callback){
		window.loader.loadScript("http://ajax.googleapis.com/ajax/libs/jquery/"+ ( '1.7.2') +"/jquery.min.js",function(){
			!window.jQuery && loader.loadScript(src ,callback);
		});
	};
})(v766Loader);

var v766 = {
	$:function(o){
		return document.getElementById(o);
	},
	ns:{},
	IE:10,
	time: 10000,
	timer: new Array(),
	//增加广告
	addFixedAdv : function(){
		var $fixedBottomAdv = $('<div><div  id="fixedBottomAdv" style="position:relative;width:1000px; margin: 0 auto;"></div></div>').appendTo('body').css({
			bottom: 0,
			height: 30,
			position: 'fixed',
			'z-index': 9999999,
			width : '100%'
		}).IE6Fixed({
			isBottom:true,
			boxHeight:30,
			flag:false
		});

		var $fixedBottomAdvLarge = $('<div><div id="fixedBottomAdvLarge" style="position:relative;width:1000px; margin: 0 auto;"></div></div>').appendTo('body').css({
			bottom: 0,
			height: 130,
			position: 'fixed',
			'z-index': 9999999,
			width : '100%'
		}).IE6Fixed({
			isBottom:true,
			boxHeight:30,
			flag:false
		});
		var baseurl = 'http://js.olcdn.com/index/v2';

		//右下角广告函数主体
		var floatAd = function(){

			/*var n = a.getcookie('starAd1_766_video').toString();
			n = n=='' ? '0' : n;
			n = parseInt(n);*/
			var floatTimer = '';
			if(typeof(star_ad1)=='object' ){
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
width="300" height="250">\
</embed>\
</object><div class="close" style="height:14px; width:14px; background:url(\''+baseurl+'img/close.gif\') no-repeat 0 0; position: absolute; top:5px; right:5px; cursor:pointer; z-index: 2;"></div></div></div>');
					/*floatTimer = setTimeout(function(){
					 $('#star_ad1').hide();
					 },10*1000);
					 $('#star_ad1 .close').bind('click',function(){
					 clearTimeout(floatTimer);
					 }); */
				}else{
					$body.append('<div id="fixedPopAdv" style="position:fixed; bottom:0; right:0; width:300px; height:250px; z-index:9999999;"><div style="position:relative;"><a href="'+ star_ad1.url +'"><img src="'+ star_ad1.img +'" width="300" height="250" border="0" /></a><div class="close" style="height:14px; width:14px; background:url(\''+baseurl+'img/close.gif\') no-repeat 0 0; position: absolute; top:0px; right:0px; cursor:pointer; z-index: 2;"></div></div></div>');
				}
				$('#star_ad1 .close').bind('click',function(){
					$('#fixedPopAdv').hide();
				});
//右下角广告3小时出现一次
		//		a.setcookie('starAd1_766_video', (n + 1).toString(), (3 * 60 * 60 * 1000), '766.com');
			}

			$('#fixedPopAdv').IE6Fixed({
				isBottom:true,
				boxHeight:250,
				flag:false
			});

		}

		floatAd();
		//底部广告函数主体
		var btncss = {
			background: '#333333',
			color: '#FFFFFF',
			cursor: 'pointer',
			height: '16px',
			'line-height': '16px',
			position: 'absolute',
			right: '0',
			top : 14,
			'text-align': 'center',
			width: 30
		}
		v766Loader.loader.loadScript('http:\/\/get.766.com\/javascript1.php?feature=1&cateid=65&typeid=549&islag=0&newwindow=1&adsc_typpe=0&maxwidth=980&maxheight=30&obj=fixedBottomAdv',function(){
			$('#fixedBottomAdv',$fixedBottomAdv).append("<div id='btmAd_replay'>重播</div><div id='btmAd_close'>关闭</div>");
			$fixedBottomAdvLarge.hide();
			$('#btmAd_replay,#btmAd_close').css(btncss).css({
				right : 33
			})
			$('#btmAd_replay').live('click',function(){
				$fixedBottomAdv.hide();
				$fixedBottomAdvLarge.show();
			});
			$('#btmAd_close').live('click',function(){
				$fixedBottomAdv.hide();
				$fixedBottomAdvLarge.hide();
			});
		});
		v766Loader.loader.loadScript('http:\/\/get.766.com\/javascript.php?feature=1&cateid=65&typeid=549&islag=0&newwindow=1&adsc_typpe=0&maxwidth=980&maxheight=130&obj=fixedBottomAdvLarge',function(){
			$('#fixedBottomAdvLarge',$fixedBottomAdvLarge).append("<div class='close' style='height:14px; width:14px; background:url(\"'+ baseurl +'/img/close.gif\") no-repeat 0 0; position: absolute; top:0px; right:0px; cursor:pointer; z-index: 2;'></div>");
			$('#fixedBottomAdvLarge .close').bind('click',function(){
				$fixedBottomAdvLarge.hide();
				$fixedBottomAdv.show();
			});
		});
		v766Loader.loader.loadScript('http:\/\/get.766.com\/vars.php?feature=1&cateid=65&typeid=543&islag=0&newwindow=1&adsc_typpe=0&maxwidth=300&maxheight=250&obj=fixedPopAdv');

	},
	video_hide:function(){
		clearTimeout(this.timer['video']);
		var aa = this.$("div_show");
		if(aa) aa.parentNode.removeChild(aa);
		this.video_ad_thumb();
	},
	video_fload:function(Div){
		if(Div){
			var t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
			var h = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
			var w = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
			var l = parseInt(w-Div.offsetWidth-1);
			var l=0;
			var r2 = parseInt(t+(h-Div.offsetHeight-1));
			var r1 = parseInt(h-Div.offsetHeight-1);
			Div.style.left = (l)+'px';
			if(this.IE > 6)
				Div.style.top = (r1) + 'px';
			else
				Div.style.top = (r2) + 'px';
		}
	},
	video_ad:function(){
		var self=this;
		var videourl = "http://static.766.com/source/flash/winPlayer.swf?ads="+this.ns.video.img+"&link="+this.ns.video.url;
		var rip_video = document.createElement("div");
		rip_video.id = "div_show";
		rip_video.style.width="338px";
		rip_video.style.height="270px";
		rip_video.innerHTML = '<div style="cursor:pointer; position:absolute; width:15px; height:15px; float:right; left:315px;top:5px;" onclick="v766.video_hide()" >&nbsp;&nbsp;&nbsp;&nbsp;</div><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" \
				codebase=" http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" \
				width="334" height="270">\
				<param name="movie" value="'+videourl+'">\
				<param name="quality" value="high">\
				<param name="wmode" value="transparent">\
				<embed src="'+videourl+'" \
					quality="high" wmode="transparent"\
					pluginspage=" http://www.macromedia.com/go/getflashplayer"\
					type="application/x-shockwave-flash" \
					width="334"  height="270">\
				</embed>\
			</object>';
		document.body.appendChild(rip_video);
		if(this.IE>6){
			this.$("div_show").style.position="fixed";
			this.$("div_show").style.zIndex=100000;
		}else{
			this.$("div_show").style.position="absolute";
			window.attachEvent("onscroll",function(){self.video_fload(self.$("div_show"));});
			window.attachEvent("onresize",function(){self.video_fload(self.$("div_show"));});
		}
		v766.video_fload(this.$("div_show"));
		this.timer['video']=setTimeout("v766.video_hide()",this.time);
	},
	video_ad_thumb:function(){
		var self=this;
		var rip_video_thumb = document.createElement("div");
		rip_video_thumb.id = "div_show_thumb";
		rip_video_thumb.innerHTML = '<div style="cursor:pointer; width:42px; height:18px; text-align:center;overflow:hidden; text-indent:-1000px; background-image:url(http://img.ue.766.com/common/showthumb/close.gif);" title="'+String.fromCharCode(20851,38381)+'">锟截憋拷</div><div style="cursor:pointer; width:42px; height:278px;text-align:center;overflow:hidden;text-indent:-1000px;background-image:url('+v766.ns.video_thumb.img+');" title="'+String.fromCharCode(25773,25918)+'">锟斤拷锟斤拷</div>';
		document.body.appendChild(rip_video_thumb);
		var rd=rip_video_thumb.getElementsByTagName("div");
		rd[1].onclick=function(){
			self.video_ad();
			rip_video_thumb.parentNode.removeChild(rip_video_thumb);
		};
		rd[0].onclick=function(){
			rip_video_thumb.parentNode.removeChild(rip_video_thumb);
		};
		rd[0].onmouseover=function(){this.style.color="#f00"};
		rd[0].onmouseout=function(){this.style.color="#000"};
		rd[1].onmouseover=function(){this.style.color="#f00"};
		rd[1].onmouseout=function(){this.style.color="#000"};
		if(this.IE>6){
			this.$("div_show_thumb").style.position="fixed";
		}else{
			this.$("div_show_thumb").style.position="absolute";
			window.attachEvent("onscroll",function(){self.video_fload(self.$("div_show_thumb"));});
			window.attachEvent("onresize",function(){self.video_fload(self.$("div_show_thumb"));});
		}
		v766.video_fload(this.$("div_show_thumb"));
	},
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
	setcookie: function(name,value,stime,domain){
		try{
			domain = domain==null ? top.location.hostname : domain;
		}catch(e){
			domain = domain==null ? location.hostname : domain;
		}
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
	},
	init:function(){
		var len = window.location.href.split("/").length;
		if(navigator.appName == "Microsoft Internet Explorer"){
			var userAgent = navigator.userAgent;
			var s = 'MSIE';
			this.IE = parseFloat(userAgent.substr(userAgent.indexOf(s) + s.length));
		}
		if(window.addEventListener){
			window.addEventListener('load', function(){
				if(len > 4 || document.URL.indexOf('bbs') == 7){
					if(window.location.host == 'bbs.766.com' && document.URL.length == 19) {
						//if(v766.ns.video){v766.video_ad();};
						if(typeof(v766.ns.video)=='object'){
							var self = v766;
							var n = self.getcookie('star_766_video').toString();
							n = n=='' ? '0' : n;
							var m = parseInt(n);
							self.setcookie('star_766_video', (m + 1).toString(), (6 * 60 * 60 * 1000), '766.com');
							if(m==0){
								self.video_ad();
							}else{
								self.video_ad_thumb();
							}
						}
					}else {
						if(v766.ns.video_thumb){v766.video_ad_thumb();};
					}
				}else{
					//if(v766.ns.video){v766.video_ad();};
					if(typeof(v766.ns.video)=='object'){
						var self = v766;
						var n = self.getcookie('star_766_video').toString();
						n = n=='' ? '0' : n;
						var m = parseInt(n);
						self.setcookie('star_766_video', (m + 1).toString(), (6 * 60 * 60 * 1000), '766.com');
						if(m==0){
							self.video_ad();
						}else{
							self.video_ad_thumb();
						}
					}
				}
			}, false);
		}else{
			window.attachEvent('onload', function(){
				if(len > 4 || document.URL.indexOf('bbs') == 7){
					if(window.location.host == 'bbs.766.com' && document.URL.length == 19) {
						//if(v766.ns.video){v766.video_ad();};
						if(typeof(v766.ns.video)=='object'){
							var self = v766;
							var n = self.getcookie('star_766_video').toString();
							n = n=='' ? '0' : n;
							var m = parseInt(n);
							self.setcookie('star_766_video', (m + 1).toString(), (6 * 60 * 60 * 1000), '766.com');
							if(m==0){
								self.video_ad();
							}else{
								self.video_ad_thumb();
							}
						}
					}else {
						if(v766.ns.video_thumb){v766.video_ad_thumb();};
					}
				}else{
					//if(v766.ns.video){v766.video_ad();};
					if(typeof(v766.ns.video)=='object'){
						var self = v766;
						var n = self.getcookie('star_766_video').toString();
						n = n=='' ? '0' : n;
						var m = parseInt(n);
						self.setcookie('star_766_video', (m + 1).toString(), (6 * 60 * 60 * 1000), '766.com');
						if(m==0){
							self.video_ad();
						}else{
							self.video_ad_thumb();
						}
					}
				}
			}, false);
		}
	}
};

var jqueryLoaderCallback = function(){

	$.fn.IE6Fixed = function(setting){
			if(jQuery.browser.msie || jQuery.browser.version == '6.0'){
				return ;
			}
			var defaults = {
				isBottom:false, //是否底部fixed
				boxHeight:0, //底部内容高度，底部对齐时才需要
				flag:true //是否窗口垂直居中
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
	v766Loader.loader.loadScript('http://js.olcdn.com/globalroute/globalroute.js');
	v766Loader.loader.loadScript('ttp://dynamic.766.com/upbox2/js/upbox3.js');
	v766.init();
	//加载广告
	v766.addFixedAdv();
	v766Loader.loader.loadScript('http:\/\/get.766.com\/vars.php?feature=1&cateid=36&typeid=479&var=no&obj=v766.ns.video');
	v766Loader.loader.loadScript('http:\/\/get.766.com\/vars.php?feature=1&cateid=36&typeid=480&var=no&obj=v766.ns.video_thumb');

	//document.write('<script type="text\/javascript" src="http:\/\/get.766.com\/vars.php?feature=1&cateid=36&typeid=479&var=no&obj=v766.ns.video" charset="gb2312"></script>');
	//document.write('<script type="text\/javascript" src="http:\/\/get.766.com\/vars.php?feature=1&cateid=36&typeid=480&var=no&obj=v766.ns.video_thumb" charset="gb2312"></script>');
	if(location.hostname.indexOf('aion')==-1 && location!='http://dnf.766.com/' && location!='http://dnf.766.com/index.shtml' && location.hostname.indexOf('book')==-1){
	//	document.write('<script type="text\/javascript" src="http:\/\/static.766.com\/a\/windows\/float.js" charset="gb2312"></script>');
		v766Loader.loader.loadScript('http:\/\/static.766.com\/a\/windows\/float.js');
	}
};

if (window.jQuery == undefined) {
	v766Loader.loader.loadScript('http://js.olcdn.com/lib/utf8/jquery-1.6.2.min.js',jqueryLoaderCallback);
}
else{
	jqueryLoaderCallback();
}






