
var langtip = {};  /*定义提示信息对象*/
var clientLanguage = window.navigator.language ? window.navigator.language : window.navigator.browserLanguage;
clientLanguage = clientLanguage.toLowerCase();
$(document).append('<script type=\"text/javascript\" src=\"/Scripts/multipleLanguage/' + clientLanguage + '.js\"><\/script>');

/*获取 提示*/
function wanerdaoLangTip(key) {
    if (langtip[key]) {
        return langtip[key];
    } else {
        return '';
    }
}
