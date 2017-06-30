/**
 * 改进javascript继承，使用时在子类的构造器声明后，
 * 执行SubClass.prototype.inheritFrom(SuperClass)， 即可使子类继承父类的属性和方法
 * @param {} fnClass 父类
 */
Object.prototype.inheritFrom = function (fnClass) {

    function inheritClasses(fnClass, arrClasses) {
        
        arrClasses.push(fnClass);

        if (typeof fnClass.__superclasses__ == "object") {
            for (var i=0; i < fnClass.__superclasses__.length; i++){
                inheritClasses(fnClass.__superclasses__[i], arrClasses);
            }
        }
    }
    
    if (typeof this.constructor.__superclasses__ == "undefined") {
        this.constructor.__superclasses__ = new Array();
    }
    
    inheritClasses(fnClass, this.constructor.__superclasses__);
    
    for (prop in fnClass.prototype) {
        if (typeof fnClass.prototype[prop] == "function") {
            this[prop] = fnClass.prototype[prop];
        }
    }
};

/**
 * 改进instanceOf方法，判断object是否是Class的实例，并适用与继承。
 * @param {} func 类
 * @return {Boolean} 返回true或者false
 */
Object.prototype.instanceOf = function (func) {

    if (this.constructor == func) {
        return true;
    } else if (typeof this.constructor.__superclasses__ == "object") {
        for (var i=0; i < this.constructor.__superclasses__.length; i++) {
            if (this.constructor.__superclasses__[i] == func) {
                return true;
            }
        }
        return false;
    } else {
        return false;
    }
};

/**
 * 改进浏览器的事件机制
 * @param {} obj
 * @param {} type
 * @param {} fn
 */
function addEvent(obj, type, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(type, fn, false);
	}else if (obj.attachEvent) {
		obj["e" + type + fn] = fn;
		obj.attachEvent("on" + type, function() {
			obj["e" + type + fn]();
		});
	}
};

/**
 * 简化获取dom
 * @param {} id
 * @return {}
 */
var $ = function() {
	if(arguments.length == 1) {
		return document.getElementById(arguments[0]);
	}else if(arguments.length > 1) {
		var arr = new Array();
		for(var i = 0; i < arguments.length; i++) {
			arr.push(document.getElementById(arguments[i]));
		}
		return arr;
	}
	return null;
};

/**
 * onReady是对body的onload事件进行改进，使dom加载完成图片未加载时就处理js脚本
 * @param {} loadEvent
 * @param {} waitForImages
 * @return {Boolean}
 */
$.onReady = function(loadEvent, waitForImages) {
	if (waitForImages) {
		return addEvent(window, 'load', loadEvent);
	}
	var init = function() {
		if (arguments.callee.done) {
			return;
		}
		arguments.callee.done = true;
		loadEvent.apply(document, arguments);
	};
	if (!+"\v1") {
		if (window.self == window.top) {
			(function() {
				try {
					document.documentElement.doScroll("left");
				} catch (e) {
					setTimeout(arguments.callee, 0);
					return;
				}
				init();
			})();
		} else {
			document.attachEvent("onreadystatechange", function() {
				if (document.readyState === "complete") {
					document.detachEvent("onreadystatechange",arguments.callee);
					init();
				}
			});
		}
	} else {
		document.addEventListener("DOMContentLoaded", function() {
			document.removeEventListener("DOMContentLoaded",arguments.callee, false);
			init();
		}, false);
	}
	return true;
};


/**
 * Cookie对象，用于获取和设置Cookie
 * 构造器
 */
function Cookie() {
}

/**
 * getCookie方法
 * @param {} name 根据name获取Cookie的值
 * @return {String} 返回Cookie的值
 */
Cookie.prototype.getCookie = function(name) {
	if (document.cookie.length > 0) {
		var start = document.cookie.indexOf(name + "=");
		if (start != -1) {
			start = start + name.length + 1;
			var end = document.cookie.indexOf(";", start);
			if (end == -1) {
				end = document.cookie.length;
			}
			return unescape(document.cookie.substring(start, end));
		}
	}
	return "";
};

/**
 * 设置Cookie
 * @param {} name 要设置的Cookie的name
 * @param {} value 要设置的Cookie的value
 * @param {} expiredays 该Cookie的有效期，按天计算
 */
