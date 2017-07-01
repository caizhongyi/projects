var viewportElement, styleElement, designWidth = 640, defaultFontSize = 14 ;

function removeElement(_element){
    if( !_element ) return ;
    var _parentElement = _element.parentNode;
    if(_parentElement){
        _parentElement.removeChild(_element);
    }
}
function prependChild(parent,newChild){
    if(parent.firstChild){
        parent.insertBefore(newChild,parent.firstChild);
    } else {
        parent.appendChild(newChild);
    }
    return parent;
}

function resize(){
    var dpr = window.devicePixelRatio, scale = 1 / dpr;
    var size = defaultFontSize / ( designWidth / ( window.screen.width  * dpr) ) ;
    if( dpr *  window.screen.width > designWidth ) return ;
    var head = document.getElementsByTagName('head');

    removeElement(viewportElement);
    removeElement(styleElement);

    viewportElement = document.createElement('meta');
    styleElement = document.createElement('style');

    viewportElement.name = "viewport";
    viewportElement.setAttribute("content" , 'initial-scale='+ scale +',maximum-scale='+ scale +',minimum-scale='+ scale +',user-scalable=no,width=device-width') ;
    //styleElement.innerHTML = 'html{ font-size:'+ size +'px; }';
    window.document.documentElement.style.fontSize = size +'px';
    //prependChild( head[0] , styleElement);
    prependChild( head[0] , viewportElement);

}
window.addEventListener('resize',function(){
    resize()
})

resize();