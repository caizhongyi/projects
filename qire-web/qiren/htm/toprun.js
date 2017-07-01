/*顶部跟随*/
var g_myBodyInstance = document.body;  
var g_myBodyInstanceString = "document.body";  
if(document.compatMode != "BackCompat"){  
    // for looser.dtd  
    g_myBodyInstance = document.documentElement;  
    g_myBodyInstanceString = "document.documentElement";  
}  
var isMinNS4 = (navigator.appName.indexOf("Netscape") >= 0 &&  
                parseFloat(navigator.appVersion) >= 4) ? 1 : 0;  
var isMinNS5 = (navigator.appName.indexOf("Netscape") >= 0 &&  
                parseFloat(navigator.appVersion) >= 5) ? 1 : 0;  
var isMinIE4 = (document.all) ? 1 : 0;  
var isMinIE5 = (isMinIE4 && navigator.appVersion.indexOf("5.") >= 0) ? 1 : 0;  
var isMacIE = (isMinIE4 && navigator.userAgent.indexOf("Mac") >= 0) ? 1 : 0;  
  
var getFFVersion=navigator.userAgent.substring(  
                    navigator.userAgent.indexOf("Firefox")).split("/")[1];  
//extra height in px to add to iframe in FireFox 1.0+ browsers  
var FFextraHeight=getFFVersion<1.5? 16 : 0;  
  
  
function getLayer(name) {  
  if (isMinNS5)  
    return document.getElementById(name);  
  else if (isMinIE4)  
    return eval('document.all.' + name);  
  else if (isMinNS4)  
    return findLayer(name, document);  
  
  return null;  
}  
  
function findLayer(name, doc) {  
  
  var i, layer;  
  
  for (i = 0; i < doc.layers.length; i++) {  
    layer = doc.layers[i];  
    if (layer.name == name)  
      return layer;  
    if (layer.document.layers.length > 0) {  
      layer = findLayer(name, layer.document);  
      if (layer != null)  
        return layer;  
    }  
  }  
  
  return null;  
}  
  
function moveLayerTo(layer, x, y) {  
  if (isMinIE4) {  
    layer.style.left = x;  
    layer.style.top  = y;  
  }  
  else if (isMinNS5) {  
    layer.style.left = x+'px';  
    layer.style.top  = y+'px';  
  }  
  else if (isMinNS4)  
    layer.moveTo(x, y);  
}  
  
function getPageLeft(layer) {  
  
  if (isMinIE4||isMinNS5)  
    return(layer.offsetLeft);  
  else if (isMinNS4)  
    return(layer.pageX);  
  return(-1);  
}  
  
function getPageTop(layer) {  
  
  if (isMinIE4||isMinNS5)  
    return(layer.offsetTop);  
  else if (isMinNS4)  
    return(layer.pageY);  
  return(-1);  
}  
  
function getPageScrollX() {  
  
  if (isMinIE4||isMinNS5)  
    return(g_myBodyInstance.scrollLeft);  
  else if (isMinNS4)  
    return(window.pageXOffset);  
  return(-1);  
}  
  
function getPageScrollY() {  
  
  if (isMinIE4||isMinNS5)  
    return(g_myBodyInstance.scrollTop);  
  else if (isMinNS4)  
    return(window.pageYOffset);  
  return(-1);  
}  
  
var g_p_topmenu = null;  
g_p_topmenu = getLayer('topmenu');  
if(!isMinIE4){g_p_topmenu.style.position = 'fixed';}  
function repostopmenu(){  
    if(isMinIE4){  
        try{  
            moveLayerTo(g_p_topmenu,   
                        getPageLeft(g_p_topmenu),   
                        getPageScrollY());  
        }catch(e){}  

    }  
}  
window.onresize = repostopmenu;  
window.onscroll = repostopmenu;  
window.onload = repostopmenu;  