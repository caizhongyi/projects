//获取ID
var d$ = function (id) {return typeof id === "string" ? document.getElementById(id) : id};
//获取tagName
var d$$ = function (tagName, oParent) { return (oParent || document).getElementsByTagName(tagName) };
//获取class
var d$$$ = function (sClass, oParent) {
	var aClass = [],
	i = 0,
	reClass = new RegExp("(\\s|^)" + sClass + "($|\\s)"),
	aElement = d$$("*", oParent);
	for (i = 0; i < aElement.length; i++)reClass.test(aElement[i].className) && aClass.push(aElement[i]);
	return aClass
};
//获取元素位置
function getPos(obj) {
    var iTop = $(obj).position().top;
    var iLeft =$(obj).position().left;
//	var iTop = obj.offsetTop;
//	var iLeft = obj.offsetLeft;
//	
//	while (obj.offsetParent)
//	{
//		iTop += obj.offsetParent.offsetTop;
//		iLeft += obj.offsetParent.offsetLeft;
//		obj = obj.offsetParent;
//	}
	return {top:iTop, left:iLeft}	
};
//创建照片墙对象
var PhotoWall = function () {this.initialize.apply(this, arguments)};
PhotoWall.prototype = {
    initialize: function (obj, aData, _callback) {
        var oThis = this;
        this.oParent = d$(obj);
        this.oUl = d$$("ul", this.oParent);
        //this.oBtn = d$$("aa", this.oParent)[0];
        this.zIndex = 1;
        this.aPos = [];
        this.aData = aData;
        this._callback = _callback;
        this.dom = document.documentElement || document.body;
        this.create();
        //this.oBtn.onclick = function () {oThis.randomOrder()}
    },
    create: function () {
        this.aLi = d$$("li", this.oParent);
        this.changeLayout();
    },
    changeLayout: function () {
        var i = 0;
        this.oParent.style.height = this.oParent.offsetHeight - 2 + "px";
        this.aPos.length = 0;
        for (i = 0; i < this.aLi.length; i++) this.aLi[i].style.cssText = "";
        for (i = 0; i < this.aLi.length; i++) {
            this.aLi[i].index = i;
            var top = getPos(this.aLi[i]).top;
            var left = getPos(this.aLi[i]).left;
            this.aLi[i].style.top = top + "px";
            this.aLi[i].style.left = left + "px";
            this.aPos.push({ left: left, top: top })
        }

        for (i = 0; i < this.aLi.length; i++) {
            this.aLi[i].style.position = "absolute";
            this.aLi[i].style.margin = "0";
            this.drag(this.aLi[i])
        }
    },
    drag: function (obj, handle) {
        var oThis = this;
        var handle = handle || obj;
        handle.style.cursor = "move";
        handle.onmousedown = function (event) {
            var event = event || window.event;
            var disX = event.clientX - this.offsetLeft;
            var disY = event.clientY - this.offsetTop;
            var oNear = null;
            handle.style.zIndex = oThis.zIndex++;

            document.onmousemove = function (event) {
                var event = event || window.event;
                var iL = event.clientX - disX;
                var iT = event.clientY - disY;
                var maxL = Math.max(oThis.dom.clientWidth, oThis.dom.scrollWidth) - handle.offsetWidth;
                var maxT = Math.max(oThis.dom.clientHeight, oThis.dom.scrollHeight) - handle.offsetHeight;

                iL < 0 && (iL = 0);
                iT < 0 && (iT = 0);
                iL > maxL && (iL = maxL);
                iT > maxT && (iT = maxT);

                handle.style.left = iL + "px";
                handle.style.top = iT + "px";

                oNear = oThis.findNearest(obj);

                for (var i = 0; i < oThis.aLi.length; i++) oThis.aLi[i].className = "";

                oNear && (oNear.className = "hig");

                return false
            };
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;

                if (oNear) {
                    oThis._callback(handle.getAttribute('photoid'), oNear.getAttribute('photoid'), function (state) {
                        if (state) {
                            var startIndex, endIndex;
                        
                            if (oNear.index < handle.index) {
                                startIndex = handle.index;
                                endIndex = oNear.index;

                                for (i = startIndex; i >= endIndex; i--) {
                                    if (i == startIndex) {
                                        oThis.aLi[i].index = endIndex;
                                        oThis.aLi[i].style.zIndex = oThis.zIndex++;
                                        oThis.doMove(handle, oThis.aPos[endIndex]);
                                    } else {
                                        var index = i;
                                        oThis.aLi[i].index = index + 1;
                                        oThis.aLi[i].style.zIndex = oThis.zIndex++;
                                        oThis.doMove(oThis.aLi[i], oThis.aPos[index + 1]);
                                    }
                                }
                                $(oThis.aLi[startIndex]).insertBefore($(oThis.aLi[endIndex]))
                            }
                            else {
                                startIndex = handle.index;
                                endIndex = oNear.index;
                               
                                for (i = startIndex; i <= endIndex; i++) {
                                    if (i == startIndex) {
                                        oThis.aLi[i].index = endIndex;
                                        oThis.aLi[i].style.zIndex = oThis.zIndex++;
                                        oThis.doMove(oThis.aLi[i], oThis.aPos[endIndex]);
                                    } else {
                                        var index = i;
                                        oThis.aLi[i].index = index - 1;
                                        oThis.aLi[i].style.zIndex = oThis.zIndex++;
                                        oThis.doMove(oThis.aLi[i], oThis.aPos[index - 1]);
                                    }
                                }
                                $(oThis.aLi[startIndex]).insertAfter($(oThis.aLi[endIndex]))
                            }
                        } else {
                            oThis.doMove(handle, oThis.aPos[handle.index])
                        }
                    });
                }
                else {
                    oThis.doMove(handle, oThis.aPos[handle.index])
                }

                handle.releaseCapture && handle.releaseCapture()
            };
            this.setCapture && this.setCapture();
            return false
        };
    },
    doMove: function (obj, iTarget, callback) {
        var oThis = this;
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var iCurL = getPos(obj).left;
            var iCurT = getPos(obj).top;
            var iSpeedL = (iTarget.left - iCurL) / 5;
            var iSpeedT = (iTarget.top - iCurT) / 5;
            iSpeedL = iSpeedL > 0 ? Math.ceil(iSpeedL) : Math.floor(iSpeedL);
            iSpeedT = iSpeedT > 0 ? Math.ceil(iSpeedT) : Math.floor(iSpeedT);

            if (iCurL == iTarget.left && iCurT == iTarget.top) {
                clearInterval(obj.timer);
                callback && callback()
            }
            else {
                obj.style.left = iCurL + iSpeedL + "px";
                obj.style.top = iCurT + iSpeedT + "px"
            }
        }, 30)
    },
    findNearest: function (obj) {
        var aDistance = [];
        var i = 0;
        for (i = 0; i < this.aLi.length; i++) aDistance[i] = this.aLi[i] == obj ? Number.MAX_VALUE : this.getDistance(obj, this.aLi[i]);

        var minNum = Number.MAX_VALUE;
        var minIndex = -1;
        for (i = 0; i < aDistance.length; i++) aDistance[i] < minNum && (minNum = aDistance[i], minIndex = i);

        return this.isButt(obj, this.aLi[minIndex]) ? this.aLi[minIndex] : null
    },
    getDistance: function (obj1, obj2) {
        var a = (obj1.offsetLeft + obj1.offsetWidth / 2) - (obj2.offsetLeft + obj2.offsetWidth / 2);
        var b = (obj1.offsetTop + obj1.offsetTop / 2) - (obj2.offsetTop + obj2.offsetTop / 2);
        return Math.sqrt(a * a + b * b)
    },
    isButt: function (obj1, obj2) {
        var l1 = obj1.offsetLeft;
        var t1 = obj1.offsetTop;
        var r1 = l1 + obj1.offsetWidth;
        var b1 = t1 + obj1.offsetHeight;

        var l2 = obj2.offsetLeft;
        var t2 = obj2.offsetTop;
        var r2 = l2 + obj2.offsetWidth;
        var b2 = t2 + obj2.offsetHeight;

        return !(r1 < l2 || b1 < t2 || r2 < l1 || b2 < t1)
    },
    randomOrder: function () {
        this.aPos.sort(function () { return Math.random() > 0.5 ? 1 : -1 });
        for (var i = 0; i < this.aLi.length; i++) {
            this.aLi[i].index = i;
            this.doMove(this.aLi[i], this.aPos[i])
        }
    }
};
