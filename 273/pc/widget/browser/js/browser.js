var Browser =  window.Browser || {} ;
/**
 * @description : 浏览器信息
 * */
Browser.ua = navigator.userAgent.toLowerCase() ;
Browser.mozilla = /firefox/.test(Browser.ua) || Browser.ua.match(/gecko|khtml/i);//����ں�
Browser.webkit = /webkit/.test(Browser.ua) || Browser.ua.match(/applewebkit/i);//ƻ�����ȸ��ں�
Browser.opera = /opera/.test(Browser.ua) || Browser.ua.match(/repsto/i);//opera�ں�
Browser.msie = /msie/.test(Browser.ua) || Browser.ua.match(/trident/i);//IE�ں�
Browser.mobile =  !!Browser.ua.match(/applewebkit.*mobile.*/) || !!Browser.ua.match(/applewebkit/) || Browser.ua.match(/iphone|ipod|ipad|android|symbianos|ios|windows phone|windows ce|ucweb|rv:1.2.3.4|midp/i); //�Ƿ�Ϊ�ƶ��ն�
Browser.ios =  !!Browser.ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/);//ios�ն�
Browser.android =  Browser.ua.match(/android|linux/i);//android�ն˻���uc�����
Browser.iPhone =  Browser.ua.match(/iphone/i);
Browser.iPad =  Browser.ua.match(/ipad/i);
Browser.uc =  Browser.ua.match(/ucweb|rv:1.2.3.4/i);
Browser.midp =  Browser.ua.match(/midp/i);
Browser.safari =  Browser.ua.match(/safari/i);//�Ƿ�webӦ�ó���û��ͷ����ײ�
Browser.language =  (navigator.browserLanguage || navigator.language).toLowerCase()

Browser.msie && (function () {
    switch(navigator.appVersion .split(";")[1].replace(/[ ]/g,"")){
        case "MSIE6.0" :   Browser.version = 6; break;
        case "MSIE7.0" :   Browser.version = 7; break;
        case "MSIE8.0" :   Browser.version = 8; break;
        case "MSIE9.0" :   Browser.version = 9; break;
        case "MSIE10.0" :   Browser.version = 10; break;
        case "MSIE11.0" :   Browser.version = 11; break;
        default : Browser.version = 99; break;
    }
})();

if( typeof  module == 'object') module.exports = Browser;