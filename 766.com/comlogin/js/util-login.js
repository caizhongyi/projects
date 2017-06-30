/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-14
 * Time: 下午1:35
 * To change this template use File | Settings | File Templates.
 */
//decodeURIComponent
(function(window){
	var config = {
		domain : '',
		size : {
			width : 500,
			height : 400
		},
		loginPage : function(){
			return this.domain + 'login.html?domain=http://www.766.com';
		}
	}

	var dialogHtml = '<div class="util-login-dialog">\
		<div class="dialog-header">\
		<h2>用户登录</h2>\
		<em><a href="javascript:;" class="close" title="关闭"></a></em>\
	</div>\
		<!--main-->\
		<div class="dialog-con">\
			<form id="login-form" action="">\
				<div class="login-item">\
					<div class="login-tips user-tips" style="display:none;">请输入正确的766通行证帐号！</div>\
					<input id="login-user" name="login-user" class="input" maxlength="20" value="通行证/电子邮箱:" onfocus="if(this.value==\'通行证/电子邮箱:\'){this.value=\'\';}" onblur="if(this.value==\'\'){this.value=\'通行证/电子邮箱:\';}" />\
				</div>\
				<div class="login-item">\
					<div class="login-tips password-tips" style="display:none ;">请输入正确的766通行证帐号！</div>\
					<input id="login-password" name="login-password"  class="input" value="密码：" onfocus="if(this.value==\'密码：\'){this.value=\'\';}" onblur="if(this.value==\'\'){this.value=\'密码：\';}" />\
				</div>\
				<div style="display: none;"><input class="input" value="验证码：" onfocus="if(this.value==\'验证码：\'){this.value=\'\';}" onblur="if(this.value==\'\'){this.value=\'验证码：\';}" /></div>\
				<div class="code" style="display: none;">\
					<img src="" />\
					<a name="send" >看不清楚,换一张</a>\
				</div>\
				<div class="radio">\
					<input type="checkbox" class="checkbox" /><span>记住密码</span>\
				</div>\
				<div class="clear"></div>\
				<div class="button"><a href="javascript:;" class="login-btn" title="登录">登录</a></div>\
				<div class="login-word"><b>其他登录方式：</b><p class="login-icon"><a href="" title="新浪微博"></a></p><p class="login-icon2"><a href="" title="腾讯微博"></a></p>\
					<div class="login-forgin">\
						<a href="###">忘记密码?</a>|<a href="###">注册新用户</a></div>\
				</div>\
			</form>\
		</div>\
		<!--main end-->\
	</div>\
	';

	var comLoginDiv = document.createElement('div');
	comLoginDiv.style.width = config.size.width + 'px';
	comLoginDiv.className = "com-ui-dialog";
	comLoginDiv.innerHTML = dialogHtml;
	document.body.appendChild(comLoginDiv);

	var csslink = document.createElement('link');
	csslink.type = 'text/css';
	csslink.rel = "stylesheet";
	csslink.href = 'css/util-style.css';
	document.body.appendChild(csslink);

	var scriptLoad = function(domscript,callback){
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
	}

	function fixedloaderCallback(){
		var $ = jQuery;
		$.comLoginDialog = {
			$ : $(comLoginDiv),
			init : function(){
				var that = this,
					context = $(window),
					left =  ( context.width() - this.$.outerWidth()) / 2 + context.scrollLeft(),
					top =  ( context.height() - this.$.outerHeight()) / 2 + context.scrollTop();

				this.$.css({
					left : left,
					top : top
				});
				this.$.fixed();
				this.$.find('.ui-dialog-close').click(function(){
					that.hide();
				});

				return this;
			},
			show : function(){
				this.$.stop(true).fadeIn();
				return this;
			},
			hide :function(){
				this.$.stop(true).fadeOut();
				return this;
			}
		}

		$.comLoginDialog.init();

		if(window.postMessage){
			function callback (data){
				if(data == 'well'){
					$.comLoginDialog.hide();
				}
			}
			if (window.addEventListener) {
				window.addEventListener("message", function (e) {
					callback(e.data);
				}, false);
			} else if (window.attachEvent) {
				window.attachEvent("onmessage", function (e) {
					callback(e.data);
				});
			}
		}
	}

	function jqueryloaderCallback(){
		var $ = jQuery;
		if(!$.fn.fixed){
			var script = document.createElement('script');
			script.type = "text/javascript";
			script.src = config.domain + "js/jquery.fixed.js";
			document.body.appendChild(script);
			scriptLoad(script,fixedloaderCallback);
		}
		else{
			fixedloaderCallback();
		}
		$('.util-login-dialog .close').click(function(){
			$.comLoginDialog.hide();
		})

		var $form = $('.util-login-dialog #login-form'),
			$loginBtn = $('.login-btn',$form).click(function(){
				if(!validate.user()){ return false; }
				if(!validate.pwd()){ return false; }
			});

		var validate = {
			user : function(){
				var $tips =  $('.user-tips',$form);
				if(!/^[a-z\d_\u4e00-\u9fa5]{6,20}/i.test($user.val()))
					$tips.text('6~20位字符，由字母与数字组成，只能以字母开头！').show();
				else{
					$tips.hide();
				}
				return ;
			},
			pwd  : function(str){
				return true;
			}
		}

		var $user = $('#login-user' , $form).bind({
			focus : function(){

			},
			blur : function(){
				validate.user();
			}
		})


		var $password =  $('#login-password' , $form).bind({
			focus : function(){},
			blur : function(){}
		})

		//document.location.href  = src="login.html?domain=http://www.766.com"
		function getPostDomain(){
			var href = document.location.href,
				args = href.substring(href.lastIndexOf('?'),href.length),
				domain = args.split('=');
			return domain;
		}

		function post(str){
			//注意： frames获取C.html的frame时， cFrameId 是iframe的name属性
			//其中‘redirected=true’故意添加参数，强迫C.html的页面刷新，响应onload事件
			var domain = getPostDomain();
			var ifr = $('#post-message-iframe');

			if(window.postMessage){
				//var domain = 'http://*.766.com';
				window.parent.postMessage(str, domain);  //suport ie7 +
			}
			else{
				ifr.attr('src' ,  domain + '/logincallback.html?redirected=true' + '#' + str);
			}

		}
	};

	if(!window.jQuery){
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = config.domain + "js/jquery-1.7.2.min.js";
		document.body.appendChild(script);
		scriptLoad(script,jqueryloaderCallback);
	}
	else{
		jqueryloaderCallback();
	}
})(window);
