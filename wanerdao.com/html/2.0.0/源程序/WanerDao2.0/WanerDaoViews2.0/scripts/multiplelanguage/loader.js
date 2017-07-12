var langtip = {};  /*定义提示信息对象*/
var clientLanguage;
/*
获取多语言 语言 
*/
function getClientLanguage() {
    var lang;
    if ($.cookie('multiplelang')) {
        lang = $.cookie('multiplelang')['langid'];
    }

    if (!lang) {
        lang = window.navigator.language ? window.navigator.language : window.navigator.browserLanguage;
    }
    lang = lang.toLowerCase();
    return lang;
}
/*用户设置的多语言*/
function userSetClientLanguage() {
    var lang;
    if ($.cookie('multiplelang')) {
        lang = $.cookie('multiplelang')['langid'];
    }
    return lang;
}

///*获取浏览器语言*/
//function getBrowserLanguage() {
//    return (window.navigator.language ? window.navigator.language : window.navigator.browserLanguage).toLowerCase();
//}

clientLanguage = getClientLanguage();
//if (clientLanguage && clientLanguage != 'zh-cn') {
//    redirectSiteByLang();
//}

$(document).append('<script type=\"text/javascript\" src=\"/scripts/multiplelanguage/' + clientLanguage + '.js\"><\/script>');

/*获取 提示*/
function wanerdaoLangTip(key) {
    if (langtip[key]) {
        return langtip[key];
    } else {
        return '';
    }
}

/*设置多语言*/
function setMultiplelangAndRedirect(language) {
    clientLanguage = language;
    $.cookie('multiplelang', { langid: language });
    redirectSiteByLang();
}

/* 重定向网站到正确的语言 */
function redirectSiteByLang() {
//    var site = location.href.match(/^(http|https)\:\/\/([\w]*\.wanerdao2\.com)\//)[2];
//    switch (clientLanguage) {
//        case 'zh-cn':
//            location.href = location.href.replace(site, 'www.wanerdao2.com');
//            break;
//        default:
//            location.href = location.href.replace(site, 'en.wanerdao2.com');
//            break;
    //    }
    location.reload();
}


var country = { "cn": "76cb8f79-ea4c-11e0-8606-00306701b527", "us": "7f7a92b8-ea4c-11e0-8606-00306701b527" };