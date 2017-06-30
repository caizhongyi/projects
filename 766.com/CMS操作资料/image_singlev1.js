/**
 * �Ľ�javascript�̳У�ʹ��ʱ������Ĺ�����������
 * ִ��SubClass.prototype.inheritFrom(SuperClass)�� ����ʹ����̳и�������Ժͷ���
 * @param {} fnClass ����
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
 * �Ľ�instanceOf�������ж�object�Ƿ���Class��ʵ��������̳С�
 * @param {} func ��
 * @return {Boolean} ����true����false
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
 * �Ľ���������¼�����
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
 * �򻯻�ȡdom
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
 * onReady�Ƕ�body��onload�¼����иĽ�ʹdom�������ͼƬδ����ʱ�ʹ���js�ű�
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

$.getElementByClass = function(tagName, className) {
	var objArray = new Array();
	var tags = document.getElementsByTagName(tagName);
	for(var i = 0; i < tags.length; i++) {
		if(tags[i].className == className) {
			objArray.push(tags[i]);
		}
	}
	return objArray;
};
/**
 * Cookie�������ڻ�ȡ������Cookie
 * ������
 */
function Cookie() {
}

/**
 * getCookie����
 * @param {} name ���name��ȡCookie��ֵ
 * @return {String} ����Cookie��ֵ
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
 * ����Cookie
 * @param {} name Ҫ���õ�Cookie��name
 * @param {} value Ҫ���õ�Cookie��value
 * @param {} expiredays ��Cookie����Ч�ڣ��������
 */
