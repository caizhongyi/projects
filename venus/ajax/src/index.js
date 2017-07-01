
!(function( window ){
    var Ajax = function(){
        this.deferred = window.Deferred && Deferred();
        this.XMLHttpReq = null;
    }

    Ajax.prototype.createXMLHttpRequest = function(){
        try {
            this.XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP");//IE高版本创建XMLHTTP
        }
        catch(E) {
            try {
                this.XMLHttpReq  = new ActiveXObject("Microsoft.XMLHTTP");//IE低版本创建XMLHTTP
            }
            catch(E) {
                this.XMLHttpReq  = new XMLHttpRequest();//兼容非IE浏览器，直接创建XMLHTTP对象
            }
        }
        return this;
    }
    Ajax.prototype.get = function( url , callback  , sync , timeout ){
        return this.sendAjaxRequest( url ,'get', callback  , sync  )
    }
    Ajax.prototype.post = function( url , callback  , sync , timeout ){
        return this.sendAjaxRequest( url ,'post', callback  , sync  )
    }
    Ajax.prototype.sendAjaxRequest = function( url ,type , callback , sync  , timeout ){
        var callbackFun = {};

        if( typeof  callback == 'function'){
            callbackFun.success = callback ;
        }
        else if( typeof  callback == 'object' ){
            callbackFun = callback;
        }

        var ajax = this.createXMLHttpRequest();      //创建XMLHttpRequest对象
        var XMLHttpReq = this.XMLHttpReq;
        XMLHttpReq.open( type || 'post' , url, sync == null ?  true : sync );
        var timer = setTimeout(function(){
            if( XMLHttpReq.readyState != 4){
                if(callbackFun.error){
                    callbackFun.error.call( this ,XMLHttpReq ,XMLHttpReq.readyState );
                }
                this.deferred ?  this.deferred.rejectWith(XMLHttpReq ,XMLHttpReq.readyState) : this;
            }
        }, timeout || 5000);
        XMLHttpReq.onreadystatechange = function(){
            if (XMLHttpReq.readyState == 4) {
                if (XMLHttpReq.status == 200) {
                    callbackFun.success && callbackFun.success.call( this , XMLHttpReq.responseText );
                    this.deferred ?  this.deferred.resolveWith( XMLHttpReq.responseText ) : this;
                }
                else{
                    callbackFun.error && callbackFun.error.call( this ,XMLHttpReq ,XMLHttpReq.readyState ,XMLHttpReq.status);
                    this.deferred ?  this.deferred.rejectWith(XMLHttpReq ,XMLHttpReq.readyState ,XMLHttpReq.status) : this;
                }
                clearTimeout(timer);
            }
        }; //指定响应函数
        XMLHttpReq.send(null);
        return this.deferred ?  this.deferred.promise() : this;
    }


    if ( typeof module === "object" && module && typeof module.exports === "object" ) {
        module.exports = Ajax;
    } else {
        window.Ajax = Ajax;
    }
})( window);