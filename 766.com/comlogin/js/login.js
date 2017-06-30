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

	var comLoginDiv = document.createElement('div');
	comLoginDiv.style.width = config.size.width + 'px';
	comLoginDiv.className = "com-ui-dialog";
	comLoginDiv.innerHTML = '<iframe src="' + config.loginPage() + '" frameborder="0" width="'+ config.size.width +'" height="'+ config.size.height +'" scrolling="no"></iframe>';
	document.body.appendChild(comLoginDiv);

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

	if(!window.jQuery){
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
		};

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

		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = config.domain + "js/jquery-1.7.2.min.js";
		document.body.appendChild(script);
		scriptLoad(script,jqueryloaderCallback);
	}
})(window);