Cookie.prototype.setCookie = function(name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	//document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires="��+ exdate.toGMTString());
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
 * �޸�url�Ĳ���(#p=1)��ֵ
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
 * ��ȡurl�е�p�Ĳ���
 * @return {} ����ͼƬ�ĵڼ���
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
 * ͼƬ��ʾģʽ
 * @param {} listMode �б�ģʽ
 * @param {} showMode �õ�Ƭģʽ
 */
function Mode(image, listModeDiv, showModeDiv, ceilCount, rowCount, player, dialog) {
	this.pics = image.pics;
	this.listModeDiv = listModeDiv;
	this.showModeDiv = showModeDiv;
	this.player = player;
	this.dialog = dialog;
	
	this.ceilCount = ceilCount;
	this.rowCount = rowCount;
	
	this.init();
}

/**
 * ����б�ģʽ��ͼƬ
 * @param {} listModeDiv ��ȡ��div����
 */
Mode.prototype.init = function() {
	var listModeDivContent = '';
	
	var imgRowCount = Math.ceil(this.pics.length / 4);
	var minRowCount = imgRowCount;
	if(imgRowCount > this.rowCount) {
		minRowCount = this.rowCount;
	}
	
	for(var i = 0; i < minRowCount; i++) {
		listModeDivContent += '<div  class="listModeImageDiv">';
		for(var j = 0; j < 4; j++) {
			var index = 4 * i + j;
			if(index < this.pics.length) {
				var pic = this.pics[index];
				listModeDivContent += '<span class="listModeImageSpan"><img class="listModeImage"' + 
										 'src="' + pic.smallImgPath + '" ' +
										 'alt="' + pic.title + '" ' +
										 'onclick="bigImage.to(' + pic.id + ')" ' + 
										 '/></span>';
			}
		}
		listModeDivContent += '</div>';
	}
	this.listModeDiv.innerHTML += listModeDivContent;
}

/**
 * ���б�ģʽ
 */
Mode.prototype.listMode = function() {
	this.player.stop();
	this.dialog.hide();
	this.showModeDiv.style.display = "none";
	this.listModeDiv.style.display = "block";
}

/**
 * ��õ�Ƭģʽ
 */
Mode.prototype.showMode = function() {
	this.dialog.hide();
	this.listModeDiv.style.display = "none";
	this.showModeDiv.style.display = "block";
}


/**
 * 
 * @param {} id �������ڵ�div��id
 * @param {} width div���
 * @param {} height div�߶�
 */
function Dialog(dialogDiv) {
	this.dialogDiv = dialogDiv;
}

/**
 * ��ʾ����div
 */
Dialog.prototype.show = function() {
	var dialogDiv = this.dialogDiv;
	dialogDiv.style.left = (document.body.clientWidth/2 - dialogDiv.offsetWidth/2) + "px";
	dialogDiv.style.top = (document.body.clientHeight/2 - dialogDiv.offsetHeight/2 - 100) + "px";
	dialogDiv.style.visibility = "visible";
}

/**
 * ���ص���div
 */
Dialog.prototype.hide = function() {
	this.dialogDiv.style.visibility = "hidden";
}

/**
 * ����ͼ������
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
 * ��������ͼ
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
 * ��������ͼ
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
 * ����ͼ,��λ��ĳһ��ͼƬ
 */
SmallImage.prototype.indexMove = function(imgId) {
	var outer = this.outerDiv;
	var img = $(imgId);
	//��ѡ�е�ͼƬ�Ƶ����ʵ�λ��
	if(outer.scrollLeft >= img.offsetLeft) {
		outer.scrollLeft = img.offsetLeft - img.clientLeft;
	}
	if(outer.scrollLeft + outer.offsetWidth <= img.offsetLeft + img.offsetWidth) {
		outer.scrollLeft = img.offsetLeft + img.offsetWidth - outer.offsetWidth + img.clientLeft;
	}
	
	//���ñ�ѡ������ͼ��css��ʽ
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
 * Image������
 * @param {} imageGroup ͼƬ�����
 * @param {} imgTagId Ҫ��ʾ��img��ǩ��id
 * @param {} currentIndex currentIndex ��ǰҪ��ʾ�ĵڼ���ͼƬ
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
 * ��λ��ĳһ��ͼƬ
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
 * ��һ��
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
 * ��һ��
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
 * ͼƬ������
 * @param {} time ͼƬ��ת���ʱ�䣬����Ϊ��λ
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
 * ����
 */
Player.prototype.play = function(bigImage) {
	this.stop();
	this.playInterval = setInterval('bigImage.next()', this.time * 1000);
}

/**
 * ֹͣ
 */
Player.prototype.stop = function() {
	clearInterval(this.playInterval);
}

/**
 * �ز�
 */
Player.prototype.replay = function(bigImage) {
	this.dialog.hide();
	this.stop();
	bigImage.to(bigImage.pics[0].id);
	this.play(bigImage);
}

/**
 * ������
 * @param keyTipId	������ʾ��ǩ
 * @param expireDay	����ʱ��
 * @param player	player����
 * @param cookie	cookie����
 * @param bigImage	bigImage����
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
 * �Ƿ���cookie
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
 * ���̶���
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
 * ���̰���
 * @return
 */
Keyword.prototype.left = function() {
	this.player.stop();
	this.bigImage.pre();
	this.cookie.setCookie(this.keyTipCookieName, "true", this.expireDay);
	this.keyTipTag.style.display = "none";
}

/**
 * ���̰���
 * @return
 */
Keyword.prototype.right = function() {
	this.player.stop();
	this.bigImage.next();
	this.cookie.setCookie(this.keyTipCookieName, "true", this.expireDay);
	this.keyTipTag.style.display = "none";
}
function ListPage(imageGroup, recordCount, pageSize) {
	this.pics = imageGroup.items;
	
	this.totalImage = this.pics.length;									//ͼƬ��
	this.recordCount = recordCount;												//ÿ��ͼƬ��
	this.totalRecord = Math.ceil(this.totalImage / this.recordCount);	//��¼����
	this.page = 1;														//��ǰҳ
	this.pageSize = pageSize;													//ÿҳ��¼��
	this.imgPageSize = this.recordCount * this.pageSize;				//ÿҳͼƬ��
	this.totalPage = Math.ceil(this.totalRecord / this.pageSize);		//��ҳ����
	
	this.pageInput = null;
	this.currentPageSpan = null;
	this.totalPageSpan = null;
}

ListPage.prototype.init = function() {
	this.pageInput.value = this.page;
	this.currentPageSpan.innerHTML = this.page;
	this.totalPageSpan.innerHTML = this.totalPage;
};

ListPage.prototype.gotoPage = function(page) {
	if(page <= this.totalPage && page >= 1) {
		this.page = page;
		this.pageInput.value = this.page;
		this.currentPageSpan.innerHTML = this.page;
		this.totalPageSpan.innerHTML = this.totalPage;
		this.setImage();
	}
};

ListPage.prototype.firstPage = function() {
	this.gotoPage(1);
};

ListPage.prototype.nextPage = function() {
	if(this.page < this.totalPage) {
		this.gotoPage(++this.page);
	}
};

ListPage.prototype.prePage = function() {
	if(this.page > 1) {
		this.gotoPage(--this.page);
	}
};

ListPage.prototype.lastPage = function() {
	this.gotoPage(this.totalPage);
};

/**
 * ��ҳ��ͼƬ�任
 */
ListPage.prototype.setImage = function() {
	var pagePics = this.getPagePics();
	var imgSpans = $.getElementByClass('span', 'listModeImageSpan');

	for(var i = 0; i < pagePics.length; i++) {
		imgSpans[i].innerHTML = '<img class="listModeImage"' + 
								 'src="' + pagePics[i].smallImgPath + '" ' +
								 'alt="' + pagePics[i].title + '" ' +
								 'onclick="bigImage.to(' + pagePics[i].id + ')" ' + 
								 '/>';
	}
	
	if(imgSpans.length > pagePics.length) {
		for(var i = pagePics.length; i < imgSpans.length; i++) {
			imgSpans[i].innerHTML = "";
		}
	}
};

/**
 * ȡ����ǰҳ��ͼƬ
 */
ListPage.prototype.getPagePics = function() {
	var imgStart = (this.page - 1) * this.imgPageSize;
	var imgEnd = this.page * this.imgPageSize - 1;
	
	if(imgEnd > this.totalImage) {
		imgEnd = this.totalImage - 1;
	}
	
	var pagePics = new Array();
	for(var i = imgStart; i <= imgEnd; i++) {
		pagePics.push(this.pics[i]);
	}
	return pagePics;
}
