$(function(){
    /* 链接点击统计  */
    /* $('.list-card,.carousel-inner').on('click','a',function(e){
     e.preventDefault();
     var href = $(this).attr('href');
     var that  = this ;
     $.get('http://localhost:8080/microcard/upcmicrocard/statistics', { id : $(this).attr('id') } ,
     function(data){
     $(that).find('.num').text(data);
     alert(href);             window.location.href = href ;
     })
     })*/

    $('#invite').click(function(){
        var userAgent = window.navigator.userAgent;
        if(userAgent.indexOf('YiXin')){
            window.location.href = 'https://plus.yixin.im/material/viewImageText?id=616121'
        }
        else{
            window.location.href = 'http://mp.weixin.qq.com/mp/appmsg/show?__biz=MjM5OTA2NTAxOA==&appmsgid=10001082&itemidx=1&sign=c965772ea1728e2b29120b8605b60a71#wechat_redirect'
        }
    })

    $('#send').click(function(){
        $('<div class="guid"></div><div class="overlay"></div>').appendTo('body').stop(true, true).fadeIn();
    })

    /* 卡片内面切换特效  */
    var $elem =  $("#tab li");
    if( $elem.length ) {
        var index = $elem.length - 1 ;
        if(index == 0 ){
            $elem.show();
            return ;
        }
        setInterval(function(){
            $elem.eq( index ).fadeOut( 1000 )
            var next = index - 1;
            $elem.eq( (next == -1 ) ? $elem.length - 1 : next ).fadeIn( 1000 )

            index --;
            if(index == -1){
                index = $elem.length - 1;
            };
        },2000);
    }
});
/* google 统计  */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-46596853-1', 'nihao.ma');
ga('send', 'pageview');
/* /google 统计  */