Cookie.prototype.setCookie = function(name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	//document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires="　+ exdate.toGMTString());
	if(expiredays) {
		document.cookie = name + "=" + escape(value) + ";expires=" + exdate.toGMTString();
	}else {
		document.cookie = name + "=" + escape(value);
	}
};

function Image(imageGroup) {
	this.pics = imageGroup.items;
}

Image.prototype.getIndex = function(id) {
	for(var i = 0; i < this.pics.length; i++) {
		if(this.pics[i].id == id) {
			return i;
		}
	}
	return null;
};

Image.prototype.isLastIndex = function(id) {
	var index = this.getIndex(id);
	if(index == this.pics.length - 1) {
		return true;
	}
	return false;
};

Image.prototype.isFirstIndex = function(id) {
	var index = this.getIndex(id);
	if(index == 0) {
		return true;
	}
	return false;
};

Image.prototype.getPage = function(id) {
	var index = this.getIndex(id);
	if(index >= 0) {
		return index - 0 + 1;
	}
	return 1;
};

Image.prototype.getPic = function(id) {
	var index = this.getIndex(id);
	if(index >= 0) {
		return this.pics[index];
	}
	return null;
};

function UrlLocate(image) {
	this.image = image;
}
/**
 * 修改url的参数(#p=1)的值
 * @param {} index
 */
UrlLocate.prototype.setPage = function(page) {
	var url = window.location.href;
	
	var paramBefore = url.match(/p=\d{0,}/)[0];
	var p = paramBefore.substring(2);
	var paramAfter = "p=" + page;
	
	window.location.href = url.replace(paramBefore, paramAfter);
};

/**
 * 获取url中的p的参数，
 * @return {} 返回图片的第几张
 */
UrlLocate.prototype.getPage = function() {
	var url = window.location.href;
	var page;
	
	if(url.match("#")) {
		var param = url.match(/p=\d{0,}/)[0];
		page = param.substring(2);
		if(page > this.image.pics.length || page < 1) {
			page = 1;
			window.location.href = url.replace(param, "p=1");
		}
	}else {
		page = 1;
		window.location.href = url + "#p=1";
	}
	
	return page;
};

/**
 * 图片显示模式
 * @param {} listMode 列表模式
 * @param {} showMode 幻灯片模式
 */
function Mode(image, listModeDiv,  showModeDiv, player, dialog) {
	this.pics = image.pics;
	this.listModeDiv = listModeDiv;
	this.showModeDiv = showModeDiv;
	this.player = player;
	this.dialog = dialog;
	this.init();
}

/**
 * 填充列表模式的图片
 * @param {} listModeDiv 获取的div对象
 */
Mode.prototype.init = function() {
	var listModeDivContent = '';
	for(var i = 0; i < Math.ceil(this.pics.length / 4); i++) {
		listModeDivContent += '<div  class="listModeImageDiv">';
		for(var j = 0; j < 4; j++) {
			var index = 4 * i + j;
			if(index < this.pics.length) {
				var pic = this.pics[index];
				listModeDivContent += '<img class="listModeImage"' + 
										 'src="' + pic.smallImgPath + '" ' +
										 'alt="' + pic.title + '" ' +
										 'onclick="bigImage.to(' + pic.id + ')" ' + 
										 '/>';
			}
		}
		listModeDivContent += '</div>';
	}
	this.listModeDiv.innerHTML += listModeDivContent;
}

/**
 * 跳到列表模式
 */
Mode.prototype.listMode = function() {
	this.player.stop();
	this.dialog.hide();
	this.showModeDiv.style.display = "none";
	this.listModeDiv.style.display = "block";
}

/**
 * 跳到幻灯片模式
 */
Mode.prototype.showMode = function() {
	this.dialog.hide();
	this.listModeDiv.style.display = "none";
	this.showModeDiv.style.display = "block";
}


/**
 * 
 * @param {} id 弹出窗口的div的id
 * @param {} width div宽度
 * @param {} height div高度
 */
function Dialog(dialogDiv) {
	this.dialogDiv = dialogDiv;
}

/**
 * 显示弹出div
 */
