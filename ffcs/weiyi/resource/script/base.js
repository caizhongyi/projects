/// <reference path="base.js" />
var Duomeng = function (){

    var UNDEF = "undefined", 
        OBJECT = "object", 
        win = window, 
        doc = document; 

    var EventUtil = {
        addHandler: function(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }

            return element;
        },
        removeHandler: function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }

            return element;
       }
    }
    function addLoadEvent(fn) {
        if (typeof win.addEventListener != UNDEF) {
            win.addEventListener("load", fn, false);
        } 
        else if (typeof doc.addEventListener != UNDEF) {
            doc.addEventListener("load", fn, false);
        } 
        else if (typeof win.attachEvent != UNDEF) {
            win.attachEvent("onload", fn);
        } 
        else if (typeof win.onload == "function") {
            var fnOld = win.onload;
            win.onload = function() {
                fnOld();
                fn();
            };
        } 
        else {
            win.onload = fn;
        }
    }

    return {
        version: '0.0.0.1',
        getElementById: function (id) {
            return doc.getElementById(id);
        },
        addHandler: EventUtil.addHandler,    
        removeHandler: EventUtil.removeHandler
    };
}();
 
window.onscroll = function() {
//	if(document.getElementById("contact-said")){
//	var _contact=document.getElementById("contact-said");
//	var _scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
//	_contact.style.top=_scrolltop+230+'px';
//	}
	
	if(document.getElementById("weimob-wx")){
	var _contact=document.getElementById("weimob-wx");
	var _scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
	_contact.style.top=_scrolltop+200+'px';
	}
}

	

