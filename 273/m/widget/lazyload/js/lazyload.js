/**
 * Created by Administrator on 2015/11/9.
 */
var $ = require('zepto');

$.fn.scrollLoading = function(options){
    var defaults={
        attr:"datasrc",
        context : window
    };
    var post, posb ;
    var params=$.extend({},defaults,options||{});
    params.cache=[];
    $(this).addClass('loadingimg').each(function(){
        var node=this.nodeName.toLowerCase(),
            url=$(this).attr(params["attr"]);
        if(!url){
            return;
        }
        var data={obj:$(this),tag:node,url:url};
        params.cache.push(data);
    });
    var loading=function(){
        var st= $(params.context).scrollTop(),sth=st+ $(params.context).height();
        $.each(params.cache,function(i,data){
            var o=data.obj,tag=data.tag,url=data.url;
            if(o){
                post=o.offset().top;
                posb=post+o.height();
                if((post>st&&post<sth)||(posb>st&&posb<sth)){
                    if(tag==="img"){
                        o.attr("src",url);
                    }else{
                        o.load(url);
                    }
                    data.obj=null;
                }
            }
        });
        return false;
    };
    loading();
    $(params.context).bind("scroll",loading);
};


module.exports = $;