Dialog.prototype.show = function() {
	var dialogDiv = this.dialogDiv;
	dialogDiv.style.left = (document.body.clientWidth/2 - dialogDiv.offsetWidth/2) + "px";
	dialogDiv.style.top = (document.body.clientHeight/2 - dialogDiv.offsetHeight/2 - 100) + "px";
	dialogDiv.style.visibility = "visible";
}

/**
 * 隐藏弹出div
 */
Dialog.prototype.hide = function() {
	this.dialogDiv.style.visibility = "hidden";
}

/**
 * 缩略图构造器
 */
function SmallImage(image, page, outerDiv, innerDiv) {
	this.image = image;
	this.pics = image.pics;
	this.page = page;
	this.outerDiv = outerDiv;
	this.innerDiv = innerDiv;
	this.speed = 10;
	this.init();
}

SmallImage.prototype.init = function() {
	var innerDivContent = "";
	for(var i = 0; i < this.pics.length; i++) {
		innerDivContent += '<img ' +
								'id="' + this.pics[i].id + '" ' +
								'src="' + this.pics[i].smallImgPath + '" ' +
								'alt="' + this.pics[i].title + '" ' +
								'class="smallImage"' +
								'onclick="bigImage.to(this.id)" ' + 
							'/>';
	}
	this.innerDiv.innerHTML = innerDivContent;
}

/**
 * 右移缩略图
 */
SmallImage.prototype.rightMove = function() {
	var inner = this.innerDiv;
	var outer = this.outerDiv;
	var outerLeft = outer.scrollLeft;
	var MyMarRight;
	
	function MarqueeRight(){
		if(inner.offsetWidth - outer.scrollLeft <= 0) {
			outer.scrollLeft -= inner.offsetWidth;
		}else{
			if(outer.scrollLeft + outer.offsetWidth < Math.floor((inner.scrollLeft + inner.offsetWidth) / 10) * 10) {
				if(outer.scrollLeft < outerLeft + outer.offsetWidth) {
					outer.scrollLeft += 10;
				}else {
					clearInterval(MyMarRight);
				}
			}else {
				outer.scrollLeft = inner.offsetLeft + inner.offsetWidth - outer.offsetWidth;
				clearInterval(MyMarRight);
			}
		}
	}
	
	MyMarRight=setInterval(MarqueeRight,this.speed);
}

/**
 * 左移缩略图
 */
SmallImage.prototype.leftMove = function() {
	var inner = this.innerDiv;
	var outer = this.outerDiv;
	var outerLeft = outer.scrollLeft;
	
	var MyMarLeft;
	function MarqueeLeft(){
		if(inner.offsetWidth - outer.scrollLeft <= 0) {
			outer.scrollLeft -= inner.offsetWidth;
		}else{
			if(outer.scrollLeft > 0) {
				if(outer.scrollLeft > outerLeft - outer.offsetWidth) {
					outer.scrollLeft -= 10;
				}else {
					clearInterval(MyMarLeft);
				}
			}else {
				clearInterval(MyMarLeft);
			}
		}
	}
	
	MyMarLeft=setInterval(MarqueeLeft,this.speed);
}

/**
 * 缩略图,定位到某一张图片
 */
SmallImage.prototype.indexMove = function(imgId) {
	var outer = this.outerDiv;
	var img = $(imgId);
	//将选中的图片移到合适的位置
	if(outer.scrollLeft >= img.offsetLeft) {
		outer.scrollLeft = img.offsetLeft - img.clientLeft;
	}
	if(outer.scrollLeft + outer.offsetWidth <= img.offsetLeft + img.offsetWidth) {
		outer.scrollLeft = img.offsetLeft + img.offsetWidth - outer.offsetWidth + img.clientLeft;
	}
	
	//设置被选中缩略图的css样式
	var imgTagArray = [];
	for(var i = 0; i < this.pics.length; i++){ 
		imgTagArray.push($(this.pics[i].id));
	}
	for(var i = 0; i < imgTagArray.length; i++) {
		imgTagArray[i].className = "smallImage";
	}
	img.className = "smallImageChoose";
}
/**
 * Image构造器
 * @param {} imageGroup 图片组对象
 * @param {} imgTagId 要显示的img标签的id
 * @param {} currentIndex currentIndex 当前要显示的第几张图片
 */
