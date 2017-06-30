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
 * ��չArray�����contain�������ж������Ƿ����valueֵ��
 * @param {} value
 * @return {Boolean} true��false
 */
Array.prototype.contain = function(value) {
	for(var i = 0; i < this.length; i++) {
		if(value == this[i]) {
			return true;
		}
	}
	return false;
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
function Map() {
	this.keys = new Array();
	this.values = new Array();
	this.size = 0;
}

Map.prototype.put = function(key, value) {
	if(this.size > 0) {
		for(var i = 0; i < this.size; i++) {
			if(this.keys[i] == key) {
				this.values[i] = value;
				return;
			}else {
				this.keys[this.size] = key;
				this.values[this.size] = value;
				this.size++;
				return;
			}
		}
	}else{
		this.keys[this.size] = key;
		this.values[this.size] = value;
		this.size++;
		return;
	}
};

Map.prototype.putAll = function(map) {
	for(var i = 0; i < map.size; i++) {
		this.put(map.keys[i], map.values[i]);
	}
};

Map.prototype.putJSON = function(json) {
	for(var key in json) {
		if(key && key != "inheritFrom" && key != "instanceOf") {
			this.put(key, json[key]);
		}
	}
}

Map.prototype.get = function(key) {
	for(var i = 0; i < this.size; i++) {
		if(this.keys[i] == key) {
			return this.values[i];
		}
	}
	return null;
};

Map.prototype.remove = function(key) {
	var value = null;
	for(var i = 0; i < this.size; i++) {
		if(this.keys[i] == key) {
			value = this.values[i];
			this.keys.splice(i,1);
			this.values.splice(i,1);
			this.size--;
		}
	}
	return value;
};

Map.prototype.containsKey = function(key) {
	for(var i = 0; i < this.size; i++) {
		if(this.keys[i] == key) {
			return true;
		}
	}
	return false;
};

Map.prototype.containsValue = function(value) {
	for(var i = 0; i < this.size; i++) {
		if(this.values[i] == value) {
			return true;
		}
	}
	return false;
};

Map.prototype.clear = function() {
	this.size = 0;
	this.keys = null;
	this.keys = new Array();
	this.values = null;
	this.values = new Array();
};

Map.prototype.isEmpty = function() {
	if(this.size > 0) {
		return false;
	}
	return true;
};

Map.prototype.isFirst = function(key) {
	if(this.keys[0] == key) { 
		return true;
	}
	return false;
};

Map.prototype.isLast = function(key) {
	if(this.keys[this.keys.length - 1] == key) {
		return true;
	}
	return false;
};

Map.prototype.getKeyIndex = function(key) {
	for(var i = 0; i < this.size; i++) {
		if(this.keys[i] == key) {
			return i;
		}
	}
	return null;
};



function Form() {
}

/**
 * ��̬���������ڽ��?��������л���
 * @param {} formObj ��ȡ�ı?����
 * @return {} �������л������ݣ����� name1=value1&name2=value2...
 */
Form.serialize = function(formObj) {
	var fieldFilter = ["hidden", "text", "select-one","textarea","password","radio"];
	var fieldMap = new Map();
	var elements = formObj.elements;
	for(var i=0; i<elements.length; i++) {
		if(fieldFilter.contain(elements[i].type)) {
			var name = elements[i].name;
			var value = elements[i].value;
			if(elements[i].type == "radio") {
				if(elements[i].checked) {
					fieldMap.put(name, value);
				}
			}else {
				fieldMap.put(name, value);
			}
    	}
    }
	return this.param(fieldMap);;
};

/**
 * ��̬��������map����תΪ���л������ݸ�ʽ
 * @param {} map
 * @return {} �������л������ݣ����� name1=value1&name2=value2...
 */
Form.param = function(map) {
	var paramStr = "";
	for(var i = 0; i < map.size; i++) {
		var key = map.keys[i];
		var value = map.get(key);
		if(key) {
			paramStr += (key + "=" + value + "&");
		}
	}
	return paramStr.substring(0, paramStr.length - 1);
}

JSON = {
	/**
	json����תΪstring�ַ�
	*/
	obj2str: function(o){
	    var r = [];
	    if(typeof o =="string"){
	    	return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
	    }
	    if(typeof o == "object"){
	        if(!o.sort){
	            for(var i in o) {
	                r.push(i+":" + JSON.obj2str(o[i]));
	            }
	            if(!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){
	                r.push("toString:"+o.toString.toString());
	            }
	            
	            r="{" + r.join() + "}";
	        }else{
	            for(var i =0;i<o.length;i++) {
	                r.push(JSON.obj2str(o[i]));
	            }
	            
	            r="["+r.join()+"]";
	        }
	        return r;
	    }
	    return o.toString();
	},

	/**
	json����תΪstring�ַ�
	*/
	str2obj: function(str) {
		return eval('(' + str + ')');
	}
};

function Ajax() {
}

Ajax.getXmlHttpRequest = function() {
	try {
		return new XMLHttpRequest(); // Firefox, Opera 8.0+, Safari IE7
	} catch (e) {
        if (window.ActiveXObject) {
            var ActiveXName = ['MSXML2.XMLHttp.5.0', 'MSXML2.XMLHttp.4.0', 
                               'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp', 
                               'Microsoft.XMLHttp'];
            for (var i = 0; i < ActiveXName.length; i++) {
                try {
                    return new ActiveXObject(ActiveXName[i]); //Internet Explorer 5.0+
                } catch (e) {
                }
            }
        }
        else {
            return false;
        }
	}
};
	
/**
 * function send([url],[callback],[content],[method],[async])
 * �������󣬿�ѡ�����б�Ϊnull��ʹ�ö�������
 * @return
 */
Ajax.send = function(url, content, callback, method, async) {
	var xmlHttp = Ajax.getXmlHttpRequest();
	if(!url || !method || !async) {
		return false;
	}
	xmlHttp.open(method, url, async);
	if(method == 'POST') {
		xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	}
	xmlHttp.onreadystatechange = function() {
		if(xmlHttp.readyState==4) {
			if(xmlHttp.status==200) {
				callback(xmlHttp.responseText);
			} else {
				callback(null);
			}
		}
	};
	if(method == 'POST') {
		xmlHttp.send(content);
	} else {
		xmlHttp.send(null);
	}
};
	
/**
 * function get([url],[callback])
 * ʹ��GET��������һ��URL����ѡ����Ĭ��ʹ�ö�������
 * @param url
 * @param callback
 * @return
 */
Ajax.get = function(url, callback) {
	if(!url || !callback) {
		return false;
	}
	
	var getUrl = url;
	if(url.indexOf("?") > 0) {
		getUrl = url + "&date="+new Date().getTime();
	}else {
		getUrl = url + "?date="+new Date().getTime();
	}
	
	Ajax.send(getUrl, null, callback, 'GET', true);
};
	
/**
 * function post(form_obj,[callback],[url],[method])
 * ����һ���?��ָ��URL��form_objΪָ���?���󣬿�ѡ����Ϊ��ʱʹ�ö�������
 * @return
 */
Ajax.post = function(formObj, callback, url, method) {
	var postUrl = url;
	var postMethod = method;
	
	if(!formObj || !callback) {
		return false;
	}
	if(!postUrl) {
		postUrl = formObj.action;
	}
	if(!postMethod) {
		postMethod = formObj.method.toUpperCase();
	}
	
	var content = Form.serialize(formObj);
	
	if(postMethod) {
		if(postMethod == 'POST') {
			Ajax.send(postUrl, content, callback, 'POST', true);
		}else {
			if(postUrl.indexOf("?") > 0) {
				Ajax.send(postUrl + "&" + content, null, callback, 'GET', true);
			}else {
				Ajax.send(postUrl + "?" + content, null, callback, 'GET', true)
			}
		}
	}else {
		Ajax.send(postUrl, content, callback, 'POST', true);
	}
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

function UrlLocate() {
}

/**
 * ��̬������url���Ƿ���ͼ����
 * @return {Boolean}
 */
UrlLocate.hasGroupId = function() {
	var url = window.location.href;
	if(url.indexOf("#") > 0) {
		var param = url.match(/g=\d{0,}/);
		if(param) {
			return true;
		}
	}
	return false;
};

/**
 * ��̬������url���Ƿ��ͼƬ�ڼ���
 * @return {Boolean}
 */
UrlLocate.hasPage = function() {
	var url = window.location.href;
	if(url.indexOf("#") > 0) {
		var param = url.match(/p=\d{0,}/);
		if(param) {
			return true;
		}
	}
	return false;
};

/**
 * ��̬��������ȡurl�е�g�Ĳ���
 * @return {} ����ͼƬ�ĵڼ���
 */
UrlLocate.getGroupId = function() {
	var url = window.location.href;
	var groupId = null;
	
	if(this.hasGroupId()) {
		var param = url.match(/g=\d{0,}/)[0];
		groupId = param.substring(2);
	}
	
	return groupId;
};

/**
 * ��̬����������url�Ĳ���g��ֵ
 * @param {} groupId
 */
UrlLocate.setGroupId = function(groupId) {
	var url = window.location.href;
	if(this.hasGroupId()) {
		var groupIdBefore = url.match(/g=\d{0,}/)[0];
		var groupIdAfter = "g=" + groupId;
		window.location.href = url.replace(groupIdBefore, groupIdAfter);
	}else {
		window.location.href = url + "#g=" + groupId;
	}
};

/**
 * ��̬��������ȡurl�Ĳ���p��ֵ
 * @return {}
 */
UrlLocate.getPage = function() {
	var url = window.location.href;
	var page;
	
	if(this.hasPage()) {
		var param = url.match(/p=\d{0,}/)[0];
		page = param.substring(2);
	}else {
		page = 1;
	}
	
	return page;
};

/**
 * ��̬���������ò���p
 * @param {} page
 * @param {} imageGroup
 */
UrlLocate.setPage = function(page) {
	var url = window.location.href;
	
	if(this.hasPage()) {
		var pageBefore = url.match(/p=\d{0,}/)[0];
		var pageAfter = "p=" + page;
		window.location.href = url.replace(pageBefore, pageAfter);
	}else {
		window.location.href = url + "&p=" + page;
	}
};
/**
 * ͼƬ��ʾģʽ
 * @param {} listMode �б�ģʽ
 * @param {} showMode �õ�Ƭģʽ
 */
function Mode(image, listModeDiv, listModeImageDiv,  showModeDiv, ceilCount, rowCount, player) {
	this.pics = image.pics;
	this.listModeDiv = listModeDiv;
	this.listModeImageDiv = listModeImageDiv;
	this.showModeDiv = showModeDiv;
	this.player = player;
	
	this.ceilCount = ceilCount;
	this.rowCount = rowCount;
	
	this.init();
}

/**
 * ����б�ģʽ��ͼƬ
 * @param {} listModeDiv ��ȡ��div����
 */
Mode.prototype.init = function() {
	var listModeImageDivContent = '';
	
	var imgRowCount = Math.ceil(this.pics.length / 4);
	var minRowCount = imgRowCount;
	if(imgRowCount > this.rowCount) {
		minRowCount = this.rowCount;
	}
	
	for(var i = 0; i < minRowCount; i++) {
		listModeImageDivContent += '<div  class="listModeImageDiv">';
		for(var j = 0; j < 4; j++) {
			var index = 4 * i + j;
			if(index < this.pics.length) {
				var pic = this.pics[index];
				listModeImageDivContent += '<span class="listModeImageSpan"><img class="listModeImage"' + 
										 'src="' + pic.smallImgPath + '" ' +
										 'alt="' + pic.title + '" ' +
										 'onclick="bigImage.to(' + pic.id + ')" ' + 
										 '/></span>';
			}
		}
		listModeImageDivContent += '</div>';
	}
	this.listModeImageDiv.innerHTML = listModeImageDivContent;
};

Mode.prototype.clear = function() {
	this.listModeImageDiv.innerHTML = "";
};

/**
 * ���б�ģʽ
 */
Mode.prototype.listMode = function() {
	this.player.stop();
	this.showModeDiv.style.display = "none";
	this.listModeDiv.style.display = "block";
}

/**
 * ��õ�Ƭģʽ
 */
Mode.prototype.showMode = function() {
	this.listModeDiv.style.display = "none";
	this.showModeDiv.style.display = "block";
}


function ImageGroup(indexCtx) {
	this.indexCtx = indexCtx;		//�����ļ�ǰ׺
	this.indexUrl = null;			//�����ļ���ַ
		
	this.data = null;				//ͼƬ�����
	
	this.id = null;				//ͼƬ����
	this.indexMap = new Map();		//��ǰ��ͼ����map
	this.jsonUrl = null;			//ͼƬ������ļ���ַ
	
	this.preId = null;				//��һ��ͼƬ���id
	this.preIndexMap = new Map();	//ǰһ��ͼ����map
	this.preJsonUrl = null;
	
	this.nextId = null;			//��һ��ͼƬ���id
	this.nextIndexMap = new Map();	//��һ��ͼ����map
	this.nextJsonUrl = null;
}

/**
 * ���id��ȡ�����ļ���ַ
 * @param {} id
 * @return {}
 */
ImageGroup.prototype.getIndexUrl = function(id) {
	return this.indexCtx + 
			Math.floor(this.id / Math.pow(10,5)) + '/' + 
			Math.floor(this.id / Math.pow(10,2)) + ".json";
};

/**
 * ��ߵ�ǰid��ȡǰһ�������ļ���ַ
 * @param {} id
 * @return {}
 */
ImageGroup.prototype.getPreIndexUrl = function(id) {
	return this.indexCtx + 
			Math.floor(this.id / Math.pow(10,5)) + '/' + 
			(Math.floor(this.id / Math.pow(10,2)) - 1) + ".json";
};

/**
 * ��ݵ�ǰid��ȡ��һ�������ļ���ַ
 * @param {} id
 * @return {}
 */
ImageGroup.prototype.getNextIndexUrl = function(id) {
	return this.indexCtx + 
			Math.floor(this.id / Math.pow(10,5)) + '/' + 
			(Math.floor(this.id / Math.pow(10,2)) - 0 + 1) + ".json";
};

/**
 * ����ǰһͼƬ����Ϣ
 * @param {} callback �ص�����
 */
ImageGroup.prototype.setPre = function(callback) {
	var imageGroup = this;
	
	imageGroup.getPre(function() {
		if(imageGroup.preId && imageGroup.preJsonUrl) {
			imageGroup.nextId = imageGroup.id;
			imageGroup.nextJsonUrl = imageGroup.jsonUrl;
			imageGroup.nextIndexMap = imageGroup.indexMap;
			
			imageGroup.id = imageGroup.preId;
			imageGroup.jsonUrl = imageGroup.preJsonUrl;
			imageGroup.indexMap = imageGroup.preIndexMap;
			
			imageGroup.preId = null;
			imageGroup.preJsonUrl = null;
			imageGroup.preIndexMap.clear();
			
			callback(true);
		}else {
			callback(false);
		}
	});
};

/**
 * ������һͼƬ����Ϣ
 * @param {} callback �ص�����
 */
ImageGroup.prototype.setNext = function(callback) {
	var imageGroup = this;
	
	imageGroup.getNext(function() {
		if(imageGroup.nextId && imageGroup.nextJsonUrl) {
			imageGroup.preId = imageGroup.id;
			imageGroup.preJsonUrl = imageGroup.jsonUrl;
			imageGroup.preIndexMap = imageGroup.indexMap;
		
			imageGroup.id = imageGroup.nextId;
			imageGroup.jsonUrl = imageGroup.nextJsonUrl;
			imageGroup.indexMap = imageGroup.nextIndexMap;
			
			imageGroup.nextId = null;
			imageGroup.nextJsonUrl = null;
			imageGroup.nextIndexMap.clear();
			
			callback(true);
		}else {
			callback(false);
		}
	});
};

/**
 * �������
 * @param {} callback
 */
ImageGroup.prototype.load = function(callback) {
	var imageGroup = this;
	
	if(UrlLocate.hasGroupId()) {
		if(imageGroup.jsonUrl) {
			
			//�������ļ����ڣ�ֱ����������ļ�
			imageGroup.setImageGroup(callback);	
		}else {
			
			//�����ڣ������������ļ����������ļ���ַ������������ļ�
			imageGroup.id = UrlLocate.getGroupId();
			imageGroup.indexUrl = imageGroup.getIndexUrl(imageGroup.id);
			Ajax.get(imageGroup.indexUrl, function(jsonUrlData) {
				imageGroup.indexMap.putJSON(JSON.str2obj(jsonUrlData));
				imageGroup.jsonUrl = imageGroup.indexMap.get(imageGroup.id);
				imageGroup.setImageGroup(callback);
			});
		}
	}else {
		
		//���url��û�в���Ҳ����û��ͼƬ��id��ֱ������ǰhtmlĿ¼�µ�ͬ��json����ļ�
		var url = window.location.href;
		imageGroup.jsonUrl = url.substring(0, url.lastIndexOf(".")) + ".json";
		imageGroup.setImageGroup(callback);
	}
};

/**
 * ����ͼƬ����Ϣ
 * @param {} callback
 */
ImageGroup.prototype.setImageGroup = function(callback) {
	var imageGroup = this;
	Ajax.get(imageGroup.jsonUrl, function(imgGrpData) {
		imageGroup.data = JSON.str2obj(imgGrpData);
		imageGroup.id = imageGroup.data.id;
		if(imageGroup.indexMap.isEmpty()) {
			imageGroup.indexUrl = imageGroup.getIndexUrl(imageGroup.id);
			Ajax.get(imageGroup.indexUrl, function(jsonUrlData) {
				imageGroup.indexMap.putJSON(JSON.str2obj(jsonUrlData));
				callback();
			});
		}else {
			callback();
		}
	});
};

/**
 * ��ݵ�ǰͼƬ��id��ȡ��һ��ͼƬ�����Ϣ
 * @param {} callback
 */
ImageGroup.prototype.getPre = function(callback) {
	var imageGroup = this;
	if(imageGroup.indexMap.isFirst(imageGroup.id)) {
		var preIndexUrl = imageGroup.getPreIndexUrl(imageGroup.id);
		Ajax.get(preIndexUrl, function(jsonUrlData) {
			if(jsonUrlData) {
				imageGroup.preIndexMap.clear();
				imageGroup.preIndexMap.putJSON(JSON.str2obj(jsonUrlData));
				imageGroup.preId = imageGroup.preIndexMap.keys[imageGroup.preIndexMap.size - 1];
				imageGroup.preJsonUrl = imageGroup.preIndexMap.get(imageGroup.preId);
			}
			callback();
		});
	} else {
		var index = imageGroup.indexMap.getKeyIndex(imageGroup.id);
		imageGroup.preIndexMap = imageGroup.indexMap;
		imageGroup.preId = imageGroup.preIndexMap.keys[--index];
		imageGroup.preJsonUrl = imageGroup.preIndexMap.get(imageGroup.preId);
		callback();
	}
	
};

/**
 * ��ݵ�ǰͼƬ��id��ȡ��һ��ͼƬ�����Ϣ
 * @param {} callback
 */
ImageGroup.prototype.getNext = function(callback) {
	var imageGroup = this;
	if(imageGroup.indexMap.isLast(imageGroup.id)) {
		var nextIndexUrl = imageGroup.getNextIndexUrl(imageGroup.id);
		Ajax.get(nextIndexUrl, function(jsonUrlData) {
			if(jsonUrlData) {
				imageGroup.nextIndexMap.clear();
				imageGroup.nextIndexMap.putJSON(JSON.str2obj(jsonUrlData));
				imageGroup.nextId = imageGroup.nextIndexMap.keys[0];
				imageGroup.nextJsonUrl = imageGroup.nextIndexMap.get(imageGroup.nextId);
			}
			callback();
		});
	} else {
		var index = imageGroup.indexMap.getKeyIndex(imageGroup.id);
		imageGroup.nextIndexMap = imageGroup.indexMap;
		imageGroup.nextId = imageGroup.nextIndexMap.keys[++index];
		imageGroup.nextJsonUrl = imageGroup.nextIndexMap.get(imageGroup.nextId); 
		callback();
	}
};

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

SmallImage.prototype.clear = function() {
	this.innerDiv.innerHTML = "";
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
	if(outer.scrollLeft > img.offsetLeft) {
		outer.scrollLeft = img.offsetLeft - img.clientLeft;
	}
	if(outer.scrollLeft + outer.offsetWidth < img.offsetLeft + img.offsetWidth) {
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
function BigImage(image, imgTag, page, smallImage, player, mode) {
	this.image = image;
	this.pics = image.pics;
	this.imgTag = imgTag;
	this.index = page - 1;
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
	this.setInfo(id);
	this.index = this.image.getIndex(id);
	UrlLocate.setPage(this.image.getPage(id));
	this.smallImage.indexMove(id);
}

/**
 * ��һ��
 */
BigImage.prototype.pre = function(preImageGroupCallback) {
	var outer = this.smallImage.outerDiv;
	
	if(!this.image.isFirstIndex(this.pics[this.index].id)) {
		this.index--;
		var img = $(this.pics[this.index].id);
		if(outer.scrollLeft >= img.offsetLeft) {
			this.smallImage.leftMove();
		}
		this.to(this.pics[this.index].id);
	}else {
		if(preImageGroupCallback) {
			preImageGroupCallback();
		}
	}
};

/**
 * ��һ��
 */
BigImage.prototype.next = function(nextImageGroupCallback) {
	var outer = this.smallImage.outerDiv;
	
	if(!this.image.isLastIndex(this.pics[this.index].id)) {
		this.index++;
		var img = $(this.pics[this.index].id);
		if(outer.scrollLeft + outer.offsetWidth <= img.offsetLeft + img.offsetWidth) {
			this.smallImage.rightMove();
		}
		this.to(this.pics[this.index].id);
	}else {
		this.player.stop();
		if(nextImageGroupCallback) {
			nextImageGroupCallback();
		}
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
function Player(time){
	this.time = time;
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
Keyword.prototype.keyup = function(evt, nextImageGroup, preImageGroup) {
	evt = (evt) ? evt : window.event;
	if (evt.keyCode == 37) {
		this.left(preImageGroup);
	}else if(evt.keyCode == 39) {
		this.right(nextImageGroup);
	}
}

/**
 * ���̰���
 * @return
 */
Keyword.prototype.left = function() {
	this.player.stop();
	this.bigImage.pre(preImageGroup);
	this.cookie.setCookie(this.keyTipCookieName, "true", this.expireDay);
	this.keyTipTag.style.display = "none";
}

/**
 * ���̰���
 * @return
 */
Keyword.prototype.right = function(nextImageGroup) {
	this.player.stop();
	this.bigImage.next(nextImageGroup);
	this.cookie.setCookie(this.keyTipCookieName, "true", this.expireDay);
	this.keyTipTag.style.display = "none";
}
function ListPage(image, recordCount, pageSize) {
	this.pics = image.pics;
	
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
