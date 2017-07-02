var IEDEFERED = "ie-deferred-loader-js";
var SYS_DOCREADYCOMPLETE = false;
document.writeln("<div class=\"popupComponent\" id=\""+ IEDEFERED+ "\"><iframe class=\"popupIframe\"><\/iframe><div class=\"popupCover\"><\/div><div class=\"lightBox\"><span class=\"lightBoxMaxHeight\"><\/span><div class=\"lightBoxContent\"><div class=\"lightBoxLoading\">&nbsp;<\/div><div class=\"lightBoxWrapper\"> 加载中...<br\/><\/div><\/div><\/div><\/div>");
var sys_ie_loadmask = function(){
    setTimeout(function(){
        try{
            if(SYS_DOCREADYCOMPLETE == false){
                throw 0;
            }
            var mo = Ext.get(IEDEFERED);
            mo.remove();
            mo.fadeOut({remove:true});
            IEDEFERED = null;
            sys_ie_loadmask = function(){};
        }catch(e){
            sys_ie_loadmask();
        }
    }, 25);
}
sys_ie_loadmask();