function BigImage(image, imgTag, page, urlLocate, dialog, smallImage, player, mode) {
	this.image = image;
	this.pics = image.pics;
	this.imgTag = imgTag;
	this.index = page - 1;
	this.urlLocate = urlLocate;
	this.dialog = dialog;
	this.smallImage = smallImage;
	this.player = player;
	this.mode = mode;
}

/**
 * 定位到某一张图片
 * @param {} index
 */
BigImage.prototype.to = function(id) {
	this.mode.showMode();
	this.dialog.hide();
	this.setInfo(id);
	this.index = this.image.getIndex(id);
	this.urlLocate.setPage(this.image.getPage(id));
	this.smallImage.indexMove(id);
}

/**
 * 上一张
 */
BigImage.prototype.pre = function() {
	var outer = this.smallImage.outerDiv;
	
	this.dialog.hide();
	if(!this.image.isFirstIndex(this.pics[this.index].id)) {
		this.index--;
		var img = $(this.pics[this.index].id);
		if(outer.scrollLeft >= img.offsetLeft) {
			this.smallImage.leftMove();
		}
		this.to(this.pics[this.index].id);
	}
};

/**
 * 下一张
 */
BigImage.prototype.next = function() {
	var outer = this.smallImage.outerDiv;
	
	if(!this.image.isLastIndex(this.pics[this.index].id)) {
		this.index++;
		var img = $(this.pics[this.index].id);
		if(outer.scrollLeft + outer.offsetWidth <= img.offsetLeft + img.offsetWidth) {
			this.smallImage.rightMove();
		}
		this.to(this.pics[this.index].id);
	}else {
		this.dialog.show();
		this.player.stop();
	}
};

BigImage.prototype.setInfo = function(id) {
	var pic = this.image.getPic(id);
	this.imgTag.src = pic.bigImgPath;
	this.imgTag.alt = pic.title;
	this.smallImage.indexMove(id);
}

/**
 * 图片播放器
 * @param {} time 图片跳转间隔时间，以秒为单位
 */
function Player(time, dialog){
	this.time = time;
	this.dialog = dialog;
	this.playInterval;
}

Player.prototype.setTime = function(time) {
	this.time = time;
}

/**
 * 播放
 */
Player.prototype.play = function(bigImage) {
	this.stop();
	this.playInterval = setInterval('bigImage.next()', this.time * 1000);
}

/**
 * 停止
 */
Player.prototype.stop = function() {
	clearInterval(this.playInterval);
}

/**
 * 重播
 */
Player.prototype.replay = function(bigImage) {
	this.dialog.hide();
	this.stop();
	bigImage.to(bigImage.pics[0].id);
	this.play(bigImage);
}

/**
 * 构造器
 * @param keyTipId	键盘提示标签
 * @param expireDay	过期时间
 * @param player	player对象
 * @param cookie	cookie对象
 * @param bigImage	bigImage对象
 * @return
 */
function Keyword(keyTipId, expireDay, player, cookie, bigImage) {
	this.keyTipTag = keyTipId;
	this.expireDay = expireDay;
	this.player = player;
	this.cookie = cookie;
	this.bigImage = bigImage;
	this.keyTipCookieName = "keyTip";
}

/**
 * 是否有cookie
 * @return
 */
Keyword.prototype.hasKeyTipCookie = function() {
	var keyTipCookie = cookie.getCookie(this.keyTipCookieName);
	if(keyTipCookie == null || keyTipCookie == "") {
		this.keyTipTag.style.display = "inline";
	}else {
		this.keyTipTag.style.display = "none";
	}
};

/**
 * 键盘动作
 * @return
 */
Keyword.prototype.keyDown = function(evt) {
	evt = (evt) ? evt : window.event;
	if (evt.keyCode == 37) {
		this.left();
	}else if(evt.keyCode == 39) {
		this.right();
	}
}

/**
 * 键盘按左
 * @return
 */
Keyword.prototype.left = function() {
	this.player.stop();
	this.bigImage.pre();
	this.cookie.setCookie(this.keyTipCookieName, "true", this.expireDay);
	this.keyTipTag.style.display = "none";
}

/**
 * 键盘按右
 * @return
 */
Keyword.prototype.right = function() {
	this.player.stop();
	this.bigImage.next();
	this.cookie.setCookie(this.keyTipCookieName, "true", this.expireDay);
	this.keyTipTag.style.display = "none";
}
